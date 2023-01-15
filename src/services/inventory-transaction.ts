import { Service, Inject } from "typedi"

@Service()
export default class inventoryTransactionService {
    constructor(
        @Inject("InvetoryTransactionModel") private inventoryTransactionModel: Models.InventoryTransactionModel,
        @Inject("itemModel") private itemModel: Models.ItemModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const inventoryTransaction = await this.inventoryTransactionModel.create({ ...data })
            this.logger.silly("create inventoryTransaction mstr")
            return inventoryTransaction
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const inventoryTransaction = await this.inventoryTransactionModel.findOne({ where: query, include: this.itemModel })
            this.logger.silly("find one inventoryTransaction mstr")
            return inventoryTransaction
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const inventoryTransactions = await this.inventoryTransactionModel.findAll({ where: query })
            // ,include: this.itemModel
            this.logger.silly("find All inventoryTransactions mstr")
            return inventoryTransactions
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findSpecial(query: any): Promise<any> {
        try {
            const inventoryTransactions = await this.inventoryTransactionModel.findAll(query)
            this.logger.silly("find All inventoryTransactions mstr")
            return inventoryTransactions
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            const inventoryTransaction = await this.inventoryTransactionModel.update(data, { where: query })
            this.logger.silly("update one inventoryTransaction mstr")
            return inventoryTransaction
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const inventoryTransaction = await this.inventoryTransactionModel.destroy({ where: query })
            this.logger.silly("delete one inventoryTransaction mstr")
            return inventoryTransaction
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}

