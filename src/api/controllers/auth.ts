import UserService from "../../services/user"
import DomainService from "../../services/domain"
import CustomerService from '../../services/customer';
import addresseService from '../../services/address';
import CodeService from "../../services/code"
import UserMobileService from '../../services/user-mobile';
import crmService from '../../services/crm';
import SequenceService from '../../services/sequence';
import EmployeService from "../../services/employe"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import CryptoJS from "../../utils/CryptoJS";
import {QueryTypes} from 'sequelize'
import configService from "../../services/config";
var Crypto = require('crypto');
const login = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling login endpoint")
   
    try {
        
        // const fs = require('node:fs');
        const fs = require('fs/promises');
        const keydata = await fs.readFile('key.key', { encoding: 'utf8'});
        const userServiceInstance = Container.get(UserService)
        const domainServiceInstance = Container.get(DomainService)
        const { userName, password , key} = req.body
        const user = await userServiceInstance.findOne({
            usrd_user_name: userName,
        })
        // if (await argon2.verify(keydata, key)) {
            if (keydata ==  key) {
        if (!user)
            return res
                .status(401)
                .json({ message: "user not found", data: null })

        if (await argon2.verify(user.usrd_pwd, password)) {
           
            const token = jwt.sign({ user: user.id }, "acsiome")
            const domain = await domainServiceInstance.findOne({
                dom_domain: user.usrd_domain,
            })
            return res
                .status(200)
                .json({ message: "succesfully", data: { user, token,domain } })
        } else
            return res
                .status(401)
                .json({ message: "password error", data: null })
    }else {
        return res
        .status(401)
        .json({ message: "Activation Error", data: null })
    }        
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling login endpoint")
   
    try {
        
        const userServiceInstance = Container.get(UserService)

        const {data} = req.body
        const { user_code } = req.headers;

        const customerServiceInstance = Container.get(CustomerService);
        const adresseServiceInstance = Container.get(addresseService);

        const addr = await adresseServiceInstance.create({
            ad_addr: data.phone,
            ad_name: data.name,
            ad_line1: data.wilaya,
            ad_line2: data.commune,
            ad_type: 'OPN',
            ad_ref : data.gender,
            ad_ext : data.email,
            // ad_format : data.age,
            

            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
        });
        
        const customerr = await customerServiceInstance.create({
            cm_addr: data.phone,
            cm_sort: data.name,
            cm_high_date: data.birthdate,
            cm_promo : data.promo_code,
            cm_disc_pct: data.discount_pct,
            cm_type: 'OPN',
            // wilaya ; commune , sexe , email , age 

            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
        });

        // ADD TO AGENDA 
        const crmServiceInstance = Container.get(crmService)
        const sequenceServiceInstance = Container.get(SequenceService);
        const param = await crmServiceInstance.getParamFilterd("new_client",'')
        const paramDetails  = await crmServiceInstance.getParamDetails({param_code : param.param_code})
        const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB()
        const addLine = await crmServiceInstance.createAgendaLine(data.phone,param,paramDetails, sequence,'')   
        
        

        let returned_client = {
            cm_addr: customerr.cm_addr,
            cm_sort: customerr.cm_sort,
            cm_high_date: customerr.cm_high_date,
            cm_promo : customerr.cm_promo,
            cm_disc_pct: customerr.cm_disc_pct,
            cm_type: 'OPN',   
        }

        return res
                .status(200)
                .json({ message: "customer created", data: returned_client })

       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const getCustomerPhone = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getCustomerPhone endpoint")
    try {
        
        const userServiceInstance = Container.get(UserService)

        const {phone} = req.params
        const phoneNb = await userServiceInstance.getPhone(phone)
        
        return res
                .status(200)
                .json({ message: "phone results", data: phoneNb })

       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const verifypwd = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling login endpoint")

    try {
       
        const userServiceInstance = Container.get(UserService)
        const { userName, password } = req.body
        
        const user = await userServiceInstance.findOne({
            usrd_user_name: userName,
        })
        if (!user)
            return res
                .status(401)
                .json({ message: "user not found", data: null })
        if (argon2.verify(user.usrd_pwd, password)) {
            const token = jwt.sign({ user: user.id }, "acsiome")
            return res
                .status(200)
                .json({ message: "succesfully", data: { user, token } })
        } else
            return res
                .status(401)
                .json({ message: "password error", data: null })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")
   
    logger.debug("Calling login endpoint")
    const { user_code } = req.headers;
    const { user_domain } = req.headers;
    try {
        
        const userServiceInstance = Container.get(UserService)
        const configServiceInstance = Container.get(configService)
        const sequenceServiceInstance = Container.get(SequenceService)
console.log('user_code',user_code)
const config = await configServiceInstance.findOne({});
        // const purchase_orders = await userServiceInstance.getNewPurchaseOrders()
        // console.log(config.cfg_threshold_user.indexOf(user_code))
        if(config.cfg_threshold_user != null) {
        if (config.cfg_threshold_user.indexOf(user_code) !== -1) {
        
          var purchase_orders = await sequelize.query("select public.po_mstr.id as id, po_nbr, po_vend, po_ord_date from public.po_mstr where (po_stat != 'V' or po_stat isNull) and po_amt  >=  ? order by po_ord_date ASC", { replacements: [config.cfg_po_threshold],type: QueryTypes.SELECT })
        } else {
            purchase_orders = []
        }
    } else {
        purchase_orders = []
    }
        // const orders = await userServiceInstance.getNewOrders()
        const seqs = await sequelize.query("select seq_seq,seq_appr1,seq_appr1_lev,seq_appr2,seq_appr2_lev,seq_appr3,seq_appr3_lev from public.seq_mstr where (seq_appr1 = ? or seq_appr2 = ? or seq_appr3 = ?)", { replacements: [user_code,user_code,user_code], type: QueryTypes.SELECT });
        let usrs = []
 for (let seq of seqs) {
    if(seq.seq_appr1 == user_code) {
        usrs.push({user:seq.seq_appr1,level:Number(seq.seq_appr1_lev),seq:seq.seq_seq})
    }
    if(seq.seq_appr2 == user_code) {
        usrs.push({user:seq.seq_appr2,level:Number(seq.seq_appr2_lev),seq:seq.seq_seq})
    }
    if(seq.seq_appr3 == user_code) {
        usrs.push({user:seq.seq_appr3,level:Number(seq.seq_appr3_lev),seq:seq.seq_seq})
    }
 }
 
        let reqs = []
        for(let usr of usrs) {
            const req_approvals = await sequelize.query("select public.rqm_mstr.id as id, rqm_nbr, rqm_category, rqm_req_date,rqm_aprv_stat from public.rqm_mstr where  rqm_category = ? and rqm_aprv_stat < ? ", { replacements: [usr.seq,usr.level],  type: QueryTypes.SELECT })
            for (let req_approval of req_approvals ){
                const indexpart =  reqs.findIndex(({ rqm_nbr}) => rqm_nbr == req_approval.rqm_nbr);
                if (indexpart<0) {
                    reqs.push({id:req_approval.id, rqm_nbr:req_approval.rqm_nbr, rqm_category:req_approval.rqm_category, rqm_req_date:req_approval.rqm_req_date,rqm_aprv_stat:req_approval.rqm_aprv_stat})
                }
            }
    }
        // const req_approval = await userServiceInstance.getreqapprovals(user_code)
        console.log(reqs.length)
        return res
                .status(200)
                .json({ message: "new orders", data: {purchase_orders ,reqs} })

       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
} 

const getWilayasCommunes= async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getWilayasCommunes endpoint")
    try {
        
        const codeServiceInstance = Container.get(CodeService)


         let wilayas = await codeServiceInstance.getWilayas({code_fldname : "ad_state"})
         let results = []
         
         for(const wilaya of wilayas){
            const communes =  await codeServiceInstance.getCommunes({code_fldname : "ad_city", chr01 : wilaya.code_value})
            results.push({wilaya, communes})
         }
         
        
        return res
                .status(200)
                .json({ message: "wilayas & communes", data: results })

       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const getValidePromo= async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getValidePromo endpoint")
    try {
        
        const codeServiceInstance = Container.get(CodeService)


         let promo = await codeServiceInstance.getValidePromo()
        
    
        return res
                .status(200)
                .json({ message: "promo", data: promo })

       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const loginMobile = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling login endpoint")
   
    try {
        
        const userServiceInstance = Container.get(UserMobileService)
        const employeServiceInstance = Container.get(EmployeService)
        // const domainServiceInstance = Container.get(DomainService)\
        console.log(req.body , "here")
        const { userName, password } = req.body
        const user = await userServiceInstance.findOne({
            user_mobile_code: userName,
        })
        
        if (!user)
            return res
                .status(401)
                .json({ message: "user not found", data: null })

                let decrypt= CryptoJS.AES.decrypt(user.password,'b4cb72173ee45d8c7d188e8f77eb16c2').toString(CryptoJS.enc.Utf8);
            //    console.log('decrypt',decrypt)
        if (decrypt == password) {

            
            const token = jwt.sign({ user: user.id }, "acsiome")
            const menus = await userServiceInstance.getMenus({ profile_code: user.profile_code });
            const employe = await employeServiceInstance.findOne({ emp_userid: user.user_mobile_code });
            // const domain = await domainServiceInstance.findOne({
            //     dom_domain: user.usrd_domain,
            // })
          
            return res
                .status(200)
                .json({ message: "succesfully", data: { user, token,menus,employe } })
        } else
            return res
                .status(401)
                .json({ message: "error password", data: null })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


export default {
    login,
    verifypwd,
    createCustomer,
    getCustomerPhone,
    getNotifications,
    getWilayasCommunes,
    getValidePromo,
    loginMobile,
    
}
