import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/load-request"
const route = Router()

export default (app: Router) => {
    app.use("/load-request", route)

  
    route.get("/findAllRoles/:upper_role_code", controller.findAllRoles)
    route.get("/findAllLoadRequests/:role_code", controller.findAllLoadRequeusts)
    route.get("/findAllLoadRequests10/:role_code", controller.findAllLoadRequeusts10)
    route.get("/findAllLoadRequests20/:role_code", controller.findAllLoadRequeusts20)
    route.get("/findLoadRequestData/:load_request_code", controller.getLoadRequestData)
    route.get("/findLoadRequestDataV2/:load_request_code", controller.getLoadRequestDataV2)
    route.get("/findLoadRequestLines/:load_request_code", controller.findAllLoadRequestLines)
    route.get("/findLoadRequest20Details/:load_request_code", controller.findAllLoadRequest20Details)
    route.get("/findLoadRequestLinesDetails/:load_request_code", controller.findAllLoadRequestLinesDetails)
    route.post("/findLoadRequestsDates/", controller.findLoadRequestsBetweenDates)
    route.post("/findLoadRequests40/", controller.findAllLoadRequeusts40)
    route.post("/updateLoadRequest/", controller.updateLoadRequestStauts10)
    route.post("/updateLoadRequest40/", controller.updateLoadRequests4O)
    route.post("/findLostProduct/", controller.findLotsOfProduct)
    route.post("/createLoadRequestDetails/", controller.createLoadRequestDetails)
    route.post("/createLoadRequestDetailsStatus/", controller.createLoadRequestDetailsChangeStatus)


}
