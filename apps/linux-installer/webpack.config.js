const { composePlugins, withNx } = require('@nx/webpack')
const { merge } = require('webpack-merge')

module.exports = composePlugins(withNx(), (config, { options, context }) => {

  const newConfig = merge(config, {
    externals: [
    ]
  })

    if (newConfig.configuration === 'development' && 'devServer' in newConfig) {
    // Filter out IndexHtmlWebpackPlugin so that we can use HtmlWebpackPlugin
    newConfig.plugins = newConfig.plugins.filter(
      // (plugin) => plugin.constructor.name !== 'IndexHtmlWebpackPlugin'
    )
  }

  // newConfig.target = 'web'
  // newConfig.node = false,
  // newConfig.module.rules.push({
  //       test: /\.m?js$/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env'], // ensure compatibility with older browsers
  //           plugins: ['@babel/plugin-transform-object-assign'], // ensure compatibility with IE 11
  //         },
  //       },
  //     },{     
  //       test: /\.js$/,
  //       loader: 'webpack-remove-debug', // remove "debug" package
  // })

  return newConfig
})
