const http = require('http');

const server = http.createServer((req, res) => {
  //   console.log(req);

  //I want go pull out the method to test
  //console.log(req.method);

  //Pull out more info in destructure
  const { headers, url, method } = req;
  console.log(headers, url, method);
  res.end();
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Running as planned on port ${PORT}`));
