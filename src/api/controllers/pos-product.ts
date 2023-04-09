import PosProduct from '../../services/pos-product';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;


  logger.debug('Calling Create category endpoint');
  try {
    const PosProductServiceInstance = Container.get(PosProduct);
    const product = await PosProductServiceInstance.create({ ...req.body,domain:user_domain });
    return res.status(201).json({ message: 'created succesfully', data: product });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  product endpoint');
  try {
    const PosProductServiceInstance = Container.get(PosProduct);
    const { id } = req.params;
    const product = await PosProductServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: product });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all product endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosProductServiceInstance = Container.get(PosProduct);
    const product = await PosProductServiceInstance.find({domain:user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: product });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all produuct endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosProductServiceInstance = Container.get(PosProduct);
    const product = await PosProductServiceInstance.findOne({ ...req.body,domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: product });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  logger.debug('Calling update one  product endpoint');
  try {
    const PosProductServiceInstance = Container.get(PosProduct);
    const { id } = req.params;
    const product = await PosProductServiceInstance.update({ ...req.body }, { id });
    return res.status(200).json({ message: 'fetched succesfully', data: product });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  product endpoint');
  try {
    const PosProductServiceInstance = Container.get(PosProduct);
    const { id } = req.params;
    const category = await PosProductServiceInstance.delete({ id });
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
  update,
  deleteOne,
};
