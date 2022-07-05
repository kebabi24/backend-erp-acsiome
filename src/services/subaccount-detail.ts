import { Service, Inject } from "typedi"

@Service()
export default class subaccountDetailService {
    constructor(
        @Inject("subaccountDetailModel") private subaccountDetailModel: Models.subaccountDetailService,
       
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const subaccountDetail = await this.subaccountDetailModel.create({ ...data })
            this.logger.silly("create subaccountDetail mstr")
            return subaccountDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const subaccountDetail = await this.subaccountDetailModel.findOne({ where: query,  })
            this.logger.silly("find one subaccountDetail mstr")
            return subaccountDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const subaccountDetails = await this.subaccountDetailModel.findAll({ where: query ,})
            this.logger.silly("find All subaccountDetails mstr")
            return subaccountDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const subaccountDetail = await this.subaccountDetailModel.update(data, { where: query })
            this.logger.silly("update one subaccountDetail mstr")
            return subaccountDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const subaccountDetail = await this.subaccountDetailModel.destroy({ where: query })
            this.logger.silly("delete one subaccountDetail mstr")
            return subaccountDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

