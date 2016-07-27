// Dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { ListGroup } from 'react-bootstrap';
import Icon from 'react-fa';

// Components
import UploadFile from './UploadFile';
import RowHeader from '../../../../../components/RowHeader';
import FileManagerRowLoader from '../FileManager/FileManagerRowLoader';

import { uploadDocument, resetUploadDocument } from '../../../redux/actions/upload-actions';

import utils from '../../../../../utils';

class Uploader extends Component {

  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      uploadedFiles: [],
    };
    this.clearUploaded = this.clearUploaded.bind(this);
  }

  componentWillMount() {
    this.clearUploaded();
  }

  clearUploaded() {
    const { dispatch } = this.props;

    this.setState({
      uploadedFiles: []
    });
    dispatch(resetUploadDocument());
  }

  // Set the initial file list to the local state.
  onDrop(files) {
    const { dispatch } = this.props;
    this.setState({
      uploadedFiles: files
    });
    files.forEach((f) => {
      dispatch(uploadDocument(f));
    });
  }

  render() {
    const { dmFolder, dmLookups, dmUpload } = this.props;
    const requestedDocumentsList = dmUpload.requestedItems ? dmUpload.requestedItems.slice().reverse() : [];
    const uploadedDocumentsList = dmUpload.uploadedItems ? dmUpload.uploadedItems.slice().reverse() : [];
    const pendingDocuments = dmFolder.items.Documents ? dmFolder.items.Documents : [];
    const pendingDocumentsList = pendingDocuments ? pendingDocuments.slice().reverse() : [];

    const requested = [];
    const uploaded = [];
    const pending = [];

    // Requested files.
    requestedDocumentsList.forEach(item => {
      requested.push(
        <UploadFile
          key={utils.unique()}
          file={item}
          isRequest
        />
      );
    });

    // Uploaded files.
    uploadedDocumentsList.forEach(item => {
      uploaded.push(
        <UploadFile
          key={utils.unique()}
          file={item}
          isUpload
        />
      );
    });

    // Pending files.
    pendingDocumentsList.forEach(item => {
      pending.push(
        <UploadFile
          key={utils.unique()}
          file={item}
        />
      );
    });

    // Lookup data.
    const lookupsData = dmLookups.items ? dmLookups.items : null;
    const userPermissions = lookupsData ? lookupsData.UserPermissions : null;
    const canAddDocument = userPermissions ? userPermissions.CanAddDocument : null;

    let styles = {
      base: {
        width: '100%',
        fontSize: 20,
        lineHeight: 1.6,
        textAlign: 'center',
        padding: '20px 40px',
        marginBottom: 10,
        border: '2px dashed #999999',
        borderRadius: 14,
      },
      actions: {
        marginTop: 6,
      },
    };
    const rowData = [
      {label: 'Type Name', sm: 9},
      {label: 'Actions', sm: 3, align: 'text-center'},
    ];

    // Check for empty list.
    let lists = [];
    if (requested || uploaded | pending) {
      lists.push(
        <div key={utils.unique()}>
          <RowHeader rowData={rowData} />
          <ListGroup className="file_manager-list">
            {requested}
            {uploaded}

            {!dmFolder.isFetching ?
              pending
            :
              <FileManagerRowLoader />
            }
          </ListGroup>
        </div>
      );
    } else {
      lists.push(
        <p key={utils.unique()}><strong>There are no uploaded documents.</strong></p>
      );
    }


    return (
      <div>
        {canAddDocument ?
          <Dropzone id="Upload_Dropzone"
            ref="dropzone"
            onDrop={this.onDrop.bind(this)}
            className="dropzone"
            accept=".doc, .xls, .ppt, .pdf, .png, .gif, .jpg"
            // Video formats for next release: .mov, .mpeg4, .mp4, .avi, .wmv, .mpegps, .3gpp, .webm
            style={styles.base}>
            <p>
              <Icon name="upload" className="fa-2x text-success" />
            </p>
            Drag and drop files here
            <br className="hidden-xs"/>{' '}
            or click to <a>select files</a> from your computer.
          </Dropzone>
        : null}

        <div className="card">
          {lists}
        </div>
      </div>
    );
  }
}

// propTypes.
Uploader.propTypes = {
  dispatch: PropTypes.func,
  dmFolder: PropTypes.object,
  dmLookups: PropTypes.object,
  dmUpload: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dmFolder: state.dmFolder,
  dmLookups: state.dmLookups,
  dmUpload: state.dmUpload
});

// Export.
export default connect(mapStateToProps)(Uploader);
