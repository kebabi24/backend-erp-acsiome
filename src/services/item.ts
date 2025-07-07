import { Service, Inject } from 'typedi';
import { Op, Sequelize, QueryTypes } from 'sequelize';

@Service()
export default class ItemService {
  constructor(
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('itemDetailModel') private itemDetailModel: Models.ItemDetailModel,
    @Inject('taxeModel') private taxeModel: Models.TaxeModel,
    @Inject('locationModel') private locationModel: Models.LocationModel,
    @Inject('locationDetailModel') private locationDetailModel: Models.LocationDetailModel,
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
  public async findwithstk(query: any): Promise<any> {
    try {
      const items = await this.itemModel.findAll({ where: query,
        include: [
          {
            model: this.locationDetailModel,
            required: false,
            // separate:true,
            attributes: [[Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'qty']],
            group: ['ld_part']
        }
      ],
      attributes:['pt_part'],
      //   separate: true,
        
      });


      
      this.logger.silly('find All locationDetails mstr');
      return items;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async find(query: any): Promise<any> {
    try {
      const codes = await this.itemModel.findAll({
        where: query,
        order: [
          ['pt_part', 'ASC']],
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

  public async findAll(): Promise<any> {
    try {
      const items = await this.itemModel.findAll({ attributes: ['id']});
      this.logger.silly('findAll items mstr');
      return items;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOnedesc(query: any): Promise<any> {
    try {
      const item = await this.itemModel.findOne({
        where: query,
        attributes: ['pt_desc1'],
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
  public async upsert(query: any): Promise<any> {
    try {
      const site = await this.itemModel.sync({ force: true });
      const it = query.it;
      const pt_site = query.pt_site;
      const pt_loc = query.pt_loc;
      for (const itt of it) {
        const b = await this.itemModel.create({ ...itt, pt_site: pt_site, pt_loc: pt_loc });
      }
      this.logger.silly('update one item mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findOneDet(query: any): Promise<any> {
    try {
      const item = await this.itemModel.findOne({ where: query, include: this.itemDetailModel });
      this.logger.silly('find one item mstr');
      return item;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findtraining(query:any): Promise<any> {
    try {
      const items = await this.itemModel.findAll(query);
      this.logger.silly('findAll items mstr');
      return items;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async delete(query: any): Promise<any> {
    try {
      const item = await this.itemModel.destroy({ where: query });
      this.logger.silly('delete one item ');
      return item;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
