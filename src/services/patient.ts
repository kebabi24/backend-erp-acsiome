import { Service, Inject, Container } from 'typedi';

@Service()
export default class patientService {
  constructor(
    @Inject('patientModel')
    private patientModel: Models.PatientModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const patient = await this.patientModel.create({ ...data });
      this.logger.silly('create patient mstr');
      return patient;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const patient = await this.patientModel.findOne({
        where: query,
      });
      this.logger.silly('find one patient mstr');
      return patient;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const patients = await this.patientModel.findAll({
        where: query,
      });
      this.logger.silly('find All patients mstr');
      return patients;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const patient = await this.patientModel.update(data, {
        where: query,
      });
      this.logger.silly('update one patient mstr');
      return patient;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const patient = await this.patientModel.destroy({
        where: query,
      });
      this.logger.silly('delete one patient mstr');
      return patient;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const emp = await this.patientModel.sync({ force: true });
      const us = query.empss;
      for (const u of us) {
        const utilis = await this.patientModel.create(u);
      }
      this.logger.silly('update one emp mstr');
      return emp;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
