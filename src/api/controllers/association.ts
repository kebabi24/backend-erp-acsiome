import AssociationService from "../../services/association"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create association endpoint")
    try {
        const associationServiceInstance = Container.get(AssociationService)
        const association = await associationServiceInstance.create({...req.body, ass_domain:user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  association })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  association endpoint")
    try {
        const associationServiceInstance = Container.get(AssociationService)
        const {id} = req.params
        const association = await associationServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: association  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all association endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
console.log("herrrrrrrrrrrrrrrre")
    try {
        const associationServiceInstance = Container.get(AssociationService)
        const associations = await associationServiceInstance.find({ass_domain:user_domain})
        console.log(associations)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: associations })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all association endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    try {
        const associationServiceInstance = Container.get(AssociationService)
        const associations = await associationServiceInstance.find({...req.body,ass_domain:user_domain})
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: associations })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all association endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    try {
        const associationServiceInstance = Container.get(AssociationService)
        const associations = await associationServiceInstance.findOne({...req.body,ass_domain:user_domain})
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: associations })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  association endpoint")
    try {
        const associationServiceInstance = Container.get(AssociationService)
        const {id} = req.params
        console.log(id)
        const association = await associationServiceInstance.update({...req.body,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: association  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  association endpoint")
    try {
        const associationServiceInstance = Container.get(AssociationService)
        const {id} = req.params
        const association = await associationServiceInstance.delete({id})
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
