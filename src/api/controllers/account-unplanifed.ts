import AccountUnplanifedService from "../../services/account-unplanifed"
import BankDetailService from "../../services/bank-detail"
import ProviderService from "../../services/provider"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create account endpoint")
    try {
        
        const accountUnplanifedServiceInstance = Container.get(AccountUnplanifedService)
        const providerServiceInstance = Container.get(ProviderService)
        const accountUnplqnifed = await accountUnplanifedServiceInstance.create({...req.body.as,au_nbr: req.body.pshnbr,au_domain : user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        const vd = await providerServiceInstance.findOne({vd_addr: req.body.as.au_vend,vd_domain : user_domain,})
        if(vd) await providerServiceInstance.update({vd_ship_balance : Number(vd.vd_ship_balance) + Number(req.body.au_base_amt)  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: vd.id})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountUnplqnifed })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createP = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    let nbr : String;
    let open: Boolean;
    logger.debug("Calling Create account endpoint")
    try {
       
        const accountUnplanifedServiceInstance = Container.get(AccountUnplanifedService)
        const bankDetailServiceInstance = Container.get(BankDetailService)
        const providerServiceInstance = Container.get(ProviderService)
        const bankdet = await bankDetailServiceInstance.findOne({bkd_bank: req.body.au_bank,bkd_domain: user_domain, bkd_pay_method: req.body.au_pay_method, bkd_module : "AP"})
        if (bankdet) {
            nbr = req.body.au_ship.concat(bankdet.bkd_next_ck.toString());
            await bankDetailServiceInstance.update({bkd_next_ck: bankdet.bkd_next_ck + 1  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: bankdet.id})
        }
        const accountUnplqnifed = await accountUnplanifedServiceInstance.create({...req.body, au_nbr : nbr,au_domain : user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        const bl = await accountUnplanifedServiceInstance.findOne({au_nbr: req.body.au_ship,au_domain : user_domain, au_type: "I"})
        if (Number(bl.au_applied) + Number(req.body.au_amt) >= Number(bl.au_amt) ) { open = false}
        if(bl) await accountUnplanifedServiceInstance.update({au_applied : Number(bl.au_applied) + Number(req.body.au_applied), au_open : open  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: bl.id})
        const vd = await providerServiceInstance.findOne({vd_addr: req.body.au_vend,vd_domain : user_domain,})
        if(vd) await providerServiceInstance.update({vd_ship_balance : Number(vd.vd_ship_balance) - Number(req.body.au_applied)  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: vd.id})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountUnplqnifed })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  account endpoint")
    try {
        const accountUnplanifedServiceInstance = Container.get(AccountUnplanifedService)
        const {id} = req.params
        const accountUnplqnifed = await accountUnplanifedServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountUnplqnifed  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all account endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    try {
        const accountUnplanifedServiceInstance = Container.get(AccountUnplanifedService)
        const accountUnplqnifeds = await accountUnplanifedServiceInstance.find({au_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountUnplqnifeds })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all account endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    try {
        const accountUnplanifedServiceInstance = Container.get(AccountUnplanifedService)
        const accountUnplqnifeds = await accountUnplanifedServiceInstance.find({...req.body,au_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountUnplqnifeds })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling update one  account endpoint")
    try {
        const accountUnplanifedServiceInstance = Container.get(AccountUnplanifedService)
        const {id} = req.params
        const accountUnplqnifed = await accountUnplanifedServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountUnplqnifed  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  account endpoint")
    try {
        const accountUnplanifedServiceInstance = Container.get(AccountUnplanifedService)
        const {id} = req.params
        const accountUnplqnifed = await accountUnplanifedServiceInstance.delete({id})
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
    createP,
    findOne,
    findAll,
    findBy,
    update,
    deleteOne
}
