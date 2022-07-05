import { Service, Inject } from "typedi"


@Service()
export default class generalLedgersSercice {
    constructor(
        @Inject("generalLedgerModel") private generalLedgerModel: Models.generalLedgerModel,
        
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const generalLedger = await this.generalLedgerModel.create({ ...data })
            this.logger.silly("generalLedger")
            return generalLedger
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findOne(query: any): Promise<any> {
        try {
            const generalLedger = await this.generalLedgerModel.findOne({ where: query })
            this.logger.silly("find one generalLedger ")
            return generalLedger
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findLastId(query: any): Promise<any> {
        try {
            const generalLedger = await this.generalLedgerModel.findOne({ where: query, order : [['id', 'DESC']] })
            this.logger.silly("find All generalledger mstr")
            return generalLedger
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async find(query: any): Promise<any> {
        try {
            const generalLedgers = await this.generalLedgerModel.findAll({ where: query})
            this.logger.silly("find All generalLedgers ")
            return generalLedgers
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
          const generalLedger = await this.generalLedgerModel.update(data, {
            where: query,
          });
          this.logger.silly('update one inventoryStatus mstr');
          return generalLedger;
        } catch (e) {
          this.logger.error(e);
          throw e;
        }
      }
    public async delete(query: any): Promise<any> {
        try {
            const generalLedger = await this.generalLedgerModel.destroy({ where: query })
            this.logger.silly("delete one generalLedger ")
            return generalLedger
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
