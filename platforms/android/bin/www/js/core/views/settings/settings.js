// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

   UserControl.define("/www/js/core/views/settings/settings.html", {
        init: function (element, options) {
            this.viewModel = new App.ViewModels.Settings();
            this.clearDatabase = WinJS.UI.eventHandler(this._clearDatabase.bind(this));
            this.populateDatabase = WinJS.UI.eventHandler(this._populateDatabase.bind(this));
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

        _clearDatabase: function (ev) {
            this.viewModel.output = "Clearing..."
            var that = this;
            this.viewModel.clearDatabase().then(function (success) {
                that.viewModel.output = "Success!";
            }, function (error) {
                that.viewModel.output = error;
            })
        },

        _populateDatabase: function (ev) {
            var that = this;
            this.viewModel.output = "Populating...";
            this.viewModel.populateDatabase().then(function (success) {
                that.viewModel.output = "Success!";
            }, function (error) {
                that.viewModel.output = "Error" + error;
            })
        }
    });
})();
