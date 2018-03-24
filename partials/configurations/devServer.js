import partial from '../partial';

const devServer = (userOptions = {}) => config => {
  const defaultOptions = {
    host: 'localhost',
    port: 8080,
    inline: true,
    historyApiFallback: true,
    hot: true,
    proxy: {},
    overlay: { errors: true, warnings: true },
  };

  const options = Object.assign({}, userOptions, defaultOptions);

  return partial({ configuration: { devServer: options } }, config);
};

export default devServer;
