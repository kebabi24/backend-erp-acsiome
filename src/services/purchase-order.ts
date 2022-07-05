import { Service, Inject, Container } from "typedi"

@Service()
export default class purchaseOrderService {
    constructor(
        @Inject("purchaseOrderModel")
        private purchaseOrderModel: Models.PurchaseOrderModel,
        @Inject("providerModel") private providerModel: Models.ProviderModel,

        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const purchaseOrder = await this.purchaseOrderModel.create({ ...data })
            this.logger.silly("create purchaseOrder mstr")
            return purchaseOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const purchaseOrder = await this.purchaseOrderModel.findOne({
                where: query, include:this.providerModel
            })
            this.logger.silly("find one purchaseOrder mstr")
            return purchaseOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const purchaseOrders = await this.purchaseOrderModel.findAll({
                where: query,
                include:this.providerModel
            })
            this.logger.silly("find All purchaseOrders mstr")
            return purchaseOrders
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const purchaseOrder = await this.purchaseOrderModel.update(data, {
                where: query,
            })
            this.logger.silly("update one purchaseOrder mstr")
            return purchaseOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const purchaseOrder = await this.purchaseOrderModel.destroy({
                where: query,
            })
            this.logger.silly("delete one purchaseOrder mstr")
            return purchaseOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
