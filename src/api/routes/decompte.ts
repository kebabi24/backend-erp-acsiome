import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/decompte"
const route = Router()

export default (app: Router) => {
    app.use("/decomptes", route)

    route.get("/", controller.findAll)
    route.post('/findrange', controller.findByRange);
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    
}
