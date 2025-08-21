import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/sequence"
const route = Router()

export default (app: Router) => {
    app.use("/sequences", route)
    
    route.get("/findsequence", controller.findBySequence)
    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.post("/S", controller.createS)
    route.get("/:id", controller.findOne)
    route.get("/ser/:id", controller.findOneService)
    route.post("/find", controller.findBy)
    route.post("/findservice", controller.findByService)
    
    route.post("/findone", controller.findByOne)
    route.put("/:id", controller.update)
    route.put("/det/:id", controller.updateDet)
    route.delete("/:id", controller.deleteOne)
}
