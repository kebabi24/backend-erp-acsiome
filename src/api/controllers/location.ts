import LocationService from "../../services/location"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create location endpoint")
    try {
        const locationServiceInstance = Container.get(LocationService)
        const location = await locationServiceInstance.create({...req.body,loc_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  location })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  location endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    try {
        const locationServiceInstance = Container.get(LocationService)
        const {id} = req.params
        const location = await locationServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: location  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all location endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    try {
        const locationServiceInstance = Container.get(LocationService)
        const locations = await locationServiceInstance.find({loc_domain : user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: locations })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all location endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    try {
        const locationServiceInstance = Container.get(LocationService)
        const locations = await locationServiceInstance.find({...req.body,loc_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: locations })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all location endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const locationServiceInstance = Container.get(LocationService)
        const locations = await locationServiceInstance.findOne({...req.body,loc_domain : user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: locations })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const findByAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all location endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    try {
        const locationServiceInstance = Container.get(LocationService)
        
        const locations = await locationServiceInstance.find({
            ...req.body,loc_domain:user_domain
        })
        return res.status(202).json({
            message: "sec",
            data:  locations ,
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  location endpoint")
    try {
        const locationServiceInstance = Container.get(LocationService)
        const {id} = req.params
        const location = await locationServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: location  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  location endpoint")
    try {
        const locationServiceInstance = Container.get(LocationService)
        const {id} = req.params
        const location = await locationServiceInstance.delete({id})
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
    deleteOne,
    findByAll
}
