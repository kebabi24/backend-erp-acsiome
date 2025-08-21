import ProfileServiceService from '../../services/profile-service';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { QueryTypes } from 'sequelize';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const profileServiceServiceInstance = Container.get(ProfileServiceService);
  
  
    for (let entry of req.body) {
      entry = {
        ...entry,
        
        usgs_domain: user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
      };
      await profileServiceServiceInstance.create(entry);
    }
    return res.status(201).json({ message: 'created succesfully', data: true });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling find by  profileservice endpoint');

  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const profileServiceServiceInstance = Container.get(ProfileServiceService);
    console.log(req.body)
    const profiles = await profileServiceServiceInstance.find({
      ...req.body,
      usgs_domain: user_domain,
    });

    
      return res.status(200).json({
        message: 'fetched succesfully',
        data: profiles,
      });
    
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  job endpoint');

  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const profileServiceServiceInstance = Container.get(ProfileServiceService);
    const { id } = req.params;
    const profile = await profileServiceServiceInstance.findOne({ id });
 

    return res.status(200).json({
      message: 'fetched succesfully',
      data: profile,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all job endpoint');

  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const profileServiceServiceInstance = Container.get(ProfileServiceService);
    const profiles = await profileServiceServiceInstance.find({ usgs_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: profiles });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  job endpoint');
  try {
    const profileServiceServiceInstance = Container.get(ProfileServiceService);
    console.log(req.body)
    const { code } = req.params;
    const { details } = req.body;
  
    await profileServiceServiceInstance.delete({ usgs_code:code,usgs_domain: user_domain });
    for (let entry of req.body) {
      entry = {
        ...entry,
        usgs_code: code,
        usgs_domain: user_domain,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await profileServiceServiceInstance.create(entry);
    }
    return res.status(200).json({ message: 'fetched succesfully', data: code });
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
  
};
