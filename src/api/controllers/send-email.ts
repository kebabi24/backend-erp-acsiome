import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const sendContactMail = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const nodemailer = require('nodemailer');
  logger.debug('Calling Create sequence endpoint');
  const { formData } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,

      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'abdelmounaim.kebabi@acsiome.tech',
        pass: '123456789',
      },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'abdelmounaim.kebabi@acsiome.tech', // sender address
      to: `${formData.email}`, // list of receivers
      subject: `${formData.objet}`, // Subject line
      text: `${formData.message + formData.phone}`, // plain text body
      html: '<b>Hello world?</b>', // html body
    });
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
    return res.status(201).json({ message: 'sent succesfully', data: true });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  sendContactMail,
};
