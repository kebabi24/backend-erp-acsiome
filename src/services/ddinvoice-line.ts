import { Service, Inject } from "typedi"

@Service()
export default class DdinvoiceLineService {
    constructor(
        @Inject("ddinvoiceLineModel") private ddinvoiceLineModel: Models.DdinvoiceLineModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const invoiceOrderDetail = await this.ddinvoiceLineModel.bulkCreate( data )
            this.logger.silly("create invoiceOrderDetail mstr")
            return invoiceOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const invoiceOrderDetail = await this.ddinvoiceLineModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one invoiceOrderDetail mstr")
            return invoiceOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const invoiceOrderDetails = await this.ddinvoiceLineModel.findAll({ where: query })
            this.logger.silly("find All invoiceOrderDetails mstr")
            return invoiceOrderDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findS(query: any): Promise<any> {
        try {
            const invoiceOrderDetails = await this.ddinvoiceLineModel.findAll(query)
            this.logger.silly("find All invoiceOrderDetails mstr")
            return invoiceOrderDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const invoiceOrderDetail = await this.ddinvoiceLineModel.update(data, { where: query })
            this.logger.silly("update one invoiceOrderDetail mstr")
            return invoiceOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const invoiceOrderDetail = await this.ddinvoiceLineModel.destroy({ where: query })
            this.logger.silly("delete one invoiceOrderDetail mstr")
            return invoiceOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

