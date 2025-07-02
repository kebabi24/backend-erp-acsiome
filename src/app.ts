import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import express from 'express';

import Logger from './loaders/logger';
import { setTimeout } from 'timers';
import { emit } from 'process';

import userMobileController from './api/controllers/user-mobile';
// import posOrderController from './api/controllers/pos-order';
import argon2 from "argon2"
async function startServer() {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require('./loaders').default({ expressApp: app });
  const si = require('systeminformation');
  let macip = ''
  
  si.networkInterfaces().then(data => {macip = data[0].mac+'axiom1983'
    var fs = require('node:fs');
    const keydata = fs.readFileSync('key.key', 'utf8');
// if(macip == '14:ab:c5:08:78:ed') {
  //macip = '$argon2id$v=19$m=4096,t=3,p=1$MTIzNDU2Nzg$Kchj5gqWurdXjFpRixxbx3avltQhdWhkEPnszad/6Po'




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
  // var fs = require('fs');
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
  });
}

startServer();
async function verifyPassword(storedHash, providedPassword) {
  try {
      // The verify function returns true if the password matches
      // It returns false if the password doesn't match
      const isValid = await argon2.verify(storedHash, providedPassword);
      return isValid;
  } catch (err) {
      // Handle errors like invalid hash format
      console.error('Error during password verification:', err);
      return false;
  }
}
