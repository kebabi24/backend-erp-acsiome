import ProfileMobileService from "../../services/profile-mobile"
import ProfileMenuService from "../../services/profile-menu"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { profile } from "console"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{profile_name} = req.headers
    const {profile, menus} = req.body
    logger.debug("Calling Create profile endpoint")
    try {
       
        const profileMobileServiceInstance = Container.get(ProfileMobileService)
        const ProfileMenuServiceInstance = Container.get(ProfileMenuService)
        const profiles = await profileMobileServiceInstance.create({...profile, created_by:profile.profile_name,created_ip_adr: req.headers.origin, last_modified_by:profile.profile_name,last_modified_ip_adr: req.headers.origin})
        for (let entry of menus) {
                entry = { profile_code: profiles.dataValues.profile_code, menu_code: entry }
                await ProfileMenuServiceInstance.create(entry)
           
            
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data:  profiles })
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
        const {id} = req.params
        const profile = await profileMobileServiceInstance.findOne({id})
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

const findMenuBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const {profile_code} = req.body
    console.log(profile_code)
    logger.debug("Calling find by  all menu profile endpoint")
    try {
        const profileMobileServiceInstance = Container.get(ProfileMobileService)
        const menu_profile = await profileMobileServiceInstance.findMenuProfile({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: menu_profile })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{profile_name} = req.headers
    const {profile, menus} = req.body
    //
    logger.debug("Calling update one  profile endpoint")
    try {
        const profileMobileServiceInstance = Container.get(ProfileMobileService)
        const {id} = req.params
        const profiles = await profileMobileServiceInstance.update({...profile, last_modified_by:profile_name,last_modified_ip_adr: req.headers.origin},{id})
        console.log(profile)
        
        const ProfileMenuServiceInstance = Container.get(ProfileMenuService)
        const updateProfileMenu = await ProfileMenuServiceInstance.update({profile, menus}, {profile_code: profile.profile_code})
       
        
 
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: profiles })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const updated = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")


    logger.debug("Calling update one  profile endpoint")
    try {
        const profileMobileServiceInstance = Container.get(ProfileMobileService)
        const {id} = req.params
        const profile = await profileMobileServiceInstance .updated({...req.body,last_modified_ip_adr: req.headers.origin},{id})
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
        const {id} = req.params
        const profile = await profileMobileServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")

    logger.debug("Calling find one by  profile endpoint")
    try {
        const profileMobileServiceInstance= Container.get(ProfileMobileService)
        const profile= await profileMobileServiceInstance.findOne({...req.body})
        //console.log(profile)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: profile})
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
    findMenuBy,
    update,
    updated,
    deleteOne,
    findByOne
}