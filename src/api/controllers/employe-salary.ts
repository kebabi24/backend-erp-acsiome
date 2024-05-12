
import EmployeSalaryService from "../../services/employe-salary"
import EmployeService from "../../services/employe"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { Op, Sequelize } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")

    try {
        
        const empSalaryServiceInstance = Container.get(
            EmployeSalaryService
        )
        const employeServiceInstance = Container.get(
            EmployeService
        )
        const {  empDetails } = req.body
   
        for (let entry of empDetails) {
               let  entr = {salary_domain:user_domain, salary_code: entry.code,salary_date: entry.date,salary_shift:entry.shift, salary_amt: entry.amt, salary_bonus: entry.bonus, salary_salary: entry.salary,salary_balance:entry.newbalance,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin}
         
                await empSalaryServiceInstance.create({...entr})
                const employe = await employeServiceInstance.findOne({emp_addr:entry.code})
                if(employe) {
                    await employeServiceInstance.update({emp_balance: entry.newbalance},{id:employe.id})
                }
           
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: true })
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
        const empdDetailsServiceInstance = Container.get(EmployeSalaryService)
        const employe = await empdDetailsServiceInstance.find({...req.body,salary_domain:user_domain})
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
        const empdDetailsServiceInstance = Container.get(EmployeSalaryService)
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
        const empdDetailsServiceInstance = Container.get(EmployeSalaryService)
        const employe = await empdDetailsServiceInstance.find({salary_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: employe })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



export default {
    create,
    findBy,
    findOne,
    findAll,
}
