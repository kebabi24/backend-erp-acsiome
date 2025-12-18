import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import express from 'express';
// const express = require('express');
const multer = require('multer');
const path = require('path');
import Logger from './loaders/logger';
import { setTimeout } from 'timers';
import { emit } from 'process';
import fs from "fs";
import userMobileController from './api/controllers/user-mobile';
import authController from './api/controllers/auth';

import argon2 from "argon2"
async function startServer() {
  const app = express();
  const uploadsPath = path.resolve(__dirname, '../uploads');
  
  app.use(config.api.prefix + '/uploads', express.static(uploadsPath));
  app.get(config.api.prefix +"/images-list", (req, res) => {
    const folderPath = path.resolve(__dirname, '../uploads');//path.join(__dirname, "uploads");
  
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        return res.status(500).json({ error: "Cannot read uploads folder" });
      }
  
      // Return only image files
      const images = files.filter(f =>
        f.match(/\.(png|jpg|jpeg|webp|gif)$/i)
      );
  
      res.json({
        baseUrl: config.api.prefix + '/uploads',
        images
      });
    });
  });
 // app.use("/uploads", express.static(path.join(process.cwd(), "./uploads")));
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
  //console.log(macip = data[0].mac)
    const fs = require('node:fs');
    const keydata = fs.readFileSync('key.key', 'utf8');
    const multer = require('multer');
  verifyPass(keydata, macip)
    .then(isValid => {
        if (isValid) {
     // Now, images can be accessed via http://localhost:PORT/uploads/image-filename.jpg

    // Serve static files from the 'public/images' directory
  //  app.use(express.static('../uploads'));

    // OR, to use a virtual path prefix (recommended)
    // Files in the 'uploads' folder will be accessible via '/images' URL prefix
   // app.use( express.static(path.resolve(__dirname,"../uploads")));

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
        
         
        // Serve static files from the 'public/images' directory
  
          const io = require('socket.io')(server);
          io.on('connection',userMobileController.getDataBack)

          //  io.on('createOrder', authController.getNotifications) 
  //          socket => {
  

  //   socket.on('createOrder', data => authController.getNotifications(socket, data);

  //   socket.on('disconnect', () => );
  // });
        
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
