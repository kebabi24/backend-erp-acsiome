import QualityControlService from '../../services/quality_control';
import ProjectService from '../../services/project';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import sequelize from '../../loaders/sequelize';
import { isNull } from 'lodash';
import { Op, Sequelize } from 'sequelize';
import SaleOrderService from '../../services/saleorder';

const createStandardSpecification = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling Create productPage endpoint with body: %o', req.body);
  try {
    const specificationService = Container.get(QualityControlService);
    // console.log(req.body)

    const standardSpecificationHeader = req.body.standardSpecificationHeader;
    const standardSpecificationDetails = req.body.standardSpecificationDetails;
   
    let date2 = new Date(standardSpecificationHeader.mp_expire);
    

    const standarSpecificationHeader = await specificationService.createStandartSpecificationHeader({
      ...standardSpecificationHeader,
    });

    const standarSpecificationDetails = await specificationService.createStandartSpecificationDetails(
      standardSpecificationDetails,
    );

    // for(const productCode of productCodes){
    //     const productPageDetails = await productPageService.createProductPageProducts(
    //         {
    //             productPageCode,
    //         },
    //         {
    //             productCode,
    //         })
    // }

    return res.status(201).json({ message: 'created succesfully', data: { standarSpecificationHeader } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOneSpecificationByCode = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const specificationService = Container.get(QualityControlService);
    const { specification_code } = req.params;
     const specification = await specificationService.findSpecificationByCode(specification_code);
    return res.status(200).json({ message: 'found one specification', data: { specification } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findSpecificationsBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const specificationService = Container.get(QualityControlService);
    const  {query}  = req.body;
    console.log(query)
    const specifications = await specificationService.findSpecificationsBy(query);
    return res.status(200).json({ message: 'found  specifications', data: { specifications } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getSpecificationsCodes = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling getSpecificationsCodes endpoint');
  try {
    const specificationService = Container.get(QualityControlService);
    const specifications = await specificationService.getSpecifications();
    return res.status(200).json({ message: 'found specifications', data: specifications });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getSpecificationsDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const code = req.body.mpd_nbr;
  logger.debug('Calling getSpecificationsCodes endpoint');
  try {
    const specificationService = Container.get(QualityControlService);
    const specifications = await specificationService.getSpecificationsDetails({ mpd_nbr: code });
    return res.status(200).json({ message: 'found specifications', data: specifications });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOneSpecificationWithDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const specificationService = Container.get(QualityControlService);
    const { specification_code } = req.params;
    const specification = await specificationService.findSpecificationByCode(specification_code);
    const specificationDetails = await specificationService.findSpecificationDetailsByCode(specification_code);
    return res.status(200).json({ message: 'found one specification', data: { specification, specificationDetails } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createTestsHistory = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling Create productPage endpoint with body: %o', req.body);
  try {
    const specificationService = Container.get(QualityControlService);
    // console.log(req.body)

    const testsHistory = req.body.testsHistory;
    // console.log(standardSpecificationHeader.mp_expire)
    // let date2 = new Date(standardSpecificationHeader.mp_expire)
    // console.log(date2)

    const createdTestsHistory = await specificationService.createTestsHistory(testsHistory);

    return res.status(201).json({ message: 'created succesfully', data: { createdTestsHistory } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createTestsHistoryUpdatePStatus = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling Create productPage endpoint with body: %o', req.body);
  try {
    const specificationService = Container.get(QualityControlService);
    const saleOrderService = Container.get(SaleOrderService);
    const projectService = Container.get(ProjectService);

    const testsHistory = req.body.testsHistory;
    const update_project_status = req.body.update_project_status;
    const project_code = req.body.project_code;

    const createdTestsHistory = await specificationService.createTestsHistory(testsHistory);

    if (update_project_status) {
      const updateProject = await projectService.update({ pm_status: 'R' }, { pm_code: project_code });
      const updateSo = await saleOrderService.update({ so_conf : true , so_conf_date : new Date()}, { so_po: project_code });
    }

    return res.status(201).json({ message: 'created succesfully', data: { createdTestsHistory } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const addSensibilisationData = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const specificationService = Container.get(QualityControlService);
  logger.debug('Calling Create productPage endpoint with body: %o', req.body);
  try {
    const data = req.body;
    const mpd = data.mpd;
    for (let mp of mpd) {
      await specificationService.create({
        mph_part: data.code_project,
        mph_routing: mp.mpd_type,
        mph_op: mp.id,
        mph_date: data.date,
        mph_mch: data.code_employee,
        mph_lot: data.location,
        mph_attribute: data.code_educator,
        mph_dec01: data.duration,
      });
    }
    return res.status(201).json({ message: 'created succesfully', data: null });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const addIdentificationData = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling Create productPage endpoint with body: %o', req.body);
  try {
    console.log(req.body);

    return res.status(201).json({ message: 'created succesfully', data: null });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getDocumentTriggers = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const code = req.body.mpd_nbr;
  logger.debug('Calling getDocumentTriggers endpoint');
  try {
    const specificationService = Container.get(QualityControlService);
    const triggers = await specificationService.getDocumentTriggers();
    return res.status(200).json({ message: 'found triggers', data: triggers });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getLaunchDocumentsByProject = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const specificationService = Container.get(QualityControlService);
    const { project_code } = req.params;

    const docs_codes = await specificationService.getDocumentTriggersByProject(project_code);

    let specs = [];
    if (docs_codes != null) {
      for (const doc_code of docs_codes) {
        const spec = await specificationService.findSpecificationByCode(doc_code.dataValues.mp_nbr);
        const spec_details = await specificationService.findSpecificationDetailsByCode(doc_code.dataValues.mp_nbr);
        specs.push({ spec, spec_details });
      }
    }

    return res.status(200).json({ message: 'found trigger specifications', data: specs });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const findOneSpecificationTestResults = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling findOneSpecificationTestResults endpoint');
  try {
    console.log("hello")
    const qualityContorlService = Container.get(QualityControlService);
    const { query } = req.body;
    console.log(query)
     const specs = await qualityContorlService.getSpecificationTestResult(query);
    return res.status(200).json({ message: 'found results', data: { specs } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOneSpecification = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const specificationService = Container.get(QualityControlService);
    const { query } = req.body;
    const specification = await specificationService.findSpecification(query);
    return res.status(200).json({ message: 'found one specification', data: { specification } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findQualityInspectionRouting = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const specificationService = Container.get(QualityControlService);
    const { query } = req.body;
    const routing = await specificationService.findQualityInspectionRouting(query);
    return res.status(200).json({ message: 'found one routing', data: routing });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

 const findItemSpecificationDetails = async (req: Request, res: Response, next: NextFunction) => {
   const logger = Container.get('logger');
   logger.debug('Calling findItemSpecificationDetails endpoint');
   try {
     const specificationService = Container.get(QualityControlService);
     const { query } = req.body;
     console.log(query)
     const itemSpecDetails = await specificationService.findItemSpecificationDetails(query);
     return res.status(200).json({ message: 'found findItemSpecificationDetails', data: itemSpecDetails });
   } catch (e) {
     logger.error('🔥 error: %o', e);
     return next(e);
   }
 };

 const createIpAndIpds  = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling Create productPage endpoint with body: %o', req.body);
  try {
    const specificationService = Container.get(QualityControlService);
    // console.log(req.body)

    const {ipData ,ipdsData} = req.body;
    const{user_domain} = req.headers

    
    const ip = await specificationService.createIp({...ipData ,ip_domain : user_domain});
    
     ipdsData.forEach(ipd => {
       ipd.ipd_domain = user_domain
     });
    const ipds = await specificationService.createIpds(ipdsData);


    return res.status(201).json({ message: 'created succesfully', data: { ip , ipds } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findQualityInspectionRoutesBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const specificationService = Container.get(QualityControlService);
    const { query } = req.body;
    const routes= await specificationService.findQualityInspectionRoutesBy(query);
    return res.status(200).json({ message: 'found all routes', data: routes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createQroAndQps  = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling Create productPage endpoint with body: %o', req.body);
  try {
    const specificationService = Container.get(QualityControlService);
    

    const {qroData ,qpsData} = req.body;
    const{user_domain} = req.headers

    
    const qro = await specificationService.createQro({...qroData ,qro_domain : user_domain});
    
    qpsData.forEach(qps => {
      qps.qps_domain = user_domain
      delete qps.id
     });
    const qpss = await specificationService.createQps(qpsData);


    return res.status(201).json({ message: 'created succesfully', data: { qro , qpss } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const getAllQros = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const qualityControlService = Container.get(QualityControlService);

    const qros= await qualityControlService.findAllQros();
    return res.status(200).json({ message: 'found all qros', data: qros });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  findOneSpecificationByCode,
  createStandardSpecification,
  getSpecificationsCodes,
  findOneSpecificationWithDetails,
  createTestsHistory,
  createTestsHistoryUpdatePStatus,
  getSpecificationsDetails,
  addSensibilisationData,
  addIdentificationData,
  getDocumentTriggers,
  getLaunchDocumentsByProject,
  findOneSpecificationTestResults,
  findOneSpecification,
  findQualityInspectionRouting,
  findItemSpecificationDetails,
  createIpAndIpds,
  findSpecificationsBy,
  findQualityInspectionRoutesBy,
  createQroAndQps,
  getAllQros,
};
