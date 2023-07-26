import { Service, Inject } from "typedi"
import argon2 from 'argon2'
import { type } from "os"
@Service()
export default class MobileSettingsService {
    constructor(
        @Inject("visitresultModel") private visitresultModel: Models.visitresultModel,
        @Inject("cancelationReasonModel") private cancelationReasonModel: Models.cancelationReasonModel,
        @Inject("paymentMethodModel") private paymentMethodModel: Models.paymentModel,
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

     // ******************** GET PAYMENT METHODS **************************
     public async getPaymentMethods(): Promise<any> {
        try {
            const paymentMethods = await this.paymentMethodModel.findAll()
            return paymentMethods
        } catch (e) {
            console.log('Error from getPaymentMethod')
            this.logger.error(e)
            throw e
        }
    }

    // ******************** GET CANCELATION REASONS  **************************
    public async getCanelationReasons(): Promise<any> {
        try {
            const cancelationReasons = await this.cancelationReasonModel.findAll()
            return cancelationReasons
        } catch (e) {
            console.log('Error from getCanelationReasons')
            this.logger.error(e)
            throw e
        }
    }

    // ****************** CREATE CANCELATION REASONS ************
    public async createCancelationReasons(data: any): Promise<any> {
        try {
            const deleteData =  await this.cancelationReasonModel.destroy({where:{}})
            data.forEach(element => {
              delete element.id  
            });
            const reasons = await this.cancelationReasonModel.bulkCreate(data)
            this.logger.silly("visitResults", reasons)
            return reasons
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    // ****************** CREATE PAYMENT METHODS ************
    public async createPaymentMethods(data: any): Promise<any> {
        try {
            const deleteData =  await this.paymentMethodModel.destroy({where:{}})
            data.forEach(element => {
              delete element.id  
            });
            const methods = await this.paymentMethodModel.bulkCreate(data)
           
            this.logger.silly("methods", methods)
            return methods
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    

    
    

   
}

