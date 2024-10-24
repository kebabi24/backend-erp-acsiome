import ItemModelService from '../../services/item-model';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
import sequelize from '../../loaders/sequelize';
import { isNull } from 'lodash';
import { cpuUsage } from 'process';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling Create item endpoint ');
  try {
    const itemModelServiceInstance = Container.get(ItemModelService);
    let modelexist = await itemModelServiceInstance.findOne({ mod_code:req.body.mod_code,mod_domain:user_domain });
    let model;
    console.log(modelexist)
    if(modelexist == null){ model = await itemModelServiceInstance.create({
      ...req.body,
      mod_promo:req.body.mod_promo,
      mod_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });}
    else {
      model = await itemModelServiceInstance.update(
        { mod_desc:req.body.mod_desc,mod_um:req.body.mod_um,mod_part_type:req.body.mod_part_type,mod_group:req.body.mod_group,mod_promo:req.body.mod_promo,int01:req.body.int01,int02:req.body.int02, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
        { mod_code: req.body.mod_code },
      );
    }
    return res.status(201).json({ message: 'created succesfully', data: { model } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const itemModelServiceInstance = Container.get(ItemModelService);
    const models = await itemModelServiceInstance.find({ ...req.body,mod_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: models });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all item endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemModelServiceInstance = Container.get(ItemModelService);
    const model = await itemModelServiceInstance.findOne({ ...req.body,mod_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: model });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemModelServiceInstance = Container.get(ItemModelService);
    const { id } = req.params;
    const model = await itemModelServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: model });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const itemModelServiceInstance = Container.get(ItemModelService);
    const models = await itemModelServiceInstance.find({mod_domain:user_domain});
    return res.status(200).json({ message: 'fetched succesfully', data: models });
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
    const itemModelServiceInstance = Container.get(ItemModelService);
    const { id } = req.params;
    const model = await itemModelServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: model });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};





export default {
  create,
  findBy,
  findByOne,
  findOne,
  findAll,
  update,
};
