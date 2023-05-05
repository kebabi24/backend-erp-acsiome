import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/code"
const route = Router()

export default (app: Router) => {
    app.use("/codes", route)

    route.get("/", controller.findAll)
    route.get("/check", controller.findCheck)
    route.get("/emptime", controller.findEmpTime)
    route.get("/empshift", controller.findEmpShift)
    route.get("/emptype", controller.findEmpType)
    route.get("/conge", controller.findConge)
    route.get("/module", controller.findModule)
    route.get("/trans", controller.findTrans)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
}
