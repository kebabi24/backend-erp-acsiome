import { Service, Inject } from "typedi"

@Service()
export default class AccountdefaultService {
    constructor(
        @Inject("accountdefaultModel") private accountdefaultModel: Models.accountdefaultModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const accountdefault = await this.accountdefaultModel.create({ ...data })
            this.logger.silly("accountdefault", accountdefault)
            return accountdefault
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const accountdefault = await this.accountdefaultModel.findOne({ where: query })
            this.logger.silly("find one accountdefault mstr")
            return accountdefault
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const accountdefaults = await this.accountdefaultModel.findAll({ where: query })
            this.logger.silly("find All Codes mstr")
            return accountdefaults
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const accountdefault = await this.accountdefaultModel.update(data, { where: query })
            this.logger.silly("update one accountdefault mstr")
            return accountdefault
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const accountdefault = await this.accountdefaultModel.destroy({ where: query })
            this.logger.silly("delete one accountdefault mstr")
            return accountdefault
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
