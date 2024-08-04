import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/requistion"
const route = Router()

export default (app: Router) => {
    app.use("/requisitions", route)

    route.get("/", controller.findAll)
    route.get("/findappdet", controller.findAllAppDet)
    route.get("/findapp", controller.findAllApp)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/finddet", controller.findByDet)
    route.post("/findNotAll", controller.findNotByAll)
    route.post("/findAll", controller.findByAll)
   
    route.put("/:id", controller.update)
    route.put("/ids", controller.updatedet)
    route.put('/RQD/:id', controller.updatedRQD);
}
    