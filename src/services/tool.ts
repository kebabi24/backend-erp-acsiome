import { Service, Inject, Container } from "typedi"

@Service()
export default class toolService {
    constructor(
        @Inject("toolModel")
        private toolModel: Models.ToolModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const tool = await this.toolModel.create({ ...data })
            this.logger.silly("create tool mstr")
            return tool
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const tool = await this.toolModel.findOne({
                where: query,
            })
            this.logger.silly("find one tool mstr")
            return tool
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const tools = await this.toolModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All tools mstr")
            return tools
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const tool = await this.toolModel.update(data, {
                where: query,
            })
            this.logger.silly("update one tool mstr")
            return tool
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const tool = await this.toolModel.destroy({
                where: query,
            })
            this.logger.silly("delete one tool mstr")
            return tool
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
