import { group } from 'console';
import { Sequelize } from 'sequelize/types';
import { Service, Inject } from 'typedi';

const { Op } = require('sequelize')

@Service()
export default class CRMService {
  constructor(
    @Inject('paramHeaderModel') private paramHeaderModel: Models.paramHeaderModel,
    @Inject('paramDetailsModel') private paramDetailsModel: Models.paramDetailsModel,
    @Inject("codeModel") private codeModel: Models.CodeModel,
    @Inject("agendaModel") private agendaModel: Models.agendaModel,
    @Inject("agendaExecutionModel") private agendaExecutionModel: Models.agendaExecutionModel,
    @Inject("customerModel") private customerModel: Models.CustomerModel,
    @Inject("populationModel") private populationModel: Models.populationModel,
    @Inject("addressModel") private addressModel: Models.AddressModel,
    @Inject('logger') private logger,
  ) {}



  public async findOneParam(query: any): Promise<any> {
    try {
      const category = await this.paramHeaderModel.findOne({ where: query });
      this.logger.silly('find one param header crm');
      return category;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getParamCategories(): Promise<any> {
    try {
        const categories = await this.codeModel.findAll({
            where:{code_fldname :"crm_param_category" },
            attributes: ["id","code_value","code_desc","code_cmmt","bool01"]
        })
        this.logger.silly("find categories ")
        return categories
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async createParamHedear(data:any): Promise<any> {
    try {
        const paramHeader = await this.paramHeaderModel.create(data)
        this.logger.silly("param header created ")
        return paramHeader
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async createParamDetails(data:any): Promise<any> {
    try {
        const paramDetails = await this.paramDetailsModel.bulkCreate(data)
        this.logger.silly("param header created ")
        return paramDetails
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getEventResults(): Promise<any> {
    try {
        const eventResults = await this.codeModel.findAll({
            where:{code_fldname :"crm_event_result" },
            attributes: ["id","code_value","code_desc","bool01"]
        })
        this.logger.silly("find eventResults ")
        return eventResults
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getTimeUnits(): Promise<any> {
    try {
        const timeUnits = await this.codeModel.findAll({
            where:{code_fldname :"crm_time_unit" },
            attributes: ["id","code_value","code_desc"]
        })
        this.logger.silly("find categories ")
        return timeUnits
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getActionTypes(): Promise<any> {
    try {
        const actionTypes = await this.codeModel.findAll({
            where:{code_fldname :"crm_action_type" },
            attributes: ["id","code_value","code_desc"]
        })
        this.logger.silly("find categories ")
        return actionTypes
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getMethods(): Promise<any> {
    try {
        const methods = await this.codeModel.findAll({
            where:{code_fldname :"crm_method" },
            attributes: ["id","code_value","code_desc"]
        })
        this.logger.silly("find categories ")
        return methods
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getEventsByDay(): Promise<any> {
    try {
        let date =  Date.now()
        let today = new Date(date)
        const dt = today.getFullYear().toString()+'-'+(today.getMonth()+1).toString()+'-'+(today.getDate()).toString()
        
        const events = await this.agendaModel.findAll({
            where:{
              status : "O",
              visibility:true
              // event_day :  {[Op.eq]:new Date(dt)}      
            }
        })
        this.logger.silly("found events ")
        return events
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getCustomers(query: any): Promise<any> {
    try {
      const customers = await this.customerModel.findAll({
         where:{
          [Op.and]:[query]
        },
        attributes: ["id","cm_addr","cm_type","cm_class","cm_region","cm_db"]
      })
        this.logger.silly("found customers ")
        return customers
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getCustomerData(query: any): Promise<any> {
    try {
      const customer = await this.addressModel.findOne({
         where:query,
        attributes: ["id","ad_name","ad_addr","ad_format","ad_ref","ad_line1","ad_ext"]
      })
        this.logger.silly("found customer ")
        return customer
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getParam(date:any): Promise<any> {
    try {
      const dt = date.getFullYear().toString()+'-'+(date.getMonth()+1).toString()+'-'+(date.getDate()).toString()
      
      const param = await this.paramHeaderModel.findOne({
        where:{
                validity_date_start :  {[Op.lte]:new Date(dt)}  ,    
                validity_date_end :  {[Op.gte]:new Date(dt)}   
              }
        })
        this.logger.silly("found param ")
        return param
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getParamByCode(code:any): Promise<any> {
    try {
      
      
      const param = await this.paramHeaderModel.findOne({
        where:{
          param_code : code
              }
        })
        this.logger.silly("found param ")
        return param
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getParamFilterd( category : any): Promise<any> {
    try {
      let today = new Date();
      let searchDate = new Date(today.getFullYear(),today.getMonth(),today.getDate())

      const dt = searchDate.getFullYear().toString()+'-'+(searchDate.getMonth()+1).toString()+'-'+(searchDate.getDate()).toString()
      const param = await this.paramHeaderModel.findOne({
        where:{
                category : category,
                validity_date_start :  {[Op.lte]:new Date(dt)}  ,    
                validity_date_end :  {[Op.gte]:new Date(dt)}   
              }
        })
        this.logger.silly("found param ")
        return param
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getParamDetails(query): Promise<any> {
    try {
      
      const paramDetails = await this.paramDetailsModel.findOne({
          where:query
        })
        this.logger.silly("found paramDetails ")
        return paramDetails
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async createAgendaLine(phone:any , paramHeader : any , paramDetails : any, eventSequence:any): Promise<any> {
    try {
       let today = new Date();
      
      let r0 = { method : paramDetails.method_0 , action : paramDetails.action_0, r : paramDetails.execution_moment  }
      let r1 = { method : paramDetails.method_1 , action : paramDetails.action_1, r : paramDetails.rel_1  }
      let r2 = { method : paramDetails.method_2 , action : paramDetails.action_2, r : paramDetails.rel_2  }
      let r3 = { method : paramDetails.method_3 , action : paramDetails.action_3, r : paramDetails.rel_3  }
      
      let date0  = addSeconds(today,r0.r)
      if(date0.getHours() > 22 || date0.getHours() < 8){
        date0 = addHours(date0, 12)
      }
      let date1 = addSeconds(date0,r1.r)
      if(date1.getHours() > 22  || date1.getHours() < 8){
        date1 = addHours(date1, 12)
      }
      let date2 = addSeconds(date1,r2.r)
      if(date2.getHours() > 22  || date2.getHours() < 8){
        date2 = addHours(date2, 12)
      }
      
      let date3 = addSeconds(date2,r3.r)
      if(date3.getHours() > 22 || date3.getHours() < 8){
        date3 = addHours(date3, 12)
      }
      
      const code_event = "event-"+eventSequence
      

      let agendaLines = []
      agendaLines.push(
        {
          code_event : code_event,
          code_client : phone,
          category : paramDetails.category,
          event_day : date0.getFullYear() + '-' + (date0.getMonth()+1) + '-' + date0.getDate() , 
          hh : date0.getHours(),
          mn : date0.getMinutes(),
          ss : date0.getSeconds(),
          phone_to_call : phone,
          status : 'O',
          duration : paramHeader.call_duration ,
          action : r0.action,
          method: r0.method,
          order:1,
          visibility:true,
          param_code : paramHeader.param_code 
        },
        {
          code_event : code_event,
          code_client : phone,
          category : paramDetails.category,
          event_day : date1.getFullYear() + '-' + (date1.getMonth()+1) + '-' + date1.getDate() , 
          hh : date1.getHours(),
          mn : date1.getMinutes(),
          ss : date1.getSeconds(),
          phone_to_call : phone,
          status : 'O',
          duration : paramHeader.call_duration ,
          action : r1.action,
          method: r1.method,
          order:2,
          visibility:false,
          param_code : paramHeader.param_code 
        },
        {
          code_event : code_event,
          code_client :phone,
          category : paramDetails.category,
          event_day : date2.getFullYear() + '-' + (date2.getMonth()+1) + '-' + date2.getDate() , 
          hh : date2.getHours(),
          mn : date2.getMinutes(),
          ss : date2.getSeconds(),
          phone_to_call : phone,
          status : 'O',
          duration : paramHeader.call_duration ,
          action : r2.action,
          method: r2.method,
          order:3,
          visibility:false,
          param_code : paramHeader.param_code 
        },
        {
          code_event : code_event,
          code_client : phone,
          category : paramDetails.category,
          event_day : date3.getFullYear() + '-' + (date3.getMonth()+1) + '-' + date3.getDate() , 
          hh : date3.getHours(),
          mn : date3.getMinutes(),
          ss : date3.getSeconds(),
          phone_to_call : phone,
          status : 'O',
          duration : paramHeader.call_duration ,
          action : r3.action,
          method: r3.method,
          order:4,
          visibility:false,
          param_code : paramHeader.param_code 
        },
      )

      // console.log(agendaLines)


      const lines = await this.agendaModel.bulkCreate(agendaLines)
        this.logger.silly("created agenda lines ")
        return lines
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async createAgendaLineOrder0(phone:any , paramHeader : any , paramDetails : any, eventSequence:any): Promise<any> {
    try {
       let today = new Date();
      
      let r0 = { method : paramDetails.method_0 , action : paramDetails.action_0, r : paramDetails.execution_moment  }
      
      let date0  = addSeconds(today,r0.r)
      if(date0.getHours() > 22 || date0.getHours() < 8){
        date0 = addHours(date0, 12)
      }
      
      const code_event = "event-"+eventSequence
      

      let agendaLines = []
      agendaLines.push(
        {
          code_event : code_event,
          code_client : phone,
          category : paramDetails.category,
          event_day : date0.getFullYear() + '-' + (date0.getMonth()+1) + '-' + date0.getDate() , 
          hh : date0.getHours(),
          mn : date0.getMinutes(),
          ss : date0.getSeconds(),
          phone_to_call : phone,
          status : 'O',
          duration : paramHeader.call_duration ,
          action : r0.action,
          method: r0.method,
          order:0,
          visibility:true,
          param_code : paramHeader.param_code 
        },    
      )

      // console.log(agendaLines)


      const lines = await this.agendaModel.bulkCreate(agendaLines)
        this.logger.silly("created agenda lines ")
        return lines
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async createOneAgendaLine(data:any): Promise<any> {
    try {
        const line = await this.agendaModel.create(data)
        this.logger.silly("created agenda line ")
        return line
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async createPopulation(data:any): Promise<any> {
    try {
        const population = await this.populationModel.bulkCreate(data)
        this.logger.silly("population created ")
        return population
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getPopulations(): Promise<any> {
    try {
     
      const populations = await this.populationModel.findAll({
          attributes: [
            // [Sequelize.fn('DISTINCT', Sequelize.col('population_code')) ],
             "id","population_code","population_desc"
          ],
         })

        
        this.logger.silly("found populations ")
        return populations
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getPopulationByCode(code : any): Promise<any> {
    try {
     
      const population = await this.populationModel.findOne({
            where:{ population_code : code}
         })

        
        this.logger.silly("found population ")
        return population
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getPopulationElements(population_code: any): Promise<any> {
    try {
     
      const elements = await this.populationModel.findAll({
          where:{
            population_code: population_code
          },
          attributes: ["id","code_element"],
         })

        
        this.logger.silly("found population elements ")
        return elements
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }
 
  public async createAgendaExecutionLine(executionLine : any , eventHeader : any): Promise<any> {
    try {
     
      const agendaExecutionLine = await this.agendaExecutionModel.create(executionLine)

       if(executionLine.status == "T"){
          const updatedAgendaLine = await this.agendaModel.update(
            {status : "T",visibility:false},
            {where :{
              code_event : eventHeader.code_event,
            }})
       }else{
         // EVENT NOT TERMINATED
         if(eventHeader.order === 4 ){
          const updatedAgendaLine = await this.agendaModel.update(
            {status : "All Executed but not Done",visibility:false},
            {where :{
              code_event : eventHeader.code_event,
            }})
         }else{
          const updatedAgendaLine = await this.agendaModel.update(
            {status : executionLine.status , visibility:false},
            {where :{
              code_event : eventHeader.code_event,
              order : eventHeader.order
            }})

            const updatedAgendaLine2 = await this.agendaModel.update(
              { visibility:true},
              {where :{
                code_event : eventHeader.code_event,
                order : eventHeader.order+1
              }})
              console.log(updatedAgendaLine2)
         }
       }

        
        this.logger.silly("created agendaExecutionLine ")
        return agendaExecutionLine
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  public async getAllAgendaExecutionLines(): Promise<any> {
    try {  
      const agendaExecutionLines = await this.agendaExecutionModel.findAll()
        this.logger.silly("got All agendaExecutionLines")
        return agendaExecutionLines
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }

  // UPDATE ALL 4 SUB EVENT OF AN EVENT VISIBILITY TO FALSE
  public async updateEventStatus(codeEvent : any ): Promise<any> {
    try {
     
      
          const updatedLines = await this.agendaModel.update(
            {visibility:false},
            {where :{
              code_event : codeEvent,
            }})
       

        
        this.logger.silly("created agendaExecutionLine ")
        return updatedLines
    } catch (e) {
        this.logger.error(e)
        throw e
    }
  }


}

function addSeconds(date, seconds) {
  let d  = new Date(date)
  d.setSeconds(d.getSeconds() + seconds);
  let t = new Date(d)
  return t;
}

function addHours(date, hours) {
  console.log("called")
  let d  = new Date(date)
  d.setHours(d.getHours() + hours);
  let t = new Date(d)
  return t;
}
 
