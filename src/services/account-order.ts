import { Service, Inject } from "typedi"

@Service()
export default class AccountOrderService {
    constructor(
        @Inject("accountOrderModel") private accountOrderModel: Models.accountOrderModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const accountOrder = await this.accountOrderModel.create({ ...data })
            this.logger.silly("accountOrder", accountOrder)
            return accountOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const accountOrder = await this.accountOrderModel.findOne({ where: query })
            this.logger.silly("find one accountOrder mstr")
            return accountOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const accountOrders = await this.accountOrderModel.findAll({ where: query })
            this.logger.silly("find All Codes mstr")
            return accountOrders
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const accountOrder = await this.accountOrderModel.update(data, { where: query })
            this.logger.silly("update one accountOrder mstr")
            return accountOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const accountOrder = await this.accountOrderModel.destroy({ where: query })
            this.logger.silly("delete one accountOrder mstr")
            return accountOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
