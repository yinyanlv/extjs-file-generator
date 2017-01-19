Ext.define('App.model.bomData.bomDataMt.BomRequirement', {
  extend: 'Ext.data.Model',
  fields: ["BodyColor", "Code",
    "CreateBy", {
      name: 'CreateDate',
      mapping: function (model) {
        return Ext.util.Format.localDate(model.CreateDate);
      }
    },
    "Description",
    "EngType",
    "Level",
    "Model",
    "Name",
    "Options",
    "ProductCode",
    "ProductName",
    "Qty",
    "RPOs",
    "TrnType",
    "Type",
    "UpdateBy", {
      name: 'UpdateDate',
      mapping: function (model) {
        return Ext.util.Format.localDate(model.UpdateDate);
      }
    },
    "UpdateNotes",
    "VSN",
    "VehicleCode",
    "VehicleType"
  ]
});