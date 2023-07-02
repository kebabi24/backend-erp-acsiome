import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/employe-salary"
const route = Router()

export default (app: Router) => {
    app.use("/employe-salarys", route)

    route.get("/", controller.findAll)
    route.post("/", controller.create)
   
    route.get("/:id", controller.findOne)
    route.post("/find", controller.findBy)
    
    
}
