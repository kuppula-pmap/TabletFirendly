import React from 'react';
import {connect} from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
// import Icon from '../../../../../components/Icon';
import Ficon from 'react-fa';
import { postLegacyView } from '../../../redux/actions/legacyView-actions';

class ShellToggleIcon extends React.Component {

handleSwitchClick(e) {
  e.preventDefault();
  const{ dispatch } = this.props;

  // Dispatch action to set the DB value for the old shell.
  dispatch(postLegacyView());
  // Redirect to the old shell in .Net.
  window.location = '/Home.aspx';
}
  render() {
    const { styles, shModuleLabels } = this.props;

    // Shell module labels.
    const shModuleLabelsItems = shModuleLabels.items;
    const lblSwitchToClassicView = shModuleLabelsItems ? shModuleLabelsItems.lblSwitchToClassicView : null;

    const tooltip = <Tooltip id="ShellToggleIcon_tooltip">{lblSwitchToClassicView}</Tooltip>;

    return (
      <li style={styles.rightNavLink}>
        <OverlayTrigger placement="left" overlay={tooltip}>
          <a href="/Home.aspx" onClick={this.handleSwitchClick.bind(this)} id={`shell_shell-toggle_anchor_toggle-switch`}>
            <Ficon name="repeat" size="lg" fixedWidth flip="horizontal" className="nav-icon" style={styles.navIcon} />
          </a>
        </OverlayTrigger>
      </li>
    );
  }
}

ShellToggleIcon.propTypes = {
  styles: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  shModuleLabels: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  shModuleLabels: state.shModuleLabels,
});

export default connect(mapStateToProps)(ShellToggleIcon);
