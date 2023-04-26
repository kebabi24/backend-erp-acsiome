import TaskService from "../../services/task"
import TaskDetailService from "../../services/task-detail"
import JobDetailService from "../../services/job-detail"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const taskServiceInstance = Container.get(TaskService)
        const taskDetailServiceInstance = Container.get(
            TaskDetailService
        )
        const { Task, TaskDetails } = req.body
        const tk = await taskServiceInstance.create({...Task, tk_domain: user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        for (let entry of TaskDetails) {
            entry = { ...entry, tkd_domain: user_domain,tkd_code: Task.tk_code, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
            await taskDetailServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: tk })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all task endpoint")
    const{user_domain} = req.headers
    try {
        const taskServiceInstance = Container.get(TaskService)
       const taskDetailServiceInstance = Container.get(
            TaskDetailService
        )
        const task = await taskServiceInstance.findOne({
            ...req.body, tk_domain: user_domain
        })
        console.log("hhhhhhhhhhhhhhhh")
        if (task) {
           const details = await taskDetailServiceInstance.find({
               tkd_domain: user_domain,
                tkd_code: task.tk_code,
           })
            return res.status(200).json({
                message: "fetched succesfully",
                data: { task , details },
            })
       } else {
           return res.status(200).json({
                message: "not FOund",
                data: { task, details: null },
          })
       }
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  task endpoint")
    const{user_domain} = req.headers
    try {
        const taskServiceInstance = Container.get(TaskService)
        const { id } = req.params
        const task = await taskServiceInstance.findOne({ id })
        const taskDetailServiceInstance = Container.get(
            TaskDetailService
        )
        const details = await taskDetailServiceInstance.find({
            tkd_domain: user_domain,
            tkd_code: task.tk_code,
        })

        return res.status(200).json({
            message: "fetched succesfully",
            data: { task, details },
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all task endpoint")
    const{user_domain} = req.headers
    try {
        const taskServiceInstance = Container.get(TaskService)
        const tasks = await taskServiceInstance.find({tk_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: tasks })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  task endpoint")
    try {
        const taskServiceInstance = Container.get(TaskService)
        const taskDetailServiceInstance = Container.get(
            TaskDetailService
        )
        const { id } = req.params
        const {Task, details} = req.body
        console.log(details)
        const tk = await taskServiceInstance.update(
            { ...req.body , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        await taskDetailServiceInstance.delete({tkd_domain: user_domain,tkd_code: Task.tk_code})
        for (let entry of details) {
            entry = { ...entry, tkd_domain: user_domain,tkd_code: Task.tk_code, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await taskDetailServiceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: tk })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")
    const{user_domain} = req.headers

    logger.debug("Calling find all purchaseOrder endpoint")
    try {
        let result = []
        //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

        const pos =await sequelize.query('SELECT  PUBLIC.tk_mstr.id as "tid"  , *  FROM   PUBLIC.tk_mstr,  PUBLIC.tkd_det  where PUBLIC.tkd_det.tkd_domain = ? and PUBLIC.tK_mstr.tk_domain = PUBLIC.tkd_det.tKd_domain  and  PUBLIC.tkd_det.tKd_code = PUBLIC.tK_mstr.tk_code  ORDER BY PUBLIC.tk_mstr.id ASC', { replacements: [user_domain], type: QueryTypes.SELECT });
       console.log(pos.tid)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: pos })
            
            
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    } 
}
const findPrice = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all task endpoint")
    const{user_domain} = req.headers

    let price = 0 
    try {
        const taskServiceInstance = Container.get(TaskService)
       const taskDetailServiceInstance = Container.get(
            TaskDetailService
        )
        const jobDetailServiceInstance = Container.get(JobDetailService)

        const task = await taskServiceInstance.findOne({
            ...req.body,tk_domain: user_domain
        })
        
        if (task) {
           const details = await taskDetailServiceInstance.find({
               tkd_domain: user_domain,
                tkd_code: task.tk_code,
           })
         
           for (let entry of details) {
               console.log(entry.tkd_job, entry.tkd_level)
           
            const jbd = await jobDetailServiceInstance.findOne({
                jbd_domain: user_domain,
                jbd_code: entry.tkd_job,
                jbd_level : entry.tkd_level
            })
            console.log(jbd.jbd_code)

           
         
            price =  price + entry.tkd_duration * jbd.jbd_time_rate
        }

            return res.status(200).json({
                message: "fetched succesfully",
                data: price,
            })
       } else {
           return res.status(200).json({
                message: "not FOund",
                data: { task, details: null },
          })
       }
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findCost = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    const{user_domain} = req.headers

    logger.debug("Calling find by  all task endpoint")
    let cost = 0 
    try {
        const taskServiceInstance = Container.get(TaskService)
       const taskDetailServiceInstance = Container.get(
            TaskDetailService
        )
        const jobDetailServiceInstance = Container.get(JobDetailService)

        const task = await taskServiceInstance.findOne({
            ...req.body, tk_domain: user_domain
        })
        
        console.log(task)
        if (task) {
           const details = await taskDetailServiceInstance.find({
               tkd_domain: user_domain,
                tkd_code: task.tk_code,
           })
         
           for (let entry of details) {
               console.log(entry.tkd_job, entry.tkd_level)
           
            const jbd = await jobDetailServiceInstance.findOne({
                jbd_domain: user_domain,
                jbd_code: entry.tkd_job,
                jbd_level : entry.tkd_level
            })
            console.log(jbd.jbd_code)

           
         
            cost =  cost + entry.tkd_duration * jbd.jbd_time_rate
        }

            return res.status(200).json({
                message: "fetched succesfully",
                data: cost,
            })
       } else {
           return res.status(200).json({
                message: "not FOund",
                data: { task, details: null },
          })
       }
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
    update,
    findAllwithDetails,
    findPrice,
    findCost
}
