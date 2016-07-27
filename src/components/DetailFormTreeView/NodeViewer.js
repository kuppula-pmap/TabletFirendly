import React from 'react';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

class NodeViewer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let styles = {
      component: {
        width: '50%',
        display: 'inline-block',
        verticalAlign: 'top',
        padding: '20px',
        '@media (max-width: 640px)': {
          width: '100%',
          display: 'block'
        }
      },
      searchBox: {
        padding: '20px 20px 0 20px'
      },
      viewer: {
        base: {
          fontSize: '12px',
          whiteSpace: 'pre-wrap',
          backgroundColor: '#282C34',
          border: 'solid 1px black',
          padding: '20px',
          color: '#9DA5AB',
          minHeight: '250px'
        }
      }
    };
    const style = styles.viewer;
    let json = JSON.stringify(this.props.node, null, 4);
    if (!json) { json = HELP_MSG; }
    return (
      <div style={style.base}>
          {json}
      </div>
    );
  }
}

NodeViewer.propTypes = {
  node: React.PropTypes.object
};

export default NodeViewer;
