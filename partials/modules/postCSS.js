import installPackages from '../../installPackages';

import partial from '../partial';

const postCSS = (userOptions = {}) => {
  installPackages([
    'extract-text-webpack-plugin',
    'style-loader',
    'css-loader',
    'postcss-loader',
    'postcss-import',
    'postcss-cssnext',
    'css-hot-loader',
  ]);

  return config => {
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    const defaultOptions = {
      options: {},
      minimize: true,
    };

    const { options, minimize } = Object.assign(
      {},
      defaultOptions,
      userOptions,
    );

    // allChunks will only be true if minimize is false because this requirement is strictly for in a development environment. Resolves issue with Webpack loading modules out of order when using webpack-dev-server
    const allChunks = minimize ? false : true;

    const cssLoader = {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]',
        minimize,
      },
    };

    const postCSSLoader = {
      loader: 'postcss-loader',
      options: {
        indent: 'postcss',
        plugins: loader => [
          require('postcss-import')({ root: loader.resourcePath }),
          require('postcss-cssnext')(),
        ],
      },
    };

    const loaderList = [cssLoader, postCSSLoader];

    return partial(
      {
        rule: {
          test: /.css$/,
          use: ['css-hot-loader'].concat(
            ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: loaderList,
            }),
            ...options,
          ),
        },
        plugin: new ExtractTextPlugin({ filename: '[name].css', allChunks }),
      },
      config,
    );
  };
};

export default postCSS;
