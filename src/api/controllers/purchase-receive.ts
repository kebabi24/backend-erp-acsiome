import PurchaseReceiveService from '../../services/purchase-receive';
import locationDetailService from '../../services/location-details';
import inventoryTransactionService from '../../services/inventory-transaction';
import inventoryStatusService from '../../services/inventory-status';
import costSimulationService from '../../services/cost-simulation';
import purchaseOrderDetailService from '../../services/purchase-order-detail';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { round } from 'lodash';
import {QueryTypes} from 'sequelize';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers

  logger.debug('Calling Create code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const inventoryTransactionServiceInstance = Container.get(inventoryTransactionService);
    const costSimulationServiceInstance = Container.get(costSimulationService);
    const purchaseOrderDetailServiceInstance = Container.get(purchaseOrderDetailService);
    const statusServiceInstance = Container.get(inventoryStatusService);

    //const lastId = await purchaseReceiveServiceInstance.max('prh_nbr');

    for (const item of req.body.detail) {
      const { tr_status, tr_expire,desc, ...remain } = item;
      await purchaseReceiveServiceInstance.create({ prh_receiver: req.body.prhnbr, ...remain, ...req.body.pr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin });
      const pod = await purchaseOrderDetailServiceInstance.findOne({pod_nbr: req.body.pr.prh_nbr,  pod_part: remain.prh_part})
     
      
      if(pod) await purchaseOrderDetailServiceInstance.update({pod_qty_rcvd : Number(pod.pod_qty_rcvd) + Number(remain.prh_rcvd) ,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin },{id: pod.id})
      
      await inventoryTransactionServiceInstance.create({
        tr_status,
        tr_expire,
        tr_line: remain.prh_line,
        tr_part: remain.prh_part,
        tr_qty_loc: remain.prh_rcvd,
        tr_um: remain.prh_um,
        tr_um_conv: remain.prh_um_conv,
        tr_price: remain.prh_pur_cost,
        tr_site: req.body.pr.prh_site,
        tr_loc: remain.prh_loc,
        tr_serial: remain.prh_serial,
        tr_vend_lot: remain.prh_vend_lot,
        tr_nbr: req.body.pr.prh_nbr,
        tr_lot: req.body.prhnbr,
        tr_addr: req.body.pr.prh_vend,
        tr_effdate: req.body.pr.prh_rcp_date,
        tr_so_job: req.body.pr.prh_xinvoice,
        tr_curr: req.body.pr.prh_curr,
        tr_ex_rate: req.body.pr.prh_ex_rate,
        tr_ex_rate2: req.body.pr.prh_ex_rate2,
        tr_rmks: req.body.pr.prh_rmks,
        tr_type:'RCT-PO',
        tr_date: new Date(),
        created_by:user_code,created_ip_adr: req.headers.origin,
        last_modified_by:user_code,last_modified_ip_adr: req.headers.origin
        });
        const lds = await locationDetailServiceInstance.find({ld_part: remain.prh_part, ld_site: req.body.pr.prh_site})
        const {sct_mtl_tl} = await costSimulationServiceInstance.findOne({ sct_part: remain.prh_part,sct_site: req.body.pr.prh_site, sct_sim: 'STDCG' });
        const sctdet = await costSimulationServiceInstance.findOne({ sct_part: remain.prh_part, sct_site: req.body.pr.prh_site,  sct_sim: 'STDCG' });
        let qty = 0
        lds.map(elem=>{
          qty += Number(elem.ld_qty_oh)
        })
        const new_price =  round(( (qty*Number(sct_mtl_tl)) + (Number(remain.prh_rcvd) * Number(remain.prh_um_conv) * Number(remain.prh_pur_cost) * Number( req.body.pr.prh_ex_rate2) / Number( req.body.pr.prh_ex_rate)) ) / (qty+ (Number(remain.prh_rcvd) * Number(remain.prh_um_conv))),2)
       await costSimulationServiceInstance.update({sct_mtl_tl: new_price , sct_cst_tot: new_price +  Number(sctdet.sct_lbr_tl) + Number(sctdet.sct_bdn_tl) + Number(sctdet.sct_ovh_tl) + Number(sctdet.sct_sub_tl), created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{ sct_part: remain.prh_part, sct_site: req.body.pr.prh_site, sct_sim: 'STDCG' })
       console.log(tr_status)
        const status =   await statusServiceInstance.findOne({
          is_status: tr_status
         })
         console.log(status, "here")
        const ld = await locationDetailServiceInstance.findOne({ld_part: remain.prh_part, ld_lot:remain.prh_serial, ld_site: req.body.pr.prh_site,ld_loc: remain.prh_loc})
        if(ld) await locationDetailServiceInstance.update({ld_qty_oh : Number(ld.ld_qty_oh)+ (Number(remain.prh_rcvd)* Number(remain.prh_um_conv)), ld_expire: tr_expire,ld__log01: status.is_nettable, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: ld.id})
        else await locationDetailServiceInstance.create({ld_part: remain.prh_part,ld_date: new Date(), ld_lot:remain.prh_serial, ld_site: req.body.pr.prh_site,ld_loc: remain.prh_loc, ld_qty_oh :Number(remain.prh_rcvd), ld_expire: tr_expire, ld_status: tr_status, ld__log01: status.is_nettable, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
       
    }
    // const devise = await purchaseReceiveServiceInstance.create(req.body)
    return res.status(201).json({ message: 'created succesfully', data: req.body.prhnbr });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const { id } = req.params;
    const devise = await purchaseReceiveServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: devise });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const devise = await purchaseReceiveServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: devise });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findGroup = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const devise = await purchaseReceiveServiceInstance.distinct({});
    console.log(devise)
    return res.status(200).json({ message: 'fetched succesfully', data: devise });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findAllDistinct = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  const sequelize = Container.get("sequelize")

  logger.debug("Calling find all purchaseOrder endpoint")
  try {
      let result = []
      const { liste,distinct } = req.params;
      //console.log(distinct, "disting")
      console.log(liste, "disting")
      
     
      const prhs =await sequelize.query("SELECT DISTINCT PUBLIC.prh_hist.prh_receiver, PUBLIC.prh_hist.prh_vend, PUBLIC.prh_hist. prh_rcp_date  FROM   PUBLIC.prh_hist where PUBLIC.prh_hist.prh_invoiced = 'false' and  PUBLIC.prh_hist.prh_vend = ? and PUBLIC.prh_hist.prh_site = ?", { replacements: [distinct, liste], type: QueryTypes.SELECT });
      return res
          .status(200)
          .json({ message: "fetched succesfully", data: prhs })
          
          
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  } 
}

const findDistinct = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const sequelize = Container.get("sequelize")

  logger.debug("Calling find all purchaseOrder endpoint")
  try {
      let result = []
      //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)
      const prhs =await sequelize.query("SELECT DISTINCT PUBLIC.prh_hist.prh_receiver, PUBLIC.prh_hist.prh_vend, PUBLIC.prh_hist.id,  PUBLIC.prh_hist.prh_rcp_date  FROM   PUBLIC.prh_hist ", {  type: QueryTypes.SELECT });
     console.log(prhs)
      return res
          .status(200)
          .json({ message: "fetched succesfully", data: prhs })
          
          
  } catch (e) {
      logger.error("🔥 error: %o", e)
      return next(e)
  } 
}
const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const prh = await purchaseReceiveServiceInstance.find({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: prh });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers

  logger.debug('Calling update one  code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const { id } = req.params;
    const devise = await purchaseReceiveServiceInstance.update({ ...req.body,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }, { id });
    return res.status(200).json({ message: 'fetched succesfully', data: devise });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const { id } = req.params;
    const devise = await purchaseReceiveServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  findOne,
  findAllDistinct,
  findDistinct,
  findAll,
  findGroup,
  findBy,
  update,
  deleteOne,
};
