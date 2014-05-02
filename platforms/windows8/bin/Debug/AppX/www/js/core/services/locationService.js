(function (WinJS) {

    var _key = "Ah3HFyLsjxFXG_nUBvvA2F1DEupYsBLn_EPMRAjwt1XHhMkR-XJPZGjbyXlDRUNO";

    WinJS.Namespace.define("App.Services",
        {
            Location: WinJS.Class.define(function ctor() {
                // Check to see if have the Cordova library
                // If not just use HTML geo-loc
                this._location = {
                    getCurrentPosition: function (success, error) {
                        var position = {
                            coords: {
                                longitude: 0,
                                latitude: 0
                            }
                        };
                        success(position);
                    }
                }

                if (navigator.geolocation) {
                    this._location = navigator.geolocation;
                }

            },
            {
                getCurrentPosition: function () {

                    var that = this;
                    var p = new WinJS.Promise(function (c, e) {
                        that._location.getCurrentPosition(function (success) {
                            c(success);
                        }, function (error) {
                            e(error);
                        });
                    });

                    return p;
                }
            })
        });

}(WinJS));