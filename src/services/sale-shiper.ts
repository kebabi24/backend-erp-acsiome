import { Service, Inject } from "typedi"

@Service()
export default class saleShiperService {
    constructor(
        @Inject("SaleShiperModel") private saleShiperModel: Models.SaleShiperModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const saleShiper = await this.saleShiperModel.create({ ...data })
            this.logger.silly("create saleShiper mstr")
            return saleShiper
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const saleShiper = await this.saleShiperModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one saleShiper mstr")
            return saleShiper
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async distinct(query: any): Promise<any> {
        try {
            const saleShipers = await this.saleShiperModel.findAll({Attributes: ['psh_nbr', 'psh_cust'], group: ['psh_nbr', 'psh_cust', 'id'], where: query});
            this.logger.silly("find All saleShipers mstr")
            return saleShipers
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async find(query: any): Promise<any> {
        try {
            const saleShipers = await this.saleShiperModel.findAll({ where: query ,include: this.itemModel})
            this.logger.silly("find All saleShipers mstr")
            return saleShipers
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const saleShiper = await this.saleShiperModel.update(data, { where: query })
            this.logger.silly("update one saleShiper mstr")
            return saleShiper
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const saleShiper = await this.saleShiperModel.destroy({ where: query })
            this.logger.silly("delete one saleShiper mstr")
            return saleShiper
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async max(field: any): Promise<any> {
        try {
            const max = await this.saleShiperModel.max(field)
            this.logger.silly("max one tag mstr")
            return max
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

