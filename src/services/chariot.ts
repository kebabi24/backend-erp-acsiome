import { Service, Inject, Container } from "typedi"

@Service()
export default class ChariotService {
    constructor(
        @Inject("chariotModel")
        private chariotModel: Models.ChariotModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const chariot = await this.chariotModel.create({ ...data })
            this.logger.silly("create chariot mstr")
            return chariot
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const chariot = await this.chariotModel.findOne({
                where: query,
            })
            this.logger.silly("find one chariot mstr")
            return chariot
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const chariots = await this.chariotModel.findAll({
                where: query,
                
            })
            this.logger.silly("find All chariots mstr")
            return chariots
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const chariot = await this.chariotModel.update(data, {
                where: query,
            })
            this.logger.silly("update one chariot mstr")
            return chariot
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const chariot = await this.chariotModel.destroy({
                where: query,
            })
            this.logger.silly("delete one chariot mstr")
            return chariot
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
