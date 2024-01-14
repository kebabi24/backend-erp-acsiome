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

  public async findServices(query: any): Promise<any> {
    try {
      // const service = await this.serviceMobileModel.findAll({ where: query })
      const service = await this.serviceMobileModel.findAll({
        where: query
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
