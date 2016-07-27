// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// Components.
import DataSelect from '../../../../../../components/DataForms/DataSelect';
import Stages from './Stages';


// Define class.
class Workflow extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      workflowStages: null
    };
  }

  // Method to handle DataSelect and state.
  handleDataSelectChange(key, type, value, obj) {
    const workflowsData = this.props.dataOptions ? _.cloneDeep(this.props.dataOptions) : [];

    const arr = [];
    let newSelected = null;
    const docState = this.props.docStateMutableData;

    // Look through the object passed and push each item to an array.
    obj.forEach(item => {
      if (item.Id) {
        arr.push(item);
      }
    });

    if (arr[0]) {
      workflowsData.forEach(item => {
        if (item.Id === arr[0].Id) {
          this.setState({workflowStages: item.Stages});
          newSelected = item;
        }
      });
    }

    // Mutate the original state.
    docState.Workflow = newSelected;
  }

  handleErrorCallback() {
    this.props.handleErrorCallback(this);
  }


  // Render method.
  render() {
    const workflowOptions = this.props.dataOptions;
    const workflowValue = this.props.docStateMutableData ? this.props.docStateMutableData.Workflow : null;
    const validateField = this.props.validateField;
    const canChangeWorkflow = this.props.canChangeWorkflow;
    return (
      <div className="well">

        <DataSelect
          label="Workflow Options"
          options={workflowOptions}
          value={workflowValue}
          onChange={this.handleDataSelectChange.bind(this, 'Workflow', 'object')}
          clearable={false}
          disabled={!canChangeWorkflow}

          // Form validation.
          isRequired
          validateField={validateField}
          handleErrorCallback={this.handleErrorCallback.bind(this)}
        />

        <Stages
          docStateMutableData={this.props.docStateMutableData}
          workflowData={workflowValue}
          validateField={validateField}
          handleErrorCallback={this.handleErrorCallback.bind(this)}
        />

      </div>
    );
  }
}

// Validation.
Workflow.propTypes = {
  dmLookups: React.PropTypes.object,
  docStateMutableData: React.PropTypes.object,
  dataOptions: React.PropTypes.array,
  validateField: React.PropTypes.bool,
  handleErrorCallback: React.PropTypes.func,
  canChangeWorkflow: React.PropTypes.bool,
};


const mapStateToProps = (state) => ({
  dmLookups: state.dmLookups,
});

// Export.
export default connect(mapStateToProps)(Workflow);
