(function (WinJS, App) {

    console.log("App: Create Expenses ViewModel");
    var _expenses = new App.ViewModels.Expenses();

    console.log("App: Create NewExpense ViewModel");
    var _newExpense = new App.ViewModels.NewExpense();

    var _camera = new App.Services.Camera();
    var _exservice = new App.Services.ExpenseService();

    console.log("App: Define App.DataContext Namespace");

    WinJS.Namespace.define("App.DataContext", {
        newExpense: WinJS.UI.eventHandler(function (e) {
            WinJS.Navigation.navigate("js/core/views/newexpense/newexpense.html");
        }),
        Expenses: _expenses,
        NewExpense: _newExpense,
        getLocation: WinJS.UI.eventHandler(function (e) {
            e.preventDefault();
            _newExpense.getLocation().then(function (position) {
                document.querySelector(".lat").value = position.coords.latitude;
                document.querySelector(".long").value = position.coords.longitude;
                //_newExpense.expense.long = position.coords.longitude;
                //_newExpense.expense.lat = position.coords.latitude;
                var center = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
                map.setView({ center: center, mapTypeId: Microsoft.Maps.MapTypeId.auto});

                // Add a pin to the center of the map
                var pin = new Microsoft.Maps.Pushpin(center, { text: '' });
                map.entities.push(pin);

            });
        }),
        submitNewExpese: WinJS.UI.eventHandler(function (e) {
            //e.preventDefault();
            var date = new Date();
            var url = document.querySelector("#image").src;
            var title = document.querySelector("#title").value;
            var cost = document.querySelector("#cost").value;
            var long = document.querySelector("#long").value;
            var lat = document.querySelector("#lat").value;
            var ex = {
                title: title,
                cost: cost,
                lat: lat,
                long: long,
                date: date,
                datestring: date.toDateString(),
                timestring: date.toTimeString(),
                text: "San Francisco, CA",
                url: (url !== "") ? url : "img/map1.png",
                status: 1
            };

            _newExpense.push(ex).then(function (expense) {
                var that = this;
                this.expense = expense;
                var w = document.querySelector(".wizard");
                _hide(w).then(function () {
                    var l = document.querySelector(".list").winControl;
                    l.itemDataSource.insertAtStart(null, that.expense);
                    //_expenses.list.splice(0, 0, that.expense);
                })
            });
        }),

        showExpense: WinJS.UI.eventHandler(function (e) {
            var w = document.querySelector(".wizard");
            _show(w).then(function () {
                //document.querySelector(".navbar-toggle").click();
            });
        }),

        hideExpense: WinJS.UI.eventHandler(function (e) {
            //e.preventDefault();
            var w = document.querySelector(".wizard");
            _hide(w);
        }),

        getPicture: WinJS.UI.eventHandler(function (e) {
            e.preventDefault();
            _camera.getPicture().then(function (imageData) {
                var image = document.querySelector("#image");
                image.src = "data:image/jpeg;base64," + imageData;
            });
        }),

        refresh: WinJS.UI.eventHandler(function (e) {
            _exservice.refresh().then(function (items) {
                var l = document.querySelector(".list").winControl;
                if(l) {
                    l.itemDataSource = new WinJS.Binding.List(items).dataSource;
                }
            })
        }),

        resetData: WinJS.UI.eventHandler(function (e) {
            _exservice.clearDatabase().then(function (c) {
                return App.DataContext.renewData();
            }).then(function (c) {
                return App.DataContext.refresh();
            })
        }),

        renewData: WinJS.UI.eventHandler(function (e) {
            _exservice.populateDatabase();
        }),

        expenses: _expenses
    });

    console.log("App.DataContext Namespace defined: "+ App.DataContext);

    function _hide(element) {
        this.element = element;
        var that = this;
        return WinJS.UI.Animation.exitPage(element).then(function () {
            WinJS.Utilities.addClass(that.element, "hide");
        });
    }

    function _show(element) {
        WinJS.Utilities.removeClass(element, "hide");
        return WinJS.UI.Animation.enterPage(element);
    }

}(WinJS, App));