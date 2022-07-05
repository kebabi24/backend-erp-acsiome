import RoleService from "../../services/role"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{role_name} = req.headers
    logger.debug("Calling Create role endpoint")
    try {
        const RoleServiceInstance = Container.get(RoleService)
        const role = await RoleServiceInstance.create({...req.body, created_by:role_name,created_ip_adr: req.headers.origin,last_modified_by:role_name,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  role })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  role endpoint")
    try {
        const RoleServiceInstance = Container.get(RoleService)
        const {id} = req.params
        const role = await RoleServiceInstance.findOne({id})
        console.log("hello")
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: role  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all role endpoint")
    try {
        const RoleServiceInstance = Container.get(RoleService)
        const roles = await RoleServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: roles })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all role endpoint")
    try {
        const RoleServiceInstance = Container.get(RoleService)
        const roles = await RoleServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: roles })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one by  role endpoint")
    try {
        const RoleServiceInstance = Container.get(RoleService)
        const roles = await RoleServiceInstance.findOne({...req.body})
        console.log(roles)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: roles })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{role_name} = req.headers

    logger.debug("Calling update one  role endpoint")
    try {
        const RoleServiceInstance = Container.get(RoleService)
        const {id} = req.params
        const role = await RoleServiceInstance.update({...req.body, last_modified_by:role_name,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: role  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const updated = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{role_name} = req.headers

    logger.debug("Calling update one  role endpoint")
    try {
        const RoleServiceInstance = Container.get(RoleService)
        const {id} = req.params
        const role = await RoleServiceInstance.updated({...req.body, last_modified_by:role_name,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: role  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  role endpoint")
    try {
        const RoleServiceInstance = Container.get(RoleService)
        const {id} = req.params
        const role = await RoleServiceInstance.delete({id})
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
    updated,
    deleteOne
}
