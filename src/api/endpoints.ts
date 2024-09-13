export const Advertisement = {
	AdvertisementPassport: '/api/v1/advertisement/create/passport',
	GetAdvertisement: 'api/v1/advertisement',
	GetAllAdvertisementCustomer: 'api/v1/advertisement/customer/all',
	GetAllHistoryAdvertisement: 'api/v1/advertisement/history',
	DeleteSingleLot: '/api/v1/advertisement/:id/lot/:idLot/:idSubLot',
	PostAdvertisementWinnerLots:
		'/api/v1/advertisement/set/status/admin-final-check',
	GetAdvertisementProtocol:
		'/api/v1/advertisement/:id/generate/advertisement/protocol',
	GetAdvertisementInvoiceCommission:
		'api/v1/advertisement/:id/generate/advertisement/invoice/commission',
	UpdateLotAdvertisement: 'api/v1/advertisement/lot/update',
	Categories: 'api/v1/categories',
	CloseProposal: '/api/v1/advertisement/lot/:id/bid/delete',
	GetOrganizationBets: '/api/v1/advertisement/lot/:id/bets'
}

export const AuthEndpoints = {
	Login: `/api/v1/login`,
	Logout: `/api/v1/logout`
}

export const AuthCustomerEndpoints = {
	Login: `/api/v1/customer/login`,
	Logout: `/api/v1/customer/logout`,
	Me: '/api/v1/customer/me',
	SignUpCustomer: '/api/v1/customer/signup',
	PasswordResetRequest: '/api/v1/customer/notify/passwordResetRequest',
	ResetPasswordConfirm: '/api/v1/customer/resetPassword/:key',
	SendEmailForResetPasswordRequest: '/api/v1/customer/passwordResetRequest'
}

export const UsersEndpoint = {
	ListOfUsers: '/api/v1/users',
	GetUserModel: '/api/v1/user/details/:id',
	HardDeleteUser: '/api/v1/user/hardDelete/:id',
	SoftDeleteUser: '/api/v1/user/delete/:id'
}

// toDo tech debt move to slices/users and UsersEndpoint
export const CreateEditAdminEndpoints = {
	CreateAdmin: '/api/v1/user/create',
	EditAdmin: '/api/v1/user/update'
}
// toDo tech debt move to slices/users and UsersEndpoint
export const deleteAdminEndpoints = {
	HardDeleteAdmin: '/api/v1/user/hardDelete/:id'
}

export const OrganizationEndpoints = {
	GetListOrganization: '/api/v1/organizations',
	CreateOrganization: '/api/v1/organization/create',
	AccreditUpdate: '/api/v1/organization/accredit/update',
	EditOrganization: '/api/v1/organization/update',
	EditOrganizationUpdateCustomers:
		'/api/v1/organization/customers/sync/:usreou/:isResident',
	UpdateOrganizationEOD: '/api/v1/eod/update/organizations',
	ViewOrganization: '/api/v1/organization/:id',
	BusinessFormList: '/api/v1/reference/business/list',
	AccreditSearchOrganizationEdit:
		'/api/v1/accredit/wood/search/:usreou/:isResident/:organizationId',
	AccreditSearchOrganization:
		'/api/v1/accredit/wood/search/:usreou/:isResident',
	GetCustomersByIdOrganization: '/api/v1/organization/:id/customers',
	GetOrganizationAccounts: '/api/v1/organization/accounts',
	CreateOrganizationAccount: '/api/v1/organization/account/create',
	UpdateOrganizationAccount: '/api/v1/organization/account/update',
	ReplenishOrganizationAccount: '/api/v1/organization/transaction/create',
	GetOrganizationTransactions: '/api/v1/organization/transactions',
	DeleteOrganizationTransaction: '/api/v1/organization/transaction/:id',
	AcceptOrganizationTransaction: '/api/v1/organization/transaction/accept',
	CancelOrganizationTransaction: '/api/v1/organization/transaction/cancel',
	UpdateOrganizationTransaction: '/api/v1/organization/transaction/update'
}

export const CustomerEndpoints = {
	SelectOrganizationCustomer: '/api/v1/customer/organization/select',
	CreateCustomers: '/api/v1/customers/create',
	AddCustomerToOrganization: '/api/v1/organization/customer/add',
	RemoveCustomerFromOrganization: '/api/v1/organization/customer/remove',
	ListCustomers: 'api/v1/customers',
	UpdateCustomerProfile: '/api/v1/customer/profile/update',
	CustomerUpdate: '/api/v1/organization/customers/update',
	CustomerDelete: '/api/v1/customer/delete/:id'
}

