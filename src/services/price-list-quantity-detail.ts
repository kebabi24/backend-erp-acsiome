import { Service, Inject } from "typedi"

@Service()
export default class PriceListQuantityDetailService {
    constructor(
        @Inject("priceListQuantityDetailModel") private priceListQuantityDetailModel: Models.PriceListQuantityDetailModel,
       
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const priceListQuantityDetail = await this.priceListQuantityDetailModel.create({ ...data })
            this.logger.silly("create priceListQuantityDetail mstr")
            return priceListQuantityDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const priceListQuantityDetail = await this.priceListQuantityDetailModel.findOne({ where: query,  })
            this.logger.silly("find one priceListQuantityDetail mstr")
            return priceListQuantityDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const priceListQuantityDetails = await this.priceListQuantityDetailModel.findAll({ where: query ,})
            this.logger.silly("find All priceListQuantityDetails mstr")
            return priceListQuantityDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const priceListQuantityDetail = await this.priceListQuantityDetailModel.update(data, { where: query })
            this.logger.silly("update one priceListQuantityDetail mstr")
            return priceListQuantityDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const priceListQuantityDetail = await this.priceListQuantityDetailModel.destroy({ where: query })
            this.logger.silly("delete one priceListQuantityDetail mstr")
            return priceListQuantityDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

