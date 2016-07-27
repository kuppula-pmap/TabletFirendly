// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import VersionHistoryCard from './VersionHistoryCard';
import DetailViewDropdown from '../DetailViewDropdown';
import {ListGroup} from 'react-bootstrap';

// Utilities.
import utils from '../../../../../utils';

// Doc Mgt actions.
import { fetchVersionHistory } from '../../../redux/actions/versionHistory-actions';


// Define class.
class VersionHistoryList extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      selectedKey: 'default',
      selectedValue: 'All Tasks',
    };
  }

  handleSelect(e, key) {
    this.setState({ selectedValue: e.currentTarget.outerText });
    this.setState({ selectedKey: key });
  }

  componentDidMount() {
    // Props.
    const { dispatch, dmDocument } = this.props;

    // Document Data.
    const documentData = dmDocument ? dmDocument.items : [];
    const uid = documentData.Uid;

    // Fetch Version History.
    dispatch(fetchVersionHistory(uid) );
  }

  // Render method.
  render() {
    const { dmVersionHistory } = this.props;

    const versionHistoryData = dmVersionHistory.items;

    // console.log('versionHistoryData:', versionHistoryData);

    return (
      <div>

        <div className="fixed-title">
          <DetailViewDropdown />
        </div>

        <ListGroup bsStyle="success">
          { versionHistoryData.map(version =>
            <VersionHistoryCard
              key={utils.unique()}
              version={version}
            />)
          }
        </ListGroup>

      </div>
    );
  }
}

// propTypes.
VersionHistoryList.propTypes = {
  dispatch: React.PropTypes.func,
  dmDocument: React.PropTypes.object,
  dmVersionHistory: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmVersionHistory: state.dmVersionHistory
});

// Export.
export default connect(mapStateToProps)(VersionHistoryList);
