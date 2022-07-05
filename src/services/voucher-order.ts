import { Service, Inject, Container } from "typedi"

@Service()
export default class voucherOrderService {
    constructor(
        @Inject("voucherOrderModel")
        private voucherOrderModel: Models.VoucherOrderModel,
        @Inject("providerModel") private providerModel: Models.ProviderModel,

        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const voucherOrder = await this.voucherOrderModel.create({ ...data })
            this.logger.silly("create voucherOrder mstr")
            return voucherOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const voucherOrder = await this.voucherOrderModel.findOne({
                where: query, include:this.providerModel
            })
            this.logger.silly("find one voucherOrder mstr")
            return voucherOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const voucherOrders = await this.voucherOrderModel.findAll({
                where: query,
                include:this.providerModel
            })
            this.logger.silly("find All voucherOrders mstr")
            return voucherOrders
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const voucherOrder = await this.voucherOrderModel.update(data, {
                where: query,
            })
            this.logger.silly("update one voucherOrder mstr")
            return voucherOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const voucherOrder = await this.voucherOrderModel.destroy({
                where: query,
            })
            this.logger.silly("delete one voucherOrder mstr")
            return voucherOrder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
