const http = require('http');
const { WSASERVICE_NOT_FOUND } = require('constants');
const { brotliDecompressSync } = require('zlib');

//Mock data to return
const todos = [
  { id: 1, text: 'Todo One' },
  { id: 2, text: 'Todo Two' },
  { id: 3, text: 'Todo Three' },
];

const server = http.createServer((req, res) => {
  //   console.log(req);

  //I want go pull out the method to test
  //console.log(req.method);

  //Pull out more info in destructure
  //   const { headers, url, method } = req;
  //   console.log(headers, url, method);

  //res.statusCode = 404;
  //Content type in the header
  // res.setHeader('Content-Type', 'application/json');
  //Type of server
  //res.setHeader('X-Powered-By', 'Node.js');

  res.writeHead(404, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Node.js',
  });

  //res.setHeader('Content-Type', 'text/plain');
  // res.write('<h1>Hello Postman</h1>');
  // res.write('<h2>Hi</h2>');
let body =[]

req.on('data', chunk => {
    body.push(chunk);
}).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(body);
});

  res.end(
    JSON.stringify({
      success: false,
      error: 'not found',
      data: null,
    })
  );
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Running as planned on port ${PORT}`));
