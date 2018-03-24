import installPackages from '../../installPackages';

import partial from '../partial';
import paths from '../../paths';

const babel = (options = {}) => {
  installPackages([
    'babel-loader',
    'babel-polyfill',
    'babel-preset-react',
    'babel-plugin-transform-object-rest-spread',
    'babel-plugin-transform-class-properties',
  ]);
  return config => {
    return partial(
      {
        rule: {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: paths.modules,
        },
      },
      config,
    );
  };
};

export default babel;
