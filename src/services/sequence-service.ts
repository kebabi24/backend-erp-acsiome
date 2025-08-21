import { Service, Inject } from 'typedi';

@Service()
export default class SequenceServiceService {
  constructor(@Inject('sequenceServiceModel') private sequenceServiceModel: Models.SequenceServiceModel, @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const profile = await this.sequenceServiceModel.create({ ...data });
      this.logger.silly('create profile mstr');
      return profile;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const profile = await this.sequenceServiceModel.findOne({ where: query });
      this.logger.silly('find one profile mstr');
      return profile;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const profiles = await this.sequenceServiceModel.findAll({ where: query });
      this.logger.silly('find All profiles mstr');
      return profiles;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const profile = await this.sequenceServiceModel.update(data, { where: query });
      this.logger.silly('update one profile mstr');
      return profile;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const profile = await this.sequenceServiceModel.destroy({ where: query });
      this.logger.silly('delete one profile mstr');
      return profile;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const site = await this.sequenceServiceModel.sync({ force: true });
      const profiles = query.profiles;
      for (const pr of profiles) {
        const prr = await this.sequenceServiceModel.create(pr);
      }
      this.logger.silly('update one profile mstr');
      return site;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllProfiles(): Promise<any> {
    try {
      const profiles = await this.sequenceServiceModel.findAll({
        attributes: [
           "id","usrg_code","usrg_description"
        ],
      });
      this.logger.silly('find All profiles mstr');
      return profiles;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

}
