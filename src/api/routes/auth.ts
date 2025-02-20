import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/auth"
const route = Router()

export default (app: Router) => {
    app.use("/auth", route)

    route.post("/login", controller.login)
    route.get("/getPhone/:phone", controller.getCustomerPhone)
    route.post("/verifypwd", controller.verifypwd)
    route.post("/createCustomer", controller.createCustomer)
    route.get("/getNotifications", controller.getNotifications)
    route.get("/getWilayasCommunes", controller.getWilayasCommunes)
    route.get("/getValidePromo", controller.getValidePromo)
    route.post("/loginMobile", controller.loginMobile)
}
