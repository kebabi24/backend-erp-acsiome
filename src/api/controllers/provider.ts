import ProviderService from "../../services/provider"
import AddressService from "../../services/address"
import RequisitionService from "../../services/requisition"
import PurchaseReceiveService from "../../services/purchase-receive"
import PurchaseOrderService from "../../services/purchase-order"
import VendorProposalService from "../../services/vendor-proposal"
import InventoryTransactionService from "../../services/inventory-transaction"
import VoucherOrderService from "../../services/voucher-order"
import AccountPayableService from "../../services/account-payable"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create provider endpoint with body: %o", req.body)
    try {
        
        const providerServiceInstance = Container.get(ProviderService)
        const provider = await providerServiceInstance.create({...req.body,vd_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})

       
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
        const provider = await providerServiceInstance.findOne({id})
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



const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  provider endpoint")
    try {
        const providerServiceInstance = Container.get(ProviderService)
        const {id} = req.params
        const provider = await providerServiceInstance.update({...req.body,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
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
export default {
    create,
    findOne,
    findAll,
    findBy,
    update,
    deleteOne
}
