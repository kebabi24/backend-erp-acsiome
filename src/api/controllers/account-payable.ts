import AccountPayableService from "../../services/account-payable"
import AccountPayableDetailService from "../../services/account-payable-detail"
import BankDetailService from "../../services/bank-detail"
import ProviderService from "../../services/provider"
import GeneralLedgerService from "../../services/general-ledger"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
import account from "./account"
import moment from 'moment';
import user from "./user"


const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create account endpoint")
    try {
        const AccountPayableServiceInstance = Container.get(AccountPayableService)
        const accountPayable = await AccountPayableServiceInstance.create({...req.body,created_by:user_code,ap_domain : user_domain,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountPayable })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createNote = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers
    const  date = new Date();
    logger.debug("Calling Create account endpoint")
    try {
        const AccountPayableServiceInstance = Container.get(AccountPayableService)
        const providerServiceInstance = Container.get(ProviderService)
        const generalLedgerServiceInstance = Container.get(GeneralLedgerService)
        const bankDetailServiceInstance = Container.get(
            BankDetailService
        )
        const { accountPayable, gldetail } = req.body
        const bkd = await bankDetailServiceInstance.findOne({bkd_domain:user_domain,bkd_bank: accountPayable.ap_bank, bkd_module: "AP", bkd_pay_method: accountPayable.ap_cr_terms})
        let nextck = bkd.bkd_next_ck
        const bkdup = await bankDetailServiceInstance.update ({bkd_next_ck: Number(bkd.bkd_next_ck) + 1},{id:bkd.id})
        let nbr = nextck + " " + accountPayable.ap_vend
      
        const ap = await AccountPayableServiceInstance.create({...accountPayable, ap_nbr: nbr,created_by:user_code,ap_domain : user_domain,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
       
       
       
        const vd = await providerServiceInstance.findOne ({vd_addr: accountPayable.ap_vend,vd_domain : user_domain})
            
        const vdu = await providerServiceInstance.update ({vd_balance: Number(vd.vd_balance) + Number(accountPayable.ap_base_amt),},{id:vd.id})
       
        /***************GL *************/
        const gl = await generalLedgerServiceInstance.findLastId({glt_domain:user_domain,glt_date: date})
        if(gl) {
          var seq =  gl.glt_ref.substring(10, 18)
       var d = Number(seq) + 1
       
       var seqchar = ("000000" + d).slice(-6);
       
       var ref = "AP" + moment().format('YYYYMMDD') + seqchar ;
       } else {

           
           var ref = "AP"  + moment().format('YYYYMMDD') + "000001" ;
          // return year +  month + day;
         

       }
       const effdate = new Date(accountPayable.ap_effdate)       
       for (let entry of gldetail) {
       let debit = 0;
       let credit = 0
       if(entry.glt_amt < 0){credit = -entry.glt_amt}else{debit = entry.glt_amt}
        await generalLedgerServiceInstance.create({...entry,glt_ref: ref,
            glt_domain:user_domain,
            glt_addr: accountPayable.ap_vend,
            glt_curr: accountPayable.ap_curr,
            glt_tr_type: "AP",
            glt_dy_code: accountPayable.ap_dy_code,
            glt_ex_rate: accountPayable.ap_ex_rate,
            glt_ex_rate2: accountPayable.ap_ex_rate2,
            glt_doc: nbr,
            glt_effdate: accountPayable.ap_effdate,
            glt_year: effdate.getFullYear(),
            dec01:debit,
            dec02:credit,  
            //glt_curr_amt: (Number(entry.glt_amt)) * Number(accountPayable.ap_ex_rate2) /  Number(accountPayable.ap_ex_rate)   ,
            glt_date: date, created_by: user_code, last_modified_by: user_code})
       
       }
        /***************GL *************/
    
        return res
            .status(201)
            .json({ message: "created succesfully", data:  ap })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const createP = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers
    const  date = new Date();
    logger.debug("Calling Create sequence endpoint")
    try {
        const accountPayableServiceInstance = Container.get(AccountPayableService)
        const accountPayableDetailServiceInstance = Container.get(
            AccountPayableDetailService
        )
        const bankDetailServiceInstance = Container.get(
            BankDetailService
        )
        const generalLedgerServiceInstance = Container.get(GeneralLedgerService)
        const providerServiceInstance = Container.get(ProviderService)
        
        const { accountPayable, accountPayableDetail, gldetail } = req.body
        
       console.log(accountPayable.ap_bank,accountPayable.ap_cr_terms)
        const bkd = await bankDetailServiceInstance.findOne({bkd_bank: accountPayable.ap_bank, bkd_module: "AP",bkd_domain:user_domain})
        let nextck = bkd.bkd_next_ck
        const bkdup = await bankDetailServiceInstance.update ({bkd_next_ck: Number(bkd.bkd_next_ck) + 1},{id:bkd.id})
        let nbr = nextck + " " + accountPayable.ap_vend
        const ap = await accountPayableServiceInstance.create({...accountPayable, ap_nbr: nbr, created_by:user_code,ap_domain : user_domain,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
        const vd = await providerServiceInstance.findOne ({vd_addr: accountPayable.ap_vend,vd_domain : user_domain})
            
        const vdu = await providerServiceInstance.update ({vd_balance: Number(vd.vd_balance) + Number(accountPayable.ap_base_amt),},{id:vd.id})
    
        
        for (let entry of accountPayableDetail) {
            entry = { ...entry, apd_nbr: ap.ap_nbr,apd_domain:user_domain, apd_amt: entry.applied, apd_cur_amt:entry.applied * entry.apd_ex_rate2 / entry.apd_ex_rate , created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await accountPayableDetailServiceInstance.create(entry)
           
            if (entry.apd_type != "U") {
            const apI = await accountPayableServiceInstance.findOne ({ap_domain : user_domain,ap_nbr: entry.apd_ref, ap_type: "I", ap_vend:ap.ap_vend})
            
            var bool = true
            if( Number(apI.ap_applied) + Number(entry.apd_amt) == Number(apI.ap_amt)) { bool = false}
            const apInv = await accountPayableServiceInstance.update ({ap_applied: Number(apI.ap_applied) + Number(entry.apd_amt), ap_base_applied: Number(apI.ap_base_applied) + (Number(entry.apd_amt) * Number(entry.apd_ex_rate2) / Number(entry.apd_ex_rate)), ap_open : bool},{id:apI.id})
            }
        }

          /***************GL *************/
            if(gldetail.length > 0) {
                const gl = await generalLedgerServiceInstance.findLastId({glt_domain : user_domain,glt_date: date})
                if(gl) {
                    var seq =  gl.glt_ref.substring(10, 18)
                var d = Number(seq) + 1
                
                var seqchar = ("000000" + d).slice(-6);
                
                var ref = "AP" + moment().format('YYYYMMDD') + seqchar ;
                } else {
        
                    
                    var ref = "AP"  + moment().format('YYYYMMDD') + "000001" ;
                    // return year +  month + day;
                
        
                }
                const effdate = new Date(accountPayable.ap_effdate)
                for (let entry of gldetail) {
                    let debit = 0;
                    let credit = 0
                    if(entry.glt_amt < 0){credit = -entry.glt_amt}else{debit = entry.glt_amt}
                await generalLedgerServiceInstance.create({...entry,glt_ref: ref,
                    glt_domain: user_domain,
                    glt_addr: accountPayable.ap_vend,
                    glt_curr: accountPayable.ap_curr,
                    glt_tr_type: "AP",
                    glt_dy_code: accountPayable.ap_dy_code,
                    glt_ex_rate: accountPayable.ap_ex_rate,
                    glt_ex_rate2: accountPayable.ap_ex_rate2,
                    glt_doc: accountPayable.ap_check,
                    glt_entity: accountPayable.ap_entity,
                    glt_effdate: accountPayable.ap_effdate,
                    glt_year: effdate.getFullYear(),
                    // glt_amt:entry.glt_amt,
                   
                    dec01:debit,
                    dec02:credit,
                    glt_curr_amt: (Number(entry.glt_amt)) * Number(accountPayable.ap_ex_rate2) /  Number(accountPayable.ap_ex_rate)   ,
                    glt_date: date, created_by: user_code, last_modified_by: user_code})
                
                }
            }    
          /***************GL *************/
      
        return res
            .status(201)
            .json({ message: "created succesfully", data: ap })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createUP = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    const  date = new Date();
    logger.debug("Calling Create sequence endpoint")
    try {
        const accountPayableServiceInstance = Container.get(AccountPayableService)
        const accountPayableDetailServiceInstance = Container.get(
            AccountPayableDetailService
        )
        const bankDetailServiceInstance = Container.get(
            BankDetailService
        )
        const generalLedgerServiceInstance = Container.get(GeneralLedgerService)
        const { accountPayable, accountPayableDetail , gldetail} = req.body
       
       
        const apf = await accountPayableServiceInstance.findOne({id: accountPayable.id,ap_domain : user_domain,})
        const ap = await accountPayableServiceInstance.update({ap_applied: Number(apf.ap_applied) + Number(accountPayable.ap_applied), ap_base_applied: Number(apf.ap_base_applied) + Number(accountPayable.ap_base_applied),ap_open: accountPayable.ap_open,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id:apf.id})
        for (let entry of accountPayableDetail) {
            entry = { ...entry,apd_domain : user_domain, apd_nbr: ap.ap_nbr, apd_amt: entry.applied, apd_cur_amt:entry.applied * entry.apd_ex_rate2 / entry.apd_ex_rate , created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            if (entry.apd_type != "U") {
                await accountPayableDetailServiceInstance.create(entry)

            const apI = await accountPayableServiceInstance.findOne ({ap_nbr: entry.apd_ref, ap_type: "I", ap_vend:apf.ap_vend,ap_domain : user_domain})
            
            
            var bool = true
            if( Number(apI.ap_applied) + Number(entry.apd_amt) == Number(apI.ap_amt)) { bool = false}
            const apInv = await accountPayableServiceInstance.update ({ap_applied: Number(apI.ap_applied) + Number(entry.apd_amt), ap_base_applied: Number(apI.ap_base_applied) + (Number(entry.apd_amt) * Number(entry.apd_ex_rate2) / Number(entry.apd_ex_rate)), ap_open : bool},{id:apI.id})
            }
            else {
                const apU = await accountPayableDetailServiceInstance.findOne ({apd_domain : user_domain,apd_nbr: apf.ap_nbr, apd_type: "U"})
                await accountPayableDetailServiceInstance.update({apd_amt : Number(apU.apd_amt) + entry.applied},{id:apU.id})


            }
        }
            /***************GL *************/
            if(gldetail.length > 0) {
                  const gl = await generalLedgerServiceInstance.findLastId({glt_domain : user_domain,glt_date: date})
                  if(gl) {
                    var seq =  gl.glt_ref.substring(10, 18)
                 var d = Number(seq) + 1
                 
                 var seqchar = ("000000" + d).slice(-6);
                 
                 var ref = "AP" + moment().format('YYYYMMDD') + seqchar ;
                 } else {
          
                     
                     var ref = "AP"  + moment().format('YYYYMMDD') + "000001" ;
                    // return year +  month + day;
                   
          
                 }
                 const effdate = new Date(accountPayable.ap_effdate)
                 for (let entry of gldetail) {
                    let debit = 0;
                    let credit = 0
                    if(entry.glt_amt < 0){credit = -entry.glt_amt}else{debit = entry.glt_amt}
                  await generalLedgerServiceInstance.create({...entry,glt_ref: ref,
                      glt_domain: user_domain,
                      glt_addr: accountPayable.ap_vend,
                      glt_curr: accountPayable.ap_curr,
                      glt_tr_type: "AP",
                      glt_dy_code: accountPayable.ap_dy_code,
                      glt_ex_rate: accountPayable.ap_ex_rate,
                      glt_ex_rate2: accountPayable.ap_ex_rate2,
                      glt_doc: accountPayable.ap_check,
                      glt_effdate: accountPayable.ap_effdate,
                      glt_entity: accountPayable.ap_entity,
                      glt_year: effdate.getFullYear(),
                      dec01:debit,
                      dec02:credit,
                      //glt_curr_amt: (Number(entry.glt_amt)) * Number(accountPayable.ap_ex_rate2) /  Number(accountPayable.ap_ex_rate)   ,
                      glt_date: date, created_by: user_code, last_modified_by: user_code})
                 
                 }
            }
            /***************GL *************/
              
        return res
            .status(201)
            .json({ message: "created succesfully", data: ap })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  account endpoint")
    try {
        const AccountPayableServiceInstance = Container.get(AccountPayableService)
        const {id} = req.params
        const accountPayable = await AccountPayableServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountPayable  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    const logger = Container.get("logger")
    logger.debug("Calling find all account endpoint")
    try {
        const AccountPayableServiceInstance = Container.get(AccountPayableService)
        const accountPayables = await AccountPayableServiceInstance.find({ap_domain : user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountPayables })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling find by  all account endpoint")
   
    try {
        const accountPayableServiceInstance = Container.get(AccountPayableService)
        const accountPayables = await accountPayableServiceInstance.find({...req.body,ap_domain : user_domain})
            
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountPayables })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findBywithadress = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling find by  all account endpoint")
   
    try {
        const accountPayableServiceInstance = Container.get(AccountPayableService)
        const accountPayables = await accountPayableServiceInstance.findwithadress({...req.body,ap_domain : user_domain})
            
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountPayables })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling find by  all account endpoint")
   
    try {
        const accountPayableServiceInstance = Container.get(AccountPayableService)
        const accountPayables = await accountPayableServiceInstance.findOne({...req.body,ap_domain : user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountPayables })
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
        const AccountPayableServiceInstance = Container.get(AccountPayableService)
        const {id} = req.params
        const accountPayable = await AccountPayableServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountPayable  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  account endpoint")
    try {
        const AccountPayableServiceInstance = Container.get(AccountPayableService)
        const {id} = req.params
        const accountPayable = await AccountPayableServiceInstance.delete({id})
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
    createNote,
    createP,
    createUP,
    findOne,
    findAll,
    findBy,
    findBywithadress,
    findByOne,
    update,
    deleteOne
}
