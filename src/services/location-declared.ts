import { Service, Inject } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
@Service()
export default class locationDeclaredService {
  constructor(
    @Inject('locationDeclaredModel') private locationDeclaredModel: Models.LocationDeclaredModel,
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const locationDeclared = await this.locationDeclaredModel.create({ ...data });
      this.logger.silly('create locationDeclared mstr');
      return locationDeclared;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const locationDeclared = await this.locationDeclaredModel.findOne({ where: query, include: this.itemModel });
      this.logger.silly('find one locationDeclared mstr');
      return locationDeclared;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async find(query: any): Promise<any> {
    try {
      //const locationDeclareds = await this.locationDeclaredModel.findAll({ where: query, include: this.itemModel });

      const locationDeclareds = await this.locationDeclaredModel.findAll({
        where: query,
        include: [this.itemModel],
      });
      this.logger.silly('find All locationDeclareds mstr');
      return locationDeclareds;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findall(query: any): Promise<any> {
    try {
      const locationDeclareds = await this.locationDeclaredModel.findAll({ where: query, include: this.itemModel });

      
      this.logger.silly('find All locationDeclareds mstr');
      return locationDeclareds;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findByWeek(query: any): Promise<any> {
    try {
      //const locationDeclareds = await this.locationDeclaredModel.findAll({ where: query, include: this.itemModel });

      const locationDeclareds = await this.locationDeclaredModel.findAll({
        where: query,
        include: [
          { model: this.itemModel, where: { pt_cyc_int: { [Op.ne]: 1 } }, required: false, left: true, right: true },
        ],
      });
      this.logger.silly('find All locationDeclareds mstr');
      return locationDeclareds;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findfifo(query: any): Promise<any> {
    try {
      const locationDeclareds = await this.locationDeclaredModel.findAll({
        where: query,
        include: this.itemModel,
        order: [
          ['ld_expire', 'ASC'],
          ['ld_qty_oh', 'ASC'],
        ],
      });
      this.logger.silly('find All locationDeclareds mstr');
      return locationDeclareds;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findfifolot(query: any): Promise<any> {
    try {
      const locationDeclareds = await this.locationDeclaredModel.findAll(query);
      this.logger.silly('find All locationDeclareds mstr');
      return locationDeclareds;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findSpecial(query: any): Promise<any> {
    try {
      const locationDeclareds = await this.locationDeclaredModel.findAll({ ...query });
      this.logger.silly('find All locationDeclareds mstr');
      return locationDeclareds;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const locationDeclared = await this.locationDeclaredModel.update(data, { where: query });
      this.logger.silly('update one locationDeclared mstr');
      return locationDeclared;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const locationDeclared = await this.locationDeclaredModel.destroy({ where: query });
      this.logger.silly('delete one locationDeclared mstr');
      return locationDeclared;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
