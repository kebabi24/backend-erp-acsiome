import LabelService from '../../services/label';
import SequenceService from '../../services/sequence';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { QueryTypes } from 'sequelize';
const PDFDocument = require('pdfkit');
const fs = require('fs');
const bwipjs = require('bwip-js');
const printer = require('pdf-to-printer');

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  // doc.rect(0, 0, doc.page.width, doc.page.height).fill('black');

  // // Set the text color
  // doc.fillColor('white');
  logger.debug('Calling Create label endpoint');
  console.log('heeeeeeeeeeeeeeeeeeeee', req.body);
  try {
    const labelServiceInstance = Container.get(LabelService);
    const sequenceServiceInstance = Container.get(SequenceService);

    const pageWidth = 284; // Width of the page in points
    const pageHeight = 426; // Height of the page in points
    var labelId = null;
    const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'PL', seq_type: 'PL' });
    console.log(seq);
    labelId = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
    await sequenceServiceInstance.update(
      { seq_curr_val: Number(seq.seq_curr_val) + 1 },
      { seq_type: 'PL', seq_seq: 'PL', seq_domain: user_domain },
    );
    const label = await labelServiceInstance.create({
      ...req.body,
      lb_ref: labelId,
      lb_cab: labelId,
      lb_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

    const doc = new PDFDocument({ size: [pageWidth, pageHeight] });
    doc.page.margins = { top: 0, bottom: 0, left: 0, right: 0 };
    const image = doc.openImage('./edel.jpg');

    // Draw the barcode image on the PDF document
    doc.image(image, 50, 0, {
      fit: [180, 150], // Adjust the size of the barcode image as needed
    });

    doc
      .rect(10, 80, 265, 80)
      .stroke()
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('CLIENT : ' + 'KAMEL', 20, 90)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('ADRESSE :' + 'REGAHAIA', 20, 115)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('TEL :' + '0778988767', 20, 140);

    // Define the second rectangle and its text lines
    doc
      .rect(10, 170, 265, 130)
      .stroke()
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('PRODUIT :' + req.body.lb_desc, 20, 180)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('MICRONAGE/ LAIZE :' + 'INT', 20, 203)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('QTE :' + req.body.lb_qty, 20, 228)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('N° Lot:' + req.body.lb_lot, 20, 253)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('GROUPE:' + 'LBL001', 20, 278);

    // Define the third rectangle and its text lines
    doc
      .rect(10, 310, 265, 70)
      .stroke()
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('BARCODE:', 20, 320)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('FABRIQUE EN ALGERIE', 75, 405);

    bwipjs.toBuffer(
      {
        bcid: 'code128', // Barcode type (replace with the desired barcode format)
        text: labelId, // Barcode data
        scale: 3, // Scaling factor for the barcode image
        includetext: true, // Include the barcode text
        height: 10,
        width: 60,
      },
      function(err, png) {
        if (err) {
          console.log(err);
          return;
        }

        // Load the barcode image from the generated PNG buffer
        const image = doc.openImage(png);

        // Draw the barcode image on the PDF document
        doc.image(image, 50, 335, {
          fit: [5400, 40], // Adjust the size of the barcode image as needed
        });
        // Save the PDF document
        doc.pipe(fs.createWriteStream('output12.pdf'));
        doc.end();
      },
    );

    const filePath = './output12.pdf';
    const printerName = 'Xprinter XP-TT426B';

    printer
      .print(filePath, { printer: printerName })
      .then(() => {
        console.log('Printing completed.');
      })
      .catch(error => {
        console.error('Error while printing:', error);
      });
    return res.status(201).json({ message: 'created succesfully', data: label });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createProd = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  const pageWidth = 118 * 2.83465; // Width of the page in points
  const pageHeight = 120 * 2.83465; // Height of the page in points

  const doc = new PDFDocument({ size: [pageWidth, pageHeight] });
  logger.debug('Calling Create label endpoint');
  //console.log("heeeeeeeeeeeeeeeeeeeee",req.body)
  try {
    const labelServiceInstance = Container.get(LabelService);
    const sequenceServiceInstance = Container.get(SequenceService);
    var labelId = null;
    const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'CAR', seq_type: 'PL' });
    // console.log(seq);
    labelId = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
    await sequenceServiceInstance.update(
      { seq_curr_val: Number(seq.seq_curr_val) + 1 },
      { id: seq.id, seq_type: 'PL', seq_seq: 'CAR', seq_domain: user_domain },
    );
    const label = await labelServiceInstance.create({
      ...req.body,
      lb_ref: labelId,
      lb_cab: labelId,
      lb_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    const pageWidth = 284; // Width of the page in points
    const pageHeight = 426; // Height of the page in points

    const doc = new PDFDocument({ size: [pageWidth, pageHeight] });
    doc.page.margins = { top: 0, bottom: 0, left: 0, right: 0 };
    const image = doc.openImage('./edel.jpg');

    // Draw the barcode image on the PDF document
    doc.image(image, 50, 0, {
      fit: [180, 150], // Adjust the size of the barcode image as needed
    });

    doc
      .rect(10, 80, 265, 80)
      .stroke()
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('PRODUIT : ', 20, 90)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('QTE :', 20, 115)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('N° LOT :', 20, 140);

    // Define the second rectangle and its text lines
    doc
      .rect(10, 170, 265, 80)
      .stroke()
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('PAR :', 20, 180)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('DATE DE RECEPTION :', 20, 203)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('PAL N° :', 20, 228);

    // Define the third rectangle and its text lines
    doc
      .rect(10, 310, 265, 70)
      .stroke()
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('BARCODE:', 20, 320)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('FABRIQUE EN ALGERIE', 75, 405);

    bwipjs.toBuffer(
      {
        bcid: 'code128', // Barcode type (replace with the desired barcode format)
        text: 'barcode1', // Barcode data
        scale: 3, // Scaling factor for the barcode image
        includetext: true, // Include the barcode text
        height: 10,
        width: 72,
      },
      function(err, png) {
        if (err) {
          console.log(err);
          return;
        }

        // Load the barcode image from the generated PNG buffer
        const image = doc.openImage(png);

        // Draw the barcode image on the PDF document
        doc.image(image, 50, 335, {
          fit: [5400, 40], // Adjust the size of the barcode image as needed
        });
        // Save the PDF document
        doc.pipe(fs.createWriteStream('output.pdf'));
        doc.end();
      },
    );

    // const filePath = './output.pdf';
    // const printerName = 'Xprinter XP-TT426B';

    // printer
    //   .print(filePath, { printer: printerName })
    //   .then(() => {
    //     console.log('Printing completed.');
    //   })
    //   .catch(error => {
    //     console.error('Error while printing:', error);
    //   });
    return res.status(201).json({ message: 'created succesfully', data: label });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const createPAL = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create label endpoint');
  //console.log("heeeeeeeeeeeeeeeeeeeee",req.body)
  try {
    const labelServiceInstance = Container.get(LabelService);
    const sequenceServiceInstance = Container.get(SequenceService);
    var labelId = null;
    const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'PAL', seq_type: 'PL' });
    // console.log(seq);
    labelId = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
    await sequenceServiceInstance.update(
      { seq_curr_val: Number(seq.seq_curr_val) + 1 },
      { id: seq.id, seq_type: 'PL', seq_seq: 'PAL', seq_domain: user_domain },
    );
    const label = await labelServiceInstance.create({
      ...req.body,
      //lb_ref: labelId,
      lb_pal: labelId,
      lb_cab: labelId,
      lb_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    const pageWidth = 284; // Width of the page in points
    const pageHeight = 426; // Height of the page in points

    const doc = new PDFDocument({ size: [pageWidth, pageHeight] });
    doc.page.margins = { top: 0, bottom: 0, left: 0, right: 0 };
    const image = doc.openImage('./edel.jpg');

    // Draw the barcode image on the PDF document
    doc.image(image, 50, 0, {
      fit: [180, 150], // Adjust the size of the barcode image as needed
    });

    doc
      .rect(10, 80, 265, 80)
      .stroke()
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('PRODUIT : ', 20, 90)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('QTE :', 20, 115)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('N° LOT :', 20, 140);

    // Define the second rectangle and its text lines
    doc
      .rect(10, 170, 265, 80)
      .stroke()
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('PAR :', 20, 180)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('DATE DE RECEPTION :', 20, 203)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('PAL N° :', 20, 228);

    // Define the third rectangle and its text lines
    doc
      .rect(10, 310, 265, 70)
      .stroke()
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('BARCODE:', 20, 320)
      .font('Helvetica-Bold')
      .fontSize(12)
      .text('FABRIQUE EN ALGERIE', 75, 405);

    bwipjs.toBuffer(
      {
        bcid: 'code128', // Barcode type (replace with the desired barcode format)
        text: 'barcode1', // Barcode data
        scale: 3, // Scaling factor for the barcode image
        includetext: true, // Include the barcode text
        height: 10,
        width: 72,
      },
      function(err, png) {
        if (err) {
          console.log(err);
          return;
        }

        // Load the barcode image from the generated PNG buffer
        const image = doc.openImage(png);

        // Draw the barcode image on the PDF document
        doc.image(image, 50, 335, {
          fit: [5400, 40], // Adjust the size of the barcode image as needed
        });
        // Save the PDF document
        doc.pipe(fs.createWriteStream('output.pdf'));
        doc.end();
      },
    );

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
    return res.status(201).json({ message: 'created succesfully', data: label });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  console.log(req.body);
  logger.debug('Calling find by  all job endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const labelServiceInstance = Container.get(LabelService);
    const label = await labelServiceInstance.findOne({
      ...req.body,
      lb_domain: user_domain,
    });
    return res.status(200).json({
      message: 'fetched succesfully',
      data: { label },
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  job endpoint');
  try {
    const labelServiceInstance = Container.get(LabelService);
    const { id } = req.params;
    const label = await labelServiceInstance.findOne({ id });

    return res.status(200).json({
      message: 'fetched succesfully',
      data: { label },
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all job endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  try {
    const labelServiceInstance = Container.get(LabelService);
    const labels = await labelServiceInstance.find({ lb_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: labels });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  job endpoint');
  try {
    const labelServiceInstance = Container.get(LabelService);
    const { id } = req.params;
    const label = await labelServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: label });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const updated = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  job endpoint');
  try {
    const labelServiceInstance = Container.get(LabelService);
    const detail = req.body.detail;
    const palnbr = req.body.nbr;

    for (let data of detail) {
      const label = await labelServiceInstance.update(
        { lb_pal: palnbr, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
        { lb_ref: data.tr_ref },
      );
    }

    return res.status(200).json({ message: 'fetched succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  createProd,
  createPAL,
  findBy,
  findOne,
  findAll,
  update,
  updated,
};
