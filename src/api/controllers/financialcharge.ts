import FinancialchargeService from "../../services/financialcharge"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
    logger.debug('Calling Create item endpoint ');
    try {
      const financialchargeServiceInstance = Container.get(FinancialchargeService);
      const fc = await financialchargeServiceInstance.create({
        ...req.body,
        fc_domain: user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      return res.status(201).json({ message: 'created succesfully', data:  fc  });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const fcServiceInstance = Container.get(FinancialchargeService)
        

        const {id} = req.params
        const fc = await fcServiceInstance.findOne({id})
       
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: fc })
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
        const fcServiceInstance = Container.get(FinancialchargeService)
        const fc = await fcServiceInstance.find({fc_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: fc })
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
        const fcServiceInstance = Container.get(FinancialchargeService)
        
        const fc = await fcServiceInstance.findOne({...req.body,fc_domain:user_domain})
        console.log("FC")
        return res
            .status(200)
            .json({ message: "fetched succesfully", data:fc })
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
        const fcServiceInstance = Container.get(FinancialchargeService)
        const {id} = req.params
        const fc = await fcServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: fc  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  code endpoint")
    try {
        const fcServiceInstance = Container.get(FinancialchargeService)
        const {id} = req.params
        const fc = await fcServiceInstance.delete({id})
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
    
    logger.debug("Calling find by  all requisition endpoint")
    const{user_domain} = req.headers

    try {
        const fraisServiceInstance = Container.get(FinancialchargeService)
        
        const frais = await fraisServiceInstance.find({fc_domain:user_domain})
            
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

   
}

