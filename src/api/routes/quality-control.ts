import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import controller from '../controllers/quality-control';
const route = Router();

export default (app: Router) => {
  app.use('/qualityControl', route);

  route.post('/createSpecification', controller.createStandardSpecification);
  route.post('/createTestsHistory', controller.createTestsHistory);
  route.post('/createTestsHistoryUpdateStatus', controller.createTestsHistoryUpdatePStatus);
  route.get('/findOneSpecificationByCode/:specification_code', controller.findOneSpecificationByCode);
  route.get('/findSpecificationWithDetails/:specification_code', controller.findOneSpecificationWithDetails);
  route.get('/findLaunchSpeicifications/:project_code', controller.getLaunchDocumentsByProject);
  route.get('/findSpecifications', controller.getSpecificationsCodes);
  route.get('/docTriggers', controller.getDocumentTriggers);
  route.post('/getspecmpd', controller.getSpecificationsDetails);
  route.post('/addSensibilisationData', controller.addSensibilisationData);
  route.post('/addIdentificationData', controller.addIdentificationData);
  
  route.post('/getSpecTestResults', controller.findOneSpecificationTestResults);
  route.post('/findItemSpecificationDetails', controller.findItemSpecificationDetails);
  route.post('/getSpecification', controller.findOneSpecification);
  route.post('/findInspectionRouting', controller.findQualityInspectionRouting);

  route.post('/createIpAndIpds', controller.createIpAndIpds);
};
