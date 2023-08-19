import { Service, Inject } from "typedi"

@Service()
export default class SaleOrderDetailService {
    constructor(
        @Inject("saleorderDetailModel") private saleorderDetailModel: Models.SaleOrderDetailModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const saleorderDetail = await this.saleorderDetailModel.create({ ...data })
            this.logger.silly("create saleorderDetail mstr")
            return saleorderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const saleorderDetail = await this.saleorderDetailModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one saleorderDetail mstr")
            return saleorderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOneS(query: any): Promise<any> {
        try {
            const saleorderDetail = await this.saleorderDetailModel.findOne( query )
            this.logger.silly("find one saleorderDetail mstr")
            return saleorderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findgrp(query: any): Promise<any> {
        try {
            const saleorderDetail = await this.saleorderDetailModel.findAll( query )
            this.logger.silly("find one saleorderDetail mstr")
            return saleorderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async find(query: any): Promise<any> {
        try {
            const saleorderDetails = await this.saleorderDetailModel.findAll({ order: [
                ['sod_line', 'ASC'],
            ], where: query ,include: this.itemModel})
            this.logger.silly("find All saleorderDetails mstr")
            return saleorderDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const saleorderDetail = await this.saleorderDetailModel.update(data, { where: query })
            this.logger.silly("update one saleorderDetail mstr")
            return saleorderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
   public async delete(query: any): Promise<any> {
        try {
            const saleorderDetail = await this.saleorderDetailModel.destroy({ where: query })
            this.logger.silly("delete one saleorderDetail mstr")
            return saleorderDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

