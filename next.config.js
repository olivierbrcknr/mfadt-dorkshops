// next.config.js

module.exports =
  {
    basePath: '/dorkshops',
    trailingSlash: true,
      exportPathMap: function() {
      return {
        '/': { page: '/' },
        '/email': { page: '/email' },
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
      GOOGLE_SHEETS_ID: process.env.GOOGLE_SHEETS_ID,
      SHEET_ID: process.env.SHEET_ID,
      GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    },
  }
