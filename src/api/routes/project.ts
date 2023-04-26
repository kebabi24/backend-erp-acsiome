import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/project"
const route = Router()

export default (app: Router) => {
    app.use("/projects", route)

    
    route.post("/", controller.create)
    route.post("/createAsset", controller.createAssetDown)
    route.get("/projectTypes", controller.getProjectTypes)
    route.get("/allwithdetail", controller.findAllwithDetails)
    route.get("/allbomdetail", controller.findAllbomDetails)
    route.get("/allpmdetail", controller.findpmdetail)
    route.get("/findAssignedEmps/:project_code", controller.findAssignedEmpOfProject)
    route.get("/", controller.findAll)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findall", controller.findAllBy)
    route.post("/findtask", controller.findByTask)
    route.put("/M:id", controller.updateM)
    route.put("/:id", controller.update)
}
