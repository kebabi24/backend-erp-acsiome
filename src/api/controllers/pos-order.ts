import PosOrder from '../../services/pos-order';
import PosOrderDetail from '../../services/pos-order-detail-product';
import PosOrderProductSauce from '../../services/pos-order-product-sauce';
import PosOrderProductSupp from '../../services/pos-order-product-supp';
import PosOrderProductIng from '../../services/pos-order-product-ing';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
import ItemService from '../../services/item';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling Create order endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const PosOrderProductSuppServiceInstance = Container.get(PosOrderProductSupp);
    const PosOrderProductSauceServiceInstance = Container.get(PosOrderProductSauce);
    const PosOrderProductIngServiceInstance = Container.get(PosOrderProductIng);
    const cart = req.body.cart;
    const total_price = req.body.cart.total_price;
    const products = req.body.cart.products;
    await PosOrderServiceInstance.create({
      order_code: cart.code_cart,
      total_price: cart.total_price,
      order_emp: cart.order_emp,
      customer: cart.customer,
      created_date: new Date(),
      usrd_site: cart.usrd_site,
    });
    for (const product of products) {
      const { pt_part, pt_formule, pt_qty, pt_price, comment, pt_desc1, pt_bom_code, pt_article, line } = product;
      await PosOrderDetailServiceInstance.create({
        order_code: cart.code_cart,
        pt_part: pt_part,
        pt_formule: pt_formule,
        pt_size: comment,
        pt_desc1: pt_desc1,
        pt_bom_code: pt_bom_code,
        pt_article: pt_article,
        line: line,
        pt_qty_ord_pos: pt_qty,
        pt_price_pos: pt_price,
        usrd_site: cart.usrd_site,
        created_date: new Date(),
      });
      const supp = product.suppliments;
      const sauce = product.sauces;
      const ingredients = product.ingredients;
      for (const s of supp) {
        await PosOrderProductSuppServiceInstance.create({
          order_code: cart.code_cart,
          pt_part: pt_part,
          pt_pt_part: s.pt_part,
          pt_desc1: s.pt_desc1,
          pt_bom_code: s.pt_bom_code,
          pt_ord_qty: s.pt_ord_qty,
          pt_price: s.pt_price,
          usrd_site: cart.usrd_site,
        });
      }
      for (const sa of sauce) {
        await PosOrderProductSauceServiceInstance.create({
          order_code: cart.code_cart,
          pt_part: pt_part,
          pt_pt_part: sa.pt_part,
          pt_desc1: sa.pt_desc1,
          pt_bom_code: sa.pt_bom_code,
          pt_ord_qty: sa.pt_ord_qty,
          pt_price: sa.pt_price,
          usrd_site: cart.usrd_site,
        });
      }
      for (const i of ingredients) {
        await PosOrderProductIngServiceInstance.create({
          order_code: cart.code_cart,
          pt_part: pt_part,
          pt_pt_part: i.spec_code,
          pt_desc1: i.pt_desc1,
          pt_bom_code: i.pt_bom_code,
          pt_desc2: i.pt_desc2,
          pt_price: i.price,
          usrd_site: cart.usrd_site,
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


const findSumQty = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const itemServiceInstance = Container.get(ItemService);
    
    console.log(req.body)
    const orders = await PosOrderDetailServiceInstance.findspec({ 
     where: {usrd_site : req.body.usrd_site, created_date: req.body.created_date} 
        ,
       
      attributes: ['pt_part', 'usrd_site', [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty']],
      group: ['pt_part', 'usrd_site'],
      raw: true,
    })
    console.log(orders)
    let result = []
   var i = 1
    for (let ord of orders) {
      const items = await itemServiceInstance.findOne({pt_part : ord.pt_part})
      result.push({id: i,part:  ord.pt_part,desc1: items.pt_desc1, bom:items.pt_bom_code, ord_qty: ord.total_qty,  prod_qty: ord.total_qty})
      i = i + 1
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
/*const locationDetails = await locationDetailServiceInstance.findSpecial({
        where: {
          ld_part: item.pt_part,
          ld_site: { [Op.between]: [req.body.pt_site_1, req.body.pt_site_2] },
          ld_loc: { [Op.between]: [req.body.pt_loc_1, req.body.pt_loc_2] },
        },
        attributes: ['ld_part', 'ld_site', 'ld_loc', [Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'total_qty']],
        group: ['ld_part', 'ld_site', 'ld_loc'],
        raw: true,
      });*/

const findByOrd = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');
  try {
    const PosOrderDetailServiceInstance = Container.get(PosOrder);
    const order = await PosOrderDetailServiceInstance.findOrder({ ...req.body });
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
  findSumQty,
  findByOrd,
  update,
  deleteOne,
};
