import MobileService from '../../services/mobile-service';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create service endpoint');
  try {
    const MobileServiceInstance = Container.get(MobileService);
    const service = await MobileServiceInstance.create({
      ...req.body,
      service_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    return res.status(201).json({ message: 'created succesfully', data: service });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  service endpoint');
  const { user_domain } = req.headers;
  try {
    const MobileServiceInstance = Container.get(MobileService);
    const { id } = req.params;
    const service = await MobileServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: service });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all service endpoint');
  const { user_domain } = req.headers;
  try {
    const MobileServiceInstance = Container.get(MobileService);
    const services = await MobileServiceInstance.find({ service_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: services });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all service endpoint');
  const { user_domain } = req.headers;
  try {
    const MobileServiceInstance = Container.get(MobileService);
    // const service = await MobileServiceInstance.findOne({...req.body,seq_domain: user_domain})
    return res.status(200).json({ message: 'fetched succesfully', data: null });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling update one  service endpoint');
  try {
    const MobileServiceInstance = Container.get(MobileService);
    const { id } = req.params;
    const service = await MobileServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: service });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  service endpoint');
  try {
    const MobileServiceInstance = Container.get(MobileService);
    const { id } = req.params;
    const service = await MobileServiceInstance.delete({ id });
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
  update,
  deleteOne,
};
