import { Service, Inject } from "typedi"

@Service()
export default class taskDetailService {
    constructor(
        @Inject("taskDetailModel") private taskDetailModel: Models.TaskDetailService,
       
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const taskDetail = await this.taskDetailModel.create({ ...data })
            this.logger.silly("create taskDetail mstr")
            return taskDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const taskDetail = await this.taskDetailModel.findOne({ where: query,  })
            this.logger.silly("find one taskDetail mstr")
            return taskDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const taskDetails = await this.taskDetailModel.findAll({ where: query ,})
            this.logger.silly("find All taskDetails mstr")
            return taskDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const taskDetail = await this.taskDetailModel.update(data, { where: query })
            this.logger.silly("update one taskDetail mstr")
            return taskDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const taskDetail = await this.taskDetailModel.destroy({ where: query })
            this.logger.silly("delete one taskDetail mstr")
            return taskDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

