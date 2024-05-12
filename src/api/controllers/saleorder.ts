import CustomerService from '../../services/customer';
import SaleOrderService from '../../services/saleorder';
import SaleOrderDetailService from '../../services/saleorder-detail';
import SaleShiperService from '../../services/sale-shiper';
import InvoiceOrderService from '../../services/invoice-order';
import AccountReceivableService from '../../services/account-receivable';
import accountShiperService from '../../services/account-shiper';
import costSimulationService from '../../services/cost-simulation';
import AddressService from '../../services/address';
import itemService from '../../services/item';
import locationDetailService from '../../services/location-details';
import inventoryTransactionService from '../../services/inventory-transaction';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { QueryTypes } from 'sequelize';
import { DATE, Op, Sequelize } from 'sequelize';

import { generatePdf } from '../../reporting/generator';
import ItemService from '../../services/item';
import LocationDetail from '../../models/location-detail';
import workOrderService from '../../services/work-order';
import { isNull } from 'lodash';
import WorkRouting from '../../models/workrouting';
import workroutingService from '../../services/workrouting';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create sequence endpoint');

  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService);
    
    const { saleOrder, saleOrderDetail } = req.body;
    
    const so = await saleOrderServiceInstance.create({
      ...saleOrder,
      so_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

    //console.log(saleOrderDetail)
    for (let entry of saleOrderDetail) {
      entry = {
        ...entry,
        sod_domain: user_domain,
        sod_nbr: so.so_nbr,
        sod_due_date : saleOrder.so_due_date,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await saleOrderDetailServiceInstance.create(entry);
    }
    // const addressServiceInstance = Container.get(AddressService);
    // console.log(saleOrder.so_cust)
    //  const addr = await addressServiceInstance.findOne({ ad_domain: user_domain, ad_addr: saleOrder.so_cust });

    // const pdfData = {
    //   so: so,
    //   sod: saleOrderDetail,
    //    adr: addr,
    // };

    // console.log('pdfData', pdfData);

    // let pdf = await generatePdf(pdfData, 'so');

    return res.status(201).json({ message: 'created succesfully', data: so/*, pdf: pdf.content*/ });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const createdirect = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService);
    const costSimulationServiceInstance = Container.get(costSimulationService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const inventoryTransactionServiceInstance = Container.get(inventoryTransactionService);
    const itemServiceInstance = Container.get(itemService);
    const { saleOrder, saleOrderDetail } = req.body;
    const so = await saleOrderServiceInstance.create({
      ...saleOrder,
      so_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    for (let entry of saleOrderDetail) {
      entry = {
        ...entry,
        sod_domain: user_domain,
        sod_nbr: so.so_nbr,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await saleOrderDetailServiceInstance.create(entry);
    }

    /*kamel*/
    console.log(so.so_nbr);
    for (const item of saleOrderDetail) {
      const { ...remain } = item;
      console.log(remain);
      const sctdet = await costSimulationServiceInstance.findOne({
        sct_domain: user_domain,
        sct_part: remain.sod_part,
        sct_site: remain.sod_site,
        sct_sim: 'STD-CG',
      });
      const pt = await itemServiceInstance.findOne({ pt_domain: user_domain, pt_part: remain.sod_part });
      console.log(remain.sod_part, remain.sod_site);

      console.log(remain.qty_oh);
      console.log(sctdet.sct_cst_tot);
      await inventoryTransactionServiceInstance.create({
        tr_domain: user_domain,
        tr_status: remain.sod_status,
        tr_expire: remain.sod_expire,
        tr_line: remain.sod_line,
        tr_part: remain.sod_part,
        tr_prod_line: pt.pt_prod_line,
        tr_qty_loc: -Number(remain.sod_qty_ship),
        tr_um: remain.sod_um,
        tr_um_conv: remain.sod_um_conv,
        tr_ship_type: remain.sod_type,
        tr_price: remain.sod_price,
        tr_site: remain.sod_site,
        tr_loc: remain.sod_loc,
        tr_serial: remain.sod_serial,
        tr_nbr: so.so_nbr,
        tr_lot: null,
        tr_addr: so.so_cust,
        tr_effdate: so.so_ord_date,
        tr_so_job: null,
        tr_curr: so.so_curr,
        tr_ex_rate: so.so_ex_rate,
        tr_ex_rate2: so.so_ex_rate2,
        tr_rmks: so.so_rmks,
        tr_type: 'ISS-SO',
        tr_qty_chg: Number(remain.sod_qty_ord),
        tr_loc_begin: Number(remain.qty_oh),
        tr_gl_amt: Number(remain.sod_qty_ord) * sctdet.sct_cst_tot,
        tr_date: new Date(),
        tr_mtl_std: sctdet.sct_mtl_tl,
        tr_lbr_std: sctdet.sct_lbr_tl,
        tr_bdn_std: sctdet.sct_bdn_tl,
        tr_ovh_std: sctdet.sct_ovh_tl,
        tr_sub_std: sctdet.sct_sub_tl,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });

      if (remain.sod_type != 'M') {
        const ld = await locationDetailServiceInstance.findOne({
          ld_domain: user_domain,
          ld_part: remain.sod_part,
          ld_lot: remain.sod_serial,
          ld_site: remain.sod_site,
          ld_loc: remain.sod_loc,
        });
        if (ld)
          await locationDetailServiceInstance.update(
            {
              ld_qty_oh: Number(ld.ld_qty_oh) - Number(remain.sod_qty_ord) * Number(remain.sod_um_conv),
              ld_expire: remain.sod_expire,
              last_modified_by: user_code,
              last_modified_ip_adr: req.headers.origin,
            },
            { id: ld.id },
          );
        else
          await locationDetailServiceInstance.create({
            ld_domain: user_domain,
            ld_part: remain.sod_part,
            ld_date: new Date(),
            ld_lot: remain.sod_serial,
            ld_site: remain.sod_site,
            ld_loc: remain.sod_loc,
            ld_qty_oh: -(Number(remain.sod_qty_ord) * Number(remain.sod_um_conv)),
            ld_expire: remain.sod_expire,
            ld_status: remain.sod_status,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          });
      }
    }

    /*kamel*/

    return res.status(201).json({ message: 'created succesfully', data: so });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  logger.debug('Calling find by  all purchaseOrder endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService);
    const saleOrder = await saleOrderServiceInstance.findOne({
      ...req.body,
      so_domain: user_domain,
    });
    if (saleOrder) {
      const details = await saleOrderDetailServiceInstance.find({
        sod_domain: user_domain,
        sod_nbr: saleOrder.so_nbr,
      });
      return res.status(200).json({
        message: 'fetched succesfully',
        data: { saleOrder, details },
      });
    } else {
      return res.status(202).json({
        message: 'not FOund',
        data: { saleOrder: null, details: null },
      });
    }
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  saleOrder endpoint');
  const { user_domain } = req.headers;
  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const { id } = req.params;
    const saleOrder = await saleOrderServiceInstance.findOne({ id });
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService);
    const details = await saleOrderDetailServiceInstance.find({
      sod_domain: user_domain,
      sod_nbr: saleOrder.so_nbr,
    });

    return res.status(200).json({
      message: 'fetched succesfully',
      data: { saleOrder, details },
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all requisition endpoint');
  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);

    const sos = await saleOrderServiceInstance.find({ ...req.body, so_domain: user_domain });
    console.log(sos);
    return res.status(202).json({
      message: 'sec',
      data: sos,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByAllSo = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  const { user_domain } = req.headers;

  logger.debug('Calling find by  all requisition endpoint');
  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);

    const sos = await saleOrderServiceInstance.find({ ...req.body, so_domain: user_domain });
    let result = [];
    var i = 1;
    for (let so of sos) {
      var amt = Number(so.so_amt) + Number(so.so_trl1_amt) + Number(so.so_tax_amt);
      result.push({ id: i, soid: so.id, so_nbr: so.so_nbr, so_cust: so.so_cust, amt });
      i = i + 1;
    }
    console.log(result);
    return res.status(202).json({
      message: 'sec',
      data: result,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all purchaseOrder endpoint');
  const { user_domain } = req.headers;

  try {
    let result = [];
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService);
    const sos = await saleOrderServiceInstance.find({ so_domain: user_domain });
    for (const so of sos) {
      const details = await saleOrderDetailServiceInstance.find({
        sod_domain: user_domain,
        sod_nbr: so.so_nbr,
      });
      result.push({ id: so.id, so, details });
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByrange = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  logger.debug('Calling find by  all saleOrder endpoint');
  const { user_domain } = req.headers;

  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService);
    const saleorder = await saleOrderServiceInstance.find({
      so_domain: user_domain,
      so_cust: {
        [Op.between]: [req.body.cm_addr_1, req.body.cm_addr_2],
      },
      so_ord_date: {
        [Op.between]: [req.body.date_1, req.body.date_2],
      },
    });
    console.log('here', saleorder);
    const results_head = [];
    const results_body = [];

    for (const so of saleorder) {
      const details = await saleOrderDetailServiceInstance.find({
        sod_domain: user_domain,
        sod_nbr: so.so_nbr,
        sod_part: {
          [Op.between]: [req.body.pt_part_1, req.body.pt_part_2],
        },
      });
      const result_head = {
        cm_addr_head: so.so_cust,
        cm_sort_head: so.customer.cm_sort,
      };
      for (const sod of details) {
        const result_body = {
          so_nbr: so.so_nbr,
          cm_addr_body: so.so_cust,
          cm_sort_body: so.customer.cm_sort,
          sod_part: sod.sod_part,
          pt_desc1: sod.item.pt_desc1,

          sod_line: sod.sod_line,
          sod_um: sod.sod_um,
          sod_qty_ord: sod.sod_qty_ord,
          sod_price: sod.sod_price,
          sod_qty_ship: sod.sod_qty_ship,
        };
        results_body.push(result_body);
      }
      let bool = false;
      for (var i = 0; i < results_head.length; i++) {
        if (results_head[i].cm_addr_head == so.so_cust) {
          bool = true;
        }
      }
      if (!bool) {
        results_head.push(result_head);
      }
    }
    console.log(results_body);

    return res.status(201).json({ message: 'created succesfully', data: { results_body, results_head } });
    //return res2.status(201).json({ message: 'created succesfully', data: results_body });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const getActivity = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all customer endpoint');
  const { user_domain } = req.headers;

  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const saleShiperServiceInstance = Container.get(SaleShiperService);
    const invoiceOrderServiceInstance = Container.get(InvoiceOrderService);
    const customerServiceInstance = Container.get(CustomerService);
    const accountreceivableServiceInstance = Container.get(AccountReceivableService);
    const accountshiperServiceInstance = Container.get(accountShiperService);
    const customer = await customerServiceInstance.find({
      cm_domain: user_domain,
      cm_addr: { [Op.between]: [req.body.cm_addr_1, req.body.cm_addr_2] },
    });

    const results_head = [];

    for (const cm of customer) {
      const accountreceivable = await accountreceivableServiceInstance.find({
        ar_domain: user_domain,
        ar_cust: cm.cm_addr,
        ar_type: { [Op.eq]: 'p' },
        ar_effdate: { [Op.between]: [req.body.date, new Date()] },
      });

      let paid_amt = 0;
      for (const ar of accountreceivable) {
        paid_amt = paid_amt + Number(ar.ar_amt);
      }
      const accountshiper = await accountshiperServiceInstance.find({
        as_domain: user_domain,
        as_cust: cm.cm_addr,
        as_type: { [Op.eq]: 'p' },
        as_effdate: { [Op.between]: [req.body.date, new Date()] },
      });
      let ship_paid_amt = 0;
      for (const as of accountshiper) {
        ship_paid_amt = ship_paid_amt + Number(as.as_amt);
      }
      const saleorder = await saleOrderServiceInstance.find({
        so_domain: user_domain,
        so_cust: cm.cm_addr,
        so_ord_date: { [Op.between]: [req.body.date_1, req.body.date_2] },
      });
      let ord_amt = 0;
      for (const so of saleorder) {
        ord_amt = ord_amt + Number(so.so_amt);
      }
      const saleshiper = await saleShiperServiceInstance.find({
        psh_domain: user_domain,
        psh_cust: cm.cm_addr,
        psh_ship_date: { [Op.between]: [req.body.date_1, req.body.date_2] },
      });
      let ship_amt = 0;
      for (const psh of saleshiper) {
        ship_amt = ship_amt + Number(psh.psh_qty_ship * psh.psh_um_conv * psh.psh_price);
      }
      const invoice = await invoiceOrderServiceInstance.find({
        ih_domain: user_domain,
        ih_cust: cm.cm_addr,
        ih_inv_date: { [Op.between]: [req.body.date_1, req.body.date_2] },
      });
      let inv_amt = 0;
      for (const ih of invoice) {
        inv_amt = inv_amt + Number(ih.ih_amt);
      }

      const result_head = {
        cm_addr_head: cm.cm_addr,
        cm_sort_head: cm.cm_sort,
        cm_ord_amt: ord_amt,
        cm_ship_amt: ship_amt,
        cm_inv_amt: inv_amt,
        cm_paid_amt: paid_amt,
        cm_ship_paid_amt: ship_paid_amt,
      };
      console.log(result_head);

      results_head.push(result_head);
    }

    return res.status(200).json({ message: 'fetched succesfully', data: results_head });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const getCA = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all customer endpoint');
  const { user_domain } = req.headers;

  try {
    const invoiceOrderServiceInstance = Container.get(InvoiceOrderService);
    const customerServiceInstance = Container.get(CustomerService);

    const customer = await customerServiceInstance.find({
      cm_domain: user_domain,
      cm_addr: { [Op.between]: [req.body.cm_addr_1, req.body.cm_addr_2] },
    });

    const results_head = [];

    for (const cm of customer) {
      const invoice = await invoiceOrderServiceInstance.find({
        ih_domain: user_domain,
        ih_cust: cm.cm_addr,
        ih_inv_date: { [Op.between]: [req.body.date_1, req.body.date_2] },
      });
      let ht_amt = 0;
      let tva_amt = 0;
      let tf_amt = 0;
      let ttc_amt = 0;
      for (const ih of invoice) {
        ht_amt = ht_amt + Number(ih.ih_amt);
        tva_amt = tva_amt + Number(ih.ih_tax_amt);
        tf_amt = tf_amt + Number(ih.ih_trl1_amt);
        ttc_amt = ttc_amt + ht_amt + tva_amt + tf_amt;
      }

      const result_head = {
        cm_addr_head: cm.cm_addr,
        cm_sort_head: cm.cm_sort,
        cm_ht_amt: ht_amt,
        cm_tva_amt: tva_amt,
        cm_tf_amt: tf_amt,
        cm_ttc_amt: ttc_amt,
      };
      console.log(result_head);

      results_head.push(result_head);
    }

    return res.status(200).json({ message: 'fetched succesfully', data: results_head });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  console.log('so sos os osososososososossssssssssssssssssssssssssssssssssssssssssssssssso');
  logger.debug('Calling update one  inventoryStatus endpoint');
  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService);
    const { id } = req.params;
    const { saleOrder, saleOrderDetail } = req.body;
    console.log(id);
    const so = await saleOrderServiceInstance.update(
      { ...saleOrder, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    console.log(saleOrderDetail);
    await saleOrderDetailServiceInstance.delete({ sod_domain: user_domain, sod_nbr: saleOrder.so_nbr });
    for (let entry of saleOrderDetail) {
      entry = {
        ...entry,
        sod_domain: user_domain,
        sod_nbr: saleOrder.so_nbr,
        sod_due_date: saleOrder.so_due_date,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await saleOrderDetailServiceInstance.create(entry);
    }
    return res.status(200).json({ message: 'fetched succesfully', data: so });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const updateProj = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  console.log('so sos os osososososososossssssssssssssssssssssssssssssssssssssssssssssssso');
  logger.debug('Calling update one  inventoryStatus endpoint');
  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService);
    const { id } = req.params;
    const { saleOrder, saleOrderDetail } = req.body;
    //console.log(id);
    const so = await saleOrderServiceInstance.update(
      { ...saleOrder, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    //console.log(saleOrderDetail);
    //await saleOrderDetailServiceInstance.delete({sod_domain:user_domain, sod_nbr: saleOrder.so_nbr });
    for (let entry of saleOrderDetail) {
      entry = {
        ...entry,
        sod_domain: user_domain,
        sod_nbr: saleOrder.so_nbr,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };

      const sod = await saleOrderDetailServiceInstance.findOne({
        sod_nbr: saleOrder.so_nbr,
        sod__chr01: entry.sod__chr01,
        sod_domain: user_domain,
      });
      if (sod) {
        await saleOrderDetailServiceInstance.update({ ...entry }, { id: sod.id });
      } else {
        await saleOrderDetailServiceInstance.create(entry);
      }
    }
    return res.status(200).json({ message: 'fetched succesfully', data: so });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const updateSo = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  project endpoint');
  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const { id } = req.params;

    const So = await saleOrderServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: So });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const updateSod = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  inventoryStatus endpoint');
  try {
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService);
    const costSimulationServiceInstance = Container.get(costSimulationService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const inventoryTransactionServiceInstance = Container.get(inventoryTransactionService);
    const itemServiceInstance = Container.get(itemService);
    const { id } = req.params;
    const { so, soddetails } = req.body;
    console.log(id);
    const som = await saleOrderServiceInstance.update(
      { ...so, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    console.log(so.so_nbr);
    //await saleOrderDetailServiceInstance.delete({ sod_nbr: saleOrder.so_nbr });
    console.log(soddetails);
    for (let entry of soddetails) {
      if (entry.soup == true) {
        console.log('idsod', entry.id, entry.sod_confirm);
        const details = await saleOrderDetailServiceInstance.findOne({
          id: entry.id,
        });
        entry = {
          sod_confirm: entry.sod_confirm,
          updated_by: user_code,
          updated_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        };
        await saleOrderDetailServiceInstance.update({ ...entry }, { id: details.id });

        /*kamel*/
        const sctdet = await costSimulationServiceInstance.findOne({
          sct_domain: user_domain,
          sct_part: details.sod_part,
          sct_site: details.sod_site,
          sct_sim: 'STD-CG',
        });
        const pt = await itemServiceInstance.findOne({ pt_domain: user_domain, pt_part: details.sod_part });
        console.log(details.sod_part, details.sod_site);

        //console.log(remain.qty_oh);
        console.log(sctdet.sct_cst_tot);
        await inventoryTransactionServiceInstance.create({
          tr_domain: user_domain,
          tr_status: details.sod_status,
          tr_expire: details.sod_expire,
          tr_line: details.sod_line,
          tr_part: details.sod_part,
          tr_prod_line: pt.pt_prod_line,
          tr_qty_loc: Number(details.sod_qty_ord),
          tr_um: details.sod_um,
          tr_um_conv: 1,
          tr_ship_type: details.sod_type,
          tr_price: details.sod_price,
          tr_site: details.sod_site,
          tr_loc: details.sod_loc,
          tr_serial: details.sod_serial,
          tr_nbr: details.sod_nbr,
          tr_lot: null,
          tr_addr: so.so_cust,
          tr_effdate: so.so_ord_date,
          tr_so_job: null,
          tr_curr: so.so_curr,
          tr_ex_rate: so.so_ex_rate,
          tr_ex_rate2: so.so_ex_rate2,
          tr_rmks: so.so_rmks,
          tr_type: 'ISS-SO',
          tr_qty_chg: Number(details.sod_qty_ord),
          //tr_loc_begin: Number(details.qty_oh),
          tr_gl_amt: Number(details.sod_qty_ord) * sctdet.sct_cst_tot,
          tr_date: new Date(),
          tr_mtl_std: sctdet.sct_mtl_tl,
          tr_lbr_std: sctdet.sct_lbr_tl,
          tr_bdn_std: sctdet.sct_bdn_tl,
          tr_ovh_std: sctdet.sct_ovh_tl,
          tr_sub_std: sctdet.sct_sub_tl,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });

        if (details.sod_type != 'M') {
          const ld = await locationDetailServiceInstance.findOne({
            ld_domain: user_domain,
            ld_part: details.sod_part,
            ld_lot: details.sod_serial,
            ld_site: details.sod_site,
            ld_loc: details.sod_loc,
          });
          if (ld)
            await locationDetailServiceInstance.update(
              {
                ld_qty_oh: Number(ld.ld_qty_oh) - Number(details.sod_qty_ord) * Number(1),
                ld_expire: details.sod_expire,
                last_modified_by: user_code,
                last_modified_ip_adr: req.headers.origin,
              },
              { id: ld.id },
            );
          else
            await locationDetailServiceInstance.create({
              ld_part: details.sod_part,
              ld_domain: user_domain,
              ld_date: new Date(),
              ld_lot: details.sod_serial,
              ld_site: details.sod_site,
              ld_loc: details.sod_loc,
              ld_qty_oh: -(Number(details.sod_qty_ord) * Number(1)),
              ld_expire: details.sod_expire,
              ld_status: details.sod_status,
              created_by: user_code,
              created_ip_adr: req.headers.origin,
              last_modified_by: user_code,
              last_modified_ip_adr: req.headers.origin,
            });
        }
      }
      /*kamel*/
    }
    return res.status(200).json({ message: 'fetched succesfully', data: so });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const sequelize = Container.get('sequelize');
  const { user_domain } = req.headers;
  logger.debug('Calling find all purchaseOrder endpoint');
  try {
    let result = [];
    //const saleOrderServiceInstance = Container.get(PurchaseOrderService)

    const sos = await sequelize.query(
      'SELECT PUBLIC.so_mstr.id as "iid" , *   FROM   PUBLIC.so_mstr, PUBLIC.pt_mstr, PUBLIC.sod_det  where PUBLIC.sod_det.sod_domain =  ? and  PUBLIC.sod_det.sod_nbr = PUBLIC.so_mstr.so_nbr and PUBLIC.sod_det.sod_part = PUBLIC.pt_mstr.pt_part and PUBLIC.so_mstr.so_domain = PUBLIC.sod_det.sod_domain and PUBLIC.pt_mstr.pt_domain = PUBLIC.sod_det.sod_domain ORDER BY PUBLIC.sod_det.id DESC',
      { replacements: [user_domain], type: QueryTypes.SELECT },
    );

    return res.status(200).json({ message: 'fetched succesfully', data: sos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findAllSoJob = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  const { user_domain } = req.headers;
  logger.debug('Calling find by  all requisition endpoint');
  try {
    const {site,date,date1} = req.body;
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService);
    const itemServiceInstance = Container.get(ItemService);
    const locationDetailServiceInstance = Container.get(locationDetailService)
    const workOrderServiceInstance = Container.get(workOrderService)
    const workRoutingServiceInstance = Container.get(workroutingService)
const orders = await saleOrderDetailServiceInstance.findgrp({
  where: {
    sod_domain: user_domain,
    sod_job : null,
    sod_due_date:  {
      [Op.between]: [date, date1],
    },

  },
  attributes: [
    //    include: [[Sequelize.literal(`${Sequelize.col('total_price').col} * 100 / (100 - ${Sequelize.col('disc_amt').col}) - ${Sequelize.col('total_price').col}`), 'Remise']],
    'sod_part',
    [Sequelize.fn('sum', Sequelize.col('sod_qty_ord')), 'total_qty'],
  ],
  group: ['sod_part' ],
  raw: true,
});
let result = [];
var i = 1;
for (let ord of orders) {
    let qtyonstok = 0
    let qtyonprod = 0
    const items = await itemServiceInstance.findOne({ pt_part: ord.sod_part });
    const gamme = await workRoutingServiceInstance.findOne({ ro_routing: items.pt_routing });
    const ld = await locationDetailServiceInstance.findSpecial({
      where: {
        ld_domain:user_domain,
        ld_part: items.pt_part,
        ld_site: site,
      },
      attributes: [ [Sequelize.fn('sum', Sequelize.col('ld_qty_oh')), 'total_qtyoh']],
      group: ['ld_part' ],
      raw: true,
    });
    qtyonstok = ld[0] ? ld[0].total_qtyoh : 0 
     //console.log(ld[0].total_qtyoh)
    const wo = await workOrderServiceInstance.findSpecial({
      where: {
        wo_domain:user_domain,
        wo_part: ord.sod_part,
        wo_site: site,
        wo_status: "R"  
      },
      attributes: ['wo_part', [Sequelize.fn('sum', Sequelize.col('wo_qty_ord')), 'total_qtyprod']],
      group: ['wo_part', ],
      raw: true,
    });
    qtyonprod = wo[0] ?  wo[0].total_qtyprod : 0
  result.push({
    id: i,
    part: ord.sod_part,
    desc1: items.pt_desc1,
    nomo: items.pt_bom_code,
    gamme: items.pt_routing,
    bo_chg: gamme.ro_batch,
    qtyoh: qtyonstok,
    sfty_qty: items.pt_sfty_stk,
    qtylanch: qtyonprod,
    ord_qty: ord.total_qty,
    prod_qty: ord.total_qty
  });
  i = i + 1;
}

console.log(result)
    return res.status(202).json({
      message: 'sec',
      data: result,
    });
  } catch (e){
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  createdirect,
  findBy,
  findByAll,
  findByAllSo,
  findOne,
  findAll,
  findByrange,
  update,
  updateProj,
  updateSo,
  updateSod,
  findAllwithDetails,
  getActivity,
  getCA,
  findAllSoJob,
};
