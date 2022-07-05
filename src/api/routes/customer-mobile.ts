import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/customer-mobile"
const route = Router()

export default (app: Router) => {
    app.use("/customers-mobile", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.post("/find", controller.findBy)
    route.post("/findone", controller.findByOne)
  
}
