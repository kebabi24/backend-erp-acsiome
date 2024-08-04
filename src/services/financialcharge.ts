import { Service, Inject } from "typedi"

@Service()
export default class forcastService {
    constructor(
        @Inject("financialchargeModel") private financialchargeModel: Models.FinancialchargeModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const financialcharge = await this.financialchargeModel.create({ ...data })
            this.logger.silly("create forcast mstr")
            return financialcharge
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const financialcharge = await this.financialchargeModel.findOne({ where: query })
            this.logger.silly("find one forcast mstr")
            return financialcharge
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const financialcharges = await this.financialchargeModel.findAll({ where: query })
            this.logger.silly("find All forcasts mstr")
            return financialcharges
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async findq(query: any): Promise<any> {
        try {
          const financialcharges = await this.financialchargeModel.findAll(query);
          this.logger.silly('find All banks ');
          return financialcharges;
        } catch (e) {
          this.logger.error(e);
          throw e;
        }
      }
    public async update(data: any, query: any): Promise<any> {
        try {
            const financialcharge = await this.financialchargeModel.update(data, { where: query })
            this.logger.silly("update one forcast mstr")
            return financialcharge
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const financialcharge = await this.financialchargeModel.destroy({ where: query })
            this.logger.silly("delete one forcast mstr")
            return financialcharge
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
