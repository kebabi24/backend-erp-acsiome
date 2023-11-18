import { IUser } from '../../interfaces/IUser';
import * as S from 'sequelize';
declare global {
  namespace Express {
    export interface Request {
      // currentUser: IUser & Document;
      file?: any;
    }
  }

  namespace Models {
    // export type UserModel = Model<IUser & Document>;
    export type ProviderModel = S.Model;
    export type AddressModel = S.Model;
    export type CurrencyModel = S.Model;
    export type ProductLineModel = S.Model;
    export type ItemModel = S.Model;
    export type CodeModel = S.Model;
    export type WorkCenterModel = S.Model;
    export type WorkRoutingModel = S.Model;
    export type SiteModel = S.Model;
    export type LocationModel = S.Model;
    export type ProfileModel = S.Model;
    export type UserModel = S.Model;
    export type RequisitionDetailModel = S.Model;
    export type RequisitionModel = S.Model;
    export type SequenceModel = S.Model;
    export type DeviseModel = S.Model;
    export type AccountModel = S.Model;
    export type MesureModel = S.Model;
    export type VendorPropasalModel = S.Model;
    export type quoteModel = S.Model;
    export type quoteDetailModel = S.Model;
    export type saleOrderModel = S.Model;
    export type saleOrderDetailModel = S.Model;
    export type VendorPropasalDetailModel = S.Model;
    export type PurchaseOrderModel = S.Model;
    export type PurchaseOrderDetailModel = S.Model;
    export type TaxeModel = S.Model;
    export type InventoryStatusModel = S.Model;
    export type InventoryStatusDetailModel = S.Model;
    export type EntityModel = S.Model;
    export type AccountdefaultModel = S.Model;
    export type CostSimulationModel = S.Model;
    export type TagModel = S.Model;
    export type LocationDetailModel = S.Model;
    export type CustomerModel = S.Model;
    export type InventoryTransactionModel = S.Model;
    export type PurchaseRecieveModel = S.Model;
    export type ExchangeRateModel = S.Model;
    export type PricelistModel = S.Model;
    export type SaleShiperModel = S.Model;
    export type InvoiceOrderModel = S.Model;
    export type InvoiceOrderDetailModel = S.Model;
    export type AccountReceivableModel = S.Model;
    export type AccountShiperModel = S.Model;
    export type AccountReceivableDetailModel = S.Model;
    export type BankModel = S.Model;
    export type BankDetailModel = S.Model;
    export type VoucherOrderModel = S.Model;
    export type VoucherOrderDetailModel = S.Model;
    export type AccountPayableDetailModel = S.Model;
    export type GeneralLedgerModel = S.Model;
    export type DaybookModel = S.Model;
    export type BomModel = S.Model;
    export type PsModel = S.Model;
    export type WorkOrderModel = S.Model;
    export type WorkOrderDetailModel = S.Model;
    export type OperationHistoryModel = S.Model;
    export type ReasonModel = S.Model;
    export type FraisModel = S.Model;
    export type FraisDetailModel = S.Model;
    export type JobModel = S.Model;
    export type JobDetailModel = S.Model;
    export type ToolModel = S.Model;
    export type ToolDetailModel = S.Model;
    export type TaskModel = S.Model;
    export type TaskDetailModel = S.Model;
    export type ProjectModel = S.Model;
    export type ProjectDetailModel = S.Model;
    export type ProjectTaskDetailModel = S.Model;
    export type EmployeModel = S.Model;
    export type EmployeAvailabilityModel = S.Model;
    export type AffectEmployeModel = S.Model;
    export type AddReportModel = S.Model;
    export type ConfigModel = S.Model;
    export type PayMethModel = S.Model;
    export type PayMethDetailModel = S.Model;
    export type InvoiceOrderTempModel = S.Model;
    export type InvoiceOrderTempDetailModel = S.Model;
    export type WoroutingModel = S.Model;
    export type BomPartModel = S.Model;
    export type SubccountModel = S.Model;
    export type SubaccountDetailModel = S.Model;
    export type CostcenterModel = S.Model;
    export type CostsubModel = S.Model;
    export type CostaccountModel = S.Model;
    export type PosCategoryModel = S.Model;
    export type PosProductModel = S.Model;
    export type PosCategoryProductModel = S.Model;
    export type ProductIngredient = S.Model;
    //
    export type UserMobileModel = S.Model;
    export type ProfileMobileModel = S.Model;
    export type RoleModel = S.Model;
    export type MenuModel = S.Model;
    export type Profile_menuModel = S.Model;
    export type ServiceModel = S.Model;
    export type ItineraryModel = S.Model;
    export type Itinerary_CustomerModel = S.Model;
    export type CustomerMobileModel = S.Model;
    export type ChecklistModel = S.Model;
    export type Role_itineraryModel = S.Model;
    export type ParameterModel = S.Model;
    export type CodeMobileModel = S.Model;
    export type TokenSerieModel = S.Model;
    export type CategoryModel = S.Model;
    export type ClusterModel = S.Model;
    export type CategoryTypeModel = S.Model;
    export type SubClusterModel = S.Model;
    export type visitresultModel = S.Model;
    export type salesChannelModel = S.Model;
    // phase 2
    export type productPageModel = S.Model;
    export type productPageDetailsModel = S.Model;
    export type profileProductPageModel = S.Model;
    export type loadRequestModel = S.Model;
    export type loadRequestLineModel = S.Model;
    export type loadRequestDetailsModel = S.Model;
    export type posOrderModel = S.Model;
    export type posOrderDetailProductModel = S.Model;
    export type posOrderroductSuppModel = S.Model;
    export type posOrderProductSauceModel = S.Model;
    export type posOrderProductIngModel = S.Model;
    export type ordersHistory = S.Model;
    export type bkhModel = S.Model;
    export type emplyeTimeModel = S.Model;
    export type deliveryModel = S.Model;
    export type complaintModel = S.Model;
    export type complaintDetailsModel = S.Model;
    export type SatisfactionModel = S.Model;
    export type invoiceModel = S.Model;
    export type invoiceLineModel = S.Model;
    export type forcastModel = S.Model;
    export type InventoryStatusMouvementModel = S.Model;
    // new models
    export type ListPriceModel = S.Model;
    export type fidelityCardModel = S.Model;
    export type InventoryModel = S.Model;
    export type InventoryLineModel = S.Model;
    export type cancelationReasonModel = S.Model;
    export type paymentModel = S.Model;
    export type barecodeInfosModel = S.Model;
    export type messagesModel = S.Model;
    export type visitsModel = S.Model;

    // CRM models
    export type paramHeaderModel = S.Model;
    export type paramDetailsModel = S.Model;
    export type populationModel = S.Model;
    export type agendaModel = S.Model;
    export type agendaExecutionModel = S.Model;
    export type agendaExecutionDetailsModel = S.Model;
    //etiquetage models
    export type LabelModel = S.Model;

    // NEW
    export type mpMstrModel = S.Model;
    export type mpDetailsModel = S.Model;
    export type DomainModel = S.Model;
    export type locationFilterModel = S.Model;
    export type specificationModel = S.Model;
    export type specificationDetailsModel = S.Model;
    export type SpecificationTestResultsModel = S.Model;
    export type itemSpecificationDetailsModel = S.Model;
    export type SpecificationTestHistoryModel = S.Model;
    export type QualityTestBillDetails = S.Model;
    export type QualityInspectionRoutingDetailsModel = S.Model;
    export type EmployeScoreModel = S.Model;
    export type EmployeTimeModel = S.Model;
    export type EmployeSalaryModel = S.Model;
    export type EmployeJobModel = S.Model;

    export type PjdDetailsModel = S.Model;
    export type projectAssetDownDetailsModel = S.Model;
    export type DealModel = S.Model;
    export type PrinterModel = S.Model;
    export type RepertoryModel = S.Model;

    export type unloadRequestModel = S.Model;
    export type unloadRequestDetailsModel = S.Model;
    export type AllocationDetailModel = S.Model;

    export type TransportcostModel = S.Model;
    export type CostlistModel = S.Model;
    export type CostlistDetailModel = S.Model;
    export type UserPrinterModel = S.Model;

    // PROMOTION
    export type populationArticleModel = S.Model;
    export type promotionModel = S.Model;
    export type advantageModel = S.Model;
    export type populationClientPromoModel = S.Model;

    export type AccountUnplanifedModel = S.Model;
    export type PatientModel = S.Model;
    export type PatientDetailModel = S.Model;
    export type AssociationModel = S.Model;
    export type DoctorModel = S.Model;
    export type LocationDeclaredModel = S.Model;


    export type QuotaModel = S.Model;
    export type QuotaLineModel = S.Model;
    export type SalesOrderModel = S.Model;
    export type SalesOrderLineModel = S.Model;
    export type AudiometryModel = S.Model;
    export type AudiogramModel = S.Model;


   
  }
}
