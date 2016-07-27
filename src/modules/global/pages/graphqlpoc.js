// Dependencies.
import React from 'react';

// Utility methods.
import utils from '../../../utils';

// Layout components.
import Main from '../../../layouts/main';

// Misc components.
import GraphQLPOC from '../../../components/GraphQLPOC';


// Define class.
class Page extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    // Set page title.
    utils.title(props);

    this.state = {
      data: {},
      url: '',
      error: ''
    };
  }

  // GraphQL query Call Sample.
  fetchData() {
    let url = `http://localhost:8081/graphql?query=`;

    let query = `query {
        document {
          id
        }
      }`;

    let urlQuery = url + query;

    // Fetch API call.
    fetch(urlQuery).then(r => r.json())
      .then(data => {
        this.setState({data: data.data, url: urlQuery});
      })
      .catch(error => {this.setState({error});});
  }

  // Render method.
  render() {
    return (
      <Main>
        <GraphQLPOC
          title="GraphQL POC: This is a React Component loading data from a GraphQL server,"
          data={this.state.data}
          url={this.state.url}
          onFetchData = {this.fetchData.bind(this)}
        />
      </Main>
    );
  }
}


// Export.
export default Page;
