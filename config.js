module.exports = {
  namespace: 'App',
  mode: 'override',  // {'override' | 'skip'}，override时，覆盖已存在的同名文件
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