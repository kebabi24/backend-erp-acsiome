import { Service, Inject } from "typedi"

@Service()
export default class pricelistService {
    constructor(
        @Inject("pricelistModel") private pricelistModel: Models.PricelistModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const pricelist = await this.pricelistModel.create({ ...data })
            this.logger.silly("create pricelist mstr")
            return pricelist
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const pricelist = await this.pricelistModel.findOne({ where: query })
            this.logger.silly("find one pricelist mstr")
            return pricelist
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async min(query: any): Promise<any> {
        try {
            const pricelist = await this.pricelistModel.min('pi_list_price',{ where: query })
            this.logger.silly("find one pricelist mstr")
            return pricelist
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async max(query: any): Promise<any> {
        try {
            const pricelist = await this.pricelistModel.max('pi_list_price',{ where: query })
            this.logger.silly("find one pricelist mstr")
            return pricelist
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const pricelists = await this.pricelistModel.findAll({ where: query , order: [['pi_part_code', 'ASC']]})
            this.logger.silly("find All pricelists mstr")
            return pricelists
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const pricelist = await this.pricelistModel.upsert(data, { where: query })
            this.logger.silly("update one pricelist mstr")
            return pricelist
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const pricelist = await this.pricelistModel.destroy({ where: query })
            this.logger.silly("delete one pricelist mstr")
            return pricelist
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
