Ext.define('App.view.bomData.bomDataMt.bomRequirement.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.bomData.bomDataMt.bomRequirement.Query',
		'App.view.bomData.bomDataMt.bomRequirement.Grid',
		'App.view.bomData.bomDataMt.bomRequirement.Form',
		'App.view.bomData.bomDataMt.bomRequirement.Tree',
		'Ext.ux.component.button.LinkButton',
		'App.store.bomData.bomDataMt.Tree'
	],
	alias: 'widget.bomrequirementviewport',
	overflowY: 'auto',
	items: [{
		region: 'north',
		xtype: 'bomrequirementquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70
	}, {
		region: 'center',
		minHeight: 400,
		flex: 1,
		border: false,
		layout: {
			type: "hbox",
			align: 'stretch'
		},
		ui: 'bom',
		items: [{
			xtype: 'bomrequirementgrid',
			border: true
		}]
	}]
});