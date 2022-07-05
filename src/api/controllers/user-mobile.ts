import UserMobileService from "../../services/user-mobile"
import RoleService from "../../services/role"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { QueryTypes } from 'sequelize'

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{username} = req.headers
    logger.debug("Calling Create user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const user = await userMobileServiceInstance.create({...req.body, created_by:username,created_ip_adr: req.headers.origin,last_modified_by:username,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  user })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const {id} = req.params
        const user = await userMobileServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: user  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const users = await userMobileServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: users })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const users = await userMobileServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: users })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one by  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const users = await userMobileServiceInstance.findOne({...req.body})
        console.log(users)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: users })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const RoleServiceInstance = Container.get(RoleService)
        const users = await userMobileServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: users })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling update one  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const {id} = req.params
        const user = await userMobileServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: user  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const updated = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling update one  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const {id} = req.params
        const user = await userMobileServiceInstance.updated({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: user  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const {id} = req.params
        const user = await userMobileServiceInstance.delete({id})
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
    findAllwithDetails,
    update,
    updated,
    deleteOne
}
