import ProviderService from "../../services/provider"
import AddressService from "../../services/address"
import RequisitionService from "../../services/requisition"
import PurchaseReceiveService from "../../services/purchase-receive"
import PurchaseOrderService from "../../services/purchase-order"
import VendorProposalService from "../../services/vendor-proposal"
import InventoryTransactionService from "../../services/inventory-transaction"
import VoucherOrderService from "../../services/voucher-order"
import AccountPayableService from "../../services/account-payable"
import ProviderBankService from "../../services/provider-bank"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { Op, Sequelize } from 'sequelize';
import { QueryTypes } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create provider endpoint with body: %o", req.body)
    try {
        const { Provider, BankDetails } = req.body;
        console.log(BankDetails)
        const providerServiceInstance = Container.get(ProviderService)
        const providerBankServiceInstance = Container.get (ProviderBankService)
        const provider = await providerServiceInstance.create({...Provider,vd_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})

       for (let bank of BankDetails) {
        const providerBank = await providerBankServiceInstance.create({...bank,vdbk_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})

       }
        return res
            .status(201)
            .json({ message: "created succesfully", data: { provider } })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}
const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  provider endpoint")
    try {
        const providerServiceInstance = Container.get(ProviderService)
        const {id} = req.params
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhereeeeeeeeeeeeeeeeeeee")
        const provider = await providerServiceInstance.findOne({id})
        console.log(provider)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: provider  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const providerServiceInstance = Container.get(ProviderService)
        const providers = await providerServiceInstance.find({vd_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: providers })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all provider endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const providerServiceInstance = Container.get(ProviderService)
        const provider = await providerServiceInstance.findOne({...req.body,vd_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: provider })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByDet = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all provider endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const providerServiceInstance = Container.get(ProviderService)
        const provider = await providerServiceInstance.findOne({...req.body,vd_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: provider })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  provider endpoint")
    try {
        const { Provider, BankDetails } = req.body;
        const providerServiceInstance = Container.get(ProviderService)
        const providerBankServiceInstance = Container.get (ProviderBankService)
        const {id} = req.params
        const vd = await providerServiceInstance.findOne({id:id})
        const provider = await providerServiceInstance.update({...Provider,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
       const pb = await providerBankServiceInstance.delete({vdbk_addr:vd.vd_addr,vdbk_domain:vd.vd_domain})
        for (let bank of BankDetails) {
            const providerBank = await providerBankServiceInstance.create({...bank,vdbk_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
    
           }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: provider  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  provider endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    
    try {
        const providerServiceInstance = Container.get(ProviderService)
        const addressServiceInstance = Container.get(AddressService)
        const requisitionServiceInstance = Container.get(RequisitionService)
        const vendorProposalServiceInstance = Container.get(VendorProposalService)
        const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)
        const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService)
        const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService)
        const voucherOrderServiceInstance = Container.get(VoucherOrderService)
        const accountPayableServiceInstance = Container.get(AccountPayableService)
        const {id} = req.params
        console.log(req.params)
let message = ''
let bool = false
        const provider = await providerServiceInstance.findOne({id})
        if(provider) {
        const requisition = await requisitionServiceInstance.findOne({rqm_vend:provider.vd_addr, rqm_domain: user_domain})

        if (requisition) {
            bool = true
            message = "Ce Fournisseur a des demandes d'achat "
        }
        else {
            const vp = await vendorProposalServiceInstance.findOne({vp_vend:provider.vd_addr, vp_domain: user_domain})
            if (vp) {
                bool = true
                message = "Ce Fournisseur a des Offres  "
            } else {
                const po = await purchaseOrderServiceInstance.findOne({po_vend:provider.vd_addr, po_domain: user_domain})
                if(po) {
                    bool= true
                    message = "Ce Fournisseur a des Bons de Commandes "
                } else {
                    const prh = await purchaseReceiveServiceInstance.findOne({prh_vend:provider.vd_addr, prh_domain: user_domain})
                    if(prh) {
                        bool= true
                        message = "Ce Fournisseur a des Bons de Reception "
                    } 
                    else {
                        const tr = await inventoryTransactionServiceInstance.findOne({tr_addr:provider.vd_addr, tr_domain: user_domain})
                        if(tr) {
                            bool= true
                            message = "Ce Fournisseur a des Transactions "
                        } else {

                            const vh = await voucherOrderServiceInstance.findOne({
                                vh_vend:provider.vd_addr,vh_domain:user_domain
                            }) 
                            if(vh){
                                bool= true
                                message = "Ce Fournisseur a des Factures "
                            }else{
                               
                                const ap = await accountPayableServiceInstance.findOne({ap_vend:provider.vd_addr,ap_domain : user_domain})
                                if(ap){
                                    bool= true
                                    message = "Ce Fournisseur a des Paiements "
                                }
                            }
                        }
                    }

                }
            }

        }
        if(bool == false) {
       const prov = await providerServiceInstance.delete({id})
       const addr = await addressServiceInstance.delete({ad_addr:provider.vd_addr})  
       message = "Suppression Effectué avec succès"
        } else {

        }
    }
    console.log(bool,message)
        return res
            .status(200)
            .json({ message: message, bool,data: provider.id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findActivities = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const Sequelize = Container.get("sequelize")
    logger.debug("Calling find by  all account endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers 
    try {
        let i = 0
 let result = []
    

 var acts =await Sequelize.query("SELECT public.vd_mstr.id as id, vd_addr as vend, ad_name as name, (select COALESCE(sum(pod_price * pod_qty_ord),0) as poamt  from public.pod_det where pod_nbr in (select po_nbr from public.po_mstr where pod_nbr = po_nbr and po_vend = vd_addr and  po_ord_date >= ? and  po_ord_date <= ? )), (select COALESCE(sum(prh_pur_cost * prh_rcvd),0) as prhamt  from public.prh_hist where  prh_vend = vd_addr and  prh_rcp_date >= ? and  prh_rcp_date <= ? )  , (select COALESCE(sum(vdh_price * vdh_qty_inv),0) as vhamt  from public.vdh_det where vdh_inv_nbr in (select vh_inv_nbr from public.vh_hist where vh_inv_nbr = vdh_inv_nbr and vh_vend = vd_addr and  vh_inv_date >= ? and  vh_inv_date <= ? )) , (select COALESCE(sum( -1 * ap_base_amt),0) as apamt  from public.ap_mstr where  ap_vend = vd_addr and  ap_effdate >= ? and  ap_effdate <= ? and ap_type='P' ), public.vd_mstr.dec01 as total FROM public.vd_mstr, public.ad_mstr where vd_addr = ad_addr ORDER by id", { replacements: [req.body.date,req.body.date1,req.body.date,req.body.date1,req.body.date,req.body.date1,req.body.date,req.body.date1], type: QueryTypes.SELECT });
    
 acts.map((item)=>{
        let tot= Number(item.poamt) + Number(item.prhamt) + Number(item.vhamt) + Number(item.apamt)
        let element= {...item,"total_price":tot}
        result.push(element)
      })
      let data = result.filter((it) => it.total_price != 0);
      // console.log(data)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: data })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findActHist = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const Sequelize = Container.get("sequelize")
    logger.debug("Calling find by  all account endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers 
    try {
        console.log(req.body)
        let i = 0
 let result = []
    

 var actsh =await Sequelize.query("SELECT public.pt_mstr.id as id, pt_part as part, pt_desc1 as desc, (select COALESCE(sum(pod_price * pod_qty_ord),0) as poamt  from public.pod_det where pod_part= pt_part and pod_nbr in (select po_nbr from public.po_mstr where  po_vend = ? and  po_ord_date >= ? and  po_ord_date <= ? )) ,(select COALESCE(sum(pod_qty_ord),0) as poqty  from public.pod_det where pod_part= pt_part and pod_nbr in (select po_nbr from public.po_mstr where po_vend = ? and  po_ord_date >= ? and  po_ord_date <= ? )) ,(select COALESCE(sum(prh_pur_cost * prh_rcvd),0) as prhamt  from public.prh_hist where  prh_part = pt_part and prh_vend = ? and  prh_rcp_date >= ? and  prh_rcp_date <= ? ),(select COALESCE(sum(prh_rcvd),0) as prhqty  from public.prh_hist where  prh_part = pt_part and prh_vend = ? and  prh_rcp_date >= ? and  prh_rcp_date <= ? ) ,(select COALESCE(sum(vdh_price * vdh_qty_inv),0) as vhamt  from public.vdh_det where vdh_part= pt_part and vdh_inv_nbr in (select vh_inv_nbr from public.vh_hist where  vh_vend = ? and  vh_inv_date >= ? and  vh_inv_date <= ? )) ,(select COALESCE(sum(vdh_qty_inv),0) as vhqty  from public.vdh_det where vdh_part= pt_part and vdh_inv_nbr in (select vh_inv_nbr from public.vh_hist where  vh_vend = ? and  vh_inv_date >= ? and  vh_inv_date <= ? ))FROM public.pt_mstr  ORDER by id", { replacements: [req.body.vend,req.body.date,req.body.date1,req.body.vend,req.body.date,req.body.date1,req.body.vend,req.body.date,req.body.date1,req.body.vend,req.body.date,req.body.date1,req.body.vend,req.body.date,req.body.date1,req.body.vend,req.body.date,req.body.date1], type: QueryTypes.SELECT });
    
 actsh.map((item)=>{
    let tot= Number(item.poamt) + Number(item.prhamt) + Number(item.vhamt) 
    let element= {...item,"total_price":tot}
    result.push(element)
  })
  let data = result.filter((it) => it.total_price != 0);
      // console.log(data)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: data })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
export default {
    create,
    findOne,
    findAll,
    findBy,
    findByDet,
    update,
    deleteOne,
    findActivities,
    findActHist
}
