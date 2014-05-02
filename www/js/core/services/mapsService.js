(function (WinJS) {

    // Examples from Bing Maps REST Services
    // Image data:
    // http://dev.virtualearth.net/REST/v1/Imagery/Metadata/imagerySet/centerPoint?orientation=orientation&zoomLevel=zoomLevel&include=ImageryProviders&key=BingMapsKey
    // Location data:
    // http://dev.virtualearth.net/REST/v1/Locations/47.64054,-122.12934?o=xml&key=BingMapsKey

    // Bing Maps API Key
    var _key = "Ah3HFyLsjxFXG_nUBvvA2F1DEupYsBLn_EPMRAjwt1XHhMkR-XJPZGjbyXlDRUNO";

    // Base urls
    var _imageUrl = "http://dev.virtualearth.net/REST/v1/Imagery/Metadata/Road/";
    var _imageUrlParams = "?zl=15&c=en";
    var _locationUrl = "http://dev.virtualearth.net/REST/v1/Locations/";
    var _locationUrlParams = "?";
    var _format = "&o=json";
    var _urlKey = "&key=" + _key;

    WinJS.Namespace.define("App.Services.Maps", {
        getMap: function (long, lat) {
            var url = _imageUrl + lat + "," + long + _imageUrlParams + _format + _urlKey;
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
        },

        getAddress: function (long, lat) {
            var url = _locationUrl + lat + "," + long + _locationUrlParams + _format + _urlKey;
            return WinJS.xhr({
                url: url,
                responseType: "json"
            }).then(function (response) {
                var data = JSON.parse(response.responseText);
                var rs = data.resourceSets[0];
                var r = rs.resources[0];
                return WinJS.Promise.wrap(r.address);
            }, function (error) {
                console.log(error);
                return WinJS.Promise.wrapError(error);
            })
        }
    });

}(WinJS));