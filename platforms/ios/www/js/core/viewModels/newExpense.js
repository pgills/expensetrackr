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
                return _locationService.getCurrentPosition();
            }
        })
    });

    WinJS.Class.mix(App.ViewModels.NewExpense, WinJS.Binding.dynamicObservableMixin);

}(WinJS, App));