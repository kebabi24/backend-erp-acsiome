import { Service, Inject } from "typedi"

@Service()
export default class voucherProformaDetailService {
    constructor(
        @Inject("voucherProformaDetailModel") private voucherProformaDetailModel: Models.VoucherProformaDetailModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const voucherProformaDetail = await this.voucherProformaDetailModel.create({ ...data })
            this.logger.silly("create voucherProformaDetail mstr")
            return voucherProformaDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const voucherProformaDetail = await this.voucherProformaDetailModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one voucherProformaDetail mstr")
            return voucherProformaDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const voucherProformaDetails = await this.voucherProformaDetailModel.findAll({ where: query ,include: this.itemModel})
            this.logger.silly("find All voucherProformaDetails mstr")
            return voucherProformaDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const voucherProformaDetail = await this.voucherProformaDetailModel.update(data, { where: query })
            this.logger.silly("update one voucherProformaDetail mstr")
            return voucherProformaDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const voucherProformaDetail = await this.voucherProformaDetailModel.destroy({ where: query })
            this.logger.silly("delete one voucherProformaDetail mstr")
            return voucherProformaDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

