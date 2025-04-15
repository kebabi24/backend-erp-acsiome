import UnloadRequestService from "../../services/unload-request"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import LocationDetailService from "../../services/location-details"
import DecompteService from '../../services/decompte';
import RoleService from '../../services/role';
const findAllRoles = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const loadRequestService = Container.get(UnloadRequestService)
        const upper_role_code = req.params.upper_role_code
        const roles = await loadRequestService.findAllRolesByUpperRoleCode({upper_role_code :upper_role_code })
        return res
            .status(200)
            .json({ message: "found all roles of upper role", data: roles  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}   

const findAllUnloadRequeusts = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const unloadRequestService = Container.get(UnloadRequestService)
        const role_code = req.params.role_code
        const unloadRequests = await unloadRequestService.findAllUnloadRequestsByRoleCode(role_code)
        return res
            .status(200)
            .json({ message: "found all unlaod Requests ", data: unloadRequests  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const getUnoadRequestData = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getLoadRequestData endpoint")
    try {
        const unloadRequestService = Container.get(UnloadRequestService)

        const unload_request_code = req.params.unload_request_code
        
        const unloadRequest = await unloadRequestService.findUnloadRequest({unload_request_code :unload_request_code})
        
        const unloadRequestData = await unloadRequestService.getUnloadRequestData(unload_request_code)
        
        return res
            .status(200)
            .json({ message: "data ready", data: unloadRequest , unloadRequestData:unloadRequestData })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const updateUnoadRequestStauts10 = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling updateLoadRequestStauts10 controller endpoint")
    try {
        const unloadRequestService = Container.get(UnloadRequestService)

        const unload_request_code = req.body.unload_request_code
        const unload_request_data = req.body.unload_request_data

        // DELETE OLD DETAILS   
        const deletedUnloadRequestDetails = await unloadRequestService.deleteUnloadRequestDetail({unload_request_code:unload_request_code})
        
        // CREATE NEW DETAILS 
        const createdUnlaodRequestDetails = await unloadRequestService.createMultipleUnoadRequestsDetails(unload_request_data)

        
        // UPDATE STATUS 
        const updatedUnloadRequest = await unloadRequestService.updateUnloadRequestStatusTo10(unload_request_code)
       
        return res
            .status(200)
            .json({ message: "data ready", data: updatedUnloadRequest  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}





const findAllUnloadRequeusts10 = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const loadRequestService = Container.get(UnloadRequestService)
        const role_code = req.params.role_code
        const unloadRequests = await loadRequestService.findAlUnloadRequests10ByRoleCode(role_code)
        return res
            .status(200)
            .json({ message: "found all unload requests 10", data: unloadRequests  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const updateUnoadRequestStauts20 = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling updateLoadRequestStauts10 controller endpoint")
    const{user_code} = req.headers 
  const{user_domain} = req.headers
    try {
        const unloadRequestService = Container.get(UnloadRequestService)
        const locationDetailService = Container.get(LocationDetailService)
        const decompteService = Container.get(DecompteService)
        const roleServiceInstance = Container.get(RoleService)
        const unload_request_code = req.body.unload_request_code
        const unload_request_data = req.body.unload_request_data

        console.log(unload_request_data)
        // DELETE OLD DETAILS   
        const deletedUnloadRequestDetails = await unloadRequestService.deleteUnloadRequestDetail({unload_request_code:unload_request_code})
        
        // CREATE NEW DETAILS 
        const createdUnlaodRequestDetails = await unloadRequestService.createMultipleUnoadRequestsDetails(unload_request_data)
        const unload = await unloadRequestService.findOne({unload_request_code:unload_request_code })
        let tot = 0
     
        for (let unloadrequest of unload_request_data) {
            tot = tot +( Number(unloadrequest.pt_price) * Number(unloadrequest.qt_effected) * Number(1.2138))
            const ld = await locationDetailService.findOne({ld_site:unload.role_site,ld_loc:unload.role_loc,ld_part:unloadrequest.product_code,
            ld_lot:unloadrequest.lot
            })
            if(ld) {
                console.log("ldqty",Number(ld.ld_qty_oh))
                console.log("qt_effected",Number(unloadrequest.qt_effected))
                const ldup = await  locationDetailService.update({ld_qty_oh:Number(ld.ld_qty_oh) - Number(unloadrequest.qt_effected)},{id:ld.id})
            }
        }
        
        const decompte = await decompteService.create({dec_code:unload_request_code,dec_role:unload.role_code,dec_desc:"Déchargement",dec_amt:-tot,dec_type:"D",dec_effdate:new Date(),dec_domain:user_domain,
    
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin, });

            const role = await roleServiceInstance.findOne({role_code: unload.role_code});
  
    await roleServiceInstance.updated(   {solde: Number(role.solde) - Number(tot)},{role_code:unload.role_code})      
    
        // UPDATE STATUS 
        const updatedUnloadRequest = await unloadRequestService.updateUnloadRequestStatusToX(unload_request_code,20)
       
        return res
            .status(200)
            .json({ message: "data ready", data: updatedUnloadRequest  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



export default {
    findAllUnloadRequeusts,
    findAllRoles,
    findAllUnloadRequeusts10,
    getUnoadRequestData,
    updateUnoadRequestStauts10,
    updateUnoadRequestStauts20
   
}