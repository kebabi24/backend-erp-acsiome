import { Service, Inject } from 'typedi';
import ProductPageService from './product-page';
import { Op, Sequelize } from 'sequelize';

@Service()
export default class LoadRequestService {
  constructor(
    @Inject('roleModel') private roleModel: Models.RoleModel,
    @Inject('loadRequestModel') private loadReuestModel: Models.loadRequestModel,
    @Inject('userMobileModel') private userMobileModel: Models.UserMobileModel,
    @Inject('profileMobileModel') private profileMobileModel: Models.Profile_menuModel,
    @Inject('profileProductPageModel') private profileProductPageModel: Models.profileProductPageModel,
    @Inject('productPageDetailsModel') private productPageDetailsModel: Models.productPageDetailsModel,
    @Inject('productPageModel') private productPageModel: Models.productPageModel,
    @Inject('itemModel') private itemModel: Models.ItemModel,
    @Inject('loadRequestLineModel') private loadRequestLineModel: Models.loadRequestLineModel,
    @Inject('loadRequestDetailsModel') private loadRequestDetailsModel: Models.loadRequestDetailsModel,
    @Inject('locationDetailModel') private locationDetailModel: Models.LocationDetailModel,
    @Inject('logger') private logger,
  ) {}

  public async getRole(query: any): Promise<any> {
    try {
      const role = await this.roleModel.findOne({ where: query });
      this.logger.silly('role found');
      return role;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createMultipleLoadRequests(data: any): Promise<any> {
    try {
      // data.forEach(element => {
      //     console.log(element)
      // });
      const loadRequests = await this.loadReuestModel.bulkCreate(data);
      this.logger.silly('created load requests');
      return loadRequests;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createMultipleLoadRequestsLines(data: any): Promise<any> {
    try {
      const loadRequestsLines = await this.loadRequestLineModel.bulkCreate(data);
      this.logger.silly('created load requests lines');
      return loadRequestsLines;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createMultipleLoadRequestsDetails(data: any): Promise<any> {
    try {
      const loadRequestsDetails = await this.loadRequestDetailsModel.bulkCreate(data);
      this.logger.silly('created load requests details');
      console.log(loadRequestsDetails);
      return loadRequestsDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllRolesByUpperRoleCode(query: any): Promise<any> {
    try {
      const roles = await this.roleModel.findAll({ where: query });
      this.logger.silly('find all load requeusts');
      return roles;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllLoadRequestsByRoleCode(role_code: any): Promise<any> {
    try {
      const loadRequests = await this.loadReuestModel.findAll({ where: { role_code: role_code, status: 0 } });
      this.logger.silly('find all loadRequests');
      return loadRequests;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllLoadRequests40ByRoleCode(role_code: any): Promise<any> {
    try {
      const loadRequests = await this.loadReuestModel.findAll({ where: { role_code: role_code, status: 40 } });
      this.logger.silly('find all loadRequests');
      return loadRequests;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllLoadRequests40ByRoleCodeWithExclude(role_code: any, notIn: any): Promise<any> {
    try {
      const loadRequests = await this.loadReuestModel.findAll({
        where: {
          role_code: role_code,
          status: 40,
          load_request_code: { [Op.notIn]: notIn },
        },
      });
      this.logger.silly('find all loadRequests');
      return loadRequests;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllLoadRequests10ByRoleCode(role_code: any): Promise<any> {
    try {
      const loadRequests = await this.loadReuestModel.findAll({ where: { role_code: role_code, status: 10 } });
      this.logger.silly('find all loadRequests');
      return loadRequests;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // public async findAllLoadRequests20ByRoleCode(role_code: any): Promise<any> {
  //     try {
  //         const loadRequests = await this.loadReuestModel.findAll({where : {role_code:role_code , status : 20}})
  //         this.logger.silly("find all loadRequests")
  //         return loadRequests
  //     } catch (e) {
  //         this.logger.error(e)
  //         throw e
  //     }
  // }

  public async findAllLoadRequests20(): Promise<any> {
    try {
      const loadRequests = await this.loadReuestModel.findAll({ where: { status: 20 } });
      this.logger.silly('find all loadRequests');
      return loadRequests;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllLoadRequestsLinesByLoadRequestsCode(load_requests_codes: any): Promise<any> {
    try {
      const loadRequestsLines = await this.loadRequestLineModel.findAll({
        where: { load_request_code: load_requests_codes },
      });
      this.logger.silly('find all loadRequests');
      return loadRequestsLines;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllLoadRequestsDetailsByLoadRequestsCode(load_requests_codes: any): Promise<any> {
    try {
      const loadRequestsDetails = await this.loadRequestDetailsModel.findAll({
        where: { load_request_code: load_requests_codes },
      });
      this.logger.silly('find all load requests details');
      return loadRequestsDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateLoadRequestLine(load_request_code: any, product_code: any, qntValidated: any): Promise<any> {
    try {
      console.log(load_request_code);
      console.log(product_code);
      console.log(qntValidated);
      const qt_validated = qntValidated;
      const loadRequestLine = await this.loadRequestLineModel.update(
        { qt_validated: qt_validated },
        { where: { load_request_code: load_request_code, product_code: product_code } },
      );

      this.logger.silly('updated load request lines');
      return loadRequestLine;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateLoadRequestLineQtAffected(
    load_request_code: any,
    product_code: any,
    qntValidated: any,
  ): Promise<any> {
    try {
      const qt_validated = qntValidated;
      const loadRequestLine = await this.loadRequestLineModel.update(
        { qt_effected: qt_validated },
        { where: { load_request_code: load_request_code, product_code: product_code } },
      );

      this.logger.silly('updated load request lines');
      return loadRequestLine;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createLoadRequestLine(
    load_request_code: any,
    product_code: any,
    qntValidated: any,
    qntRequested: any,
    productPrice: any,
  ): Promise<any> {
    try {
      const loadRequestLine = await this.loadRequestLineModel.create({
        load_request_code: load_request_code,
        product_code: product_code,
        qt_request: qntRequested,
        qt_validated: qntValidated,
        qt_effected: 0,
        pt_price: productPrice,
      });

      this.logger.silly('updated load request lines');
      return loadRequestLine;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateLoadRequestStatusTo10(load_request_code: any): Promise<any> {
    try {
      const loadRequest = await this.loadReuestModel.update(
        { status: 10 },
        { where: { load_request_code: load_request_code } },
      );

      this.logger.silly('load request status updated to 10');
      return loadRequest;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findLoadRequest(query: any): Promise<any> {
    try {
      const loadRequest = await this.loadReuestModel.findOne({ where: query });
      this.logger.silly('find one loadRequest');
      return loadRequest;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getLotsOfProduct(ld_loc: any, ld_site: any, product_code: any): Promise<any> {
    try {
      const lots = await this.locationDetailModel.findAll({
        where: {
          ld_loc: ld_loc,
          ld_part: product_code,
          ld_site: ld_site,
        },
        attributes: ['id', 'ld_lot', 'ld_qty_oh', 'ld_expire', 'ld_site', 'ld_loc'],
      });
      this.logger.silly('find all lots');
      lots.forEach(lot => {
        lot.dataValues['qty_selected'] = 0;
      });

      return lots;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getLoadRequestData(
    user_mobile_code: any,
    load_request_code: any,
    ld_loc: any,
    ld_site: any,
  ): Promise<any> {
    try {
      // get user mobile and profile & pages codes of the profile
      const user_mobile = await this.userMobileModel.findOne({ where: { user_mobile_code: user_mobile_code } });
      const profile = await this.profileMobileModel.findOne({ where: { profile_code: user_mobile.profile_code } });
      const pages_codes = await this.profileProductPageModel.findAll({
        where: { profile_code: profile.profile_code },
        attributes: ['product_page_code'],
      });
      // get load request lines of the load request (exisiting)
      const loadRequesLines = await this.loadRequestLineModel.findAll({
        where: { load_request_code: load_request_code },
      });

      // obj : page code + products_codes []
      const pagesProducts = [];
      for (const pageCode of pages_codes) {
        const products_codes = await this.productPageDetailsModel.findAll({
          where: { product_page_code: pageCode.product_page_code },
          attributes: ['product_code'],
        });
        pagesProducts.push({ page_code: pageCode.product_page_code, products: products_codes });
      }

      const pagesProductsWithDetails = [];

      for (const page of pagesProducts) {
        const products = [];

        // FOR EACH PRODUCT
        for (const productd of page.products) {
          // get product data
          const product = await this.itemModel.findOne({
            where: { pt_part: productd.dataValues.product_code },
            attributes: ['pt_desc1', 'pt_price', 'pt_part'],
          });

          // CALCULATE STORED QUANTITY
          const sum = await this.getStoredQuantityOfProduct(ld_loc, ld_site, product.pt_part);
          var index = -1;
          index = loadRequesLines.findIndex(line => {
            return line.dataValues.product_code == product.dataValues.pt_part;
          });

          // product was not requested
          if (index != -1) {
            const load_request_line = loadRequesLines[index].dataValues;
            products.push({
              product_code: productd.dataValues.product_code,
              ...product.dataValues,
              qt_request: load_request_line.qt_request,
              qt_validated: load_request_line.qt_validated,
              qt_stored: sum,
            });

            // product was requested
          } else {
            products.push({
              product_code: productd.dataValues.product_code,
              ...product.dataValues,
              qt_request: 0,
              qt_validated: 0,
              qt_stored: sum,
            });
          }
        }
        pagesProductsWithDetails.push({ page_code: page.page_code, products: products });
      }
      return pagesProductsWithDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getLoadRequestDataV2(user_mobile_code: any, load_request_code: any, site: any, loc: any): Promise<any> {
    try {
      // get user mobile and profile & pages codes of the profile
      const user_mobile = await this.userMobileModel.findOne({ where: { user_mobile_code: user_mobile_code } });
      const load_request = await this.loadReuestModel.findOne({ where: { load_request_code: load_request_code } });
      const profile = await this.profileMobileModel.findOne({ where: { profile_code: user_mobile.profile_code } });
      const pages_codes = await this.profileProductPageModel.findAll({
        where: { profile_code: profile.profile_code },
        attributes: ['product_page_code'],
      });
      // get load request lines of the load request (exisiting)
      const loadRequesLines = await this.loadRequestLineModel.findAll({
        where: { load_request_code: load_request_code },
      });

      // obj : page code + products_codes []
      const pagesProducts = [];
      for (const pageCode of pages_codes) {
        const products_codes = await this.productPageDetailsModel.findAll({
          where: { product_page_code: pageCode.product_page_code },
          attributes: ['product_code'],
        });
        pagesProducts.push({ page_code: pageCode.product_page_code, products: products_codes });
      }

      const pagesProductsWithDetails = [];

      for (const page of pagesProducts) {
        const products = [];
        const selectedProducts = [];
        const unselectedProducts = [];

        // FOR EACH PRODUCT IN A PAGE
        for (const productd of page.products) {
          // GET PRODUCT DATA
          const product = await this.itemModel.findOne({
            where: { pt_part: productd.dataValues.product_code },
            attributes: ['pt_desc1', 'pt_price', 'pt_part', 'pt_um'],
          });

          // GET PRODUCT QUANTITY STORED
          // const sum = await this.getStoredQuantityOfProduct(load_request.role_loc,load_request.role_site,product.pt_part)
          // const sum = await this.getStoredQuantityOfProduct(loc,site,product.pt_part)
          console.log('loc from : ' + load_request.role_loc_from);
          const sum = await this.getStoredQuantityOfProduct(load_request.role_loc_from, site, product.pt_part);

          // CHECK IF PRODUCT EXIST IN LOAD REQUEST LINES
          var index = -1;
          index = loadRequesLines.findIndex(line => {
            return line.dataValues.product_code == product.dataValues.pt_part;
          });

          // PRODUCT EXIST
          if (index != -1) {
            const load_request_line = loadRequesLines[index].dataValues;
            // CHECK IF IT EXIST IN LOAD REQUEST DETAILS
            const details = await this.findAllLoadRequestDetailsForLots(
              load_request_line.load_request_code,
              load_request_line.product_code,
            );
            let lots = [];
            let qt_eff = 0;
            for (const element of details) {
              // const qnt = await this.getProductQuantityPerLot(loc,site,element.product_code,element.dataValues.lot )
              const qnt = await this.getProductQuantityPerLot(
                load_request.role_loc_from,
                site,
                element.product_code,
                element.dataValues.lot,
              );
              console.log(qnt);
              lots.push({
                lot_code: element.dataValues.lot,
                qnt_lot: qnt.dataValues.ld_qty_oh,
                qt_effected: element.dataValues.qt_effected,
                ld_status: qnt.dataValues.ld_status,
                ld_expire: qnt.dataValues.ld_expire,
              });
              qt_eff += element.dataValues.qt_effected;
            }

            products.push({
              product_code: productd.dataValues.product_code,
              ...product.dataValues,
              qt_validated: load_request_line.qt_validated,
              qt_stored: sum,
            });
            selectedProducts.push({
              product_code: productd.dataValues.product_code,
              ...product.dataValues,
              qt_validated: load_request_line.qt_validated,
              qt_stored: sum,
              qt_effected: qt_eff,
              lots: lots,
              details: [],
            });

            // qt_request: load_request_line.qt_request,
          } else {
            // does not exist in load request lines
            products.push({
              product_code: productd.dataValues.product_code,
              ...product.dataValues,
              qt_validated: 0,
              qt_stored: sum,
            });
            unselectedProducts.push({
              product_code: productd.dataValues.product_code,
              ...product.dataValues,
              qt_validated: 0,
              qt_stored: sum,
              qt_effected: 0,
              lots: [],
              details: [],
            });
            //qt_request: 0
          }
        }
        // END OF FOR EACH PRODUCT

        let hasAddProduct = false;
        if (unselectedProducts.length > 0) {
          hasAddProduct = true;
        }
        pagesProductsWithDetails.push({
          page_code: page.page_code,
          selectedProducts: selectedProducts,
          unselectedProducts: unselectedProducts,
          hasAddProduct: hasAddProduct,
        });
      }
      return pagesProductsWithDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getLoadRequestDataV3(user_mobile_code: any, load_request_code: any, site: any, loc: any): Promise<any> {
    try {
      // get user mobile and profile & pages codes of the profile
      const user_mobile = await this.userMobileModel.findOne({ where: { user_mobile_code: user_mobile_code } });
      const load_request = await this.loadReuestModel.findOne({ where: { load_request_code: load_request_code } });
      const profile = await this.profileMobileModel.findOne({ where: { profile_code: user_mobile.profile_code } });
      const pages_codes = await this.profileProductPageModel.findAll({
        where: { profile_code: profile.profile_code },
        attributes: ['product_page_code'],
      });
      // get load request lines of the load request (exisiting)
      const loadRequesLines = await this.loadRequestLineModel.findAll({
        where: { load_request_code: load_request_code },
      });

      // obj : page code + products_codes []
      const pagesProducts = [];
      for (const pageCode of pages_codes) {
        const products_codes = await this.productPageDetailsModel.findAll({
          where: { product_page_code: pageCode.product_page_code },
          attributes: ['product_code'],
        });
        pagesProducts.push({ page_code: pageCode.product_page_code, products: products_codes });
      }

      const pagesProductsWithDetails = [];

      for (const page of pagesProducts) {
        const products = [];
        const selectedProducts = [];
        const unselectedProducts = [];

        // FOR EACH PRODUCT IN A PAGE
        for (const productd of page.products) {
          // GET PRODUCT DATA
          const product = await this.itemModel.findOne({
            where: { pt_part: productd.dataValues.product_code },
            attributes: ['pt_desc1', 'pt_price', 'pt_part', 'pt_um'],
          });

          // GET PRODUCT QUANTITY STORED
          // const sum = await this.getStoredQuantityOfProduct(load_request.role_loc,load_request.role_site,product.pt_part)
          // const sum = await this.getStoredQuantityOfProduct(loc,site,product.pt_part)
          console.log('loc from : ' + load_request.role_loc_from);
          const sum = await this.getStoredQuantityOfProduct(load_request.role_loc_from, site, product.pt_part);

          // CHECK IF PRODUCT EXIST IN LOAD REQUEST LINES
          var index = -1;
          index = loadRequesLines.findIndex(line => {
            return line.dataValues.product_code == product.dataValues.pt_part;
          });

          // PRODUCT EXIST
          if (index != -1) {
            const load_request_line = loadRequesLines[index].dataValues;
            // CHECK IF IT EXIST IN LOAD REQUEST DETAILS
            const details = await this.findAllLoadRequestDetailsForLots(
              load_request_line.load_request_code,
              load_request_line.product_code,
            );
            let lots = [];
            let qt_eff = 0;
            for (const element of details) {
              // const qnt = await this.getProductQuantityPerLot(loc,site,element.product_code,element.dataValues.lot )
              const qnt = await this.getProductQuantityPerLot(
                load_request.role_loc_from,
                site,
                element.product_code,
                element.dataValues.lot,
              );
              console.log(qnt);
              lots.push({
                lot_code: element.dataValues.lot,
                qnt_lot: qnt.dataValues.ld_qty_oh,
                qt_effected: element.dataValues.qt_effected,
                qt_preeffected: element.dataValues.qt_effected,
                ld_status: qnt.dataValues.ld_status,
                ld_expire: qnt.dataValues.ld_expire,
              });
              qt_eff += element.dataValues.qt_effected;
            }

            products.push({
              product_code: productd.dataValues.product_code,
              ...product.dataValues,
              qt_validated: load_request_line.qt_validated,
              qt_stored: sum,
            });
            selectedProducts.push({
              product_code: productd.dataValues.product_code,
              ...product.dataValues,
              qt_validated: load_request_line.qt_validated,
              qt_stored: sum,
              qt_effected: qt_eff,
              lots: lots,
              details: [],
            });

            // qt_request: load_request_line.qt_request,
          } else {
            // does not exist in load request lines
            products.push({
              product_code: productd.dataValues.product_code,
              ...product.dataValues,
              qt_validated: 0,
              qt_stored: sum,
            });
            unselectedProducts.push({
              product_code: productd.dataValues.product_code,
              ...product.dataValues,
              qt_validated: 0,
              qt_stored: sum,
              qt_effected: 0,
              lots: [],
              details: [],
            });
            //qt_request: 0
          }
        }
        // END OF FOR EACH PRODUCT

        let hasAddProduct = false;
        if (unselectedProducts.length > 0) {
          hasAddProduct = true;
        }
        pagesProductsWithDetails.push({
          page_code: page.page_code,
          selectedProducts: selectedProducts,
          unselectedProducts: unselectedProducts,
          hasAddProduct: hasAddProduct,
        });
      }
      return pagesProductsWithDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllLoadRequestLines(load_request_code: any): Promise<any> {
    try {
      const loadRequestLines = await this.loadRequestLineModel.findAll({
        where: { load_request_code: load_request_code },
      });
      this.logger.silly('find all loadRequestLines');
      return loadRequestLines;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateLoadRequestStatusToX(load_request_codes: any, x: any): Promise<any> {
    try {
      const loadRequest = await this.loadReuestModel.update(
        { status: x },
        { where: { load_request_code: load_request_codes } },
      );

      this.logger.silly('load request status updated to ' + x);
      return loadRequest;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllLoadRequest20Details(load_request_code: any): Promise<any> {
    try {
      const loadRequestDetails = await this.loadRequestDetailsModel.findAll({
        where: { load_request_code: load_request_code },
      });
      for (const loadRequest of loadRequestDetails) {
        const product = await this.itemModel.findOne({
          where: { pt_part: loadRequest.dataValues.product_code },
          attributes: ['pt_desc1', 'pt_price', 'pt_part'],
        });
        loadRequest.dataValues.product_name = product.pt_desc1;
        // loadRequest.product_price = product.pt_price
        // loadRequest.dataValues.productDetails = product
      }
      this.logger.silly('find all loadRequestDetails');
      return loadRequestDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async findAllLoadRequestDetailsForLots(load_request_code: any, product_code: any): Promise<any> {
    try {
      const loadRequestDetails = await this.loadRequestDetailsModel.findAll({
        where: { load_request_code: load_request_code, product_code: product_code },
        order: [['date_expiration', 'DESC']],
      });
      for (const loadRequest of loadRequestDetails) {
        // const product = await this.itemModel.findOne({
        //     where :{pt_part : loadRequest.dataValues.product_code},
        //     attributes:['pt_desc1', 'pt_price','pt_part']
        // })
        // loadRequest.dataValues.product_name = product.pt_desc1
        // loadRequest.product_price = product.pt_price
        // loadRequest.dataValues.productDetails = product
      }
      this.logger.silly('find all loadRequestDetails');
      return loadRequestDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteLoadRequestDetail(query: any): Promise<any> {
    try {
      const loadRequestDetail = await this.loadRequestDetailsModel.destroy({ where: query });

      this.logger.silly('deleted one load request detail');
      return loadRequestDetail;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // const product = await this.itemModel.findOne({
  //     where :{pt_part : productd.dataValues.product_code},
  //     attributes:['pt_desc1', 'pt_price','pt_part']
  // })

  public async getStoredQuantityOfProduct(ld_loc: any, ld_site: any, product_code: any): Promise<any> {
    try {
      // console.log("loc :" + ld_loc +"\t site:" + ld_site + "\tcode : "+ product_code )
      const quantities = await this.locationDetailModel.findAll({
        where: {
          ld_loc: ld_loc,
          ld_part: product_code,
          ld_site: ld_site,
        },
        attributes: ['ld_qty_oh'],
      });
      let sum = 0;
      if (quantities) {
        quantities.forEach(quantity => {
          // console.log(quantity.dataValues.ld_qty_oh)
          sum += +quantity.dataValues.ld_qty_oh;
        });
      }
      this.logger.silly('quantity sum calculated');

      return sum;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getProductQuantityPerLot(ld_loc: any, ld_site: any, product_code: any, lot: any): Promise<any> {
    try {
      // console.log("loc :" + ld_loc +"\t site:" + ld_site + "\tcode : "+ product_code )
      const quanity = await this.locationDetailModel.findOne({
        where: {
          ld_loc: ld_loc,
          ld_part: product_code,
          ld_site: ld_site,
          ld_lot: lot,
        },
        attributes: ['ld_qty_oh', 'ld_status', 'ld_expire'],
      });

      this.logger.silly('quantity sum calculated');
      return quanity;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getLoadRequestsBetweenDates(startDate: any, endDate: any): Promise<any> {
    try {
      const loadRequests = await this.loadReuestModel.findAll({
        where: Sequelize.and(
          // {del_comp  :{[Op.not]: "null"}},
          { date_creation: { [Op.gte]: new Date(startDate) } },
          { date_creation: { [Op.lte]: new Date(endDate) } },
        ),
      });

      this.logger.silly('found all loadrequests');
      return loadRequests;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getLoadRequestCreationData(): Promise<any> {
    try {
      // get user mobile and profile & pages codes of the profile
      // const user_mobile = await this.userMobileModel.findOne({where : {user_mobile_code:user_mobile_code}})
      // const profile = await this.profileMobileModel.findOne({where:{profile_code :user_mobile.profile_code }})
      // const pages_codes = await this.profileProductPageModel.findAll({where : {profile_code:profile.profile_code} ,attributes: ['product_page_code']})

      // const loadRequesLines = await this.loadRequestLineModel.findAll({where: {load_request_code :load_request_code }})

      const pages_codes = await this.productPageModel.findAll({ where: {}, attributes: ['product_page_code'] });
      // obj : page code + products_codes []
      const pagesProducts = [];
      for (const pageCode of pages_codes) {
        const products_codes = await this.productPageDetailsModel.findAll({
          where: { product_page_code: pageCode.product_page_code },
          attributes: ['product_code'],
        });
        pagesProducts.push({ page_code: pageCode.product_page_code, products: products_codes });
      }

      const pagesProductsWithDetails = [];

      for (const page of pagesProducts) {
        const products = [];

        // FOR EACH PRODUCT
        for (const productd of page.products) {
          // get product data
          const product = await this.itemModel.findOne({
            where: { pt_part: productd.dataValues.product_code },
            attributes: ['pt_desc1', 'pt_price', 'pt_part'],
          });

          // CALCULATE STORED QUANTITY
          const sum = await this.getStoredQuantityOfProductWithoutLocSite(product.pt_part);

          // var index = -1
          // index = loadRequesLines.findIndex(line=>{
          //     return line.dataValues.product_code == product.dataValues.pt_part;
          // })

          // product was requested
          // if(index != -1){
          //     const load_request_line = loadRequesLines[index].dataValues
          //     products.push({product_code:productd.dataValues.product_code, ...product.dataValues, qt_request: load_request_line.qt_request, qt_validated: load_request_line.qt_validated, qt_stored : sum})

          // product was not requested

          products.push({
            product_code: productd.dataValues.product_code,
            ...product.dataValues,
            qt_request: 0,
            qt_validated: 0,
            qt_stored: sum,
          });
        }
        pagesProductsWithDetails.push({ page_code: page.page_code, products: products });
      }
      return pagesProductsWithDetails;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getStoredQuantityOfProductWithoutLocSite(product_code: any): Promise<any> {
    try {
      // console.log("loc :" + ld_loc +"\t site:" + ld_site + "\tcode : "+ product_code )
      const quantities = await this.locationDetailModel.findAll({
        where: {
          ld_part: product_code,
        },
        attributes: ['ld_qty_oh'],
      });
      let sum = 0;
      if (quantities) {
        quantities.forEach(quantity => {
          // console.log(quantity.dataValues.ld_qty_oh)
          sum += +quantity.dataValues.ld_qty_oh;
        });
      }
      this.logger.silly('quantity sum calculated');

      return sum;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createLoadRequest(data: any): Promise<any> {
    try {
      const loadRequests = await this.loadReuestModel.create(data);
      this.logger.silly('created load request');
      return loadRequests;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
