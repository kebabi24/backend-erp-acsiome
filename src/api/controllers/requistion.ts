import RequisitionService from "../../services/requisition"
import RequisitionDetailService from "../../services/requisition-detail"
import SequenceService from "../../services/sequence"
import ItemService from "../../services/item"
import employeService from "../../services/employe"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { Op } from 'sequelize';
// const nodemailer = require('nodemailer');
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    const{user_site} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const requisitionServiceInstance = Container.get(RequisitionService)
        const requisitionDetailServiceInstance = Container.get(
            RequisitionDetailService
        )
        const { requisition, requisitionDetail } = req.body
       
         
          
        const requi = await requisitionServiceInstance.create({...requisition, rqm_domain: user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        // send mail with defined transport object
        // let mailto = await EmployeServiceInstance.findOne({emp_addr:entry.pme_employe})
        // let mailobject = await itemServiceInstance.findOne({pt_part:affectEmp.pme_inst})
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
        // verify connection configuration
        // transporter.verify(function(error, success) {
        //   if (error) {
          
        //   } else {
        //     console.log('Server is ready to take our messages');
        //   }
        // });
        // let info = await transporter.sendMail({
        //   from: 'abdelhak.benbouzid@acsiome.tech', // sender address
        //   to: 'mohamed.nourry@palmaryfood.com', // list of receivers
        //   subject: 'Demande de formation !', // Subject line
        //   text: 'Demande de formation !', // plain text body
        //   html:
        //     'Bonjour ' +
            
        //     ', une demande de formation ' + requi.rqm_nbr +', a été crée, veuillez procéder au traitment de celle-ci '  +
        //     '<b>' +
            
        //     '<b>', // html body
        // });
        for (let entry of requisitionDetail) {
            let site:any;
            console.log(entry.rqd_part,entry.rqd_vpart)
            // if(user_site == '*'){site = 'ECOLE'}else{site = user_site}
            entry = { ...entry, rqd_site:user_site,rqd_domain: user_domain,rqd_nbr: requi.rqm_nbr }
            await requisitionDetailServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: requi })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling find by  all requisition endpoint")
    try {
        const requisitionServiceInstance = Container.get(RequisitionService)
        const requisitionDetailServiceInstance = Container.get(
            RequisitionDetailService
        )
        console.log(req.body)
        const requisition = await requisitionServiceInstance.findOne({
            ...req.body, rqm_domain: user_domain
       })
       console.log(requisition)
        if (requisition) {
            const details = await requisitionDetailServiceInstance.find({
                rqd_domain: user_domain,
                rqd_nbr: requisition.rqm_nbr,
            })
            console.log(requisition)
            return res.status(200).json({
                message: "fetched succesfully",
                data: { requisition, details },
            })
        } else {
            return res.status(202).json({
                message: "not FOund",
                data: { requisition: null, details: null },
            })
        }
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByDet = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling find by  all requisition endpoint")
    try {
        const sequenceServiceInstance = Container.get(SequenceService)
        const requisitionServiceInstance = Container.get(RequisitionService)
        const requisitionDetailServiceInstance = Container.get(
            RequisitionDetailService
        )
        console.log(req.body)
            const requisition = await requisitionDetailServiceInstance.findOneS({
                ...req.body,
                rqd_domain: user_domain,
                
            })
            console.log(requisition)
            const requ = await requisitionServiceInstance.findOne({
                rqm_nbr: requisition.rqd_nbr,
                rqm_domain: user_domain,
                
            })
            const seq = await sequenceServiceInstance.findOne({
                seq_seq: requ.rqm_category,
                seq_domain: user_domain,
                
            })
            return res.status(200).json({
                message: "fetched succesfully",
                data: {sequence:seq,requisition: requisition },
            })
        
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling find by  all requisition endpoint")
    try {
        const requisitionServiceInstance = Container.get(RequisitionService)
        
        const requisitions = await requisitionServiceInstance.find({
            ...req.body,rqm_domain: user_domain
        })
        return res.status(202).json({
            message: "sec",
            data:  requisitions ,
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findNotByAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    const Sequelize = require('sequelize');
        const Op = Sequelize.Op;
    
    logger.debug("Calling find by  all requisition endpoint")
    try {
        const requisitionServiceInstance = Container.get(RequisitionService)
        
        const requisitions = await requisitionServiceInstance.find({
            ... {
                rqm_aprv_stat: {
                  [Op.ne]: "3"
                },
                rqm_open: true ,
                rqm_domain: user_domain
              }
           ,
        })
        return res.status(202).json({
            message: "sec",
            data:  requisitions ,
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  requisition endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const requisitionServiceInstance = Container.get(RequisitionService)
        const { id } = req.params
        const requisition = await requisitionServiceInstance.findOne({ id })
        const requisitionDetailServiceInstance = Container.get(
            RequisitionDetailService
        )
        const details = await requisitionDetailServiceInstance.find({
            rqd_domain: user_domain,
            rqd_nbr: requisition.rqm_nbr,
        })
        

        return res.status(200).json({
            message: "fetched succesfully",
            data: { requisition, details },
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        let result=[]
        const requisitionServiceInstance = Container.get(RequisitionService)
        const requisitionDetailServiceInstance = Container.get(
            RequisitionDetailService
        )
        const requisitions = await requisitionServiceInstance.find({rqm_domain:user_domain})
        for(const req of requisitions){
            const details = await requisitionDetailServiceInstance.find({
                rqd_domain: user_domain,
                rqd_nbr: req.rqm_nbr,
            })
            result.push({id: req.id ,req, details})
        }
        console.log(result)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: result })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findAllApp = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        let result=[]
        const sequenceServiceInstance = Container.get(SequenceService)
        const requisitionServiceInstance = Container.get(RequisitionService)
        const requisitionDetailServiceInstance = Container.get(
            RequisitionDetailService
        )
        const sequences = await sequenceServiceInstance.find({
            seq_domain:user_domain, seq_type: "RQ",
            [Op.or]: [
                { seq_appr1: user_code },
                { seq_appr2: user_code },
                { seq_appr3 : user_code}
              ],
            
           
        
        })
        let list = []
        for (let seq of sequences) {
            list.push(seq.seq_seq)
        }
      //  console.log(user_code)
      //  console.log(list)
        const requisitions = await requisitionServiceInstance.find({rqm_domain:user_domain, rqm_aprv_stat: {[Op.not]: "3"} , rqm_category:  list})
    //   let i = 1
        for(const req of requisitions){
          //  console.log(req)
            const details = await requisitionDetailServiceInstance.find({
                rqd_domain: user_domain,
                rqd_nbr: req.rqm_nbr,
            })
            result.push({id: req.id ,req, details})
            // i++
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
const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  requisition endpoint")
    try {
        const requisitionServiceInstance = Container.get(RequisitionService)
        const { id } = req.params
        
        const requisition = await requisitionServiceInstance.update(
            { ...req.body, last_modified_by: user_code },
            { id }
        )
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: requisition })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const updatedet = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling update one  inventoryStatus endpoint")
    try {
        const requisitionServiceInstance = Container.get(RequisitionService)
        
        const requisitionDetailServiceInstance = Container.get(
            RequisitionDetailService
        )
       
        const {requisition, details} = req.body
        const { id } = req.params
        console.log(req.params)
        const requ = await requisitionServiceInstance.update(
            { ...requisition , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        await requisitionDetailServiceInstance.delete({rqd_domain: user_domain,rqd_nbr: requisition.rqm_nbr})
        for (let entry of details) {
            entry = { ...entry, rqd_domain: user_domain,rqd_nbr: requisition.rqm_nbr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await requisitionDetailServiceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: requ })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const updatedRQD = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
const EmployeServiceInstance = Container.get(employeService)
    logger.debug("Calling update one  inventoryStatus endpoint")
    try {
        const requisitionServiceInstance = Container.get(RequisitionService)
        const EmployeServiceInstance = Container.get(employeService)
        const requisitionDetailServiceInstance = Container.get(
            RequisitionDetailService
        )
        //const { details} = req.body
        const { id } = req.params
        console.log("id",id)
       //     entry = { ...entry, rqd_domain: user_domain,rqd_nbr: requisition.rqm_nbr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await requisitionDetailServiceInstance.update({
                ...req.body , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id:id})
                
                const reqd = await requisitionDetailServiceInstance.findOneS({ id :id}) 
                console.log(reqd)
                // send mail with defined transport object
        
        // let mailobject = await itemServiceInstance.findOne({pt_part:affectEmp.pme_inst})
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
        // verify connection configuration
        // transporter.verify(function(error, success) {
        //   if (error) {
          
        //   } else {
        //     console.log('Server is ready to take our messages');
        //   }
        // });
        //  let mailto = await EmployeServiceInstance.findOne({emp_addr:reqd.rqd_rqby_userid})
        // let info = await transporter.sendMail({
        //   from: 'abdelhak.benbouzid@acsiome.tech', // sender address
        //   to: mailto, // list of receivers
        //   subject: 'Demande de formation !', // Subject line
        //   text: 'Demande de formation !', // plain text body
        //   html:
        //     'Bonjour ' +
            
        //     ', votre demande de formation ' + reqd.rqd_nbr +', a été traité avec un statut'  + reqd.rqd_aprv_stat +
        //     '<b>' +
            
        //     '<b>', // html body
        // });
                const reqdet = await requisitionDetailServiceInstance.find({ rqd_nbr : reqd.rqd_nbr ,rqd_aprv_stat: {[Op.ne]: "3"},rqd_domain: user_domain})
                if(reqdet.length == 0) {

                    const requ = await requisitionServiceInstance.update(
                        { rqm_status:"C", last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
                        { rqm_nbr: reqd.rqd_nbr }
                    )
                }



        return res
            .status(200)
            .json({ message: "fetched succesfully", data: true })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAllAppDet = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    const{user_site} = req.headers
    try {
        const ItemServiceInstance = Container.get(ItemService)
        const EmployeServiceInstance = Container.get(employeService)
        const sequenceServiceInstance = Container.get(SequenceService)
        const requisitionServiceInstance = Container.get(RequisitionService)
        const requisitionDetailServiceInstance = Container.get(
            RequisitionDetailService
        )
        const sequences = await sequenceServiceInstance.find({
            seq_domain:user_domain, seq_type: "RQ",
            [Op.or]: [
                { seq_appr1: user_code },
                { seq_appr2: user_code },
                { seq_appr3 : user_code}
              ],
            
           
        
        })
        let list = []
        for (let seq of sequences) {
            list.push(seq.seq_seq)
        }
      //  console.log(user_code)
        console.log(list)
        const requisitions = await requisitionServiceInstance.find({rqm_domain:user_domain, rqm_aprv_stat: {[Op.not]: "3"} , rqm_category:  list})
     let req = []
     for (let requisition of requisitions) {
        req.push(requisition.rqm_nbr)
     }
     
       
          //  console.log(req)
            const details = await requisitionDetailServiceInstance.findDet({
                rqd_domain: user_domain,
                rqd_nbr: req,
               rqd_aprv_stat:  {[Op.not]: "3"}
            })
       
        
        let result = []
        for(let det of details)
        {
            const part = await ItemServiceInstance.find({pt_part:det.rqd_part,pt_domain:user_domain})
            const emp = await EmployeServiceInstance.find({emp_addr:det.rqd_rqby_userid,emp_domain:user_domain})
            
            if(emp.length != 0)
            {
                if(part.length != 0)
                {
                    
                    if(det.rqd_site == user_site ||user_site == '*')
                    {    result.push({id:det.id,
            rqd_nbr:det.rqd_nbr,
            rqd_need_date:det.rqd_need_date,
            rqd_expire:det.rqd_expire,
            chr02:det.chr02,
            rqd_part:det.rqd_part,
            rqd_desc:det.rqd_desc,
            rqd_insp_rqd:det.rqd_insp_rqd,
            pt_phantom:part[0].pt_phantom,
            emp_loyalty:emp[0].emp_loyalty,
            emp_last_date:emp[0].emp_last_date,
            emp_conf_date:emp[0].emp_conf_date,
            rqd_aprv_stat:det.rqd_aprv_stat,
            rqd_rqby_userid:det.rqd_rqby_userid,
            chr01:det.chr01,
            chr03:det.chr03,
                        })
                    }
    }
            }
        
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: result })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findAllUser = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        let result=[]
        const requisitionServiceInstance = Container.get(RequisitionService)
        const requisitionDetailServiceInstance = Container.get(
            RequisitionDetailService
        )
        const requisitions = await requisitionServiceInstance.find({created_by:user_code,rqm_domain:user_domain})
        for(const req of requisitions){
            const details = await requisitionDetailServiceInstance.find({
                rqd_domain: user_domain,
                rqd_nbr: req.rqm_nbr,
            })
            result.push({id: req.id ,req, details})
        }
        console.log(result)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: result })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    logger.debug('Calling update requisition endpoint');
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const requisitionServiceInstance = Container.get(RequisitionService)
        const requisitionDetailServiceInstance = Container.get(
            RequisitionDetailService
        )
      const { nbr } = req.params;
      await requisitionDetailServiceInstance.delete({rqd_domain: user_domain,rqd_nbr: nbr})
      await requisitionServiceInstance.delete({rqm_domain: user_domain,rqm_nbr: nbr})
      return res.status(200).json({ message: 'deleted succesfully', data: nbr });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
export default {
    create,
    findBy,
    findByDet,
    findOne,
    findAll,
    findAllApp,
    update,
    updatedet,
    updatedRQD,
    findByAll,
    findNotByAll,
    findAllAppDet,
    findAllUser,
    deleteOne,
}
