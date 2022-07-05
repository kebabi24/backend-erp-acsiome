import WorkRoutingService from "../../services/workrouting"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling Create code endpoint")
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const ro = await workroutingServiceInstance.create({...req.body, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  ro })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const {id} = req.params
        const ro = await workroutingServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ro  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const ros = await workroutingServiceInstance.find({})
        console.log(ros)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ros })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const ros = await workroutingServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ros })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAlldistinct = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")

    logger.debug("Calling find all purchaseOrder endpoint")
    try {
        let result = []
        //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

        const ros =await sequelize.query("SELECT DISTINCT  PUBLIC.ro_det.ro_routing , PUBLIC.ro_det.ro_desc  FROM   PUBLIC.ro_det", { type: QueryTypes.SELECT });
        console.log(ros)
        let id = 1;
        for(const ro of ros){
            result.push({id:id, ro_routing: ro.ro_routing, ro_desc: ro.ro_desc})
            id = id + 1;    
        }
        console.log(result)
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

    logger.debug("Calling update one  code endpoint")
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const {id} = req.params
        const ro = await workroutingServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ro  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  code endpoint")
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const {id} = req.params
        const ro = await workroutingServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
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
    findAlldistinct,
    update,
    deleteOne
}
