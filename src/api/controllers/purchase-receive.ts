import PurchaseReceiveService from '../../services/purchase-receive';
import locationDetailService from '../../services/location-details';
import inventoryTransactionService from '../../services/inventory-transaction';
import inventoryStatusService from '../../services/inventory-status';
import costSimulationService from '../../services/cost-simulation';
import purchaseOrderDetailService from '../../services/purchase-order-detail';
import SequenceService from '../../services/sequence';
import UserService from '../../services/user';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { round } from 'lodash';
import { QueryTypes } from 'sequelize';
import purchaseOrderService from '../../services/purchase-order';
import AddressService from '../../services/address';
import {Op, Sequelize } from 'sequelize';
import { generatePdf } from '../../reporting/generator';
const PDFDocument = require('pdfkit');
const fs = require('fs');
const bwipjs = require('bwip-js');
const printer = require('pdf-to-printer');
import LabelService from '../../services/label';
import ItemsService from '../../services/item';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling Create code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const inventoryTransactionServiceInstance = Container.get(inventoryTransactionService);
    const costSimulationServiceInstance = Container.get(costSimulationService);
    const purchaseOrderDetailServiceInstance = Container.get(purchaseOrderDetailService);
    const statusServiceInstance = Container.get(inventoryStatusService);
    const sequenceServiceInstance = Container.get(SequenceService);
    const labelServiceInstance = Container.get(LabelService);
    const itemsServiceInstance = Container.get(ItemsService);

    //const lastId = await purchaseReceiveServiceInstance.max('prh_nbr');
    //let det = req.body.detail
    const pageWidth = 118 * 2.83465; // Width of the page in points
    const pageHeight = 120 * 2.83465; // Height of the page in points

    const doc = new PDFDocument({ size: [pageWidth, pageHeight] });
    var array = [];
    array = req.body.detail;
    var result = [];
    array.reduce(function(res, value) {
      //console.log('aaa',res[value.idh_part])
      if (
        !res[
          (value.prh_part,
          value.prh_serial,
          value.prh_taxable,
          value.prh_taxc,
          value.prh_tax_code,
          value.prh_um,
          value.prh_um_conv,
          value.prh_loc,
          value._vend_lot,
          value.prh_pur_cost)
        ]
      ) {
        res[
          (value.prh_part,
          value.prh_serial,
          value.prh_taxable,
          value.prh_taxc,
          value.prh_tax_code,
          value.prh_um,
          value.prh_um_conv,
          value.prh_loc,
          value._vend_lot,
          value.prh_pur_cost)
        ] = {
          prh_part: value.prh_part,
          prh_serial: value.prh_serial,
          prh_taxable: value.prh_taxable,
          prh_tqxc: value.prh_taxc,
          prh_tax_code: value.prh_tax_code,
          prh_um: value.prh_um,
          prh_um_conv: value.prh_um_conv,
          prh_loc: value.prh_loc,
          prh_vend_lot: value._vend_lot,
          prh_pur_cost: value.prh_pur_cost,
          prh_rcvd: 0,
        };
        result.push(
          res[
            (value.prh_part,
            value.prh_serial,
            value.prh_taxable,
            value.prh_taxc,
            value.prh_tax_code,
            value.prh_um,
            value.prh_um_conv,
            value.prh_loc,
            value._vend_lot,
            value.prh_pur_cost)
          ],
        );
      }
      res[
        (value.prh_part,
        value.prh_serial,
        value.prh_taxable,
        value.prh_taxc,
        value.prh_tax_code,
        value.prh_um,
        value.prh_um_conv,
        value.prh_loc,
        value._vend_lot,
        value.prh_pur_cost)
      ].prh_rcvd += value.prh_rcvd;
      return res;
    }, {});
    console.log('here');
    console.log(result);
    console.log('here');

    var i = 1;
    for (const arr of result) {
      await purchaseReceiveServiceInstance.create({
        prh_domain: user_domain,
        prh_receiver: req.body.prhnbr,
        ...arr,
        prh_line: i,
        ...req.body.pr,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      i = i + 1;
      const pod = await purchaseOrderDetailServiceInstance.findOne({
        pod_domain: user_domain,
        pod_nbr: req.body.pr.prh_nbr,
        pod_part: arr.prh_part,
      });

      if (pod)
        await purchaseOrderDetailServiceInstance.update(
          {
            pod_qty_rcvd: Number(pod.pod_qty_rcvd) + Number(arr.prh_rcvd),
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          },
          { id: pod.id },
        );
    }
    for (const item of req.body.detail) {
      const { tr_status, tr_expire, desc, ...remain } = item;
      const part = await itemsServiceInstance.findOne({ pt_part: remain.prh_part, pt_domain: user_domain });
      // await purchaseReceiveServiceInstance.create({
      //   prh_receiver: req.body.prhnbr,
      //   ...remain,
      //   ...req.body.pr,
      //   created_by: user_code,
      //   created_ip_adr: req.headers.origin,
      //   last_modified_by: user_code,
      //   last_modified_ip_adr: req.headers.origin,
      // });
      // const pod = await purchaseOrderDetailServiceInstance.findOne({
      //   pod_nbr: req.body.pr.prh_nbr,
      //   pod_part: remain.prh_part,
      // });

      // if (pod)
      //   await purchaseOrderDetailServiceInstance.update(
      //     {
      //       pod_qty_rcvd: Number(pod.pod_qty_rcvd) + Number(remain.prh_rcvd),
      //       last_modified_by: user_code,
      //       last_modified_ip_adr: req.headers.origin,
      //     },
      //     { id: pod.id },
      //   );
      var labelId = null;
      if (part.pt_iss_pol) {
        const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'PL', seq_type: 'PL' });
        console.log(seq);
        labelId = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
        await sequenceServiceInstance.update(
          { seq_curr_val: Number(seq.seq_curr_val) + 1 },
          { seq_type: 'PL', seq_seq: 'PL', seq_domain: user_domain },
        );
      }
      await inventoryTransactionServiceInstance.create({
        tr_domain: user_domain,
        tr_status,
        tr_expire,
        tr_line: remain.prh_line,
        tr_part: remain.prh_part,
        tr_qty_loc: remain.prh_rcvd,
        tr_um: remain.prh_um,
        tr_um_conv: remain.prh_um_conv,
        tr_price: remain.prh_pur_cost,
        tr_gl_amt: Number(remain.prh_pur_cost) * Number(remain.prh_rcvd),
        tr_site: req.body.pr.prh_site,
        tr_loc: remain.prh_loc,
        tr_serial: remain.prh_serial,
        tr_vend_lot: remain.prh_vend_lot,
        tr_nbr: req.body.pr.prh_nbr,
        tr_lot: req.body.prhnbr,
        tr_addr: req.body.pr.prh_vend,
        tr_effdate: req.body.pr.prh_rcp_date,
        tr_so_job: req.body.pr.prh_xinvoice,
        tr_curr: req.body.pr.prh_curr,
        tr_ex_rate: req.body.pr.prh_ex_rate,
        tr_ex_rate2: req.body.pr.prh_ex_rate2,
        tr_rmks: req.body.pr.prh_rmks,
        tr_type: 'RCT-PO',
        tr_ref: labelId,
        tr_date: new Date(),
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      const lds = await locationDetailServiceInstance.find({
        ld_domain: user_domain,
        ld_part: remain.prh_part,
        ld_site: req.body.pr.prh_site,
      });
      const { sct_mtl_tl } = await costSimulationServiceInstance.findOne({
        sct_domain: user_domain,
        sct_part: remain.prh_part,
        sct_site: req.body.pr.prh_site,
        sct_sim: 'STDCG',
      });
      const sctdet = await costSimulationServiceInstance.findOne({
        sct_domain: user_domain,
        sct_part: remain.prh_part,
        sct_site: req.body.pr.prh_site,
        sct_sim: 'STDCG',
      });
      let qty = 0;
      lds.map(elem => {
        qty += Number(elem.ld_qty_oh);
      });
      const new_price = round(
        (qty * Number(sct_mtl_tl) +
          (Number(remain.prh_rcvd) *
            Number(remain.prh_um_conv) *
            Number(remain.prh_pur_cost) *
            Number(req.body.pr.prh_ex_rate2)) /
            Number(req.body.pr.prh_ex_rate)) /
          (qty + Number(remain.prh_rcvd) * Number(remain.prh_um_conv)),
        2,
      );
      await costSimulationServiceInstance.update(
        {
          sct_mtl_tl: new_price,
          sct_cst_tot:
            new_price +
            Number(sctdet.sct_lbr_tl) +
            Number(sctdet.sct_bdn_tl) +
            Number(sctdet.sct_ovh_tl) +
            Number(sctdet.sct_sub_tl),
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        },
        { sct_domain: user_domain, sct_part: remain.prh_part, sct_site: req.body.pr.prh_site, sct_sim: 'STDCG' },
      );
      //console.log(tr_status);
      const status = await statusServiceInstance.findOne({
        is_domain: user_domain,
        is_status: tr_status,
      });
      // console.log(status, 'here');
      const ld = await locationDetailServiceInstance.findOne({
        ld_domain: user_domain,
        ld_part: remain.prh_part,
        ld_lot: remain.prh_serial,
        ld_site: req.body.pr.prh_site,
        ld_loc: remain.prh_loc,
        ld_ref: labelId,
      });
      if (ld)
        await locationDetailServiceInstance.update(
          {
            ld_qty_oh: Number(ld.ld_qty_oh) + Number(remain.prh_rcvd) * Number(remain.prh_um_conv),
            ld_expire: tr_expire,
            ld__log01: status.is_nettable,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          },
          { id: ld.id },
        );
      else
        await locationDetailServiceInstance.create({
          ld_domain: user_domain,
          ld_part: remain.prh_part,
          ld_date: new Date(),
          ld_lot: remain.prh_serial,
          ld_site: req.body.pr.prh_site,
          ld_loc: remain.prh_loc,
          ld_qty_oh: Number(remain.prh_rcvd),
          ld_expire: tr_expire,
          ld_status: tr_status,
          ld__log01: status.is_nettable,
          ld_ref: labelId,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });

      /****create label**** */
      if (part.pt_iss_pol) {
        await labelServiceInstance.create({
          lb_domain: user_domain,
          lb_site: req.body.pr.prh_site,

          lb_loc: remain.prh_loc,

          lb_part: remain.prh_part,

          lb_nbr: req.body.prhnbr,

          lb_lot: remain.prh_serial,

          lb_ref: labelId,

          lb_date: req.body.pr.prh_rcp_date,

          lb_cab: labelId,

          lb_qty: remain.prh_rcvd,
          lb_ld_status: tr_status,
          lb_desc: part.pt_desc1,

          /****create label**** */
        });
        /****print label**** */
        const imagePath = './logo.png';
        console.log(req.body);
        // Set the options for the image
        const imageOptions = {
          fit: [150, 150], // Size of the image
          // align: 'center', // Center the image horizontally
          // valign: 'top', // Align the image to the top of the page
        };

        // Add the image to the document
        // doc.image(imagePath, imageOptions);

        // Define the properties of the rectangles
        const rectWidth = 300;
        const rectHeight = 50;
        const rectSpacing = 5;
        const rectX = (doc.page.width - rectWidth) / 2;
        let rectY = 15;

        // Define the texts for each rectangle
        const texts = [
          'REFERENCE: ' + req.body.lb_part,
          'Total unité :' + req.body.lb_qty,
          // '' + labelId,
          'Description : ' + req.body.lb_desc,
          'Groupe: ' + req.body.lb_desc,
          'Date: ' + req.body.lb_date,
        ];

        // Set the options for the rectangle text
        const textOptions = {
          align: 'center',
          valign: 'center',
        };

        for (let i = 0; i < 5; i++) {
          let textX: number = 0;
          let textY: number = 0;
          // Draw the rectangle
          doc.rect(rectX, rectY, rectWidth, rectHeight).stroke();

          // Calculate the position for the text
          if (i !== 4) {
            textX = rectX + rectWidth / 6;
            textY = rectY + rectHeight / 6 - doc.currentLineHeight() / 6 + 5;

            // Save the current transformation matrix
            doc.save();

            // // Translate to the center of the rectangle
            // doc.translate(textX, textY);

            // // Rotate the text
            // doc.rotate(-Math.PI / 4);

            // // Translate back to the original position
            // doc.translate(-textX, -textY);

            // Add the text inside the rectangle
            doc
              .font('Helvetica-Bold')
              .fontSize(14)
              .text(texts[i], textX, textY, textOptions);

            // doc.restore();

            // Move to the next rectangle position

            rectY += rectHeight + rectSpacing;
          } else {
            textX = rectX + rectWidth / 6;
            textY = 250;
            // // Translate to the center of the rectangle
            // doc.translate(textX, textY);

            // // Rotate the text
            // // doc.rotate(-Math.PI / 4);

            // // Translate back to the original position
            // doc.translate(-textX, -textY);

            // Add the text inside the rectangle
            doc
              .font('Helvetica-Bold')
              .fontSize(14)
              .text(texts[i], textX, textY, textOptions);
          }
          // textX = rectX + rectWidth / 6;
          // textY = rectY + rectHeight / 6 - doc.currentLineHeight() / 6;

          // // Save the current transformation matrix
          // doc.save();

          // // Translate to the center of the rectangle
          // doc.translate(textX, textY);

          // // Rotate the text
          // doc.rotate(-Math.PI / 4);

          // // Translate back to the original position
          // doc.translate(-textX, -textY);

          // // Add the text inside the rectangle
          // doc
          //   .font('Helvetica-Bold')
          //   .fontSize(14)
          //   .text(texts[i], textX, textY, textOptions);

          // Restore the transformation matrix
        }

        // Save the PDF document
        doc.pipe(fs.createWriteStream('label.pdf'));
        doc.end();

        const filePath = './output.pdf';
        const printerName = 'Xprinter XP-TT426B';

        printer
          .print(filePath, { printer: printerName })
          .then(() => {
            console.log('Printing completed.');
          })
          .catch(error => {
            console.error('Error while printing:', error);
          });
        /****print label**** */
      }
    }
    const addressServiceInstance = Container.get(AddressService);
    const addr = await addressServiceInstance.findOne({ ad_addr: req.body.pr.prh_vend, ad_domain: user_domain });
    //console.log("\n\n req body : ", req.body)

    const { detail, pr, prhnbr } = req.body;
    const pdfData = {
      pr: pr,
      detail: detail,
      prhnbr: prhnbr,
      adr: addr,
    };

    //Console.log("\n\n pdf data", pdfData)
    const pdf = await generatePdf(pdfData, 'prh');
    // const devise = await purchaseReceiveServiceInstance.create(req.body)
    return res.status(201).json({ message: 'created succesfully', data: req.body.prhnbr });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createCab = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling Create code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const inventoryTransactionServiceInstance = Container.get(inventoryTransactionService);
    const costSimulationServiceInstance = Container.get(costSimulationService);
    const purchaseOrderDetailServiceInstance = Container.get(purchaseOrderDetailService);
    const statusServiceInstance = Container.get(inventoryStatusService);
    const sequenceServiceInstance = Container.get(SequenceService);
    const labelServiceInstance = Container.get(LabelService);
    const itemsServiceInstance = Container.get(ItemsService);

    //const lastId = await purchaseReceiveServiceInstance.max('prh_nbr');
    //let det = req.body.detail
    var array = [];
    array = req.body.detail;
    var result = [];
    array.reduce(function(res, value) {
      //console.log('aaa',res[value.idh_part])
      if (
        !res[
          (value.prh_part,
          value.prh_serial,
          value.prh_taxable,
          value.prh_taxc,
          value.prh_tax_code,
          value.prh_um,
          value.prh_um_conv,
          value.prh_loc,
          value._vend_lot,
          value.prh_pur_cost)
        ]
      ) {
        res[
          (value.prh_part,
          value.prh_serial,
          value.prh_taxable,
          value.prh_taxc,
          value.prh_tax_code,
          value.prh_um,
          value.prh_um_conv,
          value.prh_loc,
          value._vend_lot,
          value.prh_pur_cost)
        ] = {
          prh_part: value.prh_part,
          prh_serial: value.prh_serial,
          prh_taxable: value.prh_taxable,
          prh_tqxc: value.prh_taxc,
          prh_tax_code: value.prh_tax_code,
          prh_um: value.prh_um,
          prh_um_conv: value.prh_um_conv,
          prh_loc: value.prh_loc,
          prh_vend_lot: value._vend_lot,
          prh_pur_cost: value.prh_pur_cost,
          prh_rcvd: 0,
        };
        result.push(
          res[
            (value.prh_part,
            value.prh_serial,
            value.prh_taxable,
            value.prh_taxc,
            value.prh_tax_code,
            value.prh_um,
            value.prh_um_conv,
            value.prh_loc,
            value._vend_lot,
            value.prh_pur_cost)
          ],
        );
      }
      res[
        (value.prh_part,
        value.prh_serial,
        value.prh_taxable,
        value.prh_taxc,
        value.prh_tax_code,
        value.prh_um,
        value.prh_um_conv,
        value.prh_loc,
        value._vend_lot,
        value.prh_pur_cost)
      ].prh_rcvd += value.prh_rcvd;
      return res;
    }, {});
    console.log('here');
    console.log(result);
    console.log('here');

    var i = 1;
    for (const arr of result) {
      await purchaseReceiveServiceInstance.create({
        prh_domain: user_domain,
        prh_receiver: req.body.prhnbr,
        ...arr,
        prh_line: i,
        ...req.body.pr,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      i = i + 1;
      const pod = await purchaseOrderDetailServiceInstance.findOne({
        pod_domain: user_domain,
        pod_nbr: req.body.pr.prh_nbr,
        pod_part: arr.prh_part,
      });

      if (pod)
        await purchaseOrderDetailServiceInstance.update(
          {
            pod_qty_rcvd: Number(pod.pod_qty_rcvd) + Number(arr.prh_rcvd),
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          },
          { id: pod.id },
        );
    }
    for (const item of req.body.detail) {
      const { tr_status, tr_expire, tr_ref, desc, ...remain } = item;
      const part = await itemsServiceInstance.findOne({ pt_part: remain.prh_part, pt_domain: user_domain });

      // var labelId = null;
      // if (part.pt_iss_pol) {
      //   const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'PL', seq_type: 'PL' });
      //   console.log(seq);
      //   labelId = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
      //   await sequenceServiceInstance.update(
      //     { seq_curr_val: Number(seq.seq_curr_val) + 1 },
      //     { seq_type: 'PL', seq_seq: 'PL', seq_domain: user_domain },
      //   );
      // }
      await inventoryTransactionServiceInstance.create({
        tr_domain: user_domain,
        tr_status,
        tr_expire,
        tr_line: remain.prh_line,
        tr_part: remain.prh_part,
        tr_qty_loc: remain.prh_rcvd,
        tr_um: remain.prh_um,
        tr_um_conv: remain.prh_um_conv,
        tr_price: remain.prh_pur_cost,
        tr_gl_amt: Number(remain.prh_pur_cost) * Number(remain.prh_rcvd),
        tr_site: req.body.pr.prh_site,
        tr_loc: remain.prh_loc,
        tr_serial: remain.prh_serial,
        tr_vend_lot: remain.prh_vend_lot,
        tr_nbr: req.body.pr.prh_nbr,
        tr_lot: req.body.prhnbr,
        tr_addr: req.body.pr.prh_vend,
        tr_effdate: req.body.pr.prh_rcp_date,
        tr_so_job: req.body.pr.prh_xinvoice,
        tr_curr: req.body.pr.prh_curr,
        tr_ex_rate: req.body.pr.prh_ex_rate,
        tr_ex_rate2: req.body.pr.prh_ex_rate2,
        tr_rmks: req.body.pr.prh_rmks,
        tr_type: 'RCT-PO',
        tr_ref,
        tr_date: new Date(),
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      const lds = await locationDetailServiceInstance.find({
        ld_domain: user_domain,
        ld_part: remain.prh_part,
        ld_site: req.body.pr.prh_site,
      });
      const { sct_mtl_tl } = await costSimulationServiceInstance.findOne({
        sct_domain: user_domain,
        sct_part: remain.prh_part,
        sct_site: req.body.pr.prh_site,
        sct_sim: 'STDCG',
      });
      const sctdet = await costSimulationServiceInstance.findOne({
        sct_domain: user_domain,
        sct_part: remain.prh_part,
        sct_site: req.body.pr.prh_site,
        sct_sim: 'STDCG',
      });
      let qty = 0;
      lds.map(elem => {
        qty += Number(elem.ld_qty_oh);
      });
      const new_price = round(
        (qty * Number(sct_mtl_tl) +
          (Number(remain.prh_rcvd) *
            Number(remain.prh_um_conv) *
            Number(remain.prh_pur_cost) *
            Number(req.body.pr.prh_ex_rate2)) /
            Number(req.body.pr.prh_ex_rate)) /
          (qty + Number(remain.prh_rcvd) * Number(remain.prh_um_conv)),
        2,
      );
      await costSimulationServiceInstance.update(
        {
          sct_mtl_tl: new_price,
          sct_cst_tot:
            new_price +
            Number(sctdet.sct_lbr_tl) +
            Number(sctdet.sct_bdn_tl) +
            Number(sctdet.sct_ovh_tl) +
            Number(sctdet.sct_sub_tl),
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        },
        { sct_domain: user_domain, sct_part: remain.prh_part, sct_site: req.body.pr.prh_site, sct_sim: 'STDCG' },
      );
      //console.log(tr_status);
      const status = await statusServiceInstance.findOne({
        is_domain: user_domain,
        is_status: tr_status,
      });
      // console.log(status, 'here');
      const ld = await locationDetailServiceInstance.findOne({
        ld_domain: user_domain,
        ld_part: remain.prh_part,
        ld_lot: remain.prh_serial,
        ld_site: req.body.pr.prh_site,
        ld_loc: remain.prh_loc,
        ld_ref: tr_ref,
      });
      if (ld)
        await locationDetailServiceInstance.update(
          {
            ld_qty_oh: Number(ld.ld_qty_oh) + Number(remain.prh_rcvd) * Number(remain.prh_um_conv),
            ld_expire: tr_expire,
            ld__log01: status.is_nettable,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          },
          { id: ld.id },
        );
      else
        await locationDetailServiceInstance.create({
          ld_domain: user_domain,
          ld_part: remain.prh_part,
          ld_date: new Date(),
          ld_lot: remain.prh_serial,
          ld_site: req.body.pr.prh_site,
          ld_loc: remain.prh_loc,
          ld_qty_oh: Number(remain.prh_rcvd),
          ld_expire: tr_expire,
          ld_status: tr_status,
          ld__log01: status.is_nettable,
          ld_ref: tr_ref,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });

      /****create label**** */
      // if (part.pt_iss_pol) {
      //   await labelServiceInstance.create({
      //     lb_domain: user_domain,
      //     lb_site: req.body.pr.prh_site,

      //     lb_loc: remain.prh_loc,

      //     lb_part: remain.prh_part,

      //     lb_nbr: req.body.prhnbr,

      //     lb_lot: remain.prh_serial,

      //     lb_ref: labelId,

      //     lb_date: req.body.pr.prh_rcp_date,

      //     lb_cab: labelId,

      //     lb_qty: remain.prh_rcvd,
      //     lb_ld_status: tr_status,
      //     lb_desc: part.pt_desc1,

      //     /****create label**** */
      //   });
      //   /****print label**** */

      //   /****print label**** */
      // }
    }
    const addressServiceInstance = Container.get(AddressService);
    const addr = await addressServiceInstance.findOne({ ad_addr: req.body.pr.prh_vend, ad_domain: user_domain });
    //console.log("\n\n req body : ", req.body)

    const { detail, pr, prhnbr } = req.body;
    const pdfData = {
      pr: pr,
      detail: detail,
      prhnbr: prhnbr,
      adr: addr,
    };

    //Console.log("\n\n pdf data", pdfData)
    const pdf = await generatePdf(pdfData, 'prh');
    // const devise = await purchaseReceiveServiceInstance.create(req.body)
    return res.status(201).json({ message: 'created succesfully', data: req.body.prhnbr });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const rctPo = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { detail } = req.body;
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling find one  code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const purchaseOrderServiceInstance = Container.get(purchaseOrderService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const inventoryTransactionServiceInstance = Container.get(inventoryTransactionService);
    const costSimulationServiceInstance = Container.get(costSimulationService);
    const userServiceInstance = Container.get(UserService);
    const sequenceServiceInstance = Container.get(SequenceService);
    const purchaseOrderDetailServiceInstance = Container.get(purchaseOrderDetailService);
    const statusServiceInstance = Container.get(inventoryStatusService);
    const user = await userServiceInstance.findOne({ usrd_code: user_code, usrd_domain: user_domain });
    const seq = await sequenceServiceInstance.findOne({
      seq_domain: user_domain,
      seq_type: 'PR',
      seq_profile: user.usrd_profile,
    });

    const prh_nbr = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
    await sequenceServiceInstance.update({ seq_curr_val: Number(seq.seq_curr_val) + 1 }, { id: seq.id });
    for (const po of detail) {
      const poo = await purchaseOrderServiceInstance.findOne({ po_nbr: po.pod_nbr, pod_domain: user_domain });
      await purchaseReceiveServiceInstance.create({
        prh_domain: user_domain,
        prh_receiver: prh_nbr,
        prh_nbr: po.pod_nbr,
        prh_vend: poo.po_vend,
        prh_rcp_date: new Date(),
        prh_curr: 'DA',
        prh_ex_rate: 1,
        prh_ex_rate2: 1,
        prh_line: po.pod_line,
        prh_part: po.pod_part,
        prh_serial: po.pod_serial,
        prh_rcvd: po.pod_qty_rcvd,
        prh_qty_ord: po.pod_qty_ord,
        prh_pur_cost: po.pod_price,

        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      const pod = await purchaseOrderDetailServiceInstance.findOne({
        pod_domain: user_domain,
        pod_nbr: po.pod_nbr,
        pod_part: po.pod_part,
        pod_line: po.pod_line,
      });
      await purchaseOrderDetailServiceInstance.update(
        {
          pod_qty_rcvd: Number(pod.pod_qty_rcvd) + Number(po.pod_qty_rcvd),
          pod_stat: 'r',
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        },
        { id: pod.id },
      );

      await inventoryTransactionServiceInstance.create({
        tr_domain: user_domain,
        tr_status: null,
        tr_expire: null,
        tr_line: po.pod_line,
        tr_part: po.pod_part,
        tr_qty_loc: po.pod_qty_rcvd,
        tr_um: po.item.pt_um,
        tr_um_conv: 1,
        tr_price: po.pod_price,
        tr_site: po.pod_site,
        tr_loc: po.item.pt_loc,
        tr_serial: po.pod_serial,
        tr_nbr: po.pod_nbr,
        tr_lot: prh_nbr,
        tr_addr: poo.po_vend,
        tr_effdate: new Date(),

        tr_curr: 'DA',
        tr_ex_rate: 1,
        tr_ex_rate2: 1,

        tr_type: 'RCT-PO',
        tr_date: new Date(),
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
      const lds = await locationDetailServiceInstance.find({
        ld_domain: user_domain,
        ld_part: po.pod_part,
        ld_site: po.pod_site,
      });
      const { sct_mtl_tl } = await costSimulationServiceInstance.findOne({
        sct_domain: user_domain,
        sct_part: po.pod_part,
        sct_site: po.pod_site,
        sct_sim: 'STDCG',
      });
      const sctdet = await costSimulationServiceInstance.findOne({
        sct_domain: user_domain,
        sct_part: po.pod_part,
        sct_site: po.pod_site,
        sct_sim: 'STDCG',
      });
      let qty = 0;
      lds.map(elem => {
        qty += Number(elem.ld_qty_oh);
      });
      const new_price = round(
        qty * Number(sct_mtl_tl) + Number(po.pod_qty_rcvd) * Number(po.pod_price) * (qty + Number(po.pod_qty_rcvd)),
      );
      await costSimulationServiceInstance.update(
        {
          sct_mtl_tl: new_price,
          sct_cst_tot:
            new_price +
            Number(sctdet.sct_lbr_tl) +
            Number(sctdet.sct_bdn_tl) +
            Number(sctdet.sct_ovh_tl) +
            Number(sctdet.sct_sub_tl),
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        },
        { sct_domain: user_domain, sct_part: po.pod_part, sct_site: po.pod_site, sct_sim: 'STDCG' },
      );

      const ld = await locationDetailServiceInstance.findOne({
        ld_domain: user_domain,
        ld_part: po.pod_part,
        ld_lot: po.pod_serial,
        ld_site: po.pod_site,
        ld_loc: po.item.pt_loc,
      });
      if (ld)
        await locationDetailServiceInstance.update(
          {
            ld_qty_oh: Number(ld.ld_qty_oh) + Number(po.pod_qty_rcvd),
            ld__log01: true,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          },
          { id: ld.id },
        );
      else
        await locationDetailServiceInstance.create({
          ld_domain: user_domain,
          ld_part: po.pod_part,
          ld_date: new Date(),
          ld_lot: po.pod_serial,
          ld_site: po.pod_site,
          ld_loc: po.item.pt_loc,
          ld_qty_oh: Number(po.pod_qty_rcvd),
          ld_status: 'CONFORME',
          ld__log01: true,
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
        });
    }

    return res.status(200).json({ message: 'fetched succesfully', data: 'devise' });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const { id } = req.params;
    const devise = await purchaseReceiveServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: devise });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_domain } = req.headers;
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const devise = await purchaseReceiveServiceInstance.find({ prh_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: devise });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findGroup = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_domain } = req.headers;

  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const devise = await purchaseReceiveServiceInstance.distinct({ prh_domain: user_domain });
    console.log(devise);
    return res.status(200).json({ message: 'fetched succesfully', data: devise });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findAllDistinct = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const sequelize = Container.get('sequelize');
  const { user_domain } = req.headers;

  logger.debug('Calling find all purchaseOrder endpoint');
  try {
    let result = [];
    const { liste, distinct } = req.params;
    //console.log(distinct, "disting")
    console.log(liste, 'disting');

    const prhs = await sequelize.query(
      "SELECT DISTINCT PUBLIC.prh_hist.prh_receiver, PUBLIC.prh_hist.prh_vend, PUBLIC.prh_hist. prh_rcp_date  FROM   PUBLIC.prh_hist where PUBLIC.prh_hist.prh_domain = ? and PUBLIC.prh_hist.prh_invoiced = 'false' and  PUBLIC.prh_hist.prh_vend = ? and PUBLIC.prh_hist.prh_site = ?",
      { replacements: [user_domain, distinct, liste], type: QueryTypes.SELECT },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: prhs });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findDistinct = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const sequelize = Container.get('sequelize');
  const { user_domain } = req.headers;

  logger.debug('Calling find all purchaseOrder endpoint');
  try {
    let result = [];
    //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)
    const prhs = await sequelize.query(
      'SELECT DISTINCT PUBLIC.prh_hist.prh_receiver, PUBLIC.prh_hist.prh_vend, PUBLIC.prh_hist.id,  PUBLIC.prh_hist.prh_rcp_date  FROM   PUBLIC.prh_hist  where PUBLIC.prh_hist.prh_domain = ? ',
      { replacements: [user_domain], type: QueryTypes.SELECT },
    );
    console.log(prhs);
    return res.status(200).json({ message: 'fetched succesfully', data: prhs });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_domain } = req.headers;
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const prh = await purchaseReceiveServiceInstance.find({ ...req.body, prh_domain: user_domain });
    console.log(prh);
    return res.status(200).json({ message: 'fetched succesfully', data: prh });
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
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const { id } = req.params;
    const devise = await purchaseReceiveServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: devise });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  code endpoint');
  try {
    const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
    const { id } = req.params;
    const devise = await purchaseReceiveServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findGroupRCP = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_domain } = req.headers;

  const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
  try {
    const prhs = await purchaseReceiveServiceInstance.findspec({
      attributes: ['prh_receiver', 'prh_rcp_date', 'prh_vend'],
      group: ['prh_receiver', 'prh_rcp_date', 'prh_vend'],
      raw: true,
    });
    var i = 1;
    let result = [];
    for (let prh of prhs) {
      result.push({
        id: i,
        prh_receiver: prh.prh_receiver,
        prh_rcp_date: prh.prh_rcp_date,
        prh_vend: prh.prh_vend,
      });
      i = i + 1;
    }

    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findGroupAmt = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_domain } = req.headers;

  const purchaseReceiveServiceInstance = Container.get(PurchaseReceiveService);
  try {
    const prhs = await purchaseReceiveServiceInstance.findspec({
      attributes: ['prh_receiver', 'prh_rcp_date', 'prh_vend', [Sequelize.fn('sum', Sequelize.literal('prh_rcvd * prh_pur_cost')), 'total_amt']],
      group: ['prh_receiver', 'prh_rcp_date', 'prh_vend'],

      raw: true,
    });
    var i = 1;
    let result = [];
    for (let prh of prhs) {
      result.push({
        id: i,
        prh_receiver: prh.prh_receiver,
        prh_rcp_date: prh.prh_rcp_date,
        prh_vend: prh.prh_vend,
        total_amt: prh.total_amt,
      });
      i = i + 1;
    }
console.log(result)
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  createCab,
  findOne,
  findAllDistinct,
  findDistinct,
  findAll,
  findGroup,
  findBy,
  update,
  deleteOne,
  rctPo,
  findGroupRCP,
  findGroupAmt
};
