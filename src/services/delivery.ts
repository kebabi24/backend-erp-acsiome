import { Service, Inject } from 'typedi';

@Service()
export default class DeliveryService {
  constructor(@Inject('deliveryModel') private deliveryModel: Models.deliveryModel, @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const platformes = await this.deliveryModel.create({ ...data });
      this.logger.silly('platformes', platformes);
      return platformes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findOne(query: any): Promise<any> {
    try {
      const platformes = await this.deliveryModel.findOne({ where: query });
      this.logger.silly('find one platformes mstr');
      return platformes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const platformes = await this.deliveryModel.findAll({ where: query });
      this.logger.silly('find All platformes mstr');
      return platformes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const platformes = await this.deliveryModel.update(data, { where: query });
      this.logger.silly('update one platformes mstr');
      return platformes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const platformes = await this.deliveryModel.destroy({ where: query });
      this.logger.silly('delete one platformes mstr');
      return platformes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
