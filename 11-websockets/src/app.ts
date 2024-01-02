import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const payload = {
      type: 'custom-message',
      payload: data.toString(),
    };

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload));
      }
    });
  });

  // ws.send('Hello there from server');

  // setInterval(() => {
  //   ws.send('Hello there again');
  // }, 2000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
