import LoadRequestService from '../../services/load-request';
import TokenSerieService from '../../services/token-serie';
import UserMobileService from '../../services/user-mobile';
import ItemService from '../../services/item';
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { DATE, Op, Sequelize } from 'sequelize';

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
    // console.log(ld_loc)
    // console.log(ld_site)
    // console.log(product_code)

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

    // console.log(ld_loc)
    // console.log(ld_site)
    // console.log(product_code)

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
        console.log('\n');
        // console.log(product);
        const isExist = await loadRequestService.findLoadRequestLine({
          load_request_code: load_request_code,
          product_code: product.product_code,
        });
        if (isExist) {
          const updatedLoadRequestLine = await loadRequestService.updateLoadRequestLine(
            load_request_code,
            product.product_code,
            product.item.loadRequestLine.qt_request,
          );
        } else {
          if (product.item.loadRequestLine.qt_request > 0) {
            const createdLoadRequestLine = await loadRequestService.createLoadRequestLine(
              load_request_code,
              product.product_code,
              product.item.loadRequestLine.qt_request,
              product.item.loadRequestLine.qt_request,
              product.item.pt_price,
            );
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

    // const updatedLoadRequest = await loadRequestService.updateLoadRequestStatusTo10(load_request_code);

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
    console.log(req.body);
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
        console.log(loadRequestLine);
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
  try {
    const loadRequestService = Container.get(LoadRequestService);

    const loadRequestsCodes = req.body.load_requests_codes;
    const updateLoadRequeust = await loadRequestService.updateLoadRequestStatusToX(loadRequestsCodes, 40);
    return res.status(200).json({ message: 'Load Requests with status 40 found', data: updateLoadRequeust });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createLoadRequestDetails = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  try {
    const loadRequestService = Container.get(LoadRequestService);

    const load_request_details = req.body.load_request_details;
    const load_request_lines = req.body.load_request_lines;
    console.log(load_request_lines);
    for (const line of load_request_lines) {
      const elem = await loadRequestService.findLoadRequestLine({
        load_request_code: line.load_request_code,
        product_code: line.product_code,
      });
      console.log('elem', elem);
      if (elem !== null) {
        const loadLineUpdated = await loadRequestService.updateLoadRequestLineQtAffected(
          line.load_request_code,
          line.product_code,
          line.qt_effected,
        );
      } else {
        console.log('creatioon', line);
        const maxLine = await loadRequestService.findLoadRequestMaxLine({
          load_request_code: line.load_request_code,
        });
        console.log('maaaaaaaaaaaaaaaax', maxLine);
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
    for (const detail of load_request_details) {
      const elemDet = await loadRequestService.findLoadRequestDetail({
        load_request_code: detail.load_request_code,
        product_code: detail.product_code,
        lot: detail.lot,
      });
      console.log('elemDet', elemDet);
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

    return res.status(201).json({ message: 'created succesfully', data: true });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const createLoadRequestDetailsChangeStatus = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');

  try {
    const loadRequestService = Container.get(LoadRequestService);
    const load_request_details = req.body.load_request_details;
    const load_request_lines = req.body.load_request_lines;
    const load_request_code = req.body.load_request_code;

    // UPDATE LOAD REQUEST LINES
    for (const line of load_request_lines) {
      const loadLineUpdated = await loadRequestService.updateLoadRequestLineQtAffected(
        line.load_request_code,
        line.product_code,
        line.qt_effected,
      );
    }

    // DELETE OLD LOAD REQUEST DETAILS
    for (const load of load_request_details) {
      const deletedLoadRequest = await loadRequestService.deleteLoadRequestDetail({
        product_code: load.product_code,
        load_request_code: load.load_request_code,
      });
    }

    // CREATE NEW LOAD REQUEST DETAILS
    const loadRequestsDetails = await loadRequestService.createMultipleLoadRequestsDetails(load_request_details);
    // UPDATE LOAD REQUEST STATUS TO 20
    const loadRequest = await loadRequestService.updateLoadRequestStatusToX(load_request_code, 20);

    return res.status(201).json({ message: 'created succesfully', data: loadRequestsDetails });
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

    console.log(loadRequestLines);
    console.log('********');
    console.log(loadRequestDetails);
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
  //console.log("aaaaaaaa",req.body)
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
    console.log('roooooooole', role_code);
    const role = await loadRequestService.getRole({ role_code: role_code });

    const token = await tokenSerieService.findOne({ token_code: role.token_serie_code });
    let code =
      token.load_request_prefix +
      /*'-' +*/ token.load_request_next_number.toString().padStart(token.token_digitcount, '0');
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

    console.log('********');
    //console.log(result);
    return res.status(200).json({ message: 'found all load request lines', data: result });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

const getLoadRequestCreationDataRole = async (req: Request, res: Response, next: NextFunction) => {
  const logger = Container.get('logger');
  logger.debug('Calling getLoadRequestData endpoint');
  //console.log("aaaaaaaa",req.body)
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
  //console.log("aaaaaaaa",req.body)
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
  createLoadRequestDetailsChangeStatus,
  findAllLoadRequeusts20,
  findAllLoadRequest20Details,
  updateLoadRequests4O,
  findLoadRequestsBetweenDates,
  findAllLoadRequestLinesDetails,
  getLoadRequestCreationData,
  createLoadRequestAndLines,
  getLoadRequestInfo,
  getLoadRequestDataV3,
  findAllLoadRequestLinesDifference,
  getLoadRequestCreationDataRole,
  getLoadRequestWithCode,
};

// validation 0-10
