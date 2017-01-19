Ext.define('App.controller.bomData.bomDataMt.BomRequirement', {
  extend: 'Ext.ux.controller.CRUD',
  createControl: function () {
    var me = this,
      selectors = {},
      viewportId = me.viewport.id;

    selectors["#" + viewportId + "  grid[itemId=grid-list]"] = {
      createRecord: function () {
        me.onCreateRecord();
      },
      updateRecord: function () {
        me.onUpdateRecord();
      },
      destroyRecord: function (params) {
        me.destroyRecord(params);
      },
      exportRecord: function (that) {
        me.exportRecord(that);
      },
      toolbarclick: function (that) {
        var action = that.action;
        switch (action) {
          case "copy":
            me.onCopyRecord(action);
            break;
          case "enable":
            me.optionSync(true);
            break;
          case "disable":
            me.optionSync(false);
            break;
          default:
            break;
        }
      }
    };

    me.control(selectors);
    me.callParent(arguments);
  },
  controllerReady: function () {
    var me = this;
  },
  onCopyRecord: function (action) {
    var me = this;
    me.openEditWindow(action);
  },

  ajaxSubmit: function (params) {
    var me = this,
      editMode = me.editWindow.editMode;

    switch (editMode) {
      case me.editMode[0]:
      case "copy":
        me.createRecord(params);
        break;
      case me.editMode[1]:
        me.updateRecord(params);
        break;
      default:
        break;
    }
  },

  setEditFormRecord: function (editMode) {
    var me = this,
      treeFeature = me.editWindow.down("[itemId=bomtree]"),
      selection = me.getGridSelection(),
      record = selection.length > 0 ? selection[0] : {},
      treeStore = treeFeature.getStore();

    if (editMode === "copy" || editMode === "update") {
      if (me.editWindow.setRecord) {
        me.editWindow.setRecord(record);
      }

      treeStore.load({
        params: {
          id: record.get("Id")
        },
        callback: function (record, options, success) {
          if (success) {

          }
        }
      });
    } else if (editMode === "create") {
      treeStore.load();
    }
  },

  optionSync: function (flag) {
    var me = this,
      grid = me.getGrid(),
      records = grid.getGridSelection(),
      ids = [],
      params;
    Ext.Msg.confirm("提示", "您确认要改变需求的状态么?", function (success) {
      if (success != "yes") return;
      if (records.length > 0) {
        Ext.each(records, function (val) {
          ids.push(val.get("Id"));
        });
      } else {
        return Ext.Msg.alert("提示", "请选择记录行");
      }
      params = {
        flag: flag,
        ids: ids
      };
      Ext.util.Common.ajax({
        url: App.globalConfig.path + '/bom/Requirement/enable',
        jsonData: params,
        method: 'POST',
        beforerequest: function () {
          grid.setLoading(true);
        },
        callback: function () {
          grid.setLoading(false);
        },
        success: function (rst) {
          grid.getStore().reload();
          Ext.Msg.alert("提示", "操作成功!");
        }
      });
    });
  }
});