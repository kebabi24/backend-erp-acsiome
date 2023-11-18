import { Service, Inject, Container } from 'typedi';

@Service()
export default class audiogramService {
  constructor(
    @Inject('audiogramModel')
    private audiogramModel: Models.AudiogramModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const audiogram = await this.audiogramModel.create({ ...data });
      this.logger.silly('create audiogram mstr');
      return audiogram;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const audiogram = await this.audiogramModel.findOne({
        where: query,
      });
      this.logger.silly('find one audiogram mstr');
      return audiogram;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const audiograms = await this.audiogramModel.findAll({
        where: query,
      });
      this.logger.silly('find All audiograms mstr');
      return audiograms;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const audiogram = await this.audiogramModel.update(data, {
        where: query,
      });
      this.logger.silly('update one audiogram mstr');
      return audiogram;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const audiogram = await this.audiogramModel.destroy({
        where: query,
      });
      this.logger.silly('delete one audiogram mstr');
      return audiogram;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const emp = await this.audiogramModel.sync({ force: true });
      const us = query.empss;
      for (const u of us) {
        const utilis = await this.audiogramModel.create(u);
      }
      this.logger.silly('update one emp mstr');
      return emp;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
