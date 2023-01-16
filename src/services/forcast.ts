import { Service, Inject } from "typedi"

@Service()
export default class forcastService {
    constructor(
        @Inject("forcastModel") private forcastModel: Models.ForcastModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const forcast = await this.forcastModel.create({ ...data })
            this.logger.silly("create forcast mstr")
            return forcast
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const forcast = await this.forcastModel.findOne({ where: query })
            this.logger.silly("find one forcast mstr")
            return forcast
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const forcasts = await this.forcastModel.findAll({ where: query })
            this.logger.silly("find All forcasts mstr")
            return forcasts
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const forcast = await this.forcastModel.update(data, { where: query })
            this.logger.silly("update one forcast mstr")
            return forcast
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const forcast = await this.forcastModel.destroy({ where: query })
            this.logger.silly("delete one forcast mstr")
            return forcast
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
