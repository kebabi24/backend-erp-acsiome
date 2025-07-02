import PrinterService from '../../services/printers';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op } from 'sequelize';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const data = req.body;

    const printerServiceInstance = Container.get(PrinterService);

    const printer = await printerServiceInstance.create({
      ...data,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });

    return res.status(200).json({ message: 'create succesfully', data: printer });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const { user_domain } = req.headers;
  try {
    const printerServiceInstance = Container.get(PrinterService);
    const printers = await printerServiceInstance.findByPrinters({});
    return res.status(200).json({ message: 'fetched succesfully', data: printers });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findByPrinter = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const { user_domain } = req.headers;
  
  try {
    const printerServiceInstance = Container.get(PrinterService);
    const printers = await printerServiceInstance.findPrinter({ ...req.body });
    console.log(printers)
    return res.status(200).json({ message: 'fetched succesfully', data: printers });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all user endpoint');
  const { user_domain } = req.headers;
  
  try {
    const printerServiceInstance = Container.get(PrinterService);
    console.log(req.body)
    const printers = await printerServiceInstance.findByUserPrinters({ ...req.body });
console.log(printers)
let result=[]    
    console.log(printers)
    let i = 1
 for(let printer of printers) {
  const pr = await printerServiceInstance.findPrinter({printer_code: printer.printer_code})
 let obj = {
  id: i,
  usrd_code : printer.usrd_code,
  printer_code: printer.printer_code,
  printer_desc: printer.printer_desc,
  printer_path:  pr.printer_path,
 }
result.push(obj)
i++
 }
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const affectPrinters = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling update one  code endpoint');
  try {
    const user_code = req.body.user_code;
    const printers = req.body.printers;
    console.log(typeof req.body.printers);
    const printerServiceInstance = Container.get(PrinterService);
    for (let p of printers) {
      const printer = await printerServiceInstance.affectPrinter({
        usrd_code: user_code,
        printer_code: p.printer_code,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
    }
    return res.status(200).json({ message: 'create succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  findAll,
  affectPrinters,
  findBy,
  findByPrinter
};
