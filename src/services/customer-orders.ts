import _ from 'lodash';
import { Service, Inject } from 'typedi';
const { Op, Sequelize } = require('sequelize');

@Service()
export default class customerOrderService {
  constructor(@Inject('customerOrdersModel') private customerOrdersModel: Models.customerOrdersModel) {}

  public async findOne(query: any): Promise<any> {
    try {
      const customer = await this.customerOrdersModel.findOne({ where: query });
      // this.logger.silly('find one customer ');
      return customer;
    } catch (e) {
      // this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      console.log(query);
      const customers = await this.customerOrdersModel.findAll({ where: query });
      // this.logger.silly('find All customers ');
      return customers;
    } catch (e) {
      // this.logger.error(e);
      throw e;
    }
  }
}
