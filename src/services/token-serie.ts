import { Service, Inject } from "typedi"

@Service()
export default class TokenSerieService {
    constructor(
        @Inject("tokenSerieModel") private tokenSerieModel: Models.TokenSerieModel,
        @Inject("logger") private logger
    ) {}

    public async createTokens(data: any): Promise<any> {
        try {
            const tokens = await this.tokenSerieModel.bulkCreate(data)
            this.logger.silly("tokes  created ", tokens)
            return tokens
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findAllTokens(): Promise<any> {
        try {
            const tokens = await this.tokenSerieModel.findAll()
            this.logger.silly("tokes  found ", tokens)
            return tokens
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

   

    // public async find(query: any): Promise<any> {
    //     try {
    //         const codes = await this.itemModel.findAll({ where: query,include: this.taxeModel,incluse: this.locationModel  })
    //         this.logger.silly("find item ")
    //         return codes
    //     } catch (e) {
    //         this.logger.error(e)
    //         throw e
    //     }
    // }



    // public async findOneByCode(product_page_code: any): Promise<any> {
    //     try {
    //         const productPage = await this.productPageModel.findOne({ where: {product_page_code :product_page_code }})
    //         this.logger.silly("find one productPage")
    //         return productPage
    //     } catch (e) {
    //         this.logger.error(e)
    //         throw e
    //     }
    // }

    // public async findAll(): Promise<any> {
    //     try {
    //         const productPages = await this.productPageModel.findAll()
    //         this.logger.silly("find all productPages")
    //         return productPages
    //     } catch (e) {
    //         this.logger.error(e)
    //         throw e
    //     }
    // }

    


    
}
