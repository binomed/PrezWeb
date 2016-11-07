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

	//  Bluetooth: Scan + Connect 
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'connect-ble',
		// We start with the first fragment (the initial position is fixed by css)
		positionArray: [{
			row: 1,
			width: '90%'
		}, {
			row: 6,
			width: '90%'
		}]
	});

	//  Ble Code Read Characteristic
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'read-charact',
		// We start with the first fragment (the initial position is fixed by css)
		positionArray: [{
			row: 3,
			width: '90%'
		}, {
			row: 5,
			width: '90%'
		}]
	});

	//  Ble Code Write Characteristic
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'write-charact',
		// We start with the first fragment (the initial position is fixed by css)
		positionArray: [{
			row: 3,
			width: '90%'
		}, {
			row: 8,
			width: '90%'
		}]
	});

	//  Ble Code Read Characteristic
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'notif-charact',
		// We start with the first fragment (the initial position is fixed by css)
		positionArray: [{
			row: 3,
			width: '90%'
		}, {
			row: 5,
			width: '90%',
			height: '186px'
		}]
	});

	// Code User Media 1
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'user-media-v2',
		positionArray: [{
			row: 5,
			width: '700px'
		}, {
			row: 6,
			left: '150px',
			width: '100px'
		}, {
			row: 7,
			left: '100px',
			width: '700px'
		}] });

	// Code Web Speech
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'web-speech',
		positionArray: [{
			row: 1,
			width: '400px'
		}, {
			row: 2,
			width: '500px'
		}, {
			row: 3,
			width: '550px'
		}, {
			row: 5,
			width: '300px'
		}, {
			row: 6,
			width: '300px'
		}, {
			row: 7,
			left: '280px',
			width: '450px'
		}] });

	// Code Web Speech Grammar
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'web-speech-grammar',
		positionArray: [{
			row: 2,
			width: '750px'
		}, {
			row: 3,
			width: '700px'
		}, {
			row: 4,
			width: '650px'
		}] });

	// Code Web Speech Synthesis
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'web-speech-synthesis',
		positionArray: [{
			row: 2,
			width: '850px'
		}, {
			row: 3,
			width: '400px'
		}, {
			row: 4,
			width: '450px'
		}, {
			row: 5,
			width: '400px'
		}, {
			row: 6,
			width: '350px'
		}] });

	// Code write nfc
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'write-nfc',
		positionArray: [{
			row: 1,
			col: 1,
			width: '1050px'
		}] });

	// Code read nfc
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'read-nfc',
		positionArray: [{
			row: 0,
			left: '330px',
			width: '150px'
		}, {
			row: 1,
			left: '90px',
			width: '550px'
		}, {
			row: 2,
			left: '550px',
			calcHeight: 3,
			width: '300px'
		}] });
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
			this._blePrezControler = new _blePrezControler.BlePrezControler();
			this._bleEvents();

			// Init Voice and Speech controlers
			this.voiceRecognition = new _voiceRecognitionControler.VoiceRecognitionControler();
			this.speechSynthesis = new _speechSynthesisControler.SpeechSynthesisControler();
			this._voiceEvents();
		}

		// In al case we init the highlight of code.
		this._initHighlightCode();
	}

	_createClass(RevealEngineEvents, [{
		key: '_bleEvents',
		value: function _bleEvents() {
			var _this = this;

			Reveal.addEventListener('stop-code-read-charact', function (event) {
				if (_this._blePrezControler._currentBleDevice) {
					_this._blePrezControler._currentBleDevice.gatt.disconnect();
				}
			});
		}
	}, {
		key: '_voiceEvents',
		value: function _voiceEvents() {
			var _this2 = this;

			Reveal.addEventListener('recognition', function () {
				setTimeout(function (_) {
					return _this2._voiceCallBack();
				}, 1000);
			});
			Reveal.addEventListener('end-recognition', function (_) {
				try {
					_this2.voiceRecognition.stop();
				} catch (e) {}
			});
		}
	}, {
		key: '_voiceCallBack',
		value: function _voiceCallBack() {
			var _this3 = this;

			document.getElementById('demoSpeech').style.display = '';
			this.voiceRecognition.start(function (finalStr) {
				document.getElementById('speech_input').innerHTML = finalStr;
				if (finalStr.indexOf('hello') != -1) {
					document.getElementById('demoSpeech').style.display = 'none';
					_this3.speechSynthesis.speak('bla bla bla').then(function (_) {
						return _this3._voiceCallBack.bind(_this3);
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

		this._currentBleDevice = null;
		this._basicBleBinding();
		this._myoBinding();
		// Just comment mbot part because it can always be usefull !
		//this._mbotBinding();
	}

	_createClass(BlePrezControler, [{
		key: '_basicBleBinding',
		value: function _basicBleBinding() {
			var _this = this;

			document.getElementById('connectBle').addEventListener('click', function (event) {

				var filters = { filters: [{ services: ['battery_service'] }] };
				navigator.bluetooth.requestDevice(filters).then(function (device) {
					return device.gatt.connect();
				}).then(function (server) {
					console.log('Bluetooth device is connected.');
					_this._currentBleDevice = server.device;
				});
			});
			document.getElementById('readCharact').addEventListener('click', function (event) {

				_this._currentBleDevice.gatt.getPrimaryService('battery_service').then(function (service) {
					return service.getCharacteristic('battery_level');
				}).then(function (characteristic) {
					return characteristic.readValue();
				}).then(function (value) {
					var batteryLevel = value.getUint8(0);
					console.log('Battery percentage is ' + batteryLevel + '%.');
				});
			});
		}
	}, {
		key: '_myoBinding',
		value: function _myoBinding() {
			var lastDoubleTap = 0;
			var myo = new _myoControler.MyoControler();
			document.getElementById('connectMyo').addEventListener('click', function () {

				if (!myo.connected) {
					myo.request().then(function (_) {
						return myo.connect();
					}).then(function () {
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

			Reveal.addEventListener('disconnect-myo', function (_) {
				myo.disconnect();
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
            var _this = this;

            return new Promise(function (resolve, reject) {

                if (!_this.voiceFR) {
                    reject();
                }
                var utterThis = new SpeechSynthesisUtterance(value);
                utterThis.voice = _this.voiceFR;
                utterThis.pitch = 1;
                utterThis.rate = 1;
                utterThis.onend = function () {
                    resolve();
                };
                _this.synth.speak(utterThis);
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

            this.recognition.lang = 'fr-FR';

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

var MyoControler = exports.MyoControler = function () {
    function MyoControler() {
        _classCallCheck(this, MyoControler);

        this.device = null;
        this.config = new MyoConfig();
        this.onDisconnected = this.onDisconnected.bind(this);
        this.enableGesturesCommand = new Uint8Array(5);
        this.enableGesturesCommand[0] = 0x01; // set mode
        this.enableGesturesCommand[1] = 0x03; // bytes in payload
        this.enableGesturesCommand[2] = 0x00; // emg mode: none
        this.enableGesturesCommand[3] = 0x00; // imu mode: disabled
        this.enableGesturesCommand[4] = 0x01; // classifier mode: enabled

        this.disableGesturesCommand = Uint8Array.from(this.enableGesturesCommand);
        this.disableGesturesCommand[4] = 0x00; // classifier mode: disabled

        this.deepSleepCommand = new Uint8Array(2);
        this.deepSleepCommand[0] = 0x04; // set mode
        this.deepSleepCommand[1] = 0x00; // bytes in payload

        this.connected = false;
        this.eltPopup = null;
        this;
    }

    /*
    Request the device with bluetooth
    */


    _createClass(MyoControler, [{
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
                if (!this.eltPopup) {
                    this._managePopupElt({ state: 'add' });
                }
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
                this._managePopupElt({ state: 'remove' });
                return this.device.gatt.disconnect();
            }
        }
    }, {
        key: "onDisconnected",
        value: function onDisconnected() {
            this._managePopupElt({ state: 'remove' });
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
                this._managePopupElt({ gesture: gesture });
                return { gesture: gesture };
            }
            return { gesture: null };
        }
    }, {
        key: "_managePopupElt",
        value: function _managePopupElt(_ref) {
            var _ref$state = _ref.state;
            var state = _ref$state === undefined ? 'none' : _ref$state;
            var _ref$gesture = _ref.gesture;
            var gesture = _ref$gesture === undefined ? 'none' : _ref$gesture;

            if (state === 'remove' && this.eltPopup) {
                this.eltPopup.remove();
                this.eltPopup = null;
            } else if (state === 'add') {
                if (this.eltPopup) {
                    this.eltPopup.remove();
                }
                this.eltPopup = document.createElement('div');
                this.eltPopup.classList.add('myo-popup');
                document.body.appendChild(this.eltPopup);
            } else if (this.eltPopup && gesture && gesture != 'none') {
                this.eltPopup.className = "myo-popup " + gesture;
            }
        }
    }]);

    return MyoControler;
}();

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyIsInNjcmlwdHMvcHJlei5qcyIsInNjcmlwdHMvcHJlei9oaWdobGlnaHRFdmVudHMuanMiLCJzY3JpcHRzL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzIiwic2NyaXB0cy9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMiLCJzY3JpcHRzL3NlbnNvcnMvc3BlZWNoU3ludGhlc2lzQ29udHJvbGVyLmpzIiwic2NyaXB0cy9zZW5zb3JzL3ZvaWNlUmVjb2duaXRpb25Db250cm9sZXIuanMiLCJzY3JpcHRzL3dlYmJsdWV0b290aC9tYm90Q29udHJvbGVyLmpzIiwic2NyaXB0cy93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNLGNBQWMsSUFBcEI7QUFDQSxJQUFNLHFCQUFxQixHQUEzQjtBQUNBLElBQU0sWUFBWSxFQUFsQjs7SUFFYSxtQixXQUFBLG1CO0FBQ1osb0NBQW9DO0FBQUEsTUFBdkIsTUFBdUIsUUFBdkIsTUFBdUI7QUFBQSxNQUFmLGFBQWUsUUFBZixhQUFlOztBQUFBOztBQUNuQyxPQUFLLFdBQUwsR0FBbUIsU0FBUyxjQUFULGdCQUFxQyxNQUFyQyxDQUFuQjtBQUNBLE9BQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQSxTQUFPLGdCQUFQLFdBQWdDLE1BQWhDLEVBQTBDLEtBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBMUM7QUFDQSxTQUFPLGdCQUFQLGdCQUFxQyxNQUFyQyxFQUErQyxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQStCLElBQS9CLENBQS9DO0FBQ0E7Ozs7b0NBRWlCLEssRUFBTTtBQUN2QixPQUFHO0FBQ0YsUUFBSSxNQUFNLElBQU4sS0FBZSxlQUFuQixFQUFt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QUFDcEQscUJBQUssUUFBTCxDQUFjLFNBQWQsa0JBQXVDLE9BQXZDO0FBQ0g7QUFDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcblxuY29uc3QgTElORV9IRUlHSFQgPSAxLjE1O1xuY29uc3QgQURESVRJT05OQUxfSEVJR0hUID0gMC40O1xuY29uc3QgQ09MX1dJRFRIID0gMzU7XG5cbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRDb2RlSGVscGVye1xuXHRjb25zdHJ1Y3Rvcih7a2V5RWx0LCBwb3NpdGlvbkFycmF5fSl7XG5cdFx0dGhpcy5lbHRIaWdsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBoaWdobGlnaHQtJHtrZXlFbHR9YCk7XG5cdFx0dGhpcy5wb3NpdGlvbkFycmF5ID0gcG9zaXRpb25BcnJheTtcblxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKGBjb2RlLSR7a2V5RWx0fWAsIHRoaXMuX2xpc3RlbkZyYWdtZW50cy5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcihgc3RvcC1jb2RlLSR7a2V5RWx0fWAsIHRoaXMuX3VucmVnaXN0ZXJGcmFnbWVudHMuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRfcHJvZ3Jlc3NGcmFnbWVudChldmVudCl7XG5cdFx0dHJ5e1x0XHRcdFxuXHRcdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdmcmFnbWVudHNob3duJyl7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gK2V2ZW50LmZyYWdtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudC1pbmRleCcpO1xuXHRcdFx0XHRjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4XTtcblx0XHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRcdFx0aWYgKGtleSA9PT0gJ3Jvdycpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsndG9wJ10gPSBgY2FsYyg5MHB4ICsgKCR7cHJvcGVydGllc1trZXldfSAqICR7TElORV9IRUlHSFR9ZW0pKWA7XG5cdFx0XHRcdFx0fWVsc2UgaWYgKGtleSA9PT0gJ2NvbCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnbGVmdCddID0gYGNhbGMoNjBweCArICgke3Byb3BlcnRpZXNba2V5XX0gKiAke0NPTF9XSURUSH1weCkpYDtcblx0XHRcdFx0XHR9ZWxzZSBpZiAoa2V5ID09PSAnY2FsY0hlaWdodCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSBgY2FsYygke3Byb3BlcnRpZXNba2V5XX1lbSArICR7QURESVRJT05OQUxfSEVJR0hUfWVtKWA7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XHRcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSArZXZlbnQuZnJhZ21lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWZyYWdtZW50LWluZGV4Jyk7XG5cdFx0XHRcdC8vIE9uIHJlc2V0IGxlcyBwcm9wZXJ0aWVzXG5cdFx0XHRcdGxldCBwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4XTtcblx0XHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0XHRcdGlmIChrZXkgPT09ICdyb3cnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ3RvcCddID0gJyc7XG5cdFx0XHRcdFx0fWVsc2UgaWYoa2V5ID09PSAnY2FsY0hlaWdodCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSAnJztcblx0XHRcdFx0XHR9ZWxzZSBpZiAoa2V5ID09PSAnY29sJyl7XG5cdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlWydsZWZ0J10gPSAnJztcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVba2V5XSA9ICcnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaW5kZXggPiAwKXtcdFx0XHRcblx0XHRcdFx0XHRwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4IC0gMV07XG5cdFx0XHRcdFx0a2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0XHRcdFx0aWYgKGtleSA9PT0gJ3Jvdycpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlWyd0b3AnXSA9IGBjYWxjKDkwcHggKyAoJHtwcm9wZXJ0aWVzW2tleV19ICogJHtMSU5FX0hFSUdIVH1lbSkpYDtcblx0XHRcdFx0XHRcdH1lbHNlIGlmIChrZXkgPT09ICdjb2wnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ2xlZnQnXSA9IGBjYWxjKDYwcHggKyAoJHtwcm9wZXJ0aWVzW2tleV19ICogJHtDT0xfV0lEVEh9cHgpKWA7XG5cdFx0XHRcdFx0fWVsc2UgaWYgKGtleSA9PT0gJ2NhbGNIZWlnaHQnKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSBgY2FsYygke3Byb3BlcnRpZXNba2V5XX1lbSArICR7QURESVRJT05OQUxfSEVJR0hUfWVtKWA7XG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVtrZXldID0gcHJvcGVydGllc1trZXldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVx0XHRcdFxuXHRcdFx0fVxuXHRcdH1jYXRjaChlKXt9XG5cdH1cblxuXHRfbGlzdGVuRnJhZ21lbnRzKCl7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZyYWdtZW50c2hvd24nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdmcmFnbWVudGhpZGRlbicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRfdW5yZWdpc3RlckZyYWdtZW50cygpe1xuXHRcdFJldmVhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRoaWRkZW4nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHR9XG5cblx0XG59XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7UmV2ZWFsRW5naW5lRXZlbnRzfSBmcm9tICcuL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzJztcblxuXG4oZnVuY3Rpb24gKCkge1xuXG5cbiAgICBmdW5jdGlvbiBwYWdlTG9hZCgpIHtcbiAgICAgICAgbmV3IFJldmVhbEVuZ2luZUV2ZW50cygpO1xuICAgIH1cblxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBwYWdlTG9hZCk7XG59KSgpOyIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQge0hpZ2hsaWdodENvZGVIZWxwZXJ9IGZyb20gJy4uL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyc7XG5cbmNvbnN0IExJTkVfSEVJR0hUID0gMS4xNTtcbmNvbnN0IEFERElUSU9OTkFMX0hFSUdUID0gMC40O1xuY29uc3QgQ09MX1dJRFRIID0gMzU7XG5cbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRFdmVudHN7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0Ly8gIEJsdWV0b290aDogU2NhbiArIENvbm5lY3QgXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0IDogJ2Nvbm5lY3QtYmxlJyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW3tcblx0XHRcdFx0cm93IDogMSxcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRyb3cgOiA2LFxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXG5cdFx0XHR9XVxuXHRcdH0pO1xuXG5cdFx0Ly8gIEJsZSBDb2RlIFJlYWQgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAncmVhZC1jaGFyYWN0Jyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW3tcblx0XHRcdFx0cm93IDogMyxcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRyb3cgOiA1LFxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXG5cdFx0XHR9XVxuXHRcdH0pXG5cblx0XHQvLyAgQmxlIENvZGUgV3JpdGUgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAnd3JpdGUtY2hhcmFjdCcsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0cm93IDogOCxcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xuXHRcdFx0fV1cblx0XHR9KVxuXG5cdFx0Ly8gIEJsZSBDb2RlIFJlYWQgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAnbm90aWYtY2hhcmFjdCcsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0cm93IDogNSxcblx0XHRcdFx0d2lkdGggOiAnOTAlJyxcblx0XHRcdFx0aGVpZ2h0OiAnMTg2cHgnXG5cdFx0XHR9XVxuXHRcdH0pXG5cblxuXG5cdC8vIENvZGUgVXNlciBNZWRpYSAxXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd1c2VyLW1lZGlhLXYyJyxcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFtcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNSxcblx0XHRcdFx0d2lkdGggOiAnNzAwcHgnLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNixcblx0XHRcdFx0bGVmdCA6ICcxNTBweCcsXG5cdFx0XHRcdHdpZHRoIDogJzEwMHB4Jyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDcsXG5cdFx0XHRcdGxlZnQgOiAnMTAwcHgnLFxuXHRcdFx0XHR3aWR0aCA6ICc3MDBweCcsXG5cdFx0XHR9XG5cdFx0XHRdfSk7XG5cblxuXHRcblx0Ly8gQ29kZSBXZWIgU3BlZWNoXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd3ZWItc3BlZWNoJywgXG5cdFx0XHRwb3NpdGlvbkFycmF5Oltcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMSxcblx0XHRcdFx0d2lkdGggOiAnNDAwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAyLFxuXHRcdFx0XHR3aWR0aCA6ICc1MDBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzU1MHB4J1x0XHRcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNSxcblx0XHRcdFx0d2lkdGggOiAnMzAwcHgnXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiA2LFxuXHRcdFx0XHR3aWR0aCA6ICczMDBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDcsXHRcdFx0XHRcblx0XHRcdFx0bGVmdCA6ICcyODBweCcsXG5cdFx0XHRcdHdpZHRoIDogJzQ1MHB4J1xuXHRcdFx0fVxuXHRcdFx0XX0pO1xuXG5cdC8vIENvZGUgV2ViIFNwZWVjaCBHcmFtbWFyXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd3ZWItc3BlZWNoLWdyYW1tYXInLCBcblx0XHRcdHBvc2l0aW9uQXJyYXkgOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDIsXG5cdFx0XHRcdHdpZHRoIDogJzc1MHB4J1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMyxcblx0XHRcdFx0d2lkdGggOiAnNzAwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiA0LFxuXHRcdFx0XHR3aWR0aCA6ICc2NTBweCdcblx0XHRcdH1cblx0XHRcdF19KTtcblxuXHQvLyBDb2RlIFdlYiBTcGVlY2ggU3ludGhlc2lzXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd3ZWItc3BlZWNoLXN5bnRoZXNpcycsIFxuXHRcdFx0cG9zaXRpb25BcnJheTogW1xuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAyLFxuXHRcdFx0XHR3aWR0aCA6ICc4NTBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzQwMHB4J1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNCxcblx0XHRcdFx0d2lkdGggOiAnNDUwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiA1LFxuXHRcdFx0XHR3aWR0aCA6ICc0MDBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDYsXG5cdFx0XHRcdHdpZHRoIDogJzM1MHB4J1xuXHRcdFx0fVxuXHRcdFx0XX0pO1xuXG5cblx0Ly8gQ29kZSB3cml0ZSBuZmNcblx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0IDogJ3dyaXRlLW5mYycsIFxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFtcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMSxcblx0XHRcdFx0Y29sIDogMSxcblx0XHRcdFx0d2lkdGggOiAnMTA1MHB4J1xuXHRcdFx0fVxuXHRcdFx0XX0pO1xuXHRcblx0Ly8gQ29kZSByZWFkIG5mY1xuXHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAncmVhZC1uZmMnLCBcblx0XHRcdHBvc2l0aW9uQXJyYXkgOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDAsXG5cdFx0XHRcdGxlZnQ6ICczMzBweCcsXG5cdFx0XHRcdHdpZHRoIDogJzE1MHB4J1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMSxcblx0XHRcdFx0bGVmdDogJzkwcHgnLFxuXHRcdFx0XHR3aWR0aCA6ICc1NTBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDIsXG5cdFx0XHRcdGxlZnQ6ICc1NTBweCcsXG5cdFx0XHRcdGNhbGNIZWlnaHQ6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzMwMHB4J1xuXHRcdFx0fVxuXHRcdFx0XX0pO1xuXG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHtIaWdobGlnaHRFdmVudHN9IGZyb20gJy4vaGlnaGxpZ2h0RXZlbnRzLmpzJztcbmltcG9ydCB7QmxlUHJlekNvbnRyb2xlcn0gZnJvbSAnLi4vc2Vuc29ycy9ibGVQcmV6Q29udHJvbGVyLmpzJztcbmltcG9ydCB7Vm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlcn0gZnJvbSAnLi4vc2Vuc29ycy92b2ljZVJlY29nbml0aW9uQ29udHJvbGVyLmpzJztcbmltcG9ydCB7U3BlZWNoU3ludGhlc2lzQ29udHJvbGVyfSBmcm9tICcuLi9zZW5zb3JzL3NwZWVjaFN5bnRoZXNpc0NvbnRyb2xlci5qcyc7XG5cblxuZXhwb3J0IGNsYXNzIFJldmVhbEVuZ2luZUV2ZW50c3tcblx0Y29uc3RydWN0b3IoKXtcblx0XG5cdFx0bGV0IGluSUZyYW1lID0gd2luZG93LnRvcCAhPSB3aW5kb3cuc2VsZjtcblx0XHRcblx0XHQvLyBNYW5hZ2VtZW50IG9mIGFjdGlvbnMgaW4gcHJleiBtb2RlIChub3QgaW4gcHJldmlldyBtb2RlKVxuXHRcdGlmICghaW5JRnJhbWUpe1xuXHRcdFx0Ly8gSW5pdCBhbGwgYmxlIGFjdGlvbnNcblx0XHRcdHRoaXMuX2JsZVByZXpDb250cm9sZXIgPSBuZXcgQmxlUHJlekNvbnRyb2xlcigpO1xuXHRcdFx0dGhpcy5fYmxlRXZlbnRzKCk7XG5cblx0XHRcdC8vIEluaXQgVm9pY2UgYW5kIFNwZWVjaCBjb250cm9sZXJzXG5cdFx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24gPSBuZXcgVm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlcigpO1xuXHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMgPSBuZXcgU3BlZWNoU3ludGhlc2lzQ29udHJvbGVyKCk7XG5cdFx0XHR0aGlzLl92b2ljZUV2ZW50cygpO1xuXHRcdH1cblxuXHRcdC8vIEluIGFsIGNhc2Ugd2UgaW5pdCB0aGUgaGlnaGxpZ2h0IG9mIGNvZGUuXG5cdFx0dGhpcy5faW5pdEhpZ2hsaWdodENvZGUoKTtcblxuXHR9XG5cblx0X2JsZUV2ZW50cygpe1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdzdG9wLWNvZGUtcmVhZC1jaGFyYWN0JywgZXZlbnQgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX2JsZVByZXpDb250cm9sZXIuX2N1cnJlbnRCbGVEZXZpY2UpIHtcblx0XHRcdFx0dGhpcy5fYmxlUHJlekNvbnRyb2xlci5fY3VycmVudEJsZURldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0X3ZvaWNlRXZlbnRzKCl7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ3JlY29nbml0aW9uJywgKCk9Pntcblx0XHRcdHNldFRpbWVvdXQoXz0+IHRoaXMuX3ZvaWNlQ2FsbEJhY2soKSwxMDAwKTtcblx0XHR9KTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZW5kLXJlY29nbml0aW9uJywgXz0+e1xuXHRcdFx0dHJ5e1xuXHRcdFx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24uc3RvcCgpO1xuXHRcdFx0fWNhdGNoKGUpe31cblx0XHR9KVxuXHR9XG5cblx0X3ZvaWNlQ2FsbEJhY2soKXtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtb1NwZWVjaCcpLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24uc3RhcnQoKGZpbmFsU3RyKT0+e1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZWVjaF9pbnB1dCcpLmlubmVySFRNTCA9IGZpbmFsU3RyO1xuXHRcdFx0aWYgKGZpbmFsU3RyLmluZGV4T2YoJ2hlbGxvJykgIT0gLTEpe1xuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtb1NwZWVjaCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKCdibGEgYmxhIGJsYScpXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0XG5cblx0X2luaXRIaWdobGlnaHRDb2RlKCkge1xuXG5cdFx0bmV3IEhpZ2hsaWdodEV2ZW50cygpO1xuXHR9XG59XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7TXlvQ29udHJvbGVyfSBmcm9tICcuLi93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzJztcbmltcG9ydCB7TUJvdH0gZnJvbSAnLi4vd2ViYmx1ZXRvb3RoL21ib3RDb250cm9sZXIuanMnO1xuXG5leHBvcnQgY2xhc3MgQmxlUHJlekNvbnRyb2xlcntcblx0Y29uc3RydWN0b3IoKXtcblx0XG5cdFx0dGhpcy5fY3VycmVudEJsZURldmljZSA9IG51bGw7XG5cdFx0dGhpcy5fYmFzaWNCbGVCaW5kaW5nKCk7XG5cdFx0dGhpcy5fbXlvQmluZGluZygpO1xuXHRcdC8vIEp1c3QgY29tbWVudCBtYm90IHBhcnQgYmVjYXVzZSBpdCBjYW4gYWx3YXlzIGJlIHVzZWZ1bGwgIVxuXHRcdC8vdGhpcy5fbWJvdEJpbmRpbmcoKTtcblx0fVxuXG5cdF9iYXNpY0JsZUJpbmRpbmcoKSB7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RCbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcblx0XHRcdFxuXHRcdFx0Y29uc3QgZmlsdGVycyA9IHsgZmlsdGVyczogW3sgc2VydmljZXM6IFsnYmF0dGVyeV9zZXJ2aWNlJ10gfV0gfTtcblx0XHRcdG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZShmaWx0ZXJzKVxuXHRcdFx0LnRoZW4oZGV2aWNlID0+IGRldmljZS5nYXR0LmNvbm5lY3QoKSlcblx0XHRcdC50aGVuKHNlcnZlciA9PiB7IFxuXHRcdFx0XHRjb25zb2xlLmxvZygnQmx1ZXRvb3RoIGRldmljZSBpcyBjb25uZWN0ZWQuJyk7XG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRCbGVEZXZpY2UgPSBzZXJ2ZXIuZGV2aWNlO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlYWRDaGFyYWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG5cdFx0XHRcblx0XHRcdHRoaXMuX2N1cnJlbnRCbGVEZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSgnYmF0dGVyeV9zZXJ2aWNlJylcblx0XHRcdC50aGVuKHNlcnZpY2UgPT4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYygnYmF0dGVyeV9sZXZlbCcpKVxuXHRcdFx0LnRoZW4oY2hhcmFjdGVyaXN0aWMgPT4gY2hhcmFjdGVyaXN0aWMucmVhZFZhbHVlKCkpXG5cdFx0XHQudGhlbih2YWx1ZSA9PiB7XG5cdFx0XHRcdGNvbnN0IGJhdHRlcnlMZXZlbCA9IHZhbHVlLmdldFVpbnQ4KDApO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhgQmF0dGVyeSBwZXJjZW50YWdlIGlzICR7YmF0dGVyeUxldmVsfSUuYCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdF9teW9CaW5kaW5nKCl7XG5cdFx0bGV0IGxhc3REb3VibGVUYXAgPSAwO1xuXHRcdGxldCBteW8gPSBuZXcgTXlvQ29udHJvbGVyKCk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RNeW8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG5cdFx0XHRcblx0XHRcdGlmICghbXlvLmNvbm5lY3RlZCl7XG5cdFx0XHRcdG15by5yZXF1ZXN0KClcblx0XHRcdFx0LnRoZW4oXz0+bXlvLmNvbm5lY3QoKSlcblx0XHRcdFx0LnRoZW4oKCk9Pm15by5pbml0KCkpXG5cdFx0XHRcdC50aGVuKCgpPT5teW8ucmVnaXN0ZXJHZXN0dXJlcygoZ2VzdHVyZSk9Pntcblx0XHRcdFx0XHRpZiAoZ2VzdHVyZSAmJiBnZXN0dXJlLmdlc3R1cmUgPT09ICdkb3VibGUtdGFwJyl7XG5cdFx0XHRcdFx0XHRpZihEYXRlLm5vdygpIC0gbGFzdERvdWJsZVRhcCA8IDIwMDApe1xuXHRcdFx0XHRcdFx0XHRSZXZlYWwubmV4dCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bGFzdERvdWJsZVRhcCA9IERhdGUubm93KCk7XG5cdFx0XHRcdFx0fSBcblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Rpc2Nvbm5lY3QtbXlvJywgXz0+e1xuXHRcdFx0bXlvLmRpc2Nvbm5lY3QoKTtcblx0XHR9KTtcblx0fVxuXG5cdF9tYm90QmluZGluZygpe1xuXHRcdCAvLyBDaGVjayB0aGUgY29ubmVjdGlvblxuXHRcdCBsZXQgc3RlcENvbm5lY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdE1Cb3QnKTtcblx0XHQgbGV0IHN0ZXBDb250cm9sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcnQtYnV0dG9uLW1ib3QnKTsgXG5cdFx0IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ubmVjdE1Cb3RcIikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfID0+IHtcblx0XHRcdC8vIFJlcXVlc3QgdGhlIGRldmljZVxuXHRcdFx0bGV0IG1Cb3QgPSBuZXcgTUJvdCgpO1xuXHRcdFx0bUJvdC5yZXF1ZXN0KClcblx0XHRcdFx0LnRoZW4oXyA9PiB7XG5cdFx0XHRcdFx0Ly8gQ29ubmVjdCB0byB0aGUgbWJvdFxuXHRcdFx0XHRcdHJldHVybiBtQm90LmNvbm5lY3QoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXyA9PiB7XG5cdFx0XHRcdFx0Ly8gQ29ubmVjdGlvbiBpcyBkb25lLCB3ZSBzaG93IHRoZSBjb250cm9sc1xuXHRcdFx0XHRcdHN0ZXBDb25uZWN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdFx0XHRzdGVwQ29udHJvbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG5cblx0XHRcdFx0XHRsZXQgcGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJ0LWJ1dHRvbicpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIENvbnRyb2wgdGhlIHJvYm90IGJ5IGJ1dHRvbnNcblx0XHRcdFx0XHRsZXQgYnRuVXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0blVwJyk7XG5cdFx0XHRcdFx0bGV0IGJ0bkRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0bkRvd24nKTtcblx0XHRcdFx0XHRsZXQgYnRuTGVmdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuTGVmdCcpO1xuXHRcdFx0XHRcdGxldCBidG5SaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuUmlnaHQnKTtcblxuXHRcdFx0XHRcdGJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigtMjUwLCAyNTApIH0pO1xuXHRcdFx0XHRcdGJ0bkRvd24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKDI1MCwgLTI1MCkgfSk7XG5cdFx0XHRcdFx0YnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMjUwLCAyNTApIH0pO1xuXHRcdFx0XHRcdGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigtMjUwLCAtMjUwKSB9KTtcblxuXHRcdFx0XHRcdGJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XG5cdFx0XHRcdFx0YnRuRG93bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApIH0pO1xuXHRcdFx0XHRcdGJ0bkxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigwLCAwKSB9KTtcblx0XHRcdFx0XHRidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApIH0pO1xuXHRcdFx0XHRcdFxuXG5cdFx0XHRcdH0pXG5cdFx0fSk7XG5cdH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBjbGFzcyBTcGVlY2hTeW50aGVzaXNDb250cm9sZXJ7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5zeW50aCA9IHdpbmRvdy5zcGVlY2hTeW50aGVzaXM7XG5cbiAgICAgICAgdGhpcy52b2ljZUZSID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29uZmlndXJlKCk7XG4gICAgfVxuXG4gICAgX2NvbmZpZ3VyZSgpe1xuICAgICAgICB0aGlzLl9wb3B1bGF0ZVZvaWNlTGlzdCgpO1xuICAgICAgICBpZiAoc3BlZWNoU3ludGhlc2lzLm9udm9pY2VzY2hhbmdlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMub252b2ljZXNjaGFuZ2VkID0gdGhpcy5fcG9wdWxhdGVWb2ljZUxpc3QuYmluZCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9wb3B1bGF0ZVZvaWNlTGlzdCgpIHtcbiAgICAgICAgbGV0IHZvaWNlcyA9IHRoaXMuc3ludGguZ2V0Vm9pY2VzKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdm9pY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodm9pY2VzW2ldLmxhbmcgPT09ICdmci1GUicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZvaWNlRlIgPSB2b2ljZXNbaV07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3BlYWsodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+e1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMudm9pY2VGUikge1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHV0dGVyVGhpcyA9IG5ldyBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UodmFsdWUpO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnZvaWNlID0gdGhpcy52b2ljZUZSO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnBpdGNoID0gMTtcbiAgICAgICAgICAgIHV0dGVyVGhpcy5yYXRlID0gMTtcbiAgICAgICAgICAgIHV0dGVyVGhpcy5vbmVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ludGguc3BlYWsodXR0ZXJUaGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBjbGFzcyBWb2ljZVJlY29nbml0aW9uQ29udHJvbGVye1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIGxldCBTcGVlY2hSZWNvZ25pdGlvbiA9IFNwZWVjaFJlY29nbml0aW9uIHx8IHdlYmtpdFNwZWVjaFJlY29nbml0aW9uXG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlY29nbml0aW9uID0gbmV3IFNwZWVjaFJlY29nbml0aW9uKCk7XG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyZSgpO1xuICAgIH1cblxuICAgIHN0YXJ0KGNhbGxiYWNrKXtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbnJlc3VsdCA9IChldmVudCk9PntcbiAgICAgICAgICAgIGNvbnN0IGZpbmFsU3RyID0gZXZlbnQucmVzdWx0c1swXVswXS50cmFuc2NyaXB0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbmZpZGVuY2U6ICcgKyBmaW5hbFN0cik7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZpbmFsU3RyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgc3RvcCgpe1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKTtcbiAgICB9XG5cbiAgICBfY29uZmlndXJlKCl7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ubGFuZyA9ICdmci1GUic7XG5cbiAgICAgICAgLy8gV2UgZGV0ZWN0IGVuZFxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZW5kID0gXz0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0VuZCBvZiByZWNvZ25pdGlvbicpO1xuICAgICAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdG9wKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFdlIGRldGVjdCBlcnJvcnNcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbmVycm9yID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT0gJ25vLXNwZWVjaCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gU3BlZWNoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT0gJ2F1ZGlvLWNhcHR1cmUnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIG1pY3JvcGhvbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdub3QtYWxsb3dlZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm90IEFsbG93ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTsgICAgIFxuICAgIH1cblxuXG59IiwiJ3VzZSBzdHJpY3QnXG4vKipcbiAqIENvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYmlub21lZC9tYm90LXdlYmJsdWV0b290aFxuICogXG4gKi9cblxuXG5jb25zdCBERVZJQ0VfTkFNRSA9IFwiTWFrZWJsb2NrX0xFXCIsXG4gICAgU0VSVklDRV9VVUlEID0gXCIwMDAwZmZlMS0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIixcbiAgICBDSEFSQUNURVJJU1RJQ19VVUlEID0gXCIwMDAwZmZlMy0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIjtcblxuLyoqXG4gKiBHZW5lcmFsIGNvbmZpZ3VyYXRpb24gKFVVSUQpXG4qL1xuY2xhc3MgQ29uZmlnIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG5hbWUoKSB7IHJldHVybiBcIk1ha2VibG9ja19MRVwiOyB9XG4gICAgc2VydmljZSgpIHsgcmV0dXJuIFwiMDAwMGZmZTEtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIgfVxuICAgIGNoYXJhdGVyaXN0aWMoKSB7IHJldHVybiBcIjAwMDBmZmUzLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiIH1cbn1cblxuLy8gQ29uc3QgZm9yIGluc3RydWN0aW9ucyB0eXBlc1xuY29uc3QgVFlQRV9NT1RPUiA9IDB4MGEsXG4gICAgVFlQRV9SR0IgPSAweDA4LFxuICAgIFRZUEVfU09VTkQgPSAweDA3O1xuXG5cbi8vIENvbnN0IGZvciB0aGUgcG9ydHNcbmNvbnN0IFBPUlRfMSA9IDB4MDEsXG4gICAgUE9SVF8yID0gMHgwMixcbiAgICBQT1JUXzMgPSAweDAzLFxuICAgIFBPUlRfNCA9IDB4MDQsXG4gICAgUE9SVF81ID0gMHgwNSxcbiAgICBQT1JUXzYgPSAweDA2LFxuICAgIFBPUlRfNyA9IDB4MDcsXG4gICAgUE9SVF84ID0gMHgwOCxcbiAgICBNXzEgPSAweDA5LFxuICAgIE1fMiA9IDB4MGE7XG4gICAgXG5cbi8qKlxuICogQ2xhc3MgZm9yIHRoZSByb2JvdFxuICogKi9cbmV4cG9ydCBjbGFzcyBNQm90IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgdGhpcy5vbkRpc2Nvbm5lY3RlZCA9IHRoaXMub25EaXNjb25uZWN0ZWQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5idXp6ZXJJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgLypcbiAgICBSZXF1ZXN0IHRoZSBkZXZpY2Ugd2l0aCBibHVldG9vdGhcbiAgICAqL1xuICAgIHJlcXVlc3QoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgXCJmaWx0ZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMuY29uZmlnLm5hbWUoKVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBcIm9wdGlvbmFsU2VydmljZXNcIjogW3RoaXMuY29uZmlnLnNlcnZpY2UoKV1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZShvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4oZGV2aWNlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZS5hZGRFdmVudExpc3RlbmVyKCdnYXR0c2VydmVyZGlzY29ubmVjdGVkJywgdGhpcy5vbkRpc2Nvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRldmljZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbm5lY3QgdG8gdGhlIGRldmljZVxuICAgICAqICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnRyb2wgdGhlIG1vdG9ycyBvZiByb2JvdFxuICAgICovXG4gICAgcHJvY2Vzc01vdG9yKHZhbHVlTTEsIHZhbHVlTTIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9NT1RPUiwgTV8xLCAwLCB2YWx1ZU0xKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX01PVE9SLCBNXzIsIDAsIHZhbHVlTTIpKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHJvY2Vzc0J1enplcigpIHtcbiAgICAgICAgdGhpcy5idXp6ZXJJbmRleCA9ICh0aGlzLmJ1enplckluZGV4ICsgMSkgJSA4O1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX1NPVU5ELCBQT1JUXzIsIDIyLCB0aGlzLmJ1enplckluZGV4KSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcHJvY2Vzc0NvbG9yKHJlZCxibHVlLGdyZWVuKXtcbiAgICAgICAgbGV0IHJIZXggPSByZWQ8PDg7XG5cdFx0bGV0IGdIZXggPSBncmVlbjw8MTY7XG5cdFx0bGV0IGJIZXggPSBibHVlPDwyNDtcblx0XHRsZXQgdmFsdWUgPSBySGV4IHwgZ0hleCB8IGJIZXg7XG5cdFx0dGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX1JHQixQT1JUXzYsMCx2YWx1ZSkpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZXZpY2UgaXMgZGlzY29ubmVjdGVkLicpO1xuICAgIH1cblxuXG4gICAgX2dlbmVyaWNDb250cm9sKHR5cGUsIHBvcnQsIHNsb3QsIHZhbHVlKSB7XG4gICAgICAgIC8qXG4gICAgICAgIGZmIDU1IGxlbiBpZHggYWN0aW9uIGRldmljZSBwb3J0ICBzbG90ICBkYXRhIGFcbiAgICAgICAgMCAgMSAgMiAgIDMgICA0ICAgICAgNSAgICAgIDYgICAgIDcgICAgIDhcbiAgICAgICAgKi9cbiAgICAgICAgLy8gU3RhdGljIHZhbHVlc1xuICAgICAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDE2KTtcbiAgICAgICAgdmFyIGJ1ZlZpZXcgPSBuZXcgVWludDE2QXJyYXkoYnVmKTtcblxuICAgICAgICB2YXIgYnl0ZTAgPSAweGZmLCAvLyBTdGF0aWMgaGVhZGVyXG4gICAgICAgICAgICBieXRlMSA9IDB4NTUsIC8vIFN0YXRpYyBoZWFkZXJcbiAgICAgICAgICAgIGJ5dGUyID0gMHgwOSwgLy8gbGVuXG4gICAgICAgICAgICBieXRlMyA9IDB4MDAsIC8vIGlkeFxuICAgICAgICAgICAgYnl0ZTQgPSAweDAyLCAvLyBhY3Rpb25cbiAgICAgICAgICAgIGJ5dGU1ID0gdHlwZSwgLy8gZGV2aWNlXG4gICAgICAgICAgICBieXRlNiA9IHBvcnQsIC8vIHBvcnRcbiAgICAgICAgICAgIGJ5dGU3ID0gc2xvdDsgLy8gc2xvdFxuICAgICAgICAvL2R5bmFtaWNzIHZhbHVlc1xuICAgICAgICB2YXIgYnl0ZTggPSAweDAwLCAvLyBkYXRhXG4gICAgICAgICAgICBieXRlOSA9IDB4MDAsIC8vIGRhdGFcbiAgICAgICAgICAgIGJ5dGUxMCA9IDB4MDAsIC8vIGRhdGFcbiAgICAgICAgICAgIGJ5dGUxMSA9IDB4MDA7IC8vIGRhdGFcbiAgICAgICAgLy9FbmQgb2YgbWVzc2FnZVxuICAgICAgICB2YXIgYnl0ZTEyID0gMHgwYSxcbiAgICAgICAgICAgIGJ5dGUxMyA9IDB4MDAsXG4gICAgICAgICAgICBieXRlMTQgPSAweDAwLFxuICAgICAgICAgICAgYnl0ZTE1ID0gMHgwMDtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVFlQRV9NT1RPUjpcbiAgICAgICAgICAgICAgICAvLyBNb3RvciBNMVxuICAgICAgICAgICAgICAgIC8vIGZmOjU1ICAwOTowMCAgMDI6MGEgIDA5OjY0ICAwMDowMCAgMDA6MDAgIDBhXCJcbiAgICAgICAgICAgICAgICAvLyAweDU1ZmY7MHgwMDA5OzB4MGEwMjsweDA5NjQ7MHgwMDAwOzB4MDAwMDsweDAwMGE7MHgwMDAwO1xuICAgICAgICAgICAgICAgIC8vIE1vdG9yIE0yXG4gICAgICAgICAgICAgICAgLy8gZmY6NTU6MDk6MDA6MDI6MGE6MGE6NjQ6MDA6MDA6MDA6MDA6MGEgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBWYWx1ZSA9IHZhbHVlIDwgMCA/IChwYXJzZUludChcImZmZmZcIiwgMTYpICsgTWF0aC5tYXgoLTI1NSwgdmFsdWUpKSA6IE1hdGgubWluKDI1NSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJ5dGU3ID0gdGVtcFZhbHVlICYgMHgwMGZmO1xuICAgICAgICAgICAgICAgIGJ5dGU4ID0gMHgwMDtcbiAgICAgICAgICAgICAgICBieXRlOCA9IHRlbXBWYWx1ZSA+PiA4O1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRZUEVfUkdCOlxuICAgICAgICAgICAgICAgIC8vIGZmOjU1ICAwOTowMCAgMDI6MDggIDA2OjAwICA1Yzo5OSAgNmQ6MDAgIDBhXG4gICAgICAgICAgICAgICAgLy8gMHg1NWZmOzB4MDAwOTsweDA4MDI7MHgwMDA2OzB4OTk1YzsweDAwNmQ7MHgwMDBhOzB4MDAwMDtcbiAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDA7XG4gICAgICAgICAgICAgICAgYnl0ZTggPSB2YWx1ZSA+PiA4ICYgMHhmZjtcbiAgICAgICAgICAgICAgICBieXRlOSA9IHZhbHVlID4+IDE2ICYgMHhmZjtcbiAgICAgICAgICAgICAgICBieXRlMTAgPSB2YWx1ZSA+PiAyNCAmIDB4ZmY7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRZUEVfU09VTkQ6XG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjowMDowMDowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MDY6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOmVlOjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo4ODowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6Yjg6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjVkOjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo0YTowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MjY6MDE6MGFcbiAgICAgICAgICAgICAgICBieXRlMiA9IDB4MDU7XG4gICAgICAgICAgICAgICAgYnl0ZTUgPSAweDIyO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4MDA7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgwNjtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweGVlO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4ODg7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHhiODtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDVkO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gNikge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4NGE7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4MjY7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZTggPSAweDBhO1xuICAgICAgICAgICAgICAgIGJ5dGUxMiA9IDB4MDA7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGJ1ZlZpZXdbMF0gPSBieXRlMSA8PCA4IHwgYnl0ZTA7XG4gICAgICAgIGJ1ZlZpZXdbMV0gPSBieXRlMyA8PCA4IHwgYnl0ZTI7XG4gICAgICAgIGJ1ZlZpZXdbMl0gPSBieXRlNSA8PCA4IHwgYnl0ZTQ7XG4gICAgICAgIGJ1ZlZpZXdbM10gPSBieXRlNyA8PCA4IHwgYnl0ZTY7XG4gICAgICAgIGJ1ZlZpZXdbNF0gPSBieXRlOSA8PCA4IHwgYnl0ZTg7XG4gICAgICAgIGJ1ZlZpZXdbNV0gPSBieXRlMTEgPDwgOCB8IGJ5dGUxMDtcbiAgICAgICAgYnVmVmlld1s2XSA9IGJ5dGUxMyA8PCA4IHwgYnl0ZTEyO1xuICAgICAgICBidWZWaWV3WzddID0gYnl0ZTE1IDw8IDggfCBieXRlMTQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYnl0ZTAudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTIudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTMudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTQudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTUudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTYudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTcudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTgudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTkudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEwLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxMS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTIudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEzLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxNC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTUudG9TdHJpbmcoMTYpICsgXCI6XCJcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBidWZWaWV3WzBdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbMV0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1syXS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzNdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbNF0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s1XS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzZdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbN10udG9TdHJpbmcoMTYpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgX3dyaXRlQ2hhcmFjdGVyaXN0aWModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuc2VydmljZSgpKVxuICAgICAgICAgICAgLnRoZW4oc2VydmljZSA9PiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmNoYXJhdGVyaXN0aWMoKSkpXG4gICAgICAgICAgICAudGhlbihjaGFyYWN0ZXJpc3RpYyA9PiBjaGFyYWN0ZXJpc3RpYy53cml0ZVZhbHVlKHZhbHVlKSk7XG4gICAgfVxuXG5cbn1cblxuXG4iLCIndXNlIHN0cmljdCdcblxuY2xhc3MgTXlvQ29uZmlne1xuICAgIGNvbnN0cnVjdG9yKCl7ICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgY29udHJvbFNlcnZpY2UoKSB7IHJldHVybiBcImQ1MDYwMDAxLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cbiAgICBnZXN0dXJlU2VydmljZSgpIHsgcmV0dXJuIFwiZDUwNjAwMDMtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIGNvbW1hbmRDaGFyYWN0ZXJpc3RpYygpIHsgcmV0dXJuIFwiZDUwNjA0MDEtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIGdlc3R1cmVDaGFyYWN0ZXJpc3RpYygpIHsgcmV0dXJuIFwiZDUwNjAxMDMtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIFxuXG59XG5cbmV4cG9ydCBjbGFzcyBNeW9Db250cm9sZXJ7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBNeW9Db25maWcoKTtcbiAgICAgICAgdGhpcy5vbkRpc2Nvbm5lY3RlZCA9IHRoaXMub25EaXNjb25uZWN0ZWQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQgPSBuZXcgVWludDhBcnJheSg1KTtcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbMF0gPSAweDAxOyAvLyBzZXQgbW9kZVxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFsxXSA9IDB4MDM7IC8vIGJ5dGVzIGluIHBheWxvYWRcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbMl0gPSAweDAwOyAvLyBlbWcgbW9kZTogbm9uZVxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFszXSA9IDB4MDA7IC8vIGltdSBtb2RlOiBkaXNhYmxlZFxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFs0XSA9IDB4MDE7IC8vIGNsYXNzaWZpZXIgbW9kZTogZW5hYmxlZFxuXG4gICAgICAgIHRoaXMuZGlzYWJsZUdlc3R1cmVzQ29tbWFuZCA9IFVpbnQ4QXJyYXkuZnJvbSh0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZUdlc3R1cmVzQ29tbWFuZFs0XSA9IDB4MDA7IC8vIGNsYXNzaWZpZXIgbW9kZTogZGlzYWJsZWRcblxuICAgICAgICB0aGlzLmRlZXBTbGVlcENvbW1hbmQgPSBuZXcgVWludDhBcnJheSgyKTtcbiAgICAgICAgdGhpcy5kZWVwU2xlZXBDb21tYW5kWzBdID0gMHgwNDsgLy8gc2V0IG1vZGVcbiAgICAgICAgdGhpcy5kZWVwU2xlZXBDb21tYW5kWzFdID0gMHgwMDsgLy8gYnl0ZXMgaW4gcGF5bG9hZFxuXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZWx0UG9wdXAgPSBudWxsO1xuICAgICAgICB0aGlzXG4gICAgfVxuXG4gICAgLypcbiAgICBSZXF1ZXN0IHRoZSBkZXZpY2Ugd2l0aCBibHVldG9vdGhcbiAgICAqL1xuICAgIHJlcXVlc3QoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgXCJmaWx0ZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcuY29udHJvbFNlcnZpY2UoKV1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgXCJvcHRpb25hbFNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5nZXN0dXJlU2VydmljZSgpXVxuICAgICAgICB9OyAgICAgICAgXG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYmx1ZXRvb3RoLnJlcXVlc3REZXZpY2Uob3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGRldmljZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UgPSBkZXZpY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UuYWRkRXZlbnRMaXN0ZW5lcignZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZCcsIHRoaXMub25EaXNjb25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXZpY2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25uZWN0IHRvIHRoZSBkZXZpY2VcbiAgICAgKiAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaW5pdCgpe1xuICAgICAgICBpZighdGhpcy5kZXZpY2Upe1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZWx0UG9wdXApe1xuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtzdGF0ZSA6ICdhZGQnfSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuY29udHJvbFNlcnZpY2UoKSlcbiAgICAgICAgICAgIC50aGVuKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBnZXQgTXlvIENvbnRyb2wgU2VydmljZScpO1xuICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5jb21tYW5kQ2hhcmFjdGVyaXN0aWMoKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoY2hhcmFjdGVyaXN0aWMpPT57XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBnZXQgTXlvIENvbW1hbmQgY2hhcmFjdGVyaXN0aWMnKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXJpc3RpYy53cml0ZVZhbHVlKHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlYWR5IHRvIGxpc3RlbiBnZXN0dXJlcycpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyR2VzdHVyZXMoY2FsbGJhY2spe1xuICAgICAgICBpZighdGhpcy5kZXZpY2Upe1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmRldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKHRoaXMuY29uZmlnLmdlc3R1cmVTZXJ2aWNlKCkpXG4gICAgICAgICAgICAudGhlbihzZXJ2aWNlPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gR2V0IEdlc3R1cmUgU2VydmljZScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmdlc3R1cmVDaGFyYWN0ZXJpc3RpYygpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChjaGFyYWN0ZXJpc3RpYykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHZXQgZ2VzdHVyZSBjYXJhY3RlcmlzdGljJylcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpYy5zdGFydE5vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpYy5hZGRFdmVudExpc3RlbmVyKCdjaGFyYWN0ZXJpc3RpY3ZhbHVlY2hhbmdlZCcsIChldikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnZXN0dXJlID0gdGhpcy5fcGFyc2VNeW9HZXN0dXJlKGV2LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHZXN0dXJlIDogJywgZ2VzdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhnZXN0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe3N0YXRlIDogJ3JlbW92ZSd9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGlzY29ubmVjdGVkKCkge1xuICAgICAgICB0aGlzLl9tYW5hZ2VQb3B1cEVsdCh7c3RhdGUgOiAncmVtb3ZlJ30pO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZygnRGV2aWNlIGlzIGRpc2Nvbm5lY3RlZC4nKTtcbiAgICB9XG5cbiAgICBfcGFyc2VNeW9HZXN0dXJlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZS5nZXRVaW50OCgwKSA9PT0gMHgwMykge1xuICAgICAgICAgICAgY29uc3QgZ2VzdHVyZVZhbHVlID0gdmFsdWUuZ2V0VWludDE2KDEsIHRydWUpXG4gICAgICAgICAgICBjb25zdCBnZXN0dXJlID0ge1xuICAgICAgICAgICAgICAgIDB4MDAwMDogJ3Jlc3QnLFxuICAgICAgICAgICAgICAgIDB4MDAwMTogJ2Zpc3QnLFxuICAgICAgICAgICAgICAgIDB4MDAwMjogJ3dhdmUtaW4nLFxuICAgICAgICAgICAgICAgIDB4MDAwMzogJ3dhdmUtb3V0JyxcbiAgICAgICAgICAgICAgICAweDAwMDQ6ICdmaW5nZXJzLXNwcmVhZCcsXG4gICAgICAgICAgICAgICAgMHgwMDA1OiAnZG91YmxlLXRhcCcsXG4gICAgICAgICAgICAgICAgMHhmZmZmOiAndW5rbm93bicsXG4gICAgICAgICAgICB9W2dlc3R1cmVWYWx1ZV1cbiAgICAgICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtnZXN0dXJlIDogZ2VzdHVyZX0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgZ2VzdHVyZSB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2VzdHVyZTogbnVsbCB9XG4gICAgfVxuXG4gICAgX21hbmFnZVBvcHVwRWx0KHtzdGF0ZT0gJ25vbmUnLCBnZXN0dXJlID0gJ25vbmUnfSl7XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gJ3JlbW92ZScgJiYgdGhpcy5lbHRQb3B1cCl7XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cCA9IG51bGw7XG4gICAgICAgIH1lbHNlIGlmIChzdGF0ZSA9PT0gJ2FkZCcpe1xuICAgICAgICAgICAgaWYgKHRoaXMuZWx0UG9wdXApe1xuICAgICAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwLmNsYXNzTGlzdC5hZGQoJ215by1wb3B1cCcpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsdFBvcHVwKTtcbiAgICAgICAgfWVsc2UgaWYgKHRoaXMuZWx0UG9wdXAgJiYgZ2VzdHVyZSAmJiBnZXN0dXJlICE9ICdub25lJyl7XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwLmNsYXNzTmFtZSA9IGBteW8tcG9wdXAgJHtnZXN0dXJlfWA7XG4gICAgICAgIH1cbiAgICB9XG59Il19
