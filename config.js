module.exports = {
  namespace: 'App',
  mode: 'override',  // {'override' | 'skip'}，override时，覆盖已存在的同名文件
  destBasePath: './dest',
  templatePathList: [
    './temp/view/Viewport.js',
    './temp/view/Edit.js',
    './temp/view/Form.js',
    './temp/view/Grid.js',
    './temp/view/Query.js',
    './temp/controller/BomRequirement.js',
    './temp/model/BomRequirement.js',
    './temp/store/BomRequirement.js'
  ]
};