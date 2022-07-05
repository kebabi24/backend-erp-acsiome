import { Service, Inject } from "typedi"

@Service()
export default class payMethDetailService {
    constructor(
        @Inject("payMethDetailModel") private payMethDetailModel: Models.PayMethDetailService,
       
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const payMethDetail = await this.payMethDetailModel.create({ ...data })
            this.logger.silly("create payMethDetail mstr")
            return payMethDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const payMethDetail = await this.payMethDetailModel.findOne({ where: query,  })
            this.logger.silly("find one payMethDetail mstr")
            return payMethDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const payMethDetails = await this.payMethDetailModel.findAll({ where: query ,})
            this.logger.silly("find All payMethDetails mstr")
            return payMethDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const payMethDetail = await this.payMethDetailModel.update(data, { where: query })
            this.logger.silly("update one payMethDetail mstr")
            return payMethDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const payMethDetail = await this.payMethDetailModel.destroy({ where: query })
            this.logger.silly("delete one payMethDetail mstr")
            return payMethDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

