import AddresseMobileService from "../../services/addresse-mobile"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import user from "./user"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers
    logger.debug("Calling Create address endpoint with body: %o", req.body)
    try {
        const addresseMobileServiceInstance = Container.get(AddresseMobileService)
        console.log(req.body)
        const address = await addresseMobileServiceInstance.create({...req.body,created_by: user_code, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data: { address } })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all address endpoint")
    try {
        const addresseMobileServiceInstance = Container.get(AddresseMobileService)
        const address = await addresseMobileServiceInstance.findOne({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: address })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    try {
        const addresseMobileServiceInstance = Container.get(AddresseMobileService)
        const address = await addresseMobileServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: address })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling update one  provider endpoint")
    try {
        const addresseMobileServiceInstance = Container.get(AddresseMobileService)
        const {id} = req.params
        const address = await addresseMobileServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: address  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

export default {
    create,
    findBy,
    findAll,
    update,
}
