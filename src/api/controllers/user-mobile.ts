import UserMobileService from "../../services/user-mobile"
import RoleService from "../../services/role"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { QueryTypes } from 'sequelize'

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{username} = req.headers
    logger.debug("Calling Create user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const user = await userMobileServiceInstance.create({...req.body, created_by:username,created_ip_adr: req.headers.origin,last_modified_by:username,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  user })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const {id} = req.params
        const user = await userMobileServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: user  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const users = await userMobileServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: users })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const users = await userMobileServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: users })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(typeof req.body.username)
    logger.debug("Calling find one by  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const users = await userMobileServiceInstance.findOne({...req.body})
        //console.log(users)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: users })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const RoleServiceInstance = Container.get(RoleService)
        const users = await userMobileServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: users })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling update one  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const {id} = req.params
        const user = await userMobileServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: user  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const updated = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling update one  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const {id} = req.params
        const user = await userMobileServiceInstance.updated({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: user  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const {id} = req.params
        const user = await userMobileServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const signin = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling user mobile login endpoint")

    const userMobileServiceInstanse = Container.get(UserMobileService)

    try{
        const role_id = req.body.id;
        const role = await userMobileServiceInstanse.getRole({id : role_id})

        // if the role id doesn't exist 
        if(!role){
            return res.status(404).json({message:'No role exist with such an id '})
        }
        else { 

            // these data is the same for both response cases
            const userMobile_id = role.role_userMobileId; 
            const userMobile =  await userMobileServiceInstanse.getUser({id : userMobile_id})
            const profile = await userMobileServiceInstanse.getProfile({id: userMobile.profileId })
            const menus = await userMobileServiceInstanse.getMenus({ profileId:userMobile.profileId})
            const parameter = await userMobileServiceInstanse.getParameter({})
            const checklist = await userMobileServiceInstanse.getChecklist()
            
            // service created on backend 
            if(parameter.hold === true){
                const service  = await userMobileServiceInstanse.getService({service_roleId : role.id }, true)
                const itinerary = await userMobileServiceInstanse.getItinerary({id :service.service_itineraryId })
                const itinerary2 = await userMobileServiceInstanse.getItineraryV2({roleId : role.id})
                const customers = await userMobileServiceInstanse.getCustomers({itineraryId:itinerary.id })

                return res
                    .status(202)
                    .json({
                        message:'Data correct !', 
                        service_creation:'Service creation handled by the admin/ test service_mode=1',
                        service_mode:'1',
                        userMobile : userMobile,
                        parameter:parameter,
                        role :role ,
                        profile: profile,
                        menus : menus,
                        service : service,
                        itinerary : itinerary2,
                        customers:customers,
                        checklist: checklist,
                    })
            }
            else{
                const iitineraries = await userMobileServiceInstanse.getItineraries({roleId : role.id })
                return res
                    .status(202)
                    .json({
                        message:'Data correct !', 
                        service_creation:'Service creation handled by the user / test service_mode = 0',
                        service_mode:'0',
                        userMobile : userMobile,
                        parameter:parameter,
                        role :role ,
                        profile: profile,
                        menus : menus,
                        checklist: checklist,
                        iitineraries:iitineraries,
                    })
            }
        }      
    }
    catch(e){
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
    findAllwithDetails,
    update,
    updated,
    deleteOne,
    signin
}
