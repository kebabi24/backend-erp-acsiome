import { Service, Inject } from 'typedi';

@Service()
export default class psService {
  constructor(
    @Inject('psModel') private psModel: Models.PsModel,
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const ps = await this.psModel.create({ ...data });
      this.logger.silly('create ps mstr');
      return ps;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const ps = await this.psModel.findOne({ where: query, include: this.itemModel });
      this.logger.silly('find one ps mstr');
      return ps;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const pss = await this.psModel.findAll({
        where: query,
        include: this.itemModel,
        attributes: ['ps_parent', 'ps_comp'],
      });
      this.logger.silly('find All pss mstr');

      return pss;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const ps = await this.psModel.update(data, { where: query });
      this.logger.silly('update one ps mstr');
      return ps;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const ps = await this.psModel.destroy({ where: query });
      this.logger.silly('delete one ps mstr');
      return ps;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
