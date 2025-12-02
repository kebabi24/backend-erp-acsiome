import BankService from '../../services/bank';
import BankDetailService from '../../services/bank-detail';
import BkhService from '../../services/bkh';
import PosOrder from '../../services/pos-order';
import DecompteService from '../../services/decompte';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import sequenceService from '../../services/sequence';
import serviceMobile from '../../services/mobile-service';
import { Op, Sequelize } from 'sequelize';
import SequenceService from '../../services/sequence';
import RoleService from '../../services/role';
'use strict';
const nodemailer = require('nodemailer');
const create = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const { bank, bankDetails } = req.body;
  
    const bk = await bankServiceInstance.create({
      ...bank,
      bk_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    for (let entry of bankDetails) {
      entry = {
        ...entry,
        bkd_domain: user_domain,
        bkd_bank: bk.bk_code,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await bankDetailServiceInstance.create(entry);
    }
   
    return res.status(201).json({ message: 'created succesfully', data: bk });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const bkhTr = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const bkhServiceInstance = Container.get(BkhService);
    const { bank, bankDetails } = req.body;
   
    const bk = await bkhServiceInstance.create({
      bkh_domain: user_domain,
      bkh_effdate: req.body.date,
      bkh_type: 'T',
      bkh_balance: req.body.amt_tr,
      bkh_amt: req.body.amt_rl,
      bkh_site: req.body.site,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

   
    return res.status(201).json({ message: 'created succesfully', data: bk });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const Bk = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const { detail, type, user, user_site } = req.body;
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const bkhServiceInstance = Container.get(BkhService);
    const SequenceServiceInstance = Container.get(sequenceService);
    const ServiceInstance = Container.get(serviceMobile);
    const sequence = await SequenceServiceInstance.findOne({
      seq_type: 'SR',
      seq_profile: user,
      seq_domain: user_domain,
    });

    

    if (type === 'O') {
      let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val) + 1}`;
      const service = await ServiceInstance.create({
        service_domain: user_domain,
        service_code: nbr,
        service_period_activate_date: new Date(),
        service_creation_date: new Date(),
        role_code: user_code,
        service_open: true,
        service_site: user_site,
      });
      await SequenceServiceInstance.update(
        { seq_curr_val: Number(sequence.seq_curr_val) + 1 },
        { seq_type: 'SR', seq_profile: user, seq_domain: user_domain },
      );
      const currentService = await ServiceInstance.findOne({
        role_code: user_code,
        service_open: true,
        service_domain: user_domain,
      });
      for (const bank of detail) {
        await bankServiceInstance.update(
          {
            bk_balance: bank.bk_balance,
            bkh_2000: bank.bkh_2000,
            bkh_1000: bank.bkh_1000,
            bkh_0500: bank.bkh_0500,
            bkh_0200: bank.bkh_0200,
            bkh_p200: bank.bkh_p200,
            bkh_p100: bank.bkh_p100,
            bkh_p050: bank.bkh_p050,
            bkh_p020: bank.bkh_p020,
            bkh_p010: bank.bkh_p010,
            bkh_p005: bank.bkh_p005,
          },
          { bk_code: bank.bk_code, bk_domain: user_domain },
        );
        await bkhServiceInstance.create({
          bkh_domain: user_domain,
          bkh_code: bank.bk_code,
          bk_num_code: new Date(),
          bkh_balance: bank.bk_balance,
          bkh_date: new Date(),
          bkh_type: 'O',
          bkh_2000: bank.bkh_2000,
          bkh_1000: bank.bkh_1000,
          bkh_0500: bank.bkh_0500,
          bkh_0200: bank.bkh_0200,
          bkh_p200: bank.bkh_p200,
          bkh_p100: bank.bkh_p100,
          bkh_p050: bank.bkh_p050,
          bkh_p020: bank.bkh_p020,
          bkh_p010: bank.bkh_p010,
          bkh_p005: bank.bkh_p005,
          bkh_effdate: currentService.service_period_activate_date,
        });
      }
    } else {


      const currentService = await ServiceInstance.findOne({
        role_code: user_code,
        service_open: true,
        service_domain: user_domain,
      });
      for (const bank of detail) {
        await bankServiceInstance.update(
          {
            bkh_domain: user_domain,
            bk_balance: bank.bk_balance,
            bkh_2000: bank.bkh_2000,
            bkh_1000: bank.bkh_1000,
            bkh_0500: bank.bkh_0500,
            bkh_0200: bank.bkh_0200,
            bkh_p200: bank.bkh_p200,
            bkh_p100: bank.bkh_p100,
            bkh_p050: bank.bkh_p050,
            bkh_p020: bank.bkh_p020,
            bkh_p010: bank.bkh_p010,
            bkh_p005: bank.bkh_p005,
          },
          { bk_code: bank.bk_code, bk_domain: user_domain },
        );
        await bkhServiceInstance.create({
          bkh_code: bank.bk_code,
          bkh_domain: user_domain,
          bk_num_code: new Date(),
          bkh_balance: bank.bk_balance,
          bkh_date: new Date(),
          bkh_type: 'C',
          bkh_2000: bank.bkh_2000,
          bkh_1000: bank.bkh_1000,
          bkh_0500: bank.bkh_0500,
          bkh_0200: bank.bkh_0200,
          bkh_p200: bank.bkh_p200,
          bkh_p100: bank.bkh_p100,
          bkh_p050: bank.bkh_p050,
          bkh_p020: bank.bkh_p020,
          bkh_p010: bank.bkh_p010,
          bkh_p005: bank.bkh_p005,
          bkh_effdate: currentService.service_period_activate_date,
        });
        const service = await ServiceInstance.update(
          {
            service_closing_date: new Date(),
            service_open: false,
          },
          { role_code: user_code, service_open: true, service_domain: user_domain },
        );
      }
     
      await SequenceServiceInstance.update(
        { seq_curr_val: 1 },
        { seq_type: 'OF', seq_profile: user, seq_domain: user_domain },
      );
      
    }


    return res.status(201).json({ message: 'created succesfully', data: true });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const proccesPayement = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const bankhDetailerviceInstance = Container.get(BkhService);
    const PosOrderServiceInstance = Container.get(PosOrder);
    const ServiceInstance = Container.get(serviceMobile);
    const currentService = await ServiceInstance.findOne({
      role_code: user_code,
      service_open: true,
      service_domain: user_domain,
    });
    const { cart, type, user_name } = req.body;

    const bank = await bankServiceInstance.findOne({ bk_type: type, bk_user1: user_code, bk_domain: user_domain });
  

    if (bank) {
      if (cart.products.length > 0) {
        const PosOrderServiceInstance = Container.get(PosOrder);
        const currentOrder = await PosOrderServiceInstance.findOne({
          domain: user_domain,
          order_code: cart.order_code,
          created_date: cart.created_date,
          usrd_site: cart.usrd_site,
        });
        
        await bankhDetailerviceInstance.create({
          bkh_domain: user_domain,
          bkh_code: bank.bk_code,
          bkh_date: new Date(),
          bkh_balance: Number(bank.bk_balance) + Number(currentOrder.total_price),
          bkh_type: 'R',
          dec01: Number(currentOrder.total_price),
          bkh_num_doc: cart.order_code,
          bkh_site: cart.usrd_site,
          bkh_effdate: currentService.service_period_activate_date,
        });
        await bankServiceInstance.update(
          {
            bk_balance: Number(currentOrder.total_price) + Number(currentOrder.total_price),

            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          },
          { bk_type: type, bk_user1: user_name, bk_domain: user_domain },
        );
     
        await PosOrderServiceInstance.update(
          {
            status: 'P',
          },

          { order_code: cart.order_code, usrd_site: cart.usrd_site, domain: user_domain },
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
  const { user_domain } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const bankhDetailerviceInstance = Container.get(BkhService);
    const PosOrderServiceInstance = Container.get(PosOrder);
    const { mv, type, user_name } = req.body;

    
    const bank = await bankServiceInstance.findOne({ bk_type: 'REG', bk_user1: user_name, bk_domain: user_domain });
    if (bank) {
      await bankhDetailerviceInstance.create({
        bkh_domain: user_domain,
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

  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const bank = await bankServiceInstance.findOne({
      ...req.body,
      bk_domain: user_domain,
    });
    if (bank) {
      const details = await bankDetailServiceInstance.find({
        bkd_bank: bank.bk_code,
        bkd_module: 'AR',
        bkd_domain: user_domain,
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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  logger.debug('Calling find by  all bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const bank = await bankServiceInstance.findOne({
      ...req.body,
      bk_domain: user_domain,
    });
    if (bank) {
      const details = await bankDetailServiceInstance.find({
        bkd_bank: bank.bk_code,
        bkd_module: 'AP',
        bkd_domain: user_domain,
      });
console.log(bank, details)
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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
   
    const bank = await bankServiceInstance.findOne({
      ...req.body,
      bk_domain: user_domain,
    });
    
    if (bank) {
      const details = await bankDetailServiceInstance.find({
        bkd_bank: bank.bk_code,
        bkd_domain: user_domain,
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

const findBankByUser = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const bankDetailServiceInstance = Container.get(BankDetailService);
   console.log(req.body)
    const bank = await bankServiceInstance.findOne({
      bk_user1: {
        [Op.substring]: req.body.user // LIKE '%apple_shake%'
      },
      bk_domain: user_domain,
    });
    
    if (bank) {
      const details = await bankDetailServiceInstance.find({
        bkd_bank: bank.bk_code,
        bkd_domain: user_domain,
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

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
   
   
    const bank = await bankServiceInstance.find({
      ...req.body,
      bk_domain: user_domain,
    });
   
    
      return res.status(200).json({
        message: 'fetched succesfully',
        data:  bank ,
      });
   
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find one  bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const { id } = req.params;
    const bank = await bankServiceInstance.findOne({ id });
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const details = await bankDetailServiceInstance.find({
      bkd_bank: bank.bk_code,
      bkd_domain: user_domain,
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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find all bank endpoint');
  try {
    const bankServiceInstance = Container.get(BankService);
    const banks = await bankServiceInstance.find({ bk_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: banks });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find all bank endpoint');
  try {
    
    const bankDetailServiceInstance = Container.get(BankDetailService);
    const details = await bankDetailServiceInstance.find({ ...req.body, bkd_domain: user_domain });
    
    return res.status(200).json({ message: 'fetched succesfully', data: details });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBkByUser = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find all bank endpoint');
  try {
   
    const bankServiceInstance = Container.get(BankService);
    const details = await bankServiceInstance.find({ ...req.body, bk_domain: user_domain });
    
    return res.status(200).json({ message: 'fetched succesfully', data: details });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
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
    await bankDetailServiceInstance.delete({ bkd_bank: bank.bk_code, bkd_domain: user_domain });
    for (let entry of details) {
      entry = {
        ...entry,
        bkd_bank: bank.bk_code,
        bkd_domain: user_domain,
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
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all order endpoint');

  const bkhServiceInstance = Container.get(BkhService);

  if (req.body.site != '*') {
    try {
      const orders = await bkhServiceInstance.findq({
        where: {
          bkh_effdate: { [Op.between]: [req.body.date, req.body.date1] },
          bkh_site: req.body.site,
          bkh_domain: user_domain,
        },
        order: [['id', 'ASC']],
      });

      let result = [];
      var i = 1;
      for (let ord of orders) {
        // const effdate = new Date(ord.bkh_effdate);
        // const groups = await codeServiceInstance.findOne({ code_fldname: 'pt_group', code_value: items.pt_group });
        // const promos = await codeServiceInstance.findOne({ code_fldname: 'pt_promo', code_value: items.pt_promo });
      
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
   
      
      const orders = await bkhServiceInstance.findq({
        where: {
          bkh_effdate: { [Op.between]: [req.body.date, req.body.date1] },
          bkh_domain: user_domain,
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
  }
};

const bkhP = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const bkhServiceInstance = Container.get(BkhService);
    const bankServiceInstance = Container.get(BankService);
    const serviceMobileServiceInstance = Container.get(serviceMobile);
    const decompteService = Container.get(DecompteService)
   
    const banks = await bankServiceInstance.findOne({ bk_code: req.body.bank,  bk_domain: user_domain });
    const bk = await bkhServiceInstance.create({
      bkh_domain: user_domain,
      bkh_effdate: req.body.effdate,
      bkh_date: req.body.date,
      bkh_num_doc : req.body.service_code,
      bkh_addr : req.body.addr,
      chr01: req.body.role,
      bkh_bank: req.body.bank,
      bkh_type: 'P',
      bkh_balance: banks.bk_balance,
      bkh_amt: req.body.amt_tr,
      bkh_site: req.body.site,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

    const decompte = await decompteService.create({dec_code:req.body.service_code,dec_role:req.body.role,dec_desc:"Versement",dec_amt:req.body.amt_tr,dec_type:"P",dec_effdate:new Date(),dec_domain:user_domain,
    created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin, });
    await bankServiceInstance.update(
      {
        bk_balance: Number(banks.bk_balance) + Number(req.body.amt_tr),
       
      },
      {id: banks.id},
    );
    const service = await serviceMobileServiceInstance.findOne({ service_code: req.body.service_code });
   
    await serviceMobileServiceInstance.update(
      {
        sum_versement:  Number(req.body.amt_tr),
        service_versement_open: false
      },
      {id: service.id},
    );
    return res.status(201).json({ message: 'created succesfully', data: bk });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const bkhPDet = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const bkhServiceInstance = Container.get(BkhService);
    const bankServiceInstance = Container.get(BankService);
    const serviceMobileServiceInstance = Container.get(serviceMobile);
    const decompteService = Container.get(DecompteService)
    const  roleServiceInstance = Container.get(RoleService)
    const sequenceServiceInstance = Container.get(SequenceService)
    const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'AR', seq_type: 'AR' });
        let nbr = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
    await sequenceServiceInstance.update(
      { seq_curr_val: Number(seq.seq_curr_val) + 1 },
      { id: seq.id, seq_type: 'AR', seq_seq: 'AR', seq_domain: user_domain },
    );
    const banks = await bankServiceInstance.findOne({ bk_code: req.body.bank,  bk_domain: user_domain });
    const bk = await bkhServiceInstance.create({
      bkh_domain: user_domain,
      bkh_effdate: req.body.effdate,
      bkh_date: req.body.date,
      bkh_code: nbr,
      bkh_num_doc : req.body.service_code,
      bkh_addr : req.body.addr,
      chr01: req.body.role,
      bkh_bank: req.body.bank,
      bkh_type: 'P',
      bkh_balance: Number(banks.bk_balance),
      bkh_amt: req.body.amt_tr,
      bkh_site: req.body.site,
      bkh_2000: req.body.bkh_2000,
      bkh_1000: req.body.bkh_1000,
      bkh_0500: req.body.bkh_0500,
      bkh_0200: req.body.bkh_0200,
      bkh_p200: req.body.bkh_p200,
      bkh_p100: req.body.bkh_p100,
      bkh_p050: req.body.bkh_p050,
      bkh_p020: req.body.bkh_p020,
      bkh_p010: req.body.bkh_p010,
      bkh_p005: req.body.bkh_p005,
      bkh_bon:  req.body.bkh_bon,
      bkh_rmks: req.body.bkh_rmks, 
      bkh_terms: req.body.bkh_terms,
      bkh_cheque: req.body.bkh_cheque,
      
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

    const decompte = await decompteService.create({dec_code:nbr,dec_role:req.body.role,dec_desc:"Versement",dec_amt:req.body.amt_tr,dec_type:"P",dec_effdate:new Date(),dec_domain:user_domain,
    created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin, });
    
            const role = await roleServiceInstance.findOne({ role_code: req.body.role});
  
            await roleServiceInstance.updated(   {solde: role.solde - Number(req.body.amt_tr)},{role_code:req.body.role})      
    await bankServiceInstance.update(
      {
        bk_balance: Number(banks.bk_balance) + Number(req.body.amt_tr),
        bk_2000: Number(banks.bk_2000) + Number(req.body.bkh_2000),
        bk_1000: Number(banks.bk_1000) + Number(req.body.bkh_1000),
        bk_0500: Number(banks.bk_0500) + Number(req.body.bkh_0500),
        bk_0200: Number(banks.bk_0200) + Number(req.body.bkh_0200),
        bk_p200: Number(banks.bk_p200) + Number(req.body.bkh_p200),
        bk_p100: Number(banks.bk_p100) + Number(req.body.bkh_p100),
        bk_p050: Number(banks.bk_p050) + Number(req.body.bkh_p050),
        bk_p020: Number(banks.bk_p020) + Number(req.body.bkh_p020),
        bk_p010: Number(banks.bk_p010) + Number(req.body.bkh_p010),
        bk_p005: Number(banks.bk_p005) + Number(req.body.bkh_p005),
        bk_bon:  Number(banks.bk_bon)  + Number(req.body.bkh_bon),
        bk_cheque:  Number(banks.bk_cheque)  + Number(req.body.bkh_cheque),
      },
      {id: banks.id},
    );
    if(req.body.service_code != null) {
    const service = await serviceMobileServiceInstance.findOne({ service_code: req.body.service_code });
   
    await serviceMobileServiceInstance.update(
      {
        sum_versement:  Number(req.body.amt_tr),
        service_versement_open: false
      },
      {id: service.id},
    );
    }
    return res.status(201).json({ message: 'created succesfully', data: nbr });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const bkhTrC = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const bkhServiceInstance = Container.get(BkhService);
    const bankServiceInstance = Container.get(BankService);
    
  
    const banks = await bankServiceInstance.findOne({ bk_code: req.body.bank,  bk_domain: user_domain });
    const bk = await bkhServiceInstance.create({
      bkh_domain: user_domain,
      bkh_effdate: req.body.effdate,
      bkh_date: req.body.date,
      bkh_num_doc : req.body.service_code,
      bkh_addr : req.body.addr,
      chr01: req.body.role,
      bkh_bank: req.body.bank,
      chr02: req.body.bank_dest,
      bkh_type: 'ISS',
      bkh_balance: banks.bk_balance,
      bkh_amt: - Number(req.body.amt_tr),
      bkh_site: req.body.site,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

   
    await bankServiceInstance.update(
      {
        bk_balance: Number(banks.bk_balance) - Number(req.body.amt_tr),
       
      },
      {id: banks.id},
    );
    const bankdets = await bankServiceInstance.findOne({ bk_code: req.body.bank_dest,  bk_domain: user_domain });
    
    const bkd = await bkhServiceInstance.create({
      bkh_domain: user_domain,
      bkh_effdate: req.body.effdate,
      bkh_date: req.body.date,
      bkh_num_doc : req.body.service_code,
      bkh_addr : req.body.addr,
      chr01: req.body.role,
      bkh_bank: req.body.bank_dest,
      chr02: req.body.bank,
      bkh_type: 'RCT',
      bkh_balance: bankdets.bk_balance,
      bkh_amt:  Number(req.body.amt_tr),
      bkh_site: req.body.site,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

    await bankServiceInstance.update(
      {
        bk_balance: Number(bankdets.bk_balance) + Number(req.body.amt_tr),
      },
      {id: bankdets.id},
    );

    return res.status(201).json({ message: 'created succesfully', data: bk });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const bkhTrCDet = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    const bkhServiceInstance = Container.get(BkhService);
    const bankServiceInstance = Container.get(BankService);
    const sequenceServiceInstance = Container.get(SequenceService)
    const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'AR', seq_type: 'AR' });
        let nbr = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
    await sequenceServiceInstance.update(
      { seq_curr_val: Number(seq.seq_curr_val) + 1 },
      { id: seq.id, seq_type: 'AR', seq_seq: 'AR', seq_domain: user_domain },
    );
  
    const banks = await bankServiceInstance.findOne({ bk_code: req.body.bank,  bk_domain: user_domain });
    const bk = await bkhServiceInstance.create({
      bkh_domain: user_domain,
      bkh_code: nbr,
      bkh_effdate: req.body.effdate,
      bkh_date: req.body.date,
      bkh_num_doc : req.body.service_code,
      bkh_addr : req.body.addr,
      chr01: req.body.role,
      bkh_bank: req.body.bank,
      chr02: req.body.bank_dest,
      chr03: req.body.chr03,
      bkh_type: 'ISS',
      bkh_balance: banks.bk_balance,
      bkh_amt: - Number(req.body.amt_tr),
      bkh_site: req.body.site,
      bkh_2000: req.body.bkh_2000,
      bkh_1000: req.body.bkh_1000,
      bkh_0500: req.body.bkh_0500,
      bkh_0200: req.body.bkh_0200,
      bkh_p200: req.body.bkh_p200,
      bkh_p100: req.body.bkh_p100,
      bkh_p050: req.body.bkh_p050,
      bkh_p020: req.body.bkh_p020,
      bkh_p010: req.body.bkh_p010,
      bkh_p005: req.body.bkh_p005,
      bkh_bon:  req.body.bkh_bon,
      bkh_cheque: req.body.bkh_cheque,
      
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

   
    await bankServiceInstance.update(
      {
        bk_balance: Number(banks.bk_balance) - Number(req.body.amt_tr),
        bk_2000: Number(banks.bk_2000) - Number(req.body.bkh_2000),
        bk_1000: Number(banks.bk_1000) - Number(req.body.bkh_1000),
        bk_0500: Number(banks.bk_0500) - Number(req.body.bkh_0500),
        bk_0200: Number(banks.bk_0200) - Number(req.body.bkh_0200),
        bk_p200: Number(banks.bk_p200) - Number(req.body.bkh_p200),
        bk_p100: Number(banks.bk_p100) - Number(req.body.bkh_p100),
        bk_p050: Number(banks.bk_p050) - Number(req.body.bkh_p050),
        bk_p020: Number(banks.bk_p020) - Number(req.body.bkh_p020),
        bk_p010: Number(banks.bk_p010) - Number(req.body.bkh_p010),
        bk_p005: Number(banks.bk_p005) - Number(req.body.bkh_p005),
        bk_bon:  Number(banks.bk_bon)  - Number(req.body.bkh_bon),
        bk_cheque: Number(banks.bk_cheque)  - Number(req.body.bk_cheque),
       
      },
      {id: banks.id},
    );
    const bankdets = await bankServiceInstance.findOne({ bk_code: req.body.bank_dest,  bk_domain: user_domain });
    
    const bkd = await bkhServiceInstance.create({
      bkh_domain: user_domain,
      bkh_code: nbr,
      bkh_effdate: req.body.effdate,
      bkh_date: req.body.date,
      bkh_num_doc : req.body.service_code,
      bkh_addr : req.body.addr,
      chr01: req.body.role,
      bkh_bank: req.body.bank_dest,
      chr02: req.body.bank,
      chr03: req.body.chr03,
      bkh_type: 'RCT',
      bkh_balance: bankdets.bk_balance,
      bkh_amt:  Number(req.body.amt_tr),
      bkh_site: req.body.site,
      bkh_2000: req.body.bkh_2000,
      bkh_1000: req.body.bkh_1000,
      bkh_0500: req.body.bkh_0500,
      bkh_0200: req.body.bkh_0200,
      bkh_p200: req.body.bkh_p200,
      bkh_p100: req.body.bkh_p100,
      bkh_p050: req.body.bkh_p050,
      bkh_p020: req.body.bkh_p020,
      bkh_p010: req.body.bkh_p010,
      bkh_p005: req.body.bkh_p005,
      bkh_bon:  req.body.bkh_bon,
      bkh_cheque: req.body.bkh_cheque,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

    await bankServiceInstance.update(
      {
        bk_balance: Number(bankdets.bk_balance) + Number(req.body.amt_tr),
        bk_2000: Number(bankdets.bk_2000) + Number(req.body.bkh_2000),
        bk_1000: Number(bankdets.bk_1000) + Number(req.body.bkh_1000),
        bk_0500: Number(bankdets.bk_0500) + Number(req.body.bkh_0500),
        bk_0200: Number(bankdets.bk_0200) + Number(req.body.bkh_0200),
        bk_p200: Number(bankdets.bk_p200) + Number(req.body.bkh_p200),
        bk_p100: Number(bankdets.bk_p100) + Number(req.body.bkh_p100),
        bk_p050: Number(bankdets.bk_p050) + Number(req.body.bkh_p050),
        bk_p020: Number(bankdets.bk_p020) + Number(req.body.bkh_p020),
        bk_p010: Number(bankdets.bk_p010) + Number(req.body.bkh_p010),
        bk_p005: Number(bankdets.bk_p005) + Number(req.body.bkh_p005),
        bk_bon:  Number(bankdets.bk_bon)  + Number(req.body.bkh_bon),
        bk_cheque:  Number(bankdets.bk_cheque)  + Number(req.body.bkh_cheque),
      },
      {id: bankdets.id},
    );

    return res.status(201).json({ message: 'created succesfully', data: nbr });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBKHBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all bank endpoint');
  try {

    const bkhServiceInstance = Container.get(BkhService);
   
   
    const bkhs = await bkhServiceInstance.find({
      ...req.body,
      bkh_domain: user_domain,
    });
    
      return res.status(200).json({
        message: 'fetched succesfully',
        data:  bkhs ,
      });
   
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBKHTRBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all bank endpoint');
  try {

    const bkhServiceInstance = Container.get(BkhService);
   
   
    const bkhs = await bkhServiceInstance.findbetween({
      where: { bkh_effdate: { [Op.between]: [req.body.date, req.body.date1]}, bkh_type :'P',bkh_domain: user_domain,},
      
    });
    
      return res.status(200).json({
        message: 'fetched succesfully',
        data:  bkhs ,
      });
   
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBKHGrpTRBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all bank endpoint');
  try {
console.log(req.body)
    const bkhServiceInstance = Container.get(BkhService);
   
   
    const bkhs = await bkhServiceInstance.findbetween({
      where: { bkh_bank:req.body.bank,bkh_type:'P',bkh_effdate: { [Op.between]: [req.body.date, req.body.date1]}, bkh_domain: user_domain},
      attributes: 
      ['bkh_effdate', [Sequelize.fn('sum', Sequelize.col('bkh_amt')), 'bkh_amt' ],
      [Sequelize.fn('sum', Sequelize.col('bkh_2000')), 'bkh_2000'],
      [Sequelize.fn('sum', Sequelize.col('bkh_1000')), 'bkh_1000'],
      [Sequelize.fn('sum', Sequelize.col('bkh_0500')), 'bkh_0500'],
      [Sequelize.fn('sum', Sequelize.col('bkh_0200')), 'bkh_0200'],
      [Sequelize.fn('sum', Sequelize.col('bkh_p200')), 'bkh_p200'],
      [Sequelize.fn('sum', Sequelize.col('bkh_p100')), 'bkh_p100'],
      [Sequelize.fn('sum', Sequelize.col('bkh_p050')), 'bkh_p050'],
      [Sequelize.fn('sum', Sequelize.col('bkh_p020')), 'bkh_p020'],
      [Sequelize.fn('sum', Sequelize.col('bkh_p010')), 'bkh_p010'],
      [Sequelize.fn('sum', Sequelize.col('bkh_p005')), 'bkh_p005'],
      [Sequelize.fn('sum', Sequelize.col('bkh_bon')), 'bkh_bon'],
      [Sequelize.fn('sum', Sequelize.col('bkh_cheque')), 'bkh_cheque'],
      [Sequelize.literal('0'), 'id']
    ],
      group: ['bkh_effdate'],
      raw: true,
      order: [
        ['bkh_effdate', 'ASC'],
        
      ],
         });
         console.log(bkhs)
let i=1
         for (let bk of bkhs) {
          bk.id = i
          i++
         }
      return res.status(200).json({
        message: 'fetched succesfully',
        data:  bkhs ,
      });
   
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBKHTR = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all bank endpoint');
  try {

    const bkhServiceInstance = Container.get(BkhService);
   //console.log(req.body)
   
    const bkhs = await bkhServiceInstance.findbetween({
      where: { bkh_bank: req.body.bank,bkh_effdate: { [Op.between]: [req.body.date, req.body.date1]}, bkh_domain: user_domain},
      order: [
        ['id', 'ASC'],
        
      ],
         });
    //console.log(bkhs)
      return res.status(200).json({
        message: 'fetched succesfully',
        data:  bkhs ,
      });
   
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findTransfertBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find all bank endpoint');
  try {
    const bkhServiceInstance = Container.get(BkhService);
   
   
    const bkhs = await bkhServiceInstance.find({
     
      bkh_type: ['ISS','RCT'],
      bkh_domain: user_domain,
      
    });
    
    return res.status(200).json({ message: 'fetched succesfully', data: bkhs });
    
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBKHRCTBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all bank endpoint');
  try {

    const bkhServiceInstance = Container.get(BkhService);
   
   
    const bkhs = await bkhServiceInstance.findbetween({
      where: { bkh_effdate: { [Op.between]: [req.body.date, req.body.date1]}, bkh_type :'RCT'},
      bkh_domain: user_domain,
    });
    
      return res.status(200).json({
        message: 'fetched succesfully',
        data:  bkhs ,
      });
   
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBKHTRGRP = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all bank endpoint');
  try {

    const bkhServiceInstance = Container.get(BkhService);
   //console.log(req.body)
   
    const bkhs = await bkhServiceInstance.findbetween({
      where: { bkh_type:'P',bkh_effdate: { [Op.between]: [req.body.date, req.body.date1]}, bkh_domain: user_domain},
      attributes: 
      ['chr01', [Sequelize.fn('sum', Sequelize.col('bkh_amt')), 'Montant' ]],
      group: ['chr01','bkh_terms'],
      raw: true,
      order: [
        ['chr01', 'ASC'],
        
      ],
         });
      
         const cheques = await bkhServiceInstance.findbetween({
          where: { bkh_type:'P',bkh_terms:'CODPM3',bkh_effdate: { [Op.between]: [req.body.date, req.body.date1]}, bkh_domain: user_domain},
          attributes: 
          [ [Sequelize.fn('sum', Sequelize.col('bkh_amt')), 'cheque' ]],
          raw: true,
         
             });
         const dep = await bkhServiceInstance.findbetween({
          where: { bkh_type:'ISS', bkh_code:{[Op.like]:'DP%'},bkh_effdate: { [Op.between]: [req.body.date, req.body.date1]}, bkh_domain: user_domain},
          attributes: 
          [ [Sequelize.fn('sum', Sequelize.col('bkh_amt')), 'Montant' ]],
         
          raw: true,
         
             });    
         
    //          if(dep.length !=0) {
    // bkhs.push({chr01:"Dépense",Montant:dep[0].Montant})} 
    // else {bkhs.push({chr01:"Dépense",Montant:0})}
    let cheque = 0
    let depence = 0
    if (cheques[0].cheque !=0) {cheque = Number(cheques[0].cheque)}
    if (dep[0].Montant !=0) {depence = Number(-dep[0].Montant)}
    console.log(bkhs)
    console.log(cheques)
    console.log(dep[0].Montant)
      return res.status(200).json({
        message: 'fetched succesfully',
        data:  {bkhs,depence,cheque} ,
      });
   
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const bkhCautionDet = async (req: Request, res: Response, next: NextFunction) => {
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const logger = Container.get('logger');
  logger.debug('Calling Create sequence endpoint');
  try {
    console.log("hhhhhhhhhhhhhhhhhhh")
    const bkhServiceInstance = Container.get(BkhService);
    const bankServiceInstance = Container.get(BankService);
   
    const sequenceServiceInstance = Container.get(SequenceService)
    const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'AR', seq_type: 'AR' });
        let nbr = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
    await sequenceServiceInstance.update(
      { seq_curr_val: Number(seq.seq_curr_val) + 1 },
      { id: seq.id, seq_type: 'AR', seq_seq: 'AR', seq_domain: user_domain },
    );
    const banks = await bankServiceInstance.findOne({ bk_code: req.body.bank,  bk_domain: user_domain });
    const bk = await bkhServiceInstance.create({
      bkh_domain: user_domain,
      bkh_effdate: req.body.effdate,
      bkh_date: req.body.date,
      bkh_code: nbr,
      // bkh_num_doc : req.body.service_code,
      bkh_addr : req.body.addr,
      chr01: req.body.role,
      bkh_bank: req.body.bank,
      bkh_type: 'P',
      bkh_balance: Number(banks.bk_balance),
      bkh_amt: req.body.amt_tr,
      bkh_site: req.body.site,
      chr02: req.body.chr02,
      int01 : req.body.int01,

      bkh_rmks: req.body.bkh_rmks, 
      bkh_terms: req.body.bkh_terms,
      bkh_cheque: req.body.bkh_cheque,
      
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

    await bankServiceInstance.update(
      {
        bk_balance: Number(banks.bk_balance) + Number(req.body.amt_tr),
      },
      {id: banks.id},
    );
    return res.status(201).json({ message: 'created succesfully', data: nbr });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  findBy,
  findBankByUser,
  findByAll,
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
  bkhP,
  bkhPDet,
  bkhCautionDet,
  bkhTrC,
  bkhTrCDet,
  findBKHBy,
  findBKHTRBy,
  findTransfertBy,
  findBKHRCTBy,
  findBKHTR,
  findBKHTRGRP, 
  findBKHGrpTRBy

};
