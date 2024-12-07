import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/account-order"
const route = Router()

export default (app: Router) => {
    app.use("/account-orders", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.post("/P", controller.createP)
    route.post("/PCUST", controller.createPCUST)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
}
