import { Service, Inject } from 'typedi';

@Service()
export default class customersMobileSercice {
  constructor(
    @Inject('customerMobileModel') private customerMobileModel: Models.CustomerMobileModel,
    @Inject('clusterModel') private clusterModel: Models.ClusterModel,
    @Inject('categoryModel') private categoryModel: Models.CategoryModel,
    @Inject('subClusterModel') private subClusterModel: Models.SubClusterModel,
    @Inject('categoryTypeModel') private categoryTypeModel: Models.CategoryTypeModel,
    @Inject('salesChannelModel') private salesChannelModel: Models.salesChannelModel,

    @Inject('logger') private logger,
  ) {}

  public async create(data: any): Promise<any> {
    try {
      const customerMobile = await this.customerMobileModel.create({ ...data });
      this.logger.silly('customer mobile', customerMobile);
      return customerMobile;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findOne(query: any): Promise<any> {
    try {
      const customer = await this.customerMobileModel.findOne({ where: query });
      this.logger.silly('find one customer mstr');
      console.log(customer);
      return customer;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async find(query: any): Promise<any> {
    try {
      const customers = await this.customerMobileModel.findAll({ where: query });
      this.logger.silly('find All custmers mstr');
      return customers;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createCluster(data: any): Promise<any> {
    try {
      const cluster = await this.clusterModel.create({ ...data });
      this.logger.silly('cluster', cluster);
      return cluster;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createCategory(data: any): Promise<any> {
    try {
      const category = await this.categoryModel.create({ ...data });
      this.logger.silly('category', category);
      return category;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findClusterByCode(query: any): Promise<any> {
    try {
      const cluster = await this.clusterModel.findOne({ where: query });
      this.logger.silly('cluster', cluster);
      return cluster;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findCategoryByCode(query: any): Promise<any> {
    try {
      const categogry = await this.categoryModel.findOne({ where: query });
      this.logger.silly('category', categogry);
      return categogry;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllClusters(query: any): Promise<any> {
    try {
      const clusters = await this.clusterModel.findAll({});
      console.log('here we are again', clusters);
      this.logger.silly('clusters', clusters);
      return clusters;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllCategories(query: any): Promise<any> {
    try {
      const categories = await this.categoryModel.findAll({});
      this.logger.silly('categories', categories);
      return categories;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createSubCluster(data: any): Promise<any> {
    try {
      const subCluster = await this.subClusterModel.create({ ...data });
      this.logger.silly('sub cluster', subCluster);
      return subCluster;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createCategoryType(data: any): Promise<any> {
    try {
      const categoryType = await this.categoryTypeModel.create({ ...data });
      this.logger.silly('sub cluster', categoryType);
      return categoryType;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findSubClusterByCode(query: any): Promise<any> {
    try {
      const subCluster = await this.subClusterModel.findOne({ where: query });
      this.logger.silly('sub cluster', subCluster);
      return subCluster;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllSubClusterByCode(query: any): Promise<any> {
    try {
      const subCluster = await this.subClusterModel.findAll({ where: query });
      this.logger.silly('sub cluster', subCluster);
      return subCluster;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findCategoryTypeByCode(query: any): Promise<any> {
    try {
      const categogryType = await this.categoryTypeModel.findOne({ where: query });
      this.logger.silly('category', categogryType);
      return categogryType;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllCategoriesTypes(query: any): Promise<any> {
    try {
      const categoriesTypes = await this.categoryTypeModel.findAll({});
      this.logger.silly('categories types', categoriesTypes);
      return categoriesTypes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllCategoriesTypesByCode(query: any): Promise<any> {
    try {
      const categoriesTypes = await this.categoryTypeModel.findAll({ where: query });
      this.logger.silly('categories types', categoriesTypes);
      return categoriesTypes;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllSubClusters(query: any): Promise<any> {
    try {
      const subClusters = await this.subClusterModel.findAll({});
      this.logger.silly('sub clusters', subClusters);
      return subClusters;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteClusterById(query: any): Promise<any> {
    try {
      const cluster = await this.clusterModel.destroy({ where: query });
      this.logger.silly('delete one cluster');
      return cluster;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteCategoryById(query: any): Promise<any> {
    try {
      const category = await this.categoryModel.destroy({ where: query });
      this.logger.silly('delete one category');
      return category;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteSubClusterById(query: any): Promise<any> {
    try {
      const subCluster = await this.subClusterModel.destroy({ where: query });
      this.logger.silly('delete one sub cluster');
      return subCluster;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteCategoryTypeById(query: any): Promise<any> {
    try {
      const categoryType = await this.categoryTypeModel.destroy({ where: query });
      this.logger.silly('delete one category type');
      return categoryType;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createSalesChannels(data: any): Promise<any> {
    try {
      const salesChannels = await this.salesChannelModel.bulkCreate(data);
      this.logger.silly('created sales channels');
      return salesChannels;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async update(data: any, query: any): Promise<any> {
    try {
      const bank = await this.customerMobileModel.update(data, {
        where: query,
      });
      this.logger.silly('update one inventoryStatus mstr');
      return bank;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllSalesChannels(): Promise<any> {
    try {
      const salesChannels = await this.salesChannelModel.findAll({});
      this.logger.silly('found all sales channels');
      return salesChannels;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
