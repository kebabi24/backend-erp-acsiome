import ProjectService from "../../services/project"
import ProjectDetailService from "../../services/project-detail"
import ProjectTaskDetailService from "../../services/project-task-detail"
import TaskDetailService from "../../services/task-detail"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import {QueryTypes} from 'sequelize'
const create = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
    const{user_domain} = req.headers

    logger.debug("Calling Create sequence endpoint")
    try {
        const projectServiceInstance = Container.get(ProjectService)
        const projectDetailServiceInstance = Container.get(
            ProjectDetailService
        )
        const projectTaskDetailServiceInstance = Container.get(
            ProjectTaskDetailService
        )
        const taskDetailServiceInstance = Container.get(
            TaskDetailService
        )
        const { Project, ProjectDetails , docs_codes} = req.body
        const pj = await projectServiceInstance.create({...Project,pm_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
        const project_code = Project.pm_code
        let data = []
        docs_codes.forEach(doc_code => {
            data.push({
                pjd_nbr : project_code ,
                mp_nbr : doc_code,
                pjd_domain:user_domain,
            })
           
        });
        const pjDetails = await projectServiceInstance.createDocsDetails(data)
        
        for (let entry of ProjectDetails) {
            entry = { ...entry,pmd_domain:user_domain, pmd_code: Project.pm_code, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by: user_code }
            await projectDetailServiceInstance.create(entry)
            const tasks = await taskDetailServiceInstance.find({tkd_code : entry.pmd_task,tkd_domain:user_domain})
            for(let tks of tasks) {
                const tk = {
                    pmt_domain:user_domain,
                    pmt_task : tks.tkd_nbr,
                    pmt_desc: tks.tkd_desc,
                    pmt_job: tks.tkd_job,
                    pmt_tool: tks.tkd_tool,
                    pmt_level: tks.tkd_level,
                    pmt_duration: tks.tkd_duration,
                }
                console.log(tk)
                await projectTaskDetailServiceInstance.create({...tk, pmt_code : Project.pm_code, pmt_inst: entry.pmd_task, })

            }
        }
        return res
            .status(201)
            .json({ message: "created succesfully", data: pj })
    } catch (e) {
        //#
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all project endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const projectServiceInstance = Container.get(ProjectService)
       const projectDetailServiceInstance = Container.get(
            ProjectDetailService
        )
        const project = await projectServiceInstance.findOne({
            ...req.body,pm_domain:user_domain
        })
        console.log("hhhhhhhhhhhhhhhh")
        if (project) {
           const details = await projectDetailServiceInstance.find({
               pmd_domain:user_domain,
                pmd_code: project.pm_code,
           })
           console.log(project)
            return res.status(200).json({
                message: "fetched succesfully",
                data: { project , details },
            })
           
       } else {
           return res.status(200).json({
                message: "not FOund",
                data: { project, details: null },
          })
       }

    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
const findByTask = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    console.log(req.body)
    logger.debug("Calling find by  all project endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
      
       const projectTaskDetailServiceInstance = Container.get(
            ProjectTaskDetailService
        )
           const details = await projectTaskDetailServiceInstance.find({
            
            ...req.body,pmt_domain:user_domain
           })
           console.log(details)
            return res.status(200).json({
                message: "fetched succesfully",
                data: { details },
            })
       
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  project endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const projectServiceInstance = Container.get(ProjectService)
        const { id } = req.params
        const project = await projectServiceInstance.findOne({ id })
        const projectDetailServiceInstance = Container.get(
            ProjectDetailService
        )
        const details = await projectDetailServiceInstance.find({
            pmd_code: project.pm_code,pmd_domain:user_domain
        })

        return res.status(200).json({
            message: "fetched succesfully",
            data: { project, details },
        })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const findAllBy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all project endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const projectServiceInstance = Container.get(ProjectService)
        const projects = await projectServiceInstance.find({ ...req.body,pm_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: projects })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all project endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const projectServiceInstance = Container.get(ProjectService)
        const projects = await projectServiceInstance.find({pm_domain:user_domain})
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: projects })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


const update = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  project endpoint")
    try {
        const projectServiceInstance = Container.get(ProjectService)
        const projectDetailServiceInstance = Container.get(
            ProjectDetailService
        )
        const { id } = req.params
        const {project, details} = req.body
        const pj = await projectServiceInstance.update(
            { ...req.body , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        await projectDetailServiceInstance.delete({pmd_code: project.pm_code,pmd_domain:user_domain})
        for (let entry of details) {
            entry = { ...entry, pmd_domain:user_domain,pmd_code: project.pm_code, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin }
            await projectDetailServiceInstance.create(entry)
        }
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: pj })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const updateM = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const{user_code} = req.headers 
const{user_domain} = req.headers

    logger.debug("Calling update one  project endpoint")
    try {
        const projectServiceInstance = Container.get(ProjectService)
        const { id } = req.params
        const {project} = req.body
        const pj = await projectServiceInstance.update(
            { ...req.body , last_modified_by:user_code,last_modified_ip_adr: req.headers.origin},
            { id }
        )
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: pj })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling find all purchaseOrder endpoint")
    try {
        let result = []
        //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

        const pos =await sequelize.query("SELECT * , PUBLIC.pmd_det.pmd_price / PUBLIC.pmd_det.pmd_qty as UP  FROM  PUBLIC.tk_mstr, PUBLIC.pm_mstr,  PUBLIC.pmd_det  where PUBLIC.pmd_det.pmd_domain = ? and PUBLIC.pmd_det.pmd_code = PUBLIC.pm_mstr.pm_code and PUBLIC.tk_mstr.tk_code = PUBLIC.pmd_det.pmd_task and PUBLIC.pm_mstr.pm_domain = PUBLIC.pmd_det.pmd_domain and  PUBLIC.tk_mstr.tk_domain = PUBLIC.pmd_det.pmd_domain ORDER BY PUBLIC.pmd_det.id ASC", {replacements: [user_domain], type: QueryTypes.SELECT });
       console.log(pos)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: pos })
            
            
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    } 
}

const findAllbomDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")
 //SELECT  SUM(PUBLIC.pt_mstr.pt_price * PUBLIC.ps_mstr.ps_qty_per) as THT,
    console.log("kamelllllllllllllllll")
    logger.debug("Calling find all purchaseOrder endpoint")
    try {
       
        const pos = await sequelize.query("SELECT   PUBLIC.sct_det.sct_cst_tot * PUBLIC.ps_mstr.ps_qty_per as TCOST, PUBLIC.pt_mstr.pt_price * PUBLIC.ps_mstr.ps_qty_per as THT, PUBLIC.ps_mstr.id , PUBLIC.sct_det.sct_cst_tot, PUBLIC.pm_mstr.pm_code, PUBLIC.pm_mstr.pm_desc, PUBLIC.ps_mstr.ps_comp, PUBLIC.ps_mstr.ps_qty_per, PUBLIC.pt_mstr.pt_price, PUBLIC.pt_mstr.pt_um  FROM   PUBLIC.pm_mstr,  PUBLIC.pmd_det , PUBLIC.ps_mstr, PUBLIC.pt_mstr, PUBLIC.sct_det where PUBLIC.pmd_det.pmd_code = PUBLIC.pm_mstr.pm_code  and PUBLIC.ps_mstr.ps_parent = PUBLIC.pmd_det.pmd_bom_code and PUBLIC.pt_mstr.pt_part = PUBLIC.ps_mstr.ps_comp and PUBLIC.sct_det.sct_part = PUBLIC.ps_mstr.ps_comp and PUBLIC.sct_det.sct_site = '1000' and PUBLIC.sct_det.sct_sim = 'STDCG' ", { type: QueryTypes.SELECT });
        for (var i = 0; i < pos.length ; i++) {
           console.log(i)
            pos[i].id = i + 1

           //console.log(pos.pm_code)
        }

        console.log("here")
        console.log(pos)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: pos })
            
            
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    } 
}

