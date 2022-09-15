import { IUser } from '../../interfaces/IUser';
import * as S from 'sequelize'
declare global {
  namespace Express {
    export interface Request {
      // currentUser: IUser & Document;
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
    export type ParameterModel =S.Model;
    export type CodeMobileModel = S.Model;
    export type TokenSerieModel = S.Model;
    export type CategoryModel = S.Model;
    export type ClusterModel = S.Model;
    export type CategoryTypeModel = S.Model;
    export type SubClusterModel = S.Model;
    export type visitresultModel = S.Model;
    export type salesChannelModel = S.Model;

   


  }
  
}
