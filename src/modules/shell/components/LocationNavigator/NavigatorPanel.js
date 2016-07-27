import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import Loader from '../../../../components/Loader';
import Icon from '../../../../components/Icon';
import NavigatorTree from './NavigatorTree';
import NavigatorList from './NavigatorList';


class NavigatorPanel extends React.Component {

  handlePanelToggleClick(e) {
    const { shUi } = this.props;

    // Close Navigator if pinned.
    if (shUi.isNavigatorPinned) {
      this.props.handlePinningClick(e);
      return;
    }

    // Close Navigator if open.
    if (shUi.isNavigatorOpen) this.props.handlePanelToggleClick(e);
  }

  handleViewToggleClick(e) {
    this.props.handleViewToggleClick(e);
  }
  handleInputFocusToggle(bool) {
    this.props.handleInputFocusToggle(bool);
  }
  handleNavigatorInputOnChange(e) {
    this.props.handleNavigatorInputOnChange(e);
  }
  handleInputClearClick() {
    this.props.handleInputClearClick();
  }

  render() {
    const {
      isLoading,
      styles,
      inputValue,
      inputFocus,
      treeView,
      shRecentLocationsList,
      shLocationsList,
      shModuleLabels
    } = this.props;

    // Shell module labels.
    const shModuleLabelsItems = shModuleLabels.items;
    const lblLoading = shModuleLabelsItems ? shModuleLabelsItems.lblLoading : null;
    const lblRecent = shModuleLabelsItems ? shModuleLabelsItems.lblRecent : null;
    const lblTapToCloseTreeView = shModuleLabelsItems ? shModuleLabelsItems.lblTapToCloseTreeView : null;
    const lblRecordsFound = shModuleLabelsItems ? shModuleLabelsItems.lblRecordsFound : null;
    const lblTypeToSearchAllLocationsAndLevels = shModuleLabelsItems ? shModuleLabelsItems.lblTypeToSearchAllLocationsAndLevels : null;
    const lblCancel = shModuleLabelsItems ? shModuleLabelsItems.lblCancel : null;
    const lblFind = shModuleLabelsItems ? shModuleLabelsItems.lblFind : null;

    const data = !inputValue.length && shRecentLocationsList.items.length ?
      shRecentLocationsList.items : shLocationsList.items;
    // console.log('data:', data);
    let FilteredResults = data.filter( (result) => (
      result.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
    ));
    // console.log('FilteredResults:', FilteredResults);

    const inputIsFocused = inputFocus && inputValue.length === 0;

    let statusLabel = '';
    if (isLoading) {
      statusLabel = lblLoading;
    } else if (!inputFocus) {
      statusLabel = lblRecent;
    }

    let statusBar;
    let treeviewButton;
    let locationViews;
    if (treeView) {
      statusBar = (
        <span className="text-uppercase" onClick={this.handleViewToggleClick.bind(this)}>
          {lblTapToCloseTreeView}
        </span>
      );
      treeviewButton = <Icon name="close-o" size="2x" fixedWidth onClick={this.handleViewToggleClick.bind(this)} />;
      locationViews = <NavigatorTree styles={styles} />;
    } else {
      statusBar = (
        <div>
          {inputValue.length ?
            <span>{lblRecordsFound}</span>
            // <span>{FilteredResults.length} record{FilteredResults.length !== 1 ? 's' : ''} found</span>
          :
            <span className="text-uppercase">{statusLabel}</span>
          }
        </div>
      );
      treeviewButton = <Icon name="flowchart-o" size="2x" fixedWidth />;
      if (inputIsFocused) {
        locationViews = (
          <ul className="nav" style={styles.listText}>
            <li className="text-center">
              <p className="lead">{lblTypeToSearchAllLocationsAndLevels}</p>
              <Button bsStyle="default" bsSize="sm">{lblCancel}</Button>
            </li>
          </ul>
        );
      } else {
        locationViews = <NavigatorList styles={styles} FilteredResults={FilteredResults} />;
      }
    }

    return (
      <div className="navgiator-panel" style={styles.navigatorPanel}>

        <div style={styles.closeNavigatorButton} onClick={this.handlePanelToggleClick.bind(this)}>
          <div className="text-right" style={styles.resultsStatusBar}>
            <span className="text-uppercase"> Close </span>
            &nbsp;&nbsp;
            <Icon name="close-o" fixedWidth />
          </div>
        </div>

        <div className={`navigator-input-bar clearfix ${inputFocus ? '--focused' : ''}`}
          style={styles.navigatorInputBar}
          onFocus={this.handleInputFocusToggle.bind(this, true)}
          onBlur={this.handleInputFocusToggle.bind(this, false)}
        >

          <Icon name="search-o" fixedWidth size="lg" style={styles.navigatorInputIcon} />

          <input
            id="navigator_input_field"
            type="search"
            placeholder={lblFind}
            value={inputValue}
            onChange={this.handleNavigatorInputOnChange.bind(this)}
            className="navigator-input pull-left"
            style={styles.navigatorInput}
          />

          {inputValue.length ?
            <Icon name="close-o" fixedWidth size="lg" style={styles.navigatorInputClearIcon}
                  onClick={this.handleInputClearClick.bind(this)}
                  data-id={`shell_navigator-panel_icon_close-panel`}/>
          : null}

        </div>

        <div className="navigator-results-status-bar" style={styles.resultsStatusBar}>
          {statusBar}
          {!isLoading ?
            <a href className={`navigator-view-toggle-btn ${treeView ? 'active' : ''}`}
               style={styles.viewToggleButton}
               onClick={this.handleViewToggleClick.bind(this)}
               data-id={`shell_navigator-panel_anchor_navigator-toggle`}>
               {treeviewButton}
            </a>
          : null}
        </div>

        {isLoading ?
          <Loader />
        :
          locationViews
        }

      </div>
    );
  }
}

NavigatorPanel.propTypes = {
  isLoading: React.PropTypes.bool,
  inputValue: React.PropTypes.string,
  inputFocus: React.PropTypes.bool,
  treeView: React.PropTypes.bool,
  handlePinningClick: React.PropTypes.func,
  handlePanelToggleClick: React.PropTypes.func,
  handleViewToggleClick: React.PropTypes.func,
  handleInputFocusToggle: React.PropTypes.func,
  handleNavigatorInputOnChange: React.PropTypes.func,
  handleInputClearClick: React.PropTypes.func,
  styles: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  shUi: React.PropTypes.object,
  shRecentLocationsList: React.PropTypes.object,
  shLocationsList: React.PropTypes.object,
  shModuleLabels: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
  shRecentLocationsList: state.shRecentLocationsList,
  shLocationsList: state.shLocationsList,
  shModuleLabels: state.shModuleLabels,
});

// Export.
export default connect(mapStateToProps)(NavigatorPanel);
