// Dependencies.
import React from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router';
import { Collapse } from 'react-bootstrap';
import NavLink from './NavLink';

import utils from '../../../../utils';


// Define class.
class Subnav extends React.Component {

  // Render method.
  render() {
    const { shUi, data, subnavIsOpen } = this.props;
    let styles = {
      subnav: {
        backgroundColor: 'rgba(0,0,0,.1)',
        boxShadow: 'inset 2px 4px 8px 0px rgba(0,0,0,0.2)',
      },

      subnavLink: {
        paddingLeft: 30,
      },

      badge: {
        float: 'right',
        marginTop: 3,
      },
    };

    const subMenu = [];
    if (data) {
      data.forEach( item => {
        subMenu.push(
          <li key={`${utils.unique()}_${item.Id}`}>
            <NavLink data={item} />
          </li>
        );
      });
    }

    const SubnavMenu = (
      <ul className="nav sidebar-subnav" style={styles.subnav}>
        {subMenu}
      </ul>
    );

    return (
      <Collapse in={subnavIsOpen && shUi.leftSidebarOpened}>
        {SubnavMenu}
      </Collapse>
      );
  }
}

// Validation.
Subnav.propTypes = {
  subnavIsOpen: React.PropTypes.bool,
  data: React.PropTypes.array,
  shUi: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  shUi: state.shUi,
});

// Export.
export default connect(mapStateToProps)(Subnav);
