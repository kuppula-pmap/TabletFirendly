// Dependencies.
import React from 'react';

// Core components.
// import {ListGroup} from 'react-bootstrap';

// Components.
import FileManagerRowFolder from './FileManagerRowFolder';
import FileManagerRowDocument from './FileManagerRowDocument';

import utils from '../../../../../utils';

// Define class.
class FileManagerRows extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
  }

  // Render method.
  render() {
    const {foldersData, documentsData, documentData} = this.props;
    const selectedDocument = documentData ? documentData.items : {};
    const docUid = documentData.items ? documentData.items.Uid : null;

    let rows = [];
    // Folders.
    if (foldersData) {
      utils.alphabetizeByKey(foldersData, 'Description').forEach(folder => {
        if (folder.Uid) {
          rows.push(<FileManagerRowFolder data={folder} key={folder.Uid + folder.Description} />);
        }
      });
    }

    // Documents.
    if (documentsData) {
      utils.alphabetizeByKey(documentsData, 'Title').forEach(document => {
        // Versions.
        const versions = document.Versions;
        versions.forEach(version => {
          if (document.Uid === documentData.requestedDocumentId && version.Uid === documentData.requestedVersionId && documentData.isFetching) {
            rows.push(<FileManagerRowDocument isFetching={documentData.isFetching} isSelected={false} docData={document} verData={version} key={version.Uid + document.Title} />);
          } else if (document.Uid === docUid && version.Uid === documentData.requestedVersionId) {
            rows.push(<FileManagerRowDocument isFetching={false} isSelected docData={selectedDocument} verData={version} key={version.Uid + document.Title} />);
          } else {
            rows.push(<FileManagerRowDocument isFetching={false} isSelected={false} docData={document} verData={version} key={version.Uid + document.Title} />);
          }
        });
      });
    }

    return (
      <div className="file_manager-list">
        {rows}
      </div>
    );
  }
}

// Validation.
FileManagerRows.propTypes = {
  foldersData: React.PropTypes.array,
  documentsData: React.PropTypes.array,
  documentData: React.PropTypes.object,
  currentFolderId: React.PropTypes.string
};


// Export.
export default FileManagerRows;
