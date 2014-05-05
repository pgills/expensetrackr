(function () {

    // Various helpers and utilities

    WinJS.Namespace.define("Binding", {

        appendChildOneTime: WinJS.Binding.initializer(function (s, sp, d, dp) {
            var element = sp.reduce(function (v, p) { return v[p]; }, s);
            if (element) {
                d.appendChild(element);
            }
        }),

        twoWayChangeBind: WinJS.Binding.initializer(function (s, sp, d, dp) {
            var oneway = WinJS.Binding.defaultBind(s, sp, d, dp);
            var change = function () {
                var destinationValue = dp.reduce(function (v, p) { return v[p] }, d);
                var sourceValue = sp.reduce(function (v, p) { return v[p] }, s);
                if (destinationValue !== sourceValue) {
                    var lastObject = sp.slice(0, sp.length - 1).reduce(function (v, p) { return v[p] }, s);
                    lastObject[sp[sp.length - 1]] = destinationValue;
                }
            };
            d.addEventListener("change", change);
            d.addEventListener("submit", change);
            return {
                cancel: function () {
                    oneway.cancel();
                    d.addEventListener("change", change);
                    d.addEventListener("submit", change);
                }
            };
        }),

        noneIfFalse: WinJS.Binding.converter(function (v) {
            return v ? "auto" : "none";
        }),

        unreadCountAria: WinJS.Binding.converter(function (v) {
            return v + " unread";
        }),

        hasContent: WinJS.Binding.converter(function (v) {
            return (v._content) ? v._content : v;
        }),

        openClosePane: WinJS.Binding.converter(function (v) {
            return (v) ? "&#xE127;" : "&#xE126;";
        }),

        toDate: WinJS.Binding.converter(function (v) {
            var retVal = new Date().toDateString();
            if (v && v.toDateString) {
                retVal = v.toDateString();
            }
            return retVal;
        }),

        toCost: WinJS.Binding.converter(function (v) {
            var retVal = 0.00;
            if (v) {
                retVal = v;
            }
            retVal = "$" + retVal;
            return retVal;
        }),

        toImg: WinJS.Binding.converter(function (v) {
            var retVal = "img/logo.png";
            if(v !== null) {
                retVal = v;
            }
            return retVal;
        })

    })

    WinJS.Namespace.define("UserControl", {

        define: function (url, members) {

            var init = members.init || function () { };
            var dispose = members.dispose || function () { };
            var processed = members.processed || function () { };

            members = WinJS.Utilities._merge(members, {

                init: function (element, options) {
                    this.dataContext = this;
                    return init.call(this, element, options);
                },

                dispose: function () {
                    var bindings = WinJS.Utilities.data(this.element).winBindings || [];
                    bindings.forEach(function (binding) { binding.cancel(); });
                    
                    dispose.call(this);
                },

                processed: function (element, options) {
                    var that = this;
                    var named = this.element.querySelectorAll("[data-win-name]");
                    for (var i = 0, len = named.length; i < len; i++) {
                        var child = named[i];
                        var name = child.getAttribute("data-win-name");
                        if (name in this) {
                            throw "Already have a member by this name";
                        }
                        this[name] = child;
                    }

                    // The built in processAll for Pages should probably call this with skipRoot: true
                    return WinJS.UI.processAll(element, true).then(function () {
                        return WinJS.Binding.processAll(element, that.dataContext, true).then(function () {
                            return processed.call(that, element, options);
                        });
                    });
                },

            });

            // User control should definitely be a declartive control container.
            var control = WinJS.UI.Pages.define(url, members);
            control.isDeclarativeControlContainer = true;
            return control;

        },

    });

    // It seems the case that HtmlControl should be marked as a declarative control container
    WinJS.UI.HtmlControl.isDeclarativeControlContainer = true;
}());
