import { Service, Inject, Container } from "typedi"

@Service()
export default class EmployeTimeService {
    constructor(
        @Inject("employeTimeModel")
        private employeTimeModel: Models.EmployeTimeModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const employe = await this.employeTimeModel.create({ ...data })
            this.logger.silly("create employe mstr")
            return employe
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const employe = await this.employeTimeModel.findOne({
                where: query,
            })
            this.logger.silly("find one employe mstr")
            return employe
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const employes = await this.employeTimeModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All employes mstr")
            return employes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const employe = await this.employeTimeModel.update(data, {
                where: query,
            })
            this.logger.silly("update one employe mstr")
            return employe
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const employe = await this.employeTimeModel.destroy({
                where: query,
            })
            this.logger.silly("delete one employe mstr")
            return employe
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
