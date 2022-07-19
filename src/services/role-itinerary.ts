import { Service, Inject } from "typedi"

@Service()
export default class RoleItineraryService {
    constructor(
        @Inject("role_itineraryModel") private roleItineraryModel: Models.Role_itineraryModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const itn = await this.roleItineraryModel.create({ ...data })
            this.logger.silly("create role-itn mstr")
            return itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const itn = await this.roleItineraryModel.findOne({ where: query })
            this.logger.silly("find one role-itn mstr")
            return itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const itn = await this.roleItineraryModel.findAll({ where: query })
            this.logger.silly("find All role-itn mstr")
            return itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const itn = await this.roleItineraryModel.update(data, { where: query })
            this.logger.silly("update one role-itn mstr")
            return itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const itn = await this.roleItineraryModel.destroy({ where: query })
            this.logger.silly("delete one role-itn mstr")
            return itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
