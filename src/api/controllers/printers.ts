import PrinterService from '../../services/printers';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op } from 'sequelize';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const data = req.body;

    const printerServiceInstance = Container.get(PrinterService);

    const printer = await printerServiceInstance.create({
      ...data,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

    return res.status(200).json({ message: 'create succesfully', data: printer });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const { user_domain } = req.headers;
  try {
    const printerServiceInstance = Container.get(PrinterService);
    const printers = await printerServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: printers });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  findAll,
};
