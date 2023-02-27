import BankService from '../../services/bank';
import BankDetailService from '../../services/bank-detail';
import BkhService from '../../services/bkh';
import PosOrder from '../../services/pos-order';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import sequenceService from '../../services/sequence';
import serviceMobile from '../../services/mobile-service';
import { Op, Sequelize } from 'sequelize';
'use strict';
const nodemailer = require('nodemailer');
const create = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const { bank, bankDetails } = req.body;
    console.log(req.body);
    const bk = await bankServiceInstance.create({
      ...bank,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    for (let entry of bankDetails) {
      entry = {
        ...entry,
        bkd_bank: bk.bk_code,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await bankDetailServiceInstance.create(entry);
    }
    // console.log(bk)
    return res.status(201).json({ message: 'created succesfully', data: bk });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const bkhTr = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const bkhServiceInstance = Container.get(BkhService);
    const { bank, bankDetails } = req.body;
    console.log(req.body);
    const bk = await bkhServiceInstance.create({
      bkh_effdate: req.body.date,
      bkh_type: 'T',
      bkh_balance: req.body.amt_tr,
      bk_2000: req.body.amt_rl,
      bkh_site: req.body.site,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

    // console.log(bk)
    return res.status(201).json({ message: 'created succesfully', data: bk });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const Bk = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const { detail, type, user, user_site } = req.body;
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const bkhServiceInstance = Container.get(BkhService);
    const SequenceServiceInstance = Container.get(sequenceService);
    const ServiceInstance = Container.get(serviceMobile);
    const sequence = await SequenceServiceInstance.findOne({ seq_type: 'SR', seq_profile: user });

    console.log(user_code);

    if (type === 'O') {
      let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val) + 1}`;
      const service = await ServiceInstance.create({
        service_code: nbr,
        service_period_activate_date: new Date(),
        service_creation_date: new Date(),
        role_code: user_code,
        service_open: true,
        service_site: user_site,
      });
      await SequenceServiceInstance.update(
        { seq_curr_val: Number(sequence.seq_curr_val) + 1 },
        { seq_type: 'SR', seq_profile: user },
      );
      const currentService = await ServiceInstance.findOne({ role_code: user_code, service_open: true });
      for (const bank of detail) {
        await bankServiceInstance.update(
          {
            bk_balance: bank.bk_balance,
            bk_2000: bank.bk_2000,
            bk_1000: bank.bk_1000,
            bk_0500: bank.bk_0500,
            bk_0200: bank.bk_0200,
            bk_p200: bank.bk_p200,
            bk_p100: bank.bk_p100,
            bk_p050: bank.bk_p050,
            bk_p020: bank.bk_p020,
            bk_p010: bank.bk_p010,
            bk_p005: bank.bk_p005,
          },
          { bk_code: bank.bk_code },
        );
        await bkhServiceInstance.create({
          bkh_code: bank.bk_code,
          bk_num_code: new Date(),
          bkh_balance: bank.bk_balance,
          bkh_date: new Date(),
          bkh_type: 'O',
          bk_2000: bank.bk_2000,
          bk_1000: bank.bk_1000,
          bk_0500: bank.bk_0500,
          bk_0200: bank.bk_0200,
          bk_p200: bank.bk_p200,
          bk_p100: bank.bk_p100,
          bk_p050: bank.bk_p050,
          bk_p020: bank.bk_p020,
          bk_p010: bank.bk_p010,
          bk_p005: bank.bk_p005,
          bkh_effdate: currentService.service_period_activate_date,
        });
      }
    } else {
      console.log(user);

      const currentService = await ServiceInstance.findOne({ role_code: user_code, service_open: true });
      for (const bank of detail) {
        await bankServiceInstance.update(
          {
            bk_balance: bank.bk_balance,
            bk_2000: bank.bk_2000,
            bk_1000: bank.bk_1000,
            bk_0500: bank.bk_0500,
            bk_0200: bank.bk_0200,
            bk_p200: bank.bk_p200,
            bk_p100: bank.bk_p100,
            bk_p050: bank.bk_p050,
            bk_p020: bank.bk_p020,
            bk_p010: bank.bk_p010,
            bk_p005: bank.bk_p005,
          },
          { bk_code: bank.bk_code },
        );
        await bkhServiceInstance.create({
          bkh_code: bank.bk_code,
          bk_num_code: new Date(),
          bkh_balance: bank.bk_balance,
          bkh_date: new Date(),
          bkh_type: 'C',
          bk_2000: bank.bk_2000,
          bk_1000: bank.bk_1000,
          bk_0500: bank.bk_0500,
          bk_0200: bank.bk_0200,
          bk_p200: bank.bk_p200,
          bk_p100: bank.bk_p100,
          bk_p050: bank.bk_p050,
          bk_p020: bank.bk_p020,
          bk_p010: bank.bk_p010,
          bk_p005: bank.bk_p005,
          bkh_effdate: currentService.service_period_activate_date,
        });
        const service = await ServiceInstance.update(
          {
            service_closing_date: new Date(),
            service_open: false,
          },
          { role_code: user_code, service_open: true },
        );
      }
      console.log('avant');
      await SequenceServiceInstance.update({ seq_curr_val: 1 }, { seq_type: 'OF', seq_profile: user });
      console.log('aprés');
    }

    // console.log(bk)
    return res.status(201).json({ message: 'created succesfully', data: true });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const proccesPayement = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const bankhDetailerviceInstance = Container.get(BkhService);
    const PosOrderServiceInstance = Container.get(PosOrder);
    const ServiceInstance = Container.get(serviceMobile);
    const currentService = await ServiceInstance.findOne({ role_code: user_code, service_open: true });
    const { cart, type, user_name } = req.body;

    const bank = await bankServiceInstance.findOne({ bk_type: type, bk_user1: user_code });
    console.log(bank);
    console.log(cart);
    if (bank) {
      if (cart.products.length > 0) {
        await bankhDetailerviceInstance.create({
          bkh_code: bank.bk_code,
          bkh_date: new Date(),
          bkh_balance: Number(bank.bk_balance) + Number(cart.total_price),
          bkh_type: 'R',
          dec01: Number(cart.total_price),
          bkh_num_doc: cart.order_code,
          bkh_site: cart.usrd_site,
          bkh_effdate: currentService.service_period_activate_date,
        });
        await bankServiceInstance.update(
          {
            bk_balance: Number(bank.bk_balance) + Number(cart.total_price),

            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          },
          { bk_type: type, bk_user1: user_name },
        );
        // console.log(cart.order_code, user_name);
        await PosOrderServiceInstance.update(
          {
            status: 'P',
          },

          { order_code: cart.order_code, usrd_site: cart.usrd_site },
        );
      }
    }
    return res.status(201).json({ message: 'created succesfully', data: true });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const createFRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const bankhDetailerviceInstance = Container.get(BkhService);
    const PosOrderServiceInstance = Container.get(PosOrder);
    const { mv, type, user_name } = req.body;

    // console.log(user_name);
    const bank = await bankServiceInstance.findOne({ bk_type: 'REG', bk_user1: user_name });
    if (bank) {
      await bankhDetailerviceInstance.create({
        bkh_code: bank.bk_code,
        bkh_date: new Date(),
        bkh_num_doc: mv.mv_cause,
        bkh_balance: mv.mv_amt,
        bkh_type: type,
      });
    }
    return res.status(201).json({ message: 'created succesfully', data: true });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAR = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  // console.log(req.body);
  logger.debug('Calling find by  all bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const bank = await bankServiceInstance.findOne({
      ...req.body,
    });
    if (bank) {
      const details = await bankDetailServiceInstance.find({
        bkd_bank: bank.bk_code,
        bkd_module: 'AR',
      });
      return res.status(200).json({
        message: 'fetched succesfully',
        data: { bank, details },
      });
    } else {
      return res.status(200).json({
        message: 'not FOund',
        data: { bank, details: null },
      });
    }
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAP = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const bank = await bankServiceInstance.findOne({
      ...req.body,
    });
    if (bank) {
      const details = await bankDetailServiceInstance.find({
        bkd_bank: bank.bk_code,
        bkd_module: 'AP',
      });
      return res.status(200).json({
        message: 'fetched succesfully',
        data: { bank, details },
      });
    } else {
      return res.status(200).json({
        message: 'not FOund',
        data: { bank, details: null },
      });
    }
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const bank = await bankServiceInstance.findOne({
      ...req.body,
    });
    if (bank) {
      const details = await bankDetailServiceInstance.find({
        bkd_bank: bank.bk_code,
      });
      //  console.log(details)
      return res.status(200).json({
        message: 'fetched succesfully',
        data: { bank, details },
      });
    } else {
      return res.status(200).json({
        message: 'not FOund',
        data: { bank, details: null },
      });
    }
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const { id } = req.params;
    const bank = await bankServiceInstance.findOne({ id });
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const details = await bankDetailServiceInstance.find({
      bkd_bank: bank.bk_code,
    });

    return res.status(200).json({
      message: 'fetched succesfully',
      data: { bank, details },
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const banks = await bankServiceInstance.find({});
    return res.status(200).json({ message: 'fetched succesfully', data: banks });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all bank endpoint');
  try {
    console.log(req.body);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const details = await bankDetailServiceInstance.find({ ...req.body });
    //  console.log(details)
    return res.status(200).json({ message: 'fetched succesfully', data: details });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBkByUser = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all bank endpoint');
  try {
    console.log(req.body);
    const bankServiceInstance = Container.get(BankService);
    const details = await bankServiceInstance.find({ ...req.body });
    //  console.log(details)
    return res.status(200).json({ message: 'fetched succesfully', data: details });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  inventoryStatus endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const { id } = req.params;
    const { bank, details } = req.body;
    const banks = await bankServiceInstance.update(
      { ...bank, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    await bankDetailServiceInstance.delete({ bkd_bank: bank.bk_code });
    for (let entry of details) {
      entry = {
        ...entry,
        bkd_bank: bank.bk_code,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await bankDetailServiceInstance.create(entry);
    }
    return res.status(200).json({ message: 'fetched succesfully', data: banks });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const updatedet = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  bankdetail endpoint');
  try {
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const { id } = req.params;
    const { bankdet } = req.body;
    console.log(bankdet);
    const bankdets = await bankDetailServiceInstance.update(
      { ...bankdet, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );

    return res.status(200).json({ message: 'fetched succesfully', data: bankdets });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBkhGrp = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all order endpoint');

  const bkhServiceInstance = Container.get(BkhService);

  if (req.body.site != '*') {
    try {
      const orders = await bkhServiceInstance.findq({
        where: {
          bkh_effdate: { [Op.between]: [req.body.date, req.body.date1] },
          bkh_site: req.body.site,
        },
        order: [['id', 'ASC']],
      });

      let result = [];
      var i = 1;
      for (let ord of orders) {
        // const effdate = new Date(ord.bkh_effdate);
        // const groups = await codeServiceInstance.findOne({ code_fldname: 'pt_group', code_value: items.pt_group });
        // const promos = await codeServiceInstance.findOne({ code_fldname: 'pt_promo', code_value: items.pt_promo });
        // console.log(parttypes,groups,promos)
        result.push({
          id: i,
          effdate: ord.bkh_effdate,
          date: ord.bkh_date,
          site: ord.bkh_site,
          code: ord.bkh_code,
          balance: ord.bkh_balance,
          O: ord.bkh_type == 'O' ? ord.bkh_balance : 0,
          R: ord.bkh_type == 'R' ? ord.dec01 : 0,
          D: ord.bkh_type == 'D' ? ord.dec01 : 0,
          C: ord.bkh_type == 'C' ? ord.bkh_balance : 0,
          num: ord.bkh_num_doc,
        });
        i = i + 1;
      }
      return res.status(200).json({ message: 'fetched succesfully', data: result });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  } else {
    try {
      // console.log(req.body)
      console.log(req.body.date1);
      const orders = await bkhServiceInstance.findq({
        where: {
          bkh_effdate: { [Op.between]: [req.body.date, req.body.date1] },
        },
        order: [['id', 'ASC']],
        // attributes: {
        //   //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
        //   include: [[Sequelize.literal('(bkh_type == "O")?bkh_2000'), 'Open']],
        // },
      });

      let result = [];
      var i = 1;
      for (let ord of orders) {
        // const groups = await codeServiceInstance.findOne({ code_fldname: 'pt_group', code_value: items.pt_group });
        // const promos = await codeServiceInstance.findOne({ code_fldname: 'pt_promo', code_value: items.pt_promo });
        // console.log(parttypes,groups,promos)
        result.push({
          id: i,
          effdate: ord.bkh_effdate,
          date: ord.bkh_date,
          site: ord.bkh_site,
          code: ord.bkh_code,
          balance: ord.bkh_balance,
          O: ord.bkh_type == 'O' ? ord.bkh_balance : 0,
          R: ord.bkh_type == 'R' ? ord.dec01 : 0,
          D: ord.bkh_type == 'D' ? ord.dec01 : 0,
          C: ord.bkh_type == 'C' ? ord.bkh_balance : 0,
          num: ord.bkh_num_doc,
        });
        i = i + 1;
      }

      //console.log(result)
      return res.status(200).json({ message: 'fetched succesfully', data: result });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
};

export default {
  create,
  findBy,
  findAR,
  findBkByUser,
  findAP,
  findOne,
  findAll,
  findAllDetails,
  update,
  updatedet,
  Bk,
  proccesPayement,
  createFRequest,
  findBkhGrp,
  bkhTr,
};
