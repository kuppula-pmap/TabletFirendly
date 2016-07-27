import React from 'react';
import Icon from '../../../../../components/Icon';
import {
  Badge,
  NavDropdown,
  MenuItem,
  Alert,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';


class AlarmIcon extends React.Component {
  closeAlert() {
    // console.log('close alert');
  }

  render() {
    const { styles, customerMsgText } = this.props;

    const tooltip = <Tooltip id="alarmIcon_tooltip">System Message</Tooltip>;

    const title = (
      <div>
          <Icon name="alarm-o" size="lg" fixedWidth className="nav-icon" style={styles.navIcon} />
          <Badge className="icon-badge danger" style={styles.badge}>1</Badge>
      </div>
    );

    return (
      <OverlayTrigger placement="left" overlay={tooltip}>
        <NavDropdown defaultOpen eventKey={1} id="headerNavDropdown_1" noCaret pullRight title={title} style={styles.rightNavLink}>
          <MenuItem eventKey={1.1} style={styles.dropDownListItem}>
            <Alert bsStyle="warning" onDismiss={this.closeAlert.bind(this)} style={styles.alertLink}>
              <small>{customerMsgText}</small>
            </Alert>
          </MenuItem>
        </NavDropdown>
      </OverlayTrigger>
    );
  }
}

AlarmIcon.propTypes = {
  styles: React.PropTypes.object,
  customerMsgText: React.PropTypes.string,
};

export default AlarmIcon;
