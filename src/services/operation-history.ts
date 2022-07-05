import { Service, Inject } from "typedi"

@Service()
export default class operationHistoryService {
    constructor(
        @Inject("operationHistoryModel") private operationHistoryModel: Models.OperationHistoryModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("workOrderModel") private workOrderModel: Models.WorkOrderModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const operationHistory = await this.operationHistoryModel.create({ ...data })
            this.logger.silly("create operationHistory mstr")
            return operationHistory
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const operationHistory = await this.operationHistoryModel.findOne({ where: query, include: [this.itemModel, this.workOrderModel] })
            this.logger.silly("find one operationHistory mstr")
            return operationHistory
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const operationHistorys = await this.operationHistoryModel.findAll({ where: query ,include: [this.itemModel, this.workOrderModel]})
            this.logger.silly("find All operationHistorys mstr")
            return operationHistorys
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findSpecial(query: any): Promise<any> {
        try {
            const operationHistorys = await this.operationHistoryModel.findAll(query)
            this.logger.silly("find All operationHistorys mstr")
            return operationHistorys
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const operationHistory = await this.operationHistoryModel.update(data, { where: query })
            this.logger.silly("update one operationHistory mstr")
            return operationHistory
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const operationHistory = await this.operationHistoryModel.destroy({ where: query })
            this.logger.silly("delete one operationHistory mstr")
            return operationHistory
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

