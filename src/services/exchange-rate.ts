import { Service, Inject } from "typedi"

@Service()
export default class exchangeRateService {
    constructor(
        @Inject("exchangeRateModel") private exchangeRateModel: Models.ExchangeRateModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const tag = await this.exchangeRateModel.create({ ...data })
            this.logger.silly("create tag mstr")
            return tag
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const tag = await this.exchangeRateModel.findOne({ where: query })
            this.logger.silly("find one tag mstr")
            return tag
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const tags = await this.exchangeRateModel.findAll({ where: query })
            this.logger.silly("find All tags mstr")
            return tags
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const tag = await this.exchangeRateModel.upsert(data, { where: query })
            this.logger.silly("update one tag mstr")
            return tag
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const tag = await this.exchangeRateModel.destroy({ where: query })
            this.logger.silly("delete one tag mstr")
            return tag
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async max(field: any): Promise<any> {
        try {
            const max = await this.exchangeRateModel.max(field)
            this.logger.silly("delete one tag mstr")
            return max
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

