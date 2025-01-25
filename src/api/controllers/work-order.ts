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
import { multiply, orderBy, result } from 'lodash';
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
import inventoryTransactionService from '../../services/inventory-transaction';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling update one  code endpoint');
  try {
    const { detail, it } = req.body;
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const woroutingServiceInstance = Container.get(WoroutingService);
    const workroutingServiceInstance = Container.get(WorkroutingService);
    const itemServiceInstance = Container.get(ItemService);
    const inventoryTransactionServiceInstance = Container.get(inventoryTransactionService);
    const sequenceServiceInstance = Container.get(sequenceService)
    for (const item of detail) {
      let wolot = 0;
      let draw : any;
      let ref : any;
      let rev : any;
      let batch : any;
      let grade : any;
      let mic:any;
      let lai:any;
      let desc:any;
      let um:any;
      let pl:any;
      let type:any;
      const parts = await itemServiceInstance.find({ pt_domain: user_domain,pt_part: item.wo_part });
      for(let carac of parts){
        draw = carac.pt_draw,
        ref = carac.pt_article,
        rev = carac.pt_rev,
        batch = carac.pt_break_cat,
        grade = carac.pt_group
        mic = carac.int01
        lai = carac.int02
        desc = carac.pt_desc1
        um = carac.pt_um
        pl = carac.pt_prod_line
        type = carac.pt_part_type
      }
      console.log(item)
if(item.woid == null || item.woid == "")
    { const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_type: 'OF',seq_seq:'OF' });
let nof = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
await sequenceServiceInstance.update(
{ seq_curr_val: Number(seq.seq_curr_val) + 1 },
{ id: seq.id, seq_type: 'OF',seq_seq:'OF',  seq_domain: user_domain },
);   
      
      await workOrderServiceInstance
        .create({
          ...item,
          ...it,
          wo_queue_eff:item.line,
           wo_rev: '01',
          wo_draw: draw,
          wo_ref : ref,
          wo_batch : batch,
          wo_grade : grade,
          int01:mic,
          int02:lai,
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
    }    
else{let revision = 1
  const wos = await workOrderServiceInstance.findOne({ id:item.woid,wo_domain: user_domain })
  revision = Number(wos.wo_rev) + 1
  console.log(revision)
  await workOrderServiceInstance.update(
  { wo_rev:revision, wo_queue_eff: item.line,wo_status:item.wo_status, wo_rel_date:item.wo_rel_date,wo_due_date:item.wo_due_date,wo_qty_ord:item.wo_qty_ord,wo_bo_chg:item.wo_bo_chg,chr01:item.chr01,chr02:item.chr02,last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
  { id : item.woid,wo_domain: user_domain},
);} 
if(item.woid == null || item.woid == "")
  {await workOrderServiceInstance.update(
  { wo_lot:wolot },
  { id : wolot,wo_domain: user_domain},) }  
      
      
      
  await inventoryTransactionServiceInstance.create({
    tr_rmks:it.wo_rmks,
    tr_user1:'',
    tr_addr:it.wo_routing,
    tr_part:item.wo_part,
    tr_site:'1000',
    tr_loc:'EMPL PLAST2',
    tr_serial: '',
    tr_domain:user_domain,
    tr_status: '',
    tr_expire: item.wo_due_date,
    tr_ref: '',
    tr_qty_loc: item.wo_qty_ord,
    tr_type: 'ORD-WO',
    tr_line: item.wo_queue_eff,
    tr_um: um,
    tr_effdate: item.wo_rel_date,
    tr_date: new Date(),
    tr_price: 0,
    tr_mtl_std: 0,
    tr_lbr_std: 0,
    tr_bdn_std: 0,
    tr_ovh_std: 0,
    tr_sub_std: 0,
    tr_desc:desc,
      tr_prod_line: pl,
      tr__chr01:draw,
      tr__chr02:batch,
      tr__chr03:grade,
      dec01:Number(new Date().getFullYear()),
      dec02:Number(new Date().getMonth() + 1),
      tr_program:new Date().toLocaleTimeString(),
      tr_batch:'',
      tr_grade:'',
    created_by: user_code,
    created_ip_adr: req.headers.origin,
    last_modified_by: user_code,
    last_modified_ip_adr: req.headers.origin,
    
      tr__chr04:type,
      int01:mic,
      int02:lai,
      
  });
      const ros = await workroutingServiceInstance.find({ ro_domain: user_domain,ro_routing: it.wo_routing,ro__chr01:batch, ro__dec01:mic});
      if (ros.data = null){const ros = await workroutingServiceInstance.find({ ro_domain: user_domain,ro_routing: it.wo_routing,ro_op:0 });
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
    else{
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
    
    
      const wos = await workOrderServiceInstance.find({wo_domain: user_domain});
      return res.status(200).json({ message: 'fetched succesfully', data: wos });
    
    
    
    
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  SOME wo endpoint');
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
const findByPrograms = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  SOME wo endpoint');
  const { user_domain } = req.headers;
  try {
        const workOrderServiceInstance = Container.get(WorkOrderService);
        const wos = await workOrderServiceInstance.find({ ...req.body,wo_queue_eff: 1 , wo_domain: user_domain});
        let result= []
        let obj
        let i = 0
        for (let wo of wos){
          console.log('wo',wo.wo_so_job,wos.length)
          const ofs = await workOrderServiceInstance.find({wo_so_job:wo.wo_so_job , wo_domain: user_domain});
          const firstof = await workOrderServiceInstance.findOne({wo_so_job:wo.wo_so_job ,wo_queue_eff:1, wo_domain: user_domain});
          
          let qty_ord = 0
          let qty_comp = 0
          let qty_rjct = 0
          let last_date= new Date()
          let last_hour:any;
          for (let of of ofs){
            qty_ord = Number(qty_ord) + Number(of.wo_qty_ord)
            qty_comp = Number(qty_comp) + Number(of.wo_qty_comp)
            qty_rjct = Number(qty_rjct) + Number(of.wo_qty_rjct)
            last_date = of.wo_due_date
            last_hour = of.chr02
          }
          obj = {id : i,wo_so_job:wo.wo_so_job,wo_rev:wo.wo_rev,wo_queue_eff:ofs.length,wo_qty_ord:qty_ord,wo_qty_comp:qty_comp,wo_qty_rjct:qty_rjct,wo_rel_date:firstof.wo_rel_date,wo_due_date:last_date,chr01:firstof.chr01,chr02:last_hour,wo_routing:firstof.wo_routing}
          result.push(obj)
          i = i + 1
        }
        
      
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByDistinct = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all wo endpoint');
  const { user_domain } = req.headers;
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const wos = await workOrderServiceInstance.find({ ...req.body ,wo_queue_eff:1, wo_domain: user_domain});
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
    const workRoutingServiceInstance = Container.get(WorkroutingService);
     const { id } = req.params;
     let result=[]
     let passage = Number(req.body.wo_queue_eff)
    let lancement = req.body.wo_due_date
    let echeance  = req.body.wo_due_date
    const of = await workOrderServiceInstance.findOne({wo_domain: user_domain,id: id});
    const ros = await workRoutingServiceInstance.find({ ro_routing : req.body.wo_routing,ro_domain: user_domain});
  for (let ro of ros){
    let version = of.wo_rev;
    version = Number(version) + 1;
    let diff2 = 0
    let diff1 = Number(Number(of.wo_qty_comp) - Number(req.body.wo_qty_ord));
    if (of.wo_qty_comp != 0){diff2 = Number(Number(of.wo_qty_rjct) / Number(Number(of.wo_qty_rjct) + Number(of.wo_qty_comp)))}
    const wo = await workOrderServiceInstance.update({ ...req.body, wo_rev: version, wo_qty_chg: diff1, wo_yield_pct: diff2, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin},{ id });
    result.push(wo);
    const ofs = await workOrderServiceInstance.find({wo_domain: user_domain,wo_nbr: of.wo_nbr,wo_queue_eff:{[Op.gte]:req.body.wo_queue_eff},id:{[Op.ne]:id}});
    for (let wos of ofs){ 
      let jours = Number(Number(req.body.wo_qty_ord) / (Number(ro.ro_run) * 24))
        //  echeance.setDate(lancement.getDate() + jours)
         passage = passage + 1
         const otherwo = await workOrderServiceInstance.update({ wo_rel_date:lancement,wo_due_date:echeance,wo_queue_eff:passage, wo__log01: true,last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },{ wo_nbr:wos.wo_nbr,wo_queue_eff:wos.wo_queue_eff,id:{[Op.ne]:id},wo__log01:{[Op.ne]:true} });
         lancement = echeance
         result.push(otherwo)
    }
    const rewo = await workOrderServiceInstance.update({ wo__log01: null,last_modified_by: user_code, last_modified_ip_adr: req.headers.origin},{ wo_nbr:of.wo_nbr,wo__log01:true })
    result.push(rewo)
    return res.status(200).json({ message: 'fetched succesfully', data: result });
    
  }
}
catch (e) {logger.error('🔥 error: %o', e);return next(e)}
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
    const {site,gamme,date,date1,start_time,end_time} = req.body;
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService);
    const wos = await workOrderServiceInstance.find({ wo_routing:gamme,wo_ord_date : { [Op.between]: [date, date1]} , wo_site: site, wo_type : "BR",wo_domain: user_domain});
   
    let result = []
    let i = 1
    let obj
    for(let wo of wos) 
    {
      
      if(new Date(wo.updatedAt).toLocaleDateString() < new Date(date1).toLocaleDateString()  && new Date(wo.updatedAt).toLocaleDateString() > new Date(date).toLocaleDateString())   
      {
        console.log(date,start_time,wo.wo_ord_date,wo.wo_nbr,new Date(wo.updatedAt).toLocaleDateString(),new Date(wo.updatedAt).toLocaleTimeString(),date1,end_time)
        const isswo = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain, tr_nbr: wo.wo_nbr, tr_type: "ISS-WO"})
        const rctwo = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain, tr_nbr: wo.wo_nbr, tr_type: "RCT-WO"})
   
        for (let tr of rctwo) 
        {
      ;
        } 
    
    
        if(rctwo.length > isswo.length)  
        {

        for (var j=0;j< rctwo.length; j++) {
          
          const labelServiceInstance = Container.get(LabelService);
          // const orgpal = await labelServiceInstance.findOne({ lb_ref:isswo[j].tr_ref })

          if(j < isswo.length) {
             obj = {
              id:i,
              date: (j==0) ? wo.wo_rel_date : "",
              equipe: (j==0) ?  wo.wo__chr01 : "",
              gamme: (j==0) ? wo.wo_routing : "",
              nbr: (j==0) ?  wo.wo_nbr: "",
              rctpart: rctwo[j].item.pt_draw,
              rctcolor: rctwo[j].item.pt_break_cat,
              rctqty : rctwo[j].tr_qty_loc,
              rctserial : rctwo[j].tr_serial,
              rctpal : rctwo[j].tr_ref,
              isspart: isswo[j].item.pt_draw,
              isscolor: isswo[j].item.pt_break_cat,
              // issorigin: orgpal.lb_cust,
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
              rctpart: rctwo[j].item.pt_draw,
              rctcolor: rctwo[j].item.pt_break_cat,
              rctqty : rctwo[j].tr_qty_loc,
              rctserial : rctwo[j].tr_serial,
              rctpal : rctwo[j].tr_ref,
              isspart: "",
              isscolor: null,
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

        } else 
        {
          for (var j = 0;j < isswo.length; j++) {
          
          const labelServiceInstance = Container.get(LabelService);
          // const orgpal = await labelServiceInstance.findOne({ lb_ref:isswo[j].tr_ref })
     
          if(j < rctwo.length) {
             obj = {
              id:i,
              date: (j==0) ? wo.wo_rel_date : "",
              equipe: (j==0) ?  wo.wo__chr01 : "",
              gamme: (j==0) ? wo.wo_routing : "",
              nbr: (j==0) ?  wo.wo_nbr: "",
              rctpart: rctwo[j].item.pt_draw,
              rctcolor: rctwo[j].item.pt_break_cat,
              rctqty : rctwo[j].tr_qty_loc,
              rctserial : rctwo[j].tr_serial,
              rctpal : rctwo[j].tr_ref,
              isspart: isswo[j].item.pt_draw,
              isscolor: isswo[j].item.pt_break_cat,
              // issorigin:orgpal.lb_cust,
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
              isspart: isswo[j].item.pt_draw,
              isscolor: isswo[j].item.pt_break_cat,
              // issorigin: orgpal.lb_cust,
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
      
      if(new Date(date1).toLocaleDateString() == new Date(date).toLocaleDateString() && new Date(wo.updatedAt).toLocaleDateString() == new Date(date1).toLocaleDateString()  && new Date(wo.updatedAt).toLocaleTimeString() <= end_time && new Date(wo.updatedAt).toLocaleTimeString() >= start_time)   
          {
            console.log(date,start_time,wo.wo_ord_date,wo.wo_nbr,new Date(wo.updatedAt).toLocaleDateString(),new Date(wo.updatedAt).toLocaleTimeString(),date1,end_time)
            const isswo = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain, tr_nbr: wo.wo_nbr, tr_type: "ISS-WO"})
            const rctwo = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain, tr_nbr: wo.wo_nbr, tr_type: "RCT-WO"})
       
            for (let tr of rctwo) 
            {
          ;
            } 
        
        
            if(rctwo.length > isswo.length)  
            {
    
            for (var j=0;j< rctwo.length; j++) {
              
              const labelServiceInstance = Container.get(LabelService);
              // const orgpal = await labelServiceInstance.findOne({ lb_ref:isswo[j].tr_ref })
    
              if(j < isswo.length) {
                 obj = {
                  id:i,
                  date: (j==0) ? wo.wo_rel_date : "",
                  equipe: (j==0) ?  wo.wo__chr01 : "",
                  gamme: (j==0) ? wo.wo_routing : "",
                  nbr: (j==0) ?  wo.wo_nbr: "",
                  rctpart: rctwo[j].item.pt_draw,
                  rctcolor: rctwo[j].item.pt_break_cat,
                  rctqty : rctwo[j].tr_qty_loc,
                  rctserial : rctwo[j].tr_serial,
                  rctpal : rctwo[j].tr_ref,
                  isspart: isswo[j].item.pt_draw,
                  isscolor: isswo[j].item.pt_break_cat,
                  // issorigin: orgpal.lb_cust,
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
                  rctpart: rctwo[j].item.pt_draw,
                  rctcolor: rctwo[j].item.pt_break_cat,
                  rctqty : rctwo[j].tr_qty_loc,
                  rctserial : rctwo[j].tr_serial,
                  rctpal : rctwo[j].tr_ref,
                  isspart: "",
                  isscolor: null,
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
    
            } else 
            {
              for (var j = 0;j < isswo.length; j++) {
              
              const labelServiceInstance = Container.get(LabelService);
              // const orgpal = await labelServiceInstance.findOne({ lb_ref:isswo[j].tr_ref })
         
              if(j < rctwo.length) {
                 obj = {
                  id:i,
                  date: (j==0) ? wo.wo_rel_date : "",
                  equipe: (j==0) ?  wo.wo__chr01 : "",
                  gamme: (j==0) ? wo.wo_routing : "",
                  nbr: (j==0) ?  wo.wo_nbr: "",
                  rctpart: rctwo[j].item.pt_draw,
                  rctcolor: rctwo[j].item.pt_break_cat,
                  rctqty : rctwo[j].tr_qty_loc,
                  rctserial : rctwo[j].tr_serial,
                  rctpal : rctwo[j].tr_ref,
                  isspart: isswo[j].item.pt_draw,
                  isscolor: isswo[j].item.pt_break_cat,
                  // issorigin:orgpal.lb_cust,
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
                  isspart: isswo[j].item.pt_draw,
                  isscolor: isswo[j].item.pt_break_cat,
                  // issorigin: orgpal.lb_cust,
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
        
      if(new Date(date1).toLocaleDateString() != new Date(date).toLocaleDateString() && (new Date(wo.updatedAt).toLocaleDateString() == new Date(date).toLocaleDateString()  && new Date(wo.updatedAt).toLocaleTimeString() >= start_time) )   
            {
              console.log(date,start_time,wo.wo_ord_date,wo.wo_nbr,new Date(wo.updatedAt).toLocaleDateString(),new Date(wo.updatedAt).toLocaleTimeString(),date1,end_time)
              const isswo = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain, tr_nbr: wo.wo_nbr, tr_type: "ISS-WO"})
              const rctwo = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain, tr_nbr: wo.wo_nbr, tr_type: "RCT-WO"})
         
              for (let tr of rctwo) 
              {
            ;
              } 
          
          
              if(rctwo.length > isswo.length)  
              {
      
              for (var j=0;j< rctwo.length; j++) {
                
                const labelServiceInstance = Container.get(LabelService);
                // const orgpal = await labelServiceInstance.findOne({ lb_ref:isswo[j].tr_ref })
      
                if(j < isswo.length) {
                   obj = {
                    id:i,
                    date: (j==0) ? wo.wo_rel_date : "",
                    equipe: (j==0) ?  wo.wo__chr01 : "",
                    gamme: (j==0) ? wo.wo_routing : "",
                    nbr: (j==0) ?  wo.wo_nbr: "",
                    rctpart: rctwo[j].item.pt_draw,
                    rctcolor: rctwo[j].item.pt_break_cat,
                    rctqty : rctwo[j].tr_qty_loc,
                    rctserial : rctwo[j].tr_serial,
                    rctpal : rctwo[j].tr_ref,
                    isspart: isswo[j].item.pt_draw,
                    isscolor: isswo[j].item.pt_break_cat,
                    // issorigin: orgpal.lb_cust,
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
                    rctpart: rctwo[j].item.pt_draw,
                    rctcolor: rctwo[j].item.pt_break_cat,
                    rctqty : rctwo[j].tr_qty_loc,
                    rctserial : rctwo[j].tr_serial,
                    rctpal : rctwo[j].tr_ref,
                    isspart: "",
                    isscolor: null,
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
      
              } else 
              {
                for (var j = 0;j < isswo.length; j++) {
                
                const labelServiceInstance = Container.get(LabelService);
                // const orgpal = await labelServiceInstance.findOne({ lb_ref:isswo[j].tr_ref })
           
                if(j < rctwo.length) {
                   obj = {
                    id:i,
                    date: (j==0) ? wo.wo_rel_date : "",
                    equipe: (j==0) ?  wo.wo__chr01 : "",
                    gamme: (j==0) ? wo.wo_routing : "",
                    nbr: (j==0) ?  wo.wo_nbr: "",
                    rctpart: rctwo[j].item.pt_draw,
                    rctcolor: rctwo[j].item.pt_break_cat,
                    rctqty : rctwo[j].tr_qty_loc,
                    rctserial : rctwo[j].tr_serial,
                    rctpal : rctwo[j].tr_ref,
                    isspart: isswo[j].item.pt_draw,
                    isscolor: isswo[j].item.pt_break_cat,
                    // issorigin:orgpal.lb_cust,
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
                    isspart: isswo[j].item.pt_draw,
                    isscolor: isswo[j].item.pt_break_cat,
                    // issorigin: orgpal.lb_cust,
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
      if(new Date(date1).toLocaleDateString() != new Date(date).toLocaleDateString() && (new Date(wo.updatedAt).toLocaleDateString() == new Date(date1).toLocaleDateString()  && new Date(wo.updatedAt).toLocaleTimeString() <= end_time) )   
            {
              console.log(date,start_time,wo.wo_ord_date,wo.wo_nbr,new Date(wo.updatedAt).toLocaleDateString(),new Date(wo.updatedAt).toLocaleTimeString(),date1,end_time)
              const isswo = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain, tr_nbr: wo.wo_nbr, tr_type: "ISS-WO"})
              const rctwo = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain, tr_nbr: wo.wo_nbr, tr_type: "RCT-WO"})
         
              for (let tr of rctwo) 
              {
            ;
              } 
          
          
              if(rctwo.length > isswo.length)  
              {
      
              for (var j=0;j< rctwo.length; j++) {
                
                const labelServiceInstance = Container.get(LabelService);
                // const orgpal = await labelServiceInstance.findOne({ lb_ref:isswo[j].tr_ref })
      
                if(j < isswo.length) {
                   obj = {
                    id:i,
                    date: (j==0) ? wo.wo_rel_date : "",
                    equipe: (j==0) ?  wo.wo__chr01 : "",
                    gamme: (j==0) ? wo.wo_routing : "",
                    nbr: (j==0) ?  wo.wo_nbr: "",
                    rctpart: rctwo[j].item.pt_draw,
                    rctcolor: rctwo[j].item.pt_break_cat,
                    rctqty : rctwo[j].tr_qty_loc,
                    rctserial : rctwo[j].tr_serial,
                    rctpal : rctwo[j].tr_ref,
                    isspart: isswo[j].item.pt_draw,
                    isscolor: isswo[j].item.pt_break_cat,
                    // issorigin: orgpal.lb_cust,
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
                    rctpart: rctwo[j].item.pt_draw,
                    rctcolor: rctwo[j].item.pt_break_cat,
                    rctqty : rctwo[j].tr_qty_loc,
                    rctserial : rctwo[j].tr_serial,
                    rctpal : rctwo[j].tr_ref,
                    isspart: "",
                    isscolor: null,
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
      
              } else 
              {
                for (var j = 0;j < isswo.length; j++) {
                
                const labelServiceInstance = Container.get(LabelService);
                // const orgpal = await labelServiceInstance.findOne({ lb_ref:isswo[j].tr_ref })
           
                if(j < rctwo.length) {
                   obj = {
                    id:i,
                    date: (j==0) ? wo.wo_rel_date : "",
                    equipe: (j==0) ?  wo.wo__chr01 : "",
                    gamme: (j==0) ? wo.wo_routing : "",
                    nbr: (j==0) ?  wo.wo_nbr: "",
                    rctpart: rctwo[j].item.pt_draw,
                    rctcolor: rctwo[j].item.pt_break_cat,
                    rctqty : rctwo[j].tr_qty_loc,
                    rctserial : rctwo[j].tr_serial,
                    rctpal : rctwo[j].tr_ref,
                    isspart: isswo[j].item.pt_draw,
                    isscolor: isswo[j].item.pt_break_cat,
                    // issorigin:orgpal.lb_cust,
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
                    isspart: isswo[j].item.pt_draw,
                    isscolor: isswo[j].item.pt_break_cat,
                    // issorigin: orgpal.lb_cust,
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
      
    }

    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByEXBR = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all wo endpoint');
  const { user_domain } = req.headers;
  try {
    const {site,date,date1,wo_nbr,shift,wo_lot} = req.body;
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService);
    let wos:any;
    
    if(wo_nbr == null || wo_nbr == ''){wos = await workOrderServiceInstance.find({ wo_rel_date : { [Op.between]: [date, date1]} , wo_routing:'U1',wo_site: site, wo_domain: user_domain});
    }
    else{wos = await workOrderServiceInstance.find({ id: wo_lot,wo_rel_date : { [Op.between]: [date, date1]} , wo_routing:'U1', wo_site: site, wo_domain: user_domain})}
     
    //  for(let it of wos){console.log(it.id)}
    let result = []
    let result2 = []
    let result3 = []
    let i = 1
    let m = 1
    let obj
    for(let wo of wos) {
      // console.log(wo.id)
      const PAI = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain,tr_addr:wo.wo_routing, tr_lot: String(wo.id), tr_type: "ISS-WO",tr__chr01:'PAYETTE',tr_effdate : { [Op.between]: [date, date1]}})
      const SQL = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain,tr_addr:wo.wo_routing, tr_lot: String(wo.id), tr_type: "ISS-WO",tr__chr01:'SQUELETTE',tr_effdate : { [Op.between]: [date, date1]}})
      const PRE = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain,tr_addr:wo.wo_routing, tr_lot: String(wo.id), tr_type: "ISS-WO",tr__chr01:'PREFORME',tr_effdate : { [Op.between]: [date, date1]}})
      const ORG = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain,tr_addr:wo.wo_routing, tr_lot: String(wo.id), tr_type: "ISS-WO",tr__chr01:'ORIGINAL',tr_effdate : { [Op.between]: [date, date1]}})
      const COL = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain,tr_addr:wo.wo_routing, tr_lot: String(wo.id), tr_type: "ISS-WO",tr__chr01:'COLORANT',tr_effdate : { [Op.between]: [date, date1]}})
      
      const rctwo = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain, tr_nbr: wo.wo_nbr, tr_type: "RCT-WO"})
      let maxlength = Math.max(PAI.length,SQL.length,PRE.length,ORG.length)
      if(maxlength > 0)
      {
        
        for (var j = 0;j < maxlength; j++) {
                    
            
            if(j < PAI.length && j < SQL.length && j < PRE.length && j < ORG.length) {
              console.log(1,1,1,1) 
              obj = {
                id:i,
                PAYREF: PAI[j].tr_ref,
                PAYCOLOR: PAI[j].tr__chr02,
                PAYQTY:-PAI[j].tr_qty_loc,
                PAYTIME:PAI[j].tr_program,
                PAYDEBIT: '',
                SQLREF: SQL[j].tr_ref,
                SQLCOLOR: SQL[j].tr__chr02,
                SQLQTY:-SQL[j].tr_qty_loc,
                SQLTIME:SQL[j].tr_program,
                SQLDEBIT: '',
                PREREF: PRE[j].tr_ref,
                PRECOLOR: PRE[j].tr__chr02,
                PREQTY:-PRE[j].tr_qty_loc,
                PRETIME:PRE[j].tr_program,
                PREDEBIT: '',
                ORGREF: ORG[j].tr_ref,
                ORGCOLOR: ORG[j].tr__chr02,
                ORGQTY:-ORG[j].tr_qty_loc,
                ORGTIME:ORG[j].tr_program,
                ORGDEBIT: '',
              }
              result.push(obj)
            } 
            else 
            {
              if(j > PAI.length){
                if(j < SQL.length && j < PRE.length && j < ORG.length)
                { 
                  console.log(0,1,1,1)
                  obj = {
                        id:i,
                        PAYREF: '',
                        PAYCOLOR: '',
                        PAYQTY:'',
                        PAYTIME:'',
                        PAYDEBIT: '',
                        SQLREF: SQL[j].tr_ref,
                        SQLCOLOR: SQL[j].tr__chr02,
                        SQLQTY:-SQL[j].tr_qty_loc,
                        SQLTIME:SQL[j].tr_program,
                        SQLDEBIT: '',
                        PREREF: PRE[j].tr_ref,
                        PRECOLOR: PRE[j].tr__chr02,
                        PREQTY:-PRE[j].tr_qty_loc,
                        PRETIME:PRE[j].tr_program,
                        PREDEBIT: '',
                        ORGREF: ORG[j].tr_ref,
                        ORGCOLOR: ORG[j].tr__chr02,
                        ORGQTY:-ORG[j].tr_qty_loc,
                        ORGTIME:ORG[j].tr_program,
                        ORGDEBIT: '',
                  }
                  result.push(obj)
                }
                else
                {
                  if(j > SQL.length )
                  { 
                    if( j < PRE.length && j < ORG.length)
                    { 
                      console.log(0,0,1,1)
                      obj = {
                          id:i,
                          PAYREF: '',
                          PAYCOLOR: '',
                          PAYQTY:'',
                          PAYTIME:'',
                          PAYDEBIT: '',
                          SQLREF: '',
                          SQLCOLOR: '',
                          SQLQTY:'',
                          SQLTIME:'',
                          SQLDEBIT: '',
                          PREREF: PRE[j].tr_ref,
                          PRECOLOR: PRE[j].tr__chr02,
                          PREQTY:-PRE[j].tr_qty_loc,
                          PRETIME:PRE[j].tr_program,
                          PREDEBIT: '',
                          ORGREF: ORG[j].tr_ref,
                          ORGCOLOR: ORG[j].tr__chr02,
                          ORGQTY:-ORG[j].tr_qty_loc,
                          ORGTIME:ORG[j].tr_program,
                          ORGDEBIT: '',
                      }
                      result.push(obj)
                    }
                    else
                    {
                      if( j < ORG.length)
                      { 
                        console.log(0,0,0,1)
                        obj = {
                              id:i,
                              PAYREF: '',
                              PAYCOLOR: '',
                              PAYQTY:'',
                              PAYTIME:'',
                              PAYDEBIT: '',
                              SQLREF: '',
                              SQLCOLOR: '',
                              SQLQTY:'',
                              SQLTIME:'',
                              SQLDEBIT: '',
                              PREREF: '',
                              PRECOLOR: '',
                              PREQTY:'',
                              PRETIME:'',
                              PREDEBIT: '',
                              ORGREF: ORG[j].tr_ref,
                              ORGCOLOR: ORG[j].tr__chr02,
                              ORGQTY:-ORG[j].tr_qty_loc,
                              ORGTIME:ORG[j].tr_program,
                              ORGDEBIT: '',
                        }
                        result.push(obj)
                      }
                      else
                      {
                        if( j < PRE.length)
                          { 
                            console.log(0,0,1,0)
                            obj = {
                                  id:i,
                                  PAYREF: '',
                                  PAYCOLOR: '',
                                  PAYQTY:'',
                                  PAYTIME:'',
                                  PAYDEBIT: '',
                                  SQLREF: '',
                                  SQLCOLOR: '',
                                  SQLQTY:'',
                                  SQLTIME:'',
                                  SQLDEBIT: '',
                                  PREREF: PRE[j].tr_ref,
                                  PRECOLOR: PRE[j].tr__chr02,
                                  PREQTY:-PRE[j].tr_qty_loc,
                                  PRETIME:PRE[j].tr_program,
                                  PREDEBIT: '',
                                  ORGREF: '',
                                  ORGCOLOR: '',
                                  ORGQTY:'',
                                  ORGTIME:4,
                                  ORGDEBIT: '',
                            }
                            result.push(obj)
                          }
                      }
                    }  
                  }
                  else
                  { 
                      
                        if( j < ORG.length)
                        { console.log(0,1,0,1)
                          obj = {
                                id:i,
                                PAYREF: '',
                                PAYCOLOR: '',
                                PAYQTY:'',
                                PAYTIME:'',
                                PAYDEBIT: '',
                                SQLREF: SQL[j].tr_ref,
                                SQLCOLOR: SQL[j].tr__chr02,
                                SQLQTY:-SQL[j].tr_qty_loc,
                                SQLTIME:SQL[j].tr_program,
                                SQLDEBIT: '',
                                PREREF: '',
                                PRECOLOR: '',
                                PREQTY:'',
                                PRETIME:'',
                                PREDEBIT: '',
                                ORGREF: ORG[j].tr_ref,
                                ORGCOLOR: ORG[j].tr__chr02,
                                ORGQTY:-ORG[j].tr_qty_loc,
                                ORGTIME:ORG[j].tr_program,
                                ORGDEBIT: '',
                          }
                          result.push(obj)
                        }
                        else
                        {
                          if( j < PRE.length)
                          { console.log(0,1,1,0)
                              obj = {
                                    id:i,
                                    PAYREF: '',
                                    PAYCOLOR: '',
                                    PAYQTY:'',
                                    PAYTIME:'',
                                    PAYDEBIT: '',
                                    SQLREF: SQL[j].tr_ref,
                                    SQLCOLOR: SQL[j].tr__chr02,
                                    SQLQTY:-SQL[j].tr_qty_loc,
                                    SQLTIME:SQL[j].tr_program,
                                    SQLDEBIT: '',
                                    PREREF: PRE[j].tr_ref,
                                    PRECOLOR: PRE[j].tr__chr02,
                                    PREQTY:-PRE[j].tr_qty_loc,
                                    PRETIME:PRE[j].tr_program,
                                    PREDEBIT: '',
                                    ORGREF: '',
                                    ORGCOLOR: '',
                                    ORGQTY:'',
                                    ORGTIME:'',
                                    ORGDEBIT: '',
                              }
                              result.push(obj)
                          }
                          else
                          { console.log(0,1,0,0)
                            obj = {
                                      id:i,
                                      PAYREF: '',
                                      PAYCOLOR: '',
                                      PAYQTY:'',
                                      PAYTIME:'',
                                      PAYDEBIT: '',
                                      SQLREF: SQL[j].tr_ref,
                                      SQLCOLOR: SQL[j].tr__chr02,
                                      SQLQTY:-SQL[j].tr_qty_loc,
                                      SQLTIME:SQL[j].tr_program,
                                      SQLDEBIT: '',
                                      PREREF: '',
                                      PRECOLOR:'',
                                      PREQTY:'',
                                      PRETIME:'',
                                      PREDEBIT: '',
                                      ORGREF: '',
                                      ORGCOLOR: '',
                                      ORGQTY:'',
                                      ORGTIME:'',
                                      ORGDEBIT: '',
                            }
                            result.push(obj)
                          }
                        }
                        
                  }   
                }   
              }
              else
              {
                if(j > SQL.length)
                {
                  if( j < PRE.length && j < ORG.length)
                      { console.log(1,0,1,1)
                        obj = {
                            id:i,
                            PAYREF: PAI[j].tr_ref,
                            PAYCOLOR: PAI[j].tr__chr02,
                            PAYQTY:-PAI[j].tr_qty_loc,
                            PAYTIME:PAI[j].tr_program,
                            PAYDEBIT: '',
                            SQLREF: '',
                            SQLCOLOR: '',
                            SQLQTY:'',
                            SQLTIME:'',
                            SQLDEBIT: '',
                            PREREF: PRE[j].tr_ref,
                            PRECOLOR: PRE[j].tr__chr02,
                            PREQTY:-PRE[j].tr_qty_loc,
                            PRETIME:PRE[j].tr_program,
                            PREDEBIT: '',
                            ORGREF: ORG[j].tr_ref,
                            ORGCOLOR: ORG[j].tr__chr02,
                            ORGQTY:-ORG[j].tr_qty_loc,
                            ORGTIME:ORG[j].tr_program,
                            ORGDEBIT: '',
                        }
                        result.push(obj)
                  }
                  else
                  {
                    if( j < ORG.length)
                          { console.log(1,0,0,1)
                            obj = {
                                id:i,
                                PAYREF: PAI[j].tr_ref,
                                PAYCOLOR: PAI[j].tr__chr02,
                                PAYQTY:PAI[j].tr_qty_loc,
                                PAYTIME:PAI[j].tr_program,
                                PAYDEBIT: '',
                                SQLREF: '',
                                SQLCOLOR: '',
                                SQLQTY:'',
                                SQLTIME:'',
                                SQLDEBIT: '',
                                PREREF: '',
                                PRECOLOR: '',
                                PREQTY:'',
                                PRETIME:'',
                                PREDEBIT: '',
                                ORGREF: ORG[j].tr_ref,
                                ORGCOLOR: ORG[j].tr__chr02,
                                ORGQTY:-ORG[j].tr_qty_loc,
                                ORGTIME:ORG[j].tr_program,
                                ORGDEBIT: '',
                            }
                            result.push(obj)
                    }
                    else
                    {
                      if( j < PRE.length)
                      { console.log(1,0,1,0)
                          obj = {
                              id:i,
                              PAYREF: PAI[j].tr_ref,
                              PAYCOLOR: PAI[j].tr__chr02,
                              PAYQTY:PAI[j].tr_qty_loc,
                              PAYTIME:PAI[j].tr_program,
                              PAYDEBIT: '',
                              SQLREF: '',
                              SQLCOLOR: '',
                              SQLQTY:'',
                              SQLTIME:'',
                              SQLDEBIT: '',
                              PREREF: PRE[j].tr_ref,
                              PRECOLOR: PRE[j].tr__chr02,
                              PREQTY:-PRE[j].tr_qty_loc,
                              PRETIME:PRE[j].tr_program,
                              PREDEBIT: '',
                              ORGREF: '',
                              ORGCOLOR: '',
                              ORGQTY:'',
                              ORGTIME:'',
                              ORGDEBIT: '',
                          }
                          result.push(obj)
                      }
                      else
                      {  console.log(1,0,0,0)
                        obj = {
                              id:i,
                              PAYREF: PAI[j].tr_ref,
                              PAYCOLOR: PAI[j].tr__chr02,
                              PAYQTY:PAI[j].tr_qty_loc,
                              PAYTIME:PAI[j].tr_program,
                              PAYDEBIT: '',
                              SQLREF: '',
                              SQLCOLOR: '',
                              SQLQTY:'',
                              SQLTIME:'',
                              SQLDEBIT: '',
                              PREREF: '',
                              PRECOLOR: '',
                              PREQTY:'',
                              PRETIME:'',
                              PREDEBIT: '',
                              ORGREF: '',
                              ORGCOLOR:'',
                              ORGQTY:'',
                              ORGTIME:'',
                              ORGDEBIT: '',
                        }
                        result.push(obj)
                      }  
                    }

                  }  
                }
                else
                {
                  if(j > PRE.length){
                    if(j < ORG.length)
                    { console.log(1,1,0,1)
                      obj = {
                            id:i,
                            PAYREF: PAI[j].tr_ref,
                            PAYCOLOR: PAI[j].tr__chr02,
                            PAYQTY:PAI[j].tr_qty_loc,
                            PAYTIME:PAI[j].tr_program,
                            PAYDEBIT: '',
                            SQLREF: SQL[j].tr_ref,
                            SQLCOLOR: SQL[j].tr__chr02,
                            SQLQTY:SQL[j].tr_qty_loc,
                            SQLTIME:SQL[j].tr_program,
                            SQLDEBIT: '',
                            PREREF: '',
                            PRECOLOR: '',
                            PREQTY:'',
                            PRETIME:'',
                            PREDEBIT: '',
                            ORGREF: ORG[j].tr_ref,
                            ORGCOLOR: ORG[j].tr__chr02,
                            ORGQTY:-ORG[j].tr_qty_loc,
                            ORGTIME:ORG[j].tr_program,
                            ORGDEBIT: '',
                      }
                      result.push(obj)
                    }
                    else
                    { console.log(1,1,0,0)
                      obj = {
                                id:i,
                                PAYREF: PAI[j].tr_ref,
                                PAYCOLOR: PAI[j].tr__chr02,
                                PAYQTY:PAI[j].tr_qty_loc,
                                PAYTIME:PAI[j].tr_program,
                                PAYDEBIT: '',
                                SQLREF: SQL[j].tr_ref,
                                SQLCOLOR: SQL[j].tr__chr02,
                                SQLQTY:SQL[j].tr_qty_loc,
                                SQLTIME:SQL[j].tr_program,
                                SQLDEBIT: '',
                                PREREF: '',
                                PRECOLOR: '',
                                PREQTY:'',
                                PRETIME:'',
                                PREDEBIT: '',
                                ORGREF: '',
                                ORGCOLOR: '',
                                ORGQTY:'',
                                ORGTIME:'',
                                ORGDEBIT: '',
                          }
                          result.push(obj)
                    }    
                    
                  }
                  else
                  {
                    if(j > ORG.length)
                      { console.log(1,1,1,0)
                        obj = {
                              id:i,
                              PAYREF: PAI[j].tr_ref,
                              PAYCOLOR: PAI[j].tr__chr02,
                              PAYQTY:PAI[j].tr_qty_loc,
                              PAYTIME:PAI[j].tr_program,
                              PAYDEBIT: '',
                              SQLREF: SQL[j].tr_ref,
                              SQLCOLOR: SQL[j].tr__chr02,
                              SQLQTY:SQL[j].tr_qty_loc,
                              SQLTIME:SQL[j].tr_program,
                              SQLDEBIT: '',
                              ORGREF: '',
                              ORGCOLOR: '',
                              ORGQTY:'',
                              ORGTIME:'',
                              ORGDEBIT: '',
                              PREREF: PRE[j].tr_ref,
                              PRECOLOR: PRE[j].tr__chr02,
                              PREQTY:-PRE[j].tr_qty_loc,
                              PRETIME:PRE[j].tr_program,
                              PREDEBIT: '',
                        }
                        result.push(obj)
                      }
                  }
                }
              }
            }
            
            
   
             
          
            i = i + 1
        }
      } 
      if(COL.length > 0)
      {
        for (var l = 0;l < maxlength; l++) {
          obj = {
            id:m,
            COLREF: COL[l].tr_ref,
            COLCOLOR: COL[l].tr__chr02,
            COLQTY:-PAI[l].tr_qty_loc,
            COLTIME:PAI[l].tr_program,
            COLDEBIT: '',
          }
          result3.push(obj)
          m = m + 1
        }
      }
      
      
    }
    const RETOUR = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain,tr_addr:'U1', tr_type: "ISS-WO",tr_qty_loc:{[Op.gte]: 0},tr_effdate : { [Op.between]: [date, date1]}})
    const PERTE = await inventoryTransactionServiceInstance.finditem({tr_domain: user_domain,tr_addr:'U1', tr_type: "RCT-UNP",tr__chr01:'PERTE',tr_qty_loc:{[Op.gte]: 0},tr_effdate : { [Op.between]: [date, date1]}})
    let maxlength2 = Math.max(RETOUR.length,PERTE.length)
    if(maxlength2>0)
      { 
        for (var k = 0;k < maxlength2; k++) {
        console.log(maxlength2) 
        
        if(k <RETOUR.length && k <PERTE.length)
        { obj = {
            id:i,
            RETOURCOLOR: RETOUR[k].tr__chr01 + ' ' + RETOUR[k].tr__chr02,
            RETOURREF1: RETOUR[k].tr_so_job,
            RETOURREF2: RETOUR[k].tr_ref,
            RETOURQTY:RETOUR[k].tr_qty_loc,
            PERTECOLOR:PERTE[k].tr_desc,
            PERTEREF:PERTE[k].tr_ref,
            PERTEQTY:PERTE[k].tr_qty_loc,
            
          }
          result2.push(obj)   
        }
        else
        {
          if(k < RETOUR.length)
          {
            obj = {
              id:i,
              RETOURCOLOR: RETOUR[k].tr__chr02,
              RETOURREF1: RETOUR[k].tr_ref,
              RETOURREF2: RETOUR[k].tr_so_job,
              RETOURQTY:RETOUR[k].tr_qty_loc,
              PERTECOLOR:'',
              PERTEREF:'',
              PERTEQTY:'',
              
            }
            result2.push(obj) 

          }
          else
          {
            obj = {
              id:i,
              RETOURCOLOR: '',
              RETOURREF1: '',
              RETOURREF2: '',
              RETOURQTY:'',
              PERTECOLOR:PERTE[k].tr__chr01,
              PERTEREF:PERTE[k].tr_ref,
              PERTEQTY:PERTE[k].tr_qty_loc,
              
            }
            result2.push(obj)
          }
        }
              
      
        

         
      
        i = i + 1
        }
      }    
    
    

    return res.status(200).json({ message: 'fetched succesfully', data: result,data2:result2,data3:result3 });
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
  findByPrograms,
  findByDistinct,
  findByOne,
  update,
  deleteOne,
  CalcCost,
  CalcCostWo,
  findBywo,
  findByRPBR,
  findByEXBR,
  findByRecapBR

};
