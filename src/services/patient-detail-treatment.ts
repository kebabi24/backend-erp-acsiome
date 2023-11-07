import { Service, Inject } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
@Service()
export default class patientDetailService {
  constructor(
    @Inject('patientDetailTreatmentModel') private patientDetailTreatmentModel: Models.PatientDetailTreatmentModel,
    @Inject('patientModel') private patientModel: Models.PatientModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const patientDetailTreatment = await this.patientDetailTreatmentModel.create({ ...data });
      this.logger.silly('create patientDetailTreatment mstr');
      return patientDetailTreatment;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const patientDetailTreatment = await this.patientDetailTreatmentModel.findOne({ where: query, include: this.patientModel });
      this.logger.silly('find one patientDetailTreatment mstr');
      return patientDetailTreatment;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async find(query: any): Promise<any> {
    try {
      //console.log(query);
      //const patientDetailTreatments = await this.patientDetailTreatmentModel.findAll({ where: query, include: this.patientModel });

      const patientDetailTreatments = await this.patientDetailTreatmentModel.findAll({
        where: query,
        include: [this.patientModel],
      });
      this.logger.silly('find All patientDetailTreatments mstr');
      return patientDetailTreatments;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findall(query: any): Promise<any> {
    try {
      console.log(query);
      const patientDetailTreatments = await this.patientDetailTreatmentModel.findAll({ where: query, include: this.patientModel });

      
      this.logger.silly('find All patientDetailTreatments mstr');
      return patientDetailTreatments;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async findSpecial(query: any): Promise<any> {
    try {
      const patientDetailTreatments = await this.patientDetailTreatmentModel.findAll({ ...query });
      this.logger.silly('find All patientDetailTreatments mstr');
      return patientDetailTreatments;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const patientDetailTreatment = await this.patientDetailTreatmentModel.update(data, { where: query });
      this.logger.silly('update one patientDetailTreatment mstr');
      return patientDetailTreatment;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const patientDetailTreatment = await this.patientDetailTreatmentModel.destroy({ where: query });
      this.logger.silly('delete one patientDetailTreatment mstr');
      return patientDetailTreatment;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
