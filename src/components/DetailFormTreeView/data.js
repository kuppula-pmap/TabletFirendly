export const treeData = {
  name: 'home',
  type: 'folder',
  selected: false,
  toggled: false,
  children: [{
    name: 'example',
    type: 'folder',
    selected: false,
    mode: 'edit',
    children: [{
      name: 'app.js',
      type: 'js',
      selected: false,
      id: 1
    }, {
      name: 'data.js',
      type: 'js',
      selected: false,
      id: 2
    }, {
      name: 'index.html',
      type: 'html',
      selected: false,
      id: 3
    }, {
      name: 'styles.js',
      type: 'js',
      selected: false,
      id: 4
    }, {
      name: 'webpack.config.js',
      type: 'js',
      selected: false,
      id: 5
    }]
  }, {
    name: 'src',
    type: 'folder',
    selected: false,
    children: [{
      name: 'components',
      type: 'folder',
      children: [{
        name: 'decorators.js',
        type: 'js',
        selected: false
      }, {
        name: 'treebeard.js',
        type: 'js',
        selected: false
      }]
    }, {
      name: 'index.js',
      type: 'js',
      selected: false
    }]
  }, {
    name: 'themes',
    type: 'folder',
    selected: false,
    toggled: false,
    children: [{
      name: 'animations.js',
      type: 'js',
      selected: false
    }, {
      name: 'default.js',
      type: 'js',
      selected: false,
    }]
  }, {
    name: 'Gulpfile.js',
    type: 'js',
    selected: false
  }, {
    name: 'index.js',
    type: 'js',
    selected: false
  }, {
    name: 'package.json',
    type: 'json',
    selected: false
  }]
};
