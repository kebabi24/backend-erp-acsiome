import { Service, Inject } from 'typedi';

@Service()
export default class posOrderService {
  constructor(@Inject('posOrderModel') private posOrderModel: Models.posOrderModel, @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const order = await this.posOrderModel.create({ ...data });
      this.logger.silly('create order mstr');
      return order;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const order = await this.posOrderModel.findOne({ where: query });
      this.logger.silly('find one order mstr');
      return order;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const orders = await this.posOrderModel.findAll({ order: [['created_date', 'DESC']] });
      this.logger.silly('find All orders mstr');
      return orders;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  
  

  public async update(data: any, query: any): Promise<any> {
    try {
      const order = await this.posOrderModel.upsert(data, { where: query });
      this.logger.silly('update one orders mstr');
      return order;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const order = await this.posOrderModel.destroy({ where: query });
      this.logger.silly('delete one order mstr');
      return order;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
