Ext.define('App.view.bomData.bomDataMt.bomRequirement.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	requires: [
		'App.view.bomData.bomDataMt.bomRequirement.Form',
		'App.view.bomData.bomDataMt.bomRequirement.Tree',
		'Ext.ux.component.button.LinkButton'
	],
	title: 'BOM需求',
	width: 800,
	height: Ext.getBody().getViewSize().height * 0.8,
	maxHeight: Ext.getBody().getViewSize().height * 0.8,
	bodyPadding: '15 15 5 15',
	layout: 'border',
	items: [{
		xtype: 'hiddenfield',
		name: 'Id'
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
			xtype: 'panel',
			border: true,
			layout: {
				type: "hbox",
				align: 'stretch'
			},
			width: '100%',
			ui: 'edit-grid',
			header: false,
			title: '<span class="v-line">单条信息区域</span>',
			items: [{
				xtype: 'bomrequirementform',
				flex: 1,
				scrollable: true,
				style: 'border-right: solid 1px #dee6ed;border-top: solid 1px #dee6ed;',
				title: '<span class="v-line">基本属性</span>',
				margin: 0
			}, {
				xtype: 'bomrequirementtree',
				itemId: 'bomtree',
				flex: 1,
				scrollable: true,
				style: 'border-top: solid 1px #dee6ed;margin-left: 10px;',
				title: '<span class="v-line">配置属性</span>'
			}]
		}]
	}],
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		ui: 'footer',
		margin: "3 0 15 0",
		defaults: {
			width: 80
		},
		layout: {
			align: 'middle',
			pack: 'center',
			type: 'hbox'
		},
		items: [{
			xtype: 'button',
			action: "save",
			cls: 'bom-edit-save-btn',
			text: "保存"
		}, {
			xtype: 'button',
			action: "cancel",
			cls: 'bom-edit-cancel-btn',
			text: "取消"
		}, {
			xtype: 'linkbutton',
			cls: 'bom-linkbutton',
			text: '查看选择的配置列表',
			title: '查看选择的配置列表',
			width: 120,
			handler: function() {
				var me = this;
				me.up("panel").openFeature();

			}

		}]
	}],
	listeners: {
		afterrender: function() {
			var me = this;
			me.treePanel = me.down('[itemId=bomtree]');

			me.treePanel.on({
			    expand: function () {
					me.expandNode();
				},
				compress: function() {
					me.compress();
				}
			});
		}
	},

	//override baseEdit getParams
	getParams: function() {
		var me = this,
			params = {},
			items = me.getFormFields(),
			ids = [];

		Ext.each(items, function(item) {
			if (item.isNotSubmit) return true;

			if (me.editMode === "create" && me.createNoSubmitFields.indexOf(item.name) > -1) {
				return true;
			}
			if (me.editMode === "update" && me.updateNoSubmitFields.indexOf(item.name) > -1) {
				return true;
			}

			params[item.name] = item.getValue();
		});
		var nodes = me.treePanel.getChecked();
		Ext.each(nodes, function(val, idx) {
			ids.push(val.get('id'));
		});
		params["rpos"] = ids.join(',');

		return params;
	},

	expandNode: function() {
		var me = this,
			store = me.treePanel.getStore(),
			record = me.treePanel.getSelectionModel().getSelection();
        
		if (record.length && !record[0].get("leaf")) {
			node = me.getNode(record[0].get('id'));
			store.load({
				node: node,
				callback: function(items, that, success) {
					if (success) {
						node = me.getNode(record[0].get('id'));
						me.treePanel.getSelectionModel().select(node);
						node.expand();
					}
				}
			});
		} else {
			Ext.Msg.alert("提示", "请选中树节点");
		}
	},

	compress: function() {
		var me = this;
		me.treePanel.collapseAll();
		me.treePanel.getSelectionModel().deselectAll();
	},

	openFeature: function() {
		var me = this,
			tree = me.down("[itemId=bomtree]"),
			nodes = tree.getChecked(),
			ids = [];

		Ext.each(nodes, function(val, idx) {
			ids.push(val.get('id'));
		});

        if (!ids.length) return Ext.Msg.alert("提示", "请先选择子节点");

		var win = Ext.create('App.view.bomData.bomDataMt.bomRequirement.ConfigWindow', {
			ids: ids
		});
		win.show();
	},

	getNode: function(id) {
		var me = this,
			store = me.treePanel.getStore(),
			node = store.getNodeById(id);
		return node;
	}
});