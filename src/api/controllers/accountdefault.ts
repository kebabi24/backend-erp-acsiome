import AccountdefaultService from "../../services/accountdefault"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling Create code endpoint")
    try {
        const accountdefaultServiceInstance = Container.get(AccountdefaultService)
        const accountdefault = await accountdefaultServiceInstance.create({...req.body, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountdefault })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const accountdefaultServiceInstance = Container.get(AccountdefaultService)
        const {id} = req.params
        const accountdefault = await accountdefaultServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountdefault  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    try {
        const accountdefaultServiceInstance = Container.get(AccountdefaultService)
        const accountdefault = await accountdefaultServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountdefault })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    try {
        const accountdefaultServiceInstance = Container.get(AccountdefaultService)
        const accountdefault = await accountdefaultServiceInstance.findOne({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountdefault })
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
        const accountdefaultServiceInstance = Container.get(AccountdefaultService)
        const {id} = req.params
        const accountdefault = await accountdefaultServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountdefault  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  code endpoint")
    try {
        const accountdefaultServiceInstance = Container.get(AccountdefaultService)
        const {id} = req.params
        const accountdefault = await accountdefaultServiceInstance.delete({id})
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

