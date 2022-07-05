import { Service, Inject } from "typedi"

@Service()
export default class ProfileMobileService {
    constructor(
        @Inject("profileMobileModel") private profileMobileModel: Models.ProfileMobileModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const profile = await this.profileMobileModel.create({ ...data })
            this.logger.silly("create profile mobile mstr")
            return profile
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const profile = await this.profileMobileModel.findOne({ where: query })
            this.logger.silly("find one profile mobile mstr")
            return profile
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const profiles = await this.profileMobileModel.findAll({ where: query })
            this.logger.silly("find All profiles mobile mstr")
            //console.log(profiles)
            return profiles
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const profile = await this.profileMobileModel.update(data, { where: query })
            this.logger.silly("update one profile mobile mstr")
            return profile
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const profile = await this.profileMobileModel.destroy({ where: query })
            this.logger.silly("delete one profile mobile mstr")
            return profile
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
