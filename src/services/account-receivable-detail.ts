import { Service, Inject } from "typedi"

@Service()
export default class accountReceivableDetailService {
    constructor(
        @Inject("accountReceivableDetailModel") private accountReceivableDetailModel: Models.AccountReceivableDetailModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const accountReceivableDetail = await this.accountReceivableDetailModel.create({ ...data })
            this.logger.silly("create accountReceivableDetail mstr")
            return accountReceivableDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const accountReceivableDetail = await this.accountReceivableDetailModel.findOne({ where: query})
            this.logger.silly("find one accountReceivableDetail mstr")
            return accountReceivableDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const requisitionDetails = await this.accountReceivableDetailModel.findAll({ where: query})
            this.logger.silly("find All requisitionDetails mstr")
            return requisitionDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const accountReceivableDetail = await this.accountReceivableDetailModel.update(data, { where: query })
            this.logger.silly("update one accountReceivableDetail mstr")
            return accountReceivableDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const accountReceivableDetail = await this.accountReceivableDetailModel.destroy({ where: query })
            this.logger.silly("delete one accountReceivableDetail mstr")
            return accountReceivableDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

