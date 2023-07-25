
import { Sequelize } from "sequelize/types"
import { Service, Inject } from "typedi"
const { Op } = require("sequelize");

@Service()
export default class PromotionService {
    constructor(
        
        @Inject("roleModel") private roleModel: Models.RoleModel,
        @Inject("itemModel") private itemModel: Models.ItemModel, 
        @Inject("locationDetailModel") private locationDetailModel: Models.LocationDetailModel,
        @Inject("unloadRequestModel") private unloadRequestModel: Models.unloadRequestModel,
        @Inject("unloadRequestDetailsModel") private unloadRequestDetailsModel: Models.unloadRequestDetailsModel,
        
          @Inject("populationArticleModel") private populationArticleModel: Models.populationArticleModel,
          @Inject("promotionModel") private promotionModel: Models.promotionModel,
          @Inject("advantageModel") private advantageModel: Models.advantageModel,
        
        @Inject("logger") private logger
    ) {}

    public async createPopulationArticle(data: any): Promise<any> {
        try {
            const populationArticle = await this.populationArticleModel.bulkCreate(data )
            this.logger.silly("created population article")
            return populationArticle
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async createAdvantage(data: any): Promise<any> {
        try {
            
            const advantage = await this.advantageModel.create(data )
            this.logger.silly("created advantage ")
            return advantage
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async createPromotion(data: any): Promise<any> {
        try {
            
            const promo = await this.promotionModel.create(data )
            this.logger.silly("created promo ")
            return promo
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findAllPopArticle(): Promise<any> {
        try {
            
            const pops = await this.populationArticleModel.findAll({} )
            this.logger.silly("found all populations article ")
            return pops
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }


        /// ******************************************
    
    public async getRole(query: any): Promise<any> {
        try {
            const role = await this.roleModel.findOne({where : query })
            this.logger.silly("role found")
            return role
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async createMultipleUnoadRequests(data: any): Promise<any> {
        try {

            const loadRequests = await this.unloadRequestModel.bulkCreate(data )
            this.logger.silly("created unload requests")
            return loadRequests
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    } 

    // USED
    public async createMultipleUnoadRequestsDetails(data: any): Promise<any> {
        try {
            const loadRequestsDetails = await this.unloadRequestDetailsModel.bulkCreate(data )
            this.logger.silly("created unload requests details")
            console.log(loadRequestsDetails)
            return loadRequestsDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // USED
    public async findAllRolesByUpperRoleCode(query: any): Promise<any> {
        try {
            const roles = await this.roleModel.findAll({where : query })
            this.logger.silly("find all load requeusts")
            return roles
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // USED
    public async findAllUnloadRequestsByRoleCode(role_code: any): Promise<any> {
        try {
            const loadRequests = await this.unloadRequestModel.findAll({where : {role_code:role_code , status : 0}})
            this.logger.silly("find all unloadRequests")
            return loadRequests
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }


    // USED
    public async findAlUnloadRequests10ByRoleCode(role_code: any): Promise<any> {
        try {
            const loadRequests = await this.unloadRequestModel.findAll({where : {role_code:role_code , status : 10}})
            this.logger.silly("find all unloadRequests")
            return loadRequests
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

   // USED
    public async updateUnloadRequestStatusTo10(unload_request_code: any): Promise<any> {
        try {
            const unloadRequest = await this.unloadRequestModel.update({ status:10 }, 
                { where: {unload_request_code:unload_request_code} })
              
            this.logger.silly("unload request status updated to 10")
            return unloadRequest
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // USED
    public async findUnloadRequest(query: any): Promise<any> {
        try {
            const unloadRequest = await this.unloadRequestModel.findOne({where : query})
            this.logger.silly("find one unloadRequest")
            return unloadRequest
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getLotsOfProduct(ld_loc: any, ld_site : any , product_code :any): Promise<any> {
        try {
            const lots = await this.locationDetailModel.findAll({
                where : {
                    ld_loc: ld_loc, ld_part: product_code, ld_site : ld_site
                },
                attributes: ["id","ld_lot","ld_qty_oh","ld_expire","ld_site","ld_loc"]
            })
            this.logger.silly("find all lots")
            lots.forEach(lot => {
             lot.dataValues["qty_selected"] = 0  
            });
            
            return lots
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // USED
    public async getUnloadRequestData( unload_request_code :any): Promise<any> {
        try {
     
            const unloadRequestDetails = await this.unloadRequestDetailsModel.findAll({where:{unload_request_code :unload_request_code }})
            for(const detail of unloadRequestDetails){
                const product = await this.itemModel.findOne({
                    where :{pt_part : detail.product_code},
                    attributes:['pt_desc1', 'pt_price','pt_part']
                })
                detail.dataValues.product_desc = product.dataValues.pt_desc1
            }
             
            return unloadRequestDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // USED
    public async updateUnloadRequestStatusToX(unload_request_codes: any , x : any): Promise<any> {
        try {
            const unloadRequest = await this.unloadRequestModel.update({ status: x }, 
                { where: {unload_request_code:unload_request_codes} })
              
            this.logger.silly("unloadRequest status updated to " + x)
            return unloadRequest
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // USED
    public async deleteUnloadRequestDetail(query: any  ): Promise<any> {
        try {
            const loadRequestDetail = await this.unloadRequestDetailsModel.destroy({where : query})
              
            this.logger.silly("deleted one unload request detail")
            return loadRequestDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    
}
