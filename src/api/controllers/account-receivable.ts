import AccountReceivableService from "../../services/account-receivable"
import AccountReceivableDetailService from "../../services/account-receivable-detail"
import BankDetailService from "../../services/bank-detail"
import CustomerService from "../../services/customer"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import GeneralLedgerService from "../../services/general-ledger"
import SequenceService from "../../services/sequence"
import BkhService from '../../services/bkh';
import BankService from "../../services/bank"
import moment from 'moment';
import { Op, Sequelize } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create account endpoint")
    try {
        const AccountReceivableServiceInstance = Container.get(AccountReceivableService)
        const accountReceivable = await AccountReceivableServiceInstance.create({...req.body,ar_domain : user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountReceivable })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createNote = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create account endpoint")
    try {
        const AccountReceivableServiceInstance = Container.get(AccountReceivableService)
        const customerServiceInstance = Container.get(CustomerService)
        const bankDetailServiceInstance = Container.get(
            BankDetailService
        )
        const { accountReceivable, gldetail } = req.body
        const bkd = await bankDetailServiceInstance.findOne({bkd_bank: accountReceivable.ar_bank,bkd_domain : user_domain, bkd_module: "AR", bkd_pay_method: accountReceivable.ar_cr_terms})
        let nextck = bkd.bkd_next_ck
        const bkdup = await bankDetailServiceInstance.update ({bkd_next_ck: Number(bkd.bkd_next_ck) + 1},{id:bkd.id})
        let nbr = nextck + " " + accountReceivable.ar_bill
        const ar = await AccountReceivableServiceInstance.create({...accountReceivable, Receivablnbr: nbr,ar_domain : user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
       
       
       
        const cm = await customerServiceInstance.findOne ({cm_addr: accountReceivable.ar_bill,cm_domain : user_domain,})
            
        const cmu = await customerServiceInstance.update ({cm_balance: Number(cm.cm_balance) + Number(accountReceivable.ar_base_amt),},{id:cm.id})
       
        return res
            .status(201)
            .json({ message: "created succesfully", data:  ar })
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
        const accountReceivableServiceInstance = Container.get(AccountReceivableService)
        const accountReceivableDetailServiceInstance = Container.get(
            AccountReceivableDetailService
        )
        const bankDetailServiceInstance = Container.get(
            BankDetailService
        )
        const customerServiceInstance = Container.get(CustomerService)
        const generalLedgerServiceInstance = Container.get(GeneralLedgerService)
        const bkhServiceInstance = Container.get(BkhService);
        const bankServiceInstance = Container.get(BankService)
        const { accountReceivable, accountReceivableDetail , gldetail} = req.body
        
       console.log(accountReceivable)
        const bkd = await bankDetailServiceInstance.findOne({bkd_bank: accountReceivable.ar_bank, bkd_domain :user_domain, bkd_module: "AR", bkd_pay_method: accountReceivable.ar_cr_terms})
        let nextck = bkd.bkd_next_ck
        const bkdup = await bankDetailServiceInstance.update ({bkd_next_ck: Number(bkd.bkd_next_ck) + 1},{id:bkd.id})
        let nbr = nextck + " " + accountReceivable.ar_bill
        const ar = await accountReceivableServiceInstance.create({...accountReceivable,ar_cust: accountReceivable.ar_bill,ar_date:new Date(), ar_domain : user_domain,ar_nbr: nbr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
        const cm = await customerServiceInstance.findOne ({cm_addr: accountReceivable.ar_bill,cm_domain : user_domain,})
            
        const cmu = await customerServiceInstance.update ({cm_balance: Number(cm.cm_balance) + Number(accountReceivable.ar_base_amt),},{id:cm.id})
    
        
        for (let entry of accountReceivableDetail) {
            entry = { ...entry, ard_nbr: ar.ar_nbr,ard_domain : user_domain, ard_amt: entry.applied, ard_cur_amt:entry.applied * entry.ard_ex_rate2 / entry.ard_ex_rate , created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await accountReceivableDetailServiceInstance.create(entry)
           
            if (entry.ard_type != "U") {
            const arI = await accountReceivableServiceInstance.findOne ({ar_nbr: entry.ard_ref, ar_domain : user_domain,ar_type: "I", ar_bill:ar.ar_bill})
            
            var bool = true
            if( Number(arI.ar_applied) + Number(entry.ard_amt) == Number(arI.ar_amt)) { bool = false}
            const arInv = await accountReceivableServiceInstance.update ({ar_applied: Number(arI.ar_applied) + Number(entry.ard_amt), ar_base_applied: Number(arI.ar_base_applied) + (Number(entry.ard_amt) * Number(entry.ard_ex_rate2) / Number(entry.ard_ex_rate)), ar_open : bool},{id:arI.id})
            }
        }
        /*detail paiement*/
        const banks = await bankServiceInstance.findOne({ bk_code: accountReceivable.ar_bank, bk_domain: user_domain });
   
        const bk = await bkhServiceInstance.create({
            bkh_domain: user_domain,
            bkh_code: nbr,
            bkh_effdate: accountReceivable.ar_effdate,
            bkh_date: new Date(),
            bkh_num_doc : nbr,
            bkh_addr : accountReceivable.ar_bill,
            bkh_bank: accountReceivable.ar_bank,
            bkh_type: 'RCT',
            bkh_balance: banks.bk_balance,
            bkh_amt: - Number(accountReceivable.ar_base_amt),
            bkh_terms:accountReceivable.ar_cr_terms,
            bkh_site: accountReceivable.ar_site,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
          await bankServiceInstance.update(
            {
              bk_balance: Number(banks.bk_balance)  - Number(accountReceivable.ar_base_amt),
  
              last_modified_by: user_code,
              last_modified_ip_adr: req.headers.origin,
            },
            { id:banks.id, bk_domain: user_domain },
          );
        /*detail paiement*/
         /***************GL *************/
         if(gldetail.length > 0) {
            const gl = await generalLedgerServiceInstance.findLastId({glt_domain : user_domain,glt_date: date})
            if(gl) {
              var seq =  gl.glt_ref.substring(10, 18)
           var d = Number(seq) + 1
           
           var seqchar = ("000000" + d).slice(-6);
           
           var ref = "AR" + moment().format('YYYYMMDD') + seqchar ;
           } else {
    
               
               var ref = "AR"  + moment().format('YYYYMMDD') + "000001" ;
              // return year +  month + day;
             
    
           }
           const effdate = new Date(accountReceivable.ar_effdate)
           for (let entry of gldetail) {
            let debit = 0;
            let credit = 0
            if(entry.glt_amt < 0){credit = -entry.glt_amt}else{debit = entry.glt_amt}
            await generalLedgerServiceInstance.create({...entry,glt_ref: ref,
                glt_domain: user_domain,
                glt_addr: accountReceivable.ar_bill,
                glt_curr: accountReceivable.ar_curr,
                glt_tr_type: "AR",
                // glt_dy_code: accountReceivable.ar_dy_code,
                glt_ex_rate: accountReceivable.ar_ex_rate,
                glt_ex_rate2: accountReceivable.ar_ex_rate2,
                glt_doc: accountReceivable.ar_check,
                glt_effdate: accountReceivable.ar_effdate,
                glt_entity: accountReceivable.ar_entity,
                glt_year: effdate.getFullYear(),
                dec01:debit,
                dec02:credit,
                //glt_curr_amt: (Number(entry.glt_amt)) * Number(accountPayable.ar_ex_rate2) /  Number(accountPayable.ar_ex_rate)   ,
                glt_date: date, created_by: user_code, last_modified_by: user_code})
           
           }
      }
      /***************GL *************/
     
        return res
            .status(201)
            .json({ message: "created succesfully", data: ar })
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
        const accountReceivableServiceInstance = Container.get(AccountReceivableService)
        const accountReceivableDetailServiceInstance = Container.get(
            AccountReceivableDetailService
        )
        const bankDetailServiceInstance = Container.get(
            BankDetailService
        )
        const generalLedgerServiceInstance = Container.get(GeneralLedgerService)
        const { accountReceivable, accountReceivableDetail,gldetail } = req.body
        
       
        const arf = await accountReceivableServiceInstance.findOne({id: accountReceivable.id})
        const ar = await accountReceivableServiceInstance.update({ar_applied: Number(arf.ar_applied) + Number(accountReceivable.ar_applied), ar_base_applied: Number(arf.ar_base_applied) + Number(accountReceivable.ar_base_applied),ar_open: accountReceivable.ar_open,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id:arf.id})
        for (let entry of accountReceivableDetail) {
            entry = { ...entry, ard_nbr: ar.ar_nbr, ard_domain : user_domain,ard_amt: entry.applied, ard_cur_amt:entry.applied * entry.ard_ex_rate2 / entry.ard_ex_rate , created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            if (entry.ard_type != "U") {
                await accountReceivableDetailServiceInstance.create(entry)

            const arI = await accountReceivableServiceInstance.findOne ({ar_nbr: entry.ard_ref,ar_domain : user_domain, ar_type: "I", ar_bill:arf.ar_bill})
            
            
            var bool = true
            if( Number(arI.ar_applied) + Number(entry.ard_amt) == Number(arI.ar_amt)) { bool = false}
            const arInv = await accountReceivableServiceInstance.update ({ar_applied: Number(arI.ar_applied) + Number(entry.ard_amt), ar_base_applied: Number(arI.ar_base_applied) + (Number(entry.ard_amt) * Number(entry.ard_ex_rate2) / Number(entry.ard_ex_rate)), ar_open : bool},{id:arI.id})
            }
            else {
                const arU = await accountReceivableDetailServiceInstance.findOne ({ard_nbr: arf.ar_nbr,ard_domain : user_domain, ard_type: "U"})
                await accountReceivableDetailServiceInstance.update({ard_amt : Number(arU.ard_amt) + entry.applied},{id:arU.id})


            }
        }
        /***************GL *************/
        if(gldetail.length > 0) {
            const gl = await generalLedgerServiceInstance.findLastId({glt_domain : user_domain,glt_date: date})
            if(gl) {
              var seq =  gl.glt_ref.substring(10, 18)
           var d = Number(seq) + 1
           
           var seqchar = ("000000" + d).slice(-6);
           
           var ref = "AR" + moment().format('YYYYMMDD') + seqchar ;
           } else {
    
               
               var ref = "AR"  + moment().format('YYYYMMDD') + "000001" ;
              // return year +  month + day;
             
    
           }
           const effdate = new Date(accountReceivable.ar_effdate)
           for (let entry of gldetail) {
            let debit = 0;
            let credit = 0
            if(entry.glt_amt < 0){credit = -entry.glt_amt}else{debit = entry.glt_amt}
            await generalLedgerServiceInstance.create({...entry,glt_ref: ref,
                glt_domain: user_domain,
                glt_addr: accountReceivable.ar_bill,
                glt_curr: accountReceivable.ar_curr,
                glt_tr_type: "AR",
                // glt_dy_code: accountReceivable.ar_dy_code,
                glt_ex_rate: accountReceivable.ar_ex_rate,
                glt_ex_rate2: accountReceivable.ar_ex_rate2,
                glt_doc: accountReceivable.ar_check,
                glt_effdate: accountReceivable.ar_effdate,
                glt_entity: accountReceivable.ar_entity,
                glt_year: effdate.getFullYear(),
                dec01:debit,
                dec02:credit,
                //glt_curr_amt: (Number(entry.glt_amt)) * Number(accountPayable.ar_ex_rate2) /  Number(accountPayable.ar_ex_rate)   ,
                glt_date: date, created_by: user_code, last_modified_by: user_code})
           
           }
      }
      /***************GL *************/
        return res
            .status(201)
            .json({ message: "created succesfully", data: ar })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBywithadress = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all account endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const accountReceivableServiceInstance = Container.get(AccountReceivableService)
        const accountReceivables = await accountReceivableServiceInstance.findwithadress({...req.body,ar_domain : user_domain,})
            
        
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountReceivables })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all account endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers        
    try {
        const accountReceivableServiceInstance = Container.get(AccountReceivableService)
        const accountReceivables = await accountReceivableServiceInstance.findOne({...req.body,ar_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountReceivables })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  account endpoint")
    try {
        const AccountReceivableServiceInstance = Container.get(AccountReceivableService)
        const {id} = req.params
        const accountReceivable = await AccountReceivableServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountReceivable  })
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
        const AccountReceivableServiceInstance = Container.get(AccountReceivableService)
        const accountReceivables = await AccountReceivableServiceInstance.find({ar_domain : user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountReceivables })
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
        console.log(req.body)
        const AccountReceivableServiceInstance = Container.get(AccountReceivableService)
        const accountReceivables = await AccountReceivableServiceInstance.find({...req.body,ar_domain:user_domain})
       console.log(accountReceivables)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountReceivables })
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
        const AccountReceivableServiceInstance = Container.get(AccountReceivableService)
        const {id} = req.params
        const accountReceivable = await AccountReceivableServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: accountReceivable  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  account endpoint")
    try {
        const AccountReceivableServiceInstance = Container.get(AccountReceivableService)
        const {id} = req.params
        const accountReceivable = await AccountReceivableServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByRange = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all account endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers 
    try {
        let i = 0
 let result = []
        console.log(req.body)
        const AccountReceivableServiceInstance = Container.get(AccountReceivableService)
        const arb = await AccountReceivableServiceInstance.findS({
            where: {  ar_bill:req.body.cust,ar_effdate: { [Op.lte]: req.body.date}},
            attributes: 
            ['ar_bill', [Sequelize.fn('sum', Sequelize.col('ar_base_amt')), 'soldinit' ]],
            group: ['ar_bill'],
            raw: true,
        })
// console.log(arb[0].soldinit)
let soldinit = (arb.length > 0 ) ? Number(arb[0].soldinit) : 0
 console.log(soldinit)
 result.push({
    id : i,
    bill : req.body.cust,
    nbr:"Solde Initial",
    solde : soldinit,
    debit: 0,
    credit:0
 })
 i = i + 1
        const accountReceivables = await AccountReceivableServiceInstance.findS({
            where: {  ar_bill:req.body.cust,ar_effdate: { [Op.between]: [req.body.date, req.body.date1]}},
            order: [['id', 'ASC']],

        })
        let sold = Number(soldinit)
        for (let ar of accountReceivables ) {
            sold = sold + Number(ar.ar_base_amt)
            result.push({
                id: i,
                bill  : req.body.cust,
                nbr : ar.ar_nbr,
                po : ar.ar_po,
                date : ar.ar_effdate,
                debit:(ar.ar_type == 'I') ? Number(ar.ar_base_amt) : 0,
                credit:(ar.ar_type == 'P') ? Number(ar.ar_base_amt) : 0,
                type : ar.ar_type,
                solde : sold
            })
            i ++
        }

     //  console.log(result)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: result })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
export default {
    create,
    createP,
    createUP,
    createNote,
    findOne,
    findBywithadress,
    findByOne,
    findAll,
    findBy,
    findByRange,
    update,
    deleteOne
}
