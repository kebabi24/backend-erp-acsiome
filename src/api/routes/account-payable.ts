import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/account-payable"
const route = Router()

export default (app: Router) => {
    app.use("/account-payables", route)

    route.get("/", controller.findAll)
    route.post("/find", controller.findBy)
    route.post("/findwithadress", controller.findBywithadress)
    route.post("/findOne", controller.findByOne)
    route.post("/", controller.create)
    route.post("/P", controller.createP)
    route.post("/note", controller.createNote)
    route.post("/UP", controller.createUP)
    route.get("/:id", controller.findOne)
    
    route.put("/:id", controller.update)
    route.delete("/:id", controller.deleteOne)
}
