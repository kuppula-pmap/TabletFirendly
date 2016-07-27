// Dependencies.
import React from 'react';

// UI components
import {Panel, Well, ListGroup, ListGroupItem, Button} from 'react-bootstrap';

// Utility methods.
import utils from '../utils';

// Define class.
class GraphQLPOC extends React.Component {

  handleButtonClick(e) {
    e.preventDefault();
    this.props.onFetchData();
  }

  // Render method.
  render() {
    const title = this.props.title;
    const url = this.props.url;
    const data = this.props.data;
    let rows = [];

    if (data.document) {
      data.document.forEach(row => {
        // Get the list of keys.
        let myKeys = Object.keys(row).map((key, index, arr) => (index === arr.length - 1) ? key : key + ',');

        // Create a ListGroupItem component
        rows.push(
          <ListGroupItem
            key={utils.unique()}
            header={`id: ${row.id}`}>
            {myKeys}
          </ListGroupItem>
        );
      });
    }

    return (
      <div>
        <Panel header={title} bsStyle="info">
          <Well><strong>Server url:</strong> {url}</Well>

          <Button onClick={this.handleButtonClick.bind(this)}>Get Data</Button>

          <ListGroup>
              {rows}
            </ListGroup>
          </Panel>

          <pre style={{backgroundColor: '#dddddd'}}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}

// Validation.
GraphQLPOC.propTypes = {
  title: React.PropTypes.string,
  url: React.PropTypes.string,
  data: React.PropTypes.object,
  onFetchData: React.PropTypes.func
};

// Export.
export default GraphQLPOC;
