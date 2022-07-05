import { Service, Inject } from "typedi"

@Service()
export default class accountPayableDetailService {
    constructor(
        @Inject("accountPayableDetailModel") private accountPayableDetailModel: Models.AccountPayableDetailModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const accountPayableDetail = await this.accountPayableDetailModel.create({ ...data })
            this.logger.silly("create accountPayableDetail mstr")
            return accountPayableDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const accountPayableDetail = await this.accountPayableDetailModel.findOne({ where: query})
            this.logger.silly("find one accountPayableDetail mstr")
            return accountPayableDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const requisitionDetails = await this.accountPayableDetailModel.findAll({ where: query})
            this.logger.silly("find All requisitionDetails mstr")
            return requisitionDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const accountPayableDetail = await this.accountPayableDetailModel.update(data, { where: query })
            this.logger.silly("update one accountPayableDetail mstr")
            return accountPayableDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const accountPayableDetail = await this.accountPayableDetailModel.destroy({ where: query })
            this.logger.silly("delete one accountPayableDetail mstr")
            return accountPayableDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

