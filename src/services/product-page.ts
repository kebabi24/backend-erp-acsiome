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

    public async createProductPageProducts(data: any): Promise<any> {
        try {
           
            const productPageDetails = await this.productPageDetailsModel.create({ ...data })
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
           
            const deleteOldPages = await this.profileProductPageModel.destroy({ where: { profile_code: profile_code } })
            // const productPageDetails = await this.productPageDetailsModel.create({ product_page_code,product_code  })
            // this.logger.silly("productPageDetails created ", productPageDetails)
            const addProfilePages = []
            for (const pageCode of pagesCodes) {
                const addProfilePage = await this.profileProductPageModel.create({
                    profile_code: profile_code,
                    product_page_code: pageCode.product_page_code,
                    rank:pageCode.rank,
                   
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


            const productPageDetails = await this.productPageDetailsModel.findAll({ where: { product_page_code: productPageCode }, attributes: ['product_code'] })
            this.logger.silly("productPageDetails created ", productPageDetails)
            return productPageDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getPageAllProducts(productPageCode: any): Promise<any> {
        try {


            const productPageDetails = await this.productPageDetailsModel.findAll({ where: { product_page_code: productPageCode } })
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
    public async delete(query: any): Promise<any> {
        try {
            const pricelist = await this.productPageDetailsModel.destroy({ where: query })
            this.logger.silly("delete one pricelist mstr")
            return pricelist
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
          const page = await this.productPageModel.update(data, { where: query });
          this.logger.silly('update one profile mstr');
          return page;
        } catch (e) {
          this.logger.error(e);
          throw e;
        }
      }

}
