(function (WinJS, App) {

    var _expenseService = new App.Services.ExpenseService();
    var _locationService = new App.Services.Location();
    var _cameraService = new App.Services.Camera();

    WinJS.Namespace.define("App.ViewModels", {
        NewExpense: WinJS.Class.define(function ctor() {
            this._initObservable();
            this.progress = false;
            this.expense = new App.Models.Expense();
        },
        {
            progress: {
                get: function () {
                    return this.getProperty("progress");
                },
                set: function (value) {
                    this.setProperty("progress", value);
                }
            },

            expense: {
                get: function () {
                    return this.getProperty("expense");
                },
                set: function (value) {
                    this.setProperty("expense", value);
                }
            },

            push: function () {
                return App.Models.Expense.push(this.expense);
            },

            getLocation: function () {
                var that = this;
                return _locationService.getCurrentPosition().then(function (position) {
                    that.expense.long = position.coords.longitude;
                    that.expense.lat = position.coords.latitude;
                    return WinJS.Promise.wrap(position);
                })
            },

            getPicture: function () {
                var that = this;
                return _cameraService.getPicture().then(function (imageData) {
                    that.expense.url = "data:image/png;base64," + imageData;
                    return WinJS.Promise.wrap(imageData);
                });
            }
        })
    });

    WinJS.Class.mix(App.ViewModels.NewExpense, WinJS.Binding.dynamicObservableMixin);

}(WinJS, App));