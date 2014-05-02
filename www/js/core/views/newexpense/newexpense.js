// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    UserControl.define("js/core/views/newexpense/newexpense.html", {
        init: function (element, options) {
            this.viewModel = new App.ViewModels.NewExpense();
            this.changeProgress = WinJS.UI.eventHandler(this._changeProgress.bind(this));
            this.submit = WinJS.UI.eventHandler(this._submit.bind(this));
            this.getLocation = WinJS.UI.eventHandler(this._getLocation.bind(this));
            this.getPicture = WinJS.UI.eventHandler(this._getPicture.bind(this));
        },
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            this.mapContainer.winControl.addEventListener("invoked", this.getLocation);
            this.pictureContainer.winControl.addEventListener("invoked", this.getPicture);
        },

        dispose: function () {
            this.mapContainer.winControl.removeEventListener("invoked", this.getLocation);
            this.pictureContainer.winControl.removeEventListener("invoked", this.getPicture);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },

        _changeProgress: function (ev) {
            this.viewModel.progress = (this.viewModel.progress) ? false : true;
        },

        _getLocation: function (ev) {
            ev.preventDefault();
            var that = this;
            this.viewModel.getLocation().then(function (position) {
                return App.Services.Maps.getMap(position.coords.longitude, position.coords.latitude);
            }).then(function (data) {
                var i = new Image();
                i.onload = function (ev) {
                    that.map.style.backgroundImage = "url('" + i.src + "')";
                    WinJS.UI.Animation.enterContent([that.map, that.latlong]);
                };
                i.src = data.url;
            });
        },

        _getPicture: function (ev) {
            ev.preventDefault();
            var that = this;
            this.viewModel.getPicture().then(function (imageData) {
                var i = new Image();
                i.onload = function (ev) {
                    that.picture.style.backgroundImage = "url('" + i.src + "')";
                    WinJS.UI.Animation.enterContent(that.picture);
                };
                i.src = "data:image/png;base64," + imageData;
            });
        },

        _submit: function (ev) {
            ev.preventDefault();
            this.viewModel.push().then(function (expense) {
                WinJS.Navigation.navigate("js/core/views/expenses/expenses.html", {expense: expense});
            }, function (error) {
                console.log(error);
            });
        }
    });
})();
