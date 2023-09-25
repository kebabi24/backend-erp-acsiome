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

        return res
            .status(200)
            .json({ message: "data created", data: popsArticle  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const findAdvantages = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling findAdvantages controller endpoint")
    try {
        const promotionService = Container.get(PromotionService)
      

        const advantages= await promotionService.findAllAdvantages()

        return res
            .status(200)
            .json({ message: "data created", data: advantages  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const getPromoByCode = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getPromoByCode controller endpoint")
    try {
        const promotionService = Container.get(PromotionService)
        const {code} = req.params

        const promo= await promotionService.getPromotion({promo_code :code })

        return res
            .status(200)
            .json({ message: "promo found", data: promo  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const getAdvantageByCode = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getPromoByCode controller endpoint")
    try {
        const promotionService = Container.get(PromotionService)
        const {code} = req.params

        const adv= await promotionService.getAdvantage({adv_code :code })

        return res
            .status(200)
            .json({ message: "adv found", data: adv  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const getPopulationArticleByCode = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getPromoByCode controller endpoint")
    try {
        const promotionService = Container.get(PromotionService)
        const {code} = req.params

        const pop= await promotionService.getPopArticle({population_code :code })

        return res
            .status(200)
            .json({ message: "pop found", data: pop  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const getPopulationCustomerByCode = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getPopulationByCode endpoint")
    try {
        const promotionService = Container.get(PromotionService)
        const { code } = req.params;
        console.log("hellloooo")
        const populations = await promotionService.getPopulationCustomerByCode(code)
   
        return res
            .status(200)
            .json({ message: "population search results", data: populations  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const createPopulationCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling get param categories endpoint")
    try {
        const promotionService = Container.get(PromotionService)
        const populationData = req.body
        
        

        const population = await promotionService.createPopulationCustomer(populationData)

      
        return res
            .status(200)
            .json({ message: "population created ", data: population  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }



export default {
    createPopulationArticle,
    createAdvantage,
    createPromotion,
    findPopulationsArticle,
    findAdvantages,
    getPromoByCode,
    getAdvantageByCode,
    getPopulationArticleByCode,
    getPopulationCustomerByCode,
    createPopulationCustomer,
}