export const listUsersEndpoints = (obj: any) => {
	return (
		`/api/v1/users?page=${obj.page}` +
		(obj.search ? `&search=${obj.search}` : '') +
		(obj.state ? `&state=${obj.state}` : '') +
		(obj.filter ? `&filters[0][status]=${obj.filter}` : '')
	)
}

export const confirmPassword = {
	ConfirmPassword: '/api/v1/user/confirm/check',
	ConfirmPasswordAndInit: '/api/v1/user/confirm'
}

export const DirectoryCountriesEndpoints = {
	GetCountries: '/api/v1/geo/countries',
	CreateCountry: '/api/v1/geo/country/create',
	UpdateCountry: '/api/v1/geo/country/update',
	DeleteCountry: '/api/v1/geo/country/:id',
	GetRegionsById: '/api/v1/geo/country/:id'
}

export const Security = {
	GetGroupList: '/api/v1/security/group/list',
	GetGroupModel: '/api/v1/security/group/view/:id',
	DeleteGroup: '/api/v1/security/group/:id',
	CreateGroup: '/api/v1/security/group/create',
	CreateGroupDuplicate: '/api/v1/security/group/duplicate/:id',
	UpdateGroup: '/api/v1/security/group/update',
	GetRoleList: '/api/v1/security/role/list',
	BlackIpList: '/api/v1/security/ipblacklist',
	CreateBlackIp: '/api/v1/security/ipblacklist/create',
	DeleteBlackIp: '/api/v1/security/ipblacklist/remove'
}

export const DirectoryTaxesEndpoints = {
	GetTaxes: '/api/v1/taxationstypes',
	CreateTaxes: '/api/v1/taxationtype/create',
	UpdateTaxes: '/api/v1/taxationtype/update',
	DeleteTaxes: '/api/v1/taxationtype/:id'
}

export const DirectoryOwnershipEndpoints = {
	GetOwnership: '/api/v1/ownerships',
	CreateOwnership: '/api/v1/ownership/create',
	UpdateOwnership: '/api/v1/ownership/update',
	DeleteOwnership: '/api/v1/ownership/:id'
}

export const DirectoryAreasEndpoints = {
	GetAreas: '/api/v1/geo/regions',
	CreateAreas: '/api/v1/geo/region/create',
	UpdateDirectoryAreasEod: '/api/v1/eod/update/regions',
	UpdateAreas: '/api/v1/geo/region/update',
	DeleteAreas: (id: string) => {
		return `/api/v1/geo/region/${id}`
	},
	GetCitiesById: '/api/v1/geo/region/:id'
}

export const DirectoryStationDelivery = {
	GetDirectoryStationDelivery: '/api/v1/station/',
	GetDirectoryStationDeliveryInfo: '/api/v1/station/:id',
	EditDirectoryStationDelivery: '/api/v1/station/edit',
	DeleteDirectoryStationDelivery: '/api/v1/station/delete/:id',
	GetDirectoryStationDeliverySubItems: '/api/v1/station/list/filia/:id',
	DeleteDirectoryStationDeliverySubItem: '/api/v1/station/delete/filia/cost',
	ImportStationDelivery: '/api/v1/station/import',
	ExportStationDelivery: '/api/v1/station/export'
}

export const DirectoryMinimalTransport = {
	DeviationDeliverySchedule: '/api/v1/delivery/schedule/reference',
	DirectoryMinimalTransport: '/api/v1/reference/transport-part',
	ImportMinimalTransport: '/api/v1/reference/transport-part/import'
}

export const InvitationCustomerEndpoints = {
	AcceptInvitation: '/api/v1/trading/organization/invite/:code/accept'
}

export const DirectoryLotFilterCategories = {
	LotFilterCategories: '/api/v1/trading/lot/filters/category/:id'
}

export const DirectoryCitiesEndpoints = {
	GetCities: '/api/v1/geo/cities',
	CreateCity: '/api/v1/geo/city/create',
	UpdateCity: '/api/v1/geo/city/update',
	DeleteCity: '/api/v1/geo/city/:id'
}

export const DirectoryMeasuresEndpoints = {
	GetMeasures: '/api/v1/reference/measure/list',
	CreateMeasure: '/api/v1/reference/measure/create',
	UpdateMeasure: '/api/v1/reference/measure/update',
	DeleteMeasure: '/api/v1/reference/measure/:id'
}

export const DirectoryTradingFileStatusesEndpoints = {
	GetTradingFileStatusesList: '/api/v1/reference/trading/file/statuses'
}

export const DirectoryTradingTypeEndpoints = {
	GetTradingType: '/api/v1/reference/trading/type/list',
	CreateTradingType: '/api/v1/reference/trading/type/create',
	UpdateTradingType: '/api/v1/reference/trading/type/update',
	DeleteTradingType: '/api/v1/reference/trading/type/:id'
}

