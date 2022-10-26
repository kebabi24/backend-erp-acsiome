import { Service, Inject } from 'typedi';

@Service()
export default class banksSercice {
  constructor(
    @Inject('bankModel') private bankModel: Models.bankModel,
    @Inject('addressModel') private addressModel: Models.AddressModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const bank = await this.bankModel.create({ ...data });
      this.logger.silly('bank');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findOne(query: any): Promise<any> {
    try {
      const bank = await this.bankModel.findOne({ where: query, include: this.addressModel });
      this.logger.silly('find one bank ');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const banks = await this.bankModel.findAll({ where: query, include: this.addressModel });
      this.logger.silly('find All banks ');
      return banks;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const bank = await this.bankModel.update(data, {
        where: query,
      });
      this.logger.silly('update one inventoryStatus mstr');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const bank = await this.bankModel.destroy({ where: query });
      this.logger.silly('delete one bank ');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
