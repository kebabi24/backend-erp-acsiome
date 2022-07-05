import { Service, Inject } from "typedi"

@Service()
export default class costcenterService {
    constructor(
        @Inject("costcenterModel") private costcenterModel: Models.CostcenterModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const costcenter = await this.costcenterModel.create({ ...data })
            this.logger.silly("create costcenter mstr")
            return costcenter
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const costcenter = await this.costcenterModel.findOne({ where: query })
            this.logger.silly("find one costcenter mstr")
            return costcenter
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const costcenters = await this.costcenterModel.findAll({ where: query })
            this.logger.silly("find All costcenters mstr")
            return costcenters
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

   
    public async update(data: any, query: any): Promise<any> {
        try {
            const costcenter = await this.costcenterModel.update(data, { where: query })
            this.logger.silly("update one costcenter mstr")
            return costcenter
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const costcenter = await this.costcenterModel.destroy({ where: query })
            this.logger.silly("delete one costcenter mstr")
            return costcenter
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
