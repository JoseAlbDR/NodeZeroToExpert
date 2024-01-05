console.log('Escritorio HTML');

const pendingLbl = document.querySelector('#lbl-pending');
const header = document.querySelector('h1');
const params = new URLSearchParams(window.location.search);
const desk = params.get('escritorio');
header.innerText = desk;

const loadInitialCount = async () => {
  const response = await fetch('/api/v1/ticket/pending');
  const { tickets } = await response.json();

  pendingLbl.innerHTML = tickets.length || 0;
};

function connectToWebSockets() {
  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.event === 'on-ticket-count-changed')
      pendingLbl.innerHTML = data.payload;
  };

  socket.onclose = (event) => {
    console.log('Connection closed');
    setTimeout(() => {
      console.log('retrying to connect');
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log('Connected');
  };
}

connectToWebSockets();
loadInitialCount();
