const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function teamName(req, res, next) {
  req.team = 'Lambda Students';
  next();
}

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(teamName);
// server.use(moodyGateKeeper);
server.use(restricted);

server.use('/api/hubs', hubsRouter);

// function moodyGateKeeper(req, res, next) {
//   const seconds = new Date().getSeconds();
//
//   if (seconds % 3 === 0) {
//     res.status(403).json('none shall pass')
//   } else {
//     next();
//   }
// }

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});

function restricted(req, res, next) {
  const password = req.headers.authorization;

  if (password == 'mellon') {
    next();
  } else {
    res.status(401).json({
      message: 'You are not authorized'
    })
  }
}

// server.use(function (req, res) {
//   res.status(404).send(`Ain't nobody got time for dat!`)
// });

module.exports = server;
