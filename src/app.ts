import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import express from 'express';

import Logger from './loaders/logger';
import { setTimeout } from 'timers';
import { emit } from 'process';

import userMobileController from './api/controllers/user-mobile';
import posOrderController from './api/controllers/pos-order';

async function startServer() {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require('./loaders').default({ expressApp: app });

  // var server = app.listen(config.port, err => {
  //   if (err) {
  //     Logger.error(err);

  //     process.exit(1);
  //     return;
  //   }
  //   Logger.info(`
  //     ################################################ 
  //     🛡️  Server listening on port: ${config.port} 🛡️ 
  //     ################################################
  //   `);
  // });
  var fs = require('fs');
  var http = require('http');
  var https = require('https');
  // var privatekey =fs.readFileSync('sslcert/server.key','utf8');
  // var certificate = fs.readFileSync('sslcert/server.crt','utf8');
  // var credentials = {key:'Palmary',cert:certificate};
  //your express configuration here
  var httpserver = http.createServer(app).listen(config.port);
  var server =https.createServer(app).listen(3000);
  Logger.info(`
         ################################################ 
         🛡️  Server listening on port: ${config.port} 🛡️ 
         ################################################
       `);

  const io = require('socket.io')(httpserver);
  io.on('connection',userMobileController.getDataBack)
  // io.on('connection', socket => {
  

    // socket.on('createOrder', data => posOrderController.createOrder(socket, data));

    // socket.on('disconnect', () => );
  // });
}

startServer();
