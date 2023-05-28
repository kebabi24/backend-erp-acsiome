import LoadRequestService from "../../services/load-request"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { DATE, Op, Sequelize } from 'sequelize';
import sequelize from '../../loaders/sequelize';
import { isNull } from "lodash";
import loadRequest from "../routes/load-request";
import { Console } from "console";
import moment from "moment-timezone";

const findAllRoles = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)
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

const findAllLoadRequeusts = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)
        const role_code = req.params.role_code
        const loadRequests = await loadRequestService.findAllLoadRequestsByRoleCode(role_code)
        return res
            .status(200)
            .json({ message: "found all roles of upper role", data: loadRequests  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAllLoadRequeusts10 = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)
        const role_code = req.params.role_code
        const loadRequests = await loadRequestService.findAllLoadRequests10ByRoleCode(role_code)
        return res
            .status(200)
            .json({ message: "found all roles of upper role", data: loadRequests  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

// const findAllLoadRequeusts20 = async (req: Request, res: Response, next: NextFunction) => {
//     const logger = Container.get("logger")
//     logger.debug("Calling find one  code endpoint")
//     try {
//         const loadRequestService = Container.get(LoadRequestService)
//         const role_code = req.params.role_code
//         const loadRequests = await loadRequestService.findAllLoadRequests20ByRoleCode(role_code)
//         return res
//             .status(200)
//             .json({ message: "found all roles of upper role", data: loadRequests  })
//     } catch (e) {
//         logger.error("🔥 error: %o", e)
//         return next(e)
//     }
// }


const findAllLoadRequeusts20 = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)
        const loadRequests = await loadRequestService.findAllLoadRequests20()
        return res
            .status(200)
            .json({ message: "found all roles of upper role", data: loadRequests  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}


// for loadrequest 0 to 10
const getLoadRequestData = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getLoadRequestData endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)

        const load_request_code = req.params.load_request_code
        
        const loadRequest = await loadRequestService.findLoadRequest({load_request_code :load_request_code})
        const user_mobile_code = loadRequest.user_mobile_code
        const role = await loadRequestService.getRole({user_mobile_code :user_mobile_code })
        
        const loadRequestData = await loadRequestService.getLoadRequestData(user_mobile_code,load_request_code,role.role_loc,role.role_site )
        
        return res
            .status(200)
            .json({ message: "data ready", data: loadRequest , loadRequestData:loadRequestData })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

// for loadrequest 10 to 20
const getLoadRequestDataV2 = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getLoadRequestData endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)

        const load_request_code = req.params.load_request_code
        
        const loadRequest = await loadRequestService.findLoadRequest({load_request_code :load_request_code})
        
        const user_mobile_code = loadRequest.user_mobile_code
        const role = await loadRequestService.getRole({user_mobile_code :user_mobile_code })
        const loadRequestData = await loadRequestService.getLoadRequestDataV2(user_mobile_code,load_request_code , role.role_site, role.role_loc)
        
        return res
            .status(200)
            .json({ message: "data ready", data: loadRequest , loadRequestData:loadRequestData })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findLotsOfProduct = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling findLotsOfProduct endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)

        const ld_loc = req.body.ld_loc
        const ld_site = req.body.ld_site
        const product_code = req.body.product_code 
        console.log(ld_loc)
        console.log(ld_site)
        console.log(product_code)
        
        const lots = await loadRequestService.getLotsOfProduct(ld_loc,ld_site,product_code)
        
        
        return res
            .status(200)
            .json({ message: "data ready", data: lots })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const updateLoadRequestStauts10 = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling updateLoadRequestStauts10 controller endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)

        const load_request_code = req.body.load_request_code
        const load_request_data = req.body.load_request_data
        
        for(const page of load_request_data ){
            for(const product of page.products ){
                console.log('\n')
                console.log(product)

                if(product.qt_request === 0 && product.qt_validated === 0){
                    continue
                }

                if(product.qt_request > 0 && product.qt_request  > 0 ){
                    const updatedLoadRequestLine = await loadRequestService.updateLoadRequestLine(load_request_code,product.product_code,product.qt_validated)
                   
                }
                if(product.qt_request === 0 || null && product.qt_validated  > 0 ){
                    const createdLoadRequestLine = await loadRequestService.createLoadRequestLine(load_request_code,product.product_code,product.qt_validated,0,product.pt_price)
                }
            }
        }

        const updatedLoadRequest = await loadRequestService.updateLoadRequestStatusTo10(load_request_code)
       
        return res
            .status(200)
            .json({ message: "data ready", data: updatedLoadRequest  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



const findAllLoadRequestLines = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)
        const load_request_code = req.params.load_request_code
        const loadRequestLines = await loadRequestService.findAllLoadRequestLines(load_request_code)
        return res
            .status(200)
            .json({ message: "found all load request lines", data: loadRequestLines  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAllLoadRequest20Details = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)
        const load_request_code = req.params.load_request_code
        const loadRequestLines = await loadRequestService.findAllLoadRequest20Details(load_request_code)
        return res
            .status(200)
            .json({ message: "found all load request lines", data: loadRequestLines  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

// for riane
const findAllLoadRequeusts40 = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)
        console.log(req.body)
        let loadRequests = []
        const loadRequests50 = []

        // DATA FROM REQUEST BODY
        const role_code = req.body.role_code
        const role_site = req.body.role_site
        const role_loc = req.body.role_loc
        const user_mobile_code = req.body.user_mobile_code
        const LoadRequestStatus0 = req.body.LoadRequestStatus0
        const LoadRequestStatus_10 = req.body.LoadRequestStatus_10
        const LoadRequestStatus50 = req.body.LoadRequestStatus50
        const loadRequestsLines0 = req.body.loadRequestsLines0 

        // STATUS 0
        if(LoadRequestStatus0){
            LoadRequestStatus0.forEach(loadRequest => {
                delete loadRequest.id
                const formatted_date = loadRequest.date_creation+'.63682+01'
                loadRequest.date_creation = formatted_date
               
            });
            const loadRequests = await loadRequestService.createMultipleLoadRequests(LoadRequestStatus0)
            
        }
        
        // LOAD REQUEST LINES
        if(loadRequestsLines0){
            loadRequestsLines0.forEach(loadRequestLine => {
                console.log(loadRequestLine)
                delete loadRequestLine.line_code
                const formatted_date = loadRequestLine.date_creation+'.63682+01'
                loadRequestLine.date_creation = formatted_date
            });
            const loadRequestsLines = await loadRequestService.createMultipleLoadRequestsLines(loadRequestsLines0)
            
        }
        
        //  STATUS 10 : to -10
        if(LoadRequestStatus_10){
            const loadRequests10 = []
            LoadRequestStatus_10.forEach(loadRequest => {
                loadRequests10.push(loadRequest.load_request_code)
            });
            // update status to - 10
            const updateLoadRequeust = await loadRequestService.updateLoadRequestStatusToX(loadRequests10,-10)
        }

        //  STATUS 50  : to 50
        if(LoadRequestStatus50){
            const loadRequests50 = []
            LoadRequestStatus50.forEach(loadRequest => {
                loadRequests50.push(loadRequest.load_request_code)
            });
            // update status to 50 to 50
            const updateLoadRequeust = await loadRequestService.updateLoadRequestStatusToX(loadRequests50,50)
        }
    
        // LOAD REQUESTS : 40 
        loadRequests = await loadRequestService.findAllLoadRequests40ByRoleCode(role_code)
        
        const loadRequestsCodes = []
        loadRequests.forEach(loadRequest => {
            loadRequestsCodes.push(loadRequest.load_request_code)
        });
        
        // LOAD REQUESTS LINES
        let loadRequestsLines =[] 
        if(loadRequestsCodes.length >0){
            loadRequestsLines = await loadRequestService.findAllLoadRequestsLinesByLoadRequestsCode(loadRequestsCodes)
        }
        
        // LOAD REQUESTS DETAILS
        let loadRequestsDetails =[]
        if(loadRequestsCodes.length >0){
        const loadRequestsDetails = await loadRequestService.findAllLoadRequestsDetailsByLoadRequestsCode(loadRequestsCodes)
        }
        
        return res
            .status(200)
            .json({ message: "Load Requests with status 40 found", data: {loadRequests:loadRequests ,loadRequestsLines:loadRequestsLines,loadRequestsDetails:loadRequestsDetails }  })
        } catch (e) {
            logger.error("🔥 error: %o", e)
            return next(e)
    }
}

const updateLoadRequests4O = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const loadRequestService = Container.get(LoadRequestService)

        const loadRequestsCodes = req.body.load_requests_codes
         const updateLoadRequeust = await loadRequestService.updateLoadRequestStatusToX(loadRequestsCodes,40)
        return res
            .status(200)
            .json({ message: "Load Requests with status 40 found", data: updateLoadRequeust  })
        } catch (e) {
            logger.error("🔥 error: %o", e)
            return next(e)
    }
}

