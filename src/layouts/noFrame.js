import React from 'react';
import { connect } from 'react-redux';
import { setBrowserInfo } from '../modules/shell/redux/actions/ui-actions';

import utils from '../utils';

// Define class.
class Layout extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      windowWidth: utils.windowDimensions().width,
      windowHeight: utils.windowDimensions().height,
      pageYOffset: window.pageYOffset,
    };
  }

  handleWindowResize() {
    const { dispatch } = this.props;
    const browserInfo = {
      width: utils.windowDimensions().width,
      height: utils.windowDimensions().height,
    };
    dispatch(setBrowserInfo(browserInfo));
  }
  // handleWindowScroll() { this.setState({ pageYOffset: window.pageYOffset }); }
  componentWillMount() {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize.bind(this));
    // window.addEventListener('scroll', this.handleWindowScroll.bind(this));
  }
  componentUnmount() {
    window.removeEventListener('resize', this.handleWindowResize.bind(this));
    // window.removeEventListener('scroll', this.handleWindowScroll.bind(this));
  }

  // Render method.
  render() {
    let styles = {
      base: {
        paddingLeft: 40,
        transition: 'all .5s ease',
      },
    };

    return (
      <div id="shellWrapper" style={styles.base}>
        {this.props.children}
      </div>
    );
  }
}

// Validation.
Layout.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

// Export.
export default connect(mapDispatchToProps)(Layout);
