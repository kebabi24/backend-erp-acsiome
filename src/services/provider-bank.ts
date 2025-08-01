import { Service, Inject } from 'typedi';

@Service()
export default class ProviderBankSercice {
  constructor(
    @Inject('ProviderBankModel') private providerBankModel: Models.ProviderBankModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const provider = await this.providerBankModel.create({ ...data });
      this.logger.silly('provider', provider);
      return provider;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findOne(query: any): Promise<any> {
    try {
      const provider = await this.providerBankModel.findOne({ where: query, });
      this.logger.silly('find one provider ');
      return provider;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const providers = await this.providerBankModel.findAll({ where: query, });
      this.logger.silly('find All providers ');
      return providers;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const provider = await this.providerBankModel.update(data, { where: query });
      this.logger.silly('update one provider ');
      return provider;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const provider = await this.providerBankModel.destroy({ where: query });
      this.logger.silly('delete one provider ');
      return provider;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const vd = await this.providerBankModel.sync({ force: true });
      const us = query.vends;
      for (const u of us) {
        const utilis = await this.providerBankModel.create(u);
      }
      this.logger.silly('update one provider mstr');
      return vd;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
