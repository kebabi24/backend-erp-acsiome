import { Service, Inject } from 'typedi';

@Service()
export default class ItemDetailService {
  constructor(
    @Inject('itemDetailModel') private itemDetailModel: Models.ItemDetailModel,
   
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const detail = await this.itemDetailModel.create({ ...data });
      this.logger.silly('item', detail);
      return detail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async find(query: any): Promise<any> {
    try {
      const details = await this.itemDetailModel.findAll({
        where: query,
      
      });

      this.logger.silly('find item ');
      return details;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  
  public async findBySupp(query: any): Promise<any> {
    try {
      const details = await this.itemDetailModel.findAll({
        where: query,
      });
      this.logger.silly('find item ');
      return details;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const detail = await this.itemDetailModel.findOne({ where: query, include: [this.siteModel, this.locationModel] });
      this.logger.silly('find one item mstr');
      return detail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAll(): Promise<any> {
    try {
      const details = await this.itemDetailModel.findAll({ attributes: ['id']});
      this.logger.silly('findAll items mstr');
      return details;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async findOneS(query: any): Promise<any> {
    try {
      const detail = await this.itemDetailModel.findOne({
        where: query,
        raw: true,
      });
      this.logger.silly('find one item mstr');
      return detail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const detail = await this.itemDetailModel.update(data, { where: query });
      this.logger.silly('update one item mstr');
      return detail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  
}
