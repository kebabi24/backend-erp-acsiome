import WorkOrderService from '../../services/work-order';
import WoroutingService from '../../services/worouting';
import WorkroutingService from '../../services/workrouting';
import ItemService from '../../services/item';
import InventoryTransactionService from '../../services/inventory-transaction';
import OperationHistoryService from "../../services/operation-history"
import WorkCenterService from "../../services/workcenter"
import { Op, Sequelize } from 'sequelize';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { multiply, result } from 'lodash';
import { IntegerDataType } from 'sequelize/types';
import psService from '../../services/ps';
import workOrderDetailService from '../../services/work-order-detail';
import { Console } from 'console';
import sequenceService from '../../services/sequence';
import { webContents } from 'electron';
import item from './item';
import saleOrder from '../../models/saleorder';
import SaleOrderService from '../../services/saleorder';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
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
          wo_domain: user_domain,
          wo_nbr: nof,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        })
        .then(result => {
          wolot = result.id;
        });
      const ros = await workroutingServiceInstance.find({ ro_domain: user_domain,ro_routing: it.wo_routing });
      for (const ro of ros) {
        await woroutingServiceInstance.create({
          wr_domain: user_domain,
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

const createSoJob = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling update one  code endpoint');
  try {
    const { detail,profile,site,saleOrders} = req.body;
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const woroutingServiceInstance = Container.get(WoroutingService);
    const workroutingServiceInstance = Container.get(WorkroutingService);
    const itemServiceInstance = Container.get(ItemService);
    const sequenceServiceInstance = Container.get(sequenceService);
    const saleOrderServiceInstance =  Container.get(SaleOrderService)
   console.log(saleOrders)
   let woids = []

    for (const item of detail) {
      if (item.nomo != null) {
      let wolot = 0;

      const sequence = await sequenceServiceInstance.findOne({
        seq_type: 'OF',
        seq_profile: profile,
        seq_domain: user_domain,
      });
     
      let nof = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val) + 1}`;

      await sequenceServiceInstance.update(
        { seq_curr_val: Number(sequence.seq_curr_val) + 1 },
        {id:sequence.id},
      );
  
      await workOrderServiceInstance
        .create({
          ...item,
          wo_part:item.part,
          wo_bom_code: item.nomo,
          wo_site: site,
          wo_routing:item.gamme,
          wo_qty_ord: item.prod_qty,
          wo_ord_date: new Date(),
          wo_rel_date: item.rel_date,
          wo_due_date: item.due_date,
          wo_status: "F",
          wo_domain: user_domain,
          wo_nbr: nof,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        })
        .then(result => {
          wolot = result.id;
          woids.push(result.id)
        });
      const ros = await workroutingServiceInstance.find({ ro_domain: user_domain,ro_routing: item.gamme });
      for (const ro of ros) {
        await woroutingServiceInstance.create({
          wr_domain: user_domain,
          wr_nbr: nof,
          wr_lot: wolot,
          wr_start: item.rel_date,
          wr_routing: ro.ro_routing,
          wr_wkctr: ro.ro_wkctr,
          wr_mch: ro.ro_mch,
          wr_status: 'F',
          wr_part: item.part,
          wr_site: site,
          wr_op: ro.ro_op,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });
      }
    }
    }
    for (let sos of saleOrders) {
      const so = await saleOrderServiceInstance.update(
        { so_job: "wo", last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
        { id:sos.id },
      );
    }
    console.log(woids)
    const wos = await workOrderServiceInstance.find({wo_domain: user_domain, id : woids});
  
    return res.status(200).json({ message: 'deleted succesfully', data: wos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createDirect = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling update one  code endpoint');
  console.log("hnahnahnahnahnahnahnahna")
  try {
    const { it, nof } = req.body;
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const woroutingServiceInstance = Container.get(WoroutingService);
    const workroutingServiceInstance = Container.get(WorkroutingService);
    const itemServiceInstance = Container.get(ItemService);

  
      let wolot = 0;

      await workOrderServiceInstance
        .create({
          ...it,
          wo_domain: user_domain,
          wo_nbr: nof,
          wo_status: "R",
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        })
        .then(result => {
          wolot = result.id;
        });
      const ros = await workroutingServiceInstance.find({ ro_domain: user_domain,ro_routing: it.wo_routing });
      for (const ro of ros) {
        await woroutingServiceInstance.create({
          wr_domain: user_domain,
          wr_nbr: nof,
          wr_lot: wolot,
          wr_start: new Date(),
          wr_routing: ro.ro_routing,
          wr_wkctr: ro.ro_wkctr,
          wr_mch: ro.ro_mch,
          wr_status: 'R',
          wr_part: req.body.wo_part,
          wr_site: req.body.wo_site,
          wr_op: ro.ro_op,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });
    }
    return res.status(200).json({ message: 'deleted succesfully', data: wolot });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const createPosWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling update one  code endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const workOrderDetailServiceInstance = Container.get(workOrderDetailService);
    const psServiceInstance = Container.get(psService);
    const itemServiceInstance = Container.get(ItemService);
    const SequenceServiceInstance = Container.get(sequenceService);
    const sequence = await SequenceServiceInstance.findOne({ seq_domain:user_domain,seq_seq: 'OP' });
    let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val) + 1}`;
    const order_code = req.body.cart.order_code;
    const { usrd_site } = req.body.cart;
    const products = req.body.cart.products;
    console.log(products);
    for (const product of products) {
      const { pt_part, pt_qty, pt_bom_code, line } = product;

      await workOrderServiceInstance.create({
        wo_domain: user_domain,
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
      const wOid = await workOrderServiceInstance.findOne({ wo_domain:user_domain,wo_nbr: nbr, wo_lot: product.line });
      if (wOid) {
        let ps_parent = product.pt_bom_code;

        const ps = await psServiceInstance.find({ ps_parent ,ps_domain: user_domain});
        console.log(ps);
        if (ps.length > 0) {
          console.log('ps l dakhel f if', ps);

          for (const pss of ps) {
            // console.log(pss.ps_scrp_pct);
            await workOrderDetailServiceInstance.create({
              wod_domain: user_domain,
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
            wod_domain: user_domain,
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
            wod_domain: user_domain,
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
            wod_domain: user_domain,
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
              wod_dpomain: user_domain,
              wod_nbr: nbr,
              wod_lot: wOid.id,
              wod_part: g.spec_code,
            });

            await workOrderDetailServiceInstance.update(
              { wod_qty_req: Number(0) },
              { wod_domain: user_domain,wod_nbr: nbr, wod_lot: wOid.id, wod_part: g.spec_code },
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
    await sequence.update({ seq_curr_val: Number(sequence.seq_curr_val) + 1 }, { seq_domain: user_domain,seq_seq: 'OP' });
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
  const { user_domain } = req.headers;
  logger.debug('Calling find all wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const wos = await workOrderServiceInstance.find({wo_domain: user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: wos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all wo endpoint');
  const { user_domain } = req.headers;
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const wos = await workOrderServiceInstance.find({ ...req.body , wo_domain: user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: wos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all wo endpoint');
  const { user_domain } = req.headers;
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const wos = await workOrderServiceInstance.findOne({ ...req.body,wo_domain: user_domain });
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



const CalcCost = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {

    const itemServiceInstance = Container.get(ItemService);
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService);
    const operationHistoryServiceInstance = Container.get(OperationHistoryService)
    const workcenterServiceInstance = Container.get(WorkCenterService)
    console.log(req.body);
     let result=[] 
     let i = 1
    const wos = await workOrderServiceInstance.find({
      
        wo_domain: user_domain,
        wo_part: { [Op.between]: [req.body.part1, req.body.part2]},
        wo_ord_date: { [Op.between]: [req.body.date, req.body.date1]},
      
    });
    for(let wo of wos) {
      const item = await itemServiceInstance.findOne({
      
        pt_domain: user_domain,
        pt_part: wo.wo_part,
      
    });
    var qtywo = Number(wo.wo_qty_comp) + Number(wo.wo_qty_rjct)
      const tr = await inventoryTransactionServiceInstance.find({
        where : {
          tr_domain: user_domain, tr_effdate: { [Op.between]: [req.body.date, req.body.date1]} ,
          tr_part: wo.wo_part,
          tr_ship_type: { [Op.ne]: 'M' },
          tr_type : "ISS-WO",
          tr_lot : wo.id,
        },
        attributes: [ [Sequelize.fn('sum', Sequelize.literal('tr_qty_loc * tr__dec02')), 'mtl']],
        //group: ['tr_part'],
        raw: true,
      })

      const ops = await operationHistoryServiceInstance.find({op_wo_lot:wo.id ,op_wo_nbr: wo.wo_nbr,op_type:"labor",op_domain:user_domain})

      let lbr = 0
      let bdn = 0
      let mtl = tr.mtl
      for (let op of ops) {
        const wc = await workcenterServiceInstance.findOne({wc_wkctr:op. op_wkctr,wc_mch:op.op_mch,wc_domain: user_domain})
            lbr = lbr + (Number(op.op_act_setup) * Number(wc.wc_setup_rte) * Number(wc.wc_setup_men)) + (Number(op.op_act_run) * Number(wc.wc_lbr_rate)* Number(wc.wc_men_mch))
            bdn = bdn + (Number(op.op_act_setup) + Number(op.op_act_run)) * Number(wc.wc_bdn_rate)
          }

       if (qtywo != 0) {
        mtl = tr.mtl / qtywo
        lbr = lbr / qtywo
        bdn = bdn / qtywo
       }
       else {
         mtl = tr.mtl 
        lbr = lbr 
        bdn = bdn 
       }
       result.push({id:i,wonbr: wo.wo_nbr, woid:wo.id, wopart:wo.wo_part, desc:item.pt_desc1,wodate: wo.wo_ord_date, mtl:mtl, lbr:lbr, bdn:bdn, qtycomp: wo.wo_qty_comp, qtyrjct: wo.wo_qty_rjct })
       i = i + 1 
       await workOrderServiceInstance.update(
        { wo__dec01:mtl , wo__dec02: lbr, wo__dec03:bdn, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
        { id:wo.id },
      );

    }
    
       
    console.log("trs",wos.length);
   
  //  const invoices = await userMobileServiceInstance.getAllInvoice({...req.body, /*invoice_domain: user_domain*/});
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const CalcCostWo = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {

    const itemServiceInstance = Container.get(ItemService);
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const operationHistoryServiceInstance = Container.get(OperationHistoryService)
    const workcenterServiceInstance = Container.get(WorkCenterService)
    console.log(req.body);
     
    const wo = await workOrderServiceInstance.findOne({
    
        wo_domain: user_domain,
        id: req.body.id
      
    });
   
    var qtywo = Number(wo.wo_qty_comp) + Number(wo.wo_qty_rjct)
     
      const ops = await operationHistoryServiceInstance.find({op_wo_lot:wo.id ,op_wo_nbr: wo.wo_nbr,op_type:"labor",op_domain:user_domain})

      let lbr = 0
      let bdn = 0
      let lbrstd = 0
      let bdnstd= 0
      for (let op of ops) {
        const wc = await workcenterServiceInstance.findOne({wc_wkctr:op. op_wkctr,wc_mch:op.op_mch,wc_domain: user_domain})
            lbr = lbr + (Number(op.op_act_setup) * Number(wc.wc_setup_rte) * Number(wc.wc_setup_men)) + (Number(op.op_act_run) * Number(wc.wc_lbr_rate)* Number(wc.wc_men_mch))
            bdn = bdn + (Number(op.op_act_setup) + Number(op.op_act_run)) * Number(wc.wc_bdn_rate)

            lbrstd = lbrstd + (Number(op.op_std_setup) * Number(wc.wc_setup_rte) * Number(wc.wc_setup_men)) + (Number(op.op_std_run) * Number(wc.wc_lbr_rate)* Number(wc.wc_men_mch))
            bdnstd = bdnstd + (Number(op.op_std_setup) + (Number(op.op_std_run)* Number(qtywo))) * Number(wc.wc_bdn_rate)
          }

       if (qtywo != 0) {
        lbr = lbr / qtywo
        bdn = bdn / qtywo
        lbrstd = lbrstd / qtywo
        bdnstd = bdnstd / qtywo
       }
       else {
       
        lbr = lbr 
        bdn = bdn 

       }
      
    
  //  const invoices = await userMobileServiceInstance.getAllInvoice({...req.body, /*invoice_domain: user_domain*/});
    return res.status(200).json({ message: 'fetched succesfully', data: {lbr,bdn,lbrstd,bdnstd} });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  createDirect,
  createSoJob,
  createPosWorkOrder,
  findOne,
  findAll,
  findBy,
  findByOne,
  update,
  deleteOne,
  CalcCost,
  CalcCostWo,
};
