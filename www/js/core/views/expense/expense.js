﻿// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    UserControl.define("js/core/views/expense/expense.html", {
        init: function (element, options) {
            var options = options || {};
            if (options.expense) {
                this.viewModel = options.expense;
            }
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
        },

        unload: function () {
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />
        }
    });
})();
