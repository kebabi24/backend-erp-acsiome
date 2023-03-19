import { Service, Inject } from 'typedi';

@Service()
export default class posOrderProductService {
  constructor(
    @Inject('posOrderDetailProductModel') private posOrderDetailProductModel: Models.posOrderDetailProductModel,
    @Inject('posOrderModel') private posOrderModel: Models.posOrderModel,
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const orderDetail = await this.posOrderDetailProductModel.create({ ...data });
      this.logger.silly('create order detail mstr');
      return orderDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const orderDetail = await this.posOrderDetailProductModel.findOne({ where: query });
      this.logger.silly('find one order detail mstr');
      return orderDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const ordersDetail = await this.posOrderDetailProductModel.findAll({
        where: query,
      });
      this.logger.silly('find All orders detail mstr');
      return ordersDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findspec(query: any): Promise<any> {
    try {
      const ordersDetail = await this.posOrderDetailProductModel.findAll(query);
      this.logger.silly('find All orders detail mstr');
      return ordersDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async update(data: any, query: any): Promise<any> {
    try {
      const orderDetail = await this.posOrderDetailProductModel.update(data, { where: query });
      this.logger.silly('update one orders detail mstr');
      return orderDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const orderDetail = await this.posOrderDetailProductModel.destroy({ where: query });
      this.logger.silly('delete one order detail mstr');
      return orderDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
