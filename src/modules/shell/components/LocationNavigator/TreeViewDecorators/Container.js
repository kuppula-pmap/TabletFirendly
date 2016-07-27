import React from 'react';
import {connect} from 'react-redux';
import radium from 'radium';
import {VelocityComponent} from 'velocity-react';
import Ficon from 'react-fa';

// Global actions.
import { setLocationId, setLevelId, setLocationLevelName } from '../../../../../redux/actions/settings-actions';
import { postAspSettings } from '../../../../../redux/actions/aspSettings-actions';
import { postAspLegacySession } from '../../../../../redux/actions/aspLegacySession-actions';

// Shell actions.
import {
  // setMenuRefreshCounter,
  toggleLeftSidebar,
  setLeftSidebarDepth,
  toggleNavigator
} from '../../../redux/actions/ui-actions';
import { fetchModuleMenu } from '../../../redux/actions/moduleMenu-actions';
import { fetchFlatModuleMenu } from '../../../redux/actions/flatModuleMenu-actions';
import { postCurrentLocation } from '../../../redux/actions/currentLocation-actions';
import { setModalView, toggleModal, isDirty } from '../../../../../redux/actions/ui-actions';
import { SH_MODAL_AUTO_ALERT } from '../../../redux/constants/ui-constants';
import { shSetSelectedMenuItemForDirty } from '../../../redux/actions/settings-actions';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  handleHeaderClick() {
    const { dispatch, shUi, node } = this.props;
    let _isDirty = isDirty();
    if (!_isDirty) {
      // console.log('node.name.length', node.name.length);
      if (node.name.length) {
      // console.log('Container.js/handleHeaderClick() => Node name:', node.name);

        // Set global location id.
        if (node.type === 'Location') {
          dispatch( setLocationId(node.typeId) );
          dispatch( setLevelId(0) );
        } else {
          dispatch( setLocationId(0) );
          dispatch( setLevelId(node.typeId) );
        }
        // Set Location/Level Name in globalSettings.locationLevelName
        dispatch( setLocationLevelName(node.name) );

        // Rerender module menu.
        // dispatch( setMenuRefreshCounter(shUi.refreshCounter + 1) );
        dispatch(fetchModuleMenu());
        dispatch(fetchFlatModuleMenu());
        // Set shell location id.
        dispatch( postCurrentLocation(node.type, node.typeId) );

        // Close Navigator.
        if (!shUi.isNavigatorPinned) {
          dispatch( toggleNavigator( !shUi.isNavigatorOpen ) );
          // console.log('isNavigatorOpen', shUi.isNavigatorOpen);
        }

        // Update asp sessions.
        dispatch( postAspSettings() );
        dispatch( postAspLegacySession() );

        // Set depth.
        dispatch(setLeftSidebarDepth(0));

        // Toggle left sidebar
        if (shUi.leftSidebarOpened) dispatch(toggleLeftSidebar(shUi.leftSidebarOpened));
      }
    } else {
      let data = node;
      dispatch(shSetSelectedMenuItemForDirty(data));
      dispatch(setModalView(SH_MODAL_AUTO_ALERT));
      dispatch(toggleModal(true));
    }
  }

  renderToggle() {
    const animations = this.props.animations;
    if (!animations) { return this.renderToggleDecorator(); }
    return (
      <VelocityComponent ref="velocity"
        duration={animations.toggle.duration}
        animation={animations.toggle.animation} >
          { this.renderToggleDecorator() }
      </VelocityComponent>
    );
  }

  renderToggleDecorator() {
    const {style, decorators} = this.props;
    return (
      <decorators.Toggle style={style.toggle} />
    );
  }

  render() {
    const {style, decorators, terminal, node, onClick} = this.props;

    return (
      <div className="clearfix" style={style.container}>
        { !terminal && node.children.length > 0 ?
          <span onClick={onClick} id={`shell_container_span_toggle_${node.id}`}>
            <Ficon name="minus" style={{ position: 'absolute', top: 5, left: 6 }} />
            {this.renderToggle()}
          </span>
        : null }
        <decorators.Header node={node} style={style.header} handleHeaderClick={this.handleHeaderClick.bind(this)} />
      </div>
    );
  }

}

Container.propTypes = {
  style: React.PropTypes.object.isRequired,
  decorators: React.PropTypes.object.isRequired,
  terminal: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  animations: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool
  ]).isRequired,
  node: React.PropTypes.object.isRequired,
  custom: React.PropTypes.string,

  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
});

export default connect(mapStateToProps)(radium(Container));
