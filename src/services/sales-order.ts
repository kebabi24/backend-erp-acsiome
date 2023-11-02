import { Service, Inject } from 'typedi';

@Service()
export default class SalesOrderService {
  constructor(
    @Inject('salesOrderModel') private salesOrderModel: Models.SalesOrderModel,
    @Inject('salesOrderLineModel') private salesOrderLineModel: Models.SalesOrderLineModel,
   
    @Inject('logger') private logger,
  ) {}

  public async createSalesOrder(data: any ): Promise<any> {
    try {
      const sales_order = await this.salesOrderModel.create({ ...data });
      this.logger.silly('sales order', sales_order);
      return sales_order;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  
  public async createSalesOrderLines(data: any ): Promise<any> {
    try {
      const sales_order_lines = await this.salesOrderLineModel.bulkCreate(data);
      this.logger.silly('sales order lines', sales_order_lines);
      return sales_order_lines;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async findSalesOrder(query: any): Promise<any> {
    try {
      const sales_order = await this.salesOrderModel.findOne({
        where: query,
      });

      this.logger.silly('found findSalesOrder ');
      return sales_order;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  


  public async findAllLines(query : any): Promise<any> {
    try {
      const items = await this.salesOrderLineModel.findAll({where : query});
      this.logger.silly('findAll items mstr');
      return items;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

}
