import SaleShiperService from '../../services/sale-shiper';
import CustomerService from '../../services/customer';
import locationDetailService from '../../services/location-details';
import inventoryTransactionService from '../../services/inventory-transaction';
import costSimulationService from '../../services/cost-simulation';
import saleOrderDetailService from '../../services/saleorder-detail';
import itemService from '../../services/item';
import AddressService from '../../services/address';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { round } from 'lodash';
import { QueryTypes } from 'sequelize';
import { generatePdf } from '../../reporting/generator';
import { domain } from 'process';
import ItemService from '../../services/item';
import addressService from '../../services/address';
import { Op, Sequelize } from 'sequelize';

import CodeService from '../../services/code';
import saleShiperService from '../../services/sale-shiper';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create code endpoint');
  try {
    const saleShiperServiceInstance = Container.get(SaleShiperService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const inventoryTransactionServiceInstance = Container.get(inventoryTransactionService);
    const costSimulationServiceInstance = Container.get(costSimulationService);
    const saleOrderDetailServiceInstance = Container.get(saleOrderDetailService);
    const itemServiceInstance = Container.get(itemService);
    const codeService = Container.get(CodeService);

    //const lastId = await saleShiperServiceInstance.max('psh_nbr');

    for (const item of req.body.detail) {
      console.log(req.body.detail)
      const { ...remain } = item;
      await saleShiperServiceInstance.create({
        psh_domain: user_domain,
        psh_shiper: req.body.pshnbr,
        ...remain,
        ...req.body.ps,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      const sod = await saleOrderDetailServiceInstance.findOne({
        sod_domain: user_domain,
        sod_nbr: req.body.ps.psh_nbr,
      //  sod_line: remain.psh_line,
        sod_part: remain.psh_part,
      });
      if (sod){
      console.log("remain",remain.psh_qty_ship)
        await saleOrderDetailServiceInstance.update(
          {
            sod_qty_ship: Number(sod.sod_qty_ship) + Number(remain.psh_qty_ship),
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          },
          { id: sod.id },
        );} 
        console.log(remain.psh_part,remain.psh_site)
      const sctdet = await costSimulationServiceInstance.findOne({
        sct_domain: user_domain,
        sct_part: remain.psh_part,
        sct_site: remain.psh_site,
        sct_sim: 'STD-CG',
      });
      console.log(sctdet)
      const pt = await itemServiceInstance.findOne({ pt_domain: user_domain,pt_part: remain.psh_part });
      //console.log(remain.psh_part, remain.psh_site)

      //console.log(remain.qty_oh)
      //console.log(sctdet.sct_cst_tot)
      await inventoryTransactionServiceInstance.create({
        tr_domain: user_domain,
        tr_status: remain.psh_status,
        tr_expire: remain.psh_expire,
        tr_line: remain.psh_line,
        tr_part: remain.psh_part,
        tr_prod_line: pt.pt_prod_line,
        tr_qty_loc: -Number(remain.psh_qty_ship),
        tr_um: remain.psh_um,
        tr_um_conv: remain.psh_um_conv,
        tr_ship_type: remain.psh_type,
        tr_price: remain.psh_price,
        tr_site: remain.psh_site,
        tr_loc: remain.psh_loc,
        tr_serial: remain.psh_serial,
        tr_nbr: req.body.ps.psh_nbr,
        tr_lot: req.body.pshnbr,
        tr_addr: req.body.ps.psh_cust,
        tr_effdate: req.body.ps.psh_ship_date,
        tr_so_job: req.body.ps.psh_xinvoice,
        tr_curr: req.body.ps.psh_curr,
        tr_ex_rate: req.body.ps.psh_ex_rate,
        tr_ex_rate2: req.body.ps.psh_ex_rate2,
        tr_rmks: req.body.ps.psh_rmks,
        tr_type: 'ISS-SO',
        tr_qty_chg: Number(remain.psh_qty_ship),
        tr_loc_begin: Number(remain.qty_oh),
        tr_gl_amt: Number(remain.psh_qty_ship) * sctdet.sct_cst_tot,
        tr_date: new Date(),
        tr_mtl_std: sctdet.sct_mtl_tl,
        tr_lbr_std: sctdet.sct_lbr_tl,
        tr_bdn_std: sctdet.sct_bdn_tl,
        tr_ovh_std: sctdet.sct_ovh_tl,
        tr_sub_std: sctdet.sct_sub_tl,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
        tr_desc:pt.pt_desc1,
        
        tr__chr01:pt.pt_draw,
        tr__chr02:pt.pt_break_cat,
        tr__chr03:pt.pt_group,
        tr__chr04:pt.pt_part_type,
        int01:pt.int01,
        int02:pt.int02,
        dec01:Number(new Date().getFullYear()),
        dec02:Number(new Date().getMonth() + 1),
        tr_program:new Date().toLocaleTimeString(),
       
      });

      if (remain.psh_type != 'M') {
        const ld = await locationDetailServiceInstance.findOne({
          ld_domain: user_domain,
          ld_part: remain.psh_part,
          ld_lot: remain.psh_serial,
          ld_site: remain.psh_site,
          ld_loc: remain.psh_loc,
        });
        if (ld)
          await locationDetailServiceInstance.update(
            {
              ld_qty_oh: Number(ld.ld_qty_oh) - Number(remain.psh_qty_ship) * Number(remain.psh_um_conv),
              ld_expire: remain.psh_expire,
              last_modified_by: user_code,
              last_modified_ip_adr: req.headers.origin,
            },
            { id: ld.id },
          );
        else
          await locationDetailServiceInstance.create({
            ld_domain: user_domain,
            ld_part: remain.psh_part,
            ld_date: new Date(),
            ld_lot: remain.psh_serial,
            ld_site: remain.psh_site,
            ld_loc: remain.psh_loc,
            ld_qty_oh: -(Number(remain.psh_qty_ship) * Number(remain.psh_um_conv)),
            ld_expire: remain.psh_expire,
            ld_status: remain.psh_status,
            chr01:pt.pt_draw,
          chr02:pt.pt_break_cat,
          chr03:pt.pt_group,
          int01:pt.int01,
          int02:pt.int02,
          chr04:req.body.ps.psh_cust,
            chr05:pt.pt_prod_line,
            ld__chr02:pt.pt_part_type,
          ld_rev:pt.pt_rev,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
      }
      else
      {
        const ld = await locationDetailServiceInstance.findOne({
          ld_domain: user_domain,
          ld_part: remain.psh_part,
          ld_lot: remain.psh_serial,
          ld_site: remain.psh_site,
          ld_loc: remain.psh_loc,
        });
        if (ld)
          {await locationDetailServiceInstance.update(
            {
              ld_qty_oh: Number(ld.ld_qty_oh) - Number(remain.psh_qty_ship) * Number(remain.psh_um_conv),
              ld_expire: remain.psh_expire,
              last_modified_by: user_code,
              last_modified_ip_adr: req.headers.origin,
            },
            { id: ld.id }
            
          );
          await locationDetailServiceInstance.create({
            ld_domain: user_domain,
            ld_part: remain.psh_part,
            ld_date: new Date(),
            ld_lot: remain.psh_serial,
            ld_site: remain.psh_site,
            ld_loc: remain.psh_loc,
            ld_qty_oh: (Number(remain.psh_qty_ship) * Number(remain.psh_um_conv)),
            ld_ref:req.body.ps.psh_cust,
            ld_expire: remain.psh_expire,
            ld_status: remain.psh_status,
            chr01:pt.pt_draw,
          chr02:pt.pt_break_cat,
          chr03:pt.pt_group,
          int01:pt.int01,
          int02:pt.int02,
          chr04:req.body.ps.psh_cust,
            chr05:pt.pt_prod_line,
            ld__chr02:pt.pt_part_type,
          ld_rev:pt.pt_rev,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
        }
        else
        {
          await locationDetailServiceInstance.create({
            ld_domain: user_domain,
            ld_part: remain.psh_part,
            ld_date: new Date(),
            ld_lot: remain.psh_serial,
            ld_site: remain.psh_site,
            ld_loc: remain.psh_loc,
            ld_qty_oh: (Number(remain.psh_qty_ship) * Number(remain.psh_um_conv)),
            ld_ref:req.body.ps.psh_cust,
            ld_expire: remain.psh_expire,
            ld_status: remain.psh_status,
            chr01:pt.pt_draw,
          chr02:pt.pt_break_cat,
          chr03:pt.pt_group,
          int01:pt.int01,
          int02:pt.int02,
          chr04:req.body.ps.psh_cust,
            chr05:pt.pt_prod_line,
            ld__chr02:pt.pt_part_type,
          ld_rev:pt.pt_rev,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
        }
      }
    }

    //const {as, pshnbr} = req.body; as is undefined
    const { detail, ps, pshnbr, tot } = req.body;

    /* export */
    const fs = require('node:fs');
    const content = 'Some content!';
    let str = ``
    var days: String
    var months : String
    var year : String
    let date= new Date()
    let day = date.getDate();
    console.log(day)
if (day < 10) {
    days = "0" + String(day)
}
else {days = String(day)}
console.log(days)
let month = date.getMonth();
console.log(month)
if (month < 9) {
    month = month + 1
    months = "0" + month
} else {
    months = String(month + 1)
}

let years = date.getFullYear();
let datelr = `${days}/${months}/${years}`;

    const code = await codeService.findOne({code_fldname:"export-chargement",code_value:"bl"});

    if(code != null) {
      for (const item of req.body.detail) {

    
          str += `${item.psh_nbr}|${req.body.pshnbr}|${datelr}|${item.psh_cust}|${item.psh_site}|${item.psh_loc}|${item.psh_part}|${item.psh_serial}|${item.psh_qty_ship}|\n`;
  
       
      let filename = code.code_cmmt +  'BL-' + req.body.pshnbr + '.txt'
      console.log("filename :",filename)
        try {
          fs.writeFileSync(filename, str);
          // file written successfully
        } catch (err) {
          console.error(err);
        }
      }
    }
/*export end*/        

    // console.log('\n\n ps ', ps);
    // const addressServiceInstance = Container.get(AddressService);
    // const addr = await addressServiceInstance.findOne({ ad_domain: user_domain,ad_addr: ps.psh_cust });

    // const pdfData = {
    //   detail: detail,
    //   ps: ps,
    //   pshnbr: pshnbr,
    //   adr: addr,
    //   tot: tot,
    // };
    // console.log(pdfData);
    // let pdf = await generatePdf(pdfData, 'psh');

    // const shiper = await saleShiperServiceInstance.create(req.body)
    return res.status(201).json({ message: 'created succesfully', data: req.body.pshnbr,/* pdf: pdf.content*/ });
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
    const saleShiperServiceInstance = Container.get(SaleShiperService);
    const { id } = req.params;
    const shiper = await saleShiperServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: shiper });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const saleShiperServiceInstance = Container.get(SaleShiperService);
    const shiper = await saleShiperServiceInstance.find({psh_domain: user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: shiper });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllDistinct = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const sequelize = Container.get('sequelize');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  logger.debug('Calling find all purchaseOrder endpoint');
  try {
    let result = [];
    const { distinct } = req.params;
    //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)
    console.log(distinct);
    const pshs = await sequelize.query(
      "SELECT DISTINCT PUBLIC.psh_hist.psh_shiper, PUBLIC.psh_hist.psh_cust, PUBLIC.psh_hist.psh_ship_date, PUBLIC.psh_hist.psh_shipto,PUBLIC.psh_hist.psh_xinvoice,PUBLIC.psh_hist.psh_ship  FROM   PUBLIC.psh_hist where PUBLIC.psh_hist.psh_domain = ? and PUBLIC.psh_hist.psh_invoiced = 'false' and  PUBLIC.psh_hist.psh_cust = ? ",
      { replacements: [user_domain,distinct], type: QueryTypes.SELECT },
    );
    console.log(pshs);
    return res.status(200).json({ message: 'fetched succesfully', data: pshs });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBydet = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    
    const saleShiperServiceInstance = Container.get(SaleShiperService);
    const itemServiceInstance = Container.get(ItemService);
    const addressServiceInstance = Container.get(addressService);
    const saleOrderServiceInstance = Container.get(saleOrderDetailService);
    const inventoryTransactionServiceInstance = Container.get(inventoryTransactionService);
    

    const shiper = await saleShiperServiceInstance.find({ ...req.body, psh_domain: user_domain });
    
    let result = [];
    let i = 1;
    
    for(let emp of shiper)
      {const item = await itemServiceInstance.findOne({pt_domain:user_domain, pt_part:emp.psh_part}) 
       const addresse = await addressServiceInstance.findOne({ad_domain:user_domain, ad_addr:emp.psh_cust})
       const so = await saleOrderServiceInstance.findOne({sod_domain:user_domain, sod_nbr:emp.psh_nbr,sod_part:emp.psh_part})
       const tr = await inventoryTransactionServiceInstance.findOne({tr_domain:user_domain, tr_serial:emp.psh_serial,tr_part:emp.psh_part,tr_type:{ [Op.startsWith]: 'RCT' },})
      console.log(emp.psh_part, emp.psh_serial)
      
      result.push({
      id: i,
      psh_part:emp.psh_part,
      desc:item.pt_desc1,
      psh_nbr:emp.psh_nbr,
      psh_shiper:emp.psh_shiper,
      psh_ship_date:emp.psh_ship_date,
      psh_cust:emp.psh_cust,
      name:addresse.ad_name,
      sod_qty_ord:so.sod_qty_ord,
      psh_qty_ship:emp.psh_qty_ship,
      psh_um:emp.psh_um,
      psh_serial:emp.psh_serial,
      psh_price:emp.psh_price,
      vamt:Number(Number(emp.psh_price)*Number(emp.psh_qty_ship)),
      fournisseur:tr.tr_addr,
      pur_price:tr.tr_price,
      pamt:Number(Number(emp.psh_qty_ship)*Number(tr.tr_price)),
      ecart:Number(Number(emp.psh_price)*Number(emp.psh_qty_ship)) - Number(Number(emp.psh_qty_ship)*Number(tr.tr_price))
    
          });
    i = i + 1
  }






    return res.status(200).json({ message: 'fetched succesfully', data: result });
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
    
    const saleShiperServiceInstance = Container.get(SaleShiperService);
  

    const shiper = await saleShiperServiceInstance.find({ ...req.body, psh_domain: user_domain });
   






    return res.status(200).json({ message: 'fetched succesfully', data: shiper });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const saleShiperServiceInstance = Container.get(SaleShiperService);
    const { id } = req.params;
    const shiper = await saleShiperServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: shiper });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  code endpoint');
  try {
    const saleShiperServiceInstance = Container.get(SaleShiperService);
    const { id } = req.params;
    const shiper = await saleShiperServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    
    const saleShiperServiceInstance = Container.get(SaleShiperService);
    const customerServiceInstance = Container.get(CustomerService);
    const itemServiceInstance = Container.get(itemService);
    var shipers 
    console.log(req.body)
    if(req.body.site == "*") {
       shipers = await saleShiperServiceInstance.findS({  
        where: { psh_ship_date: { [Op.between]: [req.body.calc_date, req.body.calc_date1]},psh_domain: user_domain},
         });
   
    } else {
     shipers = await saleShiperServiceInstance.findS({ 
      where: { psh_site: req.body.site,psh_ship_date: { [Op.between]: [req.body.date, req.body.date1]},psh_domain: user_domain},
      
      });
    
    }
    //console.log(shipers.length)
    let result = []
    let i = 1
    for(let shiper of shipers ) {
      const cm = await customerServiceInstance.findOne({cm_addr: shiper.psh_cust,cm_domain : user_domain,})
      const pt = await itemServiceInstance.findOne({pt_part: shiper.psh_part,pt_domain : user_domain,})
   result.push({
    id : i,
    psh_site: shiper.psh_site,
    psh_ship_date: shiper.psh_ship_date,
    psh_nbr: shiper.psh_nbr,
    psh_shiper: shiper.psh_shiper,
    customer_code: cm.cm_addr,
    customer_name: cm.address.ad_name,
    pt_part_type: pt.pt_part_type,
    psh_part : shiper.psh_part,
    psh_serial : shiper.psh_serial,
    designation : pt.pt_desc1,
    psh_invoiced: shiper.psh_invoiced,
    psh_qty_ship: shiper.psh_qty_ship,
    psh_price: Number(shiper.psh_price) * Number(shiper.psh_qty_ship)

   })
    i++
    
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
  findOne,
  findAll,
  findAllDistinct,
  findBy,
  findBydet,
  update,
  deleteOne,
};
