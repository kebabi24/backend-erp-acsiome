
import ProductLineService from "../../services/product-line"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create item endpoint with body: %o", req.body)
    try {
        const productLineServiceInstance = Container.get(ProductLineService)
        const productLine = await productLineServiceInstance.create({...req.body, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data: { productLine } })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  productLine endpoint")
    try {
        const productLineServiceInstance = Container.get(ProductLineService)
        const {id} = req.params
        const productLine = await productLineServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: productLine  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all productLine endpoint")
    try {
        const productLineServiceInstance = Container.get(ProductLineService)
        const productLines = await productLineServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: productLines })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all productLine endpoint")
    try {
        const productLineServiceInstance = Container.get(ProductLineService)
        const productLines = await productLineServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: productLines })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all productLine endpoint")
    try {
        const productLineServiceInstance = Container.get(ProductLineService)
        const productLines = await productLineServiceInstance.findOne({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: productLines })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  productLine endpoint")
    try {
        const productLineServiceInstance = Container.get(ProductLineService)
        const {id} = req.params
        const productLine = await productLineServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: productLine  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  productLine endpoint")
    try {
        const productLineServiceInstance = Container.get(ProductLineService)
        const {id} = req.params
        const productLine = await productLineServiceInstance.delete({id})
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
