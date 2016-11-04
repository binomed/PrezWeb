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
			row: 4,
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

	// Code User Media 1
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'highlight-user-media-v1',
		positionArray: [{
			'top': 'calc(90px + 13.8em)',
			'left': '60px',
			'width': '1000px',
			'height': '1.4em'
		}, {
			'top': 'calc(90px + 7.75em)',
			'left': '180px',
			'width': '210px',
			'height': '1.4em'
		}, {
			'top': 'calc(90px + 7.75em)',
			'left': '380px',
			'width': '90px',
			'height': '1.4em'
		}, {
			'top': 'calc(90px + 10.35em)',
			'left': '100px',
			'width': '800px',
			'height': '2.4em'
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
				console.log(event);
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
				if (finalStr.indexOf('ChaineToTest') != -1) {
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
			document.getElementById('connectMyo').addEventListener('click', function () {

				var myo = new _myoControler.MyoControler();
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
                this.eltPopup = document.createElement('div');
                this.eltPopup.classList.add('myo-popup');
                document.body.appendChild(this.eltPopup);
            } else if (this.eltPopup && gesture && gesture != 'none') {
                this.eltPopup.class = "myo-popup " + gesture;
            }
        }
    }]);

    return MyoControler;
}();

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyIsInNjcmlwdHMvcHJlei5qcyIsInNjcmlwdHMvcHJlei9oaWdobGlnaHRFdmVudHMuanMiLCJzY3JpcHRzL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzIiwic2NyaXB0cy9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMiLCJzY3JpcHRzL3NlbnNvcnMvc3BlZWNoU3ludGhlc2lzQ29udHJvbGVyLmpzIiwic2NyaXB0cy9zZW5zb3JzL3ZvaWNlUmVjb2duaXRpb25Db250cm9sZXIuanMiLCJzY3JpcHRzL3dlYmJsdWV0b290aC9tYm90Q29udHJvbGVyLmpzIiwic2NyaXB0cy93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNLGNBQWMsSUFBcEI7QUFDQSxJQUFNLHFCQUFxQixHQUEzQjtBQUNBLElBQU0sWUFBWSxFQUFsQjs7SUFFYSxtQixXQUFBLG1CO0FBQ1osb0NBQW9DO0FBQUEsTUFBdkIsTUFBdUIsUUFBdkIsTUFBdUI7QUFBQSxNQUFmLGFBQWUsUUFBZixhQUFlOztBQUFBOztBQUNuQyxPQUFLLFdBQUwsR0FBbUIsU0FBUyxjQUFULGdCQUFxQyxNQUFyQyxDQUFuQjtBQUNBLE9BQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQSxTQUFPLGdCQUFQLFdBQWdDLE1BQWhDLEVBQTBDLEtBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBMUM7QUFDQSxTQUFPLGdCQUFQLGdCQUFxQyxNQUFyQyxFQUErQyxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQStCLElBQS9CLENBQS9DO0FBQ0E7Ozs7b0NBRWlCLEssRUFBTTtBQUN2QixPQUFHO0FBQ0YsUUFBSSxNQUFNLElBQU4sS0FBZSxlQUFuQixFQUFt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QVE7O0FBQzlDLGdCQUFJLFVBQVUsUUFBVixJQUFzQixLQUFLLFFBQS9CLEVBQXdDO0FBQ3BDLHFCQUFLLFFBQUwsQ0FBYyxNQUFkO0FBQ0EscUJBQUssUUFBTCxHQUFnQixJQUFoQjtBQUNILGFBSEQsTUFHTSxJQUFJLFVBQVUsS0FBZCxFQUFvQjtBQUN0QixxQkFBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBLHFCQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLEdBQXhCLENBQTRCLFdBQTVCO0FBQ0EseUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBSyxRQUEvQjtBQUNILGFBSkssTUFJQSxJQUFJLEtBQUssUUFBTCxJQUFpQixPQUFqQixJQUE0QixXQUFXLE1BQTNDLEVBQWtEO0FBQ3BELHFCQUFLLFFBQUwsQ0FBYyxLQUFkLGtCQUFtQyxPQUFuQztBQUNIO0FBQ0oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IExJTkVfSEVJR0hUID0gMS4xNTtcbmNvbnN0IEFERElUSU9OTkFMX0hFSUdIVCA9IDAuNDtcbmNvbnN0IENPTF9XSURUSCA9IDM1O1xuXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0Q29kZUhlbHBlcntcblx0Y29uc3RydWN0b3Ioe2tleUVsdCwgcG9zaXRpb25BcnJheX0pe1xuXHRcdHRoaXMuZWx0SGlnbGlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaGlnaGxpZ2h0LSR7a2V5RWx0fWApO1xuXHRcdHRoaXMucG9zaXRpb25BcnJheSA9IHBvc2l0aW9uQXJyYXk7XG5cblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcihgY29kZS0ke2tleUVsdH1gLCB0aGlzLl9saXN0ZW5GcmFnbWVudHMuYmluZCh0aGlzKSk7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoYHN0b3AtY29kZS0ke2tleUVsdH1gLCB0aGlzLl91bnJlZ2lzdGVyRnJhZ21lbnRzLmJpbmQodGhpcykpO1xuXHR9XG5cblx0X3Byb2dyZXNzRnJhZ21lbnQoZXZlbnQpe1xuXHRcdHRyeXtcdFx0XHRcblx0XHRcdGlmIChldmVudC50eXBlID09PSAnZnJhZ21lbnRzaG93bicpe1xuXHRcdFx0XHRjb25zdCBpbmRleCA9ICtldmVudC5mcmFnbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtaW5kZXgnKTtcblx0XHRcdFx0Y29uc3QgcHJvcGVydGllcyA9IHRoaXMucG9zaXRpb25BcnJheVtpbmRleF07XG5cdFx0XHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0XHRcdGlmIChrZXkgPT09ICdyb3cnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ3RvcCddID0gYGNhbGMoOTBweCArICgke3Byb3BlcnRpZXNba2V5XX0gKiAke0xJTkVfSEVJR0hUfWVtKSlgO1xuXHRcdFx0XHRcdH1lbHNlIGlmIChrZXkgPT09ICdjb2wnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ2xlZnQnXSA9IGBjYWxjKDYwcHggKyAoJHtwcm9wZXJ0aWVzW2tleV19ICogJHtDT0xfV0lEVEh9cHgpKWA7XG5cdFx0XHRcdFx0fWVsc2UgaWYgKGtleSA9PT0gJ2NhbGNIZWlnaHQnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ2hlaWdodCddID0gYGNhbGMoJHtwcm9wZXJ0aWVzW2tleV19ZW0gKyAke0FERElUSU9OTkFMX0hFSUdIVH1lbSlgO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVtrZXldID0gcHJvcGVydGllc1trZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVx0XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gK2V2ZW50LmZyYWdtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudC1pbmRleCcpO1xuXHRcdFx0XHQvLyBPbiByZXNldCBsZXMgcHJvcGVydGllc1xuXHRcdFx0XHRsZXQgcHJvcGVydGllcyA9IHRoaXMucG9zaXRpb25BcnJheVtpbmRleF07XG5cdFx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0Y29uc3Qga2V5ID0ga2V5c1tpXTtcblx0XHRcdFx0XHRpZiAoa2V5ID09PSAncm93Jyl7XG5cdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlWyd0b3AnXSA9ICcnO1xuXHRcdFx0XHRcdH1lbHNlIGlmKGtleSA9PT0gJ2NhbGNIZWlnaHQnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ2hlaWdodCddID0gJyc7XG5cdFx0XHRcdFx0fWVsc2UgaWYgKGtleSA9PT0gJ2NvbCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnbGVmdCddID0gJyc7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlW2tleV0gPSAnJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGluZGV4ID4gMCl7XHRcdFx0XG5cdFx0XHRcdFx0cHJvcGVydGllcyA9IHRoaXMucG9zaXRpb25BcnJheVtpbmRleCAtIDFdO1xuXHRcdFx0XHRcdGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdFx0Y29uc3Qga2V5ID0ga2V5c1tpXTtcblx0XHRcdFx0XHRcdGlmIChrZXkgPT09ICdyb3cnKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsndG9wJ10gPSBgY2FsYyg5MHB4ICsgKCR7cHJvcGVydGllc1trZXldfSAqICR7TElORV9IRUlHSFR9ZW0pKWA7XG5cdFx0XHRcdFx0XHR9ZWxzZSBpZiAoa2V5ID09PSAnY29sJyl7XG5cdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlWydsZWZ0J10gPSBgY2FsYyg2MHB4ICsgKCR7cHJvcGVydGllc1trZXldfSAqICR7Q09MX1dJRFRIfXB4KSlgO1xuXHRcdFx0XHRcdH1lbHNlIGlmIChrZXkgPT09ICdjYWxjSGVpZ2h0Jyl7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ2hlaWdodCddID0gYGNhbGMoJHtwcm9wZXJ0aWVzW2tleV19ZW0gKyAke0FERElUSU9OTkFMX0hFSUdIVH1lbSlgO1xuXHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cdFx0XHRcblx0XHRcdH1cblx0XHR9Y2F0Y2goZSl7fVxuXHR9XG5cblx0X2xpc3RlbkZyYWdtZW50cygpe1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRoaWRkZW4nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHR9XG5cblx0X3VucmVnaXN0ZXJGcmFnbWVudHMoKXtcblx0XHRSZXZlYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRzaG93bicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XG5cdFx0UmV2ZWFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZyYWdtZW50aGlkZGVuJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQge1JldmVhbEVuZ2luZUV2ZW50c30gZnJvbSAnLi9wcmV6L3JldmVhbEVuZ2luZUV2ZW50cy5qcyc7XG5cblxuKGZ1bmN0aW9uICgpIHtcblxuXG4gICAgZnVuY3Rpb24gcGFnZUxvYWQoKSB7XG4gICAgICAgIG5ldyBSZXZlYWxFbmdpbmVFdmVudHMoKTtcbiAgICB9XG5cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcGFnZUxvYWQpO1xufSkoKTsiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHtIaWdobGlnaHRDb2RlSGVscGVyfSBmcm9tICcuLi9oZWxwZXJzL2hpZ2hsaWdodENvZGVIZWxwZXIuanMnO1xuXG5jb25zdCBMSU5FX0hFSUdIVCA9IDEuMTU7XG5jb25zdCBBRERJVElPTk5BTF9IRUlHVCA9IDAuNDtcbmNvbnN0IENPTF9XSURUSCA9IDM1O1xuXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0RXZlbnRze1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdC8vICBCbHVldG9vdGg6IFNjYW4gKyBDb25uZWN0IFxuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICdjb25uZWN0LWJsZScsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XG5cdFx0XHRcdHJvdyA6IDQsXG5cdFx0XHRcdHdpZHRoIDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0cm93IDogNixcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xuXHRcdFx0fV1cblx0XHR9KTtcblxuXHRcdC8vICBCbGUgQ29kZSBSZWFkIENoYXJhY3RlcmlzdGljXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0IDogJ3JlYWQtY2hhcmFjdCcsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0cm93IDogNSxcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xuXHRcdFx0fV1cblx0XHR9KVxuXG5cblxuXHQvLyBDb2RlIFVzZXIgTWVkaWEgMVxuXHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAnaGlnaGxpZ2h0LXVzZXItbWVkaWEtdjEnLFxuXHRcdFx0cG9zaXRpb25BcnJheTogW1xuXHRcdFx0e1xuXHRcdFx0XHQndG9wJyA6ICdjYWxjKDkwcHggKyAxMy44ZW0pJyxcblx0XHRcdFx0J2xlZnQnIDogJzYwcHgnLFxuXHRcdFx0XHQnd2lkdGgnIDogJzEwMDBweCcsXG5cdFx0XHRcdCdoZWlnaHQnIDogJzEuNGVtJ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0J3RvcCcgOiAnY2FsYyg5MHB4ICsgNy43NWVtKScsXG5cdFx0XHRcdCdsZWZ0JyA6ICcxODBweCcsXG5cdFx0XHRcdCd3aWR0aCcgOiAnMjEwcHgnLFxuXHRcdFx0XHQnaGVpZ2h0JyA6ICcxLjRlbSdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdCd0b3AnIDogJ2NhbGMoOTBweCArIDcuNzVlbSknLFxuXHRcdFx0XHQnbGVmdCcgOiAnMzgwcHgnLFxuXHRcdFx0XHQnd2lkdGgnIDogJzkwcHgnLFxuXHRcdFx0XHQnaGVpZ2h0JyA6ICcxLjRlbSdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdCd0b3AnIDogJ2NhbGMoOTBweCArIDEwLjM1ZW0pJyxcblx0XHRcdFx0J2xlZnQnIDogJzEwMHB4Jyxcblx0XHRcdFx0J3dpZHRoJyA6ICc4MDBweCcsXG5cdFx0XHRcdCdoZWlnaHQnIDogJzIuNGVtJ1xuXHRcdFx0fVxuXHRcdFx0XX0pO1xuXG5cblx0XG5cdC8vIENvZGUgV2ViIFNwZWVjaFxuXHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAnd2ViLXNwZWVjaCcsIFxuXHRcdFx0cG9zaXRpb25BcnJheTpbXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDEsXG5cdFx0XHRcdHdpZHRoIDogJzQwMHB4J1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMixcblx0XHRcdFx0d2lkdGggOiAnNTAwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAzLFxuXHRcdFx0XHR3aWR0aCA6ICc1NTBweCdcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDUsXG5cdFx0XHRcdHdpZHRoIDogJzMwMHB4J1x0XHRcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNixcblx0XHRcdFx0d2lkdGggOiAnMzAwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiA3LFx0XHRcdFx0XG5cdFx0XHRcdGxlZnQgOiAnMjgwcHgnLFxuXHRcdFx0XHR3aWR0aCA6ICc0NTBweCdcblx0XHRcdH1cblx0XHRcdF19KTtcblxuXHQvLyBDb2RlIFdlYiBTcGVlY2ggR3JhbW1hclxuXHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAnd2ViLXNwZWVjaC1ncmFtbWFyJywgXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW1xuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAyLFxuXHRcdFx0XHR3aWR0aCA6ICc3NTBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzcwMHB4J1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNCxcblx0XHRcdFx0d2lkdGggOiAnNjUwcHgnXG5cdFx0XHR9XG5cdFx0XHRdfSk7XG5cblx0Ly8gQ29kZSBXZWIgU3BlZWNoIFN5bnRoZXNpc1xuXHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAnd2ViLXNwZWVjaC1zeW50aGVzaXMnLCBcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFtcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMixcblx0XHRcdFx0d2lkdGggOiAnODUwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAzLFxuXHRcdFx0XHR3aWR0aCA6ICc0MDBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDQsXG5cdFx0XHRcdHdpZHRoIDogJzQ1MHB4J1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNSxcblx0XHRcdFx0d2lkdGggOiAnNDAwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiA2LFxuXHRcdFx0XHR3aWR0aCA6ICczNTBweCdcblx0XHRcdH1cblx0XHRcdF19KTtcblxuXHR9XG59XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7SGlnaGxpZ2h0RXZlbnRzfSBmcm9tICcuL2hpZ2hsaWdodEV2ZW50cy5qcyc7XG5pbXBvcnQge0JsZVByZXpDb250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvYmxlUHJlekNvbnRyb2xlci5qcyc7XG5pbXBvcnQge1ZvaWNlUmVjb2duaXRpb25Db250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvdm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlci5qcyc7XG5pbXBvcnQge1NwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcn0gZnJvbSAnLi4vc2Vuc29ycy9zcGVlY2hTeW50aGVzaXNDb250cm9sZXIuanMnO1xuXG5cbmV4cG9ydCBjbGFzcyBSZXZlYWxFbmdpbmVFdmVudHN7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFxuXHRcdGxldCBpbklGcmFtZSA9IHdpbmRvdy50b3AgIT0gd2luZG93LnNlbGY7XG5cdFx0XG5cdFx0Ly8gTWFuYWdlbWVudCBvZiBhY3Rpb25zIGluIHByZXogbW9kZSAobm90IGluIHByZXZpZXcgbW9kZSlcblx0XHRpZiAoIWluSUZyYW1lKXtcblx0XHRcdC8vIEluaXQgYWxsIGJsZSBhY3Rpb25zXG5cdFx0XHR0aGlzLl9ibGVQcmV6Q29udHJvbGVyID0gbmV3IEJsZVByZXpDb250cm9sZXIoKTtcblx0XHRcdHRoaXMuX2JsZUV2ZW50cygpO1xuXG5cdFx0XHQvLyBJbml0IFZvaWNlIGFuZCBTcGVlY2ggY29udHJvbGVyc1xuXHRcdFx0dGhpcy52b2ljZVJlY29nbml0aW9uID0gbmV3IFZvaWNlUmVjb2duaXRpb25Db250cm9sZXIoKTtcblx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzID0gbmV3IFNwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcigpO1xuXHRcdFx0dGhpcy5fdm9pY2VFdmVudHMoKTtcblx0XHR9XG5cblx0XHQvLyBJbiBhbCBjYXNlIHdlIGluaXQgdGhlIGhpZ2hsaWdodCBvZiBjb2RlLlxuXHRcdHRoaXMuX2luaXRIaWdobGlnaHRDb2RlKCk7XG5cblx0fVxuXG5cdF9ibGVFdmVudHMoKXtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignc3RvcC1jb2RlLXJlYWQtY2hhcmFjdCcsIGV2ZW50ID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKGV2ZW50KTtcblx0XHRcdGlmICh0aGlzLl9ibGVQcmV6Q29udHJvbGVyLl9jdXJyZW50QmxlRGV2aWNlKSB7XG5cdFx0XHRcdHRoaXMuX2JsZVByZXpDb250cm9sZXIuX2N1cnJlbnRCbGVEZXZpY2UuZ2F0dC5kaXNjb25uZWN0KCk7XG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdF92b2ljZUV2ZW50cygpe1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdyZWNvZ25pdGlvbicsICgpPT57XG5cdFx0XHRzZXRUaW1lb3V0KF89PiB0aGlzLl92b2ljZUNhbGxCYWNrKCksMTAwMCk7XG5cdFx0fSk7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZC1yZWNvZ25pdGlvbicsIF89Pntcblx0XHRcdHRyeXtcblx0XHRcdFx0dGhpcy52b2ljZVJlY29nbml0aW9uLnN0b3AoKTtcblx0XHRcdH1jYXRjaChlKXt9XG5cdFx0fSlcblx0fVxuXG5cdF92b2ljZUNhbGxCYWNrKCl7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW9TcGVlY2gnKS5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cdFx0dGhpcy52b2ljZVJlY29nbml0aW9uLnN0YXJ0KChmaW5hbFN0cik9Pntcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGVlY2hfaW5wdXQnKS5pbm5lckhUTUwgPSBmaW5hbFN0cjtcblx0XHRcdGlmIChmaW5hbFN0ci5pbmRleE9mKCdDaGFpbmVUb1Rlc3QnKSAhPSAtMSl7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vU3BlZWNoJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoJ2JsYSBibGEgYmxhJylcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRcblxuXHRfaW5pdEhpZ2hsaWdodENvZGUoKSB7XG5cblx0XHRuZXcgSGlnaGxpZ2h0RXZlbnRzKCk7XG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHtNeW9Db250cm9sZXJ9IGZyb20gJy4uL3dlYmJsdWV0b290aC9teW9Db250cm9sZXIuanMnO1xuaW1wb3J0IHtNQm90fSBmcm9tICcuLi93ZWJibHVldG9vdGgvbWJvdENvbnRyb2xlci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCbGVQcmV6Q29udHJvbGVye1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcblx0XHR0aGlzLl9jdXJyZW50QmxlRGV2aWNlID0gbnVsbDtcblx0XHR0aGlzLl9iYXNpY0JsZUJpbmRpbmcoKTtcblx0XHR0aGlzLl9teW9CaW5kaW5nKCk7XG5cdFx0Ly8gSnVzdCBjb21tZW50IG1ib3QgcGFydCBiZWNhdXNlIGl0IGNhbiBhbHdheXMgYmUgdXNlZnVsbCAhXG5cdFx0Ly90aGlzLl9tYm90QmluZGluZygpO1xuXHR9XG5cblx0X2Jhc2ljQmxlQmluZGluZygpIHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdEJsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuXHRcdFx0XG5cdFx0XHRjb25zdCBmaWx0ZXJzID0geyBmaWx0ZXJzOiBbeyBzZXJ2aWNlczogWydiYXR0ZXJ5X3NlcnZpY2UnXSB9XSB9O1xuXHRcdFx0bmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKGZpbHRlcnMpXG5cdFx0XHQudGhlbihkZXZpY2UgPT4gZGV2aWNlLmdhdHQuY29ubmVjdCgpKVxuXHRcdFx0LnRoZW4oc2VydmVyID0+IHsgXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdCbHVldG9vdGggZGV2aWNlIGlzIGNvbm5lY3RlZC4nKTtcblx0XHRcdFx0dGhpcy5fY3VycmVudEJsZURldmljZSA9IHNlcnZlci5kZXZpY2U7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVhZENoYXJhY3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcblx0XHRcdFxuXHRcdFx0dGhpcy5fY3VycmVudEJsZURldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKCdiYXR0ZXJ5X3NlcnZpY2UnKVxuXHRcdFx0LnRoZW4oc2VydmljZSA9PiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKCdiYXR0ZXJ5X2xldmVsJykpXG5cdFx0XHQudGhlbihjaGFyYWN0ZXJpc3RpYyA9PiBjaGFyYWN0ZXJpc3RpYy5yZWFkVmFsdWUoKSlcblx0XHRcdC50aGVuKHZhbHVlID0+IHtcblx0XHRcdFx0Y29uc3QgYmF0dGVyeUxldmVsID0gdmFsdWUuZ2V0VWludDgoMCk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGBCYXR0ZXJ5IHBlcmNlbnRhZ2UgaXMgJHtiYXR0ZXJ5TGV2ZWx9JS5gKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0X215b0JpbmRpbmcoKXtcblx0XHRsZXQgbGFzdERvdWJsZVRhcCA9IDA7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RNeW8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG5cdFx0XHRcblx0XHRcdGxldCBteW8gPSBuZXcgTXlvQ29udHJvbGVyKCk7XG5cdFx0XHRpZiAoIW15by5jb25uZWN0ZWQpe1xuXHRcdFx0XHRteW8ucmVxdWVzdCgpXG5cdFx0XHRcdC50aGVuKF89Pm15by5jb25uZWN0KCkpXG5cdFx0XHRcdC50aGVuKCgpPT5teW8uaW5pdCgpKVxuXHRcdFx0XHQudGhlbigoKT0+bXlvLnJlZ2lzdGVyR2VzdHVyZXMoKGdlc3R1cmUpPT57XG5cdFx0XHRcdFx0aWYgKGdlc3R1cmUgJiYgZ2VzdHVyZS5nZXN0dXJlID09PSAnZG91YmxlLXRhcCcpe1xuXHRcdFx0XHRcdFx0aWYoRGF0ZS5ub3coKSAtIGxhc3REb3VibGVUYXAgPCAyMDAwKXtcblx0XHRcdFx0XHRcdFx0UmV2ZWFsLm5leHQoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGxhc3REb3VibGVUYXAgPSBEYXRlLm5vdygpO1xuXHRcdFx0XHRcdH0gXG5cdFx0XHRcdH0pKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdF9tYm90QmluZGluZygpe1xuXHRcdCAvLyBDaGVjayB0aGUgY29ubmVjdGlvblxuXHRcdCBsZXQgc3RlcENvbm5lY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdE1Cb3QnKTtcblx0XHQgbGV0IHN0ZXBDb250cm9sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcnQtYnV0dG9uLW1ib3QnKTsgXG5cdFx0IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ubmVjdE1Cb3RcIikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfID0+IHtcblx0XHRcdC8vIFJlcXVlc3QgdGhlIGRldmljZVxuXHRcdFx0bGV0IG1Cb3QgPSBuZXcgTUJvdCgpO1xuXHRcdFx0bUJvdC5yZXF1ZXN0KClcblx0XHRcdFx0LnRoZW4oXyA9PiB7XG5cdFx0XHRcdFx0Ly8gQ29ubmVjdCB0byB0aGUgbWJvdFxuXHRcdFx0XHRcdHJldHVybiBtQm90LmNvbm5lY3QoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXyA9PiB7XG5cdFx0XHRcdFx0Ly8gQ29ubmVjdGlvbiBpcyBkb25lLCB3ZSBzaG93IHRoZSBjb250cm9sc1xuXHRcdFx0XHRcdHN0ZXBDb25uZWN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdFx0XHRzdGVwQ29udHJvbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG5cblx0XHRcdFx0XHRsZXQgcGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJ0LWJ1dHRvbicpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIENvbnRyb2wgdGhlIHJvYm90IGJ5IGJ1dHRvbnNcblx0XHRcdFx0XHRsZXQgYnRuVXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0blVwJyk7XG5cdFx0XHRcdFx0bGV0IGJ0bkRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0bkRvd24nKTtcblx0XHRcdFx0XHRsZXQgYnRuTGVmdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuTGVmdCcpO1xuXHRcdFx0XHRcdGxldCBidG5SaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuUmlnaHQnKTtcblxuXHRcdFx0XHRcdGJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigtMjUwLCAyNTApIH0pO1xuXHRcdFx0XHRcdGJ0bkRvd24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKDI1MCwgLTI1MCkgfSk7XG5cdFx0XHRcdFx0YnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMjUwLCAyNTApIH0pO1xuXHRcdFx0XHRcdGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigtMjUwLCAtMjUwKSB9KTtcblxuXHRcdFx0XHRcdGJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XG5cdFx0XHRcdFx0YnRuRG93bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApIH0pO1xuXHRcdFx0XHRcdGJ0bkxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigwLCAwKSB9KTtcblx0XHRcdFx0XHRidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApIH0pO1xuXHRcdFx0XHRcdFxuXG5cdFx0XHRcdH0pXG5cdFx0fSk7XG5cdH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBjbGFzcyBTcGVlY2hTeW50aGVzaXNDb250cm9sZXJ7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5zeW50aCA9IHdpbmRvdy5zcGVlY2hTeW50aGVzaXM7XG5cbiAgICAgICAgdGhpcy52b2ljZUZSID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29uZmlndXJlKCk7XG4gICAgfVxuXG4gICAgX2NvbmZpZ3VyZSgpe1xuICAgICAgICB0aGlzLl9wb3B1bGF0ZVZvaWNlTGlzdCgpO1xuICAgICAgICBpZiAoc3BlZWNoU3ludGhlc2lzLm9udm9pY2VzY2hhbmdlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMub252b2ljZXNjaGFuZ2VkID0gdGhpcy5fcG9wdWxhdGVWb2ljZUxpc3QuYmluZCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9wb3B1bGF0ZVZvaWNlTGlzdCgpIHtcbiAgICAgICAgbGV0IHZvaWNlcyA9IHRoaXMuc3ludGguZ2V0Vm9pY2VzKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdm9pY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodm9pY2VzW2ldLmxhbmcgPT09ICdmci1GUicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZvaWNlRlIgPSB2b2ljZXNbaV07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzcGVhayh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy52b2ljZUZSKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdXR0ZXJUaGlzID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSh2YWx1ZSk7XG4gICAgICAgICAgICB1dHRlclRoaXMudm9pY2UgPSB0aGlzLnZvaWNlRlI7XG4gICAgICAgICAgICB1dHRlclRoaXMucGl0Y2ggPSAxO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnJhdGUgPSAxO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLm9uZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zeW50aC5zcGVhayh1dHRlclRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNsYXNzIFZvaWNlUmVjb2duaXRpb25Db250cm9sZXJ7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgbGV0IFNwZWVjaFJlY29nbml0aW9uID0gU3BlZWNoUmVjb2duaXRpb24gfHwgd2Via2l0U3BlZWNoUmVjb2duaXRpb25cbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24gPSBuZXcgU3BlZWNoUmVjb2duaXRpb24oKTtcbiAgICAgICAgdGhpcy5fY29uZmlndXJlKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoY2FsbGJhY2spe1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9ucmVzdWx0ID0gKGV2ZW50KT0+e1xuICAgICAgICAgICAgY29uc3QgZmluYWxTdHIgPSBldmVudC5yZXN1bHRzWzBdWzBdLnRyYW5zY3JpcHQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ29uZmlkZW5jZTogJyArIGZpbmFsU3RyKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmluYWxTdHIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uc3RhcnQoKTtcbiAgICB9XG5cbiAgICBzdG9wKCl7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uc3RvcCgpO1xuICAgIH1cblxuICAgIF9jb25maWd1cmUoKXtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5jb250aW51b3VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5sYW5nID0gJ2ZyLUZSJztcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5pbnRlcmltUmVzdWx0cyA9IHRydWU7XG5cbiAgICAgICAgLy8gV2UgZGV0ZWN0IGVuZFxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZW5kID0gXz0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0VuZCBvZiByZWNvZ25pdGlvbicpO1xuICAgICAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdG9wKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFdlIGRldGVjdCBlcnJvcnNcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbmVycm9yID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT0gJ25vLXNwZWVjaCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gU3BlZWNoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT0gJ2F1ZGlvLWNhcHR1cmUnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIG1pY3JvcGhvbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdub3QtYWxsb3dlZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm90IEFsbG93ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTsgICAgIFxuICAgIH1cblxuXG59IiwiJ3VzZSBzdHJpY3QnXG4vKipcbiAqIENvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYmlub21lZC9tYm90LXdlYmJsdWV0b290aFxuICogXG4gKi9cblxuXG5jb25zdCBERVZJQ0VfTkFNRSA9IFwiTWFrZWJsb2NrX0xFXCIsXG4gICAgU0VSVklDRV9VVUlEID0gXCIwMDAwZmZlMS0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIixcbiAgICBDSEFSQUNURVJJU1RJQ19VVUlEID0gXCIwMDAwZmZlMy0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIjtcblxuLyoqXG4gKiBHZW5lcmFsIGNvbmZpZ3VyYXRpb24gKFVVSUQpXG4qL1xuY2xhc3MgQ29uZmlnIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG5hbWUoKSB7IHJldHVybiBcIk1ha2VibG9ja19MRVwiOyB9XG4gICAgc2VydmljZSgpIHsgcmV0dXJuIFwiMDAwMGZmZTEtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIgfVxuICAgIGNoYXJhdGVyaXN0aWMoKSB7IHJldHVybiBcIjAwMDBmZmUzLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiIH1cbn1cblxuLy8gQ29uc3QgZm9yIGluc3RydWN0aW9ucyB0eXBlc1xuY29uc3QgVFlQRV9NT1RPUiA9IDB4MGEsXG4gICAgVFlQRV9SR0IgPSAweDA4LFxuICAgIFRZUEVfU09VTkQgPSAweDA3O1xuXG5cbi8vIENvbnN0IGZvciB0aGUgcG9ydHNcbmNvbnN0IFBPUlRfMSA9IDB4MDEsXG4gICAgUE9SVF8yID0gMHgwMixcbiAgICBQT1JUXzMgPSAweDAzLFxuICAgIFBPUlRfNCA9IDB4MDQsXG4gICAgUE9SVF81ID0gMHgwNSxcbiAgICBQT1JUXzYgPSAweDA2LFxuICAgIFBPUlRfNyA9IDB4MDcsXG4gICAgUE9SVF84ID0gMHgwOCxcbiAgICBNXzEgPSAweDA5LFxuICAgIE1fMiA9IDB4MGE7XG4gICAgXG5cbi8qKlxuICogQ2xhc3MgZm9yIHRoZSByb2JvdFxuICogKi9cbmV4cG9ydCBjbGFzcyBNQm90IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgdGhpcy5vbkRpc2Nvbm5lY3RlZCA9IHRoaXMub25EaXNjb25uZWN0ZWQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5idXp6ZXJJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgLypcbiAgICBSZXF1ZXN0IHRoZSBkZXZpY2Ugd2l0aCBibHVldG9vdGhcbiAgICAqL1xuICAgIHJlcXVlc3QoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgXCJmaWx0ZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMuY29uZmlnLm5hbWUoKVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBcIm9wdGlvbmFsU2VydmljZXNcIjogW3RoaXMuY29uZmlnLnNlcnZpY2UoKV1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZShvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4oZGV2aWNlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZS5hZGRFdmVudExpc3RlbmVyKCdnYXR0c2VydmVyZGlzY29ubmVjdGVkJywgdGhpcy5vbkRpc2Nvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRldmljZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbm5lY3QgdG8gdGhlIGRldmljZVxuICAgICAqICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnRyb2wgdGhlIG1vdG9ycyBvZiByb2JvdFxuICAgICovXG4gICAgcHJvY2Vzc01vdG9yKHZhbHVlTTEsIHZhbHVlTTIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9NT1RPUiwgTV8xLCAwLCB2YWx1ZU0xKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX01PVE9SLCBNXzIsIDAsIHZhbHVlTTIpKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHJvY2Vzc0J1enplcigpIHtcbiAgICAgICAgdGhpcy5idXp6ZXJJbmRleCA9ICh0aGlzLmJ1enplckluZGV4ICsgMSkgJSA4O1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX1NPVU5ELCBQT1JUXzIsIDIyLCB0aGlzLmJ1enplckluZGV4KSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcHJvY2Vzc0NvbG9yKHJlZCxibHVlLGdyZWVuKXtcbiAgICAgICAgbGV0IHJIZXggPSByZWQ8PDg7XG5cdFx0bGV0IGdIZXggPSBncmVlbjw8MTY7XG5cdFx0bGV0IGJIZXggPSBibHVlPDwyNDtcblx0XHRsZXQgdmFsdWUgPSBySGV4IHwgZ0hleCB8IGJIZXg7XG5cdFx0dGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX1JHQixQT1JUXzYsMCx2YWx1ZSkpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZXZpY2UgaXMgZGlzY29ubmVjdGVkLicpO1xuICAgIH1cblxuXG4gICAgX2dlbmVyaWNDb250cm9sKHR5cGUsIHBvcnQsIHNsb3QsIHZhbHVlKSB7XG4gICAgICAgIC8qXG4gICAgICAgIGZmIDU1IGxlbiBpZHggYWN0aW9uIGRldmljZSBwb3J0ICBzbG90ICBkYXRhIGFcbiAgICAgICAgMCAgMSAgMiAgIDMgICA0ICAgICAgNSAgICAgIDYgICAgIDcgICAgIDhcbiAgICAgICAgKi9cbiAgICAgICAgLy8gU3RhdGljIHZhbHVlc1xuICAgICAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDE2KTtcbiAgICAgICAgdmFyIGJ1ZlZpZXcgPSBuZXcgVWludDE2QXJyYXkoYnVmKTtcblxuICAgICAgICB2YXIgYnl0ZTAgPSAweGZmLCAvLyBTdGF0aWMgaGVhZGVyXG4gICAgICAgICAgICBieXRlMSA9IDB4NTUsIC8vIFN0YXRpYyBoZWFkZXJcbiAgICAgICAgICAgIGJ5dGUyID0gMHgwOSwgLy8gbGVuXG4gICAgICAgICAgICBieXRlMyA9IDB4MDAsIC8vIGlkeFxuICAgICAgICAgICAgYnl0ZTQgPSAweDAyLCAvLyBhY3Rpb25cbiAgICAgICAgICAgIGJ5dGU1ID0gdHlwZSwgLy8gZGV2aWNlXG4gICAgICAgICAgICBieXRlNiA9IHBvcnQsIC8vIHBvcnRcbiAgICAgICAgICAgIGJ5dGU3ID0gc2xvdDsgLy8gc2xvdFxuICAgICAgICAvL2R5bmFtaWNzIHZhbHVlc1xuICAgICAgICB2YXIgYnl0ZTggPSAweDAwLCAvLyBkYXRhXG4gICAgICAgICAgICBieXRlOSA9IDB4MDAsIC8vIGRhdGFcbiAgICAgICAgICAgIGJ5dGUxMCA9IDB4MDAsIC8vIGRhdGFcbiAgICAgICAgICAgIGJ5dGUxMSA9IDB4MDA7IC8vIGRhdGFcbiAgICAgICAgLy9FbmQgb2YgbWVzc2FnZVxuICAgICAgICB2YXIgYnl0ZTEyID0gMHgwYSxcbiAgICAgICAgICAgIGJ5dGUxMyA9IDB4MDAsXG4gICAgICAgICAgICBieXRlMTQgPSAweDAwLFxuICAgICAgICAgICAgYnl0ZTE1ID0gMHgwMDtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVFlQRV9NT1RPUjpcbiAgICAgICAgICAgICAgICAvLyBNb3RvciBNMVxuICAgICAgICAgICAgICAgIC8vIGZmOjU1ICAwOTowMCAgMDI6MGEgIDA5OjY0ICAwMDowMCAgMDA6MDAgIDBhXCJcbiAgICAgICAgICAgICAgICAvLyAweDU1ZmY7MHgwMDA5OzB4MGEwMjsweDA5NjQ7MHgwMDAwOzB4MDAwMDsweDAwMGE7MHgwMDAwO1xuICAgICAgICAgICAgICAgIC8vIE1vdG9yIE0yXG4gICAgICAgICAgICAgICAgLy8gZmY6NTU6MDk6MDA6MDI6MGE6MGE6NjQ6MDA6MDA6MDA6MDA6MGEgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBWYWx1ZSA9IHZhbHVlIDwgMCA/IChwYXJzZUludChcImZmZmZcIiwgMTYpICsgTWF0aC5tYXgoLTI1NSwgdmFsdWUpKSA6IE1hdGgubWluKDI1NSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJ5dGU3ID0gdGVtcFZhbHVlICYgMHgwMGZmO1xuICAgICAgICAgICAgICAgIGJ5dGU4ID0gMHgwMDtcbiAgICAgICAgICAgICAgICBieXRlOCA9IHRlbXBWYWx1ZSA+PiA4O1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRZUEVfUkdCOlxuICAgICAgICAgICAgICAgIC8vIGZmOjU1ICAwOTowMCAgMDI6MDggIDA2OjAwICA1Yzo5OSAgNmQ6MDAgIDBhXG4gICAgICAgICAgICAgICAgLy8gMHg1NWZmOzB4MDAwOTsweDA4MDI7MHgwMDA2OzB4OTk1YzsweDAwNmQ7MHgwMDBhOzB4MDAwMDtcbiAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDA7XG4gICAgICAgICAgICAgICAgYnl0ZTggPSB2YWx1ZSA+PiA4ICYgMHhmZjtcbiAgICAgICAgICAgICAgICBieXRlOSA9IHZhbHVlID4+IDE2ICYgMHhmZjtcbiAgICAgICAgICAgICAgICBieXRlMTAgPSB2YWx1ZSA+PiAyNCAmIDB4ZmY7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRZUEVfU09VTkQ6XG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjowMDowMDowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MDY6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOmVlOjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo4ODowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6Yjg6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjVkOjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo0YTowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MjY6MDE6MGFcbiAgICAgICAgICAgICAgICBieXRlMiA9IDB4MDU7XG4gICAgICAgICAgICAgICAgYnl0ZTUgPSAweDIyO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4MDA7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgwNjtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweGVlO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4ODg7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHhiODtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDVkO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gNikge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4NGE7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4MjY7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZTggPSAweDBhO1xuICAgICAgICAgICAgICAgIGJ5dGUxMiA9IDB4MDA7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGJ1ZlZpZXdbMF0gPSBieXRlMSA8PCA4IHwgYnl0ZTA7XG4gICAgICAgIGJ1ZlZpZXdbMV0gPSBieXRlMyA8PCA4IHwgYnl0ZTI7XG4gICAgICAgIGJ1ZlZpZXdbMl0gPSBieXRlNSA8PCA4IHwgYnl0ZTQ7XG4gICAgICAgIGJ1ZlZpZXdbM10gPSBieXRlNyA8PCA4IHwgYnl0ZTY7XG4gICAgICAgIGJ1ZlZpZXdbNF0gPSBieXRlOSA8PCA4IHwgYnl0ZTg7XG4gICAgICAgIGJ1ZlZpZXdbNV0gPSBieXRlMTEgPDwgOCB8IGJ5dGUxMDtcbiAgICAgICAgYnVmVmlld1s2XSA9IGJ5dGUxMyA8PCA4IHwgYnl0ZTEyO1xuICAgICAgICBidWZWaWV3WzddID0gYnl0ZTE1IDw8IDggfCBieXRlMTQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYnl0ZTAudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTIudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTMudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTQudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTUudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTYudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTcudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTgudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTkudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEwLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxMS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTIudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEzLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxNC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTUudG9TdHJpbmcoMTYpICsgXCI6XCJcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBidWZWaWV3WzBdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbMV0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1syXS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzNdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbNF0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s1XS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzZdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbN10udG9TdHJpbmcoMTYpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgX3dyaXRlQ2hhcmFjdGVyaXN0aWModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuc2VydmljZSgpKVxuICAgICAgICAgICAgLnRoZW4oc2VydmljZSA9PiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmNoYXJhdGVyaXN0aWMoKSkpXG4gICAgICAgICAgICAudGhlbihjaGFyYWN0ZXJpc3RpYyA9PiBjaGFyYWN0ZXJpc3RpYy53cml0ZVZhbHVlKHZhbHVlKSk7XG4gICAgfVxuXG5cbn1cblxuXG4iLCIndXNlIHN0cmljdCdcblxuY2xhc3MgTXlvQ29uZmlne1xuICAgIGNvbnN0cnVjdG9yKCl7ICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgY29udHJvbFNlcnZpY2UoKSB7IHJldHVybiBcImQ1MDYwMDAxLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cbiAgICBnZXN0dXJlU2VydmljZSgpIHsgcmV0dXJuIFwiZDUwNjAwMDMtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIGNvbW1hbmRDaGFyYWN0ZXJpc3RpYygpIHsgcmV0dXJuIFwiZDUwNjA0MDEtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIGdlc3R1cmVDaGFyYWN0ZXJpc3RpYygpIHsgcmV0dXJuIFwiZDUwNjAxMDMtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIFxuXG59XG5cbmV4cG9ydCBjbGFzcyBNeW9Db250cm9sZXJ7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBNeW9Db25maWcoKTtcbiAgICAgICAgdGhpcy5vbkRpc2Nvbm5lY3RlZCA9IHRoaXMub25EaXNjb25uZWN0ZWQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQgPSBuZXcgVWludDhBcnJheSg1KTtcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbMF0gPSAweDAxOyAvLyBzZXQgbW9kZVxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFsxXSA9IDB4MDM7IC8vIGJ5dGVzIGluIHBheWxvYWRcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbMl0gPSAweDAwOyAvLyBlbWcgbW9kZTogbm9uZVxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFszXSA9IDB4MDA7IC8vIGltdSBtb2RlOiBkaXNhYmxlZFxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFs0XSA9IDB4MDE7IC8vIGNsYXNzaWZpZXIgbW9kZTogZW5hYmxlZFxuXG4gICAgICAgIHRoaXMuZGlzYWJsZUdlc3R1cmVzQ29tbWFuZCA9IFVpbnQ4QXJyYXkuZnJvbSh0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZUdlc3R1cmVzQ29tbWFuZFs0XSA9IDB4MDA7IC8vIGNsYXNzaWZpZXIgbW9kZTogZGlzYWJsZWRcblxuICAgICAgICB0aGlzLmRlZXBTbGVlcENvbW1hbmQgPSBuZXcgVWludDhBcnJheSgyKTtcbiAgICAgICAgdGhpcy5kZWVwU2xlZXBDb21tYW5kWzBdID0gMHgwNDsgLy8gc2V0IG1vZGVcbiAgICAgICAgdGhpcy5kZWVwU2xlZXBDb21tYW5kWzFdID0gMHgwMDsgLy8gYnl0ZXMgaW4gcGF5bG9hZFxuXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZWx0UG9wdXAgPSBudWxsO1xuICAgICAgICB0aGlzXG4gICAgfVxuXG4gICAgLypcbiAgICBSZXF1ZXN0IHRoZSBkZXZpY2Ugd2l0aCBibHVldG9vdGhcbiAgICAqL1xuICAgIHJlcXVlc3QoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgXCJmaWx0ZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcuY29udHJvbFNlcnZpY2UoKV1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgXCJvcHRpb25hbFNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5nZXN0dXJlU2VydmljZSgpXVxuICAgICAgICB9OyAgICAgICAgXG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYmx1ZXRvb3RoLnJlcXVlc3REZXZpY2Uob3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGRldmljZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UgPSBkZXZpY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UuYWRkRXZlbnRMaXN0ZW5lcignZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZCcsIHRoaXMub25EaXNjb25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXZpY2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25uZWN0IHRvIHRoZSBkZXZpY2VcbiAgICAgKiAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaW5pdCgpe1xuICAgICAgICBpZighdGhpcy5kZXZpY2Upe1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZWx0UG9wdXApe1xuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtzdGF0ZSA6ICdhZGQnfSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuY29udHJvbFNlcnZpY2UoKSlcbiAgICAgICAgICAgIC50aGVuKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBnZXQgTXlvIENvbnRyb2wgU2VydmljZScpO1xuICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5jb21tYW5kQ2hhcmFjdGVyaXN0aWMoKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoY2hhcmFjdGVyaXN0aWMpPT57XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBnZXQgTXlvIENvbW1hbmQgY2hhcmFjdGVyaXN0aWMnKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXJpc3RpYy53cml0ZVZhbHVlKHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlYWR5IHRvIGxpc3RlbiBnZXN0dXJlcycpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyR2VzdHVyZXMoY2FsbGJhY2spe1xuICAgICAgICBpZighdGhpcy5kZXZpY2Upe1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmRldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKHRoaXMuY29uZmlnLmdlc3R1cmVTZXJ2aWNlKCkpXG4gICAgICAgICAgICAudGhlbihzZXJ2aWNlPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gR2V0IEdlc3R1cmUgU2VydmljZScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmdlc3R1cmVDaGFyYWN0ZXJpc3RpYygpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChjaGFyYWN0ZXJpc3RpYykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHZXQgZ2VzdHVyZSBjYXJhY3RlcmlzdGljJylcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpYy5zdGFydE5vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpYy5hZGRFdmVudExpc3RlbmVyKCdjaGFyYWN0ZXJpc3RpY3ZhbHVlY2hhbmdlZCcsIChldikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnZXN0dXJlID0gdGhpcy5fcGFyc2VNeW9HZXN0dXJlKGV2LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHZXN0dXJlIDogJywgZ2VzdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhnZXN0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe3N0YXRlIDogJ3JlbW92ZSd9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGlzY29ubmVjdGVkKCkge1xuICAgICAgICB0aGlzLl9tYW5hZ2VQb3B1cEVsdCh7c3RhdGUgOiAncmVtb3ZlJ30pO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZygnRGV2aWNlIGlzIGRpc2Nvbm5lY3RlZC4nKTtcbiAgICB9XG5cbiAgICBfcGFyc2VNeW9HZXN0dXJlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZS5nZXRVaW50OCgwKSA9PT0gMHgwMykge1xuICAgICAgICAgICAgY29uc3QgZ2VzdHVyZVZhbHVlID0gdmFsdWUuZ2V0VWludDE2KDEsIHRydWUpXG4gICAgICAgICAgICBjb25zdCBnZXN0dXJlID0ge1xuICAgICAgICAgICAgICAgIDB4MDAwMDogJ3Jlc3QnLFxuICAgICAgICAgICAgICAgIDB4MDAwMTogJ2Zpc3QnLFxuICAgICAgICAgICAgICAgIDB4MDAwMjogJ3dhdmUtaW4nLFxuICAgICAgICAgICAgICAgIDB4MDAwMzogJ3dhdmUtb3V0JyxcbiAgICAgICAgICAgICAgICAweDAwMDQ6ICdmaW5nZXJzLXNwcmVhZCcsXG4gICAgICAgICAgICAgICAgMHgwMDA1OiAnZG91YmxlLXRhcCcsXG4gICAgICAgICAgICAgICAgMHhmZmZmOiAndW5rbm93bicsXG4gICAgICAgICAgICB9W2dlc3R1cmVWYWx1ZV1cbiAgICAgICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtnZXN0dXJlIDogZ2VzdHVyZX0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgZ2VzdHVyZSB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2VzdHVyZTogbnVsbCB9XG4gICAgfVxuXG4gICAgX21hbmFnZVBvcHVwRWx0KHtzdGF0ZT0gJ25vbmUnLCBnZXN0dXJlID0gJ25vbmUnfSl7XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gJ3JlbW92ZScgJiYgdGhpcy5lbHRQb3B1cCl7XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cCA9IG51bGw7XG4gICAgICAgIH1lbHNlIGlmIChzdGF0ZSA9PT0gJ2FkZCcpe1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5jbGFzc0xpc3QuYWRkKCdteW8tcG9wdXAnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbHRQb3B1cCk7XG4gICAgICAgIH1lbHNlIGlmICh0aGlzLmVsdFBvcHVwICYmIGdlc3R1cmUgJiYgZ2VzdHVyZSAhPSAnbm9uZScpe1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5jbGFzcyA9IGBteW8tcG9wdXAgJHtnZXN0dXJlfWA7XG4gICAgICAgIH1cbiAgICB9XG59Il19
