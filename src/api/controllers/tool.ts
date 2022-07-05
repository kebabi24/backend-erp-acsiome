import ToolService from "../../services/tool"
import ToolDetailService from "../../services/tool-detail"

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const toolServiceInstance = Container.get(ToolService)
        const toolDetailServiceInstance = Container.get(
            ToolDetailService
        )
        const { Tool, ToolDetails } = req.body
        const to = await toolServiceInstance.create({...Tool, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        for (let entry of ToolDetails) {
            entry = { ...entry, tod_code: Tool.to_code, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
            await toolDetailServiceInstance.create(entry)
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: to })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all tool endpoint")
    try {
        const toolServiceInstance = Container.get(ToolService)
       const toolDetailServiceInstance = Container.get(
            ToolDetailService
        )
        const tool = await toolServiceInstance.findOne({
            ...req.body,
        })
        console.log("hhhhhhhhhhhhhhhh")
        if (tool) {
           const details = await toolDetailServiceInstance.find({
                tod_code: tool.to_code,
           })
            return res.status(200).json({
                message: "fetched succesfully",
                data: { tool , details },
            })
       } else {
           return res.status(200).json({
                message: "not FOund",
                data: { tool, details: null },
          })
       }
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  tool endpoint")
    try {
        const toolServiceInstance = Container.get(ToolService)
        const { id } = req.params
        const tool = await toolServiceInstance.findOne({ id })
        const toolDetailServiceInstance = Container.get(
            ToolDetailService
        )
        const details = await toolDetailServiceInstance.find({
            tod_code: tool.to_code,
        })

        return res.status(200).json({
            message: "fetched succesfully",
            data: { tool, details },
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all tool endpoint")
    try {
        const toolServiceInstance = Container.get(ToolService)
        const tools = await toolServiceInstance.find({})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: tools })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers

    logger.debug("Calling update one  tool endpoint")
    try {
        const toolServiceInstance = Container.get(ToolService)
        const toolDetailServiceInstance = Container.get(
            ToolDetailService
        )
        const { id } = req.params
        const {Tool, details} = req.body
        const jb = await toolServiceInstance.update(
            { ...req.body , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        await toolDetailServiceInstance.delete({tod_code: Tool.to_code})
        for (let entry of details) {
            entry = { ...entry, tod_code: Tool.to_code, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await toolDetailServiceInstance.create(entry)
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

        const pos =await sequelize.query("SELECT *  FROM   PUBLIC.to_mstr,  PUBLIC.tod_det  where PUBLIC.tod_det.tod_code = PUBLIC.to_mstr.to_code  ORDER BY PUBLIC.tod_det.id ASC", { type: QueryTypes.SELECT });
       console.log(pos)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: pos })
            
            
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
}
