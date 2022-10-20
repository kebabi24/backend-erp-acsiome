import PosOrder from '../../services/pos-order';
import PosOrderDetail from '../../services/pos-order-detail';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling Create order endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const cart = req.body.cart;
    const total_price = req.body.cart.total_price;
    const products = req.body.cart.products;
    await PosOrderServiceInstance.create({
      order_code: cart.code_cart,
      total_price: cart.total_price,
      order_emp: cart.order_emp,
      customer: cart.customer,
      created_date: new Date(),
    });
    for (const product of products) {
      const { pt_part, pt_qty, pt_price } = product;
      let supps = product.suppliments;
      let ing = product.ingredients;
      for (const supp of supps) {
        await PosOrderDetailServiceInstance.create({
          order_code: cart.code_cart,
          pt_part: pt_part,
          pt_part_det: supp.pt_part,
          pt_qty_ord: pt_qty,
          pt_price: pt_price,
          created_date: new Date(),
        });
      }
    }
    return res.status(201).json({ message: 'created succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  order endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const { id } = req.params;
    const order = await PosOrderServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: order });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all order endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const order = await PosOrderServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: order });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const order = await PosOrderServiceInstance.findOne({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: order });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByOrd = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');
  try {
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const order = await PosOrderDetailServiceInstance.find({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: order });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  logger.debug('Calling update one  order endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const { id } = req.params;
    const order = await PosOrderServiceInstance.update({ ...req.body }, { id });
    return res.status(200).json({ message: 'fetched succesfully', data: order });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  product endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const { id } = req.params;
    const category = await PosOrderServiceInstance.delete({ id });
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
  findByOrd,
  update,
  deleteOne,
};
