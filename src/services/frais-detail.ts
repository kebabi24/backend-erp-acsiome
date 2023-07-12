import { Service, Inject } from "typedi"

@Service()
export default class fraisDetailService {
    constructor(
        @Inject("fraisDetailModel") private fraisDetailModel: Models.FraisDetailModel,
          @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const fraisDetail = await this.fraisDetailModel.create({ ...data })
            this.logger.silly("create fraisDetail mstr")
            return fraisDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const fraisDetail = await this.fraisDetailModel.findOne({ where: query })
            this.logger.silly("find one fraisDetail mstr")
            return fraisDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const fraisDetails = await this.fraisDetailModel.findAll({ where: query })
            this.logger.silly("find All fraisDetails mstr")
            return fraisDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findBet(query: any): Promise<any> {
        try {
            const fraisDetails = await this.fraisDetailModel.findAll(query)
            this.logger.silly("find All fraisDetails mstr")
            return fraisDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const fraisDetail = await this.fraisDetailModel.update(data, { where: query })
            this.logger.silly("update one fraisDetail mstr")
            return fraisDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const fraisDetail = await this.fraisDetailModel.destroy({ where: query })
            this.logger.silly("delete one fraisDetail mstr")
            return fraisDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

