import DeliveryService from '../../services/delivery';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling Create platformes endpoint');
  try {
    const deliveryServiceInstance = Container.get(DeliveryService);
    const platformes = await deliveryServiceInstance.create({
      ...req.body,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    return res.status(201).json({ message: 'created succesfully', data: platformes });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  platformes endpoint');
  try {
    const deliveryServiceInstance = Container.get(DeliveryService);
    const { id } = req.params;
    const platformes = await deliveryServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: platformes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all platformes endpoint');
  try {
    const deliveryServiceInstance = Container.get(DeliveryService);
    const platformes = await deliveryServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: platformes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all platformes endpoint');
  try {
    const deliveryServiceInstance = Container.get(DeliveryService);
    const platformes = await deliveryServiceInstance.findOne({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: platformes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  platformes endpoint');
  try {
    const deliveryServiceInstance = Container.get(DeliveryService);
    const { id } = req.params;
    const platformes = await deliveryServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: platformes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  platformes endpoint');
  try {
    const deliveryServiceInstance = Container.get(DeliveryService);
    const { id } = req.params;
    const platformes = await deliveryServiceInstance.delete({ id });
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
