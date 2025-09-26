import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/vendor-proposal"
const route = Router()

export default (app: Router) => {
    app.use("/vendor-proposals", route)

    route.post("/", controller.create)
    route.get("/", controller.findAll)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findprice", controller.findByPrice)
    route.post("/findOne", controller.findByOne)
    route.put("/:id", controller.update)
}
