import ExchangeRateService from '../../services/exchange-rate';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op } from 'sequelize';
import exchangeRate from '../routes/exchange-rate';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
const{user_domain} = req.headers

  logger.debug('Calling Create exchangeRate endpoint');
  try {
    const exchangeRateServiceInstance = Container.get(ExchangeRateService);
    const exchangeRate = await exchangeRateServiceInstance.create({...req.body, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin});
    return res.status(201).json({ message: 'created succesfully', data: exchangeRate });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  exchangeRate endpoint');
  try {
    const exchangeRateServiceInstance = Container.get(ExchangeRateService);
    const { id } = req.params;
    const exchangeRate = await exchangeRateServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: exchangeRate });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all exchangeRate endpoint');
  try {
    const exchangeRateServiceInstance = Container.get(ExchangeRateService);
    const exchangeRates = await exchangeRateServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: exchangeRates });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all exchangeRate endpoint');
  try {
    const exchangeRateServiceInstance = Container.get(ExchangeRateService);
    const exchangeRates = await exchangeRateServiceInstance.find({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: exchangeRates });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all exchangeRate endpoint');
  try {
    const exchangeRateServiceInstance = Container.get(ExchangeRateService);
    const exchangeRate = await exchangeRateServiceInstance.findOne({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: exchangeRate });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
const{user_domain} = req.headers
  logger.debug('Calling update one  exchangeRate endpoint');
  try {
    const exchangeRateServiceInstance = Container.get(ExchangeRateService);
    const { id } = req.params;
    const exchangeRate = await exchangeRateServiceInstance.update({ ...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }, { id });
    return res.status(200).json({ message: 'fetched succesfully', data: exchangeRate });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  exchangeRate endpoint');
  try {
    const exchangeRateServiceInstance = Container.get(ExchangeRateService);
    const { id } = req.params;
    const exchangeRate = await exchangeRateServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getExRate = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  try {
    const exchangeRateServiceInstance = Container.get(ExchangeRateService);
    const { exr_curr1, exr_curr2, date } = req.body;
    // console.log(req.body)
    //console.log(date);
    const exchangeRates = await exchangeRateServiceInstance.findOne({
      exr_curr1,
      exr_curr2,
      exr_start_date: {
        [Op.lte]: date,
      },
      exr_end_date: {
        [Op.gte]: date,
      },
    });
    //console.log('aa', exchangeRates);
    return res.status(200).json({ message: 'fetched succesfully', data: exchangeRates });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  findOne,
  findAll,
  findBy,
  findByOne,
  update,
  deleteOne,
  getExRate,
};
