// Dependencies.
import React from 'react';
import { connect } from 'react-redux';

// Actions.
// import { fetchTenant } from '../../../redux/actions/tenant-actions';
// import { fetchAuth } from '../../../redux/actions/auth-actions';
// import { setConsumerId } from '../../../redux/actions/settings-actions';

// Utility methods.
import utils from '../../../utils';

// Layout components.
import Main from '../../../layouts/main';

// Misc components.
import Login from '../../../components/Login';


// Define class.
class Page extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    // Set page title.
    utils.title(props);
  }

  handleLogin(loginName, password) {
    // const {dispatch} = this.props;
    if (loginName === 'devuser' && password === 'Password2016') {
      // Get Tenant data and then call authentication action.
      // dispatch(fetchTenant('productfacelift.pmapconnect.com'))
      // .then(response => {
      //   dispatch(fetchAuth(response.tenant.Id));
      //   dispatch(setConsumerId(response.tenant.Id));
      // });
      // Redirect to document management page.
      this.props.history.pushState(null, '/document-management');
      return true;
    }
    return false;
  }

  // Render method.
  render() {
    return (
      <Main noHeader>
        <Login onLogin={this.handleLogin.bind(this)}/>
      </Main>
    );
  }
}

// Validation.
Page.propTypes = {
  history: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  state: React.PropTypes.object
};
const mapStateToProps = (state) => ({
  state
});

// Export.
export default connect(mapStateToProps)(Page);
