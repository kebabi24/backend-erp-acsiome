import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/customer-mobile';
const route = Router();

export default (app: Router) => {
  app.use('/customers-mobile', route);

  route.get('/', controller.findAll);
  route.post('/', controller.create);
  route.post('/find', controller.findBy);
  route.post('/findone', controller.findByOne);
  route.post('/createCluster', controller.createCluster);
  route.post('/createSubCluster', controller.createSubCluster);
  route.post('/createCategory', controller.createCategory);
  route.post('/createCategoryType', controller.createCategoryType);
  route.post('/createSalesChannels', controller.createSalesChannels);
  route.delete('/deleteCluster/:clusterId', controller.deleteClusterById);
  route.delete('/deleteCategory/:categoryId', controller.deleteCategoryById);
  route.delete('/deleteSubCluster/:subClusterId', controller.deleteSubClusterById);
  route.delete('/deleteCategoryType/:categoryTypeId', controller.deleteCategoryTypeById);
  route.get('/findCluster/:cluster_code', controller.findClusterByCode);
  route.get('/findCategory/:category_code', controller.findCategoryByCode);
  route.get('/findAllClusters', controller.findAllClusters);
  route.get('/findAllSubClusters', controller.findAllSubClusters);
  route.get('/findAllCategories', controller.findAllCategories);
  route.get('/findAllCategoriesTypes', controller.findAllCategoriesTypes);
  route.get('/findSubCluster/:sub_cluster_code', controller.findSubClusterByCode);
  route.get('/findCategoryType/:category_type_code', controller.findCategoryTypeByCode);
  route.get('/:id', controller.findOneCustomer);
  route.put('/:id', controller.update);
  route.post('/getDataCreateCustomer', controller.getDataForCustomerCreate);
  route.post('/getCustomersOfItinerary', controller.getCustomersOfItinerary);
};
