import { Service, Inject } from "typedi"

@Service()
export default class reasonService {
    constructor(
        @Inject("reasonModel") private reasonModel: Models.ReasonModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const reason = await this.reasonModel.create({ ...data })
            this.logger.silly("create reason mstr")
            return reason
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const reason = await this.reasonModel.findOne({ where: query })
            this.logger.silly("find one reason mstr")
            return reason
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const reasons = await this.reasonModel.findAll({ where: query })
            this.logger.silly("find All reasons mstr")
            return reasons
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const reason = await this.reasonModel.update(data, { where: query })
            this.logger.silly("update one reason mstr")
            return reason
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const reason = await this.reasonModel.destroy({ where: query })
            this.logger.silly("delete one reason mstr")
            return reason
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
