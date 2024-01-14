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

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling Create item endpoint ');
  try {
    const itemServiceInstance = Container.get(ItemService);
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
const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const itemServiceInstance = Container.get(ItemService);
    const items = await itemServiceInstance.find({ ...req.body,pt_domain:user_domain });
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
    console.log(req.body)
    console.log(user_domain)
    const items = await itemServiceInstance.findOne({ ...req.body,pt_domain:user_domain });
   console.log("ohohoh",items)
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
    console.log(req.body);
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
      if (old_tr.length == 0) {

        const sct = await costSimulationServiceInstance.findOne({sct_domain:user_domain,sct_part:item.pt_part, sct_sim:"init"})
         coutMA = sct.sct_mtl_tl
         cmpA   = sct.sct_mtl_tl
      } 
      else {
      console.log(old_tr)
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
      console.log(stkact)
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

              await inventoryTransactionServiceInstance.update({tr__dec01 : cmpA,tr__dec02:cmpA},{id: tr.id})
              result.push({id:i,date: tr.tr_effdate, nbr : tr.tr_lot, part: tr.tr_part,desc: item.pt_desc1, qtym : tr.tr_qty_loc, qtys: stkA,coutm: cmpA,cmpM: cmpA})
              i = i + 1
              stkA = stkA + Number(tr.tr_qty_loc)
            
          }


      }


    }
       
    console.log("trs",trs.length);
   
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
  console.log(req.body.pmcode);

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

export default {
  create,
  findBySpec,
  findBy,
  findBySupp,
  findByOne,
  findOne,
  findAll,
  findProd,
  findAllwithstk,
  update,
  CalcCmp,
  findlast,
};
