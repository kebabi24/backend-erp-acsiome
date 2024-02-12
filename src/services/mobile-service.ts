import { isNull } from 'lodash';
import { Service, Inject } from 'typedi';

@Service()
export default class ServiceMobileService {
  constructor(
    @Inject('serviceModel') private serviceMobileModel: Models.ServiceModel,
    @Inject('roleModel') private roleModel: Models.RoleModel,
    @Inject('profileMobileModel') private profileMobileModel: Models.ProfileMobileModel,
    @Inject('userMobileModel') private userMobileModel: Models.UserMobileModel,
    @Inject('role_itineraryModel') private role_itineraryModel: Models.Role_itineraryModel,
    @Inject('itineraryModel') private itineraryModel: Models.ItineraryModel,
    @Inject('customerMobileModel') private customerMobileModel: Models.CustomerMobileModel,
    @Inject('itinerary_CustomerModel') private itinerary_CustomerModel: Models.Itinerary_CustomerModel,
    @Inject('invoiceModel') private invoiceModel: Models.invoiceModel,
    @Inject('visitsModel') private visitsModel: Models.visitsModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const service = await this.serviceMobileModel.create({ ...data });
      this.logger.silly('create service mobile mstr');
      return service;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const service = await this.serviceMobileModel.findOne({ where: query });
      this.logger.silly('find one service mobile mstr');
      return service;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      // const service = await this.serviceMobileModel.findAll({ where: query })
      const service = await this.roleModel.findAll({
        include: [
          { model: this.serviceMobileModel, where: { service_open: true }, required: false, left: true },
          { model: this.userMobileModel, include: [this.profileMobileModel] },
          { model: this.role_itineraryModel, include: [this.itineraryModel] },
        ],
      });
      this.logger.silly('find All service mobile mstr');
      return service;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findS(query: any): Promise<any> {
    try {
      // const service = await this.serviceMobileModel.findAll({ where: query })
      let items;
      let oneItem;
      let invoices;
      let visitResult;
      const data = [];
      let clients = [];
      const service = await this.serviceMobileModel.findAll({
        where: { service_period_activate_date: query },
        required: true,
      });

      for (const item of service) {
        clients = [];
        const customers = await this.itinerary_CustomerModel.findAll({
          where: { itinerary_code: item.itinerary_code },
          required: true,
        });
        for (const i of customers) {
          oneItem = await this.customerMobileModel.findOne({
            where: { customer_code: i.customer_code },
            required: true,
          });
          invoices = await this.invoiceModel.findOne({
            where: {
              customer_code: i.customer_code,
              itinerary_code: item.itinerary_code,
              service_code: item.service_code,
              role_code: item.role_code,
            },
            required: true,
          });
          visitResult = await this.visitsModel.findOne({
            where: {
              customer_code: i.customer_code,
              itinerary_code: item.itinerary_code,
              service_code: item.service_code,
              role_code: item.role_code,
              periode_active_date: query,
            },
            required: true,
          });
          oneItem = {
            id: oneItem.id,
            customer_code: oneItem.customer_code,
            customer_name: oneItem.customer_name,
            latitude: oneItem.latitude,
            longitude: oneItem.longitude,
            customer_display: false,
            invoices: invoices,
            visitResult: visitResult,
            markColor: isNull(visitResult) ? 'null' : (visitResult.visitresult_code = '0' ? 'green' : 'red'), // 红色：
          };
          clients.push(oneItem);
        }
        data.push({ item, clients });
        // console.log('dataaaaaaaaaaa', data);
      }

      this.logger.silly('find All service mobile mstr');
      return data;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findServices(query: any): Promise<any> {
    try {
      // const service = await this.serviceMobileModel.findAll({ where: query })
      const service = await this.serviceMobileModel.findAll({
        where: query,
      });
      this.logger.silly('find All service mobile mstr');
      return service;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async update(data: any, query: any): Promise<any> {
    try {
      const service = await this.serviceMobileModel.update(data, { where: query });
      this.logger.silly('update one service mobile mstr');
      return service;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const service = await this.serviceMobileModel.destroy({ where: query });
      this.logger.silly('delete one service mobile mstr');
      return service;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
