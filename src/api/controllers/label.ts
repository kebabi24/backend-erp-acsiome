import LabelService from "../../services/label"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    logger.debug('Calling Create label endpoint');
    try {
      const labelServiceInstance = Container.get(LabelService);
      const label = await labelServiceInstance.create({
        ...req.body,
        lb_domain: user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      return res.status(201).json({ message: 'created succesfully', data: label });
    } catch (e) {
      //#
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all job endpoint")
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    try {
        const labelServiceInstance = Container.get(LabelService)
        const label = await labelServiceInstance.findOne({
            ...req.body,lb_domain:user_domain
        })
            return res.status(200).json({
                message: "fetched succesfully",
                data: { label },
            })
       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  job endpoint")
    try {
        const labelServiceInstance = Container.get(LabelService)
        const { id } = req.params
        const label = await labelServiceInstance.findOne({ id })
       
        return res.status(200).json({
            message: "fetched succesfully",
            data: { label},
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all job endpoint")
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    try {
        const labelServiceInstance = Container.get(LabelService)
        const labels = await labelServiceInstance.find({lb_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: labels })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  job endpoint")
    try {
        const labelServiceInstance = Container.get(LabelService)
        const { id } = req.params
        const label = await labelServiceInstance.update(
            { ...req.body , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: label })
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
