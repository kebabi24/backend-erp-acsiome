import RoleItineraryService from '../../services/role-itinerary';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create itn endpoint');
  try {
    const RoleItineraryServiceInstance = Container.get(RoleItineraryService);
    const itn = await RoleItineraryServiceInstance.create({
      ...req.body,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    return res.status(201).json({ message: 'created succesfully', data: itn });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  itn endpoint');
  console.log('hedi hiya 1');
  try {
    const RoleItineraryServiceInstance = Container.get(RoleItineraryService);
    const { id } = req.params;
    const itn = await RoleItineraryServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: itn });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all itn endpoint');
  try {
    const RoleItineraryServiceInstance = Container.get(RoleItineraryService);
    const itn = await RoleItineraryServiceInstance.find({});
    console.log(itn);
    return res.status(200).json({ message: 'fetched succesfully', data: itn });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all itn endpoint');
  try {
    const RoleItineraryServiceInstance = Container.get(RoleItineraryService);
    const itn = await RoleItineraryServiceInstance.find({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: itn });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const getItineraryOfRoles = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  itn endpoint');
  console.log('hedi hiya 3');
  try {
    const roleItineraryServiceInstance = Container.get(RoleItineraryService);
    const { role_code } = req.body;
    console.log(role_code);
    const itn = await roleItineraryServiceInstance.find({ role_code: role_code });
    console.log(itn);
    return res.status(200).json({ message: 'fetched succesfully', data: itn });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  itn endpoint');
  try {
    const RoleItineraryServiceInstance = Container.get(RoleItineraryService);
    const { id } = req.params;
    const itn = await RoleItineraryServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: itn });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  itn endpoint');
  try {
    const RoleItineraryServiceInstance = Container.get(RoleItineraryService);
    const { id } = req.params;
    const itn = await RoleItineraryServiceInstance.delete({ id });
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
  getItineraryOfRoles,
};
