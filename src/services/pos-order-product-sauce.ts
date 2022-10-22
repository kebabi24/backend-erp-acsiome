import { Service, Inject } from 'typedi';

@Service()
export default class posOrderProductSauceService {
  constructor(
    @Inject('orderPosProductSauceModel') private orderPosProductSauceModel: Models.posOrderProductSauceModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const orderDetail = await this.orderPosProductSauceModel.create({ ...data });
      this.logger.silly('create order detail mstr');
      return orderDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const orderDetail = await this.orderPosProductSauceModel.findOne({ where: query });
      this.logger.silly('find one order detail mstr');
      return orderDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const ordersDetail = await this.orderPosProductSauceModel.findAll({
        where: query,
      });
      this.logger.silly('find All orders detail mstr');
      return ordersDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const orderDetail = await this.orderPosProductSauceModel.upsert(data, { where: query });
      this.logger.silly('update one orders detail mstr');
      return orderDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const orderDetail = await this.orderPosProductSauceModel.destroy({ where: query });
      this.logger.silly('delete one order detail mstr');
      return orderDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
