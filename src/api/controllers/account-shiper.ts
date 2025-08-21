import AccountShiperService from "../../services/account-shiper"
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
const{user_site} = req.headers

    logger.debug("Calling Create account endpoint")
    try {
        console.log(req.body)
        const accountShiperServiceInstance = Container.get(AccountShiperService)
        const customerServiceInstance = Container.get(CustomerService)
        const accountShiper = await accountShiperServiceInstance.create({...req.body.as,as_nbr: req.body.pshnbr,as_app_owner:req.body.as.as_cust,as_entity:user_site,as_domain : user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        const cm = await customerServiceInstance.findOne({cm_addr: req.body.as.as_cust,cm_domain : user_domain,})
        
        if(cm) await customerServiceInstance.update({cm_ship_balance : Number(cm.cm_ship_balance) + Number(req.body.as.as_base_amt)  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: cm.id})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountShiper })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createP = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    
    logger.debug("Calling Create account endpoint")
    try {
       
        const accountShiperServiceInstance = Container.get(AccountShiperService)
        const bankDetailServiceInstance = Container.get(BankDetailService)
        const customerServiceInstance = Container.get(CustomerService)
        const sequenceServiceInstance = Container.get(SequenceService)
        const bkhServiceInstance = Container.get(BkhService);
        const bankServiceInstance = Container.get(BankService)
        const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'AP', seq_type: 'AP' });
        let nbr = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
        
    let open: Boolean;
    await sequenceServiceInstance.update(
      { seq_curr_val: Number(seq.seq_curr_val) + 1 },
      { id: seq.id, seq_type: 'AP', seq_seq: 'AP', seq_domain: user_domain },
    );
        // const bankdet = await bankDetailServiceInstance.findOne({bkd_bank: req.body.as_bank,bkd_domain: user_domain, bkd_pay_method: req.body.as_pay_method, bkd_module : "AR"})
        // if (bankdet) {
        //     nbr = req.body.as_ship.concat(bankdet.bkd_next_ck.toString());
        //     await bankDetailServiceInstance.update({bkd_next_ck: bankdet.bkd_next_ck + 1  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: bankdet.id})
        // }
        console.log(req.body.as_ship)
        const accountShiper = await accountShiperServiceInstance.create({...req.body,as_app_owner :req.body.as_cust, as_nbr : nbr,as_domain : user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        const bl = await accountShiperServiceInstance.findOne({as_nbr: req.body.as_ship,as_domain : user_domain, as_type: "I"})
        open = true
        console.log(bl)
        // if (Number(bl.as_applied) - Number(req.body.as_amt) >= Number(bl.as_amt) ) { open = false}
        console.log(bl.as_applied, req.body.as_amt,open)
        if(bl) await accountShiperServiceInstance.update({as_applied : Number(bl.as_applied) - Number(req.body.as_applied), as_open : false  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: bl.id})
        const cm = await customerServiceInstance.findOne({cm_addr: req.body.as_cust,cm_domain : user_domain,})
        if(cm) await customerServiceInstance.update({cm_ship_balance : Number(cm.cm_ship_balance) + Number(req.body.as_applied)  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: cm.id})
      
      
        const banks = await bankServiceInstance.findOne({ bk_code: req.body.as_bank, bk_domain: user_domain });
   
        const bk = await bkhServiceInstance.create({
            bkh_domain: user_domain,
            bkh_code: nbr,
            bkh_effdate: req.body.as_effdate,
            bkh_date: new Date(),
            bkh_num_doc : req.body.as_nbr,
            bkh_addr : req.body.as_vend,
            bkh_bank: req.body.as_bank,
            bkh_type: 'RCT',
            bkh_balance: banks.bk_balance,
            bk_2000:  - Number(req.body.as_applied),
            // bkh_site: req.body.site,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
          await bankServiceInstance.update(
            {
              bk_balance: Number(banks.bk_balance) - Number(req.body.as_applied),
  
              last_modified_by: user_code,
              last_modified_ip_adr: req.headers.origin,
            },
            { id:banks.id, bk_domain: user_domain },
          );
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountShiper })
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
       
        const accountShiperServiceInstance = Container.get(AccountShiperService)
        const customerServiceInstance = Container.get(CustomerService)
        const accountShiper = await accountShiperServiceInstance.create({...req.body,as_app_owner :req.body.as_cust,as_domain : user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        const cm = await customerServiceInstance.findOne({cm_addr: req.body.as_cust,cm_domain : user_domain,})
        if(cm) await customerServiceInstance.update({cm_ship_balance : Number(cm.cm_ship_balance) - Number(req.body.as_applied)  , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id: cm.id})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountShiper })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  account endpoint")
    try {
        const AccountShiperServiceInstance = Container.get(AccountShiperService)
        const {id} = req.params
        const accountShiper = await AccountShiperServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountShiper  })
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
        const AccountShiperServiceInstance = Container.get(AccountShiperService)
        const accountShipers = await AccountShiperServiceInstance.find({as_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountShipers })
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
        const AccountShiperServiceInstance = Container.get(AccountShiperService)
        const accountShipers = await AccountShiperServiceInstance.find({...req.body,as_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountShipers })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByCos = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all account endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    try {
        const AccountShiperServiceInstance = Container.get(AccountShiperService)
        const customerServiceInstance = Container.get(CustomerService)
        const accountShipers = await AccountShiperServiceInstance.find({...req.body,as_domain: user_domain})
        let i = 0
        let result=[]
        let custs:any;
        for (let psh of accountShipers)
        {
        custs = await customerServiceInstance.findOne({cm_addr:psh.as_cust,cm_domain: user_domain})
            
            result.push({
            id: i,
            as_nbr:psh.as_nbr,
            as_ship:psh.as_ship,
            as_type:psh.as_type,
            as_cust:psh.as_cust,
            name:custs.address.ad_name,
            as_app_owner:psh.as_cust,
            as_bank:psh.as_bank,
            as_curr:psh.as_curr,
            as_amt:psh.as_amt,
            as_sales_amt:psh.as_sales_amt,
            as_applied:psh.as_applied,
            rest:Number(psh.as_amt) - Number(psh.as_applied),
            paid:Number(psh.as_amt) - Number(psh.as_applied),
            as_date:psh.as_date,
            as_due_date:psh.as_due_date,
            as_effdate:psh.as_effdate,
            chr01:psh.chr01,
            chr02:psh.chr02,
            chr03:psh.chr03
          });
          i = i+1
          console.log(psh.as_cr_terms)
        }
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: result })
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
        const AccountShiperServiceInstance = Container.get(AccountShiperService)
        const {id} = req.params
        const accountShiper = await AccountShiperServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountShiper  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  account endpoint")
    try {
        const AccountShiperServiceInstance = Container.get(AccountShiperService)
        const {id} = req.params
        const accountShiper = await AccountShiperServiceInstance.delete({id})
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
    deleteOne,
    findByCos
}
