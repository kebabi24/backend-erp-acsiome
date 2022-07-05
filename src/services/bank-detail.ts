import { Service, Inject } from "typedi"

@Service()
export default class bankDetailService {
    constructor(
        @Inject("bankDetailModel") private bankDetailModel: Models.bankDetailModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const bankDetail = await this.bankDetailModel.create({ ...data })
            this.logger.silly("create bankDetail mstr")
            return bankDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const bankDetail = await this.bankDetailModel.findOne({ where: query })
            this.logger.silly("find one bankDetail mstr")
            return bankDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const bankDetails = await this.bankDetailModel.findAll({ where: query })
            this.logger.silly("find All bankDetails mstr")
            return bankDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const bankDetail = await this.bankDetailModel.update(data, { where: query })
            this.logger.silly("update one bankDetail mstr")
            return bankDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const bankDetail = await this.bankDetailModel.destroy({ where: query })
            this.logger.silly("delete one bankDetail mstr")
            return bankDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
