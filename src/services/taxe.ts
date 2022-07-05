import { Service, Inject } from "typedi"

@Service()
export default class taxeService {
    constructor(
        @Inject("taxeModel") private taxeModel: Models.taxeModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const taxe = await this.taxeModel.create({ ...data })
            this.logger.silly("create taxe mstr")
            return taxe
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const taxe = await this.taxeModel.findOne({ where: query })
            this.logger.silly("find one taxe mstr")
            return taxe
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const taxes = await this.taxeModel.findAll({ where: query })
            this.logger.silly("find All taxes mstr")
            return taxes
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const taxe = await this.taxeModel.update(data, { where: query })
            this.logger.silly("update one taxe mstr")
            return taxe
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const taxe = await this.taxeModel.destroy({ where: query })
            this.logger.silly("delete one taxe mstr")
            return taxe
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
