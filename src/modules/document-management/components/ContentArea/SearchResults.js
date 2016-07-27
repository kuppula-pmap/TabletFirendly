// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

// Core components.
// import {Row, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
// import Icon from 'react-fa';
// import RowHeader from '../../../../components/RowHeader';
// import Card from '../../../../components/Card/Card';
import Filter from './Filter';

// Components.
import FileManager from './FileManager/FileManager';

// Define class.
class SearchResults extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      showFilter: true,
      isFiltered: true,
    };
  }

  handleFilterToggle() {
    this.setState({ showFilter: !this.state.showFilter });
  }

  // Render method.
  render() {
    // File Manager data
    const { dmFilter, dmDocument } = this.props;
    const documentsData = dmFilter.items ? dmFilter.items : [];
    const { isFetching} = dmFilter;

    return (
      <div style={{marginTop: '20px'}}>

        { this.state.showFilter ?
          <Filter handleFilterToggle={this.handleFilterToggle.bind(this)} />
        : null }

        {/* FileManager component */}
        <FileManager
          documentsData={documentsData}
          documentData={dmDocument}
          isFetching={isFetching}
          noBreadcrumbs
        />
      </div>
    );
  }
}

// propTypes.
SearchResults.propTypes = {
  dispatch: React.PropTypes.func,
  dmDocument: React.PropTypes.object,
  dmFilter: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  dmDocument: state.dmDocument,
  dmFilter: state.dmFilter,
});

// Export.
export default connect(mapStateToProps)(SearchResults);
