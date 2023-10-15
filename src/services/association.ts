import { Service, Inject, Container } from 'typedi';

@Service()
export default class associationService {
  constructor(
    @Inject('associationModel')
    private associationModel: Models.AssociationModel,
    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const association = await this.associationModel.create({ ...data });
      this.logger.silly('create association mstr');
      return association;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const association = await this.associationModel.findOne({
        where: query,
      });
      this.logger.silly('find one association mstr');
      return association;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const associations = await this.associationModel.findAll({
        where: query,
      });
      this.logger.silly('find All associations mstr');
      return associations;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async update(data: any, query: any): Promise<any> {
    try {
      const association = await this.associationModel.update(data, {
        where: query,
      });
      this.logger.silly('update one association mstr');
      return association;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async delete(query: any): Promise<any> {
    try {
      const association = await this.associationModel.destroy({
        where: query,
      });
      this.logger.silly('delete one association mstr');
      return association;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async upsert(query: any): Promise<any> {
    try {
      const emp = await this.associationModel.sync({ force: true });
      const us = query.empss;
      for (const u of us) {
        const utilis = await this.associationModel.create(u);
      }
      this.logger.silly('update one emp mstr');
      return emp;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
