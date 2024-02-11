import AddressService from "../../services/address"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import user from "./user"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling Create address endpoint with body: %o", req.body)
    try {
        const addressServiceInstance = Container.get(AddressService)
        const address = await addressServiceInstance.create({...req.body,ad_domain:user_domain,created_by: user_code, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data: { address } })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all address endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const addressServiceInstance = Container.get(AddressService)
        const address = await addressServiceInstance.findOne({...req.body,ad_domain:user_domain})
      //  console.log(address)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: address })
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
        const addressServiceInstance = Container.get(AddressService)
        const address = await addressServiceInstance.find({ad_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: address })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findAllBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const addressServiceInstance = Container.get(AddressService)
        const address = await addressServiceInstance.find({...req.body,ad_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: address })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  provider endpoint")
    try {
        const addressServiceInstance = Container.get(AddressService)
        const {id} = req.params
        const address = await addressServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: address  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    logger.debug('Calling find one  customer endpoint');
    try {
      const addressServiceInstance = Container.get(AddressService);
      const { id } = req.params;
      const address = await addressServiceInstance.findOne({ id });
      return res.status(200).json({ message: 'fetched succesfully', data: address });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
export default {
    create,
    findBy,
    findAll,
    update,
    findAllBy,
    findOne
}
