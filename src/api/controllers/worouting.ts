import WoroutingService from "../../services/worouting"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create code endpoint")
    try {
        const woroutingServiceInstance = Container.get(WoroutingService)
        const ro = await woroutingServiceInstance.create({...req.body, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
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
        const woroutingServiceInstance = Container.get(WoroutingService)
        const {id} = req.params
        const ro = await woroutingServiceInstance.findOne({id})
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
        const woroutingServiceInstance = Container.get(WoroutingService)
        const ros = await woroutingServiceInstance.find({})
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
        const woroutingServiceInstance = Container.get(WoroutingService)
        console.log(req.body)
        const ros = await woroutingServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ros })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}




const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  code endpoint")
    try {
        const woroutingServiceInstance = Container.get(WoroutingService)
        const {id} = req.params
        const ro = await woroutingServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
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
        const woroutingServiceInstance = Container.get(WoroutingService)
        const {id} = req.params
        const ro = await woroutingServiceInstance.delete({id})
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
    update,
    deleteOne
}
