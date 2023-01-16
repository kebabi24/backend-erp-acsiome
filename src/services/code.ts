import { Service, Inject } from "typedi"
const { Op } = require('sequelize')

@Service()
export default class codeService {
    constructor(
        @Inject("codeModel") private codeModel: Models.CodeModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const code = await this.codeModel.create({ ...data })
            this.logger.silly("create code mstr")
            return code
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const code = await this.codeModel.findOne({ where: query })
            this.logger.silly("find one code mstr")
            return code
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const codes = await this.codeModel.findAll({ where: query })
            this.logger.silly("find All Codes mstr")
            return codes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findsome(query: any): Promise<any> {
        try {
            const codes = await this.codeModel.findAll( {attributes: ['code_value',  'code_cmmt'], where: query })
            this.logger.silly("find All Codes mstr")
            return codes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const code = await this.codeModel.update(data, { where: query })
            this.logger.silly("update one code mstr")
            return code
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const code = await this.codeModel.destroy({ where: query })
            this.logger.silly("delete one code mstr")
            return code
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getWilayas(query: any): Promise<any> {
        try {
            const wilayas = await this.codeModel.findAll({ 
                where: query,
                attributes : ["id","code_value","code_cmmt"] 
            })
            this.logger.silly("found all wilayas")
            return wilayas
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getCommunes(query: any): Promise<any> {
        try {
            const communes = await this.codeModel.findAll({ 
                where: query,
                attributes : ["id","code_value","code_cmmt"] 
            })
            this.logger.silly("found all communes")
            return communes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getValidePromo(): Promise<any> {
        try {
          let today = new Date();
          let searchDate = new Date(today.getFullYear(),today.getMonth(),today.getDate())
          const dt = searchDate.getFullYear().toString()+'-'+(searchDate.getMonth()+1).toString()+'-'+(searchDate.getDate()).toString()
          
          const param = await this.codeModel.findOne({
            where:
              {
                 code_fldname : "promo_open",
                 date02 :  {[Op.gte]:new Date(dt)},
                 date01 :  {[Op.lte]:new Date(dt)},
                 bool01 :  true   
              },
             attributes:["id","code_fldname","code_value","code_cmmt","dec01","date01","date02","bool01"]
            })
            this.logger.silly("found promo ")
            return param
        } catch (e) {
            this.logger.error(e)
            throw e
        }
      }

      public async getCRMSelfCall(): Promise<any> {
        try {
            const self_calls = await this.codeModel.findAll({ 
                where: { code_fldname : "crm_self_call"},
                attributes : ["id","code_value","bool01"] 
            })
            this.logger.silly("found all results")
            return self_calls
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getAbsenceDayParam(): Promise<any> {
        try {
            const absenceDays = await this.codeModel.findOne({ 
                where: { code_fldname : "crm_absence_days"},
                attributes : ["id","code_value","int01"] 
            })
            this.logger.silly("found absenceDays ")
            return absenceDays.dataValues.int01
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
