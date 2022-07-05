import { Service, Inject, Container } from "typedi"

@Service()
export default class payMethService {
    constructor(
        @Inject("payMethModel")
        private payMethModel: Models.PayMethModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const task = await this.payMethModel.create({ ...data })
            this.logger.silly("create task mstr")
            return task
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const task = await this.payMethModel.findOne({
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
            const tasks = await this.payMethModel.findAll({
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
            const task = await this.payMethModel.update(data, {
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
            const task = await this.payMethModel.destroy({
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
