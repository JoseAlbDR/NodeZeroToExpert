console.log('Escritorio HTML');

const pendingLbl = document.querySelector('#lbl-pending');
const header = document.querySelector('h1');
const noMoreAlert = document.querySelector('.alert');

const params = new URLSearchParams(window.location.search);

if (params.has('escritorio')) {
  const desk = params.get('escritorio');
  header.innerText = desk;
} else {
  window.location = 'index.html';
  throw new Error('Desk required');
}

const checkTicketCount = (ticketCount = 0) => {
  if (ticketCount === 0) {
    noMoreAlert.classList.remove('d-none');
  } else {
    noMoreAlert.classList.add('d-none');
  }
  pendingLbl.innerHTML = ticketCount;
};

const loadInitialCount = async () => {
  const response = await fetch('/api/v1/ticket/pending');
  const { tickets } = await response.json();

  checkTicketCount(tickets.length || 0);
};

function connectToWebSockets() {
  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (!data.event === 'on-ticket-count-changed') return;

    pendingLbl.innerHTML = data.payload;
    checkTicketCount(data.payload);
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
