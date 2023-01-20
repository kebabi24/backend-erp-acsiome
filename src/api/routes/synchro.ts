import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/synchro';
const route = Router();

export default (app: Router) => {
  app.use('/synchro', route);

  route.get('/', controller.synchro);
};
