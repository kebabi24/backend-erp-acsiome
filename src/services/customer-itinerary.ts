import { Service, Inject } from "typedi"

@Service()
export default class CustomerItineraryService {
    constructor(
        @Inject("itinerary_CustomerModel") private customerItineraryModel: Models.Itinerary_CustomerModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const cus_itn = await this.customerItineraryModel.create({ ...data })
            this.logger.silly("create customer-itn mstr")
            return cus_itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const cus_itn = await this.customerItineraryModel.findOne({ where: query })
            this.logger.silly("find one customer-itn mstr")
            return cus_itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async count(query: any): Promise<any> {
        try {
            const cus_itn = await this.customerItineraryModel.count({ where: query })
            this.logger.silly("find one customer-itn mstr")
            return cus_itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async find(query: any): Promise<any> {
        try {
            const cus_itn = await this.customerItineraryModel.findAll({ where: query })
            this.logger.silly("find All customer-itn mstr")
            return cus_itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const cus_itn = await this.customerItineraryModel.update(data, { where: query })
            this.logger.silly("update one customer-itn mstr")
            return cus_itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const cus_itn = await this.customerItineraryModel.destroy({ where: query })
            this.logger.silly("delete one customer-itn mstr")
            return cus_itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
