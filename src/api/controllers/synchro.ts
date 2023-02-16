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
import ProvidersSercice from '../../services/provider';
import sequenceService from '../../services/sequence';
import posCategoriesService from '../../services/pos-categories';
/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';
import RoleService from '../../services/role';
import InventoryStatus from '../../models/inventory-status';
import InventoryStatusDetails from '../../models/inventory-status-details';
import inventoryStatusService from '../../services/inventory-status';
import inventoryStatusDetailService from '../../services/inventory-status-details';
const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'admin',
  host: '146.59.157.107',
  database: 'abraa',
  password: 'admin',
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
    const vendServiceInstance = Container.get(ProvidersSercice);
    const seQserviceInstance = Container.get(sequenceService);
    const categoriesServiceInstance = Container.get(posCategoriesService);
    const roleServiceInstance = Container.get(RoleService);
    const isServiceInstance = Container.get(inventoryStatusService);
    const isdServiceInstance = Container.get(inventoryStatusDetailService);
    var s = process.env.site;
    const conn = await pool.connect();
    if (conn._connected) {
      //   console.log(conn._connected);
      //   console.log('server connected');
      const site = await pool.query('SELECT * FROM si_mstr');
      const loc = await pool.query('SELECT * FROM loc_mstr');
      const profile = await pool.query('SELECT * FROM usrg_mstr');
      const items = await pool.query('SELECT * FROM pt_mstr');
      const bom = await pool.query('SELECT * FROM bom_mstr');
      const bompart = await pool.query('SELECT * FROM ptb_det');
      const ps = await pool.query('SELECT * FROM ps_mstr');
      const codes = await pool.query('SELECT * FROM code_mstr');
      const customers = await pool.query('SELECT * FROM cm_mstr');
      const addresses = await pool.query('SELECT * FROM ad_mstr');
      const sct = await pool.query('SELECT * FROM sct_det');
      const bk = await pool.query('SELECT * FROM bk_mstr');
      const users = await pool.query('SELECT * FROM usrd_det');
      const roles = await pool.query('SELECT * FROM aa_role');
      const emps = await pool.query('SELECT * FROM emp_mstr WHERE emp_site=' + "'" + s + "'" + '');
      const vend = await pool.query('SELECT * FROM vd_mstr');
      const seqs = await pool.query('SELECT * FROM seq_mstr');
      const categorie = await pool.query('SELECT * FROM bb_pos_category');
      const is = await pool.query('SELECT * FROM is_mstr');
      const isd = await pool.query('SELECT * FROM isd_det');

      //   const profiles = profile.rows;
      //   await profileServiceInstance.upsert({
      //     profiles,
      //   });

      //   const us = users.rows;
      //   await userServiceInstance.upsert({
      //     us,
      //   });

      //   const ro = roles.rows;
      //   await roleServiceInstance.upsert({
      //     ro,
      //   });

      //   const categories = categorie.rows;
      //   await categoriesServiceInstance.upsert({
      //     categories,
      //   });

      //   const sites = site.rows;
      //   await siteServiceInstance.upsert({
      //     sites,
      //   });

      //   const locs = loc.rows;
      //   await locServiceInstance.upsert({
      //     locs,
      //   });

      //   // const sequences = seqs.rows;
      //   // await seQserviceInstance.upsert({
      //   //   sequences,
      //   // });

      //   console.log('site', s);
      //   const it = items.rows;
      //   await itemServiceInstance.upsert({
      //     it,
      //     pt_site: s,
      //     pt_loc: s == '0901' ? 'MGM0010' : s,
      //   });

      //   const boms = bom.rows;
      //   await bomServiceInstance.upsert({
      //     boms,
      //   });

      //   const pss = ps.rows;
      //   await psServiceInstance.upsert({
      //     pss,
      //   });

      //   const booo = bompart.rows;
      //   await bomPartServiceInstance.upsert({
      //     booo,
      //   });

      //   const code = codes.rows;

      //   await codeServiceInstance.upsert({
      //     code,
      //   });

      //   const iss = is.rows;

      //   await isServiceInstance.upsert({
      //     iss,
      //   });

      //   const isdd = isd.rows;

      //   await isdServiceInstance.upsert({
      //     isdd,
      //   });

      //   const add = addresses.rows;

      //   await addresseServiceInstance.upsert({
      //     add,
      //   });

      //   const custs = customers.rows;

      //   await customerServiceInstance.upsert({
      //     custs,
      //   });

      //   const scts = sct.rows;

      //   await sctServiceInstance.upsert({
      //     scts,
      //   });

      //   const bks = bk.rows;

      //   await bkServiceInstance.upsert({
      //     bks,
      //   });

      //   const empss = emps.rows;

      //   await empServiceInstance.upsert({
      //     empss,
      //   });

      //   const vends = vend.rows;

      //   await vendServiceInstance.upsert({
      //     vends,
      //   });
      // } else {
      //   console.log(conn._connected);
      //   console.log('server not connected');
    }

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
