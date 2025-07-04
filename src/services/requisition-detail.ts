import { Service, Inject } from "typedi"

@Service()
export default class requisitionDetailService {
    constructor(
        @Inject("requisitionDetailModel") private requisitionDetailModel: Models.RequisitionDetailModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("taxeModel") private taxeModel: Models.TaxeModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const requisitionDetail = await this.requisitionDetailModel.create({ ...data })
            this.logger.silly("create requisitionDetail mstr")
            return requisitionDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const requisitionDetail = await this.requisitionDetailModel.findOne({ where: query,include: [
                {
                  model: this.itemModel,
                  as: 'item',
                  required: true,
                  include: [{ model: this.taxeModel, as: 'taxe', required: true }],
                },
              ], })
            this.logger.silly("find one requisitionDetail mstr")
            return requisitionDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOneS(query: any): Promise<any> {
        try {
            const requisitionDetail = await this.requisitionDetailModel.findOne({ where: query })
            this.logger.silly("find one requisitionDetail mstr")
            return requisitionDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async find(query: any): Promise<any> {
        try {
            const requisitionDetails = await this.requisitionDetailModel.findAll({ where: query  ,include: [
                {
                  model: this.itemModel,
                  as: 'item',
                  required: true,
                  include: [{ model: this.taxeModel, as: 'taxe', required: true }],
                },
              ],
              })
            this.logger.silly("find All requisitionDetails mstr")
            return requisitionDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findDet(query: any): Promise<any> {
        try {
            const requisitionDetails = await this.requisitionDetailModel.findAll({ where: query })
            this.logger.silly("find All requisitionDetails mstr")
            return requisitionDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const requisitionDetail = await this.requisitionDetailModel.update(data, { where: query })
            this.logger.silly("update one requisitionDetail mstr")
            return requisitionDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const requisitionDetail = await this.requisitionDetailModel.destroy({ where: query })
            this.logger.silly("delete one requisitionDetail mstr")
            return requisitionDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

