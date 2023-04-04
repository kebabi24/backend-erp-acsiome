import OrdersHistory from '../../services/orders-history';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
  const{user_domain} = req.headers

  logger.debug('Calling Create ordersHistory endpoint');
  try {
    const OrdersHistoryServiceInstance = Container.get(OrdersHistory);
    const ordersHistory = await OrdersHistoryServiceInstance.create({ ...req.body,domain:user_domain });
    return res.status(201).json({ message: 'created succesfully', data: ordersHistory });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all ordersHistory endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const OrdersHistoryServiceInstance = Container.get(OrdersHistory);
    const ordersHistory = await OrdersHistoryServiceInstance.find({domain:user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: ordersHistory });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  findAll,
};
