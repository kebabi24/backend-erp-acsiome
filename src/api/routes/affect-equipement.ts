import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/affect-equipement"
const route = Router()

export default (app: Router) => {
    app.use("/affectequipements", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findone", controller.findByOne)
    route.put("/:id", controller.update)
    route.post("/getallpaymentby", controller.findBetweenDate)
 
}
