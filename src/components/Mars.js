// Dependencies.
import React from 'react';


// Define class.
class Mars extends React.Component {

  // Render method.
  render() {
    const { title } = this.props;

    return (
      <div>
        {title}
      </div>
    );
  }
}

// Validation.
Mars.propTypes = {
  title: React.PropTypes.string
};

// Export.
export default Mars;
