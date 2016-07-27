// Dependencies.
import React from 'react';
import { ButtonGroup, DropdownButton, MenuItem, Badge } from 'react-bootstrap';
import utils from '../../../../../utils';


// Define class.
class TaskListHeader extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
  }

  handleSelect(e, key) {
    this.props.onSelectItem(String(key));
  }

  // Render method.
  render() {
    const {data, selectedItem} = this.props;

    let categories = [];
    let selectedTitle = 'All Tasks';
    categories.push(<MenuItem key="default" eventKey="default">{selectedTitle}</MenuItem>);

    if (data) {
      data.forEach(category => {
        if (category.Count) {
          if (String(category.Category) === selectedItem) {
            selectedTitle = category.Category + ' (' + category.Count + ')';
          }
          categories.push(
            <MenuItem key={utils.unique()} eventKey={category.Category}>
              <div className="clearfix">
                <div className="pull-left">
                  {category.Category}
                </div>
                <div className="pull-right">
                  <Badge className="badge-sm">{category.Count}</Badge>
                </div>
              </div>
            </MenuItem>
          );
        }
      });
    }


    return (
      <div className="fixed-title">
        <ButtonGroup className="title-dropdown">
          <DropdownButton id="file_manager-actions_dropdown" title={selectedTitle} bsStyle="link" bsSize="md" onSelect={this.handleSelect.bind(this)}>
            {categories}
          </DropdownButton>
        </ButtonGroup>
      </div>
    );
  }
}

// Validation.
TaskListHeader.propTypes = {
  data: React.PropTypes.array,
  selectedItem: React.PropTypes.string,
  onSelectItem: React.PropTypes.func
};


// Export.
export default TaskListHeader;
