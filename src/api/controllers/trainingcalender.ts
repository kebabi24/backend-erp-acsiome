import TrainingcalenderService from '../../services/trainingcalender';

import ConfigService from '../../services/config';
import crmService from '../../services/crm';
import SequenceService from '../../services/sequence';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { QueryTypes } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
    
    const { Trainingcalender,TrainingcalenderDetails } = req.body;
        //    Trainingcalender
      //con//sole.log(req.body)
     
    for (let entry of TrainingcalenderDetails) {

        const tc = await trainingcalenderServiceInstance.findOne({
          
            tc_year: Trainingcalender.tc_year,
            tc_site: entry.tc_site,
            tc_service: Trainingcalender.tc_service,
            tc_part: entry.tc_part,
            tc_pop: entry.tc_pop,
            tc_session_nbr: entry.tc_session_nbr,
            tc_vend: entry.tc_vend,
            tc_domain: user_domain,
          });

          if(!tc) {
            const tk = await trainingcalenderServiceInstance.create({
            ...entry,
            tc_year: Trainingcalender.tc_year,
            tc_service: Trainingcalender.tc_service,
            tc_domain: user_domain,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
            });

            // ADD TO AGENDA
            const sequenceServiceInstance = Container.get(SequenceService);
            const configServiceInstance = Container.get(ConfigService);
            const crmServiceInstance = Container.get(crmService);
            const config = await configServiceInstance.findOne({ cfg_crm: true });
            if (config) {
                const param = await crmServiceInstance.getParamFilterd('new_shop');
                const paramDetails = await crmServiceInstance.getParamDetails({
                  param_code: param.param_code,
                  domain: user_domain,
                });
                const elements = await crmServiceInstance.getPopulationElements(paramDetails.population_code);
                for (const element of elements) {
                  const sequence = await sequenceServiceInstance.getCRMEVENTSeqNB();
                  const addLine = await crmServiceInstance.createAgendaLine(element.code_element, param, paramDetails, sequence);
                  
                }
            }
          } else {
            const te = await trainingcalenderServiceInstance.update({
                ...entry,
                tc_domain: user_domain,
                created_by: user_code,
                created_ip_adr: req.headers.origin,
                last_modified_by: user_code,
                last_modified_ip_adr: req.headers.origin,
                },{id:tc.id});

          }
     
      
    }
    return res.status(201).json({ message: 'created succesfully', data: Trainingcalender });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  logger.debug('Calling find by  all Trainingcalender endpoint');
  const { user_domain } = req.headers;
  try {
    
    const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
 
    const Trainingcalender = await trainingcalenderServiceInstance.find({
      ...req.body,
      tc_domain: user_domain,
    });
    
   
    
      return res.status(200).json({
        message: 'fetched succesfully',
        data:  Trainingcalender ,
      });
   
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  Trainingcalender endpoint');
  const { user_domain } = req.headers;
  try {
    const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
    const { id } = req.params;
    const Trainingcalender = await trainingcalenderServiceInstance.findOne({ id });
  
    
    return res.status(200).json({
      message: 'fetched succesfully',
      data:  Trainingcalender ,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all Trainingcalender endpoint');
  const { user_domain } = req.headers;
  try {
    const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
    const Trainingcalenders = await trainingcalenderServiceInstance.find({ tc_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: Trainingcalenders });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  Trainingcalender endpoint');
  try {
    const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
   
    const { id } = req.params;
   
    const tc = await trainingcalenderServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
  
    return res.status(200).json({ message: 'fetched succesfully', data: tc });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deletes = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    const { user_domain } = req.headers;
    logger.debug('Calling update one  code endpoint');
    try {
      console.log("here",req.body)
      const trainingcalenderServiceInstance = Container.get(TrainingcalenderService);
     
      const code = await trainingcalenderServiceInstance.delete({ ...req.body });
     
      return res.status(200).json({ message: 'deleted succesfully', data: true});
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  };
export default {
  create,
  findBy,
  findOne,
  findAll,
  update,
  deletes
  
};
