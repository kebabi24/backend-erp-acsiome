import PsService from '../../services/ps';
import ItemService from '../../services/item';
import LocationDetailService from '../../services/location-details';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import costSimulationService from '../../services/cost-simulation';
import { INTEGER } from 'sequelize';
import { readlink } from 'fs';
import site from './site';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
  const{user_domain} = req.headers

  logger.debug('Calling update one  code endpoint');
  try {
    const { detail, it } = req.body;
    const psServiceInstance = Container.get(PsService);

    for (const item of detail) {
      await psServiceInstance.create({
        ...item,
        ...it,
        ps_domain:user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
    }
    return res.status(200).json({ message: 'deleted succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const psServiceInstance = Container.get(PsService);
    const { id } = req.params;
    const ps = await psServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: ps });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code pppppssssssss');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const psServiceInstance = Container.get(PsService);
    const ps = await psServiceInstance.findAll({ps_domain:user_domain});
    //   console.log(ps)
    return res.status(200).json({ message: 'fetched succesfully', data: ps });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const psServiceInstance = Container.get(PsService);
    const ps = await psServiceInstance.findby({ ...req.body,ps_domain:user_domain });
    
    var i = 1;
    for (let p of ps) {
      p.int01 = i;
      p.chr01 = p.item.pt_desc1;

      i = i + 1;
    }
    return res.status(200).json({ message: 'fetched succesfully', data: ps });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findQtyOnStock = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const psServiceInstance = Container.get(PsService);
    const ps = await psServiceInstance.findQtyOnStock({ ...req.body,ps_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: ps });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBySpec = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const details = req.body.detail;
    const site = req.body.site;
    const psServiceInstance = Container.get(PsService);
    const itemServiceInstance = Container.get(ItemService);
    const ldServiceInstance = Container.get(LocationDetailService);
    //console.log(req.body);
    const result = [];
    var j = 1;
    for (let obj of details) {
      if (obj.type != "Stock") {
      const ps = await psServiceInstance.finds({ ps_parent: obj.bom , ps_domain:user_domain});
      for (let p of ps) {
       
        var bool = false;
        for (var i = 0; i < result.length; i++) {
          if (result[i].part == p.ps_comp) {
            result[i].qty =
              result[i].qty + (Number(p.ps_qty_per) / (parseFloat(p.ps_scrp_pct) / 100)) * Number(obj.prod_qty);
            //  result[i].qtycom = (result[i].qty + Number(p.ps_qty_per) * Number(obj.prod_qty) )  - result[i].qtyoh
            bool = true;
          }
        }
        if (bool == false) {
          result.push({
            id: j,
            part: p.ps_comp,
            qty: (Number(p.ps_qty_per) / (parseFloat(p.ps_scrp_pct) / 100)) * Number(obj.prod_qty),
          });
          //     qtyoh: ldqty,sftystk:item.pt_sfty_stk,  qtycom: qtyc
          // const item = await itemServiceInstance.findOne({pt_part:p.ps_comp})
          // const lds = await ldServiceInstance.find({ld_part: p.ps_comp, ld_site: site})
          // var ldqty = 0
          // for (let ld of lds ) {
          //     ldqty = ldqty + Number(ld.ld_qty_oh)
          // }

          // var qtyc = 0
          //  //? ((Number(p.ps_qty_per) * Number(obj.prod_qty)) - Number(ldqty) + Number(item.pt_sfty_stk)) : 0
          //  if (((Number(p.ps_qty_per) * Number(obj.prod_qty)) - ldqty + Number(item.pt_sfty_stk)) >= 0) { qtyc = ((Number(p.ps_qty_per) * Number(obj.prod_qty)) - ldqty + Number(item.pt_sfty_stk)) } else qtyc = 0
          //  console.log(Number(p.ps_qty_per) * Number(obj.prod_qty),ldqty,item.pt_sfty_stk,qtyc)
          //  result.push({ id: j , part: p.ps_comp, qty: Number(p.ps_qty_per) * Number(obj.prod_qty), desc: item.pt_desc1, vend: item.pt_vend, um:item.pt_um ,
          //     qtyoh: ldqty,sftystk:item.pt_sfty_stk,  qtycom: qtyc

          // })
          j = j + 1;
        }
      }
        } else {
          result.push({
            id: j,
            part: obj.part,
            qty:  Number(obj.prod_qty),
          });
          j = j + 1

        }
          }

    let dat = [];
    for (let res of result) {
      const item = await itemServiceInstance.findOne({ pt_part: res.part , pt_domain:user_domain});
      const lds = await ldServiceInstance.find({ ld_part: res.part, ld_site: site,ld_domain:user_domain });
      var ldqty = 0;
      for (let ld of lds) {
        ldqty = ldqty + Number(ld.ld_qty_oh);
      }

      var qtyc = 0;
      //? ((Number(p.ps_qty_per) * Number(obj.prod_qty)) - Number(ldqty) + Number(item.pt_sfty_stk)) : 0
      if (res.qty - ldqty + Number(item.pt_sfty_stk) >= 0) {
        qtyc = res.qty - ldqty + Number(item.pt_sfty_stk);
      } else qtyc = 0;
      //console.log(Number(p.ps_qty_per) * Number(obj.prod_qty),ldqty,item.pt_sfty_stk,qtyc)
      //console.log( Math.ceil(qtyc))
      dat.push({
        id: res.id,
        part: res.part,
        qty: res.qty,
        desc: item.pt_desc1,
        vend: item.pt_vend,
        um: item.pt_um,
        qtyoh: ldqty,
        sftystk: item.pt_sfty_stk,
        qtycom: qtyc,
        qtyval: Math.ceil(qtyc),
        rank: item.int01,
      });
    }
    
    //  for(let res of result){
    //      res.qtycom = res.qty - res.qtyoh
    //  }
//    console.log(dat);
    //const psServiceInstance = Container.get(PsService)
    //  const ps = await psServiceInstance.find({...req.body})
    return res.status(200).json({ message: 'fetched succesfully', data: dat });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  logger.debug('Calling update one  code endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const psServiceInstance = Container.get(PsService);
    const { id } = req.params;
    console.log(id);
    const { ps, details } = req.body;
    console.log(details);
    await psServiceInstance.delete({ ps_parent: id });
    for (let entry of details) {
      entry = {
        ...entry,
        ps_parent: id,
        ps_domain:user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await psServiceInstance.create(entry);
    }
    return res.status(200).json({ message: 'fetched succesfully update', data: ps });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  code endpoint');
  try {
    const psServiceInstance = Container.get(PsService);
    const { id } = req.params;
    const ps = await psServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findPrice = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all task endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  let price = 0;
  try {
    const psServiceInstance = Container.get(PsService);
    const costSimulationServiceInstance = Container.get(costSimulationService);

    const ps = await psServiceInstance.find({
      ...req.body,ps_domain:user_domain
    });
    
    for (let entry of ps) {
      const sct = await costSimulationServiceInstance.findOne({
        sct_domain:user_domain,
        sct_part: entry.ps_comp,
        sct_site: "1000",
        sct_sim: 'STD-CG',
      });
    
      price = price + entry.ps_qty_per * sct.sct_cst_tot;
    }
console.log(price)
    return res.status(200).json({
      message: 'fetched succesfully',
      data: price,
    });
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
  findBySpec,
  update,
  deleteOne,
  findPrice,
  findQtyOnStock,
};
