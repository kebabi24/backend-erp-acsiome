import { Service, Inject, Container } from "typedi"

@Service()
export default class SaleOrderService {
    constructor(
        @Inject("saleorderModel") private saleorderModel: Models.SaleorderModel,
        @Inject("customerModel") private customerModel: Models.CustomerModel,
      //  @Inject("requisitionModel") private requisitionModel: Models.RequisitionModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const saleorder = await this.saleorderModel.create({ ...data })
            this.logger.silly("create saleOrder mstr")
            return saleorder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const saleorder = await this.saleorderModel.findOne({
                where: query,
                include: [this.customerModel],
            })
            this.logger.silly("find one saleorder mstr")
            return saleorder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const saleorder = await this.saleorderModel.findAll({
                where: query,
                include: [this.customerModel],
            })
            this.logger.silly("find All saleorder mstr")
            return saleorder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const saleorder = await this.saleorderModel.update(data, {
                where: query,
            })
            this.logger.silly("update one saleorder mstr")
            return saleorder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const saleorder = await this.saleorderModel.destroy({
                where: query,
            })
            this.logger.silly("delete one saleorder mstr")
            return saleorder
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
