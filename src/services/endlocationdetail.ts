import { Service, Inject } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
@Service()
export default class EndlocationDetailService {
  constructor(
    @Inject('endlocationDetailModel') private endlocationDetailModel: Models.EndlocationDetailModel,
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const endlocationDetail = await this.endlocationDetailModel.create({ ...data });
      this.logger.silly('create locationDetail mstr');
      return endlocationDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const endlocationDetail = await this.endlocationDetailModel.findOne({ where: query, include: this.itemModel });
      this.logger.silly('find one locationDetail mstr');
      return endlocationDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async find(query: any): Promise<any> {
    try {
   
      //const endlocationDetails = await this.endendlocationDetailModel.findAll({ where: query, include: this.itemModel });

      const endlocationDetails = await this.endlocationDetailModel.findAll({
        where: query,
        include: [this.itemModel],
      });
      this.logger.silly('find All locationDetails mstr');
      return endlocationDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findall(query: any): Promise<any> {
    try {
   
      const endlocationDetails = await this.endlocationDetailModel.findAll({ where: query, include: this.itemModel });

      
      this.logger.silly('find All locationDetails mstr');
      return endlocationDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findByWeek(query: any): Promise<any> {
    try {
   
      //const locationDetails = await this.endlocationDetailModel.findAll({ where: query, include: this.itemModel });

      const endlocationDetails = await this.endlocationDetailModel.findAll({
        where: query,
        include: [
          { model: this.itemModel, where: { pt_cyc_int: { [Op.ne]: 1 } }, required: false, left: true, right: true },
        ],
      });
      this.logger.silly('find All locationDetails mstr');
      return endlocationDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findfifo(query: any): Promise<any> {
    try {
      const locationDetails = await this.endlocationDetailModel.findAll({
        where: query,
        include: this.itemModel,
        order: [
          ['ld_expire', 'ASC'],
          ['ld_qty_oh', 'ASC'],
        ],
      });
      this.logger.silly('find All locationDetails mstr');
      return locationDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findfifolot(query: any): Promise<any> {
    try {
      const locationDetails = await this.endlocationDetailModel.findAll(query);
      this.logger.silly('find All locationDetails mstr');
      return locationDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findSpecial(query: any): Promise<any> {
    try {
      const locationDetails = await this.endlocationDetailModel.findAll({ ...query });
      this.logger.silly('find All locationDetails mstr');
      return locationDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const endlocationDetail = await this.endlocationDetailModel.update(data, { where: query });
      this.logger.silly('update one locationDetail mstr');
      return locationDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const endlocationDetail = await this.endlocationDetailModel.destroy({ where: query });
      this.logger.silly('delete one locationDetail mstr');
      return locationDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findprice(query: any): Promise<any> {
    try {
      const endlocationDetail = await this.endlocationDetailModel.findAll(query,{include: this.itemModel},);
      this.logger.silly('find All inventoryTransactions mstr');
      return locationDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
