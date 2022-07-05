import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/currency"
const route = Router()

export default (app: Router) => {
    app.use("/currencies", route)

    route.post("/", controller.create)
}
