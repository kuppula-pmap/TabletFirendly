// Dependencies.
import React from 'react';

// Core components.
import {Panel, Well} from 'react-bootstrap';


// Define class.
class MarsData extends React.Component {
  constructor(props) {
    super(props);
  }

  // Render method.
  render() {
    const message = this.props.message;
    const url = this.props.url;
    const data = this.props.data;

    return (
      <div>
        <Well><strong>Server url:</strong> {url}</Well>
        <Panel header={<div>{message}</div>} bsStyle={data.match('"HttpStatusCode": 401') ? 'danger' : 'success'}>
          <pre style={{backgroundColor: '#dddddd'}}>data: {data}</pre>
        </Panel>
      </div>
    );
  }
}

// Validation.
MarsData.propTypes = {
  message: React.PropTypes.string,
  url: React.PropTypes.string,
  data: React.PropTypes.string,
};

// Export.
export default MarsData;
