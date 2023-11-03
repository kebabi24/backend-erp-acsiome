import { Service, Inject } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
@Service()
export default class patientDetailService {
  constructor(
    @Inject('patientDetailModel') private patientDetailModel: Models.PatientDetailModel,
    @Inject('patientModel') private patientModel: Models.PatientModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const patientDetail = await this.patientDetailModel.create({ ...data });
      this.logger.silly('create patientDetail mstr');
      return patientDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const patientDetail = await this.patientDetailModel.findOne({ where: query, include: this.patientModel });
      this.logger.silly('find one patientDetail mstr');
      return patientDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async find(query: any): Promise<any> {
    try {
      //console.log(query);
      //const patientDetails = await this.patientDetailModel.findAll({ where: query, include: this.patientModel });

      const patientDetails = await this.patientDetailModel.findAll({
        where: query,
        include: [this.patientModel],
      });
      this.logger.silly('find All patientDetails mstr');
      return patientDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findall(query: any): Promise<any> {
    try {
      console.log(query);
      const patientDetails = await this.patientDetailModel.findAll({ where: query, include: this.patientModel });

      
      this.logger.silly('find All patientDetails mstr');
      return patientDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findSpecial(query: any): Promise<any> {
    try {
      const patientDetails = await this.patientDetailModel.findAll({ ...query });
      this.logger.silly('find All patientDetails mstr');
      return patientDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const patientDetail = await this.patientDetailModel.update(data, { where: query });
      this.logger.silly('update one patientDetail mstr');
      return patientDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const patientDetail = await this.patientDetailModel.destroy({ where: query });
      this.logger.silly('delete one patientDetail mstr');
      return patientDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