export const DirectoryServerInfoEndpoints = {
	GetCurrentDateTime: '/api/v1/reference/server/info'
}

export const DirectoryCategoriesEndpoints = {
	GetCategories: '/api/v1/categories',
	CreateCategory: '/api/v1/category/create',
	UpdateCategory: '/api/v1/category/update'
}

export const DirectoryCurrenciesEndpoints = {
	GetCurrencies: '/api/v1/currencies',
	CreateCurrency: '/api/v1/currency/create',
	UpdateCurrency: '/api/v1/currency/update'
}

export const NotificationsEndpoints = {
	GetNotificationsList: '/api/v1/notifications',
	CreateNotifications: '/api/v1/notifications/create',
	ReadNotifications: '/api/v1/notifications/read',
	DeleteNotifications: '/api/v1/notifications/delete',
	LoginAlerts: '/api/v1/alert/customer/list'
}

export const CategoriesEndpoints = {
	ListCategories: '/api/v1/categories'
}

export const TradingEndpoints = {
	ListTrading: '/api/v1/tradings',
	HistoryAdminDAList: '/api/v1/trading/:id/dutch/history',
	TradingDutchAgentAdminLots: '/api/v1/trading/:id/dutch/lots',
	UpdateTrading: '/api/v1/trading/update/passport',
	DeleteTrading: '/api/v1/trading/delete/:id',
	ListModelTrading: '/api/v1/trading/model/list',
	ListModelTypes: '/api/v1/trading/type/list',
	OwnerCreateList: '/api/v1/trading/created_org/list',
	ListSpecificationsTrading: '/api/v1/trading/specifications/list',
	ListTradingStations: '/api/v1/station/',
	ListTradingOffice: 'api/v1/reference/regional-office/list',
	ListAffiliations: '/api/v1/reference/regional-office/:id/affiliates',
	CreatePassportTrading: '/api/v1/trading/create/passport',
	ListTypeTrading: '/api/v1/reference/trading/type/list',
	ImportLotTrading: '/api/v1/trading/lot/forest/import',
	ExportLotTrading: '/api/v1/trading/lot/forest/export',
	UpdateLotTrading: '/api/v1/trading/lot/update',
	UpdateLotLumberTrading: '/api/v1/trading/lot/lumber/update',
	AgentAgreeDa:
		'/api/v1/trading/dutch/preparing/:tradingId/agent/permission/update',
	ListLotTrading: '/api/v1/trading/:id/lots',
	TradingWarningFile: '/api/v1/reference/transport-part/export?id_trading=:id',
	DeleteAllLotTrading: '/api/v1/trading/:id/lots/delete',
	ListRequestTrading: '/api/v1/trading/:id/requests',
	ListRequestTradingDelete: '/api/v1/trading/request/delete',
	ListRequestTradingDecline: '/api/v1/trading/requests/decline',
	UpdateRequestTrading: '/api/v1/trading/request/update',
	UpdateRequestsListTrading: '/api/v1/trading/requests/update',
	AcceptAllTradingRequest: '/api/v1/trading/requests/admit/all/:id',
	ExportRequestsTrading: '/api/v1/trading/:id/requests/export',
	ChoosingSolutionTable: '/api/v1/trading/:id/results',
	ExportAdmissionAgent: '/api/v1/trading/admittance/generate',
	ExportMoneyDistribution: '/api/v1/distribution-funds/archive',
	ExportAgentTradingRequests: '/api/v1/processing-fee/admittance/generate',
	InviteOrganizationTrading: '/api/v1/trading/organization/invite',
	InvitesListTrading: '/api/v1/trading/:id/invites',
	GetViewTrading: '/api/v1/trading/view/:id',
	TradingLotsBets: '/api/v1/trading/:id/lots/bet',
	TradingLotsBetsShowAllForDA: '/api/v1/trading/:id/lots/bet',
	TradingLotsBetsCertificates: '/api/v1/trading/:id/certificates/lots',
	TradingLotsBetsContract: '/api/v1/trading/:id/lots/contract',
	BlockUnblockLotTrading: '/api/v1/trading/lot/:id/toggle',
	ExportRequestInvoiceTrading: 'api/v1/trading/request/invoice/create',
	//contract page
	DeliverySheduleNotificationCount: '/api/v1/notifications/:id/part/count',
	DeliverySheduleList: '/api/v1/part/:id/list',
	DeliveryHistoryList: '/api/v1/delivery/schedule/:id/history/list',
	DeliverySheduleCreate: '/api/v1/part/create',
	DeliverySheduleDelete: '/api/v1/part/delete/:id',
	DeliverySheduleUpdate: '/api/v1/part/update',
	DeliverySheduleAgreedSignWithoutSerial:
		'/api/v1/agreed/part/:id/sign/with/out/serial',
	DeliverySheduleAgreedDownload: '/api/v1/agreed/part/:id/download',
	DeliverySheduleAgreedOriginalDownload:
		'/api/v1/agreed/part/:id/original/download',
	DeliverySheduleAgreedDownloadList: '/api/v1/agreed/part/admin/:id/file/list',
	DeliverySheduleAgreedToFile: '/api/v1/agreed/part/admin/file/download',
	ShipmentNotificationList: '/api/v1/shipment/notification/:id/list',
	ShipmentNotificationCreate: '/api/v1/shipment/notification/create',
	ShipmentNotificationUpdate: '/api/v1/shipment/notification/update',
	ShipmentNotificationDelete: '/api/v1/shipment/notification/:id/delete',
	ShipmentNotificationData: '/api/v1/shipment/notification/:id/data',
	InvoiceForPaymentList: '/api/v1/part/invoice/:id/list',
	PartExecution: '/api/v1/part/realization/execution/:id',
	InvoiceForPaymentCreate: '/api/v1/part/invoice/create',
	InvoiceForPaymentPay: '/api/v1/part/invoice/pay',
	InvoiceForPaymentDownload: '/api/v1/part/invoice/:id/download',
	ExecutionList: '/api/v1/part/realization/:id/list',
	ExecutionDownload: '/api/v1/part/realization/file/:id/downlaod/archive',
	ExecutionUploadToFile: '/api/v1/part/realization/file/upload',
	//trading activity page
	TradingActivityFilter: '/api/v1/analytics/filter/list',
	AnalyticsList: '/api/v1/analytics/activity/list',
	AnalyticsReportDownload: '/api/v1/analytics/activity/export',
	AnalyticsBuyerReportDownload: '/api/v1/analytics/buyer/activity/export',
	AnalyticsBuyerList: '/api/v1/analytics/buyer/activity/view',
	SpeciesList: '/api/v1/analytics/species/list',
	SpeciesBuyerList: '/api/v1/analytics/species/view',
	SpeciesReportDownload: '/api/v1/analytics/species/export',
	SpeciesBuyerReportDownload: '/api/v1/analytics/species/buyer/export',
	PricesList: '/api/v1/analytics/cost/list',
	PricesReportDownload: '/api/v1/analytics/cost/export',
	//issues
	IssuesList: '/api/v1/issues/',
	IssuesFilters:
		'/api/v1/issues/items?agent=1&status=1&allStatuses=1&filter=1&violationReason=1&agentsForFilter=1',
	IssuesListCreateDeal: '/api/v1/issues/data/create/list',
	IssuesListCreate: '/api/v1/issues/create',
	IssuesOneDeal: '/api/v1/issues/show/:id',
	IssuesItemsStatus: '/api/v1/issues/items?status=1',
	IssuesUpdate: 'api/v1/issues/update/',
	IssuesSetAgent: 'api/v1/issues/set/agent/{issueId}/{agentId}',
	ExportIssuesToFile: '/api/v1/issues/download/file/:id',
	UploadIssuesToFile: '/api/v1/issues/upload/file/:id',
	ExportFilesIssue: '/api/v1/issues/list/file/:id',
	DeleteFilesIssue: '/api/v1/issues/remove/file/:id',
	DownloadIssuesAnalytics: '/api/v1/issues/report',
	//accounting
	AccountingList: '/api/v1/processing-fee',
	AccountingListShowDetail: '/api/v1/processing-fee/detail',
	AccountingListItemUpdate: '/api/v1/processing-fee/detail/update',
	//execution
	CabinetExecutionList: '/api/v1/part/realization/admin/list',
	UpdateAnswerTerm: '/api/v1/shipment/notification/admin/answer/term',
	//shipmentPayment
	CabinetShipmentPaymentList: '/api/v1/part/invoice/admin/list',
	//registerTransactions
	CabinetRegisterTransactionsList: '/api/v1/stock/exchange/agreement/list',
	CabinetRegisterTransactionsStatuses:
		'/api/v1/stock/exchange/agreement/statuses/list',
	CabinetRegisterTransactionsListDetails:
		'/api/v1/stock/exchange/agreement/:id/details',
	CabinetRegisterTransactionsListDetailsDelete: '/api/v1/part/:id',
	CabinetRegisterTransactionsListDetailsUpdate:
		'/api/v1/stock/exchange/agreement/update',
	RegisterTransactionsGenerateFile:
		'/api/v1/stock/exchange/agreement/list/save',
	RegisterTransactionsDownloadFile:
		'/api/v1/stock/exchange/agreement/:id/download',
	//notificationsAccredit
	CabinetNotificationsAccreditList: '/api/v1/alert/processing/list',
	CabinetNotificationsAccreditListCustomer:
		'/api/v1/alert/processing/list/customer',
	CabinetNotificationsAccreditThemes: '/api/v1/alert/reference/themes',
	CabinetNotificationsAccreditTypes: '/api/v1/alert/reference/types',
	CabinetNotificationsAccreditListDetailsUpdate:
		'/api/v1/alert/processing/update',
	//contract
	TradingsContractList: '/api/v1/trading/contracts',
	FetchDeliveryScheduleControl: '/api/v1/delivery/schedule/control/data',
	GenerateDeliveryScheduleControl:
		'/api/v1/delivery/schedule/generate/control/data',
	DownloadDeliveryScheduleControl:
		'/api/v1/delivery/schedule/download/control/data',
	TradingsContractComments: '/api/v1/trading/contract/comments/:id',
	TradingsContractCommentsCreate: '/api/v1/trading/contract/comment/create',
	TradingsContractCommentsDelete: '/api/v1/trading/contract/comment/delete/:id',
	TradingsContractCommentsUpdate: '/api/v1/trading/contract/comment/update',
	TradingsContractEmailNotificationsSend:
		'/api/v1/trading/contracts/emails/send',
	TradingsContractNotificationsList: '/api/v1/trading/contracts/:id/emails',
	TradingsContract: '/api/v1/trading/contracts/:id',
	OfficeList: '/api/v1/filter/office',
	TradingAuctionCertificatesList: '/api/v1/trading/certificates',
	TradingAuctionCertificateFile:
		'/api/v1/trading/certificates/:idCertificate/files/:idFile',
	TradingAuctionCertificateEmailNotificationsSend:
		'/api/v1/trading/certificates/emails/send',
	TradingAuctionCertificatNotificationsList:
		'/api/v1/trading/certificates/:id/emails',
	UpdateTradingAuctionCertificate: '/api/v1/trading/certificates/update',
	TradingAuctionContractFile:
		'/api/v1/trading/contracts/:idContract/files/:idFile',
	UpdateTradingAuctionContract: '/api/v1/trading/contracts/update',
	PrepareLotEod: '/api/v1/eod/trading/:id/lot/send',
	SendLotEod: '/api/v1/eod/trading/send/:id',
	ClosedPrepareLots: '/api/v1/eod/trading/:id/lot/done',
	EodRegions: '/api/v1/eod/regions',
	GetRegionsTrading: '/api/v1/eod/seller/get',
	GetRegionsInitiator: '/api/v1/region/organization/list/:id',
	SellerRegionTrading: '/api/v1/eod/region/:id/organization',
	EodPrepareLotDownload: '/api/v1/eod/trading/create/:id',
	LotUpdateEOD: '/api/v1/eod/lot/update',
	OrganizationListTrading: '/api/v1/organization/:id',
	GetUnsoldLots: '/api/v1/trading/lots/unsold',
	GetUnsoldLotsFilters: '/api/v1/trading/lot/filters',
	ExportTradingWinnersToFile: '/api/v1/trading/:id/generate/winners',
	ExportTradingLosersToFile: '/api/v1/trading/:id/generate/losers',
	ExportTradingUnsoldLots: '/api/v1/trading/lots/unsold/download',
	ExportTradingSummaryToFile: '/api/v1/trading/:id/generate/summary',
	ExportTrading1CToFile: '/api/v1/trading/:id/generate/ones',
	ExportTradingArchiveToFile: '/api/v1/trading/:id/archive/list',
	ExportTradingArchiveToFileDeliverySchedule:
		'/api/v1/trading/agreed/part/trading/:id/list',
	DownloadTradingArchiveToFile: '/api/v1/trading/:id/archive/download',
	downloadTradingArchiveToFileDeliverySchedule:
		'/api/v1/trading/agreed/part/trading/:id/download/all',
	GenerateTradingArhive: '/api/v1/trading/:id/archive/update',
	ExportTradingLotsBetHistoryToFile:
		'/api/v1/trading/:id/lots/bet/history/export',
	ExportTradingDutchLotsBetHistoryToFile:
		'/api/v1/trading/:id/dutch/history/export',
	DeleteSingleLot: '/api/v1/trading/:id/lot/:idLot/:idSubLot',
	ContractFileReport: '/api/v1/trading/contracts/sign/export',
	CabinetRegisterRequestList: '/api/v1/trading/request/owner/list',
	CabinetRegisterRequestAdminDetail: '/api/v1/trading/request/owner/detail',
	ImportDocTrading: '/api/v1/trading/request/owner/additional/file/add',
	GetDocTradingList: '/api/v1/trading/request/owner/{id}/additional/file',
	GetDocOwnerTradingRequestList:
		'/api/v1/trading/lot/request/owner/{lotId}/additional/file',
	DeleteDocTradingList: '/api/v1/trading/request/owner/additional/file/delete',
	DownloadDocTradingFile: '/api/v1/trading/request/owner/additional/file',
	ExportArchiveRegisterReques: '/api/v1/trading/request/file/archive',
	ExportArchiveRegisterRequesOwner: '/api/v1/trading/request/file',
	CabinetRegisterRequestGetStatus: '/api/v1/trading/request/history',
	TradingRequestOwnerBlackListTogle: '/api/v1/trading/request/owner/togle',
	TradingAvailabilityList: '/api/v1/trading/:id/availability/list'
}

