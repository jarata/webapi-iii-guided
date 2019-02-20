const express = require('express'); // importing a CommonJS module

// Global 3rd Party middleWare
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function teamName(req, res, next) {
  req.team = 'Lambda Students';
  next();
}

// server.use must be above the req to the server in order to function
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
// notice that local middleWare doesnt need to be 'called'
server.use(teamName);
// server.use(moodyGateKeeper);
server.use(restricted);
// you can chain middleware and pass in arguements
server.use('/api/hubs', restricted, only('frodo'));
server.use(errorHandler)


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

// student solution
function only (name) {
    return function(req, res, next) {
        const myName = req.headers.name;

        if (myName === name) {
            next();
        } else {
            res.status(403).json('Not Today!')
        }
    }
}

// function only(name) {
//     return function(req, res, next) {
//         if (name === 'frodo') {
//             next();
//         } else {
//             res.status(401).json({
//                 message: 'Not Frodo!'
//             })
//         }
//     }
// }

// function restricted(req, res, next) {
//   const password = req.headers.banana;
//
//   if (password === 'mellon') {
//     next();
//   } else {
//     res.status(401).json({
//       message: 'You are not authorized'
//     })
//   }
// }
// function restricted(req, res, next) {
//     const password = req.headers.authorization;
//
//     if (password === 'mellon') {
//         next();
//     } else {
//         res.status(401).json({message: 'You are not authorized'})
//     }
// }

// it should accept a 'name' as its only argument and return 'middleware' that returns a 403 status code if
// 'req.headers.name' is different from the name specified

function restricted(req, res, next) {
    const password = req.headers.authorization;

    if (req.headers && req.headers.authorization) {
        if (password === 'mellon') {
            next();
        } else {
            // fire the next error handler mdilldeware in the chain
            next({
                message: 'no authorization header provided'
            })
        }
    }
}

function errorHandler(error, req, res, next) {
    res.status(400).json({
        message: 'Error', error
    })
}
// server.use(function (req, res) {
//   res.status(404).send(`Ain't nobody got time for dat!`)
// });

module.exports = server;
//
// const express = require('express'); // importing a CommonJS module
// const helmet = require('helmet');
// const morgan = require('morgan')
//
// const hubsRouter = require('./hubs/hubs-router.js');
//
// const server = express();
//
//
//
// server.use(express.json());
// server.use(helmet());
// server.use(morgan('dev'))
// server.use(teamName);
// //server.use(moodyGatekeeper);
// server.use(restricted);
//
//
//
//
// server.use('/api/hubs', hubsRouter);
//
// server.get('/', (req, res, next) => {
//     res.send(`
//     <h2>Lambda Hubs API</h2>
//     <p>Welcome ${req.team} to the Lambda Hubs API</p>
//     `);
// });
//
// function restricted(req, res, next) {
//     const password = req.headers.authorization;
//
//     if (password === 'mellon') {
//         next();
//     } else {
//         res.status(401).json({message: 'You are not authorized'})
//     }
// }
//
// function teamName(req, res, next) {
//     req.team = 'Lambda Students';
//
//     next()
// }
//
// // function moodyGatekeeper(req,res,next) {
// //   const seconds = new Date().getSeconds();
//
// //   if (seconds % 3 === 0) {
// //      res.status(403).json('none shall pass!')
// //   } else {
// //     next ();
// //   }
// // }
//
//
//
//
//
// // server.use((req, res) => {
// //   res.status(404).send('Aint nobody got time for that!')
// // })
//
// module.exports = server;