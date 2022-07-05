import { Service, Inject } from "typedi"

@Service()
export default class purchaseOrderDetailService {
    constructor(
        @Inject("purchaseOrderDetailModel") private purchaseOrderDetailModel: Models.PurchaseOrderDetailService,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const purchaseOrderDetail = await this.purchaseOrderDetailModel.create({ ...data })
            this.logger.silly("create purchaseOrderDetail mstr")
            return purchaseOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const purchaseOrderDetail = await this.purchaseOrderDetailModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one purchaseOrderDetail mstr")
            return purchaseOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const purchaseOrderDetails = await this.purchaseOrderDetailModel.findAll({ where: query ,include: this.itemModel})
            this.logger.silly("find All purchaseOrderDetails mstr")
            return purchaseOrderDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const purchaseOrderDetail = await this.purchaseOrderDetailModel.update(data, { where: query })
            this.logger.silly("update one purchaseOrderDetail mstr")
            return purchaseOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const purchaseOrderDetail = await this.purchaseOrderDetailModel.destroy({ where: query })
            this.logger.silly("delete one purchaseOrderDetail mstr")
            return purchaseOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

