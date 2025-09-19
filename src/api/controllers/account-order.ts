import AccountOrderService from "../../services/account-order"
import BankDetailService from "../../services/bank-detail"
import CustomerService from "../../services/customer"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import SequenceService from "../../services/sequence"
import BkhService from '../../services/bkh';
import BankService from "../../services/bank"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create account endpoint")
    try {
        console.log(req.body)
        const accountOrderServiceInstance = Container.get(AccountOrderService)
        const customerServiceInstance = Container.get(CustomerService)
        const accountOrder = await accountOrderServiceInstance.create({...req.body.as,ao_nbr: req.body.pshnbr,ao_domain : user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        const cm = await customerServiceInstance.findOne({cm_addr: req.body.as.ao_cust,cm_domain : user_domain,})
        
        if(cm) await customerServiceInstance.update({cm_ship_balance : Number(cm.cm_ship_balance) + Number(req.body.as.ao_base_amt)  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: cm.id})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountOrder })
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
       
        const accountOrderServiceInstance = Container.get(AccountOrderService)
        const bankDetailServiceInstance = Container.get(BankDetailService)
        const customerServiceInstance = Container.get(CustomerService)
        const sequenceServiceInstance = Container.get(SequenceService)
        const bkhServiceInstance = Container.get(BkhService);
        const bankServiceInstance = Container.get(BankService)
        const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'AU', seq_type: 'AU' });
        let nbr = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
    await sequenceServiceInstance.update(
      { seq_curr_val: Number(seq.seq_curr_val) + 1 },
      { id: seq.id, seq_type: 'AU', seq_seq: 'AU', seq_domain: user_domain },
    );
        // const bankdet = await bankDetailServiceInstance.findOne({bkd_bank: req.body.ao_bank,bkd_domain: user_domain, bkd_pay_method: req.body.ao_pay_method, bkd_module : "AR"})
        // if (bankdet) {
        //     nbr = req.body.ao_ship.concat(bankdet.bkd_next_ck.toString());
        //     await bankDetailServiceInstance.update({bkd_next_ck: bankdet.bkd_next_ck + 1  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: bankdet.id})
        // }
        const accountOrder = await accountOrderServiceInstance.create({...req.body, ao_nbr : nbr,ao_domain : user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        const bl = await accountOrderServiceInstance.findOne({ao_nbr: req.body.ao_so_nbr,ao_domain : user_domain, ao_type: "I"})
        if (Number(bl.ao_applied) + Number(req.body.ao_amt) >= Number(bl.ao_amt) ) { open = false}
        if(bl) await accountOrderServiceInstance.update({ao_applied : Number(bl.ao_applied) + Number(req.body.ao_applied), ao_open : open  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: bl.id})
        const cm = await customerServiceInstance.findOne({cm_addr: req.body.ao_cust,cm_domain : user_domain,})
        if(cm) await customerServiceInstance.update({cm_ship_balance : Number(cm.cm_ship_balance) - Number(req.body.ao_applied)  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: cm.id})
      
      
        const banks = await bankServiceInstance.findOne({ bk_code: req.body.ao_bank, bk_domain: user_domain });
   
        const bk = await bkhServiceInstance.create({
            bkh_domain: user_domain,
            bkh_code: nbr,
            bkh_effdate: req.body.ao_effdate,
            bkh_date: new Date(),
            bkh_num_doc : req.body.ao_nbr,
            bkh_addr : req.body.ao_vend,
            bkh_bank: req.body.ao_bank,
            bkh_type: 'RCT',
            bkh_balance: banks.bk_balance,
            bk_2000:  Number(req.body.ao_amt),
            // bkh_site: req.body.site,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
          await bankServiceInstance.update(
            {
              bk_balance: Number(banks.bk_balance)  + Number(req.body.ao_amt),
  
              last_modified_by: user_code,
              last_modified_ip_adr: req.headers.origin,
            },
            { id:banks.id, bk_domain: user_domain },
          );
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountOrder })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createPCUST = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    let nbr : String;
    let open: Boolean;
    logger.debug("Calling Create account endpoint")
    try {
       
        const accountOrderServiceInstance = Container.get(AccountOrderService)
        const customerServiceInstance = Container.get(CustomerService)
        const accountOrder = await accountOrderServiceInstance.create({...req.body,ao_domain : user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        const cm = await customerServiceInstance.findOne({cm_addr: req.body.ao_cust,cm_domain : user_domain,})
        if(cm) await customerServiceInstance.update({cm_ship_balance : Number(cm.cm_ship_balance) - Number(req.body.ao_applied)  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: cm.id})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountOrder })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  account endpoint")
    try {
        const AccountOrderServiceInstance = Container.get(AccountOrderService)
        const {id} = req.params
        const accountOrder = await AccountOrderServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountOrder  })
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
        const AccountOrderServiceInstance = Container.get(AccountOrderService)
        const accountOrders = await AccountOrderServiceInstance.find({ao_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountOrders })
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
        const AccountOrderServiceInstance = Container.get(AccountOrderService)
        const accountOrders = await AccountOrderServiceInstance.find({...req.body,ao_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountOrders })
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
        const AccountOrderServiceInstance = Container.get(AccountOrderService)
        const {id} = req.params
        const accountOrder = await AccountOrderServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountOrder  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  account endpoint")
    try {
        const AccountOrderServiceInstance = Container.get(AccountOrderService)
        const {id} = req.params
        const accountOrder = await AccountOrderServiceInstance.delete({id})
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
    createPCUST,
    findOne,
    findAll,
    findBy,
    update,
    deleteOne
}
