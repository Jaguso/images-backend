require('dotenv').config();
const http = require('http');


process
  .on('SIGTERM', shutdown('SIGTERM'))
  .on('SIGINT', shutdown('SIGINT'))
  .on('uncaughtException', shutdown('uncaughtException'));

// setInterval(console.log.bind(console, 'tick'), 1000);
// http.createServer((req, res) => res.end('hi'))
//   .listen(process.env.PORT || 3000, () => console.log('Listening'));

function shutdown(signal) {
  return (err) => {
    console.log(`${ signal }...`);
    if (err) console.error(err.stack || err);
    setTimeout(() => {
      console.log('...waited 5s, exiting.');
      process.exit(err ? 1 : 0);
    }, 5000).unref();
  };
}

const app = require('./app');


const port = process.env.PORT || 9000;

const server = http.createServer(app);

server.listen(port), console.log(`Works on port ${port}`);