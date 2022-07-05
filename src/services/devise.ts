import { Service, Inject } from "typedi"

@Service()
export default class DeviseService {
    constructor(
        @Inject("deviseModel") private deviseModel: Models.deviseModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const devise = await this.deviseModel.create({ ...data })
            this.logger.silly("devise", devise)
            return devise
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const devise = await this.deviseModel.findOne({ where: query })
            this.logger.silly("find one devise mstr")
            return devise
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const devises = await this.deviseModel.findAll({ where: query })
            this.logger.silly("find All Codes mstr")
            return devises
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const devise = await this.deviseModel.update(data, { where: query })
            this.logger.silly("update one devise mstr")
            return devise
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const devise = await this.deviseModel.destroy({ where: query })
            this.logger.silly("delete one devise mstr")
            return devise
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
