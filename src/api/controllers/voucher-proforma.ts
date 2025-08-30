import VoucherProformaService from "../../services/voucher-proforma"
import VoucherProformaDetailService from "../../services/voucher-proforma-detail"

import PurchaseOrderService from '../../services/purchase-order';
import ProviderService from '../../services/provider';

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
        
        const voucherProformaServiceInstance = Container.get(VoucherProformaService)

        const voucherProformaDetailServiceInstance = Container.get(
            VoucherProformaDetailService
        )
      
        const providerServiceInstance = Container.get(ProviderService)
        const { voucherProforma, voucherProformaDetail } = req.body



        const vh = await voucherProformaServiceInstance.create({...voucherProforma,vhp_domain: user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code})
        
        for (let entry of voucherProformaDetail) {
            entry = { ...entry, vdhp_domain: user_domain,vdhp_inv_nbr: voucherProforma.vhp_inv_nbr }
            await voucherProformaDetailServiceInstance.create({...entry, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})

                             }
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
        
        const voucherProformaServiceInstance = Container.get(VoucherProformaService)
        const purchaseProformaServiceInstance = Container.get(PurchaseProformaService)

        const voucherProformaDetailServiceInstance = Container.get(
            VoucherProformaDetailService
        )
        const accountPayableServiceInstance = Container.get(AccountReceivableService)
        const { voucherProforma, voucherProformaDetail } = req.body

        const vh = await voucherProformaServiceInstance.create({...voucherProforma, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
        for (let entry of voucherProformaDetail) {
            entry = { ...entry, vdhp_inv_nbr: vh.vhp_inv_nbr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await voucherProformaDetailServiceInstance.create(entry)

        
        }
        const po = await purchaseProformaServiceInstance.findOne({so_nbr: vh.vhp_nbr })
            if(po) await purchaseProformaServiceInstance.update({so_invoiced : true,so_to_inv:false, so_inv_nbr: vh.vhp_inv_nbr, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: so.id})
        await accountPayableServiceInstance.create({
         ap_nbr : vh.vhp_inv_nbr,
         ap_effdate: voucherProforma.vhp_inv_date,
         ap_date: new Date(),
         ap_type: "I",
         ap_cust: voucherProforma.vhp_cust,
         ap_vend: voucherProforma.vhp_vend,
         ap_rmks: voucherProforma.vhp_rmks,
         ap_cr_terms: voucherProforma.vhp_cr_terms,
         ap_open: true,
         ap_applied: 0,
         ap_base_applied:0,
         ap_curr: voucherProforma.vhp_curr,
         ap_ex_rate: voucherProforma.vhp_ex_rate,
         ap_ex_rate2: voucherProforma.vhp_ex_rate2,
         ap_amt: Number(voucherProforma.vhp_amt) + Number(voucherProforma.vhp_tax_amt) + Number(voucherProforma.vhp_trl1_amt),
         ap_base_amt: (Number(voucherProforma.vhp_amt) + Number(voucherProforma.vhp_tax_amt) + Number(voucherProforma.vhp_trl1_amt)) * Number(voucherProforma.ap_ex_rate2) /  Number(voucherProforma.ap_ex_rate)   ,
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
    
    logger.debug("Calling find by  all invoiceProforma endpoint")
    const{user_domain} = req.headers
    try {
        const voucherProformaServiceInstance = Container.get(VoucherProformaService)
        const voucherProformaDetailServiceInstance = Container.get(
            VoucherProformaDetailService
        )
        const voucherProforma = await voucherProformaServiceInstance.findOne({
            ...req.body,vhp_domain:user_domain
        })
        if (voucherProforma) {
            const details = await voucherProformaDetailServiceInstance.find({
                vdhp_domain: user_domain,
                vdhp_inv_nbr: voucherProforma.vhp_inv_nbr,
            })
            return res.status(200).json({
                message: "fetched succesfully",
                data: { voucherProforma, details },
            })
        } else {
            return res.status(404).json({
                message: "not FOund",
                data: { voucherProforma, details: null },
            })
        }
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    logger.debug("Calling find by  all invoiceProforma endpoint")
    const{user_domain} = req.headers
    try {
        const voucherProformaServiceInstance = Container.get(VoucherProformaService)
        const voucherProforma = await voucherProformaServiceInstance.findOne({
            ...req.body,vhp_domain: user_domain
        })
        return res
        .status(200)
        .json({ message: "fetched succesfully", data: voucherProforma })
      
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  invoiceProforma endpoint")
    const{user_domain} = req.headers
    try {
        const voucherProformaServiceInstance = Container.get(VoucherProformaService)
        const { id } = req.params
        const voucherProforma = await voucherProformaServiceInstance.findOne({ id })
        const voucherProformaDetailServiceInstance = Container.get(
            VoucherProformaDetailService
        )
        const details = await voucherProformaDetailServiceInstance.find({
            vdhp_domain: user_domain,
            vdhp_inv_nbr: voucherProforma.vhp_inv_nbr,
        })

        return res.status(200).json({
            message: "fetched succesfully",
            data: { voucherProforma, details },
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
        const voucherProformaServiceInstance = Container.get(VoucherProformaService)
        
        const ihs = await voucherProformaServiceInstance.find({vhp_domain: user_domain})
            
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
    logger.debug("Calling find all invoiceProforma endpoint")
    const{user_domain} = req.headers
    try {
        let result = []
        const voucherProformaServiceInstance = Container.get(VoucherProformaService)
        const voucherProformaDetailServiceInstance = Container.get(
            VoucherProformaDetailService
        )
        const vhs = await voucherProformaServiceInstance.find({vhp_domain: user_domain})
        for(const vh of vhs){
            const details = await voucherProformaDetailServiceInstance.find({
                vdhp_domain: user_domain,
                vdhp_nbr: vh.vhp_inv_nbr,
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

    logger.debug("Calling update one  invoiceProforma endpoint")
    try {
        const voucherProformaServiceInstance = Container.get(VoucherProformaService)
        const { id } = req.params
        
        const voucherProforma = await voucherProformaServiceInstance.update(
            { ...req.body , last_modified_by: user_code},
            { id }
        )
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: voucherProforma })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")
    const{user_domain} = req.headers
    logger.debug("Calling find all invoiceProforma endpoint")
    try {
        let result = []
        //const voucherProformaServiceInstance = Container.get(VoucherProformaService)

        const vhs =await sequelize.query("SELECT *  FROM   PUBLIC.vhp_hist, PUBLIC.pt_mstr, PUBLIC.vdhp_det  where PUBLIC.vdhp_det.vdhp_domain = ? and PUBLIC.vdhp_det.vdhp_inv_nbr = PUBLIC.vhp_hist.vhp_inv_nbr and PUBLIC.vdhp_det.vdhp_part = PUBLIC.pt_mstr.pt_part PUBLIC.vhp_hist.vhp_domain = PUBLIC.vdhp_det.vdhp_domain and PUBLIC.pt_mstr.pt_domain = PUBLIC.vdhp_det.vdhp_domain Proforma BY PUBLIC.vdhp_det.id DESC", { remplacements: [user_domain], type: QueryTypes.SELECT });
       
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: vhs })
            
            
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    } 
}
const findBetweenDate = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all account endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers 
    try {
        let i = 0
 let result = []
        console.log(req.body)
 const voucherProformaServiceInstance = Container.get(VoucherProformaService)
 const voucherProformaDetailServiceInstance = Container.get(
    VoucherProformaDetailService
)
        const ap = await voucherProformaServiceInstance.findbetween(req.body)
      
        for(const vh of ap){
            const details = await voucherProformaDetailServiceInstance.find({
                vdhp_domain: user_domain,
                vdhp_inv_nbr: vh.vhp_inv_nbr,
            })
            result.push({id:vh.id, vh, details})
    
        }
    //  console.log(ap[0])
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: result })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const updated = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    logger.debug('Calling update one  purchaseOrder endpoint');
    try {
        const voucherProformaServiceInstance = Container.get(VoucherProformaService)
        const voucherProformaDetailServiceInstance = Container.get(
           VoucherProformaDetailService
       )
      const { id } = req.params;
      const {voucherOrder, detail} = req.body
      // const purchaseOrder = await purchaseOrderServiceInstance.update(
      //   { ...req.body, last_modified_by: user_code },
      //   { id },
      // );
      const proforma = await voucherProformaServiceInstance.findOne({ id });
      console.log(proforma.vhp_inv_nbr);
      const purchaseOrderDetail = await voucherProformaServiceInstance.update(
        { ...voucherOrder,  last_modified_by:user_code,last_modified_ip_adr: req.headers.origin },
        { id: id },
      );
    
      await voucherProformaDetailServiceInstance.delete({vdhp_inv_nbr: proforma.vhp_inv_nbr,vdhp_domain:user_domain})
      // const pos = await purchaseOrderDetailServiceInstance.find({ pod_domain: user_domain, pod_nbr: purchase.po_nbr });
  
      for (let entry of detail) {
        // const purchaseOrderDetail = await purchaseOrderDetailServiceInstance.update(
          entry = { ...entry, vdhp_domain:user_domain,vdhp_inv_nbr: proforma.vhp_inv_nbr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
              await voucherProformaDetailServiceInstance.create(entry)
        
      }
      return res.status(200).json({ message: 'fetched succesfully', data: id });
    } catch (e) {
      logger.error('ðŸ”¥ error: %o', e);
      return next(e);
    }
  };
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
    findBetweenDate,
    updated
    
}
