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
  const pageWidth = 118 * 2.83465; // Width of the page in points
  const pageHeight = 120 * 2.83465; // Height of the page in points

  const doc = new PDFDocument({ size: [pageWidth, pageHeight] });
  logger.debug('Calling Create label endpoint');
  console.log('heeeeeeeeeeeeeeeeeeeee', req.body);
  try {
    const labelServiceInstance = Container.get(LabelService);
    const sequenceServiceInstance = Container.get(SequenceService);
    // var labelId = null;
    // const seq = await sequenceServiceInstance.findOne({ seq_domain: user_domain, seq_seq: 'PL', seq_type: 'PL' });
    // console.log(seq);
    // labelId = `${seq.seq_prefix}-${Number(seq.seq_curr_val) + 1}`;
    // await sequenceServiceInstance.update(
    //   { seq_curr_val: Number(seq.seq_curr_val) + 1 },
    //   { seq_type: 'PL', seq_seq: 'PL', seq_domain: user_domain },
    // );
    // const label = await labelServiceInstance.create({
    //   ...req.body,
    //   lb_ref: labelId,
    //   lb_cab: labelId,
    //   lb_domain: user_domain,
    //   created_by: user_code,
    //   created_ip_adr: req.headers.origin,
    //   last_modified_by: user_code,
    //   last_modified_ip_adr: req.headers.origin,
    // });

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
    doc.pipe(fs.createWriteStream('output.pdf'));
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
    return res.status(201).json({ message: 'created succesfully', data: true });
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
    const pageWidth = 118 * 2.83465; // Width of the page in points
    const pageHeight = 120 * 2.83465; // Height of the page in points

    const doc = new PDFDocument({ size: [pageWidth, pageHeight] });
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
    doc.pipe(fs.createWriteStream('output.pdf'));
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
    const pageWidth = 118 * 2.83465; // Width of the page in points
    const pageHeight = 120 * 2.83465; // Height of the page in points

    const doc = new PDFDocument({ size: [pageWidth, pageHeight] });
    for (let data of detail) {
      const label = await labelServiceInstance.update(
        { lb_pal: palnbr, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
        { lb_ref: data.tr_ref },
      );
    }

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
    doc.pipe(fs.createWriteStream('output.pdf'));
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
