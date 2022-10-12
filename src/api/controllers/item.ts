import ItemService from '../../services/item';
import LocationDetailService from '../../services/location-details';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
import sequelize from '../../loaders/sequelize';
import { isNull } from 'lodash';
const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling Create item endpoint ');
  try {
    const itemServiceInstance = Container.get(ItemService);
    const item = await itemServiceInstance.create({
      ...req.body,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    return res.status(201).json({ message: 'created succesfully', data: { item } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  try {
    const itemServiceInstance = Container.get(ItemService);
    const items = await itemServiceInstance.find({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: items });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBySupp = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  try {
    const itemServiceInstance = Container.get(ItemService);
    const items = await itemServiceInstance.findBySupp({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: items });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  try {
    const itemServiceInstance = Container.get(ItemService);
    const items = await itemServiceInstance.findOne({ ...req.body });
    return res.status(200).json({ message: 'fetched succesfully', data: items });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const itemServiceInstance = Container.get(ItemService);
    const { id } = req.params;
    const item = await itemServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: item });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  try {
    const itemServiceInstance = Container.get(ItemService);
    const codes = await itemServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: codes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findProd = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const Sequelize = require('sequelize');
  const Op = Sequelize.Op;
  console.log(req.body.pmcode);

  try {
    const itemServiceInstance = Container.get(ItemService);

    const codes = await itemServiceInstance.find({
      ...{
        pt_pm_code: 'M',
      },
    });

    return res.status(200).json({ message: 'fetched succesfully', data: codes });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllwithstk = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  try {
    const itemServiceInstance = Container.get(ItemService);
    const locationDetailServiceInstance = Container.get(LocationDetailService);
    const items = await itemServiceInstance.find({});
    const result = [];
    for (const item of items) {
      const res = await locationDetailServiceInstance.findSpecial({
        where: { ld_part: item.pt_part },
        attributes: ['ld_part', [Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'total']],
        group: ['ld_part'],
        raw: true,
      });

      //items.total_qty = res.total_qty;
      const qty = res[0] ? (res[0].total ? res[0].total : 0) : 0;
      item.pt_ord_max = qty;
      result.push(item);
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const itemServiceInstance = Container.get(ItemService);
    const { id } = req.params;
    const item = await itemServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: item });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  findBy,
  findBySupp,
  findByOne,
  findOne,
  findAll,
  findProd,
  findAllwithstk,
  update,
};
