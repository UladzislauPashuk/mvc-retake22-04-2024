const http = require('http');
const PORT = 3000;
const fs = require('fs');
const routes = require('./routes/index');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        routes.handleHome(res);
    } else if (req.url === '/add-car') {
        routes.handleAddCar(req.method, req, res);
    } else if (req.url === '/car' && req.method === 'GET') {
        routes.handleCar(res);
    } else {
        routes.handlePageNotFound(res);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
});