export const TradingCustomerEndpoints = {
	CreateRequestLotCustomerTrading: '/api/v1/trading/request/create',
	DeleteAllReqeustsCustomerTrading: '/api/v1/trading/request/delete',
	ListTradingCustomer: '/api/v1/tradings/customer',
	ListRequestTradingCustomer: '/api/v1/trading/:id/buyer/requests',
	GetViewCustomerTrading: '/api/v1/trading/view/:id/customer',
	GetViewCustomerParticipationTrading: '/api/v1/trading/:id/availability',
	GetStartTradeLot: '/api/v1/trading/dutch/lot/:id/start',
	GetEndTradeLot: '/api/v1/trading/dutch/lot/:id/end',
	GetSellerRefreshTimer: '/api/v1/trading/dutch/lot/:id/expired-timer',
	TradingLotsBetsCustomer: '/api/v1/trading/:id/lots/bet/customer',
	GetViewTradingCustomer: '/api/v1/trading/view/:id/customer',
	TradingLotBetCreate: '/api/v1/trading/lot/bet/create',
	TradingCurrentSelectData: '/api/v1/trading/dutch/request/create',
	TradingCurrentSelectDataDecline: '/api/v1/trading/dutch/request/remove',
	TradingResultsToFileCustomer: '/api/v1/trading/:id/generate/results/customer',
	TradingResultsToFileCustomerNew:
		'/api/v1/trading/:id/certificate/files/status',
	TradingResultsUploadSignedOffer: '/api/v1/signature/trading_request/upload',
	TradingResultsUploadSignedDeleteOffer:
		'/api/v1/signature/trading_request/delete/upload',
	// ExportRequestsTradingCustomer: '/api/v1/trading/:id/requests/export/customer',
	ExportRequestsTradingCustomer: '/api/v1/trading/generate/requests/customer',
	ExportRequestsDeleteTradingCustomer:
		'/api/v1/trading/:id/generate/requests/delete/customer',
	GenerateRequestsCustomerDelete:
		'/api/v1/trading/generate/requests/customer/delete',
	ExportRequestsTradingCustomerArchive:
		'/api/v1/trading/:id/generate/requests/customer/archive',
	ExportDocContractTradingCustomer:
		'/api/v1/trading/generate/contract/:id/customer',
	ExportDocContractTradingCustomerNew:
		'/api/v1/trading/:id/contract/files/status',
	ExportDocDeliveryTradingCustomer:
		'/api/v1/trading/:id/agreed_part/files/status',
	ExportInvoiceComissionTradingCustomer:
		'/api/v1/trading/:id/generate/invoice/commission', // lumber only
	ExportInvoiceWarrantyToFileCustomer:
		'/api/v1/trading/:id/invoice-request/files',
	GetValueIsLotWin: '/api/v1/trading/:id/winner',
	ListLotTradingCustomer: '/api/v1/trading/:id/lots',
	ListMyTradingsCustomer: '/api/v1/tradings/customer/my',
	MarginalCostCustomer: '/api/v1/trading/dutch/lot/marginal/cost',
	SaveMarginalCostCustomer: '/api/v1/trading/dutch/lot/marginal/save',
	PreparingSaveMarginalCostCustomer: '/api/v1/trading/dutch/preparing/lot/save',
	PreparingDeleteMarginalCostCustomer:
		'/api/v1/trading/dutch/preparing/lot/:lotId/delete',
	TradingDeleteMarginalCostCustomer:
		'/api/v1/trading/dutch/lot/marginal/:lotId/delete',

	TradingInitRequestOwnerCreate: '/api/v1/trading/init/request/owner/create',
	TradingInitRequestOwnerSigned: '/api/v1/trading/init/request/owner/signed',
	TradingInitRequestOwnerCanceled:
		'/api/v1/trading/init/request/owner/canceled',
	TradingGenerateInitRequestOwnerCustomer:
		'/api/v1/trading/generate/init/requests/owner/customer',
	TradingGenerateInitRequestOwnerIDCustomerDelete:
		'/api/v1/trading/generate/init/requests/owner/{id}/customer/delete',

	TradingRequestsOwnerManagementCreate: '/api/v1/trading/request/owner/create',
	TradingRequestsOwnerGenerate:
		'/api/v1/trading/generate/requests/owner/customer',
	TradingGetRequestsOwnerManagement: '/api/v1/trading/request/owner/current',
	TradingSignedOffer: '/api/v1/trading/request/owner/signed',
	TradingCanceledSignedOffer: '/api/v1/trading/request/owner/canceled',
	TradingDeleteSignedOffer:
		'/api/v1/trading/generate/requests/owner/{id}/customer/delete',
	TradingUpdateOfferGenerate: '/api/v1/trading/request/owner/update/generate',
	TradingUpdateOfferSave: '/api/v1/trading/request/owner/update/save',

	InvoiceForPaymentGenerate: '/api/v1/part/invoice/file/generate',
	InvoiceForPaymentCreate: '/api/v1/part/invoice/create'
}

