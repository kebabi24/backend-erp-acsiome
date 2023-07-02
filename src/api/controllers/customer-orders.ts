import CustomerOrdersModel from '../../services/customer-orders';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op } from 'sequelize';
'use strict';
const nodemailer = require('nodemailer');

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_domain } = req.headers;

  try {
    const customerOrdersServiceInstance = Container.get(CustomerOrdersModel);
    const customersOrders = await customerOrdersServiceInstance.find({});
    console.log('here', customersOrders);
    return res.status(200).json({ message: 'fetched succesfully', data: customersOrders });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all customer endpoint');
  const { user_domain } = req.headers;

  try {
    const customerOrdersServiceInstance = Container.get(CustomerOrdersModel);
    const customer = await customerOrdersServiceInstance.findOne({ ...req.body, lad_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: customer });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all customer endpoint');
  const { user_domain } = req.headers;

  try {
    const customerOrdersServiceInstance = Container.get(CustomerOrdersModel);
    const customer = await customerOrdersServiceInstance.find({ ...req.body, lad_domain: 'acsiome' });
    console.log(customer);
    return res.status(200).json({ message: 'fetched succesfully', data: customer });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  findAll,
  findBy,
  findByAll,
};
