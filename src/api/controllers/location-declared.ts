import LocationDeclaredService from '../../services/location-declared';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { localeData } from 'moment';
import sequenceService from '../../services/sequence';
import { Op, Sequelize } from 'sequelize';
import ItemService from '../../services/item';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  

  logger.debug('Calling Create locationDeclared endpoint');
  try {
    const locationDeclaredServiceInstance = Container.get(LocationDeclaredService);
    const locationDeclared = await locationDeclaredServiceInstance.create({
      ...req.body,
      ldd_domain : user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    return res.status(201).json({ message: 'created succesfully', data: locationDeclared });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  locationDeclared endpoint');
  try {
    const locationDeclaredServiceInstance = Container.get(LocationDeclaredService);
    const { id } = req.params;
    const locationDeclared = await locationDeclaredServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: locationDeclared });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all locationDeclared endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const locationDeclaredServiceInstance = Container.get(LocationDeclaredService);
    const locationDeclareds = await locationDeclaredServiceInstance.findall({ldd_domain:user_domain});
   // console.log(locationDeclareds)
    return res.status(200).json({ message: 'fetched succesfully', data: locationDeclareds });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDeclared endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const locationDeclaredServiceInstance = Container.get(LocationDeclaredService);
    const locationDeclareds = await locationDeclaredServiceInstance.find({ ...req.body,ldd_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: locationDeclareds });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDeclared endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const locationDeclaredServiceInstance = Container.get(LocationDeclaredService);
    const locationDeclareds = await locationDeclaredServiceInstance.findOne({ ...req.body,ldd_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: locationDeclareds });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
 // 
  logger.debug('Calling find by  all locationDeclared endpoint');
  const { user_code } = req.headers;
    const { user_domain } = req.headers;
  
  try {
    const locationDeclaredServiceInstance = Container.get(LocationDeclaredService);

    const locationDeclareds = await locationDeclaredServiceInstance.find({
      ...req.body,ldd_domain:user_domain,
    });
    return res.status(202).json({
      message: 'sec',
      data: locationDeclareds,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  locationDeclared endpoint');
  try {
    const locationDeclaredServiceInstance = Container.get(LocationDeclaredService);
    const { id } = req.params;
    const locationDeclared = await locationDeclaredServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: locationDeclared });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  locationDeclared endpoint');
  try {
    const locationDeclaredServiceInstance = Container.get(LocationDeclaredService);
    const { id } = req.params;
    const locationDeclared = await locationDeclaredServiceInstance.delete({ id });
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
