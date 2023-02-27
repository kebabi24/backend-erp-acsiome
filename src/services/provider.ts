import { Service, Inject } from 'typedi';

@Service()
export default class ProvidersSercice {
  constructor(
    @Inject('providerModel') private providerModel: Models.ProviderModel,
    @Inject('addressModel') private addressModel: Models.AddressModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const provider = await this.providerModel.create({ ...data });
      this.logger.silly('provider', provider);
      return provider;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findOne(query: any): Promise<any> {
    try {
      const provider = await this.providerModel.findOne({ where: query, include: this.addressModel });
      this.logger.silly('find one provider ');
      return provider;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const providers = await this.providerModel.findAll({ where: query, include: this.addressModel });
      this.logger.silly('find All providers ');
      return providers;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const provider = await this.providerModel.update(data, { where: query });
      this.logger.silly('update one provider ');
      return provider;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const provider = await this.providerModel.destroy({ where: query });
      this.logger.silly('delete one provider ');
      return provider;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const vd = await this.providerModel.sync({ force: true });
      const us = query.vends;
      for (const u of us) {
        const utilis = await this.providerModel.create(u);
      }
      this.logger.silly('update one provider mstr');
      return vd;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
