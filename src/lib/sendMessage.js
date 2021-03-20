const sendMessage = (msg, timeout = 7000) => {
  const messenger = document.getElementById('messenger');
  messenger && (messenger.style['bottom'] = '0');
  const messengerInner = document.getElementById('messenger-inner');
  messengerInner && (messengerInner.innerHTML = msg);
  setTimeout(() => {
    const msg = document.getElementById('messenger');
    msg && (msg.style['bottom'] = '-100px');
  }, timeout);
};

export default sendMessage;
