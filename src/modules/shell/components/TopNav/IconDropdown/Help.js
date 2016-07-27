import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { NavDropdown, MenuItem, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Icon from '../../../../../components/Icon';
import Ficon from 'react-fa';
import { postLegacyView } from '../../../redux/actions/legacyView-actions';

class HelpIcon extends React.Component {
  handlePreventDefault(e) {
    e.preventDefault();
  }

  handleSwitchClick(e) {
    e.preventDefault();
    const{ dispatch } = this.props;

    // Dispatch action to set the DB value for the old shell.
    dispatch( postLegacyView() );
    // Redirect to the old shell in .Net.
    window.location = '/Home.aspx';
    window.open('https://www.surveymonkey.com/r/TCM2XZ9', 'MsgWindow', 'width=728,height=750');
  }

  openFeedbackWindow(e) {
    e.preventDefault();
    window.open('https://www.surveymonkey.com/r/MXGXBJS', 'MsgWindow', 'width=728,height=750');
  }

  render() {
    const { styles, shUserInfo, globalSettings, shModuleLabels } = this.props;
    const encryptedAppId = globalSettings.encryptedAppId;

    // User info items.
    const shUserInfoItems = shUserInfo.items;
    const SystemAdminName = shUserInfoItems ? shUserInfoItems.SystemAdminName : null;
    const SystemAdminEmailID = shUserInfoItems ? shUserInfoItems.SystemAdminEmailID : null;
    const SystemAdminPhone = shUserInfoItems ? shUserInfoItems.SystemAdminPhone : null;
    const ResourcesLink = shUserInfoItems ? shUserInfoItems.ResourcesLink : null;
    const HelpLink = shUserInfoItems ? shUserInfoItems.HelpLink : null;
    const lblSystemAdminIsNotYetSetup = shUserInfoItems ? shUserInfoItems.lblSystemAdminIsNotYetSetup : null;
    // Labels.
    const lblBrowserSetting = shUserInfoItems ? shUserInfoItems.lblBrowserSetting : null;
    const lblSystemAdminDetails = shUserInfoItems ? shUserInfoItems.lblSystemAdminDetails : null;
    const lblUserGuide = shUserInfoItems ? shUserInfoItems.lblUserGuide : null;
    const lblResources = shUserInfoItems ? shUserInfoItems.lblResources : null;

    // Shell module labels.
    const shModuleLabelsItems = shModuleLabels.items;
    const lblHelp = shModuleLabelsItems ? shModuleLabelsItems.lblHelp : null;
    const lblSwitchToClassicView = shModuleLabelsItems ? shModuleLabelsItems.lblSwitchToClassicView : null;
    const lblTellUsNewInterface = shModuleLabelsItems ? shModuleLabelsItems.lblTellUsNewInterface : null;

    const tooltip = <Tooltip id="HelpIcon_tooltip">{lblHelp}</Tooltip>;
    const title = (
      <div>
          <Icon name="help-circle-o" size="lg" fixedWidth className="nav-icon" style={styles.navIcon} />
      </div>
    );

    return (
      <OverlayTrigger placement="left" overlay={tooltip}>
        <NavDropdown eventKey={1} noCaret pullRight title={title} style={styles.rightNavLink} id={`shell_help-icon_dropdown_toggle`}>

            <li style={styles.dropDownListItem}>
              <Link to="#" onClick={this.handlePreventDefault.bind(this)}>
                <Ficon name="ticket" fixedWidth />
                Report Ticket / View Status
              </Link>
            </li>

            <MenuItem divider />

            <MenuItem header className="dropdown-header-bg">
              {lblSystemAdminDetails}
            </MenuItem>

            {SystemAdminName ?
              <MenuItem header>
                <Ficon name="user" fixedWidth />
                {SystemAdminName}
              </MenuItem>
            : null}

            {SystemAdminName ?
              <li style={styles.dropDownListItem}>
                <a href={`mailto:${SystemAdminEmailID}`}>
                  <Ficon name="envelope" fixedWidth />
                  {SystemAdminEmailID}
                </a>
              </li>
            : null}

            {SystemAdminName ?
              <li style={styles.dropDownListItem}>
                <Link to={`tel:${SystemAdminPhone}`}>
                  <Ficon name="phone" fixedWidth />
                  {SystemAdminPhone}
                </Link>
              </li>
            : null}

            {SystemAdminName ?
              null
            : <MenuItem header>
                {lblSystemAdminIsNotYetSetup}
              </MenuItem>}


            <MenuItem divider />

            <li style={styles.dropDownListItem}>
              <a href="/Help/Docs/Browser Compatibility/ProcessMAP Foundation Quick Guide - How to Update Compatibility Settings for IE8-9.doc" target="_blank">
                <Ficon name="cog" fixedWidth />
                {lblBrowserSetting}
              </a>
            </li>


            <MenuItem divider />

            <li style={styles.dropDownListItem}>
              <a href={`${HelpLink}${encryptedAppId}`} target="_blank">
                <Ficon name="info-circle" fixedWidth />
                {lblUserGuide}
              </a>
            </li>


            <MenuItem divider />

            <li style={styles.dropDownListItem}>
              <a href={ResourcesLink} target="_blank">
                <Ficon name="folder-open" fixedWidth />
                {lblResources}
              </a>
            </li>


            <MenuItem divider />

            {/*
            <MenuItem header className="dropdown-header-bg">
              New Interface
            </MenuItem>
            */}

            <li style={styles.dropDownListItem}>
              <Link to="#" onClick={this.openFeedbackWindow.bind(this)}>
                <Ficon name="bullhorn" fixedWidth />
                {lblTellUsNewInterface}
              </Link>
            </li>


            <MenuItem divider />

            <li style={styles.dropDownListItem}>
              <a href="/Home.aspx" onClick={this.handleSwitchClick.bind(this)}>
                <Ficon name="arrows-h" fixedWidth />
                {lblSwitchToClassicView}
              </a>
            </li>

        </NavDropdown>
      </OverlayTrigger>
    );
  }
}

HelpIcon.propTypes = {
  styles: React.PropTypes.object,
  shUserInfo: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
  shModuleLabels: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

const mapStateToProps = (state) => ({
  shUserInfo: state.shUserInfo,
  globalSettings: state.globalSettings,
  shModuleLabels: state.shModuleLabels,
});

export default connect(mapStateToProps)(HelpIcon);
