import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    ws.send(data.toString().toUpperCase());
  });

  ws.send('Hello there from server');

  // setInterval(() => {
  //   ws.send('Hello there again');
  // }, 2000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
