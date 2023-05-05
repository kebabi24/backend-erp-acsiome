import CodeMobileService from "../../services/code-mobile"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create mobile code endpoint")
    try {
        const codeMobileServiceInstance = Container.get(CodeMobileService)
        const codeMobile = await codeMobileServiceInstance.create({...req.body, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  codeMobile })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  mobile code endpoint")
    try {
        const codeMobileServiceInstance = Container.get(CodeMobileService)
        const {id} = req.params
        const codeMobile = await codeMobileServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: codeMobile  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all mobile code endpoint")
    try {
        const codeMobileServiceInstance = Container.get(CodeMobileService)
        const codesMobile = await codeMobileServiceInstance.find({})
        console.log(codesMobile)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: codesMobile })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code mobile endpoint")
    try {
        const codeMobileServiceInstance = Container.get(CodeMobileService)
        const codesMobile = await codeMobileServiceInstance.find({...req.body})
        console.log(req.body)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: codesMobile })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one mobile code endpoint")
    try {
        const codeMobileServiceInstance = Container.get(CodeMobileService)
        const {id} = req.params
        const codeMobile = await codeMobileServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: codeMobile  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one mobile code endpoint")
    try {
        const codeMobileServiceInstance = Container.get(CodeMobileService)
        const {id} = req.params
        const code = await codeMobileServiceInstance.delete({id})
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
