import { Service, Inject, Container } from "typedi"

@Service()
export default class CostlistService {
    constructor(
        @Inject("CostlistModel") private costlistModel: Models.CostlistModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const listcost = await this.costlistModel.create({ ...data })
            this.logger.silly("create listcost mstr")
            return listcost
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const listcost = await this.costlistModel.findOne({
                where: query,
            })
            this.logger.silly("find one listcost mstr")
            return listcost
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const listcosts = await this.costlistModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All listcosts mstr")
            return listcosts
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const listcost = await this.costlistModel.update(data, {
                where: query,
            })
            this.logger.silly("update one listcost mstr")
            return listcost
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const listcost = await this.costlistModel.destroy({
                where: query,
            })
            this.logger.silly("delete one listcost mstr")
            return listcost
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
