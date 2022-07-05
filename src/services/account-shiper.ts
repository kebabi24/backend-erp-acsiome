import { Service, Inject } from "typedi"

@Service()
export default class AccountShiperService {
    constructor(
        @Inject("accountShiperModel") private accountShiperModel: Models.accountShiperModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const accountShiper = await this.accountShiperModel.create({ ...data })
            this.logger.silly("accountShiper", accountShiper)
            return accountShiper
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const accountShiper = await this.accountShiperModel.findOne({ where: query })
            this.logger.silly("find one accountShiper mstr")
            return accountShiper
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const accountShipers = await this.accountShiperModel.findAll({ where: query })
            this.logger.silly("find All Codes mstr")
            return accountShipers
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const accountShiper = await this.accountShiperModel.update(data, { where: query })
            this.logger.silly("update one accountShiper mstr")
            return accountShiper
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const accountShiper = await this.accountShiperModel.destroy({ where: query })
            this.logger.silly("delete one accountShiper mstr")
            return accountShiper
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
