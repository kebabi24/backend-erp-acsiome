import SubaccountService from "../../services/subaccount"
import SubaccountDetailService from "../../services/subaccount-detail"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes,Op} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const subaccountServiceInstance = Container.get(SubaccountService)
        const subaccountDetailServiceInstance = Container.get(
            SubaccountDetailService
        )
        const { subaccount, Details } = req.body
        console.log(Details)
        const sub = await subaccountServiceInstance.create({...subaccount, sb_domain: user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        for (let entry of Details) {
            entry = { ...entry,sbd_domain: user_domain, sbd_sub: sub.sb_sub, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
            await subaccountDetailServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: sub })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    const{user_domain} = req.headers
    try {
        console.log(req.body)
        const subaccountServiceInstance = Container.get(SubaccountService)
        const sub = await subaccountServiceInstance.find({...req.body,sb_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sub })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByDet = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    const{user_domain} = req.headers
    try {
        console.log(req.body)
        const subaccountServiceInstance = Container.get(SubaccountService)
        const subaccountDetailServiceInstance = Container.get(
            SubaccountDetailService
        )
        const sub = await subaccountServiceInstance.findOne({...req.body,sb_domain: user_domain})
        const details = await subaccountDetailServiceInstance.find({
            sbd_domain: user_domain,
            sbd_sub: sub.sb_sub,
        })
        return res
            .status(200)
            .json({ message: "fetched succesfully",   data: { sub, details }, })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  task endpoint")
    const{user_domain} = req.headers
    try {
        const subaccountServiceInstance = Container.get(SubaccountService)
        const { id } = req.params
        const sub = await subaccountServiceInstance.findOne({ id })
        const subaccountDetailServiceInstance = Container.get(
            SubaccountDetailService
        )
        const details = await subaccountDetailServiceInstance.find({
            sbd_domain: user_domain,
            sbd_sub: sub.sb_sub,
        })

        return res.status(200).json({
            message: "fetched succesfully",
            data: { sub, details },
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}




const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all task endpoint")
    const{user_domain} = req.headers
    try {
        const subaccountServiceInstance = Container.get(SubaccountService)
        const subs = await subaccountServiceInstance.find({sb_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: subs })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  inventoryStatus endpoint")
    try {
        const subaccountServiceInstance = Container.get(SubaccountService)
        const subaccountDetailServiceInstance = Container.get(
            SubaccountDetailService
        )
        const { id } = req.params
        const {sub, details} = req.body
        const subup = await subaccountServiceInstance.update(
            { ...req.body.sub , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        await subaccountDetailServiceInstance.delete({sbd_domain: user_domain,sbd_sub: sub.sb_sub})
        for (let entry of details) {
            entry = { ...entry, sbd_domain: user_domain,sbd_sub: sub.sb_sub, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await subaccountDetailServiceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: subup })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")
    const{user_domain} = req.headers
    logger.debug("Calling find all purchaseOrder endpoint")
    try {
        let result = []
        //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

        const sbs =await sequelize.query('SELECT  PUBLIC.sb_mstr.id as "sid"  , *  FROM   PUBLIC.sb_mstr,  PUBLIC.sbd_det  where PUBLIC.sbd_det.sbd_domain = ? and PUBLIC.sb_mstr.sb_domain = UBLIC.sbd_det.sbd_domain  and PUBLIC.sbd_det.sbd_sub = PUBLIC.sb_mstr.sb_sub  ORDER BY PUBLIC.sb_mstr.id ASC', {replacements: [user_domain], type: QueryTypes.SELECT });
       console.log(sbs.sid)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sbs })
            
            
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    } 
}

export default {
    create,
    findBy,
    findOne,
    findByDet,
    findAll,
    update,
    findAllwithDetails,
  
}
