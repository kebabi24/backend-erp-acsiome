import { Service, Inject } from "typedi"

@Service()
export default class sequenceService {
    constructor(
        @Inject("sequenceModel") private sequenceModel: Models.SequenceModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const sequence = await this.sequenceModel.create({ ...data })
            this.logger.silly("create sequence mstr")
            return sequence
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const sequence = await this.sequenceModel.findOne({ where: query })
            this.logger.silly("find one sequence mstr")
            return sequence
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const sequences = await this.sequenceModel.findAll({ where: query })
            this.logger.silly("find All sequences mstr")
            return sequences
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const sequence = await this.sequenceModel.update(data, { where: query })
            this.logger.silly("update one sequence mstr")
            return sequence
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const sequence = await this.sequenceModel.destroy({ where: query })
            this.logger.silly("delete one sequence mstr")
            return sequence
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
