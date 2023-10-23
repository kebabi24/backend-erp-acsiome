import { Service, Inject, Container } from 'typedi';

@Service()
export default class doctorService {
  constructor(
    @Inject('doctorModel')
    private doctorModel: Models.DoctorModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const doctor = await this.doctorModel.create({ ...data });
      this.logger.silly('create doctor mstr');
      return doctor;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const doctor = await this.doctorModel.findOne({
        where: query,
      });
      this.logger.silly('find one doctor mstr');
      return doctor;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const doctors = await this.doctorModel.findAll({
        where: query,
      });
      this.logger.silly('find All doctors mstr');
      return doctors;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const doctor = await this.doctorModel.update(data, {
        where: query,
      });
      this.logger.silly('update one doctor mstr');
      return doctor;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const doctor = await this.doctorModel.destroy({
        where: query,
      });
      this.logger.silly('delete one doctor mstr');
      return doctor;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const emp = await this.doctorModel.sync({ force: true });
      const us = query.empss;
      for (const u of us) {
        const utilis = await this.doctorModel.create(u);
      }
      this.logger.silly('update one emp mstr');
      return emp;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
