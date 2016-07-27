// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

// Global constants.
import {
  GLOBAL_MODAL_SESSION_TIMEOUT
} from '../../../redux/constants/ui-constants';

// Global actions.
import { toggleModal, setModalView } from '../../../redux/actions/ui-actions';
import { setSessionIsActive } from '../../../redux/actions/settings-actions';


// Define class.
class Session extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //  startTimer: true,
    // };

    this.sessionTimeoutHandler = {};
  }

  componentWillReceiveProps() {
    const { sessionTimeout, sessionResetTime, sessionIsActive } = this.props.globalSettings;

    /**
    * This is the total session time in minutes.
    *
    * @property: sessionTimeout
    * @param: {Number}
    */

    /**
    * This is the session warning time in minutes.
    *
    * (This is used to know how long before the total session time to warn the user)
    *
    * @property: sessionResetTime
    * @param: {Number}
    */

    /**
    * NOTE: The whole session timer depends on the value for `sessionIsActive`
    * being `true` when the timer starts.
    *
    * @property: sessionIsActive
    * @param: {Boolean}
    * @default: true
    */

    /**
    * Make sure all necesary sesion properties are available to start the session
    * timer while this React lifecycle receives props.
    * && this.state.startTimer
    */
    if (sessionTimeout && sessionResetTime && sessionIsActive) {
      this.startSessionTimer(sessionTimeout, sessionResetTime);
    }
  }

  startSessionTimer(sessionTimeout, sessionResetTime) {
    // this.setState({ startTimer: false });

    // console.log('sessionTimeout', sessionTimeout);
    // console.log('sessionResetTime', sessionResetTime);

    // Clear the existing timeout function.
    clearTimeout(this.sessionTimeoutHandler);

    // Start total (sessionTimeout) session timer.
    this.sessionTimeoutHandler = setTimeout(() => {
      /**
      * NOTE: The dispatch below needs to happen here, outside the sessionTimeoutWarning() function,
      * in order for the value of the dispatch to register properly inside sessionTimeoutWarning().
      */

      // Turn session activity off.
      this.props.dispatch(setSessionIsActive(false));

      // Start session warning timer.
      this.sessionTimeoutWarning(sessionResetTime);
    }, ((sessionTimeout - sessionResetTime) * 60000));
  }

  sessionTimeoutWarning(sessionResetTime) {
    const { dispatch } = this.props;

    // Open session timeout modal.
    dispatch(setModalView(GLOBAL_MODAL_SESSION_TIMEOUT));
    dispatch(toggleModal(true));

    // console.log('sessionResetTime', sessionResetTime);

    // Start remaining session timer after warning.
    setTimeout(() => {
      this.endSessionTimer();
    }, (sessionResetTime * 60000));
  }

  endSessionTimer() {
    const { dispatch } = this.props;
    const { sessionIsActive, sessionTimeout, sessionResetTime, SSOType } = this.props.globalSettings;
    // console.log('sessionIsActive', sessionIsActive);

    // Shell module labels.
    // const shModuleLabelsItems = shModuleLabels.items;
    // const lblYouHaveBeenLoggedOut = shModuleLabelsItems ? shModuleLabelsItems.lblYouHaveBeenLoggedOut : null;

    if (!sessionIsActive) {
      // console.log(lblYouHaveBeenLoggedOut);

      // Close modal.
      dispatch(toggleModal(false));

      // Alert the user they have been logged out.
      // alert(lblYouHaveBeenLoggedOut);

      // If sso login reload to home page other wise redirect to logout page.
      window.location = SSOType === 2 ? '/' : '/Logout.aspx';
    } else {
      // Restart session timer.
      this.startSessionTimer(sessionTimeout, sessionResetTime);
    }
  }

  // Render method.
  render() {
    return (
      <span />
    );
  }
}

// Validation.
Session.propTypes = {
  dispatch: React.PropTypes.func,
  globalSettings: React.PropTypes.object,
  shModuleLabels: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  globalLang: state.globalLang,
  globalSettings: state.globalSettings,
  shModuleLabels: state.shModuleLabels,
});

// Export.
export default connect(mapStateToProps)(Session);
