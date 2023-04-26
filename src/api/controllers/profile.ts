import ProfileService from "../../services/profile"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create profile endpoint")
    try {
        const profileServiceInstance = Container.get(ProfileService)
        const profile = await profileServiceInstance.create({...req.body,usrg_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  profile })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  profile endpoint")
    try {
        const profileServiceInstance = Container.get(ProfileService)
        const {id} = req.params
        const profile = await profileServiceInstance.findOne({id})
        console.log(profile)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: profile  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all profile endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const profileServiceInstance = Container.get(ProfileService)
        const profiles = await profileServiceInstance.find({usrg_domain:user_domain})
        console.log(profiles)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: profiles })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all profile endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const profileServiceInstance = Container.get(ProfileService)
        const profiles = await profileServiceInstance.find({...req.body,usrg_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: profiles })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  profile endpoint")
    try {
        const profileServiceInstance = Container.get(ProfileService)
        const {id} = req.params
        const profile = await profileServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: profile  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  profile endpoint")
    try {
        const profileServiceInstance = Container.get(ProfileService)
        const {id} = req.params
        const profile = await profileServiceInstance.delete({id})
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
