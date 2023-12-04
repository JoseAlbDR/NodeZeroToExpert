import http2 from 'http2';
import fs from 'fs';
const server = http2.createSecureServer(
  {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
  },
  (req, res) => {
    console.log(req.url);

    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write(`<h1>URL ${req.url}</h1>`);
    // res.end();

    // const data = { name: 'John Doe', age: 30, city: 'San Francisco' };

    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(data));

    if (req.url === '/') {
      const htmlFile = fs.readFileSync('./public/index.html', 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlFile);
      return;
    }

    if (req.url === '/css/styles.css') {
      const cssFile = fs.readFileSync('./public/css/styles.css', 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(cssFile);
    }

    if (req.url === '/js/app.js') {
      const jsFile = fs.readFileSync('./public/js/app.js', 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(jsFile);
    }
  }
);

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
