import { Service, Inject, Container } from "typedi"

@Service()
export default class PriceListQuantityService {
    constructor(
        @Inject("priceListQuantityModel")
        private priceListQuantityModel: Models.PriceListQuantityModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const priceListQuantity = await this.priceListQuantityModel.create({ ...data })
            this.logger.silly("create priceListQuantity mstr")
            return priceListQuantity
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const priceListQuantity = await this.priceListQuantityModel.findOne({
                where: query,
            })
            this.logger.silly("find one priceListQuantity mstr")
            return priceListQuantity
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const priceListQuantitys = await this.priceListQuantityModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All priceListQuantitys mstr")
            return priceListQuantitys
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const priceListQuantity = await this.priceListQuantityModel.update(data, {
                where: query,
            })
            this.logger.silly("update one priceListQuantity mstr")
            return priceListQuantity
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const priceListQuantity = await this.priceListQuantityModel.destroy({
                where: query,
            })
            this.logger.silly("delete one priceListQuantity mstr")
            return priceListQuantity
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
