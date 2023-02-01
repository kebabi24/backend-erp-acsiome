import { Service, Inject } from 'typedi';
import argon2 from 'argon2';
@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('profileModel') private profileModel: Models.ProfileModel,
    @Inject('addressModel') private addressModel: Models.AddressModel,
    @Inject('customerModel') private customerModel: Models.CustomerModel,
    @Inject('codeModel') private codeModel: Models.CodeModel,
    @Inject('purchaseOrderModel')
    private purchaseOrderModel: Models.PurchaseOrderModel,
    @Inject('posOrderModel') private posOrderModel: Models.posOrderModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const usrd_pwd = await argon2.hash(data.usrd_pwd);
      const user = await this.userModel.create({ ...data, usrd_pwd });
      this.logger.silly('create user mstr');
      return user;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const user = await this.userModel.findOne({ where: query, include: this.profileModel });
      this.logger.silly('find one user mstr');
      return user;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const users = await this.userModel.findAll({ where: query });
      this.logger.silly('find All users mstr');
      return users;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    const usrd_pwd = await argon2.hash(data.usrd_pwd);
    try {
      const user = await this.userModel.update({ ...data, usrd_pwd }, { where: query });
      this.logger.silly('update one user mstr');
      return user;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async updated(data: any, query: any): Promise<any> {
    const usrd_pwd = await argon2.hash(data.usrd_pwd);

    try {
      const user = await this.userModel.update(
        { ...data, usrd_pwd },
        {
          where: query,
        },
      );
      this.logger.silly('update one tool mstr');
      return user;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const user = await this.userModel.destroy({ where: query });
      this.logger.silly('delete one user mstr');
      return user;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // cm_addr: data.phone,
  // cm_sort: data.name,
  // cm_high_date: data.birthdate,
  // cm_promo : data.promo_code,
  // cm_disc_pct: data.discount_pct,
  // cm_type: 'OPN',

  public async getPhone(data: any): Promise<any> {
    try {
      const customer_data = await this.customerModel.findOne({
        where: { cm_addr: data },
        attributes: ['id', 'cm_addr', 'cm_sort', 'cm_high_date', 'cm_promo', 'cm_disc_pct', 'cm_type'],
      });

      const addr = await this.addressModel.findOne({
        where: { ad_addr: data },
        attributes: ['ad_line1', 'ad_line2', 'ad_ref', 'ad_ext'],
      });

      if(addr){

        customer_data.dataValues.wilaya = addr.ad_line1;
        customer_data.dataValues.commune = addr.ad_line2;
        (customer_data.dataValues.email = addr.ad_ext),
          (customer_data.dataValues.gender = addr.ad_ref)
      }

        this.logger.silly('results', customer_data);
      return customer_data;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createCustomer(data: any): Promise<any> {
    try {
      const customerAdr = await this.addressModel.create({
        ad_addr: data.phone,
        ad_name: data.name,
        ad_format: data.age,
        ad_ref: data.gender,
        ad_line1: data.commune,
        ad_ext: data.email,
      });

      const customer = await this.customerModel.create({
        cm_db: data.promo_code,
        cm_addr: data.phone,
        cm_disc_pct: data.discount_pct,
      });

      this.logger.silly('created new customer', customerAdr, customer);
      return customerAdr;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getNewPurchaseOrders(): Promise<any> {
    try {
      const orders = await this.purchaseOrderModel.findAll({
        where: { po_stat: 'p' },
        attributes: ['id', 'po_nbr', 'po_vend', 'po_ord_date'],
      });

      this.logger.silly('created new orders', orders);
      return orders;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getNewOrders(): Promise<any> {
    try {
      const orders = await this.posOrderModel.findAll({
        where: { status: 'A' },
        attributes: ['id', 'order_code', 'customer', 'order_emp'],
      });

      this.logger.silly('found new orders', orders);
      return orders;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const site = await this.userModel.upsert(query.user);
      this.logger.silly('update one user mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
