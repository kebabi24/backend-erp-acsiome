import BomService from "../../services/bom"
import ItemService from '../../services/item';
import costSimulationService from "../../services/cost-simulation"
import PsService from '../../services/ps';
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {  Op } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling Create code endpoint")
    try {
        const bomServiceInstance = Container.get(BomService)
        const bom = await bomServiceInstance.create({...req.body, bom_domain:user_domain,created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        return res
            .status(201)
            .json({ message: "created succesfully", data:  bom })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const bomServiceInstance = Container.get(BomService)
        const {id} = req.params
        const bom = await bomServiceInstance.findOne({id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: bom  })
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
        const bomServiceInstance = Container.get(BomService)
        const bom = await bomServiceInstance.find({bom_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: bom })
    } catch (e) {
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
        const bomServiceInstance = Container.get(BomService)
        const bom = await bomServiceInstance.findOne({...req.body,bom_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: bom })
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
        const bomServiceInstance = Container.get(BomService)
        const {id} = req.params
        const bom = await bomServiceInstance.update({...req.body, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: bom  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling update one  code endpoint")
    try {
        const bomServiceInstance = Container.get(BomService)
        const {id} = req.params
        const bom = await bomServiceInstance.delete({id})
        return res
            .status(200)
            .json({ message: "deleted succesfully", data: id  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find by  all code endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const bomServiceInstance = Container.get(BomService)
        const bom = await bomServiceInstance.findOne({...req.body,bom_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: bom })
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
        const bomServiceInstance = Container.get(BomService)
        const psServiceInstance = Container.get(PsService) 
        const itemServiceInstance = Container.get(ItemService);
        const costSimulationServiceInstance = Container.get(costSimulationService)
        const boms = await bomServiceInstance.finddist({ where : {bom_domain: user_domain, bom_parent: { [Op.between]: [req.body.bom1, req.body.bom2] }},
            
      
    })

    let result=[]
    var i = 1
    for (let bom of boms) {

       // console.log(ro.ro_routing)
        let mtl_tl = 0
        let mtl_ll = 0
        let lbr_ll = 0
        let bdn_ll = 0
        
        const pss = await psServiceInstance.find({  ps_parent:bom.bom_parent ,ps_domain: user_domain})

        for(let ps of pss ) {
console.log("comp",ps.ps_comp)
             const sct = await costSimulationServiceInstance.findOne({sct_domain:user_domain,sct_site: req.body.site,sct_part:ps.ps_comp, sct_sim:req.body.type})
             
              const items = await itemServiceInstance.findOne({ pt_part: ps.ps_comp, pt_bom_code: { [Op.ne]: null },pt_domain:user_domain }); 
              console.log("items",items)
              if (items) {
                  console.log(items.pt_part)
                  mtl_ll = mtl_ll + (Number(sct.sct_mtl_tl) + Number(sct.sct_mtl_ll))* Number(ps.ps_qty_per)
                  lbr_ll = lbr_ll + (Number(sct.sct_lbr_tl) + Number(sct.sct_lbr_ll))* Number(ps.ps_qty_per)
                  bdn_ll = bdn_ll + (Number(sct.sct_bdn_tl) + Number(sct.sct_bdn_ll))* Number(ps.ps_qty_per)
              
            } else {

                mtl_tl = mtl_tl + Number(sct.sct_mtl_tl) * Number(ps.ps_qty_per)
           
            }
        }

       
        const items = await itemServiceInstance.find({ pt_bom_code: bom.bom_parent ,pt_domain:user_domain });
        var old_mtl_tl = 0
        var old_mtl_ll = 0 
      for (let item of items) {
          console.log(item.pt_part,item.pt_bom_code )
          const scts = await costSimulationServiceInstance.findOne({sct_domain:user_domain,sct_site: req.body.site,sct_part:item.pt_part, sct_sim:req.body.type})
          if (scts!= null) {  old_mtl_tl  = scts.sct_mtl_tl 
            old_mtl_ll = scts.sct_mtl_ll} 
          result.push({id: i, site:req.body.site,sim:req.body.type,bom: bom.bom_parent, part:item.pt_part,desc: item.pt_desc1, 
                              old_mtl_tl : old_mtl_tl, old_mtl_ll: old_mtl_ll,
                              lbr_ll: Number(lbr_ll.toFixed(2)),bdn_ll:  Number(bdn_ll.toFixed(2)),
                              mtl_tl: Number(mtl_tl.toFixed(2)),mtl_ll:  Number(mtl_ll.toFixed(2))})
          i = i + 1
      }
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


const UpdateBomCost = async (req: Request, res: Response, next: NextFunction) => {
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
                    sct_cst_tot:  Number(entry.mtl_tl) + Number(entry.mtl_ll) + Number(scts.sct_lbr_tl)    + Number(scts.sct_bdn_tl) + Number(entry.lbr_ll)    + Number(entry.bdn_ll)  + Number(scts.sct_ovh_tl) + Number(scts.sct_ovh_ll) + Number(scts.sct_sub_tl) + Number(scts.sct_sub_ll),                    
                    sct_mtl_tl: entry.mtl_tl,
                    sct_mtl_ll:entry.mtl_ll,

                    sct_lbr_ll: entry.lbr_ll,
                    sct_bdn_ll: entry.bdn_ll,
                    last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},{id:scts.id})
            } else {
               await costSimulationServiceInstance.create({sct_domain: user_domain,
                    
                    sct_site : entry.site,
                    sct_part: entry.part,
                    sct_sim: entry.sim,
                    sct_mtl_tl: entry.mtl_tl, sct_mtl_ll:entry.mtl_ll,
                    sct_lbr_ll : Number(entry.mtl_tl)   ,
                    sct_bdn_ll:  Number(entry.mtl_ll) ,
                    sct_cst_tot:   Number(entry.mtl_tl)   + Number(entry.mtl_ll) +   Number(entry.lbr_ll)   + Number(entry.bdn_ll)  ,                    
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
    findAll,
    findBy,
    update,
    deleteOne,
    findByOne,
    CalcCost,
    UpdateBomCost,
}

