
import CRMService from "../../services/crm"
import codeService from '../../services/code';
import customersSercice from '../../services/customer';
import SequenceService from '../../services/sequence';

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { print } from "util";
const { Op } = require('sequelize')

  const getParamCategories = async (req: Request, res: Response, next: NextFunction) => {
        const logger = Container.get("logger")
        logger.debug("Calling get param categories endpoint")
        try {
            const crmServiceInstance = Container.get(CRMService)
        
            const categories = await crmServiceInstance.getParamCategories()
            return res
                .status(200)
                .json({ message: "fetched succesfully", data: categories  })
        } catch (e) {
            logger.error("🔥 error: %o", e)
            return next(e)
        }
  }

  const getTimeUnits = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getTimeUnits endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)
     
        const timeUnits = await crmServiceInstance.getTimeUnits()
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: timeUnits  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const getEventResults = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getTimeUnits endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)
     
        const eventResults = await crmServiceInstance.getEventResults()
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: eventResults  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const getActionTypes = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getActionTypes endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)
     
        const actionTypes = await crmServiceInstance.getActionTypes()
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: actionTypes  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const getMethods = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getMethods endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)
     
        const methods = await crmServiceInstance.getMethods()
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: methods  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const createParam = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling get param categories endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)
        const paramHeaderData = req.body.paramHeaderData
        const paramDetails = req.body.paramDetails

       

        let date1 = new Date(paramHeaderData.validity_date_start)
        paramHeaderData.validity_date_start = date1

        let date2 = new Date(paramHeaderData.validity_date_end)
        paramHeaderData.validity_date_end = date2
 
        // CREATE HEADER
        const header = await crmServiceInstance.createParamHedear(paramHeaderData)

        // CREATE DETAILS 
        const param_code = paramHeaderData.param_code
        const category = paramHeaderData.category
        paramDetails.forEach(detail => {
            detail['param_code'] = param_code
            detail['category'] = category
        });
        const details = await crmServiceInstance.createParamDetails(paramDetails)
        
        return res
            .status(200)
            .json({ message: "header created ", data: header  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const getEventsByDay = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getEventsByDay endpoint")
    try {

        const crmServiceInstance = Container.get(CRMService)
        const codeServiceInstance = Container.get(codeService)
        const customerServiceInstance = Container.get(customersSercice)

        // BEFORE RETURNING EVENTS , CREATE EVENTS OF BIRTHDAYS
        const calls = await codeServiceInstance.getCRMSelfCall()
        const indexBirthdays = calls.findIndex(call =>{return call.code_value === "birthdays"})
        const indexBirthdays2 = calls.findIndex(call =>{return call.code_value === "birthdays_2"})
        const indexAbsence = calls.findIndex(call =>{return call.code_value === "absence"})
        const indexRandom = calls.findIndex(call =>{return call.code_value === "random"})

        const birthdays = calls[indexBirthdays].dataValues.bool01
        const birthdays2 = calls[indexBirthdays2].dataValues.bool01
        const absence = calls[indexAbsence].dataValues.bool01
        const random = calls[indexRandom].dataValues.bool01

        // BIRTHDAYS : CLIENTS
        if(birthdays){
            const clients = await customerServiceInstance.findCustomersBirthdate()
            const param = await crmServiceInstance.getParamFilterd("birthdays")
            if(param != null && clients.length > 0){
                const paramDetails  = await crmServiceInstance.getParamDetails({param_code : param.param_code})
                for(const client of clients ){
                    const sequenceServiceInstance = Container.get(SequenceService);
                    const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB()
                    const addLine = await crmServiceInstance.createAgendaLine(client,param,paramDetails, sequence)   
                    console.log(addLine)
                }
            }
        }

        // BIRTHDAYS2 : CLIENTS
        if(birthdays2){
             const clients = await customerServiceInstance.findCustomersBirthdateFirstOrder()
             const param = await crmServiceInstance.getParamFilterd("birthdays_2")
            if(param != null && clients.length > 0){
                const paramDetails  = await crmServiceInstance.getParamDetails({param_code : param.param_code})
                for(const client of clients ){
                    const sequenceServiceInstance = Container.get(SequenceService);
                    const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB()
                    const addLine = await crmServiceInstance.createAgendaLine(client,param,paramDetails, sequence)   
                    
                }
            }
        }

        // BIRTHDAYS2 : CLIENTS
        if(absence){
            const absence_days = await codeServiceInstance.getAbsenceDayParam()
            const clients = await customerServiceInstance.findCustomersAbsent(absence_days)
            const param = await crmServiceInstance.getParamFilterd("absence")
             if(param != null && clients.length > 0){
                       const paramDetails  = await crmServiceInstance.getParamDetails({param_code : param.param_code})
                       for(const client of clients ){
                           const sequenceServiceInstance = Container.get(SequenceService);
                           const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB()
                           const addLine = await crmServiceInstance.createAgendaLine(client,param,paramDetails, sequence)   
                    
                       }
            }
             
        }

        // BIRTHDAYS2 : CLIENTS
        if(random){
            // const param = await crmServiceInstance.getParamFilterd("random")
            // const paramDetails  = await crmServiceInstance.getParamDetails({param_code : param.param_code})
            //  const elements  = await crmServiceInstance.getPopulationElements(paramDetails.population_code)
            // for(const element of elements ){
            //     const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB()
            //     const addLine = await crmServiceInstance.createAgendaLine(element.code_element,param,paramDetails, sequence)   
            //     console.log(addLine)
            // }
            // console.log(elements)
             
        }


        const events = await crmServiceInstance.getEventsByDay()
        return res
            .status(200)
            .json({ message: "fetched succesfully", data: events  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getEventsByDay endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)

        const {client_type, client_class , client_region, client_card} = req.body
        let query = []
        
        // CLIENT TYPE
        if(client_type){query.push({cm_type:client_type})}
    
        // CLIENT CLASS
        if(client_class){query.push({cm_class:client_class})}

        // CLIENT REGION
        if(client_region){query.push({cm_region:client_region})}
        if(client_card){
            if(client_card === true){
                query.push({cm_db:{
                    [Op.ne]: null
                }})
            }
        }

    //  let searchDate = new Date(today.getFullYear(),today.getMonth(),today.getDate()) this is what we pass

    //     const dt = date.getFullYear().toString()+'-'+(date.getMonth()+1).toString()+'-'+(date.getDate()).toString()
    //   console.log(dt)
    //   const param = await this.paramHeaderModel.findOne({
    //     where:{
    //             validity_date_start :  {[Op.lte]:new Date(dt)}  ,    
    //             validity_date_end :  {[Op.gte]:new Date(dt)}   
    //           }
    //     })

        console.log(query)
        
        const customers = await crmServiceInstance.getCustomers(query)
        console.log(customers.length)

        return res
            .status(200)
            .json({ message: "customers found succesfully", data: customers  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const createPopulation = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling get param categories endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)
        const populationData = req.body
        
        console.log(populationData)

        const population = await crmServiceInstance.createPopulation(populationData)

      
        return res
            .status(200)
            .json({ message: "population created ", data: population  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const getPopulations = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getEventsByDay endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)
        
        const populations = await crmServiceInstance.getPopulations()

        // EXTRACT POPULATIONS DATA
        let populatiosData = []
        populations.forEach(population => {
            populatiosData.push(population.dataValues)
        });

        // FILTER UNIQUE POPULATIONS
        console.log(populatiosData)
        const unique = Array.from(new Set(populatiosData.map(pop =>pop.population_code ))).map(code=>{
            return{
                population_code : code,
                population_desc : populatiosData.find(elem => elem.population_code === code).population_desc
            }
        })
        console.log
        return res
            .status(200)
            .json({ message: "populations found succesfully", data: unique  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const getPopulationByCode = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getPopulationByCode endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)
        const { code } = req.params;
        const populations = await crmServiceInstance.getPopulationByCode(code)
   
        return res
            .status(200)
            .json({ message: "population search results", data: populations  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const getCustomerData = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getCustomerData endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)
        const { phone } = req.params;

        const customer = await crmServiceInstance.getCustomerData({ad_addr : phone})

        
        console.log
        return res
            .status(200)
            .json({ message: "populations found succesfully", data: customer  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const createAgendaExecutionLine = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling createAgendaExecutionLine endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)
        const { executionLine , eventHeader} = req.body;
        console.log(executionLine)
        console.log(eventHeader)

        const agendaExecutionLine = await crmServiceInstance.createAgendaExecutionLine(executionLine,eventHeader)

        
        console.log
        return res
            .status(200)
            .json({ message: "agendaExecutionLine created succesfully", data: agendaExecutionLine  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }




export default {
    getParamCategories,
    createParam,
    getTimeUnits,
    getActionTypes,
    getMethods,
    getEventsByDay,    
    getCustomers,
    createPopulation,
    getPopulations,
    getPopulationByCode,
    getEventResults,
    getCustomerData,
    createAgendaExecutionLine
}
