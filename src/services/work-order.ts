import { Service, Inject } from "typedi"

@Service()
export default class workOrderService {
    constructor(
        @Inject("workOrderModel") private workOrderModel: Models.WorkOrderModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const workOrder = await this.workOrderModel.create({ ...data })
            this.logger.silly("create workOrder mstr")
            return workOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const workOrder = await this.workOrderModel.findOne({ where: query,include: this.itemModel })
            this.logger.silly("find one workOrder mstr")
            return workOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const workOrders = await this.workOrderModel.findAll({ where: query , include: this.itemModel, order: [['id', 'DESC']]})
            this.logger.silly("find All workOrders mstr")
            return workOrders
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
      
        try {
            const workOrder = await this.workOrderModel.update(data, { where: query })
            this.logger.silly("update one workOrder mstr")
            return workOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const workOrder = await this.workOrderModel.destroy({ where: query })
            this.logger.silly("delete one workOrder mstr")
            return workOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
