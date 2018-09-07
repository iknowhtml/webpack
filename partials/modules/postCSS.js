import installPackages from '../../installPackages';

import partial from '../partial';

const postCSS = (userOptions = {}, mode) => {
  installPackages([
    'mini-css-extract-plugin',
    'style-loader',
    'css-loader',
    'postcss-loader',
    'postcss-import',
    'postcss-preset-env',
    'css-hot-loader',
  ]);

  return config => {
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const defaultOptions = {
      filename: '[name].css',
      localIdentName: '[name]__[local]__[hash:base64:5]',
    };

    const { filename, localIdentName } = Object.assign(
      {},
      defaultOptions,
      userOptions,
    );

    const cssLoader = {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName,
      },
    };

    const postCssPresetEnv = require('postcss-preset-env');
    const cssNano = require('cssnano');

    const common = [postCssPresetEnv()];
    const development = [];
    const production = [...common, cssNano()];

    const postCSSLoader = {
      loader: 'postcss-loader',
      options: {
        indent: 'postcss',
        plugins: loader =>
          mode === 'production'
            ? [...common, ...production]
            : [...common, ...development],
      },
    };

    const loaderList = [cssLoader, postCSSLoader];

    return partial(
      {
        rule: {
          test: /.css$/,
          use: ['css-hot-loader', MiniCssExtractPlugin.loader, ...loaderList],
        },
        plugin: new MiniCssExtractPlugin({
          filename,
          chunkFilename: '[id].css',
        }),
      },
      config,
    );
  };
};

export default postCSS;
