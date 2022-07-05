import { Service, Inject } from "typedi"

@Service()
export default class invoiceOrderDetailService {
    constructor(
        @Inject("invoiceOrderDetailModel") private invoiceOrderDetailModel: Models.InvoiceOrderDetailService,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const invoiceOrderDetail = await this.invoiceOrderDetailModel.create({ ...data })
            this.logger.silly("create invoiceOrderDetail mstr")
            return invoiceOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const invoiceOrderDetail = await this.invoiceOrderDetailModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one invoiceOrderDetail mstr")
            return invoiceOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const invoiceOrderDetails = await this.invoiceOrderDetailModel.findAll({ where: query ,include: this.itemModel})
            this.logger.silly("find All invoiceOrderDetails mstr")
            return invoiceOrderDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const invoiceOrderDetail = await this.invoiceOrderDetailModel.update(data, { where: query })
            this.logger.silly("update one invoiceOrderDetail mstr")
            return invoiceOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const invoiceOrderDetail = await this.invoiceOrderDetailModel.destroy({ where: query })
            this.logger.silly("delete one invoiceOrderDetail mstr")
            return invoiceOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

