import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';


import DataSelect from '../../../../components/DataForms/DataSelect';
import { Row, Col, Button } from 'react-bootstrap';
import Icon from 'react-fa';
import Card from '../../../../components/Card/Card';

// DM actions.
import { fetchFilter } from '../../redux/actions/filter-actions';
import { setSearchCriteria, setSearchObject } from '../../redux/actions/search-actions';

// DatePicker.
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class Filter extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    const { dmSearch } = this.props;
    const initialObject = {
      Level: null,
      Status: null,
      Owner: null,
      BusinessProcess: null,
      Keywords: null,
      DateFrom: null,
      DateTo: null,
    };

    this.state = {
      isFiltered: dmSearch.criteria ? true : false,
      filterState: dmSearch.object ? dmSearch.object : initialObject
    };
  }


  // Method to handle DataSelect and state.
  handleDataSelectChange(key, type, value, obj) {
    const arr = [];
    let newSelected = _.extend({}, this.state.filterState);

    // Look through the object passed and push each item to an array.
    obj.forEach(item => {
      if (item.Id) {
        arr.push(item);
      }
    });

    // Update the selected object.
    if (arr.length > 1 || type === 'array') {
      // Array of objects.
      newSelected[key] = arr;
    } else {
      // Single object.
      newSelected[key] = arr[0];
    }

    // Update the state.
    this.setState({ filterState: newSelected });
  }

  // Apply filter criterias.
  handleFilterApply(itemToBeRemoved) {
    const { dispatch } = this.props;

    // Get data from local state.
    let filterState = this.state.filterState;
    let filterCounter = 0;
    let filterCriteria = '';


    if (itemToBeRemoved === 'Reset') {
      const arrFilterState = ['Level', 'Status', 'Owner', 'BusinessProcess', 'Keywords', 'DateFrom', 'DateTo'];
      // Reset all items.
      arrFilterState.forEach(item => {
        filterState[item] = null;
      });
    } else if (itemToBeRemoved) {
      filterState[itemToBeRemoved] = null;
    }

    // Level.
    const levelValue = filterState.Level;
    if (levelValue) {
      filterCounter++;
      const levelValueArray = Array.isArray(levelValue) ? levelValue.map(item => item.Id).join(',') : null;
      const levelValueObject = (levelValue && !levelValueArray) ? levelValue.Id : null;
      const levelValueDisplay = levelValueObject ? levelValueObject : levelValueArray;
      filterCriteria += `&levels=${levelValueDisplay}`;
    }
    // Status.
    const statusValue = filterState.Status;
    if (statusValue) {
      filterCounter++;
      const statusValueArray = Array.isArray(statusValue) ? statusValue.map(item => item.Id).join(',') : null;
      const statusValueObject = (statusValue && !statusValueArray) ? statusValue.Id : null;
      const statusValueDisplay = statusValueObject ? statusValueObject : statusValueArray;
      filterCriteria += `&statuses=${statusValueDisplay}`;
    }
    // Owner.
    const ownerValue = filterState.Owner;
    if (ownerValue) {
      filterCounter++;
      const ownerValueArray = Array.isArray(ownerValue) ? ownerValue.map(item => item.Id).join(',') : null;
      const ownerValueObject = (ownerValue && !ownerValueArray) ? ownerValue.Id : null;
      const ownerValueDisplay = ownerValueObject ? ownerValueObject : ownerValueArray;
      filterCriteria += `&owners=${ownerValueDisplay}`;
    }
    // BusinessProcess.
    const businessProcessValue = filterState.BusinessProcess;
    if (businessProcessValue) {
      filterCounter++;
      const businessProcessValueArray = Array.isArray(businessProcessValue) ? businessProcessValue.map(item => item.Id).join(',') : null;
      const businessProcessValueObject = (businessProcessValue && !businessProcessValueArray) ? businessProcessValue.Id : null;
      const businessProcessValueDisplay = businessProcessValueObject ? businessProcessValueObject : businessProcessValueArray;
      filterCriteria += `&busProcs=${businessProcessValueDisplay}`;
    }
    // Keywords.
    const keywordsValue = filterState.Keywords;
    if (keywordsValue) {
      filterCounter++;
      const keywordsValueArray = Array.isArray(keywordsValue) ? keywordsValue.map(item => item.Id).join(',') : null;
      const keywordsValueObject = (keywordsValue && !keywordsValueArray) ? keywordsValue.Id : null;
      const keywordsValueDisplay = keywordsValueObject ? keywordsValueObject : keywordsValueArray;
      filterCriteria += `&keywords=${keywordsValueDisplay}`;
    }

    // Date from.
    const finalDateFromValue = filterState.DateFrom;
    if (finalDateFromValue) {
      filterCounter++;
      const finalDateFrom = new Date(finalDateFromValue);
      filterCriteria += `&finalDateFrom=${finalDateFrom.toISOString()}`;
    }

    // Date to.
    const finalDateToValue = filterState.DateTo;
    if (finalDateToValue) {
      filterCounter++;
      const finalDateTo = new Date(finalDateToValue);
      filterCriteria += `&finalDateTo=${finalDateTo.toISOString()}`;
    }

    // Filter.
    // Set search/filter criteria.
    dispatch(setSearchCriteria(filterCriteria));
    // Save current state object into the search reducer.
    dispatch(setSearchObject(filterState));
    // Call api.
    dispatch(fetchFilter());
    this.setState({ isFiltered: true });
  }

  handleFilterOpen() {
    this.setState({ isFiltered: false });
  }

  handleDateChange(key, date) {
    let newSelected = _.extend({}, this.state.filterState);
    newSelected[key] = date;

    // Update the state.
    this.setState({ filterState: newSelected });
  }

  render() {
    const { dmLookups, dmSearch } = this.props;
    const lookupsData = dmLookups ? dmLookups.items : [];

    // Get query and criteria values from the search reducer.
    const queryValue = dmSearch.query;
    const criteriaValue = dmSearch.criteria;

    // Filter state.
    const isFilteredValue = this.state.isFiltered;

    // Get data from Lookups.
    const ownersOptions = lookupsData.Owners;
    const keywordsOptions = lookupsData.Keywords;
    const businessProcessesOptions = lookupsData.BusinessProcesses;
    const documentStatuses = lookupsData.DocumentStatuses;

    // Extract levels from all business processes.
    const levelArray = businessProcessesOptions ? businessProcessesOptions.map(item => item.Levels).filter(level => level.length) : [];
    const levelOptions = (levelArray.reduce( (accumulator, arrays) => {
      arrays.forEach(levelObj => {
        accumulator.push(levelObj);
      });
      return accumulator;
    }, []));

    // Get data from local state.
    const filterState = this.state.filterState;

    // Level.
    const levelValue = filterState.Level;
    const levelValueArray = Array.isArray(levelValue) ? levelValue.map(item => item.Description).join(', ') : null;
    const levelValueObject = (levelValue && !levelValueArray) ? levelValue.Description : null;
    const levelValueDisplay = levelValueObject ? levelValueObject : levelValueArray;
    // Status.
    const statusValue = filterState.Status;
    const statusValueArray = Array.isArray(statusValue) ? statusValue.map(item => item.Description).join(', ') : null;
    const statusValueObject = (statusValue && !statusValueArray) ? statusValue.Description : null;
    const statusValueDisplay = statusValueObject ? statusValueObject : statusValueArray;
    // Owner.
    const ownerValue = filterState.Owner;
    const ownerValueArray = Array.isArray(ownerValue) ? ownerValue.map(item => item.Description).join(', ') : null;
    const ownerValueObject = (ownerValue && !ownerValueArray) ? ownerValue.Description : null;
    const ownerValueDisplay = ownerValueObject ? ownerValueObject : ownerValueArray;
    // BusinessProcess.
    const businessProcessValue = filterState.BusinessProcess;
    const businessProcessValueArray = Array.isArray(businessProcessValue) ? businessProcessValue.map(item => item.Description).join(', ') : null;
    const businessProcessValueObject = (businessProcessValue && !businessProcessValueArray) ? businessProcessValue.Description : null;
    const businessProcessValueDisplay = businessProcessValueObject ? businessProcessValueObject : businessProcessValueArray;
    // Keywords.
    const keywordsValue = filterState.Keywords;
    const keywordsValueArray = Array.isArray(keywordsValue) ? keywordsValue.map(item => item.Description).join(', ') : null;
    const keywordsValueObject = (keywordsValue && !keywordsValueArray) ? keywordsValue.Description : null;
    const keywordsValueDisplay = keywordsValueObject ? keywordsValueObject : keywordsValueArray;
    // Date From/To.
    const finalDateFromValue = filterState.DateFrom ? filterState.DateFrom : null;
    const finalDateFromValueDisplay = finalDateFromValue ? String(moment(filterState.DateFrom).format('L')) : null;
    const finalDateToValue = filterState.DateTo ? filterState.DateTo : null;
    const finalDateToValueDisplay = finalDateToValue ? String(moment(filterState.DateTo).format('L')) : null;

    return (
      <Card>

        {
          !isFilteredValue || (!isFilteredValue && !criteriaValue) ?
            <div>

              {queryValue ?
                <div className="Select--multi">
                  <div className="Select-item">
                    <span className="Select-item-label">Searching for: <strong>{queryValue}</strong></span>
                  </div>
                </div>
              :
                null
              }
              <hr/>

              <div className="form-horizontal">
                <Row>

                  <Col sm={6}>
                    <div className="form-group">
                      <label className="control-label col-sm-4">
                        Document Level:
                      </label>
                      <Col sm={8}>
                        <DataSelect
                          options={levelOptions}
                          placeholder="Select..."
                          multi
                          noFormat
                          value={levelValue}
                          onChange={this.handleDataSelectChange.bind(this, 'Level', 'object')}
                        />
                      </Col>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="form-group">
                      <label className="control-label col-sm-4">
                        Document Owner:
                      </label>
                      <Col sm={8}>
                        <DataSelect
                          options={ownersOptions}
                          placeholder="Select..."
                          multi
                          noFormat
                          value={ownerValue}
                          onChange={this.handleDataSelectChange.bind(this, 'Owner', 'object')}
                        />
                      </Col>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="form-group">
                      <label className="control-label col-sm-4">
                        Status:
                      </label>
                      <Col sm={8}>
                        <DataSelect
                          options={documentStatuses}
                          placeholder="Select..."
                          multi
                          noFormat
                          value={statusValue}
                          onChange={this.handleDataSelectChange.bind(this, 'Status', 'object')}
                        />
                      </Col>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="form-group">
                      <label className="control-label col-sm-4">
                        Business Process:
                      </label>
                      <Col sm={8}>
                        <DataSelect
                          options={businessProcessesOptions}
                          placeholder="Select..."
                          multi
                          noFormat
                          value={businessProcessValue}
                          onChange={this.handleDataSelectChange.bind(this, 'BusinessProcess', 'object')}
                        />
                      </Col>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="form-group">
                      <label className="control-label col-sm-4">Date Range</label>
                      <div className="col-sm-4">
                        <DatePicker
                          className="form-control"
                          onChange={this.handleDateChange.bind(this, 'DateFrom')}
                          dateFormat="MMMM DD, YYYY"
                          placeholderText="From..."
                          selected={finalDateFromValue}
                          addonAfter={<Icon name="file" />}
                          showYearDropdown
                        />
                      </div>
                      <div className="col-sm-4">
                        <DatePicker
                          className="form-control"
                          onChange={this.handleDateChange.bind(this, 'DateTo')}
                          dateFormat="MMMM DD, YYYY"
                          placeholderText="To..."
                          selected={finalDateToValue}
                          addonAfter={<Icon name="file" />}
                          showYearDropdown
                        />
                      </div>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="form-group">
                      <label className="control-label col-sm-4">
                        Tags/Keywords:
                      </label>
                      <Col sm={8}>
                        <DataSelect
                          options={keywordsOptions}
                          placeholder="Select..."
                          multi
                          noFormat
                          value={keywordsValue}
                          onChange={this.handleDataSelectChange.bind(this, 'Keywords', 'object')}
                        />
                      </Col>
                    </div>
                  </Col>

                </Row>

              <Row>
                <Col sm={12} className="text-right">
                  <Button bsStyle="primary" bsSize="sm" onClick={this.handleFilterApply.bind(this)}>Apply</Button>
                </Col>
              </Row>
            </div>
          </div>

        :

          <div className="Select--multi">
            <div className="clearfix">
              <div className="pull-left">
                {queryValue ?
                  <div className="Select-item">
                    <span className="Select-item-label">Searching for: <strong>{queryValue}</strong></span>
                  </div>
                :
                  null
                }
                {levelValueDisplay ?
                  <div className="Select-item">
                      <span className="Select-item-icon" onClick={this.handleFilterApply.bind(this, 'Level')}>×</span>
                      <span className="Select-item-label">Level: <strong>{levelValueDisplay}</strong></span>
                  </div>
                :
                  null
                }

                {statusValueDisplay ?
                  <div className="Select-item">
                      <span className="Select-item-icon" onClick={this.handleFilterApply.bind(this, 'Status')}>×</span>
                      <span className="Select-item-label">Status: <strong>{statusValueDisplay}</strong></span>
                  </div>
                :
                  null
                }

                {ownerValueDisplay ?
                  <div className="Select-item">
                      <span className="Select-item-icon" onClick={this.handleFilterApply.bind(this, 'Owner')}>×</span>
                      <span className="Select-item-label">Owner: <strong>{ownerValueDisplay}</strong></span>
                  </div>
                :
                  null
                }

                {businessProcessValueDisplay ?
                  <div className="Select-item">
                      <span className="Select-item-icon" onClick={this.handleFilterApply.bind(this, 'BusinessProcess')}>×</span>
                      <span className="Select-item-label">Business Process: <strong>{businessProcessValueDisplay}</strong></span>
                  </div>
                :
                  null
                }

                {keywordsValueDisplay ?
                  <div className="Select-item">
                      <span className="Select-item-icon" onClick={this.handleFilterApply.bind(this, 'Keywords')}>×</span>
                      <span className="Select-item-label">Keywords: <strong>{keywordsValueDisplay}</strong></span>
                  </div>
                :
                  null
                }

                {finalDateFromValueDisplay ?
                  <div className="Select-item">
                      <span className="Select-item-icon" onClick={this.handleFilterApply.bind(this, 'DateFrom')}>×</span>
                      <span className="Select-item-label">Date From: <strong>{finalDateFromValueDisplay}</strong></span>
                  </div>
                :
                  null
                }

                {finalDateToValueDisplay ?
                  <div className="Select-item">
                      <span className="Select-item-icon" onClick={this.handleFilterApply.bind(this, 'DateTo')}>×</span>
                      <span className="Select-item-label">Date To: <strong>{finalDateToValueDisplay}</strong></span>
                  </div>
                :
                  null
                }

                {!criteriaValue && !queryValue ?
                  <div className="Select-item">
                      <span className="Select-item-label">No filter criteria selected.</span>
                  </div>
                :
                  null
                }

              </div>
              <div className="pull-right">
                <Button bsStyle="default" bsSize="sm" onClick={this.handleFilterOpen.bind(this)}>
                  <Icon name="filter" />
                  {' '}
                  Filter
                </Button>
                {' '}
                {criteriaValue ?
                  <Button bsStyle="danger" bsSize="sm" onClick={this.handleFilterApply.bind(this, 'Reset')}>
                    <Icon name="close" />
                    {' '}
                    Reset
                  </Button>
                :
                  null
                }
              </div>
            </div>
          </div>

        }

      </Card>
    );
  }
}

// propTypes.
Filter.propTypes = {
  dispatch: React.PropTypes.func,
  handleFilterToggle: React.PropTypes.func,
  dmLookups: React.PropTypes.object,
  dmSearch: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  dmLookups: state.dmLookups,
  dmSearch: state.dmSearch,
});


export default connect(mapStateToProps)(Filter);
