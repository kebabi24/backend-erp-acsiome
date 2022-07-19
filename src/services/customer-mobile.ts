import { Service, Inject } from "typedi"


@Service()
export default class customersMobileSercice {
    constructor(
        @Inject("customerMobileModel") private customerMobileModel: Models.CustomerMobileModel,

        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const customerMobile = await this.customerMobileModel.create({ ...data })
            this.logger.silly("customer mobile", customerMobile)
            return customerMobile
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const customer = await this.customerMobileModel.findOne({ where: query })
            this.logger.silly("find one customer mstr")
            console.log(customer)
            return customer
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const customers = await this.customerMobileModel.findAll({where : query})
            this.logger.silly("find All custmers mstr")
            return customers
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

}
