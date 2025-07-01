import { Service, Inject, Container } from "typedi"

@Service()
export default class timbreService {
    constructor(
        @Inject("timbreModel")
        private timbreModel: Models.TimbreModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const timbre = await this.timbreModel.create({ ...data })
            this.logger.silly("create timbre mstr")
            return timbre
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const timbre = await this.timbreModel.findOne({
                where: query,
            })
            this.logger.silly("find one timbre mstr")
            return timbre
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOneS(query: any): Promise<any> {
        try {
            const timbre = await this.timbreModel.findOne(query)
            this.logger.silly("find one timbre mstr")
            return timbre
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async find(query: any): Promise<any> {
        try {
            const timbres = await this.timbreModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All timbres mstr")
            return timbres
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const timbre = await this.timbreModel.update(data, {
                where: query,
            })
            this.logger.silly("update one timbre mstr")
            return timbre
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const timbre = await this.timbreModel.destroy({
                where: query,
            })
            this.logger.silly("delete one timbre mstr")
            return timbre
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
