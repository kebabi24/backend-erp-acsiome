import QualityControlService from '../../services/quality_control';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
import sequelize from '../../loaders/sequelize';
import { isNull } from 'lodash';

const createStandardSpecification = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling Create productPage endpoint with body: %o', req.body);
  try {
    const specificationService = Container.get(QualityControlService);
    // console.log(req.body)

    const standardSpecificationHeader = req.body.standardSpecificationHeader;
    const standardSpecificationDetails = req.body.standardSpecificationDetails;
    console.log(standardSpecificationHeader.mp_expire);
    let date2 = new Date(standardSpecificationHeader.mp_expire);
    console.log(date2);

    // let date1 = new Date(standardSpecificationHeader.mp_expire)
    // standardSpecificationHeader.mp_expire = date1

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

const addSensibilisationData = async (req: Request, res: Response, next: NextFunction) => {
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

export default {
  findOneSpecificationByCode,
  createStandardSpecification,
  getSpecificationsCodes,
  findOneSpecificationWithDetails,
  createTestsHistory,
  getSpecificationsDetails,
  addSensibilisationData,
  addIdentificationData,
};
