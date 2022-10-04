import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/product-page"
const route = Router()

export default (app: Router) => {
    app.use("/productPage", route)

    route.get("/findOneByCode/:product_page_code", controller.findOneByCode)
    route.post("/createProductPage", controller.createProductPage)
    // route.post("/find", controller.findBy)
    // route.post("/findOne", controller.findByOne)
    // route.get("/:id", controller.findOne)
    // route.get("/", controller.findAll)
    // route.post("/findprod", controller.findProd)
    // route.post("/stk", controller.findAllwithstk)
    // route.put("/:id", controller.update)
}
