import { Service, Inject } from "typedi"

@Service()
export default class repertoryService {
    constructor(
        @Inject("repertoryDetailModel") private repertoryDetailModel: Models.RepertoryDetailModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const repertoryDetail = await this.repertoryDetailModel.create({ ...data })
            this.logger.silly("create repertory mstr")
            return repertoryDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const repertoryDetail = await this.repertoryDetailModel.findOne({ where: query })
            this.logger.silly("find one repertory mstr")
            return repertoryDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const repertoryDetails = await this.repertoryDetailModel.findAll({ where: query
              
            })
            this.logger.silly("find All repertorys mstr")
            return repertoryDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const repertoryDetail = await this.repertoryDetailModel.update(data, { where: query })
            this.logger.silly("update one repertory mstr")
            return repertoryDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const repertoryDetail = await this.repertoryDetailModel.destroy({ where: query })
            this.logger.silly("delete one repertory mstr")
            return repertoryDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
