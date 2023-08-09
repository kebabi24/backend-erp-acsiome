import { Service, Inject } from "typedi"

@Service()
export default class ProductPageService {
    constructor(
        @Inject("productPageModel") private productPageModel: Models.productPageModel,
        @Inject("productPageDetailsModel") private productPageDetailsModel: Models.productPageDetailsModel,
        @Inject("profileProductPageModel") private profileProductPageModel: Models.profileProductPageModel,
        @Inject("logger") private logger
    ) { }

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

    public async createProductPageProducts(productPageCode: any, productCode: any): Promise<any> {
        try {
            const product_page_code = productPageCode.productPageCode
            const product_code = productCode.productCode
            const productPageDetails = await this.productPageDetailsModel.create({ product_page_code, product_code })
            this.logger.silly("productPageDetails created ", productPageDetails)
            return productPageDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOneByCode(product_page_code: any): Promise<any> {
        try {
            const productPage = await this.productPageModel.findOne({ where: { product_page_code: product_page_code } })
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



    public async updateProfileProductPages(profileCode: any, pagesCodesList: any): Promise<any> {
        try {
            const profile_code = profileCode.profileCode
            const pagesCodes = pagesCodesList.pagesCodes
            console.log(profile_code)
            const deleteOldPages = await this.profileProductPageModel.destroy({ where: { profile_code: profile_code } })
            // const productPageDetails = await this.productPageDetailsModel.create({ product_page_code,product_code  })
            // this.logger.silly("productPageDetails created ", productPageDetails)
            const addProfilePages = []
            for (const pageCode of pagesCodes) {
                const addProfilePage = await this.profileProductPageModel.create({
                    profile_code: profile_code,
                    product_page_code: pageCode,
                })
                addProfilePages.push(addProfilePage)
            }


            return addProfilePages
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getPageProducts(productPageCode: any): Promise<any> {
        try {


            const productPageDetails = await this.productPageDetailsModel.findAll({ where: { product_page_code: productPageCode }, ttributes: ['product_code'] })
            this.logger.silly("productPageDetails created ", productPageDetails)
            return productPageDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async updateProductPageProducts(profileCode: any, pagesCodesList: any): Promise<any> {
        try {
            const profile_code = profileCode.profileCode
            const pagesCodes = pagesCodesList.pagesCodes

            console.log(profile_code)
            const deleteOldPages = await this.profileProductPageModel.destroy({ where: { profile_code: profile_code } })

            const addProfilePages = []
            for (const pageCode of pagesCodes) {
                const addProfilePage = await this.profileProductPageModel.create({
                    profile_code: profile_code,
                    product_page_code: pageCode,
                })
                addProfilePages.push(addProfilePage)
            }


            return addProfilePages
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }


}
