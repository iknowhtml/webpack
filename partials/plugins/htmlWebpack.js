import installPackages from '../../installPackages';

import partial from '../partial';
const htmlWebpack = (userOptions = {}, mode) => {
  installPackages([
    'html-webpack-plugin',
    ...(userOptions.template ? [] : ['html-webpack-template']),
  ]);
  return config => {
    const htmlWebpackPlugin = require('html-webpack-plugin');

    const defaultOptions = {
      title: '',
      filename: 'index.html',
      template: userOptions.template ? null : require('html-webpack-template'),
      appMountId: 'app',
      inject: false,
      minify:
        mode === 'production'
          ? {
              collapseWhitespace: true,
              collapseInlineTagWhitespace: true,
            }
          : false,
      hash: true,
    };

    const options = { ...defaultOptions, ...userOptions };

    return partial({ plugin: new htmlWebpackPlugin(options) }, config);
  };
};

export default htmlWebpack;
