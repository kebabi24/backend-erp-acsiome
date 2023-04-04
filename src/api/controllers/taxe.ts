import TaxeService from "../../services/taxe"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create taxe endpoint")
    try {
        const TaxeServiceInstance = Container.get(TaxeService)
        const taxe = await TaxeServiceInstance.create({...req.body,tx2_domain: user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  taxe })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  taxe endpoint")
    const{user_domain} = req.headers
    try {
        const TaxeServiceInstance = Container.get(TaxeService)
        const {id} = req.params
        const taxe = await TaxeServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: taxe  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all taxe endpoint")
    const{user_domain} = req.headers
    try {
        const TaxeServiceInstance = Container.get(TaxeService)
        const taxes = await TaxeServiceInstance.find({tx2_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: taxes })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all taxe endpoint")
    const{user_domain} = req.headers
    try { 
        const TaxeServiceInstance = Container.get(TaxeService)
        const taxes = await TaxeServiceInstance.findOne({...req.body,tx2_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: taxes })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  taxe endpoint")
    try {
        const TaxeServiceInstance = Container.get(TaxeService)
        const {id} = req.params
        const taxe = await TaxeServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: taxe  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  taxe endpoint")
    try {
        const TaxeServiceInstance = Container.get(TaxeService)
        const {id} = req.params
        const taxe = await TaxeServiceInstance.delete({id})
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
