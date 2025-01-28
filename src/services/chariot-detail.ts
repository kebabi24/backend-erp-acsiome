import { Service, Inject } from "typedi"

@Service()
export default class ChariotDetailService {
    constructor(
        @Inject("chariotDetailModel") private chariotDetailModel: Models.ChariotDetailModel,
       
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const chariotDetail = await this.chariotDetailModel.create({ ...data })
            this.logger.silly("create chariotDetail mstr")
            return chariotDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const chariotDetail = await this.chariotDetailModel.findOne({ where: query,  })
            this.logger.silly("find one chariotDetail mstr")
            return chariotDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const chariotDetails = await this.chariotDetailModel.findAll({ where: query ,})
            this.logger.silly("find All chariotDetails mstr")
            return chariotDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const chariotDetail = await this.chariotDetailModel.update(data, { where: query })
            this.logger.silly("update one chariotDetail mstr")
            return chariotDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const chariotDetail = await this.chariotDetailModel.destroy({ where: query })
            this.logger.silly("delete one chariotDetail mstr")
            return chariotDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

