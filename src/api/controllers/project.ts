import ProjectService from '../../services/project';
import ProjectDetailService from '../../services/project-detail';
import ProjectTaskDetailService from '../../services/project-task-detail';
import SaleOrderService from '../../services/saleorder';
import SaleOrderDetailService from '../../services/saleorder-detail';
import DealService from '../../services/deal';
import itemService from '../../services/item';
import CustomerService from '../../services/customer';
import PsService from '../../services/ps';
import AffectEmployeService from '../../services/affect-employe';
import TaskDetailService from '../../services/task-detail';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { QueryTypes } from 'sequelize';
import LocationService from '../../services/location';
import toolDetailService from '../../services/tool-detail';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling Create sequence endpoint');
  try {
    const projectServiceInstance = Container.get(ProjectService);
    const projectDetailServiceInstance = Container.get(ProjectDetailService);
    const projectTaskDetailServiceInstance = Container.get(ProjectTaskDetailService);
    const taskDetailServiceInstance = Container.get(TaskDetailService);
    const saleOrderServiceInstance = Container.get(SaleOrderService);
    const saleOrderDetailServiceInstance = Container.get(SaleOrderDetailService);
    const customerServiceInstance = Container.get(CustomerService);
    const dealServiceInstance = Container.get(DealService);
    const itemServiceInstance = Container.get(itemService);
    const locationServiceInstance = Container.get(LocationService);
    const { Project, ProjectDetails, docs_codes } = req.body;
    const pj = await projectServiceInstance.create({
      ...Project,
      pm_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    /*creation location*/
    const loc = await locationServiceInstance.create({
      loc_loc : Project.pm_code,
      loc_site: Project.pm_site,
      loc_project : Project.pm_code,
      loc_status : "CONFORME",
      loc_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
  
    /*creation location*/
    /* creation specification documents*/

    const project_code = Project.pm_code;
    let data = [];
    docs_codes.forEach(doc => {
      console.log('*************************');
      console.log(doc);
      data.push({
        pjd_nbr: project_code,
        mp_nbr: doc.code_doc,
        pjd_trigger: doc.trigger,
        pjd_domain: user_domain,
      });
    });
    const pjDetails = await projectServiceInstance.createDocsDetails(data);

    for (let entry of ProjectDetails) {
      entry = {
        ...entry,
        pmd_domain: user_domain,
        pmd_code: Project.pm_code,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
      };
      await projectDetailServiceInstance.create(entry);
      const tasks = await taskDetailServiceInstance.find({ tkd_code: entry.pmd_task, tkd_domain: user_domain });
      for (let tks of tasks) {
        const tk = {
          pmt_domain: user_domain,
          pmt_task: tks.tkd_nbr,
          pmt_desc: tks.tkd_desc,
          pmt_job: tks.tkd_job,
          pmt_tool: tks.tkd_tool,
          pmt_level: tks.tkd_level,
          pmt_duration: tks.tkd_duration,
        };
        console.log(tk);
        await projectTaskDetailServiceInstance.create({ ...tk, pmt_code: Project.pm_code, pmt_inst: entry.pmd_task });
      }
    }
    /*so*/
    let cr_terms: String;
    const customer = await customerServiceInstance.findOne({ cm_addr: Project.pm_cust });
    cr_terms = customer.cm_cr_terms;

    if (Project.pm_deal != null) {
      const deal = await dealServiceInstance.findOne({ deal_code: Project.pm_deal });

      cr_terms = deal.deal_pay_meth;
    }

    let SaleOrder = {
      so_category: 'SO',
      so_cust: Project.pm_cust,
      so_ord_date: Project.pm_ord_date,
      so_due_date: Project.pm_ord_date,
      so_po: Project.pm_code,
      so_amt: Project.pm_amt,
      so_cr_terms: cr_terms,
      so_curr: customer.cm_curr,
      so_taxable: customer.address.ad_taxable,
      so_taxc: customer.address.ad_taxc,
      so_ex_rate: 1,
      so_ex_rate2: 1,
    };
    let sodataset = [];
    let type: String;
    for (let data of ProjectDetails) {
      const pt = await itemServiceInstance.findOne({ pt_domain: user_domain, pt_part: data.pmd_part });
      if (pt.pt_phantom) {
        type = 'M';
      } else {
        type = null;
      }
      sodataset.push({
        sod_line: data.pmd_line,
        sod_part: pt.pt_part,
        sod_um: pt.pt_um,
        sod__chr01: data.pmd_task,
        sod__chr02: data.pmd_bom_code,
        sod_qty_ord: data.pmd_qty,
        sod_qty_ret: data.int01,
        sod_qty_cons: 0,
        sod_desc: pt.pt_desc1,
        sod_site: pt.pt_site,
        sod_loc: pt.pt_loc,
        sod_um_conv: 1,
        sod_type: type,
        sod_price: pt.pt_price,
        sod_disc_pct: 0,
        sod_tax_code: pt.pt_taxc,
        sod_taxc: pt.taxe.tx2_tax_pct,
        sod_taxable: pt.pt_taxable,
      });
    }

    const so = await saleOrderServiceInstance.create({
      ...SaleOrder,
      so_domain: user_domain,
      created_by: user_code,
      created_ip_adr: req.headers.origin,
      last_modified_by: user_code,
      last_modified_ip_adr: req.headers.origin,
    });
    for (let entry of sodataset) {
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

    /*so*/

    return res.status(201).json({ message: 'created succesfully', data: pj });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  logger.debug('Calling find by  all project endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const projectServiceInstance = Container.get(ProjectService);
    const projectDetailServiceInstance = Container.get(ProjectDetailService);
    const project = await projectServiceInstance.findOne({
      ...req.body,
      pm_domain: user_domain,
    });
    console.log('hhhhhhhhhhhhhhhh');
    if (project) {
      const details = await projectDetailServiceInstance.find({
        pmd_domain: user_domain,
        pmd_code: project.pm_code,
      });
      console.log(project);
      return res.status(200).json({
        message: 'fetched succesfully',
        data: { project, details },
      });
    } else {
      return res.status(200).json({
        message: 'not FOund',
        data: { project, details: null },
      });
    }
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByTask = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  
  let details2: any;
  let details3: any;
  logger.debug('Calling find by  all project endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const projectTaskDetailServiceInstance = Container.get(ProjectTaskDetailService);
    const taskDetailServiceInstance = Container.get(TaskDetailService);
    const toolDetailServiceInstance = Container.get(toolDetailService);
    const details = await projectTaskDetailServiceInstance.find({
      ...req.body,
      pmt_domain: user_domain,
    });
    for (let i of details) {
      console.log(i);
      const details = await toolDetailServiceInstance.find({
        tod_code: i.pmt_tool,
      });
      details2 = details;
    }

    for (let i of details) {
      console.log(i);
      const details = await taskDetailServiceInstance.find({
        tkd_code: i.pmt_inst,
      });
      details3 = details;
    }

    return res.status(200).json({
      message: 'fetched succesfully',
      data: { details, details2, details3 },
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findByPs = async (req: Request, res: Response, next: NextFunction) => {
  let ps: any[] = [];
  const logger = Container.get('logger');

  logger.debug('Calling find by  all project endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const projectDetailServiceInstance = Container.get(ProjectDetailService);
    const psServiceInstance = Container.get(PsService);

    const details = await projectDetailServiceInstance.find({
      ...req.body,
      pmd_domain: user_domain,
    });
    for (let item of details) {
      ps = await psServiceInstance.find({
        ps_parent: item.pmd_bom_code,
        ps_domain: user_domain,
      });
    }

    return res.status(200).json({
      message: 'fetched succesfully',
      data: ps,
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  project endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const projectServiceInstance = Container.get(ProjectService);
    const { id } = req.params;
    const project = await projectServiceInstance.findOne({ id });
    const projectDetailServiceInstance = Container.get(ProjectDetailService);
    const details = await projectDetailServiceInstance.find({
      pmd_code: project.pm_code,
      pmd_domain: user_domain,
    });

    // for(let det of details) {
    //   det.desc = det.task.tk_desc

    // }
    console.log(details);
    return res.status(200).json({
      message: 'fetched succesfully',
      data: { project, details },
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllBy = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all project endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const projectServiceInstance = Container.get(ProjectService);
    const projects = await projectServiceInstance.find({ ...req.body, pm_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: projects });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all project endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const projectServiceInstance = Container.get(ProjectService);
    const projects = await projectServiceInstance.find({ pm_domain: user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: projects });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  project endpoint');
  try {
    const projectServiceInstance = Container.get(ProjectService);
    const projectDetailServiceInstance = Container.get(ProjectDetailService);
    const { id } = req.params;
    const { project, details, docs_codes } = req.body;
    console.log('project', project);
    const pj = await projectServiceInstance.update(
      { ...project, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    await projectDetailServiceInstance.delete({ pmd_code: project.pm_code, pmd_domain: user_domain });
    for (let entry of details) {
      entry = {
        ...entry,
        pmd_domain: user_domain,
        pmd_code: project.pm_code,
        created_by: user_code,
        created_ip_adr: req.headers.origin,
        last_modified_by: user_code,
        last_modified_ip_adr: req.headers.origin,
      };
      await projectDetailServiceInstance.create(entry);
    }
    const project_code = project.pm_code;
    let data = [];

    await projectServiceInstance.deleteSpec({ pjd_nbr: project_code });
    docs_codes.forEach(doc => {
      console.log('*************************');
      console.log(doc);
      data.push({
        pjd_nbr: project_code,
        mp_nbr: doc.code_doc,
        pjd_trigger: doc.trigger,
        pjd_domain: user_domain,
      });
    });

    const pjDetails = await projectServiceInstance.createDocsDetails(data);

    return res.status(200).json({ message: 'fetched succesfully', data: pj });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const updateM = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;

  logger.debug('Calling update one  project endpoint');
  try {
    const projectServiceInstance = Container.get(ProjectService);
    const { id } = req.params;
    const { project } = req.body;
    const pj = await projectServiceInstance.update(
      { ...req.body, last_modified_by: user_code, last_modified_ip_adr: req.headers.origin },
      { id },
    );
    return res.status(200).json({ message: 'fetched succesfully', data: pj });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllwithDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const sequelize = Container.get('sequelize');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find all purchaseOrder endpoint');
  try {
    let result = [];
    //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

    const pos = await sequelize.query(
      'SELECT * , PUBLIC.pmd_det.pmd_price / PUBLIC.pmd_det.pmd_qty as UP  FROM  PUBLIC.tk_mstr, PUBLIC.pm_mstr,  PUBLIC.pmd_det  where PUBLIC.pmd_det.pmd_domain = ? and PUBLIC.pmd_det.pmd_code = PUBLIC.pm_mstr.pm_code and PUBLIC.tk_mstr.tk_code = PUBLIC.pmd_det.pmd_task and PUBLIC.pm_mstr.pm_domain = PUBLIC.pmd_det.pmd_domain and  PUBLIC.tk_mstr.tk_domain = PUBLIC.pmd_det.pmd_domain ORDER BY PUBLIC.pmd_det.id ASC',
      { replacements: [user_domain], type: QueryTypes.SELECT },
    );
    console.log(pos);
    return res.status(200).json({ message: 'fetched succesfully', data: pos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllbomDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const sequelize = Container.get('sequelize');
  //SELECT  SUM(PUBLIC.pt_mstr.pt_price * PUBLIC.ps_mstr.ps_qty_per) as THT,
  console.log('kamelllllllllllllllll');
  logger.debug('Calling find all purchaseOrder endpoint');
  try {
    const pos = await sequelize.query(
      "SELECT   PUBLIC.sct_det.sct_cst_tot * PUBLIC.ps_mstr.ps_qty_per as TCOST, PUBLIC.pt_mstr.pt_price * PUBLIC.ps_mstr.ps_qty_per as THT, PUBLIC.ps_mstr.id , PUBLIC.sct_det.sct_cst_tot, PUBLIC.pm_mstr.pm_code, PUBLIC.pm_mstr.pm_desc, PUBLIC.ps_mstr.ps_comp, PUBLIC.ps_mstr.ps_qty_per, PUBLIC.pt_mstr.pt_price, PUBLIC.pt_mstr.pt_um  FROM   PUBLIC.pm_mstr,  PUBLIC.pmd_det , PUBLIC.ps_mstr, PUBLIC.pt_mstr, PUBLIC.sct_det where PUBLIC.pmd_det.pmd_code = PUBLIC.pm_mstr.pm_code  and PUBLIC.ps_mstr.ps_parent = PUBLIC.pmd_det.pmd_bom_code and PUBLIC.pt_mstr.pt_part = PUBLIC.ps_mstr.ps_comp and PUBLIC.sct_det.sct_part = PUBLIC.ps_mstr.ps_comp and PUBLIC.sct_det.sct_site = '1000' and PUBLIC.sct_det.sct_sim = 'STD-CG' ",
      { type: QueryTypes.SELECT },
    );
    for (var i = 0; i < pos.length; i++) {
      console.log(i);
      pos[i].id = i + 1;

      //console.log(pos.pm_code)
    }

    console.log('here');
    console.log(pos);
    return res.status(200).json({ message: 'fetched succesfully', data: pos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findpmdetail = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const sequelize = Container.get('sequelize');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  logger.debug('Calling find all purchaseOrder endpoint');
  try {
    let result = [];
    //const purchaseOrderServiceInstance = Container.get(PurchaseOrderService)

    const pos = await sequelize.query(
      'SELECT *, PUBLIC.pm_mstr.id as id, PUBLIC.pm_mstr.pm_cost / PUBLIC.pm_mstr.pm_amt as gm  FROM   PUBLIC.pm_mstr,  PUBLIC.ad_mstr  where PUBLIC.pm_mstr.pm_domain = ? and  PUBLIC.ad_mstr.ad_addr = PUBLIC.pm_mstr.pm_cust and PUBLIC.ad_mstr.ad_domain = PUBLIC.pm_mstr.pm_domain ORDER BY PUBLIC.pm_mstr.id ASC',
      { replacements: [user_domain], type: QueryTypes.SELECT },
    );
    console.log(pos);
    return res.status(200).json({ message: 'fetched succesfully', data: pos });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getProjectTypes = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find all project endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const projectServiceInstance = Container.get(ProjectService);
    const project_types = await projectServiceInstance.getProjectTypes();
    return res.status(200).json({ message: 'fetched succesfully', data: project_types });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// const assignEmpProject = async (req: Request, res: Response, next: NextFunction) => {
//     const logger = Container.get("logger")

//     logger.debug("Calling Create sequence endpoint")
//     try {
//         const projectServiceInstance = Container.get(ProjectService)
//         const { headerData, employees } = req.body

//         return res
//             .status(201)
//             .json({ message: "created succesfully", data: "" })
//     } catch (e) {
//         //#
//         logger.error("🔥 error: %o", e)
//         return next(e)
//     }
// }

const findAssignedEmpOfProject = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling findAssignedEmpOfProject endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const projectServiceInstance = Container.get(ProjectService);
    const { project_code } = req.params;
    const employees = await projectServiceInstance.findAllProjectDetails({
      pme_pm_code: project_code,
      pme_domain: user_domain,
    });

    return res.status(201).json({ message: 'created succesfully', data: employees });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findInstructionsOfProject = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  logger.debug('Calling findAssignedEmpOfProject endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const projectServiceInstance = Container.get(ProjectService);
    const { project_code } = req.params;
    const instructions = await projectServiceInstance.findAllProjectDetails({
      pme_pm_code: project_code,
      pme_domain: user_domain,
    });

    return res.status(201).json({ message: 'instructions found succesfully', data: instructions });
  } catch (e) {
    //#
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createAssetDown = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling createAssetDown endpoint');
  const { user_domain } = req.headers;
  const { data } = req.body;
  try {
    data.forEach(line => {
      delete line.id;
      line.pad_domain = user_domain;
    });
    const projectServiceInstance = Container.get(ProjectService);
    const assetsDown = await projectServiceInstance.createAssetDown(data);
    return res.status(200).json({ message: 'created succesfully', data: assetsDown });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getAssetDownTypes = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling createAssetDown endpoint');
  const { user_domain } = req.headers;
  try {
    const projectServiceInstance = Container.get(ProjectService);
    const types = await projectServiceInstance.getAssetDownTypes();
    return res.status(200).json({ message: 'fetched succesfully', data: types });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const testDocxRevue = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling testDocx endpoint');

  try {
    let dataset = req.body.data.dataset;
    let dataset2 = req.body.data.dataset2;
    let dataset3 = req.body.data.dataset3;
    let dataset4 = req.body.data.dataset4;
    const PizZip = require('pizzip');
    const Docxtemplater = require('docxtemplater');

    const fs = require('fs');
    const path = require('path');

    // Load the docx file as binary content
    const content = fs.readFileSync(path.resolve(__dirname, 'revue01.docx'), 'binary');

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render({
      pm_code: req.body.data.pme.pm_code,
      pm_type: req.body.data.pme.pm_type,
      pm_date: req.body.data.pme.pm_ord_date,
      pm_cust: req.body.data.pme.pm_cust,
      pm_site: req.body.data.pme.pm_site,
      dataset: dataset,
      dataset2: dataset2,
      dataset3: dataset3,
      dataset4: dataset4,
    });

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: 'DEFLATE',
    });

    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    fs.writeFileSync(path.resolve(__dirname, 'revueoutput.docx'), buf);
    return res.status(200).json({ message: 'fetched succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const testDocxSuivi = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling testDocx endpoint');

  try {
    
    const PizZip = require('pizzip');
    const Docxtemplater = require('docxtemplater');

    const fs = require('fs');
    const path = require('path');

    // Load the docx file as binary content
    const content = fs.readFileSync(path.resolve(__dirname, 'suivi01.docx'), 'binary');

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render({
      pm_code: req.body.data.pme.pm_code,
      pm_type: req.body.data.pme.pm_type,
      pm_date: req.body.data.pme.pm_ord_date,
      pm_cust: req.body.data.pme.pm_cust,
      pm_site: req.body.data.pme.pm_site,
    });

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: 'DEFLATE',
    });

    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    fs.writeFileSync(path.resolve(__dirname, 'suivioutput.docx'), buf);
    return res.status(200).json({ message: 'fetched succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  create,
  findBy,
  findByTask,
  findByPs,
  findOne,
  findAll,
  findAllBy,
  update,
  updateM,
  findAllwithDetails,
  findAllbomDetails,
  findpmdetail,
  getProjectTypes,
  findAssignedEmpOfProject,
  findInstructionsOfProject,
  createAssetDown,
  getAssetDownTypes,
  testDocxRevue,
  testDocxSuivi,
};
