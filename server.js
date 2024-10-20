const http = require('http');

const orderStatuses = [
  'Замовлення отримано',
  'Готуємо піцу',
  'Піца у духовці',
  'Піца готова!',
  'Доставляється',
  'Замовлення доставлено'
];

let currentStatusIndex = 0;

const server = http.createServer((req, res) => {

  if (req.url === '/pizza-tracker') {  
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    const sendStatus = () => {
      if (currentStatusIndex < orderStatuses.length) {
        const status = orderStatuses[currentStatusIndex];
        res.write(`data: ${status}\n\n`);
        currentStatusIndex++;
      } else {
        res.end();
      }
    };

    const intervalId = setInterval(sendStatus, 3000);

    req.on('close', () => {
      clearInterval(intervalId);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
