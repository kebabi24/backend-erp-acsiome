import MenuService from "../../services/menu"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling Create menu endpoint")
    try {
        const menuServiceInstance = Container.get(MenuService)
        const menu = await menuServiceInstance.create({...req.body, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  menu })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  menu endpoint")
    try {
        const menuServiceInstance = Container.get(MenuService)
        const {id} = req.params
        const menu = await menuServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: menu  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one by  menu endpoint")
    try {
        const menuServiceInstance = Container.get(MenuService)
        const menu = await menuServiceInstance.findOne({...req.body})
        //console.log(users)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: menu })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all menu endpoint")
    try {
        const menuServiceInstance = Container.get(MenuService)
        const menu = await menuServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: menu })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all menu endpoint")
    try {
        const menuServiceInstance = Container.get(MenuService)
        const menu = await menuServiceInstance.findOne({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: menu })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers
    logger.debug("Calling update one  menu endpoint")
    try {
        const menuServiceInstance = Container.get(MenuService)
        const {id} = req.params
        const menu = await menuServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: menu  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  menu endpoint")
    try {
        const menuServiceInstance = Container.get(MenuService)
        const {id} = req.params
        const menu = await menuServiceInstance.delete({id})
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
