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
import workOrderService from '../../services/work-order';
import workOrderDetailService from '../../services/work-order-detail';
import psService from '../../services/ps';
import mobileService from '../../services/mobile-service';
import inventoryTransactionService from '../../services/inventory-transaction';
import locationDetailService from '../../services/location-details';
import costSimulationService from '../../services/cost-simulation';
import { type } from 'os';
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
    const workOrderServiceInstance = Container.get(workOrderService);
    const workOrderDetailServiceInstance = Container.get(workOrderDetailService);
    const psServiceInstance = Container.get(psService);
    const SequenceServiceInstance = Container.get(SequenceService);
    const service = Container.get(mobileService);
    const inventoryTransactionServiceInstance = Container.get(inventoryTransactionService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const costSimulationServiceInstance = Container.get(costSimulationService);
    const itemServiceInstance = Container.get(ItemService);
    const cart = req.body.cart;
    // console.log(cart);
    const detail = [];
    const currentService = await service.findOne({ role_code: user_code, service_open: true });
    // console.log(currentService);
    // console.log(cart);
    const products = req.body.cart.products;
    const sequence = await SequenceServiceInstance.findOne({ seq_seq: 'OP', seq_profile: cart.usrd_name });
    let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val) + 1}`;
    // console.log(cart.products);
    await PosOrderServiceInstance.create({
      order_code: nbr,
      total_price: cart.total_price,
      order_emp: cart.order_emp,
      status: cart.status,
      customer: cart.customer,
      created_date: currentService.service_period_activate_date,
      usrd_site: cart.usrd_site,
      loy_num: cart.loy_num,
      disc_amt: cart.disc_amt,
      del_comp: cart.del_comp,
      site_loc: cart.site_loc,
    });
    await sequence.update(
      { seq_curr_val: Number(sequence.seq_curr_val) + 1 },
      { seq_seq: 'OP', seq_profile: cart.usrd_name },
    );
    const currentProduct = await PosOrderServiceInstance.findOne({ order_code: nbr });
    for (const product of products) {
      const { pt_part, pt_formule, pt_qty, pt_price, comment, pt_desc1, pt_bom_code, pt_article, line } = product;
      await PosOrderDetailServiceInstance.create({
        order_code: currentProduct.order_code,
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
        created_date: currentService.service_period_activate_date,
      });
      await workOrderServiceInstance.create({
        wo_nbr: currentProduct.order_code,
        wo_part: pt_part,
        wo_lot: line,
        wo_qty_ord: pt_qty,
        wo_bom_code: pt_bom_code,
        wo_ord_date: currentService.service_period_activate_date,
        wo_rel_date: currentService.service_period_activate_date,
        wo_due_date: currentService.service_period_activate_date,
        wo_status: 'R',
        wo_site: cart.usrd_site,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      const wOid = await workOrderServiceInstance.findOne({ wo_nbr: currentProduct.order_code, wo_lot: product.line });
      if (wOid.wo_bom_code != null) {
        const wo_bom_code = wOid.wo_bom_code;
        const ps = await psServiceInstance.find({ ps_parent: wo_bom_code });
        for (const pss of ps) {
          const elem_wod = {
            wod_nbr: currentProduct.order_code,
            wod_lot: wOid.id,
            wod_loc: product.pt_loc,
            wod_price: product.pt_price,
            wod_part: pss.ps_comp,
            wod_site: cart.usrd_site,
            wod_qty_req: ((pss.ps_qty_per / (pss.ps_scrp_pct / 100)) * product.pt_qty).toFixed(2),
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          };
          await workOrderDetailServiceInstance.create(elem_wod);
          detail.push(elem_wod);
        }
      } else {
        const elem_wod = {
          wod_nbr: currentProduct.order_code,
          wod_lot: wOid.id,
          wod_loc: product.pt_loc,
          wod_part: product.pt_part,
          wod_price: product.pt_price,
          wod_site: cart.usrd_site,
          wod_qty_req: product.pt_qty,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        };
        await workOrderDetailServiceInstance.create(elem_wod);
        detail.push(elem_wod);
      }
      const supp = product.suppliments;
      const sauce = product.sauces;
      const ingredients = product.ingredients;
      for (const s of supp) {
        await PosOrderProductSuppServiceInstance.create({
          order_code: currentProduct.order_code,
          pt_part: pt_part,
          pt_pt_part: s.pt_part,
          pt_desc1: s.pt_desc1,
          pt_bom_code: s.pt_bom_code,
          pt_ord_qty: s.pt_ord_qty,
          pt_price: s.pt_price,
          usrd_site: cart.usrd_site,
        });
        const elem_wod = {
          wod_nbr: currentProduct.order_code,
          wod_lot: wOid.id,
          wod_loc: s.pt_loc,
          wod_part: s.pt_part,
          wod_price: s.pt_price,
          wod_site: cart.usrd_site,
          wod_qty_req: s.pt_net_wt * product.pt_qty,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        };
        await workOrderDetailServiceInstance.create(elem_wod);
        detail.push(elem_wod);
      }
      // console.log(sauce);
      for (const sa of sauce) {
        await PosOrderProductSauceServiceInstance.create({
          order_code: currentProduct.order_code,
          pt_part: pt_part,
          pt_pt_part: sa.pt_part,
          pt_desc1: sa.pt_desc1,
          pt_bom_code: sa.pt_bom_code,
          pt_ord_qty: sa.pt_ord_qty,
          pt_price: sa.pt_price,
          usrd_site: cart.usrd_site,
        });
        const elem_wod = {
          wod_nbr: currentProduct.order_code,
          wod_lot: wOid.id,
          wod_loc: sa.pt_loc,
          wod_part: sa.pt_part,
          wod_price: sa.pt_price,
          wod_site: cart.usrd_site,
          wod_qty_req: sa.pt_net_wt * product.pt_qty,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        };
        await workOrderDetailServiceInstance.create(elem_wod);
        detail.push(elem_wod);
      }
      for (const i of ingredients) {
        await PosOrderProductIngServiceInstance.create({
          order_code: currentProduct.order_code,
          pt_part: pt_part,
          pt_pt_part: i.spec_code,
          pt_desc1: i.pt_desc1,
          pt_bom_code: i.pt_bom_code,
          pt_desc2: i.pt_desc2,
          pt_price: i.price,
          usrd_site: cart.usrd_site,
        });
        const wOd = await workOrderDetailServiceInstance.findOne({
          wod_nbr: currentProduct.order_code,
          wod_lot: wOid.id,
          wod_part: i.spec_code,
        });

        await workOrderDetailServiceInstance.update(
          { wod_qty_req: Number(0) },
          { wod_nbr: currentProduct.order_code, wod_lot: wOid.id, wod_part: i.spec_code },
        );
      }
    }

    for (const item of detail) {
      const sct = await costSimulationServiceInstance.findOne({
        sct_part: item.wod_part,
        sct_site: item.wod_site,
        sct_sim: 'STDCG',
      });

      const pt = await itemServiceInstance.findOne({ pt_part: item.wod_part });
      const ld = await locationDetailServiceInstance.findOne({
        ld_part: item.wod_part,
        ld_site: item.wod_site,
        ld_loc: item.wod_loc,
      });
      if (ld) {
        await locationDetailServiceInstance.update(
          {
            ld_qty_oh: Number(ld.ld_qty_oh) - Number(item.wod_qty_req),
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          },
          { id: ld.id },
        );
        await inventoryTransactionServiceInstance.create({
          tr_nbr: item.wod_nbr,
          tr_part: item.wod_part,
          tr_lot: item.wod_lot,
          tr_loc: item.wod_loc,
          tr_site: item.wod_site,
          tr_um_conv: 1,
          tr_gl_date: currentService.service_period_activate_date,
          tr_qty_loc: -1 * Number(item.wod_qty_req),
          tr_qty_chg: -1 * Number(item.wod_qty_req),
          tr_loc_begin: Number(ld.ld_qty_oh),
          tr_type: 'ISS-WO',
          tr_date: new Date(),
          tr_effdate: currentService.service_period_activate_date,
          tr_price: sct.sct_mtl_tl,
          tr_mtl_std: sct.sct_mtl_tl,
          tr_lbr_std: sct.sct_lbr_tl,
          tr_bdn_std: sct.sct_bdn_tl,
          tr_ovh_std: sct.sct_ovh_tl,
          tr_sub_std: sct.sct_sub_tl,
          tr_prod_line: pt.pt_prod_line,
          tr_gl_amt: Number(item.wod_qty_req) * Number(item.wod_price),
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });
      }
      // if (!isNaN(item.wodid)) {
      //   const wod = await workOrderDetailServiceInstance.findOne({ id: item.wodid });
      //   if (wod) {
      //     var bool = false;

      //     if (
      //       Number(wod.wod_qty_req) - (Number(wod.wod_qty_iss) + Number(item.tr_qty_loc) * Number(item.tr_um_conv)) >=
      //       0
      //     ) {
      //       bool = true;
      //     }
      //     await workOrderDetailServiceInstance.update(
      //       {
      //         wod__qadl01: true ? bool : false,
      //         wod_qty_iss: Number(wod.wod_qty_iss) + Number(item.tr_qty_loc) * Number(item.tr_um_conv),
      //         last_modified_by: user_code,
      //         last_modified_ip_adr: req.headers.origin,
      //       },
      //       { id: wod.id },
      //     );
      //   }
      // } else {
      //   await workOrderDetailServiceInstance.create({
      //     wod_nbr: it.tr_nbr,
      //     wod_lot: it.tr_lot,
      //     wod_part: item.tr_part,
      //     wod_qty_req: 0,
      //     wod_qty_iss: item.tr_qty_loc,
      //     wod_site: item.tr_site,
      //     wod_loc: item.tr_loc,
      //     wod_um: item.tr_um,
      //     wod_serial: item.tr_serial,
      //     wod_ref: item.tr_ref,
      //     wod__qadl01: true,
      //   });
      // }
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
    const { user } = req.body;
    const { user_code } = req.headers;
    const service = Container.get(mobileService);
    const currentService = await service.findOne({ role_code: user_code, service_open: true });
    console.log(currentService);

    const PosOrderServiceInstance = Container.get(PosOrder);
    const order = await PosOrderServiceInstance.find({
      status: 'N',
      created_date: currentService.service_period_activate_date,
    });

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
      attributes: [
        'pt_part',
        'usrd_site',
        'pt_desc1',
        [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty'],
      ],
      group: ['pt_part', 'usrd_site', 'pt_desc1'],
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
      attributes: [
        'pt_part',
        'usrd_site',
        'pt_desc1',
        [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty'],
      ],
      group: ['pt_part', 'usrd_site', 'pt_desc1'],
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

    if (req.body.usrd_site == '*') {
      var orders = await PosOrderDetailServiceInstance.findspec({
        where: { created_date: req.body.created_date },
        attributes: [
          'pt_part',
          'usrd_site',
          [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty'],
          [Sequelize.fn('sum', Sequelize.col('pt_price_pos')), 'total_amt'],
        ],
        group: ['pt_part', 'usrd_site'],
        raw: true,
      });
    } else {
      var orders = await PosOrderDetailServiceInstance.findspec({
        where: { usrd_site: req.body.usrd_site, created_date: req.body.created_date },
        attributes: [
          'pt_part',
          'usrd_site',
          [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty'],
          [Sequelize.fn('sum', Sequelize.col('pt_price_pos')), 'total_amt'],
        ],
        group: ['pt_part', 'usrd_site'],
        raw: true,
      });
    }
    //console.log(orders);
    let result = [];
    var i = 1;
    for (let ord of orders) {
      const items = await itemServiceInstance.findOne({ pt_part: ord.pt_part });

      const parttypes = await codeServiceInstance.findOne({
        code_fldname: 'pt_part_type',
        code_value: items.pt_part_type,
      });
      const groups = await codeServiceInstance.findOne({ code_fldname: 'pt_group', code_value: items.pt_group });
      const promos = await codeServiceInstance.findOne({ code_fldname: 'pt_promo', code_value: items.pt_promo });
      // console.log(parttypes,groups,promos)
      result.push({
        id: i,
        site: ord.usrd_site,
        part: ord.pt_part,
        desc1: items.pt_desc1,
        bom: items.pt_bom_code,
        ord_qty: ord.total_qty,
        prod_qty: ord.total_qty,
        amt: ord.total_amt,
        parttype: isNull(parttypes) ? null : parttypes.code_cmmt,
        group: isNull(groups) ? null : groups.code_cmmt,
        promo: isNull(promos) ? null : promos.code_cmmt,
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
