import { Service, Inject } from 'typedi';

@Service()
export default class ordersHistoryService {
  constructor(
    @Inject('ordersHistoryModel') private ordersHistoryModel: Models.ordersHistory,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const history = await this.ordersHistoryModel.create({ ...data });
      this.logger.silly('create history orders mstr');
      return history;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const history = await this.ordersHistoryModel.findOne({ where: query });
      this.logger.silly('find one history mstr');
      return history;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOneByCode(query: any): Promise<any> {
    try {
      const history = await this.ordersHistoryModel.findOne({ where: { category_code: query } });
      this.logger.silly('find one history mstr');
      return history;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      // const categories = await this.posCategoryModel.findAll({ where: query });
      const history = await this.ordersHistoryModel.findAll({});
      this.logger.silly('find All history mstr');
      return history;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const history = await this.ordersHistoryModel.upsert(data, { where: query });
      this.logger.silly('update one history mstr');
      return history;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const history = await this.ordersHistoryModel.destroy({ where: query });
      this.logger.silly('delete one history mstr');
      return history;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
