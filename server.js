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

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});

// server.use(function (req, res) {
//   res.status(404).send(`Ain't nobody got time for dat!`)
// });

module.exports = server;
