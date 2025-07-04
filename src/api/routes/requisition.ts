import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/requistion"
const route = Router()

export default (app: Router) => {
    app.use("/requisitions", route)

    route.get("/findalluser", controller.findAllUser)
    route.get("/findappdet", controller.findAllAppDet)
    route.get("/findapp", controller.findAllApp)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/finddet", controller.findByDet)
    route.post("/findNotAll", controller.findNotByAll)
    route.post("/findAll", controller.findByAll)
    route.get("/", controller.findAll)
    route.put("/:id", controller.update)
    route.put("/URQD/:id", controller.updatedet)
    route.put('/RQD/:id', controller.updatedRQD);
    
}
    