export const TradingDutchCustomerEndpoints = {
	GetSelectDataDutch: '/api/v1/trading/dutch/lot/:id/offers',
	TradingDutchLotsBetsCustomer: '/api/v1/trading/:id/dutch/lots/customer',
	TradingDutchSellerLotsBetsCustomer: '/api/v1/trading/:id/dutch/lots/seller',
	TradingDutchChangePriceButton: '/api/v1/trading/dutch/lot/:id/reduce',
	TradingDutchChangePriceCheckbox: '/api/v1/trading/dutch/lot/:id/auto-reduce',
	TradingDutchRequestList: '/api/v1/trading/:id/dutch/requests/customer',
	TradingDutchSellerAccept: '/api/v1/trading/dutch/request/approved',
	TradingDutchSellerDecline: '/api/v1/trading/dutch/request/decline',
	TradingDutchUpdateFee: '/api/v1/trading/:id/dutch/fee/update'
}

export const TradingAgentEndpoints = {
	ExportTradingArchiveToFile: '/api/v1/trading/:id/agent/generate/archive',
	ExportTradingCommissionToFile: '/api/v1/trading/agent/commission/generate',
	ExportTradingFeeToFile: '/api/v1/trading/agent/fee/generate'
}

export const TradingAnonymousEndpoints = {
	TradingListAnonymous: '/api/anonymous/v1/tradings',
	TradingViewAnonymous: '/api/anonymous/v1/trading/view/:id',
	TradingListLotsAnonymous: '/api/anonymous/v1/trading/:id/lots',
	TradingListLotsBetsAnonymous: '/api/anonymous/v1/trading/:id/lots/bet',
	TradingDAListLotsBetsAnonymous: '/api/anonymous/v1/trading/:id/dutch/lots'
}

