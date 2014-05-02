(function (WinJS, App) {

    console.log("Models.Expenses: Creating service");
    var _service = new App.Services.ExpenseService();
    console.log("Service: " + _service);
    var _status = {
        approved: 0,
        submitted: 1,
        review: 2,
    }

    WinJS.Namespace.define("App.Models", {
        Expense: WinJS.Class.define(function ctor() {
            this.id = null;
            this.title = "New Expense";
            this.text = "";
            this.long = "0";
            this.lat = "0";
            this.url = "";
            this.date = new Date();
            this.cost = 0.00;
        },
        {
            id: {
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    this._id = value;
                }
            },

            title: {
                get: function () {
                    return this._title;
                },
                set: function (value) {
                    this._title = value;
                }
            },

            text: {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    this._text = value;
                }
            },

            long: {
                get: function () {
                    return this._long;
                },
                set: function (value) {
                    this._long = value;
                }
            },

            lat: {
                get: function () {
                    return this._lat;
                },
                set: function (value) {
                    this._lat = value;
                }
            },

            url: {
                get: function () {
                    return this._url;
                },
                set: function (value) {
                    this._url = value;
                }
            },

            date: {
                get: function () {
                    return this._date;
                },
                set: function (value) {
                    this._date = value;
                }
            },

            cost: {
                get: function () {
                    return this._cost;
                },
                set: function (value) {
                    this._cost = value;
                }
            }

        }, 
        {
            push: function (expense) {
                var date = new Date();
                var ex = {
                    title: expense.title,
                    cost: expense.cost,
                    lat: expense.lat,
                    long: expense.long,
                    date: expense.date,
                    datestring: date.toDateString(),
                    timestring: date.toTimeString(),
                    text: "San Francisco, CA",
                    url: (expense.url !== "") ? expense.url : "img/map1.png",
                    status: 1
                };

                return _service.push(ex);
            },

            list: function () {
                return _service.list();
            },

            id: function (id) {
                retVal = WinJS.Promise.wrap(null);
                if (id) {
                    retVal = _service.getById(id);
                }

                return retVal;
            },

            status: {
                get: function () {
                    return _status;
                }
            }
        })
    })
}(WinJS, App));