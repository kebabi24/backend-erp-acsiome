import DdinvoiceService from "../../services/ddinvoice"
import DdinvoiceLineService from "../../services/ddinvoice-line"


import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'


const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        
        const DdinvoiceServiceInstance = Container.get(DdinvoiceService)

        const DdinvoiceLineServiceInstance = Container.get(
            DdinvoiceLineService
        )
       
        const { invoiceOrder, invoiceOrderDetail } = req.body

        const ih = await DdinvoiceServiceInstance.create({...invoiceOrder,ih_domain: user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code})
        
        for (let entry of invoiceOrderDetail) {
            entry = { ...entry, idh_inv_nbr: ih.ih_inv_nbr }
            await DdinvoiceLineServiceInstance.create({...entry,idh_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})

                }

        
      
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
    
    const{user_domain} = req.headers

    logger.debug("Calling find by  all invoiceOrder endpoint")
    try {
        const DdinvoiceServiceInstance = Container.get(DdinvoiceService)
        const DdinvoiceLineServiceInstance = Container.get(
            DdinvoiceLineService
        )
        const invoiceOrder = await DdinvoiceServiceInstance.findOne({
            ...req.body,ih_domain:user_domain
        })
        if (invoiceOrder) {
            const details = await DdinvoiceLineServiceInstance.find({
               
                invoice_code: invoiceOrder.invoice_code,
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
        const DdinvoiceServiceInstance = Container.get(DdinvoiceService)
        const { id } = req.params
        const invoiceOrder = await DdinvoiceServiceInstance.findOne({ id })
        const DdinvoiceLineServiceInstance = Container.get(
            DdinvoiceLineService
        )
        const details = await DdinvoiceLineServiceInstance.find({
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

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  invoiceOrder endpoint")
    const{user_domain} = req.headers

    try {
        const DdinvoiceServiceInstance = Container.get(DdinvoiceService)
      // const  ih_inv_nbr  = req.params
        const invoiceOrder = await DdinvoiceServiceInstance.findOne({ ...req.body })
        const DdinvoiceLineServiceInstance = Container.get(
            DdinvoiceLineService
        )
        const details = await DdinvoiceLineServiceInstance.find({
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
    
    logger.debug("Calling find by  all requisition endpoint")
    const{user_domain} = req.headers

    try {
        const DdinvoiceServiceInstance = Container.get(DdinvoiceService)
        
        const ihs = await DdinvoiceServiceInstance.find({ih_domain:user_domain})
            
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
        const DdinvoiceServiceInstance = Container.get(DdinvoiceService)
        const DdinvoiceLineServiceInstance = Container.get(
            DdinvoiceLineService
        )
        const ihs = await DdinvoiceServiceInstance.find({ih_domain:user_domain})
        for(const ih of ihs){
            const details = await DdinvoiceLineServiceInstance.find({
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
        const DdinvoiceServiceInstance = Container.get(DdinvoiceService)
        const { id } = req.params
        
        const invoiceOrder = await DdinvoiceServiceInstance.update(
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
console.log(req.body)
    logger.debug("Calling find all invoiceOrder endpoint")
    try {
        let result = []
        //const DdinvoiceServiceInstance = Container.get(DdinvoiceService)

        const ihs =await sequelize.query("SELECT PUBLIC.idh_det.id,PUBLIC.idh_det.idh_ship,PUBLIC.idh_det.idh_um,PUBLIC.idh_det.idh_part, PUBLIC.idh_det.idh_qty_inv,PUBLIC.idh_det.idh_price,PUBLIC.ih_hist.ih_inv_nbr,PUBLIC.ih_hist.ih_bill,PUBLIC.ih_hist.ih_inv_date,PUBLIC.pt_mstr.pt_desc1, PUBLIC.ad_mstr.ad_name, (PUBLIC.idh_det.idh_price * PUBLIC.idh_det.idh_qty_inv) as montant   FROM   PUBLIC.ih_hist, PUBLIC.pt_mstr, PUBLIC.idh_det , PUBLIC.ad_mstr where PUBLIC.ih_hist.ih_inv_date >= ? and PUBLIC.ih_hist.ih_inv_date <= ? and PUBLIC.idh_det.idh_inv_nbr = PUBLIC.ih_hist.ih_inv_nbr and PUBLIC.ad_mstr.ad_addr = PUBLIC.ih_hist.ih_bill and PUBLIC.idh_det.idh_part = PUBLIC.pt_mstr.pt_part and PUBLIC.ih_hist.ih_domain = ? ORDER BY PUBLIC.idh_det.id ASC", { replacements: [req.body.date,req.body.date1,user_domain], type: QueryTypes.SELECT });
     //  console.log("ihs",ihs)
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
    findBy,
    findByAll,
    findOne,
    findByOne,
    findAll,
    update,
    findAllwithDetails,
}
