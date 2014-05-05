(function (WinJS) {
    var _platformMap = {
        "mobile": "(max-width: 320px)"
    }

    WinJS.Namespace.define("App.Views.Util", {
        setPlatformView: function () {
            Object.keys(_platformMap).forEach(function (platform) {
                if (matchMedia(_platformMap[platform]).matches) {
                    WinJS.Utilities.addClass(document.body, platform);
                } else {
                    WinJS.Utilities.removeClass(document.body, platform);
                }
            });
        },

        checkPlatformView: function(platform) {
            return WinJS.Utilities.hasClass(document.body, platform);
        }
    });
})(WinJS);