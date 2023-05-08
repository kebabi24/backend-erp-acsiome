import { Service, Inject } from 'typedi';

@Service()
export default class DealService {
  constructor(@Inject('dealModel') private dealModel: Models.DealModel, @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const deal = await this.dealModel.create({ ...data });
      this.logger.silly('create deal mstr');
      return deal;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const deal = await this.dealModel.findOne({ where: query });
      this.logger.silly('find one deal mstr');
      return deal;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const deals = await this.dealModel.findAll({ where: query });
      this.logger.silly('find All deals mstr');
      return deals;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const deal = await this.dealModel.update(data, { where: query });
      this.logger.silly('update one deal mstr');
      return deal;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const deal = await this.dealModel.destroy({ where: query });
      this.logger.silly('delete one deal mstr');
      return deal;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const deal = await this.dealModel.sync({ force: true });
      const deals = query.deals;
      for (const deal of deals) {
        const si = await this.dealModel.create(deal);
      }
      this.logger.silly('update one deal mstr');
      return deal;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
