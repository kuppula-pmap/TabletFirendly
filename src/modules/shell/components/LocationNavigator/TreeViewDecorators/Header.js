import React from 'react';
import Icon from '../../../../../components/Icon';

class Header extends React.Component {
  render() {
    let { style, node, handleHeaderClick } = this.props;

    let iconType = node.children ? 'folder-o' : 'file-text-o';

    switch (node.type) {
    case 'Location' || 'location':
      iconType = 'map-marker-o';
      break;
    case 'Level' || 'level':
      iconType = 'home-pin-o';
      break;
    default:
      iconType = '';
    }

    style = {
      ...style,
      base: {
        ...style.base,
        marginLeft: -5,
      },
    };

    return (
      <div style={style.base} onClick={handleHeaderClick} className={`navigator-tree-label${node.selected ? ' active' : ''}`} id={`shell_header_label_toggle-node_${node.id}`}>
        <label style={style.title}>

          {iconType ?
            <Icon name={iconType} className="fa-fw fa-lg" style={{ margin: '0 4px' }} />
          : null}

          <span className={`tree-view-header ${node.active ? 'active' : ''}`}>
            {node.name}
          </span>

        </label>
      </div>
    );
  }
}

Header.propTypes = {
  style: React.PropTypes.object,
  node: React.PropTypes.object.isRequired,
  handleHeaderClick: React.PropTypes.func
};

export default Header;
