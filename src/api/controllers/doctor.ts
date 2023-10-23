import DoctorService from "../../services/doctor"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create doctor endpoint")
    try {
        const doctorServiceInstance = Container.get(DoctorService)
        const doctor = await doctorServiceInstance.create({...req.body, doc_domain:user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  doctor })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  doctor endpoint")
    try {
        const doctorServiceInstance = Container.get(DoctorService)
        const {id} = req.params
        const doctor = await doctorServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: doctor  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all doctor endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
console.log("herrrrrrrrrrrrrrrre")
    try {
        const doctorServiceInstance = Container.get(DoctorService)
        const doctors = await doctorServiceInstance.find({doc_domain:user_domain})
        console.log(doctors)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: doctors })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all doctor endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    try {
        const doctorServiceInstance = Container.get(DoctorService)
        const doctors = await doctorServiceInstance.find({...req.body,doc_domain:user_domain})
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: doctors })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all doctor endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    try {
        const doctorServiceInstance = Container.get(DoctorService)
        const doctors = await doctorServiceInstance.findOne({...req.body,doc_domain:user_domain})
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: doctors })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  doctor endpoint")
    try {
        const doctorServiceInstance = Container.get(DoctorService)
        const {id} = req.params
        console.log(id)
        const doctor = await doctorServiceInstance.update({...req.body,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: doctor  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  doctor endpoint")
    try {
        const doctorServiceInstance = Container.get(DoctorService)
        const {id} = req.params
        const doctor = await doctorServiceInstance.delete({id})
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
