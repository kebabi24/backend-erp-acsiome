import { Service, Inject } from "typedi"

@Service()
export default class ItineraryService {
    constructor(
        @Inject("itineraryModel") private itineraryModel: Models.ItineraryModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const itn = await this.itineraryModel.create({ ...data })
            this.logger.silly("create itn mstr")
            return itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const itn = await this.itineraryModel.findOne({ where: query })
            this.logger.silly("find one itn mstr")
            return itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const itn = await this.itineraryModel.findAll({ where: query })
            this.logger.silly("find All itn mstr")
            return itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const itn = await this.itineraryModel.update(data, { where: query })
            this.logger.silly("update one itn mstr")
            return itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const itn = await this.itineraryModel.destroy({ where: query })
            this.logger.silly("delete one itn mstr")
            return itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