// UNIFIED ACCOUNT
export const SingleAccount = {
	AccountListBalance: '/api/v1/single/account/birzha',
	AccountListTransactions: '/api/v1/organization/transactions',
	AccountListBirzhaTransactions: '/api/v1/birzha/transactions',
	AccountListTransactionsOther: '/api/v1/birzha/transactions/other',
	AccountListBalanceOrg: '/api/v1/single/accounts',
	AccountListBalanceOrganization: '/api/v1/single/account/:id',
	AccountListOrganizationTransactions: 'api/v1/organization/:id/transactions',
	AccountListBlockedBidding: '/api/v1/trading/transactions/:id',
	AccountListBlockedContracts: '/api/v1/contract/transactions/:id',
	AccountListTransactionType: '/api/v1/transaction/type/settings',
	AccountTransactionTypeAutoUpdate: '/api/v1/transaction/settings/auto',
	AccountTradingNumbers: '/api/v1/organization/tradings/numbers/:id',
	SATransactionTypeChoicesUpdate: '/api/v1/transaction/type/choices/update',
	SATransactionTypeChoicesList: '/api/v1/transaction/type/:id/choices',
	SATransactionCreate: '/api/v1/organization/transaction/create',
	SATransactionCancel: '/api/v1/organization/transaction/cancel',
	SATransactionAccept: '/api/v1/organization/transaction/accept',
	SATransactionExecute: '/api/v1/organization/transaction/execute',
	SATransactionUpdate: '/api/v1/single/account/transaction/update',
	SAOtherTransactionUpdate: '/api/v1/other/transaction/update',
	SAAccountCommissionList: '/api/v1/movement/account/:id/commission',
	SAAccountIncomeList: '/api/v1/movement/account/:id/income',
	SAAccountIncomeListVM: '/api/v1/movement/account/:id/income-vm',
	SAAccountPayList: '/api/v1/movement/account/:id/pay',
	SAAccountRestrictList: '/api/v1/movement/account/:id/restrict',
	SAAccountRefundList: '/api/v1/movement/account/:id/outcome',
	SAReplenish: '/api/v1/replenish/invoice/generate',
	SAWarrantyDownload: '/api/v1/warranty/file/:id',
	PostSingleAccountsWarranty: '/api/v1/warranty/create',
	PostSingleAccountsWarrantyUpdate: '/api/v1/warranty/update',
	SAOrganizationTransactionsManagement:
		'/api/v1/organization/transactions/filters',
	GetSingleAccountsDebt: '/api/v1/organization/:id/transactions/debt',
	AccountDebt: '/api/v1/organization/transactions/debt',
	SAAOrganizationTransactionInfo:
		'/api/v1/organization/transaction/obligation/create/info',
	Logs: '/api/v1/single/account/log',
	GenerateRefundDoc: '/api/v1/outcome/file/generate',
	UploadSignedRefundDoc: '/api/v1/signature/application/refund/upload',
	DownloadTemplatesByID: '/api/v1/trading/:id/lots/template'
}

