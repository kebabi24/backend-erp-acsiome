import { Service, Inject } from 'typedi';

@Service()
export default class PopulationemployeService {
  constructor(@Inject('populationemployeModel') 
  private populationemployeModel: Models.PopulationemployeModel, 
  @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const populationemploye = await this.populationemployeModel.create({ ...data });
      this.logger.silly('create populationemploye mstr');
      return populationemploye;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const populationemploye = await this.populationemployeModel.findOne({ where: query });
      this.logger.silly('find one populationemploye mstr');
      return populationemploye;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const populationemployes = await this.populationemployeModel.findAll({ where: query });
      this.logger.silly('find All populationemployes mstr');
      return populationemployes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findspec(query: any): Promise<any> {
    try {
        const populationemployes = await this.populationemployeModel.findAll(query )
        this.logger.silly("find All purchaseReceives mstr")
        return populationemployes
    } catch (e) {
        this.logger.error(e)
        throw e
    }
}
  public async update(data: any, query: any): Promise<any> {
    try {
      const populationemploye = await this.populationemployeModel.update(data, { where: query });
      this.logger.silly('update one populationemploye mstr');
      return populationemploye;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const populationemploye = await this.populationemployeModel.destroy({ where: query });
      this.logger.silly('delete one populationemploye mstr');
      return populationemploye;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const site = await this.populationemployeModel.sync({ force: true });
      const populationemployes = query.populationemployes;
      for (const pr of populationemployes) {
        const prr = await this.populationemployeModel.create(pr);
      }
      this.logger.silly('update one populationemploye mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllpopulationemployes(): Promise<any> {
    try {
      const populationemployes = await this.populationemployeModel.findAll({
        attributes: [
           "id","usrg_code","usrg_description"
        ],
      });
      this.logger.silly('find All populationemployes mstr');
      return populationemployes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

}
