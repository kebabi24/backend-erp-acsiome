import BomPartService from "../../services/bom-part"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"


const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create code endpoint")
    try {
        const bomPartServiceInstance = Container.get(BomPartService)
        const { BomPart, Details } = req.body

        await bomPartServiceInstance.delete({ptb_bom: BomPart.ptb_bom, ptb_domain: user_domain})
        for (let entry of Details) {
            
            
            await bomPartServiceInstance.create({...entry, ...BomPart,ptb_domain: user_domain,
                 created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})

            
        }
      //  const affectemploye = await affectEmployeServiceInstance.create({...req.body, created_by: user_code, last_modified_by: user_code})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  BomPart })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const bomPartServiceInstance = Container.get(BomPartService)
        const {id} = req.params
        const bom = await bomPartServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: bom  })
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
        const bomPartServiceInstance = Container.get(BomPartService)
        const bom = await bomPartServiceInstance.find({ptb_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: bom })
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
        const bomPartServiceInstance = Container.get(BomPartService)
        const bom = await bomPartServiceInstance.find({...req.body,ptb_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: bom })
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
        const bomPartServiceInstance = Container.get(BomPartService)
        const {id} = req.params
        const bom = await bomPartServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: bom  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  code endpoint")
    try {
        const bomPartServiceInstance = Container.get(BomPartService)
        const {id} = req.params
        const bom = await bomPartServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
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
    deleteOne
}