export const LogsEndpoints = {
	LogsList: '/api/v1/logs'
}

export const downloadFileTemplateRaw = {
	url: '/templates/%D0%A8%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D1%84%D0%B0%D0%B8%CC%86%D0%BB%D0%B0_%D0%B4%D0%BB%D1%8F_%D0%BB%D0%BE%D1%82%D1%96%D0%B2_%D0%BE%D0%B3%D0%BE%D0%BB%D0%BE%D1%88%D0%B5%D0%BD%D0%BD%D1%8F.xlsx'
}

export const downloadFileTemplateLumber = {
	url: '/templates/%D0%9F%D0%B8%D0%BB%D0%BC%D0%B0%D1%82%20-%20%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%20%D1%84%D0%B0%D0%B9%D0%BB%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D0%BE%D0%B1%D1%8A%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9.xlsx'
}
export const downloadFileTemplateLotsGrain =
	'templates/%D0%A8%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D1%84%D0%B0%D0%B9%D0%BB%D0%B0_%D0%B7%D0%B5%D1%80%D0%BD%D0%BE%D0%B1%D0%BE%D0%B1%D0%BE%D0%B2%D1%96_%D0%B0%D1%83%D0%BA%D1%86%D1%96%D0%BE%D0%BD.xlsx'

export const downloadFileTemplateLotsGrainReduction =
	'templates/%d0%a8%d0%b0%d0%b1%d0%bb%d0%be%d0%bd_%d1%84%d0%b0%d0%b9%d0%bb%d0%b0_%d0%b7%d0%b5%d1%80%d0%bd%d0%be%d0%b1%d0%be%d0%b1%d0%be%d0%b2%d1%96_%d1%80%d0%b5%d0%b4%d1%83%d0%ba%d1%86%d1%96%d0%be%d0%bd.xlsx'

