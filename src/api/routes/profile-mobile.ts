import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/profile-mobile"
const route = Router()

export default (app: Router) => {
    app.use("/profiles-mobile", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
    route.post("/findone", controller.findByOne)
    route.put("/up:id", controller.updated)
    route.post("/findmenu", controller.findMenuBy)
}
