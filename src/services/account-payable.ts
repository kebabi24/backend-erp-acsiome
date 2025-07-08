import { Service, Inject } from "typedi"
import { Op, Sequelize } from 'sequelize';
@Service()
export default class AccountPayableService {
    constructor(
        @Inject("accountPayableModel") private accountPayableModel: Models.accountPayableModel,
        @Inject("addressModel") private addressModel: Models.AddressModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const accountPayable = await this.accountPayableModel.create({ ...data })
            this.logger.silly("accountPayable", accountPayable)
            return accountPayable
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const accountPayable = await this.accountPayableModel.findOne({ where: query, include: this.addressModel })
            this.logger.silly("find one accountPayable mstr")
            return accountPayable
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findwithadress(query: any): Promise<any> {
        
        try {
            const accountPayables = await this.accountPayableModel.findAll({ where: query,include: this.addressModel, order : [['id', 'ASC']] })
            this.logger.silly("find All Codes mstr")
            return accountPayables
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findPaymentbetween(query: any): Promise<any> {
        
        try {
            console.log(query.date)
            const accountPayables = await this.accountPayableModel.findAll(  {where :{
                ap_type:'P',ap_effdate: { [Op.between]: [query.date, query.date1]}},
                attributes: {
                    include: [[Sequelize.literal('ap_amt * -1'), 'apamt'],[Sequelize.literal('ap_applied * -1'), 'apapplied'],[Sequelize.literal('ap_base_amt * -1'), 'apbase_amt'],[Sequelize.literal('ap_base_applied * -1'), 'apbase_applied']],
                  }
                ,include: this.addressModel,} )
            // console.log(accountPayables)
            this.logger.silly("find All Codes mstr")
            return accountPayables
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findS(query: any): Promise<any> {
        try {
            const accountPayables = await this.accountPayableModel.findAll(query)
            this.logger.silly("find All Codes mstr")
            return accountPayables
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findInvoicebetween(query: any): Promise<any> {
        
        try {
            console.log(query.date)
            const accountPayables = await this.accountPayableModel.findAll(  {where :{
                ap_type:'I',ap_effdate: { [Op.between]: [query.date, query.date1]}},
               include: this.addressModel,} )
            // console.log(accountPayables)
            this.logger.silly("find All Codes mstr")
            return accountPayables
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async find(query: any): Promise<any> {
        
        try {
            const accountPayables = await this.accountPayableModel.findAll({ where: query, order : [['id', 'ASC']] })
            this.logger.silly("find All Codes mstr")
            return accountPayables
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const accountPayable = await this.accountPayableModel.update(data, { where: query })
            this.logger.silly("update one accountPayable mstr")
            return accountPayable
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const accountPayable = await this.accountPayableModel.destroy({ where: query })
            this.logger.silly("delete one accountPayable mstr")
            return accountPayable
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
