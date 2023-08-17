sap.ui.define([],function() {
    'use strict';
    var formatter = {
        totalFormatter : function (myArray) {
            return myArray.length;
        },
        colourState: function(value){
            value = parseFloat(value);
            if (value < 10){
                return "Error";
            }
            else if (value < 50){
                return "Information";
            }
            else {
                return "Success";
            }
        }
    }
    return formatter;
});