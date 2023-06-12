import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/unload-request"
const route = Router()

export default (app: Router) => {
    app.use("/unload-request", route)

  
    route.get("/findAllRoles/:upper_role_code", controller.findAllRoles)
    route.get("/findAllUnloadRequests/:role_code", controller.findAllUnloadRequeusts)
    route.get("/findAllUnloadRequests10/:role_code", controller.findAllUnloadRequeusts10)
    route.get("/findUnloadRequestData/:unload_request_code", controller.getUnoadRequestData)
    route.post("/updateUnloadRequest10/", controller.updateUnoadRequestStauts10)
    route.post("/updateUnloadRequest20/", controller.updateUnoadRequestStauts20)

}
