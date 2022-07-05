import { Service, Inject } from "typedi"

@Service()
export default class EntityService {
    constructor(
        @Inject("entityModel") private entityModel: Models.entityModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const entity = await this.entityModel.create({ ...data })
            this.logger.silly("entity", entity)
            return entity
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const entity = await this.entityModel.findOne({ where: query })
            this.logger.silly("find one entity mstr")
            return entity
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const entitys = await this.entityModel.findAll({ where: query })
            this.logger.silly("find All entitys mstr")
            return entitys
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const entity = await this.entityModel.update(data, { where: query })
            this.logger.silly("update one entity mstr")
            return entity
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const entity = await this.entityModel.destroy({ where: query })
            this.logger.silly("delete one entity mstr")
            return entity
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
