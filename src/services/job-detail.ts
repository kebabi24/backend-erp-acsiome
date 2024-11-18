import { Service, Inject } from "typedi"

@Service()
export default class jobDetailService {
    constructor(
        @Inject("jobDetailModel") private jobDetailModel: Models.JobDetailModel,
       
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const jobDetail = await this.jobDetailModel.create({ ...data })
            this.logger.silly("create jobDetail mstr")
            return jobDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const jobDetail = await this.jobDetailModel.findOne({ where: query,  })
            this.logger.silly("find one jobDetail mstr")
            return jobDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const jobDetails = await this.jobDetailModel.findAll({ where: query ,})
            this.logger.silly("find All jobDetails mstr")
            return jobDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const jobDetail = await this.jobDetailModel.update(data, { where: query })
            this.logger.silly("update one jobDetail mstr")
            return jobDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const jobDetail = await this.jobDetailModel.destroy({ where: query })
            this.logger.silly("delete one jobDetail mstr")
            return jobDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

