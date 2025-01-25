import QuoteOrderService from "../../services/quote"
import QuoteOrderDetailService from "../../services/quote-detail"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const quoteOrderServiceInstance = Container.get(QuoteOrderService)
        const quoteOrderDetailServiceInstance = Container.get(
            QuoteOrderDetailService
        )
        const { quoteOrder, quoteOrderDetail } = req.body
        const qo = await quoteOrderServiceInstance.create({...quoteOrder, qo_domain: user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        for (let entry of quoteOrderDetail) {
            entry = { ...entry, qod_domain: user_domain,qod_nbr: qo.qo_nbr , created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin}
            await quoteOrderDetailServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: qo })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    
    logger.debug("Calling find by  all qo endpoint")
    try {
        const result = []
        const quoteOrderServiceInstance = Container.get(QuoteOrderService)
        const quoteOrderDetailServiceInstance = Container.get(
            QuoteOrderDetailService
        )
        const Quotes = await quoteOrderDetailServiceInstance.find({
            ...req.body, qod_domain: user_domain
        })
        

        return res.status(200).json({
            message: "fetched succesfully",
            data: Quotes,
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
/*const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    
    logger.debug('Calling find by  all quote endpoint');
    try {
      const quoteOrderServiceInstance = Container.get(QuoteOrderService);
      const quoteOrderDetailServiceInstance = Container.get(QuoteOrderDetailService);
      const quoteOrder = await quoteOrderServiceInstance.findOne({
        ...req.body,
      });
      let details = [];
      if (quoteOrder) {
        details = await quoteOrderDetailServiceInstance.find({
          qod_nbr: quoteOrder.qo_nbr,
        });
        console.log(details)
      }
  
      return res.status(200).json({
        message: 'fetched succesfully',
        data: { quoteOrder, details },
      });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
  */
 const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    
    logger.debug("Calling find by  all quoteOrder endpoint")
    try {
        const quoteOrderServiceInstance = Container.get(QuoteOrderService)
        const quoteOrderDetailServiceInstance = Container.get(
            QuoteOrderDetailService
        )
        const quoteOrder = await quoteOrderServiceInstance.findOne({
            ...req.body,qo_domain: user_domain
        })
        if (quoteOrder) {
            const details = await quoteOrderDetailServiceInstance.find({
                qod_domain: user_domain,
                qod_nbr: quoteOrder.qo_nbr,
            })
            return res.status(200).json({
                message: "fetched succesfully",
                data: { quoteOrder, details },
            })
        } else {
            return res.status(404).json({
                message: "not FOund",
                data: { quoteOrder, details: null },
            })
        }
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  Quote endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    
    try {
        const quoteOrderServiceInstance = Container.get(QuoteOrderService)
        
        const quote = await quoteOrderServiceInstance.find({...req.body,qo_domain:user_domain })
        const quoteOrderDetailServiceInstance = Container.get(
            QuoteOrderDetailService
        )
        const details = await quoteOrderDetailServiceInstance.find({
            qod_domain: user_domain,
            qod_nbr: quote.qo_nbr,
        })

        return res.status(200).json({
            message: "fetched succesfully",
            data: { quote, details },
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all Quote endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    
    try {
        const quoteOrderServiceInstance = Container.get(QuoteOrderService)
        const qos = await quoteOrderServiceInstance.find({qo_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: qos })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  Quote endpoint")
    try {
        const quoteOrderServiceInstance = Container.get(QuoteOrderService)
        const { id } = req.params
        
        const quote = await quoteOrderServiceInstance.update(
            { ...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin },
            { id }
        )
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: quote })
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
