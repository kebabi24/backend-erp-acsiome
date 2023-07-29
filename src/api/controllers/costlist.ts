import CostlistService from "../../services/costlist"
import CostlistDetailService from "../../services/costlist-detail"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const CostlistServiceInstance = Container.get(CostlistService)
        const CostlistDetailServiceInstance = Container.get(CostlistDetailService)
      
        const { costlist, costlistDetail } = req.body
        const ltrc = await CostlistServiceInstance.create({...costlist, ltrc_domain:user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
        for (let entry of costlistDetail) {
            entry = { ...entry, ltrcd_code: costlist.ltrc_code }
            await CostlistDetailServiceInstance.create({...entry,ltrcd_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})

           
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: ltrc })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all tool endpoint")
    const{user_domain} = req.headers
    try {
        const CostlistServiceInstance = Container.get(CostlistService)
      
        const ltrc = await CostlistServiceInstance.find({
            ...req.body,ltrc_domain:user_domain
        })
        console.log("hhhhhhhhhhhhhhhh")
     
            return res.status(200).json({
                message: "fetched succesfully",
                data:  ltrc })
     
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all tool endpoint")
    const{user_domain} = req.headers
    try {
        const CostlistServiceInstance = Container.get(CostlistService)
        const CostlistDetailServiceInstance = Container.get(CostlistDetailService)
        const ltrc = await CostlistServiceInstance.findOne({
            ...req.body,ltrc_domain:user_domain
        })
       if(ltrc){
        const details = await CostlistDetailServiceInstance.find({
            ltrcd_domain:user_domain,
            ltrcd_code: ltrc.ltrc_code,
        })
   
            return res.status(200).json({
                message: "fetched succesfully",
                data:  {ltrc,details} })
            }
            else{
                return res.status(200).json({
                    message: "fetched succesfully",
                    data:  null })


            }        
     
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
        const CostlistServiceInstance = Container.get(CostlistService)
        const CostlistDetailServiceInstance = Container.get(CostlistDetailService)
        const { id } = req.params
        const ltrc = await CostlistServiceInstance.findOne({ id })
        if(ltrc){
            const details = await CostlistDetailServiceInstance.find({
                ltrcd_domain:user_domain,
                ltrcd_code: ltrc.ltrc_code,
            })
       
                return res.status(200).json({
                    message: "fetched succesfully",
                    data:  {ltrc,details} })
                }
                else{
                    return res.status(200).json({
                        message: "fetched succesfully",
                        data:  null })
    
    
                }        
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
        const CostlistServiceInstance = Container.get(CostlistService)
        const ltrcs = await CostlistServiceInstance.find({ltrc_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ltrcs })
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
        const CostlistServiceInstance = Container.get(CostlistService)
        const CostlistDetailServiceInstance = Container.get(CostlistDetailService)
        const { id } = req.params
        console.log(id)
        console.log(req.body)
        const {costlist, details} = req.body
        const ltrc = await CostlistServiceInstance.update(
            { ...costlist , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        await CostlistDetailServiceInstance.delete({ltrcd_code: costlist.ltrc_code,ltrcd_domain:user_domain})
        for (let entry of details) {
            entry = { ...entry, ltrcd_domain:user_domain,ltrcd_code: costlist.ltrc_code, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await CostlistDetailServiceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ltrc })
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
