import { Service, Inject, Container } from "typedi"

@Service()
export default class affectreportService {
    constructor(
        @Inject("addReportModel")
        private addReportModel: Models.AddReportModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const report = await this.addReportModel.create({ ...data })
            this.logger.silly("create affect report mstr")
            return report
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const report = await this.addReportModel.findOne({
                where: query,
            })
            this.logger.silly("find one report mstr")
            return report
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const reports = await this.addReportModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All reports mstr")
            return reports
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const report = await this.addReportModel.update(data, {
                where: query,
            })
            this.logger.silly("update one report mstr")
            return report
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const report = await this.addReportModel.destroy({
                where: query,
            })
            this.logger.silly("delete one report mstr")
            return report
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
