import { Service, Inject } from 'typedi';

@Service()
export default class posOrderService {
  constructor(
    @Inject('posOrderModel') private posOrderModel: Models.posOrderModel,
    @Inject('posOrderDetailProductModel') private posOrderDetailProductModel: Models.posOrderDetailProductModel,
    @Inject('orderPosProductSuppModel') private orderPosProductSuppModel: Models.posOrderroductSuppModel,
    @Inject('orderPosProductSauceModel') private orderPosProductSauceModel: Models.posOrderProductSauceModel,
    @Inject('orderPosProductIngModel') private orderPosProductIngModel: Models.posOrderProductIngModel,
    @Inject('logger') private logger,
  ) {}

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
      const orders = await this.posOrderModel.findAll({
        order: [['createdAt', 'DESC']],
        where: query,
      });
      this.logger.silly('find All orders mstr');
      return orders;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findW(query: any): Promise<any> {
    try {
      const orders = await this.posOrderModel.findAll();
      this.logger.silly('find All orders mstr');
      return orders;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOrder(query: any): Promise<any> {
    try {
      const orders = await this.posOrderModel.findOne({ where: query });
      const o = orders.dataValues;
      const currentOrder = {
        id: o.id,
        order_code: o.order_code,
        customer: o.customer,
        order_emp: o.order_emp,
        total_price: o.total_price,
        created_date: o.created_date,
        products: [],
        from: o.from,
      };
      const pro = await this.posOrderDetailProductModel.findAll({ where: { order_code: o.order_code } });

      for (const p of pro) {
        const product = {
          id: '',
          pt_part: '',
          line: '',
          pt_article: '',
          pt_bom_code: '',
          pt_desc1: '',
          pt_formule: '',
          comment: '',
          pt_price: 0,
          pt_qty: 0,
          pt_loc: '',
          created_date: '',
          suppliments: [],
          ingredients: [],
          sauces: [],
        };
        (product.id = p.id),
          (product.pt_part = p.pt_part),
          (product.pt_article = p.pt_article),
          (product.line = p.line),
          (product.pt_bom_code = p.pt_bom_code),
          (product.pt_formule = p.pt_formule),
          (product.pt_desc1 = p.pt_desc1),
          (product.comment = p.pt_size),
          (product.pt_price = p.pt_price_pos),
          (product.pt_qty = p.pt_qty_ord_pos),
          (product.pt_loc = p.pt_loc);
        const supp = await this.orderPosProductSuppModel.findAll({
          where: { order_code: o.order_code, pt_part: p.pt_part },
        });
        product.suppliments = supp;
        const sauces = await this.orderPosProductSauceModel.findAll({
          where: { order_code: o.order_code, pt_part: p.pt_part },
        });
        product.sauces = sauces;
        const ing = await this.orderPosProductIngModel.findAll({
          where: { order_code: o.order_code, pt_part: p.pt_part },
        });
        product.ingredients = ing;
        currentOrder.products.push(product);
      }
      this.logger.silly('find All orders mstr');
      return currentOrder;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const order = await this.posOrderModel.update(data, { where: query });
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
