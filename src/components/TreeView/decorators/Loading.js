import React from 'react';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={this.props.style}>
        Loading...
      </div>
    );
  }
}

Loading.propTypes = {
  style: React.PropTypes.object
};

export default Loading;
