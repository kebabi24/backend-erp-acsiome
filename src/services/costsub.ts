import { Service, Inject } from "typedi"

@Service()
export default class costsubService {
    constructor(
        @Inject("costsubModel") private costsubModel: Models.costsubService,
       
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const costsub = await this.costsubModel.create({ ...data })
            this.logger.silly("create costsub mstr")
            return costsub
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const costsub = await this.costsubModel.findOne({ where: query,  })
            this.logger.silly("find one costsub mstr")
            return costsub
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const costsubs = await this.costsubModel.findAll({ where: query ,})
            this.logger.silly("find All costsubs mstr")
            return costsubs
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const costsub = await this.costsubModel.update(data, { where: query })
            this.logger.silly("update one costsub mstr")
            return costsub
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const costsub = await this.costsubModel.destroy({ where: query })
            this.logger.silly("delete one costsub mstr")
            return costsub
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

