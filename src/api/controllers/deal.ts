import DealService from '../../services/deal';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create deal endpoint');
  try {
    const dealServiceInstance = Container.get(DealService);

    
    const data = req.body.data;
    const filedata = req.file;
    const jsonData = JSON.parse(data);
    console.log(filedata)
    const deal = await dealServiceInstance.create({
      deal_code: jsonData['deal_code'],
      deal_desc: jsonData['deal_desc'],
      deal_amt: jsonData['deal_amt'],
      deal_pen_cust: jsonData['deal_pen_cust'],
      deal_pen_prov: jsonData['deal_pen_prov'],
      deal_delai_cust: jsonData['deal_delai_cust'],
      deal_delai_prov: jsonData['deal_delai_prov'],
      deal_sign_cust: jsonData['deal_sign_cust'],
      deal_sign_prov: jsonData['deal_sign_prov'],
      deal_open: jsonData['deal_open'],
      deal_attach: filedata.path,
      deal_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
  
    // ADD TO AGENDA
    return res.status(201).json({ message: 'created succesfully', data: null });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  deal endpoint');
  try {
    const dealServiceInstance = Container.get(DealService);
    const { id } = req.params;
    const deal = await dealServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: deal });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
 
  const { user_domain } = req.headers;
  logger.debug('Calling find all deal endpoint');
  try {
    const dealServiceInstance = Container.get(DealService);
    const deals = await dealServiceInstance.find({ deal_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: deals });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all deal endpoint');
  const { user_domain } = req.headers;
  try {
    const dealServiceInstance = Container.get(DealService);
    const deals = await dealServiceInstance.find({ ...req.body, deal_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: deals });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all deal endpoint');
  const { user_domain } = req.headers;
  
  try {
    const dealServiceInstance = Container.get(DealService);
    const deals = await dealServiceInstance.findOne({ ...req.body, deal_domain: user_domain });

    return res.status(200).json({ message: 'fetched succesfully', data: deals });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  deal endpoint');
  try {
    const dealServiceInstance = Container.get(DealService);
    const { id } = req.params;
    const deal = await dealServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: deal });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  deal endpoint');
  try {
    const dealServiceInstance = Container.get(DealService);
    const { id } = req.params;
    const deal = await dealServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
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
};
