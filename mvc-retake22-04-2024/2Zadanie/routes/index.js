const fs = require('fs');
const home = require('../views/home');
const car = require('../views/car');
const addCar = require('../views/add-car');
const querystring = require('querystring');

function handleHome(response) {
    response.setHeader('Content-Type', 'text/html');
    response.write(home.renderPage());
    response.end();
}

function handleAddCar(method, request, response) {
    if (method === 'GET') {
        response.setHeader('Content-Type', 'text/html');
        response.write(addCar.renderPage());
        response.end();
    } else if (method === 'POST') {
        let formData = '';
        request.on('data', chunk => {
            formData += chunk.toString();
        });
        request.on('end', () => {
            const parsedFormData = querystring.parse(formData); // Przetwarzanie danych formularza za pomocą querystring
            fs.writeFile('formData.json', JSON.stringify(parsedFormData), err => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Form data saved!');
                response.writeHead(302, {
                    'Location': '/car'
                });
                response.end();
            });
        });
    }
}

function handleCar(response) {
    fs.readFile('formData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        response.setHeader('Content-Type', 'text/html');
        response.write(car.renderPage(data));
        response.end();
    });
}

function handlePageNotFound(response) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.write('404 Page Not Found');
    response.end();
}

module.exports = {
    handleHome,
    handleAddCar,
    handleCar,
    handlePageNotFound
};
