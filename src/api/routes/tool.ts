import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/tool"
const route = Router()

export default (app: Router) => {
    app.use("/tools", route)

    
    route.post("/", controller.create)
    route.get("/allwithdetail", controller.findAllwithDetails)
   
    route.get("/", controller.findAll)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/:id", controller.update)
}
