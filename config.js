module.exports = {
  namespace: 'App',
  isOverrideMode: true,  // 是否覆盖已存在的文件
  destBasePath: './dest',
  templatePathList: [
    './test/view/Viewport.js',
    './test/view/Edit.js',
    './test/view/Form.js',
    './test/view/Grid.js',
    './test/view/Query.js',
    './test/controller/BomRequirement.js',
    './test/model/BomRequirement.js',
    './test/store/BomRequirement.js'
  ]
};