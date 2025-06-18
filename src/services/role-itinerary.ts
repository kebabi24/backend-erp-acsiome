import { Service, Inject } from "typedi"

@Service()
export default class RoleItineraryService {
    constructor(
        @Inject("role_itineraryModel") private roleItineraryModel: Models.Role_itineraryModel,
        @Inject("itineraryModel") private ItineraryModel: Models.ItineraryModel,
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
            const itn = await this.roleItineraryModel.findAll({ where: query ,include:this.ItineraryModel})
            this.logger.silly("find All role-itn mstr")
            return itn
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async finddet(query: any): Promise<any> {
        try {
            console.log("query",query)
            const itn = await this.roleItineraryModel.findAll({ where: query })
          
           // console.log(itn)
            let itns = []
            for (let it of itn) {
                console.log(it)
                itns.push (it.itinerary_code)
            }
            console.log(itns)
            const itins = await this.ItineraryModel.findAll({where : {itinerary_code:itns}})
            this.logger.silly("find All role-itn mstr")
            return itins
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
