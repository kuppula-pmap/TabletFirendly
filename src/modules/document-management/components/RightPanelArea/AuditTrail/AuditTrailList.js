// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import Loader from '../../../../../components/Loader';
import AuditTrailCard from './AuditTrailCard';
import DetailViewDropdown from '../DetailViewDropdown';
import DataSelect from '../../../../../components/DataForms/DataSelect';

import utils from '../../../../../utils';

// Redux action.
import { fetchAuditTrail } from '../../../redux/actions/auditTrail-actions';


// Define class.
class AuditTrailList extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      auditCategory: 'All',
    };
  }

  componentDidMount() {
    const { dispatch, dmDocument } = this.props;

    // Document Data.
    const documentData = dmDocument ? dmDocument.items : [];
    const uid = documentData.Uid;

    // Fetch Version History.
    dispatch( fetchAuditTrail(uid) );
  }

  // Method to handle DataSelect and state.
  handleDataSelectChange(value, obj) {
    const arr = [];

    // Look through the object passed and push each item to an array.
    obj.forEach(item => {
      if (item.Id) arr.push(item);
    });

    // Update the state.
    const selectedCategory = arr[0] ? arr[0].Id : null;
    this.setState({ auditCategory: selectedCategory });
  }

  // Render method.
  render() {
    const { dmAuditTrail } = this.props;

    const auditTrailData = dmAuditTrail.items ? dmAuditTrail.items : null;

    // Create list of Categories and total items.
    // Example: {Actions: 5, Status Changes: 2}
    const categoryList = auditTrailData ? auditTrailData.map( (audit) => audit.Category).reduce( (list, item) => {
      if (!list[item]) {
        list[item] = 1;
      } else {
        list[item] = list[item] + 1;
      }
      return list;
    }, {}) : null;

    // Sort and filter dropdown options.
    const selectDropdownOptions = categoryList ? Object.keys(categoryList).sort().map(key => ({Id: key, Description: `${key} (${categoryList[key]})`})) : [];
    selectDropdownOptions.splice(0, 0, {Id: 'All', Description: 'All'});

    // Filter by selected category in the dropdown.
    const selectedCategory = this.state.auditCategory;
    const auditTrailFilteredData = selectedCategory === 'All' ? auditTrailData : auditTrailData.filter(audit => audit.Category === selectedCategory);

    const auditList = [];
    if (auditTrailFilteredData) {
      auditTrailFilteredData.map(audit =>
        auditList.push(
          <AuditTrailCard
            key={utils.unique()}
            editDate={audit.EditDate}
            userName={audit.UserName}
            action={audit.Action}
            statusLog={audit.StatusLog}
          />
        )
      );
    } else {
      auditList.push(
        <div className="sidebar-details">
          <p>No audit trails were found.</p>
        </div>
      );
    }

    return (
      <div>
        <div className="fixed-title">
          <DetailViewDropdown />
        </div>

        {dmAuditTrail.isFetching ?
          <Loader size={16} padding={10} theme="dark" />
        :
        <div>
          <div className="sidebar-details">
            <DataSelect
              label="Filter by Category"
              options={selectDropdownOptions}
              value={this.state.auditCategory}
              onChange={this.handleDataSelectChange.bind(this)}
              clearable={false}
            />
          </div>

          <ListGroup style={{ marginTop: -10 }}>
            {auditList}
          </ListGroup>
        </div>
      }
      </div>
    );
  }
}

// propTypes.
AuditTrailList.propTypes = {
  dispatch: React.PropTypes.func,
  dmDocument: React.PropTypes.object,
  dmAuditTrail: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmAuditTrail: state.dmAuditTrail
});

// Export.
export default connect(mapStateToProps)(AuditTrailList);
