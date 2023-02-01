import { Service, Inject } from 'typedi';
import argon2 from 'argon2';
@Service()
export default class RoleService {
  constructor(
    @Inject('roleModel') private roleModel: Models.RoleModel,
    @Inject('userMobileModel') private userMobileModel: Models.UserMobileModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    console.log(data);
    try {
      const role = await this.roleModel.create({ ...data });
      this.logger.silly('create role mstr');
      return role;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const role = await this.roleModel.findOne({ where: query });
      this.logger.silly('find one role mstr');
      return role;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const roles = await this.roleModel.findAll({ where: query });
      this.logger.silly('find All roles mstr');
      return roles;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const role = await this.roleModel.update({ ...data }, { where: query });
      this.logger.silly('update one role mstr');
      return role;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async updated(data: any, query: any): Promise<any> {
    try {
      const role = await this.roleModel.update(data, {
        where: query,
      });
      this.logger.silly('update one tool mstr');
      return role;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const role = await this.roleModel.destroy({ where: query });
      this.logger.silly('delete one role mstr');
      return role;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const role = await this.roleModel.sync({ force: true });
      const roles = query.ro;
      for (const u of roles) {
        const utilis = await this.roleModel.create(u);
      }
      this.logger.silly('update one user mstr');
      return role;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
