import { Service, Inject } from 'typedi';

@Service()
export default class EmployeJobService {
  constructor(
    @Inject('employeJobModel') private employeJobModel: Models.EmployeJobModel,
    @Inject('jobModel') private jobModel: Models.JobModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const employeJob = await this.employeJobModel.create({ ...data });
      this.logger.silly('create employeJob mstr');
      return employeJob;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const employeJob = await this.employeJobModel.findOne({ where: query });
      this.logger.silly('find one employeJob mstr');
      return employeJob;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const requisitionDetails = await this.employeJobModel.findAll({ where: query,
    
        include: [
            { model: this.jobModel },
            
          ],
    
    });
      this.logger.silly('find All requisitionDetails mstr');
      return requisitionDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const employeJob = await this.employeJobModel.update(data, { where: query });
      this.logger.silly('update one employeJob mstr');
      return employeJob;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const employeJob = await this.employeJobModel.destroy({ where: query });
      this.logger.silly('delete one employeJob mstr');
      return employeJob;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async upsert(query: any): Promise<any> {
    try {
      const is = await this.employeJobModel.sync({ force: true });
      const isd = query.isdd;
      for (const u of isd) {
        const utilis = await this.employeJobModel.create(u);
      }
      this.logger.silly('update one code mstr');
      return is;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
