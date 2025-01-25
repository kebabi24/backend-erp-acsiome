import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/affect-employe"
const route = Router()

export default (app: Router) => {
    app.use("/affect-employes", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findglobal", controller.findByglobal)
    route.put("/:id", controller.update)
 
}
