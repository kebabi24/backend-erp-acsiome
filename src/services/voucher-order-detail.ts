import { Service, Inject } from "typedi"

@Service()
export default class voucherOrderDetailService {
    constructor(
        @Inject("voucherOrderDetailModel") private voucherOrderDetailModel: Models.VoucherOrderDetailService,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const voucherOrderDetail = await this.voucherOrderDetailModel.create({ ...data })
            this.logger.silly("create voucherOrderDetail mstr")
            return voucherOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const voucherOrderDetail = await this.voucherOrderDetailModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one voucherOrderDetail mstr")
            return voucherOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const voucherOrderDetails = await this.voucherOrderDetailModel.findAll({ where: query ,include: this.itemModel})
            this.logger.silly("find All voucherOrderDetails mstr")
            return voucherOrderDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const voucherOrderDetail = await this.voucherOrderDetailModel.update(data, { where: query })
            this.logger.silly("update one voucherOrderDetail mstr")
            return voucherOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const voucherOrderDetail = await this.voucherOrderDetailModel.destroy({ where: query })
            this.logger.silly("delete one voucherOrderDetail mstr")
            return voucherOrderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

