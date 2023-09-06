import { Service, Inject } from "typedi"

@Service()
export default class AccountUnplanifedService {
    constructor(
        @Inject("accountUnplanifedModel") private accountUnplanifedModel: Models.accountUnplanifedModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const accountUnplanifed = await this.accountUnplanifedModel.create({ ...data })
            this.logger.silly("accountUnplanifed", accountUnplanifed)
            return accountUnplanifed
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const accountUnplanifed = await this.accountUnplanifedModel.findOne({ where: query })
            this.logger.silly("find one accountUnplanifed mstr")
            return accountUnplanifed
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const accountUnplanifeds = await this.accountUnplanifedModel.findAll({ where: query })
            this.logger.silly("find All Codes mstr")
            return accountUnplanifeds
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const accountUnplanifed = await this.accountUnplanifedModel.update(data, { where: query })
            this.logger.silly("update one accountUnplanifed mstr")
            return accountUnplanifed
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const accountUnplanifed = await this.accountUnplanifedModel.destroy({ where: query })
            this.logger.silly("delete one accountUnplanifed mstr")
            return accountUnplanifed
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
