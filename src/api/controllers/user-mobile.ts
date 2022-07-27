import UserMobileService from "../../services/user-mobile"
import RoleService from "../../services/role"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { QueryTypes } from 'sequelize'



// ********************** CREATE NEW USER MOBILE *************

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{username} = req.headers
    logger.debug("Calling Create user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const user = await userMobileServiceInstance.create({
            ...req.body, 
            // created_by:username,
            // created_ip_adr: req.headers.origin,
            // last_modified_by:username,
            // last_modified_ip_adr: req.headers.origin
        })
        return res
            .status(201)
            .json({ message: "created succesfully", data:  user })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

// ********************** FIND ONE USER MOBILE BY CODE *************
const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const {user_mobile_code} = req.params
        const user = await userMobileServiceInstance.findOne({user_mobile_code:user_mobile_code})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: user  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


// ********************** FIND ALL USERS *************
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


// ***************************************************
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

// ***************************************************
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

// ***************************************************
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

// *********************** UPDATE ONE FIELD  ********************
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

//****************** UPDATE EVERYTHING ************************
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


//****************** DELETE USER BY CODE ************************
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  user endpoint")
    try {
        const userMobileServiceInstance = Container.get(UserMobileService)
        const {user_mobile_code} = req.params
        const user = await userMobileServiceInstance.delete({user_mobile_code:user_mobile_code})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: user_mobile_code  })
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
        const role_code = req.body.role_code;
        const role = await userMobileServiceInstanse.getRole({role_code : role_code})

        // if the role id doesn't exist 
        if(!role){
            return res.status(404).json({message:'No role exist with such an id '})
        }
        else { 

            // these data is the same for both response cases

            const user_mobile_code = role.user_mobile_code; 
            const userMobile =  await userMobileServiceInstanse.getUser({user_mobile_code : user_mobile_code})
            const profile = await userMobileServiceInstanse.getProfile({profile_code: userMobile.profile_code })
            const menus = await userMobileServiceInstanse.getMenus({ profile_code:userMobile.profile_code})
            const parameter = await userMobileServiceInstanse.getParameter({profile_code:userMobile.profile_code})
            const checklist = await userMobileServiceInstanse.getChecklist()
            
            // service created on backend 
            if(parameter.hold === true){

                const service  = await userMobileServiceInstanse.getService({role_code :role.role_code })
                // const itinerary = await userMobileServiceInstanse.getItineraryFromService({id :service.service_itineraryId })
                const itinerary2 = await userMobileServiceInstanse.getItineraryFromRoleItinerary({role_code : role.role_code})
                const customers = await userMobileServiceInstanse.getCustomers({itinerary_code: itinerary2.itinerary_code })
                const tokenSerie = await userMobileServiceInstanse.getTokenSerie({token_code : role.token_serie_code})

                return res
                    .status(202)
                    .json({
                        message: "Data correct !",
                        service_creation:'Service creation handled by the admin',
                        user_mobile : userMobile,
                        parameter:parameter,
                        role :role ,
                        profile: profile,
                        menus : menus,
                        service : service,
                        itinerary : itinerary2,
                        customers:customers,
                        checklist: checklist,
                        token_serie:tokenSerie,
                    })
            }
            // service created by mobile user
            else{
                // const iitineraries = await userMobileServiceInstanse.getItineraries({role_code : role.role_code })
                const iitineraries = await userMobileServiceInstanse.getItinerariesOnly({role_code : role.role_code })
                const iitineraries_customers = await userMobileServiceInstanse.getItinerariesCustomers({role_code : role.role_code })
                const customers = await userMobileServiceInstanse.getCustomersOnly({role_code : role.role_code })
                const tokenSerie = await userMobileServiceInstanse.getTokenSerie({token_code : role.token_serie_code})
                
                return res
                    .status(202)
                    .json({
                        message: "Data correct !",
                        service_creation:'Service creation handled by the user',
                        user_mobile : userMobile,
                        parameter:parameter,
                        role :role ,
                        profile: profile,
                        menus : menus,
                        checklist: checklist,
                        itinerary:iitineraries,
                        iitineraries_customers:iitineraries_customers,
                        customers:customers,
                        token_serie:tokenSerie,
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
