// Global (global_).
import globalSettings from './settings';
import globalTenant from './tenant';
import globalAuth from './auth';
import globalLang from './lang';
import globalAspSettings from './aspSettings';
import globalAspUserLoginInfo from './aspUserLoginInfo';
import globalAspLegacySession from './aspLegacySession';
import globalUi from './ui';

// Shell (sh_).
import shSettings from '../../modules/shell/redux/reducers/settings';
import shUi from '../../modules/shell/redux/reducers/ui';
import shModuleMenu from '../../modules/shell/redux/reducers/moduleMenu';
import shFlatModuleMenu from '../../modules/shell/redux/reducers/flatModuleMenu';
import shRecentLocationsList from '../../modules/shell/redux/reducers/recentLocationsList';
import shLocationsList from '../../modules/shell/redux/reducers/locationsList';
import shLocationsTree from '../../modules/shell/redux/reducers/locationsTree';
import shLocationsTreeTopLevels from '../../modules/shell/redux/reducers/locationsTreeTopLevels';
import shCustomSettings from '../../modules/shell/redux/reducers/customSettings';
import shBreadcrumbs from '../../modules/shell/redux/reducers/breadcrumbs';
import shUserInfo from '../../modules/shell/redux/reducers/userInfo';
import shModuleLabels from '../../modules/shell/redux/reducers/moduleLabels';
import shLegacyView from '../../modules/shell/redux/reducers/legacyView';
import shModuleMenuSetup from '../../modules/shell/redux/reducers/moduleMenuSetup';

// Document Management (dm_).
import dmSettings from '../../modules/document-management/redux/reducers/settings';
import dmUi from '../../modules/document-management/redux/reducers/ui';
import dmFolder from '../../modules/document-management/redux/reducers/folder';
import dmDocument from '../../modules/document-management/redux/reducers/document';
import dmDocumentPost from '../../modules/document-management/redux/reducers/document-post';
import dmDocumentDelete from '../../modules/document-management/redux/reducers/document-delete';
import dmLookups from '../../modules/document-management/redux/reducers/lookups';
import dmPermissions from '../../modules/document-management/redux/reducers/permissions';
import dmUpload from '../../modules/document-management/redux/reducers/upload';
import dmTasks from '../../modules/document-management/redux/reducers/tasks';
import dmModuleLabels from '../../modules/document-management/redux/reducers/moduleLabels';
import dmFormValidation from '../../modules/document-management/redux/reducers/formValidation';
import dmFilter from '../../modules/document-management/redux/reducers/filter';
import dmSearch from '../../modules/document-management/redux/reducers/search';
import dmChangeRequests from '../../modules/document-management/redux/reducers/changeRequest';
import dmChangeRequestsPost from '../../modules/document-management/redux/reducers/changeRequest-post';
import dmApprovalWorkflowPost from '../../modules/document-management/redux/reducers/approvalWorkflow-post';
import dmAcknowledgementPostReducer from '../../modules/document-management/redux/reducers/acknowledgement-post';
import dmVersionHistory from '../../modules/document-management/redux/reducers/versionHistory';
import dmAuditTrail from '../../modules/document-management/redux/reducers/auditTrail';
import dmPeriodicReviewPost from '../../modules/document-management/redux/reducers/periodicReview-post';
import dmPeriodicReviews from '../../modules/document-management/redux/reducers/periodicReviews';
import dmReleaseDocumentPost from '../../modules/document-management/redux/reducers/releaseDocument-post';
import dmViewHistory from '../../modules/document-management/redux/reducers/viewHistory';
import dmPreviewDocument from '../../modules/document-management/redux/reducers/previewDocument';


module.exports = {
  // Global.
  globalSettings,
  globalTenant,
  globalAuth,
  globalAspSettings,
  globalAspUserLoginInfo,
  globalAspLegacySession,
  globalLang,
  globalUi,

  // Shell.
  shSettings,
  shUi,
  shModuleMenu,
  shFlatModuleMenu,
  shRecentLocationsList,
  shLocationsList,
  shLocationsTree,
  shLocationsTreeTopLevels,
  shCustomSettings,
  shBreadcrumbs,
  shUserInfo,
  shModuleLabels,
  shLegacyView,
  shModuleMenuSetup,

  // Document Management.
  dmSettings,
  dmUi,
  dmFolder,
  dmDocument,
  dmDocumentPost,
  dmDocumentDelete,
  dmLookups,
  dmPermissions,
  dmUpload,
  dmTasks,
  dmModuleLabels,
  dmFormValidation,
  dmFilter,
  dmSearch,
  dmChangeRequests,
  dmChangeRequestsPost,
  dmApprovalWorkflowPost,
  dmAcknowledgementPostReducer,
  dmVersionHistory,
  dmPeriodicReviews,
  dmPeriodicReviewPost,
  dmReleaseDocumentPost,
  dmViewHistory,
  dmAuditTrail,
  dmPreviewDocument,
};
