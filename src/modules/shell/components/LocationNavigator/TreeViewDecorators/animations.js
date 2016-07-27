export default {
  toggle: (props) => {
    return {
      animation: { rotateZ: props.node.toggled ? 0 : 90 },
      duration: 300
    };
  },
  drawer: (/* props */) => {
    return {
      enter: {
        animation: 'slideDown',
        duration: 300
      },
      leave: {
        animation: 'slideUp',
        duration: 300
      }
    };
  }
};
