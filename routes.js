const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {

        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="test" name="message" /><button type="submit">Click me!</button></form></body>');
        res.write('</html>');
        return res.end();

    }
    else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {

            console.log('1**********');
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log('2++++++');
            console.log(parsedBody);

            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                // res.writeHead(302, {});
                console.log('3===========');
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        });

    }



    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>First Page</title></head>');
    res.write('<body><div>Hello world!</div></body>');
    res.write('</html>');
    res.end();

};

module.exports = requestHandler;
