import { Service, Inject } from 'typedi';

@Service()
export default class ItemService {
  constructor(
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('taxeModel') private taxeModel: Models.TaxeModel,
    @Inject('locationModel') private locationModel: Models.LocationModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const item = await this.itemModel.create({ ...data });
      this.logger.silly('item', item);
      return item;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async find(query: any): Promise<any> {
    try {
      const codes = await this.itemModel.findAll({
        where: query,
        include: this.taxeModel,
        incluse: this.locationModel,
      });

      this.logger.silly('find item ');
      return codes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findBySupp(query: any): Promise<any> {
    try {
      const codes = await this.itemModel.findAll({
        where: query,
      });
      this.logger.silly('find item ');
      return codes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const item = await this.itemModel.findOne({ where: query, include: this.taxeModel, incluse: this.locationModel });
      this.logger.silly('find one item mstr');
      return item;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOnedesc(query: any): Promise<any> {
    try {
      const item = await this.itemModel.findOne({
        where: query,
        attributes: [
          'pt_desc1'],
        raw: true,
      });
      this.logger.silly('find one item mstr');
      return item;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOneS(query: any): Promise<any> {
    try {
      const item = await this.itemModel.findOne({
        where: query,
        include: this.taxeModel,
        incluse: this.locationModel,
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
      const item = await this.itemModel.update(data, { where: query, include: this.taxeModel });
      this.logger.silly('update one item mstr');
      return item;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
