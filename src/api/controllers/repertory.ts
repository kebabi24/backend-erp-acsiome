import RepertoryService from "../../services/repertory"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import AddressService from "../../services/address"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers
    logger.debug("Calling Create site endpoint")
    try {
        const repertoryServiceInstance = Container.get(RepertoryService)

        const {addr, repDetails} = req.body
        await repertoryServiceInstance.delete({rep_code: addr,rep_domain:user_domain})
        for (let entry of repDetails) {
            entry = { ...entry, rep_domain:user_domain,rep_code: addr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await repertoryServiceInstance.create(entry)
        }
       // const repertory = await repertoryServiceInstance.create({...req.body, rep_domain: user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  addr })
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
        const repertoryServiceInstance = Container.get(RepertoryService)
        const {id} = req.params
        const repertory = await repertoryServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: repertory  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.headers.origin)
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    
    logger.debug("Calling find all site endpoint")
    try {
        const repertoryServiceInstance = Container.get(RepertoryService)
        const repertorys = await repertoryServiceInstance.find({rep_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: repertorys })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    
    try {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        const repertoryServiceInstance = Container.get(RepertoryService)
        const repertorys = await repertoryServiceInstance.find({...req.body,rep_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: repertorys })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByAddress = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    
    try {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        const repertoryServiceInstance = Container.get(RepertoryService)
        const addressServiceInstance = Container.get(AddressService)
        
        const repertorys = await repertoryServiceInstance.find({...req.body,rep_domain: user_domain})
       for (let rep of repertorys) {
           const addr = await addressServiceInstance.findOne({ad_domain: user_domain, ad_addr: rep.rep_code})
           rep.chr01 = addr.ad_name
          
       }
      // console.log(repertorys)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: repertorys })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    
    try {
        const repertoryServiceInstance = Container.get(RepertoryService)
        const repertorys = await repertoryServiceInstance.findOne({...req.body,rep_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: repertorys })
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
        const repertoryServiceInstance = Container.get(RepertoryService)
        const {id} = req.params
        const repertory = await repertoryServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: repertory  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  site endpoint")
    try {
        const repertoryServiceInstance = Container.get(RepertoryService)
        const {id} = req.params
        const repertory = await repertoryServiceInstance.delete({id})
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
    findByAddress,
    findByOne,
    update,
    deleteOne
}
