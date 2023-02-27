import DaybookService from "../../services/daybook"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create daybook endpoint")
    try {
        const DaybookServiceInstance = Container.get(DaybookService)
        const daybook = await DaybookServiceInstance.create({...req.body, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  daybook })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  daybook endpoint")
    try {
        const DaybookServiceInstance = Container.get(DaybookService)
        const {id} = req.params
        const daybook = await DaybookServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: daybook  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all daybook endpoint")
    try {
        const DaybookServiceInstance = Container.get(DaybookService)
        const daybooks = await DaybookServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: daybooks })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all daybook endpoint")
    try {
        const DaybookServiceInstance = Container.get(DaybookService)
        const daybooks = await DaybookServiceInstance.find({...req.body})
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: daybooks })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all daybook endpoint")
    try {
        const DaybookServiceInstance = Container.get(DaybookService)
        const daybooks = await DaybookServiceInstance.findOne({...req.body})
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: daybooks })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  daybook endpoint")
    try {
        const DaybookServiceInstance = Container.get(DaybookService)
        const {id} = req.params
        const daybook = await DaybookServiceInstance.update({...req.body,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: daybook  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  daybook endpoint")
    try {
        const DaybookServiceInstance = Container.get(DaybookService)
        const {id} = req.params
        const daybook = await DaybookServiceInstance.delete({id})
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
    findByOne,
    update,
    deleteOne
}
