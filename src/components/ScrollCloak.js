import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class ScrollCloak extends Component {

  constructor(props, defaultProps) {
    super(props, defaultProps);
    this.state = {
      handlerScrollTop: 0,
      handlerHide: true,
      height: 0,
      scrollHeight: 0,
      disableScroll: false,
      handlerHider: null,
      scrollHandler: null,
      handlerPositionTop: 0,
      lastPos: 0,
    };
  }

  updateHeight() {
    this.setState({
      height: ReactDOM.findDOMNode(this).offsetHeight,
      scrollHeight: ReactDOM.findDOMNode(this.refs.scroller).scrollHeight,
      disableScroll: true
    });
  }

  handleScroll(e) {
    let pos = e.target.scrollTop / (e.target.scrollHeight - this.state.height) * (1 - this.state.height / this.state.scrollHeight);
    this.setState({
      handlerScrollTop: pos * 100,
      handlerHide: false
    }, () => {
      this.handlerHider = setTimeout( () => {
        this.setState({ handlerHide: this.props.autoHide });
      }, 1500);
    });
    if (pos < 0.2 && pos < this.lastPos && this.props.onApproachingTop) {
      this.props.onApproachingTop();
    }
    if (pos > 0.6 && pos > this.lastPos && this.props.onApproachingBottom) {
      this.props.onApproachingBottom();
    }
    if (this.props.onScrolling) {
      this.props.onScrolling(pos, e.target.scrollTop);
    }
    this.lastPos = pos;
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('mousemove', this.handleHandlerMouseMove);
    document.addEventListener('mouseup', this.handleHandlerMouseUp);
    this.updateHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('mousemove', this.handleHandlerMouseMove);
    document.removeEventListener('mouseup', this.handleHandlerMouseUp);
  }

  render() {
    let styles = {
      ScrollBarStyles: {
        overflow: 'hidden',
        height: '100%',
        position: 'relative',
      },
      ScrollbarScrollbarStyles: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
      },
      ScrollbarHandlerStyles: {
        position: 'absolute',
        zIndex: 1,
      },
      ScrollbarScrollerStyles: {
        overflowY: 'auto',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '-20px',
        paddingRight: '20px',
      },
    };
    let dynamicStyles = Object.assign({}, { height: this.state.height / this.state.scrollHeight * 100 + '%', top: this.state.handlerScrollTop.toString() + '%' });
    let handlerStyles = Object.assign(dynamicStyles, styles.ScrollbarHandlerStyles);
    return (
      <div className="FreeScrollbar" style={styles.ScrollbarStyles}>
          { this.props.hideHandler ? '' :
            <div className="FreeScrollbar-scrollbar" style={styles.ScrollbarScrollbarStyles}>
              { this.state.disableScroll ? '' :
                <div className={'FreeScrollbar-handler ' + (this.state.handlerHide ? 'hide' : '')}
                     onMouseDown={this.handleHandlerMouseDown}
                     style={handlerStyles}
                     ref="handler">
                </div>
              }
            </div>
          }
          <div className="FreeScrollbar-scroller"
              onScroll={this.handleScroll}
              ref="scroller"
              style={styles.ScrollbarScrollerStyles}>
              {this.props.children}
          </div>
      </div>
    );
  }
}

ScrollCloak.defaultProps = {
  autoHide: false,
  hideHandler: false
};

// Validation
ScrollCloak.propTypes = {
  autoHide: React.PropTypes.bool,
  hideHandler: React.PropTypes.bool,
  onApproachingTop: React.PropTypes.func,
  onApproachingBottom: React.PropTypes.func,
  onScrolling: React.PropTypes.func
};
