import { Service, Inject, Container } from "typedi"

@Service()
export default class TransportcostService {
    constructor(
        @Inject("TransportcostModel") private transportcostModel: Models.TransportcostModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const transportcost = await this.transportcostModel.create({ ...data })
            this.logger.silly("create transportcost mstr")
            return transportcost
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const transportcost = await this.transportcostModel.findOne({
                where: query,
            })
            this.logger.silly("find one transportcost mstr")
            return transportcost
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const transportcosts = await this.transportcostModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All transportcosts mstr")
            return transportcosts
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const transportcost = await this.transportcostModel.update(data, {
                where: query,
            })
            this.logger.silly("update one transportcost mstr")
            return transportcost
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const transportcost = await this.transportcostModel.destroy({
                where: query,
            })
            this.logger.silly("delete one transportcost mstr")
            return transportcost
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
