import _ from 'lodash';
import { Service, Inject } from 'typedi';
const { Op, Sequelize } = require('sequelize');

@Service()
export default class customersSercice {
  constructor(
    @Inject('customerModel') private customerModel: Models.CustomerModel,
    @Inject('addressModel') private addressModel: Models.AddressModel,
    @Inject('complaintModel') private complaintModel: Models.complaintModel,
    @Inject('complaintDetailsModel') private complaintDetailsModel: Models.complaintModel,
    @Inject('posOrderModel') private posOrderModel: Models.posOrderModel,
    @Inject('codeModel') private codeModel: Models.CodeModel,
    @Inject('siteModel') private siteModel: Models.SiteModel,
    @Inject('satisfactionModel') private satisfactionModel: Models.SatisfactionModel,
    @Inject('sequenceModel') private sequenceModel: Models.SequenceModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const customer = await this.customerModel.create({ ...data });
      this.logger.silly('customer', customer);
      return customer;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const customer = await this.customerModel.findOne({ where: query, include: this.addressModel });
      this.logger.silly('find one customer ');
      return customer;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const customers = await this.customerModel.findAll({ where: query, include: this.addressModel });
      this.logger.silly('find All customers ');
      return customers;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const customer = await this.customerModel.update(data, { where: query });
      this.logger.silly('update one customer ');
      return customer;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async delete(query: any): Promise<any> {
    try {
      const customer = await this.customerModel.destroy({ where: query });
      this.logger.silly('delete one customer ');
      return customer;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // NEW METHODS FOR : RECLAMATION & SATISFACTION
  public async createComplaint(data: any): Promise<any> {
    try {
      const complaint = await this.complaintModel.create({ ...data });
      this.logger.silly('complaint', complaint);
      return complaint;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createComplaintDetails(data: any): Promise<any> {
    try {
      const complaintDetails = await this.complaintDetailsModel.bulkCreate(data);
      this.logger.silly('complaint details', complaintDetails);
      return complaintDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createSatisfaction(data: any): Promise<any> {
    try {
      const satisfaction = await this.satisfactionModel.create({ ...data });
      this.logger.silly('satisfaction', satisfaction);
      return satisfaction;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // FIND ONE CUSTOMER WITH RETURNING FEW FIELDS ONLY
  public async findCustomer(query: any): Promise<any> {
    try {
      const customer = await this.addressModel.findOne({
        where: { ad_addr: query },
        attributes: ['id', 'ad_attn', 'ad_addr', 'ad_format', 'ad_ref', 'ad_name', 'ad_ext', 'ad_line1'],
      });
      this.logger.silly('find one customer ');
      return customer;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // CREATE CUSTOMER FOR RECLAMATION
  public async createCustomer(data: any): Promise<any> {
    try {
      const customer = await this.addressModel.create({
        ad_name: data.name,
        ad_addr: data.phone_number,
        ad_format: data.age,
        ad_ref: data.gendre,
        ad_line1: data.adress,
        ad_ext: data.email,
      });

      this.logger.silly('created new customer', customer);
      return customer;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getReclamationCauses(): Promise<any> {
    try {
      const causes = await this.codeModel.findAll({
        where: { code_fldname: 'reclamation_cause' },
        attributes: ['id', 'code_value', 'code_desc', 'code_cmmt','bool01'],
        group: ['code_cmmt', 'id'],
      });
      const fileterd = _.mapValues(_.groupBy(causes, 'code_cmmt'));
      const filtered_causes = [];
      for (const [key, value] of Object.entries(fileterd)) {
        filtered_causes.push({
          groupe_titel: key,
          causes_group: value,
        });
      }
      // causes => causes.map(cause => _.omit(cause , 'code_cmmt')  check it later

      this.logger.silly('find causes ');
      return { causes, filtered_causes };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOrder(query: any): Promise<any> {
    try {
      const order = await this.posOrderModel.findOne({
        where: { order_code: query },
        attributes: ['id', 'order_code', 'usrd_site', 'order_emp', 'created_date'],
      });

      const site = await this.siteModel.findOne({
        where: { si_site: order.usrd_site },
        attributes: ['si_desc'],
      });

      order.usrd_site = site.si_desc;
      this.logger.silly('find one order ');
      return order;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const cus = await this.customerModel.sync({ force: true });
      const us = query.custs;
      for (const u of us) {
        const utilis = await this.customerModel.create(u);
      }
      this.logger.silly('update one customer mstr');
      return cus;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // GET COMPLAINT SEQUENCE NUMBER : seq_mstr
  public async getRecSeqNB(): Promise<any> {
    try {
      const sequence = await this.sequenceModel.findOne({
        where: { seq_seq: 'REC' },
        attributes: ['seq_curr_val'],
      });

      let rec_nb = sequence.dataValues.seq_curr_val;

      const update = await this.sequenceModel.increment('seq_curr_val', {
        by: 1,
        where: { seq_seq: 'REC' },
      });

      this.logger.silly('find one order ');
      return rec_nb;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // GET COMPLAINT SEQUENCE NUMBER : seq_mstr
  public async getSatSeqNB(): Promise<any> {
    try {
      const sequence = await this.sequenceModel.findOne({
        where: { seq_seq: 'SAT' },
        attributes: ['seq_curr_val'],
      });

      let sat_nb = sequence.dataValues.seq_curr_val;

      const update = await this.sequenceModel.increment('seq_curr_val', {
        by: 1,
        where: { seq_seq: 'SAT' },
      });

      this.logger.silly('find one order ');
      return sat_nb;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // FOR CRM : COMPLAINT DATA
  public async getComplaintData(phone: any): Promise<any> {
    try {
      const complaint = await this.complaintModel.findOne({
        where: { customer_phone: phone },
      });
      this.logger.silly('complaint', complaint);
      return complaint;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findCustomersBirthdate(): Promise<any> {
    try {
      let today = new Date();
      let searchDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const dt =
        searchDate.getFullYear().toString() +
        '-' +
        (searchDate.getMonth() + 1).toString() +
        '-' +
        searchDate.getDate().toString();
      const customers = await this.customerModel.findAll({
        attributes: ['id', 'cm_addr', 'cm_high_date'],

        where: {
          // [Op.and]: [
          //     Sequelize.fn('MONTH', Sequelize.col('cm_high_date')),
          // ],
          //   cm_high_date:  Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date'))),
          // cm_high_date :  {[Op.lte]:new Date(dt)}
        },
      });
      let data = [];
      customers.forEach(customer => {
        const date = new Date(customer.dataValues.cm_high_date);
        if (date.getMonth() === searchDate.getMonth() && date.getDate() === searchDate.getDate()) {
          data.push(customer.dataValues.cm_addr);
        }
      });

      this.logger.silly('find one customers with birthdate today ');
      return data;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findCustomersBirthdateFirstOrder(): Promise<any> {
    try {
      let today = new Date();
      let searchDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const dt =
        searchDate.getFullYear().toString() +
        '-' +
        (searchDate.getMonth() + 1).toString() +
        '-' +
        searchDate.getDate().toString();
      const customers = await this.customerModel.findAll({
        attributes: ['id', 'cm_addr', 'cm_high_date', 'date01'],
      });
      let data = [];
      customers.forEach(customer => {
        const date = new Date(customer.dataValues.date01);
        if (date.getMonth() === searchDate.getMonth() && date.getDate() === searchDate.getDate()) {
          data.push(customer.dataValues.cm_addr);
        }
      });

      this.logger.silly('find one customers with birthday first order today ');
      return data;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findCustomersAbsent(differentDays: any): Promise<any> {
    try {
      let today = new Date();
      var diffrence = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      diffrence.setDate(diffrence.getDate() - differentDays);
      let todayFormatted =
        diffrence.getFullYear().toString() +
        '-' +
        (diffrence.getMonth() + 1).toString() +
        '-' +
        diffrence.getDate().toString();

      const customers = await this.customerModel.findAll({
        attributes: ['id', 'cm_addr', 'cm_high_date', 'date02'],
      });
      let data = [];

      customers.forEach(customer => {
        const lastOrderDate = new Date(customer.dataValues.date02);
        let orderDateFormatted =
          lastOrderDate.getFullYear().toString() +
          '-' +
          (lastOrderDate.getMonth() + 1).toString() +
          '-' +
          lastOrderDate.getDate().toString();

        if (todayFormatted === orderDateFormatted) {
          data.push(customer.dataValues.cm_addr);
        }
      });

      this.logger.silly('find absent customers ');
      return data;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