const createLoadRequestDetails = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")

    try {

        const loadRequestService = Container.get(LoadRequestService)
        
        const load_request_details = req.body.load_request_details
        
        
        const loadRequestsDetails = await loadRequestService.createMultipleLoadRequestsDetails(
           load_request_details
        )
        console.log(loadRequestsDetails)    
        return res
            .status(201)
            .json({ message: "created succesfully", data:  loadRequestsDetails   })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createLoadRequestDetailsChangeStatus = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")

    try {

        const loadRequestService = Container.get(LoadRequestService)
        
        const load_request_details = req.body.load_request_details
        const load_request_code = req.body.load_request_code
        const loadRequestsDetails = await loadRequestService.createMultipleLoadRequestsDetails(
           load_request_details
        )
        const loadRequest = await loadRequestService.updateLoadRequestStatusToX(load_request_code,20)
        console.log(loadRequestsDetails)    
        return res
            .status(201)
            .json({ message: "created succesfully", data:  loadRequestsDetails   })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

function dateIsValid(date) {
    return !Number.isNaN(new Date(date).getTime());
  }

export default {
    findAllLoadRequeusts,
    findAllRoles,
    getLoadRequestData,
    findAllLoadRequeusts40,
    updateLoadRequestStauts10,
    findAllLoadRequeusts10,
    findAllLoadRequestLines,
    getLoadRequestDataV2,
    findLotsOfProduct,
    createLoadRequestDetails,
    createLoadRequestDetailsChangeStatus,
    findAllLoadRequeusts20,
    findAllLoadRequest20Details,
    updateLoadRequests4O,
}

// validation 0-10   
