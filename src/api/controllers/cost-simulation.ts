import costSimulationService from "../../services/cost-simulation"
import SiteService from "../../services/site"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create sct endpoint")
    try {
        const costSimulationServiceInstance = Container.get(costSimulationService)
        const siteServiceInstance = Container.get(SiteService)
        
        const sct = await costSimulationServiceInstance.create({...req.body, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
        const sites = await siteServiceInstance.find({});

        for(let site of sites) {
            if(site.si_site != req.body.sct_site){
            const sct1 = await costSimulationServiceInstance.create({sct_site: site.si_site,sct_sim:req.body.sct_sim, sct_part:req.body.pt_part, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
            }

        }
        
        return res
            .status(201)
            .json({ message: "created succesfully", data:  sct })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  sct endpoint")
    try {
        const costSimulationServiceInstance = Container.get(costSimulationService)
        const {id} = req.params
        const sct = await costSimulationServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sct  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all sct endpoint")
    try {
        const costSimulationServiceInstance = Container.get(costSimulationService)
        const scts = await costSimulationServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: scts })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all sct endpoint")
    try {
        const costSimulationServiceInstance = Container.get(costSimulationService)
        const scts = await costSimulationServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: scts })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all sct endpoint")
    try {
        const costSimulationServiceInstance = Container.get(costSimulationService)
        const scts = await costSimulationServiceInstance.findOne({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: scts })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  sct endpoint")
    try {
        const costSimulationServiceInstance = Container.get(costSimulationService)
        const {id} = req.params
        const sct = await costSimulationServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sct  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  sct endpoint")
    try {
        const costSimulationServiceInstance = Container.get(costSimulationService)
        const {id} = req.params
        const sct = await costSimulationServiceInstance.delete({id})
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
