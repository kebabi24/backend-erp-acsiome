import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/bom"
const route = Router()

export default (app: Router) => {
    app.use("/boms", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
    route.post("/findone", controller.findByOne)
    route.post("/calcbomcost", controller.CalcCost)
    route.post("/addbomcost", controller.UpdateBomCost)
}
