import ProfileMobileService from "../../services/profile-mobile"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{profile_name} = req.headers

    logger.debug("Calling Create profile endpoint")
    try {
        const profileMobileServiceInstance = Container.get(ProfileMobileService)
        const profile = await profileMobileServiceInstance.create({...req.body, created_by:profile_name,created_ip_adr: req.headers.origin, last_modified_by:profile_name,last_modified_ip_adr: req.headers.origin})
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
        const profileMobileServiceInstance = Container.get(ProfileMobileService)
        const {profile_id} = req.params
        const profile = await profileMobileServiceInstance.findOne({profile_id})
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
    try {
        const profileMobileServiceInstance = Container.get(ProfileMobileService)
        const profiles = await profileMobileServiceInstance.find({})
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
    try {
        const profileMobileServiceInstance = Container.get(ProfileMobileService)
        const profiles = await profileMobileServiceInstance.find({...req.body})
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
    const{profile_name} = req.headers

    logger.debug("Calling update one  profile endpoint")
    try {
        const profileMobileServiceInstance = Container.get(ProfileMobileService)
        const {profile_id} = req.params
        const profile = await profileMobileServiceInstance.update({...req.body, last_modified_by:profile_name,last_modified_ip_adr: req.headers.origin},{profile_id})
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
        const profileMobileServiceInstance = Container.get(ProfileMobileService)
        const {profile_id} = req.params
        const profile = await profileMobileServiceInstance.delete({profile_id})
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
