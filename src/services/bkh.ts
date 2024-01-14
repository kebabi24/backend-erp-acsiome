import { Service, Inject } from 'typedi';

@Service()
export default class banksSercice {
  constructor(
    @Inject('bkhModel') private bkhModel: Models.bkhModel,
    @Inject('addressModel') private addressModel: Models.AddressModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const bank = await this.bkhModel.create({ ...data });
      this.logger.silly('bank');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findOne(query: any): Promise<any> {
    try {
      const bank = await this.bkhModel.findOne({ where: query, include: this.addressModel });
      this.logger.silly('find one bank ');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findgrp(query: any): Promise<any> {
    try {
      const orders = await this.bkhModel.findAll(query);
      this.logger.silly('find All orders mstr');
      return orders;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const banks = await this.bkhModel.findAll({ where: query });
      this.logger.silly('find All banks ');
      return banks;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findq(query: any): Promise<any> {
    try {
      const banks = await this.bkhModel.findAll(query);
      this.logger.silly('find All banks ');
      return banks;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const bank = await this.bkhModel.update(data, {
        where: query,
      });
      this.logger.silly('update one inventoryStatus mstr');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const bank = await this.bkhModel.destroy({ where: query });
      this.logger.silly('delete one bank ');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
