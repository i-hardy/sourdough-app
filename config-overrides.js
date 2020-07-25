const rewireTypescript = require('react-app-rewire-typescript');

module.exports = (config, env) => {  
  config.module.rules.map(rule => {
    if (typeof rule.test !== 'undefined' || typeof rule.oneOf === 'undefined') {
      return rule
    }

    rule.oneOf.unshift({
      test: /\.mdx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
        '@mdx-js/loader'
      ]
    });

    return rule
  });
  return config;
}