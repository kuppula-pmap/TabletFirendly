import React from 'react';
import { connect } from 'react-redux';
import ModalArea from './components/ModalArea';
import Session from './modules/shell/components/Session';

// Shell actions.
import { setBrowserInfo } from './modules/shell/redux/actions/ui-actions';

import utils from './utils';


// Define class.
class App extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      windowWidth: utils.windowDimensions().width,
      windowHeight: utils.windowDimensions().height,
      pageYOffset: window.pageYOffset,
      startTimer: true,
    };
  }

  handleWindowResize() {
    const { dispatch } = this.props;
    const browserInfo = {
      width: utils.windowDimensions().width,
      height: utils.windowDimensions().height,
    };
    dispatch(setBrowserInfo(browserInfo));

    this.setState({
      windowWidth: utils.windowDimensions().width,
      windowHeight: utils.windowDimensions().height,
    });
  }
  // handleWindowScroll() { this.setState({ pageYOffset: window.pageYOffset }); }
  componentWillMount() {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize.bind(this));
    // window.addEventListener('scroll', this.handleWindowScroll.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize.bind(this));
    // window.removeEventListener('scroll', this.handleWindowScroll.bind(this));
  }

  // Render method.
  render() {
    return (
			<div>
				{this.props.children}
        <ModalArea />
        <Session />
			</div>
    );
  }

  // Get Child Context.
  getChildContext() {
    const { globalLang } = this.props;
    return {
      currentLanguage: globalLang.languageCode
    };
  }
}

// Validation.
App.propTypes = {
  children: React.PropTypes.node,
  globalLang: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

const mapStateToProps = (state) => ({
  globalLang: state.globalLang
});

App.childContextTypes = {
  currentLanguage: React.PropTypes.string.isRequired
};

// Export.
export default connect(mapStateToProps)(App);
