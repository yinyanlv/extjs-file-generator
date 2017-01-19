Ext.define('App.view.bomData.bomDataMt.bomRequirement.Form', {
	extend: 'Ext.form.Panel',
	alias: 'widget.bomrequirementform',
	layout: 'anchor',
	defaults: {
		anchor: '98%',
		style: 'padding-left:10px;'
	},
	defaultType: 'textfield',
	items: [{
		xtype: 'hiddenfield',
		name: 'Id'
	}, {
		xtype: 'hiddenfield',
		name: 'Code'
	}, {
		xtype: 'basecombo',
		name: 'ProductCode',
		fieldLabel: 'EPL名称',
		url: App.globalConfig.path + '/epl/product/getselectlist',
		style: 'margin-top: 10px;padding-left:10px;',
		allowBlank: false,
		maxLength: 100
	}, {
		fieldLabel: '需求名称',
		name: 'Name',
		maxLength: 250
	}, {
		xtype: 'basecombo',
		name: 'Type',
		fieldLabel: '需求种类',
		clearFields: ["Level"],
		url: App.globalConfig.path + '/fixedfield/list/RequireType',
		allowBlank: false
	}, {
		xtype: 'basecombo',
		name: 'Level',
		fieldLabel: '阶段分类',
		dependFields: ["Type"],
		url: App.globalConfig.path + '/bom/requirement/getlevel/{Type}'

	}, {
		xtype: 'triggerfield',
		triggerCls: 'x-form-browse-trigger',
		fieldLabel: 'VSN',
		name: 'VSN',
		onTriggerClick: function() {
			var win = Ext.create('App.view.bomData.bomDataMt.bomRequirement.vsn.Window');
			win.show();
		},
		allowBlank: false,
		maxLength: 50
	}, {
		fieldLabel: '车辆型号',
		name: 'VehicleType',
		maxLength: 50
	}, {
		xtype: 'basecombo',
		name: 'Options',
		fieldLabel: '车型配置',
		url: App.globalConfig.path + '/fixedfield/list/Options'
	}, {
		fieldLabel: '车辆编号',
		name: 'VehicleCode',
		maxLength: 50
	}, {
	    maxLength: 50,
		fieldLabel: '发动机类型',
		name: 'EngType'
	}, {
		xtype: 'basecombo',
		name: 'TrnType',
		fieldLabel: '变速箱类型',
		url: App.globalConfig.path + '/fixedfield/list/TRN'
	}, {
		xtype: 'basecombo',
		name: 'BodyColor',
		fieldLabel: '车身颜色',
		url: App.globalConfig.path + '/option/vsnlnk/CCU'
	}, {
		xtype: 'numberfield',
		fieldLabel: '造车数量',
		name: 'Qty',
		maxValue: 999999999,
		minValue: 0
	}, {
		fieldLabel: 'Model',
		name: 'Model',
		maxLength: 50
	}, {
		xtype: 'textareafield',
		allowBlank: true,
		fieldLabel: '配置需求描述',
		anchor: '98%',
		maxLength: 500,
		maxLengthText: '最大长度为500字符',
		name: 'Description'
	}]
});