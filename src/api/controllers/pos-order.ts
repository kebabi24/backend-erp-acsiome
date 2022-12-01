import PosOrder from '../../services/pos-order';
import PosOrderDetail from '../../services/pos-order-detail-product';
import PosOrderProductSauce from '../../services/pos-order-product-sauce';
import PosOrderProductSupp from '../../services/pos-order-product-supp';
import PosOrderProductIng from '../../services/pos-order-product-ing';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
import ItemService from '../../services/item';
import CodeService from '../../services/code';
import SequenceService from '../../services/sequence';
import { isNull } from 'lodash';
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
    const SequenceServiceInstance = Container.get(SequenceService);
    const cart = req.body.cart;
    console.log(cart);
    const total_price = req.body.cart.total_price;
    const products = req.body.cart.products;
    const sequence = await SequenceServiceInstance.findOne({ seq_seq: 'OP' });
    let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val) + 1}`;
    // console.log(cart.products);
    await PosOrderServiceInstance.create({
      order_code: nbr,
      total_price: cart.total_price,
      order_emp: cart.order_emp,
      status: cart.status,
      customer: cart.customer,
      created_date: new Date(),
      usrd_site: cart.usrd_site,
      loy_num: cart.loy_num,
      disc_amt: cart.disc_amt,
      del_comp: cart.del_comp,
      site_loc: cart.site_loc,
    });
    for (const product of products) {
      const { pt_part, pt_formule, pt_qty, pt_price, comment, pt_desc1, pt_bom_code, pt_article, line } = product;
      await PosOrderDetailServiceInstance.create({
        order_code: nbr,
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
          order_code: nbr,
          pt_part: pt_part,
          pt_pt_part: s.pt_part,
          pt_desc1: s.pt_desc1,
          pt_bom_code: s.pt_bom_code,
          pt_ord_qty: s.pt_ord_qty,
          pt_price: s.pt_price,
          usrd_site: cart.usrd_site,
        });
      }
      // console.log(sauce);
      for (const sa of sauce) {
        await PosOrderProductSauceServiceInstance.create({
          order_code: nbr,
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
          order_code: nbr,
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

const findAlll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all order endpoint');
  try {
    
    const PosOrderServiceInstance = Container.get(PosOrder);
    const order = await PosOrderServiceInstance.findW({});
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

    const orders = await PosOrderDetailServiceInstance.findspec({
      where: { usrd_site: req.body.usrd_site, created_date: req.body.created_date },
      attributes: ['pt_part', 'usrd_site','pt_desc1', [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty']],
      group: ['pt_part', 'usrd_site','pt_desc1'],
      raw: true,
    });

    let result = [];
     var i = 1;
    for (let ord of orders) {
    //  const items = await itemServiceInstance.findOne({ pt_part: ord.pt_part });
      result.push({
        id: i,
        part: ord.pt_part,
        desc1: ord.pt_desc1,
        ord_qty: ord.total_qty,
      });
      i = i + 1;
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findSumQtyPs = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const itemServiceInstance = Container.get(ItemService);

    const orders = await PosOrderDetailServiceInstance.findspec({
      where: { usrd_site: req.body.usrd_site, created_date: req.body.created_date },
      attributes: ['pt_part', 'usrd_site','pt_desc1', [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty']],
      group: ['pt_part', 'usrd_site','pt_desc1'],
      raw: true,
    });

    let result = [];
     var i = 1;
    for (let ord of orders) {
      const items = await itemServiceInstance.findOne({ pt_part: ord.pt_part });
      result.push({
        id: i,
        part: ord.pt_part,
        desc1: ord.pt_desc1,
        bom: items.pt_bom_code,
        ord_qty: ord.total_qty,
        prod_qty: ord.total_qty,
      });
      i = i + 1;
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findSumAmt = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const itemServiceInstance = Container.get(ItemService);
    const codeServiceInstance = Container.get(CodeService);

   if(req.body.usrd_site == "*") {
    var orders = await PosOrderDetailServiceInstance.findspec({
      where: { created_date: req.body.created_date },
      attributes: ['pt_part', 'usrd_site', [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty'],[Sequelize.fn('sum', Sequelize.col('pt_price_pos')), 'total_amt']],
      group: ['pt_part', 'usrd_site'],
      raw: true,
    });
   } else {
    var  orders = await PosOrderDetailServiceInstance.findspec({
      where: { usrd_site: req.body.usrd_site, created_date: req.body.created_date },
      attributes: ['pt_part', 'usrd_site', [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty'],[Sequelize.fn('sum', Sequelize.col('pt_price_pos')), 'total_amt']],
      group: ['pt_part', 'usrd_site'],
      raw: true,
    });
  }
    //console.log(orders);
    let result = [];
    var i = 1;
    for (let ord of orders) {
      const items = await itemServiceInstance.findOne({ pt_part: ord.pt_part });

      const parttypes = await codeServiceInstance.findOne({code_fldname: "pt_part_type" , code_value: items.pt_part_type})
      const groups = await codeServiceInstance.findOne({code_fldname: "pt_group" , code_value: items.pt_group})
      const promos = await codeServiceInstance.findOne({code_fldname: "pt_promo" , code_value: items.pt_promo})
     // console.log(parttypes,groups,promos)
      result.push({
        id: i,
        site:ord.usrd_site,
        part: ord.pt_part,
        desc1: items.pt_desc1,
        bom: items.pt_bom_code,
        ord_qty: ord.total_qty,
        prod_qty: ord.total_qty,
        amt: ord.total_amt,
        parttype: (isNull(parttypes)) ?  null : parttypes.code_cmmt ,
        group: (isNull(groups)) ?  null : groups.code_cmmt ,
        promo: (isNull(promos))?  null : promos.code_cmmt,
        size: items.pt_size,
      });
      i = i + 1;
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
  findSumQtyPs,
  findSumAmt,
  findByOrd,
  update,
  deleteOne,
  findAlll,
};
