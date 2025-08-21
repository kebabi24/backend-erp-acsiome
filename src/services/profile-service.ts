import { Service, Inject } from 'typedi';

@Service()
export default class ProfileService {
  constructor(@Inject('profileServiceModel') private profileServiceModel: Models.ProfileServiceModel, @Inject('logger') private logger) {}

  public async create(data: any): Promise<any> {
    try {
      const profile = await this.profileServiceModel.create({ ...data });
      this.logger.silly('create profile mstr');
      return profile;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const profile = await this.profileServiceModel.findOne({ where: query });
      this.logger.silly('find one profile mstr');
      return profile;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const profiles = await this.profileServiceModel.findAll({ where: query });
      this.logger.silly('find All profiles mstr');
      return profiles;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const profile = await this.profileServiceModel.update(data, { where: query });
      this.logger.silly('update one profile mstr');
      return profile;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const profile = await this.profileServiceModel.destroy({ where: query });
      this.logger.silly('delete one profile mstr');
      return profile;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const site = await this.profileServiceModel.sync({ force: true });
      const profiles = query.profiles;
      for (const pr of profiles) {
        const prr = await this.profileServiceModel.create(pr);
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
      const profiles = await this.profileServiceModel.findAll({
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
