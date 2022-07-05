import { Service, Inject } from "typedi"

@Service()
export default class ProductLineService {
    constructor(
        @Inject("productLineModel") private productLineModel: Models.ProductLineModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const productLine = await this.productLineModel.create({ ...data })
            this.logger.silly("product Line", productLine)
            return productLine
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const productLine = await this.productLineModel.findOne({ where: query })
            this.logger.silly("find one productLine mstr")
            return productLine
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const productLines = await this.productLineModel.findAll({ where: query })
            this.logger.silly("find All productLines mstr")
            return productLines
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const productLine = await this.productLineModel.update(data, { where: query })
            this.logger.silly("update one productLine mstr")
            return productLine
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const productLine = await this.productLineModel.destroy({ where: query })
            this.logger.silly("delete one productLine mstr")
            return productLine
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
