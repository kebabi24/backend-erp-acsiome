import PosCategoryProduct from '../../services/pos-category-product';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create category product endpoint');
  try {
    const PosCategoryProductServiceInstance = Container.get(PosCategoryProduct);
    const category_product = await PosCategoryProductServiceInstance.create({ ...req.body,domain:user_domain });
    return res.status(201).json({ message: 'created succesfully', data: category_product });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  category product endpoint');
  try {
    const PosCategoryProductServiceInstance = Container.get(PosCategoryProduct);
    const { id } = req.params;
    const category_product = await PosCategoryProductServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: category_product });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all category product endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const PosCategoryProductServiceInstance = Container.get(PosCategoryProduct);
    const category_product = await PosCategoryProductServiceInstance.find({domain:user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: category_product });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all category  p endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosCategoryProductServiceInstance = Container.get(PosCategoryProduct);
    const category_product = await PosCategoryProductServiceInstance.find({ ...req.body,domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: category_product });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  logger.debug('Calling update one  category p endpoint');
  try {
    const PosCategoryProductServiceInstance = Container.get(PosCategoryProduct);
    const { id } = req.params;
    const category_product = await PosCategoryProductServiceInstance.update({ ...req.body }, { id });
    return res.status(200).json({ message: 'fetched succesfully', data: category_product });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  category p  endpoint');
  try {
    const PosCategoryProductServiceInstance = Container.get(PosCategoryProduct);
    const { id } = req.params;
    const category = await PosCategoryProductServiceInstance.delete({ id });
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
