import CustomerMobileService from '../../services/customer-mobile';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op } from 'sequelize';
import * as os from 'os';
import CustomerItineraryService from '../../services/customer-itinerary';

// CREATE CUSTOMER MOBILE
const create = async (req: Request, res: Response, next: NextFunction) => {
  const hostname = os.networkInterfaces();
  console.log(hostname);
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const customerMobileData = req.body;
  console.log(customerMobileData);
  console.log(req.body);
  logger.debug('Calling Create customer endpoint with body: %o', req.body);
  try {
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const customerMobile = await customerMobileServiceInstance.create({
      ...customerMobileData,
      //  created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin
    });

    return res.status(201).json({ message: 'created succesfully', data: { customerMobile } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one by  customer endpoint');
  try {
    const CustomerMobileServiceInstance = Container.get(CustomerMobileService);
    const customers = await CustomerMobileServiceInstance.findOne({ ...req.body });
    console.log(customers);
    return res.status(200).json({ message: 'fetched succesfully', data: customers });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  try {
    const CustomerMobileServiceInstance = Container.get(CustomerMobileService);
    const customers = await CustomerMobileServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: customers });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all customer endpoint');
  try {
    const CustomerMobileServiceInstance = Container.get(CustomerMobileService);
    const customers = await CustomerMobileServiceInstance.find({ ...req.body });
    console.log(customers);
    return res.status(200).json({ message: 'fetched succesfully', data: customers });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createCluster = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { username } = req.headers;
  // const clusterData = req.body.cluster
  // console.log(clusterData)
  console.log('request body' + Object.keys(req.body.cluster));
  logger.debug('Calling Create cluster endpoint with body: %o', req.body);
  try {
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const cluster = await customerMobileServiceInstance.createCluster({
      ...req.body.cluster,
    });

    return res.status(201).json({ message: 'created succesfully', data: { cluster } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling create category endpoint with body: %o', req.body);
  try {
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const category = await customerMobileServiceInstance.createCategory({
      ...req.body.category,
    });

    return res.status(201).json({ message: 'created succesfully', data: { category } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findClusterByCode = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling Create cluster endpoint with body: %o', req.body);
  try {
    const { cluster_code } = req.params;
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const cluster = await customerMobileServiceInstance.findClusterByCode({
      cluster_code: cluster_code,
    });
    console.log(cluster);

    return res.status(201).json({ message: 'Cluster found ', data: { cluster } });
  } catch (e) {
    logger.error('🔥 error from find cluster by code ');
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findCategoryByCode = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling Create cluster endpoint with body: %o', req.body);
  try {
    const { category_code } = req.params;
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const category = await customerMobileServiceInstance.findCategoryByCode({
      category_code: category_code,
    });
    console.log(category);

    return res.status(201).json({ message: 'Category found ', data: { category } });
  } catch (e) {
    logger.error('🔥 error from find category by code ');
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllClusters = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling Create cluster endpoint with body: %o', req.body);
  try {
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const clusters = await customerMobileServiceInstance.findAllClusters({});

    return res.status(201).json({ message: 'Clusters found ', data: { clusters } });
  } catch (e) {
    logger.error('🔥 error from find cluster by code ');
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling Create cluster endpoint with body: %o', req.body);
  try {
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const categories = await customerMobileServiceInstance.findAllCategories({});
    console.log(categories);

    return res.status(201).json({ message: 'categories found ', data: { categories } });
  } catch (e) {
    logger.error('🔥 error from find cluster by code ');
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createSubCluster = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { username } = req.headers;
  console.log('request body' + Object.keys(req.body.sub_cluster));
  logger.debug('Calling Create cluster endpoint with body: %o', req.body);
  try {
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const subCluster = await customerMobileServiceInstance.createSubCluster({
      ...req.body.sub_cluster,
    });

    return res.status(201).json({ message: 'sub created succesfully', data: { subCluster } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createCategoryType = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { username } = req.headers;
  console.log('request body' + Object.keys(req.body.category_type));
  logger.debug('Calling Create cluster endpoint with body: %o', req.body);
  try {
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const categoryType = await customerMobileServiceInstance.createCategoryType({
      ...req.body.category_type,
    });

    return res.status(201).json({ message: 'sub created succesfully', data: { categoryType } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findSubClusterByCode = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find sub  cluster by code endpoint with body: %o', req.body);
  try {
    const { sub_cluster_code } = req.params;
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const subCluster = await customerMobileServiceInstance.findSubClusterByCode({
      sub_cluster_code: sub_cluster_code,
    });
    console.log(subCluster);

    return res.status(201).json({ message: 'sub cluster found ', data: { subCluster } });
  } catch (e) {
    logger.error('🔥 error from find sub cluster by code ');
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findCategoryTypeByCode = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling Create cluster endpoint with body: %o', req.body);
  try {
    const { category_type_code } = req.params;
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const categoryType = await customerMobileServiceInstance.findCategoryTypeByCode({
      category_type_code: category_type_code,
    });
    console.log(categoryType);

    return res.status(201).json({ message: 'Category type found ', data: { categoryType } });
  } catch (e) {
    logger.error('🔥 error from find category by code ');
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllSubClusters = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find all sub cluster endpoint with body: %o', req.body);
  try {
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const subClusters = await customerMobileServiceInstance.findAllSubClusters({});
    console.log(subClusters);

    return res.status(201).json({ message: 'sub clusters found ', data: { subClusters } });
  } catch (e) {
    logger.error('🔥 error from find cluster by code ');
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllCategoriesTypes = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find all categories types endpoint with body: %o', req.body);
  try {
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const categoriesTypes = await customerMobileServiceInstance.findAllCategoriesTypes({});
    console.log(categoriesTypes);

    return res.status(201).json({ message: 'categories types found ', data: { categoriesTypes } });
  } catch (e) {
    logger.error('🔥 error from find all categories types by code ');
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteClusterById = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  user endpoint');
  try {
    const userMobileServiceInstance = Container.get(CustomerMobileService);
    const { clusterId } = req.params;
    const cluster = await userMobileServiceInstance.deleteClusterById({ id: clusterId });
    return res.status(200).json({ message: 'cluster deleted succesfully', data: cluster });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  user endpoint');
  try {
    const userMobileServiceInstance = Container.get(CustomerMobileService);
    const { categoryId } = req.params;
    console.log('cattt id ' + categoryId);
    const category = await userMobileServiceInstance.deleteCategoryById({ id: categoryId });
    return res.status(200).json({ message: 'category deleted succesfully', data: category });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteSubClusterById = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling delete sub cluster endpoint');
  try {
    const userMobileServiceInstance = Container.get(CustomerMobileService);
    const { subClusterId } = req.params;
    const subCluster = await userMobileServiceInstance.deleteSubClusterById({ id: subClusterId });
    return res.status(200).json({ message: 'sub cluster deleted succesfully', data: subCluster });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteCategoryTypeById = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling delete category type  endpoint');
  try {
    const userMobileServiceInstance = Container.get(CustomerMobileService);
    const { categoryTypeId } = req.params;
    const categoryType = await userMobileServiceInstance.deleteCategoryTypeById({ id: categoryTypeId });
    return res.status(200).json({ message: 'category type deleted succesfully', data: categoryType });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getDataForCustomerCreate = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find all categories types endpoint with body: %o', req.body);
  try {
    const customerMobileServiceInstance = Container.get(CustomerMobileService);

    const clusters = await customerMobileServiceInstance.findAllClusters({});
    const categories = await customerMobileServiceInstance.findAllCategories({});
    const sales_channels = await customerMobileServiceInstance.findAllSalesChannels();

    for (const cluster of clusters) {
      delete cluster.dataValues.createdAt;
      delete cluster.dataValues.updatedAt;

      const subClusters = await customerMobileServiceInstance.findAllSubClusterByCode({
        cluster_code: cluster.cluster_code,
      });
      subClusters.forEach(subCluster => {
        delete subCluster.dataValues.createdAt;
        delete subCluster.dataValues.updatedAt;
      });
      cluster.dataValues.subClusters = subClusters;
    }

    for (const category of categories) {
      delete category.dataValues.createdAt;
      delete category.dataValues.updatedAt;

      const categoryTypes = await customerMobileServiceInstance.findAllCategoriesTypesByCode({
        category_code: category.category_code,
      });
      categoryTypes.forEach(categoryType => {
        delete categoryType.dataValues.createdAt;
        delete categoryType.dataValues.updatedAt;
      });

      category.dataValues.categoryTypes = categoryTypes;
    }

    return res.status(201).json({ message: 'create data found ', data: { categories, clusters, sales_channels } });
  } catch (e) {
    logger.error('🔥 error from getDataForCustomerCreate ');
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createSalesChannels = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling createTokens endpoint with body: %o', req.body);
  try {
    const userMobileServiceInstance = Container.get(CustomerMobileService);

    const sales_channels = req.body.sales_channels;
    sales_channels.forEach(channel => {
      delete channel.id;
    });

    const createdChannels = await userMobileServiceInstance.createSalesChannels(sales_channels);

    return res.status(201).json({ message: 'created succesfully', data: { createdChannels } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findOneCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  itn endpoint');
  try {
    const customerMobileServiceInstance = Container.get(CustomerMobileService);
    const { id } = req.params;
    console.log(id);
    const itn = await customerMobileServiceInstance.findOne({ customer_code: id });
    return res.status(200).json({ message: 'fetched succesfully', data: itn });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling update one  inventoryStatus endpoint');
  try {
    const CustomerMobileServiceInstance = Container.get(CustomerMobileService);

    const { id } = req.params;
    const { customer_mobile } = req.body;
    console.log(req.body);
    const cus = await CustomerMobileServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { customer_code: id },
    );

    return res.status(200).json({ message: 'fetched succesfully', data: cus });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getCustomersOfItinerary = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  itn endpoint');
  try {
    const customerItineraryServiceInstance = Container.get(CustomerItineraryService);
    const { itinerary_code } = req.body;
    console.log(itinerary_code);
    const itn = await customerItineraryServiceInstance.find({ itinerary_code: itinerary_code });
    console.log(itn);
    return res.status(200).json({ message: 'fetched succesfully', data: itn });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  findByOne,
  findBy,
  findAll,
  createCluster,
  createCategory,
  findClusterByCode,
  findCategoryByCode,
  findAllClusters,
  findAllCategories,
  createSubCluster,
  createCategoryType,
  findSubClusterByCode,
  findCategoryTypeByCode,
  findAllSubClusters,
  findAllCategoriesTypes,
  deleteClusterById,
  deleteCategoryById,
  deleteSubClusterById,
  deleteCategoryTypeById,
  createSalesChannels,
  findOneCustomer,
  update,
  getDataForCustomerCreate,
  getCustomersOfItinerary,
};
