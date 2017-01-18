module.exports = {
  namespace: 'App',
  mode: 'override',  // {'override' | 'skip'}，override时，覆盖已存在的同名文件
  destBasePath: './dest',
  templateMap: {
    controller: './temp/Viewport.js',
    viewport: './temp/Viewport.js',
    query: './temp/Viewport.js',
    grid: './temp/Viewport.js',
    edit: './temp/Viewport.js',
    model: './temp/Viewport.js',
    store: './temp/Viewport.js'
  }
};