import { Service, Inject } from "typedi"
import { Op, Sequelize } from 'sequelize';
@Service()
export default class AccountReceivableService {
    constructor(
        @Inject("accountReceivableModel") private accountReceivableModel: Models.AccountReceivableModel,
        @Inject("addressModel") private addressModel: Models.AddressModel,
        @Inject("customerModel") private customerModel: Models.CustomerModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const accountReceivable = await this.accountReceivableModel.create({ ...data })
            this.logger.silly("accountReceivable", accountReceivable)
            return accountReceivable
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const accountReceivable = await this.accountReceivableModel.findOne({ where: query })
            this.logger.silly("find one accountReceivable mstr")
            return accountReceivable
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findwithadress(query: any): Promise<any> {
        
        try {
            const accountReceivables = await this.accountReceivableModel.findAll({ where: query,include: this.customerModel, order : [['id', 'ASC']] ,
            attributes: {
                include: [[Sequelize.literal('ar_amt * -1'), 'aramt'],[Sequelize.literal('ar_applied * -1'), 'arapplied'],[Sequelize.literal('ar_base_amt * -1'), 'arbase_amt'],[Sequelize.literal('ar_base_applied * -1'), 'arbase_applied']],
              }
            })
            this.logger.silly("find All Codes mstr")
            return accountReceivables
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findInvswithadress(query: any): Promise<any> {
        
        try {
            const accountReceivables = await this.accountReceivableModel.findAll({ where: query,include: this.customerModel, order : [['id', 'ASC']] })
            this.logger.silly("find All Codes mstr")
            return accountReceivables
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async find(query: any): Promise<any> {
        try {
            const accountReceivables = await this.accountReceivableModel.findAll({ where: query,include: this.customerModel })
            this.logger.silly("find All Codes mstr")
            return accountReceivables
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findS(query: any): Promise<any> {
        try {
            const accountReceivables = await this.accountReceivableModel.findAll(query)
            this.logger.silly("find All Codes mstr")
            return accountReceivables
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const accountReceivable = await this.accountReceivableModel.update(data, { where: query })
            this.logger.silly("update one accountReceivable mstr")
            return accountReceivable
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const accountReceivable = await this.accountReceivableModel.destroy({ where: query })
            this.logger.silly("delete one accountReceivable mstr")
            return accountReceivable
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
