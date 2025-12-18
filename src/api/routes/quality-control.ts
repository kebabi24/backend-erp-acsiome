import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/quality-control';
const route = Router();

export default (app: Router) => {
  app.use('/qualityControl', route);

  route.post('/createSpecification', controller.createStandardSpecification);
  route.post('/createTestsHistory', controller.createTestsHistory);
  route.post('/GetTestsHistory', controller.getTestsHistory);
  route.post('/createTestsHistoryUpdateStatus', controller.createTestsHistoryUpdatePStatus);
  route.get('/findOneSpecificationByCode/:specification_code', controller.findOneSpecificationByCode);
  route.get('/findSpecificationWithDetails/:specification_code', controller.findOneSpecificationWithDetails);
  route.get('/findLaunchSpeicifications/:project_code', controller.getLaunchDocumentsByProject);
  route.get('/findSpecifications', controller.getSpecificationsCodes);
  route.get('/docTriggers', controller.getDocumentTriggers);
  route.get('/getAllGammes', controller.getAllQros);

  route.post('/getspecmpd', controller.getSpecificationsDetails);
  route.post('/addSensibilisationData', controller.addSensibilisationData);
  route.post('/addIdentificationData', controller.addIdentificationData);
  route.post('/findSpecificationsBy', controller.findSpecificationsBy);
  
  route.post('/getSpecTestResults', controller.findOneSpecificationTestResults);
  route.post('/findItemSpecificationDetails', controller.findItemSpecificationDetails);
  route.post('/getSpecification', controller.findOneSpecification);
  route.post('/findInspectionRouting', controller.findQualityInspectionRouting);
  route.post('/findInspectionRoutesBy', controller.findQualityInspectionRoutesBy);

  route.post('/createIpAndIpds', controller.createIpAndIpds);
  route.post('/createQroAndQps', controller.createQroAndQps);
  route.post('/find', controller.findBy);
};
