import expressLoader from './express';
import { Container } from 'typedi';
import dependencyInjectorLoader from './dependencyInjector';
import sequelizeLoader from './sequelize';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
  // const mongoConnection = await mongooseLoader();
  // Logger.info('✌️ DB loaded and connected!');

  const sequelizeConnection = await sequelizeLoader();
  Logger.info('✌️ DB loaded and connected!');
  Container.set('sequelize', sequelizeConnection);

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const testModel = {
    name: 'testModel',
    // Notice the require syntax and the '.default'
    model: require('../models/test').default,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  await dependencyInjectorLoader({
    models: [
      testModel,
     
      { name: 'taxeModel', model: require('../models/taxe').default },
      { name: 'siteModel', model: require('../models/site').default },
      { name: 'locationModel', model: require('../models/location').default },
      { name: 'locationFilterModel', model: require('../models/location-filter').default },
      { name: 'profileModel', model: require('../models/profile').default },
      { name: 'userModel', model: require('../models/user').default },
      { name: 'requisitionModel', model: require('../models/requisition').default },
      { name: 'requisitionDetailModel', model: require('../models/requisition-detail').default },
      { name: 'sequenceModel', model: require('../models/sequence').default },
      { name: 'deviseModel', model: require('../models/devise').default },
      { name: 'mesureModel', model: require('../models/mesure').default },
      { name: 'vendorProposalModel', model: require('../models/vendor-proposal').default },
      { name: 'vendorProposalDetailModel', model: require('../models/vendor-proposal-detail').default },
      { name: 'quoteModel', model: require('../models/quote').default },
      { name: 'quoteDetailModel', model: require('../models/quote-detail').default },
      { name: 'saleorderModel', model: require('../models/saleorder').default },
      { name: 'saleorderDetailModel', model: require('../models/saleorder-detail').default },
      { name: 'purchaseOrderModel', model: require('../models/purchase-order').default },
      { name: 'purchaseOrderDetailModel', model: require('../models/purchase-order-detail').default },
      { name: 'inventoryStatusModel', model: require('../models/inventory-status').default },
      { name: 'inventoryStatusDetailsModel', model: require('../models/inventory-status-details').default },
      { name: 'inventoryStatusMouvementsModel', model: require('../models/inventory-status-mouvement').default },
      { name: 'entityModel', model: require('../models/entity').default },
      { name: 'accountdefaultModel', model: require('../models/accountdefault').default },
      { name: 'costSimulationModel', model: require('../models/cost-simulation').default },
      { name: 'tagModel', model: require('../models/tag').default },
      { name: 'locationDetailModel', model: require('../models/location-detail').default },
      { name: 'InvetoryTransactionModel', model: require('../models/inventory-transaction').default },
      { name: 'PurchaseReceiveModel', model: require('../models/purchase-receive').default },
      { name: 'exchangeRateModel', model: require('../models/exchange-rate').default },
      { name: 'pricelistModel', model: require('../models/pricelist').default },
      { name: 'SaleShiperModel', model: require('../models/sale-shiper').default },
      { name: 'invoiceOrderModel', model: require('../models/invoice-order').default },
      { name: 'invoiceOrderDetailModel', model: require('../models/invoice-order-detail').default },
      { name: 'accountReceivableModel', model: require('../models/account-receivable').default },
      { name: 'bankModel', model: require('../models/bank').default },
      { name: 'bankDetailModel', model: require('../models/bank-detail').default },
      { name: 'accountReceivableDetailModel', model: require('../models/account-receivable-detail').default },
      { name: 'accountShiperModel', model: require('../models/account-shiper').default },
      { name: 'accountUnplanifedModel', model: require('../models/account-unplanifed').default },
      { name: 'voucherOrderModel', model: require('../models/voucher-order').default },
      { name: 'voucherOrderDetailModel', model: require('../models/voucher-order-detail').default },
      { name: 'accountPayableModel', model: require('../models/account-payable').default },
      { name: 'accountPayableDetailModel', model: require('../models/account-payable-detail').default },
      { name: 'generalLedgerModel', model: require('../models/general-ledger').default },
      { name: 'daybookModel', model: require('../models/daybook').default },
      { name: 'workcenterModel', model: require('../models/workcenter').default },
      { name: 'workroutingModel', model: require('../models/workrouting').default },
      { name: 'woroutingModel', model: require('../models/worouting').default },
      { name: 'bomModel', model: require('../models/bom').default },
      { name: 'bomPartModel', model: require('../models/bom-part').default },
      { name: 'psModel', model: require('../models/ps').default },
      { name: 'workOrderModel', model: require('../models/work-order').default },
      { name: 'workOrderDetailModel', model: require('../models/work-order-detail').default },
      { name: 'operationHistoryModel', model: require('../models/operation-history').default },
      { name: 'reasonModel', model: require('../models/reason').default },
      { name: 'fraisModel', model: require('../models/frais').default },
      { name: 'fraisDetailModel', model: require('../models/frais-detail').default },
      { name: 'jobModel', model: require('../models/job').default },
      { name: 'jobDetailModel', model: require('../models/job-detail').default },
      { name: 'toolModel', model: require('../models/tool').default },
      { name: 'toolDetailModel', model: require('../models/tool-detail').default },
      { name: 'taskModel', model: require('../models/task').default },
      { name: 'taskDetailModel', model: require('../models/task-detail').default },
      { name: 'projectModel', model: require('../models/project').default },
      { name: 'projectDetailModel', model: require('../models/project-detail').default },
      { name: 'employeModel', model: require('../models/employe').default },
      { name: 'employeAvailabilityModel', model: require('../models/employe-availability').default },
      { name: 'affectEmployeModel', model: require('../models/affect-employe').default },
      { name: 'projectTaskDetailModel', model: require('../models/project-task-detail').default },
      { name: 'addReportModel', model: require('../models/add-report').default },
      { name: 'configModel', model: require('../models/config').default },
      { name: 'payMethModel', model: require('../models/pay-meth').default },
      { name: 'payMethDetailModel', model: require('../models/pay-meth-detail').default },
      { name: 'invoiceOrderTempModel', model: require('../models/invoice-order-temp').default },
      { name: 'invoiceOrderTempDetailModel', model: require('../models/invoice-order-temp-detail').default },
      { name: 'costcenterModel', model: require('../models/costcenter').default },
      { name: 'costsubModel', model: require('../models/costsub').default },
      { name: 'costaccountModel', model: require('../models/costaccount').default },
      { name: 'employeTimeModel', model: require('../models/employe-time').default },
      { name: 'forcastModel', model: require('../models/forcast').default },
      { name: 'labelModel', model: require('../models/label').default },
      { name: 'domainModel', model: require('../models/domain').default },
      { name: 'employeScoreModel', model: require('../models/employe-score').default },
      { name: 'employeJobModel', model: require('../models/employe-job').default },
      { name: 'dealModel', model: require('../models/deal').default },
      { name: 'employeSalaryModel', model: require('../models/employe-salary').default },
      { name: 'patientModel', model: require('../models/patient').default },
      { name: 'patientDetailModel', model: require('../models/patient-detail').default },
      { name: 'associationModel', model: require('../models/association').default },
      { name: 'doctorModel', model: require('../models/doctor').default },
      { name: 'locationDeclaredModel', model: require('../models/location-declared').default },
      { name: 'patientDetailTreatmentModel', model: require('../models/patient-detail-treatment').default },
      { name: 'audiometryModel', model: require('../models/audiometry').default },
      { name: 'audiogramModel', model: require('../models/audiogram').default },
      { name: 'invoiceLineModel', model: require('../models/mobile_models/invoice_line').default },
      { name: 'userMobileModel', model: require('../models/mobile_models/userMobile').default },
      { name: 'roleModel', model: require('../models/mobile_models/role').default },
      { name: 'profileMobileModel', model: require('../models/mobile_models/profile').default },
      { name: 'menuModel', model: require('../models/mobile_models/menu').default },
      { name: 'itineraryModel', model: require('../models/mobile_models/itinerary').default },
      { name: 'serviceModel', model: require('../models/mobile_models/service').default },
      { name: 'checklistModel', model: require('../models/mobile_models/checklist').default },
      { name: 'tokenSerieModel', model: require('../models/mobile_models/token').default },
      { name: 'parameterModel', model: require('../models/mobile_models/parameter').default },
      { name: 'clusterModel', model: require('../models/mobile_models/cluster').default },
      { name: 'subClusterModel', model: require('../models/mobile_models/cluster_sub').default },
      { name: 'categoryModel', model: require('../models/mobile_models/category').default },
      { name: 'categoryTypeModel', model: require('../models/mobile_models/category_type').default },
      { name: 'salesChannelModel', model: require('../models/mobile_models/sales_channel').default },
      { name: 'customerMobileModel', model: require('../models/mobile_models/customer').default },
      { name: 'codeMobileModel', model: require('../models/mobile_models/codes').default },
      { name: 'visitresultModel', model: require('../models/mobile_models/visitresult').default },
      { name: 'productPageModel', model: require('../models/mobile_models/product_page').default },
      { name: 'loadRequestModel', model: require('../models/mobile_models/load_request').default },
      { name: 'loadRequestLineModel', model: require('../models/mobile_models/load_request_line').default },
      { name: 'loadRequestDetailsModel', model: require('../models/mobile_models/load_request_details').default },
      { name: 'paymentMethodModel', model: require('../models/mobile_models/payment_method').default },
      { name: 'profile_menuModel', model: require('../models/mobile_models/profile_menu').default },
      { name: 'role_itineraryModel', model: require('../models/mobile_models/role_itinerary').default },
      { name: 'itinerary_CustomerModel', model: require('../models/mobile_models/itinerary_customer').default },
      { name: 'productPageDetailsModel', model: require('../models/mobile_models/product_page_details').default },
      { name: 'profileProductPageModel', model: require('../models/mobile_models/profile_product_page').default },
      { name: 'posCategoryModel', model: require('../models/pos-categories').default },
      { name: 'posCategoryProductModel', model: require('../models/pos-category-product').default },
      { name: 'posProductModel', model: require('../models/pos-product').default },
      { name: 'posOrderModel', model: require('../models/pos-order').default },
      { name: 'posOrderDetailProductModel', model: require('../models/pos-order-detail-product').default },
      { name: 'itemModel', model: require('../models/item').default },
      { name: 'orderPosProductSuppModel', model: require('../models/pos-order-detail-product-supp').default },
      { name: 'bkhModel', model: require('../models/bkh').default },
      { name: 'ordersHistoryModel', model: require('../models/order-history').default },
      { name: 'deliveryModel', model: require('../models/delivery').default },
      { name: 'orderPosProductIngModel', model: require('../models/pos-order-detail-product-ing').default },
      { name: 'complaintModel', model: require('../models/mobile_models/complaint').default },
      { name: 'complaintDetailsModel', model: require('../models/mobile_models/complaint_details').default },
      { name: 'satisfactionModel', model: require('../models/mobile_models/satisfaction').default },
      { name: 'priceListModel', model: require('../models/mobile_models/price_list').default },
      { name: 'fidelityCardModel', model: require('../models/mobile_models/fidelity_card').default },
      { name: 'cancelationReasonModel', model: require('../models/mobile_models/cancelation_reason').default },
      { name: 'paymentModel', model: require('../models/mobile_models/payment').default },
      { name: 'invoiceModel', model: require('../models/mobile_models/invoice').default },
      { name: 'barecodeInfosModel', model: require('../models/mobile_models/barecode_infos').default },
      { name: 'messagesModel', model: require('../models/mobile_models/messages').default },
      { name: 'visitsModel', model: require('../models/mobile_models/visits').default },
      { name: 'inventoryModel', model: require('../models/mobile_models/inventory').default },
      { name: 'inventoryLineModel', model: require('../models/mobile_models/inventory_line').default },
      { name: 'agendaModel', model: require('../models/mobile_models/agenda').default },
      { name: 'agendaExecutionModel', model: require('../models/mobile_models/agenda_execution').default },
      { name: 'paramHeaderModel', model: require('../models/mobile_models/param_header').default },
      { name: 'paramDetailsModel', model: require('../models/mobile_models/param_details').default },
      { name: 'populationModel', model: require('../models/mobile_models/population').default },
      { name: 'agendaExecutionDetailsModel',model: require('../models/mobile_models/agenda_execution_details').default},
      { name: 'specificationModel', model: require('../models/mobile_models/specification').default },
      { name: 'specificationDetailsModel', model: require('../models/mobile_models/specification_details').default },
      { name: 'SpecificationTestResultsModel',model: require('../models/mobile_models/specification_test_results').default},
      { name: 'itemSpecificationDetailsModel', model: require('../models/mobile_models/item_specification_details').default},
      { name: 'specificationTestHistoryModel',model: require('../models/mobile_models/specification_test_history').default},
      { name: 'qualityTestBillDetailsModel',model: require('../models/mobile_models/quality_test_bill_details').default,},
      { name: 'qualityInspectionRoutingDetailsModel',model: require('../models/mobile_models/quality_inspection_routing_details').default},
      { name: 'pjdDetailsModel', model: require('../models/mobile_models/pjd_det').default },
      { name: 'projectAssetDownDetailsModel', model: require('../models/mobile_models/project_asset_down').default },
      { name: 'printerModel', model: require('../models/printer').default },
      { name: 'orderPosProductSauceModel', model: require('../models/pos-order-detail-product-sauce').default },
      { name: 'unloadRequestModel', model: require('../models/mobile_models/unload_request').default },
      { name: 'unloadRequestDetailsModel', model: require('../models/mobile_models/unload_request_details').default },
      { name: 'allocationDetailModel', model: require('../models/allocation-detail').default },
      { name: 'TransportcostModel', model: require('../models/transportcost').default },
      { name: 'CostlistModel', model: require('../models/costlist').default },
      { name: 'CostlistDetailModel', model: require('../models/costlist-detail').default },
      { name: 'populationArticleModel', model: require('../models/mobile_models/population_article').default },
      { name: 'promotionModel', model: require('../models/mobile_models/promotion').default },
      { name: 'advantageModel', model: require('../models/mobile_models/advantage').default },
      { name: 'userPrinterModel', model: require('../models/user-printers').default },
      { name: 'populationClientPromoModel', model: require('../models/mobile_models/population_client').default },
      { name: 'salesOrderModel', model: require('../models/mobile_models/sales_order').default },
      { name: 'salesOrderLineModel', model: require('../models/mobile_models/sales_order_line').default },
      { name: 'quotaModel', model: require('../models/mobile_models/quota').default },
      { name: 'quotaLineModel', model: require('../models/mobile_models/quota_line').default },
      { name: 'calendarTimingModel', model: require('../models/mobile_models/calendar_timing').default },
      { name: 'itemModelModel', model: require('../models/item-model').default },
      { name: 'itemDetailModel', model: require('../models/item-detail').default },
      { name: 'repertoryDetailModel', model: require('../models/repertory-detail').default },
      { name: 'financialchargeModel', model: require('../models/financialcharge').default },
      { name: 'accountUnplanifedDetailModel', model: require('../models/account-unplanifed-detail').default },
      { name: 'employeTrainingModel', model: require('../models/employe-training').default },
      { name: 'TrainingcalenderModel', model: require('../models/trainingcalender').default },
      { name: 'populationemployeModel', model: require('../models/populationemploye').default },
      { name: 'decompteModel', model: require('../models/mobile_models/decompte').default },
      { name: 'repertoryModel', model: require('../models/repertory').default },
      { name: 'addressModel', model: require('../models/address').default },
      { name: 'providerModel', model: require('../models/provider').default },
      { name: 'customerModel', model: require('../models/customer').default },
      { name: 'productLineModel', model: require('../models/product-line').default },
      { name: 'codeModel', model: require('../models/code').default },
      { name: 'accountModel', model: require('../models/account').default },
      { name: 'subaccountModel', model: require('../models/subaccount').default },
      { name: 'subaccountDetailModel', model: require('../models/subaccount-detail').default },

      { name: 'chariotModel', model: require('../models/chariot').default },
      { name: 'chariotDetailModel', model: require('../models/chariot-detail').default },
      
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  //associations between mobile models

  ////////
  require('../models/mobile_models/product_page').default.hasOne(
    require('../models/mobile_models/profile_product_page').default,
    { foreignKey: 'product_page_code', sourceKey: 'product_page_code' },
  );
  require('../models/mobile_models/profile_product_page').default.belongsTo(
    require('../models/mobile_models/product_page').default,
    { foreignKey: 'product_page_code', sourceKey: 'product_page_code' },
  );

  require('../models/mobile_models/profile').default.hasOne(
    require('../models/mobile_models/profile_product_page').default,
    { foreignKey: 'profile_code', sourceKey: 'profile_code' },
  );
  require('../models/mobile_models/profile_product_page').default.belongsTo(
    require('../models/mobile_models/profile').default,
    { foreignKey: 'profile_code', sourceKey: 'profile_code' },
  );
  ////////

  ////////
  require('../models/mobile_models/product_page').default.belongsTo(
    require('../models/mobile_models/product_page_details').default,
    { foreignKey: 'product_page_code', sourceKey: 'product_page_code' },
  );
  require('../models/mobile_models/product_page_details').default.hasOne(
    require('../models/mobile_models/product_page').default,
    { foreignKey: 'product_page_code', sourceKey: 'product_page_code' },
  );

  // require('../models/item').default.hasOne(require('../models/mobile_models/product_page_details').default, {
  //   foreignKey: 'product_code',
  //   sourceKey: 'pt_part',
  // });
  require('../models/mobile_models/product_page_details').default.hasOne(require('../models/item').default, {
    foreignKey: 'pt_part',
    sourceKey: 'product_code',
  });
  ////////

  require('../models/mobile_models/profile').default.hasOne(require('../models/mobile_models/profile_menu').default, {
    foreignKey: 'profile_code',
    sourceKey: 'profile_code',
  });
  require('../models/mobile_models/profile_menu').default.belongsTo(
    require('../models/mobile_models/profile').default,
    { foreignKey: 'profile_code', sourceKey: 'profile_code' },
  );

  require('../models/mobile_models/menu').default.hasOne(require('../models/mobile_models/profile_menu').default, {
    foreignKey: 'menu_code',
    sourceKey: 'menu_code',
  });
  require('../models/mobile_models/profile_menu').default.belongsTo(require('../models/mobile_models/menu').default, {
    foreignKey: 'menu_code',
    targetKey: 'menu_code',
  });

  require('../models/mobile_models/customer').default.hasMany(
    require('../models/mobile_models/itinerary_customer').default,
    { foreignKey: 'customer_code', sourceKey: 'customer_code' },
  );
  require('../models/mobile_models/itinerary_customer').default.belongsTo(
    require('../models/mobile_models/customer').default,
    { foreignKey: 'customer_code', targetKey: 'customer_code' },
  );

  require('../models/mobile_models/itinerary').default.hasOne(
    require('../models/mobile_models/itinerary_customer').default,
    { foreignKey: 'itinerary_code', sourceKey: 'itinerary_code' },
  );
  require('../models/mobile_models/itinerary_customer').default.belongsTo(
    require('../models/mobile_models/itinerary').default,
    { foreignKey: 'itinerary_code', targetKey: 'itinerary_code' },
  );

  require('../models/mobile_models/role').default.hasMany(require('../models/mobile_models/role_itinerary').default, {
    foreignKey: 'role_code',
    sourceKey: 'role_code',
  });
  // require('../models/mobile_models/role_itinerary').default.belongsTo(require('../models/mobile_models/role').default, {
  //   foreignKey: 'role_code',
  //   targetKey: 'role_code',
  // });

  require('../models/mobile_models/itinerary').default.belongsTo(
    require('../models/mobile_models/role_itinerary').default,
    { foreignKey: 'itinerary_code', sourceKey: 'itinerary_code' },
  );
  require('../models/mobile_models/role_itinerary').default.hasOne(
    require('../models/mobile_models/itinerary').default,
    { foreignKey: 'itinerary_code', sourceKey: 'itinerary_code' },
  );

  // 03 / 12 / 2022 NEW RELATIONS
  // require('../models/mobile_models/service').default.hasOne(require('../models/mobile_models/inventory').default, {
  //   foreignKey: 'service_code',
  //   sourceKey: 'service_code',
  // });
  // require('../models/mobile_models/inventory').default.belongsTo(require('../models/mobile_models/service').default, {
  //   foreignKey: 'service_code',
  //   targetKey: 'service_code',
  // });

  require('../models/mobile_models/service').default.hasOne(require('../models/mobile_models/role').default, {
    foreignKey: 'role_code',
    sourceKey: 'role_code',
  });
  require('../models/mobile_models/role').default.belongsTo(require('../models/mobile_models/service').default, {
    foreignKey: 'role_code',
    targetKey: 'role_code',
  });

  require('../models/mobile_models/service').default.hasOne(require('../models/mobile_models/itinerary').default, {
    foreignKey: 'itinerary_code',
    sourceKey: 'itinerary_code',
  });
  require('../models/mobile_models/itinerary').default.belongsTo(require('../models/mobile_models/service').default, {
    foreignKey: 'itinerary_code',
    targetKey: 'itinerary_code',
  });

  require('../models/mobile_models/role').default.hasOne(require('../models/mobile_models/userMobile').default, {
    foreignKey: 'user_mobile_code',
    sourceKey: 'user_mobile_code',
  });
  require('../models/mobile_models/userMobile').default.belongsTo(require('../models/mobile_models/role').default, {
    foreignKey: 'user_mobile_code',
    targetKey: 'user_mobile_code',
  });

  // ******
  require('../models/mobile_models/profile').default.hasOne(require('../models/mobile_models/userMobile').default, {
    foreignKey: 'profile_code',
    sourceKey: 'profile_code',
  });
  require('../models/mobile_models/userMobile').default.belongsTo(require('../models/mobile_models/profile').default, {
    foreignKey: 'profile_code',
    targetKey: 'profile_code',
  });
  // ****

  require('../models/mobile_models/role').default.hasOne(require('../models/mobile_models/inventory').default, {
    foreignKey: 'role_code',
    sourceKey: 'role_code',
  });
  require('../models/mobile_models/inventory').default.belongsTo(require('../models/mobile_models/role').default, {
    foreignKey: 'role_code',
    targetKey: 'role_code',
  });

  require('../models/mobile_models/invoice').default.hasOne(require('../models/mobile_models/invoice_line').default, {
    foreignKey: 'invoice_code',
    sourceKey: 'invoice_code',
  });
  require('../models/mobile_models/invoice_line').default.belongsTo(
    require('../models/mobile_models/invoice').default,
    { foreignKey: 'invoice_code', targetKey: 'invoice_code' },
  );

  // INVENTORY
  require('../models/mobile_models/inventory').default.hasOne(
    require('../models/mobile_models/inventory_line').default,
    {
      foreignKey: 'inventory_code',
      sourceKey: 'inventory_code',
    },
  );
  require('../models/mobile_models/inventory_line').default.belongsTo(
    require('../models/mobile_models/inventory').default,
    { foreignKey: 'inventory_code', targetKey: 'inventory_code' },
  );

  // require('../models/mobile_models/customer').default.hasOne(require('../models/mobile_models/price_list').default, {
  //   foreignKey: 'pricelist_code',
  //   sourceKey: 'pricelist_code',
  // });
  // require('../models/mobile_models/price_list').default.belongsTo(
  //   require('../models/mobile_models/customer').default,
  //   { foreignKey: 'pricelist_code', targetKey: 'pricelist_code' },
  // );

  // associations pos

  // require('../models/pos-categories').default.hasMany(require('../models/item').default, { foreignKey: 'pt_page' });
  // require('../models/item').default.belongsTo(require('../models/pos-categories').default, { foreignKey: 'pt_page' });

  // associtations erp back office
  require('../models/profile').default.hasOne(require('../models/user').default, {
    foreignKey: 'usrd_profile',
    sourceKey: 'usrg_code',
  });
  require('../models/user').default.belongsTo(require('../models/profile').default, {
    foreignKey: 'usrd_profile',
    targetKey: 'usrg_code',
  });

  require('../models/address').default.hasOne(require('../models/provider').default, {
    foreignKey: 'vd_addr',
    sourceKey: 'ad_addr',
  });
  require('../models/provider').default.belongsTo(require('../models/address').default, {
    foreignKey: 'vd_addr',
    targetKey: 'ad_addr',
  });

  require('../models/address').default.hasOne(require('../models/customer').default, {
    foreignKey: 'cm_addr',
    sourceKey: 'ad_addr',
  });
  require('../models/customer').default.belongsTo(require('../models/address').default, {
    foreignKey: 'cm_addr',
    targetKey: 'ad_addr',
  });

  require('../models/bom').default.hasOne(require('../models/bom-part').default, {
    foreignKey: 'ptb_bom',
    sourceKey: 'bom_parent',
  });
  require('../models/bom-part').default.belongsTo(require('../models/bom').default, {
    foreignKey: 'ptb_bom',
    targetKey: 'bom_parent',
  });

  require('../models/sequence').default.hasOne(require('../models/requisition').default, {
    foreignKey: 'rqm_category',
    sourceKey: 'seq_seq',
  });
  require('../models/requisition').default.belongsTo(require('../models/sequence').default, {
    foreignKey: 'rqm_category',
    targetKey: 'seq_seq',
  });

  require('../models/provider').default.hasOne(require('../models/requisition').default, {
    foreignKey: 'rqm_vend',
    sourceKey: 'vd_addr',
  });
  require('../models/requisition').default.belongsTo(require('../models/provider').default, {
    foreignKey: 'rqm_vend',
    targetKey: 'vd_addr',
  });
  require('../models/item').default.hasOne(require('../models/requisition-detail').default, {
    foreignKey: 'rqd_part',
    sourceKey: 'pt_part',
  });
  require('../models/requisition-detail').default.belongsTo(require('../models/item').default, {
    foreignKey: 'rqd_part',
    targetKey: 'pt_part',
  });

  require('../models/item').default.hasOne(require('../models/pos-order-detail-product').default, {
    foreignKey: 'pt_part',
    sourceKey: 'pt_part',
  });
  require('../models/pos-order-detail-product').default.belongsTo(require('../models/item').default, {
    foreignKey: 'pt_part',
    targetKey: 'pt_part',
  });
  require('../models/provider').default.hasOne(require('../models/vendor-proposal').default, {
    foreignKey: 'vp_vend',
    sourceKey: 'vd_addr',
  });
  require('../models/vendor-proposal').default.belongsTo(require('../models/provider').default, {
    foreignKey: 'vp_vend',
    targetKey: 'vd_addr',
  });
  require('../models/requisition').default.hasOne(require('../models/vendor-proposal').default, {
    foreignKey: 'vp_rqm_nbr',
    sourceKey: 'rqm_nbr',
  });
  require('../models/vendor-proposal').default.belongsTo(require('../models/requisition').default, {
    foreignKey: 'vp_rqm_nbr',
    targetKey: 'rqm_nbr',
  });
  require('../models/item').default.hasOne(require('../models/vendor-proposal-detail').default, {
    foreignKey: 'vpd_part',
    sourceKey: 'pt_part',
  });
  require('../models/vendor-proposal-detail').default.belongsTo(require('../models/item').default, {
    foreignKey: 'vpd_part',
    targetKey: 'pt_part',
  });
  require('../models/provider').default.hasOne(require('../models/purchase-order').default, {
    foreignKey: 'po_vend',
    sourceKey: 'vd_addr',
  });
  require('../models/purchase-order').default.belongsTo(require('../models/provider').default, {
    foreignKey: 'po_vend',
    targetKey: 'vd_addr',
  });
  require('../models/item').default.hasOne(require('../models/purchase-order-detail').default, {
    foreignKey: 'pod_part',
    sourceKey: 'pt_part',
  });
  require('../models/purchase-order-detail').default.belongsTo(require('../models/item').default, {
    foreignKey: 'pod_part',
    targetKey: 'pt_part',
  });
  require('../models/item').default.hasOne(require('../models/cost-simulation').default, {
    foreignKey: 'sct_part',
    sourceKey: 'pt_part',
  });
  require('../models/cost-simulation').default.belongsTo(require('../models/item').default, {
    foreignKey: 'sct_part',
    targetKey: 'pt_part',
  });
  require('../models/item').default.hasOne(require('../models/tag').default, {
    foreignKey: 'tag_part',
    sourceKey: 'pt_part',
  });
  require('../models/tag').default.belongsTo(require('../models/item').default, {
    foreignKey: 'tag_part',
    targetKey: 'pt_part',
  });
  require('../models/quote').default.belongsTo(require('../models/customer').default, {
    foreignKey: 'qo_cust',
    targetKey: 'cm_addr',
  });
  require('../models/quote-detail').default.belongsTo(require('../models/item').default, {
    foreignKey: 'qod_part',
    targetKey: 'pt_part',
  });
  require('../models/taxe').default.hasOne(require('../models/item').default, {
    foreignKey: 'pt_taxc',
    sourceKey: 'tx2_tax_code',
  });
  require('../models/item').default.belongsTo(require('../models/taxe').default, {
    foreignKey: 'pt_taxc',
    targetKey: 'tx2_tax_code',
  });
  require('../models/item').default.hasMany(require('../models/location-detail').default, {
    foreignKey: 'ld_part',
    sourceKey: 'pt_part',
  });
  require('../models/location-detail').default.hasOne(require('../models/item').default, {
    foreignKey: 'pt_part',
    sourceKey: 'ld_part',
  });

  require('../models/item').default.hasMany(require('../models/mobile_models/load_request_line').default, {
    foreignKey: 'product_code',
    sourceKey: 'pt_part',
  });
  require('../models/mobile_models/load_request_line').default.hasOne(require('../models/item').default, {
    foreignKey: 'pt_part',
    sourceKey: 'product_code',
  });

  require('../models/item').default.hasMany(require('../models/mobile_models/load_request_details').default, {
    foreignKey: 'product_code',
    sourceKey: 'pt_part',
  });
  require('../models/mobile_models/load_request_details').default.hasOne(require('../models/item').default, {
    foreignKey: 'pt_part',
    sourceKey: 'product_code',
  });
  require('../models/item').default.hasOne(require('../models/inventory-transaction').default, {
    foreignKey: 'tr_part',
    sourceKey: 'pt_part',
  });
  require('../models/inventory-transaction').default.belongsTo(require('../models/item').default, {
    foreignKey: 'tr_part',
    targetKey: 'pt_part',
  });
  require('../models/item').default.hasOne(require('../models/purchase-receive').default, {
    foreignKey: 'prh_part',
    sourceKey: 'pt_part',
  });
  require('../models/purchase-receive').default.belongsTo(require('../models/item').default, {
    foreignKey: 'prh_part',
    targetKey: 'pt_part',
  });
  require('../models/purchase-order').default.hasOne(require('../models/purchase-receive').default, {
    foreignKey: 'prh_nbr',
    sourceKey: 'po_nbr',
  });
  require('../models/purchase-receive').default.belongsTo(require('../models/purchase-order').default, {
    foreignKey: 'prh_nbr',
    targetKey: 'po_nbr',
  });

  require('../models/location').default.hasOne(require('../models/item').default, {
    foreignKey: 'pt_loc',
    sourceKey: 'loc_loc',
  });
  require('../models/item').default.belongsTo(require('../models/location').default, {
    foreignKey: 'pt_loc',
    targetKey: 'loc_loc',
  });

  // require('../models/exchange-rate').default.hasOne(require('../models/currency').default,{foreignKey: 'cu_curr',sourceKey: 'exr_curr1'})
  // require('../models/currency').default.belongsTo(require('../models/exchange-rate').default,{  foreignKey: 'cu_curr', targetKey: 'exr_curr1'})

  // require('../models/exchange-rate').default.hasOne(require('../models/currency').default,{foreignKey: 'cu_curr',sourceKey: 'exr_curr2'})
  // require('../models/currency').default.belongsTo(require('../models/exchange-rate').default,{  foreignKey: 'cu_curr', targetKey: 'exr_curr2'})

  require('../models/sale-shiper').default.belongsTo(require('../models/item').default, {
    foreignKey: 'psh_part',
    targetKey: 'pt_part',
  });
  require('../models/saleorder').default.hasOne(require('../models/sale-shiper').default, {
    foreignKey: 'psh_nbr',
    sourceKey: 'so_nbr',
  });
  require('../models/sale-shiper').default.belongsTo(require('../models/saleorder').default, {
    foreignKey: 'psh_nbr',
    targetKey: 'so_nbr',
  });

  require('../models/item').default.hasOne(require('../models/quote-detail').default, {
    foreignKey: 'qod_part',
    sourceKey: 'pt_part',
  });
  require('../models/sequence').default.hasOne(require('../models/saleorder').default, {
    foreignKey: 'so_category',
    sourceKey: 'seq_seq',
  });
  require('../models/saleorder').default.belongsTo(require('../models/sequence').default, {
    foreignKey: 'so_category',
    targetKey: 'seq_seq',
  });
  require('../models/customer').default.hasOne(require('../models/saleorder').default, {
    foreignKey: 'so_cust',
    sourceKey: 'cm_addr',
  });
  require('../models/saleorder').default.belongsTo(require('../models/customer').default, {
    foreignKey: 'so_cust',
    targetKey: 'cm_addr',
  });
  require('../models/item').default.hasOne(require('../models/saleorder-detail').default, {
    foreignKey: 'sod_part',
    sourceKey: 'pt_part',
  });
  require('../models/saleorder-detail').default.belongsTo(require('../models/item').default, {
    foreignKey: 'sod_part',
    targetKey: 'pt_part',
  });
  require('../models/customer').default.hasOne(require('../models/invoice-order').default, {
    foreignKey: 'ih_bill',
    sourceKey: 'cm_addr',
  });
  require('../models/invoice-order').default.belongsTo(require('../models/customer').default, {
    foreignKey: 'ih_bill',
    targetKey: 'cm_addr',
  });
  require('../models/item').default.hasOne(require('../models/invoice-order-detail').default, {
    foreignKey: 'idh_part',
    sourceKey: 'pt_part',
  });
  require('../models/invoice-order-detail').default.belongsTo(require('../models/item').default, {
    foreignKey: 'idh_part',
    targetKey: 'pt_part',
  });
  require('../models/customer').default.hasOne(require('../models/account-receivable').default, {
    foreignKey: 'ar_bill',
    sourceKey: 'cm_addr',
  });
  require('../models/account-receivable').default.belongsTo(require('../models/customer').default, {
    foreignKey: 'ar_bill',
    targetKey: 'cm_addr',
  });
  require('../models/customer').default.hasOne(require('../models/account-receivable').default, {
    foreignKey: 'ar_cust',
    sourceKey: 'cm_addr',
  });
  require('../models/account-receivable').default.belongsTo(require('../models/customer').default, {
    foreignKey: 'ar_cust',
    targetKey: 'cm_addr',
  });

  require('../models/taxe').default.hasOne(require('../models/saleorder-detail').default, {
    foreignKey: 'sod_tax_code',
    sourceKey: 'tx2_tax_code',
  });
  require('../models/saleorder-detail').default.belongsTo(require('../models/taxe').default, {
    foreignKey: 'sod_tax_code',
    targetKey: 'tx2_tax_code',
  });

  require('../models/taxe').default.hasOne(require('../models/purchase-order-detail').default, {
    foreignKey: 'pod_tax_code',
    sourceKey: 'tx2_tax_code',
  });
  require('../models/purchase-order-detail').default.belongsTo(require('../models/taxe').default, {
    foreignKey: 'pod_tax_code',
    targetKey: 'tx2_tax_code',
  });

  require('../models/taxe').default.hasOne(require('../models/quote-detail').default, {
    foreignKey: 'qod_tax_code',
    sourceKey: 'tx2_tax_code',
  });
  require('../models/quote-detail').default.belongsTo(require('../models/taxe').default, {
    foreignKey: 'qod_tax_code',
    targetKey: 'tx2_tax_code',
  });

  require('../models/taxe').default.hasOne(require('../models/invoice-order-detail').default, {
    foreignKey: 'idh_tax_code',
    sourceKey: 'tx2_tax_code',
  });
  require('../models/invoice-order-detail').default.belongsTo(require('../models/taxe').default, {
    foreignKey: 'idh_tax_code',
    targetKey: 'tx2_tax_code',
  });

  require('../models/taxe').default.hasOne(require('../models/purchase-receive').default, {
    foreignKey: 'prh_tax_code',
    sourceKey: 'tx2_tax_code',
  });
  require('../models/purchase-receive').default.belongsTo(require('../models/taxe').default, {
    foreignKey: 'prh_tax_code',
    targetKey: 'tx2_tax_code',
  });

  require('../models/taxe').default.hasOne(require('../models/sale-shiper').default, {
    foreignKey: 'psh_tax_code',
    sourceKey: 'tx2_tax_code',
  });
  require('../models/sale-shiper').default.belongsTo(require('../models/taxe').default, {
    foreignKey: 'psh_tax_code',
    targetKey: 'tx2_tax_code',
  });

  require('../models/address').default.hasOne(require('../models/bank').default, {
    foreignKey: 'bk_code',
    sourceKey: 'ad_addr',
  });
  require('../models/bank').default.belongsTo(require('../models/address').default, {
    foreignKey: 'bk_code',
    targetKey: 'ad_addr',
  });

  require('../models/customer').default.hasOne(require('../models/account-shiper').default, {
    foreignKey: 'as_cust',
    sourceKey: 'cm_addr',
  });
  require('../models/account-shiper').default.belongsTo(require('../models/customer').default, {
    foreignKey: 'as_cust',
    targetKey: 'cm_addr',
  });

  require('../models/provider').default.hasOne(require('../models/account-unplanifed').default, {
    foreignKey: 'au_vend',
    sourceKey: 'vd_addr',
  });
  require('../models/account-unplanifed').default.belongsTo(require('../models/provider').default, {
    foreignKey: 'au_vend',
    targetKey: 'vd_addr',
  });

  require('../models/provider').default.hasOne(require('../models/voucher-order').default, {
    foreignKey: 'vh_vend',
    sourceKey: 'vd_addr',
  });
  require('../models/voucher-order').default.belongsTo(require('../models/provider').default, {
    foreignKey: 'vh_vend',
    targetKey: 'vd_addr',
  });
  require('../models/item').default.hasOne(require('../models/voucher-order-detail').default, {
    foreignKey: 'vdh_part',
    sourceKey: 'pt_part',
  });
  require('../models/voucher-order-detail').default.belongsTo(require('../models/item').default, {
    foreignKey: 'vdh_part',
    targetKey: 'pt_part',
  });
  require('../models/taxe').default.hasOne(require('../models/voucher-order-detail').default, {
    foreignKey: 'vdh_tax_code',
    sourceKey: 'tx2_tax_code',
  });
  require('../models/voucher-order-detail').default.belongsTo(require('../models/taxe').default, {
    foreignKey: 'vdh_tax_code',
    targetKey: 'tx2_tax_code',
  });

  require('../models/provider').default.hasOne(require('../models/account-payable').default, {
    foreignKey: 'ap_vend',
    sourceKey: 'vd_addr',
  });
  require('../models/account-payable').default.belongsTo(require('../models/provider').default, {
    foreignKey: 'ap_vend',
    targetKey: 'vd_addr',
  });
  require('../models/account-payable').default.belongsTo(require('../models/address').default, {
    foreignKey: 'ap_vend',
    targetKey: 'ad_addr',
  });

  require('../models/general-ledger').default.belongsTo(require('../models/address').default, {
    foreignKey: 'glt_addr',
    targetKey: 'ad_addr',
  });

  require('../models/item').default.hasOne(require('../models/ps').default, {
    foreignKey: 'ps_comp',
    sourceKey: 'pt_part',
  });
  require('../models/ps').default.belongsTo(require('../models/item').default, {
    foreignKey: 'ps_comp',
    targetKey: 'pt_part',
  });

  require('../models/item').default.hasOne(require('../models/work-order').default, {
    foreignKey: 'wo_part',
    sourceKey: 'pt_part',
  });
  require('../models/work-order').default.belongsTo(require('../models/item').default, {
    foreignKey: 'wo_part',
    targetKey: 'pt_part',
  });

  require('../models/item').default.hasOne(require('../models/work-order-detail').default, {
    foreignKey: 'wod_part',
    sourceKey: 'pt_part',
  });
  require('../models/work-order-detail').default.belongsTo(require('../models/item').default, {
    foreignKey: 'wod_part',
    targetKey: 'pt_part',
  });

  require('../models/customer').default.hasOne(require('../models/project').default, {
    foreignKey: 'pm_cust',
    sourceKey: 'cm_addr',
  });
  require('../models/project').default.belongsTo(require('../models/customer').default, {
    foreignKey: 'pm_cust',
    targetKey: 'cm_addr',
  });

  require('../models/item').default.hasOne(require('../models/project-detail').default, {
    foreignKey: 'pmd_part',
    sourceKey: 'pt_part',
  });
  require('../models/project-detail').default.belongsTo(require('../models/item').default, {
    foreignKey: 'pmd_part',
    targetKey: 'pt_part',
  });

  require('../models/task').default.hasOne(require('../models/project-detail').default, {
    foreignKey: 'pmd_task',
    sourceKey: 'tk_code',
  });
  require('../models/project-detail').default.belongsTo(require('../models/task').default, {
    foreignKey: 'pmd_task',
    targetKey: 'tk_code',
  });

  require('../models/employe').default.hasOne(require('../models/employe-availability').default, {
    foreignKey: 'empd_addr',
    sourceKey: 'emp_addr',
  });
  require('../models/employe-availability').default.belongsTo(require('../models/employe').default, {
    foreignKey: 'empd_addr',
    targetKey: 'emp_addr',
  });

  require('../models/project').default.hasOne(require('../models/affect-employe').default, {
    foreignKey: 'pme_pm_code',
    sourceKey: 'pm_code',
  });
  require('../models/affect-employe').default.belongsTo(require('../models/project').default, {
    foreignKey: 'pme_pm_code',
    targetKey: 'pm_code',
  });

  require('../models/project').default.hasOne(require('../models/add-report').default, {
    foreignKey: 'pmr_pm_code',
    sourceKey: 'pm_code',
  });
  require('../models/add-report').default.belongsTo(require('../models/project').default, {
    foreignKey: 'pmr_pm_code',
    targetKey: 'pm_code',
  });

  require('../models/customer').default.hasOne(require('../models/invoice-order-temp').default, {
    foreignKey: 'ith_bill',
    sourceKey: 'cm_addr',
  });
  require('../models/invoice-order-temp').default.belongsTo(require('../models/customer').default, {
    foreignKey: 'ith_bill',
    targetKey: 'cm_addr',
  });
  require('../models/item').default.hasOne(require('../models/invoice-order-temp-detail').default, {
    foreignKey: 'itdh_part',
    sourceKey: 'pt_part',
  });
  require('../models/invoice-order-temp-detail').default.belongsTo(require('../models/item').default, {
    foreignKey: 'itdh_part',
    targetKey: 'pt_part',
  });
  require('../models/employe').default.hasOne(require('../models/employe-time').default, {
    foreignKey: 'empt_code',
    sourceKey: 'emp_addr',
  });
  require('../models/employe-time').default.belongsTo(require('../models/employe').default, {
    foreignKey: 'empt_code',
    targetKey: 'emp_addr',
  });
  // require('../models/location-filter').default.belongsTo(require('../models/location').default, {
  //   foreignKey: 'loc_loc',
  //   targetKey: 'loc_loc',
  // });
  require('../models/employe').default.hasOne(require('../models/employe-salary').default, {
    foreignKey: 'salary_code',
    sourceKey: 'emp_addr',
  });
  require('../models/employe-salary').default.belongsTo(require('../models/employe').default, {
    foreignKey: 'salary_code',
    targetKey: 'emp_addr',
  });
  require('../models/employe').default.hasOne(require('../models/employe-score').default, {
    foreignKey: 'emps_addr',
    sourceKey: 'emp_addr',
  });
  require('../models/employe-score').default.belongsTo(require('../models/employe').default, {
    foreignKey: 'emps_addr',
    targetKey: 'emp_addr',
  });
  require('../models/job').default.hasOne(require('../models/employe-job').default, {
    foreignKey: 'empj_job',
    sourceKey: 'jb_code',
  });
  require('../models/employe-job').default.belongsTo(require('../models/job').default, {
    foreignKey: 'empj_job',
    targetKey: 'jb_code',
  });

  require('../models/item').default.hasOne(require('../models/operation-history').default, {
    foreignKey: 'op_part',
    sourceKey: 'pt_part',
  });
  require('../models/operation-history').default.belongsTo(require('../models/item').default, {
    foreignKey: 'op_part',
    targetKey: 'pt_part',
  });

  require('../models/work-order').default.hasOne(require('../models/operation-history').default, {
    foreignKey: 'op_wo_lot',
    sourceKey: 'id',
  });
  require('../models/operation-history').default.belongsTo(require('../models/work-order').default, {
    foreignKey: 'op_wo_lot',
    targetKey: 'id',
  });

  require('../models/project').default.hasOne(require('../models/transportcost').default, {
    foreignKey: 'trc_project',
    sourceKey: 'pm_code',
  });
  require('../models/transportcost').default.belongsTo(require('../models/project').default, {
    foreignKey: 'trc_project',
    targetKey: 'pm_code',
  });

  require('../models/site').default.hasOne(require('../models/costlist').default, {
    foreignKey: 'ltrc_site',
    sourceKey: 'si_site',
  });
  require('../models/costlist').default.belongsTo(require('../models/site').default, {
    foreignKey: 'ltrc_site',
    targetKey: 'si_site',
  });
  require('../models/transportcost').default.hasOne(require('../models/costlist').default, {
    foreignKey: 'ltrc_trc_code',
    sourceKey: 'trc_code',
  });
  require('../models/costlist').default.belongsTo(require('../models/transportcost').default, {
    foreignKey: 'ltrc_trc_code',
    targetKey: 'trc_code',
  });

  require('../models/patient').default.hasOne(require('../models/patient-detail').default, {
    foreignKey: 'patd_code',
    sourceKey: 'pat_code',
  });
  require('../models/patient-detail').default.belongsTo(require('../models/patient').default, {
    foreignKey: 'patd_code',
    targetKey: 'pat_code',
  });

  require('../models/item').default.hasOne(require('../models/location-declared').default, {
    foreignKey: 'ldd_part',
    sourceKey: 'pt_part',
  });
  require('../models/location-declared').default.belongsTo(require('../models/item').default, {
    foreignKey: 'ldd_part',
    targetKey: 'pt_part',
  });
  require('../models/patient').default.hasOne(require('../models/patient-detail-treatment').default, {
    foreignKey: 'patdt_code',
    sourceKey: 'pat_code',
  });
  require('../models/patient-detail-treatment').default.belongsTo(require('../models/patient').default, {
    foreignKey: 'patdt_code',
    targetKey: 'pat_code',
  });

  require('../models/patient').default.hasOne(require('../models/audiometry').default, {
    foreignKey: 'audio_pat_code',
    sourceKey: 'pat_code',
  });
  require('../models/audiometry').default.belongsTo(require('../models/patient').default, {
    foreignKey: 'audio_pat_code',
    targetKey: 'pat_code',
  });

  require('../models/audiometry').default.hasOne(require('../models/audiogram').default, {
    foreignKey: 'audd_code',
    sourceKey: 'audio_code',
  });
  require('../models/audiogram').default.belongsTo(require('../models/audiometry').default, {
    foreignKey: 'audd_code',
    targetKey: 'audio_code',
  });

  require('../models/site').default.hasOne(require('../models/item-model').default, {
    foreignKey: 'mod_site',
    sourceKey: 'si_site',
  });
  require('../models/item-model').default.belongsTo(require('../models/site').default, {
    foreignKey: 'mod_site',
    targetKey: 'si_site',
  });

  require('../models/location').default.hasOne(require('../models/item-model').default, {
    foreignKey: 'mod_loc',
    sourceKey: 'loc_loc',
  });
  require('../models/item-model').default.belongsTo(require('../models/location').default, {
    foreignKey: 'mod_loc',
    targetKey: 'loc_loc',
  });

  require('../models/mobile_models/profile_product_page').default.hasMany(
    require('../models/mobile_models/product_page_details').default,
    { foreignKey: 'product_page_code', sourceKey: 'product_page_code' },
  );

  require('../models/item').default.hasMany(require('../models/mobile_models/price_list').default, {
    foreignKey: 'product_code',
    sourceKey: 'pt_part',
  });



  require('../models/item-detail').default.belongsTo(
    require('../models/item').default,
    { foreignKey: 'ptd_part', sourceKey: 'pt_part' },
  );
  require('../models/item').default.hasMany(
    require('../models/item-detail').default,
    { foreignKey: 'ptd_part', sourceKey: 'pt_part' },
  );

  require('../models/financialcharge').default.hasMany(require('../models/account-unplanifed-detail').default, {
    foreignKey: 'aud_fc_code',
    sourceKey: 'fc_code',
  });
  require('../models/account-unplanifed-detail').default.hasOne(require('../models/financialcharge').default, {
    foreignKey: 'fc_code',
    sourceKey: 'aud_fc_code',
  });
  require('../models/item').default.hasMany(require('../models/trainingcalender').default, {
    foreignKey: 'tc_part',
    sourceKey: 'pt_part',
  });
  require('../models/trainingcalender').default.hasOne(require('../models/item').default, {
    foreignKey: 'pt_part',
    sourceKey: 'tc_part',
  });
  require('../models/provider').default.hasMany(require('../models/trainingcalender').default, {
    foreignKey: 'tc_vend',
    sourceKey: 'vd_addr',
  });
  require('../models/trainingcalender').default.hasOne(require('../models/provider').default, {
    foreignKey: 'vd_addr',
    sourceKey: 'tc_vend',
  });


  

  Logger.info('✌️ ADD MODEL ASSOCIATION');
  // sync models
//  await sequelizeConnection.sync().catch(err => { console.log(err)});
  //  await sequelizeConnection
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log('database updated');
  //   })
  //   .catch(err => {
      
  //   });

  Logger.info('✌️ SYNC ALL MODELS');
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
