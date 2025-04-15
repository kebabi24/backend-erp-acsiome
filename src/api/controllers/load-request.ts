import LoadRequestService from '../../services/load-request';
import TokenSerieService from '../../services/token-serie';
import UserMobileService from '../../services/user-mobile';
import RoleService from '../../services/role';
import ItemService from '../../services/item';
import CodeService from '../../services/code';
import DecompteService from '../../services/decompte';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';
import ChariotService from '../../services/chariot';
import ChariotDetailService from '../../services/chariot-detail';
import locationDetailService from '../../services/location-details';
import {QueryTypes} from 'sequelize'


const findAllRoles = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const upper_role_code = req.params.upper_role_code;
    const roles = await loadRequestService.findAllRolesByUpperRoleCode({ upper_role_code: upper_role_code });
    return res.status(200).json({ message: 'found all roles of upper role', data: roles });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllLoadRequeusts = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const role_code = req.params.role_code;
    const loadRequests = await loadRequestService.findAllLoadRequestsByRoleCode(role_code);
    return res.status(200).json({ message: 'found all roles of upper role', data: loadRequests });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllLoadRequeusts10 = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const role_code = req.params.role_code;
    const loadRequests = await loadRequestService.findAllLoadRequests10ByRoleCode(role_code);
    return res.status(200).json({ message: 'found all roles of upper role', data: loadRequests });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// const findAllLoadRequeusts20 = async (req: Request, res: Response, next: NextFunction) => {
//     const logger = Container.get("logger")
//     logger.debug("Calling find one  code endpoint")
//     try {
//         const loadRequestService = Container.get(LoadRequestService)
//         const role_code = req.params.role_code
//         const loadRequests = await loadRequestService.findAllLoadRequests20ByRoleCode(role_code)
//         return res
//             .status(200)
//             .json({ message: "found all roles of upper role", data: loadRequests  })
//     } catch (e) {
//         logger.error("🔥 error: %o", e)
//         return next(e)
//     }
// }

const findAllLoadRequeusts20 = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const loadRequests = await loadRequestService.findAllLoadRequests20();
    return res.status(200).json({ message: 'found all roles of upper role', data: loadRequests });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// for loadrequest 0 to 10
const getLoadRequestData = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling getLoadRequestData endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);

    const load_request_code = req.params.load_request_code;

    const loadRequest = await loadRequestService.findLoadRequest({ load_request_code: load_request_code });
    const user_mobile_code = loadRequest.user_mobile_code;
    const role = await loadRequestService.getRole({ user_mobile_code: user_mobile_code });

    const loadRequestData = await loadRequestService.getLoadRequestData(
      user_mobile_code,
      load_request_code,
      loadRequest.role_loc,
      loadRequest.role_site,
    );

    return res.status(200).json({ message: 'data ready', data: loadRequest, loadRequestData: loadRequestData });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// for loadrequest 10 to 20
