// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    UserControl.define("/www/js/core/views/newexpense/newexpense.html", {
        init: function (element, options) {
            this.viewModel = new App.ViewModels.NewExpense();
            this.changeProgress = WinJS.UI.eventHandler(this._changeProgress.bind(this));
            this.submit = WinJS.UI.eventHandler(this._submit.bind(this));
            this.getLocation = WinJS.UI.eventHandler(this._getLocation.bind(this));

           
            
        },
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
           /* var el = document.querySelector("#map");
            var mapOptions ={ credentials: "Ah3HFyLsjxFXG_nUBvvA2F1DEupYsBLn_EPMRAjwt1XHhMkR-XJPZGjbyXlDRUNO" };
            var that = this;
            var initMap = function () {
                if(!this.map) {
                    if (el) {
                        this.map = new Microsoft.Maps.Map(el, mapOptions);
                    }
                }

            }

            // Initial Bing Maps
            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en-us", homeRegion: "US" });
            this.map = new Microsoft.Maps.Map(el, mapOptions);*/
        },

        dispose: function () {
            //this.map.dispose();
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
                //that.viewModel.expense.long = position.coords.longitude;
                //that.viewModel.expense.lat = position.coords.latitude;

                return App.Services.Maps.getMap(position.coords.longitude, position.coords.latitude);
            }).then(function (data) {
                that.map.src = data.url;
                that.map.height = data.imageHeight;
                that.map.width = data.imageWidth;
            });
        },

        _submit: function (ev) {
            ev.preventDefault();
            var that = this;

            var ex = {
                title: this.viewModel.expense.title,
                text: this.viewModel.expense.text,
                long: this.viewModel.expense.long,
                lat: this.viewModel.expense.lat,
                date: new Date(),
                url: this.viewModel.expense.url,
                cost: this.viewModel.expense.cost,
                status: App.Models.Expense.submitted
            };

            this.viewModel.push(ex).then(function (expense) {
                that.viewModel.expense = expense;
            }, function (error) {
                console.log(error);
            });
        }
    });
})();
