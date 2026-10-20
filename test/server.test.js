// Tests for the Ship Kit demo server. Built-in node:test runner, no deps.
const { test } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const { handle } = require('../server.js');

function get(path) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(handle);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      const req = http.get(`http://127.0.0.1:${port}${path}`, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          server.close();
          resolve({ status: res.statusCode, headers: res.headers, body });
        });
      });
      req.on('error', (e) => {
        server.close();
        reject(e);
      });
    });
  });
}

test('GET / serves the landing page', async () => {
  const r = await get('/');
  assert.equal(r.status, 200);
  assert.match(r.headers['content-type'], /text\/html/);
  assert.match(r.body, /Ship Kit/);
});

test('GET /api/health returns ok JSON', async () => {
  const r = await get('/api/health');
  assert.equal(r.status, 200);
  assert.equal(r.headers['content-type'], 'application/json');
  const parsed = JSON.parse(r.body);
  assert.equal(parsed.ok, true);
});

test('unknown path returns 404', async () => {
  const r = await get('/definitely-not-here');
  assert.equal(r.status, 404);
});

test('path traversal outside public/ is blocked', async () => {
  const r = await get('/..%2fserver.js');
  assert.ok([403, 404].includes(r.status), `expected 403/404, got ${r.status}`);
});
