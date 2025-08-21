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
    const fs = require('fs');
    const keydata = fs.readFileSync('key.key', 'utf8');

   
  verifyPass(keydata, macip)
    .then(isValid => {
        if (isValid) {
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
        
          app.use('images', express.static('images'));
        
          const io = require('socket.io')(server);
          io.on('connection',userMobileController.getDataBack)
        
        } else {
            console.log('Activation error!');
        }
    })
    .catch(err => console.error(err));
  })
//   let is_valid = argon2.verify(macip, '14:ab:c5:08:78:ed')
//   console.log(is_valid)
//   if ( is_valid) {
//   const server = app.listen(config.port, err => {
//     if (err) {
//       Logger.error(err);

//       process.exit(1);
//       return;
//     }
//     Logger.info(`
//       ################################################ 
//       🛡️  Server listening on port: ${config.port} 🛡️ 
//       ################################################
//     `);
//   });

 

//   const io = require('socket.io')(server);
//   io.on('connection',userMobileController.getDataBack)

// } else { console.log('errrrrrrrrrrreur')}

  // io.on('connection', socket => {
  

    // socket.on('createOrder', data => posOrderController.createOrder(socket, data));

    // socket.on('disconnect', () => );
  // });
}

startServer();
async function verifyPass(storedHash, providedPassword) {
  try {
      // The verify function returns true if the password matches
      // It returns false if the password doesn't match
      const isValid = await argon2.verify(storedHash, providedPassword);
      return isValid;
  } catch (err) {
      // Handle errors like invalid hash format
      console.error('Error during Activation verification:', err);
      return false;
  }
}
