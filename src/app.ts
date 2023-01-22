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

  const server = app.listen(config.port, err => {
    if (err) {
      Logger.error(err);

      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################ 
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });

  const io = require('socket.io')(server);
  io.on('connection', socket => {
    console.log('new connection');

    socket.on('createOrder', data => posOrderController.createOrder(socket, data));

    socket.on('disconnect', () => console.log('disconnected'));
  });
}

startServer();
