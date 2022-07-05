import { Service, Inject, Container } from "typedi"

@Service()
export default class jobService {
    constructor(
        @Inject("jobModel")
        private jobModel: Models.JobModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const job = await this.jobModel.create({ ...data })
            this.logger.silly("create job mstr")
            return job
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const job = await this.jobModel.findOne({
                where: query,
            })
            this.logger.silly("find one job mstr")
            return job
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const jobs = await this.jobModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All jobs mstr")
            return jobs
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const job = await this.jobModel.update(data, {
                where: query,
            })
            this.logger.silly("update one job mstr")
            return job
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const job = await this.jobModel.destroy({
                where: query,
            })
            this.logger.silly("delete one job mstr")
            return job
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
