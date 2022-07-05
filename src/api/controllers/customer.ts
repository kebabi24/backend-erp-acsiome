import CustomerService from "../../services/customer"
import AccountReceivableService from "../../services/account-receivable"
import accountShiperService from "../../services/account-shiper"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { DATE, Op } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling Create customer endpoint with body: %o", req.body)
    try {
        const customerServiceInstance = Container.get(CustomerService)
        const customer = await customerServiceInstance.create({...req.body, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data: { customer } })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}
const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  customer endpoint")
    try {
        const customerServiceInstance = Container.get(CustomerService)
        const {id} = req.params
        const customer = await customerServiceInstance.findOne({id})
        console.log(customer)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: customer  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    try {
        const customerServiceInstance = Container.get(CustomerService)
        const customers = await customerServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: customers })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all customer endpoint")
    try {
        const customerServiceInstance = Container.get(CustomerService)
        const customer = await customerServiceInstance.findOne({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: customer })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const getSolde = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all customer endpoint")
    try {
        const customerServiceInstance = Container.get(CustomerService)
        const accountreceivableServiceInstance = Container.get(AccountReceivableService)
        const accountshiperServiceInstance = Container.get(accountShiperService)
        const customer = await customerServiceInstance.find({cm_addr: 
            {[Op.between]: [req.body.cm_addr_1, req.body.cm_addr_2]},})
            
        const results_head = [];

        for (const cm of customer){
            const accountreceivable = await accountreceivableServiceInstance.find({ar_cust:
                cm.cm_addr,
                ar_effdate:{[Op.between]: [req.body.date, new Date()]},})

            
            let solde = 0;
            for(const ar of accountreceivable){
                solde = solde - Number(ar.ar_amt);

            }
            const accountshiper = await accountshiperServiceInstance.find({as_cust:
                cm.cm_addr,
                as_effdate:{[Op.between]: [req.body.date, new Date()]},})
            let solde_ship = 0;
            for(const as of accountshiper){
                solde_ship = solde_ship - Number(as.as_mstr);
            }
            
            const result_head = {
                cm_addr_head : cm.cm_addr,
                cm_sort_head : cm.cm_sort,
                cm_balance   : cm.cm_balance + solde,
                cm_ship_balance: cm.cm_ship_balance + solde_ship,
            };
            console.log(result_head)
                
            results_head.push(result_head);    
        };
        

        return res
            .status(200)
            .json({ message: "fetched succesfully", data: results_head })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all customer endpoint")
    try {
        const customerServiceInstance = Container.get(CustomerService)
        const customer = await customerServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: customer })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers
    logger.debug("Calling update one  customer endpoint")
    try {
        const customerServiceInstance = Container.get(CustomerService)
        const {id} = req.params
        const customer = await customerServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: customer  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  customer endpoint")
    try {
        const customerServiceInstance = Container.get(CustomerService)
        const {id} = req.params
        const customer = await customerServiceInstance.delete({id})
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
    findByAll,
    update,
    getSolde,
    deleteOne
}
