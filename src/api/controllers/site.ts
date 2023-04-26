import SiteService from "../../services/site"
import ItemService from "../../services/item"
import CostSimulationService from "../../services/cost-simulation"
import ConfigService from "../../services/config"



import crmService from '../../services/crm';
import SequenceService from '../../services/sequence';

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers
    logger.debug("Calling Create site endpoint")
    try {
        const siteServiceInstance = Container.get(SiteService)
        const crmServiceInstance = Container.get(crmService)
        const sequenceServiceInstance = Container.get(SequenceService);
        const itemServiceInstance = Container.get(ItemService)
        const costSimulationServiceInstance = Container.get(CostSimulationService)
        const configServiceInstance = Container.get(ConfigService)
        
        const site = await siteServiceInstance.create({...req.body, si_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
        // ADD TO AGENDA 
        const config = await configServiceInstance.findOne({cfg_crm : true})
        if (config) {
            const param = await crmServiceInstance.getParamFilterd("new_shop")
            const paramDetails  = await crmServiceInstance.getParamDetails({param_code : param.param_code,domain: user_domain})
            const elements  = await crmServiceInstance.getPopulationElements(paramDetails.population_code)
                for(const element of elements ){
                    const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB()
                    const addLine = await crmServiceInstance.createAgendaLine(element.code_element,param,paramDetails, sequence)   
                    console.log(addLine)
                }
            
        }
        const items = await itemServiceInstance.find({pt_domain: user_domain});

        for(let item of items) {
            const sct = await costSimulationServiceInstance.create({sct_domain: user_domain,sct_site: req.body.si_site,sct_sim:"STDCG", sct_part:item.pt_part, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
            const sct2 = await costSimulationServiceInstance.create({sct_domain: user_domain,sct_site: req.body.si_site,sct_sim:"STDCR", sct_part:item.pt_part, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
       

        }
        return res
            .status(201)
            .json({ message: "created succesfully", data:  site })
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
        const siteServiceInstance = Container.get(SiteService)
        const {id} = req.params
        const site = await siteServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: site  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.headers.origin)
    const{user_domain} = req.headers
    logger.debug("Calling find all site endpoint")
    try {
        const siteServiceInstance = Container.get(SiteService)
        const sites = await siteServiceInstance.find({si_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sites })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    const{user_domain} = req.headers
    try {
        const siteServiceInstance = Container.get(SiteService)
        const sites = await siteServiceInstance.find({...req.body,si_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sites })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all site endpoint")
    const{user_domain} = req.headers
    try {
        const siteServiceInstance = Container.get(SiteService)
        const sites = await siteServiceInstance.findOne({...req.body,si_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: sites })
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
        const siteServiceInstance = Container.get(SiteService)
        const {id} = req.params
        const site = await siteServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: site  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  site endpoint")
    try {
        const siteServiceInstance = Container.get(SiteService)
        const {id} = req.params
        const site = await siteServiceInstance.delete({id})
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
