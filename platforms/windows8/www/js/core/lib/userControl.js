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

                disposeCommands: function () {
                    if (this.commander) {
                        this.commander.unregister();
                    }
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

                    // Add commands
                    this.commander = new UIKeyCommander(element, options);


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

    // Master map of all controls
    var commandMap = {};

    // Cache of all the labels
    var commandLabels = {};

    var keyListener = null;
    var overlayed = false;

    // UI Commander for keyboard accelerators
    var UIKeyCommander = WinJS.Class.define(function (element, options) {
        this.element = element;
        this.options = options;
        this.commands = [];
       

        // Collect all the commands from the element tree
        var cmdElements = this.element.querySelectorAll("[data-win-command]");

        // Parse the command data for all the commands
        for (var i = 0, len = cmdElements.length; i < len; i++) {
            var cmdElement = cmdElements[i];

            var command = {};
            command.element = cmdElement;
            command.id = cmdElement.uniqueID;
            command.label = cmdElement.getAttribute("data-win-command").toLowerCase();
            command.action = cmdElement.getAttribute("data-win-command-action");
            command.target = cmdElement.getAttribute("data-win-command-target") || null;



            this.commands.push(command);
            
            UIKeyCommander.registerCommand(command);

            // this is hack right now, we need to think about unregistering with the current pages model
            WinJS.Navigation.addEventListener("beforenavigate", function (ev) {
                
            }.bind(this));
        }
    },
    {
        unregister: function () {
            for (var i = 0, len = this.commands.length; i < len; i++) {
                //var command = this.commands[i];
                //if (command.label !== "r" || command.label !== "i" || command.label !== "b") {
                    UIKeyCommander.unregisterCommand(this.commands[i]);
                //}
                
            }

            this.commands = null;
        }
    },
    {
        registerCommand: function (command) {
            // Check to see if we've already registered the command based on label
            if (commandMap.hasOwnProperty(command.label)) {
                // Check to see if we already have an array of commands (2 or more)
                var commands = commandMap[command.label];
                if(typeof commands === Array) {
                    // Push the new command
                    commands.push(command);
                } else {
                    // This means just have one command (1)
                    var oldCommand = commands;
                    var commandArray = [];
                    commandArray.push(oldCommand);
                    commandArray.push(command);
                    commandMap[command.label] = commandArray;
                }
            } else {
                // We haven't registed this command before
                commandMap[command.label] = command;
            }

            // Add the look up
            commandLabels[command.id] = command;

        },

        unregisterCommand: function (command) {
            // Check to see if it's registered
            if (commandMap.hasOwnProperty(command.label)) {
                // Check to see if we have more than one registered for this label
                var commands = commandMap[command.label];
                if (typeof commands === Array) {
                    // Find the one with the matching id
                    for (var i = 0, len = commands.length; i < len; i++) {
                        if (commands[i].id === command.id) {
                            commands.splice(i, 1);
                        }
                    }
                } else {
                    delete commandMap[command.label];
                    delete commandLabels[command.id];
                }
            }
        },

        showCommands: function () {

            var appbars = document.querySelectorAll(".win-appbar:not(.win-navbar)");
            for (var i = 0, len = appbars.length; i < len; i++) {
                var appbar = appbars[i];
                if (appbar.winControl) {
                    if (i === len - 1) {
                        
                    }
                    appbar.winControl.show();
                }
            }

            showLabels();
        },

        hideCommands: function () {
            var labels = document.querySelectorAll(".win-keyboard-label");
            for (var i = 0, len = labels.length; i < len; i++) {
                document.body.removeChild(labels[i]);
            }

            var appbars = document.querySelectorAll(".win-appbar:not(.win-navbar)");
            for (var i = 0, len = appbars.length; i < len; i++) {
                var appbar = appbars[i];
                if (appbar.winControl) {
                    appbar.winControl.hide();
                }
            }
        },

        regsiterKeyListener: function () {
            WinJS.Navigation.addEventListener("beforenavigate", function (ev) {
                UIKeyCommander.hideCommands();
                overlayed = false;
            })
            keyListener = function (ev) {
                if (ev.key === "Alt") {
                    if (!overlayed) {
                        UIKeyCommander.showCommands();
                        overlayed = true;
                    } else {
                        UIKeyCommander.hideCommands();
                        overlayed = false;
                    }
                } else if (overlayed) {
                    var label = ev.key.toLowerCase();
                    if (commandMap.hasOwnProperty(label)) {
                        var command = commandMap[label];

                        var target = command.element;
                        if (command.target) {
                            target = document.querySelector(command.target);
                        }
                        target[command.action]();
                    ;
                        
                    }

                    UIKeyCommander.hideCommands();
                    overlayed = false;
                    
                }
              
            };
            document.body.addEventListener("keyup", keyListener);
        },

        unregisterKeyListener: function () {
            document.body.removeEventListener("keyup", keyListener);
        }

    });

    WinJS.Namespace.define("App.Utils", {
        UIKeyCommander: UIKeyCommander
    });

    function showLabels() {
        var commands = Object.keys(commandLabels);
        for (var i = 0, len = commands.length; i < len; i++) {
            var commandId = commands[i];
            var command = commandLabels[commandId];
            var element = command.element;


            // Construct the label
            var label = document.createElement("div");
            label.style.width = "20px";
            label.style.height = "20px";
            label.style.padding = "5px";
            label.style.border = "solid 2px #fff";
            label.style.color = "#fff"
            label.style.backgroundColor = "#000";
            label.style.position = "absolute";
            label.textContent = command.label;
            label.style.fontVariant = "small-caps";
            label.style.zIndex = "1000";
            WinJS.Utilities.addClass(label, "win-keyboard-label");

            var computed = window.getComputedStyle(element);

            // Get the element's position and size 
            var top = element.getBoundingClientRect().top;
            var left = element.getBoundingClientRect().left;
            var width = parseInt(computed.width);
            var height = parseInt(computed.height);

            // Off screen detection
            if (top < 50) {
                top += height + 20
            } else if(top >= window.outerHeight) {
                top -= height + 72;
            } else {
                top -= 52;
            }

            // Position the label
            label.style.top = top + "px";
            left = left + (width * 0.5) - 25;

            if (left <= 0) {
                left = 5;
            } else if (left + 5 >= window.outerWidth) {
                left = window.outerWidth - 5;
            }
            label.style.left = left + "px";

            if (computed.visibility !== "hidden" && computed.display !== "none") {
                document.body.appendChild(label);
            }
           
        }

        document.body.style.position = "relative";
    }
}())
