import UserService from "../../services/user"
import CustomerService from '../../services/customer';
import addresseService from '../../services/address';
import CodeService from "../../services/code"
import CustomerService from '../../services/customer';
import addresseService from '../../services/address';
import CodeService from "../../services/code"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import argon2 from "argon2"
import jwt from "jsonwebtoken"

const login = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling login endpoint")
    //console.log("hnhnhn",req.body)
    try {
        
        const userServiceInstance = Container.get(UserService)
        const { userName, password } = req.body
        const user = await userServiceInstance.findOne({
            usrd_user_name: userName,
        })
        if (!user)
            return res
                .status(401)
                .json({ message: "user not found", data: null })

        if (await argon2.verify(user.usrd_pwd, password)) {
           
            const token = jwt.sign({ user: user.id }, "acsiome")
            
            return res
                .status(200)
                .json({ message: "succesfully", data: { user, token } })
        } else
            return res
                .status(401)
                .json({ message: "error password", data: null })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling login endpoint")
    console.log(req.body)
    try {
        
        const userServiceInstance = Container.get(UserService)

        const {data} = req.body
        const { user_code } = req.headers;

        const customerServiceInstance = Container.get(CustomerService);
        const adresseServiceInstance = Container.get(addresseService);

        const addr = await adresseServiceInstance.create({
            ad_addr: data.phone,
            ad_name: data.name,
            ad_line1: data.wilaya,
            ad_line2: data.commune,
            ad_type: 'OPN',
            ad_ref : data.gender,
            ad_ext : data.email,
            // ad_format : data.age,
            

            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
        });
        
        const customerr = await customerServiceInstance.create({
            cm_addr: data.phone,
            cm_sort: data.name,
            cm_high_date: data.birthdate,
            cm_promo : data.promo_code,
            cm_disc_pct: data.discount_pct,
            cm_type: 'OPN',
            // wilaya ; commune , sexe , email , age 

            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
        });

        return res
                .status(200)
                .json({ message: "customer created", data: customerr })

       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const getCustomerPhone = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getCustomerPhone endpoint")
    try {
        
        const userServiceInstance = Container.get(UserService)

        const {phone} = req.params
        const phoneNb = await userServiceInstance.getPhone(phone)
        
        return res
                .status(200)
                .json({ message: "phone results", data: phoneNb })

       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const verifypwd = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling login endpoint")
    console.log(req.body)
    try {
        console.log(req.body)
        const userServiceInstance = Container.get(UserService)
        const { userName, password } = req.body
        
        const user = await userServiceInstance.findOne({
            usrd_user_name: userName,
        })
        if (!user)
            return res
                .status(401)
                .json({ message: "user not found", data: null })
        if (argon2.verify(user.usrd_pwd, password)) {
            const token = jwt.sign({ user: user.id }, "acsiome")
            return res
                .status(200)
                .json({ message: "succesfully", data: { user, token } })
        } else
            return res
                .status(401)
                .json({ message: "password error", data: null })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling login endpoint")
    try {
        
        const userServiceInstance = Container.get(UserService)

      
        const purchase_orders = await userServiceInstance.getNewPurchaseOrders()
        const orders = await userServiceInstance.getNewOrders()
        
        return res
                .status(200)
                .json({ message: "new orders", data: {purchase_orders ,orders} })

       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
} 

const getWilayasCommunes= async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getWilayasCommunes endpoint")
    try {
        
        const codeServiceInstance = Container.get(CodeService)


         let wilayas = await codeServiceInstance.getWilayas({code_fldname : "ad_state"})
         let results = []
         
         for(const wilaya of wilayas){
            const communes =  await codeServiceInstance.getCommunes({code_fldname : "ad_city", chr01 : wilaya.code_value})
            results.push({wilaya, communes})
         }
         
        
        return res
                .status(200)
                .json({ message: "wilayas & communes", data: results })

       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const getValidePromo= async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getValidePromo endpoint")
    try {
        
        const codeServiceInstance = Container.get(CodeService)


         let promo = await codeServiceInstance.getValidePromo()
        
    
        return res
                .status(200)
                .json({ message: "promo", data: promo })

       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

 

export default {
    login,
    verifypwd,
    createCustomer,
    getCustomerPhone,
    getNotifications,
    getWilayasCommunes,
    getValidePromo,
    
}
