// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

import { changeFolder, setRightPanelAreaView } from '../../../redux/actions/ui-actions';
import { fetchFolder } from '../../../redux/actions/folder-actions';
import { DM_RIGHT_PANEL_ACTIVITY } from '../../../redux/constants/ui-constants';

// Core components.
import {Row, Col, Button, ListGroupItem} from 'react-bootstrap';
import Icon from 'react-fa';

// Date format.
import moment from 'moment';


// Define class.
class FileManagerRowFolder extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
    this.counter = 0;
  }

  handleClick() {
    const {dispatch, data } = this.props;

    // Redux action.
    dispatch(fetchFolder(data.Uid));
    dispatch(changeFolder(data.Uid));
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_ACTIVITY));
  }

  // Render method.
  render() {
    const folderData = this.props.data;
    const folderName = folderData.Description;
    const folderDate = moment(folderData.UpdatedDate ? folderData.UpdatedDate : folderData.CreatedDate).format('L');

    this.counter += 1;
    // console.log('FileManagerFolderCounter -> render counter: ', this.counter);

    return (
      <ListGroupItem onClick={this.handleClick.bind(this)}>
        <Row>
          <Col sm={7}>
            <Button href="#/" bsStyle="link" bsSize="xs">
              <Icon name="folder-open" className="fa-fw fa-lg text-muted" style={{ marginRight: 6 }} />
              {folderName}
            </Button>
          </Col>
          <Col sm={2} className="text-center text-left-xs">
            <small className="visible-xs-inline">
              <strong>Date Modified: </strong>
            </small>
            {folderDate}
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

// Validation.
FileManagerRowFolder.propTypes = {
  data: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  globalSettings: React.PropTypes.object
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

// Export.
export default connect(mapDispatchToProps)(FileManagerRowFolder);
