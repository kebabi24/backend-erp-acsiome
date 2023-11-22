import AudiometryService from '../../services/audiometry';
import AudiogramService from '../../services/audiogram';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { localeData } from 'moment';
import sequenceService from '../../services/sequence';
import { Op, Sequelize } from 'sequelize';


const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  const { audiometry, audiogram } = req.body;

  logger.debug('Calling Create audiometry endpoint');
  try {
    const audiometryServiceInstance = Container.get(AudiometryService);
    const audiogramServiceInstance = Container.get(AudiogramService);
  
    const audiom = await audiometryServiceInstance.create({
      ...audiometry,
      aud_domain : user_domain,
      aud_date: new Date(),
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
  
    for (let entry of audiogram) {
    const audiog = await audiogramServiceInstance.create({
      ...entry,
      audd_code: audiometry.aud_code,
      audd_domain : user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
  }
    return res.status(201).json({ message: 'created succesfully', data: audiometry });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  audiometry endpoint');
  try {
    const audiometryServiceInstance = Container.get(AudiometryService);
    const { id } = req.params;
    const audiometry = await audiometryServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: audiometry });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all audiometry endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const audiometryServiceInstance = Container.get(AudiometryService);
    const audiometrys = await audiometryServiceInstance.findall({aud_domain:user_domain});
   // console.log(audiometrys)
    return res.status(200).json({ message: 'fetched succesfully', data: audiometrys });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all audiometry endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const audiometryServiceInstance = Container.get(AudiometryService);
    const audiometrys = await audiometryServiceInstance.find({ ...req.body,aud_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: audiometrys });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all audiometry endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const audiometryServiceInstance = Container.get(AudiometryService);
    const audiometrys = await audiometryServiceInstance.findOne({ ...req.body,aud_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: audiometrys });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
 // console.log(req.body);
  logger.debug('Calling find by  all audiometry endpoint');
  const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
  try {
    const audiometryServiceInstance = Container.get(AudiometryService);

    const audiometrys = await audiometryServiceInstance.find({
      ...req.body,aud_domain:user_domain,
    });
    return res.status(202).json({
      message: 'sec',
      data: audiometrys,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  audiometry endpoint');
  try {
    const audiometryServiceInstance = Container.get(AudiometryService);
    const { id } = req.params;
    const audiometry = await audiometryServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: audiometry });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  audiometry endpoint');
  try {
    const audiometryServiceInstance = Container.get(AudiometryService);
    const { id } = req.params;
    const audiometry = await audiometryServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  findOne,
  findAll,
  findBy,
  findByOne,
  update,
  deleteOne,
  findByAll,

};
