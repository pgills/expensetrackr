(function (WinJS, App) {

    var _groups = [
        { text: "Approved" },
        { text: "Submitted" },
        { text: "Under Review" }
    ];

    var _model = new App.Models.Expense();

    WinJS.Namespace.define("App.ViewModels", {
        Expenses: WinJS.Class.define(function ctor() {
            console.log("ExpensesViewModel: ctor");
            this._initObservable();
            this.list = new WinJS.Binding.List([]);
            this.groupList = this.list.createGrouped(this._groupKey.bind(this), this._groupData.bind(this));

            // Get the list of expenses
            this.progress = true;
            var that = this;
            App.Models.Expense.list().then(function(list) {
                that.list = new WinJS.Binding.List(list);
            });
        },
        {
            list: {
                get: function () {
                    return this.getProperty("list");
                },
                set: function (value) {
                    this.setProperty("list", value);
                }
            },

            progress: {
                get: function () {
                    return this.getProperty("progress");
                },
                set: function (value) {
                    this.setProperty("progress", value);
                }
            },

            groupList: {
                get: function () {
                    return this.getProperty("groupList");
                },
                set: function (value) {
                    this.setProperty("groupList", value);
                }
            },

            init: function () {
                var that = this;
                console.log("Calling App.Models.Expense.list");
                return App.Models.Expense.list();
            },

            _groupKey: function (item) {
                return item.status;
            },

            _groupData: function (item) {
                return _groups[item.status];
            }
        })
    });

    WinJS.Class.mix(App.ViewModels.Expenses, WinJS.Binding.dynamicObservableMixin);

})(WinJS, App);