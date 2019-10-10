export default {
  cjs: 'babel',
  esm: 'babel',
  extraBabelPlugins: [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}