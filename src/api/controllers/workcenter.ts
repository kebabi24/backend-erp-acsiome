import WorkCenterService from "../../services/workcenter"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create code endpoint")
    try {
        const workcenterServiceInstance = Container.get(WorkCenterService)
        const wc = await workcenterServiceInstance.create({...req.body, wc_domain: user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  wc })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const workcenterServiceInstance = Container.get(WorkCenterService)
        const {id} = req.params
        const wc = await workcenterServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: wc  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    const { user_domain } = req.headers;
    try {
        const workcenterServiceInstance = Container.get(WorkCenterService)
        const wcs = await workcenterServiceInstance.find({wc_domain: user_domain})
       
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: wcs })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const { user_domain } = req.headers;
    try {
        const workcenterServiceInstance = Container.get(WorkCenterService)
        const wcs = await workcenterServiceInstance.find({...req.body,wc_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: wcs })
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
        const workcenterServiceInstance = Container.get(WorkCenterService)
        const {id} = req.params
        const wc = await workcenterServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: wc  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  code endpoint")
    try {
        const workcenterServiceInstance = Container.get(WorkCenterService)
        const {id} = req.params
        const wc = await workcenterServiceInstance.delete({id})
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
