import { Service, Inject } from "typedi"

@Service()
export default class accountUnplanifedDetailService {
    constructor(
        @Inject("accountUnplanifedDetailModel") private accountUnplanifedDetailModel: Models.AccountUnplanifedDetailModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const accountUnplanifedDetail = await this.accountUnplanifedDetailModel.create({ ...data })
            this.logger.silly("create accountUnplanifedDetail mstr")
            return accountUnplanifedDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const accountUnplanifedDetail = await this.accountUnplanifedDetailModel.findOne({ where: query})
            this.logger.silly("find one accountUnplanifedDetail mstr")
            return accountUnplanifedDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const requisitionDetails = await this.accountUnplanifedDetailModel.findAll({ where: query})
            this.logger.silly("find All requisitionDetails mstr")
            return requisitionDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const accountUnplanifedDetail = await this.accountUnplanifedDetailModel.update(data, { where: query })
            this.logger.silly("update one accountUnplanifedDetail mstr")
            return accountUnplanifedDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const accountUnplanifedDetail = await this.accountUnplanifedDetailModel.destroy({ where: query })
            this.logger.silly("delete one accountUnplanifedDetail mstr")
            return accountUnplanifedDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

