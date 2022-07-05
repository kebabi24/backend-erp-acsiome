import { Service, Inject, Container } from "typedi"

@Service()
export default class QuoteService {
    constructor(
        @Inject("quoteModel") private quoteModel: Models.quoteModel,
        @Inject("customerModel") private customerModel: Models.CustomerModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const quote = await this.quoteModel.create({
                ...data,
            })
            this.logger.silly("create quote mstr")
            return quote
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const quote = await this.quoteModel.findOne({
                where: query,
                include: [this.customerModel],
            })
            this.logger.silly("find one quote mstr")
            return quote
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const quotes = await this.quoteModel.findAll({
                where: query,
                include:[this.customerModel]
            })
            this.logger.silly("find All quotes mstr")
            return quotes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const Quote = await this.quoteModel.update(data, {
                where: query,
            })
            this.logger.silly("update one Quote mstr")
            return Quote
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const Quote = await this.quoteModel.destroy({
                where: query,
            })
            this.logger.silly("delete one Quote mstr")
            return Quote
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
