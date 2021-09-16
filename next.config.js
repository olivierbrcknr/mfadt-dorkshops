// next.config.js

module.exports =
  {
    basePath: '/dorkshop',
    trailingSlash: true,
      exportPathMap: function() {
      return {
        '/': { page: '/' },
      };
    },
    webpack(config, options) {

      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
            esModule: false,
          },
        }
      })

      config.module.rules.push({
        test: /\.(mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      })

      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader'
      })

      return config
    },
    env: {
      AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
      AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID
    },
  }
