sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (JSONModel, Controller) {
	"use strict";

	return Controller.extend("sap.m.TableScrollToIndex.controller.Detail", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
			var oModel = new JSONModel({
				"Price":"",
				"ProductName":""
			});
			this.getView().setModel(oModel,"Product");

		},
		/*handleFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.oRouter.navTo("detail", {product: this._product});
		},
		handleExitFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
			this.oRouter.navTo("detail", {layout: sNextLayout, product: this._product});
		},
		handleClose: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
			this.oRouter.navTo("view", {layout: sNextLayout});
		},*/
		_onProductMatched: function (oEvent) {
			/*this._product = oEvent.getParameter("arguments").product || this._product || "0";
            var omodel = sap.ui.getCore().getModel();
			this.getView().bindElement({
				path: "/myArray/" + this._product,
                model: omodel
			});
			this.getView().bindElement({
				path: "/" + window.encodeURIComponent(oEvent.getParameter("arguments").product),
                model: "newModel"
			});*/
			var price = oEvent.getParameter("arguments").product;
			var product = oEvent.getParameter("arguments").productname;
			this.getView().getModel("Product").setProperty("/Price",price);
			this.getView().getModel("Product").setProperty("/ProductName",product);
		}
	});
});
