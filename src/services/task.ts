import { Service, Inject, Container } from "typedi"

@Service()
export default class taskService {
    constructor(
        @Inject("taskModel")
        private taskModel: Models.TaskModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const task = await this.taskModel.create({ ...data })
            this.logger.silly("create task mstr")
            return task
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const task = await this.taskModel.findOne({
                where: query,
            })
            this.logger.silly("find one task mstr")
            return task
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const tasks = await this.taskModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All tasks mstr")
            return tasks
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const task = await this.taskModel.update(data, {
                where: query,
            })
            this.logger.silly("update one task mstr")
            return task
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const task = await this.taskModel.destroy({
                where: query,
            })
            this.logger.silly("delete one task mstr")
            return task
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
