import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/token-serie"
const route = Router()

export default (app: Router) => {
    app.use("/token-serie", route)


    route.post("/createTokens", controller.createTokens)
    route.get("/", controller.findAllTokens)
    // route.post("/updateProfileProductsPages", controller.updateProfileProductPages)
    
}
