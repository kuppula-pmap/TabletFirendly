// Dependencies.
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Input } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import Main from '../../../layouts/main';
import Loader from '../../../components/Loader';
import Card from '../../../components/Card/Card';
import Icon from '../../../components/Icon';
import ListLinks from '../../../components/ListLinks';

// Shell actions.
import { fetchModuleMenuSetup } from '../../shell/redux/actions/moduleMenuSetup-actions';
import { fetchBreadcrumbs } from '../../../modules/shell/redux/actions/breadcrumbs-actions';

// Utility methods.
import utils from '../../../utils';


// Define class.
class SetupLandingPage extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    // Set page title.
    utils.title(props);

    this.state = {
      counter: 0,
      isLoading: true,
      parentId: this.props.location.query.id,
      data: [],
      filteredData: [],
      filterText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, globalSettings, shModuleMenuSetup } = nextProps;
    const { isLoading } = this.state;
    const parentId = nextProps.location.query.id;

    if (globalSettings.authorizationToken) {
      // Fetch breadcrumb api.
      if (!isNaN(parentId)) {
        // console.log('DISPATCH:', parentId);
        dispatch( fetchBreadcrumbs(parentId) );
      }
      // Make sure user is logged in and authorization token exists before calling api.
      if (isLoading || parentId !== this.props.location.query.id || globalSettings.locationId !== this.props.globalSettings.locationId || globalSettings.levelId !== this.props.globalSettings.levelId) {
        dispatch( fetchModuleMenuSetup(parentId) );
        this.setState({ isLoading: false });
      }
    }
    // If moduleMenuSetup is loaded and comp state isLoading is false.
    if (!shModuleMenuSetup.isFetching && !isLoading) {
      this.setState({ data: shModuleMenuSetup.items });
      this.setState({ filteredData: shModuleMenuSetup.items });
      this.setState({ parentId });

      // Reset component loader.
      // this.setState({ isLoading: true });
    }
  }

  resetMasonryLayout() {
    // This is a hack from the react-masonry issues board as of 5/12/16.
    this.setState({ counter: this.state.counter++ });
    // console.log('masonry.layout()');
    this.masonry.layout();
  }

  childrenFilterLoop(childrenData, filter) {
    const childMatches = [];
    childrenData.map( child => {
      // console.log('---> child', child.Name);
      if (child.Name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        child.isDisabled = false;
      } else {
        child.isDisabled = true;
      }
      childMatches.push(child);
    });
    return childMatches;
  }

  filterOnKeyUp(e) {
    const { data } = this.state;
    const filterText = e.target.value;

    // Duplicate original data object to filter by using {{ lodash => _.cloneDepp() }}.
    // DO NOT filter original data object because it will be mutated.
    const dataToFilter = _.cloneDeep(data);

    // console.log('dataToFilter:', dataToFilter);
    // console.log('filterText:', filterText.length);

    // If find/search field is empty, return full data object.
    if (!filterText.length) {
      // console.log('filterText is empty');
      // console.log(data);
      this.setState({ filteredData: data, filterText: '' });
      return;
    }

    // Setup empty array to handle matched data items.
    let filterMatches = [];

    // Map through dataToFilter object.
    dataToFilter.map( parentItem => {
      // console.log('================================================================');

      // Filter match text from find/search field.
      // result.Name.toLowerCase().indexOf(filter.toLowerCase()) !== -1

      // Init parent match as false.
      let parentMatch = false;

      // console.log('parent:', parentItem.Name);

      // Loop through children.
      // OPTION 1: map() <-- Currently using this option.
      const filteredChildren = this.childrenFilterLoop(parentItem.Children, filterText);

      // OPTION 2: filter()
      // const filteredChildren = parentItem.Children.filter( (child) => (
      //   // Check for child item match
      //   child.Name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      // ));

      // Make filteredChildren the child node of the parentItem.
      parentItem.Children = filteredChildren;

      // console.log('filteredChildren:', filteredChildren.length, filteredChildren);

      // If child match, force parent as match even if the parent itself is not a match.
      if (filteredChildren.length || parentItem.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
        parentMatch = true;
      }

      // console.log('parentMatch', parentMatch);

      // Check if child match forced parent as match.
      if (parentMatch) {
        filterMatches.push(parentItem);
      }

      // Check if parent name matches value of the find/search field.

      // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    });

    // Return filtered data.
    // console.log('filtered matches:', filterMatches);
    this.setState({ filteredData: filterMatches, filterText });
    // this.setState({ filteredData: data });
  }

  disabledChildrenCount(children) {
    let count = children.length;
    children.map( item => {
      if (item.isDisabled) count--;
    });
    return count;
  }


  // Render method.
  render() {
    const { shModuleMenuSetup, shFlatModuleMenu, shModuleLabels, globalSettings } = this.props;
    const { counter, data, filteredData, filterText } = this.state;
    const parentId = this.props.location.query.id;
    // Shell module labels.
    const shModuleLabelsItems = shModuleLabels.items;
    const lblLoading = shModuleLabelsItems ? shModuleLabelsItems.lblLoading : null;
    const IsLevelDisplay = globalSettings.selectedMenuItem.IsLevelDisplay;
    const locationId = globalSettings.locationId;
    // console.log('data:', data);
    // console.log('filteredData:', filteredData);
    const styles = {
      content: {
        padding: 20,
      },

      icon: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
      },

      search: {
        display: 'inline-block',
        width: 200,
        height: 20,
        marginLeft: 6,
      },
    };

    const flatMenu = shFlatModuleMenu.items ? shFlatModuleMenu.items : null;
    let title = lblLoading;
    let filteredItemCount = 0;

    const filteredItems = filteredData.map( item => {
      // Check if parent item title matches filter search field.
      const parentMatch = item.Name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
      // console.log(parentMatch, item.Name);

      const disabledChildrenCount = this.disabledChildrenCount(item.Children);
      // console.log(disabledChildrenCount, item.Name);

      // Return if item has children.
      if (parentMatch || disabledChildrenCount) {
        filteredItemCount++;

        // console.log('filterText:', filterText);
        return (
          <li key={utils.unique()} className="masonry-grid-list-item" style={styles.item}>
            <Card title={item.Name}>
              <ListLinks data={item.Children} parentMatch={parentMatch} />
            </Card>
          </li>
        );
      }
    });

    // console.log('=====================================');

    let setupList = <Loader theme="dark" />;
    if (!shModuleMenuSetup.isFetching && data) {
      setupList = (
        <Masonry
          options={{ transitionDuration: 0 }}
          // ref={ref => this.masonry = ref.masonry}
          className={`nav masonry-grid coutner-${counter}`}
          elementType={'ul'}>
          {filteredItems}
        </Masonry>
      );

      // Match query parentId from flat module menu .
      if (flatMenu) {
        flatMenu.forEach(item => {
          if (item.Id === Number(parentId)) {
            title = item.Name;
            return false;
          }
        });
      }
    }

    const noResultsLabel = !shModuleMenuSetup.isFetching && data ? 'No results found.' : null;


    return (
      <Main>

        {!shModuleMenuSetup.isFetching && data && (IsLevelDisplay || (!IsLevelDisplay && locationId > 0)) ?
          <div className="page-header clearfix">
            <div className="pull-left">
              <h1>{title}</h1>
            </div>

            <div className="pull-right page-header-button-group">

              <div className="has-primary-addon" style={styles.search}>
                <Input
                  type="search"
                  addonAfter={(<Icon name="search-o" style={styles.icon} />)}
                  bsSize="small"
                  placeholder="Find on page"
                  onKeyUp={this.filterOnKeyUp.bind(this)} className="focus-bg"/>
              </div>

            </div>
          </div>
        : null }

        <div style={styles.content}>
          {filteredItemCount ?
            setupList
          :
            <h4 className="text-center">{ IsLevelDisplay || (!IsLevelDisplay && locationId > 0) ? noResultsLabel : 'Please select a Location from the Navigator' }</h4>
          }
        </div>

      </Main>
    );
  }
}

// Validation.
SetupLandingPage.propTypes = {
  location: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  globalSettings: React.PropTypes.object,
  shModuleMenuSetup: React.PropTypes.object,
  shFlatModuleMenu: React.PropTypes.object,
  shModuleLabels: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  globalSettings: state.globalSettings,
  shModuleMenuSetup: state.shModuleMenuSetup,
  shFlatModuleMenu: state.shFlatModuleMenu,
  shModuleLabels: state.shModuleLabels,
});

// Export.
export default connect(mapStateToProps)(SetupLandingPage);
