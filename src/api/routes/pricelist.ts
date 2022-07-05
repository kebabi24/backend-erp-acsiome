import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/pricelist"
const route = Router()

export default (app: Router) => {
    app.use("/pricelists", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/findOne", controller.findByOne)
    route.post("/update", controller.update)
    route.delete("/:id", controller.deleteOne)
    route.post("/findprice", controller.getPrice)
    route.post("/finddiscpct", controller.getDiscPct)
    
}
