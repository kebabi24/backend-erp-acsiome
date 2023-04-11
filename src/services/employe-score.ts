import { Service, Inject } from 'typedi';

@Service()
export default class EmployeScoreService {
  constructor(
    @Inject('employeScoreModel') private employeScoreModel: Models.EmployeScoreModel,
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const employeScore = await this.employeScoreModel.create({ ...data });
      this.logger.silly('create employeScore mstr');
      return employeScore;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const employeScore = await this.employeScoreModel.findOne({ where: query });
      this.logger.silly('find one employeScore mstr');
      return employeScore;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const requisitionDetails = await this.employeScoreModel.findAll({ where: query });
      this.logger.silly('find All requisitionDetails mstr');
      return requisitionDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const employeScore = await this.employeScoreModel.update(data, { where: query });
      this.logger.silly('update one employeScore mstr');
      return employeScore;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const employeScore = await this.employeScoreModel.destroy({ where: query });
      this.logger.silly('delete one employeScore mstr');
      return employeScore;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async upsert(query: any): Promise<any> {
    try {
      const is = await this.employeScoreModel.sync({ force: true });
      const isd = query.isdd;
      for (const u of isd) {
        const utilis = await this.employeScoreModel.create(u);
      }
      this.logger.silly('update one code mstr');
      return is;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
