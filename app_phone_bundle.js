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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FwcF9waG9uZS5qcyIsInNjcmlwdHMvcGhvbmVhcHAvYXBwQ29udHJvbGVyLmpzIiwic2NyaXB0cy9zZW5zb3JzL3dlYk5mY0NvbnRyb2xlci5qcyIsInNjcmlwdHMvd2ViYmx1ZXRvb3RoL29sbGllQ29udHJvbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBQ0E7O0FBRUEsQ0FBQyxZQUFVOztBQUVQLGFBQVMsUUFBVCxHQUFtQjtBQUNmO0FBQ0g7O0FBRUQsV0FBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxRQUFoQztBQUNILENBUEQ7OztBQ0hBOzs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztJQUVhLFksV0FBQSxZO0FBQ1QsNEJBQWE7QUFBQTs7QUFDVCxhQUFLLEtBQUwsR0FBYSwyQkFBYjtBQUNBLGFBQUssTUFBTCxHQUFjLHNDQUFkOztBQUVBLGFBQUssYUFBTCxHQUFxQixDQUFDLENBQXRCO0FBQ0EsYUFBSyxZQUFMLEdBQW9CO0FBQ2hCLG1CQUFRLENBRFE7QUFFaEIsbUJBQVE7QUFGUSxTQUFwQjs7QUFLQSxhQUFLLGFBQUw7O0FBRUEsYUFBSyxjQUFMO0FBRUg7Ozs7d0NBRWM7QUFBQTs7QUFDWDtBQUNBLGdCQUFNLGtCQUFrQixTQUFTLGNBQVQsQ0FBd0IsaUJBQXhCLENBQXhCO0FBQ0EsZ0JBQU0sa0JBQWtCLFNBQVMsY0FBVCxDQUF3QixpQkFBeEIsQ0FBeEI7O0FBRUE7QUFDQSxxQkFBUyxjQUFULENBQXdCLFlBQXhCLEVBQXNDLGdCQUF0QyxDQUF1RCxPQUF2RCxFQUFnRSxZQUFJO0FBQ2hFLHNCQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQ0MsSUFERCxDQUNNO0FBQUEsMkJBQUcsTUFBSyxLQUFMLENBQVcsT0FBWCxFQUFIO0FBQUEsaUJBRE4sRUFFQyxJQUZELENBRU07QUFBQSwyQkFBRyxNQUFLLEtBQUwsQ0FBVyxJQUFY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LENBQTBCLEtBQTFCLENBQWxCO0FBQUEsYUFGSCxDQUFQO0FBR0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQge0FwcENvbnRyb2xlcn0gZnJvbSAnLi9waG9uZWFwcC9hcHBDb250cm9sZXIuanMnO1xuXG4oZnVuY3Rpb24oKXtcblxuICAgIGZ1bmN0aW9uIHBhZ2VMb2FkKCl7XG4gICAgICAgIG5ldyBBcHBDb250cm9sZXIoKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHBhZ2VMb2FkKTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQge09sbGllfSBmcm9tICcuLi93ZWJibHVldG9vdGgvb2xsaWVDb250cm9sZXIuanMnO1xuaW1wb3J0IHtXZWJOZmNDb250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvd2ViTmZjQ29udHJvbGVyLmpzJztcblxuZXhwb3J0IGNsYXNzIEFwcENvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLm9sbGllID0gbmV3IE9sbGllKCk7XG4gICAgICAgIHRoaXMud2ViTkZDID0gbmV3IFdlYk5mY0NvbnRyb2xlcigpO1xuXG4gICAgICAgIHRoaXMub3JpZ2luYWxBbmdsZSA9IC0xO1xuICAgICAgICB0aGlzLm9sbGllQ29udHJvbCA9IHtcbiAgICAgICAgICAgIHBvd2VyIDogMCxcbiAgICAgICAgICAgIGFuZ2xlIDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX2luaXRUYWJPbGxpZSgpO1xuXG4gICAgICAgIHRoaXMuX2luaXRUYWJXZWJORkMoKTtcblxuICAgIH1cblxuICAgIF9pbml0VGFiT2xsaWUoKXtcbiAgICAgICAgLy8gSGlkZSBhcmVhcyBcbiAgICAgICAgY29uc3Qgcm93Q29ubmVjdE9sbGllID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvd0Nvbm5lY3RPbGxpZScpO1xuICAgICAgICBjb25zdCByb3dDb250cm9sT2xsaWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm93Q29udHJvbE9sbGllJyk7XG5cbiAgICAgICAgLy8gQnRuIGNvbm5lY3Rpb25cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkNvbm5lY3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG4gICAgICAgICAgICB0aGlzLm9sbGllLnJlcXVlc3QoKVxuICAgICAgICAgICAgLnRoZW4oXz0+dGhpcy5vbGxpZS5jb25uZWN0KCkpXG4gICAgICAgICAgICAudGhlbihfPT50aGlzLm9sbGllLmluaXQoKSlcbiAgICAgICAgICAgIC50aGVuKF89PntcbiAgICAgICAgICAgICAgICByb3dDb25uZWN0T2xsaWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICByb3dDb250cm9sT2xsaWUuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEJhc2ljIENvbnRyb2xcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blVwJykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hTdGFydCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcigwLDUwKSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5Eb3duJykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hTdGFydCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcigxODAsNTApKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkxlZnQnKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaFN0YXJ0JywgXz0+IHRoaXMub2xsaWUucHJvY2Vzc01vdG9yKDI3MCw1MCkpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuUmlnaHQnKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaFN0YXJ0JywgXz0+IHRoaXMub2xsaWUucHJvY2Vzc01vdG9yKDkwLDUwKSk7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuVXAnKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaEVuZCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcigwLDApKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkRvd24nKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaEVuZCcsIF89PiB0aGlzLm9sbGllLnByb2Nlc3NNb3RvcigxODAsMCkpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuTGVmdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoRW5kJywgXz0+IHRoaXMub2xsaWUucHJvY2Vzc01vdG9yKDI3MCwwKSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5SaWdodCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoRW5kJywgXz0+IHRoaXMub2xsaWUucHJvY2Vzc01vdG9yKDkwLDApKTtcblxuICAgICAgICAvLyBPcmllbnRhdGlvbiBDb250cm9sXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5PcmllbnRhdGlvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXz0+e1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJywgdGhpcy5fb3JpZW50YXRpb25IYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuU3RvcE9yaWVudGF0aW9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfPT57XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCB0aGlzLl9vcmllbnRhdGlvbkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLm9sbGllQ29udHJvbC5wb3dlciA9IDA7XG4gICAgICAgICAgICB0aGlzLm9sbGllLnByb2Nlc3NNb3Rvcih0aGlzLm9sbGllQ29udHJvbC5hbmdsZSwwKTtcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIF9vcmllbnRhdGlvbkhhbmRsZXIoZXZlbnQpe1xuICAgICAgICAvLyBBbHBoYSA9IHR1cm4gdGhlIHBob25lIGxpa2UgYSBjb21wYXNzXG4gICAgICAgIGNvbnN0IGFscGhhID0gTWF0aC5yb3VuZChldmVudC5hbHBoYSk7XG4gICAgICAgIC8vIEJldGEgPSBsZWFuIHRoZSBwaG9uZS4gTGVhbiB0byB0aGUgZnJvbnQgPSBuZWdhdGl2ZSBudW1iZXIsIGxlYW4gdG8gdGhlIGJhY2sgPSBwb3NpdGl2ZSBudW1iZXJcbiAgICAgICAgY29uc3QgYmV0YSA9IGV2ZW50LmJldGEgPCAwID8gXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoTWF0aC5yb3VuZChldmVudC5iZXRhKSwgLTQ1KSA6XG4gICAgICAgICAgICAgICAgTWF0aC5taW4oTWF0aC5yb3VuZChldmVudC5iZXRhKSwgNDUpIDtcblxuICAgICAgICAvLyBXZSB3aWxsIHVzZSBBbHBoYSB0byBkaXJlY3QgdGhlIG9sbGllIGFuZCBCZXRhIHRvIGNvbnRyb2wgdGhlIHBvd2VyXG4gICAgICAgIGlmICh0aGlzLm9yaWdpbmFsQW5nbGUgPT09IC0xKXtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxBbmdsZSA9IGFscGhhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgY2FsY3VsYXRlIHRoZSBjb21wdXRlIGFuZ2xlIHRvIGtub3cgaG93IHRvIGRyaXZlIHRoZSBPbGxpZVxuICAgICAgICBjb25zdCBjYWxjdWxhdGVBbmdsZSA9ICgodGhpcy5vcmlnaW5hbEFuZ2xlIC0gYWxwaGEpICsgMzYwKSAlIDM2MDtcbiAgICAgICAgLy8gVGhlIGZpbmFsIGFuZ2xlIGRlcGVuZHMgb24gdGhlIGluY2xpbmFpc29uIG9mIHRoZSBwaG9uZSAod2UgaGF2ZSB0byByZXZlcnNlIGl0KVxuICAgICAgICBjb25zdCBmaW5hbEFuZ2xlID0gZXZlbnQuYmV0YSA8IDAgPyBjYWxjdWxhdGVBbmdsZSA6IE1hdGguYWJzKDM2MCAtICgoY2FsY3VsYXRlQW5nbGUgKyAyNzApICUgMzYwKSk7XG4gICAgICAgIC8vIFdlIGNhbGN1bGF0ZSB0aGUgcG93ZXIgdG8gYXBwbGljYXRlICAgICAgXG4gICAgICAgIGNvbnN0IHBvd2VyID0gTWF0aC5yb3VuZCgoTWF0aC5hYnMoYmV0YSkgLyA0NSkgKiAxMDApO1xuXG4gICAgICAgIGlmICh0aGlzLm9sbGllQ29udHJvbC5hbmdsZSAhPSBmaW5hbEFuZ2xlXG4gICAgICAgICAgICB8fCB0aGlzLm9sbGllQ29udHJvbC5wb3dlciAhPSBwb3dlcil7XG4gICAgICAgICAgICB0aGlzLm9sbGllQ29udHJvbC5hbmdsZSA9IGZpbmFsQW5nbGU7XG4gICAgICAgICAgICB0aGlzLm9sbGllQ29udHJvbC5wb3dlciA9IHBvd2VyO1xuICAgICAgICAgICAgdGhpcy5vbGxpZS5wcm9jZXNzTW90b3IoZmluYWxBbmdsZSwgcG93ZXIpO1xuICAgICAgICB9ICAgICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICBfbW92ZU9sbGllKGRpcmVjdGlvbiwgcG93ZXIpe1xuICAgICAgICB0aGlzLm9sbGllXG4gICAgfVxuXG4gICAgX2luaXRUYWJXZWJORkMoKXtcbiAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5OZmNUYWcnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF89PnRoaXMud2ViTkZDLnB1c2hUb1RhZygpKTtcbiAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5OZmNBQ1MnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF89PnRoaXMud2ViTkZDLnB1c2hUb0FjcygpKTtcbiAgICB9XG5cbiAgIFxufSIsIid1c2Ugc3RyaWN0JztcblxuXG5leHBvcnQgY2xhc3MgV2ViTmZjQ29udHJvbGVye1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cbiAgICB9XG5cbiAgICAgcHVzaFRvVGFnKCl7XG4gICAgICAgIG5hdmlnYXRvci5uZmMucHVzaCh7XG4gICAgICAgICAgICBkYXRhOiBbeyByZWNvcmRUeXBlOiBcInVybFwiLCBkYXRhOiBcImh0dHBzOi8vZGV2ZmVzdC5nZGduYW50ZXMuY29tXCIgfV1cbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2UgcHVzaGVkLlwiKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlB1c2ggZmFpbGVkIDotKCB0cnkgYWdhaW4uXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdXNoVG9BY3MoZGF0YSl7XG4gICAgICAgIC8vIFRPRE8gXG4gICAgICAgIG5hdmlnYXRvci5uZmMucHVzaCh7XG4gICAgICAgICAgICBkYXRhOiBbeyByZWNvcmRUeXBlOiBcInVybFwiLCBkYXRhOiBcImh0dHBzOi8vamVmLmJpbm9tZWQuZnJcIiB9XVxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZSBwdXNoZWQuXCIpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHVzaCBmYWlsZWQgOi0oIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBDb2RlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Jpbm9tZWQvc3BoZXJvX29sbGllLXdlYi1ibHVldG9vdGggXG4gKi9cblxuLyoqXG4gKiBHZW5lcmFsIGNvbmZpZ3VyYXRpb24gKFVVSUQpXG4qL1xuY2xhc3MgQ29uZmlnIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbiAgICBcbiAgICByYWRpb1NlcnZpY2UoKSB7IHJldHVybiBcIjIyYmI3NDZmLTJiYjAtNzU1NC0yZDZmLTcyNjU2ODcwNTMyN1wiIH1cbiAgICByb2JvdFNlcnZpY2UoKSB7IHJldHVybiBcIjIyYmI3NDZmLTJiYTAtNzU1NC0yZDZmLTcyNjU2ODcwNTMyN1wiIH1cbiAgICBjb250cm9sQ2hhcmFjdGVyaXN0aWMoKSB7IHJldHVybiBcIjIyYmI3NDZmLTJiYTEtNzU1NC0yZDZmLTcyNjU2ODcwNTMyN1wiIH1cbiAgICBhbnRpRE9TQ2hhcmF0ZXJpc3RpYygpIHsgcmV0dXJuIFwiMjJiYjc0NmYtMmJiZC03NTU0LTJkNmYtNzI2NTY4NzA1MzI3XCIgfVxuICAgIHBvd2VyQ2hhcmF0ZXJpc3RpYygpIHsgcmV0dXJuIFwiMjJiYjc0NmYtMmJiMi03NTU0LTJkNmYtNzI2NTY4NzA1MzI3XCIgfVxuICAgIHdha2VVcENQVUNoYXJhdGVyaXN0aWMoKSB7IHJldHVybiBcIjIyYmI3NDZmLTJiYmYtNzU1NC0yZDZmLTcyNjU2ODcwNTMyN1wiIH1cbn1cblxuICAgIFxuXG4vKipcbiAqIENsYXNzIGZvciB0aGUgcm9ib3RcbiAqICovXG5leHBvcnQgY2xhc3MgT2xsaWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRldmljZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdGVkID0gdGhpcy5vbkRpc2Nvbm5lY3RlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJ1enplckluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5zZXF1ZW5jZSA9IDA7XG4gICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLk1vdG9ycyA9IHtcbiAgICAgICAgICAgIG9mZiA6IDB4MDAsXG4gICAgICAgICAgICBmb3J3YXJkIDogMHgwMSxcbiAgICAgICAgICAgIHJldmVyc2UgOiAweDAyLFxuICAgICAgICAgICAgYnJha2UgOiAweDAzLFxuICAgICAgICAgICAgaWdub3JlIDogMHgwNFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICBSZXF1ZXN0IHRoZSBkZXZpY2Ugd2l0aCBibHVldG9vdGhcbiAgICAqL1xuICAgIHJlcXVlc3QoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgXCJmaWx0ZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcucmFkaW9TZXJ2aWNlKCldXG4gICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5yb2JvdFNlcnZpY2UoKV1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgXCJvcHRpb25hbFNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5yYWRpb1NlcnZpY2UoKSwgdGhpcy5jb25maWcucm9ib3RTZXJ2aWNlKCldXG4gICAgICAgIH07ICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZShvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4oZGV2aWNlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZS5hZGRFdmVudExpc3RlbmVyKCdnYXR0c2VydmVyZGlzY29ubmVjdGVkJywgdGhpcy5vbkRpc2Nvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRldmljZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbm5lY3QgdG8gdGhlIGRldmljZVxuICAgICAqICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpbml0KCl7XG4gICAgICAgIGlmKCF0aGlzLmRldmljZSl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcucmFkaW9TZXJ2aWNlKCksIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5hbnRpRE9TQ2hhcmF0ZXJpc3RpYygpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVWludDhBcnJheSgnMDExaTMnLnNwbGl0KCcnKS5tYXAoYyA9PiBjLmNoYXJDb2RlQXQoKSkpKVxuICAgICAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gRm91bmQgQW50aSBET1MgY2hhcmFjdGVyaXN0aWMnKTtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcucmFkaW9TZXJ2aWNlKCksIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5wb3dlckNoYXJhdGVyaXN0aWMoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoWzB4MDddKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gRm91bmQgVFggUG93ZXIgY2hhcmFjdGVyaXN0aWMnKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLnJhZGlvU2VydmljZSgpLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcud2FrZVVwQ1BVQ2hhcmF0ZXJpc3RpYygpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVWludDhBcnJheShbMHgwMV0pKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpPT57ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXYWtlIENQVSB3cml0ZSBkb25lLicpOyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL1NldCByZ2JMZWQgdG8gMFxuICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IDB4MDE7XG4gICAgICAgICAgICAgICAgY29sb3IgJj0gMHhGRjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VuZENvbW1hbmQoMHgwMiwgMHgyMCwgbmV3IFVpbnQ4QXJyYXkoW2NvbG9yXSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZ2IgTGVkIHNldCB0byAwJyk7XG4gICAgICAgICAgICAgICAgLy8gc2V0IEJhY2tMZWQgdG8gMTI3XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRDb21tYW5kKDB4MDIsIDB4MjEsIG5ldyBVaW50OEFycmF5KFsxMjddKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQmFjayBMZWQgc2V0IHRvIDEyNycpO1xuICAgICAgICAgICAgICAgIC8vIHNldCBzdGFiaWxpc2F0aW9uIHRvIDBcbiAgICAgICAgICAgICAgICBsZXQgZmxhZyA9IDA7XG4gICAgICAgICAgICAgICAgZmxhZyAmPSAweDAxO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kQ29tbWFuZCgweDAyLCAweDAyLCBuZXcgVWludDhBcnJheShbZmxhZ10pKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdGFiaWxpc2F0aW9uIHNldCB0byAwJyk7XG4gICAgICAgICAgICAgICAgLy8gU2V0IGhlYWRpbmcgdG8gMFxuICAgICAgICAgICAgICAgIGxldCBoZWFkaW5nID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VuZENvbW1hbmQoMHgwMiwgMHgwMSwgbmV3IFVpbnQ4QXJyYXkoW2hlYWRpbmcgPj4gOCwgaGVhZGluZyAmIDB4RkZdKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhZGluZyBzZXQgdG8gMCwgZGV2aWNlIGlzIHJlYWR5ICEnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnRyb2wgdGhlIG1vdG9ycyBvZiByb2JvdFxuICAgICovXG4gICAgcHJvY2Vzc01vdG9yKGhlYWRpbmcsIHBvd2VyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSb2xsIGhlYWRpbmc9JytoZWFkaW5nKTtcbiAgICAgICAgaWYgKHRoaXMuYnVzeSkge1xuICAgICAgICAgICAgLy8gUmV0dXJuIGlmIGFub3RoZXIgb3BlcmF0aW9uIHBlbmRpbmdcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuICAgICAgICBsZXQgZGlkID0gMHgwMjsgLy8gVmlydHVhbCBkZXZpY2UgSURcbiAgICAgICAgbGV0IGNpZCA9IDB4MzA7IC8vIFJvbGwgY29tbWFuZFxuICAgICAgICAvLyBSb2xsIGNvbW1hbmQgZGF0YTogc3BlZWQsIGhlYWRpbmcgKE1TQiksIGhlYWRpbmcgKExTQiksIHN0YXRlXG4gICAgICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoW3Bvd2VyLCBoZWFkaW5nID4+IDgsIGhlYWRpbmcgJiAweEZGLCAxXSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRDb21tYW5kKGRpZCwgY2lkLCBkYXRhKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBwcm9jZXNzQ29sb3IocmVkLGJsdWUsZ3JlZW4pe1xuICAgICAgICBjb25zb2xlLmxvZygnU2V0IGNvbG9yOiByPScrcmVkKycsZz0nK2dyZWVuKycsYj0nK2JsdWUpO1xuICAgICAgICBpZiAodGhpcy5idXN5KSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gaWYgYW5vdGhlciBvcGVyYXRpb24gcGVuZGluZ1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYnVzeSA9IHRydWU7XG4gICAgICAgIGxldCBkaWQgPSAweDAyOyAvLyBWaXJ0dWFsIGRldmljZSBJRFxuICAgICAgICBsZXQgY2lkID0gMHgyMDsgLy8gU2V0IFJHQiBMRUQgT3V0cHV0IGNvbW1hbmRcbiAgICAgICAgLy8gQ29sb3IgY29tbWFuZCBkYXRhOiByZWQsIGdyZWVuLCBibHVlLCBmbGFnXG4gICAgICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoW3JlZCwgZ3JlZW4sIGJsdWUsIDBdKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fc2VuZENvbW1hbmQoZGlkLCBjaWQsIGRhdGEpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb2xvciBzZXQgISBcIik7XG4gICAgICAgICAgICB0aGlzLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcHJvY2Vzc1NwaW4obG1vdG9yLCBybW90b3Ipe1xuICAgICAgICBjb25zb2xlLmxvZygnU3BpbicpO1xuICAgICAgICBpZiAodGhpcy5idXN5KXtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuICAgICAgICBsZXQgZGlkID0gMHgwMjsgLy9WaXJ0dWFsIGRldmljZSBJRFxuICAgICAgICBsZXQgY2lkID0gMHgzMzsgLy8gU2V0IHJhdyBNb3RvcnMgY29tbWFuZFxuICAgICAgICBcbiAgICAgICAgICAgICAgXG4gICAgICAgIGxldCBsbW9kZSA9IGxtb3RvciAmIDB4MDc7XG4gICAgICAgIGxldCBscG93ZXIgPSAyMDAgJiAweEZGO1xuICAgICAgICBsZXQgcm1vZGUgPSBybW90b3IgJiAweDA3O1xuICAgICAgICBsZXQgcnBvd2VyID0gMjAwICYgMHhGRjtcbiAgICAgICAgXG4gICAgICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoW2xtb2RlLCBscG93ZXIsIHJtb2RlLCBycG93ZXJdKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fc2VuZENvbW1hbmQoZGlkLCBjaWQsIGRhdGEpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxtb2RlID0gdGhpcy5Nb3RvcnMub2ZmICYgMHgwNztcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxwb3dlciA9IDIwMCAmIDB4RkY7XG4gICAgICAgICAgICAgICAgICAgIGxldCBybW9kZSA9IHRoaXMuTW90b3JzLm9mZiAmIDB4MDc7XG4gICAgICAgICAgICAgICAgICAgIGxldCBycG93ZXIgPSAyMDAgJiAweEZGO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShbbG1vZGUsIGxwb3dlciwgcm1vZGUsIHJwb3dlcl0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRDb21tYW5kKGRpZCwgY2lkLCBkYXRhKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9KTsgXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7ICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGlzY29ubmVjdGVkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnRGV2aWNlIGlzIGRpc2Nvbm5lY3RlZC4nKTtcbiAgICB9XG4gICAgXG4gICAgX2ludFRvSGV4QXJyYXkodmFsdWUsIG51bUJ5dGVzKSB7XG4gICAgICAgIHZhciBoZXhBcnJheSA9IG5ldyBBcnJheShudW1CeXRlcyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IG51bUJ5dGVzIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGhleEFycmF5W2ldID0gdmFsdWUgJiAweEZGO1xuICAgICAgICAgICAgdmFsdWUgPj49IDg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGV4QXJyYXk7XG4gICAgIH07XG5cblxuICAgIF9zZW5kQ29tbWFuZChkaWQsIGNpZCwgZGF0YSkge1xuICAgICAgICAvLyBDcmVhdGUgY2xpZW50IGNvbW1hbmQgcGFja2V0c1xuICAgICAgICAvLyBBUEkgZG9jczogaHR0cHM6Ly9naXRodWIuY29tL29yYm90aXgvRGV2ZWxvcGVyUmVzb3VyY2VzL2Jsb2IvbWFzdGVyL2RvY3MvU3BoZXJvX0FQSV8xLjUwLnBkZlxuICAgICAgICAvLyBOZXh0IHNlcXVlbmNlIG51bWJlclxuICAgICAgICBsZXQgc2VxID0gdGhpcy5zZXF1ZW5jZSAmIDI1NTtcbiAgICAgICAgdGhpcy5zZXF1ZW5jZSArPSAxO1xuICAgICAgICAvLyBTdGFydCBvZiBwYWNrZXQgIzJcbiAgICAgICAgbGV0IHNvcDIgPSAweGZjO1xuICAgICAgICBzb3AyIHw9IDE7IC8vIEFuc3dlclxuICAgICAgICBzb3AyIHw9IDI7IC8vIFJlc2V0IHRpbWVvdXRcbiAgICAgICAgLy8gRGF0YSBsZW5ndGhcbiAgICAgICAgbGV0IGRsZW4gPSBkYXRhLmJ5dGVMZW5ndGggKyAxO1xuICAgICAgICBsZXQgc3VtID0gZGF0YS5yZWR1Y2UoKGEsIGIpID0+IHtcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQ2hlY2tzdW1cbiAgICAgICAgbGV0IGNoayA9IChzdW0gKyBkaWQgKyBjaWQgKyBzZXEgKyBkbGVuKSAmIDI1NTtcbiAgICAgICAgY2hrIF49IDI1NTtcbiAgICAgICAgbGV0IGNoZWNrc3VtID0gbmV3IFVpbnQ4QXJyYXkoW2Noa10pO1xuXG4gICAgICAgIGxldCBwYWNrZXRzID0gbmV3IFVpbnQ4QXJyYXkoWzB4ZmYsIHNvcDIsIGRpZCwgY2lkLCBzZXEsIGRsZW5dKTtcbiAgICAgICAgLy8gQXBwZW5kIGFycmF5czogcGFja2V0ICsgZGF0YSArIGNoZWNrc3VtXG4gICAgICAgIGxldCBhcnJheSA9IG5ldyBVaW50OEFycmF5KHBhY2tldHMuYnl0ZUxlbmd0aCArIGRhdGEuYnl0ZUxlbmd0aCArIGNoZWNrc3VtLmJ5dGVMZW5ndGgpO1xuICAgICAgICBhcnJheS5zZXQocGFja2V0cywgMCk7XG4gICAgICAgIGFycmF5LnNldChkYXRhLCBwYWNrZXRzLmJ5dGVMZW5ndGgpO1xuICAgICAgICBhcnJheS5zZXQoY2hlY2tzdW0sIHBhY2tldHMuYnl0ZUxlbmd0aCArIGRhdGEuYnl0ZUxlbmd0aCk7XG4gICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLnJvYm90U2VydmljZSgpLCB0aGlzLmNvbmZpZy5jb250cm9sQ2hhcmFjdGVyaXN0aWMoKSwgYXJyYXkpLnRoZW4oKHJldHVybkRhdGEpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ29tbWFuZCB3cml0ZSBkb25lLiA6ICVzJyxyZXR1cm5EYXRhKTsgIFxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9KTsgICAgICAgICAgXG4gICAgfVxuXG5cbiAgXG5cbiAgICBfd3JpdGVDaGFyYWN0ZXJpc3RpYyhzZXJ2aWNlVUlELCBjaGFyYWN0ZXJpc3RpY1VJRCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2Uoc2VydmljZVVJRClcbiAgICAgICAgICAgIC50aGVuKHNlcnZpY2UgPT4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyhjaGFyYWN0ZXJpc3RpY1VJRCkpXG4gICAgICAgICAgICAudGhlbihjaGFyYWN0ZXJpc3RpYyA9PiBjaGFyYWN0ZXJpc3RpYy53cml0ZVZhbHVlKHZhbHVlKSk7XG4gICAgfVxuXG5cbn0iXX0=
