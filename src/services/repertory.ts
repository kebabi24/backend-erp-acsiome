import { Service, Inject } from "typedi"

@Service()
export default class repertoryService {
    constructor(
        @Inject("repertoryModel") private repertoryModel: Models.RepertoryModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const repertory = await this.repertoryModel.create({ ...data })
            this.logger.silly("create repertory mstr")
            return repertory
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const repertory = await this.repertoryModel.findOne({ where: query })
            this.logger.silly("find one repertory mstr")
            return repertory
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const repertorys = await this.repertoryModel.findAll({ where: query
              
            })
            this.logger.silly("find All repertorys mstr")
            return repertorys
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const repertory = await this.repertoryModel.update(data, { where: query })
            this.logger.silly("update one repertory mstr")
            return repertory
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const repertory = await this.repertoryModel.destroy({ where: query })
            this.logger.silly("delete one repertory mstr")
            return repertory
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
