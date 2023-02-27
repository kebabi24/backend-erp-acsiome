import TagService from '../../services/tag';
import ItemService from '../../services/item';
import locationDetailService from '../../services/location-details';
import inventoryTransactionService from '../../services/inventory-transaction';
import costSimulationService from '../../services/cost-simulation';
import { DATE, Op } from 'sequelize';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import item from './item';
import InventoryTransaction from '../../models/inventory-transaction';
import locationService from '../../services/location';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
const{user_domain} = req.headers

  logger.debug('Calling Create sequence endpoint');
  try {
    const tagServiceInstance = Container.get(TagService);
    const itemService = Container.get(ItemService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const lastId = await tagServiceInstance.max('tag_nbr');
    console.log(lastId)
    var tagId = 0 ;
    if (!isNaN(lastId)) {  tagId = Number(lastId) };
    
    const items = await itemService.find({
      pt_part: {
        [Op.between]: [req.body.pt_part_1, req.body.pt_part_2],
      },
      pt_prod_line: {
        [Op.between]: [req.body.pt_prod_line_1, req.body.pt_prod_line_2],
      },
      pt_part_type: {
        [Op.between]: [req.body.pt_type_1, req.body.pt_type_2],
      },
      pt_abc: {
        [Op.between]: [req.body.pt_abc_1, req.body.pt_abc_2],
      },
    });
    const result = [];
    for (const item of items) {
      const locationDetails = await locationDetailServiceInstance.find({
        ld_part: item.pt_part,
        ld_site: { [Op.between]: [req.body.pt_site_1, req.body.pt_site_2] },
        ld_loc: { [Op.between]: [req.body.pt_loc_1, req.body.pt_loc_2] },
      });
      for (const detail of locationDetails) {
//        console.log(detail);
        const data = {
          tag_nbr: Number(tagId) + 1,
          tag_part: item.pt_part,
          tag_loc: detail.ld_loc,
          tag_serial: detail.ld_lot,
          tag_site: detail.ld_site,
          tag_type: detail.pt_part_type,
        };
        const tag = await tagServiceInstance.create({...data, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin});
        result.push({ tag, item });
      }
    }
  //  console.log('aaa', result);

    return res.status(201).json({ message: 'created succesfully', data: result });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const createnew = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get("logger")
  const{user_code} = req.headers 
const{user_domain} = req.headers

  logger.debug("Calling Create sequence endpoint")
  try {
      console.log(req.body)
      const tagServiceInstance = Container.get(TagService);
      const itemService = Container.get(ItemService);
      const locationDetailServiceInstance = Container.get(locationDetailService);
      const lastId = await tagServiceInstance.max('tag_nbr');
      var tagId = 0 ;
      if (isNaN(lastId)) {tagId = 0} else {  tagId = Number(lastId) };
      console.log(tagId, "here")
      const { Detail } = req.body
       // const po = await purchaseOrderServiceInstance.create({...purchaseOrder, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        for (let entry of Detail) {
            entry = { ...entry, tag_nbr: tagId + 1 }
            await tagServiceInstance.create(entry)
        }
      //const tag = await tagServiceInstance.create({...req.body,tag_nbr: tagId + 1, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin});
  
      return res
          .status(201)
          .json({ message: "created succesfully", data: Detail })
  } catch (e) {
      //#
      logger.error("🔥 error: %o", e)
      return next(e)
  }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all tag endpoint');
  try {
    const tagServiceInstance = Container.get(TagService);
    const tags = await tagServiceInstance.find({
      ...req.body,
    });

    return res.status(200).json({
      message: 'fetched succesfully',
      data: tags,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByLastId = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all tag endpoint');
  try {
    const tagServiceInstance = Container.get(TagService);
    const lastId = await tagServiceInstance.max('id');

    return res.status(200).json({
      message: 'fetched succesfully',
      data: lastId,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all tag endpoint');
  try {
    const tagServiceInstance = Container.get(TagService);
    const tag = await tagServiceInstance.findOne({
      ...req.body,
    });

    return res.status(200).json({
      message: 'fetched succesfully',
      data: tag,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  tag endpoint');
  try {
    const tagServiceInstance = Container.get(TagService);
    const { id } = req.params;
    const tag = await tagServiceInstance.findOne({ id });

    return res.status(200).json({
      message: 'fetched succesfully',
      data: tag,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all tag endpoint');
  try {
    const tagServiceInstance = Container.get(TagService);
    const vps = await tagServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: vps });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
const{user_domain} = req.headers

  logger.debug('Calling update one  tag endpoint');
  try {
    const tagServiceInstance = Container.get(TagService);
    const { id } = req.params;
    console.log(req.params)
    console.log(req.body);
    const tag = await tagServiceInstance.update({ ...req.body , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin}, { id });
    return res.status(200).json({ message: 'fetched succesfully', data: tag });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const Reupdate = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
const{user_domain} = req.headers

  logger.debug('Calling update one  tag endpoint');
  try {
    const tagServiceInstance = Container.get(TagService);
    const { id } = req.params;
    console.log(req.params)
    console.log(req.body);
    const tag = await tagServiceInstance.reupdate({ ...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }, { id });
    return res.status(200).json({ message: 'fetched succesfully', data: tag });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const gap = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all tag endpoint');
  try {
    const tagServiceInstance = Container.get(TagService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const data = [];
    const tags = await tagServiceInstance.find({
      ...req.body,
    });
    for (const tag of tags) {
      const ld = await locationDetailServiceInstance.findOne({
        ld_part: tag.tag_part,
        ld_lot: tag.tag_serial,
        ld_site: tag.tag_site,
        ld_loc: tag.tag_loc,
      });
      const { ld_qty_frz, ld_qty_oh } = ld ? ld : {ld_qty_frz:null,ld_qty_oh:0}
      console.log({ ld_qty_frz, ld_qty_oh })
      const gap =
        (ld_qty_frz != null )
          ? Math.abs(tag.tag_cnt_qty - ld_qty_frz)
          : Math.abs(tag.tag_cnt_qty - ld_qty_oh);
      data.push({ ...tag.dataValues, ld_qty_frz, gap });
    }
    return res.status(200).json({
      message: 'fetched succesfully',
      data: data,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const freeze = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
const{user_domain} = req.headers

  logger.debug('Calling Create sequence endpoint');
  try {
    const tagServiceInstance = Container.get(TagService);
    const itemService = Container.get(ItemService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const lastId = await tagServiceInstance.max('tag_nbr');
    const items = await itemService.find({
      pt_part: {
        [Op.between]: [req.body.pt_part_1, req.body.pt_part_2],
      },
      pt_prod_line: {
        [Op.between]: [req.body.pt_prod_line_1, req.body.pt_prod_line_2],
      },
      pt_part_type: {
        [Op.between]: [req.body.pt_type_1, req.body.pt_type_2],
      },

      pt_abc: {
        [Op.between]: [req.body.pt_abc_1, req.body.pt_abc_2],
      },
    });
    const result = [];
    for (const item of items) {
      const locationDetails = await locationDetailServiceInstance.find({
        ld_part: item.pt_part,
        ld_site: { [Op.between]: [req.body.pt_site_1, req.body.pt_site_2] },
        ld_loc: { [Op.between]: [req.body.pt_loc_1, req.body.pt_loc_2] },
      });
      for (const location of locationDetails) {
        await locationDetailServiceInstance.update(
          { ld_qty_frz: location.ld_qty_oh, ld_date_frz: new Date(), last_modified_by:user_code,last_modified_ip_adr: req.headers.origin },
          { id: location.id },
        );
      }
    }

    return res.status(201).json({ message: 'created succesfully', data: true });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const validateTag = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  const{user_code} = req.headers 
const{user_domain} = req.headers

  logger.debug('Calling find by  all tag endpoint');
  try {
    const tagServiceInstance = Container.get(TagService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const inventoryTransactionServiceInstance = Container.get(inventoryTransactionService);
    const itemService = Container.get(ItemService);
    const costSimulationServiceInstance = Container.get(costSimulationService);
    const locationServiceInstance = Container.get(locationService);
    
    const data = [];
    const tags = await tagServiceInstance.find({
      ...req.body,
    });
    for (const tag of tags) {
//console.log(tag, "boucle")
      const {
        tag_cnt_qty,
        tag_rcnt_qty,
        tag_nbr,
        tag_cnt_um,
        tag_cnt_cnv,
        tag_cnt_nam,
        tag_serial,
        tag_cnt_dt,
        tag_rcnt_dt,
        tag_site,
        tag_part,
        tag_loc,
        item: { pt_prod_line, pt_part },
      } = tag;
      if(tag.bool01==true){
        const loc = await locationServiceInstance.findOne({
          loc_site: tag.tag_site,
          loc_loc: tag.tag_loc,
        }); 
      
        await locationDetailServiceInstance.create(
          { ld_date: new Date,ld_status: loc.loc_status, ld_qty_oh: tag_rcnt_qty ? tag_rcnt_qty : tag_cnt_qty, ld_qty_frz: null, ld_date_frz: null, ld_site:tag_site,ld_loc:tag_loc,ld_lot: tag_serial,ld_part:tag_part, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
        )
      }
      const { sct_cst_tot } = await costSimulationServiceInstance.findOne({ sct_part: pt_part, sct_sim: 'STDCG' });
     // console.log({ ...tag.dataValues,tag_posted: true })
      await tagServiceInstance.update({ ...tag.dataValues,tag_posted: true, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }, { id: tag.id });
      /*onst {
        ld_qty_frz,
        ld_qty_oh,
        id,
        ld_part,
        ld_site,
        ld_loc,
        ld_status,
      } = await locationDetailServiceInstance.findOne({
        ld_part: tag.tag_part,
        ld_lot: tag.tag_serial,
        ld_site: tag.tag_site,
        ld_loc: tag.tag_loc,
      });*/
      //console.log(tag.tag_serial)
      const ld = await locationDetailServiceInstance.findOne({
        ld_part: tag.tag_part,
        ld_lot: tag.tag_serial,
        ld_site: tag.tag_site,
        ld_loc: tag.tag_loc,
      });
     // console.log(ld.ld_lot)
      
      await locationDetailServiceInstance.update(
        { ld_qty_oh: tag_rcnt_qty ? tag_rcnt_qty : tag_cnt_qty, ld_qty_frz: null, ld_date_frz: null, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin },
        { id: ld.id }
      );
      
    //console.log(ld)
    
       
      const qty1 = ld.ld_qty_frz != null || ld.ld_qty_frz != 0 ? ld.ld_qty_frz : ld.ld_qty_oh;
      const qty2 = tag_rcnt_qty ? tag_rcnt_qty : tag_cnt_qty;
      const tr_qty_loc = qty2 - qty1;
      await inventoryTransactionServiceInstance.create({
        tr_part: ld.ld_part,
        tr_type: 'CYC_RCNT',
        tr_date: new Date(),
        tr_qty_chg: qty2,
        tr_um: tag_cnt_um,
        tr_um_conv: tag_cnt_cnv,
        tr_nbr: tag_nbr,
        tr_rmks: tag_cnt_nam,
        tr_lot: '',
        tr_serial: tag_serial,
        tr_loc: ld.ld_loc,
        tr_site: ld.ld_site,
        tr_effdate: tag_cnt_dt,
        tr_expire: ld.ld_expire,
        tr_qty_loc,
        tr_status: ld.ld_status,
        tr_prod_line: pt_prod_line,
        tr_price: sct_cst_tot,
        tr_gl_amt: sct_cst_tot * tr_qty_loc,
        created_by:user_code,created_ip_adr: req.headers.origin,
        last_modified_by:user_code,last_modified_ip_adr: req.headers.origin
      });
    }
    return res.status(200).json({
      message: 'fetched succesfully',
      data: true,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  createnew,
  findBy,
  findOne,
  findAll,
  update,
  Reupdate,
  findByOne,
  gap,
  freeze,
  validateTag,
  findByLastId
};