const findpmdetail = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    const sequelize = Container.get("sequelize")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    logger.debug("Calling find all purchaseOrder endpoint")
    try {
        let result = []
        //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

        const pos =await sequelize.query("SELECT *, PUBLIC.pm_mstr.id as id, PUBLIC.pm_mstr.pm_cost / PUBLIC.pm_mstr.pm_amt as gm  FROM   PUBLIC.pm_mstr,  PUBLIC.ad_mstr  where PUBLIC.pm_mstr.pm_domain = ? and  PUBLIC.ad_mstr.ad_addr = PUBLIC.pm_mstr.pm_cust and PUBLIC.ad_mstr.ad_domain = PUBLIC.pm_mstr.pm_domain ORDER BY PUBLIC.pm_mstr.id ASC", { replacements: [user_domain],type: QueryTypes.SELECT });
       console.log(pos)
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: pos })
            
            
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    } 
}

const getProjectTypes = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find all project endpoint")
    const{user_code} = req.headers 
    const{user_domain} = req.headers
    try {
        const projectServiceInstance = Container.get(ProjectService)
        const project_types = await projectServiceInstance.getProjectTypes()
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: project_types })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

// const assignEmpProject = async (req: Request, res: Response, next: NextFunction) => {
//     const logger = Container.get("logger")

//     logger.debug("Calling Create sequence endpoint")
//     try {
//         const projectServiceInstance = Container.get(ProjectService)
//         const { headerData, employees } = req.body
       
//         return res
//             .status(201)
//             .json({ message: "created succesfully", data: "" })
//     } catch (e) {
//         //#
//         logger.error("🔥 error: %o", e)
//         return next(e)
//     }
// }

    const findAssignedEmpOfProject = async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get("logger")
        
            logger.debug("Calling findAssignedEmpOfProject endpoint")
            const{user_code} = req.headers 
            const{user_domain} = req.headers
            try {
                const projectServiceInstance = Container.get(ProjectService)
                const { project_code } = req.params
                const employees = await projectServiceInstance.findAllProjectDetails({
                    pme_pm_code : project_code,pme_domain:user_domain,
                })
            
                return res
                    .status(201)
                    .json({ message: "created succesfully", data: employees })
            } catch (e) {
                //#
                logger.error("🔥 error: %o", e)
                return next(e)
            }
        }

     const findInstructionsOfProject = async (req: Request, res: Response, next: NextFunction) => {
        const logger = Container.get("logger")
    
        logger.debug("Calling findAssignedEmpOfProject endpoint")
        const{user_code} = req.headers 
        const{user_domain} = req.headers
        try {
            const projectServiceInstance = Container.get(ProjectService)
            const { project_code } = req.params
            const instructions = await projectServiceInstance.findAllProjectDetails({
                pme_pm_code : project_code,pme_domain:user_domain
            })
           
            return res
                .status(201)
                .json({ message: "instructions found succesfully", data: instructions })
        } catch (e) {
            //#
            logger.error("🔥 error: %o", e)
            return next(e)
        }
     }     

     
     const createAssetDown = async (req: Request, res: Response, next: NextFunction) => {
        const logger = Container.get("logger")
        logger.debug("Calling createAssetDown endpoint")
        const{user_domain} = req.headers
        const {  data} = req.body
        try {
            data.forEach(line => {
                delete line.id
                line.pad_domain = user_domain
            });
            const projectServiceInstance = Container.get(ProjectService)
            const assetsDown = await projectServiceInstance.createAssetDown(data)
            return res
                .status(200)
                .json({ message: "created succesfully", data: assetsDown })
        } catch (e) {
            logger.error("🔥 error: %o", e)
            return next(e)
        }
    }



export default {
    create,
    findBy,
    findByTask,
    findOne,
    findAll,
    findAllBy,
    update,
    updateM,
    findAllwithDetails,
    findAllbomDetails,
    findpmdetail,
    getProjectTypes,
    findAssignedEmpOfProject,
    findInstructionsOfProject,
    createAssetDown
}
