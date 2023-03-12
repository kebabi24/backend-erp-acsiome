import { Service, Inject } from "typedi"

@Service()
export default class QualityControl {
    constructor(
        @Inject("mpMstrModel") private mpMstrModel: Models.mpMstrModel,
        @Inject("mpDetailsModel") private mpDetailsModel: Models.mpDetailsModel,
        @Inject("logger") private logger
    ) {}


    public async createStandartSpecificationHeader(data: any): Promise<any> {
        try {
            const specificationHeader = await this.mpMstrModel.create({ ...data })
            this.logger.silly("specificationHeader created ", specificationHeader)
            return specificationHeader
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async createStandartSpecificationDetails(data: any): Promise<any> {
        try {
            const specificationDetails = await this.mpDetailsModel.bulkCreate(data)
            this.logger.silly("specificationDetails created ", specificationDetails)
            return specificationDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findSpecificationByCode(data: any): Promise<any> {
        try {
            const specification = await this.mpMstrModel.findOne({ where: {mp_nbr :data }})
            this.logger.silly("find one specification")
            return specification
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
