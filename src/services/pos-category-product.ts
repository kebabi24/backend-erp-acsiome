import { Service, Inject } from 'typedi';

@Service()
export default class posCategoriesProductService {
  constructor(
    @Inject('posCategoryProductModel') private posCategoryProductModel: Models.PosCategoryProductModel,
    @Inject('posCategoryModel') private posCategoryModel: Models.PosCategoryModel,
    @Inject('posProductModel') private posProductModel: Models.PosProductModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const category_product = await this.posCategoryProductModel.create({ ...data });
      this.logger.silly('create category_product product mstr');
      return category_product;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const category_product = await this.posCategoryProductModel.findOne({ where: query });
      this.logger.silly('find one category_product mstr');
      return category_product;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const category_product = await this.posCategoryProductModel.findAll({ where: query });
      const category = await this.posCategoryProductModel.findAll({
        include: [{ model: this.posProductModel, right: true }],
      });
      this.logger.silly('find All category_product mstr');
      return category;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const category_product = await this.posCategoryProductModel.upsert(data, { where: query });
      this.logger.silly('update one category_product mstr');
      return category_product;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const category_product = await this.posCategoryProductModel.destroy({ where: query });
      this.logger.silly('delete one category_product mstr');
      return category_product;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
