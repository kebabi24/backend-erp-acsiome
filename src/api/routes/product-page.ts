import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/product-page"
const route = Router()

export default (app: Router) => {
    app.use("/productPage", route)

    route.get("/findOneByCode/:product_page_code", controller.findOneByCode)
    route.post("/createProductPage", controller.createProductPage)
    route.get("/getPageProducts/:product_page_code", controller.findPageProductsByPageCode)
    route.get("/", controller.findAllProductPages)
    route.post("/updateProfileProductsPages", controller.updateProfileProductPages)
    route.put("/:product_page_code", controller.updatePage)
   
}
