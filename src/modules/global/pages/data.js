// Dependencies.
import React from 'react';

// Core components.
import {Panel} from 'react-bootstrap';

// Utility methods.
import utils from '../../../utils';

// Layout components.
import Main from '../../../layouts/main';

// Misc components.
import MarsData from '../../../components/MarsData';


// Define class.
class Page extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    // Set page title.
    utils.title(props);

    this.state = {
      data: '[Select API]',
      url: '[url]',
      error: ''
    };
  }

  handleChange(e) {
    const el = e.target;
    const value = utils.trim(el.value);

    switch (value) {
    case '1':
      // call
      this.fetchTenantData();
      break;
    case '2':
      // call
      this.fetchAuthenticationData();
      break;
    case '3':
      // call
      this.fetchMenuData();
      break;
    default:
      this.setState({data: '[Select API]', url: '[url]'});
      break;
    }
  }

  componentDidMount() {
    // this.fetchTenantData();
    // this.fetchAuthenticationData();
    // this.fetchMenuData();

    // setInterval(this.fetchTenantData.bind(this), 2000);
  }

  // Tenant Call Sample.
  fetchTenantData() {
    let url = 'https://devsvc.pmapconnect.com/papi/tenant/code/108011';

    let sHeaders = new Headers();
    sHeaders.append('Accept-Language', 'en');
    sHeaders.append('ApplicationType', '4');

    let sInit = { method: 'GET',
               headers: sHeaders};

    // Fetch API call.
    fetch(url, sInit).then(r => r.text())
      .then(data => {
        this.setState({data, url});
      })
      .catch(error => {this.setState({error});});
  }

  // Authentication Call Sample
  fetchAuthenticationData() {
    let url = 'https://devsvc.pmapconnect.com/papi/auth';

    let sHeaders = new Headers();
    sHeaders.append('Accept-Language', 'en');
    sHeaders.append('ApplicationType', '4');
    sHeaders.append('TenantId', '3000');
    sHeaders.append('Accept', 'application/json');
    sHeaders.append('Content-Type', 'application/json');

    let sInit = { method: 'POST',
               headers: sHeaders,
               body: "{ 'Username': 'demouser', 'Password': 'Pdemo@1234' }"
    };

    // Fetch API call.
    fetch(url, sInit).then(r => r.text())
      .then(data => {this.setState({data, url});})
      .catch(error => {this.setState({error});});
  }

  // Menus Call Sample.
  fetchMenuData() {
    let url = 'https://devsvc.pmapconnect.com/papi/modulemenus';

    let sHeaders = new Headers();
    sHeaders.append('Accept-Language', 'pt');
    sHeaders.append('ApplicationType', '4');
    sHeaders.append('TenantId', '3000');
    sHeaders.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkZWZkMTVlZC1jODA1LTQxZWMtYjM1MS00YmNjMmE5YzBhZGUiLCJ0aWQiOiIzMDAwIiwidXNyIjoiZGVtb3VzZXIiLCJpc3MiOiJodHRwOi8vd3d3LnByb2Nlc3NtYXAuY29tIiwiYXVkIjoibG9jYWxob3N0OjQ5NDY5LGRldnN2Yy5wbWFwY29ubmVjdC5jb20sbG9jYWxob3N0OjgwODAiLCJleHAiOjE0NDcxNzUwNDEsIm5iZiI6MTQ0NzE2NzY2MX0.cynOn95ocrX-cL0wNjI_iicc0kJ6-qCz483MRoB_QBA');
    sHeaders.append('UserId', '1000');
    sHeaders.append('LocationId', '8840');

    let sInit = { method: 'GET',
               headers: sHeaders
    };

    // Fetch API call.
    fetch(url, sInit).then(r => r.text())
      .then(data => {this.setState({data, url});})
      .catch(error => {this.setState({error});});
  }

  // Render method.
  render() {
    return (
      <Main>
        <Panel header={<div>Mars Data Component : API Call Sample</div>} bsStyle="primary">
          <select id="selectApi" className="form-control" onChange={this.handleChange.bind(this)}>
            <option value="">Select API Call...</option>
            <option value="1">Tenant Call Sample</option>
            <option value="2">Authentication Call Sample</option>
            <option value="3">Menus Call Sample</option>
          </select>
        </Panel>
        <MarsData message="Response from the server" data={this.state.data} url={this.state.url} />
      </Main>
    );
  }
}


// Export.
export default Page;
