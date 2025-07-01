import AccountUnplanifedService from "../../services/account-unplanifed"
import BankDetailService from "../../services/bank-detail"
import BankService from "../../services/bank"
import BkhService from '../../services/bkh';
import ProviderService from "../../services/provider"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import SequenceService from "../../services/sequence"
import AccountUnplanifedDetailService from "../../services/account-unplanifed-detail"

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

const createFC = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    let nbr : String;
    let open: Boolean;
    logger.debug("Calling Create account endpoint")
    try {
       
        const accountUnplanifedServiceInstance = Container.get(AccountUnplanifedService)
        const bankServiceInstance = Container.get(BankService)
        const providerServiceInstance = Container.get(ProviderService)
        const sequenceServiceInstance = Container.get(SequenceService)
        const bkhServiceInstance = Container.get(BkhService);
        const accountUnplanifedDetailServiceInstance = Container.get(AccountUnplanifedDetailService)
        const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'AU', seq_type: 'AU' });
        let nbr = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
    await sequenceServiceInstance.update(
      { seq_curr_val: Number(seq.seq_curr_val) + 1 },
      { id: seq.id, seq_type: 'AU', seq_seq: 'AU', seq_domain: user_domain },
    );
        //let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val) + 1}`;
        const accountUnplanifed = await accountUnplanifedServiceInstance.create({...req.body.accountUnplanifed, au_nbr : nbr,au_domain : user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        const banks = await bankServiceInstance.findOne({ bk_code: req.body.accountUnplanifed.au_bank, bk_domain: user_domain });
   
        const bk = await bkhServiceInstance.create({
            bkh_domain: user_domain,
            bkh_code: nbr,
            bkh_effdate: req.body.accountUnplanifed.au_effdate,
            bkh_date: new Date(),
            bkh_num_doc : req.body.accountUnplanifed.au_so_nbr,
            bkh_addr : req.body.accountUnplanifed.au_vend,
            bkh_bank: req.body.accountUnplanifed.au_bank,
            bkh_type: 'ISS',
            bkh_balance: banks.bk_balance,
            bkh_amt: - Number(req.body.accountUnplanifed.au_amt),
            // bkh_site: req.body.site,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
          await bankServiceInstance.update(
            {
              bk_balance: Number(banks.bk_balance)  - Number(req.body.accountUnplanifed.au_amt),
  
              last_modified_by: user_code,
              last_modified_ip_adr: req.headers.origin,
            },
            { id:banks.id, bk_domain: user_domain },
          );
          for (let entry of req.body.accountUnplanifedDetail) {
            entry = { ...entry, aud_so_nbr:req.body.accountUnplanifed.au_so_nbr,aud_nbr: nbr,aud_domain:user_domain,  created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await accountUnplanifedDetailServiceInstance.create(entry)
           
            
        }

       
       
        return res
            .status(201)
            .json({ message: "created succesfully", data:  accountUnplanifed })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createFCD = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    let nbr : String;
    let open: Boolean;
    logger.debug("Calling Create account endpoint")
    try {
       
        const accountUnplanifedServiceInstance = Container.get(AccountUnplanifedService)
        const bankServiceInstance = Container.get(BankService)
        const providerServiceInstance = Container.get(ProviderService)
        const sequenceServiceInstance = Container.get(SequenceService)
        const bkhServiceInstance = Container.get(BkhService);
        const accountUnplanifedDetailServiceInstance = Container.get(AccountUnplanifedDetailService)
        const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'AU', seq_type: 'AU' });
        let nbr = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
    await sequenceServiceInstance.update(
      { seq_curr_val: Number(seq.seq_curr_val) + 1 },
      { id: seq.id, seq_type: 'AU', seq_seq: 'AU', seq_domain: user_domain },
    );
        //let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val) + 1}`;
        const accountUnplanifed = await accountUnplanifedServiceInstance.create({...req.body.accountUnplanifed, au_nbr : nbr,au_domain : user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        const banks = await bankServiceInstance.findOne({ bk_code: req.body.accountUnplanifed.au_bank, bk_domain: user_domain });
   
        const bk = await bkhServiceInstance.create({
            bkh_domain: user_domain,
            bkh_code: nbr,
            bkh_effdate: req.body.accountUnplanifed.au_effdate,
            bkh_date: new Date(),
            bkh_num_doc : req.body.accountUnplanifed.au_so_nbr,
            bkh_addr : req.body.accountUnplanifed.au_vend,
            bkh_bank: req.body.accountUnplanifed.au_bank,
            bkh_type: 'ISS',
            bkh_balance: banks.bk_balance,
            bkh_amt: - Number(req.body.accountUnplanifed.au_amt),
            bkh_terms: req.body.accountUnplanifed.au_pay_method,
            bkh_2000: req.body.BKH.bkh_2000,
            bkh_1000: req.body.BKH.bkh_1000,
            bkh_0500: req.body.BKH.bkh_0500,
            bkh_0200: req.body.BKH.bkh_0200,
            bkh_p200: req.body.BKH.bkh_p200,
            bkh_p100: req.body.BKH.bkh_p100,
            bkh_p050: req.body.BKH.bkh_p050,
            bkh_p020: req.body.BKH.bkh_p020,
            bkh_p010: req.body.BKH.bkh_p010,
            bkh_p005: req.body.BKH.bkh_p005,
            // bkh_site: req.body.site,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
          await bankServiceInstance.update(
            {
              bk_balance: Number(banks.bk_balance)  - Number(req.body.accountUnplanifed.au_amt),
              bk_2000: Number(banks.bk_2000) - Number(req.body.BKH.bkh_2000),
              bk_1000: Number(banks.bk_1000) - Number(req.body.BKH.bkh_1000),
              bk_0500: Number(banks.bk_0500) - Number(req.body.BKH.bkh_0500),
              bk_0200: Number(banks.bk_0200) - Number(req.body.BKH.bkh_0200),
              bk_p200: Number(banks.bk_p200) - Number(req.body.BKH.bkh_p200),
              bk_p100: Number(banks.bk_p100) - Number(req.body.BKH.bkh_p100),
              bk_p050: Number(banks.bk_p050) - Number(req.body.BKH.bkh_p050),
              bk_p020: Number(banks.bk_p020) - Number(req.body.BKH.bkh_p020),
              bk_p010: Number(banks.bk_p010) - Number(req.body.BKH.bkh_p010),
              bk_p005: Number(banks.bk_p005) - Number(req.body.BKH.bkh_p005),
              last_modified_by: user_code,
              last_modified_ip_adr: req.headers.origin,
            },
            { id:banks.id, bk_domain: user_domain },
          );
          for (let entry of req.body.accountUnplanifedDetail) {
            entry = { ...entry, aud_so_nbr:req.body.accountUnplanifed.au_so_nbr,aud_nbr: nbr,aud_domain:user_domain,  created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await accountUnplanifedDetailServiceInstance.create(entry)
           
            
        }

       
       
        return res
            .status(201)
            .json({ message: "created succesfully", data:    nbr})
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
    createFC,
    createFCD,
    findOne,
    findAll,
    findBy,
    update,
    deleteOne
}
