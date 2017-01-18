module.exports = {
  namespace: 'App',
  mode: 'override',  // {'override' | 'skip'}，override时，覆盖已存在的同名文件
  destBasePath: './dest',
  templatePathList: [
    './temp/Viewport.js'
  ]
};