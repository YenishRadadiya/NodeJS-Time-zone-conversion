import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
    }

    // Your static route for CSS should follow this block
    else if (req.url === '/styles/dashboard.css' && req.method === 'GET') {
    }

    // Fallback if no route matches
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});
server.listen(3000, () => {
    console.log(`SSR Server running at http://localhost:${PORT}/`);
});
