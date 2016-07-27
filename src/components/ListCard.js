// Dependencies.
import React from 'react';

// UI components
// import Panel from 'react-bootstrap/lib/Panel';
// import {Panel, Button} from 'react-bootstrap';


// Define class.
class ListCard extends React.Component {

  // Render method.
  render() {
    const { children, status } = this.props;

    return (
      <div className={`list-card ${status || 'default'}`}>
        {children}
      </div>
    );
  }
}

// Validation.
ListCard.propTypes = {
  children: React.PropTypes.node,
  status: React.PropTypes.string,
};

// Export.
export default ListCard;
