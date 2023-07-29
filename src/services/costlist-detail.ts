import { Service, Inject } from "typedi"

@Service()
export default class costlistDetaiService {
    constructor(
        @Inject("CostlistDetailModel") private costlistDetailModel: Models.CostlistDetailModel,
         @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const costlistDetai = await this.costlistDetailModel.create({ ...data })
            this.logger.silly("create costlistDetai mstr")
            return costlistDetai
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const costlistDetai = await this.costlistDetailModel.findOne({ where: query })
            this.logger.silly("find one costlistDetai mstr")
            return costlistDetai
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const costlistDetais = await this.costlistDetailModel.findAll({ where: query })
            this.logger.silly("find All costlistDetais mstr")
            return costlistDetais
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const costlistDetai = await this.costlistDetailModel.update(data, { where: query })
            this.logger.silly("update one costlistDetai mstr")
            return costlistDetai
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const costlistDetai = await this.costlistDetailModel.destroy({ where: query })
            this.logger.silly("delete one costlistDetai mstr")
            return costlistDetai
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

