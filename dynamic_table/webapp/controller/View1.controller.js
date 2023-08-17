sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "../model/formatter",
    "sap/ui/core/Fragment",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast, formatter, Fragment, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("dynamictable.controller.View1", {
            formatter: formatter,
            onInit: function () {

                var oData = {
                    myArray: [],
                };
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(oData);
                var oTable = this.getView().byId("table");
                oTable.setModel(oModel);
            },
            onSearch: function (oEvent) {
                var oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");
    
                if (sQuery && sQuery.length > 0) {
                    var oTableSearchState = new Filter({

                        filters: [
                    
                          //new Filter("Product", FilterOperator.Contains, sQuery),
                          //new Filter("Price", FilterOperator.Contains, sQuery)
                          new Filter("Product", FilterOperator.EQ, sQuery),
                          new Filter("Price", FilterOperator.EQ, sQuery)
                    
                        ]
                    
                      });
                    //oTableSearchState = [new Filter("Product", FilterOperator.Contains, sQuery)];
                }
    
                this.getView().byId("table").getBinding("items").filter(oTableSearchState, "Application");
            },
            OnSave: function () {

                var that = this;
                var oTable = this.getView().byId("table");
                const model = oTable.getModel();
                var sProduct = this.getView().byId("sProduct").getValue();
                var sPrice = this.getView().byId("sPrice").getValue();
                const newArray = model.getProperty("/myArray").concat({
                    Product: sProduct,
                    Price: sPrice
                });
                model.setProperty("/myArray", newArray, null, true);
                this.byId("mainDialog").close();
                MessageToast.show("The Record has been added succesfully");
                var len = model.bindList("/myArray").getLength();
                if (len > 0) {
                    oTable.setProperty("mode", "MultiSelect");
                }
                this.getView().byId("text2").setText(len);

            },

            OnDelete: function () {

                var oTable = this.getView().byId("table");
                var aSelectedItems = oTable.getSelectedItems();
                if (aSelectedItems < 1) {
                    MessageToast.show("Select a row to delete");
                }

                for (var i = aSelectedItems.length - 1; i >= 0; i--) {
                    var oItemContextPath = aSelectedItems[i].getBindingContext().getPath()
                    var aPathParts = oItemContextPath.split("/");
                    var iIndex = aPathParts[aPathParts.length - 1];

                    var oJSONData = oTable.getModel().getData();
                    oJSONData.myArray.splice(iIndex, 1);
                    var oModel = oTable.getModel();
                    oModel.setData(oJSONData);
                    oTable.setModel(oModel);
                }
                MessageToast.show("Row has been deleted");
                var model = oTable.getModel();
                var len = model.bindList("/myArray").getLength();
                if (len < 1) {
                    oTable.setProperty("mode", "SingleSelect");
                }
                this.getView().byId("text2").setText(len);

            },
            getCounty: function (oContext) {
                return oContext.getProperty('Product');
            },
            onTableSettings: function (oEvent) {
                this._oDialog = sap.ui.xmlfragment("dynamictable.view.SettingsDialog", this);
                this._oDialog.open();
            },
            onConfirm: function (oEvent) {
                var oView = this.getView();
                var oTable = oView.byId("table");
                var oBinding = oTable.getBinding("items");
                var mParams = oEvent.getParameters();
                var aFilters = [];
                for (var i = 0, l = mParams.filterItems.length; i < l; i++) {
                    var oItem = mParams.filterItems[i];
                    var aSplit = oItem.getKey().split("___");
                    var sPath = aSplit[0];
                    var vOperator = aSplit[1];
                    var vValue1 = parseInt(aSplit[2]);
                    var vValue2 = aSplit[3];
                    var oFilter = new sap.ui.model.Filter(sPath, vOperator, vValue1, vValue2);
                    aFilters.push(oFilter);
                }
                oBinding.filter(aFilters);
                var aSorters = [];
                if (mParams.groupItem) {
                    var sPath = mParams.groupItem.getKey();
                    var bDescending = mParams.groupDescending;
                    var vGroup = function (oContext) {
                        var name = oContext.getProperty("Product");
                        return {
                            key: name,
                            text: name
                        };
                    };
                    aSorters.push(new sap.ui.model.Sorter(sPath, bDescending, vGroup));
                }
                var sPath = mParams.sortItem.getKey();
                var bDescending = mParams.sortDescending;
                aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
                oBinding.sort(aSorters);
            },
            
            OnOpen: function () {

                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "dynamictable.view.form"
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });

            },
            OnCancel: function () {

                this.byId("mainDialog").close();
            }
        });
    });
