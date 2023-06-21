import UnloadRequestService from "../../services/unload-request"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"


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
    try {
        const unloadRequestService = Container.get(UnloadRequestService)

        const unload_request_code = req.body.unload_request_code
        const unload_request_data = req.body.unload_request_data

        // DELETE OLD DETAILS   
        const deletedUnloadRequestDetails = await unloadRequestService.deleteUnloadRequestDetail({unload_request_code:unload_request_code})
        
        // CREATE NEW DETAILS 
        const createdUnlaodRequestDetails = await unloadRequestService.createMultipleUnoadRequestsDetails(unload_request_data)

        
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