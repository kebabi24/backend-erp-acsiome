import { Service, Inject } from 'typedi';

@Service()
export default class costSimulationService {
  constructor(
    @Inject('costSimulationModel') private costSimulationModel: Models.CostSimulationModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const sct = await this.costSimulationModel.create({ ...data });
      this.logger.silly('create sct mstr');
      return sct;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const sct = await this.costSimulationModel.findOne({ where: query });
      this.logger.silly('find one sct mstr');
      return sct;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const scts = await this.costSimulationModel.findAll({ where: query });
      this.logger.silly('find All scts mstr');
      return scts;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const sct = await this.costSimulationModel.update(data, { where: query });
      this.logger.silly('update one sct mstr');
      return sct;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const sct = await this.costSimulationModel.destroy({ where: query });
      this.logger.silly('delete one sct mstr');
      return sct;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const site = await this.costSimulationModel.upsert(query.sc);
      this.logger.silly('update one pss mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
