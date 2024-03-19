import TransportcostService from "../../services/transportcost"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const transportcostServiceInstance = Container.get(TransportcostService)
      
        
        const trc = await transportcostServiceInstance.create({...req.body, trc_domain:user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
        return res
            .status(201)
            .json({ message: "created succesfully", data: trc })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    logger.debug("Calling find by  all tool endpoint")
    const{user_domain} = req.headers
    try {
        const transportcostServiceInstance = Container.get(TransportcostService)
      
        const trc = await transportcostServiceInstance.find({
            ...req.body,trc_domain:user_domain
        })
        console.log("hhhhhhhhhhhhhhhh")
     
            return res.status(200).json({
                message: "fetched succesfully",
                data:  trc })
     
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    logger.debug("Calling find by  all tool endpoint")
    const{user_domain} = req.headers
    try {
        const transportcostServiceInstance = Container.get(TransportcostService)
      
        const trc = await transportcostServiceInstance.findOne({
            ...req.body,trc_domain:user_domain
        })
        console.log("hhhhhhhhhhhhhhhh")
     
            return res.status(200).json({
                message: "fetched succesfully",
                data:  trc })
     
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  tool endpoint")
    const{user_domain} = req.headers
    try {
        const transportcostServiceInstance = Container.get(TransportcostService)
        const { id } = req.params
        const trc = await transportcostServiceInstance.findOne({ id })
        console.log(trc)
        return res.status(200).json({
            message: "fetched succesfully",
            data:  trc ,
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all tool endpoint")
    const{user_domain} = req.headers
    try {
        const transportcostServiceInstance = Container.get(TransportcostService)
        const trcs = await transportcostServiceInstance.find({trc_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: trcs })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling update one  tool endpoint")
    try {
        const transportcostServiceInstance = Container.get(TransportcostService)
       
        const { id } = req.params
        console.log(id)
        
        const trc = await transportcostServiceInstance.update(
            { ...req.body , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
     
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: trc })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

export default {
    create,
    findBy,
    findByOne,
    findOne,
    findAll,
    update,
   
}
