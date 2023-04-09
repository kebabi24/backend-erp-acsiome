import { Service, Inject } from 'typedi';
import { Op ,Sequelize } from "sequelize";

@Service()
export default class posOrderService {
  constructor(
    @Inject('posOrderModel') private posOrderModel: Models.posOrderModel,
    @Inject('serviceModel') private serviceModel: Models.ServiceModel,
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
  public async findgrp(query: any): Promise<any> {
    try {
      const orders = await this.posOrderModel.findAll(query);
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
      const order_code = query.order_code;
      const usrd_site = query.usrd_site;
      console.log(query);
      const service = await this.serviceModel.findOne({
        where: { service_site: usrd_site, service_open: true },
      });

      const service_date = service.dataValues.service_period_activate_date;
      // console.log(service_date);
      const orders = await this.posOrderModel.findOne({
        where: { order_code: order_code, created_date: service_date, usrd_site: usrd_site },
      });
      // console.log(orders);
      const o = orders.dataValues;
      // console.log(o.created_date);
      const currentOrder = {
        id: o.id,
        order_code: o.order_code,
        customer: o.customer,
        order_emp: o.order_emp,
        total_price: o.total_price,
        created_date: o.created_date,
        products: [],
        plateforme: o.plateforme,
      };
      const pro = await this.posOrderDetailProductModel.findAll({
        where: { order_code: o.order_code, created_date: service_date, usrd_site: usrd_site },
      });
      // console.log(pro);
      for (const p of pro) {
        // console.log(p);
        const product = {
          id: '',
          pt_part: '',
          line: '',
          pt_article: '',
          pt_bom_code: '',
          pt_desc1: '',
          pt_desc2: '',
          pt_formule: '',
          comment: '',
          pt_price: 0,
          pt_qty: 0,
          pt_loc: '',
          created_date: '',
          suppliments: [],
          ingredients: [],
          sauces: [],
          pt_promo: '',
          pt_dsgn_grp: '',
          pt_part_type: '',
          pt_group: '',
        };
        (product.id = p.id),
          (product.pt_part = p.pt_part),
          (product.pt_article = p.pt_article),
          (product.line = p.line),
          (product.pt_bom_code = p.pt_bom_code),
          (product.pt_formule = p.pt_formule),
          (product.pt_desc1 = p.pt_desc1),
          (product.pt_desc2 = p.pt_desc2),
          (product.comment = p.pt_size),
          (product.pt_price = p.pt_price_pos),
          (product.pt_qty = p.pt_qty_ord_pos),
          (product.pt_loc = p.pt_loc);
        product.pt_group = p.pt_group;
        product.pt_dsgn_grp = p.pt_dsgn_grp;
        product.pt_promo = p.pt_promo;
        product.pt_part_type = p.pt_part_type;
        const supp = await this.orderPosProductSuppModel.findAll({
          where: {
            order_code: o.order_code,
            pt_part: p.pt_part,
            line: p.line,
            created_date: service_date,
            usrd_site: usrd_site,
          },
        });
        product.suppliments = supp;
        const sauces = await this.orderPosProductSauceModel.findAll({
          where: {
            order_code: o.order_code,
            pt_part: p.pt_part,
            line: p.line,
            created_date: service_date,
            usrd_site: usrd_site,
          },
        });
        console.log(sauces);
        product.sauces = sauces;
        const ing = await this.orderPosProductIngModel.findAll({
          where: {
            order_code: o.order_code,
            pt_part: p.pt_part,
            line: p.line,
            created_date: service_date,
            usrd_site: usrd_site,
          },
        });
        product.ingredients = ing;
        currentOrder.products.push(product);
      }
      // console.log(currentOrder);
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

  public async findAllPosOrders(startDate: any, endDate:any): Promise<any> {
    try {
      
      const orders = await this.posOrderModel.findAll({
        where :Sequelize.and( 
          {del_comp  :{[Op.not]: "null"}},
          {created_date :  {[Op.gte]:new Date(startDate)}},
          {created_date :  {[Op.lte]:new Date(endDate)}},    
        ),
        attributes:["id","usrd_site","total_price","del_comp","created_date","customer"]
      });
      this.logger.silly('found all orders mstr');
      return orders;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
