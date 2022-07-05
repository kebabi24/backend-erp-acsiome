import { Service, Inject } from "typedi"

@Service()
export default class accountService {
    constructor(
        @Inject("accountModel") private accountModel: Models.accountModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const account = await this.accountModel.create({ ...data })
            this.logger.silly("create account mstr")
            return account
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const account = await this.accountModel.findOne({ where: query })
            this.logger.silly("find one account mstr")
            return account
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const accounts = await this.accountModel.findAll({ where: query })
            this.logger.silly("find All accounts mstr")
            return accounts
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const account = await this.accountModel.update(data, { where: query })
            this.logger.silly("update one account mstr")
            return account
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const account = await this.accountModel.destroy({ where: query })
            this.logger.silly("delete one account mstr")
            return account
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
