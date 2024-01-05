const button = document.querySelector('button');
const lastTicket = document.querySelector('span');

button.addEventListener('click', createTicket);

const getLastTicket = async () => {
  const response = await fetch('http://localhost:3000/api/v1/ticket/last');

  const { number } = await response.json();

  return number;
};

const createTicket = async () => {
  const response = await fetch('http://localhost:3000/api/v1/ticket', {
    method: 'POST',
  });

  await printTicket();
};

const printTicket = async () => {
  const number = await getLastTicket();
  lastTicket.innerText = `Last Ticket: ${number}`;
};

printTicket();
