import TrainingcalenderService from '../../services/trainingcalender';
import CustomerService from "../../services/customer"
import RepertoryService from "../../services/repertory"
import ConfigService from '../../services/config';
import crmService from '../../services/crm';
import SequenceService from '../../services/sequence';
const nodemailer = require('nodemailer');
// const qrcode = require('qrcode-terminal');
// const { Client, LocalAuth } = require('whatsapp-web.js');




import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { QueryTypes } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
    const customerServiceInstance = Container.get(CustomerService)
    const repertoryServiceInstance = Container.get(RepertoryService)
            
    const { Trainingcalender,TrainingcalenderDetails } = req.body;
        //    Trainingcalender
      //con//sole.log(req.body)
     
    for (let entry of TrainingcalenderDetails) {

        const tc = await trainingcalenderServiceInstance.findOne({
          
            tc_year: Trainingcalender.tc_year,
            tc_site: entry.tc_site,
            tc_service: Trainingcalender.tc_service,
            tc_part: entry.tc_part,
            tc_pop: entry.tc_pop,
            tc_session_nbr: entry.tc_session_nbr,
            tc_vend: entry.tc_vend,
            tc_domain: user_domain,
          });

          if(!tc) {
            const tk = await trainingcalenderServiceInstance.create({
            ...entry,
            tc_year: Trainingcalender.tc_year,
            tc_service: Trainingcalender.tc_service,
            tc_domain: user_domain,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
            });

            // ADD TO AGENDA
            const sequenceServiceInstance = Container.get(SequenceService);
            const configServiceInstance = Container.get(ConfigService);
            const crmServiceInstance = Container.get(crmService);
            const config = await configServiceInstance.findOne({ cfg_crm: true });
            if (config) {
              let param:any;
              let paramDetails:any;
              if(entry.chr01 != null){
                 param = await crmServiceInstance.getParamFilterd('new_shop',entry.chr01);
                
                 paramDetails = await crmServiceInstance.getParamDetails({
                  param_code: entry.chr01,
                  domain: user_domain,
                });
              }  
                // const elements = await crmServiceInstance.getPopulationElements(entry.tc_pop);
                let customers:any;
                let data02:any;
                if(entry.chr02!=null){data02=entry.chr02.split(",")}
                console.log(data02,'data02')
                let data03:any;
                if(entry.chr03!=null){data03=entry.chr03.split(",")}
                console.log(data03,'data03')
                let data04:any;
                if(entry.chr04!=null){data04=entry.chr04.split(",")}
                let data05:any;
                if(entry.chr05!=null){data05=entry.chr05.split(",")}
                let data06:any;
                if(entry.tc_pop!=null){data06=entry.tc_pop.split(",")}
                if(entry.chr02 != null){
                  if(entry.chr03 != null){
                    
                    customers = await customerServiceInstance.find({cm_domain:user_domain,cm_type:data02,cm_class:data03})
                  }
                  else{
                    customers = await customerServiceInstance.find({cm_domain:user_domain,cm_type:data02})

                  }
                }
                else{
                  if(entry.chr03 != null){
                    customers = await customerServiceInstance.find({cm_domain:user_domain,cm_class:data03})
                  }
                  else{
                    customers = await customerServiceInstance.find({cm_domain:user_domain})

                  }
                }
                console.log(customers)
                let elements :any;
                if(entry.chr05 == null){elements = customers}
                else{
                  for (let cust of customers){
                    if(cust.address.ad_state == data05 ){
                      elements.push(cust)
                    }
                  }
                }
                let repertorys:any[];
                if(entry.chr04!=null){
                  if(entry.tc_pop != null){repertorys = await repertoryServiceInstance.find({rep_cust:'',chr01:data04,rep_post:data06,rep_domain: user_domain})}
                  else{repertorys = await repertoryServiceInstance.find({rep_cust:'',chr01:data04,rep_domain: user_domain})}
        
                }
                else{
                  if(entry.tc_pop != null){repertorys = await repertoryServiceInstance.find({rep_cust:'',rep_post:data06,rep_domain: user_domain})}
                }
              console.log(elements)
                for (const element of elements) {
                  const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB();
                
                   const addLine = await crmServiceInstance.createAgendaLine(element.cm_addr, param, paramDetails, sequence,entry.tc_part);
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
                        
                        
                        // const client = new Client({
                        //   authStrategy: new LocalAuth()
                        // });
                        
                        // client.on('qr', qr => {
                        //     qrcode.generate(qr, {small: true});
                        // });
                        
                        // client.on('ready', () => {
                        //     console.log('Client is ready!');
                        //     sendMessage();
                        // });
                        
                        // async function sendMessage() {
                        //   const number = "xxxxxxxxxxx"; // Replace with the recipient's number including country code
                        //   const message = "Hello from Node.js!";
                        
                        //   try {
                        //     await client.sendMessage(`${number}@c.us`, message);
                        //     console.log('Message sent successfully!');
                        //   } catch (error) {
                        //     console.error('Error sending message:', error);
                        //   } finally {
                        //     client.destroy();
                        //   }
                        // }
                        
                        // client.initialize();
                }
                // for (let rep of repertorys)
                // {
                //   const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB();
                
                //    const addLine = await crmServiceInstance.createAgendaLine(rep.rep_contact, param, paramDetails, sequence,entry.tc_part);
                //     // let testAccount = await nodemailer.createTestAccount();
                //     // let transporter = nodemailer.createTransport({
                //     //   host: 'SMTP.TITAN.EMAIL',
                //     //    port: 465,
                //     //    secure: true, // true for 465, false for other ports
                //     //   auth: {
                //     //     user: 'abdelhak.benbouzid@acsiome.tech', // generated ethereal user
                //     //     pass: 'A@123456789', // generated ethereal password
                //     //   },
                //     //   tls: { rejectUnauthorized: false },
                //     // });
                //     // // verify connection configuration
                //     // transporter.verify(function(error, success) {
                //     //   if (error) {
                      
                //     //   } else {
                //     //     console.log('Server is ready to take our messages');
                //     //   }
                //     // });
                  
                //     // // send mail with defined transport object
                //     // let mailto = await EmployeServiceInstance.findOne({emp_addr:entry.pme_employe})
                //     // // let mailobject = await itemServiceInstance.findOne({pt_part:affectEmp.pme_inst})
                //     // let info = await transporter.sendMail({
                //     //   from: 'abdelhak.benbouzid@acsiome.tech', // sender address
                //     //   to: mailto.emp_mail, // list of receivers
                //     //   subject: 'mail !', // Subject line
                //     //   text: 'mail !', // plain text body
                //     //   html:
                //     //     'Bonjour ' +
                //     //     entry.fname + ' ' + entry.lname +
                //     //     ', la session . ' + affectEmp.pme_nbr + ', à laquelle vous avez été invitée à été mise à jour avec le statut ' + affectEmp.pme_task_status +
                //     //     '<b>' +
                        
                //     //     '<b>', // html body
                //     // });
                        
                        
                //         // const client = new Client({
                //         //   authStrategy: new LocalAuth()
                //         // });
                        
                //         // client.on('qr', qr => {
                //         //     qrcode.generate(qr, {small: true});
                //         // });
                        
                //         // client.on('ready', () => {
                //         //     console.log('Client is ready!');
                //         //     sendMessage();
                //         // });
                        
                //         // async function sendMessage() {
                //         //   const number = "xxxxxxxxxxx"; // Replace with the recipient's number including country code
                //         //   const message = "Hello from Node.js!";
                        
                //         //   try {
                //         //     await client.sendMessage(`${number}@c.us`, message);
                //         //     console.log('Message sent successfully!');
                //         //   } catch (error) {
                //         //     console.error('Error sending message:', error);
                //         //   } finally {
                //         //     client.destroy();
                //         //   }
                //         // }
                        
                //         // client.initialize();
       
                // }
            }
          } else {
            const te = await trainingcalenderServiceInstance.update({
                ...entry,
                tc_domain: user_domain,
                created_by: user_code,
                created_ip_adr: req.headers.origin,
                last_modified_by: user_code,
                last_modified_ip_adr: req.headers.origin,
                },{id:tc.id});

          }
     
      
    }
    return res.status(201).json({ message: 'created succesfully', data: Trainingcalender });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  logger.debug('Calling find by  all Trainingcalender endpoint');
  const { user_domain } = req.headers;
  try {
    
    const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
 
    const Trainingcalender = await trainingcalenderServiceInstance.find({
      ...req.body,
      tc_domain: user_domain,
    });
    
   
    
      return res.status(200).json({
        message: 'fetched succesfully',
        data:  Trainingcalender ,
      });
   
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  Trainingcalender endpoint');
  const { user_domain } = req.headers;
  try {
    const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
    const { id } = req.params;
    const Trainingcalender = await trainingcalenderServiceInstance.findOne({ id });
  
    
    return res.status(200).json({
      message: 'fetched succesfully',
      data:  Trainingcalender ,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all Trainingcalender endpoint');
  const { user_domain } = req.headers;
  try {
    const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
    const Trainingcalenders = await trainingcalenderServiceInstance.find({ tc_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: Trainingcalenders });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  Trainingcalender endpoint');
  try {
    const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
   
    const { id } = req.params;
   
    const tc = await trainingcalenderServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
  
    return res.status(200).json({ message: 'fetched succesfully', data: tc });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deletes = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const { user_domain } = req.headers;
    logger.debug('Calling update one  code endpoint');
    try {
      console.log("here",req.body)
      const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
     
      const code = await trainingcalenderServiceInstance.delete({ ...req.body });
     
      return res.status(200).json({ message: 'deleted succesfully', data: true});
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
export default {
  create,
  findBy,
  findOne,
  findAll,
  update,
  deletes
  
};
