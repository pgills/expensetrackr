// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    UserControl.define("js/core/views/expenses/expenses.html", {

        init: function (element, options) {
            this.viewModel = new App.ViewModels.Expenses();
            this.itemInvoked = WinJS.UI.eventHandler(this._itemInvoked.bind(this));
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

        _itemInvoked: function (ev) {
            var item = ev.detail.itemPromise;
            var that = this;
            item.then(function (item) {
                var index = item.index;
                WinJS.Navigation.navigate("js/core/views/expense/expense.html", { expense: item.data, current: index });
            })
        },
    });
})();
