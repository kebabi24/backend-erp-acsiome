import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/repertory"
const route = Router()

export default (app: Router) => {
    app.use("/repertorys", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.post("/Job", controller.createDetJob)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findJob", controller.findByJob)
    route.post("/findaddress", controller.findByAddress)
    route.post("/findOne", controller.findByOne)
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
}
