import { Service, Inject } from "typedi"

@Service()
export default class DomainService {
    constructor(
        @Inject("domainModel") private domainModel: Models.DomainModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const domain = await this.domainModel.create({ ...data })
            this.logger.silly("domain", domain)
            return domain
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const domain = await this.domainModel.findOne({ where: query })
            this.logger.silly("find one domain mstr")
            return domain
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const domains = await this.domainModel.findAll({ where: query })
            this.logger.silly("find All domains mstr")
            return domains
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const domain = await this.domainModel.update(data, { where: query })
            this.logger.silly("update one domain mstr")
            return domain
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const domain = await this.domainModel.destroy({ where: query })
            this.logger.silly("delete one domain mstr")
            return domain
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
