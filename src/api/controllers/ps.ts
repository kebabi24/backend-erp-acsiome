import PsService from "../../services/ps"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

import costSimulationService from '../../services/cost-simulation';
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const { user_code } = req.headers;
  
    logger.debug('Calling update one  code endpoint');
    try {
      const { detail, it } = req.body;
      const psServiceInstance = Container.get(PsService)
    
      for (const item of detail) {
   
        await psServiceInstance.create({
          ...item,
          ...it,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });
      }
      return res.status(200).json({ message: 'deleted succesfully', data: true });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  
const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const psServiceInstance = Container.get(PsService)
        const {id} = req.params
        const ps = await psServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ps  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    try {
        const psServiceInstance = Container.get(PsService)
        const ps = await psServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ps })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    try {
        const psServiceInstance = Container.get(PsService)
        const ps = await psServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ps })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling update one  code endpoint")
    try {
        const psServiceInstance = Container.get(PsService)
        const {id} = req.params
        const ps = await psServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ps  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  code endpoint")
    try {
        const psServiceInstance = Container.get(PsService)
        const {id} = req.params
        const ps = await psServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findPrice = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all task endpoint")
    let price = 0 
    try {
        const psServiceInstance = Container.get(PsService)
        const costSimulationServiceInstance = Container.get(costSimulationService);
       
        const ps = await psServiceInstance.find({
            ...req.body,
        })
        console.log("hhhhhhhhhhhhhbbbbbbbb")
         
           for (let entry of ps) {
            const   sct = await costSimulationServiceInstance.findOne({
                sct_part: entry.ps_comp,
              
                sct_sim: 'STDCG',
              });
                   console.log(sct.sct_cst_tot)
           
         
            price =  price + entry.ps_qty_per * sct.sct_cst_tot
        }

            return res.status(200).json({
                message: "fetched succesfully",
                data: price,
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
    findPrice,
}

