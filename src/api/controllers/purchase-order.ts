import PurchaseOrderService from '../../services/purchase-order';
import PurchaseOrderDetailService from '../../services/purchase-order-detail';
import PurchaseReceiveService from '../../services/purchase-receive';
import VoucherOrderService from '../../services/voucher-order';
import AccountPayableService from '../../services/account-payable';
import SequenceService from '../../services/sequence';
import ProviderService from '../../services/provider';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { QueryTypes } from 'sequelize';
import { DATE, Op } from 'sequelize';
import ItemService from '../../services/item';
import taxeService from '../../services/taxe';
import BankService from '../../services/bank';
import BkhService from '../../services/bkh';

import AddressService from '../../services/address';

import { generatePdf } from '../../reporting/generator';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const { purchaseOrder, purchaseOrderDetail } = req.body;
    const po = await purchaseOrderServiceInstance.create({
      ...purchaseOrder,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    for (let entry of purchaseOrderDetail) {
      entry = { ...entry, pod_nbr: po.po_nbr };
      await purchaseOrderDetailServiceInstance.create(entry);
      logger.debug('Calling Create sequence endpoint');
      try {
       
        const addressServiceInstance = Container.get(AddressService);
        // const addr = await addressServiceInstance.findOne({ ad_addr: purchaseOrder.po_vend });

        // const pdfData = {
        //   pod: purchaseOrderDetail,
        //   po: po,
        //   adr: addr,
        // };
        // console.log('\n\n', pdfData);

        // let pdf = await generatePdf(pdfData, 'po');

        return res.status(201).json({ message: 'created succesfully', data: po, /*pdf: pdf.content*/ });
      } catch (e) {
        //#
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
    return res.status(201).json({ message: 'created succesfully', data: po });
  } catch (e) {
    //#
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
const createPos = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const sequenceServiceInstance = Container.get(SequenceService);
    const itemServiceInstance = Container.get(ItemService);
    const { Site, purchaseOrder, purchaseOrderDetail } = req.body;
    // const po = await purchaseOrderServiceInstance.create({...purchaseOrder, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
    for (let entry of purchaseOrder) {
      const sequence = await sequenceServiceInstance.findOne({ seq_seq: 'PO' });
      //

      //let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val)+1}`;
      //await sequence.update({ seq_curr_val: Number(sequence.seq_curr_val )+1 }, { where: { seq_seq: "PO" } });
      let ent = {
        po_category: 'PO',
        po_site: Site,
        po_ord_date: new Date(),
        po_vend: entry.vend,
        po_stat: 'V',
        po_curr: 'DA',
        po_ex_rate: 1,
        po_ex_rate1: 1,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      const po = await purchaseOrderServiceInstance.create(ent);
      //console.log(po.po_nbr);

      var line = 1;
      for (let obj of purchaseOrderDetail) {
        if (obj.qtyval > 0) {
        //  console.log('hnahnahnahnahna', obj.part);
          if (obj.vend == entry.vend) {
            var duedate = new Date();

            // add a day
            duedate.setDate(duedate.getDate() + 1);
            const pt = await itemServiceInstance.findOne({ pt_part: obj.part });
          //  console.log(pt.taxe);
          var loc = null
          if (Site == "0901") { loc = "MGM0010" } else loc = Site
            let entr = {
              pod_nbr: po.po_nbr,
              pod_line: line,
              pod_part: obj.part,
              pod_taxable: pt.pt_taxable,
              pod_stat: 'V',
              pod_tax_code: pt.pt_taxc,
              pod_taxc: pt.taxe.tx2_tax_pct,
              pod_qty_ord: obj.qtyval,
              pod_qty_chg: obj.qtycom,
              pod_site: Site,
              pod_loc: loc,
              pod_price: pt.pt_pur_price,
              pod_um: pt.pt_um,
              pod_due_date: duedate,
              created_by: user_code,
              created_ip_adr: req.headers.origin,
              last_modified_by: user_code,
              last_modified_ip_adr: req.headers.origin,
            };
            await purchaseOrderDetailServiceInstance.create(entr);
            line = line + 1;
          }
        }
      }
    }
    //console.log(purchaseOrder);
    return res.status(201).json({ message: 'created succesfully', data: purchaseOrder });
  } catch (e) {
    //#
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};

const createPosUnp = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const sequenceServiceInstance = Container.get(SequenceService);
    const itemServiceInstance = Container.get(ItemService);
    const taxeServiceInstance = Container.get(taxeService);
    const { Site, purchaseOrder } = req.body;
    // const po = await purchaseOrderServiceInstance.create({...purchaseOrder, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
    for (let entry of purchaseOrder) {
      const sequence = await sequenceServiceInstance.findOne({ seq_seq: 'PO' });
      console.log(sequence);

      //let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val)+1}`;
      //await sequence.update({ seq_curr_val: Number(sequence.seq_curr_val )+1 }, { where: { seq_seq: "PO" } });
      let ent = {
        po_category: 'PO',
        po_site: Site,
        po_ord_date: new Date(),
        po_vend: entry.pt_vend,
        po_stat: 'p',
        po_curr: 'DA',
        po_ex_rate: 1,
        po_ex_rate1: 1,
        po_blanket: null, // code_bank
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      const po = await purchaseOrderServiceInstance.create(ent);
      console.log(po.po_nbr);

      var line = 1;
      for (let obj of purchaseOrder) {
        if (obj.pt_ord_qty > 0) {
          console.log('hnahnahnahnahna', obj.pt_part);

          var duedate = new Date();

          // add a day
          duedate.setDate(duedate.getDate() + 1);
          const pt = await itemServiceInstance.findOne({ pt_part: obj.pt_part });
          const taxe = await taxeServiceInstance.findOne({ tx2_tax_code: pt.pt_taxc });
          console.log(pt.taxe);

          let entr = {
            pod_nbr: po.po_nbr,
            pod_line: line,
            pod_part: pt.pt_part,
            pod_taxable: pt.pt_taxable,
            pod_stat: 'p',
            pod_tax_code: pt.pt_taxc,
            pod_taxc: taxe.tx2_tax_pct,
            pod_qty_ord: obj.pt_ord_qty,
            pod_site: pt.pt_site,
            pod_loc: pt.pt_loc,
            pod_price: obj.pt_pur_price,
            pod_um: pt.pt_um,
            pod_due_date: duedate,
            created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          };
          await purchaseOrderDetailServiceInstance.create(entr);
          line = line + 1;
        }
      }
    }
    console.log(purchaseOrder);
    return res.status(201).json({ message: 'created succesfully', data: purchaseOrder });
  } catch (e) {
    //#
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};

const createPosUnpp = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const sequenceServiceInstance = Container.get(SequenceService);
    const itemServiceInstance = Container.get(ItemService);
    const taxeServiceInstance = Container.get(taxeService);
    const { Site, purchaseOrder, po_blanket } = req.body;
    // const po = await purchaseOrderServiceInstance.create({...purchaseOrder, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
    for (let entry of purchaseOrder) {
      const sequence = await sequenceServiceInstance.findOne({ seq_seq: 'PO' });
      console.log(sequence);

      //let nbr = `${sequence.seq_prefix}-${Number(sequence.seq_curr_val)+1}`;
      //await sequence.update({ seq_curr_val: Number(sequence.seq_curr_val )+1 }, { where: { seq_seq: "PO" } });
      let ent = {
        po_category: 'PO',
        po_site: Site,
        po_ord_date: new Date(),
        po_vend: entry.pt_vend,
        po_amt: entry.pt_pur_price,
        po_stat: 'p',
        po_curr: 'DA',
        po_ex_rate: 1,
        po_ex_rate1: 1,
        po_blanket: po_blanket, // code_bank
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      const po = await purchaseOrderServiceInstance.create(ent);
      console.log(po.po_nbr);
      var line = 1;

      var duedate = new Date();

      // add a day
      duedate.setDate(duedate.getDate() + 1);
      const pt = await itemServiceInstance.findOne({ pt_part: entry.pt_part });
      const taxe = await taxeServiceInstance.findOne({ tx2_tax_code: pt.pt_taxc });
      console.log(pt.taxe);

      let entr = {
        pod_nbr: po.po_nbr,
        pod_line: line,
        pod_part: pt.pt_part,
        pod_taxable: pt.pt_taxable,
        pod_stat: 'p',
        pod_tax_code: pt.pt_taxc,
        pod_taxc: taxe.tx2_tax_pct,
        pod_qty_ord: entry.pt_ord_qty,
        pod_site: pt.pt_site,
        pod_loc: pt.pt_loc,
        pod_price: entry.pt_pur_price,
        pod_um: pt.pt_um,
        pod_due_date: duedate,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await purchaseOrderDetailServiceInstance.create(entr);
      line = line + 1;
    }

    return res.status(201).json({ message: 'created succesfully', data: purchaseOrder });
  } catch (e) {
    //#
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
const payPo = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const sequenceServiceInstance = Container.get(SequenceService);
    const itemServiceInstance = Container.get(ItemService);
    const taxeServiceInstance = Container.get(taxeService);
    const bankServiceInstance = Container.get(BankService);
    const bkhServiceInstance = Container.get(BkhService);

    const { Site, details } = req.body;
    for (const item of details) {
      if (item.po_amt == item.po_pai) {
        await purchaseOrderServiceInstance.update({ po_stat: 'C' }, { po_nbr: item.po_nbr, po_site: item.po_site });
      } else {
        console.log(typeof item.po_pai);
        console.log(typeof item.po_amt);
        if (item.po_pai) {
          await purchaseOrderServiceInstance.update(
            { po_amt: Number(item.po_amt) - Number(item.po_pai) },
            { po_nbr: item.po_nbr, po_site: item.po_site },
          );
        }
      }
      const bk = await bankServiceInstance.findOne({ bk_userid: user_code, bk_type: item.po_blanket });
      if (bk) {
        if (item.po_pai) {
          await bankServiceInstance.update(
            { bk_balance: Number(bk.bk_balance) - Number(item.po_pai) },
            { bk_userid: user_code, bk_type: item.po_blanket },
          );
          await bkhServiceInstance.create({
            bkh_code: bk.bk_code,
            bkh_num_doc: item.po_nbr,
            bkh_date: new Date(),
            bkh_balance: Number(bk.bk_balance) - Number(item.po_pai),
            bkh_type: 'D',
            dec01: item.po_pai,
          });
        }
      }
    }

    return res.status(201).json({ message: 'created succesfully', data: null });
  } catch (e) {
    //#
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all purchaseOrder endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const purchaseOrder = await purchaseOrderServiceInstance.findOne({
      ...req.body,
    });
   // console.log(purchaseOrder);
    if (purchaseOrder) {
      const details = await purchaseOrderDetailServiceInstance.find({
        pod_nbr: purchaseOrder.po_nbr,
      });
      return res.status(200).json({
        message: 'fetched succesfully',
        data: { purchaseOrder, details },
      });
    } else {
      return res.status(404).json({
        message: 'not FOund',
        data: { purchaseOrder, details: null },
      });
    }
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
const findAllPo = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all purchaseOrder endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const purchaseOrder = await purchaseOrderServiceInstance.find({
      ...req.body,
    });

    return res.status(200).json({
      message: 'fetched succesfully',
      data: purchaseOrder,
    });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
const findByrange = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all purchaseOrder endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);

    const purchaseOrder = await purchaseOrderServiceInstance.find({
      po_vend: {
        [Op.between]: [req.body.vd_addr_1, req.body.vd_addr_2],
      },
      po_ord_date: {
        [Op.between]: [req.body.date_1, req.body.date_2],
      },
    });
    console.log('here', purchaseOrder);
    const results_head = [];
    const results_body = [];

    for (const po of purchaseOrder) {
      const details = await purchaseOrderDetailServiceInstance.find({
        pod_nbr: po.po_nbr,
        pod_part: {
          [Op.between]: [req.body.pt_part_1, req.body.pt_part_2],
        },
      });
      const result_head = {
        vd_addr_head: po.po_vend,
        vd_sort_head: po.provider.vd_sort,
      };
      for (const pod of details) {
        const result_body = {
          po_nbr: po.po_nbr,
          vd_addr_body: po.po_vend,
          vd_sort_body: po.provider.vd_sort,
          pod_part: pod.pod_part,
          pt_desc1: pod.item.pt_desc1,

          pod_line: pod.pod_line,
          pod_um: pod.pod_um,
          pod_qty_ord: pod.pod_qty_ord,
          pod_price: pod.pod_price,
          pod_qty_rcvd: pod.pod_qty_rcvd,
        };
        results_body.push(result_body);
      }
      let bool = false;
      for (var i = 0; i < results_head.length; i++) {
        if (results_head[i].vd_addr_head == po.po_vend) {
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
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
const getProviderActivity = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all purchaseOrder endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const voucherOrderServiceInstance = Container.get(VoucherOrderService);
    const accountPayableServiceInstance = Container.get(AccountPayableService);
    const providerServiceInstance = Container.get(ProviderService);

    const provider = await providerServiceInstance.find({
      vd_addr: {
        [Op.between]: [req.body.vd_addr_1, req.body.vd_addr_2],
      },
    });
    console.log('here', provider);
    const results_head = [];
    const results_body = [];

    for (const vd of provider) {
      const accountpayable = await accountPayableServiceInstance.find({
        ap_vend: vd.vd_addr,
        ap_type: { [Op.eq]: 'p' },
        ap_effdate: { [Op.between]: [req.body.date_1, req.body.date_2] },
      });

      let paid_amt = 0;
      for (const ap of accountpayable) {
        paid_amt = paid_amt + Number(ap.ap_amt);
      }
      const voucher = await voucherOrderServiceInstance.find({
        vh_vend: vd.vd_addr,

        vh_inv_date: { [Op.between]: [req.body.date_1, req.body.date_2] },
      });

      let inv_amt = 0;
      for (const vh of voucher) {
        inv_amt = inv_amt + Number(vh.vh_amt);
      }
      const purchasereceive = await purchaseReceiveServiceInstance.find({
        prh_vend: vd.vd_addr,
        prh_rcp_date: { [Op.between]: [req.body.date_1, req.body.date_2] },
      });

      let ship_amt = 0;
      for (const prh of purchasereceive) {
        ship_amt = ship_amt + Number(prh.prh_rcvd * prh.prh_um_conv * prh.prh_pur_cost);
      }
      const purchase = await purchaseOrderServiceInstance.find({
        po_vend: vd.vd_addr,
        po_ord_date: { [Op.between]: [req.body.date_1, req.body.date_2] },
      });

      let ord_amt = 0;

      for (const po of purchase) {
        ord_amt = ord_amt + Number(po.po_amt);
      }
      const result_head = {
        vd_addr_head: vd.vd_addr,
        vd_sort_head: vd.vd_sort,
        vd_ord_amt: ord_amt,
        vd_ship_amt: ship_amt,
        vd_inv_amt: inv_amt,
        vd_paid_amt: paid_amt,
      };
      console.log(result_head);

      results_head.push(result_head);
    }

    return res.status(201).json({ message: 'created succesfully', data: { results_body, results_head } });
    //return res2.status(201).json({ message: 'created succesfully', data: results_body });
  } catch (e) {
    //#
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};

const getProviderBalance = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all purchaseOrder endpoint');
  try {
    const voucherOrderServiceInstance = Container.get(VoucherOrderService);
    const accountPayableServiceInstance = Container.get(AccountPayableService);
    const providerServiceInstance = Container.get(ProviderService);

    const provider = await providerServiceInstance.find({
      vd_addr: {
        [Op.between]: [req.body.vd_addr_1, req.body.vd_addr_2],
      },
    });
    console.log('here', provider);
    const results_head = [];
    const results_body = [];

    for (const vd of provider) {
      const accountpayable2 = await accountPayableServiceInstance.find({
        ap_vend: vd.vd_addr,
        ap_type: { [Op.eq]: 'P' },
        ap_effdate: { [Op.between]: [req.body.date_2, new Date()] },
      });

      let paid_amt2 = 0;
      for (const ap of accountpayable2) {
        paid_amt2 = paid_amt2 + Number(ap.ap_amt);
      }
      const accountpayable1 = await accountPayableServiceInstance.find({
        ap_vend: vd.vd_addr,
        ap_type: { [Op.eq]: 'P' },
        ap_effdate: { [Op.between]: [req.body.date_1, new Date()] },
      });

      let paid_amt1 = 0;
      for (const ap of accountpayable1) {
        paid_amt1 = paid_amt1 + Number(ap.ap_amt);
      }
      const voucher2 = await accountPayableServiceInstance.find({
        ap_vend: vd.vd_addr,
        ap_type: { [Op.eq]: 'I' },
        ap_effdate: { [Op.between]: [req.body.date_1, new Date()] },
      });

      let inv_amt2 = 0;
      for (const vh of voucher2) {
        inv_amt2 = inv_amt2 + Number(vh.ap_amt);
      }
      const voucher1 = await accountPayableServiceInstance.find({
        ap_vend: vd.vd_addr,
        ap_type: { [Op.eq]: 'I' },
        ap_effdate: { [Op.between]: [req.body.date_1, new Date()] },
      });

      let inv_amt1 = 0;
      for (const vh of voucher1) {
        inv_amt1 = inv_amt1 + Number(vh.ap_amt);
      }
      let solde2 = 0;
      solde2 = Number(vd.vd_balance + paid_amt2 - inv_amt2);
      let solde1 = 0;
      solde1 = Number(vd.vd_balance + paid_amt1 - inv_amt1);
      let credit2 = 0;
      let debit2 = 0;
      let credit1 = 0;
      let debit1 = 0;
      if (solde2 < 0) {
        (credit2 = solde2), (debit2 = 0);
      } else {
        (credit2 = 0), (debit2 = solde2);
      }
      if (solde1 < 0) {
        (credit1 = solde1), (debit1 = 0);
      } else {
        (credit1 = 0), (debit1 = solde1);
      }

      const result_head = {
        vd_acct: vd.vd_acct,
        vd_addr_head: vd.vd_addr,
        vd_sort_head: vd.vd_sort,
        vd_credit1: credit1,
        vd_debit1: debit1,
        vd_credit2: credit2,
        vd_debit2: debit2,
      };
      console.log(result_head);

      results_head.push(result_head);
    }

    return res.status(201).json({ message: 'created succesfully', data: { results_body, results_head } });
    //return res2.status(201).json({ message: 'created succesfully', data: results_body });
  } catch (e) {
    //#
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
const getProviderCA = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all customer endpoint');
  try {
    const voucherOrderServiceInstance = Container.get(VoucherOrderService);
    const providerServiceInstance = Container.get(ProviderService);

    const provider = await providerServiceInstance.find({
      vd_addr: { [Op.between]: [req.body.vd_addr_1, req.body.vd_addr_2] },
    });

    const results_head = [];

    for (const vd of provider) {
      const invoice = await voucherOrderServiceInstance.find({
        vh_vend: vd.vd_addr,
        vh_inv_date: { [Op.between]: [req.body.date_1, req.body.date_2] },
      });
      let ht_amt = 0;
      let tva_amt = 0;
      let tf_amt = 0;
      let ttc_amt = 0;
      for (const ih of invoice) {
        ht_amt = ht_amt + Number(ih.vh_amt);
        tva_amt = tva_amt + Number(ih.vh_tax_amt);
        tf_amt = tf_amt + Number(ih.vh_trl1_amt);
        ttc_amt = ttc_amt + ht_amt + tva_amt + tf_amt;
      }

      const result_head = {
        vd_addr_head: vd.vd_addr,
        vd_sort_head: vd.vd_sort,
        vd_ht_amt: ht_amt,
        vd_tva_amt: tva_amt,
        vd_tf_amt: tf_amt,
        vd_ttc_amt: ttc_amt,
      };
      console.log(result_head);

      results_head.push(result_head);
    }

    return res.status(200).json({ message: 'fetched succesfully', data: results_head });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  purchaseOrder endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const { id } = req.params;
    const purchaseOrder = await purchaseOrderServiceInstance.findOne({ id });
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const details = await purchaseOrderDetailServiceInstance.find({
      pod_nbr: purchaseOrder.po_nbr,
    });

    return res.status(200).json({
      message: 'fetched succesfully',
      data: { purchaseOrder, details },
    });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};

const findByAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all requisition endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);

    const pos = await purchaseOrderServiceInstance.find({});

    return res.status(202).json({
      message: 'sec',
      data: pos,
    });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};

const findByStat = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all requisition endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);

    const pos = await purchaseOrderServiceInstance.find({ ...req.body });
console.log(pos)
    return res.status(202).json({
      message: 'sec',
      data: pos,
    });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};

const getPodRec = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const pod_site = req.body.pod_site;
  console.log(pod_site);
  const details = [];
  logger.debug('Calling find one  purchaseOrder endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const { id } = req.params;

    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const detail = await purchaseOrderDetailServiceInstance.find({
      pod_stat: 'V',
      pod_site: pod_site,
    });

    return res.status(200).json({
      message: 'fetched succesfully',
      detail,
    });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all purchaseOrder endpoint');
  try {
    let result = [];
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const pos = await purchaseOrderServiceInstance.find({});
    for (const po of pos) {
      const details = await purchaseOrderDetailServiceInstance.find({
        pod_nbr: po.po_nbr,
      });
      result.push({ id: po.id, po, details });
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
const findAllSite = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all purchaseOrder endpoint');
  try {
    let result = [];
    console.log(req.body);
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const pos = await purchaseOrderServiceInstance.find({});
    for (const po of pos) {
      const details = await purchaseOrderDetailServiceInstance.find({
        pod_nbr: po.po_nbr,
        pod_site: req.body.site,
      });
      if (details.length != 0) {
        result.push({ id: po.id, po, details });
      }
    }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  purchaseOrder endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const { id } = req.params;
    console.log(req.body);
    const purchaseOrder = await purchaseOrderServiceInstance.update(
      { ...req.body, last_modified_by: user_code },
      { id },
    );
    const purchase = await purchaseOrderServiceInstance.findOne({ id });
    console.log(purchase.po_nbr);
    const pos = await purchaseOrderDetailServiceInstance.find({ pod_nbr: purchase.po_nbr });
    for (const po of pos) {
      const purchaseOrderDetail = await purchaseOrderDetailServiceInstance.update(
        { pod_stat: req.body.po_stat, last_modified_by: user_code },
        { id: po.id },
      );
    }
    return res.status(200).json({ message: 'fetched succesfully', data: purchaseOrder });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
const updated = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;

  logger.debug('Calling update one  purchaseOrder endpoint');
  try {
    const purchaseOrderServiceInstance = Container.get(PurchaseOrderService);
    const purchaseOrderDetailServiceInstance = Container.get(PurchaseOrderDetailService);
    const { id } = req.params;
    console.log(req.body);
    // const purchaseOrder = await purchaseOrderServiceInstance.update(
    //   { ...req.body, last_modified_by: user_code },
    //   { id },
    // );
    const purchase = await purchaseOrderServiceInstance.findOne({ id });
    console.log(purchase.po_nbr);
    const pos = await purchaseOrderDetailServiceInstance.find({ pod_nbr: purchase.po_nbr });
    for (const pod of req.body.detail) {
      const purchaseOrderDetail = await purchaseOrderDetailServiceInstance.update(
        { pod_qty_ord:pod.pod_qty_ord,pod_price:pod.pod_price, last_modified_by: user_code },
        { id: pod.id },
      );
    }
    return res.status(200).json({ message: 'fetched succesfully', data: id });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};

const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const sequelize = Container.get('sequelize');

  logger.debug('Calling find all purchaseOrder with all site endpoint');
  try {
    let result = [];
    //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

    const pos = await sequelize.query(
      'SELECT *  FROM   PUBLIC.po_mstr, PUBLIC.pt_mstr, PUBLIC.pod_det  where PUBLIC.pod_det.pod_nbr = PUBLIC.po_mstr.po_nbr and PUBLIC.pod_det.pod_part = PUBLIC.pt_mstr.pt_part ORDER BY PUBLIC.pod_det.id DESC',
      { type: QueryTypes.SELECT },
    );

    return res.status(200).json({ message: 'fetched succesfully', data: pos });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
const findAllwithDetailsite = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const sequelize = Container.get('sequelize');

  logger.debug('Calling find all purchaseOrder with site endpoint');
  try {
    let result = [];
    console.log(req.body);
    var site = req.body.site;
    //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

    const pos = await sequelize.query(
      'SELECT *  FROM   PUBLIC.po_mstr, PUBLIC.pt_mstr, PUBLIC.pod_det  where PUBLIC.pod_det.pod_nbr = PUBLIC.po_mstr.po_nbr and PUBLIC.pod_det.pod_part = PUBLIC.pt_mstr.pt_part  and PUBLIC.pod_det.pod_site = ? ORDER BY PUBLIC.pod_det.id DESC',
      { replacements: [site], type: QueryTypes.SELECT },
    );

    return res.status(200).json({ message: 'fetched succesfully', data: pos });
  } catch (e) {
    logger.error('ðŸ”¥ error: %o', e);
    return next(e);
  }
};
export default {
  create,
  createPos,
  findBy,
  findByAll,
  findOne,
  findAll,
  findByStat,
  findAllSite,
  update,
  updated,
  findAllwithDetails,
  findAllwithDetailsite,
  findByrange,
  getProviderActivity,
  getProviderBalance,
  getProviderCA,
  createPosUnp,
  getPodRec,
  createPosUnpp,
  findAllPo,
  payPo,
};
