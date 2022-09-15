import { Service, Inject } from "typedi"
import argon2 from 'argon2'
import { type } from "os"
@Service()
export default class MobileSettingsService {
    constructor(
        @Inject("visitresultModel") private visitresultModel: Models.visitresultModel,
        @Inject("logger") private logger
    ) {}

    // ****************** CREATE MULTIPLE VISIT RESULTS ************
    public async createManyVisitResult(data: any): Promise<any> {
        try {
            const visitResults = await this.visitresultModel.bulkCreate(data)
            console.log('created')
            this.logger.silly("visitResults", visitResults)
            return visitResults
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET VISITLIST  **************************
    public async getVisitList(): Promise<any> {
        try {
            const visitresultData = await this.visitresultModel.findAll()
            
            const visititresult = []
            visitresultData.forEach(element => {
                visititresult.push(element.dataValues)
            });
            
            // console.log(visititresult)
            return visititresult
        } catch (e) {
            console.log('Error from service-getVisitlist')
            this.logger.error(e)
            throw e
        }
    }
    

    // ******************** GET VISITLIST  **************************
    public async deleteVisitResultsById(query: any): Promise<any> {
        try {
            const visitResults = await this.visitresultModel.destroy({ where: query })
            this.logger.silly("deleted the visit results")
            return visitResults
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ******************** UPDATE **************************
    public async updateOneVisitList(data: any, query: any): Promise<any> {
        try {
            const user = await this.visitresultModel.update(
                data, {
                where: query,
            })
            this.logger.silly("update one visit list ")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    

    
    

   
}

