import ProviderService from "../../services/provider"
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
    try {
        const providerServiceInstance = Container.get(ProviderService)
        const {id} = req.params
        const provider = await providerServiceInstance.delete({id})
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
