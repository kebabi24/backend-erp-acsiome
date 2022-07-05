import { Service, Inject, Container } from 'typedi';

@Service()
export default class employeAvailabilitService {
  constructor(
    @Inject('employeAvailabilityModel')
    private employeAvailabilityModel: Models.EmployeAvailabilityModel,

    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const employeAvailability = await this.employeAvailabilityModel.create({ ...data });
      this.logger.silly('create employeAvailability mstr');
      return employeAvailability;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const employeAvailability = await this.employeAvailabilityModel.findOne({
        where: query,
      });
      this.logger.silly('find one employeAvailability mstr');
      return employeAvailability;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const employeAvailability = await this.employeAvailabilityModel.findAll({
        where: query,
      });
      this.logger.silly('find All employeAvailability mstr');
      return employeAvailability;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const employeAvailability = await this.employeAvailabilityModel.update(data, {
        where: query,
      });
      this.logger.silly('update one employeAvailability mstr');
      return employeAvailability;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const employeAvailability = await this.employeAvailabilityModel.destroy({
        where: query,
      });
      this.logger.silly('delete one employeAvailability mstr');
      return employeAvailability;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
