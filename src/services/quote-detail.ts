import { Service, Inject } from "typedi"

@Service()
export default class QuoteDetailService {
    constructor(
        @Inject("quoteDetailModel") private quoteDetailModel: Models.quoteDetailModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("taxeModel") private taxeModel: Models.TaxeModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const quoteOrderDetail = await this.quoteDetailModel.create({ ...data })
            this.logger.silly("create quoteOrderDetail mstr")
            return quoteOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const quoteDetail = await this.quoteDetailModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one QuoteDetail mstr")
            return quoteDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const quoteDetails = await this.quoteDetailModel.findAll({ where: query ,include: [
                {
                  model: this.itemModel,
                  as: 'item',
                  required: true,
                  include: [{ model: this.taxeModel, as: 'taxe', required: true }],
                },
              ],})
            this.logger.silly("find All quoteDetails mstr")
            return quoteDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

/*public async find(query: any): Promise<any> {
    try {
        const quoteDetails = await this.quoteDetailModel.findAll({ where: query ,include: this.itemModel})
        this.logger.silly("find All purchaseOrderDetails mstr")
        return quoteDetails
    } catch (e) {
        this.logger.error(e)
        throw e
    }
}
*/
    public async update(data: any, query: any): Promise<any> {
        try {
            const quoteDetail = await this.quoteDetailModel.update(data, { where: query })
            this.logger.silly("update one QuoteDetail mstr")
            return quoteDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
   public async delete(query: any): Promise<any> {
        try {
            const quoteDetail = await this.quoteDetailModel.destroy({ where: query })
            this.logger.silly("delete one QuoteDetail mstr")
            return quoteDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

