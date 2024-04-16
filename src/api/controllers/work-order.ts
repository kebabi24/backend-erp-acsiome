import WorkOrderService from '../../services/work-order';
import WoroutingService from '../../services/worouting';
import WorkroutingService from '../../services/workrouting';
import ItemService from '../../services/item';
import CodeService from '../../services/code';
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
import SaleOrderDetailService from '../../services/saleorder-detail';
import LocationDetailService from '../../services/location-details';
import LabelService from '../../services/label';
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
      let draw : any;
      let ref : any;
      let rev : any;
      let batch : any;
      let grade : any;
      const parts = await itemServiceInstance.find({ pt_domain: user_domain,pt_part: it.wo_part });
      for(let carac of parts){
        draw = carac.pt_draw,
        ref = carac.pt_article,
        rev = carac.pt_rev,
        batch = carac.pt_break_cat,
        grade = carac.pt_group
      }
      await workOrderServiceInstance
        .create({
          ...item,
          ...it,
          wo_rev: rev,
          wo_draw: draw,
          wo_ref : ref,
          wo_batch : batch,
          wo_grade : grade,
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
    const { detail,profile,site,date,date1} = req.body;
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const woroutingServiceInstance = Container.get(WoroutingService);
    const workroutingServiceInstance = Container.get(WorkroutingService);
    const itemServiceInstance = Container.get(ItemService);
    const sequenceServiceInstance = Container.get(sequenceService);
    const saleOrderDetailServiceInstance =  Container.get(SaleOrderDetailService)
   
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
      let draw : any;
      let ref : any;
      let rev : any;
      let batch : any;
      let grade : any;
      const parts = await itemServiceInstance.find({ pt_domain: user_domain,pt_part: item.part });
      for(let carac of parts){
        draw = carac.pt_draw,
        ref = carac.pt_article,
        rev = carac.pt_rev,
        batch = carac.pt_break_cat,
        grade = carac.pt_group
      }
      await workOrderServiceInstance
        .create({
          
          wo_part:item.part,
          wo_bom_code: item.nomo,
          wo_site: site,
          wo_routing:item.gamme,
          wo_bo_chg : item.bo_chg,
          wo_qty_ord: item.prod_qty,
          wo_ord_date: new Date(),
          wo_rel_date: item.rel_date,
          wo_due_date: item.due_date,
          wo_status: "F",
          wo_so_job: "SO",
          wo_queue_eff: item.queue_eff,
          wo_domain: user_domain,
          wo_nbr: nof,
          wo_rev: rev,
          wo_draw: draw,
          wo_ref : ref,
          wo_batch : batch,
          wo_grade : grade,
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
    //   const soss =   await saleOrderDetailServiceInstance.find({sod_domain : user_domain,sod_due_date : {
    //     [Op.between]: [date, date1],
    //   },sod_part:item.part })
    // for (let sos of soss) {
      const sod = await saleOrderDetailServiceInstance.update(
        { sod_job: wolot, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
        {sod_domain : user_domain,sod_due_date : {
          [Op.between]: [date, date1],
        },sod_part:item.part },
      );
    // }
 
    }
    }
   
    const wos = await workOrderServiceInstance.find({wo_domain: user_domain, id : woids});
  
    return res.status(200).json({ message: 'deleted succesfully', data: wos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createSfJob = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling update one  code endpoint');
  try {
    const { detail,profile,site,date,date1} = req.body;
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const woroutingServiceInstance = Container.get(WoroutingService);
    const workroutingServiceInstance = Container.get(WorkroutingService);
    const itemServiceInstance = Container.get(ItemService);
    const sequenceServiceInstance = Container.get(sequenceService);

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
      let draw : any;
      let ref : any;
      let rev : any;
      let batch : any;
      let grade : any;
      const parts = await itemServiceInstance.find({ pt_domain: user_domain,pt_part: item.part });
      for(let carac of parts){
        draw = carac.pt_draw,
        ref = carac.pt_article,
        rev = carac.pt_rev,
        batch = carac.pt_break_cat,
        grade = carac.pt_group
      }
      await workOrderServiceInstance
        .create({
          
          wo_part:item.part,
          wo_bom_code: item.nomo,
          wo_site: site,
          wo_routing:item.gamme,
          wo_qty_ord: item.prod_qty,
          wo_ord_date: new Date(),
          wo_rel_date: item.rel_date,
          wo_due_date: item.due_date,
          wo_status: (item.create) ? "F" : "P",
          wo_so_job: "SO",
          wo_queue_eff: item.queue_eff,
          wo_domain: user_domain,
          wo_nbr: nof,
          wo_rev: rev,
          wo_draw: draw,
          wo_ref : ref,
          wo_batch : batch,
          wo_grade : grade,
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
    
  
    const wopfs = await workOrderServiceInstance.update(
      { wo__qad01: "SF", last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { wo_rel_date : {[Op.between]: [date, date1]},wo_status:"F" ,wo_domain: user_domain},
    );
 
      
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

  try {
    const { it, nof } = req.body;
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const woroutingServiceInstance = Container.get(WoroutingService);
    const workroutingServiceInstance = Container.get(WorkroutingService);
    const itemServiceInstance = Container.get(ItemService);

  
      let wolot = 0;
      let draw : any;
      let ref : any;
      let rev : any;
      let batch : any;
      let grade : any;
      
      const parts = await itemServiceInstance.find({ pt_domain: user_domain,pt_part: it.wo_part });
      for(let carac of parts){
        draw = carac.pt_draw,
        ref = carac.pt_article,
        rev = carac.pt_rev,
        batch = carac.pt_break_cat,
        grade = carac.pt_group
      }
     
      await workOrderServiceInstance
        .create({
          ...it,
          wo_domain: user_domain,
          wo_nbr: nof,
          wo_type : "DIRECT",
          wo_status: "R",
          wo_rev: rev,
          wo_draw: draw,
          wo_ref : ref,
          wo_batch : batch,
          wo_grade : grade,
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
        
        if (ps.length > 0) {
  

          for (const pss of ps) {
            
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

     
        const supp = product.suppliments;
        for (const s of supp) {
          const s_part = s.pt_part;
         
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
 
  
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find all wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const codeServiceInstance = Container.get(CodeService);
    const codes = await codeServiceInstance.findOne({ code_domain:user_domain,code_fldname: user_code });
    if (codes == null) {const wos = await workOrderServiceInstance.find({wo_domain: user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: wos });}
    else{const wos = await workOrderServiceInstance.find({wo_domain: user_domain,wo_routing: codes.code_value});
    return res.status(200).json({ message: 'fetched succesfully', data: wos });}
    
    
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
  const { user_domain } = req.headers;
  //
  logger.debug('Calling update one  wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const { id } = req.params;
    const of = await workOrderServiceInstance.findOne({
    
      wo_domain: user_domain,
      id: req.body.id
    
  });
  let diff1 = Number(Number(of.wo_qty_ord) - Number(req.body.wo_qty.comp));
  let diff2 = Number(Number(req.body.wo_qty.rjct) / Number(Number(req.body.wo_qty.rjct) + Number(req.body.wo_qty.comp)))
    const wo = await workOrderServiceInstance.update(
      { ...req.body, wo_qty_chg: diff1, wo_yield_pct: diff2, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
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
   // 
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
   // 
     
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

const findBywo = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  //
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all requisition endpoint');
  try {
    const {site,date,date1} = req.body;
    const itemServiceInstance = Container.get(ItemService);
    const locationDetailServiceInstance = Container.get(LocationDetailService)
    const workOrderServiceInstance = Container.get(WorkOrderService)
    const psServiceInstance   = Container.get(psService)

const orders = await workOrderServiceInstance.findSpecial({
  where: {
    wo_domain: user_domain,
    wo_status : "F",
    wo__qad01 : null,
    wo_rel_date:  {
      [Op.between]: [date, date1],
    },

  },
  attributes: [
    //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
    'wo_part',
    [Sequelize.fn('sum', Sequelize.col('wo_qty_ord')), 'total_qty'],
  ],
  group: ['wo_part' ],
  raw: true,
});

let sf = []
let i = 1
for (let ord of orders) {
const ps = await psServiceInstance.findby({ps_parent: ord.wo_part})
for (let p of ps) {


}
for (let p of ps) {
  if(p.item.pt_bom_code != null) {
   const sfid =  sf.findIndex(({ part }) => part == p.ps_comp);
if (sfid < 0 ) {
  let qtyonstok = 0
  let qtyonprod = 0

  const ld = await locationDetailServiceInstance.findSpecial({
    where: {
      ld_domain:user_domain,
      ld_part: p.ps_comp,
      ld_site: site,
    },
    attributes: [ [Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'total_qtyoh']],
    group: ['ld_part' ],
    raw: true,
  });
  qtyonstok = ld[0] ? ld[0].total_qtyoh : 0 
  
  const wo = await workOrderServiceInstance.findSpecial({
    where: {
      wo_domain:user_domain,
      wo_part: p.ps_comp,
      wo_site: site,
      wo_status: "R"  
    },
    attributes: ['wo_part', [Sequelize.fn('sum', Sequelize.col('wo_qty_ord')), 'total_qtyprod']],
    group: ['wo_part', ],
    raw: true,
  });
  qtyonprod = wo[0] ?  wo[0].total_qtyprod : 0

  let obj = {
    id: i,
    part: p.ps_comp,
    desc1: p.item.pt_desc1,
    nomo: p.item.pt_bom_code,
    gamme: p.item.pt_routing,
    qtyoh: qtyonstok,
    sfty_qty: p.item.pt_sfty_stk,
    qtylanch: qtyonprod,
    ord_qty: ord.total_qty * p.ps_qty_per,
    prod_qty: ord.total_qty * p.ps_qty_per

  }
sf.push(obj)
i = i + 1
}
else {

sf[sfid].ord_qty = sf[sfid].ord_qty +  ord.total_qty * p.ps_qty_per
sf[sfid].prod_qty = sf[sfid].ord_qty +  ord.total_qty * p.ps_qty_per


}
  }
}


}
  return res.status(202).json({
    message: 'sec',
    data: sf,
  });
  } catch (e){
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByRPBR = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all wo endpoint');
  const { user_domain } = req.headers;
  try {
    const {site,date,date1} = req.body;
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService);
    const wos = await workOrderServiceInstance.find({ wo_rel_date : { [Op.between]: [date, date1]} , wo_site: site, wo_type : "BR",wo_domain: user_domain});
   
    let result = []
    let i = 1
    let obj
    for(let wo of wos) {
    
      const isswo = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain, tr_nbr: wo.wo_nbr, tr_type: "ISS-WO"})
      const rctwo = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain, tr_nbr: wo.wo_nbr, tr_type: "RCT-WO"})
   
    for (let tr of rctwo) {
      ;
          } 
    
    
      if(rctwo.length > isswo.length) {

        for (var j=0;j< rctwo.length; j++) {
          const labelServiceInstance = Container.get(LabelService);
          const orgpal = await labelServiceInstance.findOne({ lb_ref:isswo[j].tr_ref })

          if(j < isswo.length) {
             obj = {
              id:i,
              date: (j==0) ? wo.wo_rel_date : "",
              equipe: (j==0) ?  wo.wo__chr01 : "",
              gamme: (j==0) ? wo.wo_routing : "",
              nbr: (j==0) ?  wo.wo_nbr: "",
              rctpart: rctwo[j].item.pt_desc1,
              rctcolor: rctwo[j].item.pt_break_cat,
              rctqty : rctwo[j].tr_qty_loc,
              rctserial : rctwo[j].tr_serial,
              rctpal : rctwo[j].tr_ref,
              isspart: isswo[j].item.pt_desc1,
              isscolor: isswo[j].item.pt_break_cat,
              issorigin: orgpal.lb_cust,
              issqty : -isswo[j].tr_qty_loc,
              issserial : isswo[j].tr_serial,
              isspal : isswo[j].tr_ref,
              isstime: isswo[j].tr_program,
            }
          } else {
             obj = {
              id:i,
              date: (j==0) ? wo.wo_rel_date : "",
              equipe: (j==0) ?  wo.wo__chr01 : "",
              gamme: (j==0) ? wo.wo_routing : "",
              nbr: (j==0) ?  wo.wo_nbr: "",
              rctpart: rctwo[j].item.pt_desc1,
              rctcolor: rctwo[j].item.pt_break_cat,
              rctqty : rctwo[j].tr_qty_loc,
              rctserial : rctwo[j].tr_serial,
              rctpal : rctwo[j].tr_ref,
              isspart: "",
              isscolor: "",
              issorigin: "",
              issqty : "",
              issserial : "",
              isspal : "",
              isstime:""
            }
          }
          result.push(obj)
          i = i + 1
        }

      } else {
        for (var j = 0;j < isswo.length; j++) {
          const labelServiceInstance = Container.get(LabelService);
          const orgpal = await labelServiceInstance.findOne({ lb_ref:isswo[j].tr_ref })
     
          if(j < rctwo.length) {
             obj = {
              id:i,
              date: (j==0) ? wo.wo_rel_date : "",
              equipe: (j==0) ?  wo.wo__chr01 : "",
              gamme: (j==0) ? wo.wo_routing : "",
              nbr: (j==0) ?  wo.wo_nbr: "",
              rctpart: rctwo[j].item.pt_desc1,
              rctcolor: rctwo[j].item.pt_break_cat,
              rctqty : rctwo[j].tr_qty_loc,
              rctserial : rctwo[j].tr_serial,
              rctpal : rctwo[j].tr_ref,
              isspart: isswo[j].item.pt_desc1,
              isscolor: isswo[j].item.pt_break_cat,
              issorigin:orgpal.lb_cust,
              issqty : -isswo[j].tr_qty_loc,
              issserial : isswo[j].tr_serial,
              isspal : isswo[j].tr_ref,
              isstime: isswo[j].tr_program,
            }
          } else {
             obj = {
              id:i,
              date: (j==0) ? wo.wo_rel_date : "",
              equipe: (j==0) ?  wo.wo__chr01 : "",
              gamme: (j==0) ? wo.wo_routing : "",
              nbr: (j==0) ?  wo.wo_nbr: "",
              rctpart: "",
              rctcolor: "",
              rctqty : "",
              rctserial : "",
              rctpal : "",
              isspart: isswo[j].item.pt_desc1,
              isscolor: isswo[j].item.pt_break_cat,
              issorigin: orgpal.lb_cust,
              issqty : -isswo[j].tr_qty_loc,
              issserial : isswo[j].tr_serial,
              isspal : isswo[j].tr_ref,
              isstime:""
            }
          }
          result.push(obj)
          i = i + 1
        }

      }

    }
    

    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByRecapBR = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all wo endpoint');
  const { user_domain } = req.headers;
  try {
    const {site,date,date1} = req.body;
    const workRoutingServiceInstance = Container.get(WorkroutingService);
    const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService);
    const ros = await workRoutingServiceInstance.find({ ro_wkctr : "BROYAGE",ro_domain: user_domain});
    
    let result = []
    let i = 0
    
    let obj
    for(let ro of ros) {
      
      
      
      const rctwo = await inventoryTransactionServiceInstance.findSpecial({
        where:{tr_domain: user_domain, tr_effdate: { [Op.between]: [date, date1]},tr_addr:ro.ro_routing, tr_type: "RCT-WO"},
        attributes: [
        'tr__chr01',
        'tr__chr02',
        'tr_site',
        'tr_effdate',
        'dec01',
        'dec02',
        'tr_user1',
        [Sequelize.fn('sum', Sequelize.col('tr_qty_loc')), 'qty'],
        
      ],
      group: ['tr__chr01','tr__chr02', 'tr_site', 'tr_effdate','dec01','dec02','tr_user1'],
      raw: true,})
      
      
     for (let wrct of rctwo)
     {
      let sommeISSWO = 0  
      let sommeperte = 0 
      let sommereprise = 0 
      let dif = 0
      let taux = 0
      
      const daterct = await inventoryTransactionServiceInstance.findSpecial({where:{tr_domain: user_domain, tr_effdate:wrct.tr_effdate,tr_addr:ro.ro_routing, tr_type: "RCT-WO"},
      attributes: [
      'tr__chr01',
      'tr__chr02',
      'tr_site',
      'tr_effdate',
      'dec01',
      'dec02',
      'tr_user1',
      [Sequelize.fn('sum', Sequelize.col('tr_qty_loc')), 'qty'],
      
    ],
    group: ['tr__chr01','tr__chr02', 'tr_site', 'tr_effdate','dec01','dec02','tr_user1'],
    raw: true,})
        
     const isswo = await inventoryTransactionServiceInstance.find({tr_domain: user_domain, tr_effdate: wrct.tr_effdate, tr_type: "ISS-WO",tr_addr:ro.ro_routing,tr__chr01:wrct.tr__chr01,tr__chr02:wrct.tr__chr02})
     const RCTUNP01 = await inventoryTransactionServiceInstance.find({tr_domain: user_domain,tr_effdate:wrct.tr_effdate, tr_addr: ro.ro_routing, tr_type: "RCT-UNP",tr__chr01:'PERTE' })
     const RCTUNP02 = await inventoryTransactionServiceInstance.find({tr_domain: user_domain,tr_effdate:wrct.tr_effdate, tr_addr: ro.ro_routing, tr_type: "RCT-UNP",tr__chr01:wrct.tr__chr01,tr__chr02:wrct.tr__chr02 })
     
     for (let tr of isswo){sommeISSWO = sommeISSWO - tr.tr_qty_loc}
     for (let unp01 of RCTUNP01){sommeperte = Number(Number(sommeperte + Number(unp01.tr_qty_loc)).toFixed(2))}
     sommeperte = Number(Number(sommeperte / daterct.length).toFixed(2))
     for (let unp02 of RCTUNP02){sommereprise = sommereprise + Number(unp02.tr_qty_loc)} 
     dif = Number(Number(wrct.qty - sommeISSWO + sommeperte + sommereprise).toFixed(2))
     taux = Number(Number(Number(sommeperte) * 100 / Number(wrct.qty)).toFixed(2)) 
     
      obj = {
        id:i,
        annee:wrct.dec01,
        mois:wrct.dec02,
        date: wrct.tr_effdate,
        equipe:wrct.tr_user1,
        gamme:ro.ro_routing,
        rctpart: wrct.tr__chr01,
        rctcolor: wrct.tr__chr02,
        rctqty : wrct.qty,
        rctserial : wrct.tr_serial,
        rctpal : wrct.tr_ref,
        issqty : sommeISSWO,
        dechet: sommeperte,
        reprise: sommereprise,
        diff:dif,
        taux_perte:taux,
      }
      
      result.push(obj)
      i = i + 1
    }
   
    
    
    


    }
    
    
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};




export default {
  create,
  createDirect,
  createSoJob,
  createSfJob,
  createPosWorkOrder,
  findOne,
  findAll,
  findBy,
  findByOne,
  update,
  deleteOne,
  CalcCost,
  CalcCostWo,
  findBywo,
  findByRPBR,
  findByRecapBR

};
