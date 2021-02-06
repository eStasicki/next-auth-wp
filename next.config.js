const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withSass = require('@zeit/next-sass')

module.exports = withCSS(
  withLess(
    withSass({
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
      webpack: config => {
        config.module.rules.push(
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          }
        );
        return config;
      }
    })
  )
)