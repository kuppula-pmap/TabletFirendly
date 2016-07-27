// Dependencies.
import React from 'react';
import { Input } from 'react-bootstrap';

// Utility methods.
import utils from '../../../utils';

// Layout components.
import Main from '../../../layouts/main';

// Misc components.
// import Mars from '../../../components/Mars';
import DataSelect from '../../../components/DataForms/DataSelect';
// import Avatar from '../../../components/Avatar';
// import Icon from '../../../components/Icon';
// import ChangeRequest from '../../components/RightPanelArea/ChangeRequestFromViewer.js';
// import PDF from '../../../components/PDF';

// import TreeView from '../../../components/TreeView/TreeView';
// import { treeData } from '../../../components/TreeView/data';

// DatePicker.
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';

// Define class.
class Home extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    // Set page title.
    utils.title(props);

    this.state = {
      startDate: moment(),
    };
  }

  onTreeViewClick(node) {
    console.log(node.name, node.selected);
  }

  handleDataSelectChange(key, value, obj) {
    console.log(key, value, obj);
  }

  handleDateChange(date) {
    this.setState({ startDate: date });
  }

  // Render method.
  render() {
    // const selectOptions = [
    //   { value: 'one', label: 'One' },
    //   { value: 'two', label: 'Two' }
    // ];
    const startDate = this.state.startDate; // local state.

    return (
      <Main>
        <div style={{ padding: 20 }}>
          <Input type="text" label="Title" bsStyle="error" labelClassName="required"/>

          <Input type="textarea" label="Description" bsStyle="error"/>

          <Input type="select" label="Published Format" bsStyle="error" labelClassName="required">
            <option>Original Format</option>
            <option>PDF</option>
          </Input>

          { /* <Input type="file" label="File" help="[Optional] Block level help text"/> */ }
          <Input type="checkbox" label="Checkbox" bsStyle="error" checked readOnly/>
          <Input type="radio" label="Radio" bsStyle="error" checked readOnly />

          <div className="form-group has-error">
            <label className="control-label required">Periodic Review Start Date</label>
            <DatePicker
              className="form-control"
              onChange={this.handleDateChange.bind(this)}
              dateFormat="MMMM DD, YYYY"
              // isClearable
              selected={startDate}
              showYearDropdown
            />
          </div>

          <DataSelect
            label="Document Type"
            status="error"
            // options={documentTypesOptions}
            placeholder="Find Document Type"
            // value={typeValue}
            isRequired
            onChange={this.handleDataSelectChange.bind(this, 'Type', 'object')}
          />

        </div>
      </Main>
    );
  }
}

// Export.
export default Home;
