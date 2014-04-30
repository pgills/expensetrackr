(function (WinJS) {
    WinJS.Namespace.define("App.Services",
        {
            Camera: WinJS.Class.define(function ctor() {
                

                if(navigator.camera) {
                    this._camera = navigator.camera;
                }
            },
            {
                getPicture: function () {
                    var that = this;
                    var p = new WinJS.Promise(function (c, e) {
                        navigator.camera.getPicture(function (success) {
                            c(success);
                        }, function (error) {
                            e(error);
                        }, {
                            quality: 20, destinationType: 0, targetWidth: 100, targetHeight: 100
                        });
                    });

                    return p;
                }
            })
        });

}(WinJS));