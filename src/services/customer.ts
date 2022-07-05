import { Service, Inject } from "typedi"


@Service()
export default class customersSercice {
    constructor(
        @Inject("customerModel") private customerModel: Models.customerModel,
        @Inject("addressModel") private addressModel: Models.AddressModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const customer = await this.customerModel.create({ ...data })
            this.logger.silly("customer", customer)
            return customer
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const customer = await this.customerModel.findOne({ where: query,include: this.addressModel })
            this.logger.silly("find one customer ")
            return customer
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const customers = await this.customerModel.findAll({ where: query,include: this.addressModel})
            this.logger.silly("find All customers ")
            return customers
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const customer = await this.customerModel.update(data, { where: query })
            this.logger.silly("update one customer ")
            return customer
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const customer = await this.customerModel.destroy({ where: query })
            this.logger.silly("delete one customer ")
            return customer
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
