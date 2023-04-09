

import { Op ,Sequelize } from "sequelize";
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

  public async findAllDetailsFiltered(startDate: any, endDate:any): Promise<any> {
    try {
      
      const ordersDetail = await this.posOrderDetailProductModel.findAll({
        where : Sequelize.and(
          {pt_group : ["POULET","VIANDE","MIXTE"]},
          {pt_part_type :["P","G","L"]},
          {pt_promo :["MIXTE","AUTHENTIQUE","CLASSIQUE"]},
          {pt_dsgn_grp  :["SANDWICH","PLAT","FORMULE"]},
          {created_date :  {[Op.gte]:new Date(startDate)}}, 
          {created_date :  {[Op.lte]:new Date(endDate)}},    
          ),
          
        attributes : ["id","pt_size","pt_group","pt_part_type","pt_qty_ord_pos","pt_price_pos","created_date","pt_promo","pt_dsgn_grp"]
      });
      this.logger.silly('find All orders detail mstr');
      return ordersDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
