import RoleService from "../../services/role"
import RoleItineraryService from "../../services/role-itinerary"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{role_name} = req.headers
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
    const {role, itinerary} = req.body
    //console.log(role.role_name)
    logger.debug("Calling Create role endpoint")
    try {
        const RoleServiceInstance = Container.get(RoleService)
        const RoleItineraryServiceInstance = Container.get(RoleItineraryService)
        const new_role = await RoleServiceInstance.create({...role, created_by:user_code,created_ip_adr: req.headers.origin,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        for (let entry of itinerary) {
            entry = { itinerary_code: entry, role_code: new_role.role_code }
            await RoleItineraryServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data:  new_role })
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
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
    const {role, itinerary} = req.body
    logger.debug("Calling update one  role endpoint")
    try {
        const RoleServiceInstance = Container.get(RoleService)
        const RoleItineraryServiceInstance = Container.get(RoleItineraryService)
       
      
        const {id} = req.params
        console.log(req.body)
        const roleup = await RoleServiceInstance.updated({...role, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        await RoleItineraryServiceInstance.delete({role_code: role.role_code})
        for (let entry of itinerary) {
            entry = { itinerary_code: entry, role_code: role.role_code }
            await RoleItineraryServiceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: roleup  })
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

const findOneByDeviceId = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  role endpoint")
    try {
        const RoleServiceInstance = Container.get(RoleService)
        const {device_id} = req.params
        const role = await RoleServiceInstance.findOne({device_id})
        console.log("hello")
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: role  })
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
    deleteOne,
    findOneByDeviceId
}
