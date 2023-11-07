import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/send-email';
const route = Router();

export default (app: Router) => {
  app.use('/sendMail', route);

  route.post('/', controller.sendContactMail);
};
