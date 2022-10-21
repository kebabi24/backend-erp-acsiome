import { Service, Inject } from 'typedi';

@Service()
export default class posCategoriesService {
  constructor(
    @Inject('posCategoryModel') private posCategoryModel: Models.PosCategoryModel,
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('posProductModel') private posProductModel: Models.PosProductModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const category = await this.posCategoryModel.create({ ...data });
      this.logger.silly('create category mstr');
      return category;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const category = await this.posCategoryModel.findOne({ where: query });
      this.logger.silly('find one category mstr');
      return category;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      // const categories = await this.posCategoryModel.findAll({ where: query });
      const categories = await this.posCategoryModel.findAll({
        where: query,
      });
      this.logger.silly('find All categories mstr');
      return categories;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const category = await this.posCategoryModel.upsert(data, { where: query });
      this.logger.silly('update one category mstr');
      return category;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const category = await this.posCategoryModel.destroy({ where: query });
      this.logger.silly('delete one category mstr');
      return category;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}