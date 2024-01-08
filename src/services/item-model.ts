import { Service, Inject } from 'typedi';

@Service()
export default class ItemModelService {
  constructor(
    @Inject('itemModelModel') private itemModelModel: Models.ItemModelModel,
    @Inject('siteModel') private siteModel: Models.SiteModel,
    @Inject('locationModel') private locationModel: Models.LocationModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const model = await this.itemModelModel.create({ ...data });
      this.logger.silly('item', model);
      return model;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async find(query: any): Promise<any> {
    try {
      const models = await this.itemModelModel.findAll({
        where: query,
        include:[ this.siteModel,
            this.locationModel]
      });

      this.logger.silly('find item ');
      return models;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  
  public async findBySupp(query: any): Promise<any> {
    try {
      const models = await this.itemModelModel.findAll({
        where: query,
      });
      this.logger.silly('find item ');
      return models;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const model = await this.itemModelModel.findOne({ where: query, include: [this.siteModel, this.locationModel] });
      this.logger.silly('find one item mstr');
      return model;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAll(): Promise<any> {
    try {
      const models = await this.itemModelModel.findAll({ attributes: ['id']});
      this.logger.silly('findAll items mstr');
      return models;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async findOneS(query: any): Promise<any> {
    try {
      const item = await this.itemModelModel.findOne({
        where: query,
        include:[ this.siteModel,
        this.locationModel],
        raw: true,
      });
      this.logger.silly('find one item mstr');
      return item;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const model = await this.itemModelModel.update(data, { where: query });
      this.logger.silly('update one item mstr');
      return model;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  
}
