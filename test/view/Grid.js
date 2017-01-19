Ext.define('App.view.bomData.bomDataMt.bomRequirement.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.bomrequirementgrid',
	store: 'App.store.bomData.bomDataMt.BomRequirement',
	flex: 1,
	width: "auto",
	itemId: "grid-list",
	rownumberer: true,
	controlButtons: ["update", "enable", "disable", "destroy", "copy"],
	destroyKeys: ['Id', 'Code', 'Name'],
	tbar: [{
		xtype: 'button',
		text: '新增',
		action: 'create',
		iconCls: 'x-fa fa-plus-square-o',
		ui: 'gtbar'
	}, {
		xtype: 'button',
		text: '修改',
		action: 'update',
		iconCls: 'x-fa fa-edit',
		singleSelectEnable: true,
		disabled: true,
		ui: 'gtbar'
	}, {
		xtype: 'button',
		text: '启用',
		action: 'enable',
		iconCls: 'iconfont enable',
		disabled: true,
		ui: 'gtbar'
	}, {
		xtype: 'button',
		text: '禁用',
		action: 'disable',
		iconCls: 'iconfont disable',
		disabled: true,
		ui: 'gtbar'
	}, {
		xtype: 'button',
		text: '删除',
		action: 'destroy',
		disabled: true,
		singleSelectEnable: false,
		iconCls: 'x-fa fa-trash',
		ui: 'gtbar'
	}, {
		xtype: 'button',
		text: '复制',
		action: 'copy',
		singleSelectEnable: true,
		disabled: true,
		iconCls: 'x-fa fa-copy',
		ui: 'gtbar'
	}, {
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'x-fa fa-file-excel-o',
		exportUrl: App.globalConfig.path + '/bom/requirement/export',
		ui: 'gtbar'
	}],
	columns: [{
		text: 'EPL名称',
		dataIndex: 'ProductName',
		locked: true,
		width: 120
	}, {
		text: '需求名称',
		dataIndex: 'Name',
		locked: true,
		width: 120
	}, {
		text: '需求种类',
		dataIndex: 'TypeLevelName',
		locked: true,
		width: 120
	}, {
		text: 'VSN',
		dataIndex: 'VSN',
		locked: true,
		width: 120
	}, {
		text: '需求状态',
		dataIndex: 'StateName',
		width: 120
	}, {
		text: '车辆型号',
		dataIndex: 'VehicleType',
		width: 120
	}, {
		text: '车型配置',
		dataIndex: 'OptionsName',
		width: 120
	}, {
		text: '车辆编号',
		dataIndex: 'VehicleCode',
		width: 120
	}, {
		text: '发动机类型',
		dataIndex: 'EngType',
		width: 120
	}, {
		text: '变速箱类型',
		dataIndex: 'TrnName',
		width: 120
	}, {
		text: '车身颜色',
		dataIndex: 'BodyColorName',
		width: 120
	}, {
		text: '造车数量',
		dataIndex: 'Qty',
		width: 120
	}, {
		text: 'model',
		dataIndex: 'Model',
		width: 120
	}, {
		text: '需求配置描述',
		dataIndex: 'Description',
		width: 120
	}, {
		text: '创建人',
		dataIndex: 'CreateBy',
		width: 120
	}, {
		text: '创建时间',
		dataIndex: 'CreateDate',
		width: 150
	}, {
		text: '修改人',
		dataIndex: 'UpdateBy',
		width: 120
	}, {
		text: '修改时间',
		dataIndex: 'UpdateDate',
		width: 150
	}]
	//controlToolbarStatus: function(that, selected, eOpts) {
	//	var me = this,
	//		buttons = me.controlButtons || [];

	//	if (selected.length > 0) {
	//		Ext.each(buttons, function(action) {
	//			var button = me.down("toolbar > button[action=" + action + "]");
	//			if (button) {
	//				if (button.singleSelectEnable) {
	//					if (selected.length === 1) {
	//						if (action === "update") {
	//							if (selected[0].get("Editable") === true)
	//								button.setDisabled(false);
	//							else
	//								button.setDisabled(true);
	//						} else {
	//							button.setDisabled(false);
	//						}

	//					} else {
	//						button.setDisabled(true);
	//					}
	//				} else {
	//					button.setDisabled(false);
	//				}
	//			}
	//		});
	//	} else {
	//		Ext.each(buttons, function(action) {
	//			var button = me.down("toolbar > button[action=" + action + "]");

	//			if (button) {
	//				button.setDisabled(true);
	//			}
	//		});
	//	}

	//	me.fireEvent("rowselection", that, selected);
	//}

});