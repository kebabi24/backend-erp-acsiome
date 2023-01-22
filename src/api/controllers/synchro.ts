import { DATE, Op } from 'sequelize';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import SiteService from '../../services/site';
import LocationService from '../../services/location';
import ProfileService from '../../services/profile';
import ItemService from '../../services/item';
import BomService from '../../services/bom';
import psService from '../../services/ps';
import codeService from '../../services/code';
import customersSercice from '../../services/customer';
import addressService from '../../services/address';
import costSimulationService from '../../services/cost-simulation';
import bomPartService from '../../services/bom-part';
import banksSercice from '../../services/bank';
import UserService from '../../services/user';
import employeService from '../../services/employe';
const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: '192.99.34.138',
  database: 'abracadabraa',
  password: 'postgres',
  port: 5432,
});
const synchro = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  console.log(user_code);
  logger.debug('Calling Create sequence endpoint');
  try {
    const siteServiceInstance = Container.get(SiteService);
    const locServiceInstance = Container.get(LocationService);
    const profileServiceInstance = Container.get(ProfileService);
    const itemServiceInstance = Container.get(ItemService);
    const bomServiceInstance = Container.get(BomService);
    const bomPartServiceInstance = Container.get(bomPartService);
    const psServiceInstance = Container.get(psService);
    const codeServiceInstance = Container.get(codeService);
    const customerServiceInstance = Container.get(customersSercice);
    const addresseServiceInstance = Container.get(addressService);
    const sctServiceInstance = Container.get(costSimulationService);
    const bkServiceInstance = Container.get(banksSercice);
    const userServiceInstance = Container.get(UserService);
    const empServiceInstance = Container.get(employeService);

    const conn = await pool.connect();
    // if (conn._connected) {
    //   //   console.log(conn._connected);
    //   //   console.log('server connected');
    //   const site = await pool.query('SELECT * FROM si_mstr');
    //   const loc = await pool.query('SELECT * FROM loc_mstr');
    //   const profile = await pool.query('SELECT * FROM usrg_mstr');
    //   const items = await pool.query('SELECT * FROM pt_mstr');
    //   const bom = await pool.query('SELECT * FROM bom_mstr');
    //   const bompart = await pool.query('SELECT * FROM ptb_det');
    //   const ps = await pool.query('SELECT * FROM ps_mstr');
    //   const codes = await pool.query('SELECT * FROM code_mstr');
    //   const customers = await pool.query('SELECT * FROM cm_mstr');
    //   const addresses = await pool.query('SELECT * FROM ad_mstr');
    //   const sct = await pool.query('SELECT * FROM sct_det');
    //   const bk = await pool.query('SELECT * FROM bk_mstr');
    //   const userss = await userServiceInstance.findOne({ usrd_code: user_code });
    //   console.log(userss);
    //   const usrd_site = userss.usrd_site;
    //   const users = await pool.query('SELECT * FROM usrd_det WHERE usrd_site=' + "'" + usrd_site + "'" + '');
    //   const emps = await pool.query('SELECT * FROM emp_mstr WHERE emp_site=' + "'" + usrd_site + "'" + '');
    //   for (const si of site.rows) {
    //     await siteServiceInstance.upsert({
    //       si,
    //     });
    //   }
    //   for (const lc of loc.rows) {
    //     await locServiceInstance.upsert({
    //       lc,
    //     });
    //   }
    //   for (const pr of profile.rows) {
    //     await profileServiceInstance.upsert({
    //       pr,
    //     });
    //   }
    //   for (const it of items.rows) {
    //     await itemServiceInstance.upsert({
    //       it,
    //     });
    //   }
    //   for (const bm of bom.rows) {
    //     await bomServiceInstance.upsert({
    //       bm,
    //     });
    //   }
    //   for (const bm of bom.rows) {
    //     await bomServiceInstance.upsert({
    //       bm,
    //     });
    //   }
    //   for (const pss of ps.rows) {
    //     await psServiceInstance.upsert({
    //       pss,
    //     });
    //   }
    //   for (const ptb of bompart.rows) {
    //     await bomPartServiceInstance.upsert({
    //       ptb,
    //     });
    //   }
    //   for (const code of codes.rows) {
    //     await codeServiceInstance.upsert({
    //       code,
    //     });
    //   }
    //   for (const addresse of addresses.rows) {
    //     await addresseServiceInstance.upsert({
    //       addresse,
    //     });
    //   }
    //   for (const customer of customers.rows) {
    //     await customerServiceInstance.upsert({
    //       customer,
    //     });
    //   }
    //   for (const sc of sct.rows) {
    //     await sctServiceInstance.upsert({
    //       sc,
    //     });
    //   }
    //   for (const bank of bk.rows) {
    //     await bkServiceInstance.upsert({
    //       bank,
    //     });
    //   }
    //   for (const user of users.rows) {
    //     await userServiceInstance.upsert({
    //       user,
    //     });
    //   }
    //   for (const emp of emps.rows) {
    //     await empServiceInstance.upsert({
    //       emp,
    //     });
    //   }
    // } else {
    //   console.log(conn._connected);
    //   console.log('server not connected');
    // }

    const result = true;

    return res.status(201).json({ message: 'created succesfully', data: result });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  synchro,
};
