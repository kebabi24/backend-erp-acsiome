import { Service, Inject, Container } from "typedi"

@Service()
export default class affectEmployeService {
    constructor(
        @Inject("affectEmployeModel")
        private affectEmployeModel: Models.AffectEmployeModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const employe = await this.affectEmployeModel.create({ ...data })
            this.logger.silly("create affect employe mstr")
            return employe
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const employe = await this.affectEmployeModel.findOne({
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
            const employes = await this.affectEmployeModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All employes mstr")
            return employes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findspecial(query: any): Promise<any> {
        try {
            const employes = await this.affectEmployeModel.findAll(query)
            this.logger.silly("find All employes mstr")
            return employes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const employe = await this.affectEmployeModel.update(data, {
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
            const employe = await this.affectEmployeModel.destroy({
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
