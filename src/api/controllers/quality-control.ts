import QualityControlService from "../../services/quality_control"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { DATE, Op, Sequelize } from 'sequelize';
import sequelize from '../../loaders/sequelize';
import { isNull } from "lodash";

const createStandardSpecification = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")

    logger.debug("Calling Create productPage endpoint with body: %o", req.body)
    try {

        const specificationService = Container.get(QualityControlService)
        console.log(req.body)
        
        const standardSpecificationHeader = req.body.standardSpecificationHeader
        const standardSpecificationDetails = req.body.standardSpecificationDetails

        // let date1 = new Date(standardSpecificationHeader.mp_expire)
        // standardSpecificationHeader.mp_expire = date1
        
        const standarSpecificationHeader = await specificationService.createStandartSpecificationHeader({
            ...standardSpecificationHeader
        })

        const standarSpecificationDetails = await specificationService.createStandartSpecificationDetails(standardSpecificationDetails)

        

        // for(const productCode of productCodes){
        //     const productPageDetails = await productPageService.createProductPageProducts(
        //         {
        //             productPageCode,
        //         },
        //         {
        //             productCode,
        //         })
        // }

        
       
       
        return res
            .status(201)
            .json({ message: "created succesfully", data: { standarSpecificationHeader  } })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}


const findOneSpecificationByCode = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling find one  code endpoint")
    try {
        const specificationService = Container.get(QualityControlService)
        const {specification_code} = req.params
        const specification = await specificationService.findSpecificationByCode(specification_code)
        return res
            .status(200)
            .json({ message: "found one specification", data: {specification}  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



















export default {
    findOneSpecificationByCode,
    createStandardSpecification,
}
