import { Service, Inject } from "typedi"

@Service()
export default class subaccountService {
    constructor(
        @Inject("subaccountModel") private subaccountModel: Models.subaccountModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const subaccount = await this.subaccountModel.create({ ...data })
            this.logger.silly("create subaccount mstr")
            return subaccount
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const subaccount = await this.subaccountModel.findOne({ where: query })
            this.logger.silly("find one subaccount mstr")
            return subaccount
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const subaccounts = await this.subaccountModel.findAll({ where: query })
            this.logger.silly("find All subaccounts mstr")
            return subaccounts
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const subaccount = await this.subaccountModel.update(data, { where: query })
            this.logger.silly("update one subaccount mstr")
            return subaccount
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const subaccount = await this.subaccountModel.destroy({ where: query })
            this.logger.silly("delete one subaccount mstr")
            return subaccount
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
