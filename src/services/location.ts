import { Service, Inject } from 'typedi';

@Service()
export default class locationService {
  constructor(@Inject('locationModel') private locationModel: Models.LocationModel, @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const location = await this.locationModel.create({ ...data });
      this.logger.silly('create location mstr');
      return location;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const location = await this.locationModel.findOne({ where: query });
      this.logger.silly('find one location mstr');
      return location;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const locations = await this.locationModel.findAll({ where: query });
      this.logger.silly('find All locations mstr');
      return locations;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const location = await this.locationModel.update(data, { where: query });
      this.logger.silly('update one location mstr');
      return location;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const location = await this.locationModel.destroy({ where: query });
      this.logger.silly('delete one location mstr');
      return location;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const site = await this.locationModel.sync({ force: true });
      const locs = query.locs;
      for (const lo of locs) {
        const loo = await this.locationModel.create(lo);
      }
      this.logger.silly('update one location mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
