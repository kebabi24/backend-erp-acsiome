import TimbreService from "../../services/timbre"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
import { Op } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const timbreServiceInstance = Container.get(TimbreService)
        const {details} = req.body
          for (let entry of details) {
            entry = { ...entry, domain: user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
           
             await timbreServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: details })
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
        const timbreServiceInstance = Container.get(TimbreService)
       
        const timbres = await timbreServiceInstance.findOne({
            ...req.body,domain:user_domain
        })
       
            return res.status(200).json({
                message: "fetched succesfully",
                data:  timbres ,
            })
      
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findRange = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    logger.debug("Calling find by  all tool endpoint")
    const{user_domain} = req.headers
    try {
        const timbreServiceInstance = Container.get(TimbreService)
       console.log(req.body)
        const timbres = await timbreServiceInstance.findOneS({
            where : {
            code:req.body.code,
            min :  {
                [Op.lte]: req.body.amt,
            },
            max:  {
                [Op.gt]: req.body.amt,
            },
            domain:user_domain
        }
        })
       //console.log(timbres.value)
            return res.status(200).json({
                message: "fetched succesfully",
                data:  timbres ,
            })
      
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
        const timbreServiceInstance = Container.get(TimbreService)
        const { id } = req.params
        const timbre = await timbreServiceInstance.findOne({ id })
       
     

        return res.status(200).json({
            message: "fetched succesfully",
            data: timbre,
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
        const timbreServiceInstance = Container.get(TimbreService)
        const timbres = await timbreServiceInstance.find({domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: timbres })
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
        const timbreServiceInstance = Container.get(TimbreService)
       
        const { Code } = req.params
        const {Timbres} = req.body
       
        await timbreServiceInstance.delete({domain: user_domain,code: Code})
        for (let entry of Timbres) {
            entry = { ...entry, domain: user_domain,code: Code, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await timbreServiceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: jb })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
export default {
    create,
    findBy,
    findRange,
    findOne,
    findAll,
    update,
  
}
