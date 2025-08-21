import ItemService from '../../services/item'; 
import WorkRoutingService from "../../services/workrouting"
import LocationDetailService from '../../services/location-details';
import FraisService from "../../services/frais"
import FraisDetailService from "../../services/frais-detail"
import CostSimulationService from "../../services/cost-simulation"
import InventoryTransactionService from '../../services/inventory-transaction';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
import sequelize from '../../loaders/sequelize';
import { isNull } from 'lodash';
import { cpuUsage } from 'process';
import ItemDetailService from '../../services/item-detail';
import DecompteService from '../../services/decompte';
import RoleService from '../../services/role';
import locationService from '../../services/location';

import RequisitionDetailService from "../../services/requisition-detail"
import PurchaseReceiveService from "../../services/purchase-receive"
import PurchaseOrderDetailService from "../../services/purchase-order-detail"
import VendorProposalDetailService from "../../services/vendor-proposal-detail"
import VoucherOrderDetailService from "../../services/voucher-order-detail"
import SaleOrderDetailService from "../../services/saleorder-detail"
import SaleShiperService from "../../services/sale-shiper"
import InvoiceOrderDetailService from "../../services/invoice-order-detail"
import WorkOrderService from "../../services/work-order"
import WorkOrderDetailService from "../../services/work-order-detail"






