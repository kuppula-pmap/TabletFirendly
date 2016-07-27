// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

// Components.
import FileManager from './FileManager/FileManager';


// Define class.
class Default extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
    this.counter = 0;
  }

  // Render method.
  render() {
    // File Manager data
    const { dmFolder, dmDocument } = this.props;
    const currentId = dmFolder.items ? dmFolder.items.Uid : 0;
    const breadcrumbData = dmFolder.items.Breadcrumbs ? dmFolder.items.Breadcrumbs : [];
    const foldersData = dmFolder.items.Subfolders ? dmFolder.items.Subfolders : [];
    const documentsData = dmFolder.items.Documents ? dmFolder.items.Documents : [];
    const { isFetching} = dmFolder;

    this.counter += 1;
    // console.log('default page -> render counter: ', this.counter);

    return (
      <div>
        {/* FileManager component */}
        <FileManager
          foldersData={foldersData}
          breadcrumbData={breadcrumbData}
          documentsData={documentsData}
          documentData={dmDocument}
          currentFolderId={currentId}
          isFetching={isFetching}
        />
      </div>
    );
  }
}

// propTypes.
Default.propTypes = {
  dispatch: React.PropTypes.func,
  dmFolder: React.PropTypes.object,
  dmDocument: React.PropTypes.object
};
const mapStateToProps = (state) => ({
  dmFolder: state.dmFolder,
  dmDocument: state.dmDocument,
});

// Export.
export default connect(mapStateToProps)(Default);
