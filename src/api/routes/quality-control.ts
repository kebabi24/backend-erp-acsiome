import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/quality-control"
const route = Router()

export default (app: Router) => {
    app.use("/qualityControl", route)

    route.post("/createSpecification", controller.createStandardSpecification)
    route.post("/createTestsHistory", controller.createTestsHistory)
    route.get("/findOneSpecificationByCode/:specification_code", controller.findOneSpecificationByCode)
    route.get("/findSpecificationWithDetails/:specification_code", controller.findOneSpecificationWithDetails)
    route.get("/findSpecifications", controller.getSpecificationsCodes)
   
    
}
