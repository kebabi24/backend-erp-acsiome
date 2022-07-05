import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/tag"
const route = Router()

export default (app: Router) => {
    app.use("/tags", route)

    route.post("/", controller.create)
    route.post("/new", controller.createnew)
    route.get("/", controller.findAll)
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    route.post("/freeze", controller.freeze)
    route.post("/validate", controller.validateTag)
    route.post("/gap", controller.gap)
    route.post("/findOne", controller.findByOne)
    route.put("/:id", controller.update)
    route.put("/ids", controller.Reupdate)
    route.post("/findlastid", controller.findByLastId)
}
