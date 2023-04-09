import MesureService from "../../services/mesure"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create mesure endpoint")
    try {
        const mesureServiceInstance = Container.get(MesureService)
        const mesure = await mesureServiceInstance.create({...req.body,um_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  mesure })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  mesure endpoint")
    try {
        const mesureServiceInstance = Container.get(MesureService)
        const {id} = req.params
        const mesure = await mesureServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: mesure  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all mesure endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const mesureServiceInstance = Container.get(MesureService)
        const mesures = await mesureServiceInstance.find({ud_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: mesures })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all mesure endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const mesureServiceInstance = Container.get(MesureService)
        const mesures = await mesureServiceInstance.findOne({...req.body,um_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: mesures })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling update one  mesure endpoint")
    try {
        const mesureServiceInstance = Container.get(MesureService)
        const {id} = req.params
        const mesure = await mesureServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: mesure  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  mesure endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const mesureServiceInstance = Container.get(MesureService)
        const {id} = req.params
        const mesure = await mesureServiceInstance.delete({id})
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
