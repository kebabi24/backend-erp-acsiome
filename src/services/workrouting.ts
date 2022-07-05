import { Service, Inject } from "typedi"

@Service()
export default class workroutingService {
    constructor(
        @Inject("workroutingModel") private workroutingModel: Models.WorkroutingModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const ro = await this.workroutingModel.create({ ...data })
            this.logger.silly("create ro mstr")
            return ro
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const ro = await this.workroutingModel.findOne({ where: query })
            this.logger.silly("find one ro mstr")
            return ro
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const ros = await this.workroutingModel.findAll({ where: query })
            this.logger.silly("find All ros mstr")
            return ros
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findsome(query: any): Promise<any> {
        try {
            const ros = await this.workroutingModel.findAll( {attributes: ['ro_routing',  'ro_op'], where: query })
            this.logger.silly("find All ros mstr")
            return ros
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const ro = await this.workroutingModel.update(data, { where: query })
            this.logger.silly("update one ro mstr")
            return ro
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const ro = await this.workroutingModel.destroy({ where: query })
            this.logger.silly("delete one ro mstr")
            return ro
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    
}
