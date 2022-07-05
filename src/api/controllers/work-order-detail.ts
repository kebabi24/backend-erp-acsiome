import WorkOrderDetailService from "../../services/work-order-detail"
import WorkOrderService from "../../services/work-order"
import WoroutingService from "../../services/worouting"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { localeData } from "moment"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

   

    logger.debug("Calling Create workOrderDetail endpoint")
    try {
        const workOrderDetailServiceInstance = Container.get(WorkOrderDetailService)
        const workOrderServiceInstance = Container.get(WorkOrderService)
        const woroutingServiceInstance = Container.get(WoroutingService)

        const wo = await workOrderServiceInstance.findOne({id: req.body._wod.wod_lot})
        
        if(wo) await workOrderServiceInstance.update({wo_status : "R" ,wo__dte01: wo.wo_rel_date, wo_rel_date:req.body._wod.wod__qadt01, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin },{id: wo.id})
        const wrs = await woroutingServiceInstance.find({wr_lot: req.body._wod.wod_lot})
        for (const wr of wrs) {
            console.log(wr)
            await woroutingServiceInstance.update({wr_status : "R" ,wr__dte01: wo.wo_rel_date, wr_rel_date:req.body._wod.wod__qadt01, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin },{id: wr.id})
        }
        
        for (const item of req.body.detail) {
        console.log(item.wod_um)   
            await workOrderDetailServiceInstance.create({ ...item, ...req.body._wod, wod__chr01: req.body.lpnbr, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin });
        
        }
          //  const workOrderDetail = await workOrderDetailServiceInstance.create({...req.body,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully",  data: req.body })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  workOrderDetail endpoint")
    try {
        const workOrderDetailServiceInstance = Container.get(WorkOrderDetailService)
        const {id} = req.params
        const workOrderDetail = await workOrderDetailServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: workOrderDetail  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all workOrderDetail endpoint")
    try {
        const workOrderDetailServiceInstance = Container.get(WorkOrderDetailService)
        const workOrderDetails = await workOrderDetailServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: workOrderDetails })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all workOrderDetail endpoint")
    try {
        const workOrderDetailServiceInstance = Container.get(WorkOrderDetailService)
        const workOrderDetails = await workOrderDetailServiceInstance.find({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: workOrderDetails })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all workOrderDetail endpoint")
    try {
        const workOrderDetailServiceInstance = Container.get(WorkOrderDetailService)
        const workOrderDetails = await workOrderDetailServiceInstance.findOne({...req.body})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: workOrderDetails })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling update one  workOrderDetail endpoint")
    try {
        const workOrderDetailServiceInstance = Container.get(WorkOrderDetailService)
        const {id} = req.params
        const workOrderDetail = await workOrderDetailServiceInstance.update({...req.body,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: workOrderDetail  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}




const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  workOrderDetail endpoint")
    try {
        const workOrderDetailServiceInstance = Container.get(WorkOrderDetailService)
        const {id} = req.params
        const workOrderDetail = await workOrderDetailServiceInstance.delete({id})
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
    findOne,
    findAll,
    findBy,
    findByOne,
    update,
    deleteOne,
  
}
