import React from 'react';
import Icon from '../../Icon';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.node.selected || false
    };
  }

  handleSelectChange() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    const { style, node } = this.props;

    let iconType = node.children ? 'folder-o' : 'file-text-o';

    switch (node.type) {
    case 'Location' || 'location':
      iconType = 'map-marker-o';
      break;
    case 'Level' || 'level':
      iconType = 'home-pin-o';
      break;
      // case 'doc' || 'docx':
      //   iconType = 'file-word-o';
      //   break;
      // case 'html':
      //   iconType = 'html5';
      //   break;
      // case 'css':
      //   iconType = 'css3';
      //   break;
      // case 'js' || 'json':
      //   iconType = 'file-code-o';
      //   break;
      // case 'folder' || '':
      //   iconType = 'folder-o';
      //   break;
    default:
      iconType = '';
    }

    return (
      <div style={style.base} onClick={this.handleSelectChange.bind(this)}>
        <label style={style.title}>

          {iconType ?
            <Icon name={iconType} className="fa-fw fa-lg" style={{ margin: '0 4px' }} onClick={this.props.onHeaderClick} />
          : null}

          {/* { node.selected !== undefined && this.state.isChecked ? checked : unchecked } */}
          <span className={`tree-view-header ${this.state.isChecked ? 'active' : ''}`}
                style={{ fontWeight: this.state.isChecked ? 'bold' : 'normal' }}>
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
  onHeaderClick: React.PropTypes.func
};

export default Header;
