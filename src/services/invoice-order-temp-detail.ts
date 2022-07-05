import { Service, Inject } from "typedi"

@Service()
export default class invoiceOrderTempDetailService {
    constructor(
        @Inject("invoiceOrderTempDetailModel") private invoiceOrderTempDetailModel: Models.InvoiceOrderTempDetailService,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const invoiceOrderTempDetail = await this.invoiceOrderTempDetailModel.create({ ...data })
            this.logger.silly("create invoiceOrderTempDetail mstr")
            return invoiceOrderTempDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const invoiceOrderTempDetail = await this.invoiceOrderTempDetailModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one invoiceOrderTempDetail mstr")
            return invoiceOrderTempDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const invoiceOrderTempDetails = await this.invoiceOrderTempDetailModel.findAll({ where: query ,include: this.itemModel})
            this.logger.silly("find All invoiceOrderTempDetails mstr")
            return invoiceOrderTempDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const invoiceOrderTempDetail = await this.invoiceOrderTempDetailModel.update(data, { where: query })
            this.logger.silly("update one invoiceOrderTempDetail mstr")
            return invoiceOrderTempDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const invoiceOrderTempDetail = await this.invoiceOrderTempDetailModel.destroy({ where: query })
            this.logger.silly("delete one invoiceOrderTempDetail mstr")
            return invoiceOrderTempDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

