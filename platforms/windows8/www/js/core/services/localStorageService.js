(function (WinJS) {

    var _expenses = null;
    var _entry = "expenses";

    WinJS.Namespace.define("App.Services", {
        LocalStorageService: WinJS.Class.define(function ctor() {

        },
        {
            expenses: {
                get: function () {
                    if(_expenses === null) {
                        var storage = localStorage[_entry];
                        _expenses = (storage) ? JSON.parse(storage) : [];
                    }

                    return _expenses;
                },

                set: function (value) {
                    if(value) {
                        var storage = JSON.stringify(value);
                        if (storage) {
                            localStorage.setItem(_entry, storage);
                        };
                    }
                }
            }
        })
    });
})(WinJS);