const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling Create item endpoint ');
  try {
    const itemServiceInstance = Container.get(ItemService);
    console.log(req.body)
    const item = await itemServiceInstance.create({
      ...req.body,
      pt_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    return res.status(201).json({ message: 'created succesfully', data: { item } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const createDetail = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling Create item endpoint ');
  try {
    const { item, itemmethode, itemobjectif,itemprogram } = req.body
    const itemServiceInstance = Container.get(ItemService);
    const itemDetailServiceInstance = Container.get(ItemDetailService);
    const training = await itemServiceInstance.create({
      ...item,
      pt_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    for (let entry of itemmethode) {
      entry = { ...entry,ptd_domain:user_domain, ptd_part: item.pt_part,chr01:'METHODE', created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
      await itemDetailServiceInstance.create(entry)

  
  }
  for (let entry1 of itemobjectif) {
    entry1 = { ...entry1,ptd_domain:user_domain, ptd_part: item.pt_part,chr01:'OBJECTIF', created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
    await itemDetailServiceInstance.create(entry1)


}
for (let entry2 of itemprogram) {
  entry2 = { ...entry2,ptd_domain:user_domain, ptd_part: item.pt_part,chr01:'PROGRAMME', created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
  await itemDetailServiceInstance.create(entry2)


}
    return res.status(201).json({ message: 'created succesfully', data: { item } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const itemServiceInstance = Container.get(ItemService);
    const items = await itemServiceInstance.find({ ...req.body,pt_domain:user_domain });
    // let result = []
    // for (let det of items){
    //   let result_body={
    //     id:det.id,
    //     pt_part:det.pt_part,
    //     pt_desc1:det.pt_desc1,
    //     pt_um:det.pt_um,
    //     pt_site:det.pt_site,
    //     pt_loc:det.pt_loc,
    //     pt_prod_line:det.pt_prod_line,
    //     pt_part_type:det.pt_part_type,
    //     pt_draw:det.pt_draw,
    //     pt_group:det.pt_group,
    //     pt_rev:det.pt_rev,
    //     pt_break_cat:det.pt_break_cat,
    //     pt_dsgn_grp:det.pt_dsgn_grp,


    //   }
    //   result.push(result_body)
    // }
    
    
    return res.status(200).json({ message: 'fetched succesfully', data: items });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByPurchase = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const itemServiceInstance = Container.get(ItemService);
    const items = await itemServiceInstance.find({   [Op.or]:[{pt_dea : true},{pt_pm_code:'P'}] ,pt_domain:user_domain });
    
    
    return res.status(200).json({ message: 'fetched succesfully', data: items });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBywithperte = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const itemServiceInstance = Container.get(ItemService);
    const items = await itemServiceInstance.find({ ...req.body,pt_domain:user_domain });
    let result = []
    for (let det of items){
      let result_body={
        id:det.id,
        pt_part:det.pt_part,
        pt_desc1:det.pt_desc1,
        pt_um:det.pt_um,
        pt_site:det.pt_site,
        pt_loc:det.pt_loc,
        pt_prod_line:det.pt_prod_line,
        pt_part_type:det.pt_part_type,
        pt_draw:det.pt_draw,
        pt_group:det.pt_group,
        pt_rev:det.pt_rev,
        pt_break_cat:det.pt_break_cat,
        pt_dsgn_grp:det.pt_dsgn_grp,


      }
      result.push(result_body)
    }
    const pertes = await itemServiceInstance.find({ pt_draw:'PERTE',pt_domain:user_domain });
    let resultperte = []
    for (let det of pertes){
      let resultperte_body={
        id:det.id,
        pt_part:det.pt_part,
        pt_desc1:det.pt_desc1,
        pt_um:det.pt_um,
        pt_site:det.pt_site,
        pt_loc:det.pt_loc,
        pt_prod_line:det.pt_prod_line,
        pt_part_type:det.pt_part_type,
        pt_draw:det.pt_draw,
        pt_group:det.pt_group,
        pt_rev:det.pt_rev,
        pt_break_cat:det.pt_break_cat,
        pt_dsgn_grp:det.pt_dsgn_grp,

      }
      result.push(resultperte_body)
    }
    
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOp = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const itemServiceInstance = Container.get(ItemService);
    const items = await itemServiceInstance.find({ ...req.body, pt_draw: { [Op.or]:  ["BOBINE", "SQUELETTE"] },pt_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: items });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBySpec = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  logger.debug("Calling find by  all item endpoint")
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
      const itemServiceInstance = Container.get(ItemService)
      const items = await itemServiceInstance.find({...req.body,pt_domain:user_domain})
      
      var data = []
      for (let item of items){
          data.push({id: item.id,part:  item.pt_part,desc1: item.pt_desc1,bom:item.pt_bom_code, ord_qty: item.pt_ord_qty, sim: 0, prod_qty: item.pt_ord_qty})
      }
      return res
          .status(200)
          .json({ message: "fetched succesfully", data: data })
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  }
}
const findBySupp = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemServiceInstance = Container.get(ItemService);
    const items = await itemServiceInstance.findBySupp({ ...req.body,pt_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: items });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemServiceInstance = Container.get(ItemService);
    
   
    const items = await itemServiceInstance.findOne({ ...req.body,pt_domain:user_domain });
   
    return res.status(200).json({ message: 'fetched succesfully', data: items });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemServiceInstance = Container.get(ItemService);
    const { id } = req.params;
    const item = await itemServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: item });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOneDet = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemServiceInstance = Container.get(ItemService);
    const { id } = req.params;
    const item = await itemServiceInstance.findOneDet({ id });
    console.log(item.pt_group, item.pt_draw)
    return res.status(200).json({ message: 'fetched succesfully', data: item });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemServiceInstance = Container.get(ItemService);
    const codes = await itemServiceInstance.find({pt_domain:user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: codes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findProd = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const Sequelize = require('sequelize');
  const Op = Sequelize.Op;
  
  try {
    
  
    const itemServiceInstance = Container.get(ItemService);
     
    const codes = await itemServiceInstance.find({
      ...{
        pt_domain: user_domain,
        pt_pm_code: 'M',
        
        ...req.body
      },
    });

    return res.status(200).json({ message: 'fetched succesfully', data: codes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllwithstk = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemServiceInstance = Container.get(ItemService);
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const items = await itemServiceInstance.find({pt_domain:user_domain});
    const result = [];
    for (const item of items) {
      const res = await locationDetailServiceInstance.findSpecial({
        where: { ld_part: item.pt_part,ld_domain:user_domain },
        attributes: ['ld_part', [Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'total']],
        group: ['ld_part'],
        raw: true,
      });

      //items.total_qty = res.total_qty;
      const qty = res[0] ? (res[0].total ? res[0].total : 0) : 0;
      item.pt_ord_max = qty;
      result.push(item);
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllItemswithstk = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemServiceInstance = Container.get(ItemService);
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const items = await itemServiceInstance.findwithstk({});
    const result = [];
    // for (const item of items) {
    //   const res = await locationDetailServiceInstance.findSpecial({
    //     where: { ld_part: item.pt_part,ld_domain:user_domain },
    //     attributes: ['ld_part', [Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'total']],
    //     group: ['ld_part'],
    //     raw: true,
    //   });

    //   //items.total_qty = res.total_qty;
    //   const qty = res[0] ? (res[0].total ? res[0].total : 0) : 0;
    //   item.pt_ord_max = qty;
    //   result.push(item);
    // }
    return res.status(200).json({ message: 'fetched succesfully', data: items });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const itemServiceInstance = Container.get(ItemService);
    const { id } = req.params;
    const item = await itemServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: item });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};




const CalcCmp = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {

    const itemServiceInstance = Container.get(ItemService);
    const costSimulationServiceInstance = Container.get(CostSimulationService)
    const fraisDetailServiceInstance = Container.get(FraisDetailService)
    const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService);
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    
     let result=[] 
     let i = 1
    const items = await itemServiceInstance.find({
      
        pt_domain: user_domain,
        pt_part: { [Op.between]: [req.body.part1, req.body.part2]},
      
    });
    for (let item of items) {


      /*get cout avant calcul*/
      const old_tr = await inventoryTransactionServiceInstance.findOneS({
        where : {
      tr_domain: user_domain, tr_effdate: { [Op.lt]: [req.body.date]} ,
      tr_part: item.pt_part,
        },
      order: [['tr_effdate', 'DESC'],['id', 'DESC']], 
      
      
      
      }) 

      var coutMA = 0
      var cmpA   = 0
      if (old_tr == null ) {

        const sct = await costSimulationServiceInstance.findOne({sct_domain:user_domain,sct_part:item.pt_part, sct_sim:"init"})
         coutMA = sct.sct_mtl_tl
         cmpA   = sct.sct_mtl_tl
      } 
      else {
    
       coutMA = old_tr.tr__dec01
       cmpA   = old_tr.tr__dec02
      }
/*get cout avant calcul*/
/*get stock avant calcul*/
      const res = await locationDetailServiceInstance.findSpecial({
        where: { ld_part: item.pt_part,ld_domain:user_domain },
        attributes: ['ld_part', [Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'total']],
        group: ['ld_part'],
        raw: true,
      });
      const stkact = res.total
    
      var trqty = await inventoryTransactionServiceInstance.find({
        where : {
      tr_domain: user_domain, tr_effdate: { [Op.between]: [req.body.date, req.body.date1]} ,
      tr_part: item.pt_part,
      tr_ship_type: { [Op.ne]: 'M' },
        },
        attributes: [ [Sequelize.fn('sum', Sequelize.col('tr_qty_loc')), 'totalqtyloc']],
        group: ['tr_part'],
        raw: true,
      }) 

      var stkA = Number(stkact) - Number(trqty.totalqtyloc)
/*get stock avant calcul*/



      var trs = await inventoryTransactionServiceInstance.findSpecial({
        where : {
      tr_domain: user_domain, tr_effdate: { [Op.between]: [req.body.date, req.body.date1]} ,
      tr_part: item.pt_part,
        },
      order: [['tr_effdate', 'ASC'],['id', 'ASC']], 
      
      
      
      }) 
      
      
      for (let tr of trs) {

          if(tr.tr_type = "RCT-PO" && tr.tr_qty_loc != 0) {
            const frpd = await fraisDetailServiceInstance.findBet({
              where: {
                          frpd_domain : user_domain,
                          frpd_prh_nbr : tr.tr_lot,
                          frpd_imput   : false,
                          frpd_part    : tr.tr_part 
              },
              attributes: [ [Sequelize.fn('sum', Sequelize.col('frpd_amt')), 'totalamt']],
              
        raw: true,
            }) 
            let coutM =  Number(tr.tr_price) + Number(frpd.totalamt) / Number(tr.tr_qty_loc)
            let cmpM  = (Number(stkA) + Number(tr.tr_qty_loc) != 0 ) ? ( ( Number(cmpA) * Number(stkA) + Number(coutM) * Number(tr.tr_qty_loc)) / (Number(stkA) + Number(tr.tr_qty_loc) )) : 0
             await inventoryTransactionServiceInstance.update({tr__dec01 : coutM,tr__dec02:cmpM},{id: tr.id})
             result.push({id:i,date: tr.tr_effdate, nbr : tr.tr_lot, part: tr.tr_part, desc: item.pt_desc1, qtym : tr.tr_qty_loc, qtys: stkA,coutm: coutM,cmpM: cmpM})
             cmpA = cmpM
             stkA = stkA + Number( tr.tr_qty_loc)
              i = i + 1

          /*update frais dapproche*/
               await fraisDetailServiceInstance.update({frpd_imput:true},{
                            frpd_domain : user_domain,
                            frpd_prh_nbr : tr.tr_lot,
                            frpd_imput   : false,
                            frpd_part    : tr.tr_part}) 

          } else {

            /* rct unp*/

            if(tr.tr_type = "RCT-UNP" && tr.tr_qty_loc != 0) {

              let coutM =  Number(tr.tr_price) //+ Number(frpd.totalamt) / Number(tr.tr_qty_loc)
              let cmpM  = (Number(stkA) + Number(tr.tr_qty_loc) != 0 ) ? ( ( Number(cmpA) * Number(stkA) + Number(coutM) * Number(tr.tr_qty_loc)) / (Number(stkA) + Number(tr.tr_qty_loc) )) : 0
               await inventoryTransactionServiceInstance.update({tr__dec01 : coutM,tr__dec02:cmpM},{id: tr.id})
               result.push({id:i,date: tr.tr_effdate, nbr : tr.tr_lot, part: tr.tr_part, desc: item.pt_desc1, qtym : tr.tr_qty_loc, qtys: stkA,coutm: coutM,cmpM: cmpM})
               cmpA = cmpM
               stkA = stkA + Number( tr.tr_qty_loc)
                i = i + 1

             /*rct unp*/   
            } else {


            
              await inventoryTransactionServiceInstance.update({tr__dec01 : cmpA,tr__dec02:cmpA},{id: tr.id})
              result.push({id:i,date: tr.tr_effdate, nbr : tr.tr_lot, part: tr.tr_part,desc: item.pt_desc1, qtym : tr.tr_qty_loc, qtys: stkA,coutm: cmpA,cmpM: cmpA})
              i = i + 1
              stkA = stkA + Number(tr.tr_qty_loc)
            }
            
          }


      }


    }
       
   
   
  //  const invoices = await userMobileServiceInstance.getAllInvoice({...req.body, /*invoice_domain: user_domain*/});
    return res.status(200).json({ message: 'fetched succesfully', data: trs });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const findlast = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const Sequelize = require('sequelize');
  const Op = Sequelize.Op;


  try {
    const itemServiceInstance = Container.get(ItemService);
    const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService);
    const old_tr = await inventoryTransactionServiceInstance.findOneS({
      where : {
    tr_domain: user_domain, 
   
      },
    order: [['tr_effdate', 'DESC'],['id', 'DESC']], 
    
    
    
    }) 

    return res.status(200).json({ message: 'fetched succesfully', data: old_tr });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const findByDetTr = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  logger.debug("Calling find by  all item endpoint")
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
      const itemDetailServiceInstance = Container.get(ItemDetailService)
      const items = await itemDetailServiceInstance.find({...req.body,ptd_domain:user_domain})
      
      
      return res
          .status(200)
          .json({ message: "fetched succesfully", data: items })
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  }
}
const updateDet = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  job endpoint');
  try {
    const itemServiceInstance = Container.get(ItemService);
    const itemDetailServiceInstance = Container.get(ItemDetailService);
    const { id } = req.params;
    const { item, details } = req.body;
    const it = await itemServiceInstance.update(
      { ...item, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    // console.log("details",details)
    await itemDetailServiceInstance.delete({ ptd_part: item.pt_part, ptd_domain: user_domain });
    for (let entry of details) {
      // console.log("here")
      entry = {
        ...entry,
        ptd_part: item.pt_part,
        ptd_domain: user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await itemDetailServiceInstance.create(entry);
    }
    return res.status(200).json({ message: 'fetched succesfully', data: it });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findJob = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const Sequelize = require('sequelize');
  const Op = Sequelize.Op;
  
  try {
    
  
    const itemServiceInstance = Container.get(ItemService);
    const itemDetailServiceInstance = Container.get(ItemDetailService);
    const { detail } = req.body;
    
    const itemsd = await itemDetailServiceInstance.findS({
      ...{
        ptd_domain: user_domain,
        ptd_gol: detail,
      },
         
    });
    let it = []
    for (let ite of itemsd) {

      if(ite.ptd_part != it){it.push(ite.ptd_part)}
    }
    
    const items = await itemServiceInstance.find({
      ...{
        pt_domain: user_domain,
        pt_part: it,
      },
         
    });
    
    return res.status(200).json({ message: 'fetched succesfully', data: items });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findAllTraining = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemServiceInstance = Container.get(ItemService);
    const trainings = await itemServiceInstance.findtraining({ where : {pt_domain:user_domain,pt_part_type:'FORMATION'},
    attributes: ['id','pt_part','pt_desc1','pt_dsgn_grp','pt_draw','pt_group','pt_shelflife'],
  });
    return res.status(200).json({ message: 'fetched succesfully', data: trainings });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const updatePrice = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  job endpoint');
  try {
    const itemServiceInstance = Container.get(ItemService);
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const decompteServiceInstance = Container.get(DecompteService);
    const locationServiceInstance = Container.get(locationService);
    const roleServiceInstance = Container.get(RoleService);
    
    const { Details } = req.body;
    
    const locs = await locationServiceInstance.find({loc_domain: user_domain})

      for(let loc of locs) {
       // console.log(loc.loc_loc)
        const locdets = await locationDetailServiceInstance.find({ld_loc:loc.loc_loc, ld_site: loc.loc_site, ld_qty_oh: {[Op.gt]: 0},ld_domain: user_domain})
       let  amt = 0
        for(let locdet of locdets) {
          const indexpart =  Details.findIndex(({ part }) => part == locdet.ld_part);
         // console.log(indexpart, locdet.ld_part, locdet.ld_qty_oh)
          if(indexpart >= 0) {
            amt = amt + ((Details[indexpart].new_price *  1.2138) -(Details[indexpart].old_price  * 1.2138)) * locdet.ld_qty_oh
          }

        }
       // console.log(amt,loc.loc_loc)
        const role = await roleServiceInstance.findOne({role_loc: loc.loc_loc, role_domain : user_domain,role_site:loc.loc_site})
        if(role != null) {
      //  console.log(role.role_code)
        const decompte = await decompteServiceInstance.create({dec_code:"Ajust Prix",dec_role:role.role_code,dec_desc:"Ajustement Prix",dec_amt:amt,dec_type:"A",dec_effdate:new Date(),dec_domain:user_domain})
        
        await roleServiceInstance.updated(   {solde: Number(role.solde) + Number(amt)},{role_code:role.role_code})      
        }
    

      }
         for(let det of Details) {
          const it = await itemServiceInstance.update(
            { pt_price: det.new_price, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
            { pt_part: det.part },
          );
         }
    
    return res.status(200).json({ message: 'fetched succesfully', /*data: it*/ });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const epiUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  job endpoint');
  try {
    const itemServiceInstance = Container.get(ItemService);
     let refid = req.body.id;
   console.log(refid,req.body.pt_status)
     const locationDetail = await itemServiceInstance.update(
      { pt_status:req.body.pt_status,pt_price:req.body.pt_price,pt_sfty_stk:req.body.pt_sfty_stk, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id : refid},
    );

    return res.status(200).json({ message: 'fetched succesfully', data: locationDetail });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findPart = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemServiceInstance = Container.get(ItemService);
    const codes = await itemServiceInstance.find({ pt_domain:user_domain});
   
    var data = [];
    for (let code of codes) {
      data.push({ value: code.pt_part, label: code.pt_desc1 });
    }
   
    return res.status(200).json(data);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  logger.debug("Calling update one  provider endpoint")
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  
  try {
      const itemServiceInstance = Container.get(ItemService);
      const requisitionDetailServiceInstance = Container.get(RequisitionDetailService)
      const vendorProposalDetailServiceInstance = Container.get(VendorProposalDetailService)
      const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService)
      const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService)
      const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService)
      const voucherOrderDetailServiceInstance = Container.get(VoucherOrderDetailService)
      const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService)
      const saleShiperServiceInstance = Container.get(SaleShiperService)
      const invoiceOrderDetailServiceInstance = Container.get(InvoiceOrderDetailService)
      const workOrderDetailServiceInstance = Container.get(WorkOrderDetailService)
      const workOrderServiceInstance = Container.get(WorkOrderService)
      const costSimulationServiceInstance = Container.get(CostSimulationService)
      const {id} = req.params
      console.log(req.params)
let message = ''
let bool = false
      const item = await itemServiceInstance.findOne({id})
      if(item) {
      const requisition = await requisitionDetailServiceInstance.findOne({rqd_part:item.pt_part, rqd_domain: user_domain})

      if (requisition) {
          bool = true
          message = "Cet Article a des demandes d'achat "
      }
      else {
          const vp = await vendorProposalDetailServiceInstance.findOne({vpd_part:item.pt_part, vpd_domain: user_domain})
          if (vp) {
              bool = true
              message = "Cet Article a des Offres  "
          } else {
              const po = await purchaseOrderDetailServiceInstance.findOne({pod_part:item.pt_part, pod_domain: user_domain})
              if(po) {
                  bool= true
                  message = "Cet Article a des Bons de Commandes "
              } else {
                  const prh = await purchaseReceiveServiceInstance.findOne({prh_part:item.pt_part, prh_domain: user_domain})
                  if(prh) {
                      bool= true
                      message = "Cet Article a des Bons de Reception "
                  } 
                  else {
                      const tr = await inventoryTransactionServiceInstance.findOne({tr_part:item.pt_part, tr_domain: user_domain})
                      if(tr) {
                          bool= true
                          message = "Cet Article a des Transactions "
                      } else {

                          const vh = await voucherOrderDetailServiceInstance.findOne({
                              vdh_part:item.pt_part,vdh_domain:user_domain
                          }) 
                          if(vh){
                              bool= true
                              message = "Cet Article a des Factures Fournisseur "
                          }else{
                             
                              const so = await saleOrderDetailServiceInstance.findOne({sod_part:item.pt_part,sod_domain : user_domain})
                              if(so){
                                  bool= true
                                  message = "Cet Article a des Commandes Client "
                              } else {
                                const psh = await saleShiperServiceInstance.findOne({psh_part:item.pt_part,psh_domain : user_domain})
                                if(psh){
                                    bool= true
                                    message = "Cet Article a des Bon de Livraison "
                                } else {
                                  const ih = await invoiceOrderDetailServiceInstance.findOne({idh_part:item.pt_part,idh_domain : user_domain})
                                  if(so){
                                      bool= true
                                      message = "Cet Article a des Factures Client "
                                  } else {
                                    const wo = await workOrderServiceInstance.findOne({wo_part:item.pt_part,wo_domain : user_domain})
                                    if(wo){
                                        bool= true
                                        message = "Cet Article a des Ordres de Fabrication "
                                    } else {
                                      const wod = await workOrderDetailServiceInstance.findOne({wod_part:item.pt_part,wod_domain : user_domain})
                                      if(wod){
                                          bool= true
                                          message = "Cet Article a des Ordres de Facbrication "
                                      }
                                    }
                                  }
                                }
                              }
                          }
                      }
                  }

              }
          }

      }
      if(bool == false) {
        const sct = await costSimulationServiceInstance.delete({sct_part:item.pt_part})     
     const it = await itemServiceInstance.delete({id})
     message = "Suppression Effectué avec succès"
      } else {

      }
  }
  console.log(bool,message)
      return res
          .status(200)
          .json({ message: message, bool,data: item.id  })
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  }
}
export default {
  create,
  findBySpec,
  findBy,
  findByPurchase,
  findBywithperte,
  findByOp,
  findBySupp,
  findByOne,
  findOne,
  findOneDet,
  findAll,
  findProd,
  findAllwithstk,
  findAllItemswithstk,
  update,
  CalcCmp,
  findlast,
  createDetail,
  findByDetTr,
  updateDet,
  findJob,
  findAllTraining,
  updatePrice,
  findPart,
  deleteOne,
  epiUpdate
};
