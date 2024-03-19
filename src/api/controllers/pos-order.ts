import PosOrder from '../../services/pos-order';
import PosOrderDetail from '../../services/pos-order-detail-product';
import PosOrderDetailSauce from '../../services/pos-order-product-sauce';
import PosOrderProductSauce from '../../services/pos-order-product-sauce';
import PosOrderProductSupp from '../../services/pos-order-product-supp';
import PosOrderProductIng from '../../services/pos-order-product-ing';
import InventoryTransactionService from '../../services/inventory-transaction';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
import ItemService from '../../services/item';
import CodeService from '../../services/code';
import SiteService from '../../services/site';
import SequenceService from '../../services/sequence';
import { isNull } from 'lodash';
import workOrderService from '../../services/work-order';
import workOrderDetailService from '../../services/work-order-detail';
import psService from '../../services/ps';
import mobileService from '../../services/mobile-service';
import inventoryTransactionService from '../../services/inventory-transaction';
import locationDetailService from '../../services/location-details';
import costSimulationService from '../../services/cost-simulation';
import BkhService from '../../services/bkh';
import ForcastService from '../../services/forcast';
import crmService from '../../services/crm';
import OrderHistory from '../../services/orders-history';
import * as path from 'path';

import { type } from 'os';
import posCategoriesService from '../../services/pos-categories';
import item from './item';
import _ from 'lodash';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create order endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const OrderHistoryServiceInstance = Container.get(OrderHistory);
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

    const products = req.body.cart.products;
    const editCart = req.body.modif;
    const detail = [];
    let update: boolean = false;
    const currentService = await service.findOne({
      role_code: user_code,
      service_open: true,
      service_domain: user_domain,
    });
    const sequence = await SequenceServiceInstance.findOne({
      seq_type: 'OF',
      seq_profile: cart.usrd_profile,
      seq_domain: user_domain,
    });
    // const currentCart = await PosOrderServiceInstance.findOne({ order_code: cart.order_code });
    // console.log('current cart', currentCart);
    // console.log(cart);
    // for (const product of cart.products) {
    //   isNull(cart.disc_amt) ? product.pt_price : product.pt_price - (product.pt_price * Number(cart.disc_amt)) / 100;
    // }

    // console.log(total);
    if (editCart) {
      // console.log(cart);
      console.log('bizzare');
      update = true;
      // console.log(update);
      const it = await inventoryTransactionServiceInstance.findSpecial({
        where: {
          tr_domain: user_domain,
          tr_site: cart.usrd_site,
          tr_nbr: cart.order_code,
          tr_effdate: currentService.service_period_activate_date,
        },
      });
      if (it) {
        // console.log(it.tr_part, it.tr_site, it.tr_loc);
        for (const i of it) {
          const ld = await locationDetailServiceInstance.findOne({
            ld_domain: user_domain,
            ld_part: i.tr_part,
            ld_site: i.tr_site,
            ld_loc: i.tr_loc,
          });
          if (ld) {
            // console.log('ld mlih');
            await locationDetailServiceInstance.update(
              {
                ld_qty_oh: Number(ld.ld_qty_oh) - 1 * Number(i.tr_qty_chg),
                last_modified_by: user_code,
                last_modified_ip_adr: req.headers.origin,
              },
              { id: ld.id },
            );
            await workOrderDetailServiceInstance.delete({
              wod_domain: user_domain,
              wod_nbr: cart.order_code,
              wod_site: i.tr_site,
              wod_iss_date: currentService.service_period_activate_date,
            });
            await inventoryTransactionServiceInstance.delete({
              tr_domain: user_domain,
              tr_nbr: cart.order_code,
              tr_part: i.tr_part,
              tr_site: i.tr_site,
              tr_effdate: currentService.service_period_activate_date,
            });
            await OrderHistoryServiceInstance.create({
              domain: user_domain,
              order_code: cart.order_code,

              ord_amt: cart.total_price,

              usrd_site: cart.usrd_site,
              deleted_date: currentService.service_period_activate_date,
            });
          }
        }
        await workOrderServiceInstance.delete({
          wo_domain: user_domain,
          wo_nbr: cart.order_code,
          wo_site: cart.usrd_site,
          wo_ord_date: currentService.service_period_activate_date,
        });
        await PosOrderDetailServiceInstance.delete({
          domain: user_domain,
          order_code: cart.order_code,
          usrd_site: cart.usrd_site,
          created_date: currentService.service_period_activate_date,
        });
        await PosOrderProductSauceServiceInstance.delete({
          domain: user_domain,
          order_code: cart.order_code,
          usrd_site: cart.usrd_site,
          created_date: currentService.service_period_activate_date,
        });
        await PosOrderProductIngServiceInstance.delete({
          domain: user_domain,
          order_code: cart.order_code,
          usrd_site: cart.usrd_site,
          created_date: currentService.service_period_activate_date,
        });
        await PosOrderProductSuppServiceInstance.delete({
          domain: user_domain,
          order_code: cart.order_code,
          usrd_site: cart.usrd_site,
          created_date: currentService.service_period_activate_date,
        });
        await PosOrderServiceInstance.delete({
          domain: user_domain,
          order_code: cart.order_code,
          usrd_site: cart.usrd_site,
          created_date: currentService.service_period_activate_date,
        });
      }
    }

    let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val)}`;
    if (cart.products.length > 0) {
      if (cart.plateforme !== 'CALL CENTER') {
        await PosOrderServiceInstance.create({
          domain: user_domain,
          order_code: update ? cart.order_code : nbr,
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
          plateforme: cart.plateforme,
        });
      }
      !update &&
        (await sequence.update(
          { seq_curr_val: Number(sequence.seq_curr_val) + 1 },
          { seq_type: 'OF', seq_profile: cart.usrd_profile, seq_domain: user_domain },
        ));
      const currentProduct = await PosOrderServiceInstance.findOne({
        domain: user_domain,
        order_code: update ? cart.order_code : nbr,
      });
      for (const product of products) {
        // console.log('product', product);
        const {
          pt_part,
          pt_formule,
          pt_qty,
          pt_price,
          comment,
          pt_desc1,
          pt_desc2,
          pt_bom_code,
          pt_article,
          line,
          pt_loc,
          pt_group,
          pt_promo,
          pt_part_type,
          pt_dsgn_grp,
        } = product;
        // console.log('pt_loc', pt_loc);
        if (cart.plateforme !== 'CALL CENTER') {
          await PosOrderDetailServiceInstance.create({
            domain: user_domain,
            order_code: currentProduct.order_code,
            pt_part: pt_part,
            pt_formule: pt_formule,
            pt_size: comment,
            pt_desc1: pt_desc1,
            pt_desc2: pt_desc2,
            pt_bom_code: pt_bom_code,
            pt_loc: pt_loc,
            pt_article: pt_article,
            line: line,
            pt_qty_ord_pos: pt_qty,
            pt_price_pos: isNull(cart.disc_amt)
              ? product.pt_price
              : product.pt_price - (product.pt_price * Number(cart.disc_amt)) / 100,
            usrd_site: cart.usrd_site,
            created_date: currentService.service_period_activate_date,
            pt_group: pt_group,
            pt_promo: pt_promo,
            pt_part_type: pt_part_type,
            pt_dsgn_grp: pt_dsgn_grp,
          });
        }
        await workOrderServiceInstance.create({
          wo_domain: user_domain,
          wo_nbr: currentProduct.order_code,
          wo_part: pt_part,
          wo_lot: line,
          wo_qty_ord: pt_qty,
          wo_loc: pt_loc,
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
        const wOid = await workOrderServiceInstance.findOne({
          wo_domain: user_domain,
          wo_nbr: currentProduct.order_code,
          wo_lot: product.line,
        });
        if (wOid.wo_bom_code != null) {
          const wo_bom_code = wOid.wo_bom_code;
          const ps = await psServiceInstance.find({ ps_parent: wo_bom_code, ps_domain: user_domain });
          for (const pss of ps) {
            const elem_wod = {
              wod_domain: user_domain,
              wod_nbr: currentProduct.order_code,
              wod_lot: wOid.id,
              wod_loc: product.pt_loc,
              wod_price: product.pt_price,
              wod_part: pss.ps_comp,
              wod_site: cart.usrd_site,
              wod_qty_req: ((pss.ps_qty_per / (pss.ps_scrp_pct / 100)) * product.pt_qty).toFixed(2),
              wod_iss_date: currentService.service_period_activate_date,
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
            wod_domain: user_domain,
            wod_nbr: currentProduct.order_code,
            wod_lot: wOid.id,
            wod_loc: product.pt_loc,
            wod_part: product.pt_part,
            wod_price: product.pt_price,
            wod_site: cart.usrd_site,
            wod_qty_req: product.pt_qty,
            wod_iss_date: currentService.service_period_activate_date,
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
          if (cart.plateforme !== 'CALL CENTER') {
            await PosOrderProductSuppServiceInstance.create({
              domain: user_domain,
              order_code: currentProduct.order_code,
              pt_part: pt_part,
              pt_pt_part: s.pt_part,
              pt_desc1: s.pt_desc1,
              pt_desc2: s.pt_desc2,
              pt_loc: s.pt_loc,
              pt_bom_code: s.pt_bom_code,
              pt_ord_qty: s.pt_ord_qty,
              line: line,
              pt_price: s.pt_price,
              usrd_site: cart.usrd_site,
              created_date: currentService.service_period_activate_date,
            });
          }

          const elem_wod = {
            wod_domain: user_domain,
            wod_nbr: currentProduct.order_code,
            wod_lot: wOid.id,
            wod_loc: s.pt_loc,
            wod_part: s.pt_part,
            wod_price: s.pt_price,
            wod_site: cart.usrd_site,
            wod_qty_req: s.pt_net_wt * product.pt_qty,
            wod_iss_date: currentService.service_period_activate_date,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          };
          await workOrderDetailServiceInstance.create(elem_wod);
          console.log();
          detail.push(elem_wod);
        }
        // console.log(sauce);
        for (const sa of sauce) {
          if (cart.plateforme !== 'CALL CENTER') {
            console.log(pt_part);
            console.log(sa.pt_part);
            await PosOrderProductSauceServiceInstance.create({
              domain: user_domain,
              order_code: currentProduct.order_code,
              pt_part: pt_part,
              pt_pt_part: sa.pt_pt_part,
              pt_desc1: sa.pt_desc1,
              pt_desc2: sa.pt_desc2,
              pt_loc: sa.pt_loc,
              pt_bom_code: sa.pt_bom_code,
              pt_ord_qty: sa.pt_ord_qty,
              pt_price: sa.pt_price,
              line: line,
              usrd_site: cart.usrd_site,
              created_date: currentService.service_period_activate_date,
              bool05: false,
            });
          }

          const elem_wod = {
            wod_domain: user_domain,
            wod_nbr: currentProduct.order_code,
            wod_lot: wOid.id,
            wod_loc: sa.pt_loc,
            wod_part: sa.pt_pt_part,
            wod_price: sa.pt_price,
            wod_site: cart.usrd_site,
            wod_qty_req: sa.pt_net_wt * product.pt_qty,
            wod_iss_date: currentService.service_period_activate_date,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          };
          await workOrderDetailServiceInstance.create(elem_wod);
          detail.push(elem_wod);
        }

        for (const i of ingredients) {
          if (cart.plateforme !== 'CALL CENTER') {
            await PosOrderProductIngServiceInstance.create({
              domain: user_domain,
              order_code: currentProduct.order_code,
              pt_part: pt_part,
              pt_pt_part: i.pt_pt_part,
              pt_desc1: i.pt_desc1,
              pt_desc2: i.pt_desc2,
              pt_bom_code: i.pt_bom_code,
              pt_loc: i.pt_loc,
              pt_price: i.price,
              line: line,
              usrd_site: cart.usrd_site,
              created_date: currentService.service_period_activate_date,
              bool05: false,
            });
          }
          const wOd = await workOrderDetailServiceInstance.findOne({
            wod_domain: user_domain,
            wod_nbr: currentProduct.order_code,
            wod_lot: wOid.id,
            wod_part: i.pt_pt_part,
          });

          await workOrderDetailServiceInstance.update(
            { wod_qty_req: Number(0) },
            { wod_nbr: currentProduct.order_code, wod_lot: wOid.id, wod_part: i.pt_pt_part, wod_domain: user_domain },
          );
        }
      }
      console.log('detail', detail);
      for (const item of detail) {
        const sct = await costSimulationServiceInstance.findOne({
          sct_domain: user_domain,
          sct_part: item.wod_part,
          sct_site: item.wod_site,
          sct_sim: 'STD-CG',
        });

        const pt = await itemServiceInstance.findOne({ pt_part: item.wod_part, pt_domain: user_domain });

        const ld = await locationDetailServiceInstance.findOne({
          ld_domain: user_domain,
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
            tr_domain: user_domain,
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
      }
    }
    // update = false;
    // console.log(cart);
    return res.status(201).json({ message: 'created succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createCALLCenterORDER = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling Create order endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const PosOrderProductSuppServiceInstance = Container.get(PosOrderProductSupp);
    const PosOrderProductSauceServiceInstance = Container.get(PosOrderProductSauce);
    const PosOrderProductIngServiceInstance = Container.get(PosOrderProductIng);

    const SequenceServiceInstance = Container.get(SequenceService);
    const service = Container.get(mobileService);

    const cart = req.body.cart;
    const products = req.body.cart.products;
    const user_site = req.body.user_site;

    let update: boolean = false;

    const currentService = await service.findOne({
      service_site: '1000',
      service_open: true,
      service_domain: user_domain,
    });
    const sequence = await SequenceServiceInstance.findOne({ seq_type: 'OFCCL', seq_domain: user_domain });

    let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val) + 1}`;
    await PosOrderServiceInstance.create({
      domain: user_domain,
      order_code: update ? cart.order_code : nbr,
      total_price: cart.total_price,
      order_emp: cart.order_emp,
      status: 'A',
      customer: cart.customer,
      created_date: currentService.service_period_activate_date,
      usrd_site: cart.usrd_site,
      loy_num: cart.loy_num,
      disc_amt: cart.disc_amt,
      del_comp: cart.del_comp,
      site_loc: cart.site_loc,
      plateforme: cart.plateforme,
    });
    const currentProduct = await PosOrderServiceInstance.findOne({
      order_code: update ? cart.order_code : nbr,
      domain: user_domain,
    });
    for (const product of products) {
      // console.log('product', product);
      const {
        pt_part,
        pt_formule,
        pt_qty,
        pt_price,
        comment,
        pt_desc1,
        pt_bom_code,
        pt_article,
        line,
        pt_loc,
      } = product;
      // console.log('pt_loc', pt_loc);
      await PosOrderDetailServiceInstance.create({
        domain: user_domain,
        order_code: currentProduct.order_code,
        pt_part: pt_part,
        pt_formule: pt_formule,
        pt_size: comment,
        pt_desc1: pt_desc1,
        pt_bom_code: pt_bom_code,
        pt_loc: pt_loc,
        pt_article: pt_article,
        line: line,
        pt_qty_ord_pos: pt_qty,
        pt_price_pos: pt_price,
        usrd_site: cart.usrd_site,
        created_date: currentService.service_period_activate_date,
      });

      const supp = product.suppliments;
      const sauce = product.sauces;
      const ingredients = product.ingredients;

      for (const s of supp) {
        await PosOrderProductSuppServiceInstance.create({
          domain: user_domain,
          order_code: currentProduct.order_code,
          pt_part: pt_part,
          pt_pt_part: s.pt_part,
          pt_desc1: s.pt_desc1,
          pt_loc: s.pt_loc,
          pt_bom_code: s.pt_bom_code,
          pt_ord_qty: s.pt_ord_qty,
          pt_price: s.pt_price,
          usrd_site: cart.usrd_site,
          created_date: currentService.service_period_activate_date,
        });
      }
      // console.log(sauce);
      for (const sa of sauce) {
        await PosOrderProductSauceServiceInstance.create({
          domain: user_domain,
          order_code: currentProduct.order_code,
          pt_part: pt_part,
          pt_pt_part: sa.pt_part,
          pt_desc1: sa.pt_desc1,
          pt_loc: sa.pt_loc,
          pt_bom_code: sa.pt_bom_code,
          pt_ord_qty: sa.pt_ord_qty,
          pt_price: sa.pt_price,
          usrd_site: cart.usrd_site,
          created_date: currentService.service_period_activate_date,
        });
      }

      for (const i of ingredients) {
        await PosOrderProductIngServiceInstance.create({
          domain: user_domain,
          order_code: currentProduct.order_code,
          pt_part: pt_part,
          pt_pt_part: i.pt_pt_part,
          pt_desc1: i.pt_desc1,
          pt_bom_code: i.pt_bom_code,
          pt_loc: i.pt_loc,
          pt_desc2: i.pt_desc2,
          pt_price: i.price,
          usrd_site: cart.usrd_site,
          created_date: currentService.service_period_activate_date,
        });
      }
    }

    await sequence.update(
      { seq_curr_val: Number(sequence.seq_curr_val) + 1 },
      { seq_type: 'OFCCL', seq_domain: user_domain },
    );

    // ADD TO AGENDA
    const crmServiceInstance = Container.get(crmService);
    const sequenceServiceInstance = Container.get(SequenceService);
    const param = await crmServiceInstance.getParamFilterd('pos_call_order');
    const paramDetails = await crmServiceInstance.getParamDetails({ param_code: param.param_code });
    const sequence_event = await sequenceServiceInstance.getCRMEVENTSeqNB();
    const addLine = await crmServiceInstance.createAgendaLine(cart.loy_num, param, paramDetails, sequence_event);

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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const service = Container.get(mobileService);
    const currentService = await service.findOne({
      role_code: user_code,
      service_open: true,
      service_domain: user_domain,
    });
    const { Op } = require('sequelize');
    // console.log(currentService);
    console.log(currentService.service_period_activate_date);
    const PosOrderServiceInstance = Container.get(PosOrder);
    const order = await PosOrderServiceInstance.find({
      status: { [Op.notLike]: 'P' },
      created_date: currentService.service_period_activate_date,
      domain: user_domain,
    });
    console.log(order);

    return res.status(200).json({ message: 'fetched succesfully', data: order });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAlll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all order endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const order = await PosOrderServiceInstance.findW({ domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: order });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const order = await PosOrderServiceInstance.findOne({ ...req.body, domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: order });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findSumQty = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const itemServiceInstance = Container.get(ItemService);

    const orders = await PosOrderDetailServiceInstance.findspec({
      where: { usrd_site: req.body.usrd_site, created_date: req.body.created_date, domain: user_domain },
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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const PosOrderDetailSauseServiceInstance = Container.get(PosOrderDetailSauce);
    const itemServiceInstance = Container.get(ItemService);
    //console.log( "here",req.body)
    const orders = await PosOrderDetailServiceInstance.findspec({
      where: { usrd_site: req.body.usrd_site, created_date: req.body.created_date, domain: user_domain },
      attributes: [
        'pt_part',
        'usrd_site',
        'pt_desc1',
        [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty'],
      ],
      group: ['pt_part', 'usrd_site', 'pt_desc1'],
      raw: true,
    });
    //console.log(orders)
    let result = [];
    var i = 1;
    var typ = '';
    for (let ord of orders) {
      const items = await itemServiceInstance.findOne({ pt_part: ord.pt_part, pt_domain: user_domain });

      if (
        items.pt_part_type == 'BO' ||
        items.pt_part_type == 'AG' ||
        items.pt_part_type == 'SC' ||
        items.pt_part_type == 'D'
      ) {
        console.log(ord.pt_part, items.pt_part_type);
        typ = 'Stock';
      } else {
        typ = 'PS';
      }
      result.push({
        id: i,
        part: ord.pt_part,
        desc1: ord.pt_desc1,
        bom: items.pt_bom_code,
        ord_qty: ord.total_qty,
        prod_qty: ord.total_qty,
        type: typ,
      });
      i = i + 1;
    }

    const saus = await PosOrderDetailSauseServiceInstance.findspec({
      where: { usrd_site: req.body.usrd_site, created_date: req.body.created_date, domain: user_domain },
      attributes: ['pt_pt_part', 'usrd_site', 'pt_desc1', [Sequelize.fn('sum', 1), 'total_qty']],
      group: ['pt_pt_part', 'usrd_site', 'pt_desc1'],
      raw: true,
    });
    for (let sau of saus) {
      console.log(sau.pt_pt_part);
      const items = await itemServiceInstance.findOne({ pt_part: sau.pt_pt_part, pt_domain: user_domain });
      if (
        items.pt_part_type == 'BO' ||
        items.pt_part_type == 'AG' ||
        items.pt_part_type == 'SC' ||
        items.pt_part_type == 'D'
      ) {
        result.push({
          id: i,
          part: sau.pt_pt_part,
          desc1: items.pt_desc1,
          bom: items.pt_bom_code,
          ord_qty: sau.total_qty,
          prod_qty: sau.total_qty,
          type: 'Stock',
        });
        i = i + 1;
      }
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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const itemServiceInstance = Container.get(ItemService);
    const codeServiceInstance = Container.get(CodeService);
    
    if (req.body.site == '*') {
      var orders = await PosOrderDetailServiceInstance.findspec({
        where: { domain: user_domain, created_date: { [Op.between]: [req.body.date, req.body.date1] } },
        attributes: [
          'pt_part',
          'usrd_site',
          'pt_size',
          'pt_part_type',
          'pt_promo',
          'pt_dsgn_grp',
          'pt_group',
          [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty'],
          [Sequelize.fn('sum', Sequelize.col('pt_price_pos')), 'total_amt'],
        ],
        group: ['pt_part', 'usrd_site', 'pt_size', 'pt_part_type', 'pt_promo', 'pt_dsgn_grp', 'pt_group'],
        raw: true,
      });
    } else {
      var orders = await PosOrderDetailServiceInstance.findspec({
        where: {
          domain: user_domain,
          usrd_site: req.body.site,
          created_date: { [Op.between]: [req.body.date, req.body.date1] },
        },
        attributes: [
          'pt_part',
          'usrd_site',
          'pt_size',
          'pt_part_type',
          'pt_promo',
          'pt_dsgn_grp',
          'pt_group',
          [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty'],
          [Sequelize.fn('sum', Sequelize.col('pt_price_pos')), 'total_amt'],
        ],
        group: ['pt_part', 'usrd_site', 'pt_size', 'pt_part_type', 'pt_promo', 'pt_dsgn_grp', 'pt_group'],
        raw: true,
      });
    }
    //console.log(orders);
    let result = [];
    var i = 1;
    for (let ord of orders) {
      const items = await itemServiceInstance.findOne({ pt_part: ord.pt_part, pt_domain: user_domain });

      const parttypes = await codeServiceInstance.findOne({
        code_domain: user_domain,
        code_fldname: 'pt_part_type',
        code_value: items.pt_part_type,
      });
      // const groups = await codeServiceInstance.findOne({ code_fldname: 'pt_group', code_value: items.pt_group });
      // const promos = await codeServiceInstance.findOne({ code_fldname: 'pt_promo', code_value: items.pt_promo });
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
        group: isNull(ord.pt_group) ? '' : ord.pt_group,
        promo: isNull(ord.pt_promo) ? '' : ord.pt_promo,
        size: isNull(ord.pt_size) ? '' : ord.pt_size,
        dsgn_grp: isNull(ord.pt_dsgn_grp) ? '' : ord.pt_dsgn_grp,
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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosOrderDetailServiceInstance = Container.get(PosOrder);
    const order = await PosOrderDetailServiceInstance.findOrder({ ...req.body, domain: user_domain });
    console.log(order);
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

const set = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  product endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const itemServiceInstance = Container.get(ItemService);
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const items = await itemServiceInstance.find({ pt_domain: user_domain });
    for (const item of items) {
      await PosOrderDetailServiceInstance.update(
        {
          pt_group: item.pt_group,
          pt_part_type: item.pt_part_type,
          pt_promo: item.pt_promo,
          pt_dsgn_grp: item.pt_dsgn_grp,
        },
        { pt_part: item.pt_part, pt_domain: user_domain },
      );
    }
    console.log('all right');
    return res.status(200).json({ message: 'fetched succesfully', data: items });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createOrder = (socket, data) => {
  const PosOrderDetailServiceInstance = Container.get(PosOrder);
  console.log('socket connected');

  socket.emit('readyToRecieve');

  socket.on('sendData', data => {
    console.log(data.data.customers);
  });
};

const findPosGrp = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  const PosOrderDetailServiceInstance = Container.get(PosOrder);

  if (req.body.site != '*') {
    try {
      const orders = await PosOrderDetailServiceInstance.findgrp({
        where: {
          domain: user_domain,
          created_date: { [Op.between]: [req.body.date, req.body.date1] },
          usrd_site: req.body.site,
        },
        attributes: {
          //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
          include: [[Sequelize.literal('(total_price * 100 / (100 - disc_amt))- total_price'), 'Remise']],
        },
      });

      return res.status(200).json({ message: 'fetched succesfully', data: orders });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  } else {
    try {
      const orders = await PosOrderDetailServiceInstance.findgrp({
        where: {
          domain: user_domain,
          created_date: { [Op.between]: [req.body.date, req.body.date1] },
        },

        attributes: {
          //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
          include: [[Sequelize.literal('(total_price * 100 / (100 - disc_amt))- total_price'), 'Remise']],
        },
      });

      return res.status(200).json({ message: 'fetched succesfully', data: orders });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
};
const findBySite = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  const PosOrderDetailServiceInstance = Container.get(PosOrder);
  const bkhServiceInstance = Container.get(BkhService);
  const itemServiceInstance = Container.get(ItemService);
  const forcastServiceInstance = Container.get(ForcastService);
  const PosOrderDetailProductServiceInstance = Container.get(PosOrderDetail);
  if (req.body.site != '*') {
    
    try {
      const orders = await PosOrderDetailServiceInstance.findgrp({
        where: {
          domain: user_domain,
          created_date: { [Op.between]: [req.body.date, req.body.date1] },
          usrd_site: req.body.site,
        },
        attributes: [
          //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
          'created_date',
          'usrd_site',
          [Sequelize.fn('sum', Sequelize.col('total_price')), 'total_amt'],
        ],
        group: ['created_date', 'usrd_site'],
        raw: true,
      });
      let result = [];
      var i = 1;
      for (let ord of orders) {
        const ords = await PosOrderDetailServiceInstance.findgrp({
          where: {
            domain: user_domain,
            created_date: ord.created_date,
            usrd_site: ord.usrd_site,
            status: 'N',
          },
          attributes: [
            //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
            'created_date',
            'usrd_site',
            [Sequelize.fn('sum', Sequelize.col('total_price')), 'total_N'],
          ],
          group: ['created_date', 'usrd_site'],
          raw: true,
        });

        const loys = await PosOrderDetailServiceInstance.find({
          domain: user_domain,
          created_date: ord.created_date,
          usrd_site: ord.usrd_site,
          loy_num: '000',
        });
        var sumloy = 0;
        for (let loy of loys) {
          const detords = await PosOrderDetailProductServiceInstance.find({
            domain: user_domain,
            created_date: loy.created_date,
            order_code: loy.order_code,
            usrd_site: loy.usrd_site,
          });

          for (let detord of detords) {
            const part = await itemServiceInstance.findOne({ pt_part: detord.pt_part, pt_domain: user_domain });
            sumloy = sumloy + Number(part.pt_price) * Number(detord.pt_qty_ord_pos);
          }
          /*kamel*/
        }
        const banks = await bkhServiceInstance.findq({
          where: {
            bkh_domain: user_domain,
            bkh_effdate: ord.created_date,
            bkh_site: ord.usrd_site,
            bkh_type: 'R',
          },
          attributes: [
            //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
            'bkh_effdate',
            'bkh_site',
            [Sequelize.fn('sum', Sequelize.col('dec01')), 'total_rec'],
          ],
          group: ['bkh_effdate', 'bkh_site'],
          raw: true,
        });
        const objcts = await forcastServiceInstance.findq({
          where: {
            frc_domain: user_domain,
            frc_date: ord.created_date,
            frc_site: ord.usrd_site,
          },
          attributes: [
            //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
            'frc_date',
            'frc_site',
            [Sequelize.fn('sum', Sequelize.col('frc_amt')), 'total_obj'],
          ],
          group: ['frc_date', 'frc_site'],
          raw: true,
        });
        var recu = banks.length > 0 ? banks[0].total_rec : 0;
        var objc = objcts.length > 0 ? objcts[0].total_obj : 0;
        var namt = ords.length > 0 ? ords[0].total_N : 0;
        //        console.log(ords)
        result.push({
          id: i,
          effdate: ord.created_date,
          site: ord.usrd_site,
          amt: ord.total_amt,
          N_amt: namt,
          rec: recu,
          ecart: ord.total_amt - recu,
          obj: objc,
          loyamt: sumloy,
          cavsobj: objc != 0 ? (100 * ord.total_amt) / objc : 100,
        });
        i = i + 1;
      }
      //console.log("here",result)
      return res.status(200).json({ message: 'fetched succesfully', data: result });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  } else {
    console.log('hhhhhere');
    try {
      const orders = await PosOrderDetailServiceInstance.findgrp({
        where: {
          domain: user_domain,
          created_date: { [Op.between]: [req.body.date, req.body.date1] },
        },
        attributes: [
          //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
          'created_date',
          'usrd_site',
          [Sequelize.fn('sum', Sequelize.col('total_price')), 'total_amt'],
        ],
        group: ['created_date', 'usrd_site'],
        raw: true,
      });
      let result = [];
      var i = 1;
      for (let ord of orders) {
        const ords = await PosOrderDetailServiceInstance.findgrp({
          where: {
            domain: user_domain,
            created_date: ord.created_date,
            usrd_site: ord.usrd_site,
            status: 'N',
          },
          attributes: [
            //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
            'created_date',
            'usrd_site',
            [Sequelize.fn('sum', Sequelize.col('total_price')), 'total_N'],
          ],
          group: ['created_date', 'usrd_site'],
          raw: true,
        });

        const loys = await PosOrderDetailServiceInstance.find({
          domain: user_domain,
          created_date: ord.created_date,
          usrd_site: ord.usrd_site,
          loy_num: '000',
        });
        var sumloy = 0;
        for (let loy of loys) {
          const detords = await PosOrderDetailProductServiceInstance.find({
            domain: user_domain,
            created_date: loy.created_date,
            order_code: loy.order_code,
            usrd_site: loy.usrd_site,
          });

          for (let detord of detords) {
            const part = await itemServiceInstance.findOne({ pt_part: detord.pt_part, pt_domain: user_domain });
            sumloy = sumloy + Number(part.pt_price) * Number(detord.pt_qty_ord_pos);
          }
          /*kamel*/
        }

        const banks = await bkhServiceInstance.findq({
          where: {
            bkh_domain: user_domain,
            bkh_effdate: ord.created_date,
            bkh_type: 'R',
            bkh_site: ord.usrd_site,
          },
          attributes: [
            //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
            'bkh_effdate',
            'bkh_site',
            [Sequelize.fn('sum', Sequelize.col('dec01')), 'total_rec'],
          ],
          group: ['bkh_effdate', 'bkh_site'],
          raw: true,
        });
        const objcts = await forcastServiceInstance.findq({
          where: {
            frc_domain: user_domain,
            frc_date: ord.created_date,
            frc_site: ord.usrd_site,
          },
          attributes: [
            //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
            'frc_date',
            'frc_site',
            [Sequelize.fn('sum', Sequelize.col('frc_amt')), 'total_obj'],
          ],
          group: ['frc_date', 'frc_site'],
          raw: true,
        });
        var recu = banks.length > 0 ? banks[0].total_rec : 0;
        var objc = objcts.length > 0 ? objcts[0].total_obj : 0;
        var namt = ords.length > 0 ? ords[0].total_N : 0;

        result.push({
          id: i,
          effdate: ord.created_date,
          site: ord.usrd_site,
          amt: ord.total_amt,
          N_amt: namt,
          rec: recu,
          ecart: ord.total_amt - recu,
          obj: objc,
          loyamt: sumloy,
          cavsobj: objc != 0 ? (100 * ord.total_amt) / objc : 100,
        });
        i = i + 1;
      }

      return res.status(200).json({ message: 'fetched succesfully', data: result });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
};
const findGlobAmt = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const PosOrderDetailServiceInstance = Container.get(PosOrderDetail);
    const itemServiceInstance = Container.get(ItemService);
    const codeServiceInstance = Container.get(CodeService);
    

    var sansbo = await PosOrderDetailServiceInstance.findspec({
      where: {
        domain: user_domain,
        created_date: req.body.created_date,
        usrd_site: req.body.tr_site,
        pt_part_type: { [Op.ne]: 'BO' },
      },
      attributes: [
        // 'pt_part',
        //  'usrd_site',
        // [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty'],
        [Sequelize.fn('sum', Sequelize.col('pt_price_pos')), 'amt_sansbo'],
      ],
      // group: ['usrd_site'],
      raw: true,
    });

    var avecbo = await PosOrderDetailServiceInstance.findspec({
      where: {
        domain: user_domain,
        created_date: req.body.created_date,
        usrd_site: req.body.tr_site,
        //pt_part_type: 'BO'
      },
      attributes: [
        // 'pt_part',
        //  'usrd_site',
        // [Sequelize.fn('sum', Sequelize.col('pt_qty_ord_pos')), 'total_qty'],
        [Sequelize.fn('sum', Sequelize.col('pt_price_pos')), 'total_amt'],
      ],
      // group: ['usrd_site'],
      raw: true,
    });
    console.log(sansbo[0].amt_sansbo, avecbo);
    return res
      .status(200)
      .json({ message: 'fetched succesfully', data: { casansbo: sansbo[0].amt_sansbo, ca: avecbo[0].total_amt } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllPosOrders = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling findAllPosOrders endpoint');
  try {
    const PosOrderServiceInstance = Container.get(PosOrder);
    const siteServiceInstance = Container.get(SiteService);
    const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService);
    const posOrderDetailServiceInstance = Container.get(PosOrderDetail);

    const { startDate, endDate, shop } = req.body;

    const orders = await PosOrderServiceInstance.findAllPosOrders(startDate, endDate, shop);
    const transactions = await inventoryTransactionServiceInstance.findAllissSo(startDate, endDate, shop);
    const orders_details = await posOrderDetailServiceInstance.findAllDetailsFiltered(startDate, endDate);

    const locations = _.mapValues(_.groupBy(orders, 'usrd_site'));
    const tr_locations = _.mapValues(_.groupBy(transactions, 'tr_site'));
    const meatTypes = _.mapValues(_.groupBy(orders_details, 'pt_group'));
    const breadTypes = _.mapValues(_.groupBy(orders_details, 'pt_part_type'));
    const sizesTypes = _.mapValues(_.groupBy(orders_details, 'pt_promo'));
    const formTypes = _.mapValues(_.groupBy(orders_details, 'pt_dsgn_grp'));
    const platformTypes = _.mapValues(_.groupBy(orders, 'del_comp'));
    const customerTypes = _.mapValues(_.groupBy(orders, 'customer'));

    let order_by_shop = [];
    let tr_by_shop = [];
    let meat_types = [];
    let bread_types = [];
    let sizes_types = [];
    let form_types = [];
    let platform_types = [];
    let customer_types = [];

    let quantities = [];
    let prices = [];

    // TR HIST
    for (const key in tr_locations) {
      const site = await siteServiceInstance.findOne({ si_site: key });
      const site_name = site.dataValues.si_desc;
      let sum = 0;
      tr_locations[key].forEach(order => {
        sum += +order.tr_gl_amt;
      });
      console.log('key:\t' + key + '\tname:\t' + site_name + '\t length:' + tr_locations[key].length + '\t sum:' + sum);
      tr_by_shop.push({ shop: key, Cout: sum, shop_name: site_name });

      sum = 0;
    }

    // SHOP SITE
    for (const key in locations) {
      const site = await siteServiceInstance.findOne({ si_site: key });
      const site_name = site.dataValues.si_desc;
      let sum = 0;
      locations[key].forEach(order => {
        sum += parseFloat(order.total_price);
      });
      const index = tr_by_shop.findIndex(elem => {
        return elem.shop === key;
      });
      // console.log("key:\t"+key + "name:\t"+site_name +"\t length:"+ locations[key].length +"\t sum:"+ sum)
      order_by_shop.push({ shop: key, CA: sum, Cout: tr_by_shop[index].Cout, shop_name: site_name });
      sum = 0;
    }

    // MEAT TYPE
    for (const key in meatTypes) {
      let sum = 0;
      for (const order of meatTypes[key]) {
        sum += parseFloat(order.pt_price_pos) * order.pt_qty_ord_pos;
      }
      meat_types.push({ type: key, CA: sum });
      sum = 0;
    }

    // BREAD TYPE
    for (const key in breadTypes) {
      let sum = 0;
      for (const order of breadTypes[key]) {
        sum += parseFloat(order.pt_price_pos) * order.pt_qty_ord_pos;
      }
      bread_types.push({ type: key, CA: sum });

      sum = 0;
    }

    // SIZE TYPE
    for (const key in sizesTypes) {
      let sum = 0;
      for (const order of sizesTypes[key]) {
        sum += parseFloat(order.pt_price_pos) * order.pt_qty_ord_pos;
      }
      sizes_types.push({ type: key, CA: sum });

      sum = 0;
    }

    // FORM TYPE
    for (const key in formTypes) {
      let sum = 0;
      for (const order of formTypes[key]) {
        sum += parseFloat(order.pt_price_pos) * order.pt_qty_ord_pos;
      }
      form_types.push({ type: key, CA: sum });

      sum = 0;
    }

    // PLATFORMS TYPE
    for (const key in platformTypes) {
      let sum = 0;
      for (const order of platformTypes[key]) {
        sum += parseFloat(order.total_price);
      }
      platform_types.push({ type: key, CA: sum });

      sum = 0;
    }

    // CUSTOMERS TYPE
    for (const key in customerTypes) {
      let sum = 0;
      for (const order of customerTypes[key]) {
        sum += parseFloat(order.total_price);
      }
      customer_types.push({ type: key, CA: sum });

      sum = 0;
    }

    return res.status(200).json({
      message: 'fetched succesfully',
      data: {
        // transactions,
        // orders,
        tr_by_shop,
        order_by_shop,
        meat_types,
        bread_types,
        sizes_types,
        form_types,
        platform_types,
        customer_types,
      },
    });
    //  return res.status(200).json({ message: 'fetched succesfully', data: { orders, customer_types} });
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
  findGlobAmt,
  findByOrd,
  update,
  deleteOne,
  findAlll,
  createCALLCenterORDER,
  findPosGrp,
  findBySite,
  createOrder,
  set,
  findAllPosOrders,
};
