import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/saleorder"
const route = Router()

export default (app: Router) => {
    app.use("/saleorders", route)

    route.post("/", controller.create)
    route.post("/direct", controller.createdirect)
    route.post("/ceram", controller.createceram)
    route.get("/", controller.findAll)
    route.get("/allwithdetail", controller.findAllwithDetails)
    route.post("/allsojob", controller.findAllSoJob)
  
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findrange", controller.findByrange)
    route.post("/findactivity", controller.getActivity)
    route.post("/findca", controller.getCA)
    route.put("/:id", controller.update)
    route.put("/Sod/:id", controller.updateSod)
    route.put("/project/:id", controller.updateProj)
    route.put("/So/:id", controller.updateSo)
    route.post("/findAll", controller.findByAll)  
    route.post("/findAllso", controller.findByAllSo)  
    
}
