
import EmployeTimeService from "../../services/employe-time"
import EmployeService from "../../services/employe"
import EmployeScoreService from "../../services/employe-score"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        
        const empTimeServiceInstance = Container.get(
            EmployeTimeService
        )
        const {  empDetails } = req.body
      //  console.log(empDetails)
        for (let entry of empDetails) {
           // console.log(entry)
            const employe = await empTimeServiceInstance.findOne({empt_date: new Date(),empt_domain:user_domain, empt_code:entry.emp_addr})
              //   console.log("emp",employe)
            if(employe) {
                entry = { empt_code: entry.emp_addr,empt_stat:entry.reason,empt_date: new Date(),empt_start: entry.timestart, empt_end: entry.timeend,  last_modified_by:user_code,last_modified_ip_adr: req.headers.origin}
           //console.log("hhhhhhhhheeeeeeeeeeeerrrrrrrrrrrrrrrreeeeeeeeeeee", employe.id)
                await empTimeServiceInstance.update({...entry},{id: employe.id})
            }
            else {
            entry = {empt_domain:user_domain, empt_code: entry.emp_addr,empt_site:entry.emp_site,empt_stat:entry.reason,empt_date: new Date(), created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
           
            await empTimeServiceInstance.create(entry)
            }
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: empDetails })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createPoint = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        
        const empTimeServiceInstance = Container.get(
            EmployeTimeService
        )
        const employeServiceInstance = Container.get(
            EmployeService
        )
        const empScoreServiceInstance = Container.get(
            EmployeScoreService
        )
        const {  empDetails } = req.body
      //  console.log(empDetails)
        for (let entry of empDetails) {
            console.log("entry",entry)
            const employe = await empTimeServiceInstance.findOne({empt_date: req.body.date,empt_domain:user_domain, empt_code:entry.emp_addr})
            const emp = await employeServiceInstance.findOne({emp_addr:entry.emp_addr,emp_domain:user_domain})
     
            //   console.log("emp",employe)
        
            if(employe) {
                const empscore = await empScoreServiceInstance.findOne({emps_addr:entry.emp_addr,emps_type:entry.type, emps_domain:user_domain})
     
                entry = { empt_code: entry.emp_addr,empt_amt:(empscore) ? (Number(empscore.emps_amt) * Number(emp.emp_mrate) + Number(emp.emp_arate)) : 0,empt_mrate_activ: entry.empt_mrate_activ,empt_arate_activ: entry.empt_arate_activ,
                            empt_mrate:emp.emp_mrate,empt_arate:emp.emp_arate,empt_date: req.body.date, empt_type:entry.type,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin}
           //console.log("hhhhhhhhheeeeeeeeeeeerrrrrrrrrrrrrrrreeeeeeeeeeee", employe.id)
                await empTimeServiceInstance.update({...entry},{id: employe.id})
            }
            else {
                const empscore = await empScoreServiceInstance.findOne({emps_addr:entry.emp_addr,emps_type:entry.type})
            entry = {empt_domain:user_domain, empt_code: entry.emp_addr,empt_amt:(empscore) ? (Number(empscore.emps_amt) * Number(emp.emp_mrate) + Number(emp.emp_arate)) : 0,empt_site:entry.emp_site,empt_shift:emp.emp_shift,empt_type:entry.type,empt_date: new Date(), 
                empt_mrate_activ: entry.empt_mrate_activ,empt_arate_activ: entry.empt_arate_activ,
                            empt_mrate:emp.emp_mrate,empt_arate:emp.emp_arate,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
           
            await empTimeServiceInstance.create(entry)
            }
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: empDetails })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const empdDetailsServiceInstance = Container.get(EmployeTimeService)
        const employe = await empdDetailsServiceInstance.find({...req.body,empt_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: employe })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const empdDetailsServiceInstance = Container.get(EmployeTimeService)
        const {id} = req.params
        const employe = await empdDetailsServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: employe  })
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
        const empdDetailsServiceInstance = Container.get(EmployeTimeService)
        const employe = await empdDetailsServiceInstance.find({empt_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: employe })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  inventoryStatus endpoint")
    try {
       
        const empDetailserviceInstance = Container.get(
            EmployeTimeService
        )
        
        const { addr,details} = req.body
        
        await empDetailserviceInstance.delete({empt_addr: addr})
        for (let entry of details) {
            entry = { ...entry,empt_domain:user_domain, empt_addt: addr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await empDetailserviceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: addr })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

export default {
    create,
    createPoint,
    findBy,
    findOne,
    findAll,
    update,
}
