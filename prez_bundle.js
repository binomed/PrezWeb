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
			row: 1,
			width: '400px'
		}, {
			row: 2,
			width: '400px'
		}, {
			row: 3,
			width: '450px'
		}, {
			row: 4,
			width: '600px'
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

			document.getElementById('google-assistant').addEventListener('click', function (_) {
				_this2._voiceCallBack();
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
				if (finalStr.toLowerCase().includes('ça va')) {
					document.getElementById('demoSpeech').style.display = 'none';
					_this3.speechSynthesis.speak({
						value: 'je vais très bien merci. Comment se passe ta conférence ? François est-il gentil avec toi ?'
					}).then(function (_) {
						return _this3._voiceCallBack.bind(_this3);
					}).catch(function (error) {
						console.error(error);
					});
				} else if (finalStr.toLowerCase().includes('anglais')) {
					_this3.speechSynthesis.speak({
						value: 'hello every one, welcome to the best talk of this event !',
						langFr: false }).then(function (_) {
						return _this3._voiceCallBack.bind(_this3);
					}).catch(function (error) {
						console.error(error);
					});
				} else if (finalStr.toLowerCase().includes('voix')) {
					_this3.speechSynthesis.speak({
						value: 'comme ça c\'est assez bizarre pour toi ?',
						pitch: 2,
						rate: 0.3 }).then(function (_) {
						return _this3._voiceCallBack.bind(_this3);
					}).catch(function (error) {
						console.error(error);
					});
				} else if (finalStr.toLowerCase().includes('sommes-nous')) {
					_this3.speechSynthesis.speak({
						value: 'Voyons François, nous sommes dans ta session, je trouve que tu n\'as pas l\'air très réveillé'
					}).then(function (_) {
						return _this3._voiceCallBack.bind(_this3);
					}).catch(function (error) {
						console.error(error);
					});
				} else if (finalStr.toLowerCase().includes('suivant')) {
					_this3.speechSynthesis.speak({
						value: 'Très bien passons au slide suivant'
					}).then(function (_) {
						return Reveal.next();
					}).catch(function (error) {
						console.error(error);
					});
				} else {
					var unknowArray = ['Articule s\'il te plait', 'Kamoulox !', 'Tu pourrais faire un effort quand même', 'Retire ton chewing gum avant de parler'];
					_this3.speechSynthesis.speak({
						value: unknowArray[Math.floor(Math.random() * unknowArray.length)]
					}).then(function (_) {
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
        this.voiceEN = null;
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
                    console.debug("%s, %O ", voices[i].lang, voices[i]);
                    this.voiceFR = voices[i];
                } else if (voices[i].lang === 'en-GB') {
                    console.debug("%s, %O ", voices[i].lang, voices[i]);
                    this.voiceEN = voices[i];
                }
            }
        }
    }, {
        key: 'speak',
        value: function speak(_ref) {
            var _this = this;

            var value = _ref.value;
            var _ref$langFr = _ref.langFr;
            var langFr = _ref$langFr === undefined ? true : _ref$langFr;
            var _ref$pitch = _ref.pitch;
            var pitch = _ref$pitch === undefined ? 1 : _ref$pitch;
            var _ref$rate = _ref.rate;
            var rate = _ref$rate === undefined ? 1 : _ref$rate;

            return new Promise(function (resolve, reject) {

                if (!_this.voiceFR) {
                    reject();
                }
                var utterThis = new SpeechSynthesisUtterance(value);
                utterThis.voice = langFr ? _this.voiceFR : _this.voiceEN;
                utterThis.pitch = pitch;
                utterThis.rate = rate;
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
                console.debug('Confidence: ' + finalStr);
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
                console.debug('End of recognition');
                _this.recognition.stop();
            };
            // We detect errors
            this.recognition.onerror = function (event) {
                if (event.error == 'no-speech') {
                    console.debug('No Speech');
                }
                if (event.error == 'audio-capture') {
                    console.debug('No microphone');
                }
                if (event.error == 'not-allowed') {
                    console.debug('Not Allowed');
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyIsInNjcmlwdHMvcHJlei5qcyIsInNjcmlwdHMvcHJlei9oaWdobGlnaHRFdmVudHMuanMiLCJzY3JpcHRzL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzIiwic2NyaXB0cy9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMiLCJzY3JpcHRzL3NlbnNvcnMvc3BlZWNoU3ludGhlc2lzQ29udHJvbGVyLmpzIiwic2NyaXB0cy9zZW5zb3JzL3ZvaWNlUmVjb2duaXRpb25Db250cm9sZXIuanMiLCJzY3JpcHRzL3dlYmJsdWV0b290aC9tYm90Q29udHJvbGVyLmpzIiwic2NyaXB0cy93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNLGNBQWMsSUFBcEI7QUFDQSxJQUFNLHFCQUFxQixHQUEzQjtBQUNBLElBQU0sWUFBWSxFQUFsQjs7SUFFYSxtQixXQUFBLG1CO0FBQ1osb0NBQW9DO0FBQUEsTUFBdkIsTUFBdUIsUUFBdkIsTUFBdUI7QUFBQSxNQUFmLGFBQWUsUUFBZixhQUFlOztBQUFBOztBQUNuQyxPQUFLLFdBQUwsR0FBbUIsU0FBUyxjQUFULGdCQUFxQyxNQUFyQyxDQUFuQjtBQUNBLE9BQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQSxTQUFPLGdCQUFQLFdBQWdDLE1BQWhDLEVBQTBDLEtBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBMUM7QUFDQSxTQUFPLGdCQUFQLGdCQUFxQyxNQUFyQyxFQUErQyxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQStCLElBQS9CLENBQS9DO0FBQ0E7Ozs7b0NBRWlCLEssRUFBTTtBQUN2QixPQUFHO0FBQ0YsUUFBSSxNQUFNLElBQU4sS0FBZSxlQUFuQixFQUFt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bnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcblxuY29uc3QgTElORV9IRUlHSFQgPSAxLjE1O1xuY29uc3QgQURESVRJT05OQUxfSEVJR0hUID0gMC40O1xuY29uc3QgQ09MX1dJRFRIID0gMzU7XG5cbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRDb2RlSGVscGVye1xuXHRjb25zdHJ1Y3Rvcih7a2V5RWx0LCBwb3NpdGlvbkFycmF5fSl7XG5cdFx0dGhpcy5lbHRIaWdsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBoaWdobGlnaHQtJHtrZXlFbHR9YCk7XG5cdFx0dGhpcy5wb3NpdGlvbkFycmF5ID0gcG9zaXRpb25BcnJheTtcblxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKGBjb2RlLSR7a2V5RWx0fWAsIHRoaXMuX2xpc3RlbkZyYWdtZW50cy5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcihgc3RvcC1jb2RlLSR7a2V5RWx0fWAsIHRoaXMuX3VucmVnaXN0ZXJGcmFnbWVudHMuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRfcHJvZ3Jlc3NGcmFnbWVudChldmVudCl7XG5cdFx0dHJ5e1x0XHRcdFxuXHRcdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdmcmFnbWVudHNob3duJyl7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gK2V2ZW50LmZyYWdtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudC1pbmRleCcpO1xuXHRcdFx0XHRjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4XTtcblx0XHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRcdFx0aWYgKGtleSA9PT0gJ3Jvdycpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsndG9wJ10gPSBgY2FsYyg5MHB4ICsgKCR7cHJvcGVydGllc1trZXldfSAqICR7TElORV9IRUlHSFR9ZW0pKWA7XG5cdFx0XHRcdFx0fWVsc2UgaWYgKGtleSA9PT0gJ2NvbCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnbGVmdCddID0gYGNhbGMoNjBweCArICgke3Byb3BlcnRpZXNba2V5XX0gKiAke0NPTF9XSURUSH1weCkpYDtcblx0XHRcdFx0XHR9ZWxzZSBpZiAoa2V5ID09PSAnY2FsY0hlaWdodCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSBgY2FsYygke3Byb3BlcnRpZXNba2V5XX1lbSArICR7QURESVRJT05OQUxfSEVJR0hUfWVtKWA7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XHRcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSArZXZlbnQuZnJhZ21lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWZyYWdtZW50LWluZGV4Jyk7XG5cdFx0XHRcdC8vIE9uIHJlc2V0IGxlcyBwcm9wZXJ0aWVzXG5cdFx0XHRcdGxldCBwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4XTtcblx0XHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0XHRcdGlmIChrZXkgPT09ICdyb3cnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ3RvcCddID0gJyc7XG5cdFx0XHRcdFx0fWVsc2UgaWYoa2V5ID09PSAnY2FsY0hlaWdodCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSAnJztcblx0XHRcdFx0XHR9ZWxzZSBpZiAoa2V5ID09PSAnY29sJyl7XG5cdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlWydsZWZ0J10gPSAnJztcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVba2V5XSA9ICcnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaW5kZXggPiAwKXtcdFx0XHRcblx0XHRcdFx0XHRwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4IC0gMV07XG5cdFx0XHRcdFx0a2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0XHRcdFx0aWYgKGtleSA9PT0gJ3Jvdycpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlWyd0b3AnXSA9IGBjYWxjKDkwcHggKyAoJHtwcm9wZXJ0aWVzW2tleV19ICogJHtMSU5FX0hFSUdIVH1lbSkpYDtcblx0XHRcdFx0XHRcdH1lbHNlIGlmIChrZXkgPT09ICdjb2wnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ2xlZnQnXSA9IGBjYWxjKDYwcHggKyAoJHtwcm9wZXJ0aWVzW2tleV19ICogJHtDT0xfV0lEVEh9cHgpKWA7XG5cdFx0XHRcdFx0fWVsc2UgaWYgKGtleSA9PT0gJ2NhbGNIZWlnaHQnKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSBgY2FsYygke3Byb3BlcnRpZXNba2V5XX1lbSArICR7QURESVRJT05OQUxfSEVJR0hUfWVtKWA7XG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVtrZXldID0gcHJvcGVydGllc1trZXldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVx0XHRcdFxuXHRcdFx0fVxuXHRcdH1jYXRjaChlKXt9XG5cdH1cblxuXHRfbGlzdGVuRnJhZ21lbnRzKCl7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZyYWdtZW50c2hvd24nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdmcmFnbWVudGhpZGRlbicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRfdW5yZWdpc3RlckZyYWdtZW50cygpe1xuXHRcdFJldmVhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRoaWRkZW4nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHR9XG5cblx0XG59XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7UmV2ZWFsRW5naW5lRXZlbnRzfSBmcm9tICcuL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzJztcblxuXG4oZnVuY3Rpb24gKCkge1xuXG5cbiAgICBmdW5jdGlvbiBwYWdlTG9hZCgpIHtcbiAgICAgICAgbmV3IFJldmVhbEVuZ2luZUV2ZW50cygpO1xuICAgIH1cblxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBwYWdlTG9hZCk7XG59KSgpOyIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQge0hpZ2hsaWdodENvZGVIZWxwZXJ9IGZyb20gJy4uL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyc7XG5cbmNvbnN0IExJTkVfSEVJR0hUID0gMS4xNTtcbmNvbnN0IEFERElUSU9OTkFMX0hFSUdUID0gMC40O1xuY29uc3QgQ09MX1dJRFRIID0gMzU7XG5cbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRFdmVudHN7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0Ly8gIEJsdWV0b290aDogU2NhbiArIENvbm5lY3QgXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0IDogJ2Nvbm5lY3QtYmxlJyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW3tcblx0XHRcdFx0cm93IDogMSxcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRyb3cgOiA2LFxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXG5cdFx0XHR9XVxuXHRcdH0pO1xuXG5cdFx0Ly8gIEJsZSBDb2RlIFJlYWQgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAncmVhZC1jaGFyYWN0Jyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW3tcblx0XHRcdFx0cm93IDogMyxcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRyb3cgOiA1LFxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXG5cdFx0XHR9XVxuXHRcdH0pXG5cblx0XHQvLyAgQmxlIENvZGUgV3JpdGUgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAnd3JpdGUtY2hhcmFjdCcsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0cm93IDogOCxcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xuXHRcdFx0fV1cblx0XHR9KVxuXG5cdFx0Ly8gIEJsZSBDb2RlIFJlYWQgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAnbm90aWYtY2hhcmFjdCcsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0cm93IDogNSxcblx0XHRcdFx0d2lkdGggOiAnOTAlJyxcblx0XHRcdFx0aGVpZ2h0OiAnMTg2cHgnXG5cdFx0XHR9XVxuXHRcdH0pXG5cblxuXG5cdC8vIENvZGUgVXNlciBNZWRpYSAxXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd1c2VyLW1lZGlhLXYyJyxcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFtcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNSxcblx0XHRcdFx0d2lkdGggOiAnNzAwcHgnLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNixcblx0XHRcdFx0bGVmdCA6ICcxNTBweCcsXG5cdFx0XHRcdHdpZHRoIDogJzEwMHB4Jyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDcsXG5cdFx0XHRcdGxlZnQgOiAnMTAwcHgnLFxuXHRcdFx0XHR3aWR0aCA6ICc3MDBweCcsXG5cdFx0XHR9XG5cdFx0XHRdfSk7XG5cblxuXHRcblx0Ly8gQ29kZSBXZWIgU3BlZWNoXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd3ZWItc3BlZWNoJywgXG5cdFx0XHRwb3NpdGlvbkFycmF5Oltcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMSxcblx0XHRcdFx0d2lkdGggOiAnNDAwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAyLFxuXHRcdFx0XHR3aWR0aCA6ICc1MDBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzU1MHB4J1x0XHRcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNSxcblx0XHRcdFx0d2lkdGggOiAnMzAwcHgnXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiA2LFxuXHRcdFx0XHR3aWR0aCA6ICczMDBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDcsXHRcdFx0XHRcblx0XHRcdFx0bGVmdCA6ICcyODBweCcsXG5cdFx0XHRcdHdpZHRoIDogJzQ1MHB4J1xuXHRcdFx0fVxuXHRcdFx0XX0pO1xuXG5cdC8vIENvZGUgV2ViIFNwZWVjaCBHcmFtbWFyXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd3ZWItc3BlZWNoLWdyYW1tYXInLCBcblx0XHRcdHBvc2l0aW9uQXJyYXkgOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDIsXG5cdFx0XHRcdHdpZHRoIDogJzc1MHB4J1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMyxcblx0XHRcdFx0d2lkdGggOiAnNzAwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiA0LFxuXHRcdFx0XHR3aWR0aCA6ICc2NTBweCdcblx0XHRcdH1cblx0XHRcdF19KTtcblxuXHQvLyBDb2RlIFdlYiBTcGVlY2ggU3ludGhlc2lzXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd3ZWItc3BlZWNoLXN5bnRoZXNpcycsIFxuXHRcdFx0cG9zaXRpb25BcnJheTogW1xuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAxLFxuXHRcdFx0XHR3aWR0aCA6ICc0MDBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDIsXG5cdFx0XHRcdHdpZHRoIDogJzQwMHB4J1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMyxcblx0XHRcdFx0d2lkdGggOiAnNDUwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiA0LFxuXHRcdFx0XHR3aWR0aCA6ICc2MDBweCdcblx0XHRcdH1cblx0XHRcdF19KTtcblxuXG5cdC8vIENvZGUgd3JpdGUgbmZjXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd3cml0ZS1uZmMnLCBcblx0XHRcdHBvc2l0aW9uQXJyYXkgOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDEsXG5cdFx0XHRcdGNvbCA6IDEsXG5cdFx0XHRcdHdpZHRoIDogJzEwNTBweCdcblx0XHRcdH1cblx0XHRcdF19KTtcblx0XG5cdC8vIENvZGUgcmVhZCBuZmNcblx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0IDogJ3JlYWQtbmZjJywgXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW1xuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAwLFxuXHRcdFx0XHRsZWZ0OiAnMzMwcHgnLFxuXHRcdFx0XHR3aWR0aCA6ICcxNTBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDEsXG5cdFx0XHRcdGxlZnQ6ICc5MHB4Jyxcblx0XHRcdFx0d2lkdGggOiAnNTUwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAyLFxuXHRcdFx0XHRsZWZ0OiAnNTUwcHgnLFxuXHRcdFx0XHRjYWxjSGVpZ2h0OiAzLFxuXHRcdFx0XHR3aWR0aCA6ICczMDBweCdcblx0XHRcdH1cblx0XHRcdF19KTtcblxuXHR9XG59XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7SGlnaGxpZ2h0RXZlbnRzfSBmcm9tICcuL2hpZ2hsaWdodEV2ZW50cy5qcyc7XG5pbXBvcnQge0JsZVByZXpDb250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvYmxlUHJlekNvbnRyb2xlci5qcyc7XG5pbXBvcnQge1ZvaWNlUmVjb2duaXRpb25Db250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvdm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlci5qcyc7XG5pbXBvcnQge1NwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcn0gZnJvbSAnLi4vc2Vuc29ycy9zcGVlY2hTeW50aGVzaXNDb250cm9sZXIuanMnO1xuXG5cbmV4cG9ydCBjbGFzcyBSZXZlYWxFbmdpbmVFdmVudHN7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFxuXHRcdGxldCBpbklGcmFtZSA9IHdpbmRvdy50b3AgIT0gd2luZG93LnNlbGY7XG5cdFx0XG5cdFx0Ly8gTWFuYWdlbWVudCBvZiBhY3Rpb25zIGluIHByZXogbW9kZSAobm90IGluIHByZXZpZXcgbW9kZSlcblx0XHRpZiAoIWluSUZyYW1lKXtcblx0XHRcdFx0Ly8gSW5pdCBhbGwgYmxlIGFjdGlvbnNcblx0XHRcdFx0dGhpcy5fYmxlUHJlekNvbnRyb2xlciA9IG5ldyBCbGVQcmV6Q29udHJvbGVyKCk7XG5cdFx0XHRcdHRoaXMuX2JsZUV2ZW50cygpO1xuXG5cdFx0XHRcdC8vIEluaXQgVm9pY2UgYW5kIFNwZWVjaCBjb250cm9sZXJzXG5cdFx0XHRcdHRoaXMudm9pY2VSZWNvZ25pdGlvbiA9IG5ldyBWb2ljZVJlY29nbml0aW9uQ29udHJvbGVyKCk7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzID0gbmV3IFNwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcigpO1xuXHRcdFx0XHR0aGlzLl92b2ljZUV2ZW50cygpO1xuXHRcdH1cblxuXHRcdC8vIEluIGFsIGNhc2Ugd2UgaW5pdCB0aGUgaGlnaGxpZ2h0IG9mIGNvZGUuXG5cdFx0dGhpcy5faW5pdEhpZ2hsaWdodENvZGUoKTtcblxuXHR9XG5cblx0X2JsZUV2ZW50cygpe1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdzdG9wLWNvZGUtcmVhZC1jaGFyYWN0JywgZXZlbnQgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX2JsZVByZXpDb250cm9sZXIuX2N1cnJlbnRCbGVEZXZpY2UpIHtcblx0XHRcdFx0dGhpcy5fYmxlUHJlekNvbnRyb2xlci5fY3VycmVudEJsZURldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0X3ZvaWNlRXZlbnRzKCl7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvb2dsZS1hc3Npc3RhbnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF89Pntcblx0XHRcdHRoaXMuX3ZvaWNlQ2FsbEJhY2soKTtcblx0XHR9KTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZW5kLXJlY29nbml0aW9uJywgXz0+e1xuXHRcdFx0dHJ5e1xuXHRcdFx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24uc3RvcCgpO1xuXHRcdFx0fWNhdGNoKGUpe31cblx0XHR9KVxuXHR9XG5cblx0X3ZvaWNlQ2FsbEJhY2soKXtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtb1NwZWVjaCcpLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24uc3RhcnQoKGZpbmFsU3RyKT0+e1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZWVjaF9pbnB1dCcpLmlubmVySFRNTCA9IGZpbmFsU3RyO1xuXHRcdFx0aWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ8OnYSB2YScpKXtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW9TcGVlY2gnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6J2plIHZhaXMgdHLDqHMgYmllbiBtZXJjaS4gQ29tbWVudCBzZSBwYXNzZSB0YSBjb25mw6lyZW5jZSA/IEZyYW7Dp29pcyBlc3QtaWwgZ2VudGlsIGF2ZWMgdG9pID8nXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYW5nbGFpcycpKXtcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xuXHRcdFx0XHRcdHZhbHVlOiAnaGVsbG8gZXZlcnkgb25lLCB3ZWxjb21lIHRvIHRoZSBiZXN0IHRhbGsgb2YgdGhpcyBldmVudCAhJywgXG5cdFx0XHRcdFx0bGFuZ0ZyIDogZmFsc2V9XG5cdFx0XHRcdClcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1lbHNlIGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCd2b2l4Jykpe1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6ICdjb21tZSDDp2EgY1xcJ2VzdCBhc3NleiBiaXphcnJlIHBvdXIgdG9pID8nLFxuXHRcdFx0XHRcdHBpdGNoIDogMixcblx0XHRcdFx0XHRyYXRlIDogMC4zfVxuXHRcdFx0XHQpXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc29tbWVzLW5vdXMnKSl7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcblx0XHRcdFx0XHR2YWx1ZTogJ1ZveW9ucyBGcmFuw6dvaXMsIG5vdXMgc29tbWVzIGRhbnMgdGEgc2Vzc2lvbiwgamUgdHJvdXZlIHF1ZSB0dSBuXFwnYXMgcGFzIGxcXCdhaXIgdHLDqHMgcsOpdmVpbGzDqSdcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1lbHNlIGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdzdWl2YW50Jykpe1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6ICdUcsOocyBiaWVuIHBhc3NvbnMgYXUgc2xpZGUgc3VpdmFudCdcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXz0+UmV2ZWFsLm5leHQoKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0bGV0IHVua25vd0FycmF5ID0gW1xuXHRcdFx0XHRcdCdBcnRpY3VsZSBzXFwnaWwgdGUgcGxhaXQnLFxuXHRcdFx0XHRcdCdLYW1vdWxveCAhJyxcblx0XHRcdFx0XHQnVHUgcG91cnJhaXMgZmFpcmUgdW4gZWZmb3J0IHF1YW5kIG3Dqm1lJyxcblx0XHRcdFx0XHQnUmV0aXJlIHRvbiBjaGV3aW5nIGd1bSBhdmFudCBkZSBwYXJsZXInXG5cdFx0XHRcdF07XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcblx0XHRcdFx0XHR2YWx1ZTogdW5rbm93QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5rbm93QXJyYXkubGVuZ3RoKV1cblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRcblxuXHRfaW5pdEhpZ2hsaWdodENvZGUoKSB7XG5cblx0XHRuZXcgSGlnaGxpZ2h0RXZlbnRzKCk7XG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHtNeW9Db250cm9sZXJ9IGZyb20gJy4uL3dlYmJsdWV0b290aC9teW9Db250cm9sZXIuanMnO1xuaW1wb3J0IHtNQm90fSBmcm9tICcuLi93ZWJibHVldG9vdGgvbWJvdENvbnRyb2xlci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCbGVQcmV6Q29udHJvbGVye1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcblx0XHR0aGlzLl9jdXJyZW50QmxlRGV2aWNlID0gbnVsbDtcblx0XHR0aGlzLl9iYXNpY0JsZUJpbmRpbmcoKTtcblx0XHR0aGlzLl9teW9CaW5kaW5nKCk7XG5cdFx0Ly8gSnVzdCBjb21tZW50IG1ib3QgcGFydCBiZWNhdXNlIGl0IGNhbiBhbHdheXMgYmUgdXNlZnVsbCAhXG5cdFx0Ly90aGlzLl9tYm90QmluZGluZygpO1xuXHR9XG5cblx0X2Jhc2ljQmxlQmluZGluZygpIHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdEJsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuXHRcdFx0XG5cdFx0XHRjb25zdCBmaWx0ZXJzID0geyBmaWx0ZXJzOiBbeyBzZXJ2aWNlczogWydiYXR0ZXJ5X3NlcnZpY2UnXSB9XSB9O1xuXHRcdFx0bmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKGZpbHRlcnMpXG5cdFx0XHQudGhlbihkZXZpY2UgPT4gZGV2aWNlLmdhdHQuY29ubmVjdCgpKVxuXHRcdFx0LnRoZW4oc2VydmVyID0+IHsgXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdCbHVldG9vdGggZGV2aWNlIGlzIGNvbm5lY3RlZC4nKTtcblx0XHRcdFx0dGhpcy5fY3VycmVudEJsZURldmljZSA9IHNlcnZlci5kZXZpY2U7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVhZENoYXJhY3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcblx0XHRcdFxuXHRcdFx0dGhpcy5fY3VycmVudEJsZURldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKCdiYXR0ZXJ5X3NlcnZpY2UnKVxuXHRcdFx0LnRoZW4oc2VydmljZSA9PiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKCdiYXR0ZXJ5X2xldmVsJykpXG5cdFx0XHQudGhlbihjaGFyYWN0ZXJpc3RpYyA9PiBjaGFyYWN0ZXJpc3RpYy5yZWFkVmFsdWUoKSlcblx0XHRcdC50aGVuKHZhbHVlID0+IHtcblx0XHRcdFx0Y29uc3QgYmF0dGVyeUxldmVsID0gdmFsdWUuZ2V0VWludDgoMCk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGBCYXR0ZXJ5IHBlcmNlbnRhZ2UgaXMgJHtiYXR0ZXJ5TGV2ZWx9JS5gKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0X215b0JpbmRpbmcoKXtcblx0XHRsZXQgbGFzdERvdWJsZVRhcCA9IDA7XG5cdFx0bGV0IG15byA9IG5ldyBNeW9Db250cm9sZXIoKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdE15bycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9Pntcblx0XHRcdFxuXHRcdFx0aWYgKCFteW8uY29ubmVjdGVkKXtcblx0XHRcdFx0bXlvLnJlcXVlc3QoKVxuXHRcdFx0XHQudGhlbihfPT5teW8uY29ubmVjdCgpKVxuXHRcdFx0XHQudGhlbigoKT0+bXlvLmluaXQoKSlcblx0XHRcdFx0LnRoZW4oKCk9Pm15by5yZWdpc3Rlckdlc3R1cmVzKChnZXN0dXJlKT0+e1xuXHRcdFx0XHRcdGlmIChnZXN0dXJlICYmIGdlc3R1cmUuZ2VzdHVyZSA9PT0gJ2RvdWJsZS10YXAnKXtcblx0XHRcdFx0XHRcdGlmKERhdGUubm93KCkgLSBsYXN0RG91YmxlVGFwIDwgMjAwMCl7XG5cdFx0XHRcdFx0XHRcdFJldmVhbC5uZXh0KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRsYXN0RG91YmxlVGFwID0gRGF0ZS5ub3coKTtcblx0XHRcdFx0XHR9IFxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZGlzY29ubmVjdC1teW8nLCBfPT57XG5cdFx0XHRteW8uZGlzY29ubmVjdCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0X21ib3RCaW5kaW5nKCl7XG5cdFx0IC8vIENoZWNrIHRoZSBjb25uZWN0aW9uXG5cdFx0IGxldCBzdGVwQ29ubmVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25uZWN0TUJvdCcpO1xuXHRcdCBsZXQgc3RlcENvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydC1idXR0b24tbWJvdCcpOyBcblx0XHQgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0TUJvdFwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF8gPT4ge1xuXHRcdFx0Ly8gUmVxdWVzdCB0aGUgZGV2aWNlXG5cdFx0XHRsZXQgbUJvdCA9IG5ldyBNQm90KCk7XG5cdFx0XHRtQm90LnJlcXVlc3QoKVxuXHRcdFx0XHQudGhlbihfID0+IHtcblx0XHRcdFx0XHQvLyBDb25uZWN0IHRvIHRoZSBtYm90XG5cdFx0XHRcdFx0cmV0dXJuIG1Cb3QuY29ubmVjdCgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihfID0+IHtcblx0XHRcdFx0XHQvLyBDb25uZWN0aW9uIGlzIGRvbmUsIHdlIHNob3cgdGhlIGNvbnRyb2xzXG5cdFx0XHRcdFx0c3RlcENvbm5lY3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0XHRcdHN0ZXBDb250cm9sLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcblxuXHRcdFx0XHRcdGxldCBwYXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcnQtYnV0dG9uJyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQ29udHJvbCB0aGUgcm9ib3QgYnkgYnV0dG9uc1xuXHRcdFx0XHRcdGxldCBidG5VcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuVXAnKTtcblx0XHRcdFx0XHRsZXQgYnRuRG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuRG93bicpO1xuXHRcdFx0XHRcdGxldCBidG5MZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5MZWZ0Jyk7XG5cdFx0XHRcdFx0bGV0IGJ0blJpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5SaWdodCcpO1xuXG5cdFx0XHRcdFx0YnRuVXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKC0yNTAsIDI1MCkgfSk7XG5cdFx0XHRcdFx0YnRuRG93bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMjUwLCAtMjUwKSB9KTtcblx0XHRcdFx0XHRidG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigyNTAsIDI1MCkgfSk7XG5cdFx0XHRcdFx0YnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKC0yNTAsIC0yNTApIH0pO1xuXG5cdFx0XHRcdFx0YnRuVXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigwLCAwKSB9KTtcblx0XHRcdFx0XHRidG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XG5cdFx0XHRcdFx0YnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApIH0pO1xuXHRcdFx0XHRcdGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XG5cdFx0XHRcdFx0XG5cblx0XHRcdFx0fSlcblx0XHR9KTtcblx0fVxuXG59XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNsYXNzIFNwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnN5bnRoID0gd2luZG93LnNwZWVjaFN5bnRoZXNpcztcblxuICAgICAgICB0aGlzLnZvaWNlRlIgPSBudWxsO1xuICAgICAgICB0aGlzLnZvaWNlRU4gPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICBfY29uZmlndXJlKCl7XG4gICAgICAgIHRoaXMuX3BvcHVsYXRlVm9pY2VMaXN0KCk7XG4gICAgICAgIGlmIChzcGVlY2hTeW50aGVzaXMub252b2ljZXNjaGFuZ2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNwZWVjaFN5bnRoZXNpcy5vbnZvaWNlc2NoYW5nZWQgPSB0aGlzLl9wb3B1bGF0ZVZvaWNlTGlzdC5iaW5kKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3BvcHVsYXRlVm9pY2VMaXN0KCkge1xuICAgICAgICBsZXQgdm9pY2VzID0gdGhpcy5zeW50aC5nZXRWb2ljZXMoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2b2ljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh2b2ljZXNbaV0ubGFuZyA9PT0gJ2ZyLUZSJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMudm9pY2VGUiA9IHZvaWNlc1tpXTtcbiAgICAgICAgICAgIH1lbHNlIGlmICh2b2ljZXNbaV0ubGFuZyA9PT0gJ2VuLUdCJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMudm9pY2VFTiA9IHZvaWNlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNwZWFrKHt2YWx1ZSwgbGFuZ0ZyID0gdHJ1ZSwgcGl0Y2ggPSAxLCByYXRlID0gMX0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+e1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMudm9pY2VGUikge1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHV0dGVyVGhpcyA9IG5ldyBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UodmFsdWUpO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnZvaWNlID0gbGFuZ0ZyID8gdGhpcy52b2ljZUZSIDogdGhpcy52b2ljZUVOO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnBpdGNoID0gcGl0Y2g7XG4gICAgICAgICAgICB1dHRlclRoaXMucmF0ZSA9IHJhdGU7XG4gICAgICAgICAgICB1dHRlclRoaXMub25lbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN5bnRoLnNwZWFrKHV0dGVyVGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgY2xhc3MgVm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBsZXQgU3BlZWNoUmVjb2duaXRpb24gPSBTcGVlY2hSZWNvZ25pdGlvbiB8fCB3ZWJraXRTcGVlY2hSZWNvZ25pdGlvblxuICAgICAgICBcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbiA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xuICAgICAgICB0aGlzLl9jb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICBzdGFydChjYWxsYmFjayl7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25yZXN1bHQgPSAoZXZlbnQpPT57XG4gICAgICAgICAgICBjb25zdCBmaW5hbFN0ciA9IGV2ZW50LnJlc3VsdHNbMF1bMF0udHJhbnNjcmlwdDtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ0NvbmZpZGVuY2U6ICcgKyBmaW5hbFN0cik7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZpbmFsU3RyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgc3RvcCgpe1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKTtcbiAgICB9XG5cbiAgICBfY29uZmlndXJlKCl7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ubGFuZyA9ICdmci1GUic7XG5cbiAgICAgICAgLy8gV2UgZGV0ZWN0IGVuZFxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZW5kID0gXz0+e1xuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnRW5kIG9mIHJlY29nbml0aW9uJyk7XG4gICAgICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gV2UgZGV0ZWN0IGVycm9yc1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5lcnJvciA9PSAnbm8tc3BlZWNoJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ05vIFNwZWVjaCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdhdWRpby1jYXB0dXJlJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ05vIG1pY3JvcGhvbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdub3QtYWxsb3dlZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdOb3QgQWxsb3dlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9OyAgICAgXG4gICAgfVxuXG5cbn0iLCIndXNlIHN0cmljdCdcbi8qKlxuICogQ29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9iaW5vbWVkL21ib3Qtd2ViYmx1ZXRvb3RoXG4gKiBcbiAqL1xuXG5cbmNvbnN0IERFVklDRV9OQU1FID0gXCJNYWtlYmxvY2tfTEVcIixcbiAgICBTRVJWSUNFX1VVSUQgPSBcIjAwMDBmZmUxLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiLFxuICAgIENIQVJBQ1RFUklTVElDX1VVSUQgPSBcIjAwMDBmZmUzLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiO1xuXG4vKipcbiAqIEdlbmVyYWwgY29uZmlndXJhdGlvbiAoVVVJRClcbiovXG5jbGFzcyBDb25maWcge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmFtZSgpIHsgcmV0dXJuIFwiTWFrZWJsb2NrX0xFXCI7IH1cbiAgICBzZXJ2aWNlKCkgeyByZXR1cm4gXCIwMDAwZmZlMS0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIiB9XG4gICAgY2hhcmF0ZXJpc3RpYygpIHsgcmV0dXJuIFwiMDAwMGZmZTMtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIgfVxufVxuXG4vLyBDb25zdCBmb3IgaW5zdHJ1Y3Rpb25zIHR5cGVzXG5jb25zdCBUWVBFX01PVE9SID0gMHgwYSxcbiAgICBUWVBFX1JHQiA9IDB4MDgsXG4gICAgVFlQRV9TT1VORCA9IDB4MDc7XG5cblxuLy8gQ29uc3QgZm9yIHRoZSBwb3J0c1xuY29uc3QgUE9SVF8xID0gMHgwMSxcbiAgICBQT1JUXzIgPSAweDAyLFxuICAgIFBPUlRfMyA9IDB4MDMsXG4gICAgUE9SVF80ID0gMHgwNCxcbiAgICBQT1JUXzUgPSAweDA1LFxuICAgIFBPUlRfNiA9IDB4MDYsXG4gICAgUE9SVF83ID0gMHgwNyxcbiAgICBQT1JUXzggPSAweDA4LFxuICAgIE1fMSA9IDB4MDksXG4gICAgTV8yID0gMHgwYTtcbiAgICBcblxuLyoqXG4gKiBDbGFzcyBmb3IgdGhlIHJvYm90XG4gKiAqL1xuZXhwb3J0IGNsYXNzIE1Cb3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRldmljZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdGVkID0gdGhpcy5vbkRpc2Nvbm5lY3RlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJ1enplckluZGV4ID0gMDtcbiAgICB9XG5cbiAgICAvKlxuICAgIFJlcXVlc3QgdGhlIGRldmljZSB3aXRoIGJsdWV0b290aFxuICAgICovXG4gICAgcmVxdWVzdCgpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcImZpbHRlcnNcIjogW3tcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogdGhpcy5jb25maWcubmFtZSgpXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFwib3B0aW9uYWxTZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcuc2VydmljZSgpXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihkZXZpY2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCB0aGlzLm9uRGlzY29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGV2aWNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29ubmVjdCB0byB0aGUgZGV2aWNlXG4gICAgICogKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udHJvbCB0aGUgbW90b3JzIG9mIHJvYm90XG4gICAgKi9cbiAgICBwcm9jZXNzTW90b3IodmFsdWVNMSwgdmFsdWVNMikge1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX01PVE9SLCBNXzEsIDAsIHZhbHVlTTEpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfTU9UT1IsIE1fMiwgMCwgdmFsdWVNMikpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcm9jZXNzQnV6emVyKCkge1xuICAgICAgICB0aGlzLmJ1enplckluZGV4ID0gKHRoaXMuYnV6emVySW5kZXggKyAxKSAlIDg7XG4gICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfU09VTkQsIFBPUlRfMiwgMjIsIHRoaXMuYnV6emVySW5kZXgpKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwcm9jZXNzQ29sb3IocmVkLGJsdWUsZ3JlZW4pe1xuICAgICAgICBsZXQgckhleCA9IHJlZDw8ODtcblx0XHRsZXQgZ0hleCA9IGdyZWVuPDwxNjtcblx0XHRsZXQgYkhleCA9IGJsdWU8PDI0O1xuXHRcdGxldCB2YWx1ZSA9IHJIZXggfCBnSGV4IHwgYkhleDtcblx0XHR0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfUkdCLFBPUlRfNiwwLHZhbHVlKSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZSBpcyBkaXNjb25uZWN0ZWQuJyk7XG4gICAgfVxuXG5cbiAgICBfZ2VuZXJpY0NvbnRyb2wodHlwZSwgcG9ydCwgc2xvdCwgdmFsdWUpIHtcbiAgICAgICAgLypcbiAgICAgICAgZmYgNTUgbGVuIGlkeCBhY3Rpb24gZGV2aWNlIHBvcnQgIHNsb3QgIGRhdGEgYVxuICAgICAgICAwICAxICAyICAgMyAgIDQgICAgICA1ICAgICAgNiAgICAgNyAgICAgOFxuICAgICAgICAqL1xuICAgICAgICAvLyBTdGF0aWMgdmFsdWVzXG4gICAgICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMTYpO1xuICAgICAgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50MTZBcnJheShidWYpO1xuXG4gICAgICAgIHZhciBieXRlMCA9IDB4ZmYsIC8vIFN0YXRpYyBoZWFkZXJcbiAgICAgICAgICAgIGJ5dGUxID0gMHg1NSwgLy8gU3RhdGljIGhlYWRlclxuICAgICAgICAgICAgYnl0ZTIgPSAweDA5LCAvLyBsZW5cbiAgICAgICAgICAgIGJ5dGUzID0gMHgwMCwgLy8gaWR4XG4gICAgICAgICAgICBieXRlNCA9IDB4MDIsIC8vIGFjdGlvblxuICAgICAgICAgICAgYnl0ZTUgPSB0eXBlLCAvLyBkZXZpY2VcbiAgICAgICAgICAgIGJ5dGU2ID0gcG9ydCwgLy8gcG9ydFxuICAgICAgICAgICAgYnl0ZTcgPSBzbG90OyAvLyBzbG90XG4gICAgICAgIC8vZHluYW1pY3MgdmFsdWVzXG4gICAgICAgIHZhciBieXRlOCA9IDB4MDAsIC8vIGRhdGFcbiAgICAgICAgICAgIGJ5dGU5ID0gMHgwMCwgLy8gZGF0YVxuICAgICAgICAgICAgYnl0ZTEwID0gMHgwMCwgLy8gZGF0YVxuICAgICAgICAgICAgYnl0ZTExID0gMHgwMDsgLy8gZGF0YVxuICAgICAgICAvL0VuZCBvZiBtZXNzYWdlXG4gICAgICAgIHZhciBieXRlMTIgPSAweDBhLFxuICAgICAgICAgICAgYnl0ZTEzID0gMHgwMCxcbiAgICAgICAgICAgIGJ5dGUxNCA9IDB4MDAsXG4gICAgICAgICAgICBieXRlMTUgPSAweDAwO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBUWVBFX01PVE9SOlxuICAgICAgICAgICAgICAgIC8vIE1vdG9yIE0xXG4gICAgICAgICAgICAgICAgLy8gZmY6NTUgIDA5OjAwICAwMjowYSAgMDk6NjQgIDAwOjAwICAwMDowMCAgMGFcIlxuICAgICAgICAgICAgICAgIC8vIDB4NTVmZjsweDAwMDk7MHgwYTAyOzB4MDk2NDsweDAwMDA7MHgwMDAwOzB4MDAwYTsweDAwMDA7XG4gICAgICAgICAgICAgICAgLy8gTW90b3IgTTJcbiAgICAgICAgICAgICAgICAvLyBmZjo1NTowOTowMDowMjowYTowYTo2NDowMDowMDowMDowMDowYSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgdGVtcFZhbHVlID0gdmFsdWUgPCAwID8gKHBhcnNlSW50KFwiZmZmZlwiLCAxNikgKyBNYXRoLm1heCgtMjU1LCB2YWx1ZSkpIDogTWF0aC5taW4oMjU1LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnl0ZTcgPSB0ZW1wVmFsdWUgJiAweDAwZmY7XG4gICAgICAgICAgICAgICAgYnl0ZTggPSAweDAwO1xuICAgICAgICAgICAgICAgIGJ5dGU4ID0gdGVtcFZhbHVlID4+IDg7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVFlQRV9SR0I6XG4gICAgICAgICAgICAgICAgLy8gZmY6NTUgIDA5OjAwICAwMjowOCAgMDY6MDAgIDVjOjk5ICA2ZDowMCAgMGFcbiAgICAgICAgICAgICAgICAvLyAweDU1ZmY7MHgwMDA5OzB4MDgwMjsweDAwMDY7MHg5OTVjOzB4MDA2ZDsweDAwMGE7MHgwMDAwO1xuICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMDtcbiAgICAgICAgICAgICAgICBieXRlOCA9IHZhbHVlID4+IDggJiAweGZmO1xuICAgICAgICAgICAgICAgIGJ5dGU5ID0gdmFsdWUgPj4gMTYgJiAweGZmO1xuICAgICAgICAgICAgICAgIGJ5dGUxMCA9IHZhbHVlID4+IDI0ICYgMHhmZjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVFlQRV9TT1VORDpcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjAwOjAwOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjowNjowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6ZWU6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjg4OjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjpiODowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6NWQ6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjRhOjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjoyNjowMTowYVxuICAgICAgICAgICAgICAgIGJ5dGUyID0gMHgwNTtcbiAgICAgICAgICAgICAgICBieXRlNSA9IDB4MjI7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgwMDtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDA2O1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4ZWU7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHg4ODtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweGI4O1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gNSkge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4NWQ7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHg0YTtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgyNjtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlOCA9IDB4MGE7XG4gICAgICAgICAgICAgICAgYnl0ZTEyID0gMHgwMDtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgYnVmVmlld1swXSA9IGJ5dGUxIDw8IDggfCBieXRlMDtcbiAgICAgICAgYnVmVmlld1sxXSA9IGJ5dGUzIDw8IDggfCBieXRlMjtcbiAgICAgICAgYnVmVmlld1syXSA9IGJ5dGU1IDw8IDggfCBieXRlNDtcbiAgICAgICAgYnVmVmlld1szXSA9IGJ5dGU3IDw8IDggfCBieXRlNjtcbiAgICAgICAgYnVmVmlld1s0XSA9IGJ5dGU5IDw8IDggfCBieXRlODtcbiAgICAgICAgYnVmVmlld1s1XSA9IGJ5dGUxMSA8PCA4IHwgYnl0ZTEwO1xuICAgICAgICBidWZWaWV3WzZdID0gYnl0ZTEzIDw8IDggfCBieXRlMTI7XG4gICAgICAgIGJ1ZlZpZXdbN10gPSBieXRlMTUgPDwgOCB8IGJ5dGUxNDtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBieXRlMC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMi50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMy50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNi50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNy50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlOC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlOS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTAudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTExLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxMi50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTMudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTE0LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxNS50b1N0cmluZygxNikgKyBcIjpcIlxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGJ1ZlZpZXdbMF0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1sxXS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzJdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbM10udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s0XS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzVdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbNl0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s3XS50b1N0cmluZygxNilcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICBfd3JpdGVDaGFyYWN0ZXJpc3RpYyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSh0aGlzLmNvbmZpZy5zZXJ2aWNlKCkpXG4gICAgICAgICAgICAudGhlbihzZXJ2aWNlID0+IHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuY2hhcmF0ZXJpc3RpYygpKSlcbiAgICAgICAgICAgIC50aGVuKGNoYXJhY3RlcmlzdGljID0+IGNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUodmFsdWUpKTtcbiAgICB9XG5cblxufVxuXG5cbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBNeW9Db25maWd7XG4gICAgY29uc3RydWN0b3IoKXsgICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBjb250cm9sU2VydmljZSgpIHsgcmV0dXJuIFwiZDUwNjAwMDEtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIGdlc3R1cmVTZXJ2aWNlKCkgeyByZXR1cm4gXCJkNTA2MDAwMy1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XG4gICAgY29tbWFuZENoYXJhY3RlcmlzdGljKCkgeyByZXR1cm4gXCJkNTA2MDQwMS1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XG4gICAgZ2VzdHVyZUNoYXJhY3RlcmlzdGljKCkgeyByZXR1cm4gXCJkNTA2MDEwMy1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XG4gICAgXG5cbn1cblxuZXhwb3J0IGNsYXNzIE15b0NvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmRldmljZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IE15b0NvbmZpZygpO1xuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdGVkID0gdGhpcy5vbkRpc2Nvbm5lY3RlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZCA9IG5ldyBVaW50OEFycmF5KDUpO1xuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFswXSA9IDB4MDE7IC8vIHNldCBtb2RlXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzFdID0gMHgwMzsgLy8gYnl0ZXMgaW4gcGF5bG9hZFxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFsyXSA9IDB4MDA7IC8vIGVtZyBtb2RlOiBub25lXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzNdID0gMHgwMDsgLy8gaW11IG1vZGU6IGRpc2FibGVkXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzRdID0gMHgwMTsgLy8gY2xhc3NpZmllciBtb2RlOiBlbmFibGVkXG5cbiAgICAgICAgdGhpcy5kaXNhYmxlR2VzdHVyZXNDb21tYW5kID0gVWludDhBcnJheS5mcm9tKHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlR2VzdHVyZXNDb21tYW5kWzRdID0gMHgwMDsgLy8gY2xhc3NpZmllciBtb2RlOiBkaXNhYmxlZFxuXG4gICAgICAgIHRoaXMuZGVlcFNsZWVwQ29tbWFuZCA9IG5ldyBVaW50OEFycmF5KDIpO1xuICAgICAgICB0aGlzLmRlZXBTbGVlcENvbW1hbmRbMF0gPSAweDA0OyAvLyBzZXQgbW9kZVxuICAgICAgICB0aGlzLmRlZXBTbGVlcENvbW1hbmRbMV0gPSAweDAwOyAvLyBieXRlcyBpbiBwYXlsb2FkXG5cbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbHRQb3B1cCA9IG51bGw7XG4gICAgICAgIHRoaXNcbiAgICB9XG5cbiAgICAvKlxuICAgIFJlcXVlc3QgdGhlIGRldmljZSB3aXRoIGJsdWV0b290aFxuICAgICovXG4gICAgcmVxdWVzdCgpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcImZpbHRlcnNcIjogW3tcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5jb250cm9sU2VydmljZSgpXVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBcIm9wdGlvbmFsU2VydmljZXNcIjogW3RoaXMuY29uZmlnLmdlc3R1cmVTZXJ2aWNlKCldXG4gICAgICAgIH07ICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZShvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4oZGV2aWNlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZS5hZGRFdmVudExpc3RlbmVyKCdnYXR0c2VydmVyZGlzY29ubmVjdGVkJywgdGhpcy5vbkRpc2Nvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRldmljZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbm5lY3QgdG8gdGhlIGRldmljZVxuICAgICAqICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpbml0KCl7XG4gICAgICAgIGlmKCF0aGlzLmRldmljZSl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbHRQb3B1cCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe3N0YXRlIDogJ2FkZCd9KTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSh0aGlzLmNvbmZpZy5jb250cm9sU2VydmljZSgpKVxuICAgICAgICAgICAgLnRoZW4oKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IGdldCBNeW8gQ29udHJvbCBTZXJ2aWNlJyk7XG4gICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmNvbW1hbmRDaGFyYWN0ZXJpc3RpYygpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChjaGFyYWN0ZXJpc3RpYyk9PntcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IGdldCBNeW8gQ29tbWFuZCBjaGFyYWN0ZXJpc3RpYycpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUodGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVhZHkgdG8gbGlzdGVuIGdlc3R1cmVzJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJHZXN0dXJlcyhjYWxsYmFjayl7XG4gICAgICAgIGlmKCF0aGlzLmRldmljZSl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuZ2VzdHVyZVNlcnZpY2UoKSlcbiAgICAgICAgICAgIC50aGVuKHNlcnZpY2U9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBHZXQgR2VzdHVyZSBTZXJ2aWNlJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuZ2VzdHVyZUNoYXJhY3RlcmlzdGljKCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKGNoYXJhY3RlcmlzdGljKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dldCBnZXN0dXJlIGNhcmFjdGVyaXN0aWMnKVxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljLnN0YXJ0Tm90aWZpY2F0aW9ucygpO1xuICAgICAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYXJhY3RlcmlzdGljdmFsdWVjaGFuZ2VkJywgKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdlc3R1cmUgPSB0aGlzLl9wYXJzZU15b0dlc3R1cmUoZXYudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlc3R1cmUgOiAnLCBnZXN0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGdlc3R1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VQb3B1cEVsdCh7c3RhdGUgOiAncmVtb3ZlJ30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtzdGF0ZSA6ICdyZW1vdmUnfSk7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZXZpY2UgaXMgZGlzY29ubmVjdGVkLicpO1xuICAgIH1cblxuICAgIF9wYXJzZU15b0dlc3R1cmUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlLmdldFVpbnQ4KDApID09PSAweDAzKSB7XG4gICAgICAgICAgICBjb25zdCBnZXN0dXJlVmFsdWUgPSB2YWx1ZS5nZXRVaW50MTYoMSwgdHJ1ZSlcbiAgICAgICAgICAgIGNvbnN0IGdlc3R1cmUgPSB7XG4gICAgICAgICAgICAgICAgMHgwMDAwOiAncmVzdCcsXG4gICAgICAgICAgICAgICAgMHgwMDAxOiAnZmlzdCcsXG4gICAgICAgICAgICAgICAgMHgwMDAyOiAnd2F2ZS1pbicsXG4gICAgICAgICAgICAgICAgMHgwMDAzOiAnd2F2ZS1vdXQnLFxuICAgICAgICAgICAgICAgIDB4MDAwNDogJ2ZpbmdlcnMtc3ByZWFkJyxcbiAgICAgICAgICAgICAgICAweDAwMDU6ICdkb3VibGUtdGFwJyxcbiAgICAgICAgICAgICAgICAweGZmZmY6ICd1bmtub3duJyxcbiAgICAgICAgICAgIH1bZ2VzdHVyZVZhbHVlXVxuICAgICAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe2dlc3R1cmUgOiBnZXN0dXJlfSk7XG4gICAgICAgICAgICByZXR1cm4geyBnZXN0dXJlIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXN0dXJlOiBudWxsIH1cbiAgICB9XG5cbiAgICBfbWFuYWdlUG9wdXBFbHQoe3N0YXRlPSAnbm9uZScsIGdlc3R1cmUgPSAnbm9uZSd9KXtcbiAgICAgICAgaWYgKHN0YXRlID09PSAncmVtb3ZlJyAmJiB0aGlzLmVsdFBvcHVwKXtcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwID0gbnVsbDtcbiAgICAgICAgfWVsc2UgaWYgKHN0YXRlID09PSAnYWRkJyl7XG4gICAgICAgICAgICBpZiAodGhpcy5lbHRQb3B1cCl7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAuY2xhc3NMaXN0LmFkZCgnbXlvLXBvcHVwJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWx0UG9wdXApO1xuICAgICAgICB9ZWxzZSBpZiAodGhpcy5lbHRQb3B1cCAmJiBnZXN0dXJlICYmIGdlc3R1cmUgIT0gJ25vbmUnKXtcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAuY2xhc3NOYW1lID0gYG15by1wb3B1cCAke2dlc3R1cmV9YDtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=
