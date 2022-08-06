import CustomerMobileService from "../../services/customer-mobile"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { DATE, Op } from 'sequelize';
import * as os from 'os';

const create = async (req: Request, res: Response, next: NextFunction) => {
    const hostname = os.networkInterfaces()
    console.log(hostname)
    const logger = Container.get("logger")
    const{user_code} = req.headers
    const customerMobileData = req.body
    console.log(customerMobileData)
    console.log(req.body)
    logger.debug("Calling Create customer endpoint with body: %o", req.body)
    try {

        const customerMobileServiceInstance = Container.get(CustomerMobileService)
         const customerMobile = await customerMobileServiceInstance.create({
            ...customerMobileData,
            //  created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin
        })
       
       
        return res
            .status(201)
            .json({ message: "created succesfully", data: { customerMobile } })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one by  customer endpoint")
    try {
        const CustomerMobileServiceInstance = Container.get(CustomerMobileService)
        const customers = await CustomerMobileServiceInstance.findOne({...req.body})
        console.log(customers)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: customers })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all user endpoint")
    try {
        const CustomerMobileServiceInstance = Container.get(CustomerMobileService)
        const customers = await CustomerMobileServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: customers })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all customer endpoint")
    try {
        const CustomerMobileServiceInstance = Container.get(CustomerMobileService)
        const customers = await CustomerMobileServiceInstance.find({...req.body})
        console.log(customers)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: customers })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

export default {
    create,
    findByOne,
    findBy,
    findAll
}
