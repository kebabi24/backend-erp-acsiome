import DealService from "../../services/deal"




import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers
    logger.debug("Calling Create deal endpoint")
    try {
        const dealServiceInstance = Container.get(DealService)

        const deal = await dealServiceInstance.create({...req.body, deal_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
        // ADD TO AGENDA 
        return res
            .status(201)
            .json({ message: "created succesfully", data:  deal })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  deal endpoint")
    try {
        const dealServiceInstance = Container.get(DealService)
        const {id} = req.params
        const deal = await dealServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: deal  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.headers.origin)
    const{user_domain} = req.headers
    logger.debug("Calling find all deal endpoint")
    try {
        const dealServiceInstance = Container.get(DealService)
        const deals = await dealServiceInstance.find({deal_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: deals })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all deal endpoint")
    const{user_domain} = req.headers
    try {
        const dealServiceInstance = Container.get(DealService)
        const deals = await dealServiceInstance.find({...req.body,deal_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: deals })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all deal endpoint")
    const{user_domain} = req.headers
    console.log(req.body)
    try {
        const dealServiceInstance = Container.get(DealService)
        const deals = await dealServiceInstance.findOne({...req.body,deal_domain: user_domain})
        console.log(deals)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: deals })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling update one  deal endpoint")
    try {
        const dealServiceInstance = Container.get(DealService)
        const {id} = req.params
        const deal = await dealServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: deal  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  deal endpoint")
    try {
        const dealServiceInstance = Container.get(DealService)
        const {id} = req.params
        const deal = await dealServiceInstance.delete({id})
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
