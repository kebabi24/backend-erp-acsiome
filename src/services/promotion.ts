
import { Sequelize } from "sequelize/types"
import { Service, Inject } from "typedi"
const { Op } = require("sequelize");

@Service()
export default class PromotionService {
    constructor(
        
        
        
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
            
            const pops = await this.populationArticleModel.findAll({
                where : {},
                group : ['population_code','id']
            })
            this.logger.silly("found all populations article ")
            return pops
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findAllAdvantages(): Promise<any> {
        try {
            
            const advs = await this.advantageModel.findAll({
                where : {},
                group : ['adv_code','id']
            })
            this.logger.silly("found all advantages")
            return advs
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }


    public async getPopArticle(query: any): Promise<any> {
        try {
            const population = await this.populationArticleModel.findOne({where : query })
            this.logger.silly("population found")
            return population
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getPromotion(query: any): Promise<any> {
        try {
            const promo = await this.promotionModel.findOne({where : query })
            this.logger.silly("promo found")
            return promo
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getAdvantage(query: any): Promise<any> {
        try {
            const adv = await this.advantageModel.findOne({where : query })
            this.logger.silly("adv found")
            return adv
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getValidePromos(site: any): Promise<any> {
        try {
            let today = new Date();
            let searchDate = new Date(today.getFullYear(),today.getMonth(),today.getDate())
            const dt = searchDate.getFullYear().toString()+'-'+(searchDate.getMonth()+1).toString()+'-'+(searchDate.getDate()).toString()

            const adv = await this.promotionModel.findAll({where : {
                site : site,
                start_date :  {[Op.lte]:new Date(dt)}  ,
                end_date :  {[Op.gte]:new Date(dt)} 
            } })
            this.logger.silly("promos found")
            return adv
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getPopsArticleByCodes(codes: any): Promise<any> {
        try {
           

            const pops = await this.populationArticleModel.findAll({where : {
                population_code : codes
            } })
            this.logger.silly("pops found")
            return pops
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async getAdvantagesByCodes(codes: any): Promise<any> {
        try {
           

            const advs = await this.advantageModel.findAll({where : {
                adv_code : codes
            } })
            this.logger.silly("advs found")
            return advs
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }


    


   

    

    
}
