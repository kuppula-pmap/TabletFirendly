import React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style } = this.props;
    const height = style.height;
    const width = style.width;
    let midHeight = height * 0.5;
    let points = `0,0 0,${height} ${width},${midHeight}`;

    return (
      <div style={style.base}>
        <div style={style.wrapper}>
          <svg height={height} width={width}>
            <polygon
              points={points}
              style={style.arrow}
            />
          </svg>
        </div>
      </div>
    );
  }
}

Toggle.propTypes = {
  style: React.PropTypes.object
};

export default Toggle;
