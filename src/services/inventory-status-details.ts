import { Service, Inject } from "typedi"

@Service()
export default class inventoryStatusDetailService {
    constructor(
        @Inject("inventoryStatusDetailsModel") private inventoryStatusDetailModel: Models.InventoryStatusDetailModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const inventoryStatusDetail = await this.inventoryStatusDetailModel.create({ ...data })
            this.logger.silly("create inventoryStatusDetail mstr")
            return inventoryStatusDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const inventoryStatusDetail = await this.inventoryStatusDetailModel.findOne({ where: query})
            this.logger.silly("find one inventoryStatusDetail mstr")
            return inventoryStatusDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const requisitionDetails = await this.inventoryStatusDetailModel.findAll({ where: query})
            this.logger.silly("find All requisitionDetails mstr")
            return requisitionDetails
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const inventoryStatusDetail = await this.inventoryStatusDetailModel.update(data, { where: query })
            this.logger.silly("update one inventoryStatusDetail mstr")
            return inventoryStatusDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const inventoryStatusDetail = await this.inventoryStatusDetailModel.destroy({ where: query })
            this.logger.silly("delete one inventoryStatusDetail mstr")
            return inventoryStatusDetail
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

