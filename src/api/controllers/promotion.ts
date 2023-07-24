import PromotionService from "../../services/promotion"
import { Router, Request, Response, NextFunction } from "express"
import _ from "lodash"
import { Container } from "typedi"



const createPopulationArticle = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling createPopulationArticle controller endpoint")
    try {
        const promotionService = Container.get(PromotionService)
      

        const { populationData} = req.body
        const createdPopulation = await promotionService.createPopulationArticle(populationData)
       
        return res
            .status(200)
            .json({ message: "data created", data: createdPopulation  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createAdvantage = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling createAdvantage controller endpoint")
    try {
        const promotionService = Container.get(PromotionService)
      

        const { advantage} = req.body
        console.log(advantage)
        const createdAdvantage= await promotionService.createAdvantage(advantage)
       
        return res
            .status(200)
            .json({ message: "data created", data: createdAdvantage  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const createPromotion = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling createPromotion controller endpoint")
    try {
        const promotionService = Container.get(PromotionService)
      

        const { promo} = req.body
        console.log(promo)
        const createdPromo= await promotionService.createPromotion(promo)
       
        return res
            .status(200)
            .json({ message: "data created", data: createdPromo  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findPopulationsArticle = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling createPromotion controller endpoint")
    try {
        const promotionService = Container.get(PromotionService)
      

        const popsArticle= await promotionService.findAllPopArticle()

        const unique = [ ...new Set(popsArticle)]  

        // const filtered = _.mapValues(_.groupBy(popsArticle, 'population_code'));
        // console.log(filtered)
        //  const data = [];
        //     for (const [key, value] of Object.entries(filtered)) {
        //         data.push({
        //         population_code: key,
        //         description : value.length,
        //     });
            
        //  } 
        return res
            .status(200)
            .json({ message: "data created", data: unique  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

export default {
    createPopulationArticle,
    createAdvantage,
    createPromotion,
    findPopulationsArticle
}