import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/financialcharge"
const route = Router()

export default (app: Router) => {
    app.use("/financialcharges", route)

   
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
    route.get("/", controller.findAll)
}
