import React from 'react';
import Ficon from 'react-fa';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { style } = this.props;

    style = {
      ...style,

      icon: {
        display: 'inline-block',
        marginLeft: -5,
      },
    };

    return (
      <div style={style.base}>
        <div style={style.wrapper}>
          <Ficon name="minus" fixedWidth style={style.icon} />
        </div>
      </div>
    );
  }
}

Toggle.propTypes = {
  style: React.PropTypes.object
};

export default Toggle;
