import CostcenterService from "../../services/costcenter"
import CostsubService from "../../services/costsub"
import CostaccountService from "../../services/costaccount"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const costcenterServiceInstance = Container.get(CostcenterService)
        const CostsubServiceInstance = Container.get(
            CostsubService
        )
        const CostaccountServiceInstance = Container.get(
            CostaccountService
        )
        const { costcenter, costsub, costaccount } = req.body
        console.log(costsub)
        const cc = await costcenterServiceInstance.create({...costcenter, cc_domain:user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        for (let entry of costsub) {
            entry = { ...entry, ccd2_domain:user_domain,ccd2_cc: costcenter.cc_ctr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
            await CostsubServiceInstance.create(entry)
        }
        for (let entry of costaccount) {
            entry = { ...entry,ccd1_domain:user_domain, ccd1_cc: costcenter.cc_ctr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
            await CostaccountServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: cc })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        console.log(req.body)
        const costcenterServiceInstance = Container.get(CostcenterService)
        const cc = await costcenterServiceInstance.find({...req.body,cc_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: cc })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByDet = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        console.log(req.body)
        const costcenterServiceInstance = Container.get(CostcenterService)
        const costsubServiceInstance = Container.get(
            CostsubService
        )
        const costaccountServiceInstance = Container.get(
            CostaccountService
        )
        
        const cc = await costcenterServiceInstance.findOne({...req.body,cc_domain:user_domain})
        const subdetails = await costsubServiceInstance.find({ccd2_domain:user_domain,
            ccd2_cc: cc.cc_ctr,
        })
        const accdetails = await costaccountServiceInstance.find({ ccd1_domain:user_domain,
            ccd1_cc: cc.cc_ctr,
        })
        
        return res
            .status(200)
            .json({ message: "fetched succesfully",   data: { cc, accdetails,subdetails }, })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  cc endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const costcenterServiceInstance = Container.get(CostcenterService)
        const { id } = req.params
        const cc = await costcenterServiceInstance.findOne({ id })
        const costsubServiceInstance = Container.get(
            CostsubService
        )
        const costaccountServiceInstance = Container.get(
            CostaccountService
        )
        const subdetails = await costsubServiceInstance.find({
            ccd2_cc: cc.cc_ctr, ccd2_domain:user_domain
        })
        const accdetails = await costaccountServiceInstance.find({
            ccd1_cc: cc.cc_ctr,ccd1_domain:user_domain
        })

        return res.status(200).json({
            message: "fetched succesfully",
            data: { cc, subdetails, accdetails },
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all task endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const costcenterServiceInstance = Container.get(CostcenterService)
        const ccs = await costcenterServiceInstance.find({cc_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ccs })
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
        const costcenterServiceInstance = Container.get(CostcenterService)
        const costsubServiceInstance = Container.get(
            CostsubService
        )
        const costaccountServiceInstance = Container.get(
            CostaccountService
        )
        const { id } = req.params
        const {cc, accdetails, subdetails} = req.body
        const ccup = await costcenterServiceInstance.update(
            { ...req.body.cc , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        await costaccountServiceInstance.delete({ccd1_cc: cc.cc_ctr,ccd1_domain:user_domain})
        for (let entry of accdetails) {
            entry = { ...entry, ccd1_domain:user_domain,ccd1_cc: cc.cc_ctr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await costaccountServiceInstance.create(entry)
        }
        await costsubServiceInstance.delete({ccd2_cc: cc.cc_ctr,ccd2_domain:user_domain})
        for (let entry of subdetails) {
            entry = { ...entry, ccd2_domain:user_domain,ccd2_cc: cc.cc_ctr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await costsubServiceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ccup })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling find all purchaseOrder endpoint")
    try {
        let result = []
        //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

        const ccs =await sequelize.query('SELECT  PUBLIC.cc_mstr.id as "cid"  , *  FROM   PUBLIC.cc_mstr,  PUBLIC.ccd2_det , PUBLIC.ccd1_det where PUBLIC.ccd2_det.ccd2_cc = PUBLIC.cc_mstr.cc_ctr  and   PUBLIC.ccd1_det.ccd1_cc = PUBLIC.cc_mstr.cc_ctr and PUBLIC.ccd1_det.ccd1_domain= PUBLIC.cc_mstr.cc_domain and PUBLIC.ccd2_det.ccd2_domain = PUBLIC.cc_mstr.cc_domain and PUBLIC.cc_mstr.cc_domain = ? ORDER BY PUBLIC.cc_mstr.id ASC', { replacements: [user_domain], type: QueryTypes.SELECT },);
       console.log(ccs.sid)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ccs })
            
            
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    } 
}

export default {
    create,
    findBy,
    findByDet,
    findOne,
    findAll,
    update,
    findAllwithDetails,
  
}
