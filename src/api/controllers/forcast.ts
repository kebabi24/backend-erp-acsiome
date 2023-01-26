import ForcastService from "../../services/forcast"


import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create forcast endpoint")
    try {
        const forcastServiceInstance = Container.get(ForcastService)
        
        const { Details } = req.body
        for (let entry of Details) {
            entry = { ...entry,  created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
            await forcastServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: null })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  site endpoint")
    try {
        const forcastServiceInstance = Container.get(ForcastService)
        const {id} = req.params
        const forcast = await forcastServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: forcast  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    logger.debug("Calling find all site endpoint")
    try {
        const forcastServiceInstance = Container.get(ForcastService)
        const forcasts = await forcastServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: forcasts })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    try {
        const forcastServiceInstance = Container.get(ForcastService)
        
        const forcasts = await forcastServiceInstance.find({...req.body})
       
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: forcasts })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    try {
        const forcastServiceInstance = Container.get(ForcastService)
        const forcasts = await forcastServiceInstance.findOne({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: forcasts })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  site endpoint")
    try {
        const forcastServiceInstance = Container.get(ForcastService)
       // const {id} = req.params
        
       const { Details } = req.body
       for (let entry of Details) {
           entry = { ...entry,  created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
           await forcastServiceInstance.update({...entry, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id:entry.id})
       }

      // const site = await forcastServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: Details  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  site endpoint")
    try {
        const forcastServiceInstance = Container.get(ForcastService)
        const {id} = req.params
        const site = await forcastServiceInstance.delete({id})
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
