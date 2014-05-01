(function (WinJS, WindowsAzure, App) {

    var date = new Date();
    var _data = [
        {
            title: "Paul's Waffle House",
            text: "San Francisco, CA",
            date: date,
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 45,
            url: 'img/map1.png'
        },
        {
            title: "Josh's Bar & Grill",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 1)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 102,
            url: 'img/map2.png'
        },
        {
            title: "Cupcakes by Meg",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 2)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 25,
            url: 'img/map3.png'
        },
        {
            title: "Zen Garden",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 3)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 45,
            url: 'img/map4.png'
        },
        {
            title: "Wings, Wings, Wings",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 4)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 67,
            url: 'img/map5.png'
        },
        {
            title: "Root",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 5)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 245,
            url: 'img/map6.png'
        },
        {
            title: "Edgar's Flying Pancakes",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 6)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 22,
            url: 'img/map1.png'
        },
        {
            title: "The Dock",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 7)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 65,
            url: 'img/map2.png'
        },
        {
            title: "The Gus",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 8)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 326,
            url: 'img/map3.png'
        },
        {
            title: "Happy Hog BBQ",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 9)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 33,
            url: 'img/map4.png'
        },
        {
            title: "Yummy Yogurt",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 10)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 10,
            url: 'img/map5.png'
        },
        {
            title: "Super Foods",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 11)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 24,
            url: 'img/map6.png'
        },
        {
            title: "New American",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 12)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 122,
            url: 'img/map1.png'
        },
        {
            title: "Shakin' Bakin'",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 13)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 28,
            url: 'img/map2.png'
        },
        {
            title: "Adam's Food Truck",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 14)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 42,
            url: 'img/map3.png'
        },
        {
            title: "Ginger Thai",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 15)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 38,
            url: 'img/map4.png'
        },
        {
            title: "Maria's Pasta",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 16)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 79,
            url: 'img/map5.png'
        },
        {
            title: "Muffins & More",
            text: "San Francisco, CA",
            date: new Date(date.setDate(date.getDate() - 17)),
            timestring: date.toTimeString(),
            datestring: date.toDateString(),
            status: 1,
            long: -122,
            lat: 47,
            cost: 24,
            url: 'img/map6.png'
        }
    ];

    var _apiKey = "AtFyFCVeANFXiKZEzyENpGkjHhOvfp99";
    var _apiUrl = "https://snc.azure-mobile.net/";
    var _client = null;
    var _storage = new App.Services.LocalStorageService();
    var _items = null;

    WinJS.Namespace.define("App.Services", {
        ExpenseService: WinJS.Class.define(function () {
            console.log("Expense Service: Creating client");
            if (_client === null) {
                _client = new WindowsAzure.MobileServiceClient(_apiUrl, _apiKey);
            }

            this._client = _client;
            this._expenses = this._client.getTable("expenses");

        },

        {
            list: function () {
                retVal = WinJS.Promise.wrap([]);
                if(_storage.expenses.length > 0) {
                    retVal = WinJS.Promise.wrap(_storage.expenses);
                } else {
                    retVal = this._expenses.orderByDescending("date").read().then(function (items) {
                        _storage.expenses = items;
                        return WinJS.Promise.wrap(items);
                    })
                }
                
                return retVal;
            },

            push: function (expense) {
                return this._expenses.insert(expense).then(function (item) {
                    var items = _storage.expenses;
                    items.splice(0, 0, item);
                    _storage.expenses = items;
                    return WinJS.Promise.wrap(item);
                });
            },

            refresh: function () {
                return this._expenses.orderByDescending("date").read().then(function (items) {
                    _storage.expenses = items;
                    return WinJS.Promise.wrap(items);
                });
            },

            getById: function (id) {
                return this._expenses.lookup(id);
            },

            clearDatabase: function () {
                var that = this;
                _storage.expenses = "";
                return this._expenses.read().then(function (items) {
                    var p = [];
                    for (var i = 0, len = items.length; i < len; i++) {
                        p.push(that._expenses.del(items[i]));
                    }

                    return WinJS.Promise.join(p);
                }, function (error) {
                    console.log(error);
                    return WinJS.Promise.wrapError(error);
                })
            },

            populateDatabase: function () {
                var that = this;
                var p = [];
                for (var i = 0, len = _data.length; i < len; i++) {
                    p.push(this._expenses.insert(_data[i]));
                }

                return WinJS.Promise.join(p);
            }
        })
    });

})(WinJS, WindowsAzure, App);