const getLoadRequestDataV2 = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling getLoadRequestData endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);

    const load_request_code = req.params.load_request_code;

    const loadRequest = await loadRequestService.findLoadRequest({ load_request_code: load_request_code });

    const user_mobile_code = loadRequest.user_mobile_code;
    const role = await loadRequestService.getRole({ role_code: loadRequest.role_code });
    const loadRequestData = await loadRequestService.getLoadRequestDataV2(
      user_mobile_code,
      load_request_code,
      loadRequest.role_site,
      loadRequest.role_loc,
    );

    return res
      .status(200)
      .json({ message: 'data ready', data: loadRequest, loadRequestData: loadRequestData, role: role });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getLoadRequestDataV3 = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling getLoadRequestData endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);

    const load_request_code = req.params.load_request_code;

    const loadRequest = await loadRequestService.findLoadRequest({ load_request_code: load_request_code });

    const user_mobile_code = loadRequest.user_mobile_code;
    const role = await loadRequestService.getRole({ role_code: loadRequest.role_code });
    const loadRequestData = await loadRequestService.getLoadRequestDataV3(
      user_mobile_code,
      load_request_code,
      loadRequest.role_site,
      loadRequest.role_loc,
    );

    return res
      .status(200)
      .json({ message: 'data ready', data: loadRequest, loadRequestData: loadRequestData, role: role });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findLotsOfProduct = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling findLotsOfProduct endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);

    const ld_loc = req.body.ld_loc;
    const ld_site = req.body.ld_site;
    const product_code = req.body.product_code;
   

    const lots = await loadRequestService.getLotsOfProduct(ld_loc, ld_site, product_code);

    return res.status(200).json({ message: 'data ready', data: lots });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findLotsOfProduct2 = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling findLotsOfProduct endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);

    const ld_loc = req.body.ld_loc;
    const ld_site = req.body.ld_site;



    const lots = await loadRequestService.getLotsOfProduct2(ld_loc, ld_site);

    return res.status(200).json({ message: 'data ready', data: lots });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const updateLoadRequestStauts10 = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling updateLoadRequestStauts10 controller endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);

    const load_request_code = req.body.load_request_code;
    const load_request_data = req.body.load_request_data;
   // console.log('how are you', load_request_data);
    for (const page of load_request_data) {
      for (const product of page.productPageDetails) {
      //  console.log(product);
        // console.log(product);
        const isExist = await loadRequestService.findLoadRequestLine({
          load_request_code: load_request_code,
          product_code: product.product_code,
        });
        // console.log("isExist",isExist, product.item.pt_part)
        if (isExist) {
         // console.log("hozhoz", product.item.loadRequestLines[0].qt_validated)
          const updatedLoadRequestLine = await loadRequestService.updateLoadRequestLine(
            load_request_code,
            product.product_code,
           // product.item.loadRequestLine.qt_request,
           product.item.loadRequestLines[0].qt_validated,
          );
        } else {
          // console.log("dkhalet")
          if( product.item.loadRequestLines[0] != null) {
          if (product.item.loadRequestLines[0].qt_request == 0 && product.item.loadRequestLines[0].qt_validated > 0) {
            const createdLoadRequestLine = await loadRequestService.createLoadRequestLine(
              load_request_code,
              product.product_code,
              product.item.loadRequestLines[0].qt_request,
              product.item.loadRequestLines[0].qt_validated,
              product.item.pt_price,
            );
          }
        }
        }
        // if (product.item.loadRequestLine.qt_request === 0 && product.item.loadRequestLine.qt_request === 0) {
        //   continue;
        // }

        // if (product.item.loadRequestLine.qt_request > 0 && product.item.loadRequestLine.qt_request > 0) {
        //   const updatedLoadRequestLine = await loadRequestService.updateLoadRequestLine(
        //     load_request_code,
        //     product.product_code,
        //     product.item.loadRequestLine.qt_request,
        //   );
        // }
        // if (product.qt_request === 0 || (null && product.qt_validated > 0)) {
        //   const createdLoadRequestLine = await loadRequestService.createLoadRequestLine(
        //     load_request_code,
        //     product.product_code,
        //     product.qt_validated,
        //     0,
        //     product.pt_price,
        //   );
        // }
      }
    }

    const updatedLoadRequest = await loadRequestService.updateLoadRequestStatusTo10(load_request_code);

    return res.status(200).json({ message: 'data ready', data: 'here' });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllLoadRequestLines = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const load_request_code = req.params.load_request_code;
    const loadRequestLines = await loadRequestService.findAllLoadRequestLines(load_request_code);
    return res.status(200).json({ message: 'found all load request lines', data: loadRequestLines });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllLoadRequest20Details = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const load_request_code = req.params.load_request_code;
    const loadRequestLines = await loadRequestService.findAllLoadRequest20Details(load_request_code);
    return res.status(200).json({ message: 'found all load request lines', data: loadRequestLines });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

