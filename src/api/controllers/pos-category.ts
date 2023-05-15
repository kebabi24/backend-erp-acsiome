import PosCategory from '../../services/pos-categories';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create category endpoint');
  try {
    const PosCategoryServiceInstance = Container.get(PosCategory);
    const category = await PosCategoryServiceInstance.create({ ...req.body, domain: user_domain });
    return res.status(201).json({ message: 'created succesfully', data: category });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  category endpoint');
  try {
    const PosCategoryServiceInstance = Container.get(PosCategory);
    const { id } = req.params;
    const category = await PosCategoryServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: category });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOneByCode = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  category endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosCategoryServiceInstance = Container.get(PosCategory);
    const { code } = req.params;
    const category = await PosCategoryServiceInstance.findOneByCode(code);
    return res.status(200).json({ message: 'fetched succesfully', data: category });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all category endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosCategoryServiceInstance = Container.get(PosCategory);
    const category = await PosCategoryServiceInstance.find({ domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: category });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all category endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosCategoryServiceInstance = Container.get(PosCategory);
    const category = await PosCategoryServiceInstance.findOne({ ...req.body, domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: category });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  logger.debug('Calling update one  category endpoint');
  try {
    const MobileServiceInstance = Container.get(PosCategory);
    const { id } = req.params;
    const category = await MobileServiceInstance.update({ ...req.body }, { id });
    return res.status(200).json({ message: 'fetched succesfully', data: category });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  category endpoint');
  try {
    const PosCategoryServiceInstance = Container.get(PosCategory);
    const { id } = req.params;
    const category = await PosCategoryServiceInstance.delete({ id });
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
  findOneByCode,
};
