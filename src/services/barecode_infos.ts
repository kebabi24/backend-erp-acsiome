import { Service, Inject } from 'typedi';

@Service()
export default class barecodeInfosSercice {
  constructor(
    @Inject('barecodeInfosModel') private barecodeInfosModel: Models.barecodeInfosModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const bank = await this.barecodeInfosModel.create({ ...data });
      this.logger.silly('bank');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findOne(query: any): Promise<any> {
    try {
      const bank = await this.barecodeInfosModel.findOne({ where: query });
      this.logger.silly('find one bank ');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const banks = await this.barecodeInfosModel.findAll({ where: query });
      this.logger.silly('find All banks ');
      return banks;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const bank = await this.barecodeInfosModel.update(data, {
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
      const bank = await this.barecodeInfosModel.destroy({ where: query });
      this.logger.silly('delete one bank ');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const bkk = await this.barecodeInfosModel.sync({ force: true });
      const us = query.bks;
      for (const u of us) {
        const utilis = await this.barecodeInfosModel.create(u);
      }
      this.logger.silly('update one pss mstr');
      return bkk;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
