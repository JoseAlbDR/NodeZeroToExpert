console.log('Escritorio HTML');

const pendingLbl = document.querySelector('#lbl-pending');
const header = document.querySelector('h1');
const noMoreAlert = document.querySelector('.alert');
const nextButton = document.querySelector('#next-btn');
const finishButton = document.querySelector('#finish-btn');
const currentTicketLbl = document.querySelector('small');

const params = new URLSearchParams(window.location.search);

if (!params.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('Desk required');
}
const desk = params.get('escritorio');

let currentTicket = null;

header.innerText = desk;

const finishTicket = async () => {
  if (!currentTicket) return;

  const response = await fetch(
    `/api/v1/ticket/done/${currentTicket.ticket.id}`,
    {
      method: 'PUT',
    }
  );

  const { status, message } = await response.json();

  if (status === 'ok') {
    currentTicket = null;
    currentTicketLbl.innerText = 'Naiden';
  }
};

const handleNextTicket = async () => {
  await finishTicket();

  const response = await fetch(`/api/v1/ticket/draw/${desk}`);
  const { ticket } = await response.json();

  if (ticket.status === 'error') {
    currentTicketLbl.innerText = ticket.message;
    return;
  }

  currentTicket = ticket;
  currentTicketLbl.innerText = ticket.ticket.number;
};

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

nextButton.addEventListener('click', handleNextTicket);
finishButton.addEventListener('click', finishTicket);

connectToWebSockets();
loadInitialCount();
