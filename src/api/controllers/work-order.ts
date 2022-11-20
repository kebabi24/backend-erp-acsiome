import WorkOrderService from '../../services/work-order';
import WoroutingService from '../../services/worouting';
import WorkroutingService from '../../services/workrouting';
import ItemService from '../../services/item';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { result } from 'lodash';
import { IntegerDataType } from 'sequelize/types';
import psService from '../../services/ps';
import workOrderDetailService from '../../services/work-order-detail';
import { Console } from 'console';
import sequenceService from '../../services/sequence';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const { detail, it, nof } = req.body;
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const woroutingServiceInstance = Container.get(WoroutingService);
    const workroutingServiceInstance = Container.get(WorkroutingService);
    const itemServiceInstance = Container.get(ItemService);

    for (const item of detail) {
      let wolot = 0;

      await workOrderServiceInstance
        .create({
          ...item,
          ...it,
          wo_nbr: nof,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        })
        .then(result => {
          wolot = result.id;
        });
      const ros = await workroutingServiceInstance.find({ ro_routing: it.wo_routing });
      for (const ro of ros) {
        await woroutingServiceInstance.create({
          wr_nbr: nof,
          wr_lot: wolot,
          wr_start: item.wo_rel_date,
          wr_routing: ro.ro_routing,
          wr_wkctr: ro.ro_wkctr,
          wr_mch: ro.ro_mch,
          wr_status: 'F',
          wr_part: item.wo_part,
          wr_site: item.wo_site,
          wr_op: ro.ro_op,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });
      }
    }
    return res.status(200).json({ message: 'deleted succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const createPosWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const workOrderDetailServiceInstance = Container.get(workOrderDetailService);
    const psServiceInstance = Container.get(psService);
    const itemServiceInstance = Container.get(ItemService);
    const SequenceServiceInstance = Container.get(sequenceService);
    const sequence = await SequenceServiceInstance.findOne({ seq_seq: 'OP' });
    let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val) + 1}`;
    const order_code = req.body.cart.order_code;
    const { usrd_site } = req.body.cart;
    const products = req.body.cart.products;
    console.log(products);
    for (const product of products) {
      const { pt_part, pt_qty, pt_bom_code, line } = product;

      await workOrderServiceInstance.create({
        wo_nbr: nbr,
        wo_part: pt_part,
        wo_lot: line,
        wo_qty_ord: pt_qty,
        wo_bom_code: pt_bom_code,
        wo_ord_date: new Date(),
        wo_rel_date: new Date(),
        wo_due_date: new Date(),
        wo_status: 'R',
        wo_site: usrd_site,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      const wOid = await workOrderServiceInstance.findOne({ wo_nbr: nbr, wo_lot: product.line });
      if (wOid) {
        let ps_parent = product.pt_bom_code;

        const ps = await psServiceInstance.find({ ps_parent });
        console.log(ps);
        if (ps.length > 0) {
          console.log('ps l dakhel f if', ps);

          for (const pss of ps) {
            // console.log(pss.ps_scrp_pct);
            await workOrderDetailServiceInstance.create({
              wod_nbr: nbr,
              wod_lot: wOid.id,
              wod_loc: product.pt_loc,
              wod_part: pss.ps_comp,
              wod_site: usrd_site,
              wod_qty_req:
                (parseFloat(pss.ps_qty_per) / (parseFloat(pss.ps_scrp_pct) / 100)) * parseFloat(product.pt_qty),
              created_by: user_code,
              created_ip_adr: req.headers.origin,
              last_modified_by: user_code,
              last_modified_ip_adr: req.headers.origin,
            });
          }
        } else {
          console.log('ps f else', ps);
          await workOrderDetailServiceInstance.create({
            wod_nbr: nbr,
            wod_lot: wOid.id,
            wod_loc: product.pt_loc,
            wod_part: product.pt_part,
            wod_site: usrd_site,
            wod_qty_req: parseFloat(product.pt_qty),
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
        }

        // console.log(product);
        const supp = product.suppliments;
        for (const s of supp) {
          const s_part = s.pt_part;
          // console.log(s_part);
          await workOrderDetailServiceInstance.create({
            wod_nbr: nbr,
            wod_lot: wOid.id,
            wod_loc: s.pt_loc,
            wod_part: s_part,
            wod_site: usrd_site,
            wod_qty_req: parseFloat(s.pt_net_wt) * parseFloat(product.pt_qty),
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
        }
        const sauce = product.sauces;
        console.log(sauce);
        for (const sa of sauce) {
          const sa_part = sa.pt_part;
          await workOrderDetailServiceInstance.create({
            wod_nbr: nbr,
            wod_lot: wOid.id,
            wod_loc: sa.pt_loc,
            wod_part: sa_part,
            wod_site: usrd_site,
            wod_qty_req: parseFloat(sa.pt_net_wt) * parseFloat(product.pt_qty),
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
        }
        const ing = product.ingredients;
        if (ing.length > 0) {
          for (const g of ing) {
            const wOd = await workOrderDetailServiceInstance.findOne({
              wod_nbr: nbr,
              wod_lot: wOid.id,
              wod_part: g.spec_code,
            });

            await workOrderDetailServiceInstance.update(
              { wod_qty_req: Number(0) },
              { wod_nbr: nbr, wod_lot: wOid.id, wod_part: g.spec_code },
            );

            // const ing_part = g.pt_part;
            // console.log(ing_part);
            // await workOrderDetailServiceInstance.create({
            //   wod_nbr: req.body.cart.order_code,
            //   wod_lot: wOid.id,
            //   wod_loc: g.pt_loc,
            //   wod_part: ing_part,
            //   wod_site: usrd_site,
            //   wod_qty_req: 0,
            //   created_by: user_code,
            //   created_ip_adr: req.headers.origin,
            //   last_modified_by: user_code,
            //   last_modified_ip_adr: req.headers.origin,
            // });
          }
        }
      }
    }
    await sequence.update({ seq_curr_val: Number(sequence.seq_curr_val) + 1 }, { seq_seq: 'OP' });
    return res.status(200).json({ message: 'deleted succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const { id } = req.params;
    const wo = await workOrderServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: wo });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.headers.origin);

  logger.debug('Calling find all wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const wos = await workOrderServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: wos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const wos = await workOrderServiceInstance.find({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: wos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const wos = await workOrderServiceInstance.findOne({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: wos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  console.log(req.body);
  logger.debug('Calling update one  wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const { id } = req.params;
    const wo = await workOrderServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: wo });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const { id } = req.params;
    const wo = await workOrderServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  createPosWorkOrder,
  findOne,
  findAll,
  findBy,
  findByOne,
  update,
  deleteOne,
};
