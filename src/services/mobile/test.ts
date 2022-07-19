import { Service, Inject } from "typedi"

@Service()
export default class TestService {
    constructor(
        @Inject("userMobileModel") private userMobileModel: Models.UserMobileModel,
        // @Inject("profileModel") private profileModel: Models.ProfileModel,
        @Inject("logger") private logger
    ) {}

   

    public async testHelloWorld(query: any): Promise<any> {
        try {
            console.log( 'Service function working...');
            const user = await this.userMobileModel.findOne({ where: query})
            this.logger.silly("find one user mstr")
            return user;
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

}
