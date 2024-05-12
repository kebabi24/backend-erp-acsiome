import ConfigService from "../../services/config"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import user from "./user"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers
    logger.debug("Calling Create config endpoint with body: %o", req.body)
    try {
        const configServiceInstance = Container.get(ConfigService)
        const config = await configServiceInstance.create({...req.body,created_by: user_code, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data: { config } })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  location endpoint")
    try {
        const configServiceInstance = Container.get(ConfigService)
        const {id} = req.params
        
        const config = await configServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: config  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all config endpoint")
    try {
        const configServiceInstance = Container.get(ConfigService)
        const config = await configServiceInstance.findOne({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: config })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    try {
        const configServiceInstance = Container.get(ConfigService)
        const config = await configServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: config })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  config endpoint")
    try {
        const configServiceInstance = Container.get(ConfigService)
        const {id} = req.params
        
        
        const conf = await configServiceInstance.findOne({id:1})
        if (conf) {
            const config = await configServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        }
        else {
             const config = await configServiceInstance.create({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
            }
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: conf  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

export default {
    create,
    findOne,
    findBy,
    findAll,
    update,
}
