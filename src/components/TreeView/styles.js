export let styles = {
  tree: {
    base: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      color: '#666666',
    },

    node: {
      base: {
        position: 'relative'
      },

      link: {
        position: 'relative',
        padding: '0px 5px',
        display: 'block'
      },

      activeLink: {
        background: 'transparent'
      },

      toggle: {
        base: {
          cursor: 'pointer',
          position: 'relative',
          display: 'block',
          float: 'left',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },

        wrapper: {
          position: 'absolute',
          top: '40%',
          left: '60%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },

        height: 14,
        width: 14,
        arrow: {
          fill: '#9DA5AB',
          strokeWidth: 0
        }
      },

      header: {
        base: {
          display: 'block',
          float: 'left',
          verticalAlign: 'top',
          width: 'calc(100% - 24px)',
          // color: 'inherit'
        },

        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },

        title: {
          cursor: 'pointer',
          fontWeight: 'normal',
          lineHeight: '22px',
          verticalAlign: 'middle'
        }
      },

      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },

      loading: {
        color: '#CDCDCD',
        cursor: 'progress'
      }
    }
  }
};
