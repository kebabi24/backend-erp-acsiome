import { Service, Inject } from 'typedi';
import argon2 from 'argon2';
@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('profileModel') private profileModel: Models.ProfileModel,
    @Inject('addressModel') private addressModel: Models.AddressModel,
    @Inject('customerModel') private customerModel: Models.CustomerModel,
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

  public async getPhone(data: any): Promise<any> {
    try {
      const customer = await this.addressModel.findOne({
        where: { ad_addr: data },
      });

      this.logger.silly('created new customer', customer);
      return customer;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createCustomer(data: any): Promise<any> {
    try {
      const customerAdr = await this.addressModel.create({
        ad_name: data.name,
        ad_addr: data.phone,
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
}
