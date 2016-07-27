// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

// Global constants.
import {
  GLOBAL_MODAL_SESSION_TIMEOUT
} from '../redux/constants/ui-constants';
// Global components.
import ModalSessionTimeout from '../modules/global/modals/sessionTimeout';


// Shell constants.
import {
  SH_MODAL_LOGOUT,
  SH_MODAL_AUTO_ALERT
} from '../modules/shell/redux/constants/ui-constants';
// Shell components.
import ModalLogout from '../modules/shell/components/Modal/Logout';
import AutoAlert from '../modules/shell/components/Modal/AutoAlert';

// Doc Mgt constants.
import {
  DM_MODAL_SHARE,
  DM_MODAL_CHECKIN,
  DM_MODAL_CHECKOUT,
  DM_MODAL_CANCEL_CHECKOUT,
  DM_MODAL_DOWNLOAD,
  DM_MODAL_UPLOAD_NEW_VERSION,
  DM_MODAL_UPLOAD_NEW_VERSION_PERIODIC_REVIEW,
  DM_MODAL_FEEDBACK,
  DM_MODAL_ARCHIVE,
  DM_MODAL_DELETE,
} from '../modules/document-management/redux/constants/ui-constants';
// Doc Mgt components.
import ModalShare from '../modules/document-management/components/Modal/Share';
import ModalCheckIn from '../modules/document-management/components/Modal/CheckIn';
import ModalCheckOut from '../modules/document-management/components/Modal/CheckOut';
import ModalCancelCheckOut from '../modules/document-management/components/Modal/CancelCheckOut';
import ModalDownload from '../modules/document-management/components/Modal/Download';
import ModalUploadNewVersion from '../modules/document-management/components/Modal/UploadNewVersion';
import ModalFeedback from '../modules/document-management/components/Modal/Feedback';
import ModalArchive from '../modules/document-management/components/Modal/Archive';
import ModalDelete from '../modules/document-management/components/Modal/Delete';


// Define class.
class ModalArea extends React.Component {

  // Render method.
  render() {
    const { globalUi } = this.props;

    // Modal view.
    let modalView;
    switch (globalUi.modalView) {

    // Global.
    case GLOBAL_MODAL_SESSION_TIMEOUT:
      modalView = <ModalSessionTimeout />;
      break;

    // Shell.
    case SH_MODAL_LOGOUT:
      modalView = <ModalLogout />;
      break;

    // Doc Mgt.
    case DM_MODAL_SHARE:
      modalView = <ModalShare />;
      break;
    case DM_MODAL_CHECKIN:
      modalView = <ModalCheckIn />;
      break;
    case DM_MODAL_CHECKOUT:
      modalView = <ModalCheckOut />;
      break;
    case DM_MODAL_CANCEL_CHECKOUT:
      modalView = <ModalCancelCheckOut />;
      break;
    case DM_MODAL_DOWNLOAD:
      modalView = <ModalDownload />;
      break;
    case DM_MODAL_UPLOAD_NEW_VERSION:
      modalView = <ModalUploadNewVersion />;
      break;
    case DM_MODAL_UPLOAD_NEW_VERSION_PERIODIC_REVIEW:
      modalView = <ModalUploadNewVersion view="PERIODIC_REVIEW" />;
      break;
    case DM_MODAL_FEEDBACK:
      modalView = <ModalFeedback />;
      break;
    case DM_MODAL_ARCHIVE:
      modalView = <ModalArchive />;
      break;
    case DM_MODAL_DELETE:
      modalView = <ModalDelete />;
      break;
    case SH_MODAL_AUTO_ALERT:
      modalView = <AutoAlert />;
      break;
    default:
      modalView = <ModalShare />;
    }

    return (
      <div>
        {modalView}
      </div>
    );
  }
}

// propTypes.
ModalArea.propTypes = {
  globalUi: React.PropTypes.object
};
const mapStateToProps = (state) => ({
  globalUi: state.globalUi
});

// Export.
export default connect(mapStateToProps)(ModalArea);
