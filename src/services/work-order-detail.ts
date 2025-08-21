import { Service, Inject } from "typedi"

@Service()
export default class workOrderDetailService {
    constructor(
        @Inject("workOrderDetailModel") private workOrderDetailModel: Models.WorkOrderDetailModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const workOrderDetail = await this.workOrderDetailModel.create({ ...data })
            this.logger.silly("create workOrderDetail mstr")
            return workOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const workOrderDetail = await this.workOrderDetailModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one workOrderDetail mstr")
            return workOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const workOrderDetails = await this.workOrderDetailModel.findAll({ where: query ,include: this.itemModel})
            this.logger.silly("find All workOrderDetails mstr")
            return workOrderDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const workOrderDetail = await this.workOrderDetailModel.update(data, { where: query })
            this.logger.silly("update one workOrderDetail mstr")
            return workOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const workOrderDetail = await this.workOrderDetailModel.destroy({ where: query })
            this.logger.silly("delete one workOrderDetail mstr")
            return workOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

