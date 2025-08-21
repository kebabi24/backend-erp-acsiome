import { Service, Inject } from "typedi"

@Service()
export default class purchaseReceiveService {
    constructor(
        @Inject("PurchaseReceiveModel") private purchaseReceiveModel: Models.PurchaseRecieveModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("addressModel") private addressModel: Models.AddressModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const purchaseReceive = await this.purchaseReceiveModel.create({ ...data })
            this.logger.silly("create purchaseReceive mstr")
            return purchaseReceive
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const purchaseReceive = await this.purchaseReceiveModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one purchaseReceive mstr")
            return purchaseReceive
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const purchaseReceives = await this.purchaseReceiveModel.findAll({ where: query ,include: this.itemModel})
            this.logger.silly("find All purchaseReceives mstr")
            return purchaseReceives
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findTr(query: any): Promise<any> {
        try {
            const purchaseReceives = await this.purchaseReceiveModel.findAll({ where: query ,include: [this.itemModel,this.addressModel]})
            this.logger.silly("find All purchaseReceives mstr")
            return purchaseReceives
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findspec(query: any): Promise<any> {
        try {
            const purchaseReceives = await this.purchaseReceiveModel.findAll(query )
            this.logger.silly("find All purchaseReceives mstr")
            return purchaseReceives
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findspecOne(query: any): Promise<any> {
        try {
            const purchaseReceives = await this.purchaseReceiveModel.findOne(query )
            this.logger.silly("find All purchaseReceives mstr")
            return purchaseReceives
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async distinct(query: any): Promise<any> {
        try {       /*Attributes: ['prh_reciever', 'prh_vend','prh_rcp_date'],group: ['prh_receiver'],*/
            const purchaseRecieves = await this.purchaseReceiveModel.findAll({ where: query});
            this.logger.silly("find All saleShipers mstr")
            return purchaseRecieves
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async update(data: any, query: any): Promise<any> {
        try {
            const purchaseReceive = await this.purchaseReceiveModel.update(data, { where: query })
            this.logger.silly("update one purchaseReceive mstr")
            return purchaseReceive
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async delete(query: any): Promise<any> {
        try {
            const purchaseReceive = await this.purchaseReceiveModel.destroy({ where: query })
            this.logger.silly("delete one purchaseReceive mstr")
            return purchaseReceive
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async max(field: any): Promise<any> {
        try {
            const max = await this.purchaseReceiveModel.max(field)
            this.logger.silly("max one tag mstr")
            return max
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

