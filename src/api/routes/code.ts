import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/code"
const route = Router()

export default (app: Router) => {
    app.use("/codes", route)

    route.get("/", controller.findAll)
    route.get("/check", controller.findCheck)
    route.get("/act", controller.findAct)
    route.get("/wostatus", controller.findwostatus)
    route.get("/emballage", controller.findemballage)
    route.get("/postes", controller.findpostes)
    route.get("/rep_type", controller.findreptype)
    route.get("/rep_job", controller.findrepjob)
    route.get("/emptime", controller.findEmpTime)
    route.get("/empshift", controller.findEmpShift)
    route.get("/emptype", controller.findEmpType)
    route.get("/triggerType", controller.findTriggerType)
    route.get("/conge", controller.findConge)
    route.get("/module", controller.findModule)
    route.get("/trans", controller.findTrans)
    route.get("/verify", controller.findVerify)
    route.get("/types", controller.findTypes)
    route.get("/parttypes", controller.findPartTypes)
    route.get("/colors", controller.findColors)
    route.get("/etats", controller.findEtats)
    route.get("/disease", controller.finddisease)
    route.post("/", controller.create)
    route.post("/addcodes", controller.createCodes)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findone", controller.findByOne)
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
    route.post("/deletes", controller.deletes)
    route.post("/sumbitDomain", controller.DomainTraining)
}
