import { Service, Inject } from 'typedi';

@Service()
export default class bomService {
  constructor(@Inject('bomModel') private bomModel: Models.BomModel, @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const bom = await this.bomModel.create({ ...data });
      this.logger.silly('create bom mstr');
      return bom;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const bom = await this.bomModel.findOne({ where: query });
      this.logger.silly('find one bom mstr');
      return bom;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const boms = await this.bomModel.findAll({ where: query });
      this.logger.silly('find All boms mstr');
      return boms;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const bom = await this.bomModel.update(data, { where: query });
      this.logger.silly('update one bom mstr');
      return bom;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const bom = await this.bomModel.destroy({ where: query });
      this.logger.silly('delete one bom mstr');
      return bom;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const site = await this.bomModel.upsert(query.bm);
      this.logger.silly('update one bom mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
