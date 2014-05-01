(function (WinJS) {

    //http://dev.virtualearth.net/REST/v1/Imagery/Metadata/imagerySet/centerPoint?orientation=orientation&zoomLevel=zoomLevel&include=ImageryProviders&key=BingMapsKey

    var _key = "Ah3HFyLsjxFXG_nUBvvA2F1DEupYsBLn_EPMRAjwt1XHhMkR-XJPZGjbyXlDRUNO";
    var _url = "http://dev.virtualearth.net/REST/v1/Imagery/Metadata/Road/";
    var _urlParams = "?zl=15&o=json&c=en";
    var _urlKey = "&key=" + _key;

    WinJS.Namespace.define("App.Services.Maps", {
        getMap: function (long, lat) {
            var url = _url + lat + "," + long + _urlParams + _urlKey;
            return WinJS.xhr({
                url: url,
                responseType: "json"
            }).then(function (response) {
                var data = JSON.parse(response.responseText);
                var rs = data.resourceSets[0];
                var r = rs.resources[0];
                var url = r.imageUrl;
                url = url.replace("{culture}", "en");
                return WinJS.Promise.wrap({
                    url: url,
                    imageHeight: r.imageHeight,
                    imageWidth: r.imageWidth
                }, function (error) {
                    console.log(error);
                    return WinJS.Promise.wrapError(error);
                })
            });
        }
    });

}(WinJS));