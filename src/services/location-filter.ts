import { Service, Inject } from 'typedi';

@Service()
export default class locationFilterService {
  constructor(@Inject('locationFilterModel') private locationFilterModel: Models.locationFilterModel, @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const locationFilter = await this.locationFilterModel.create({ ...data });
      this.logger.silly('create location mstr');
      return locationFilter;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const locationFilter = await this.locationFilterModel.findOne({ where: query });
      this.logger.silly('find one location mstr');
      return locationFilter;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const locationFilters = await this.locationFilterModel.findAll({ where: query });
      this.logger.silly('find All locations mstr');
      return locationFilters;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const locationFilter = await this.locationFilterModel.update(data, { where: query });
      this.logger.silly('update one location mstr');
      return locationFilter;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const locationFilter = await this.locationFilterModel.destroy({ where: query });
      this.logger.silly('delete one location mstr');
      return locationFilter;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const site = await this.locationFilterModel.sync({ force: true });
      const locs = query.locs;
      for (const lo of locs) {
        const loo = await this.locationFilterModel.create(lo);
      }
      this.logger.silly('update one location mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
