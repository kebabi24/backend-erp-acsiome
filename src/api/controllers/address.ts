import AddressService from "../../services/address"
import RepertoryService from "../../services/repertory"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import user from "./user"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling Create address endpoint with body: %o", req.body)
    try {
        const repertoryServiceInstance = Container.get(RepertoryService)
        const addressServiceInstance = Container.get(AddressService)
        const address = await addressServiceInstance.create({...req.body,ad_domain:user_domain,created_by: user_code, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
       let type = ''
       if(req.body.ad_type=='vendor') {type = "Provider"}
       if(req.body.ad_type=='customer') {type = "Customer"}
       if(req.body.ad_type=='bank') {type = "Bank"}
       if(req.body.ad_type=='Transporter') {type = "Transporter"}
        if(req.body.ad_attn != null) {
            let entry = { rep_code:req.body.ad_addr,rep_type:type,rep_contact:req.body.ad_attn ,rep_tel:req.body.ad_phone,rep_tel2:req.body.ad_fax,rep_email:req.body.ad_ext,rep_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await repertoryServiceInstance.create(entry)
    
        }
        if(req.body.ad_attn2 != null) {
            let entry = { rep_code:req.body.ad_addr,rep_type:type,rep_contact:req.body.ad_attn2 ,rep_tel:req.body.ad_phone2,rep_tel2:req.body.ad_fax2,rep_email:req.body.ad_ext2,rep_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await repertoryServiceInstance.create(entry)
    
        }
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
        const address = await addressServiceInstance.find({...req.body,ad_domain:user_domain})
     
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
const findAllcustomer = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const addressServiceInstance = Container.get(AddressService)
        const address = await addressServiceInstance.find({ad_domain:user_domain,ad_type:'customer'})
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
    findAllcustomer,
    update,
    findAllBy,
    findOne
}
