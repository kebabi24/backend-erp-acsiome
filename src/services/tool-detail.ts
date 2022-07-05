import { Service, Inject } from "typedi"

@Service()
export default class toolDetailService {
    constructor(
        @Inject("toolDetailModel") private toolDetailModel: Models.ToolDetailService,
       
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const toolDetail = await this.toolDetailModel.create({ ...data })
            this.logger.silly("create toolDetail mstr")
            return toolDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const toolDetail = await this.toolDetailModel.findOne({ where: query,  })
            this.logger.silly("find one toolDetail mstr")
            return toolDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const toolDetails = await this.toolDetailModel.findAll({ where: query ,})
            this.logger.silly("find All toolDetails mstr")
            return toolDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const toolDetail = await this.toolDetailModel.update(data, { where: query })
            this.logger.silly("update one toolDetail mstr")
            return toolDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const toolDetail = await this.toolDetailModel.destroy({ where: query })
            this.logger.silly("delete one toolDetail mstr")
            return toolDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

