(function (WinJS, App) {

    var _expenseService = new App.Services.ExpenseService();
    var _locationService = new App.Services.Location();

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

            push: function (expense) {
                return _expenseService.push(expense);
            },

            getLocation: function () {
                var that = this;
                return _locationService.getCurrentPosition().then(function (position) {
                    that.expense.long = position.coords.longitude;
                    that.expense.lat = position.coords.latitude;

                    return WinJS.Promise.wrap(position);
                })
            }
        })
    });

    WinJS.Class.mix(App.ViewModels.NewExpense, WinJS.Binding.dynamicObservableMixin);

}(WinJS, App));