import { Service, Inject } from "typedi"

@Service()
export default class ProductPageService {
    constructor(
        @Inject("productPageModel") private productPageModel: Models.productPageModel,
        @Inject("productPageDetailsModel") private productPageDetailsModel: Models.productPageDetailsModel,
        @Inject("logger") private logger
    ) {}

    public async createProductPage(data: any): Promise<any> {
        try {
            const productPage = await this.productPageModel.create({ ...data })
            this.logger.silly("productPage created ", productPage)
            return productPage
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async createProductPageProducts( productPageCode : any,productCode: any): Promise<any> {
        try {
            const product_page_code = productPageCode.productPageCode
            const product_code = productCode.productCode 
            const productPageDetails = await this.productPageDetailsModel.create({ product_page_code,product_code  })
            this.logger.silly("productPageDetails created ", productPageDetails)
            return productPageDetails
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



    public async findOneByCode(product_page_code: any): Promise<any> {
        try {
            const productPage = await this.productPageModel.findOne({ where: {product_page_code :product_page_code }})
            this.logger.silly("find one productPage")
            return productPage
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findAll(): Promise<any> {
        try {
            const productPages = await this.productPageModel.findAll()
            this.logger.silly("find all productPages")
            return productPages
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    

    // public async update(data: any, query: any): Promise<any> {
    //     try {
    //         const item = await this.itemModel.update(data, { where: query ,include: this.taxeModel })
    //         this.logger.silly("update one item mstr")
    //         return item
    //     } catch (e) {
    //         this.logger.error(e)
    //         throw e
    //     }
    // }
}
