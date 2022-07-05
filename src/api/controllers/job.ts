import JobService from "../../services/job"
import JobDetailService from "../../services/job-detail"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const jobServiceInstance = Container.get(JobService)
        const jobDetailServiceInstance = Container.get(
            JobDetailService
        )
        const { Job, JobDetails } = req.body
        const jb = await jobServiceInstance.create({...Job, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        for (let entry of JobDetails) {
            entry = { ...entry, jbd_code: Job.jb_code, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
            await jobDetailServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: jb })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all job endpoint")
    try {
        const jobServiceInstance = Container.get(JobService)
       const jobDetailServiceInstance = Container.get(
            JobDetailService
        )
        const job = await jobServiceInstance.findOne({
            ...req.body,
        })
        console.log("hhhhhhhhhhhhhhhh")
        if (job) {
           const details = await jobDetailServiceInstance.find({
                jbd_code: job.jb_code,
           })
            return res.status(200).json({
                message: "fetched succesfully",
                data: { job , details },
            })
       } else {
           return res.status(200).json({
                message: "not FOund",
                data: { job, details: null },
          })
       }
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  job endpoint")
    try {
        const jobServiceInstance = Container.get(JobService)
        const { id } = req.params
        const job = await jobServiceInstance.findOne({ id })
        const jobDetailServiceInstance = Container.get(
            JobDetailService
        )
        const details = await jobDetailServiceInstance.find({
            jbd_code: job.jb_code,
        })

        return res.status(200).json({
            message: "fetched succesfully",
            data: { job, details },
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all job endpoint")
    try {
        const jobServiceInstance = Container.get(JobService)
        const jobs = await jobServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: jobs })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling update one  job endpoint")
    try {
        const jobServiceInstance = Container.get(JobService)
        const jobDetailServiceInstance = Container.get(
            JobDetailService
        )
        const { id } = req.params
        const {job, details} = req.body
        const jb = await jobServiceInstance.update(
            { ...req.body , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        await jobDetailServiceInstance.delete({jbd_code: job.jb_code})
        for (let entry of details) {
            entry = { ...entry, jbd_code: job.jb_code, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await jobDetailServiceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: jb })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")

    logger.debug("Calling find all purchaseOrder endpoint")
    try {
        let result = []
        //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

        const pos =await sequelize.query("SELECT *  FROM   PUBLIC.jb_mstr,  PUBLIC.jbd_det  where PUBLIC.jbd_det.jbd_code = PUBLIC.jb_mstr.jb_code  ORDER BY PUBLIC.jbd_det.id ASC", { type: QueryTypes.SELECT });
       console.log(pos)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: pos })
            
            
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    } 
}
const findByDet = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all job endpoint")
    try {
      //  const jobServiceInstance = Container.get(JobService)
       const jobDetailServiceInstance = Container.get(
            JobDetailService
        )
        const jobdet = await jobDetailServiceInstance.find({
            ...req.body,
        })
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: jobdet })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

export default {
    create,
    findBy,
    findByDet,
    findOne,
    findAll,
    update,
    findAllwithDetails,
}
