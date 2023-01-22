
import EmployeAvailabilityService from "../../services/employe-availability"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        
        const empAvailabilityServiceInstance = Container.get(
            EmployeAvailabilityService
        )
        const {  empDetails } = req.body
        
        for (let entry of empDetails) {
            entry = { ...entry, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
            await empAvailabilityServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: empDetails })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    try {
        const empdDetailsServiceInstance = Container.get(EmployeAvailabilityService)
        const employe = await empdDetailsServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: employe })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const empdDetailsServiceInstance = Container.get(EmployeAvailabilityService)
        const {id} = req.params
        const employe = await empdDetailsServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: employe  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    try {
        const empdDetailsServiceInstance = Container.get(EmployeAvailabilityService)
        const employe = await empdDetailsServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: employe })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  inventoryStatus endpoint")
    try {
       
        const empDetailserviceInstance = Container.get(
            EmployeAvailabilityService
        )
        
        const { addr,details} = req.body
        
        await empDetailserviceInstance.delete({empd_addr: addr})
        for (let entry of details) {
            entry = { ...entry, empd_addt: addr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await empDetailserviceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: addr })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

export default {
    create,
    findBy,
    findOne,
    findAll,
    update,
}
