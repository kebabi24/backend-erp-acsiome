import VoucherOrderService from "../../services/voucher-order"
import VoucherOrderDetailService from "../../services/voucher-order-detail"
import AccountPayableService from "../../services/account-payable"
import AccountPayableDetailService from "../../services/account-payable-detail"

import PurchaseReceiveService from '../../services/purchase-receive';
import PurchaseOrderService from '../../services/purchase-order';
import ProviderService from '../../services/provider';
import GeneralLedgerService from "../../services/general-ledger"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
import moment from 'moment';
import LocationDeclaredService from "../../services/location-declared"


const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    const  date = new Date();
    logger.debug("Calling Create sequence endpoint")
    try {
        
        const voucherOrderServiceInstance = Container.get(VoucherOrderService)

        const voucherOrderDetailServiceInstance = Container.get(
            VoucherOrderDetailService
        )
        const generalLedgerServiceInstance = Container.get(GeneralLedgerService)
        const accountPayableServiceInstance = Container.get(AccountPayableService)
        const accountPayableDetailServiceInstance = Container.get(AccountPayableDetailService)
        const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService)
        const providerServiceInstance = Container.get(ProviderService)
        const locationDeclaredServiceInstance = Container.get(LocationDeclaredService)
        const { voucherOrder, vh_inv_nbr, voucherOrderDetail, apDetail, declared} = req.body

console.log(vh_inv_nbr)

        const vh = await voucherOrderServiceInstance.create({...voucherOrder,vh_domain: user_domain,vh_inv_nbr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code})
        
        for (let entry of voucherOrderDetail) {
            entry = { ...entry, vdh_domain: user_domain,vdh_inv_nbr: vh_inv_nbr }
            await voucherOrderDetailServiceInstance.create({...entry, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})

            const sh = await purchaseReceiveServiceInstance.findOne({prh_domain: user_domain,prh_receiver: entry.vdh_ship, prh_part:entry.vdh_part, prh_nbr: entry.vdh_nbr,prh_line: entry.vdh_sad_line })
            if(sh) await purchaseReceiveServiceInstance.update({prh_invoiced : true, prh_inv_nbr:vh.vh_inv_nbr,  last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: sh.id})
/*declared ldd*/
                    if(declared) {
                        const ld = await locationDeclaredServiceInstance.findOne({
                            ldd_part: entry.vdh_part,
                            ldd_site: entry.vdh_site,
                            ldd_loc: entry.vdh_loc,
                            ldd_domain:user_domain
                          });
                          if (ld)
                            await locationDeclaredServiceInstance.update(
                              {
                                ldd_qty_oh: Number(ld.ldd_qty_oh) + Number(entry.vdh_qty_inv) ,
                                last_modified_by: user_code,
                                last_modified_ip_adr: req.headers.origin,
                              },
                              { id: ld.id },
                            );
                          else {
                            // const status = await statusServiceInstance.findOne({
                            //   is_domain:user_domain,
                            //   is_status: item.tr_status,
                            // });
                    
                            await locationDeclaredServiceInstance.create({
                              ldd_part: entry.vdh_part,
                              ldd_date: new Date(),
                              ldd_site: entry.vdh_site,
                              ldd_loc: entry.vdh_loc,
                            //   ldd_status: entry.tr_status,
                              ldd_qty_oh: Number(entry.vdh_qty_inv) ,
                              ldd_domain:user_domain
                            });
                          }
                                    
                    }
/*declared ldd*/        
                }
        await accountPayableServiceInstance.create({
         ap_domain: user_domain,   
         ap_nbr : vh_inv_nbr,
         ap_po: vh.vh_po,
         ap_effdate: voucherOrder.vh_inv_date,
         ap_date: new Date(),
         ap_type: "I",
         ap_vend: voucherOrder.vh_vend,
         ap_rmks: voucherOrder.vh_rmks,
         ap_cr_terms: voucherOrder.vh_cr_terms,
         ap_open: true,
         ap_applied: 0,
         ap_base_applied:0,
         ap_curr: voucherOrder.vh_curr,
         ap_ex_rate: voucherOrder.vh_ex_rate,
         ap_ex_rate2: voucherOrder.vh_ex_rate2,
         ap_amt: Number(voucherOrder.vh_amt) + Number(voucherOrder.vh_tax_amt) + Number(voucherOrder.vh_trl1_amt),
         ap_base_amt: (Number(voucherOrder.vh_amt) + Number(voucherOrder.vh_tax_amt) + Number(voucherOrder.vh_trl1_amt)) * Number(voucherOrder.vh_ex_rate2) /  Number(voucherOrder.vh_ex_rate)   ,
         created_by:user_code,created_ip_adr: req.headers.origin,
         last_modified_by: user_code
        })

         /***************GL *************/
         if (apDetail.length > 0  ) {
         const gl = await generalLedgerServiceInstance.findLastId({glt_domain: user_domain,glt_date: date})
         if(gl) {
           var seq =  gl.glt_ref.substring(10, 18)
        var d = Number(seq) + 1
        
        var seqchar = ("000000" + d).slice(-6);
        
        var ref = "PO" + moment().format('YYYYMMDD') + seqchar ;
        } else {
 
            
            var ref = "PO"  + moment().format('YYYYMMDD') + "000001" ;
           // return year +  month + day;
          
 
        }
        const effdate = new Date(voucherOrder.vh_inv_date)       

        var i = 1
        for (let entr of apDetail) {
            entr = { ...entr, apd_domain: user_domain,apd_nbr: vh.vh_inv_nbr }
            await accountPayableDetailServiceInstance.create({...entr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})

            await generalLedgerServiceInstance.create({
                glt_domain: user_domain,
                glt_ref: ref,

                glt_line: i,
                glt_acct: entr.apd_acct,
                glt_desc : entr.apd_desc,
                glt_sub: entr.apd_sub,
                glt_cc : entr.apd_cc,
                glt_amt: entr.apd_amt,
                glt_curr_amt: entr.apd_cur_amt,
                glt_addr: voucherOrder.vh_vend,
                glt_curr: voucherOrder.vh_curr,
                glt_tr_type: "PO",
                glt_doc_type: "I",
    
                glt_dy_code: voucherOrder.ap_dy_code,
                glt_ex_rate: voucherOrder.vh_ex_rate,
                glt_ex_rate2: voucherOrder.vh_ex_rate2,
                glt_doc: vh_inv_nbr,
                glt_effdate: voucherOrder.vh_inv_date,
                glt_year: effdate.getFullYear(),
                  
                //glt_curr_amt: (Number(entry.glt_amt)) * Number(accountPayable.ap_ex_rate2) /  Number(accountPayable.ap_ex_rate)   ,
                glt_date: date, created_by: user_code, last_modified_by: user_code})
           i = i + 1
           }
         }   

          

        const vd = await providerServiceInstance.findOne({vd_domain:user_domain,vd_addr: voucherOrder.vh_vend})
        console.log(voucherOrder.vd_vend)
        console.log(vd.vd_balance)
        console.log(Number(voucherOrder.vh_amt) + Number(voucherOrder.vh_tax_amt) + Number(voucherOrder.vh_trl1_amt))
        if(vd) await providerServiceInstance.update({vd_balance : Number(vd.vd_balance) + Number(voucherOrder.vh_amt) + Number(voucherOrder.vh_tax_amt) + Number(voucherOrder.vh_trl1_amt)  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: vd.id})
      
        return res
            .status(201)
            .json({ message: "created succesfully", data: vh })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
