import WorkRoutingService from "../../services/workrouting"
import WorkCenterService from "../../services/workcenter"
import ItemService from '../../services/item';
import costSimulationService from "../../services/cost-simulation"
import SiteService from "../../services/site"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
import {  Op } from 'sequelize';
import { SchemaTimestampsConfig } from "mongoose";
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create code endpoint")
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const ro = await workroutingServiceInstance.create({...req.body,ro_domain: user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  ro })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const {id} = req.params
        const ro = await workroutingServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ro  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all code endpoint")
    const { user_domain } = req.headers;
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const ros = await workroutingServiceInstance.find({ro_domain: user_domain})
        console.log(ros)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ros })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const { user_domain } = req.headers;
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const ros = await workroutingServiceInstance.find({...req.body,ro_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ros })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const { user_domain } = req.headers;
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const ros = await workroutingServiceInstance.findOne({...req.body,ro_domain: user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ros })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findAlldistinct = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")
    const { user_domain } = req.headers;
    console.log("hdkbevfhgevfe", user_domain)
    logger.debug("Calling find all purchaseOrder endpoint")
    try {
        let result = []
        //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

        const ros =await sequelize.query('SELECT DISTINCT  PUBLIC.ro_det.ro_routing , PUBLIC.ro_det.ro_desc  FROM   PUBLIC.ro_det where PUBLIC.ro_det.ro_domain = ?',   {replacements: [user_domain], type: QueryTypes.SELECT });
        console.log(ros)
        let id = 1;
        for(const ro of ros){
            result.push({id:id, ro_routing: ro.ro_routing, ro_desc: ro.ro_desc})
            id = id + 1;    
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


const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  code endpoint")
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const {id} = req.params
        const ro = await workroutingServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: ro  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  code endpoint")
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const {id} = req.params
        const ro = await workroutingServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const CalcCost = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const { user_domain } = req.headers;
  //  console.log(req.body)
    try {
        const workroutingServiceInstance = Container.get(WorkRoutingService)
        const workCenterServiceInstance = Container.get(WorkCenterService)
        const itemServiceInstance = Container.get(ItemService);
        const costSimulationServiceInstance = Container.get(costSimulationService)
         const ros = await workroutingServiceInstance.finddist({ where : {ro_domain: user_domain, ro_routing: { [Op.between]: [req.body.routing1, req.body.routing2] }},
            
        attributes: ['ro_routing'],
        group: ['ro_routing']
    })

    let result=[]
    var i = 1
    for (let ro of ros) {

       // console.log(ro.ro_routing)
       


        const items = await itemServiceInstance.find({ pt_routing: ro.ro_routing ,pt_domain:user_domain });
       
        
         for (let item of items) {   
            var old_lbr = 0
            var old_bdn = 0  
            let lbr_tl = 0
            let bdn_tl = 0 
        const rops = await workroutingServiceInstance.find({  ro_routing:item.pt_routing ,ro_domain: user_domain})

        for(let rop of rops ) {
            const wc = await workCenterServiceInstance.findOne({wc_domain: user_domain, wc_wkctr: rop.ro_wkctr,wc_mch:rop.ro_mch})
              lbr_tl = lbr_tl + ( (1 / Number(rop.ro_run) * Number(wc.wc_lbr_rate) * Number(wc.wc_men_mch) ) + ((Number(rop.ro_setup)/ Number(item.pt_ord_qty)) * Number(wc.wc_setup_rte) * Number(wc.wc_setup_men)))
              bdn_tl = bdn_tl + ( (1/ Number(rop.ro_run)) + (Number(rop.ro_setup)) / Number(item.pt_ord_qty)*Number(wc.wc_bdn_rate))        
        }
            console.log(item.pt_part,item.pt_routing )
            const scts = await costSimulationServiceInstance.findOne({sct_domain:user_domain,sct_site: req.body.site,sct_part:item.pt_part, sct_sim:req.body.type})
            if (scts!= null) {  old_lbr = scts.sct_lbr_tl 
            old_bdn = scts.sct_bdn_tl} 
            else {
                old_lbr = 0
            old_bdn = 0
            }
            result.push({id: i, site:req.body.site,sim:req.body.type,routing: ro.ro_routing, part:item.pt_part,desc: item.pt_desc1, old_lbr : old_lbr, old_bdn: old_bdn,lbr: Number(lbr_tl.toFixed(2)),bdn:  Number(bdn_tl.toFixed(2))})
            i = i + 1
        }
       
    //     const items = await itemServiceInstance.find({ pt_routing: ro.ro_routing ,pt_domain:user_domain });
    //     var old_lbr = 0
    //     var old_bdn = 0 
    //   for (let item of items) {
    //       console.log(item.pt_part,item.pt_routing )
    //       const scts = await costSimulationServiceInstance.findOne({sct_domain:user_domain,sct_site: req.body.site,sct_part:item.pt_part, sct_sim:req.body.type})
    //       if (scts!= null) {  old_lbr = scts.sct_lbr_tl 
    //      old_bdn = scts.sct_bdn_tl} 
    //       result.push({id: i, site:req.body.site,sim:req.body.type,routing: ro.ro_routing, part:item.pt_part,desc: item.pt_desc1, old_lbr : old_lbr, old_bdn: old_bdn,lbr: Number(lbr_tl.toFixed(2)),bdn:  Number(bdn_tl.toFixed(2))})
    //       i = i + 1
    //   }

    }
      //  console.log("herehere",result)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: result })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const UpdateRoCost = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const { user_domain } = req.headers;
    const { user_code } = req.headers;
    const { Detail } = req.body;
   // console.log(req.body)
   
    try {
           const costSimulationServiceInstance = Container.get(costSimulationService)
        
           for (let entry of Detail) {
            console.log(entry)
            const scts = await costSimulationServiceInstance.findOne({sct_domain:user_domain,sct_site: entry.site,sct_part:entry.part, sct_sim:entry.sim})
            if (scts) {
                const sct = await costSimulationServiceInstance.update({
                    sct_cst_tot:  Number(scts.sct_mtl_tl) +  Number(scts.sct_mtl_ll) + Number(entry.lbr)  + Number(scts.sct_lbr_ll)  + Number(entry.bdn)  + Number(scts.sct_bdn_ll)  + Number(scts.sct_ovh_tl) + Number(scts.sct_ovh_ll) + Number(scts.sct_sub_tl) + Number(scts.sct_sub_ll),                    
                    sct_lbr_tl: entry.lbr, sct_bdn_tl:entry.bdn,last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id:scts.id})
            } else {
               await costSimulationServiceInstance.create({sct_domain: user_domain,
                    
                    sct_site : entry.site,
                    sct_part: entry.part,
                    sct_sim: entry.sim,
                    sct_lbr_tl: entry.lbr, sct_bdn_tl:entry.bdn,
                    sct_cst_tot:   Number(entry.lbr)   + Number(entry.bdn)  ,                    
                    created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin
                }) 
            }
        
           }
      //  console.log("herehere",result)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: "true" })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
export default {
    create,
    findOne,
    findByOne,
    findAll,
    findBy,
    findAlldistinct,
    update,
    deleteOne,
    CalcCost,
    UpdateRoCost,
}
