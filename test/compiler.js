// Required in mocha.opts
// Ensures that the babel transpiler
// is activated PRIOR to any test code

require('babel-core/register')({
  presets: ['es2015', 'react']
});
