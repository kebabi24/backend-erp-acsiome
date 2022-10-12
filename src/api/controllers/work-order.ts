import WorkOrderService from '../../services/work-order';
import WoroutingService from '../../services/worouting';
import WorkroutingService from '../../services/workrouting';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { result } from 'lodash';
import { IntegerDataType } from 'sequelize/types';
import psService from '../../services/ps';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const { detail, it, nof } = req.body;
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const woroutingServiceInstance = Container.get(WoroutingService);
    const workroutingServiceInstance = Container.get(WorkroutingService);

    for (const item of detail) {
      let wolot = 0;

      await workOrderServiceInstance
        .create({
          ...item,
          ...it,
          wo_nbr: nof,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        })
        .then(result => {
          wolot = result.id;
        });
      const ros = await workroutingServiceInstance.find({ ro_routing: it.wo_routing });
      for (const ro of ros) {
        await woroutingServiceInstance.create({
          wr_nbr: nof,
          wr_lot: wolot,
          wr_start: item.wo_rel_date,
          wr_routing: ro.ro_routing,
          wr_wkctr: ro.ro_wkctr,
          wr_mch: ro.ro_mch,
          wr_status: 'F',
          wr_part: item.wo_part,
          wr_site: item.wo_site,
          wr_op: ro.ro_op,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });
      }
    }
    return res.status(200).json({ message: 'deleted succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const createPosWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const code_cart = req.body.cart.code_cart;
    const products = req.body.cart.products;

    for (const product of products) {
      const { pt_part, pt_qty, pt_bom_code } = product;

      await workOrderServiceInstance.create({
        wo_nbr: code_cart,
        wo_part: pt_part,
        wo_qty_ord: pt_qty,
        wo_bom_code: pt_bom_code,
        wo_ord_date: new Date(),
        wo_rel_date: new Date(),
        wo_due_date: new Date(),
        wo_status: 'R',
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
    }
    return res.status(200).json({ message: 'deleted succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const { id } = req.params;
    const wo = await workOrderServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: wo });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.headers.origin);

  logger.debug('Calling find all wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const wos = await workOrderServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: wos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const wos = await workOrderServiceInstance.find({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: wos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const wos = await workOrderServiceInstance.findOne({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: wos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  console.log(req.body);
  logger.debug('Calling update one  wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const { id } = req.params;
    const wo = await workOrderServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: wo });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  wo endpoint');
  try {
    const workOrderServiceInstance = Container.get(WorkOrderService);
    const { id } = req.params;
    const wo = await workOrderServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  createPosWorkOrder,
  findOne,
  findAll,
  findBy,
  findByOne,
  update,
  deleteOne,
};
