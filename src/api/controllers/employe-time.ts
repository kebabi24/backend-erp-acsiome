
import EmployeTimeService from "../../services/employe-time"
import EmployeService from "../../services/employe"
import CodeService from "../../services/code"
import EmployeScoreService from "../../services/employe-score"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { Op, Sequelize } from 'sequelize';
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

const calculatesalary = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    console.log(req.body)
    try {
        const empdDetailsServiceInstance = Container.get(EmployeTimeService)
        const employeServiceInstance = Container.get(EmployeService)
        const codeServiceInstance = Container.get(CodeService)
        const code = await codeServiceInstance.findOne({code_domain: user_domain,code_fldname:"limit_salary", code_value:"limit_salary"})
        var limit = Number(code.dec01)
        const employe = await empdDetailsServiceInstance.findsum({
            
            where: {
                empt_domain:user_domain,
                empt_date: { [Op.between]: [req.body.date1, req.body.date2] },
              
              },
              attributes: ['empt_code', 'empt_shift',  [Sequelize.fn('sum', Sequelize.col('empt_amt')), 'total_amt']],
              group: ['empt_code', 'empt_shift'],
              raw: true,


        })
        //console.log(employe)
        let data = []
        var i = 1
        for (let obj of employe) {
            const emp = await employeServiceInstance.findOne({emp_addr : obj.empt_code})
            //var bon = (Number(obj.total_amt > limit)) ? Number(obj.total_amt) - Number(limit) : 0
            var calcbonus = (emp.emp_shift == "6*3") ? true : false
            var bon = (calcbonus && Number(obj.total_amt > limit)) ? Number(obj.total_amt) - Number(limit) : 0
            let ob = {
                id:i,
                code: obj.empt_code,
                name: emp.emp_lname,
                prename: emp.emp_fname,
                balance: emp.emp_balance,
                shift: obj.empt_shift,
                limit,
                date:req.body.date1,
                amt: obj.total_amt,
                bonus: -bon,
                salary: Number(obj.total_amt) - bon,
                newbalance: Number(emp.emp_balance)  + bon

            }

            data.push(ob)
            i = i + 1
        }
      // console.log(data) 
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: data })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


/*
 const locationDetails = await locationDetailServiceInstance.findSpecial({
        where: {
          ld_domain:user_domain,
          ld_part: item.pt_part,
          ld_site: { [Op.between]: [req.body.pt_site_1, req.body.pt_site_2] },
          ld_loc: { [Op.between]: [req.body.pt_loc_1, req.body.pt_loc_2] },
        },
        attributes: ['ld_part', 'ld_site', 'ld_loc', [Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'total_qty']],
        group: ['ld_part', 'ld_site', 'ld_loc'],
        raw: true,
      });
*/
export default {
    create,
    createPoint,
    findBy,
    findOne,
    findAll,
    update,
    calculatesalary
}
