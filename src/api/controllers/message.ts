import MessageService from "../../services/message"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create message endpoint")
    try {
       // 
        const { Msg, Roles } = req.body;
        const messageServiceInstance = Container.get(MessageService)
        for(let ro of Roles) {
            const message = await messageServiceInstance.create({...Msg,role_code: ro.role_code, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data:  true })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  message endpoint")
    try {
        const messageServiceInstance = Container.get(MessageService)
        const {id} = req.params
        const message = await messageServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: message  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all message endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const messageServiceInstance = Container.get(MessageService)
        const messages = await messageServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: messages })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all message endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const messageServiceInstance = Container.get(MessageService)
        const messages = await messageServiceInstance.findOne({...req.body,})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: messages })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling update one  message endpoint")
    try {
        const messageServiceInstance = Container.get(MessageService)
        const {id} = req.params
        const message = await messageServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: message  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  message endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const messageServiceInstance = Container.get(MessageService)
        const {id} = req.params
        const message = await messageServiceInstance.delete({id})
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
