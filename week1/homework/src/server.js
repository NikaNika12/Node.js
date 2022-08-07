'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/': 
        break;
      case '/state':
        break;
      case '/add':
        state += 1;
        break;
      case '/subtract':
        state -= 1;
        break;
      case '/reset':
        state = 10;
        break;
      default:
        const error = 'Not found';
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error }));
        return;
    }
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ state }));
  });

  return server;
}

module.exports = {
  createServer
};

