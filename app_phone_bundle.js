(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _appControler = require('./phoneapp/appControler.js');

(function () {

    function pageLoad() {
        new _appControler.AppControler();
    }

    window.addEventListener('load', pageLoad);
})();

},{"./phoneapp/appControler.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppControler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ollieControler = require('../webbluetooth/ollieControler.js');

var _webNfcControler = require('../sensors/webNfcControler.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppControler = exports.AppControler = function () {
    function AppControler() {
        _classCallCheck(this, AppControler);

        this.ollie = new _ollieControler.Ollie();
        this.webNFC = new _webNfcControler.WebNfcControler();

        this.originalAngle = -1;
        this.ollieControl = {
            power: 0,
            angle: 0
        };

        this._initTabOllie();

        this._initTabWebNFC();
    }

    _createClass(AppControler, [{
        key: '_initTabOllie',
        value: function _initTabOllie() {
            var _this = this;

            // Hide areas 
            var rowConnectOllie = document.getElementById('rowConnectOllie');
            var rowControlOllie = document.getElementById('rowControlOllie');

            // Btn connection
            document.getElementById('btnConnect').addEventListener('click', function () {
                _this.ollie.request().then(function (_) {
                    return _this.ollie.connect();
                }).then(function (_) {
                    return _this.ollie.init();
                }).then(function (_) {
                    rowConnectOllie.style.display = 'none';
                    rowControlOllie.style.display = '';
                });
            });

            // Basic Control
            document.getElementById('btnUp').addEventListener('touchStart', function (_) {
                return _this.ollie.processMotor(0, 50);
            });
            document.getElementById('btnDown').addEventListener('touchStart', function (_) {
                return _this.ollie.processMotor(180, 50);
            });
            document.getElementById('btnLeft').addEventListener('touchStart', function (_) {
                return _this.ollie.processMotor(270, 50);
            });
            document.getElementById('btnRight').addEventListener('touchStart', function (_) {
                return _this.ollie.processMotor(90, 50);
            });

            document.getElementById('btnUp').addEventListener('touchEnd', function (_) {
                return _this.ollie.processMotor(0, 0);
            });
            document.getElementById('btnDown').addEventListener('touchEnd', function (_) {
                return _this.ollie.processMotor(180, 0);
            });
            document.getElementById('btnLeft').addEventListener('touchEnd', function (_) {
                return _this.ollie.processMotor(270, 0);
            });
            document.getElementById('btnRight').addEventListener('touchEnd', function (_) {
                return _this.ollie.processMotor(90, 0);
            });

            // Orientation Control
            document.getElementById('btnOrientation').addEventListener('click', function (_) {
                window.addEventListener('deviceorientation', _this._orientationHandler.bind(_this));
            });
            document.getElementById('btnStopOrientation').addEventListener('click', function (_) {
                window.removeEventListener('deviceorientation', _this._orientationHandler.bind(_this));
                _this.ollieControl.power = 0;
                _this.ollie.processMotor(_this.ollieControl.angle, 0);
            });
        }
    }, {
        key: '_orientationHandler',
        value: function _orientationHandler(event) {
            // Alpha = turn the phone like a compass
            var alpha = Math.round(event.alpha);
            // Beta = lean the phone. Lean to the front = negative number, lean to the back = positive number
            var beta = event.beta < 0 ? Math.max(Math.round(event.beta), -45) : Math.min(Math.round(event.beta), 45);

            // We will use Alpha to direct the ollie and Beta to control the power
            if (this.originalAngle === -1) {
                this.originalAngle = alpha;
            }

            // We calculate the compute angle to know how to drive the Ollie
            var calculateAngle = (this.originalAngle - alpha + 360) % 360;
            // The final angle depends on the inclinaison of the phone (we have to reverse it)
            var finalAngle = event.beta < 0 ? calculateAngle : Math.abs(360 - (calculateAngle + 270) % 360);
            // We calculate the power to applicate      
            var power = Math.round(Math.abs(beta) / 45 * 100);

            if (this.ollieControl.angle != finalAngle || this.ollieControl.power != power) {
                this.ollieControl.angle = finalAngle;
                this.ollieControl.power = power;
                this.ollie.processMotor(finalAngle, power);
            }
        }
    }, {
        key: '_moveOllie',
        value: function _moveOllie(direction, power) {
            this.ollie;
        }
    }, {
        key: '_initTabWebNFC',
        value: function _initTabWebNFC() {
            var _this2 = this;

            document.getElementById('btnNfcTag').addEventListener('click', function (_) {
                return _this2.webNFC.pushToTag();
            });
            document.getElementById('btnNfcACS').addEventListener('click', function (_) {
                return _this2.webNFC.pushToAcs();
            });
        }
    }]);

    return AppControler;
}();

},{"../sensors/webNfcControler.js":3,"../webbluetooth/ollieControler.js":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebNfcControler = exports.WebNfcControler = function () {
    function WebNfcControler() {
        _classCallCheck(this, WebNfcControler);
    }

    _createClass(WebNfcControler, [{
        key: "pushToTag",
        value: function pushToTag() {
            navigator.nfc.push({
                data: [{ recordType: "url", data: "https://devfest.gdgnantes.com" }]
            }).then(function () {
                console.log("Message pushed.");
            }).catch(function (error) {
                console.log("Push failed :-( try again.");
            });
        }
    }, {
        key: "pushToAcs",
        value: function pushToAcs(data) {
            // TODO 
            navigator.nfc.push({
                data: [{ recordType: "url", data: "https://jef.binomed.fr" }]
            }).then(function () {
                console.log("Message pushed.");
            }).catch(function (error) {
                console.log("Push failed :-( try again.");
            });
        }
    }]);

    return WebNfcControler;
}();

},{}],4:[function(require,module,exports){
'use strict';

/**
 * Code from https://github.com/binomed/sphero_ollie-web-bluetooth 
 */

/**
 * General configuration (UUID)
*/

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function () {
    function Config() {
        _classCallCheck(this, Config);
    }

    _createClass(Config, [{
        key: "radioService",
        value: function radioService() {
            return "22bb746f-2bb0-7554-2d6f-726568705327";
        }
    }, {
        key: "robotService",
        value: function robotService() {
            return "22bb746f-2ba0-7554-2d6f-726568705327";
        }
    }, {
        key: "controlCharacteristic",
        value: function controlCharacteristic() {
            return "22bb746f-2ba1-7554-2d6f-726568705327";
        }
    }, {
        key: "antiDOSCharateristic",
        value: function antiDOSCharateristic() {
            return "22bb746f-2bbd-7554-2d6f-726568705327";
        }
    }, {
        key: "powerCharateristic",
        value: function powerCharateristic() {
            return "22bb746f-2bb2-7554-2d6f-726568705327";
        }
    }, {
        key: "wakeUpCPUCharateristic",
        value: function wakeUpCPUCharateristic() {
            return "22bb746f-2bbf-7554-2d6f-726568705327";
        }
    }]);

    return Config;
}();

/**
 * Class for the robot
 * */


var Ollie = exports.Ollie = function () {
    function Ollie() {
        _classCallCheck(this, Ollie);

        this.device = null;
        this.config = new Config();
        this.onDisconnected = this.onDisconnected.bind(this);
        this.buzzerIndex = 0;
        this.sequence = 0;
        this.busy = false;
        this.Motors = {
            off: 0x00,
            forward: 0x01,
            reverse: 0x02,
            brake: 0x03,
            ignore: 0x04
        };
    }

    /*
    Request the device with bluetooth
    */


    _createClass(Ollie, [{
        key: "request",
        value: function request() {
            var _this = this;

            var options = {
                "filters": [{
                    "services": [this.config.radioService()]
                }, {
                    "services": [this.config.robotService()]
                }],
                "optionalServices": [this.config.radioService(), this.config.robotService()]
            };
            return navigator.bluetooth.requestDevice(options).then(function (device) {
                _this.device = device;
                _this.device.addEventListener('gattserverdisconnected', _this.onDisconnected);
                return device;
            });
        }

        /**
         * Connect to the device
         * */

    }, {
        key: "connect",
        value: function connect() {
            if (!this.device) {
                return Promise.reject('Device is not connected.');
            } else {
                return this.device.gatt.connect();
            }
        }
    }, {
        key: "init",
        value: function init() {
            var _this2 = this;

            if (!this.device) {
                return Promise.reject('Device is not connected.');
            } else {

                return this._writeCharacteristic(this.config.radioService(), this.config.antiDOSCharateristic(), new Uint8Array('011i3'.split('').map(function (c) {
                    return c.charCodeAt();
                }))).then(function () {
                    console.log('> Found Anti DOS characteristic');
                    return _this2._writeCharacteristic(_this2.config.radioService(), _this2.config.powerCharateristic(), new Uint8Array([0x07]));
                }).then(function () {
                    console.log('> Found TX Power characteristic');
                    return _this2._writeCharacteristic(_this2.config.radioService(), _this2.config.wakeUpCPUCharateristic(), new Uint8Array([0x01]));
                }).then(function () {
                    console.log('Wake CPU write done.');
                    //Set rgbLed to 0
                    var color = 0x01;
                    color &= 0xFF;
                    return _this2._sendCommand(0x02, 0x20, new Uint8Array([color]));
                }).then(function () {
                    console.log('Rgb Led set to 0');
                    // set BackLed to 127
                    return _this2._sendCommand(0x02, 0x21, new Uint8Array([127]));
                }).then(function () {
                    console.log('Back Led set to 127');
                    // set stabilisation to 0
                    var flag = 0;
                    flag &= 0x01;
                    return _this2._sendCommand(0x02, 0x02, new Uint8Array([flag]));
                }).then(function () {
                    console.log('Stabilisation set to 0');
                    // Set heading to 0
                    var heading = 0;
                    return _this2._sendCommand(0x02, 0x01, new Uint8Array([heading >> 8, heading & 0xFF]));
                }).then(function () {
                    console.log('Heading set to 0, device is ready !');
                }).catch(function (error) {
                    console.error(error);
                });
            }
        }

        /**
         * Control the motors of robot
        */

    }, {
        key: "processMotor",
        value: function processMotor(heading, power) {
            var _this3 = this;

            console.log('Roll heading=' + heading);
            if (this.busy) {
                // Return if another operation pending
                return Promise.resolve();
            }
            this.busy = true;
            var did = 0x02; // Virtual device ID
            var cid = 0x30; // Roll command
            // Roll command data: speed, heading (MSB), heading (LSB), state
            var data = new Uint8Array([power, heading >> 8, heading & 0xFF, 1]);

            return this._sendCommand(did, cid, data).then(function () {
                _this3.busy = false;
                return Promise.resolve();
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: "processColor",
        value: function processColor(red, blue, green) {
            var _this4 = this;

            console.log('Set color: r=' + red + ',g=' + green + ',b=' + blue);
            if (this.busy) {
                // Return if another operation pending
                return Promise.resolve();
            }
            this.busy = true;
            var did = 0x02; // Virtual device ID
            var cid = 0x20; // Set RGB LED Output command
            // Color command data: red, green, blue, flag
            var data = new Uint8Array([red, green, blue, 0]);

            return this._sendCommand(did, cid, data).then(function () {
                console.log("color set ! ");
                _this4.busy = false;
                return Promise.resolve();
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: "processSpin",
        value: function processSpin(lmotor, rmotor) {
            console.log('Spin');
            if (this.busy) {
                return Promise.resolve();
            }
            this.busy = true;
            var did = 0x02; //Virtual device ID
            var cid = 0x33; // Set raw Motors command


            var lmode = lmotor & 0x07;
            var lpower = 200 & 0xFF;
            var rmode = rmotor & 0x07;
            var rpower = 200 & 0xFF;

            var data = new Uint8Array([lmode, lpower, rmode, rpower]);

            return this._sendCommand(did, cid, data).then(function () {
                return new Promise(function (resolve, reject) {
                    var _this5 = this;

                    setTimeout(function () {
                        var lmode = _this5.Motors.off & 0x07;
                        var lpower = 200 & 0xFF;
                        var rmode = _this5.Motors.off & 0x07;
                        var rpower = 200 & 0xFF;

                        var data = new Uint8Array([lmode, lpower, rmode, rpower]);

                        _this5._sendCommand(did, cid, data).then(function () {
                            _this5.busy = false;
                            resolve();
                        }).catch(function (error) {
                            console.error(error);
                            reject(error);
                        });
                    }, 1000);
                });
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: "disconnect",
        value: function disconnect() {
            if (!this.device) {
                return Promise.reject('Device is not connected.');
            } else {
                return this.device.gatt.disconnect();
            }
        }
    }, {
        key: "onDisconnected",
        value: function onDisconnected() {
            console.log('Device is disconnected.');
        }
    }, {
        key: "_intToHexArray",
        value: function _intToHexArray(value, numBytes) {
            var hexArray = new Array(numBytes);

            for (var i = numBytes - 1; i >= 0; i--) {
                hexArray[i] = value & 0xFF;
                value >>= 8;
            }

            return hexArray;
        }
    }, {
        key: "_sendCommand",
        value: function _sendCommand(did, cid, data) {
            // Create client command packets
            // API docs: https://github.com/orbotix/DeveloperResources/blob/master/docs/Sphero_API_1.50.pdf
            // Next sequence number
            var seq = this.sequence & 255;
            this.sequence += 1;
            // Start of packet #2
            var sop2 = 0xfc;
            sop2 |= 1; // Answer
            sop2 |= 2; // Reset timeout
            // Data length
            var dlen = data.byteLength + 1;
            var sum = data.reduce(function (a, b) {
                return a + b;
            });
            // Checksum
            var chk = sum + did + cid + seq + dlen & 255;
            chk ^= 255;
            var checksum = new Uint8Array([chk]);

            var packets = new Uint8Array([0xff, sop2, did, cid, seq, dlen]);
            // Append arrays: packet + data + checksum
            var array = new Uint8Array(packets.byteLength + data.byteLength + checksum.byteLength);
            array.set(packets, 0);
            array.set(data, packets.byteLength);
            array.set(checksum, packets.byteLength + data.byteLength);
            return this._writeCharacteristic(this.config.robotService(), this.config.controlCharacteristic(), array).then(function (returnData) {
                console.log('Command write done. : %s', returnData);
                return Promise.resolve();
            });
        }
    }, {
        key: "_writeCharacteristic",
        value: function _writeCharacteristic(serviceUID, characteristicUID, value) {
            return this.device.gatt.getPrimaryService(serviceUID).then(function (service) {
                return service.getCharacteristic(characteristicUID);
            }).then(function (characteristic) {
                return characteristic.writeValue(value);
            });
        }
    }]);

    return Ollie;
}();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzXFxhcHBfcGhvbmUuanMiLCJzY3JpcHRzXFxwaG9uZWFwcFxcYXBwQ29udHJvbGVyLmpzIiwic2NyaXB0c1xcc2Vuc29yc1xcd2ViTmZjQ29udHJvbGVyLmpzIiwic2NyaXB0c1xcd2ViYmx1ZXRvb3RoXFxvbGxpZUNvbnRyb2xlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUNBOztBQUVBLENBQUMsWUFBVTs7QUFFUCxhQUFTLFFBQVQsR0FBbUI7QUFDZjtBQUNIOztBQUVELFdBQU8sZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsUUFBaEM7QUFDSCxDQVBEOzs7QUNIQTs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7SUFFYSxZLFdBQUEsWTtBQUNULDRCQUFhO0FBQUE7O0FBQ1QsYUFBSyxLQUFMLEdBQWEsMkJBQWI7QUFDQSxhQUFLLE1BQUwsR0FBYyxzQ0FBZDs7QUFFQSxhQUFLLGFBQUwsR0FBcUIsQ0FBQyxDQUF0QjtBQUNBLGFBQUssWUFBTCxHQUFvQjtBQUNoQixtQkFBUSxDQURRO0FBRWhCLG1CQUFRO0FBRlEsU0FBcEI7O0FBS0EsYUFBSyxhQUFMOztBQUVBLGFBQUssY0FBTDtBQUVIOzs7O3dDQUVjO0FBQUE7O0FBQ1g7QUFDQSxnQkFBTSxrQkFBa0IsU0FBUyxjQUFULENBQXdCLGlCQUF4QixDQUF4QjtBQUNBLGdCQUFNLGtCQUFrQixTQUFTLGNBQVQsQ0FBd0IsaUJBQXhCLENBQXhCOztBQUVBO0FBQ0EscUJBQVMsY0FBVCxDQUF3QixZQUF4QixFQUFzQyxnQkFBdEMsQ0FBdUQsT0FBdkQsRUFBZ0UsWUFBSTtBQUNoRSxzQkFBSyxLQUFMLENBQVcsT0FBWCxHQUNDLElBREQsQ0FDTTtBQUFBLDJCQUFHLE1BQUssS0FBTCxDQUFXLE9BQVgsRUFBSDtBQUFBLGlCQUROLEVBRUMsSUFGRCxDQUVNO0FBQUEsMkJBQUcsTUFBSyxLQUFMLENB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QWUsVUFBZixDQUEwQixLQUExQixDQUFsQjtBQUFBLGFBRkgsQ0FBUDtBQUdIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xyXG5pbXBvcnQge0FwcENvbnRyb2xlcn0gZnJvbSAnLi9waG9uZWFwcC9hcHBDb250cm9sZXIuanMnO1xyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgZnVuY3Rpb24gcGFnZUxvYWQoKXtcclxuICAgICAgICBuZXcgQXBwQ29udHJvbGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBwYWdlTG9hZCk7XHJcbn0pKCk7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IHtPbGxpZX0gZnJvbSAnLi4vd2ViYmx1ZXRvb3RoL29sbGllQ29udHJvbGVyLmpzJztcclxuaW1wb3J0IHtXZWJOZmNDb250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvd2ViTmZjQ29udHJvbGVyLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBDb250cm9sZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMub2xsaWUgPSBuZXcgT2xsaWUoKTtcclxuICAgICAgICB0aGlzLndlYk5GQyA9IG5ldyBXZWJOZmNDb250cm9sZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcmlnaW5hbEFuZ2xlID0gLTE7XHJcbiAgICAgICAgdGhpcy5vbGxpZUNvbnRyb2wgPSB7XHJcbiAgICAgICAgICAgIHBvd2VyIDogMCxcclxuICAgICAgICAgICAgYW5nbGUgOiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5faW5pdFRhYk9sbGllKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2luaXRUYWJXZWJORkMoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgX2luaXRUYWJPbGxpZSgpe1xyXG4gICAgICAgIC8vIEhpZGUgYXJlYXMgXHJcbiAgICAgICAgY29uc3Qgcm93Q29ubmVjdE9sbGllID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvd0Nvbm5lY3RPbGxpZScpO1xyXG4gICAgICAgIGNvbnN0IHJvd0NvbnRyb2xPbGxpZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3dDb250cm9sT2xsaWUnKTtcclxuXHJcbiAgICAgICAgLy8gQnRuIGNvbm5lY3Rpb25cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuQ29ubmVjdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICAgICAgdGhpcy5vbGxpZS5yZXF1ZXN0KClcclxuICAgICAgICAgICAgLnRoZW4oXz0+dGhpcy5vbGxpZS5jb25uZWN0KCkpXHJcbiAgICAgICAgICAgIC50aGVuKF89PnRoaXMub2xsaWUuaW5pdCgpKVxyXG4gICAgICAgICAgICAudGhlbihfPT57XHJcbiAgICAgICAgICAgICAgICByb3dDb25uZWN0T2xsaWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIHJvd0NvbnRyb2xPbGxpZS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBCYXNpYyBDb250cm9sXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blVwJykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hTdGFydCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcigwLDUwKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkRvd24nKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaFN0YXJ0JywgXz0+IHRoaXMub2xsaWUucHJvY2Vzc01vdG9yKDE4MCw1MCkpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5MZWZ0JykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hTdGFydCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcigyNzAsNTApKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuUmlnaHQnKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaFN0YXJ0JywgXz0+IHRoaXMub2xsaWUucHJvY2Vzc01vdG9yKDkwLDUwKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blVwJykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hFbmQnLCBfPT4gdGhpcy5vbGxpZS5wcm9jZXNzTW90b3IoMCwwKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkRvd24nKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaEVuZCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcigxODAsMCkpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5MZWZ0JykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hFbmQnLCBfPT4gdGhpcy5vbGxpZS5wcm9jZXNzTW90b3IoMjcwLDApKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuUmlnaHQnKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaEVuZCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3Rvcig5MCwwKSk7XHJcblxyXG4gICAgICAgIC8vIE9yaWVudGF0aW9uIENvbnRyb2xcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuT3JpZW50YXRpb24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF89PntcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJywgdGhpcy5fb3JpZW50YXRpb25IYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blN0b3BPcmllbnRhdGlvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXz0+e1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLl9vcmllbnRhdGlvbkhhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMub2xsaWVDb250cm9sLnBvd2VyID0gMDtcclxuICAgICAgICAgICAgdGhpcy5vbGxpZS5wcm9jZXNzTW90b3IodGhpcy5vbGxpZUNvbnRyb2wuYW5nbGUsMCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgX29yaWVudGF0aW9uSGFuZGxlcihldmVudCl7XHJcbiAgICAgICAgLy8gQWxwaGEgPSB0dXJuIHRoZSBwaG9uZSBsaWtlIGEgY29tcGFzc1xyXG4gICAgICAgIGNvbnN0IGFscGhhID0gTWF0aC5yb3VuZChldmVudC5hbHBoYSk7XHJcbiAgICAgICAgLy8gQmV0YSA9IGxlYW4gdGhlIHBob25lLiBMZWFuIHRvIHRoZSBmcm9udCA9IG5lZ2F0aXZlIG51bWJlciwgbGVhbiB0byB0aGUgYmFjayA9IHBvc2l0aXZlIG51bWJlclxyXG4gICAgICAgIGNvbnN0IGJldGEgPSBldmVudC5iZXRhIDwgMCA/IFxyXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoTWF0aC5yb3VuZChldmVudC5iZXRhKSwgLTQ1KSA6XHJcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihNYXRoLnJvdW5kKGV2ZW50LmJldGEpLCA0NSkgO1xyXG5cclxuICAgICAgICAvLyBXZSB3aWxsIHVzZSBBbHBoYSB0byBkaXJlY3QgdGhlIG9sbGllIGFuZCBCZXRhIHRvIGNvbnRyb2wgdGhlIHBvd2VyXHJcbiAgICAgICAgaWYgKHRoaXMub3JpZ2luYWxBbmdsZSA9PT0gLTEpe1xyXG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsQW5nbGUgPSBhbHBoYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdlIGNhbGN1bGF0ZSB0aGUgY29tcHV0ZSBhbmdsZSB0byBrbm93IGhvdyB0byBkcml2ZSB0aGUgT2xsaWVcclxuICAgICAgICBjb25zdCBjYWxjdWxhdGVBbmdsZSA9ICgodGhpcy5vcmlnaW5hbEFuZ2xlIC0gYWxwaGEpICsgMzYwKSAlIDM2MDtcclxuICAgICAgICAvLyBUaGUgZmluYWwgYW5nbGUgZGVwZW5kcyBvbiB0aGUgaW5jbGluYWlzb24gb2YgdGhlIHBob25lICh3ZSBoYXZlIHRvIHJldmVyc2UgaXQpXHJcbiAgICAgICAgY29uc3QgZmluYWxBbmdsZSA9IGV2ZW50LmJldGEgPCAwID8gY2FsY3VsYXRlQW5nbGUgOiBNYXRoLmFicygzNjAgLSAoKGNhbGN1bGF0ZUFuZ2xlICsgMjcwKSAlIDM2MCkpO1xyXG4gICAgICAgIC8vIFdlIGNhbGN1bGF0ZSB0aGUgcG93ZXIgdG8gYXBwbGljYXRlICAgICAgXHJcbiAgICAgICAgY29uc3QgcG93ZXIgPSBNYXRoLnJvdW5kKChNYXRoLmFicyhiZXRhKSAvIDQ1KSAqIDEwMCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9sbGllQ29udHJvbC5hbmdsZSAhPSBmaW5hbEFuZ2xlXHJcbiAgICAgICAgICAgIHx8IHRoaXMub2xsaWVDb250cm9sLnBvd2VyICE9IHBvd2VyKXtcclxuICAgICAgICAgICAgdGhpcy5vbGxpZUNvbnRyb2wuYW5nbGUgPSBmaW5hbEFuZ2xlO1xyXG4gICAgICAgICAgICB0aGlzLm9sbGllQ29udHJvbC5wb3dlciA9IHBvd2VyO1xyXG4gICAgICAgICAgICB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcihmaW5hbEFuZ2xlLCBwb3dlcik7XHJcbiAgICAgICAgfSAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBfbW92ZU9sbGllKGRpcmVjdGlvbiwgcG93ZXIpe1xyXG4gICAgICAgIHRoaXMub2xsaWVcclxuICAgIH1cclxuXHJcbiAgICBfaW5pdFRhYldlYk5GQygpe1xyXG4gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuTmZjVGFnJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfPT50aGlzLndlYk5GQy5wdXNoVG9UYWcoKSk7XHJcbiAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5OZmNBQ1MnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF89PnRoaXMud2ViTkZDLnB1c2hUb0FjcygpKTtcclxuICAgIH1cclxuXHJcbiAgIFxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBXZWJOZmNDb250cm9sZXJ7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAgcHVzaFRvVGFnKCl7XHJcbiAgICAgICAgbmF2aWdhdG9yLm5mYy5wdXNoKHtcclxuICAgICAgICAgICAgZGF0YTogW3sgcmVjb3JkVHlwZTogXCJ1cmxcIiwgZGF0YTogXCJodHRwczovL2RldmZlc3QuZ2RnbmFudGVzLmNvbVwiIH1dXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZSBwdXNoZWQuXCIpO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlB1c2ggZmFpbGVkIDotKCB0cnkgYWdhaW4uXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hUb0FjcyhkYXRhKXtcclxuICAgICAgICAvLyBUT0RPIFxyXG4gICAgICAgIG5hdmlnYXRvci5uZmMucHVzaCh7XHJcbiAgICAgICAgICAgIGRhdGE6IFt7IHJlY29yZFR5cGU6IFwidXJsXCIsIGRhdGE6IFwiaHR0cHM6Ly9qZWYuYmlub21lZC5mclwiIH1dXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZSBwdXNoZWQuXCIpO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlB1c2ggZmFpbGVkIDotKCB0cnkgYWdhaW4uXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogQ29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9iaW5vbWVkL3NwaGVyb19vbGxpZS13ZWItYmx1ZXRvb3RoIFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBHZW5lcmFsIGNvbmZpZ3VyYXRpb24gKFVVSUQpXHJcbiovXHJcbmNsYXNzIENvbmZpZyB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJhZGlvU2VydmljZSgpIHsgcmV0dXJuIFwiMjJiYjc0NmYtMmJiMC03NTU0LTJkNmYtNzI2NTY4NzA1MzI3XCIgfVxyXG4gICAgcm9ib3RTZXJ2aWNlKCkgeyByZXR1cm4gXCIyMmJiNzQ2Zi0yYmEwLTc1NTQtMmQ2Zi03MjY1Njg3MDUzMjdcIiB9XHJcbiAgICBjb250cm9sQ2hhcmFjdGVyaXN0aWMoKSB7IHJldHVybiBcIjIyYmI3NDZmLTJiYTEtNzU1NC0yZDZmLTcyNjU2ODcwNTMyN1wiIH1cclxuICAgIGFudGlET1NDaGFyYXRlcmlzdGljKCkgeyByZXR1cm4gXCIyMmJiNzQ2Zi0yYmJkLTc1NTQtMmQ2Zi03MjY1Njg3MDUzMjdcIiB9XHJcbiAgICBwb3dlckNoYXJhdGVyaXN0aWMoKSB7IHJldHVybiBcIjIyYmI3NDZmLTJiYjItNzU1NC0yZDZmLTcyNjU2ODcwNTMyN1wiIH1cclxuICAgIHdha2VVcENQVUNoYXJhdGVyaXN0aWMoKSB7IHJldHVybiBcIjIyYmI3NDZmLTJiYmYtNzU1NC0yZDZmLTcyNjU2ODcwNTMyN1wiIH1cclxufVxyXG5cclxuICAgIFxyXG5cclxuLyoqXHJcbiAqIENsYXNzIGZvciB0aGUgcm9ib3RcclxuICogKi9cclxuZXhwb3J0IGNsYXNzIE9sbGllIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZGV2aWNlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWcoKTtcclxuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdGVkID0gdGhpcy5vbkRpc2Nvbm5lY3RlZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnV6emVySW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuc2VxdWVuY2UgPSAwO1xyXG4gICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuTW90b3JzID0ge1xyXG4gICAgICAgICAgICBvZmYgOiAweDAwLFxyXG4gICAgICAgICAgICBmb3J3YXJkIDogMHgwMSxcclxuICAgICAgICAgICAgcmV2ZXJzZSA6IDB4MDIsXHJcbiAgICAgICAgICAgIGJyYWtlIDogMHgwMyxcclxuICAgICAgICAgICAgaWdub3JlIDogMHgwNFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgUmVxdWVzdCB0aGUgZGV2aWNlIHdpdGggYmx1ZXRvb3RoXHJcbiAgICAqL1xyXG4gICAgcmVxdWVzdCgpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgXCJmaWx0ZXJzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5yYWRpb1NlcnZpY2UoKV1cclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5yb2JvdFNlcnZpY2UoKV1cclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIFwib3B0aW9uYWxTZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcucmFkaW9TZXJ2aWNlKCksIHRoaXMuY29uZmlnLnJvYm90U2VydmljZSgpXVxyXG4gICAgICAgIH07ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50aGVuKGRldmljZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCB0aGlzLm9uRGlzY29ubmVjdGVkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZXZpY2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdCB0byB0aGUgZGV2aWNlXHJcbiAgICAgKiAqL1xyXG4gICAgY29ubmVjdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgaW5pdCgpe1xyXG4gICAgICAgIGlmKCF0aGlzLmRldmljZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5yYWRpb1NlcnZpY2UoKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuYW50aURPU0NoYXJhdGVyaXN0aWMoKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVWludDhBcnJheSgnMDExaTMnLnNwbGl0KCcnKS5tYXAoYyA9PiBjLmNoYXJDb2RlQXQoKSkpKVxyXG4gICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IEZvdW5kIEFudGkgRE9TIGNoYXJhY3RlcmlzdGljJyk7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcucmFkaW9TZXJ2aWNlKCksIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnBvd2VyQ2hhcmF0ZXJpc3RpYygpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KFsweDA3XSkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IEZvdW5kIFRYIFBvd2VyIGNoYXJhY3RlcmlzdGljJyk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLnJhZGlvU2VydmljZSgpLCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy53YWtlVXBDUFVDaGFyYXRlcmlzdGljKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoWzB4MDFdKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCk9PnsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV2FrZSBDUFUgd3JpdGUgZG9uZS4nKTsgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL1NldCByZ2JMZWQgdG8gMFxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gMHgwMTtcclxuICAgICAgICAgICAgICAgIGNvbG9yICY9IDB4RkY7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VuZENvbW1hbmQoMHgwMiwgMHgyMCwgbmV3IFVpbnQ4QXJyYXkoW2NvbG9yXSkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZ2IgTGVkIHNldCB0byAwJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgQmFja0xlZCB0byAxMjdcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kQ29tbWFuZCgweDAyLCAweDIxLCBuZXcgVWludDhBcnJheShbMTI3XSkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0JhY2sgTGVkIHNldCB0byAxMjcnKTtcclxuICAgICAgICAgICAgICAgIC8vIHNldCBzdGFiaWxpc2F0aW9uIHRvIDBcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnID0gMDtcclxuICAgICAgICAgICAgICAgIGZsYWcgJj0gMHgwMTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kQ29tbWFuZCgweDAyLCAweDAyLCBuZXcgVWludDhBcnJheShbZmxhZ10pKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdGFiaWxpc2F0aW9uIHNldCB0byAwJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgaGVhZGluZyB0byAwXHJcbiAgICAgICAgICAgICAgICBsZXQgaGVhZGluZyA9IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VuZENvbW1hbmQoMHgwMiwgMHgwMSwgbmV3IFVpbnQ4QXJyYXkoW2hlYWRpbmcgPj4gOCwgaGVhZGluZyAmIDB4RkZdKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhZGluZyBzZXQgdG8gMCwgZGV2aWNlIGlzIHJlYWR5ICEnKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnRyb2wgdGhlIG1vdG9ycyBvZiByb2JvdFxyXG4gICAgKi9cclxuICAgIHByb2Nlc3NNb3RvcihoZWFkaW5nLCBwb3dlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSb2xsIGhlYWRpbmc9JytoZWFkaW5nKTtcclxuICAgICAgICBpZiAodGhpcy5idXN5KSB7XHJcbiAgICAgICAgICAgIC8vIFJldHVybiBpZiBhbm90aGVyIG9wZXJhdGlvbiBwZW5kaW5nXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5idXN5ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZGlkID0gMHgwMjsgLy8gVmlydHVhbCBkZXZpY2UgSURcclxuICAgICAgICBsZXQgY2lkID0gMHgzMDsgLy8gUm9sbCBjb21tYW5kXHJcbiAgICAgICAgLy8gUm9sbCBjb21tYW5kIGRhdGE6IHNwZWVkLCBoZWFkaW5nIChNU0IpLCBoZWFkaW5nIChMU0IpLCBzdGF0ZVxyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoW3Bvd2VyLCBoZWFkaW5nID4+IDgsIGhlYWRpbmcgJiAweEZGLCAxXSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZW5kQ29tbWFuZChkaWQsIGNpZCwgZGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0NvbG9yKHJlZCxibHVlLGdyZWVuKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnU2V0IGNvbG9yOiByPScrcmVkKycsZz0nK2dyZWVuKycsYj0nK2JsdWUpO1xyXG4gICAgICAgIGlmICh0aGlzLmJ1c3kpIHtcclxuICAgICAgICAgICAgLy8gUmV0dXJuIGlmIGFub3RoZXIgb3BlcmF0aW9uIHBlbmRpbmdcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJ1c3kgPSB0cnVlO1xyXG4gICAgICAgIGxldCBkaWQgPSAweDAyOyAvLyBWaXJ0dWFsIGRldmljZSBJRFxyXG4gICAgICAgIGxldCBjaWQgPSAweDIwOyAvLyBTZXQgUkdCIExFRCBPdXRwdXQgY29tbWFuZFxyXG4gICAgICAgIC8vIENvbG9yIGNvbW1hbmQgZGF0YTogcmVkLCBncmVlbiwgYmx1ZSwgZmxhZ1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoW3JlZCwgZ3JlZW4sIGJsdWUsIDBdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRDb21tYW5kKGRpZCwgY2lkLCBkYXRhKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb2xvciBzZXQgISBcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvY2Vzc1NwaW4obG1vdG9yLCBybW90b3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTcGluJyk7XHJcbiAgICAgICAgaWYgKHRoaXMuYnVzeSl7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5idXN5ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZGlkID0gMHgwMjsgLy9WaXJ0dWFsIGRldmljZSBJRFxyXG4gICAgICAgIGxldCBjaWQgPSAweDMzOyAvLyBTZXQgcmF3IE1vdG9ycyBjb21tYW5kXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IGxtb2RlID0gbG1vdG9yICYgMHgwNztcclxuICAgICAgICBsZXQgbHBvd2VyID0gMjAwICYgMHhGRjtcclxuICAgICAgICBsZXQgcm1vZGUgPSBybW90b3IgJiAweDA3O1xyXG4gICAgICAgIGxldCBycG93ZXIgPSAyMDAgJiAweEZGO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoW2xtb2RlLCBscG93ZXIsIHJtb2RlLCBycG93ZXJdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRDb21tYW5kKGRpZCwgY2lkLCBkYXRhKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsbW9kZSA9IHRoaXMuTW90b3JzLm9mZiAmIDB4MDc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxwb3dlciA9IDIwMCAmIDB4RkY7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJtb2RlID0gdGhpcy5Nb3RvcnMub2ZmICYgMHgwNztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcnBvd2VyID0gMjAwICYgMHhGRjtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KFtsbW9kZSwgbHBvd2VyLCBybW9kZSwgcnBvd2VyXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRDb21tYW5kKGRpZCwgY2lkLCBkYXRhKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApOyAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNjb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZSBpcyBkaXNjb25uZWN0ZWQuJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9pbnRUb0hleEFycmF5KHZhbHVlLCBudW1CeXRlcykge1xyXG4gICAgICAgIHZhciBoZXhBcnJheSA9IG5ldyBBcnJheShudW1CeXRlcyk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSBudW1CeXRlcyAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGhleEFycmF5W2ldID0gdmFsdWUgJiAweEZGO1xyXG4gICAgICAgICAgICB2YWx1ZSA+Pj0gODtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoZXhBcnJheTtcclxuICAgICB9O1xyXG5cclxuXHJcbiAgICBfc2VuZENvbW1hbmQoZGlkLCBjaWQsIGRhdGEpIHtcclxuICAgICAgICAvLyBDcmVhdGUgY2xpZW50IGNvbW1hbmQgcGFja2V0c1xyXG4gICAgICAgIC8vIEFQSSBkb2NzOiBodHRwczovL2dpdGh1Yi5jb20vb3Jib3RpeC9EZXZlbG9wZXJSZXNvdXJjZXMvYmxvYi9tYXN0ZXIvZG9jcy9TcGhlcm9fQVBJXzEuNTAucGRmXHJcbiAgICAgICAgLy8gTmV4dCBzZXF1ZW5jZSBudW1iZXJcclxuICAgICAgICBsZXQgc2VxID0gdGhpcy5zZXF1ZW5jZSAmIDI1NTtcclxuICAgICAgICB0aGlzLnNlcXVlbmNlICs9IDE7XHJcbiAgICAgICAgLy8gU3RhcnQgb2YgcGFja2V0ICMyXHJcbiAgICAgICAgbGV0IHNvcDIgPSAweGZjO1xyXG4gICAgICAgIHNvcDIgfD0gMTsgLy8gQW5zd2VyXHJcbiAgICAgICAgc29wMiB8PSAyOyAvLyBSZXNldCB0aW1lb3V0XHJcbiAgICAgICAgLy8gRGF0YSBsZW5ndGhcclxuICAgICAgICBsZXQgZGxlbiA9IGRhdGEuYnl0ZUxlbmd0aCArIDE7XHJcbiAgICAgICAgbGV0IHN1bSA9IGRhdGEucmVkdWNlKChhLCBiKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIENoZWNrc3VtXHJcbiAgICAgICAgbGV0IGNoayA9IChzdW0gKyBkaWQgKyBjaWQgKyBzZXEgKyBkbGVuKSAmIDI1NTtcclxuICAgICAgICBjaGsgXj0gMjU1O1xyXG4gICAgICAgIGxldCBjaGVja3N1bSA9IG5ldyBVaW50OEFycmF5KFtjaGtdKTtcclxuXHJcbiAgICAgICAgbGV0IHBhY2tldHMgPSBuZXcgVWludDhBcnJheShbMHhmZiwgc29wMiwgZGlkLCBjaWQsIHNlcSwgZGxlbl0pO1xyXG4gICAgICAgIC8vIEFwcGVuZCBhcnJheXM6IHBhY2tldCArIGRhdGEgKyBjaGVja3N1bVxyXG4gICAgICAgIGxldCBhcnJheSA9IG5ldyBVaW50OEFycmF5KHBhY2tldHMuYnl0ZUxlbmd0aCArIGRhdGEuYnl0ZUxlbmd0aCArIGNoZWNrc3VtLmJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIGFycmF5LnNldChwYWNrZXRzLCAwKTtcclxuICAgICAgICBhcnJheS5zZXQoZGF0YSwgcGFja2V0cy5ieXRlTGVuZ3RoKTtcclxuICAgICAgICBhcnJheS5zZXQoY2hlY2tzdW0sIHBhY2tldHMuYnl0ZUxlbmd0aCArIGRhdGEuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcucm9ib3RTZXJ2aWNlKCksIHRoaXMuY29uZmlnLmNvbnRyb2xDaGFyYWN0ZXJpc3RpYygpLCBhcnJheSkudGhlbigocmV0dXJuRGF0YSk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbW1hbmQgd3JpdGUgZG9uZS4gOiAlcycscmV0dXJuRGF0YSk7ICBcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pOyAgICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gIFxyXG5cclxuICAgIF93cml0ZUNoYXJhY3RlcmlzdGljKHNlcnZpY2VVSUQsIGNoYXJhY3RlcmlzdGljVUlELCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKHNlcnZpY2VVSUQpXHJcbiAgICAgICAgICAgIC50aGVuKHNlcnZpY2UgPT4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyhjaGFyYWN0ZXJpc3RpY1VJRCkpXHJcbiAgICAgICAgICAgIC50aGVuKGNoYXJhY3RlcmlzdGljID0+IGNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUodmFsdWUpKTtcclxuICAgIH1cclxuXHJcblxyXG59Il19
