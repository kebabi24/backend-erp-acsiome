import _ from 'lodash';
import { Service, Inject } from 'typedi';
const { Op, Sequelize } = require('sequelize');

@Service()
export default class allocationDetailService {
  constructor(@Inject('allocationDetailModel') private allocationDetailModel: Models.AllocationDetailModel, 
  @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
        const allocation = await this.allocationDetailModel.create({ ...data })
        this.logger.silly("create allocationDetail mstr")
        return allocation
    } catch (e) {
        this.logger.error(e)
        throw e
    }
}
  public async findOne(query: any): Promise<any> {
    try {
      const allocation = await this.allocationDetailModel.findOne({ where: query });
      // this.logger.silly('find one allocation ');
      return allocation;
    } catch (e) {
      // this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      console.log(query);
      const allocations = await this.allocationDetailModel.findAll({ where: query });
      // this.logger.silly('find All allocations ');
      return allocations;
    } catch (e) {
      // this.logger.error(e);
      throw e;
    }
  }
}
