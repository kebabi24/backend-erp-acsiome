
import CRMService from "../../services/crm"
import codeService from '../../services/code';
import customersSercice from '../../services/customer';
import SequenceService from '../../services/sequence';

import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import { print } from "util";
import _ from "lodash";
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

        // BIRTHDAYS2 : ORDER
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

        // ABSENCE
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

        // RANDOM
        if(random){
             const sequenceServiceInstance = Container.get(SequenceService);
             const param = await crmServiceInstance.getParamFilterd("random")
             const paramDetails  = await crmServiceInstance.getParamDetails({param_code : param.param_code})
             const elements  = await crmServiceInstance.getPopulationElements(paramDetails.population_code)
             console.log(paramDetails.dataValues.population_nb)
             const max_value = elements.length 
             const nb = paramDetails.dataValues.population_nb
             let selected_random_indexes = selectRandomIndexes(max_value, nb) 
            
            for(const index of selected_random_indexes ){
                const element = elements[index]
                const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB()
                const addLine = await crmServiceInstance.createAgendaLine(element.code_element,param,paramDetails, sequence)   
            }
             
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

  const createOneAgendaLine = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getEventsByDay endpoint")
    try {

        const crmServiceInstance = Container.get(CRMService)

        const {newEventData} = req.body

        console.log(req.body)
      
        const addLine = await crmServiceInstance.createOneAgendaLine(newEventData) 
        
        const updatedLines = await crmServiceInstance.updateEventStatus(newEventData.code_event)
                    
                
        return res
            .status(200)
            .json({ message: "created one agenda line", data: addLine  })
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
        const { executionLine , eventHeader ,recreateEvent} = req.body;
        console.log(recreateEvent)
        console.log(eventHeader)
        console.log(executionLine)

        const agendaExecutionLine = await crmServiceInstance.createAgendaExecutionLine(executionLine,eventHeader)

        if(recreateEvent){
            const sequenceServiceInstance = Container.get(SequenceService);
            console.log("recreating the event")
            const param = await crmServiceInstance.getParamByCode(eventHeader.param_code)
            const paramDetails  = await crmServiceInstance.getParamDetails({param_code : param.param_code})
            const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB()
            const addLine = await crmServiceInstance.createAgendaLine(executionLine.phone_to_call,param,paramDetails, sequence)  

        }


        
        console.log
        return res
            .status(200)
            .json({ message: "agendaExecutionLine created succesfully", data: agendaExecutionLine  })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const getCRMDashboardData = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getCustomerData endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)

         const lines = await crmServiceInstance.getAllAgendaExecutionLines()
         const event_results = await crmServiceInstance.getEventResults()
         
         const categories = await crmServiceInstance.getParamCategories()
         const action_types = await crmServiceInstance.getActionTypes()
         const methods_types = await crmServiceInstance.getMethods()
         
         
         let data = {}

         // NUMBER OF ALL EVENTS
         data['nb_events']= lines.length

         // ACTIONS
         const actions = _.mapValues(_.groupBy(lines, 'action'));
         const actions_filtered = [];
            for (const [key, value] of Object.entries(actions)) {
                let label = getElementLabel(action_types,key)
                actions_filtered.push({
                action_code: key,
                action_label : label,
                action_nb : value.length,
                // events: value,
            });
         } 

         // METHODS  
         const methods = _.mapValues(_.groupBy(lines, 'method'));
         const methods_filtered = [];
            for (const [key, value] of Object.entries(methods)) {
                let label = getElementLabel(methods_types,key)
                methods_filtered.push({
                method_code: key,
                 method_label : label , 
                method_nb : value.length,
                // events: value,
            });
         } 

         // EVENT RESULTS 
         const eventResults = _.mapValues(_.groupBy(lines, 'event_result'));
         const eventResults_filtered = [];
            for (const [key, value] of Object.entries(eventResults)) {
                let label = getElementLabel(event_results,key)
                eventResults_filtered.push({
                event_result_code: key,
                event_result_label: label,
                event_result_nb : value.length,
                // events: value,
            });
         } 

          // EVENT RESULTS 2
          const nb_events_categories = _.mapValues(_.groupBy(lines, 'category'));
          const nb_events_categories_filterd = [];
             for (const [key, value] of Object.entries(nb_events_categories)) {
                let label = getElementLabel(categories,key)
                nb_events_categories_filterd.push({
                 category_code: key,
                 category_label : label,
                 nb_events : value.length,
             });
          } 

         // TAUX DE SATISFACTIONS
         const index_sat_result = event_results.findIndex((result)=>{return result.bool01 == false})
        //  const index_satisfaction = eventResults_filtered.findIndex((result)=>{return result.event_result_code === event_results[index_sat_result].code_value})
         const sat_code = event_results[index_sat_result].code_value
         //  const nb_events_satisfied = eventResults_filtered[index_satisfaction].event_result_nb
        //  const taux = nb_events_satisfied/lines.length 
        const lines_days = _.mapValues(_.groupBy(lines, 'event_day'));
        const lines_days_filterd = [];
            for (const [key, value] of Object.entries(lines_days)) {
                let counter = 0 
                value.forEach( line =>{
                    if(line.event_result === sat_code  ) counter++
                })
                lines_days_filterd.push({
                day: key,
                nb_events : value.length,
                percentage : (counter / value.length) * 100
            });
          
        }
        
         // ADD RESULTS TO DATA OBJECT
         data['rate'] = lines_days_filterd
         data['actions'] = actions_filtered
         data['methods'] = methods_filtered
         data['event_results'] = eventResults_filtered
         data['events_categories'] = nb_events_categories_filterd


        
    
        return res
            .status(200)
            .json({ message: "got all agenda execution lines", data:data })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }

  const createAgendaEventOrderZero = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling getCustomerData endpoint")
    try {
        const crmServiceInstance = Container.get(CRMService)
        const sequenceServiceInstance = Container.get(SequenceService);

        const { category_code , phone } = req.body;
        
        
        const param = await crmServiceInstance.getParamFilterd(category_code)
        let addLine;
        if(param){
            const paramDetails  = await crmServiceInstance.getParamDetails({param_code : param.param_code})
            const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB()
            addLine = await crmServiceInstance.createAgendaLineOrder0(phone,param,paramDetails, sequence)   
        }
        
        return res
            .status(200)
            .json({ message: "got all agenda execution lines", data:addLine })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
  }



  // FOR CRM : RANDOM : to select nb random unique indexes between 0 and max_value
  const selectRandomIndexes = (max_value , nb)=>{
    let selectedIndexes = []
    while (selectedIndexes.length < nb){
        const new_value = Math.floor(Math.random() * (max_value))
        const index = selectedIndexes.indexOf(new_value)
        if(index == -1 ){
         selectedIndexes.push(new_value)
        }
     }
    return  selectedIndexes
  }   

  const getElementLabel = (source , element_code)=>{
    let index = source.findIndex(element =>{
        return element.code_value === element_code
    })
    return  source[index].code_desc
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
    createAgendaExecutionLine,
    createOneAgendaLine,
    getCRMDashboardData,
    createAgendaEventOrderZero
}
