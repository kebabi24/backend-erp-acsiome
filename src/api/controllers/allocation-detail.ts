import AllocationDetailService from '../../services/allocation-detail';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op } from 'sequelize';
'use strict';
const nodemailer = require('nodemailer');

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  const{user_code} = req.headers 
const{user_domain} = req.headers

  logger.debug("Calling Create code endpoint")
  try {
      const allocationDetailServiceInstance = Container.get(AllocationDetailService)
      const lad = await allocationDetailServiceInstance.create({...req.body, bom_domain:user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
      return res
          .status(201)
          .json({ message: "created succesfully", data:  lad })
  } catch (e) {
      //#
      logger.error("🔥 error: %o", e)
      return next(e)
  }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_domain } = req.headers;

  try {
    const allocationDetailServiceInstance = Container.get(AllocationDetailService);
    const lads = await allocationDetailServiceInstance.find({});
    
    return res.status(200).json({ message: 'fetched succesfully', data: lads });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all Allocation endpoint');
  const { user_domain } = req.headers;

  try {
    const allocationDetailServiceInstance = Container.get(AllocationDetailService);
    const lads = await allocationDetailServiceInstance.findOne({ ...req.body, lad_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: lads });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all allocations endpoint');
  const { user_domain } = req.headers;

  try {
    const allocationDetailServiceInstance = Container.get(AllocationDetailService);
    const lads = await allocationDetailServiceInstance.find({ ...req.body, lad_domain: 'acsiome' });
   
    return res.status(200).json({ message: 'fetched succesfully', data: lads });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const getData = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all allocations endpoint');
  const { user_domain } = req.headers;

  try {

    // const allocationsOrdersServiceInstance = Container.get(allocationsOrdersModel);
    // const allocations = await allocationsOrdersServiceInstance.find({ ...req.body, lad_domain: 'acsiome' });
   
    return res.status(200).json({ message: 'fetched succesfully', data: null });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  findAll,
  findBy,
  findByAll,
  getData,
};
