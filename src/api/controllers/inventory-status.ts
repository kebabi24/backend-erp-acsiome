import InventoryStatusService from "../../services/inventory-status"
import InventoryStatusDetailService from "../../services/inventory-status-details"
import InventoryStatusMouvementService from "../../services/inventory-status-mouvement"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const inventoryStatusServiceInstance = Container.get(InventoryStatusService)
        const inventoryStatusDetailServiceInstance = Container.get(
            InventoryStatusDetailService
        )
        const { inventoryStatus, inventoryStatusDetails } = req.body
        const status = await inventoryStatusServiceInstance.create({...inventoryStatus,is_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        for (let entry of inventoryStatusDetails) {
            entry = { ...entry, isd_domain:user_domain,isd_status: status.is_status, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
            await inventoryStatusDetailServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: status })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createIsm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const inventoryStatusServiceInstance = Container.get(InventoryStatusService)
        const inventoryStatusMouvementServiceInstance = Container.get(
            InventoryStatusMouvementService
        )
        const { Status,inventoryStatusMouvement } = req.body
        console.log(Status)
        console.log(inventoryStatusMouvement)
        await inventoryStatusMouvementServiceInstance.delete({ism_loc_start:Status.ism_loc_start, ism_loc_end:Status.ism_loc_end,ism_domain:user_domain})
        for (let entry of inventoryStatusMouvement) {
            entry = { ...entry, ism_loc_start:Status.ism_loc_start,ism_loc_end:Status.ism_loc_end, ism_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
            await inventoryStatusMouvementServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: inventoryStatusMouvement })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findByIsm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all inventoryStatus endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
       const inventoryStatusMouvementServiceInstance = Container.get(
            InventoryStatusMouvementService
        )
        const inventoryStatusMouvement = await inventoryStatusMouvementServiceInstance.find({
            ...req.body,ism_domain:user_domain
        })
        return res
        .status(200)
        .json({ message: "fetched succesfully", data: inventoryStatusMouvement })
} catch (e) {
    logger.error("🔥 error: %o", e)
    return next(e)
}
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all inventoryStatus endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const inventoryStatusServiceInstance = Container.get(InventoryStatusService)
       const inventoryStatusDetailServiceInstance = Container.get(
            InventoryStatusDetailService
        )
        const inventoryStatus = await inventoryStatusServiceInstance.findOne({
            ...req.body,is_domain:user_domain
        })
        if (inventoryStatus) {
           const details = await inventoryStatusDetailServiceInstance.find({
                isd_status: inventoryStatus.is_status, isd_domain:user_domain
           })
            return res.status(200).json({
                message: "fetched succesfully",
                data: { inventoryStatus , details },
            })
       } else {
           return res.status(200).json({
                message: "not FOund",
                data: { inventoryStatus, details: null },
          })
       }
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  inventoryStatus endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const inventoryStatusServiceInstance = Container.get(InventoryStatusService)
        const { id } = req.params
        const inventoryStatus = await inventoryStatusServiceInstance.findOne({ id })
        const inventoryStatusDetailServiceInstance = Container.get(
            InventoryStatusDetailService
        )
        const details = await inventoryStatusDetailServiceInstance.find({
            isd_status: inventoryStatus.is_status, isd_domain:user_domain
        })

        return res.status(200).json({
            message: "fetched succesfully",
            data: { inventoryStatus, details },
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all inventoryStatus endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const inventoryStatusServiceInstance = Container.get(InventoryStatusService)
        const requisitions = await inventoryStatusServiceInstance.find({is_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: requisitions })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAllDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all inventoryStatus endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const inventoryStatusDetailServiceInstance = Container.get(InventoryStatusDetailService)
        const details = await inventoryStatusDetailServiceInstance.findOne({ ...req.body,isd_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: details })
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
        const inventoryStatusServiceInstance = Container.get(InventoryStatusService)
        const inventoryStatusDetailServiceInstance = Container.get(
            InventoryStatusDetailService
        )
        const { id } = req.params
        const {status, details} = req.body
        const inventoryStatus = await inventoryStatusServiceInstance.update(
            { ...req.body , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        await inventoryStatusDetailServiceInstance.delete({isd_status: status.is_status,isd_domain:user_domain})
        for (let entry of details) {
            entry = { ...entry, isd_domain:user_domain,isd_status: status.is_status, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await inventoryStatusDetailServiceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: inventoryStatus })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findInstanceStatus = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all inventoryStatus endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const inventoryStatusServiceInstance = Container.get(InventoryStatusService)
        const status = await inventoryStatusServiceInstance.find({is_frozen:false,is_domain:user_domain})
       // console.log("status",status)
        var datas = [];
        for (let stat of status) {
          datas.push({ value: stat.is_status, label: stat.is_desc });
        }
        console.log(datas)
        return res.status(200).json(datas);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
}
export default {
    create,
    createIsm,
    findBy,
    findByIsm,
    findOne,
    findAll,
    findAllDetails,
    update,
    findInstanceStatus,
}
