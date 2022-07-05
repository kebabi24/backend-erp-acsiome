import { Service, Inject } from "typedi"

@Service()
export default class projectTaskDetailService {
    constructor(
        @Inject("projectTaskDetailModel") private projectTaskDetailModel: Models.ProjectTaskDetailService,
        
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const projectTaskDetail = await this.projectTaskDetailModel.create({ ...data })
            this.logger.silly("create projectTaskDetail mstr")
            return projectTaskDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const projectTaskDetail = await this.projectTaskDetailModel.findOne({ where: query,  })
            this.logger.silly("find one projectTaskDetail mstr")
            return projectTaskDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const projectTaskDetails = await this.projectTaskDetailModel.findAll({ where: query })
            this.logger.silly("find All projectTaskDetails mstr")
            return projectTaskDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const projectTaskDetail = await this.projectTaskDetailModel.update(data, { where: query })
            this.logger.silly("update one projectTaskDetail mstr")
            return projectTaskDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const projectTaskDetail = await this.projectTaskDetailModel.destroy({ where: query })
            this.logger.silly("delete one projectTaskDetail mstr")
            return projectTaskDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

