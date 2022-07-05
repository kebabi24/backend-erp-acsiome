import { Service, Inject, Container } from "typedi"

@Service()
export default class invoiceOrderService {
    constructor(
        @Inject("invoiceOrderModel")
        private invoiceOrderModel: Models.InvoiceOrderModel,
        @Inject("customerModel") private customerModel: Models.CustomerModel,

        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const invoiceOrder = await this.invoiceOrderModel.create({ ...data })
            this.logger.silly("create invoiceOrder mstr")
            return invoiceOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const invoiceOrder = await this.invoiceOrderModel.findOne({
                where: query, include:this.customerModel
            })
            this.logger.silly("find one invoiceOrder mstr")
            return invoiceOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const invoiceOrders = await this.invoiceOrderModel.findAll({
                where: query,
                include:this.customerModel
            })
            this.logger.silly("find All invoiceOrders mstr")
            return invoiceOrders
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const invoiceOrder = await this.invoiceOrderModel.update(data, {
                where: query,
            })
            this.logger.silly("update one invoiceOrder mstr")
            return invoiceOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const invoiceOrder = await this.invoiceOrderModel.destroy({
                where: query,
            })
            this.logger.silly("delete one invoiceOrder mstr")
            return invoiceOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
