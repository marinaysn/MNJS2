const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);

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
        const body =[];
        req.on('data', (chunk) =>{

            console.log('**********');
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            console.log('++++++');
            console.log(parsedBody);

            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message)
        });

        
        // res.writeHead(302, {});
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();

    }



    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>First Page</title></head>');
    res.write('<body><div>Hello world!</div></body>');
    res.write('</html>');
    res.end();

});

server.listen(3000);