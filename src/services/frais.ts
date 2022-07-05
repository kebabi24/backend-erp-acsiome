import { Service, Inject } from "typedi"

@Service()
export default class FraisService {
    constructor(
        @Inject("fraisModel") private fraisModel: Models.fraisModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const frais = await this.fraisModel.create({ ...data })
            this.logger.silly("frais", frais)
            return frais
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const frais = await this.fraisModel.findOne({ where: query })
            this.logger.silly("find one frais mstr")
            return frais
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const fraiss = await this.fraisModel.findAll({ where: query })
            this.logger.silly("find All Codes mstr")
            return fraiss
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const frais = await this.fraisModel.update(data, { where: query })
            this.logger.silly("update one frais mstr")
            return frais
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const frais = await this.fraisModel.destroy({ where: query })
            this.logger.silly("delete one frais mstr")
            return frais
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
