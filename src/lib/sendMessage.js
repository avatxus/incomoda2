const sendMessage = (msg) => {
  const messenger = document.getElementById('messenger');
  messenger && (messenger.style['bottom'] = '0');
  const messengerInner = document.getElementById('messenger-inner');
  messengerInner && (messengerInner.innerHTML = msg);
  setTimeout(() => {
    const msg = document.getElementById('messenger');
    msg && (msg.style['bottom'] = '-100px');
  }, 7000);
};

export default sendMessage;
