Ext.define('App.store.bomData.bomDataMt.BomRequirement', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.bomData.bomDataMt.BomRequirement',
	proxyAPI: {
		read: App.globalConfig.path + '/bom/requirement/page',
		create: App.globalConfig.path + '/bom/requirement/create',
		update: App.globalConfig.path + '/bom/requirement/update',
		destroy: App.globalConfig.path + '/bom/requirement/delete'
	}
});