// Dependencies.
import React from 'react';
import { connect } from 'react-redux';


// UI components
// import {Panel, Button} from 'react-bootstrap';
import { fetchFolder } from '../modules/document-management/redux/actions/folder-actions';
import utils from '../utils';


// Define class.
class Info extends React.Component {

  handleClickGetFolder() {
    const { dispatch } = this.props;
    // Async action sample.
    dispatch(fetchFolder('root'));
  }

  handleClickSaveFolder() {
    const { dmFolder } = this.props;
    utils.save(dmFolder.items);
  }

  // Render method.
  render() {
    const { globalSettings, globalAuth } = this.props;
    // Temporary info.
    const consumerId = globalSettings ? globalSettings.consumerId : 'No consumerId';
    const token = globalSettings ? globalSettings.authorizationToken : 'No Token';
    const error = globalAuth.error ? globalAuth.error.ErrorMessage : 'No errors';

    const styles = {
      base: {
        padding: 20,
      },
    };

    const message = (
      <div>
        consumerId = {consumerId}
        <div className="ellipsis-overflow">
          authorizationToken = {token}
        </div>
        error = {error}
      </div>
    );

    return (
      <div style={styles.base}>
        <div>{message}</div>
        {/*
        <div><button onClick={this.handleClickGetFolder.bind(this)}>Get Folder</button></div>
        <div><button onClick={this.handleClickSaveFolder.bind(this)}>Save Folder json</button></div>
        */}
      </div>
    );
  }
}

// Validation.
Info.propTypes = {
  dispatch: React.PropTypes.func,
  globalSettings: React.PropTypes.object,
  globalAuth: React.PropTypes.object,
  dmFolder: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  globalSettings: state.globalSettings,
  globalAuth: state.globalAuth,
  dmFolder: state.dmFolder,
});

// Export.
export default connect(mapStateToProps)(Info);
