const getWorkingOnTickets = async () => {
  const response = await fetch('/api/v1/ticket/working-on');

  const { tickets } = await response.json();

  for (let i = 0; i < tickets.length; i++) {
    if (i >= 4) break;

    const ticket = tickets[i];
    if (!ticket) continue;

    const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`);
    const lblDesk = document.querySelector(`#lbl-desk-0${i + 1}`);

    lblTicket.innerText = `Ticket ${ticket.number}`;
    lblDesk.innerText = `${ticket.handleAtDesk}`;
  }
};

getWorkingOnTickets();
