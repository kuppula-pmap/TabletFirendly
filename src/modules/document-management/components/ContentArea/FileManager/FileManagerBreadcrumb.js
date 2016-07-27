// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';
import Icon from 'react-fa';


// Doc Mgt actions.
import { DM_RIGHT_PANEL_ACTIVITY } from '../../../redux/constants/ui-constants';
import { changeFolder, setRightPanelAreaView } from '../../../redux/actions/ui-actions';
import { fetchFolder } from '../../../redux/actions/folder-actions';


// Define class.
class FileManagerBreadcrumb extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
  }

  handleClick(id) {
    const { dispatch } = this.props;
    // Redux action.
    dispatch(changeFolder(id));
    dispatch(fetchFolder(id));
    dispatch(setRightPanelAreaView(DM_RIGHT_PANEL_ACTIVITY));
  }

  // Render method.
  render() {
    const breadcrumbsData = this.props.data;
    let breadcrumbs = [];

    if (breadcrumbsData) {
      breadcrumbsData.forEach((item, index) => {
        if (item.Uid !== '00000000-0000-0000-0000-000000000000') {
          // Breadcrumb array is reversed.
          if (index === 0) {
            breadcrumbs.push(<BreadcrumbItem active key={item.Uid}>{item.Description}</BreadcrumbItem>);
          } else {
            breadcrumbs.push(<BreadcrumbItem onClick={this.handleClick.bind(this, item.Uid)} key={item.Uid + item.Description}>{item.Description}</BreadcrumbItem>);
          }
        }
      });
    }

    let styles = {
      base: {
        padding: '6px 2px 0',
        marginBottom: 0,
        background: 'transparent',
      },
    };

    return (
      <Breadcrumb style={styles.base}>
        <BreadcrumbItem onClick={this.handleClick.bind(this, 'root')} key={'root'}><Icon name="home"/></BreadcrumbItem>
        {breadcrumbs}
      </Breadcrumb>
    );
  }
}

// Validation.
FileManagerBreadcrumb.propTypes = {
  data: React.PropTypes.array,
  dispatch: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

// Export.
export default connect(mapDispatchToProps)(FileManagerBreadcrumb);
