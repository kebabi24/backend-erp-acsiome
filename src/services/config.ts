import { Service, Inject } from "typedi"

@Service()
export default class configService {
    constructor(
        @Inject("configModel") private configModel: Models.ConfigModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const config = await this.configModel.create({ ...data })
            this.logger.debug(`config: ${config}`)
            return config
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const config = await this.configModel.findOne({ where: query })
            this.logger.silly("find one config mstr")
            return config
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async find(query: any): Promise<any> {
        try {
            const config = await this.configModel.findAll({ where: query })
            this.logger.silly("find All config mstr")
            return config
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const config = await this.configModel.update(data, { where: query })
            this.logger.silly("update one provider ")
            return config
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const config = await this.configModel.destroy({ where: query })
            this.logger.silly("delete one provider ")
            return config
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

}
