sap.ui.define([
    "sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
        "use strict";

        return Controller.extend("navigation.controller.View1", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this._bDescendingSort = false;
            },
            onListItemPress: function (oEvent) {
                var productPath = oEvent.getSource().getBindingContext("products").getPath(),
                    product = productPath.split("/").slice(-1).pop();
    
                this.oRouter.navTo("detail", {product: product});
            },
            onSearch: function (oEvent) {
                var oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");
    
                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
                }
    
                this.getView().byId("productsTable").getBinding("items").filter(oTableSearchState, "Application");
            }
        });
    });
    
