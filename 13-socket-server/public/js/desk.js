console.log('Escritorio HTML');

const pendingLbl = document.querySelector('#lbl-pending');

const loadInitialCount = async () => {
  const response = await fetch('/api/v1/ticket/pending');
  const { tickets } = await response.json();

  pendingLbl.innerHTML = tickets.length || 0;
};

loadInitialCount();
