import { Service, Inject, Container } from "typedi"

@Service()
export default class invoiceOrderTempService {
    constructor(
        @Inject("invoiceOrderTempModel")
        private invoiceOrderTempModel: Models.InvoiceOrderTempModel,
        @Inject("customerModel") private customerModel: Models.CustomerModel,

        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const invoiceOrderTemp = await this.invoiceOrderTempModel.create({ ...data })
            this.logger.silly("create invoiceOrderTemp mstr")
            return invoiceOrderTemp
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const invoiceOrderTemp = await this.invoiceOrderTempModel.findOne({
                where: query, include:this.customerModel
            })
            this.logger.silly("find one invoiceOrderTemp mstr")
            return invoiceOrderTemp
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const invoiceOrderTemps = await this.invoiceOrderTempModel.findAll({
                where: query,
                include:this.customerModel
            })
            this.logger.silly("find All invoiceOrderTemps mstr")
            return invoiceOrderTemps
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const invoiceOrderTemp = await this.invoiceOrderTempModel.update(data, {
                where: query,
            })
            this.logger.silly("update one invoiceOrderTemp mstr")
            return invoiceOrderTemp
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const invoiceOrderTemp = await this.invoiceOrderTempModel.destroy({
                where: query,
            })
            this.logger.silly("delete one invoiceOrderTemp mstr")
            return invoiceOrderTemp
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
