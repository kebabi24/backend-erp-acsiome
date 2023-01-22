import { Service, Inject } from 'typedi';

@Service()
export default class bomPartService {
  constructor(
    @Inject('bomPartModel') private bomPartModel: Models.BomPartModel,
    @Inject('bomModel') private bomModel: Models.BomModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const bom = await this.bomPartModel.create({ ...data });
      this.logger.silly('create bom mstr');
      return bom;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const bom = await this.bomPartModel.findOne({ where: query, include: this.bomModel });
      this.logger.silly('find one bom mstr');
      return bom;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const boms = await this.bomPartModel.findAll({ where: query, include: this.bomModel });
      this.logger.silly('find All boms mstr');
      return boms;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const bom = await this.bomPartModel.update(data, { where: query });
      this.logger.silly('update one bom mstr');
      return bom;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const bom = await this.bomPartModel.destroy({ where: query });
      this.logger.silly('delete one bom mstr');
      return bom;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const site = await this.bomPartModel.upsert(query.ptb);
      this.logger.silly('update one pss mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
