import { Service, Inject } from "typedi"

@Service()
export default class projectDetailService {
    constructor(
        @Inject("projectDetailModel") private projectDetailModel: Models.ProjectDetailService,
        @Inject("taskModel") private taskModel: Models.TaskModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const projectDetail = await this.projectDetailModel.create({ ...data })
            this.logger.silly("create projectDetail mstr")
            return projectDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const projectDetail = await this.projectDetailModel.findOne({ where: query,  })
            this.logger.silly("find one projectDetail mstr")
            return projectDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const projectDetails = await this.projectDetailModel.findAll({ where: query, include: this.taskModel })
            this.logger.silly("find All projectDetails mstr")
            return projectDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const projectDetail = await this.projectDetailModel.update(data, { where: query })
            this.logger.silly("update one projectDetail mstr")
            return projectDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const projectDetail = await this.projectDetailModel.destroy({ where: query })
            this.logger.silly("delete one projectDetail mstr")
            return projectDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

