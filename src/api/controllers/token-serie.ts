import TokenSerieService from "../../services/token-serie"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { DATE, Op, Sequelize } from 'sequelize';
import sequelize from '../../loaders/sequelize';
import { isNull } from "lodash";

const createTokens = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")

    logger.debug("Calling createTokens endpoint with body: %o", req.body)
    try {
        const tokenSerieService = Container.get(TokenSerieService)
        
        const tokens = req.body.tokens
        tokens.forEach(token => {
            delete token.id
        });
        
        const createdTokens = await tokenSerieService.createTokens(tokens)

       
        return res
            .status(201)
            .json({ message: "created succesfully", data: { createdTokens  } })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}





const findOneByCode = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const productPageService = Container.get(ProductPageService)
        const {product_page_code} = req.params
        console.log(product_page_code)
        const productPage = await productPageService.findOneByCode(product_page_code)
        return res
            .status(200)
            .json({ message: "found one product page", data: {productPage}  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAllTokens = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const tokenSerieService = Container.get(TokenSerieService)
        const tokens = await tokenSerieService.findAllTokens()
        return res
            .status(200)
            .json({ message: "found all tokens", data: tokens  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const updateProfileProductPages = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")

    logger.debug("Calling Update profile product pages endpoint with body: %o", req.body)
    try {

        const productPageService = Container.get(ProductPageService)

        // console.log(Object.keys(req.body.pagesCodes))
        
        const profileCode = req.body.profile_code.profile_code
        const pagesCodes = req.body.pagesCodes.pagesCodes
        
        const updateProfileProductPages = await productPageService.updateProfileProductPages(
            {profileCode},{pagesCodes}
        )
        

        return res
            .status(201)
            .json({ message: "updated profile pages succesfully", data: { updateProfileProductPages  } })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}

export default {
    createTokens,
    findAllTokens
}
