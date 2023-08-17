sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";
        var data = [];
        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                var oModel = new sap.ui.model.json.JSONModel("../model/models.json");
                this.getView().byId("table").setModel(oModel);
            },
            OnSave: function(){
                var oView = this.getView();
                var product=oView.byId("sProduct").getValue();
                var price=oView.byId("sPrice").getValue();
                var oTable=oView.byId("table");
                var oModel=oTable.getModel();
                const newArray = oModel.getProperty("/Productdetails").concat({
                    Product: product,
                    Price : price
                  });
                  oModel.setProperty("/Productdetails", newArray, null, true);   
            },
        });
    });
