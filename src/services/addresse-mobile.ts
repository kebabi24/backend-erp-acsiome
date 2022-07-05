import { Service, Inject } from "typedi"

@Service()
export default class addresseMobileService {
    constructor(
        @Inject("addresseModel") private addresseModel: Models.AddresseMobileModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const address = await this.addresseModel.create({ ...data })
            this.logger.debug(`address: ${address}`)
            return address
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const address = await this.addresseModel.findOne({ where: query })
            this.logger.silly("find one address mstr")
            return address
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async find(query: any): Promise<any> {
        try {
            const address = await this.addresseModel.findAll({ where: query })
            this.logger.silly("find All Address mstr")
            return address
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const address = await this.addresseModel.update(data, { where: query })
            this.logger.silly("update one provider ")
            return address
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const address = await this.addresseModel.destroy({ where: query })
            this.logger.silly("delete one provider ")
            return address
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

}