// for riane
const findAllLoadRequeusts40 = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    
    let loadRequests = [];
    const loadRequests50 = [];

    // DATA FROM REQUEST BODY
    const role_code = req.body.role_code;
    const role_site = req.body.role_site;
    const role_loc = req.body.role_loc;
    const user_mobile_code = req.body.user_mobile_code;
    const LoadRequestStatus0 = req.body.LoadRequestStatus0;
    const LoadRequestStatus_10 = req.body.LoadRequestStatus_10;
    const LoadRequestStatus50 = req.body.LoadRequestStatus50;
    const loadRequestsLines0 = req.body.loadRequestsLines0;

    // STATUS 0
    if (LoadRequestStatus0) {
      LoadRequestStatus0.forEach(loadRequest => {
        loadRequest.date_creation = formatDateOnlyFromMobileToBack(loadRequest.date_creation);
        delete loadRequest.id;
        // const formatted_date = loadRequest.date_creation+'.63682+01'
        // loadRequest.date_creation = formatted_date
      });
      const loadRequests = await loadRequestService.createMultipleLoadRequests(LoadRequestStatus0);
    }

    // LOAD REQUEST LINES
    if (loadRequestsLines0) {
      loadRequestsLines0.forEach(loadRequestLine => {
   
        delete loadRequestLine.line_code;
        loadRequestLine.date_creation = formatDateOnlyFromMobileToBack(loadRequestLine.date_creation);
        // const formatted_date = loadRequestLine.date_creation+'.63682+01'
        // loadRequestLine.date_creation = formatted_date
      });
      const loadRequestsLines = await loadRequestService.createMultipleLoadRequestsLines(loadRequestsLines0);
    }

    //  STATUS 10 : to -10
    if (LoadRequestStatus_10) {
      const loadRequests10 = [];
      LoadRequestStatus_10.forEach(loadRequest => {
        loadRequests10.push(loadRequest.load_request_code);
      });
      // update status to - 10
      const updateLoadRequeust = await loadRequestService.updateLoadRequestStatusToX(loadRequests10, -10);
    }

    //  STATUS 50  : to 50
    if (LoadRequestStatus50) {
      const loadRequests50 = [];
      LoadRequestStatus50.forEach(loadRequest => {
        loadRequests50.push(loadRequest.load_request_code);
      });
      // update status to 50 to 50
      const updateLoadRequeust = await loadRequestService.updateLoadRequestStatusToX(loadRequests50, 50);
    }

    // LOAD REQUESTS : 40
    loadRequests = await loadRequestService.findAllLoadRequests40ByRoleCode(role_code);

    const loadRequestsCodes = [];
    loadRequests.forEach(loadRequest => {
      loadRequestsCodes.push(loadRequest.load_request_code);
    });

    // LOAD REQUESTS LINES
    let loadRequestsLines = [];
    if (loadRequestsCodes.length > 0) {
      loadRequestsLines = await loadRequestService.findAllLoadRequestsLinesByLoadRequestsCode(loadRequestsCodes);
    }

    // LOAD REQUESTS DETAILS
    let loadRequestsDetails = [];
    if (loadRequestsCodes.length > 0) {
      loadRequestsDetails = await loadRequestService.findAllLoadRequestsDetailsByLoadRequestsCode(loadRequestsCodes);
    }

    return res.status(200).json({
      message: 'Load Requests with status 40 found',
      data: {
        loadRequests: loadRequests,
        loadRequestsLines: loadRequestsLines,
        loadRequestsDetails: loadRequestsDetails,
      },
    });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const updateLoadRequests4O = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  const { user_domain } = req.headers;
  const { user_code } = req.headers;
  try {
   
    const loadRequestService = Container.get(LoadRequestService);
    const locationDetailServiceInstance = Container.get(locationDetailService);
    const codeService = Container.get(CodeService);
    const loadRequestsCodes = req.body.load_requests_codes;
    const updateLoadRequeust = await loadRequestService.updateLoadRequestStatusToX(loadRequestsCodes, 30);

    /*updqte ld_det */
    const LoadRequeust = await loadRequestService.findLoadRequest({load_request_code:loadRequestsCodes});

   const loadRequestDetails = await loadRequestService.findAllLoadRequestsDetailsByLoadRequestsCode(loadRequestsCodes);
    console.log(loadRequestDetails)

    for(let lrdet of loadRequestDetails) {
      const ld = await locationDetailServiceInstance.findOne({
        ld_part: lrdet.product_code,
        ld_lot: lrdet.lot,
        ld_site: LoadRequeust.role_site,
        ld_loc: LoadRequeust.role_loc,
        //ld_ref:item.tr_ref,
        ld_domain:user_domain,
      });
      if (ld) {
        await locationDetailServiceInstance.update(
          {
            ld_qty_oh: Number(ld.ld_qty_oh) + Number(lrdet.qt_effected),
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin,
          },
          { id: ld.id },
        );
      } else {
        await locationDetailServiceInstance.create({
          ld_part: lrdet.product_code,
          ld_lot: lrdet.lot,
          ld_site: LoadRequeust.role_site,
          ld_loc: LoadRequeust.role_loc,
         // ld_date: new Date(),
          ld_qty_oh: Number(lrdet.qt_effected),
          
          created_by: user_code,
          created_ip_adr: req.headers.origin,
          last_modified_by: user_code,
          last_modified_ip_adr: req.headers.origin,
          ld_domain: user_domain,
          
        });
      }
    }

    /*updqte ld_det */
/* export */

    const code = await codeService.findOne({code_fldname:"export-chargement",code_value:"chg"});

    if(code != null) {
    const loadR = await loadRequestService.findLoadsRequestDetail({load_request_code:loadRequestsCodes});
    const load = await loadRequestService.findLoadRequest({load_request_code:loadRequestsCodes});



    const fs = require('node:fs');
        const content = 'Some content!';
        let str = ``
        var days: String
        var months : String
        var year : String
        let date= new Date()
        let day = date.getDate();
        console.log(day)
    if (day < 10) {
        days = "0" + String(day)
    }
    else {days = String(day)}
console.log(days)
    let month = date.getMonth();
    console.log(month)
    if (month < 9) {
        month = month + 1
        months = "0" + month
    } else {
        months = String(month + 1)
    }

    let years = date.getFullYear();
    let datelr = `${days}/${months}/${years}`;

        for (let lr of loadR) {
          str += `${load.load_request_code}|${load.load_request_code}|${datelr}|${load.role_loc}|${load.user_mobile_code}|${lr.product_code}|${lr.lot}|${lr.qt_effected}|${"C|"}\n`;
  
      }
       
      let filename = code.code_cmmt +  'IN-' + load.load_request_code + '.txt'
      console.log("filename :",filename)
        try {
          fs.writeFileSync(filename, str);
          // file written successfully
        } catch (err) {
          console.error(err);
        }
      }
/*export end*/        
    return res.status(200).json({ message: 'Load Requests with status 40 found', data: updateLoadRequeust });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createLoadRequestDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  try {
    const loadRequestService = Container.get(LoadRequestService);
//console.log("req.body",req.body)
    const load_request_details = req.body.load_request_details;
    const load_request_code = load_request_details[0].load_request_code
    const load_request_lines = req.body.load_request_lines;
     //console.log("loadline",load_request_details);
    for (const line of load_request_lines) {
      //console.log("line",line)
      if(line.qt_effected > 0) {
        //console.log("yawhnahnawelamakch")
      const elem = await loadRequestService.findLoadRequestLine({
        load_request_code: line.load_request_code,
        product_code: line.product_code,
      });
      //  console.log('elem', elem);
      if (elem !== null) {
        const loadLineUpdated = await loadRequestService.updateLoadRequestLineQtAffected(
          line.load_request_code,
          line.product_code,
          line.qt_effected,
        );
      } else {
     //   console.log('creatioon', line);
        const maxLine = await loadRequestService.findLoadRequestMaxLine({
          load_request_code: line.load_request_code,
        });
       // console.log('maaaaaaaaaaaaaaaax', maxLine);
        const loadRequestsLines = await loadRequestService.createMultipleLoadRequestsLines2({
          ...line,
          date_creation: maxLine.date_creation,
          line: maxLine.line + 1,
          date_charge: new Date(),
          qt_request: 0,
          qt_validated: 0,
        });
      }
    }
    }
    for (const detail of load_request_details) {
      if(detail.qt_effected > 0) {
      const elemDet = await loadRequestService.findLoadRequestDetail({
        load_request_code: detail.load_request_code,
        product_code: detail.product_code,
        lot: detail.lot,
      });
     // console.log('elemDet', elemDet);
      if (elemDet !== null) {
        const loadLineUpdated = await loadRequestService.updateLoadRequestDetailQtAffected(
          elemDet.load_request_code,
          elemDet.product_code,
          detail.qt_effected,
          elemDet.lot,
        );
      } else {
        const loadRequestsDetails = await loadRequestService.createMultipleLoadRequestsDetails2(detail);
      }
    }
    }
    const loadRequest = await loadRequestService.updateLoadRequestStatusToX(load_request_code, 20);

    return res.status(201).json({ message: 'created succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const createLoadRequestDetailsScan = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const itemServiceInstance = Container.get(ItemService);
    const chariotDetailServiceInstance = Container.get(ChariotDetailService);
    const chariotServiceInstance = Container.get(ChariotService);
//console.log("req.body",req.body)
    const load_request_details = req.body.load_request_details;
    const load_request_code = load_request_details[0].load_request_code
    const load_request_lines = req.body.load_request_lines;
    const chariotdetail = req.body.chariotdetail
     console.log("chariotdetail",chariotdetail);
     const char = await chariotServiceInstance.find({load_request_code:load_request_code})
     console.log(char.length)
     let nchar = 0 
     if(char.length > 0) {
      nchar = char.length + 1 
     } else { nchar = 1}
     const chariot = await chariotServiceInstance.create({chariot_nbr:nchar,load_request_code:load_request_code,chariot_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
     for (let detchar of chariotdetail) {
       const chariotdet = await chariotDetailServiceInstance.create({...detchar,load_request_code:load_request_code,chariot_nbr: nchar,chariot_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
    }
    
    for (const line of load_request_lines) {
     // console.log("line",line)
      if(line.qt_effected != 0) {
       // console.log("yawhnahnawelamakch")
      const elem = await loadRequestService.findLoadRequestLine({
        load_request_code: line.load_request_code,
        product_code: line.product_code,
      });
      //  console.log('elem', elem);
      if (elem !== null) {
        const loadLineUpdated = await loadRequestService.updateLoadRequestLineQtAffected(
          line.load_request_code,
          line.product_code,
          line.qt_effected,
        );
      } else {
     //   console.log('creatioon', line);
        const maxLine = await loadRequestService.findLoadRequestMaxLine({
          load_request_code: line.load_request_code,
        });
       // console.log('maaaaaaaaaaaaaaaax', maxLine);
       const ptpart = await itemServiceInstance.findOne({
        pt_part: line.product_code,
      });
      console.log("line",line)
        const loadRequestsLines = await loadRequestService.createMultipleLoadRequestsLines2({
          ...line,
          date_creation: maxLine.date_creation,
          line: maxLine.line + 1,
          date_charge: new Date(),
          qt_request: 0,
          qt_validated: 0,
          pt_price: ptpart.pt_price,
        });
      }
    }
    }
    for (const detail of load_request_details) {
      if(detail.qt_effected != 0) {
      const elemDet = await loadRequestService.findLoadRequestDetail({
        load_request_code: detail.load_request_code,
        product_code: detail.product_code,
        lot: detail.lot,
      });
     // console.log('elemDet', elemDet);
      if (elemDet !== null) {
        console.log("hhhhhhhhhhhhhhere ",detail.qt_effected)
        const loadLineUpdated = await loadRequestService.updateLoadRequestDetailQtAffected(
          elemDet.load_request_code,
          elemDet.product_code,
          detail.qt_effected,
          elemDet.lot,
        );
      } else {
        const loadRequestsDetails = await loadRequestService.createMultipleLoadRequestsDetails2(detail);
      }
    }
    }
    return res.status(201).json({ message: 'created succesfully', data: nchar });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createLoadRequestDetailsChangeStatus = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const decompteService = Container.get(DecompteService)
    const roleServiceInstance = Container.get(RoleService)
    const load_request_details = req.body.load_request_details;
    const load_request_lines = req.body.load_request_lines;
    const load_request_code = req.body.load_request_code;

    // UPDATE LOAD REQUEST LINES
    // for (const line of load_request_lines) {
    //   const loadLineUpdated = await loadRequestService.updateLoadRequestLineQtAffected(
    //     line.load_request_code,
    //     line.product_code,
    //     line.qt_effected,
    //   );
    // }

    // DELETE OLD LOAD REQUEST DETAILS
    // for (const load of load_request_details) {
    //   const deletedLoadRequest = await loadRequestService.deleteLoadRequestDetail({
    //     product_code: load.product_code,
    //     load_request_code: load.load_request_code,
    //   });
    // }

    // CREATE NEW LOAD REQUEST DETAILS
    // const loadRequestsDetails = await loadRequestService.createMultipleLoadRequestsDetails(load_request_details);


    const loadLine = await loadRequestService.findLoadRequestLineBy(
      {load_request_code:load_request_code}      
    );
    let tot = 0
    for (let line of loadLine) {
console.log(line.pt_price,line.qt_effected)
      tot = tot +( Number(line.pt_price) * Number(line.qt_effected) * Number(1.2138))
    }

    const lr = await loadRequestService.findLoadRequestsByRoleCode(load_request_code);
    console.log(lr)
    const decompte = await decompteService.create({dec_code:load_request_code,dec_role:lr.role_code,dec_desc:"Chargement",dec_amt:tot,dec_type:"C",dec_effdate:new Date(),dec_domain:user_domain,
    
    created_by: user_code,
            created_ip_adr: req.headers.origin,
            last_modified_by: user_code,
            last_modified_ip_adr: req.headers.origin, });

            const role = await roleServiceInstance.findOne({role_code: lr.role_code});
  
    await roleServiceInstance.updated(   {solde: Number(role.solde) + Number(tot)},{role_code:lr.role_code})      
    // UPDATE LOAD REQUEST STATUS TO 20
    // console.log('codeeeeeeeeeeeeeeeeee', load_request_code);
    const loadRequest = await loadRequestService.updateLoadRequestStatusTo20(load_request_code, 20);


    return res.status(201).json({ message: 'created succesfully', data: loadRequest });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findLoadRequestsBetweenDates = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling findLoadRequestsBetweenDates endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const { startDate, endDate } = req.body;
    const loadRequests = await loadRequestService.getLoadRequestsBetweenDates(startDate, endDate);
    return res.status(200).json({ message: 'found all load requests', data: loadRequests });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const findAllLoadRequestLinesDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const load_request_code = req.params.load_request_code;
    const loadRequestLines = await loadRequestService.findAllLoadRequestLines(load_request_code);
    const loadRequestDetails = await loadRequestService.findAllLoadRequestsDetailsByLoadRequestsCode(load_request_code);

    // console.log(loadRequestLines);
    // console.log('********');
    // console.log(loadRequestDetails);
    return res
      .status(200)
      .json({ message: 'found all load request lines', data: { loadRequestLines, loadRequestDetails } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getLoadRequestCreationData = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling getLoadRequestData endpoint');

  //const profile_code = req.params.profile_code
  try {
    const loadRequestService = Container.get(LoadRequestService);

    // const load_request_code = req.params.load_request_code

    // const loadRequest = await loadRequestService.findLoadRequest({load_request_code :load_request_code})
    // const user_mobile_code = loadRequest.user_mobile_code
    // const role = await loadRequestService.getRole({user_mobile_code :user_mobile_code })

    const loadRequestData = await loadRequestService.getLoadRequestCreationData();

    return (
      res
        .status(200)
        // .json({ message: "data ready", data: loadRequest , loadRequestData:loadRequestData })
        .json({ message: 'data ready', loadRequestData: loadRequestData })
    );
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createLoadRequestAndLines = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling updateLoadRequestStauts10 controller endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const tokenSerieService = Container.get(TokenSerieService);

    const { loadRequest, lines } = req.body;
    const role_code = loadRequest.role_code;
    //console.log('roooooooole', role_code);
    const role = await loadRequestService.getRole({ role_code: role_code });

    const token = await tokenSerieService.findOne({ token_code: role.token_serie_code });
    let code =
      token.load_request_prefix +
      /*'-' +*/ '-' +
      token.load_request_next_number.toString().padStart(token.token_digitcount, '0');
    const updatedToken = await tokenSerieService.update(
      { load_request_next_number: token.load_request_next_number + 1 },
      { token_code: role.token_serie_code },
    );

    loadRequest.user_mobile_code = role.user_mobile_code;
    loadRequest.role_loc = role.role_loc;
    loadRequest.role_site = role.role_site;
    loadRequest.role_loc_from = role.role_loc_from;
    loadRequest.load_request_code = code;

    lines.forEach(line => {
      line.load_request_code = code;
    });

    const createdLoadRequest = await loadRequestService.createLoadRequest(loadRequest);
    const createdLoadRequestLines = await loadRequestService.createMultipleLoadRequestsLines(lines);

    return res.status(200).json({ message: 'data ready', data: loadRequest });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getLoadRequestInfo = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const userMobileService = Container.get(UserMobileService);
    const load_request_code = req.params.load_request_code;
    const loadRequest = await loadRequestService.findLoadRequest({ load_request_code: load_request_code });
    let userMobile = null;
    if (loadRequest != null) {
      userMobile = await userMobileService.findOne({ user_mobile_code: loadRequest.user_mobile_code });
    }

    return res.status(200).json({ message: 'found all roles of upper role', data: { loadRequest, userMobile } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const getLoadRequestLineInfo = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const loadRequestLineService = Container.get(LoadRequestService);
    const userMobileService = Container.get(UserMobileService);
    const load_request_code = req.params.load_request_code;
    //console.log(load_request_code)
    const loadRequest = await loadRequestService.findLoadRequestLines({ load_request_code: load_request_code });
    // let userMobile = null;
    // if (loadRequest != null) {
    //   userMobile = await userMobileService.findOne({ user_mobile_code: loadRequest.user_mobile_code });
    // }
//console.log(loadRequest)
    return res.status(200).json({ message: 'found all roles of upper role', data: { loadRequest } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const getLoadRequestLineInfoDif = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const loadRequestLineService = Container.get(LoadRequestService);
    const userMobileService = Container.get(UserMobileService);
    const load_request_code = req.params.load_request_code;
   // console.log(load_request_code)
    const loadRequest = await loadRequestService.findLoadRequestLinesDif({ load_request_code: load_request_code, qt_validated: { [Op.ne]: Sequelize.col('qt_effected') , }});
    // let userMobile = null;
    // if (loadRequest != null) {
    //   userMobile = await userMobileService.findOne({ user_mobile_code: loadRequest.user_mobile_code });
    // }
//console.log(loadRequest)
    return res.status(200).json({ message: 'found all roles of upper role', data: { loadRequest } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
function formatDateFromMobileToBackAddTimezone(timeString) {
  let elements = timeString.split(' ');
  let dateComponents = elements[0].split('-');
  const str = dateComponents[2] + '-' + dateComponents[1] + '-' + dateComponents[0] + ' ' + elements[1] + '.63682+01';
  return str;
}

function formatDateOnlyFromMobileToBack(timeString) {
  let dateComponents = timeString.split('-');
  const str = dateComponents[2] + '-' + dateComponents[1] + '-' + dateComponents[0];
  return str;
}

const findAllLoadRequestLinesDifference = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const itemService = Container.get(ItemService);
    const { user_domain } = req.headers;

    const loadRequestLines = await loadRequestService.findAllDif({
      date_creation: { [Op.between]: [req.body.date, req.body.date1] },
      qt_validated: { [Op.ne]: Sequelize.col('qt_effected') },
    });
    let result = [];
    for (let loadrequestline of loadRequestLines) {
      const item = await itemService.findOne({ pt_part: loadrequestline.product_code, pt_domain: user_domain });
      const loadrequest = await loadRequestService.findLoadRequest({
        load_request_code: loadrequestline.load_request_code,
      });
      let obj = {
        id: loadrequestline.id,
        date_creation: loadrequestline.date_creation,

        line: loadrequestline.line,

        product_code: loadrequestline.product_code,
        product_desc: item.pt_desc1,
        load_request_code: loadrequestline.load_request_code,

        qt_request: loadrequestline.qt_request,
        qt_validated: loadrequestline.qt_validated,
        qt_effected: loadrequestline.qt_effected,

        role_code: loadrequest.role_code,

        user_mobile_code: loadrequest.user_mobile_code,
        role_loc: loadrequest.role_loc,
        role_site: loadrequest.role_site,
        role_loc_from: loadrequest.role_loc_from,
      };
      result.push(obj);
    }



    return res.status(200).json({ message: 'found all load request lines', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getLoadRequestCreationDataRole = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling getLoadRequestData endpoint');

  //const profile_code = req.params.profile_code
  try {
    const loadRequestService = Container.get(LoadRequestService);

    const role_code = req.params.role_code;
    const loadRequestData = await loadRequestService.getLoadRequestCreationDataRole(role_code);

    return (
      res
        .status(200)
        // .json({ message: "data ready", data: loadRequest , loadRequestData:loadRequestData })
        .json({ message: 'data ready', loadRequestData: loadRequestData })
    );
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const getLoadRequestWithCode = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling getLoadRequestData endpoint');

  //const profile_code = req.params.profile_code
  try {
    const loadRequestService = Container.get(LoadRequestService);
    
    const role_code = req.body.role_code;
    const load_request_code = req.body.load_request_code;
    const loadRequestData = await loadRequestService.getLoadRequestWithCode(role_code, load_request_code);

    return (
      res
        .status(200)
        // .json({ message: "data ready", data: loadRequest , loadRequestData:loadRequestData })
        .json({ message: 'data ready', loadRequestData: loadRequestData })
    );
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBychariot = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const chariotServiceInstance = Container.get(ChariotService);
    const chariots = await chariotServiceInstance.find({ ...req.body,chariot_domain:user_domain });
    return res.status(200).json({ message: 'fetched succesfully', data: chariots });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const findBychariotDet = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find by  all locationDetail endpoint');
  const { user_code } = req.headers;
  const { user_domain } = req.headers;
  
  try {
    const chariotDetailServiceInstance = Container.get(ChariotDetailService);
    const chariots = await chariotDetailServiceInstance.find({ ...req.body,chariot_domain:user_domain });
    let result=[]
    for (let char of chariots) {
      result.push({
        id:char.id,
        load_request_code: char.load_request_code,
        chariot_nbr: char.chariot_nbr,
        code_prod: char.code_prod,
        prodlot: char.code_prod+char.lot,
        desc_prod: char.desc_prod,
        lot : char.lot,
        serie:char.serie,
        quantity: char.quantity,
        price : char.price,
      })
    }
    console.log(result)
    return res.status(200).json({ message: 'fetched succesfully', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const exportLoadRequest = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const codeService = Container.get(CodeService);
    const loadRequestsCodes = req.body.load_requests_codes;
   
/* export */

    const code = await codeService.findOne({code_fldname:"export-chargement",code_value:"chg"});

    if(code != null) {
    const loadR = await loadRequestService.findLoadsRequestDetail({load_request_code:loadRequestsCodes});
    const load = await loadRequestService.findLoadRequest({load_request_code:loadRequestsCodes});



    const fs = require('node:fs');
        const content = 'Some content!';
        let str = ``
        var days: String
        var months : String
        var year : String
        let date= new Date()
        let day = date.getDate();
        console.log(day)
    if (day < 10) {
        days = "0" + String(day)
    }
    else {days = String(day)}
console.log(days)
    let month = date.getMonth();
    console.log(month)
    if (month < 9) {
        month = month + 1
        months = "0" + month
    } else {
        months = String(month + 1)
    }

    let years = date.getFullYear();
    let datelr = `${days}/${months}/${years}`;

        for (let lr of loadR) {
          str += `${load.load_request_code}|${load.load_request_code}|${datelr}|${load.role_loc}|${load.user_mobile_code}|${lr.product_code}|${lr.lot}|${lr.qt_effected}|${"C|"}\n`;
  
      }
       
      let filename = code.code_cmmt +  'IN-' + load.load_request_code + '.txt'
      console.log("filename :",filename)
        try {
          fs.writeFileSync(filename, str);
          // file written successfully
        } catch (err) {
          console.error(err);
        }
      }
/*export end*/        
    return res.status(200).json({ message: 'Load Requests exported', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const getLoadRequest = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const loadRequestLineService = Container.get(LoadRequestService);
    const userMobileService = Container.get(UserMobileService);
    const load_request_code = req.params.load_request_code;
    //console.log(load_request_code)
    const loadRequest = await loadRequestService.findLoadRequest({ load_request_code: load_request_code });
    const loadRequestLines = await loadRequestService.findLoadRequestLines({ load_request_code: load_request_code });
    
    // let userMobile = null;
    // if (loadRequest != null) {
    //   userMobile = await userMobileService.findOne({ user_mobile_code: loadRequest.user_mobile_code });
    // }
//console.log(loadRequest)
    return res.status(200).json({ message: 'found all roles of upper role', data: { loadRequest,loadRequestLines } });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};
const createUnLoadRequestDetailsScan = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  const{user_code} = req.headers 
  const{user_domain} = req.headers
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const itemServiceInstance = Container.get(ItemService);
    const chariotDetailServiceInstance = Container.get(ChariotDetailService);
    const chariotServiceInstance = Container.get(ChariotService);
//console.log("req.body",req.body)
    const load_request_details = req.body.load_request_details;
    const load_request_code = load_request_details[0].load_request_code
    const load_request_lines = req.body.load_request_lines;
    const chariotdetail = req.body.chariotdetail
     console.log("chariotdetail",chariotdetail);
     const char = await chariotServiceInstance.find({load_request_code:load_request_code})
     console.log(char.length)
     let nchar = 0 
     if(char.length > 0) {
      nchar = char.length + 1 
     } else { nchar = 1}
     const chariot = await chariotServiceInstance.create({chariot_nbr:nchar,load_request_code:load_request_code,chariot_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
     for (let detchar of chariotdetail) {
       const chariotdet = await chariotDetailServiceInstance.create({...detchar,load_request_code:load_request_code,chariot_nbr: nchar,chariot_domain:user_domain, created_by:user_code,created_ip_adr: req.headers.origin, last_modified_by:user_code,last_modified_ip_adr: req.headers.origin})
    }
    
    for (const line of load_request_lines) {
     // console.log("line",line)
      if(line.qt_effected != 0) {
       // console.log("yawhnahnawelamakch")
      const elem = await loadRequestService.findLoadRequestLine({
        load_request_code: line.load_request_code,
        product_code: line.product_code,
      });
      //  console.log('elem', elem);
      if (elem !== null) {
        const loadLineUpdated = await loadRequestService.updateLoadRequestLineQtAffected(
          line.load_request_code,
          line.product_code,
          line.qt_effected,
        );
      } else {
     //   console.log('creatioon', line);
        const maxLine = await loadRequestService.findLoadRequestMaxLine({
          load_request_code: line.load_request_code,
        });
       // console.log('maaaaaaaaaaaaaaaax', maxLine);
       const ptpart = await itemServiceInstance.findOne({
        pt_part: line.product_code,
      });
      console.log("line",line)
        const loadRequestsLines = await loadRequestService.createMultipleLoadRequestsLines2({
          ...line,
          date_creation: maxLine.date_creation,
          line: maxLine.line + 1,
          date_charge: new Date(),
          qt_request: 0,
          qt_validated: 0,
          pt_price: ptpart.pt_price,
        });
      }
    }
    }
    for (const detail of load_request_details) {
      if(detail.qt_effected != 0) {
      const elemDet = await loadRequestService.findLoadRequestDetail({
        load_request_code: detail.load_request_code,
        product_code: detail.product_code,
        lot: detail.lot,
      });
     // console.log('elemDet', elemDet);
      if (elemDet !== null) {
        console.log("hhhhhhhhhhhhhhere ",detail.qt_effected)
        const loadLineUpdated = await loadRequestService.updateLoadRequestDetailQtAffected(
          elemDet.load_request_code,
          elemDet.product_code,
          detail.qt_effected,
          elemDet.lot,
        );
      } else {
        const loadRequestsDetails = await loadRequestService.createMultipleLoadRequestsDetails2(detail);
      }
    }
    }
    return res.status(201).json({ message: 'created succesfully', data: nchar });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};


const findLoadGrp = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling find one  code endpoint');
  try {
    const loadRequestService = Container.get(LoadRequestService);
    const itemServiceInstance = Container.get(ItemService);
    const sequelize = Container.get("sequelize")
    console.log(req.body)
    const loads = await loadRequestService.findS({ where :{status:{[Op.or]: [30,50]},date_charge: { [Op.between]: [req.body.date, req.body.date1]} }});
 let lrl = []
 for (let load of loads) {lrl.push(load.load_request_code)}
for(let load of loads) {
 console.log(load.load_request_code,load.date_charge)}
    const lrs =await sequelize.query("SELECT product_code, sum(qt_effected) as qty, sum(qt_effected * pt_price) as amt  FROM   PUBLIC.aa_loadrequestdetails where load_request_code IN ? GROUP BY public.aa_loadrequestdetails.product_code ORDER BY product_code ASC ", { replacements: [[lrl]], type: QueryTypes.SELECT });
      let result = [] 
      let i = 0
    for (let lr of lrs ) {
      const pt = await itemServiceInstance.findOne({ pt_part:lr.product_code });
result.push(
  {
    id:i,
    product_code: lr.product_code,
    designation : pt.pt_desc1,
    qty: lr.qty,
    amt: Number(lr.amt) * 1.2138
  }
)
   i = i + 1 }
//console.log(result)
    return res.status(200).json({ message: 'found all lr', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default {
  findAllLoadRequeusts,
  findAllRoles,
  getLoadRequestData,
  findAllLoadRequeusts40,
  updateLoadRequestStauts10,
  findAllLoadRequeusts10,
  findAllLoadRequestLines,
  getLoadRequestDataV2,
  findLotsOfProduct,
  findLotsOfProduct2,
  createLoadRequestDetails,
  createLoadRequestDetailsScan,
  createLoadRequestDetailsChangeStatus,
  findAllLoadRequeusts20,
  findAllLoadRequest20Details,
  updateLoadRequests4O,
  findLoadRequestsBetweenDates,
  findAllLoadRequestLinesDetails,
  getLoadRequestCreationData,
  createLoadRequestAndLines,
  getLoadRequestInfo,
  getLoadRequestLineInfo,
  getLoadRequestLineInfoDif,
  getLoadRequestDataV3,
  findAllLoadRequestLinesDifference,
  getLoadRequestCreationDataRole,
  getLoadRequestWithCode,
  findBychariot,
  findBychariotDet,
  exportLoadRequest,
  getLoadRequest,
  createUnLoadRequestDetailsScan,
  findLoadGrp
};

// validation 0-10
