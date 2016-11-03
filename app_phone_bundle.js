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
                data: [{ recordType: "url", data: "https://jef.binomed.fr" }]
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FwcF9waG9uZS5qcyIsInNjcmlwdHMvcGhvbmVhcHAvYXBwQ29udHJvbGVyLmpzIiwic2NyaXB0cy9zZW5zb3JzL3dlYk5mY0NvbnRyb2xlci5qcyIsInNjcmlwdHMvd2ViYmx1ZXRvb3RoL29sbGllQ29udHJvbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBQ0E7O0FBRUEsQ0FBQyxZQUFVOztBQUVQLGFBQVMsUUFBVCxHQUFtQjtBQUNmO0FBQ0g7O0FBRUQsV0FBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxRQUFoQztBQUNILENBUEQ7OztBQ0hBOzs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztJQUVhLFksV0FBQSxZO0FBQ1QsNEJBQWE7QUFBQTs7QUFDVCxhQUFLLEtBQUwsR0FBYSwyQkFBYjtBQUNBLGFBQUssTUFBTCxHQUFjLHNDQUFkOztBQUVBLGFBQUssYUFBTCxHQUFxQixDQUFDLENBQXRCO0FBQ0EsYUFBSyxZQUFMLEdBQW9CO0FBQ2hCLG1CQUFRLENBRFE7QUFFaEIsbUJBQVE7QUFGUSxTQUFwQjs7QUFLQSxhQUFLLGFBQUw7O0FBRUEsYUFBSyxjQUFMO0FBRUg7Ozs7d0NBRWM7QUFBQTs7QUFDWDtBQUNBLGdCQUFNLGtCQUFrQixTQUFTLGNBQVQsQ0FBd0IsaUJBQXhCLENBQXhCO0FBQ0EsZ0JBQU0sa0JBQWtCLFNBQVMsY0FBVCxDQUF3QixpQkFBeEIsQ0FBeEI7O0FBRUE7QUFDQSxxQkFBUyxjQUFULENBQXdCLFlBQXhCLEVBQXNDLGdCQUF0QyxDQUF1RCxPQUF2RCxFQUFnRSxZQUFJO0FBQ2hFLHNCQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQ0MsSUFERCxDQUNNO0FBQUEsMkJBQUcsTUFBSyxLQUFMLENBQVcsT0FBWCxFQUFIO0FBQUEsaUJBRE4sRUFFQyxJQUZELENBRU07QUFBQSwyQkFBRyxNQUFLLEtBQUwsQ0FBVyxJQUFY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LENBQTBCLEtBQTFCLENBQWxCO0FBQUEsYUFGSCxDQUFQO0FBR0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQge0FwcENvbnRyb2xlcn0gZnJvbSAnLi9waG9uZWFwcC9hcHBDb250cm9sZXIuanMnO1xuXG4oZnVuY3Rpb24oKXtcblxuICAgIGZ1bmN0aW9uIHBhZ2VMb2FkKCl7XG4gICAgICAgIG5ldyBBcHBDb250cm9sZXIoKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHBhZ2VMb2FkKTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQge09sbGllfSBmcm9tICcuLi93ZWJibHVldG9vdGgvb2xsaWVDb250cm9sZXIuanMnO1xuaW1wb3J0IHtXZWJOZmNDb250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvd2ViTmZjQ29udHJvbGVyLmpzJztcblxuZXhwb3J0IGNsYXNzIEFwcENvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLm9sbGllID0gbmV3IE9sbGllKCk7XG4gICAgICAgIHRoaXMud2ViTkZDID0gbmV3IFdlYk5mY0NvbnRyb2xlcigpO1xuXG4gICAgICAgIHRoaXMub3JpZ2luYWxBbmdsZSA9IC0xO1xuICAgICAgICB0aGlzLm9sbGllQ29udHJvbCA9IHtcbiAgICAgICAgICAgIHBvd2VyIDogMCxcbiAgICAgICAgICAgIGFuZ2xlIDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX2luaXRUYWJPbGxpZSgpO1xuXG4gICAgICAgIHRoaXMuX2luaXRUYWJXZWJORkMoKTtcblxuICAgIH1cblxuICAgIF9pbml0VGFiT2xsaWUoKXtcbiAgICAgICAgLy8gSGlkZSBhcmVhcyBcbiAgICAgICAgY29uc3Qgcm93Q29ubmVjdE9sbGllID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvd0Nvbm5lY3RPbGxpZScpO1xuICAgICAgICBjb25zdCByb3dDb250cm9sT2xsaWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm93Q29udHJvbE9sbGllJyk7XG5cbiAgICAgICAgLy8gQnRuIGNvbm5lY3Rpb25cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkNvbm5lY3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG4gICAgICAgICAgICB0aGlzLm9sbGllLnJlcXVlc3QoKVxuICAgICAgICAgICAgLnRoZW4oXz0+dGhpcy5vbGxpZS5jb25uZWN0KCkpXG4gICAgICAgICAgICAudGhlbihfPT50aGlzLm9sbGllLmluaXQoKSlcbiAgICAgICAgICAgIC50aGVuKF89PntcbiAgICAgICAgICAgICAgICByb3dDb25uZWN0T2xsaWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICByb3dDb250cm9sT2xsaWUuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEJhc2ljIENvbnRyb2xcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blVwJykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hTdGFydCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcigwLDUwKSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5Eb3duJykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hTdGFydCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcigxODAsNTApKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkxlZnQnKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaFN0YXJ0JywgXz0+IHRoaXMub2xsaWUucHJvY2Vzc01vdG9yKDI3MCw1MCkpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuUmlnaHQnKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaFN0YXJ0JywgXz0+IHRoaXMub2xsaWUucHJvY2Vzc01vdG9yKDkwLDUwKSk7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuVXAnKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaEVuZCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcigwLDApKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkRvd24nKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaEVuZCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcigxODAsMCkpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuTGVmdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoRW5kJywgXz0+IHRoaXMub2xsaWUucHJvY2Vzc01vdG9yKDI3MCwwKSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5SaWdodCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoRW5kJywgXz0+IHRoaXMub2xsaWUucHJvY2Vzc01vdG9yKDkwLDApKTtcblxuICAgICAgICAvLyBPcmllbnRhdGlvbiBDb250cm9sXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5PcmllbnRhdGlvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXz0+e1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJywgdGhpcy5fb3JpZW50YXRpb25IYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuU3RvcE9yaWVudGF0aW9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfPT57XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLl9vcmllbnRhdGlvbkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLm9sbGllQ29udHJvbC5wb3dlciA9IDA7XG4gICAgICAgICAgICB0aGlzLm9sbGllLnByb2Nlc3NNb3Rvcih0aGlzLm9sbGllQ29udHJvbC5hbmdsZSwwKTtcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIF9vcmllbnRhdGlvbkhhbmRsZXIoZXZlbnQpe1xuICAgICAgICAvLyBBbHBoYSA9IHR1cm4gdGhlIHBob25lIGxpa2UgYSBjb21wYXNzXG4gICAgICAgIGNvbnN0IGFscGhhID0gTWF0aC5yb3VuZChldmVudC5hbHBoYSk7XG4gICAgICAgIC8vIEJldGEgPSBsZWFuIHRoZSBwaG9uZS4gTGVhbiB0byB0aGUgZnJvbnQgPSBuZWdhdGl2ZSBudW1iZXIsIGxlYW4gdG8gdGhlIGJhY2sgPSBwb3NpdGl2ZSBudW1iZXJcbiAgICAgICAgY29uc3QgYmV0YSA9IGV2ZW50LmJldGEgPCAwID8gXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoTWF0aC5yb3VuZChldmVudC5iZXRhKSwgLTQ1KSA6XG4gICAgICAgICAgICAgICAgTWF0aC5taW4oTWF0aC5yb3VuZChldmVudC5iZXRhKSwgNDUpIDtcblxuICAgICAgICAvLyBXZSB3aWxsIHVzZSBBbHBoYSB0byBkaXJlY3QgdGhlIG9sbGllIGFuZCBCZXRhIHRvIGNvbnRyb2wgdGhlIHBvd2VyXG4gICAgICAgIGlmICh0aGlzLm9yaWdpbmFsQW5nbGUgPT09IC0xKXtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxBbmdsZSA9IGFscGhhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgY2FsY3VsYXRlIHRoZSBjb21wdXRlIGFuZ2xlIHRvIGtub3cgaG93IHRvIGRyaXZlIHRoZSBPbGxpZVxuICAgICAgICBjb25zdCBjYWxjdWxhdGVBbmdsZSA9ICgodGhpcy5vcmlnaW5hbEFuZ2xlIC0gYWxwaGEpICsgMzYwKSAlIDM2MDtcbiAgICAgICAgLy8gVGhlIGZpbmFsIGFuZ2xlIGRlcGVuZHMgb24gdGhlIGluY2xpbmFpc29uIG9mIHRoZSBwaG9uZSAod2UgaGF2ZSB0byByZXZlcnNlIGl0KVxuICAgICAgICBjb25zdCBmaW5hbEFuZ2xlID0gZXZlbnQuYmV0YSA8IDAgPyBjYWxjdWxhdGVBbmdsZSA6IE1hdGguYWJzKDM2MCAtICgoY2FsY3VsYXRlQW5nbGUgKyAyNzApICUgMzYwKSk7XG4gICAgICAgIC8vIFdlIGNhbGN1bGF0ZSB0aGUgcG93ZXIgdG8gYXBwbGljYXRlICAgICAgXG4gICAgICAgIGNvbnN0IHBvd2VyID0gTWF0aC5yb3VuZCgoTWF0aC5hYnMoYmV0YSkgLyA0NSkgKiAxMDApO1xuXG4gICAgICAgIGlmICh0aGlzLm9sbGllQ29udHJvbC5hbmdsZSAhPSBmaW5hbEFuZ2xlXG4gICAgICAgICAgICB8fCB0aGlzLm9sbGllQ29udHJvbC5wb3dlciAhPSBwb3dlcil7XG4gICAgICAgICAgICB0aGlzLm9sbGllQ29udHJvbC5hbmdsZSA9IGZpbmFsQW5nbGU7XG4gICAgICAgICAgICB0aGlzLm9sbGllQ29udHJvbC5wb3dlciA9IHBvd2VyO1xuICAgICAgICAgICAgdGhpcy5vbGxpZS5wcm9jZXNzTW90b3IoZmluYWxBbmdsZSwgcG93ZXIpO1xuICAgICAgICB9ICAgICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICBfbW92ZU9sbGllKGRpcmVjdGlvbiwgcG93ZXIpe1xuICAgICAgICB0aGlzLm9sbGllXG4gICAgfVxuXG4gICAgX2luaXRUYWJXZWJORkMoKXtcbiAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5OZmNUYWcnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF89PnRoaXMud2ViTkZDLnB1c2hUb1RhZygpKTtcbiAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5OZmNBQ1MnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF89PnRoaXMud2ViTkZDLnB1c2hUb0FjcygpKTtcbiAgICB9XG5cbiAgIFxufSIsIid1c2Ugc3RyaWN0JztcblxuXG5leHBvcnQgY2xhc3MgV2ViTmZjQ29udHJvbGVye1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cbiAgICB9XG5cbiAgICAgcHVzaFRvVGFnKCl7XG4gICAgICAgIG5hdmlnYXRvci5uZmMucHVzaCh7XG4gICAgICAgICAgICBkYXRhOiBbeyByZWNvcmRUeXBlOiBcInVybFwiLCBkYXRhOiBcImh0dHBzOi8vamVmLmJpbm9tZWQuZnJcIiB9XVxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZSBwdXNoZWQuXCIpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHVzaCBmYWlsZWQgOi0oIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1c2hUb0FjcyhkYXRhKXtcbiAgICAgICAgLy8gVE9ETyBcbiAgICAgICAgbmF2aWdhdG9yLm5mYy5wdXNoKHtcbiAgICAgICAgICAgIGRhdGE6IFt7IHJlY29yZFR5cGU6IFwidXJsXCIsIGRhdGE6IFwiaHR0cHM6Ly9qZWYuYmlub21lZC5mclwiIH1dXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlIHB1c2hlZC5cIik7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQdXNoIGZhaWxlZCA6LSggdHJ5IGFnYWluLlwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIENvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYmlub21lZC9zcGhlcm9fb2xsaWUtd2ViLWJsdWV0b290aCBcbiAqL1xuXG4vKipcbiAqIEdlbmVyYWwgY29uZmlndXJhdGlvbiAoVVVJRClcbiovXG5jbGFzcyBDb25maWcge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuICAgIFxuICAgIHJhZGlvU2VydmljZSgpIHsgcmV0dXJuIFwiMjJiYjc0NmYtMmJiMC03NTU0LTJkNmYtNzI2NTY4NzA1MzI3XCIgfVxuICAgIHJvYm90U2VydmljZSgpIHsgcmV0dXJuIFwiMjJiYjc0NmYtMmJhMC03NTU0LTJkNmYtNzI2NTY4NzA1MzI3XCIgfVxuICAgIGNvbnRyb2xDaGFyYWN0ZXJpc3RpYygpIHsgcmV0dXJuIFwiMjJiYjc0NmYtMmJhMS03NTU0LTJkNmYtNzI2NTY4NzA1MzI3XCIgfVxuICAgIGFudGlET1NDaGFyYXRlcmlzdGljKCkgeyByZXR1cm4gXCIyMmJiNzQ2Zi0yYmJkLTc1NTQtMmQ2Zi03MjY1Njg3MDUzMjdcIiB9XG4gICAgcG93ZXJDaGFyYXRlcmlzdGljKCkgeyByZXR1cm4gXCIyMmJiNzQ2Zi0yYmIyLTc1NTQtMmQ2Zi03MjY1Njg3MDUzMjdcIiB9XG4gICAgd2FrZVVwQ1BVQ2hhcmF0ZXJpc3RpYygpIHsgcmV0dXJuIFwiMjJiYjc0NmYtMmJiZi03NTU0LTJkNmYtNzI2NTY4NzA1MzI3XCIgfVxufVxuXG4gICAgXG5cbi8qKlxuICogQ2xhc3MgZm9yIHRoZSByb2JvdFxuICogKi9cbmV4cG9ydCBjbGFzcyBPbGxpZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGV2aWNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQgPSB0aGlzLm9uRGlzY29ubmVjdGVkLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYnV6emVySW5kZXggPSAwO1xuICAgICAgICB0aGlzLnNlcXVlbmNlID0gMDtcbiAgICAgICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuTW90b3JzID0ge1xuICAgICAgICAgICAgb2ZmIDogMHgwMCxcbiAgICAgICAgICAgIGZvcndhcmQgOiAweDAxLFxuICAgICAgICAgICAgcmV2ZXJzZSA6IDB4MDIsXG4gICAgICAgICAgICBicmFrZSA6IDB4MDMsXG4gICAgICAgICAgICBpZ25vcmUgOiAweDA0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgIFJlcXVlc3QgdGhlIGRldmljZSB3aXRoIGJsdWV0b290aFxuICAgICovXG4gICAgcmVxdWVzdCgpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcImZpbHRlcnNcIjogW3tcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5yYWRpb1NlcnZpY2UoKV1cbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIFwic2VydmljZXNcIjogW3RoaXMuY29uZmlnLnJvYm90U2VydmljZSgpXVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBcIm9wdGlvbmFsU2VydmljZXNcIjogW3RoaXMuY29uZmlnLnJhZGlvU2VydmljZSgpLCB0aGlzLmNvbmZpZy5yb2JvdFNlcnZpY2UoKV1cbiAgICAgICAgfTsgICAgICAgIFxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihkZXZpY2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCB0aGlzLm9uRGlzY29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGV2aWNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29ubmVjdCB0byB0aGUgZGV2aWNlXG4gICAgICogKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGluaXQoKXtcbiAgICAgICAgaWYoIXRoaXMuZGV2aWNlKXtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5yYWRpb1NlcnZpY2UoKSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmFudGlET1NDaGFyYXRlcmlzdGljKCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KCcwMTFpMycuc3BsaXQoJycpLm1hcChjID0+IGMuY2hhckNvZGVBdCgpKSkpXG4gICAgICAgICAgICAudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBGb3VuZCBBbnRpIERPUyBjaGFyYWN0ZXJpc3RpYycpO1xuICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5yYWRpb1NlcnZpY2UoKSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnBvd2VyQ2hhcmF0ZXJpc3RpYygpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVWludDhBcnJheShbMHgwN10pKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBGb3VuZCBUWCBQb3dlciBjaGFyYWN0ZXJpc3RpYycpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcucmFkaW9TZXJ2aWNlKCksIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy53YWtlVXBDUFVDaGFyYXRlcmlzdGljKCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KFsweDAxXSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCk9PnsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dha2UgQ1BVIHdyaXRlIGRvbmUuJyk7ICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vU2V0IHJnYkxlZCB0byAwXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gMHgwMTtcbiAgICAgICAgICAgICAgICBjb2xvciAmPSAweEZGO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kQ29tbWFuZCgweDAyLCAweDIwLCBuZXcgVWludDhBcnJheShbY29sb3JdKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JnYiBMZWQgc2V0IHRvIDAnKTtcbiAgICAgICAgICAgICAgICAvLyBzZXQgQmFja0xlZCB0byAxMjdcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VuZENvbW1hbmQoMHgwMiwgMHgyMSwgbmV3IFVpbnQ4QXJyYXkoWzEyN10pKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCYWNrIExlZCBzZXQgdG8gMTI3Jyk7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHN0YWJpbGlzYXRpb24gdG8gMFxuICAgICAgICAgICAgICAgIGxldCBmbGFnID0gMDtcbiAgICAgICAgICAgICAgICBmbGFnICY9IDB4MDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRDb21tYW5kKDB4MDIsIDB4MDIsIG5ldyBVaW50OEFycmF5KFtmbGFnXSkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0YWJpbGlzYXRpb24gc2V0IHRvIDAnKTtcbiAgICAgICAgICAgICAgICAvLyBTZXQgaGVhZGluZyB0byAwXG4gICAgICAgICAgICAgICAgbGV0IGhlYWRpbmcgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kQ29tbWFuZCgweDAyLCAweDAxLCBuZXcgVWludDhBcnJheShbaGVhZGluZyA+PiA4LCBoZWFkaW5nICYgMHhGRl0pKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIZWFkaW5nIHNldCB0byAwLCBkZXZpY2UgaXMgcmVhZHkgIScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udHJvbCB0aGUgbW90b3JzIG9mIHJvYm90XG4gICAgKi9cbiAgICBwcm9jZXNzTW90b3IoaGVhZGluZywgcG93ZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JvbGwgaGVhZGluZz0nK2hlYWRpbmcpO1xuICAgICAgICBpZiAodGhpcy5idXN5KSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gaWYgYW5vdGhlciBvcGVyYXRpb24gcGVuZGluZ1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYnVzeSA9IHRydWU7XG4gICAgICAgIGxldCBkaWQgPSAweDAyOyAvLyBWaXJ0dWFsIGRldmljZSBJRFxuICAgICAgICBsZXQgY2lkID0gMHgzMDsgLy8gUm9sbCBjb21tYW5kXG4gICAgICAgIC8vIFJvbGwgY29tbWFuZCBkYXRhOiBzcGVlZCwgaGVhZGluZyAoTVNCKSwgaGVhZGluZyAoTFNCKSwgc3RhdGVcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShbcG93ZXIsIGhlYWRpbmcgPj4gOCwgaGVhZGluZyAmIDB4RkYsIDFdKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fc2VuZENvbW1hbmQoZGlkLCBjaWQsIGRhdGEpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBcblxuICAgIH1cblxuICAgIHByb2Nlc3NDb2xvcihyZWQsYmx1ZSxncmVlbil7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTZXQgY29sb3I6IHI9JytyZWQrJyxnPScrZ3JlZW4rJyxiPScrYmx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmJ1c3kpIHtcbiAgICAgICAgICAgIC8vIFJldHVybiBpZiBhbm90aGVyIG9wZXJhdGlvbiBwZW5kaW5nXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idXN5ID0gdHJ1ZTtcbiAgICAgICAgbGV0IGRpZCA9IDB4MDI7IC8vIFZpcnR1YWwgZGV2aWNlIElEXG4gICAgICAgIGxldCBjaWQgPSAweDIwOyAvLyBTZXQgUkdCIExFRCBPdXRwdXQgY29tbWFuZFxuICAgICAgICAvLyBDb2xvciBjb21tYW5kIGRhdGE6IHJlZCwgZ3JlZW4sIGJsdWUsIGZsYWdcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShbcmVkLCBncmVlbiwgYmx1ZSwgMF0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9zZW5kQ29tbWFuZChkaWQsIGNpZCwgZGF0YSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbG9yIHNldCAhIFwiKTtcbiAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwcm9jZXNzU3BpbihsbW90b3IsIHJtb3Rvcil7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTcGluJyk7XG4gICAgICAgIGlmICh0aGlzLmJ1c3kpe1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYnVzeSA9IHRydWU7XG4gICAgICAgIGxldCBkaWQgPSAweDAyOyAvL1ZpcnR1YWwgZGV2aWNlIElEXG4gICAgICAgIGxldCBjaWQgPSAweDMzOyAvLyBTZXQgcmF3IE1vdG9ycyBjb21tYW5kXG4gICAgICAgIFxuICAgICAgICAgICAgICBcbiAgICAgICAgbGV0IGxtb2RlID0gbG1vdG9yICYgMHgwNztcbiAgICAgICAgbGV0IGxwb3dlciA9IDIwMCAmIDB4RkY7XG4gICAgICAgIGxldCBybW9kZSA9IHJtb3RvciAmIDB4MDc7XG4gICAgICAgIGxldCBycG93ZXIgPSAyMDAgJiAweEZGO1xuICAgICAgICBcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShbbG1vZGUsIGxwb3dlciwgcm1vZGUsIHJwb3dlcl0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9zZW5kQ29tbWFuZChkaWQsIGNpZCwgZGF0YSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG1vZGUgPSB0aGlzLk1vdG9ycy5vZmYgJiAweDA3O1xuICAgICAgICAgICAgICAgICAgICBsZXQgbHBvd2VyID0gMjAwICYgMHhGRjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJtb2RlID0gdGhpcy5Nb3RvcnMub2ZmICYgMHgwNztcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJwb3dlciA9IDIwMCAmIDB4RkY7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KFtsbW9kZSwgbHBvd2VyLCBybW9kZSwgcnBvd2VyXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VuZENvbW1hbmQoZGlkLCBjaWQsIGRhdGEpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTsgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZXZpY2UgaXMgZGlzY29ubmVjdGVkLicpO1xuICAgIH1cbiAgICBcbiAgICBfaW50VG9IZXhBcnJheSh2YWx1ZSwgbnVtQnl0ZXMpIHtcbiAgICAgICAgdmFyIGhleEFycmF5ID0gbmV3IEFycmF5KG51bUJ5dGVzKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gbnVtQnl0ZXMgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaGV4QXJyYXlbaV0gPSB2YWx1ZSAmIDB4RkY7XG4gICAgICAgICAgICB2YWx1ZSA+Pj0gODtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoZXhBcnJheTtcbiAgICAgfTtcblxuXG4gICAgX3NlbmRDb21tYW5kKGRpZCwgY2lkLCBkYXRhKSB7XG4gICAgICAgIC8vIENyZWF0ZSBjbGllbnQgY29tbWFuZCBwYWNrZXRzXG4gICAgICAgIC8vIEFQSSBkb2NzOiBodHRwczovL2dpdGh1Yi5jb20vb3Jib3RpeC9EZXZlbG9wZXJSZXNvdXJjZXMvYmxvYi9tYXN0ZXIvZG9jcy9TcGhlcm9fQVBJXzEuNTAucGRmXG4gICAgICAgIC8vIE5leHQgc2VxdWVuY2UgbnVtYmVyXG4gICAgICAgIGxldCBzZXEgPSB0aGlzLnNlcXVlbmNlICYgMjU1O1xuICAgICAgICB0aGlzLnNlcXVlbmNlICs9IDE7XG4gICAgICAgIC8vIFN0YXJ0IG9mIHBhY2tldCAjMlxuICAgICAgICBsZXQgc29wMiA9IDB4ZmM7XG4gICAgICAgIHNvcDIgfD0gMTsgLy8gQW5zd2VyXG4gICAgICAgIHNvcDIgfD0gMjsgLy8gUmVzZXQgdGltZW91dFxuICAgICAgICAvLyBEYXRhIGxlbmd0aFxuICAgICAgICBsZXQgZGxlbiA9IGRhdGEuYnl0ZUxlbmd0aCArIDE7XG4gICAgICAgIGxldCBzdW0gPSBkYXRhLnJlZHVjZSgoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gYSArIGI7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBDaGVja3N1bVxuICAgICAgICBsZXQgY2hrID0gKHN1bSArIGRpZCArIGNpZCArIHNlcSArIGRsZW4pICYgMjU1O1xuICAgICAgICBjaGsgXj0gMjU1O1xuICAgICAgICBsZXQgY2hlY2tzdW0gPSBuZXcgVWludDhBcnJheShbY2hrXSk7XG5cbiAgICAgICAgbGV0IHBhY2tldHMgPSBuZXcgVWludDhBcnJheShbMHhmZiwgc29wMiwgZGlkLCBjaWQsIHNlcSwgZGxlbl0pO1xuICAgICAgICAvLyBBcHBlbmQgYXJyYXlzOiBwYWNrZXQgKyBkYXRhICsgY2hlY2tzdW1cbiAgICAgICAgbGV0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkocGFja2V0cy5ieXRlTGVuZ3RoICsgZGF0YS5ieXRlTGVuZ3RoICsgY2hlY2tzdW0uYnl0ZUxlbmd0aCk7XG4gICAgICAgIGFycmF5LnNldChwYWNrZXRzLCAwKTtcbiAgICAgICAgYXJyYXkuc2V0KGRhdGEsIHBhY2tldHMuYnl0ZUxlbmd0aCk7XG4gICAgICAgIGFycmF5LnNldChjaGVja3N1bSwgcGFja2V0cy5ieXRlTGVuZ3RoICsgZGF0YS5ieXRlTGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcucm9ib3RTZXJ2aWNlKCksIHRoaXMuY29uZmlnLmNvbnRyb2xDaGFyYWN0ZXJpc3RpYygpLCBhcnJheSkudGhlbigocmV0dXJuRGF0YSk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb21tYW5kIHdyaXRlIGRvbmUuIDogJXMnLHJldHVybkRhdGEpOyAgXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH0pOyAgICAgICAgICBcbiAgICB9XG5cblxuICBcblxuICAgIF93cml0ZUNoYXJhY3RlcmlzdGljKHNlcnZpY2VVSUQsIGNoYXJhY3RlcmlzdGljVUlELCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZShzZXJ2aWNlVUlEKVxuICAgICAgICAgICAgLnRoZW4oc2VydmljZSA9PiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKGNoYXJhY3RlcmlzdGljVUlEKSlcbiAgICAgICAgICAgIC50aGVuKGNoYXJhY3RlcmlzdGljID0+IGNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUodmFsdWUpKTtcbiAgICB9XG5cblxufSJdfQ==
