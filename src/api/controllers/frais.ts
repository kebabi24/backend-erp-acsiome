import FraisService from "../../services/frais"
import FraisDetailService from "../../services/frais-detail"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    const { frais, fraisDetail } = req.body

    logger.debug("Calling Create code endpoint")
    try {
        const fraisServiceInstance = Container.get(FraisService)
        const fraisDetailServiceInstance = Container.get(FraisDetailService)
        const frai = await fraisServiceInstance.create({...frais,frp_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        for (let entry of fraisDetail) {
            entry = { ...entry, frpd_inv_nbr: frais.frp_inv_nbr }
            await fraisDetailServiceInstance.create({...entry,frpd_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})

            
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data:  frais })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const fraisServiceInstance = Container.get(FraisService)
        const fraisDetailServiceInstance = Container.get(FraisDetailService)

        const {id} = req.params
        const frais = await fraisServiceInstance.findOne({id})
        const details = await fraisDetailServiceInstance.find({
            frpd_domain:user_domain,
            frpd_inv_nbr: frais.frp_inv_nbr,
        })
        return res
            .status(200)
            .json({ message: "fetched succesfully", data:{ frais  , details}})
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const fraisServiceInstance = Container.get(FraisService)
        const frais = await fraisServiceInstance.find({frp_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: frais })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const fraisServiceInstance = Container.get(FraisService)
        const fraisDetailServiceInstance = Container.get(FraisDetailService)
        const frais = await fraisServiceInstance.findOne({...req.body,frp_domain:user_domain})
        const details = await fraisDetailServiceInstance.find({
            frpd_domain:user_domain,
            frpd_inv_nbr: frais.frp_inv_nbr,
        })
        return res
            .status(200)
            .json({ message: "fetched succesfully", data:{frais,details} })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  code endpoint")
    try {
        const fraisServiceInstance = Container.get(FraisService)
        const {id} = req.params
        const frais = await fraisServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: frais  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  code endpoint")
    try {
        const fraisServiceInstance = Container.get(FraisService)
        const {id} = req.params
        const frais = await fraisServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all requisition endpoint")
    const{user_domain} = req.headers

    try {
        const fraisServiceInstance = Container.get(FraisService)
        
        const frais = await fraisServiceInstance.find({frp_domain:user_domain})
            
        return res.status(202).json({
            message: "sec",
            data:  frais ,
        })
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
    update,
    deleteOne,
    findByAll
}

