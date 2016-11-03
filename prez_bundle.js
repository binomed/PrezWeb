(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LINE_HEIGHT = 1.15;
var ADDITIONNAL_HEIGHT = 0.4;
var COL_WIDTH = 35;

var HighlightCodeHelper = exports.HighlightCodeHelper = function () {
	function HighlightCodeHelper(_ref) {
		var keyElt = _ref.keyElt;
		var positionArray = _ref.positionArray;

		_classCallCheck(this, HighlightCodeHelper);

		this.eltHiglight = document.getElementById('highlight-' + keyElt);
		this.positionArray = positionArray;

		Reveal.addEventListener('code-' + keyElt, this._listenFragments.bind(this));
		Reveal.addEventListener('stop-code-' + keyElt, this._unregisterFragments.bind(this));
	}

	_createClass(HighlightCodeHelper, [{
		key: '_progressFragment',
		value: function _progressFragment(event) {
			try {
				if (event.type === 'fragmentshown') {
					var index = +event.fragment.getAttribute('data-fragment-index');
					var properties = this.positionArray[index];
					var keys = Object.keys(properties);
					for (var i = 0; i < keys.length; i++) {
						var key = keys[i];
						if (key === 'row') {
							this.eltHiglight.style['top'] = 'calc(90px + (' + properties[key] + ' * ' + LINE_HEIGHT + 'em))';
						} else if (key === 'col') {
							this.eltHiglight.style['left'] = 'calc(60px + (' + properties[key] + ' * ' + COL_WIDTH + 'px))';
						} else if (key === 'calcHeight') {
							this.eltHiglight.style['height'] = 'calc(' + properties[key] + 'em + ' + ADDITIONNAL_HEIGHT + 'em)';
						} else {
							this.eltHiglight.style[key] = properties[key];
						}
					}
				} else {
					var _index = +event.fragment.getAttribute('data-fragment-index');
					// On reset les properties
					var _properties = this.positionArray[_index];
					var _keys = Object.keys(_properties);
					for (var _i = 0; _i < _keys.length; _i++) {
						var _key = _keys[_i];
						if (_key === 'row') {
							this.eltHiglight.style['top'] = '';
						} else if (_key === 'calcHeight') {
							this.eltHiglight.style['height'] = '';
						} else if (_key === 'col') {
							this.eltHiglight.style['left'] = '';
						} else {
							this.eltHiglight.style[_key] = '';
						}
					}
					if (_index > 0) {
						_properties = this.positionArray[_index - 1];
						_keys = Object.keys(_properties);
						for (var _i2 = 0; _i2 < _keys.length; _i2++) {
							var _key2 = _keys[_i2];
							if (_key2 === 'row') {
								this.eltHiglight.style['top'] = 'calc(90px + (' + _properties[_key2] + ' * ' + LINE_HEIGHT + 'em))';
							} else if (_key2 === 'col') {
								this.eltHiglight.style['left'] = 'calc(60px + (' + _properties[_key2] + ' * ' + COL_WIDTH + 'px))';
							} else if (_key2 === 'calcHeight') {
								this.eltHiglight.style['height'] = 'calc(' + _properties[_key2] + 'em + ' + ADDITIONNAL_HEIGHT + 'em)';
							} else {
								this.eltHiglight.style[_key2] = _properties[_key2];
							}
						}
					}
				}
			} catch (e) {}
		}
	}, {
		key: '_listenFragments',
		value: function _listenFragments() {
			Reveal.addEventListener('fragmentshown', this._progressFragment.bind(this));
			Reveal.addEventListener('fragmenthidden', this._progressFragment.bind(this));
		}
	}, {
		key: '_unregisterFragments',
		value: function _unregisterFragments() {
			Reveal.removeEventListener('fragmentshown', this._progressFragment.bind(this));
			Reveal.removeEventListener('fragmenthidden', this._progressFragment.bind(this));
		}
	}]);

	return HighlightCodeHelper;
}();

},{}],2:[function(require,module,exports){
'use strict';

var _revealEngineEvents = require('./prez/revealEngineEvents.js');

(function () {

    function pageLoad() {
        new _revealEngineEvents.RevealEngineEvents();
    }

    window.addEventListener('load', pageLoad);
})();

},{"./prez/revealEngineEvents.js":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HighlightEvents = undefined;

var _highlightCodeHelper = require('../helpers/highlightCodeHelper.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LINE_HEIGHT = 1.15;
var ADDITIONNAL_HEIGT = 0.4;
var COL_WIDTH = 35;

var HighlightEvents = exports.HighlightEvents = function HighlightEvents() {
	_classCallCheck(this, HighlightEvents);

	//  BleCode 
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'connect-ble',
		// We start with the first fragment (the initial position is fixed by css)
		positionArray: [{
			row: 1,
			left: '150px',
			width: '100px'
		}, {
			row: 2,
			col: 1,
			width: '500px'
		}]
	});

	//  Ble Code Read Characteristic
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'read-charact',
		// We start with the first fragment (the initial position is fixed by css)
		positionArray: [{
			row: 1,
			left: '150px',
			width: '100px'
		}, {
			row: 3,
			col: 1,
			width: '700px'
		}, {
			row: 4,
			left: '150px',
			width: '200px'
		}, {
			row: 6,
			col: 1,
			width: '500px'
		}, {
			row: 7,
			left: '150px',
			width: '100px'
		}, {
			row: 9,
			calcHeight: 2,
			col: 1,
			width: '800px'
		}]
	});
};

},{"../helpers/highlightCodeHelper.js":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RevealEngineEvents = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _highlightEvents = require('./highlightEvents.js');

var _blePrezControler = require('../sensors/blePrezControler.js');

var _voiceRecognitionControler = require('../sensors/voiceRecognitionControler.js');

var _speechSynthesisControler = require('../sensors/speechSynthesisControler.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RevealEngineEvents = exports.RevealEngineEvents = function () {
	function RevealEngineEvents() {
		_classCallCheck(this, RevealEngineEvents);

		var inIFrame = window.top != window.self;

		// Management of actions in prez mode (not in preview mode)
		if (!inIFrame) {
			// Init all ble actions
			new _blePrezControler.BlePrezControler();

			// Init Voice and Speech controlers
			this.voiceRecognition = new _voiceRecognitionControler.VoiceRecognitionControler();
			this.speechSynthesis = new _speechSynthesisControler.SpeechSynthesisControler();
			this._voiceEvents();
		}

		// In al case we init the highlight of code.
		this._initHighlightCode();
	}

	_createClass(RevealEngineEvents, [{
		key: '_voiceEvents',
		value: function _voiceEvents() {
			var _this = this;

			Reveal.addEventListener('recognition', function () {
				setTimeout(function (_) {
					return _this._voiceCallBack();
				}, 1000);
			});
			Reveal.addEventListener('end-recognition', function (_) {
				try {
					_this.voiceRecognition.stop();
				} catch (e) {}
			});
		}
	}, {
		key: '_voiceCallBack',
		value: function _voiceCallBack() {
			var _this2 = this;

			document.getElementById('demoSpeech').style.display = '';
			this.voiceRecognition.start(function (finalStr) {
				document.getElementById('speech_input').innerHTML = finalStr;
				if (finalStr.indexOf('ChaineToTest') != -1) {
					document.getElementById('demoSpeech').style.display = 'none';
					_this2.speechSynthesis.speak('bla bla bla').then(function (_) {
						return _this2._voiceCallBack.bind(_this2);
					}).catch(function (error) {
						console.error(error);
					});
				}
			});
		}
	}, {
		key: '_initHighlightCode',
		value: function _initHighlightCode() {

			new _highlightEvents.HighlightEvents();
		}
	}]);

	return RevealEngineEvents;
}();

},{"../sensors/blePrezControler.js":5,"../sensors/speechSynthesisControler.js":6,"../sensors/voiceRecognitionControler.js":7,"./highlightEvents.js":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BlePrezControler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _myoControler = require('../webbluetooth/myoControler.js');

var _mbotControler = require('../webbluetooth/mbotControler.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlePrezControler = exports.BlePrezControler = function () {
	function BlePrezControler() {
		_classCallCheck(this, BlePrezControler);

		this._myoBinding();
		this._mbotBinding();
	}

	_createClass(BlePrezControler, [{
		key: '_myoBinding',
		value: function _myoBinding() {
			var lastDoubleTap = 0;
			document.getElementById('connectMyo').addEventListener('click', function () {

				var myo = new _myoControler.MyoControler();
				if (myo.connected) {
					myo.connect().then(function () {
						return myo.init();
					}).then(function () {
						return myo.registerGestures(function (gesture) {
							if (gesture && gesture.gesture === 'double-tap') {
								if (Date.now() - lastDoubleTap < 2000) {
									Reveal.next();
								}
								lastDoubleTap = Date.now();
							}
						});
					});
				}
			});
		}
	}, {
		key: '_mbotBinding',
		value: function _mbotBinding() {
			// Check the connection
			var stepConnect = document.getElementById('connectMBot');
			var stepControl = document.getElementById('part-button-mbot');
			document.getElementById("connectMBot").addEventListener('click', function (_) {
				// Request the device
				var mBot = new _mbotControler.MBot();
				mBot.request().then(function (_) {
					// Connect to the mbot
					return mBot.connect();
				}).then(function (_) {
					// Connection is done, we show the controls
					stepConnect.style.display = "none";
					stepControl.style.display = "flex";

					var partBtn = document.querySelector('.part-button');

					// Control the robot by buttons
					var btnUp = document.getElementById('mBotBtnUp');
					var btnDown = document.getElementById('mBotBtnDown');
					var btnLeft = document.getElementById('mBotBtnLeft');
					var btnRight = document.getElementById('mBotBtnRight');

					btnUp.addEventListener('mousedown', function (_) {
						mBot.processMotor(-250, 250);
					});
					btnDown.addEventListener('mousedown', function (_) {
						mBot.processMotor(250, -250);
					});
					btnLeft.addEventListener('mousedown', function (_) {
						mBot.processMotor(250, 250);
					});
					btnRight.addEventListener('mousedown', function (_) {
						mBot.processMotor(-250, -250);
					});

					btnUp.addEventListener('mouseup', function (_) {
						mBot.processMotor(0, 0);
					});
					btnDown.addEventListener('mouseup', function (_) {
						mBot.processMotor(0, 0);
					});
					btnLeft.addEventListener('mouseup', function (_) {
						mBot.processMotor(0, 0);
					});
					btnRight.addEventListener('mouseup', function (_) {
						mBot.processMotor(0, 0);
					});
				});
			});
		}
	}]);

	return BlePrezControler;
}();

},{"../webbluetooth/mbotControler.js":8,"../webbluetooth/myoControler.js":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpeechSynthesisControler = exports.SpeechSynthesisControler = function () {
    function SpeechSynthesisControler() {
        _classCallCheck(this, SpeechSynthesisControler);

        this.synth = window.speechSynthesis;

        this.voiceFR = null;
        this._configure();
    }

    _createClass(SpeechSynthesisControler, [{
        key: '_configure',
        value: function _configure() {
            this._populateVoiceList();
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = this._populateVoiceList.bind(this);
            }
        }
    }, {
        key: '_populateVoiceList',
        value: function _populateVoiceList() {
            var voices = this.synth.getVoices();
            for (var i = 0; i < voices.length; i++) {
                if (voices[i].lang === 'fr-FR') {
                    this.voiceFR = voices[i];
                    console.log("%s, %O ", voices[i].lang, voices[i]);
                }
            }
        }
    }, {
        key: 'speak',
        value: function speak(value) {
            return new Promise(function (resolve, reject) {

                if (!this.voiceFR) {
                    reject();
                }
                var utterThis = new SpeechSynthesisUtterance(value);
                utterThis.voice = this.voiceFR;
                utterThis.pitch = 1;
                utterThis.rate = 1;
                utterThis.onend = function () {
                    resolve();
                };
                this.synth.speak(utterThis);
            });
        }
    }]);

    return SpeechSynthesisControler;
}();

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VoiceRecognitionControler = exports.VoiceRecognitionControler = function () {
    function VoiceRecognitionControler() {
        _classCallCheck(this, VoiceRecognitionControler);

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        this.recognition = new SpeechRecognition();
        this._configure();
    }

    _createClass(VoiceRecognitionControler, [{
        key: 'start',
        value: function start(callback) {
            this.recognition.onresult = function (event) {
                var finalStr = event.results[0][0].transcript;
                console.log('Confidence: ' + finalStr);
                if (callback) {
                    callback(finalStr);
                }
            };
            this.recognition.start();
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.recognition.stop();
        }
    }, {
        key: '_configure',
        value: function _configure() {
            var _this = this;

            this.recognition.continuous = true;
            this.recognition.lang = 'fr-FR';
            this.recognition.interimResults = true;

            // We detect end
            this.recognition.onend = function (_) {
                console.log('End of recognition');
                _this.recognition.stop();
            };
            // We detect errors
            this.recognition.onerror = function (event) {
                if (event.error == 'no-speech') {
                    console.log('No Speech');
                }
                if (event.error == 'audio-capture') {
                    console.log('No microphone');
                }
                if (event.error == 'not-allowed') {
                    console.log('Not Allowed');
                }
            };
        }
    }]);

    return VoiceRecognitionControler;
}();

},{}],8:[function(require,module,exports){
'use strict';
/**
 * Code from https://github.com/binomed/mbot-webbluetooth
 * 
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEVICE_NAME = "Makeblock_LE",
    SERVICE_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb",
    CHARACTERISTIC_UUID = "0000ffe3-0000-1000-8000-00805f9b34fb";

/**
 * General configuration (UUID)
*/

var Config = function () {
    function Config() {
        _classCallCheck(this, Config);
    }

    _createClass(Config, [{
        key: "name",
        value: function name() {
            return "Makeblock_LE";
        }
    }, {
        key: "service",
        value: function service() {
            return "0000ffe1-0000-1000-8000-00805f9b34fb";
        }
    }, {
        key: "charateristic",
        value: function charateristic() {
            return "0000ffe3-0000-1000-8000-00805f9b34fb";
        }
    }]);

    return Config;
}();

// Const for instructions types


var TYPE_MOTOR = 0x0a,
    TYPE_RGB = 0x08,
    TYPE_SOUND = 0x07;

// Const for the ports
var PORT_1 = 0x01,
    PORT_2 = 0x02,
    PORT_3 = 0x03,
    PORT_4 = 0x04,
    PORT_5 = 0x05,
    PORT_6 = 0x06,
    PORT_7 = 0x07,
    PORT_8 = 0x08,
    M_1 = 0x09,
    M_2 = 0x0a;

/**
 * Class for the robot
 * */

var MBot = exports.MBot = function () {
    function MBot() {
        _classCallCheck(this, MBot);

        this.device = null;
        this.config = new Config();
        this.onDisconnected = this.onDisconnected.bind(this);
        this.buzzerIndex = 0;
    }

    /*
    Request the device with bluetooth
    */


    _createClass(MBot, [{
        key: "request",
        value: function request() {
            var _this = this;

            var options = {
                "filters": [{
                    "name": this.config.name()
                }],
                "optionalServices": [this.config.service()]
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

        /**
         * Control the motors of robot
        */

    }, {
        key: "processMotor",
        value: function processMotor(valueM1, valueM2) {
            var _this2 = this;

            return this._writeCharacteristic(this._genericControl(TYPE_MOTOR, M_1, 0, valueM1)).then(function () {
                return _this2._writeCharacteristic(_this2._genericControl(TYPE_MOTOR, M_2, 0, valueM2));
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: "processBuzzer",
        value: function processBuzzer() {
            this.buzzerIndex = (this.buzzerIndex + 1) % 8;
            return this._writeCharacteristic(this._genericControl(TYPE_SOUND, PORT_2, 22, this.buzzerIndex)).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: "processColor",
        value: function processColor(red, blue, green) {
            var rHex = red << 8;
            var gHex = green << 16;
            var bHex = blue << 24;
            var value = rHex | gHex | bHex;
            this._writeCharacteristic(this._genericControl(TYPE_RGB, PORT_6, 0, value));
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
        key: "_genericControl",
        value: function _genericControl(type, port, slot, value) {
            /*
            ff 55 len idx action device port  slot  data a
            0  1  2   3   4      5      6     7     8
            */
            // Static values
            var buf = new ArrayBuffer(16);
            var bufView = new Uint16Array(buf);

            var byte0 = 0xff,
                // Static header
            byte1 = 0x55,
                // Static header
            byte2 = 0x09,
                // len
            byte3 = 0x00,
                // idx
            byte4 = 0x02,
                // action
            byte5 = type,
                // device
            byte6 = port,
                // port
            byte7 = slot; // slot
            //dynamics values
            var byte8 = 0x00,
                // data
            byte9 = 0x00,
                // data
            byte10 = 0x00,
                // data
            byte11 = 0x00; // data
            //End of message
            var byte12 = 0x0a,
                byte13 = 0x00,
                byte14 = 0x00,
                byte15 = 0x00;

            switch (type) {
                case TYPE_MOTOR:
                    // Motor M1
                    // ff:55  09:00  02:0a  09:64  00:00  00:00  0a"
                    // 0x55ff;0x0009;0x0a02;0x0964;0x0000;0x0000;0x000a;0x0000;
                    // Motor M2
                    // ff:55:09:00:02:0a:0a:64:00:00:00:00:0a                
                    var tempValue = value < 0 ? parseInt("ffff", 16) + Math.max(-255, value) : Math.min(255, value);
                    byte7 = tempValue & 0x00ff;
                    byte8 = 0x00;
                    byte8 = tempValue >> 8;

                    break;
                case TYPE_RGB:
                    // ff:55  09:00  02:08  06:00  5c:99  6d:00  0a
                    // 0x55ff;0x0009;0x0802;0x0006;0x995c;0x006d;0x000a;0x0000;
                    byte7 = 0x00;
                    byte8 = value >> 8 & 0xff;
                    byte9 = value >> 16 & 0xff;
                    byte10 = value >> 24 & 0xff;
                    break;
                case TYPE_SOUND:
                    //ff:55:05:00:02:22:00:00:0a
                    //ff:55:05:00:02:22:06:01:0a
                    //ff:55:05:00:02:22:ee:01:0a
                    //ff:55:05:00:02:22:88:01:0a
                    //ff:55:05:00:02:22:b8:01:0a
                    //ff:55:05:00:02:22:5d:01:0a
                    //ff:55:05:00:02:22:4a:01:0a
                    //ff:55:05:00:02:22:26:01:0a
                    byte2 = 0x05;
                    byte5 = 0x22;
                    if (value === 0) {
                        byte6 = 0x00;
                        byte7 = 0x00;
                    } else if (value === 1) {
                        byte6 = 0x06;
                        byte7 = 0x01;
                    } else if (value === 2) {
                        byte6 = 0xee;
                        byte7 = 0x01;
                    } else if (value === 3) {
                        byte6 = 0x88;
                        byte7 = 0x01;
                    } else if (value === 4) {
                        byte6 = 0xb8;
                        byte7 = 0x01;
                    } else if (value === 5) {
                        byte6 = 0x5d;
                        byte7 = 0x01;
                    } else if (value === 6) {
                        byte6 = 0x4a;
                        byte7 = 0x01;
                    } else {
                        byte6 = 0x26;
                        byte7 = 0x01;
                    }
                    byte8 = 0x0a;
                    byte12 = 0x00;

                    break;
            }

            bufView[0] = byte1 << 8 | byte0;
            bufView[1] = byte3 << 8 | byte2;
            bufView[2] = byte5 << 8 | byte4;
            bufView[3] = byte7 << 8 | byte6;
            bufView[4] = byte9 << 8 | byte8;
            bufView[5] = byte11 << 8 | byte10;
            bufView[6] = byte13 << 8 | byte12;
            bufView[7] = byte15 << 8 | byte14;
            console.log(byte0.toString(16) + ":" + byte1.toString(16) + ":" + byte2.toString(16) + ":" + byte3.toString(16) + ":" + byte4.toString(16) + ":" + byte5.toString(16) + ":" + byte6.toString(16) + ":" + byte7.toString(16) + ":" + byte8.toString(16) + ":" + byte9.toString(16) + ":" + byte10.toString(16) + ":" + byte11.toString(16) + ":" + byte12.toString(16) + ":" + byte13.toString(16) + ":" + byte14.toString(16) + ":" + byte15.toString(16) + ":");
            console.log(bufView[0].toString(16) + ":" + bufView[1].toString(16) + ":" + bufView[2].toString(16) + ":" + bufView[3].toString(16) + ":" + bufView[4].toString(16) + ":" + bufView[5].toString(16) + ":" + bufView[6].toString(16) + ":" + bufView[7].toString(16));
            return buf;
        }
    }, {
        key: "_writeCharacteristic",
        value: function _writeCharacteristic(value) {
            var _this3 = this;

            return this.device.gatt.getPrimaryService(this.config.service()).then(function (service) {
                return service.getCharacteristic(_this3.config.charateristic());
            }).then(function (characteristic) {
                return characteristic.writeValue(value);
            });
        }
    }]);

    return MBot;
}();

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyoConfig = function () {
    function MyoConfig() {
        _classCallCheck(this, MyoConfig);
    }

    _createClass(MyoConfig, [{
        key: "controlService",
        value: function controlService() {
            return "d5060001-a904-deb9-4748-2c7f4a124842";
        }
    }, {
        key: "gestureService",
        value: function gestureService() {
            return "d5060003-a904-deb9-4748-2c7f4a124842";
        }
    }, {
        key: "commandCharacteristic",
        value: function commandCharacteristic() {
            return "d5060401-a904-deb9-4748-2c7f4a124842";
        }
    }, {
        key: "gestureCharacteristic",
        value: function gestureCharacteristic() {
            return "d5060103-a904-deb9-4748-2c7f4a124842";
        }
    }]);

    return MyoConfig;
}();

var MyoController = exports.MyoController = function () {
    function MyoController() {
        _classCallCheck(this, MyoController);

        this.device = null;
        this.config = new Config();
        this.onDisconnected = this.onDisconnected.bind(this);
        this.enableGesturesCommand = new Uint8Array(5);
        enableGesturesCommand[0] = 0x01; // set mode
        enableGesturesCommand[1] = 0x03; // bytes in payload
        enableGesturesCommand[2] = 0x00; // emg mode: none
        enableGesturesCommand[3] = 0x00; // imu mode: disabled
        enableGesturesCommand[4] = 0x01; // classifier mode: enabled

        this.disableGesturesCommand = Uint8Array.from(enableGesturesCommand);
        disableGesturesCommand[4] = 0x00; // classifier mode: disabled

        this.deepSleepCommand = new Uint8Array(2);
        deepSleepCommand[0] = 0x04; // set mode
        deepSleepCommand[1] = 0x00; // bytes in payload

        this.connected = false;
    }

    /*
    Request the device with bluetooth
    */


    _createClass(MyoController, [{
        key: "request",
        value: function request() {
            var _this = this;

            var options = {
                "filters": [{
                    "services": [this.config.controlService()]
                }],
                "optionalServices": [this.config.gestureService()]
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
                this.connected = true;
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

                return this.device.gatt.getPrimaryService(this.config.controlService()).then(function (service) {
                    console.log('> get Myo Control Service');
                    return service.getCharacteristic(_this2.config.commandCharacteristic());
                }).then(function (characteristic) {
                    console.log('> get Myo Command characteristic');
                    return characteristic.writeValue(_this2.enableGesturesCommand);
                }).then(function () {
                    console.log('Ready to listen gestures');
                }).catch(function (error) {
                    return console.error(error);
                });
            }
        }
    }, {
        key: "registerGestures",
        value: function registerGestures(callback) {
            var _this3 = this;

            if (!this.device) {
                return Promise.reject('Device is not connected.');
            } else {
                this.device.gatt.getPrimaryService(this.config.gestureService()).then(function (service) {
                    console.log('> Get Gesture Service');
                    return service.getCharacteristic(_this3.config.gestureCharacteristic());
                }).then(function (characteristic) {
                    console.log('Get gesture caracteristic');
                    characteristic.startNotifications();
                    characteristic.addEventListener('characteristicvaluechanged', function (ev) {
                        var gesture = _this3._parseMyoGesture(ev.target.value);
                        console.log('Gesture : ', gesture);
                        if (callback) {
                            callback(gesture);
                        }
                    });
                }).catch(function (error) {
                    return console.error(error);
                });
            }
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
            this.connected = false;
            console.log('Device is disconnected.');
        }
    }, {
        key: "_parseMyoGesture",
        value: function _parseMyoGesture(value) {
            if (value.getUint8(0) === 0x03) {
                var gestureValue = value.getUint16(1, true);
                var gesture = {
                    0x0000: 'rest',
                    0x0001: 'fist',
                    0x0002: 'wave-in',
                    0x0003: 'wave-out',
                    0x0004: 'fingers-spread',
                    0x0005: 'double-tap',
                    0xffff: 'unknown'
                }[gestureValue];
                return { gesture: gesture };
            }
            return { gesture: null };
        }
    }]);

    return MyoController;
}();

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyIsInNjcmlwdHMvcHJlei5qcyIsInNjcmlwdHMvcHJlei9oaWdobGlnaHRFdmVudHMuanMiLCJzY3JpcHRzL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzIiwic2NyaXB0cy9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMiLCJzY3JpcHRzL3NlbnNvcnMvc3BlZWNoU3ludGhlc2lzQ29udHJvbGVyLmpzIiwic2NyaXB0cy9zZW5zb3JzL3ZvaWNlUmVjb2duaXRpb25Db250cm9sZXIuanMiLCJzY3JpcHRzL3dlYmJsdWV0b290aC9tYm90Q29udHJvbGVyLmpzIiwic2NyaXB0cy93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNLGNBQWMsSUFBcEI7QUFDQSxJQUFNLHFCQUFxQixHQUEzQjtBQUNBLElBQU0sWUFBWSxFQUFsQjs7SUFFYSxtQixXQUFBLG1CO0FBQ1osb0NBQW9DO0FBQUEsTUFBdkIsTUFBdUIsUUFBdkIsTUFBdUI7QUFBQSxNQUFmLGFBQWUsUUFBZixhQUFlOztBQUFBOztBQUNuQyxPQUFLLFdBQUwsR0FBbUIsU0FBUyxjQUFULGdCQUFxQyxNQUFyQyxDQUFuQjtBQUNBLE9BQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQSxTQUFPLGdCQUFQLFdBQWdDLE1BQWhDLEVBQTBDLEtBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBMUM7QUFDQSxTQUFPLGdCQUFQLGdCQUFxQyxNQUFyQyxFQUErQyxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQStCLElBQS9CLENBQS9DO0FBQ0E7Ozs7b0NBRWlCLEssRUFBTTtBQUN2QixPQUFHO0FBQ0YsUUFBSSxNQUFNLElBQU4sS0FBZSxlQUFuQixFQUFt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LENBQWlCLFVBQWpCLEVBQVA7QUFDSDtBQUNKOzs7eUNBRWdCO0FBQ2IsaUJBQUssU0FBTCxHQUFpQixLQUFqQjtBQUNBLG9CQUFRLEdBQVIsQ0FBWSx5QkFBWjtBQUNIOzs7eUNBRWdCLEssRUFBTztBQUNwQixnQkFBSSxNQUFNLFFBQU4sQ0FBZSxDQUFmLE1BQXNCLElBQTFCLEVBQWdDO0FBQzVCLG9CQUFNLGVBQWUsTUFBTSxTQUFOLENBQWdCLENBQWhCLEVBQW1CLElBQW5CLENBQXJCO0FBQ0Esb0JBQU0sVUFBVTtBQUNaLDRCQUFRLE1BREk7QUFFWiw0QkFBUSxNQUZJO0FBR1osNEJBQVEsU0FISTtBQUlaLDRCQUFRLFVBSkk7QUFLWiw0QkFBUSxnQkFMSTtBQU1aLDRCQUFRLFlBTkk7QUFPWiw0QkFBUTtBQVBJLGtCQVFkLFlBUmMsQ0FBaEI7QUFTQSx1QkFBTyxFQUFFLGdCQUFGLEVBQVA7QUFDSDtBQUNELG1CQUFPLEVBQUUsU0FBUyxJQUFYLEVBQVA7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcblxuY29uc3QgTElORV9IRUlHSFQgPSAxLjE1O1xuY29uc3QgQURESVRJT05OQUxfSEVJR0hUID0gMC40O1xuY29uc3QgQ09MX1dJRFRIID0gMzU7XG5cbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRDb2RlSGVscGVye1xuXHRjb25zdHJ1Y3Rvcih7a2V5RWx0LCBwb3NpdGlvbkFycmF5fSl7XG5cdFx0dGhpcy5lbHRIaWdsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBoaWdobGlnaHQtJHtrZXlFbHR9YCk7XG5cdFx0dGhpcy5wb3NpdGlvbkFycmF5ID0gcG9zaXRpb25BcnJheTtcblxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKGBjb2RlLSR7a2V5RWx0fWAsIHRoaXMuX2xpc3RlbkZyYWdtZW50cy5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcihgc3RvcC1jb2RlLSR7a2V5RWx0fWAsIHRoaXMuX3VucmVnaXN0ZXJGcmFnbWVudHMuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRfcHJvZ3Jlc3NGcmFnbWVudChldmVudCl7XG5cdFx0dHJ5e1x0XHRcdFxuXHRcdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdmcmFnbWVudHNob3duJyl7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gK2V2ZW50LmZyYWdtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudC1pbmRleCcpO1xuXHRcdFx0XHRjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4XTtcblx0XHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRcdFx0aWYgKGtleSA9PT0gJ3Jvdycpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsndG9wJ10gPSBgY2FsYyg5MHB4ICsgKCR7cHJvcGVydGllc1trZXldfSAqICR7TElORV9IRUlHSFR9ZW0pKWA7XG5cdFx0XHRcdFx0fWVsc2UgaWYgKGtleSA9PT0gJ2NvbCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnbGVmdCddID0gYGNhbGMoNjBweCArICgke3Byb3BlcnRpZXNba2V5XX0gKiAke0NPTF9XSURUSH1weCkpYDtcblx0XHRcdFx0XHR9ZWxzZSBpZiAoa2V5ID09PSAnY2FsY0hlaWdodCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSBgY2FsYygke3Byb3BlcnRpZXNba2V5XX1lbSArICR7QURESVRJT05OQUxfSEVJR0hUfWVtKWA7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XHRcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSArZXZlbnQuZnJhZ21lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWZyYWdtZW50LWluZGV4Jyk7XG5cdFx0XHRcdC8vIE9uIHJlc2V0IGxlcyBwcm9wZXJ0aWVzXG5cdFx0XHRcdGxldCBwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4XTtcblx0XHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0XHRcdGlmIChrZXkgPT09ICdyb3cnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ3RvcCddID0gJyc7XG5cdFx0XHRcdFx0fWVsc2UgaWYoa2V5ID09PSAnY2FsY0hlaWdodCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSAnJztcblx0XHRcdFx0XHR9ZWxzZSBpZiAoa2V5ID09PSAnY29sJyl7XG5cdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlWydsZWZ0J10gPSAnJztcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVba2V5XSA9ICcnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaW5kZXggPiAwKXtcdFx0XHRcblx0XHRcdFx0XHRwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4IC0gMV07XG5cdFx0XHRcdFx0a2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0XHRcdFx0aWYgKGtleSA9PT0gJ3Jvdycpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlWyd0b3AnXSA9IGBjYWxjKDkwcHggKyAoJHtwcm9wZXJ0aWVzW2tleV19ICogJHtMSU5FX0hFSUdIVH1lbSkpYDtcblx0XHRcdFx0XHRcdH1lbHNlIGlmIChrZXkgPT09ICdjb2wnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ2xlZnQnXSA9IGBjYWxjKDYwcHggKyAoJHtwcm9wZXJ0aWVzW2tleV19ICogJHtDT0xfV0lEVEh9cHgpKWA7XG5cdFx0XHRcdFx0fWVsc2UgaWYgKGtleSA9PT0gJ2NhbGNIZWlnaHQnKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSBgY2FsYygke3Byb3BlcnRpZXNba2V5XX1lbSArICR7QURESVRJT05OQUxfSEVJR0hUfWVtKWA7XG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVtrZXldID0gcHJvcGVydGllc1trZXldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVx0XHRcdFxuXHRcdFx0fVxuXHRcdH1jYXRjaChlKXt9XG5cdH1cblxuXHRfbGlzdGVuRnJhZ21lbnRzKCl7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZyYWdtZW50c2hvd24nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdmcmFnbWVudGhpZGRlbicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRfdW5yZWdpc3RlckZyYWdtZW50cygpe1xuXHRcdFJldmVhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRoaWRkZW4nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHR9XG5cblx0XG59IiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQge1JldmVhbEVuZ2luZUV2ZW50c30gZnJvbSAnLi9wcmV6L3JldmVhbEVuZ2luZUV2ZW50cy5qcyc7XG5cblxuKGZ1bmN0aW9uICgpIHtcblxuXG4gICAgZnVuY3Rpb24gcGFnZUxvYWQoKSB7XG4gICAgICAgIG5ldyBSZXZlYWxFbmdpbmVFdmVudHMoKTtcbiAgICB9XG5cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcGFnZUxvYWQpO1xufSkoKTsiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHtIaWdobGlnaHRDb2RlSGVscGVyfSBmcm9tICcuLi9oZWxwZXJzL2hpZ2hsaWdodENvZGVIZWxwZXIuanMnO1xuXG5jb25zdCBMSU5FX0hFSUdIVCA9IDEuMTU7XG5jb25zdCBBRERJVElPTk5BTF9IRUlHVCA9IDAuNDtcbmNvbnN0IENPTF9XSURUSCA9IDM1O1xuXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0RXZlbnRze1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdC8vICBCbGVDb2RlIFxuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICdjb25uZWN0LWJsZScsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XG5cdFx0XHRcdHJvdyA6IDEsXG5cdFx0XHRcdGxlZnQ6ICcxNTBweCcsXG5cdFx0XHRcdHdpZHRoOiAnMTAwcHgnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHJvdyA6IDIsXG5cdFx0XHRcdGNvbCA6IDEsXG5cdFx0XHRcdHdpZHRoOiAnNTAwcHgnXG5cdFx0XHR9XVxuXHRcdH0pO1xuXG5cdFx0Ly8gIEJsZSBDb2RlIFJlYWQgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAncmVhZC1jaGFyYWN0Jyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW3tcblx0XHRcdFx0cm93IDogMSxcblx0XHRcdFx0bGVmdDogJzE1MHB4Jyxcblx0XHRcdFx0d2lkdGg6ICcxMDBweCdcblx0XHRcdH0sIHtcblx0XHRcdFx0cm93IDogMyxcblx0XHRcdFx0Y29sIDogMSxcblx0XHRcdFx0d2lkdGg6ICc3MDBweCdcblx0XHRcdH0sIHtcblx0XHRcdFx0cm93IDogNCxcblx0XHRcdFx0bGVmdCA6ICcxNTBweCcsXG5cdFx0XHRcdHdpZHRoOiAnMjAwcHgnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHJvdyA6IDYsXG5cdFx0XHRcdGNvbCA6IDEsXG5cdFx0XHRcdHdpZHRoOiAnNTAwcHgnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdHJvdyA6IDcsXG5cdFx0XHRcdGxlZnQgOiAnMTUwcHgnLFxuXHRcdFx0XHR3aWR0aDogJzEwMHB4J1xuXHRcdFx0fSwge1xuXHRcdFx0XHRyb3cgOiA5LFxuXHRcdFx0XHRjYWxjSGVpZ2h0OiAyLFxuXHRcdFx0XHRjb2wgOiAxLFxuXHRcdFx0XHR3aWR0aDogJzgwMHB4J1xuXHRcdFx0fV1cblx0XHR9KVxuXHR9XG59IiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQge0hpZ2hsaWdodEV2ZW50c30gZnJvbSAnLi9oaWdobGlnaHRFdmVudHMuanMnO1xuaW1wb3J0IHtCbGVQcmV6Q29udHJvbGVyfSBmcm9tICcuLi9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMnO1xuaW1wb3J0IHtWb2ljZVJlY29nbml0aW9uQ29udHJvbGVyfSBmcm9tICcuLi9zZW5zb3JzL3ZvaWNlUmVjb2duaXRpb25Db250cm9sZXIuanMnO1xuaW1wb3J0IHtTcGVlY2hTeW50aGVzaXNDb250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvc3BlZWNoU3ludGhlc2lzQ29udHJvbGVyLmpzJztcblxuXG5leHBvcnQgY2xhc3MgUmV2ZWFsRW5naW5lRXZlbnRze1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcblx0XHRsZXQgaW5JRnJhbWUgPSB3aW5kb3cudG9wICE9IHdpbmRvdy5zZWxmO1xuXHRcdFxuXHRcdC8vIE1hbmFnZW1lbnQgb2YgYWN0aW9ucyBpbiBwcmV6IG1vZGUgKG5vdCBpbiBwcmV2aWV3IG1vZGUpXG5cdFx0aWYgKCFpbklGcmFtZSl7XG5cdFx0XHQvLyBJbml0IGFsbCBibGUgYWN0aW9uc1xuXHRcdFx0bmV3IEJsZVByZXpDb250cm9sZXIoKTtcblxuXHRcdFx0Ly8gSW5pdCBWb2ljZSBhbmQgU3BlZWNoIGNvbnRyb2xlcnNcblx0XHRcdHRoaXMudm9pY2VSZWNvZ25pdGlvbiA9IG5ldyBWb2ljZVJlY29nbml0aW9uQ29udHJvbGVyKCk7XG5cdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcyA9IG5ldyBTcGVlY2hTeW50aGVzaXNDb250cm9sZXIoKTtcblx0XHRcdHRoaXMuX3ZvaWNlRXZlbnRzKCk7XG5cdFx0fVxuXG5cdFx0Ly8gSW4gYWwgY2FzZSB3ZSBpbml0IHRoZSBoaWdobGlnaHQgb2YgY29kZS5cblx0XHR0aGlzLl9pbml0SGlnaGxpZ2h0Q29kZSgpO1xuXG5cdH1cblxuXHRfdm9pY2VFdmVudHMoKXtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcigncmVjb2duaXRpb24nLCAoKT0+e1xuXHRcdFx0c2V0VGltZW91dChfPT4gdGhpcy5fdm9pY2VDYWxsQmFjaygpLDEwMDApO1xuXHRcdH0pO1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdlbmQtcmVjb2duaXRpb24nLCBfPT57XG5cdFx0XHR0cnl7XG5cdFx0XHRcdHRoaXMudm9pY2VSZWNvZ25pdGlvbi5zdG9wKCk7XG5cdFx0XHR9Y2F0Y2goZSl7fVxuXHRcdH0pXG5cdH1cblxuXHRfdm9pY2VDYWxsQmFjaygpe1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vU3BlZWNoJykuc3R5bGUuZGlzcGxheSA9ICcnO1xuXHRcdHRoaXMudm9pY2VSZWNvZ25pdGlvbi5zdGFydCgoZmluYWxTdHIpPT57XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BlZWNoX2lucHV0JykuaW5uZXJIVE1MID0gZmluYWxTdHI7XG5cdFx0XHRpZiAoZmluYWxTdHIuaW5kZXhPZignQ2hhaW5lVG9UZXN0JykgIT0gLTEpe1xuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtb1NwZWVjaCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKCdibGEgYmxhIGJsYScpXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0XG5cblx0X2luaXRIaWdobGlnaHRDb2RlKCkge1xuXG5cdFx0bmV3IEhpZ2hsaWdodEV2ZW50cygpO1xuXHR9XG59IiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQge015b0NvbnRyb2xlcn0gZnJvbSAnLi4vd2ViYmx1ZXRvb3RoL215b0NvbnRyb2xlci5qcyc7XG5pbXBvcnQge01Cb3R9IGZyb20gJy4uL3dlYmJsdWV0b290aC9tYm90Q29udHJvbGVyLmpzJztcblxuZXhwb3J0IGNsYXNzIEJsZVByZXpDb250cm9sZXJ7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFxuXHRcdHRoaXMuX215b0JpbmRpbmcoKTtcblx0XHR0aGlzLl9tYm90QmluZGluZygpO1xuXHR9XG5cblx0X215b0JpbmRpbmcoKXtcblx0XHRsZXQgbGFzdERvdWJsZVRhcCA9IDA7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RNeW8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG5cdFx0XHRcblx0XHRcdGxldCBteW8gPSBuZXcgTXlvQ29udHJvbGVyKCk7XG5cdFx0XHRpZiAobXlvLmNvbm5lY3RlZCl7XG5cdFx0XHRcdG15by5jb25uZWN0KClcblx0XHRcdFx0LnRoZW4oKCk9Pm15by5pbml0KCkpXG5cdFx0XHRcdC50aGVuKCgpPT5teW8ucmVnaXN0ZXJHZXN0dXJlcygoZ2VzdHVyZSk9Pntcblx0XHRcdFx0XHRpZiAoZ2VzdHVyZSAmJiBnZXN0dXJlLmdlc3R1cmUgPT09ICdkb3VibGUtdGFwJyl7XG5cdFx0XHRcdFx0XHRpZihEYXRlLm5vdygpIC0gbGFzdERvdWJsZVRhcCA8IDIwMDApe1xuXHRcdFx0XHRcdFx0XHRSZXZlYWwubmV4dCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bGFzdERvdWJsZVRhcCA9IERhdGUubm93KCk7XG5cdFx0XHRcdFx0fSBcblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0X21ib3RCaW5kaW5nKCl7XG5cdFx0IC8vIENoZWNrIHRoZSBjb25uZWN0aW9uXG5cdFx0IGxldCBzdGVwQ29ubmVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25uZWN0TUJvdCcpO1xuXHRcdCBsZXQgc3RlcENvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydC1idXR0b24tbWJvdCcpOyBcblx0XHQgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0TUJvdFwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF8gPT4ge1xuXHRcdFx0Ly8gUmVxdWVzdCB0aGUgZGV2aWNlXG5cdFx0XHRsZXQgbUJvdCA9IG5ldyBNQm90KCk7XG5cdFx0XHRtQm90LnJlcXVlc3QoKVxuXHRcdFx0XHQudGhlbihfID0+IHtcblx0XHRcdFx0XHQvLyBDb25uZWN0IHRvIHRoZSBtYm90XG5cdFx0XHRcdFx0cmV0dXJuIG1Cb3QuY29ubmVjdCgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihfID0+IHtcblx0XHRcdFx0XHQvLyBDb25uZWN0aW9uIGlzIGRvbmUsIHdlIHNob3cgdGhlIGNvbnRyb2xzXG5cdFx0XHRcdFx0c3RlcENvbm5lY3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0XHRcdHN0ZXBDb250cm9sLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcblxuXHRcdFx0XHRcdGxldCBwYXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcnQtYnV0dG9uJyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQ29udHJvbCB0aGUgcm9ib3QgYnkgYnV0dG9uc1xuXHRcdFx0XHRcdGxldCBidG5VcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuVXAnKTtcblx0XHRcdFx0XHRsZXQgYnRuRG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuRG93bicpO1xuXHRcdFx0XHRcdGxldCBidG5MZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5MZWZ0Jyk7XG5cdFx0XHRcdFx0bGV0IGJ0blJpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5SaWdodCcpO1xuXG5cdFx0XHRcdFx0YnRuVXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKC0yNTAsIDI1MCkgfSk7XG5cdFx0XHRcdFx0YnRuRG93bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMjUwLCAtMjUwKSB9KTtcblx0XHRcdFx0XHRidG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigyNTAsIDI1MCkgfSk7XG5cdFx0XHRcdFx0YnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKC0yNTAsIC0yNTApIH0pO1xuXG5cdFx0XHRcdFx0YnRuVXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigwLCAwKSB9KTtcblx0XHRcdFx0XHRidG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XG5cdFx0XHRcdFx0YnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApIH0pO1xuXHRcdFx0XHRcdGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XG5cdFx0XHRcdFx0XG5cblx0XHRcdFx0fSlcblx0XHR9KTtcblx0fVxuXG59IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBjbGFzcyBTcGVlY2hTeW50aGVzaXNDb250cm9sZXJ7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5zeW50aCA9IHdpbmRvdy5zcGVlY2hTeW50aGVzaXM7XG5cbiAgICAgICAgdGhpcy52b2ljZUZSID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29uZmlndXJlKCk7XG4gICAgfVxuXG4gICAgX2NvbmZpZ3VyZSgpe1xuICAgICAgICB0aGlzLl9wb3B1bGF0ZVZvaWNlTGlzdCgpO1xuICAgICAgICBpZiAoc3BlZWNoU3ludGhlc2lzLm9udm9pY2VzY2hhbmdlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMub252b2ljZXNjaGFuZ2VkID0gdGhpcy5fcG9wdWxhdGVWb2ljZUxpc3QuYmluZCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9wb3B1bGF0ZVZvaWNlTGlzdCgpIHtcbiAgICAgICAgbGV0IHZvaWNlcyA9IHRoaXMuc3ludGguZ2V0Vm9pY2VzKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdm9pY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodm9pY2VzW2ldLmxhbmcgPT09ICdmci1GUicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZvaWNlRlIgPSB2b2ljZXNbaV07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzcGVhayh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy52b2ljZUZSKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdXR0ZXJUaGlzID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSh2YWx1ZSk7XG4gICAgICAgICAgICB1dHRlclRoaXMudm9pY2UgPSB0aGlzLnZvaWNlRlI7XG4gICAgICAgICAgICB1dHRlclRoaXMucGl0Y2ggPSAxO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnJhdGUgPSAxO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLm9uZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zeW50aC5zcGVhayh1dHRlclRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNsYXNzIFZvaWNlUmVjb2duaXRpb25Db250cm9sZXJ7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgbGV0IFNwZWVjaFJlY29nbml0aW9uID0gU3BlZWNoUmVjb2duaXRpb24gfHwgd2Via2l0U3BlZWNoUmVjb2duaXRpb25cbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24gPSBuZXcgU3BlZWNoUmVjb2duaXRpb24oKTtcbiAgICAgICAgdGhpcy5fY29uZmlndXJlKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoY2FsbGJhY2spe1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9ucmVzdWx0ID0gKGV2ZW50KT0+e1xuICAgICAgICAgICAgY29uc3QgZmluYWxTdHIgPSBldmVudC5yZXN1bHRzWzBdWzBdLnRyYW5zY3JpcHQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ29uZmlkZW5jZTogJyArIGZpbmFsU3RyKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmluYWxTdHIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uc3RhcnQoKTtcbiAgICB9XG5cbiAgICBzdG9wKCl7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uc3RvcCgpO1xuICAgIH1cblxuICAgIF9jb25maWd1cmUoKXtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5jb250aW51b3VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5sYW5nID0gJ2ZyLUZSJztcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5pbnRlcmltUmVzdWx0cyA9IHRydWU7XG5cbiAgICAgICAgLy8gV2UgZGV0ZWN0IGVuZFxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZW5kID0gXz0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0VuZCBvZiByZWNvZ25pdGlvbicpO1xuICAgICAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdG9wKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFdlIGRldGVjdCBlcnJvcnNcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbmVycm9yID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT0gJ25vLXNwZWVjaCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gU3BlZWNoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT0gJ2F1ZGlvLWNhcHR1cmUnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIG1pY3JvcGhvbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdub3QtYWxsb3dlZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm90IEFsbG93ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTsgICAgIFxuICAgIH1cblxuXG59IiwiJ3VzZSBzdHJpY3QnXG4vKipcbiAqIENvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYmlub21lZC9tYm90LXdlYmJsdWV0b290aFxuICogXG4gKi9cblxuXG5jb25zdCBERVZJQ0VfTkFNRSA9IFwiTWFrZWJsb2NrX0xFXCIsXG4gICAgU0VSVklDRV9VVUlEID0gXCIwMDAwZmZlMS0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIixcbiAgICBDSEFSQUNURVJJU1RJQ19VVUlEID0gXCIwMDAwZmZlMy0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIjtcblxuLyoqXG4gKiBHZW5lcmFsIGNvbmZpZ3VyYXRpb24gKFVVSUQpXG4qL1xuY2xhc3MgQ29uZmlnIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG5hbWUoKSB7IHJldHVybiBcIk1ha2VibG9ja19MRVwiOyB9XG4gICAgc2VydmljZSgpIHsgcmV0dXJuIFwiMDAwMGZmZTEtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIgfVxuICAgIGNoYXJhdGVyaXN0aWMoKSB7IHJldHVybiBcIjAwMDBmZmUzLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiIH1cbn1cblxuLy8gQ29uc3QgZm9yIGluc3RydWN0aW9ucyB0eXBlc1xuY29uc3QgVFlQRV9NT1RPUiA9IDB4MGEsXG4gICAgVFlQRV9SR0IgPSAweDA4LFxuICAgIFRZUEVfU09VTkQgPSAweDA3O1xuXG5cbi8vIENvbnN0IGZvciB0aGUgcG9ydHNcbmNvbnN0IFBPUlRfMSA9IDB4MDEsXG4gICAgUE9SVF8yID0gMHgwMixcbiAgICBQT1JUXzMgPSAweDAzLFxuICAgIFBPUlRfNCA9IDB4MDQsXG4gICAgUE9SVF81ID0gMHgwNSxcbiAgICBQT1JUXzYgPSAweDA2LFxuICAgIFBPUlRfNyA9IDB4MDcsXG4gICAgUE9SVF84ID0gMHgwOCxcbiAgICBNXzEgPSAweDA5LFxuICAgIE1fMiA9IDB4MGE7XG4gICAgXG5cbi8qKlxuICogQ2xhc3MgZm9yIHRoZSByb2JvdFxuICogKi9cbmV4cG9ydCBjbGFzcyBNQm90IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgdGhpcy5vbkRpc2Nvbm5lY3RlZCA9IHRoaXMub25EaXNjb25uZWN0ZWQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5idXp6ZXJJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgLypcbiAgICBSZXF1ZXN0IHRoZSBkZXZpY2Ugd2l0aCBibHVldG9vdGhcbiAgICAqL1xuICAgIHJlcXVlc3QoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgXCJmaWx0ZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMuY29uZmlnLm5hbWUoKVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBcIm9wdGlvbmFsU2VydmljZXNcIjogW3RoaXMuY29uZmlnLnNlcnZpY2UoKV1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZShvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4oZGV2aWNlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZS5hZGRFdmVudExpc3RlbmVyKCdnYXR0c2VydmVyZGlzY29ubmVjdGVkJywgdGhpcy5vbkRpc2Nvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRldmljZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbm5lY3QgdG8gdGhlIGRldmljZVxuICAgICAqICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnRyb2wgdGhlIG1vdG9ycyBvZiByb2JvdFxuICAgICovXG4gICAgcHJvY2Vzc01vdG9yKHZhbHVlTTEsIHZhbHVlTTIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9NT1RPUiwgTV8xLCAwLCB2YWx1ZU0xKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX01PVE9SLCBNXzIsIDAsIHZhbHVlTTIpKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHJvY2Vzc0J1enplcigpIHtcbiAgICAgICAgdGhpcy5idXp6ZXJJbmRleCA9ICh0aGlzLmJ1enplckluZGV4ICsgMSkgJSA4O1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX1NPVU5ELCBQT1JUXzIsIDIyLCB0aGlzLmJ1enplckluZGV4KSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcHJvY2Vzc0NvbG9yKHJlZCxibHVlLGdyZWVuKXtcbiAgICAgICAgbGV0IHJIZXggPSByZWQ8PDg7XG5cdFx0bGV0IGdIZXggPSBncmVlbjw8MTY7XG5cdFx0bGV0IGJIZXggPSBibHVlPDwyNDtcblx0XHRsZXQgdmFsdWUgPSBySGV4IHwgZ0hleCB8IGJIZXg7XG5cdFx0dGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX1JHQixQT1JUXzYsMCx2YWx1ZSkpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZXZpY2UgaXMgZGlzY29ubmVjdGVkLicpO1xuICAgIH1cblxuXG4gICAgX2dlbmVyaWNDb250cm9sKHR5cGUsIHBvcnQsIHNsb3QsIHZhbHVlKSB7XG4gICAgICAgIC8qXG4gICAgICAgIGZmIDU1IGxlbiBpZHggYWN0aW9uIGRldmljZSBwb3J0ICBzbG90ICBkYXRhIGFcbiAgICAgICAgMCAgMSAgMiAgIDMgICA0ICAgICAgNSAgICAgIDYgICAgIDcgICAgIDhcbiAgICAgICAgKi9cbiAgICAgICAgLy8gU3RhdGljIHZhbHVlc1xuICAgICAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDE2KTtcbiAgICAgICAgdmFyIGJ1ZlZpZXcgPSBuZXcgVWludDE2QXJyYXkoYnVmKTtcblxuICAgICAgICB2YXIgYnl0ZTAgPSAweGZmLCAvLyBTdGF0aWMgaGVhZGVyXG4gICAgICAgICAgICBieXRlMSA9IDB4NTUsIC8vIFN0YXRpYyBoZWFkZXJcbiAgICAgICAgICAgIGJ5dGUyID0gMHgwOSwgLy8gbGVuXG4gICAgICAgICAgICBieXRlMyA9IDB4MDAsIC8vIGlkeFxuICAgICAgICAgICAgYnl0ZTQgPSAweDAyLCAvLyBhY3Rpb25cbiAgICAgICAgICAgIGJ5dGU1ID0gdHlwZSwgLy8gZGV2aWNlXG4gICAgICAgICAgICBieXRlNiA9IHBvcnQsIC8vIHBvcnRcbiAgICAgICAgICAgIGJ5dGU3ID0gc2xvdDsgLy8gc2xvdFxuICAgICAgICAvL2R5bmFtaWNzIHZhbHVlc1xuICAgICAgICB2YXIgYnl0ZTggPSAweDAwLCAvLyBkYXRhXG4gICAgICAgICAgICBieXRlOSA9IDB4MDAsIC8vIGRhdGFcbiAgICAgICAgICAgIGJ5dGUxMCA9IDB4MDAsIC8vIGRhdGFcbiAgICAgICAgICAgIGJ5dGUxMSA9IDB4MDA7IC8vIGRhdGFcbiAgICAgICAgLy9FbmQgb2YgbWVzc2FnZVxuICAgICAgICB2YXIgYnl0ZTEyID0gMHgwYSxcbiAgICAgICAgICAgIGJ5dGUxMyA9IDB4MDAsXG4gICAgICAgICAgICBieXRlMTQgPSAweDAwLFxuICAgICAgICAgICAgYnl0ZTE1ID0gMHgwMDtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVFlQRV9NT1RPUjpcbiAgICAgICAgICAgICAgICAvLyBNb3RvciBNMVxuICAgICAgICAgICAgICAgIC8vIGZmOjU1ICAwOTowMCAgMDI6MGEgIDA5OjY0ICAwMDowMCAgMDA6MDAgIDBhXCJcbiAgICAgICAgICAgICAgICAvLyAweDU1ZmY7MHgwMDA5OzB4MGEwMjsweDA5NjQ7MHgwMDAwOzB4MDAwMDsweDAwMGE7MHgwMDAwO1xuICAgICAgICAgICAgICAgIC8vIE1vdG9yIE0yXG4gICAgICAgICAgICAgICAgLy8gZmY6NTU6MDk6MDA6MDI6MGE6MGE6NjQ6MDA6MDA6MDA6MDA6MGEgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBWYWx1ZSA9IHZhbHVlIDwgMCA/IChwYXJzZUludChcImZmZmZcIiwgMTYpICsgTWF0aC5tYXgoLTI1NSwgdmFsdWUpKSA6IE1hdGgubWluKDI1NSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJ5dGU3ID0gdGVtcFZhbHVlICYgMHgwMGZmO1xuICAgICAgICAgICAgICAgIGJ5dGU4ID0gMHgwMDtcbiAgICAgICAgICAgICAgICBieXRlOCA9IHRlbXBWYWx1ZSA+PiA4O1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRZUEVfUkdCOlxuICAgICAgICAgICAgICAgIC8vIGZmOjU1ICAwOTowMCAgMDI6MDggIDA2OjAwICA1Yzo5OSAgNmQ6MDAgIDBhXG4gICAgICAgICAgICAgICAgLy8gMHg1NWZmOzB4MDAwOTsweDA4MDI7MHgwMDA2OzB4OTk1YzsweDAwNmQ7MHgwMDBhOzB4MDAwMDtcbiAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDA7XG4gICAgICAgICAgICAgICAgYnl0ZTggPSB2YWx1ZSA+PiA4ICYgMHhmZjtcbiAgICAgICAgICAgICAgICBieXRlOSA9IHZhbHVlID4+IDE2ICYgMHhmZjtcbiAgICAgICAgICAgICAgICBieXRlMTAgPSB2YWx1ZSA+PiAyNCAmIDB4ZmY7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRZUEVfU09VTkQ6XG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjowMDowMDowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MDY6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOmVlOjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo4ODowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6Yjg6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjVkOjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo0YTowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MjY6MDE6MGFcbiAgICAgICAgICAgICAgICBieXRlMiA9IDB4MDU7XG4gICAgICAgICAgICAgICAgYnl0ZTUgPSAweDIyO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4MDA7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgwNjtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweGVlO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4ODg7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHhiODtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDVkO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gNikge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4NGE7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4MjY7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZTggPSAweDBhO1xuICAgICAgICAgICAgICAgIGJ5dGUxMiA9IDB4MDA7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGJ1ZlZpZXdbMF0gPSBieXRlMSA8PCA4IHwgYnl0ZTA7XG4gICAgICAgIGJ1ZlZpZXdbMV0gPSBieXRlMyA8PCA4IHwgYnl0ZTI7XG4gICAgICAgIGJ1ZlZpZXdbMl0gPSBieXRlNSA8PCA4IHwgYnl0ZTQ7XG4gICAgICAgIGJ1ZlZpZXdbM10gPSBieXRlNyA8PCA4IHwgYnl0ZTY7XG4gICAgICAgIGJ1ZlZpZXdbNF0gPSBieXRlOSA8PCA4IHwgYnl0ZTg7XG4gICAgICAgIGJ1ZlZpZXdbNV0gPSBieXRlMTEgPDwgOCB8IGJ5dGUxMDtcbiAgICAgICAgYnVmVmlld1s2XSA9IGJ5dGUxMyA8PCA4IHwgYnl0ZTEyO1xuICAgICAgICBidWZWaWV3WzddID0gYnl0ZTE1IDw8IDggfCBieXRlMTQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYnl0ZTAudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTIudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTMudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTQudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTUudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTYudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTcudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTgudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTkudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEwLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxMS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTIudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEzLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxNC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTUudG9TdHJpbmcoMTYpICsgXCI6XCJcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBidWZWaWV3WzBdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbMV0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1syXS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzNdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbNF0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s1XS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzZdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbN10udG9TdHJpbmcoMTYpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgX3dyaXRlQ2hhcmFjdGVyaXN0aWModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuc2VydmljZSgpKVxuICAgICAgICAgICAgLnRoZW4oc2VydmljZSA9PiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmNoYXJhdGVyaXN0aWMoKSkpXG4gICAgICAgICAgICAudGhlbihjaGFyYWN0ZXJpc3RpYyA9PiBjaGFyYWN0ZXJpc3RpYy53cml0ZVZhbHVlKHZhbHVlKSk7XG4gICAgfVxuXG5cbn1cblxuXG4iLCIndXNlIHN0cmljdCdcblxuY2xhc3MgTXlvQ29uZmlne1xuICAgIGNvbnN0cnVjdG9yKCl7ICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgY29udHJvbFNlcnZpY2UoKSB7IHJldHVybiBcImQ1MDYwMDAxLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cbiAgICBnZXN0dXJlU2VydmljZSgpIHsgcmV0dXJuIFwiZDUwNjAwMDMtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIGNvbW1hbmRDaGFyYWN0ZXJpc3RpYygpIHsgcmV0dXJuIFwiZDUwNjA0MDEtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIGdlc3R1cmVDaGFyYWN0ZXJpc3RpYygpIHsgcmV0dXJuIFwiZDUwNjAxMDMtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIFxuXG59XG5cbmV4cG9ydCBjbGFzcyBNeW9Db250cm9sbGVye1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuZGV2aWNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQgPSB0aGlzLm9uRGlzY29ubmVjdGVkLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kID0gbmV3IFVpbnQ4QXJyYXkoNSk7XG4gICAgICAgIGVuYWJsZUdlc3R1cmVzQ29tbWFuZFswXSA9IDB4MDE7IC8vIHNldCBtb2RlXG4gICAgICAgIGVuYWJsZUdlc3R1cmVzQ29tbWFuZFsxXSA9IDB4MDM7IC8vIGJ5dGVzIGluIHBheWxvYWRcbiAgICAgICAgZW5hYmxlR2VzdHVyZXNDb21tYW5kWzJdID0gMHgwMDsgLy8gZW1nIG1vZGU6IG5vbmVcbiAgICAgICAgZW5hYmxlR2VzdHVyZXNDb21tYW5kWzNdID0gMHgwMDsgLy8gaW11IG1vZGU6IGRpc2FibGVkXG4gICAgICAgIGVuYWJsZUdlc3R1cmVzQ29tbWFuZFs0XSA9IDB4MDE7IC8vIGNsYXNzaWZpZXIgbW9kZTogZW5hYmxlZFxuXG4gICAgICAgIHRoaXMuZGlzYWJsZUdlc3R1cmVzQ29tbWFuZCA9IFVpbnQ4QXJyYXkuZnJvbShlbmFibGVHZXN0dXJlc0NvbW1hbmQpO1xuICAgICAgICBkaXNhYmxlR2VzdHVyZXNDb21tYW5kWzRdID0gMHgwMDsgLy8gY2xhc3NpZmllciBtb2RlOiBkaXNhYmxlZFxuXG4gICAgICAgIHRoaXMuZGVlcFNsZWVwQ29tbWFuZCA9IG5ldyBVaW50OEFycmF5KDIpO1xuICAgICAgICBkZWVwU2xlZXBDb21tYW5kWzBdID0gMHgwNDsgLy8gc2V0IG1vZGVcbiAgICAgICAgZGVlcFNsZWVwQ29tbWFuZFsxXSA9IDB4MDA7IC8vIGJ5dGVzIGluIHBheWxvYWRcblxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qXG4gICAgUmVxdWVzdCB0aGUgZGV2aWNlIHdpdGggYmx1ZXRvb3RoXG4gICAgKi9cbiAgICByZXF1ZXN0KCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiZmlsdGVyc1wiOiBbe1xuICAgICAgICAgICAgICAgIFwic2VydmljZXNcIjogW3RoaXMuY29uZmlnLmNvbnRyb2xTZXJ2aWNlKCldXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFwib3B0aW9uYWxTZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcuZ2VzdHVyZVNlcnZpY2UoKV1cbiAgICAgICAgfTsgICAgICAgIFxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihkZXZpY2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCB0aGlzLm9uRGlzY29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGV2aWNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29ubmVjdCB0byB0aGUgZGV2aWNlXG4gICAgICogKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGluaXQoKXtcbiAgICAgICAgaWYoIXRoaXMuZGV2aWNlKXtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSh0aGlzLmNvbmZpZy5jb250cm9sU2VydmljZSgpKVxuICAgICAgICAgICAgLnRoZW4oKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IGdldCBNeW8gQ29udHJvbCBTZXJ2aWNlJyk7XG4gICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmNvbW1hbmRDaGFyYWN0ZXJpc3RpYygpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChjaGFyYWN0ZXJpc3RpYyk9PntcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IGdldCBNeW8gQ29tbWFuZCBjaGFyYWN0ZXJpc3RpYycpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUodGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVhZHkgdG8gbGlzdGVuIGdlc3R1cmVzJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJHZXN0dXJlcyhjYWxsYmFjayl7XG4gICAgICAgIGlmKCF0aGlzLmRldmljZSl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuZ2VzdHVyZVNlcnZpY2UoKSlcbiAgICAgICAgICAgIC50aGVuKHNlcnZpY2U9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBHZXQgR2VzdHVyZSBTZXJ2aWNlJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuZ2VzdHVyZUNoYXJhY3RlcmlzdGljKCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKGNoYXJhY3RlcmlzdGljKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dldCBnZXN0dXJlIGNhcmFjdGVyaXN0aWMnKVxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljLnN0YXJ0Tm90aWZpY2F0aW9ucygpO1xuICAgICAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYXJhY3RlcmlzdGljdmFsdWVjaGFuZ2VkJywgKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdlc3R1cmUgPSB0aGlzLl9wYXJzZU15b0dlc3R1cmUoZXYudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlc3R1cmUgOiAnLCBnZXN0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGdlc3R1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZSBpcyBkaXNjb25uZWN0ZWQuJyk7XG4gICAgfVxuXG4gICAgX3BhcnNlTXlvR2VzdHVyZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUuZ2V0VWludDgoMCkgPT09IDB4MDMpIHtcbiAgICAgICAgICAgIGNvbnN0IGdlc3R1cmVWYWx1ZSA9IHZhbHVlLmdldFVpbnQxNigxLCB0cnVlKVxuICAgICAgICAgICAgY29uc3QgZ2VzdHVyZSA9IHtcbiAgICAgICAgICAgICAgICAweDAwMDA6ICdyZXN0JyxcbiAgICAgICAgICAgICAgICAweDAwMDE6ICdmaXN0JyxcbiAgICAgICAgICAgICAgICAweDAwMDI6ICd3YXZlLWluJyxcbiAgICAgICAgICAgICAgICAweDAwMDM6ICd3YXZlLW91dCcsXG4gICAgICAgICAgICAgICAgMHgwMDA0OiAnZmluZ2Vycy1zcHJlYWQnLFxuICAgICAgICAgICAgICAgIDB4MDAwNTogJ2RvdWJsZS10YXAnLFxuICAgICAgICAgICAgICAgIDB4ZmZmZjogJ3Vua25vd24nLFxuICAgICAgICAgICAgfVtnZXN0dXJlVmFsdWVdXG4gICAgICAgICAgICByZXR1cm4geyBnZXN0dXJlIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXN0dXJlOiBudWxsIH1cbiAgICB9XG59Il19
