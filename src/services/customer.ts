
import _ from "lodash"
import { Service, Inject } from "typedi"
const { Op ,Sequelize } = require('sequelize')




@Service()
export default class customersSercice {
    constructor(
        @Inject("customerModel") private customerModel: Models.CustomerModel,
        @Inject("addressModel") private addressModel: Models.AddressModel,
        @Inject("complaintModel") private complaintModel: Models.complaintModel,
        @Inject("complaintDetailsModel") private complaintDetailsModel: Models.complaintModel,
        @Inject("posOrderModel") private posOrderModel: Models.posOrderModel,
        @Inject("codeModel") private codeModel: Models.CodeModel,
        @Inject("siteModel") private siteModel: Models.SiteModel,
        @Inject("satisfactionModel") private satisfactionModel: Models.SatisfactionModel,
        @Inject("sequenceModel") private sequenceModel: Models.SequenceModel,
        @Inject("logger") private logger
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
                where:{ad_addr:query },
                attributes: ["id","ad_attn","ad_addr","ad_format","ad_ref","ad_name","ad_ext","ad_line1"]
            })
            this.logger.silly("find one customer ")
            return customer
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }  

    // CREATE CUSTOMER FOR RECLAMATION 
    public async createCustomer(data: any): Promise<any> {
        try {

            const customer = await this.addressModel.create({
                ad_name : data.name,
                ad_addr: data.phone_number,
                ad_format: data.age,
                ad_ref : data.gendre,
                ad_line1:  data.adress,
                ad_ext : data.email,
            })

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
                where:{code_fldname :"reclamation_cause" },
                attributes: ["id","code_value","code_desc","code_cmmt"],
                group:["code_cmmt","id"]
            })
            const fileterd = _.mapValues(_.groupBy(causes,'code_cmmt'))
            const filtered_causes = [] ; 
            console.log(Object.keys(fileterd))
            for(const [key , value ] of Object.entries(fileterd)){
                filtered_causes.push({
                    groupe_titel : key,
                    causes_group : value,
                })
            }
            // causes => causes.map(cause => _.omit(cause , 'code_cmmt')  check it later

            this.logger.silly("find causes ")
            return {causes,filtered_causes}
        } catch (e) {
            this.logger.error(e)
            throw e
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
}
