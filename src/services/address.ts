import { Service, Inject } from 'typedi';

@Service()
export default class addressService {
  constructor(@Inject('addressModel') private addressModel: Models.AddressModel, @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const address = await this.addressModel.create({ ...data });
      this.logger.debug(`address: ${address}`);
      return address;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findOne(query: any): Promise<any> {
    try {
      const address = await this.addressModel.findOne({ where: query });
      this.logger.silly('find one address mstr');
      return address;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async find(query: any): Promise<any> {
    try {
      const address = await this.addressModel.findAll({ where: query });
      this.logger.silly('find All Address mstr');
      return address;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async update(data: any, query: any): Promise<any> {
    try {
      const address = await this.addressModel.update(data, { where: query });
      this.logger.silly('update one provider ');
      return address;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const address = await this.addressModel.destroy({ where: query });
      this.logger.silly('delete one provider ');
      return address;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const zdd = await this.addressModel.sync({ force: true });
      const us = query.add;
      for (const u of us) {
        const utilis = await this.addressModel.create(u);
      }
      this.logger.silly('update one pss mstr');
      return zdd;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
