Ext.define('App.view.bomData.bomDataMt.bomRequirement.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.bomrequirementquery',
	requires: ['Ext.ux.component.combo.BaseCombo', 'Ext.ux.component.datepicker.GroupDatePicker'],
	items: [{
		items: [{
			xtype: 'basecombo',
			name: 'ProductCode',
			fieldLabel: 'EPL名称',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/epl/product/getselectlist'
		}, {
			fieldLabel: '需求名称',
			name: 'Name'
		}, {
			xtype: 'basecombo',
			name: 'Type',
			withAll: true,
			value: '',
			fieldLabel: '需求种类',
			clearFields: ["Level"],
			url: App.globalConfig.path + '/fixedfield/list/RequireType'
		}, {
			xtype: 'basecombo',
			name: 'Level',
			withAll: true,
			value: '',
			fieldLabel: '阶段分类',
			dependFields: ["Type"],
			url: App.globalConfig.path + '/bom/requirement/getlevel/{Type}'
		}, {
			fieldLabel: 'VSN',
			name: 'VSN'
		}, {
			xtype: 'basecombo',
			name: 'StateName',
			withAll: true,
			value: '',
			fieldLabel: '需求状态',
			url: App.globalConfig.path + '/bom/requirement/getstate'
		}, {
			xtype: 'basecombo',
			name: 'UpdateBy',
			fieldLabel: '修改人',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/user/getselectlist'
		}, {
			xtype: 'groupdatepicker',
			fieldLabel: '修改时间',
			cls: 'ebom-group-date',
			startName: 'UpdateDate_S',
			endName: 'UpdateDate_E'
		}]
	}]
});