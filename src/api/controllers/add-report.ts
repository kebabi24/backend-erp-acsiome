import AddReportService from '../../services/add-report';
import ProjectTaskDetailService from '../../services/project-task-detail';
import ProjectDetailService from '../../services/project-detail';
import ProjectService from '../../services/project';
import InventoryTransactionService from '../../services/inventory-transaction';
import locationDetailService from '../../services/location-details';
import costSimulationService from '../../services/cost-simulation';
import itemService from '../../services/item';
import SaleorderDetailService from '../../services/saleorder-detail';
import SaleorderService from '../../services/saleorder';

import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create code endpoint');
  try {
    const addReportServiceInstance = Container.get(AddReportService);
    const projectTaskDetailServiceInstance = Container.get(ProjectTaskDetailService);
    const projectDetailServiceInstance = Container.get(ProjectDetailService);
    const projectServiceInstance = Container.get(ProjectService);
    const inventoryTransactionServiceInstance = Container.get(InventoryTransactionService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const costSimulationServiceInstance = Container.get(costSimulationService);
    const itemServiceInstance = Container.get(itemService);
    const saleorderDetailServiceInstance = Container.get(SaleorderDetailService);
    const saleorderServiceInstance = Container.get(SaleorderService);
    const { addReport, empDetail, cnsDetail, nbr } = req.body;
    console.log('req body', req.body);
    console.log(nbr);
    const task = await projectTaskDetailServiceInstance.findOne({
      pmt_code: addReport.pmr_pm_code,
      pmt_domain: user_domain,
      pmt_inst: addReport.pmr_inst,
      pmt_task: addReport.pmr_task,
    });

    const tk = await projectTaskDetailServiceInstance.update(
      { pmt_status: addReport.pmr_task_status, pmt_close: addReport.pmr_close },
      { id: task.id },
    );
    if (addReport.pmr_close) {
      const pm = await projectServiceInstance.findOne({ pm_code: addReport.pmr_pm_code, pm_domain: user_domain });

      const pmd = await projectDetailServiceInstance.findOne({
        pmd_code: addReport.pmr_pm_code,
        pmd_domain: user_domain,
        pmd_task: addReport.pmr_inst,
      });

      const so = await saleorderServiceInstance.findOne({ so_po: addReport.pmr_pm_code, sod_domain: user_domain });
      const sod = await saleorderDetailServiceInstance.findOne({
        sod_nbr: so.so_nbr,
        sod_domain: user_domain,
        sod_part: pmd.pmd_part,
        sod__chr01: pmd.pmd_task,
      });
    }
    for (let entry of empDetail) {
      const pm = await projectServiceInstance.findOne({ pm_code: addReport.pmr_pm_code, pm_domain: user_domain });

      const pmd = await projectDetailServiceInstance.findOne({
        pmd_code: addReport.pmr_pm_code,
        pmd_domain: user_domain,
        pmd_task: addReport.pmr_inst,
      });

      const so = await saleorderServiceInstance.findOne({ so_po: addReport.pmr_pm_code, so_domain: user_domain });
      const sod = await saleorderDetailServiceInstance.findOne({
        sod_nbr: so.so_nbr,
        sod_domain: user_domain,
        sod_part: pmd.pmd_part,
        sod__chr01: pmd.pmd_task,
      });

      await saleorderDetailServiceInstance.update(
        {
          sod_mobilisation: entry.pmr_mobilisation,
          sod_demobilisation: entry.pmr_demobilisation,
          sod_separe: entry.pmr_separe,
          sod_stndby: entry.pmr_stndby,
        },
        { sod_nbr: sod.so_nbr, sod_domain: user_domain, sod_part: pmd.pmd_part, sod__chr01: pmd.pmd_task },
      );
    }
    for (let entry of empDetail) {
      await addReportServiceInstance.create({
        ...entry,
        pmr_nbr: nbr,
        pmr_domain: user_domain,
        pmr_pm_code: addReport.pmr_pm_code,
        pmr_inst: addReport.pmr_inst,
        pmr_task: addReport.pmr_task,
        pmr_task_status: addReport.pmr_task_status,
        pmr_close: addReport.pmr_close,
        pmr_mobilisation: addReport.pmr_mobilisation,
        pmr_demobilisation: addReport.pmr_demobilisation,
        pmr_separe: addReport.pmr_separe,
        pmr_stndby: addReport.pmr_stndby,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
    }

    for (const item of cnsDetail) {
      const sct = await costSimulationServiceInstance.findOne({
        sct_domain: user_domain,
        sct_part: item.tr_part,
        sct_site: item.tr_site,
        sct_sim: 'STD-CG',
      });
      const pt = await itemServiceInstance.findOne({ pt_part: item.tr_part, pt_domain: user_domain });
      const ld = await locationDetailServiceInstance.findOne({
        ld_domain: user_domain,
        ld_part: item.tr_part,
        ld_lot: item.tr_serial,
        ld_site: item.tr_site,
        ld_loc: item.tr_loc,
      });

      if (ld)
        await locationDetailServiceInstance.update(
          {
            ld_qty_oh: Number(ld.ld_qty_oh) - Number(item.tr_qty_loc) * Number(item.tr_um_conv),
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          },
          { id: ld.id },
        );
      await inventoryTransactionServiceInstance.create({
        ...item,
        tr_domain: user_domain,
        tr_lot: nbr,
        tr_effdate: new Date(),
        tr_gl_date: new Date(),
        tr_qty_loc: -1 * Number(item.tr_qty_loc),
        tr_qty_chg: -1 * Number(item.tr_qty_loc),
        tr_loc_begin: Number(ld.ld_qty_oh),
        tr_type: 'ISS-CNS',
        tr_date: new Date(),
        tr_mtl_std: sct.sct_mtl_tl,
        tr_lbr_std: sct.sct_lbr_tl,
        tr_bdn_std: sct.sct_bdn_tl,
        tr_ovh_std: sct.sct_ovh_tl,
        tr_sub_std: sct.sct_sub_tl,
        tr_prod_line: pt.pt_prod_line,
        tr_gl_amt: Number(item.tr_qty_loc) * Number(item.tr_um_conv) * Number(item.tr_price),
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      });
    }

    //  const affectemploye = await addReportServiceInstance.create({...req.body, created_by: user_code, last_modified_by: user_code})
    return res.status(201).json({ message: 'created succesfully', data: addReport });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const addReportServiceInstance = Container.get(AddReportService);
    const { id } = req.params;
    const employe = await addReportServiceInstance.findOne({ id });
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const addReportServiceInstance = Container.get(AddReportService);
    const employe = await addReportServiceInstance.find({ pmr_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all code endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const addReportServiceInstance = Container.get(AddReportService);
    const employe = await addReportServiceInstance.find({ ...req.body, pmr_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  code endpoint');
  try {
    const addReportServiceInstance = Container.get(AddReportService);
    const { id } = req.params;
    const employe = await addReportServiceInstance.update({ ...req.body, last_modified_by: user_code }, { id });
    return res.status(200).json({ message: 'fetched succesfully', data: employe });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling update one  code endpoint');
  try {
    const addReportServiceInstance = Container.get(AddReportService);
    const { id } = req.params;
    const employe = await addReportServiceInstance.delete({ id });
    return res.status(200).json({ message: 'deleted succesfully', data: id });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
export default {
  create,
  findOne,
  findAll,
  findBy,
  update,
  deleteOne,
};
