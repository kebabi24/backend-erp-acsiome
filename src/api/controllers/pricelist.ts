import PricelistService from "../../services/pricelist"
import CodeService from "../../services/code"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { DATE, Op } from 'sequelize';

/*const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling Create pricelist endpoint")
    try {
        const pricelistServiceInstance = Container.get(PricelistService)
        const pricelist = await pricelistServiceInstance.create(req.body)
        return res
            .status(201)
            .json({ message: "created succesfully", data:  pricelist })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}*/
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling update one  code endpoint")
    try {
        const {detail, pricelist} = req.body
        console.log(pricelist)
        const pricelistServiceInstance = Container.get(PricelistService)
        

        for (const item of detail) {
            
            const price = await pricelistServiceInstance.create({...item,...pricelist,pi_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin })


        }
        return res
            .status(200)
            .json({ message: "create succesfully", data: true  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  pricelist endpoint")
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    try {
        const pricelistServiceInstance = Container.get(PricelistService)
        const {id} = req.params
        const pricelist = await pricelistServiceInstance.findOne({id})
        const details = await pricelistServiceInstance.find({id:id,pi_list: pricelist.pi_list,pi_domain:user_domain})
        console.log(pricelist.pi_list)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: { pricelist, details }  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all pricelist endpoint")
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    try {
        const pricelistServiceInstance = Container.get(PricelistService)
        const codeServiceInstance = Container.get(CodeService)
        const pricelists = await pricelistServiceInstance.find({pi_domain:user_domain})
        for(let pricelist of pricelists) {
            const code = await codeServiceInstance.findOne({code_fldname:'pt_promo',code_value:pricelist.pi_part_code})
          if(code != null) { pricelist.chr01 = code.code_cmmt } 
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: pricelists })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all pricelist endpoint")
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    try {
        const pricelistServiceInstance = Container.get(PricelistService)
        const pricelists = await pricelistServiceInstance.find({...req.body,pi_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: pricelists })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all pricelist endpoint")
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    try {
        const pricelistServiceInstance = Container.get(PricelistService)
        const pricelists = await pricelistServiceInstance.findOne({...req.body,pi_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: pricelists })
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
        const {detail, pricelist} = req.body
        console.log(pricelist)
        const pricelistServiceInstance = Container.get(PricelistService)
        
        const price = await pricelistServiceInstance.delete({id:pricelist.id,pi_list: pricelist.pi_list,pi_domain:user_domain })
        for (const item of detail) {
            
            const price = await pricelistServiceInstance.create({...item,...pricelist,pi_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code })


        }
        return res
            .status(200)
            .json({ message: "create succesfully", data: true  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  pricelist endpoint")
    try {
        const pricelistServiceInstance = Container.get(PricelistService)
        const {id} = req.params
        const pricelist = await pricelistServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const getPrice = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    try {
      
      const pricelistServiceInstance = Container.get(PricelistService);
      const { part, promo,cust,classe, date,qty,um,curr,type } = req.body;
      
      console.log(req.body)
      const pricelist = await pricelistServiceInstance.min({
        pi_part_code: { [Op.or] : [part,promo]},
        pi_cs_code: { [Op.or] : [cust,classe]},
        
        pi_start: {
          [Op.lte]: date,
        },
        pi_expire: {
          [Op.gte]: date,
        },
        pi_min_net: {
            [Op.lte]: qty,
          },
        pi_max_ord: {
        [Op.gte]: qty,
        },
        pi_um: um,
        pi_curr: curr,
        pi_amt_type: type,
        pi_domain:user_domain,

      });
      console.log("pricelist",pricelist)
      return res.status(200).json({ message: 'fetched succesfully', data: pricelist });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  const getDiscPct = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
    try {
      
      const pricelistServiceInstance = Container.get(PricelistService);
      const { part, promo,cust,classe, date,qty,um,curr,typer } = req.body;
      
      console.log(req.body)
      const pricelist = await pricelistServiceInstance.max({
        pi_part_code: { [Op.or] : [part,promo]},
        pi_cs_code: { [Op.or] : [cust,classe]},
        
        pi_start: {
          [Op.lte]: date,
        },
        pi_expire: {
          [Op.gte]: date,
        },
        pi_min_net: {
            [Op.lte]: qty,
          },
        pi_max_ord: {
        [Op.gte]: qty,
        },
        pi_um: um,
        pi_curr: curr,
        pi_amt_type: typer,
        pi_domain:user_domain,

      });
      console.log(pricelist)
      return res.status(200).json({ message: 'fetched succesfully', data: pricelist });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  
export default {
    create,
    findOne,
    findAll,
    findBy,
    findByOne,
    update,
    deleteOne,
    getPrice,
    getDiscPct
}
