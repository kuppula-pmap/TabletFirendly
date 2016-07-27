// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

// Components.
import FileManagerBreadcrumb from './FileManagerBreadcrumb';
import RowHeader from '../../../../../components/RowHeader';
import FileManagerRows from './FileManagerRows';
import FileManagerRowLoader from './FileManagerRowLoader';


// Define class.
class FileManager extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      documentsData: this.props.documentsData,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {documentsData, isFetching} = nextProps;
    const documentData = nextProps.documentData.items ? nextProps.documentData.items : {};

    // Checking if folder has changed.
    if (this.props.isFetching === true && isFetching === false) {
      this.setState({ documentsData });
    } else {
      // Create a deep-nested copy of the documents data object.
      // let localData = JSON.parse(JSON.stringify(documentsData));
      let localData = _.extend([], this.state.documentsData);

      // Update local updates.
      if (documentsData) {
        documentsData.forEach((doc, index) => {
          if (documentData.Uid === doc.Uid) {
            localData[index] = documentData;
            this.setState({ documentsData: localData });
          }
        });
      }
    }
  }

  // Render method.
  render() {
    const { foldersData, documentData, breadcrumbData, currentFolderId, isFetching, noBreadcrumbs } = this.props;
    // fist time get from props, then keep it in local state.
    const documentsData = this.state.documentsData ? this.state.documentsData : this.props.documentsData;

    // const { dmModuleLabels } = this.props;
    // const {
    //   lblLegend,
    //   lblAction,
    //   lblAudit,
    //   lblOriginator,
    //   lblOpen
    // } = dmModuleLabels.items;
    //
    // const rowData = [
    //   {label: lblLegend, sm: 4},
    //   {label: lblAction, sm: 2, align: 'text-center'},
    //   {label: lblAudit, sm: 1, align: 'text-center'},
    //   {label: lblOriginator, sm: 2, align: 'text-center'},
    //   {label: lblOpen, sm: 3, align: 'text-center'},
    // ];

    const {
      labelTypeName,
      // labelInternalDocId,
      labelVersion,
      labelModified,
      labelStatus
    } = this.props.strings;

    const rowData = [
      {label: labelTypeName, sm: 6},
      // {label: labelInternalDocId || 'Internal Doc. ID', sm: 2, align: 'text-center'},
      {label: labelVersion, sm: 1, align: 'text-center'},
      {label: labelModified, sm: 2, align: 'text-center'},
      {label: labelStatus, sm: 3, align: 'text-center'},
    ];

    // console.log(foldersData);

    return (
      <div>
        {noBreadcrumbs ? null
        :
        <FileManagerBreadcrumb data={breadcrumbData} />
        }

        <div className="card">
          <RowHeader rowData={rowData} />
          {isFetching ?
            <FileManagerRowLoader />
          :
            <FileManagerRows foldersData={foldersData} documentsData={documentsData} documentData={documentData} currentFolderId={currentFolderId}/>
          }
        </div>
      </div>
    );
  }
}

// Validation.
FileManager.propTypes = {
  strings: React.PropTypes.object,
  foldersData: React.PropTypes.array,
  documentsData: React.PropTypes.array,
  documentData: React.PropTypes.object,
  breadcrumbData: React.PropTypes.array,
  currentFolderId: React.PropTypes.string,
  state: React.PropTypes.object,
  isFetching: React.PropTypes.bool,
  dmModuleLabels: React.PropTypes.object,
  noBreadcrumbs: React.PropTypes.bool,
};

FileManager.defaultProps = {
  strings: {
    labelTypeName: 'Type Name',
    labelVersion: 'Version',
    labelModified: 'Modified',
    labelStatus: 'Status'
  }
};

const mapStateToProps = (state) => ({
  dmModuleLabels: state.dmModuleLabels,
});

// Export.
export default connect(mapStateToProps)(FileManager);
