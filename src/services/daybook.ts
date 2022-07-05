import { Service, Inject } from "typedi"

@Service()
export default class daybookService {
    constructor(
        @Inject("daybookModel") private daybookModel: Models.daybookModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const daybook = await this.daybookModel.create({ ...data })
            this.logger.silly("create daybook mstr")
            return daybook
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const daybook = await this.daybookModel.findOne({ where: query })
            this.logger.silly("find one daybook mstr")
            return daybook
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const daybooks = await this.daybookModel.findAll({ where: query })
            this.logger.silly("find All daybooks mstr")
            return daybooks
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const daybook = await this.daybookModel.update(data, { where: query })
            this.logger.silly("update one daybook mstr")
            return daybook
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const daybook = await this.daybookModel.destroy({ where: query })
            this.logger.silly("delete one daybook mstr")
            return daybook
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
