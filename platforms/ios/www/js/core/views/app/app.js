// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.Namespace.define("App.Views", {
        App: UserControl.define("/www/js/core/views/app/app.html", {
            init: function (element, options) {
                WinJS.Navigation.history = WinJS.Application.sessionState.history || {};
                WinJS.Navigation.history.current.initialPlaceholder = true;
            },

            processed: function (element, options) {
                WinJS.Navigation.navigate(WinJS.Navigation.location || App.Views.navigator.home, WinJS.Navigation.state);
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
            }
        })
    });

})();
