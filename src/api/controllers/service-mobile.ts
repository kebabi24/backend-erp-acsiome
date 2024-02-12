import MobileService from '../../services/mobile-service';
import RoleService from '../../services/role';
import TokenSerieService from '../../services/token-serie';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create service endpoint');
  try {
    const MobileServiceInstance = Container.get(MobileService);
    const RoleServiceInstance = Container.get(RoleService);
    const TokenSerieServiceInstance = Container.get(TokenSerieService);
    const role_code = req.body.role_code;
    const roleTknSerie = await RoleServiceInstance.findOne({ role_code });
    const token_code = roleTknSerie.token_serie_code;
    const tokenSerie = await TokenSerieServiceInstance.findOne({ token_code });
    console.log(tokenSerie);
    console.log(req.body);
    const service = await MobileServiceInstance.create({
      service_code: tokenSerie.service_prefix + '-' + tokenSerie.service_next_number,
      service_period_activate_date: req.body.service_creation_date,
      ...req.body,
      service_open: true,
      service_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    if (service) {
      await TokenSerieServiceInstance.update(
        {
          service_next_number: tokenSerie.service_next_number + 1,
        },
        { token_code: tokenSerie.token_code },
      );
    }
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
    const service = await MobileServiceInstance.findOne({ ...req.body /*seq_domain: user_domain */ });
    return res.status(200).json({ message: 'fetched succesfully', data: service });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all service endpoint');
  const { user_domain } = req.headers;
  try {
    console.log(req.body);
    const MobileServiceInstance = Container.get(MobileService);
    const service = await MobileServiceInstance.findServices({ ...req.body /* seq_domain: user_domain*/ });
    // console.log(service)
    return res.status(200).json({ message: 'fetched succesfully', data: service });
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
  findByAll,
  update,
  deleteOne,
};
