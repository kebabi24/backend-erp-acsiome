import AffectEmployeService from '../../services/affect-employe';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import RequisitionDetailService from "../../services/requisition-detail"
import ItemService from '../../services/item';
import employeService from '../../services/employe';
import AccountShiperService from "../../services/account-shiper"
import PayMethService from '../../services/pay-meth';
import PayMethDetailService from '../../services/pay-meth-detail';
const nodemailer = require('nodemailer');
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const { user_site } = req.headers;
  logger.debug('Calling Create code endpoint');
  try {
    const affectEmployeServiceInstance = Container.get(AffectEmployeService);
    const requisitionDetailServiceInstance = Container.get(
      RequisitionDetailService)
      const EmployeServiceInstance = Container.get(employeService);
      const itemServiceInstance = Container.get(ItemService);
      const accountShiperServiceInstance = Container.get(AccountShiperService)
      const payMethServiceInstance = Container.get(PayMethService);
    const payMethDetailServiceInstance = Container.get(PayMethDetailService);
    
    const { affectEmp, empDetail } = req.body;
    
    for (let entry of empDetail) {
      // console.log(affectEmp.chr04.length,affectEmp.pme_start_time)
      let weekday='';
      if (affectEmp.chr04 != null){for(let j = 0; j<affectEmp.chr04.length;j++){weekday = weekday+affectEmp.chr04[j]+','}}
      const found =  await affectEmployeServiceInstance.findOne({pme_nbr:affectEmp.pme_nbr,int01: affectEmp.int01,pme_employe:entry.pme_employe})
      
      if(found)
        {console.log('existe')
          let id = found.id
          // let testAccount = await nodemailer.createTestAccount();
          // let transporter = nodemailer.createTransport({
          //   host: 'SMTP.TITAN.EMAIL',
          //    port: 465,
          //    secure: true, // true for 465, false for other ports
          //   auth: {
          //     user: 'abdelhak.benbouzid@acsiome.tech', // generated ethereal user
          //     pass: 'A@123456789', // generated ethereal password
          //   },
          //   tls: { rejectUnauthorized: false },
          // });
          // // verify connection configuration
          // transporter.verify(function(error, success) {
          //   if (error) {
            
          //   } else {
          //     console.log('Server is ready to take our messages');
          //   }
          // });
         
          // // send mail with defined transport object
          // let mailto = await EmployeServiceInstance.findOne({emp_addr:entry.pme_employe})
          // // let mailobject = await itemServiceInstance.findOne({pt_part:affectEmp.pme_inst})
          // let info = await transporter.sendMail({
          //   from: 'abdelhak.benbouzid@acsiome.tech', // sender address
          //   to: mailto.emp_mail, // list of receivers
          //   subject: 'mail !', // Subject line
          //   text: 'mail !', // plain text body
          //   html:
          //     'Bonjour ' +
          //     entry.fname + ' ' + entry.lname +
          //     ', la session . ' + affectEmp.pme_nbr + ', à laquelle vous avez été invitée à été mise à jour avec le statut ' + affectEmp.pme_task_status +
          //     '<b>' +
              
          //     '<b>', // html body
          // });
        await affectEmployeServiceInstance.update({pme_site:affectEmp.pme_site,
          pme_duration:affectEmp.pme_duration,
          pme_pm_code: affectEmp.pme_pm_code,
          pme_domain: user_domain,
          pme_inst: affectEmp.pme_inst,
          pme_task: affectEmp.pme_task,
          pme_task_status:affectEmp.pme_task_status,
          pme_start_date: affectEmp.pme_start_date,
          pme_end_date: affectEmp.pme_end_date,
          pme_start_time: affectEmp.pme_start_time,
          pme_end_time: affectEmp.pme_end_time,
          chr04:weekday,
          chr05:entry.methode,
          int01:affectEmp.int01,
          bool01:entry.livre, 
          chr01: entry.chr01, last_modified_by: user_code }, { id });
          const rqd = await requisitionDetailServiceInstance.find({
            rqd_domain: user_domain,
            rqd_part: affectEmp.pme_inst,
            rqd_rqby_userid:entry.pme_employe,
          })
          for (let req of rqd)
          {
            let id = req.id
            await requisitionDetailServiceInstance.update({
              rqd_status:'C', last_modified_by:user_code},{id:id})
          }
      }
      else{  
    //     let testAccount = await nodemailer.createTestAccount();
    // let transporter = nodemailer.createTransport({
    //   host: 'SMTP.TITAN.EMAIL',
    //    port: 465,
    //    secure: true, // true for 465, false for other ports
    //   auth: {
    //     user: 'abdelhak.benbouzid@acsiome.tech', // generated ethereal user
    //     pass: 'A@123456789', // generated ethereal password
    //   },
    //   tls: { rejectUnauthorized: false },
    // });
    // // verify connection configuration
    // transporter.verify(function(error, success) {
    //   if (error) {
      
    //   } else {
    //     console.log('Server is ready to take our messages');
    //   }
    // });
   
    // // send mail with defined transport object
    // let mailto = await EmployeServiceInstance.findOne({emp_addr:entry.pme_employe})
    // // let mailobject = await itemServiceInstance.findOne({pt_part:affectEmp.pme_inst})
    // console.log(mailto.emp_mail)
    // let info = await transporter.sendMail({
    //   from: 'abdelhak.benbouzid@acsiome.tech', // sender address
    //   to: mailto.emp_mail, // list of receivers
    //   subject: 'mail !', // Subject line
    //   text: 'mail !', // plain text body
    //   html:
    //     'Bonjour ' +
    //     entry.fname + ' ' + entry.lname +
    //     ', vous etes invités pour la session de formation N° ' + affectEmp.pme_nbr + ', à la date du ' + affectEmp.pme_start_date +
    //     '<b>' +
        
    //     '<b>', // html body
    // });
      await affectEmployeServiceInstance.create({
        ...entry,
        pme_nbr: affectEmp.pme_nbr,
        pme_site:affectEmp.pme_site,
        pme_duration:affectEmp.pme_duration,
        pme_pm_code: affectEmp.pme_pm_code,
        pme_domain: user_domain,
        pme_inst: affectEmp.pme_inst,
        pme_task: affectEmp.pme_task,
        pme_task_status:affectEmp.pme_task_status,
        pme_start_date: affectEmp.pme_start_date,
        pme_end_date: affectEmp.pme_end_date,
        pme_start_time: affectEmp.pme_start_time,
        pme_end_time: affectEmp.pme_end_time,
        chr01:entry.chr01,
        chr02:entry.fname,
        chr03:entry.lname,
        chr04:weekday,
        chr05:entry.methode,
        int01:affectEmp.int01,
        bool01:entry.livre,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      
      let eff_date = new Date()
      if(eff_date < affectEmp.pme_end_date) {eff_date = affectEmp.pme_end_date}
      let year1 = new Date(affectEmp.pme_end_date).getFullYear()
      let year2 = new Date(eff_date).getFullYear()
      let date1 = new Date(affectEmp.pme_end_date).getMonth()
      let date2 = new Date(eff_date).getMonth()
      console.log(date1,date2)
      if (year1 != year2) {date1 = Number(date1) + 12}
      let nbr =  Number(date1) - Number(date2)
      console.log(nbr)
      
     
      
      if(Number(eff_date.getDate) > 10){nbr  = nbr - 1}
      if(entry.livre == true) {
        const part = await itemServiceInstance.findOne({pt_part_type:'LIVRE',pt_domain:user_domain})
          console.log(part.pt_price)
        const accountShiper = await accountShiperServiceInstance.create({as_entity:user_site,as_app_owner:entry.fname + ' ' + entry.lname,as_nbr: affectEmp.pme_nbr + '-' + 'LIVRE' + '-' + entry.pme_employe,as_ship: affectEmp.pme_nbr + '-LIVRE' + '-' + entry.pme_employe,as_bill:'CL006',as_cust:'CL006',as_type:'I',as_so_nbr:'',as_effdate:date2,as_due_date:eff_date,as_cr_terms:entry.chr05,as_amt:part.pt_price,as_curr:'DA',as_domain : user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
      }
      if(entry.methode == null || entry.methode == '')
      {for (let i = 1; i <= nbr;i++ ) {
        const part = await itemServiceInstance.findOne({pt_part:affectEmp.pme_inst,pt_domain:user_domain})
        console.log(part.pt_price)
        const accountShiper = await accountShiperServiceInstance.create({as_entity:user_site,as_app_owner:entry.fname + ' ' + entry.lname,as_nbr: affectEmp.pme_nbr + '-' + affectEmp.int01 + '-' + entry.pme_employe + '-' + i,as_ship: affectEmp.pme_nbr + '-' +  affectEmp.int01 + '-' + entry.pme_employe,as_bill:'CL006',as_cust:'CL006',as_type:'I',as_so_nbr:'',as_effdate:date2,as_due_date:eff_date,as_cr_terms:'ES',as_amt:part.pt_price,as_curr:'DA',as_domain : user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        eff_date.setDate(eff_date.getDate() + 30);
    } }
    else{
      const PayMeth = await payMethServiceInstance.findOne({
        ct_domain: user_domain,
        ct_code: entry.methode,
      });
      if (PayMeth){
        const details = await payMethDetailServiceInstance.find({
          ctd_domain: user_domain,
          ctd_code: PayMeth.ct_code,
        });
        let i = 0;
        for (let det of details) {
          const part = await itemServiceInstance.findOne({pt_part:affectEmp.pme_inst,pt_domain:user_domain})
          console.log(part.pt_price)
          i = i + 1;
          const effdate = new Date(affectEmp.pme_start_date);
          effdate.setDate(effdate.getDate() + Number(det.ctd_due_day));
          const accountShiper = await accountShiperServiceInstance.create({as_entity:user_site,as_app_owner:entry.fname + ' ' + entry.lname,as_nbr: affectEmp.pme_nbr + '-' + affectEmp.int01 + '-' + entry.pme_employe + '-' + i,as_ship: affectEmp.pme_nbr + '-' + affectEmp.int01 + '-' + entry.pme_employe,as_bill:'CL006',as_cust:'CL006',as_type:'I',as_so_nbr:'',as_effdate:date2,as_due_date:eff_date,as_cr_terms:entry.chr05,as_amt:part.pt_price,as_curr:'DA',as_domain : user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        
      } 
    }
   else{ 
    const part = await itemServiceInstance.findOne({pt_part:affectEmp.pme_inst,pt_domain:user_domain})
        console.log(part.pt_price)
    let i = 1; 
    const accountShiper = await accountShiperServiceInstance.create({as_entity:user_site,as_app_owner:entry.fname + ' ' + entry.lname,as_nbr: affectEmp.pme_nbr + '-' + affectEmp.int01 + '-' + entry.pme_employe + '-' + i,as_ship: affectEmp.pme_nbr + '-' + affectEmp.int01 + '-' + entry.pme_employe,as_bill:'CL006',as_cust:'CL006',as_type:'I',as_so_nbr:'',as_effdate:date2,as_due_date:eff_date,as_cr_terms:entry.chr05,as_amt:part.pt_price,as_curr:'DA',as_domain : user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
  }
    }
          const details = await requisitionDetailServiceInstance.find({
        rqd_domain: user_domain,
        rqd_part: affectEmp.pme_inst,
        rqd_rqby_userid:entry.pme_employe,
      })
      for (let req of details)
      {
        let id = req.id
        await requisitionDetailServiceInstance.update({
          rqd_status:'C', last_modified_by:user_code},{id:id})
      }
      }
      // for (let entry of empDetail) {
      //   await affectEmployeServiceInstance.create({
      //     ...entry,
      //     pme_nbr: nbr,
      //   pme_site:affectEmp.pmr_site,
      //   pme_duration:affectEmp.pmr_duration,
      //     pme_pm_code: affectEmp.pme_pm_code,
      //     pme_domain: user_domain,
      //     pme_inst: affectEmp.pme_inst,
      //     pme_task: affectEmp.pme_task,
      //     pme_start_date: affectEmp.pme_start_date,
      //     pme_end_date: affectEmp.pme_end_date,
      //     pme_start_time: affectEmp.pme_start_time,
      //     pme_end_time: affectEmp.pme_end_time,
      //     created_by: user_code,
      //     created_ip_adr: req.headers.origin,
      //     last_modified_by: user_code,
      //     last_modified_ip_adr: req.headers.origin,
      //   });
      // }
      //  const affectemploye = await affectEmployeServiceInstance.create({...req.body, created_by: user_code, last_modified_by: user_code})
      
    }
    return res.status(201).json({ message: 'created succesfully', data: affectEmp });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const affectEmployeServiceInstance = Container.get(AffectEmployeService);
    const { id } = req.params;
    const employe = await affectEmployeServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const affectEmployeServiceInstance = Container.get(AffectEmployeService);
    const employe = await affectEmployeServiceInstance.find({ pme_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');

  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const { user_site } = req.headers;
  
  try {
    const affectEmployeServiceInstance = Container.get(AffectEmployeService);
    const itemServiceInstance = Container.get(ItemService);
    const employeServiceInstance = Container.get(employeService);
    const employe = await affectEmployeServiceInstance.find({...req.body,  pme_domain: user_domain });
    let result = [];
    let i = 1;
    console.log(req.body)
    for(let emp of employe)
      {const item = await itemServiceInstance.find({pt_domain:user_domain, pt_part:emp.pme_inst}) 
   
    const collaborateur = await employeServiceInstance.find({emp_domain:user_domain, emp_addr:emp.pme_employe}) 
    if(collaborateur[0].emp_site == user_site ||user_site == '*')
    {console.log(user_site)
      result.push({
      id: i,
      pme_nbr:emp.pme_nbr,
      pme_pm_code:emp.pme_pm_code,
      pme_site:emp.pme_site,
      pme_inst:emp.pme_inst,
      price:item[0].pt_price,
      pme_task:emp.pme_task,
      pme_task_status:emp.pme_task_status,
      pme_start_date:emp.pme_start_date,
      pme_end_date:emp.pme_end_date,
      pme_employe:emp.pme_employe,
      pme_cmt:emp.pme_cmt,
      chr02:emp.chr02,
      chr03:emp.chr03,
      chr05:emp.chr05,
      int01:emp.int01,
      log01:emp.bool01,
      site:collaborateur[0].emp_site,
      service:collaborateur[0].emp_job,
    });
    i = i + 1}
  }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByglobal = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');

  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const { user_site } = req.headers;
  
  try {
    console.log(req.body)
    const affectEmployeServiceInstance = Container.get(AffectEmployeService);
    const itemServiceInstance = Container.get(ItemService);
    const employeServiceInstance = Container.get(employeService);
    const employe = await affectEmployeServiceInstance.findspecial({ where: {...req.body,
      pme_domain:user_domain,
      
    },
    attributes: ['pme_nbr', 'pme_pm_code', 'pme_site','pme_inst','pme_task',
      
      'pme_task_status',
      'pme_start_date',
      'pme_end_date',
      'pme_start_time',
      'pme_duration',
      'chr04',
      'int01',
    ],
    group: ['pme_nbr','pme_pm_code','pme_site','pme_inst','pme_task','pme_task_status','pme_start_date','pme_end_date','pme_start_time','pme_duration','chr04','int01'],
    raw: true, });
     
    let result = [];
    let i = 1;
     for(let emp of employe)
      {const item = await itemServiceInstance.find({pt_domain:user_domain, pt_part:emp.pme_inst}) 
     
     
    // const collaborateur = await employeServiceInstance.find({emp_domain:user_domain, emp_addr:emp.pme_employe}) 
    // if(collaborateur[0].emp_site == user_site ||user_site == '*')
    console.log(user_site)
    if(item[0].pt_site == user_site || user_site == '*')
    {result.push({
      id: i,
      pme_nbr:emp.pme_nbr,
      pme_pm_code:emp.pme_pm_code,
      pme_site:emp.pme_site,
      pme_inst:emp.pme_inst,
      price:item[0].pt_price,
      pme_task:emp.pme_task,
      pme_task_status:emp.pme_task_status,
      pme_start_date:emp.pme_start_date,
      pme_end_date:emp.pme_end_date,
      pme_start_time:emp.pme_start_time,
      pme_duration:emp.pme_duration,
      pme_employe:emp.pme_employe,
      pme_cmt:emp.pme_cmt,
      chr04:emp.chr04,
      chr02:emp.chr02,
      chr03:emp.chr03,
      int01:emp.int01,
    });
    i = i + 1
  }
  }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const affectEmployeServiceInstance = Container.get(AffectEmployeService);
    const { id } = req.params;
    const employe = await affectEmployeServiceInstance.update({ ...req.body, last_modified_by: user_code }, { id });
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  code endpoint');
  try {
    const affectEmployeServiceInstance = Container.get(AffectEmployeService);
    const { id } = req.params;
    const employe = await affectEmployeServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  findOne,
  findAll,
  findBy,
  findByglobal,
  update,
  deleteOne,
};
