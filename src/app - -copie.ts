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
   io.on('connection',userMobileController.getDataBack)
   // io.on('connection', socket => {
   //   console.log('new connection');
 
     // socket.on('createOrder', data => posOrderController.createOrder(socket, data));
 
     // socket.on('disconnect', () => console.log('disconnected'));
   // });
 }
 
 startServer();
 