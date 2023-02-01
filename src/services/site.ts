import { Service, Inject } from 'typedi';

@Service()
export default class siteService {
  constructor(@Inject('siteModel') private siteModel: Models.SiteModel, @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const site = await this.siteModel.create({ ...data });
      this.logger.silly('create site mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const site = await this.siteModel.findOne({ where: query });
      this.logger.silly('find one site mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const sites = await this.siteModel.findAll({ where: query });
      this.logger.silly('find All sites mstr');
      return sites;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const site = await this.siteModel.update(data, { where: query });
      this.logger.silly('update one site mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const site = await this.siteModel.destroy({ where: query });
      this.logger.silly('delete one site mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const site = await this.siteModel.sync({ force: true });
      const sites = query.sites;
      for (const site of sites) {
        const si = await this.siteModel.create(site);
      }
      this.logger.silly('update one site mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
