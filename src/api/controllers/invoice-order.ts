import InvoiceOrderService from "../../services/invoice-order"
import InvoiceOrderDetailService from "../../services/invoice-order-detail"
import AccountReceivableService from "../../services/account-receivable"
import SaleShiperService from '../../services/sale-shiper';
import SaleOrderService from '../../services/saleorder';

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'


const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        console.log(req.body)
        const invoiceOrderServiceInstance = Container.get(InvoiceOrderService)

        const invoiceOrderDetailServiceInstance = Container.get(
            InvoiceOrderDetailService
        )
        const accountReceivableServiceInstance = Container.get(AccountReceivableService)
        const saleShiperServiceInstance = Container.get(SaleShiperService)
        const { invoiceOrder, invoiceOrderDetail } = req.body

        const ih = await invoiceOrderServiceInstance.create({...invoiceOrder,ih_domain: user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code})
        
        for (let entry of invoiceOrderDetail) {
            entry = { ...entry, idh_inv_nbr: ih.ih_inv_nbr }
            await invoiceOrderDetailServiceInstance.create({...entry,idh_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})

            const sh = await saleShiperServiceInstance.findOne({psh_domain:user_domain,psh_shiper: entry.idh_ship, psh_part:entry.idh_part, psh_nbr: entry.idh_nbr,psh_line: entry.idh_sad_line })
            if(sh) await saleShiperServiceInstance.update({psh_invoiced : true, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: sh.id})
        }

        
        await accountReceivableServiceInstance.create({
            ar_domain:user_domain,
            ar_nbr : ih.ih_inv_nbr,
            ar_effdate: invoiceOrder.ih_inv_date,
            ar_date: new Date(),
            ar_type: "I",
            ar_cust: invoiceOrder.ih_cust,
            ar_bill: invoiceOrder.ih_bill,
            ar_rmks: invoiceOrder.ih_rmks,
            ar_cr_terms: invoiceOrder.ih_cr_terms,
            ar_open: true,
            ar_applied: 0,
            ar_base_applied:0,
            ar_curr: invoiceOrder.ih_curr,
            ar_ex_rate: invoiceOrder.ih_ex_rate,
            ar_ex_rate2: invoiceOrder.ih_ex_rate2,
            ar_amt: Number(invoiceOrder.ih_amt) + Number(invoiceOrder.ih_tax_amt) + Number(invoiceOrder.ih_trl1_amt),
            ar_base_amt: (Number(invoiceOrder.ih_amt) + Number(invoiceOrder.ih_tax_amt) + Number(invoiceOrder.ih_trl1_amt)) * Number(invoiceOrder.ih_ex_rate2) /  Number(invoiceOrder.ih_ex_rate)   ,
            created_by:user_code,created_ip_adr: req.headers.origin,
            last_modified_by: user_code
        })
        return res
            .status(201)
            .json({ message: "created succesfully", data: ih })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const createdirect = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        console.log(req.body)
        const invoiceOrderServiceInstance = Container.get(InvoiceOrderService)
        const saleOrderServiceInstance = Container.get(SaleOrderService)

        const invoiceOrderDetailServiceInstance = Container.get(
            InvoiceOrderDetailService
        )
        const accountReceivableServiceInstance = Container.get(AccountReceivableService)
        const { invoiceOrder, invoiceOrderDetail } = req.body

        const ih = await invoiceOrderServiceInstance.create({...invoiceOrder, ih_domian:user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
        for (let entry of invoiceOrderDetail) {
            entry = { ...entry,idh_domian:user_domain, idh_inv_nbr: ih.ih_inv_nbr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await invoiceOrderDetailServiceInstance.create(entry)

        
        }
        const so = await saleOrderServiceInstance.findOne({so_domain:user_domain,so_nbr: ih.ih_nbr })
            if(so) await saleOrderServiceInstance.update({so_invoiced : true,so_to_inv:false, so_inv_nbr: ih.ih_inv_nbr, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: so.id})
        await accountReceivableServiceInstance.create({
            ar_domain:user_domain,   
            ar_nbr : ih.ih_inv_nbr,
            ar_effdate: invoiceOrder.ih_inv_date,
            ar_date: new Date(),
            ar_type: "I",
            ar_cust: invoiceOrder.ih_cust,
            ar_bill: invoiceOrder.ih_bill,
            ar_rmks: invoiceOrder.ih_rmks,
            ar_cr_terms: invoiceOrder.ih_cr_terms,
            ar_open: true,
            ar_applied: 0,
            ar_base_applied:0,
            ar_curr: invoiceOrder.ih_curr,
            ar_ex_rate: invoiceOrder.ih_ex_rate,
            ar_ex_rate2: invoiceOrder.ih_ex_rate2,
            ar_amt: Number(invoiceOrder.ih_amt) + Number(invoiceOrder.ih_tax_amt) + Number(invoiceOrder.ih_trl1_amt),
            ar_base_amt: (Number(invoiceOrder.ih_amt) + Number(invoiceOrder.ih_tax_amt) + Number(invoiceOrder.ih_trl1_amt)) * Number(invoiceOrder.ar_ex_rate2) /  Number(invoiceOrder.ar_ex_rate)   ,
            created_by: user_code,
            last_modified_by: user_code
        })
        return res
            .status(201)
            .json({ message: "created succesfully", data: ih })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    const{user_domain} = req.headers

    logger.debug("Calling find by  all invoiceOrder endpoint")
    try {
        const invoiceOrderServiceInstance = Container.get(InvoiceOrderService)
        const invoiceOrderDetailServiceInstance = Container.get(
            InvoiceOrderDetailService
        )
        const invoiceOrder = await invoiceOrderServiceInstance.findOne({
            ...req.body,ih_domain:user_domain
        })
        if (invoiceOrder) {
            const details = await invoiceOrderDetailServiceInstance.find({
                idh_domain:user_domain,
                idh_inv_nbr: invoiceOrder.ih_inv_nbr,
            })
            return res.status(200).json({
                message: "fetched succesfully",
                data: { invoiceOrder, details },
            })
        } else {
            return res.status(404).json({
                message: "not FOund",
                data: { invoiceOrder, details: null },
            })
        }
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
        const invoiceOrderServiceInstance = Container.get(InvoiceOrderService)
        const { id } = req.params
        const invoiceOrder = await invoiceOrderServiceInstance.findOne({ id })
        const invoiceOrderDetailServiceInstance = Container.get(
            InvoiceOrderDetailService
        )
        const details = await invoiceOrderDetailServiceInstance.find({
            idh_domain:user_domain,
            idh_inv_nbr: invoiceOrder.ih_inv_nbr,
        })

        return res.status(200).json({
            message: "fetched succesfully",
            data: { invoiceOrder, details },
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all requisition endpoint")
    const{user_domain} = req.headers

    try {
        const invoiceOrderServiceInstance = Container.get(InvoiceOrderService)
        
        const ihs = await invoiceOrderServiceInstance.find({ih_domain:user_domain})
            
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
        const invoiceOrderServiceInstance = Container.get(InvoiceOrderService)
        const invoiceOrderDetailServiceInstance = Container.get(
            InvoiceOrderDetailService
        )
        const ihs = await invoiceOrderServiceInstance.find({ih_domain:user_domain})
        for(const ih of ihs){
            const details = await invoiceOrderDetailServiceInstance.find({
                idh_domain:user_domain,
                idh_nbr: ih.ih_inv_nbr,
            })
            result.push({id:ih.id, ih, details})
    
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
        const invoiceOrderServiceInstance = Container.get(InvoiceOrderService)
        const { id } = req.params
        console.log(req.body)
        const invoiceOrder = await invoiceOrderServiceInstance.update(
            { ...req.body , last_modified_by: user_code},
            { id }
        )
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: invoiceOrder })
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
        //const invoiceOrderServiceInstance = Container.get(invoiceOrderService)

        const ihs =await sequelize.query("SELECT *  FROM   PUBLIC.ih_hist, PUBLIC.pt_mstr, PUBLIC.idh_det  where PUBLIC.idh_det.idh_inv_nbr = PUBLIC.ih_hist.ih_inv_nbr and PUBLIC.idh_det.idh_part = PUBLIC.pt_mstr.pt_part and PUBLIC.ih_hist.ih_domain = and PUBLIC.idh_det.idh_domain and PUBLIC.ih_hist.ih_domain = PUBLIC.pt_mstr.pt_domain and PUBLIC.ih_hist.ih_domain = ? ORDER BY PUBLIC.idh_det.id DESC", { replacements: [user_domain], type: QueryTypes.SELECT });
       
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ihs })
            
            
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    } 
}

export default {
    create,
    createdirect,
    findBy,
    findByAll,
    findOne,
    findAll,
    update,
    findAllwithDetails,
}