/*const createdirect = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        
        const voucherOrderServiceInstance = Container.get(VoucherOrderService)
        const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

        const voucherOrderDetailServiceInstance = Container.get(
            VoucherOrderDetailService
        )
        const accountPayableServiceInstance = Container.get(AccountReceivableService)
        const { voucherOrder, voucherOrderDetail } = req.body

        const vh = await voucherOrderServiceInstance.create({...voucherOrder, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
        for (let entry of voucherOrderDetail) {
            entry = { ...entry, vdh_inv_nbr: vh.vh_inv_nbr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await voucherOrderDetailServiceInstance.create(entry)

        
        }
        const po = await purchaseOrderServiceInstance.findOne({so_nbr: vh.vh_nbr })
            if(po) await purchaseOrderServiceInstance.update({so_invoiced : true,so_to_inv:false, so_inv_nbr: vh.vh_inv_nbr, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: so.id})
        await accountPayableServiceInstance.create({
         ap_nbr : vh.vh_inv_nbr,
         ap_effdate: voucherOrder.vh_inv_date,
         ap_date: new Date(),
         ap_type: "I",
         ap_cust: voucherOrder.vh_cust,
         ap_vend: voucherOrder.vh_vend,
         ap_rmks: voucherOrder.vh_rmks,
         ap_cr_terms: voucherOrder.vh_cr_terms,
         ap_open: true,
         ap_applied: 0,
         ap_base_applied:0,
         ap_curr: voucherOrder.vh_curr,
         ap_ex_rate: voucherOrder.vh_ex_rate,
         ap_ex_rate2: voucherOrder.vh_ex_rate2,
         ap_amt: Number(voucherOrder.vh_amt) + Number(voucherOrder.vh_tax_amt) + Number(voucherOrder.vh_trl1_amt),
         ap_base_amt: (Number(voucherOrder.vh_amt) + Number(voucherOrder.vh_tax_amt) + Number(voucherOrder.vh_trl1_amt)) * Number(voucherOrder.ap_ex_rate2) /  Number(voucherOrder.ap_ex_rate)   ,
         created_by: user_code,
         last_modified_by: user_code
        })
        return res
            .status(201)
            .json({ message: "created succesfully", data: vh })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}*/

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    logger.debug("Calling find by  all invoiceOrder endpoint")
    const{user_domain} = req.headers
    try {
        const voucherOrderServiceInstance = Container.get(VoucherOrderService)
        const voucherOrderDetailServiceInstance = Container.get(
            VoucherOrderDetailService
        )
        const voucherOrder = await voucherOrderServiceInstance.findOne({
            ...req.body,vh_domain:user_domain
        })
        if (voucherOrder) {
            const details = await voucherOrderDetailServiceInstance.find({
                vdh_domain: user_domain,
                vdh_inv_nbr: voucherOrder.vh_inv_nbr,
            })
            return res.status(200).json({
                message: "fetched succesfully",
                data: { voucherOrder, details },
            })
        } else {
            return res.status(404).json({
                message: "not FOund",
                data: { voucherOrder, details: null },
            })
        }
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    logger.debug("Calling find by  all invoiceOrder endpoint")
    const{user_domain} = req.headers
    try {
        const voucherOrderServiceInstance = Container.get(VoucherOrderService)
        const voucherOrder = await voucherOrderServiceInstance.findOne({
            ...req.body,vh_domain: user_domain
        })
        return res
        .status(200)
        .json({ message: "fetched succesfully", data: voucherOrder })
      
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  invoiceOrder endpoint")
    const{user_domain} = req.headers
    try {
        const voucherOrderServiceInstance = Container.get(VoucherOrderService)
        const { id } = req.params
        const voucherOrder = await voucherOrderServiceInstance.findOne({ id })
        const voucherOrderDetailServiceInstance = Container.get(
            VoucherOrderDetailService
        )
        const details = await voucherOrderDetailServiceInstance.find({
            vdh_domain: user_domain,
            vdh_inv_nbr: voucherOrder.vh_inv_nbr,
        })

        return res.status(200).json({
            message: "fetched succesfully",
            data: { voucherOrder, details },
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    logger.debug("Calling find by  all requisition endpoint")
    const{user_domain} = req.headers
    try {
        const voucherOrderServiceInstance = Container.get(VoucherOrderService)
        
        const ihs = await voucherOrderServiceInstance.find({vh_domain: user_domain})
            
        return res.status(202).json({
            message: "sec",
            data:  ihs ,
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all invoiceOrder endpoint")
    const{user_domain} = req.headers
    try {
        let result = []
        const voucherOrderServiceInstance = Container.get(VoucherOrderService)
        const voucherOrderDetailServiceInstance = Container.get(
            VoucherOrderDetailService
        )
        const vhs = await voucherOrderServiceInstance.find({vh_domain: user_domain})
        for(const vh of vhs){
            const details = await voucherOrderDetailServiceInstance.find({
                vdh_domain: user_domain,
                vdh_nbr: vh.vh_inv_nbr,
            })
            result.push({id:vh.id, vh, details})
    
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: result })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling update one  invoiceOrder endpoint")
    try {
        const voucherOrderServiceInstance = Container.get(VoucherOrderService)
        const { id } = req.params
        
        const voucherOrder = await voucherOrderServiceInstance.update(
            { ...req.body , last_modified_by: user_code},
            { id }
        )
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: voucherOrder })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")
    const{user_domain} = req.headers
    logger.debug("Calling find all invoiceOrder endpoint")
    try {
        let result = []
        //const voucherOrderServiceInstance = Container.get(VoucherOrderService)

        const vhs =await sequelize.query("SELECT *  FROM   PUBLIC.vh_hist, PUBLIC.pt_mstr, PUBLIC.vdh_det  where PUBLIC.vdh_det.vdh_domain = ? and PUBLIC.vdh_det.vdh_inv_nbr = PUBLIC.vh_hist.vh_inv_nbr and PUBLIC.vdh_det.vdh_part = PUBLIC.pt_mstr.pt_part PUBLIC.vh_hist.vh_domain = PUBLIC.vdh_det.vdh_domain and PUBLIC.pt_mstr.pt_domain = PUBLIC.vdh_det.vdh_domain ORDER BY PUBLIC.vdh_det.id DESC", { remplacements: [user_domain], type: QueryTypes.SELECT });
       
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: vhs })
            
            
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    } 
}

export default {
    create,
    //createdirect,
    findBy,
    findByOne,
    findByAll,
    findOne,
    findAll,
    update,
    findAllwithDetails,
}
