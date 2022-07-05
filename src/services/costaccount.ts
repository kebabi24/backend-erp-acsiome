import { Service, Inject } from "typedi"

@Service()
export default class costaccountService {
    constructor(
        @Inject("costaccountModel") private costaccountModel: Models.costaccountService,
       
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const costaccount = await this.costaccountModel.create({ ...data })
            this.logger.silly("create costaccount mstr")
            return costaccount
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const costaccount = await this.costaccountModel.findOne({ where: query,  })
            this.logger.silly("find one costaccount mstr")
            return costaccount
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const costaccounts = await this.costaccountModel.findAll({ where: query ,})
            this.logger.silly("find All costaccounts mstr")
            return costaccounts
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const costaccount = await this.costaccountModel.update(data, { where: query })
            this.logger.silly("update one costaccount mstr")
            return costaccount
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const costaccount = await this.costaccountModel.destroy({ where: query })
            this.logger.silly("delete one costaccount mstr")
            return costaccount
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