export const downloadFileTemplateLotOil =
	'templates/%D0%A8%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D1%84%D0%B0%D0%B9%D0%BB%D0%B0_%D0%BE%D0%BB%D1%96%D0%B9%D0%BD%D1%96_%D0%B0%D1%83%D0%BA%D1%86%D1%96%D0%BE%D0%BD.xlsx'
export const downloadFileTemplateLotOilReduction =
	'templates/%d0%a8%d0%b0%d0%b1%d0%bb%d0%be%d0%bd_%d1%84%d0%b0%d0%b9%d0%bb%d0%b0_%d0%be%d0%bb%d1%96%d0%b9%d0%bd%d1%96_%d1%80%d0%b5%d0%b4%d1%83%d0%ba%d1%86%d1%96%d0%be%d0%bd.xlsx'

export const ApplicationSettingsEndpoints = {
	ApplicationSettings: '/api/v1/settings'
}

export const getApiUrlForId = (
	apiUrl: string,
	id: string,
	searchValue: RegExp = /:id/
): string => {
	return apiUrl.replace(searchValue, id)
}

export const getApiUrlForIdModern = (
	apiUrl: string,
	id: string,
	search: string = '',
	page: number = 1,
	searchValue: RegExp = /:id/
): string => {
	// Заміняємо :id на переданий id
	let url = apiUrl.replace(searchValue, id)

	// Створюємо квері параметри
	const queryParams = new URLSearchParams()
	if (search) {
		queryParams.set('search', search)
	}
	queryParams.set('page', page.toString())

	// Додаємо квері параметри до URL
	const queryString = queryParams.toString()
	if (queryString) {
		url += `?${queryString}`
	}

	return url
}

export const getApiUrlForIds = (
	apiUrl: string,
	searchValues: string[],
	values: any[]
): string => {
	let result = apiUrl
	searchValues.forEach((search, id) => {
		result = result.replace(search, values[id])
	})
	return result
}
