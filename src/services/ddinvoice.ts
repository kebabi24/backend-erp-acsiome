import { Service, Inject, Container } from "typedi"

@Service()
export default class DdinvoiceService {
    constructor(
        @Inject("ddinvoiceModel")
        private ddinvoiceModel: Models.DdinvoiceModel,
       
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const invoiceOrder = await this.ddinvoiceModel.create({ ...data })
            this.logger.silly("create invoiceOrder mstr")
            return invoiceOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const invoiceOrder = await this.ddinvoiceModel.findOne({
                where: query, 
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
            const invoiceOrders = await this.ddinvoiceModel.findAll({
                where: query,
              
            })
            this.logger.silly("find All invoiceOrders mstr")
            return invoiceOrders
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findS(query: any): Promise<any> {
        try {
            const invoiceOrders = await this.ddinvoiceModel.findAll(query)
            this.logger.silly("find All invoiceOrders mstr")
            return invoiceOrders
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const invoiceOrder = await this.ddinvoiceModel.update(data, {
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
            const invoiceOrder = await this.ddinvoiceModel.destroy({
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
