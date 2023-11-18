import { Service, Inject, Container } from 'typedi';

@Service()
export default class audiometryService {
  constructor(
    @Inject('audiometryModel')
    private audiometryModel: Models.AudiometryModel,
    @Inject('audiogramModel') private audiogramModel: Models.AudiogramModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const audiometry = await this.audiometryModel.create({ ...data });
      this.logger.silly('create audiometry mstr');
      return audiometry;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const audiometry = await this.audiometryModel.findOne({
        where: query,
        include: this.audiogramModel,
       
      });
      this.logger.silly('find one audiometry mstr');
      return audiometry;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const audiometrys = await this.audiometryModel.findAll({
        where: query,
        include: this.audiogramModel,
      });
      this.logger.silly('find All audiometrys mstr');
      return audiometrys;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const audiometry = await this.audiometryModel.update(data, {
        where: query,
      });
      this.logger.silly('update one audiometry mstr');
      return audiometry;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const audiometry = await this.audiometryModel.destroy({
        where: query,
      });
      this.logger.silly('delete one audiometry mstr');
      return audiometry;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const emp = await this.audiometryModel.sync({ force: true });
      const us = query.empss;
      for (const u of us) {
        const utilis = await this.audiometryModel.create(u);
      }
      this.logger.silly('update one emp mstr');
      return emp;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
