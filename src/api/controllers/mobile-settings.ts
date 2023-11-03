import MobileSettingsService from "../../services/mobile-settings"
import RoleService from "../../services/role"
import { Router, Request, NextFunction, Response } from "express"
import { Container } from "typedi"
import { QueryTypes } from 'sequelize'



// ********************** CREATE NEW USER MOBILE *************

const submitVisitResultData = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling Create Multiple Visit results  endpoint")
    try {
        const mobileSettingsServiceInstanse = Container.get(MobileSettingsService)

        var creationResults = 'no enteries to be created was sent'
        var deleteResults = 'no enteries to be deleted  was sent'
        var updateResults  = ['no enteries to be updated was sent']
        
        // CREATE 
        if(req.body.visitResults){
            // console.log(req.body.visitResults)
            const listOfVisitResultsToCreate = [...req.body.visitResults]
            creationResults = await mobileSettingsServiceInstanse.createManyVisitResult(listOfVisitResultsToCreate)
        }

        // UPDATE 
        if(req.body.updateData){
            console.log("updatedData"+ Object.keys(req.body.updateData))
            const listOfVisitResultsToCreate = req.body.updateData
            // creationResults = await mobileSettingsServiceInstanse.createManyVisitResult(listOfVisitResultsToCreate)
            for(const visitResult of listOfVisitResultsToCreate ){
                const updatedVisitList = await mobileSettingsServiceInstanse.updateOneVisitList(
                    {...visitResult}, 
                    { id : visitResult.id})
                    updateResults.push(updatedVisitList)
            }
            // console.log(listOfVisitResultsToCreate)
        }
        
        // DELETE 
        if(req.body.deleteIds){
            const deleteIds = req.body.deleteIds
            deleteResults = await mobileSettingsServiceInstanse.deleteVisitResultsById({id :deleteIds})
        }
        const newVisitResults = await mobileSettingsServiceInstanse.getVisitList()
        return res
            .status(201)
            .json({ 
                message: "created visit results succesfully", 
                createResults:  creationResults, 
                deleteResults:deleteResults,
                updateResults:updateResults,
                newVisitResults : newVisitResults,
            })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}



//****************** GET VISTI LIST  ************************
const getVisitList = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling get visit list  endpoint")

    const mobileSettingsServiceInstanse = Container.get(MobileSettingsService)
    
    try{
            const visitList = await mobileSettingsServiceInstanse.getVisitList()
    
                return res
                    .status(202)
                    .json({
                        message: "Data correct !",
                        visitList:visitList
                    })
            }
      
    catch(e){
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}


const getPaymentMethods = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getPaymentMethods  endpoint")

    const mobileSettingsServiceInstanse = Container.get(MobileSettingsService)
    
    try{
            const paymenetMethods = await mobileSettingsServiceInstanse.getPaymentMethods()
    
                return res
                    .status(202)
                    .json({
                        message: "Data correct !",
                        paymenetMethods:paymenetMethods
                    })
            }
      
    catch(e){
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}

const getCanelationReasons = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getCanelationReasons  endpoint")

    const mobileSettingsServiceInstanse = Container.get(MobileSettingsService)
    
    try{
            const cancelationReasons = await mobileSettingsServiceInstanse.getCanelationReasons()
    
                return res
                    .status(202)
                    .json({
                        message: "Data correct !",
                        cancelationReasons:cancelationReasons
                    })
            }
      
    catch(e){
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}


const createCancelationReasons = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling createCancelationReasons  endpoint")

    const mobileSettingsServiceInstanse = Container.get(MobileSettingsService)
    
    try{
        const {data} =  req.body
        
        const cancelationReasons = await mobileSettingsServiceInstanse.createCancelationReasons(data)
        return res.status(200)
            .json({
                message: "Data inserted !",
                cancelationReasons:cancelationReasons
             })
            }
      
    catch(e){
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}

const createPaymentMethods = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling createPaymentMethods  endpoint")

    const mobileSettingsServiceInstanse = Container.get(MobileSettingsService)
    
    try{
        const {data} =  req.body
        
        const paymentMethods = await mobileSettingsServiceInstanse.createPaymentMethods(data)
        return res.status(200)
            .json({
                message: "Data inserted !",
                paymentMethods:paymentMethods
             })
            }
      
    catch(e){
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}

//****************** GET PRICE LIST  ************************
const getPriceList = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling get visit list  endpoint")

    const mobileSettingsServiceInstanse = Container.get(MobileSettingsService)
    
    try{    
        const {code} =  req.params
            const priceList = await mobileSettingsServiceInstanse.findOnePriceList({pricelist_code : code})
    
                return res
                    .status(202)
                    .json({
                        data:priceList
                    })
            }
      
    catch(e){
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}

const createPriceList = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling createPaymentMethods  endpoint")

    const mobileSettingsServiceInstanse = Container.get(MobileSettingsService)
    
    try{
        const {data} =  req.body
        
        const priceList = await mobileSettingsServiceInstanse.createPriceList(data)
        return res.status(200)
            .json({
                message: "Data inserted !",
                priceList:priceList
             })
            }
      
    catch(e){
        logger.error("🔥 error: %o", e)
        return next(e)
    }

}








export default {
    submitVisitResultData,
    getVisitList,
    getPaymentMethods,
    getCanelationReasons,
    createCancelationReasons,
    createPaymentMethods,
    getPriceList,
    createPriceList
}
