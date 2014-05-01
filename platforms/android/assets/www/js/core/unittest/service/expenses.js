// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    UserControl.define("/www/js/core/unittest/service/expenses.html", {

        init: function (element, options) {
            this._service = new App.Services.ExpenseService();
            this.list = WinJS.UI.eventHandler(this._list.bind(this));
            this.add = WinJS.UI.eventHandler(this._add.bind(this));
            
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },

        _list: function (ev) {
            var that = this;
            
        
            console.log("Getting expenses");
            this._service.list().then(function (list) {
                that.output = "Success";
                console.log(that.output);
            })
        },

        _add: function (ev) {
            var exp = {
                title: "Expense 1",
                text: "This is the description for the expense",
                long: "0",
                lat: "1",
            };

            console.log("Inserting item")
            this._service.push(exp).then(function (success) {
                console.log("Success: " + success);
            }, function (error) {
                console.log("Error: " + error);
            });
        }
    });
})();
