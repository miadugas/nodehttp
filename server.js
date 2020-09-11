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
  // using detructuring to pull out method & url
  const { method, url } = req;

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

  //res.setHeader('Content-Type', 'text/plain');
  // res.write('<h1>Hello Postman</h1>');
  // res.write('<h2>Hi</h2>');
  let body = [];

  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      //initialize if a user goes to any undefined url give a "not found"
      let status = 404;
      const response = {
        success: false,
        data: null,
        error: null,
      };

      //test method & url
      //Will do the actual API in express but this is good practice to test Postman
      if (method === 'GET' && url === '/todos') {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === 'POST' && url === '/todos') {
        const { id, text } = JSON.parse(body);

        if (!id || !text) {
          status = 400;
          response.error = 'please add ID and text';
        } else {
          //push to my todos array
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.data = todos;
        }
        res.writeHead(status, {
          'Content-Type': 'application/json',
          'X-Powered-By': 'Node.js',
        });

        res.end(JSON.stringify(response));
      }
    });
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Running as planned on port ${PORT}`));
