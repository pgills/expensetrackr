(function (WinJS, App) {

 
    var _expenseService = new App.Services.ExpenseService();

    WinJS.Namespace.define("App.ViewModels", {
        Settings: WinJS.Class.define(function ctor() {
            this._initObservable();
            this.progress = false;
            this.output = "";
            
        },
        {
            progress: {
                set: function (value) {
                    this.setProperty("progress", value);
                },
                get: function () {
                    return this.getProperty("progress");
                }
            },

            output: {
                set: function (value) {
                    this.setProperty("output", value);
                },
                get: function () {
                    return this.getProperty("output");
                }
            },

            clearDatabase: function () {
                var that = this;
                this.progress = true;
                return _expenseService.clearDatabase().then(function (success) {
                    that.progress = false;
                    that.ouput = "Success"
                }, function (error) {
                    console.log(error);
                    that.output = error;
                })
            },

            populateDatabase: function () {
                var that = this;
                this.progress = false;
                return _expenseService.populateDatabase();
            }
        })
    });

    WinJS.Class.mix(App.ViewModels.Settings, WinJS.Binding.dynamicObservableMixin);

}(WinJS, App));