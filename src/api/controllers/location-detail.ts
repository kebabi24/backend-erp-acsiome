import LocationDetailService from '../../services/location-details';
import InventoryStatusDetailService from '../../services/inventory-status-details';
import InventoryStatusService from '../../services/inventory-status';
import InventoryTransactionService from '../../services/inventory-transaction';
import costSimulationService from '../../services/cost-simulation';
import itemService from '../../services/item';
import LabelService from '../../services/label';
import Location from '../../models/location';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { localeData } from 'moment';
import sequenceService from '../../services/sequence';
import { Op, Sequelize } from 'sequelize';
import ItemService from '../../services/item';
import LoadRequestService from '../../services/load-request';
import RoleService from '../../services/role';
import locationService from '../../services/location';
import SaleOrderDetailService from '../../services/saleorder-detail';
import SaleOrderService from '../../services/saleorder';
import AccountShiperService from '../../services/account-shiper';
import addressService from '../../services/address';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  

  logger.debug('Calling Create locationDetail endpoint');
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const locationDetail = await locationDetailServiceInstance.create({
      ...req.body,
      ld_domain : user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    return res.status(201).json({ message: 'created succesfully', data: locationDetail });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createldpos = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  const code_cart = req.body.cart.code_cart;
  const usrd_site = req.body.cart.usrd_site;
  const products = req.body.cart.products;

  logger.debug('Calling Create locationDetail endpoint');
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const SequenceServiceInstance = Container.get(sequenceService);
    const sequence = await SequenceServiceInstance.findOne({ seq_seq: 'OP' });
    let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val) + 1}`;
    for (const product of products) {
      // const { pt_part, pt_qty, pt_loc } = product;

      await locationDetailServiceInstance.create({
        ld_domain:user_domain,
        ld_loc: product.pt_loc,
        ld_part: product.pt_part,
        ld_lot: nbr,
        ld_qty_oh: product.pt_qty,
        ld_site: usrd_site,
        ld_date: new Date(),
        chr01:product.pt_draw,
        chr02:product.pt_break_cat,
        chr03:product.pt_group,
        int01:product.int01,
          int02:product.int02,
          // chr04:item.tr_addr,
          chr05:product.pt_prod_line,
          ld__chr02:product.pt_part_type,
          ld_rev:product.pt_rev,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
    }
    return res.status(201).json({ message: 'created succesfully', data: true });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  locationDetail endpoint');
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const { id } = req.params;
    const locationDetail = await locationDetailServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: locationDetail });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const itemServiceInstance = Container.get(ItemService);
    const labelServiceInstance = Container.get(LabelService);
    const locationServiceInstance = Container.get(locationService)
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService)
    const saleOrderServiceInstance = Container.get(SaleOrderService)
    const accountShiper = Container.get(AccountShiperService)
    const addressServiceInstance = Container.get(addressService)
    const locationDetails = await locationDetailServiceInstance.findall({ld_domain:user_domain, ld_qty_oh: {[Op.gt]: 0}});
       
    //  console.log(locationDetails)
   const result = []
   for (let det of locationDetails) {
    let part = await itemServiceInstance.findOne({pt_part: det.ld_part, pt_domain: user_domain})
    const locations = await locationServiceInstance.findOne({loc_domain:user_domain,loc_site:det.ld_site,loc_loc:det.ld_loc});
    const sod = await saleOrderDetailServiceInstance.findOne({sod_domain:user_domain,sod_part:det.ld_part,sod_serial:det.ld_lot,sod_site:det.ld_site,sod_loc:det.ld_loc});
    
    
      if(locations !=null){    
        if(sod != null){
      const so =  await saleOrderServiceInstance.findOne({so_domain:user_domain,so_nbr:sod.sod_nbr});
    const as = await accountShiper.find({as_type:'I',as_domain:user_domain,as_so_nbr:so.so_nbr,});
    const addr = await addressServiceInstance.findOne({ad_addr:so.so_cust,ad_domain:user_domain,});
    
    let open_amt = 0
    let paid_amt = 0
    for(let shiper of as){
     open_amt = Number(open_amt) + Number(shiper.as_amt) - Number(shiper.as_applied)
     paid_amt = Number(paid_amt) + Number(shiper.as_applied)
    }
    // let lab = await labelServiceInstance.findOne({lb_domain: user_domain, lb_ref: det.ld_ref})
      let ref:any;
      let fact:any;
      if (det.ld_ref == null){ref = 'LIBRE'}else{ref = addr.ad_name}
      if(so.so_inv_nbr == null){fact = ''}else{fact = so.so_inv_nbr}
       
        const result_body = {
          id:det.id,
          ld_site: det.ld_site,
          bloc:locations.chr01,
          fact:fact,
          ld_lot: det.ld_lot,
          door:det.ld__chr01,
          level:locations.loc_phys_addr,
          ld_ref: ref,
          pt_part_type:part.pt_part_type,
          pt_size:part.pt_size,
          un_amt:so.so_amt / part.pt_size,
          amt:so.so_amt,
          ovs:so.so_prepaid,
          notaire:det.ld_grade,
          paid_amt:paid_amt,
          paid_pct : paid_amt * 100/ so.so_amt,
          open_amt:open_amt,
          open_pct:open_amt * 100 /so.so_amt,
          ap:'',
          pr:'',
          rc:'',
          as:'',

          ld_loc: det.ld_loc,
          ld_part: det.ld_part,
          pt_desc1: part.pt_desc1,
          pt_draw:part.pt_draw,
          pt_group:part.pt_group,
          pt_prod_line:part.pt_prod_line,
          ld_qty_oh: det.ld_qty_oh,
          ld_status:det.ld_status,
          created_by:det.created_by,
          last_modified_by:det.last_modified_by,
          ld_date:det.ld_date,
          };
        result.push(result_body);
       
       
       
        }
        else{
    
    let open_amt = 0
    let paid_amt = 0
    // let lab = await labelServiceInstance.findOne({lb_domain: user_domain, lb_ref: det.ld_ref})
      let ref:any;
      let fact:any;
      if (det.ld_ref == null){ref = 'LIBRE'}else{ref = det.ld_ref}
       
        const result_body = {
          id:det.id,
          ld_site: det.ld_site,
          bloc:locations.chr01,
          fact:'',
          ld_lot: det.ld_lot,
          door:det.ld__chr01,
          level:locations.loc_phys_addr,
          ld_ref: ref,
          pt_part_type:part.pt_part_type,
          pt_size:part.pt_size,
          un_amt:part.pt_price ,
          amt:part.pt_price * part.pt_size,
          ovs:0,
          notaire:det.ld_grade,
          paid_amt:paid_amt,
          paid_pct : paid_amt * 100/ 1,
          open_amt:open_amt,
          open_pct:open_amt * 100 /1,
          ap:'',
          pr:'',
          rc:'',
          as:'',

          ld_loc: det.ld_loc,
          ld_part: det.ld_part,
          pt_desc1: part.pt_desc1,
          pt_draw:part.pt_draw,
          pt_group:part.pt_group,
          pt_prod_line:part.pt_prod_line,
          ld_qty_oh: det.ld_qty_oh,
          ld_status:det.ld_status,
          created_by:det.created_by,
          last_modified_by:det.last_modified_by,
          ld_date:det.ld_date,
          };
        result.push(result_body);
       
       
       
        }
      }      
    }
    
   {return res.status(200).json({ message: 'fetched succesfully', data: result });}
 
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const locationDetails = await locationDetailServiceInstance.find({ ...req.body,ld_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: locationDetails });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByWeek = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const locationDetails = await locationDetailServiceInstance.findByWeek({ ...req.body,ld_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: locationDetails });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const locationDetails = await locationDetailServiceInstance.findOne({ ...req.body,ld_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: locationDetails });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOneRef = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const locationDetails = await locationDetailServiceInstance.findOne({ ...req.body,ld_domain:user_domain, 
      ld_qty_oh: {[Op.gt]: 0},
      } );
    return res.status(200).json({ message: 'fetched succesfully', data: locationDetails });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOneStatus = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const inventoryStatusDetailServiceInstance = Container.get(InventoryStatusDetailService);
    const locationDetails = await locationDetailServiceInstance.findOne({ ...req.body,ld_domain:user_domain });

   // console.log(locationDetails);
    if (locationDetails) {
      const trstatus = await inventoryStatusDetailServiceInstance.findOne({
        isd_domain:user_domain,
        isd_status: locationDetails.ld_status,
        isd_tr_type: 'ISS-SO',
      });
      return res.status(200).json({
        message: 'fetched succesfully',
        data: { locationDetails, trstatus },
      });
    } else {
      return res.status(200).json({
        message: 'not FOund',
        data: { locationDetails: null, trstatus: null },
      });
    }
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
 // 
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);

    const locationDetails = await locationDetailServiceInstance.find({
      ...req.body,ld_domain:user_domain,
    });
    return res.status(202).json({
      message: 'sec',
      data: locationDetails,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findQtyOh = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  

  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const itemServiceInstance = Container.get(ItemService);
    const locationDetails = await locationDetailServiceInstance.findfifolot( {
     where: { ...req.body,ld_qty_oh : {[Op.gt]: 0}, ld_domain:user_domain},
    
      attributes: [
        'ld_part',
        'ld_site',
        
        
        [Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'qty'],
      ],
      group: ['ld_part', 'ld_site'],
      
      raw: true,
    
    });
  //  console.log("here",locationDetails)
    const result = [];
    
    
    console.log(req.body)
    for (const det of locationDetails) {
      
          const result_body = {
            
            ld_part: det.ld_part,
            
            ld_qty_oh: det.qty,
           
            ld_site: det.ld_site,
            // ld_ref: det.ld_ref,
          };
          result.push(result_body);
          
        
          
        }
        if(locationDetails.length == 0){
          const result_body = {
            
            ld_part: req.body.ld_part,
            
            ld_qty_oh: 0,
           
            ld_site: req.body.ld_site,
            // ld_ref: det.ld_ref,
          };
          result.push(result_body);
          
        }
      
    

    //console.log(result)
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByFifoLot = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  

  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const itemServiceInstance = Container.get(ItemService);
    const locationDetails = await locationDetailServiceInstance.findfifolot( {
     where: { ...req.body.obj,ld_qty_oh : {[Op.gt]: 0}, ld__log01: true,ld_domain:user_domain},
    
      attributes: [
        'ld_part',
        'ld_site',
        'ld_lot',
        'ld_expire',
        [Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'qty'],
      ],
      group: ['ld_part', 'ld_site', 'ld_lot', 'ld_expire'],
      order: [
        ['ld_expire', 'ASC'],
        ['qty', 'ASC'],
      ],
      raw: true,
    
    });
  //  console.log("here",locationDetails)
    const result = [];
    var rest = Number(req.body.qty);
    var qty = locationDetails.qty;
    for (const det of locationDetails) {
      const part = await itemServiceInstance.findOne({pt_part: det.ld_part, pt_domain: user_domain})
      if (rest > 0) {
        if (det.qty >= rest) {
          const result_body = {
            ld_loc: det.ld_loc,
            ld_part: det.ld_part,
            pt_desc1: part.pt_desc1,
            pt_um: part.pt_um,
            pt_break_cat:part.pt_break_cat,
            pt_draw:part.pt_draw,
            pt_group:part.pt_group,
            ld_qty_oh: rest,
            ld_lot: det.ld_lot,
            ld_site: det.ld_site,
            // ld_ref: det.ld_ref,
          };
          result.push(result_body);
          rest = rest - det.ld_qty_oh;
        } else {
          const result_body = {
            ld_loc: det.ld_loc,
            ld_part: det.ld_part,
            pt_desc1: part.pt_desc1,
            pt_um: part.pt_um,
            pt_break_cat:part.pt_break_cat,
            pt_draw:part.pt_draw,
            pt_group:part.pt_group,
            ld_qty_oh: det.qty,
            ld_lot: det.ld_lot,
            ld_site: det.ld_site,
            // ld_ref: det.ld_ref,
          };
          rest = rest - det.ld_qty_oh;
          result.push(result_body);
        }
      }
    }

    //console.log(result)
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByFifo = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  

  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const locationDetails = await locationDetailServiceInstance.findfifo({ ...req.body.obj,ld_qty_oh : {[Op.gt]: 0}, ld__log01: true,ld_domain:user_domain });
    const result = [];
    var rest = Number(req.body.qty);
    var qty = locationDetails.ld_qty_oh;
    for (const det of locationDetails) {
      if (rest > 0) {
        if (det.ld_qty_oh >= rest) {
          const result_body = {
            ld_loc: det.ld_loc,
            ld_part: det.ld_part,
            pt_desc1: det.item.pt_desc1,
            pt_um: det.item.pt_um,
            ld_qty_oh: rest,
            ld_lot: det.ld_lot,
            ld_site: det.ld_site,
            ld_ref: det.ld_ref,
          };
          result.push(result_body);
          rest = rest - det.ld_qty_oh;
        } else {
          const result_body = {
            ld_loc: det.ld_loc,
            ld_part: det.ld_part,
            pt_desc1: det.item.pt_desc1,
            pt_um: det.item.pt_um,
            ld_qty_oh: det.ld_qty_oh,
            ld_lot: det.ld_lot,
            ld_site: det.ld_site,
            ld_ref: det.ld_ref,
          };
          rest = rest - det.ld_qty_oh;
          result.push(result_body);
        }
      }
    }

    //console.log(result)
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  locationDetail endpoint');
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const { id } = req.params;
    const locationDetail = await locationDetailServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: locationDetail });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const updateS = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  locationDetail endpoint');
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService);
    const costSimulationServiceInstance = Container.get(costSimulationService);
    const itemServiceInstance = Container.get(itemService);

    let locationDetail;
for (let ld of req.body.details) {
  const ref = await locationDetailServiceInstance.findOne({ ld_domain:user_domain,ld_ref:ld.ld_ref });
     locationDetail = await locationDetailServiceInstance.update(
      { ld_user1:ld.ld_user1,ld_user2:ld.ld_user2,ld_status: ld.ld_status, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id : ld.id},
      
    );
    const sct = await costSimulationServiceInstance.findOne({
      sct_domain:user_domain,
      sct_part: ld.ld_part,
      sct_site: ld.ld_site,
      sct_sim: 'STD-CG',
    });
    const pt = await itemServiceInstance.findOne({ pt_part: ld.ld_part,pt_domain:user_domain });
    await inventoryTransactionServiceInstance.create({
       tr_site: ref.ld_site,
       tr_loc: ref.ld_loc,
       tr_status: ref.ld_status,
       tr_part: ref.ld_part,
       tr_type: "ISS-CHL",
       tr_serial: ref.ld_lot,
       tr_vend_lot: ref.ld_vend_lot,
       tr_rmks: ld.ld_user2,
       tr_expire: ref.ld_expire,
       tr_domain:user_domain,
       tr_ref: ld.ld_ref,
       tr_qty_loc: 0,
       tr_line: 1,
       tr_um: pt.pt_um,
       tr_effdate: new Date(),
       tr_date: new Date(),
       tr_price: sct.sct_mtl_tl,
       tr_mtl_std: sct.sct_mtl_tl,
       tr_lbr_std: sct.sct_lbr_tl,
       tr_bdn_std: sct.sct_bdn_tl,
       tr_ovh_std: sct.sct_ovh_tl,
       tr_sub_std: sct.sct_sub_tl,
       tr_desc:pt.pt_desc1,
       tr_prod_line: pt.pt_prod_line,
       tr__chr01:pt.pt_draw,
       tr__chr02:pt.pt_break_cat,
       tr__chr03:pt.pt_group,
       tr_grade:ref.ld_grade,
       tr_batch:ref.ld__chr01,
       dec01:Number(new Date().getFullYear()),
       dec02:Number(new Date().getMonth() + 1),
       tr_program:new Date().toLocaleTimeString(),
       created_by: user_code,
       created_ip_adr: req.headers.origin,
       last_modified_by: user_code,
       last_modified_ip_adr: req.headers.origin,
       
        tr__chr04:pt.pt_part_type,
        int01:pt.int01,
        int02:pt.int02,
        
    });
    await inventoryTransactionServiceInstance.create({
      tr_site: ld.ld_site,
       tr_loc: ld.ld_loc,
       tr_status: ld.ld_status,
       tr_part: ld.ld_part,
       tr_type: "RCT-CHL",
       tr_serial: ld.ld_lot,
       tr_vend_lot: ld.ld_vend_lot,
       tr_rmks: '',
       tr_expire: ld.ld_expire,
      tr_domain:user_domain,
      tr_qty_loc: 0,
      tr_ref: ld.ld_ref,
      tr_line: 1,
      tr_um: pt.pt_um,
      tr_effdate: new Date(),
      tr_date: new Date(),
      tr_price: sct.sct_mtl_tl,
      tr_mtl_std: sct.sct_mtl_tl,
      tr_lbr_std: sct.sct_lbr_tl,
      tr_bdn_std: sct.sct_bdn_tl,
      tr_ovh_std: sct.sct_ovh_tl,
      tr_sub_std: sct.sct_sub_tl,
      tr_desc:pt.pt_desc1,
        tr_prod_line: pt.pt_prod_line,
        tr__chr01:pt.pt_draw,
        tr__chr02:pt.pt_break_cat,
        tr__chr03:pt.pt_group,
        tr_grade:ld.ld_grade,
        tr_batch:ld.ld__chr01,
        dec01:Number(new Date().getFullYear()),
        dec02:Number(new Date().getMonth() + 1),
        tr_program:new Date().toLocaleTimeString(),
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
      
        tr__chr04:pt.pt_part_type,
        int01:pt.int01,
        int02:pt.int02,
       
    });
}
    return res.status(200).json({ message: 'fetched succesfully', data: locationDetail });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOtherStatus = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const Sequelize = require('sequelize');
  const Op = Sequelize.Op;
  //console.log(req.body.status);
  logger.debug('Calling find by  all details endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
  //  console.log('here', req.body);
    const { detail } = req.body.obj;
  //  console.log(detail);
    const locationDetailServiceInstance = Container.get(LocationDetailService);

    const locationdetails = await locationDetailServiceInstance.find({
      ...req.body.obj,ld_domain:user_domain,
      ld_status: {
        [Op.ne]: req.body.status,
      },
    });
   // console.log(req.body.obj);
    return res.status(202).json({
      message: 'sec',
      data: locationdetails,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  locationDetail endpoint');
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const { id } = req.params;
    const locationDetail = await locationDetailServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findStatusInstance = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
   logger.debug('Calling find by  all details endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const _ = require("lodash")
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const inventoryStatusServiceInstance = Container.get(InventoryStatusService);

    const status = await inventoryStatusServiceInstance.findS({
      where : {...req.body, is_frozen : true,is_domain:user_domain,}, attributes :['is_status']},);
      let st = []
      for(let s of status) {

        st.push(s.is_status)
      }

      console.log(typeof status)
      // const st = _.values(status.dataValues)
       //const st = _.mapValues(status, function(o){return o.is_status});
      console.log(st)
    const locationdetails = await locationDetailServiceInstance.find({
      ...req.body.obj,ld_domain:user_domain,
      ld_status: st,
    });
    //console.log(locationdetails);

    return res.status(202).json({
      message: 'sec',
      data: locationdetails,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByPrice = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const locationDetails = await locationDetailServiceInstance.find({...req.body,ld_qty_oh: {[Op.ne]: 0},ld_domain:user_domain});
    console.log(locationDetails)
    let result=[]
    let i=1
    for (let data of locationDetails) {
result.push({
  id:i,
  part:data.ld_part,
  desc: data.item.pt_desc1,
  lot:data.ld_lot,
  qty: data.ld_qty_oh,
  amt: Number(data.ld_qty_oh) * Number(data.item.pt_price) * 1.2138
})
i++
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByPriceRole = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  //console.log(req.body)
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const loadRequestServiceInstance = Container.get(LoadRequestService);
    const roleServiceInstance = Container.get(RoleService)
    const itemServiceInstance = Container.get(ItemService)
    // const locationDetails = await locationDetailServiceInstance.find({...req.body,ld_qty_oh: {[Op.ne]: 0},ld_domain:user_domain});
    const locationDetails = await locationDetailServiceInstance.findSpecial({
      where: {
        ld_domain:user_domain,
        ...req.body,
        ld_qty_oh: {[Op.ne]: 0},
      },
      attributes: ['ld_part',  [Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'total_qty']],
      group: ['ld_part',],
      raw: true,
    });
    const role = await roleServiceInstance.findOne({role_loc:req.body.ld_loc})
    const loadrequest = await loadRequestServiceInstance.findAllLoadRequests40ByRoleCode(role.role_code)
    let lr = []
    for(let load of loadrequest) {
      lr.push(load.load_request_code)
    }
    console.log("lr",lr)


   // console.log(locationDetails)
    let result=[]
    let i=1
    for (let data of locationDetails) {
      const line = await loadRequestServiceInstance.findLoadRequestLineBysum({where : {load_request_code:lr,product_code: data.ld_part},
        attributes: ['product_code',  [Sequelize.fn('sum', Sequelize.col('qt_effected')), 'total_qtyeffected']],
        group: ['product_code',],
        raw: true,
      })
      const item = await itemServiceInstance.findOne({ pt_part: data.ld_part,pt_domain:user_domain });

result.push({
  id:i,
  part:data.ld_part,
  desc: item.pt_desc1,
  qty: (line[0] != null) ? Number(data.total_qty) + Number(line[0].total_qtyeffected) : Number(data.total_qty) ,
  amt:  Number(item.pt_price) 
})
i++
    }

    const lines = await loadRequestServiceInstance.findLoadRequestLineBysum({where : {load_request_code:lr},
      attributes: ['product_code',  [Sequelize.fn('sum', Sequelize.col('qt_effected')), 'total_qtyeffected']],
      group: ['product_code',],
      raw: true,
    })
    console.log(lines)
    for (let ln of lines) {
    const item = await itemServiceInstance.findOne({ pt_part: ln.product_code,pt_domain:user_domain });

    const idpart =  result.findIndex(({ part }) => part == ln.product_code);
    if(idpart < 0) {
     
        result.push({
          id:i,
          part:ln.product_code,
          desc: item.pt_desc1,
          qty: Number(ln.total_qtyeffected) ,
          amt:  Number(item.pt_price) 
        })
        i++
      }
    }
    //console.log(result)
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  createldpos,
  findOne,
  findAll,
  findBy,
  findByOne,
  findByOneRef,
  findByOneStatus,
  update,
  updateS,
  deleteOne,
  findByAll,
  findOtherStatus,
  findByFifo,
  findByFifoLot,
  findByWeek,
  findStatusInstance,
  findQtyOh,
  findByPrice,
  findByPriceRole,
};
