import LocationDetailService from '../../services/location-details';
import InventoryStatusDetailService from '../../services/inventory-status-details';
import InventoryStatusService from '../../services/inventory-status';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { localeData } from 'moment';
import sequenceService from '../../services/sequence';
import { Op, Sequelize } from 'sequelize';
import ItemService from '../../services/item';
import LoadRequestService from '../../services/load-request';
import RoleService from '../../services/role';

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
      const { pt_part, pt_qty, pt_loc } = product;

      await locationDetailServiceInstance.create({
        ld_domain:user_domain,
        ld_loc: pt_loc,
        ld_part: pt_part,
        ld_lot: nbr,
        ld_qty_oh: pt_qty,
        ld_site: usrd_site,
        ld_date: new Date(),
        chr01:product.pt_draw,
        chr02:product.pt_break_cat,
        chr03:product.pt_group,
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
    const locationDetails = await locationDetailServiceInstance.find({ld_domain:user_domain, ld_qty_oh: {[Op.gt]: 0}});
    console.log("locationDetails")
  
   {return res.status(200).json({ message: 'fetched succesfully', data: locationDetails });}
 
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

  logger.debug('Calling update one  locationDetail endpoint');
  try {
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    let locationDetail;
for (let ld of req.body.details) {
     locationDetail = await locationDetailServiceInstance.update(
      { ld_status: ld.ld_status, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id : ld.id},
    );
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
  findByPrice,
  findByPriceRole,
};
