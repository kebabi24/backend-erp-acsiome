import PriceListQuantityService from '../../services/price-list-quantity';
import PriceListQuantityDetailService from '../../services/price-list-quantity-detail';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { QueryTypes } from 'sequelize';
import { Op } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const priceListQuantityServiceInstance = Container.get(PriceListQuantityService);
    const priceListQuantityDetailServiceInstance = Container.get(PriceListQuantityDetailService);
    const { PriceListQuantity, PriceListQuantityDetails } = req.body;
    const pl = await priceListQuantityServiceInstance.create({
      ...PriceListQuantity,
      plq_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    for (let entry of PriceListQuantityDetails) {
      entry = {
        ...entry,
        plqd_code: PriceListQuantity.plq_code,
        plqd_domain: user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
      };
      await priceListQuantityDetailServiceInstance.create(entry);
    }
    return res.status(201).json({ message: 'created succesfully', data: pl });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling find by  all job endpoint');

  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const priceListQuantityServiceInstance = Container.get(PriceListQuantityService);
    const priceListQuantityDetailServiceInstance = Container.get(PriceListQuantityDetailService);
    const plq = await priceListQuantityServiceInstance.findOne({
      ...req.body,
      plq_domain: user_domain,
    });

    if (plq) {
      const details = await priceListQuantityDetailServiceInstance.find({
        plqd_code: plq.plq_code,
        plqd_domain: user_domain,
      });
      return res.status(200).json({
        message: 'fetched succesfully',
        data: { plq, details },
      });
    } else {
      return res.status(200).json({
        message: 'not FOund',
        data: { plq, details: null },
      });
    }
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    console.log("here",req.body)
    const logger = Container.get('logger');
  
    logger.debug('Calling find by  all job endpoint');
  
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
    try {
      const priceListQuantityServiceInstance = Container.get(PriceListQuantityService);
      const priceListQuantityDetailServiceInstance = Container.get(PriceListQuantityDetailService);
      console.log(req.body)
      
      const plq = await priceListQuantityServiceInstance.findOne({
        plq_max_qty:{[Op.gte]: req.body.qty},
        plq_min_qty:{[Op.lte]: req.body.qty},
        plq_domain: user_domain,
      });
  
      if (plq) {
        const details = await priceListQuantityDetailServiceInstance.find({
          plqd_code: plq.plq_code,
          plqd_domain: user_domain,
        });
        return res.status(200).json({
          message: 'fetched succesfully',
          data: { plq, details },
        });
      } else {
        return res.status(200).json({
          message: 'not FOund',
          data: { plq, details: null },
        });
      }
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  job endpoint');

  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const priceListQuantityServiceInstance = Container.get(PriceListQuantityService);
    const { id } = req.params;
    const plq = await priceListQuantityServiceInstance.findOne({ id });
    const priceListQuantityDetailServiceInstance = Container.get(PriceListQuantityDetailService);
    const details = await priceListQuantityDetailServiceInstance.find({
      plqd_code: plq.plq_code,
      plqd_domain: user_domain,
    });

    return res.status(200).json({
      message: 'fetched succesfully',
      data: { plq, details },
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all job endpoint');

  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const priceListQuantityServiceInstance = Container.get(PriceListQuantityService);
    const plqs = await priceListQuantityServiceInstance.find({ plq_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: plqs });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  job endpoint');
  try {
    const priceListQuantityServiceInstance = Container.get(PriceListQuantityService);
    const priceListQuantityDetailServiceInstance = Container.get(PriceListQuantityDetailService);
    const { id } = req.params;
    const { PriceListQuantity, details } = req.body;
    const plq = await priceListQuantityServiceInstance.update(
      { ...PriceListQuantity, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    await priceListQuantityDetailServiceInstance.delete({ plqd_code: PriceListQuantity.plq_code, plqd_domain: user_domain });
    for (let entry of details) {
      entry = {
        ...entry,
        plqd_code: PriceListQuantity.plq_code,
        plqd_domain: user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await priceListQuantityDetailServiceInstance.create(entry);
    }
    return res.status(200).json({ message: 'fetched succesfully', data: plq });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByDet = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  logger.debug('Calling find by  all job endpoint');
  try {
    //  const priceListQuantityServiceInstance = Container.get(PriceListQuantityService)
    const priceListQuantityDetailServiceInstance = Container.get(PriceListQuantityDetailService);
    const plqdet = await priceListQuantityDetailServiceInstance.find({
      ...req.body,
    });
    return res.status(200).json({ message: 'fetched succesfully', data: plqdet });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


export default {
  create,
  findBy,
  findByOne,
  findByDet,
  findOne,
  findAll,
  update,
};
