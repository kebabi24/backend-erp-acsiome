import { Service, Inject } from 'typedi';

@Service()
export default class posProductService {
  constructor(
    @Inject('posProductModel') private posProductModel: Models.PosProductModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const product = await this.posProductModel.create({ ...data });
      this.logger.silly('create product mstr');
      return product;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const product = await this.posProductModel.findOne({ where: query });
      this.logger.silly('find one product mstr');
      return product;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const products = await this.posProductModel.findAll({ where: query });
      this.logger.silly('find All products mstr');
      return products;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const product = await this.posProductModel.upsert(data, { where: query });
      this.logger.silly('update one product mstr');
      return product;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const product = await this.posProductModel.destroy({ where: query });
      this.logger.silly('delete one product mstr');
      return product;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
