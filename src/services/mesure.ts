import { Service, Inject } from "typedi"

@Service()
export default class mesureService {
    constructor(
        @Inject("mesureModel") private mesureModel: Models.MesureModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const mesure = await this.mesureModel.create({ ...data })
            this.logger.silly("create mesure mstr")
            return mesure
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const mesure = await this.mesureModel.findOne({ where: query })
            this.logger.silly("find one mesure mstr")
            return mesure
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const mesures = await this.mesureModel.findAll({ where: query })
            this.logger.silly("find All mesures mstr")
            return mesures
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const mesure = await this.mesureModel.update(data, { where: query })
            this.logger.silly("update one mesure mstr")
            return mesure
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const mesure = await this.mesureModel.destroy({ where: query })
            this.logger.silly("delete one mesure mstr")
            return mesure
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
