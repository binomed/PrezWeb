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
						pitch: 0.3,
						rate: 2 }).then(function (_) {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyIsInNjcmlwdHMvcHJlei5qcyIsInNjcmlwdHMvcHJlei9oaWdobGlnaHRFdmVudHMuanMiLCJzY3JpcHRzL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzIiwic2NyaXB0cy9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMiLCJzY3JpcHRzL3NlbnNvcnMvc3BlZWNoU3ludGhlc2lzQ29udHJvbGVyLmpzIiwic2NyaXB0cy9zZW5zb3JzL3ZvaWNlUmVjb2duaXRpb25Db250cm9sZXIuanMiLCJzY3JpcHRzL3dlYmJsdWV0b290aC9tYm90Q29udHJvbGVyLmpzIiwic2NyaXB0cy93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNLGNBQWMsSUFBcEI7QUFDQSxJQUFNLHFCQUFxQixHQUEzQjtBQUNBLElBQU0sWUFBWSxFQUFsQjs7SUFFYSxtQixXQUFBLG1CO0FBQ1osb0NBQW9DO0FBQUEsTUFBdkIsTUFBdUIsUUFBdkIsTUFBdUI7QUFBQSxNQUFmLGFBQWUsUUFBZixhQUFlOztBQUFBOztBQUNuQyxPQUFLLFdBQUwsR0FBbUIsU0FBUyxjQUFULGdCQUFxQyxNQUFyQyxDQUFuQjtBQUNBLE9BQUssYUFBTCxHQUFxQixhQUFyQjs7QUFFQSxTQUFPLGdCQUFQLFdBQWdDLE1BQWhDLEVBQTBDLEtBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBMUM7QUFDQSxTQUFPLGdCQUFQLGdCQUFxQyxNQUFyQyxFQUErQyxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQStCLElBQS9CLENBQS9DO0FBQ0E7Ozs7b0NBRWlCLEssRUFBTTtBQUN2QixPQUFHO0FBQ0YsUUFBSSxNQUFNLElBQU4sS0FBZSxlQUFuQixFQUFtQztBQUNsQyxTQUFNLFFBQVEsQ0FBQyxNQUFNLFFBQU4sQ0FBZSxZQUFmLENBQTRCLHFCQUE1QixDQUFmO0FBQ0EsU0FBTSxhQUFhLEtBQUssYUFBTCxDQUFtQixLQUFuQixDQUFuQjtBQUNBLFNBQU0sT0FBTyxPQUFPLElBQVAsQ0FBWSxVQUFaLENBQWI7QUFDQSxVQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxNQUF6QixFQUFpQyxHQUFqQyxFQUFxQztBQUNwQyxVQUFNLE1BQU0sS0FBSyxDQUFMLENBQVo7QUFDQSxVQUFJLFFBQVEsS0FBWixFQUFrQjtBQUNqQixZQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsS0FBdkIsc0JBQWdELFdBQVcsR0FBWCxDQUFoRCxXQUFxRSxXQUFyRTtBQUNBLE9BRkQsTUFFTSxJQUFJLFFBQVEsS0FBWixFQUFrQjtBQUN2QixZQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsTUFBdkIsc0JBQWlELFdBQVcsR0FBWCxDQUFqRCxXQUFzRSxTQUF0RTtBQUNBLE9BRkssTUFFQSxJQUFJLFFBQVEsWUFBWixFQUF5QjtBQUM5QixZQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsUUFBdkIsY0FBMkMsV0FBVyxHQUFYLENBQTNDLGFBQWtFLGtCQUFsRTtBQUNBLE9BRkssTUFFRDtBQUNKLFlBQUssV0FBTCxDQUFpQixLQUFqQixDQUF1QixHQUF2QixJQUE4QixXQUFXLEdBQVgsQ0FBOUI7QUFDQTtBQUNEO0FBQ0QsS0FoQkQsTUFnQk07QUFDTCxTQUFNLFNBQVEsQ0FBQyxNQUFNLFFBQU4sQ0FBZSxZQUFmLENBQTRCLHFCQUE1QixDQUFmO0FBQ0E7QUFDQSxTQUFJLGNBQWEsS0FBSyxhQUFMLENBQW1CLE1BQW5CLENBQWpCO0FBQ0EsU0FBSSxRQUFPLE9BQU8sSUFBUCxDQUFZLFdBQVosQ0FBWDtBQUNBLFVBQUssSUFBSSxLQUFJLENBQWIsRUFBZ0IsS0FBSSxNQUFLLE1BQXpCLEVBQWlDLElBQWpDLEVBQXFDO0FBQ3BDLFVBQU0sT0FBTSxNQUFLLEVBQUwsQ0FBWjtBQUNBLFVBQUksU0FBUSxLQUFaLEVBQWtCO0FBQ2pCLFlBQUssV0FBTCxDQUFpQixLQUFqQixDQUF1QixLQUF2QixJQUFnQyxFQUFoQztBQUNBLE9BRkQsTUFFTSxJQUFHLFNBQVEsWUFBWCxFQUF3QjtBQUM3QixZQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsUUFBdkIsSUFBbUMsRUFBbkM7QUFDQSxPQUZLLE1BRUEsSUFBSSxTQUFRLEtBQVosRUFBa0I7QUFDdkIsWUFBSyxXQUFMLENBQWlCLEtBQWpCLENBQXVCLE1BQXZCLElBQWlDLEVBQWpDO0FBQ0EsT0FGSyxNQUVEO0FBQ0osWUFBSyxXQUFMLENBQWlCLEtBQWpCLENBQXVCLElBQXZCLElBQThCLEVBQTlCO0FBQ0E7QUFDRDtBQUNELFNBQUksU0FBUSxDQUFaLEVBQWM7QUFDYixvQkFBYSxLQUFLLGFBQUwsQ0FBbUIsU0FBUSxDQUEzQixDQUFiO0FBQ0EsY0FBTyxPQUFPLElBQVAsQ0FBWSxXQUFaLENBQVA7QUFDQSxXQUFLLElBQUksTUFBSSxDQUFiLEVBQWdCLE1BQUksTUFBSyxNQUF6QixFQUFpQyxLQUFqQyxFQUFxQztBQUNwQyxXQUFNLFFBQU0sTUFBSyxHQUFMLENBQVo7QUFDQSxXQUFJLFVBQVEsS0FBWixFQUFrQjtBQUNqQixhQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsS0FBdkIsc0JBQWdELFlBQVcsS0FBWCxDQUFoRCxXQUFxRSxXQUFyRTtBQUNBLFFBRkQsTUFFTSxJQUFJLFVBQVEsS0FBWixFQUFrQjtBQUN4QixhQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsTUFBdkIsc0JBQWlELFlBQVcsS0FBWCxDQUFqRCxXQUFzRSxTQUF0RTtBQUNBLFFBRk0sTUFFRCxJQUFJLFVBQVEsWUFBWixFQUF5QjtBQUM3QixhQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsUUFBdkIsY0FBMkMsWUFBVyxLQUFYLENBQTNDLGFBQWtFLGtCQUFsRTtBQUNBLFFBRkksTUFFQTtBQUNKLGFBQUssV0FBTCxDQUFpQixLQUFqQixDQUF1QixLQUF2QixJQUE4QixZQUFXLEtBQVgsQ0FBOUI7QUFDQTtBQUNEO0FBQ0Q7QUFDRDtBQUNELElBbkRELENBbURDLE9BQU0sQ0FBTixFQUFRLENBQUU7QUFDWDs7O3FDQUVpQjtBQUNqQixVQUFPLGdCQUFQLENBQXdCLGVBQXhCLEVBQXlDLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBekM7QUFDQSxVQUFPLGdCQUFQLENBQXdCLGdCQUF4QixFQUEwQyxLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBQTFDO0FBQ0E7Ozt5Q0FFcUI7QUFDckIsVUFBTyxtQkFBUCxDQUEyQixlQUEzQixFQUE0QyxLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBQTVDO0FBQ0EsVUFBTyxtQkFBUCxDQUEyQixnQkFBM0IsRUFBNkMsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUE3QztBQUNBOzs7Ozs7O0FDOUVGOztBQUNBOztBQUdBLENBQUMsWUFBWTs7QUFHVCxhQUFTLFFBQVQsR0FBb0I7QUFDaEI7QUFDSDs7QUFHRCxXQUFPLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFFBQWhDO0FBQ0gsQ0FURDs7O0FDSkE7Ozs7Ozs7QUFFQTs7OztBQUVBLElBQU0sY0FBYyxJQUFwQjtBQUNBLElBQU0sb0JBQW9CLEdBQTFCO0FBQ0EsSUFBTSxZQUFZLEVBQWxCOztJQUVhLGUsV0FBQSxlLEdBQ1osMkJBQWE7QUFBQTs7QUFDWjtBQUNBLDhDQUF3QjtBQUN2QixVQUFTLGFBRGM7QUFFdkI7QUFDQSxpQkFBZ0IsQ0FBQztBQUNoQixRQUFNLENBRFU7QUFFaEIsVUFBUTtBQUZRLEdBQUQsRUFHYjtBQUNGLFFBQU0sQ0FESjtBQUVGLFVBQVE7QUFGTixHQUhhO0FBSE8sRUFBeEI7O0FBWUE7QUFDQSw4Q0FBd0I7QUFDdkIsVUFBUyxjQURjO0FBRXZCO0FBQ0EsaUJBQWdCLENBQUM7QUFDaEIsUUFBTSxDQURVO0FBRWhCLFVBQVE7QUFGUSxHQUFELEVBR2I7QUFDRixRQUFNLENBREo7QUFFRixVQUFRO0FBRk4sR0FIYTtBQUhPLEVBQXhCOztBQVlBO0FBQ0EsOENBQXdCO0FBQ3ZCLFVBQVMsZUFEYztBQUV2QjtBQUNBLGlCQUFnQixDQUFDO0FBQ2hCLFFBQU0sQ0FEVTtBQUVoQixVQUFRO0FBRlEsR0FBRCxFQUdiO0FBQ0YsUUFBTSxDQURKO0FBRUYsVUFBUTtBQUZOLEdBSGE7QUFITyxFQUF4Qjs7QUFZQTtBQUNBLDhDQUF3QjtBQUN2QixVQUFTLGVBRGM7QUFFdkI7QUFDQSxpQkFBZ0IsQ0FBQztBQUNoQixRQUFNLENBRFU7QUFFaEIsVUFBUTtBQUZRLEdBQUQsRUFHYjtBQUNGLFFBQU0sQ0FESjtBQUVGLFVBQVEsS0FGTjtBQUdGLFdBQVE7QUFITixHQUhhO0FBSE8sRUFBeEI7O0FBZUQ7QUFDQSw4Q0FBd0I7QUFDdEIsVUFBUyxlQURhO0FBRXRCLGlCQUFlLENBQ2Y7QUFDQyxRQUFNLENBRFA7QUFFQyxVQUFRO0FBRlQsR0FEZSxFQUtmO0FBQ0MsUUFBTSxDQURQO0FBRUMsU0FBTyxPQUZSO0FBR0MsVUFBUTtBQUhULEdBTGUsRUFVZjtBQUNDLFFBQU0sQ0FEUDtBQUVDLFNBQU8sT0FGUjtBQUdDLFVBQVE7QUFIVCxHQVZlLENBRk8sRUFBeEI7O0FBcUJBO0FBQ0EsOENBQXdCO0FBQ3RCLFVBQVMsWUFEYTtBQUV0QixpQkFBYyxDQUNkO0FBQ0MsUUFBTSxDQURQO0FBRUMsVUFBUTtBQUZULEdBRGMsRUFLZDtBQUNDLFFBQU0sQ0FEUDtBQUVDLFVBQVE7QUFGVCxHQUxjLEVBU2Q7QUFDQyxRQUFNLENBRFA7QUFFQyxVQUFRO0FBRlQsR0FUYyxFQWFkO0FBQ0MsUUFBTSxDQURQO0FBRUMsVUFBUTtBQUZULEdBYmMsRUFpQmQ7QUFDQyxRQUFNLENBRFA7QUFFQyxVQUFRO0FBRlQsR0FqQmMsRUFxQmQ7QUFDQyxRQUFNLENBRFA7QUFFQyxTQUFPLE9BRlI7QUFHQyxVQUFRO0FBSFQsR0FyQmMsQ0FGUSxFQUF4Qjs7QUE4QkE7QUFDQSw4Q0FBd0I7QUFDdEIsVUFBUyxvQkFEYTtBQUV0QixpQkFBZ0IsQ0FDaEI7QUFDQyxRQUFNLENBRFA7QUFFQyxVQUFRO0FBRlQsR0FEZ0IsRUFLaEI7QUFDQyxRQUFNLENBRFA7QUFFQyxVQUFRO0FBRlQsR0FMZ0IsRUFTaEI7QUFDQyxRQUFNLENBRFA7QUFFQyxVQUFRO0FBRlQsR0FUZ0IsQ0FGTSxFQUF4Qjs7QUFpQkE7QUFDQSw4Q0FBd0I7QUFDdEIsVUFBUyxzQkFEYTtBQUV0QixpQkFBZSxDQUNmO0FBQ0MsUUFBTSxDQURQO0FBRUMsVUFBUTtBQUZULEdBRGUsRUFLZjtBQUNDLFFBQU0sQ0FEUDtBQUVDLFVBQVE7QUFGVCxHQUxlLEVBU2Y7QUFDQyxRQUFNLENBRFA7QUFFQyxVQUFRO0FBRlQsR0FUZSxFQWFmO0FBQ0MsUUFBTSxDQURQO0FBRUMsVUFBUTtBQUZULEdBYmUsQ0FGTyxFQUF4Qjs7QUFzQkE7QUFDQSw4Q0FBd0I7QUFDdEIsVUFBUyxXQURhO0FBRXRCLGlCQUFnQixDQUNoQjtBQUNDLFFBQU0sQ0FEUDtBQUVDLFFBQU0sQ0FGUDtBQUdDLFVBQVE7QUFIVCxHQURnQixDQUZNLEVBQXhCOztBQVVBO0FBQ0EsOENBQXdCO0FBQ3RCLFVBQVMsVUFEYTtBQUV0QixpQkFBZ0IsQ0FDaEI7QUFDQyxRQUFNLENBRFA7QUFFQyxTQUFNLE9BRlA7QUFHQyxVQUFRO0FBSFQsR0FEZ0IsRUFNaEI7QUFDQyxRQUFNLENBRFA7QUFFQyxTQUFNLE1BRlA7QUFHQyxVQUFRO0FBSFQsR0FOZ0IsRUFXaEI7QUFDQyxRQUFNLENBRFA7QUFFQyxTQUFNLE9BRlA7QUFHQyxlQUFZLENBSGI7QUFJQyxVQUFRO0FBSlQsR0FYZ0IsQ0FGTSxFQUF4QjtBQXFCQyxDOzs7QUNoTUY7Ozs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0lBR2Esa0IsV0FBQSxrQjtBQUNaLCtCQUFhO0FBQUE7O0FBRVosTUFBSSxXQUFXLE9BQU8sR0FBUCxJQUFjLE9BQU8sSUFBcEM7O0FBRUE7QUFDQSxNQUFJLENBQUMsUUFBTCxFQUFjO0FBQ1o7QUFDQSxRQUFLLGlCQUFMLEdBQXlCLHdDQUF6QjtBQUNBLFFBQUssVUFBTDs7QUFFQTtBQUNBLFFBQUssZ0JBQUwsR0FBd0IsMERBQXhCO0FBQ0EsUUFBSyxlQUFMLEdBQXVCLHdEQUF2QjtBQUNBLFFBQUssWUFBTDtBQUNEOztBQUVEO0FBQ0EsT0FBSyxrQkFBTDtBQUVBOzs7OytCQUVXO0FBQUE7O0FBQ1gsVUFBTyxnQkFBUCxDQUF3Qix3QkFBeEIsRUFBa0QsaUJBQVM7QUFDMUQsUUFBSSxNQUFLLGlCQUFMLENBQXVCLGlCQUEzQixFQUE4QztBQUM3QyxXQUFLLGlCQUFMLENBQXVCLGlCQUF2QixDQUF5QyxJQUF6QyxDQUE4QyxVQUE5QztBQUNBO0FBQ0QsSUFKRDtBQUtBOzs7aUNBRWE7QUFBQTs7QUFDYixZQUFTLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDLGdCQUE1QyxDQUE2RCxPQUE3RCxFQUFzRSxhQUFHO0FBQ3hFLFdBQUssY0FBTDtBQUNBLElBRkQ7QUFHQSxVQUFPLGdCQUFQLENBQXdCLGlCQUF4QixFQUEyQyxhQUFHO0FBQzdDLFFBQUc7QUFDRixZQUFLLGdCQUFMLENBQXNCLElBQXRCO0FBQ0EsS0FGRCxDQUVDLE9BQU0sQ0FBTixFQUFRLENBQUU7QUFDWCxJQUpEO0FBS0E7OzttQ0FFZTtBQUFBOztBQUNmLFlBQVMsY0FBVCxDQUF3QixZQUF4QixFQUFzQyxLQUF0QyxDQUE0QyxPQUE1QyxHQUFzRCxFQUF0RDtBQUNBLFFBQUssZ0JBQUwsQ0FBc0IsS0FBdEIsQ0FBNEIsVUFBQyxRQUFELEVBQVk7QUFDdkMsYUFBUyxjQUFULENBQXdCLGNBQXhCLEVBQXdDLFNBQXhDLEdBQW9ELFFBQXBEO0FBQ0EsUUFBSSxTQUFTLFdBQVQsR0FBdUIsUUFBdkIsQ0FBZ0MsT0FBaEMsQ0FBSixFQUE2QztBQUM1QyxjQUFTLGNBQVQsQ0FBd0IsWUFBeEIsRUFBc0MsS0FBdEMsQ0FBNEMsT0FBNUMsR0FBc0QsTUFBdEQ7QUFDQSxZQUFLLGVBQUwsQ0FBcUIsS0FBckIsQ0FBMkI7QUFDMUIsYUFBTTtBQURvQixNQUEzQixFQUdDLElBSEQsQ0FHTTtBQUFBLGFBQUcsT0FBSyxjQUFMLENBQW9CLElBQXBCLFFBQUg7QUFBQSxNQUhOLEVBSUMsS0FKRCxDQUlPLFVBQUMsS0FBRCxFQUFTO0FBQ2YsY0FBUSxLQUFSLENBQWMsS0FBZDtBQUNBLE1BTkQ7QUFPQSxLQVRELE1BU00sSUFBSSxTQUFTLFdBQVQsR0FBdUIsUUFBdkIsQ0FBZ0MsU0FBaEMsQ0FBSixFQUErQztBQUNwRCxZQUFLLGVBQUwsQ0FBcUIsS0FBckIsQ0FBMkI7QUFDMUIsYUFBTywyREFEbUI7QUFFMUIsY0FBUyxLQUZpQixFQUEzQixFQUlDLElBSkQsQ0FJTTtBQUFBLGFBQUcsT0FBSyxjQUFMLENBQW9CLElBQXBCLFFBQUg7QUFBQSxNQUpOLEVBS0MsS0FMRCxDQUtPLFVBQUMsS0FBRCxFQUFTO0FBQ2YsY0FBUSxLQUFSLENBQWMsS0FBZDtBQUNBLE1BUEQ7QUFRQSxLQVRLLE1BU0EsSUFBSSxTQUFTLFdBQVQsR0FBdUIsUUFBdkIsQ0FBZ0MsTUFBaEMsQ0FBSixFQUE0QztBQUNqRCxZQUFLLGVBQUwsQ0FBcUIsS0FBckIsQ0FBMkI7QUFDMUIsYUFBTywwQ0FEbUI7QUFFMUIsYUFBUSxHQUZrQjtBQUcxQixZQUFPLENBSG1CLEVBQTNCLEVBS0MsSUFMRCxDQUtNO0FBQUEsYUFBRyxPQUFLLGNBQUwsQ0FBb0IsSUFBcEIsUUFBSDtBQUFBLE1BTE4sRUFNQyxLQU5ELENBTU8sVUFBQyxLQUFELEVBQVM7QUFDZixjQUFRLEtBQVIsQ0FBYyxLQUFkO0FBQ0EsTUFSRDtBQVNBLEtBVkssTUFVQSxJQUFJLFNBQVMsV0FBVCxHQUF1QixRQUF2QixDQUFnQyxhQUFoQyxDQUFKLEVBQW1EO0FBQ3hELFlBQUssZUFBTCxDQUFxQixLQUFyQixDQUEyQjtBQUMxQixhQUFPO0FBRG1CLE1BQTNCLEVBR0MsSUFIRCxDQUdNO0FBQUEsYUFBRyxPQUFLLGNBQUwsQ0FBb0IsSUFBcEIsUUFBSDtBQUFBLE1BSE4sRUFJQyxLQUpELENBSU8sVUFBQyxLQUFELEVBQVM7QUFDZixjQUFRLEtBQVIsQ0FBYyxLQUFkO0FBQ0EsTUFORDtBQU9BLEtBUkssTUFRQSxJQUFJLFNBQVMsV0FBVCxHQUF1QixRQUF2QixDQUFnQyxTQUFoQyxDQUFKLEVBQStDO0FBQ3BELFlBQUssZUFBTCxDQUFxQixLQUFyQixDQUEyQjtBQUMxQixhQUFPO0FBRG1CLE1BQTNCLEVBR0MsSUFIRCxDQUdNO0FBQUEsYUFBRyxPQUFPLElBQVAsRUFBSDtBQUFBLE1BSE4sRUFJQyxLQUpELENBSU8sVUFBQyxLQUFELEVBQVM7QUFDZixjQUFRLEtBQVIsQ0FBYyxLQUFkO0FBQ0EsTUFORDtBQU9BLEtBUkssTUFRRDtBQUNKLFNBQUksY0FBYyxDQUNqQix5QkFEaUIsRUFFakIsWUFGaUIsRUFHakIsd0NBSGlCLEVBSWpCLHdDQUppQixDQUFsQjtBQU1BLFlBQUssZUFBTCxDQUFxQixLQUFyQixDQUEyQjtBQUMxQixhQUFPLFlBQVksS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLFlBQVksTUFBdkMsQ0FBWjtBQURtQixNQUEzQixFQUdDLElBSEQsQ0FHTTtBQUFBLGFBQUcsT0FBSyxjQUFMLENBQW9CLElBQXBCLFFBQUg7QUFBQSxNQUhOLEVBSUMsS0FKRCxDQUlPLFVBQUMsS0FBRCxFQUFTO0FBQ2YsY0FBUSxLQUFSLENBQWMsS0FBZDtBQUNBLE1BTkQ7QUFPQTtBQUNELElBN0REO0FBOERBOzs7dUNBR29COztBQUVwQjtBQUNBOzs7Ozs7O0FDdEhGOzs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztJQUVhLGdCLFdBQUEsZ0I7QUFDWiw2QkFBYTtBQUFBOztBQUVaLE9BQUssaUJBQUwsR0FBeUIsSUFBekI7QUFDQSxPQUFLLGdCQUFMO0FBQ0EsT0FBSyxXQUFMO0FBQ0E7QUFDQTtBQUNBOzs7O3FDQUVrQjtBQUFBOztBQUNsQixZQUFTLGNBQVQsQ0FBd0IsWUFBeEIsRUFBc0MsZ0JBQXRDLENBQXVELE9BQXZELEVBQWdFLGlCQUFTOztBQUV4RSxRQUFNLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRSxVQUFVLENBQUMsaUJBQUQsQ0FBWixFQUFELENBQVgsRUFBaEI7QUFDQSxjQUFVLFNBQVYsQ0FBb0IsYUFBcEIsQ0FBa0MsT0FBbEMsRUFDQyxJQURELENBQ007QUFBQSxZQUFVLE9BQU8sSUFBUCxDQUFZLE9BQVosRUFBVjtBQUFBLEtBRE4sRUFFQyxJQUZELENBRU0sa0JBQVU7QUFDZixhQUFRLEdBQVIsQ0FBWSxnQ0FBWjtBQUNBLFdBQUssaUJBQUwsR0FBeUIsT0FBTyxNQUFoQztBQUNBLEtBTEQ7QUFNQSxJQVREO0FBVUEsWUFBUyxjQUFULENBQXdCLGFBQXhCLEVBQXVDLGdCQUF2QyxDQUF3RCxPQUF4RCxFQUFpRSxpQkFBUzs7QUFFekUsVUFBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixpQkFBNUIsQ0FBOEMsaUJBQTlDLEVBQ0MsSUFERCxDQUNNO0FBQUEsWUFBVyxRQUFRLGlCQUFSLENBQTBCLGVBQTFCLENBQVg7QUFBQSxLQUROLEVBRUMsSUFGRCxDQUVNO0FBQUEsWUFBa0IsZUFBZSxTQUFmLEVBQWxCO0FBQUEsS0FGTixFQUdDLElBSEQsQ0FHTSxpQkFBUztBQUNkLFNBQU0sZUFBZSxNQUFNLFFBQU4sQ0FBZSxDQUFmLENBQXJCO0FBQ0EsYUFBUSxHQUFSLDRCQUFxQyxZQUFyQztBQUNBLEtBTkQ7QUFPQSxJQVREO0FBVUE7OztnQ0FFWTtBQUNaLE9BQUksZ0JBQWdCLENBQXBCO0FBQ0EsT0FBSSxNQUFNLGdDQUFWO0FBQ0EsWUFBUyxjQUFULENBQXdCLFlBQXhCLEVBQXNDLGdCQUF0QyxDQUF1RCxPQUF2RCxFQUFnRSxZQUFJOztBQUVuRSxRQUFJLENBQUMsSUFBSSxTQUFULEVBQW1CO0FBQ2xCLFNBQUksT0FBSixHQUNDLElBREQsQ0FDTTtBQUFBLGFBQUcsSUFBSSxPQUFKLEVBQUg7QUFBQSxNQUROLEVBRUMsSUFGRCxDQUVNO0FBQUEsYUFBSSxJQUFJLElBQUosRUFBSjtBQUFBLE1BRk4sRUFHQyxJQUhELENBR007QUFBQSxhQUFJLElBQUksZ0JBQUosQ0FBcUIsVUFBQyxPQUFELEVBQVc7QUFDekMsV0FBSSxXQUFXLFFBQVEsT0FBUixLQUFvQixZQUFuQyxFQUFnRDtBQUMvQyxZQUFHLEtBQUssR0FBTCxLQUFhLGFBQWIsR0FBNkIsSUFBaEMsRUFBcUM7QUFDcEMsZ0JBQU8sSUFBUDtBQUNBO0FBQ0Qsd0JBQWdCLEtBQUssR0FBTCxFQUFoQjtBQUNBO0FBQ0QsT0FQUyxDQUFKO0FBQUEsTUFITjtBQVdBO0FBQ0QsSUFmRDs7QUFpQkEsVUFBTyxnQkFBUCxDQUF3QixnQkFBeEIsRUFBMEMsYUFBRztBQUM1QyxRQUFJLFVBQUo7QUFDQSxJQUZEO0FBR0E7OztpQ0FFYTtBQUNaO0FBQ0EsT0FBSSxjQUFjLFNBQVMsY0FBVCxDQUF3QixhQUF4QixDQUFsQjtBQUNBLE9BQUksY0FBYyxTQUFTLGNBQVQsQ0FBd0Isa0JBQXhCLENBQWxCO0FBQ0EsWUFBUyxjQUFULENBQXdCLGFBQXhCLEVBQXVDLGdCQUF2QyxDQUF3RCxPQUF4RCxFQUFpRSxhQUFLO0FBQ3RFO0FBQ0EsUUFBSSxPQUFPLHlCQUFYO0FBQ0EsU0FBSyxPQUFMLEdBQ0UsSUFERixDQUNPLGFBQUs7QUFDVjtBQUNBLFlBQU8sS0FBSyxPQUFMLEVBQVA7QUFDQSxLQUpGLEVBS0UsSUFMRixDQUtPLGFBQUs7QUFDVjtBQUNBLGlCQUFZLEtBQVosQ0FBa0IsT0FBbEIsR0FBNEIsTUFBNUI7QUFDQSxpQkFBWSxLQUFaLENBQWtCLE9BQWxCLEdBQTRCLE1BQTVCOztBQUVBLFNBQUksVUFBVSxTQUFTLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBZDs7QUFFQTtBQUNBLFNBQUksUUFBUSxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBWjtBQUNBLFNBQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBZDtBQUNBLFNBQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBZDtBQUNBLFNBQUksV0FBVyxTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBZjs7QUFFQSxXQUFNLGdCQUFOLENBQXVCLFdBQXZCLEVBQW9DLGFBQUs7QUFBRSxXQUFLLFlBQUwsQ0FBa0IsQ0FBQyxHQUFuQixFQUF3QixHQUF4QjtBQUE4QixNQUF6RTtBQUNBLGFBQVEsZ0JBQVIsQ0FBeUIsV0FBekIsRUFBc0MsYUFBSztBQUFFLFdBQUssWUFBTCxDQUFrQixHQUFsQixFQUF1QixDQUFDLEdBQXhCO0FBQThCLE1BQTNFO0FBQ0EsYUFBUSxnQkFBUixDQUF5QixXQUF6QixFQUFzQyxhQUFLO0FBQUUsV0FBSyxZQUFMLENBQWtCLEdBQWxCLEVBQXVCLEdBQXZCO0FBQTZCLE1BQTFFO0FBQ0EsY0FBUyxnQkFBVCxDQUEwQixXQUExQixFQUF1QyxhQUFLO0FBQUUsV0FBSyxZQUFMLENBQWtCLENBQUMsR0FBbkIsRUFBd0IsQ0FBQyxHQUF6QjtBQUErQixNQUE3RTs7QUFFQSxXQUFNLGdCQUFOLENBQXVCLFNBQXZCLEVBQWtDLGFBQUs7QUFBRSxXQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckI7QUFBeUIsTUFBbEU7QUFDQSxhQUFRLGdCQUFSLENBQXlCLFNBQXpCLEVBQW9DLGFBQUs7QUFBRSxXQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckI7QUFBeUIsTUFBcEU7QUFDQSxhQUFRLGdCQUFSLENBQXlCLFNBQXpCLEVBQW9DLGFBQUs7QUFBRSxXQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckI7QUFBeUIsTUFBcEU7QUFDQSxjQUFTLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLGFBQUs7QUFBRSxXQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckI7QUFBeUIsTUFBckU7QUFHQSxLQTdCRjtBQThCQSxJQWpDQTtBQWtDRDs7Ozs7OztBQ3BHRjs7Ozs7Ozs7OztJQUVhLHdCLFdBQUEsd0I7QUFDVCx3Q0FBYTtBQUFBOztBQUNULGFBQUssS0FBTCxHQUFhLE9BQU8sZUFBcEI7O0FBRUEsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUssT0FBTCxHQUFlLElBQWY7QUFDQSxhQUFLLFVBQUw7QUFDSDs7OztxQ0FFVztBQUNSLGlCQUFLLGtCQUFMO0FBQ0EsZ0JBQUksZ0JBQWdCLGVBQWhCLEtBQW9DLFNBQXhDLEVBQW1EO0FBQy9DLGdDQUFnQixlQUFoQixHQUFrQyxLQUFLLGtCQUFMLENBQXdCLElBQXhCLENBQTZCLElBQTdCLENBQWxDO0FBQ0g7QUFDSjs7OzZDQUVvQjtBQUNqQixnQkFBSSxTQUFTLEtBQUssS0FBTCxDQUFXLFNBQVgsRUFBYjtBQUNBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksT0FBTyxNQUEzQixFQUFtQyxHQUFuQyxFQUF3QztBQUNwQyxvQkFBSSxPQUFPLENBQVAsRUFBVSxJQUFWLEtBQW1CLE9BQXZCLEVBQWdDO0FBQzVCLDRCQUFRLEtBQVIsQ0FBYyxTQUFkLEVBQXlCLE9BQU8sQ0FBUCxFQUFVLElBQW5DLEVBQXlDLE9BQU8sQ0FBUCxDQUF6QztBQUNBLHlCQUFLLE9BQUwsR0FBZSxPQUFPLENBQVAsQ0FBZjtBQUNILGlCQUhELE1BR00sSUFBSSxPQUFPLENBQVAsRUFBVSxJQUFWLEtBQW1CLE9BQXZCLEVBQWdDO0FBQ2xDLDRCQUFRLEtBQVIsQ0FBYyxTQUFkLEVBQXlCLE9BQU8sQ0FBUCxFQUFVLElBQW5DLEVBQXlDLE9BQU8sQ0FBUCxDQUF6QztBQUNBLHlCQUFLLE9BQUwsR0FBZSxPQUFPLENBQVAsQ0FBZjtBQUNIO0FBQ0o7QUFDSjs7O29DQUVrRDtBQUFBOztBQUFBLGdCQUE1QyxLQUE0QyxRQUE1QyxLQUE0QztBQUFBLG1DQUFyQyxNQUFxQztBQUFBLGdCQUFyQyxNQUFxQywrQkFBNUIsSUFBNEI7QUFBQSxrQ0FBdEIsS0FBc0I7QUFBQSxnQkFBdEIsS0FBc0IsOEJBQWQsQ0FBYztBQUFBLGlDQUFYLElBQVc7QUFBQSxnQkFBWCxJQUFXLDZCQUFKLENBQUk7O0FBQy9DLG1CQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBb0I7O0FBRW5DLG9CQUFJLENBQUMsTUFBSyxPQUFWLEVBQW1CO0FBQ2Y7QUFDSDtBQUNELG9CQUFJLFlBQVksSUFBSSx3QkFBSixDQUE2QixLQUE3QixDQUFoQjtBQUNBLDBCQUFVLEtBQVYsR0FBa0IsU0FBUyxNQUFLLE9BQWQsR0FBd0IsTUFBSyxPQUEvQztBQUNBLDBCQUFVLEtBQVYsR0FBa0IsS0FBbEI7QUFDQSwwQkFBVSxJQUFWLEdBQWlCLElBQWpCO0FBQ0EsMEJBQVUsS0FBVixHQUFrQixZQUFXO0FBQ3pCO0FBQ0gsaUJBRkQ7QUFHQSxzQkFBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixTQUFqQjtBQUNILGFBYk0sQ0FBUDtBQWNIOzs7Ozs7O0FDOUNMOzs7Ozs7Ozs7O0lBRWEseUIsV0FBQSx5QjtBQUNULHlDQUFhO0FBQUE7O0FBQ1QsWUFBSSxvQkFBb0IscUJBQXFCLHVCQUE3Qzs7QUFFQSxhQUFLLFdBQUwsR0FBbUIsSUFBSSxpQkFBSixFQUFuQjtBQUNBLGFBQUssVUFBTDtBQUNIOzs7OzhCQUVLLFEsRUFBUztBQUNYLGlCQUFLLFdBQUwsQ0FBaUIsUUFBakIsR0FBNEIsVUFBQyxLQUFELEVBQVM7QUFDakMsb0JBQU0sV0FBVyxNQUFNLE9BQU4sQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLFVBQXJDO0FBQ0Esd0JBQVEsR0FBUixDQUFZLGlCQUFpQixRQUE3QjtBQUNBLG9CQUFJLFFBQUosRUFBYTtBQUNULDZCQUFTLFFBQVQ7QUFDSDtBQUNKLGFBTkQ7QUFPQSxpQkFBSyxXQUFMLENBQWlCLEtBQWpCO0FBQ0g7OzsrQkFFSztBQUNGLGlCQUFLLFdBQUwsQ0FBaUIsSUFBakI7QUFDSDs7O3FDQUVXO0FBQUE7O0FBQ1IsaUJBQUssV0FBTCxDQUFpQixJQUFqQixHQUF3QixPQUF4Qjs7QUFFQTtBQUNBLGlCQUFLLFdBQUwsQ0FBaUIsS0FBakIsR0FBeUIsYUFBRztBQUN4Qix3QkFBUSxHQUFSLENBQVksb0JBQVo7QUFDQSxzQkFBSyxXQUFMLENBQWlCLElBQWpCO0FBQ0gsYUFIRDtBQUlBO0FBQ0EsaUJBQUssV0FBTCxDQUFpQixPQUFqQixHQUEyQixVQUFDLEtBQUQsRUFBVztBQUNsQyxvQkFBSSxNQUFNLEtBQU4sSUFBZSxXQUFuQixFQUFnQztBQUM1Qiw0QkFBUSxHQUFSLENBQVksV0FBWjtBQUNIO0FBQ0Qsb0JBQUksTUFBTSxLQUFOLElBQWUsZUFBbkIsRUFBb0M7QUFDaEMsNEJBQVEsR0FBUixDQUFZLGVBQVo7QUFDSDtBQUNELG9CQUFJLE1BQU0sS0FBTixJQUFlLGFBQW5CLEVBQWtDO0FBQzlCLDRCQUFRLEdBQVIsQ0FBWSxhQUFaO0FBQ0g7QUFDSixhQVZEO0FBV0g7Ozs7Ozs7QUM3Q0w7QUFDQTs7Ozs7Ozs7Ozs7OztBQU1BLElBQU0sY0FBYyxjQUFwQjtBQUFBLElBQ0ksZUFBZSxzQ0FEbkI7QUFBQSxJQUVJLHNCQUFzQixzQ0FGMUI7O0FBSUE7Ozs7SUFHTSxNO0FBRUYsc0JBQWM7QUFBQTtBQUNiOzs7OytCQUVNO0FBQUUsbUJBQU8sY0FBUDtBQUF3Qjs7O2tDQUN2QjtBQUFFLG1CQUFPLHNDQUFQO0FBQStDOzs7d0NBQzNDO0FBQUUsbUJBQU8sc0NBQVA7QUFBK0M7Ozs7OztBQUdyRTs7O0FBQ0EsSUFBTSxhQUFhLElBQW5CO0FBQUEsSUFDSSxXQUFXLElBRGY7QUFBQSxJQUVJLGFBQWEsSUFGakI7O0FBS0E7QUFDQSxJQUFNLFNBQVMsSUFBZjtBQUFBLElBQ0ksU0FBUyxJQURiO0FBQUEsSUFFSSxTQUFTLElBRmI7QUFBQSxJQUdJLFNBQVMsSUFIYjtBQUFBLElBSUksU0FBUyxJQUpiO0FBQUEsSUFLSSxTQUFTLElBTGI7QUFBQSxJQU1JLFNBQVMsSUFOYjtBQUFBLElBT0ksU0FBUyxJQVBiO0FBQUEsSUFRSSxNQUFNLElBUlY7QUFBQSxJQVNJLE1BQU0sSUFUVjs7QUFZQTs7OztJQUdhLEksV0FBQSxJO0FBQ1Qsb0JBQWM7QUFBQTs7QUFDVixhQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBSyxNQUFMLEdBQWMsSUFBSSxNQUFKLEVBQWQ7QUFDQSxhQUFLLGNBQUwsR0FBc0IsS0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLElBQXpCLENBQXRCO0FBQ0EsYUFBSyxXQUFMLEdBQW1CLENBQW5CO0FBQ0g7O0FBRUQ7Ozs7Ozs7a0NBR1U7QUFBQTs7QUFDTixnQkFBSSxVQUFVO0FBQ1YsMkJBQVcsQ0FBQztBQUNSLDRCQUFRLEtBQUssTUFBTCxDQUFZLElBQVo7QUFEQSxpQkFBRCxDQUREO0FBSVYsb0NBQW9CLENBQUMsS0FBSyxNQUFMLENBQVksT0FBWixFQUFEO0FBSlYsYUFBZDtBQU1BLG1CQUFPLFVBQVUsU0FBVixDQUFvQixhQUFwQixDQUFrQyxPQUFsQyxFQUNGLElBREUsQ0FDRyxrQkFBVTtBQUNaLHNCQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0Esc0JBQUssTUFBTCxDQUFZLGdCQUFaLENBQTZCLHdCQUE3QixFQUF1RCxNQUFLLGNBQTVEO0FBQ0EsdUJBQU8sTUFBUDtBQUNILGFBTEUsQ0FBUDtBQU1IOztBQUVEOzs7Ozs7a0NBR1U7QUFDTixnQkFBSSxDQUFDLEtBQUssTUFBVixFQUFrQjtBQUNkLHVCQUFPLFFBQVEsTUFBUixDQUFlLDBCQUFmLENBQVA7QUFDSCxhQUZELE1BRU87QUFDSCx1QkFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLE9BQWpCLEVBQVA7QUFDSDtBQUNKOztBQUVEOzs7Ozs7cUNBR2EsTyxFQUFTLE8sRUFBUztBQUFBOztBQUMzQixtQkFBTyxLQUFLLG9CQUFMLENBQTBCLEtBQUssZUFBTCxDQUFxQixVQUFyQixFQUFpQyxHQUFqQyxFQUFzQyxDQUF0QyxFQUF5QyxPQUF6QyxDQUExQixFQUNGLElBREUsQ0FDRyxZQUFNO0FBQ1IsdUJBQU8sT0FBSyxvQkFBTCxDQUEwQixPQUFLLGVBQUwsQ0FBcUIsVUFBckIsRUFBaUMsR0FBakMsRUFBc0MsQ0FBdEMsRUFBeUMsT0FBekMsQ0FBMUIsQ0FBUDtBQUNILGFBSEUsRUFHQSxLQUhBLENBR00saUJBQVM7QUFDZCx3QkFBUSxLQUFSLENBQWMsS0FBZDtBQUNILGFBTEUsQ0FBUDtBQU9IOzs7d0NBRWU7QUFDWixpQkFBSyxXQUFMLEdBQW1CLENBQUMsS0FBSyxXQUFMLEdBQW1CLENBQXBCLElBQXlCLENBQTVDO0FBQ0EsbUJBQU8sS0FBSyxvQkFBTCxDQUEwQixLQUFLLGVBQUwsQ0FBcUIsVUFBckIsRUFBaUMsTUFBakMsRUFBeUMsRUFBekMsRUFBNkMsS0FBSyxXQUFsRCxDQUExQixFQUNGLEtBREUsQ0FDSSxpQkFBUztBQUNaLHdCQUFRLEtBQVIsQ0FBYyxLQUFkO0FBQ0gsYUFIRSxDQUFQO0FBSUg7OztxQ0FFWSxHLEVBQUksSSxFQUFLLEssRUFBTTtBQUN4QixnQkFBSSxPQUFPLE9BQUssQ0FBaEI7QUFDTixnQkFBSSxPQUFPLFNBQU8sRUFBbEI7QUFDQSxnQkFBSSxPQUFPLFFBQU0sRUFBakI7QUFDQSxnQkFBSSxRQUFRLE9BQU8sSUFBUCxHQUFjLElBQTFCO0FBQ0EsaUJBQUssb0JBQUwsQ0FBMEIsS0FBSyxlQUFMLENBQXFCLFFBQXJCLEVBQThCLE1BQTlCLEVBQXFDLENBQXJDLEVBQXVDLEtBQXZDLENBQTFCO0FBRUc7OztxQ0FFWTtBQUNULGdCQUFJLENBQUMsS0FBSyxNQUFWLEVBQWtCO0FBQ2QsdUJBQU8sUUFBUSxNQUFSLENBQWUsMEJBQWYsQ0FBUDtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsVUFBakIsRUFBUDtBQUNIO0FBQ0o7Ozt5Q0FFZ0I7QUFDYixvQkFBUSxHQUFSLENBQVkseUJBQVo7QUFDSDs7O3dDQUdlLEksRUFBTSxJLEVBQU0sSSxFQUFNLEssRUFBTztBQUNyQzs7OztBQUlBO0FBQ0EsZ0JBQUksTUFBTSxJQUFJLFdBQUosQ0FBZ0IsRUFBaEIsQ0FBVjtBQUNBLGdCQUFJLFVBQVUsSUFBSSxXQUFKLENBQWdCLEdBQWhCLENBQWQ7O0FBRUEsZ0JBQUksUUFBUSxJQUFaO0FBQUEsZ0JBQWtCO0FBQ2Qsb0JBQVEsSUFEWjtBQUFBLGdCQUNrQjtBQUNkLG9CQUFRLElBRlo7QUFBQSxnQkFFa0I7QUFDZCxvQkFBUSxJQUhaO0FBQUEsZ0JBR2tCO0FBQ2Qsb0JBQVEsSUFKWjtBQUFBLGdCQUlrQjtBQUNkLG9CQUFRLElBTFo7QUFBQSxnQkFLa0I7QUFDZCxvQkFBUSxJQU5aO0FBQUEsZ0JBTWtCO0FBQ2Qsb0JBQVEsSUFQWixDQVRxQyxDQWdCbkI7QUFDbEI7QUFDQSxnQkFBSSxRQUFRLElBQVo7QUFBQSxnQkFBa0I7QUFDZCxvQkFBUSxJQURaO0FBQUEsZ0JBQ2tCO0FBQ2QscUJBQVMsSUFGYjtBQUFBLGdCQUVtQjtBQUNmLHFCQUFTLElBSGIsQ0FsQnFDLENBcUJsQjtBQUNuQjtBQUNBLGdCQUFJLFNBQVMsSUFBYjtBQUFBLGdCQUNJLFNBQVMsSUFEYjtBQUFBLGdCQUVJLFNBQVMsSUFGYjtBQUFBLGdCQUdJLFNBQVMsSUFIYjs7QUFLQSxvQkFBUSxJQUFSO0FBQ0kscUJBQUssVUFBTDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBSSxZQUFZLFFBQVEsQ0FBUixHQUFhLFNBQVMsTUFBVCxFQUFpQixFQUFqQixJQUF1QixLQUFLLEdBQUwsQ0FBUyxDQUFDLEdBQVYsRUFBZSxLQUFmLENBQXBDLEdBQTZELEtBQUssR0FBTCxDQUFTLEdBQVQsRUFBYyxLQUFkLENBQTdFO0FBQ0EsNEJBQVEsWUFBWSxNQUFwQjtBQUNBLDRCQUFRLElBQVI7QUFDQSw0QkFBUSxhQUFhLENBQXJCOztBQUdBO0FBQ0oscUJBQUssUUFBTDtBQUNJO0FBQ0E7QUFDQSw0QkFBUSxJQUFSO0FBQ0EsNEJBQVEsU0FBUyxDQUFULEdBQWEsSUFBckI7QUFDQSw0QkFBUSxTQUFTLEVBQVQsR0FBYyxJQUF0QjtBQUNBLDZCQUFTLFNBQVMsRUFBVCxHQUFjLElBQXZCO0FBQ0E7QUFDSixxQkFBSyxVQUFMO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUFRLElBQVI7QUFDQSw0QkFBUSxJQUFSO0FBQ0Esd0JBQUksVUFBVSxDQUFkLEVBQWlCO0FBQ2IsZ0NBQVEsSUFBUjtBQUNBLGdDQUFRLElBQVI7QUFDSCxxQkFIRCxNQUdPLElBQUksVUFBVSxDQUFkLEVBQWlCO0FBQ3BCLGdDQUFRLElBQVI7QUFDQSxnQ0FBUSxJQUFSO0FBQ0gscUJBSE0sTUFHQSxJQUFJLFVBQVUsQ0FBZCxFQUFpQjtBQUNwQixnQ0FBUSxJQUFSO0FBQ0EsZ0NBQVEsSUFBUjtBQUNILHFCQUhNLE1BR0EsSUFBSSxVQUFVLENBQWQsRUFBaUI7QUFDcEIsZ0NBQVEsSUFBUjtBQUNBLGdDQUFRLElBQVI7QUFDSCxxQkFITSxNQUdBLElBQUksVUFBVSxDQUFkLEVBQWlCO0FBQ3BCLGdDQUFRLElBQVI7QUFDQSxnQ0FBUSxJQUFSO0FBQ0gscUJBSE0sTUFHQSxJQUFJLFVBQVUsQ0FBZCxFQUFpQjtBQUNwQixnQ0FBUSxJQUFSO0FBQ0EsZ0NBQVEsSUFBUjtBQUNILHFCQUhNLE1BR0EsSUFBSSxVQUFVLENBQWQsRUFBaUI7QUFDcEIsZ0NBQVEsSUFBUjtBQUNBLGdDQUFRLElBQVI7QUFDSCxxQkFITSxNQUdBO0FBQ0gsZ0NBQVEsSUFBUjtBQUNBLGdDQUFRLElBQVI7QUFDSDtBQUNELDRCQUFRLElBQVI7QUFDQSw2QkFBUyxJQUFUOztBQUVBO0FBN0RSOztBQWdFQSxvQkFBUSxDQUFSLElBQWEsU0FBUyxDQUFULEdBQWEsS0FBMUI7QUFDQSxvQkFBUSxDQUFSLElBQWEsU0FBUyxDQUFULEdBQWEsS0FBMUI7QUFDQSxvQkFBUSxDQUFSLElBQWEsU0FBUyxDQUFULEdBQWEsS0FBMUI7QUFDQSxvQkFBUSxDQUFSLElBQWEsU0FBUyxDQUFULEdBQWEsS0FBMUI7QUFDQSxvQkFBUSxDQUFSLElBQWEsU0FBUyxDQUFULEdBQWEsS0FBMUI7QUFDQSxvQkFBUSxDQUFSLElBQWEsVUFBVSxDQUFWLEdBQWMsTUFBM0I7QUFDQSxvQkFBUSxDQUFSLElBQWEsVUFBVSxDQUFWLEdBQWMsTUFBM0I7QUFDQSxvQkFBUSxDQUFSLElBQWEsVUFBVSxDQUFWLEdBQWMsTUFBM0I7QUFDQSxvQkFBUSxHQUFSLENBQ0ksTUFBTSxRQUFOLENBQWUsRUFBZixJQUFxQixHQUFyQixHQUNBLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FEQSxHQUNxQixHQURyQixHQUVBLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FGQSxHQUVxQixHQUZyQixHQUdBLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FIQSxHQUdxQixHQUhyQixHQUlBLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FKQSxHQUlxQixHQUpyQixHQUtBLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FMQSxHQUtxQixHQUxyQixHQU1BLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FOQSxHQU1xQixHQU5yQixHQU9BLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FQQSxHQU9xQixHQVByQixHQVFBLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FSQSxHQVFxQixHQVJyQixHQVNBLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FUQSxHQVNxQixHQVRyQixHQVVBLE9BQU8sUUFBUCxDQUFnQixFQUFoQixDQVZBLEdBVXNCLEdBVnRCLEdBV0EsT0FBTyxRQUFQLENBQWdCLEVBQWhCLENBWEEsR0FXc0IsR0FYdEIsR0FZQSxPQUFPLFFBQVAsQ0FBZ0IsRUFBaEIsQ0FaQSxHQVlzQixHQVp0QixHQWFBLE9BQU8sUUFBUCxDQUFnQixFQUFoQixDQWJBLEdBYXNCLEdBYnRCLEdBY0EsT0FBTyxRQUFQLENBQWdCLEVBQWhCLENBZEEsR0Fjc0IsR0FkdEIsR0FlQSxPQUFPLFFBQVAsQ0FBZ0IsRUFBaEIsQ0FmQSxHQWVzQixHQWhCMUI7QUFrQkEsb0JBQVEsR0FBUixDQUNJLFFBQVEsQ0FBUixFQUFXLFFBQVgsQ0FBb0IsRUFBcEIsSUFBMEIsR0FBMUIsR0FDQSxRQUFRLENBQVIsRUFBVyxRQUFYLENBQW9CLEVBQXBCLENBREEsR0FDMEIsR0FEMUIsR0FFQSxRQUFRLENBQVIsRUFBVyxRQUFYLENBQW9CLEVBQXBCLENBRkEsR0FFMEIsR0FGMUIsR0FHQSxRQUFRLENBQVIsRUFBVyxRQUFYLENBQW9CLEVBQXBCLENBSEEsR0FHMEIsR0FIMUIsR0FJQSxRQUFRLENBQVIsRUFBVyxRQUFYLENBQW9CLEVBQXBCLENBSkEsR0FJMEIsR0FKMUIsR0FLQSxRQUFRLENBQVIsRUFBVyxRQUFYLENBQW9CLEVBQXBCLENBTEEsR0FLMEIsR0FMMUIsR0FNQSxRQUFRLENBQVIsRUFBVyxRQUFYLENBQW9CLEVBQXBCLENBTkEsR0FNMEIsR0FOMUIsR0FPQSxRQUFRLENBQVIsRUFBVyxRQUFYLENBQW9CLEVBQXBCLENBUko7QUFVQSxtQkFBTyxHQUFQO0FBQ0g7Ozs2Q0FFb0IsSyxFQUFPO0FBQUE7O0FBQ3hCLG1CQUFPLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsaUJBQWpCLENBQW1DLEtBQUssTUFBTCxDQUFZLE9BQVosRUFBbkMsRUFDRixJQURFLENBQ0c7QUFBQSx1QkFBVyxRQUFRLGlCQUFSLENBQTBCLE9BQUssTUFBTCxDQUFZLGFBQVosRUFBMUIsQ0FBWDtBQUFBLGFBREgsRUFFRixJQUZFLENBRUc7QUFBQSx1QkFBa0IsZUFBZSxVQUFmLENBQTBCLEtBQTFCLENBQWxCO0FBQUEsYUFGSCxDQUFQO0FBR0g7Ozs7Ozs7QUNyUUw7Ozs7Ozs7Ozs7SUFFTSxTO0FBQ0YseUJBQWE7QUFBQTtBQUNaOzs7O3lDQUVnQjtBQUFFLG1CQUFPLHNDQUFQO0FBQStDOzs7eUNBQ2pEO0FBQUUsbUJBQU8sc0NBQVA7QUFBK0M7OztnREFDMUM7QUFBRSxtQkFBTyxzQ0FBUDtBQUErQzs7O2dEQUNqRDtBQUFFLG1CQUFPLHNDQUFQO0FBQStDOzs7Ozs7SUFLaEUsWSxXQUFBLFk7QUFDVCw0QkFBYTtBQUFBOztBQUNULGFBQUssTUFBTCxHQUFjLElBQWQ7QUFDQSxhQUFLLE1BQUwsR0FBYyxJQUFJLFNBQUosRUFBZDtBQUNBLGFBQUssY0FBTCxHQUFzQixLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBdEI7QUFDQSxhQUFLLHFCQUFMLEdBQTZCLElBQUksVUFBSixDQUFlLENBQWYsQ0FBN0I7QUFDQSxhQUFLLHFCQUFMLENBQTJCLENBQTNCLElBQWdDLElBQWhDLENBTFMsQ0FLNkI7QUFDdEMsYUFBSyxxQkFBTCxDQUEyQixDQUEzQixJQUFnQyxJQUFoQyxDQU5TLENBTTZCO0FBQ3RDLGFBQUsscUJBQUwsQ0FBMkIsQ0FBM0IsSUFBZ0MsSUFBaEMsQ0FQUyxDQU82QjtBQUN0QyxhQUFLLHFCQUFMLENBQTJCLENBQTNCLElBQWdDLElBQWhDLENBUlMsQ0FRNkI7QUFDdEMsYUFBSyxxQkFBTCxDQUEyQixDQUEzQixJQUFnQyxJQUFoQyxDQVRTLENBUzZCOztBQUV0QyxhQUFLLHNCQUFMLEdBQThCLFdBQVcsSUFBWCxDQUFnQixLQUFLLHFCQUFyQixDQUE5QjtBQUNBLGFBQUssc0JBQUwsQ0FBNEIsQ0FBNUIsSUFBaUMsSUFBakMsQ0FaUyxDQVk4Qjs7QUFFdkMsYUFBSyxnQkFBTCxHQUF3QixJQUFJLFVBQUosQ0FBZSxDQUFmLENBQXhCO0FBQ0EsYUFBSyxnQkFBTCxDQUFzQixDQUF0QixJQUEyQixJQUEzQixDQWZTLENBZXdCO0FBQ2pDLGFBQUssZ0JBQUwsQ0FBc0IsQ0FBdEIsSUFBMkIsSUFBM0IsQ0FoQlMsQ0FnQndCOztBQUVqQyxhQUFLLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQTtBQUNIOztBQUVEOzs7Ozs7O2tDQUdVO0FBQUE7O0FBQ04sZ0JBQUksVUFBVTtBQUNWLDJCQUFXLENBQUM7QUFDUixnQ0FBWSxDQUFDLEtBQUssTUFBTCxDQUFZLGNBQVosRUFBRDtBQURKLGlCQUFELENBREQ7QUFJVixvQ0FBb0IsQ0FBQyxLQUFLLE1BQUwsQ0FBWSxjQUFaLEVBQUQ7QUFKVixhQUFkO0FBTUEsbUJBQU8sVUFBVSxTQUFWLENBQW9CLGFBQXBCLENBQWtDLE9BQWxDLEVBQ0YsSUFERSxDQUNHLGtCQUFVO0FBQ1osc0JBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxzQkFBSyxNQUFMLENBQVksZ0JBQVosQ0FBNkIsd0JBQTdCLEVBQXVELE1BQUssY0FBNUQ7QUFDQSx1QkFBTyxNQUFQO0FBQ0gsYUFMRSxDQUFQO0FBTUg7O0FBRUQ7Ozs7OztrQ0FHVTtBQUNOLGdCQUFJLENBQUMsS0FBSyxNQUFWLEVBQWtCO0FBQ2QsdUJBQU8sUUFBUSxNQUFSLENBQWUsMEJBQWYsQ0FBUDtBQUNILGFBRkQsTUFFTztBQUNILHFCQUFLLFNBQUwsR0FBaUIsSUFBakI7QUFDQSx1QkFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLE9BQWpCLEVBQVA7QUFDSDtBQUNKOzs7K0JBRUs7QUFBQTs7QUFDRixnQkFBRyxDQUFDLEtBQUssTUFBVCxFQUFnQjtBQUNaLHVCQUFPLFFBQVEsTUFBUixDQUFlLDBCQUFmLENBQVA7QUFDSCxhQUZELE1BRUs7QUFDRCxvQkFBSSxDQUFDLEtBQUssUUFBVixFQUFtQjtBQUNmLHlCQUFLLGVBQUwsQ0FBcUIsRUFBQyxPQUFRLEtBQVQsRUFBckI7QUFDSDtBQUNELHVCQUFPLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsaUJBQWpCLENBQW1DLEtBQUssTUFBTCxDQUFZLGNBQVosRUFBbkMsRUFDTixJQURNLENBQ0QsVUFBQyxPQUFELEVBQVc7QUFDWiw0QkFBUSxHQUFSLENBQVksMkJBQVo7QUFDQSwyQkFBTyxRQUFRLGlCQUFSLENBQTBCLE9BQUssTUFBTCxDQUFZLHFCQUFaLEVBQTFCLENBQVA7QUFDSixpQkFKTSxFQUtOLElBTE0sQ0FLRCxVQUFDLGNBQUQsRUFBa0I7QUFDbEIsNEJBQVEsR0FBUixDQUFZLGtDQUFaO0FBQ0EsMkJBQU8sZUFBZSxVQUFmLENBQTBCLE9BQUsscUJBQS9CLENBQVA7QUFDTCxpQkFSTSxFQVNOLElBVE0sQ0FTRCxZQUFJO0FBQ04sNEJBQVEsR0FBUixDQUFZLDBCQUFaO0FBQ0gsaUJBWE0sRUFZTixLQVpNLENBWUE7QUFBQSwyQkFBUyxRQUFRLEtBQVIsQ0FBYyxLQUFkLENBQVQ7QUFBQSxpQkFaQSxDQUFQO0FBYUg7QUFDSjs7O3lDQUVnQixRLEVBQVM7QUFBQTs7QUFDdEIsZ0JBQUcsQ0FBQyxLQUFLLE1BQVQsRUFBZ0I7QUFDWix1QkFBTyxRQUFRLE1BQVIsQ0FBZSwwQkFBZixDQUFQO0FBQ0gsYUFGRCxNQUVLO0FBQ0QscUJBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsaUJBQWpCLENBQW1DLEtBQUssTUFBTCxDQUFZLGNBQVosRUFBbkMsRUFDQyxJQURELENBQ00sbUJBQVM7QUFDWCw0QkFBUSxHQUFSLENBQVksdUJBQVo7QUFDQSwyQkFBTyxRQUFRLGlCQUFSLENBQTBCLE9BQUssTUFBTCxDQUFZLHFCQUFaLEVBQTFCLENBQVA7QUFDSCxpQkFKRCxFQUtDLElBTEQsQ0FLTSxVQUFDLGNBQUQsRUFBb0I7QUFDdEIsNEJBQVEsR0FBUixDQUFZLDJCQUFaO0FBQ0EsbUNBQWUsa0JBQWY7QUFDQSxtQ0FBZSxnQkFBZixDQUFnQyw0QkFBaEMsRUFBOEQsVUFBQyxFQUFELEVBQVE7QUFDbEUsNEJBQU0sVUFBVSxPQUFLLGdCQUFMLENBQXNCLEdBQUcsTUFBSCxDQUFVLEtBQWhDLENBQWhCO0FBQ0EsZ0NBQVEsR0FBUixDQUFZLFlBQVosRUFBMEIsT0FBMUI7QUFDQSw0QkFBSSxRQUFKLEVBQWE7QUFDVCxxQ0FBUyxPQUFUO0FBQ0g7QUFDSixxQkFORDtBQU9ILGlCQWZELEVBZ0JDLEtBaEJELENBZ0JPO0FBQUEsMkJBQVMsUUFBUSxLQUFSLENBQWMsS0FBZCxDQUFUO0FBQUEsaUJBaEJQO0FBaUJIO0FBQ0o7OztxQ0FFYTtBQUNWLGdCQUFJLENBQUMsS0FBSyxNQUFWLEVBQWtCO0FBQ2QsdUJBQU8sUUFBUSxNQUFSLENBQWUsMEJBQWYsQ0FBUDtBQUNILGFBRkQsTUFFTztBQUNILHFCQUFLLGVBQUwsQ0FBcUIsRUFBQyxPQUFRLFFBQVQsRUFBckI7QUFDQSx1QkFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLFVBQWpCLEVBQVA7QUFDSDtBQUNKOzs7eUNBRWdCO0FBQ2IsaUJBQUssZUFBTCxDQUFxQixFQUFDLE9BQVEsUUFBVCxFQUFyQjtBQUNBLGlCQUFLLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxvQkFBUSxHQUFSLENBQVkseUJBQVo7QUFDSDs7O3lDQUVnQixLLEVBQU87QUFDcEIsZ0JBQUksTUFBTSxRQUFOLENBQWUsQ0FBZixNQUFzQixJQUExQixFQUFnQztBQUM1QixvQkFBTSxlQUFlLE1BQU0sU0FBTixDQUFnQixDQUFoQixFQUFtQixJQUFuQixDQUFyQjtBQUNBLG9CQUFNLFVBQVU7QUFDWiw0QkFBUSxNQURJO0FBRVosNEJBQVEsTUFGSTtBQUdaLDRCQUFRLFNBSEk7QUFJWiw0QkFBUSxVQUpJO0FBS1osNEJBQVEsZ0JBTEk7QUFNWiw0QkFBUSxZQU5JO0FBT1osNEJBQVE7QUFQSSxrQkFRZCxZQVJjLENBQWhCO0FBU0EscUJBQUssZUFBTCxDQUFxQixFQUFDLFNBQVUsT0FBWCxFQUFyQjtBQUNBLHVCQUFPLEVBQUUsZ0JBQUYsRUFBUDtBQUNIO0FBQ0QsbUJBQU8sRUFBRSxTQUFTLElBQVgsRUFBUDtBQUNIOzs7OENBRWlEO0FBQUEsa0NBQWpDLEtBQWlDO0FBQUEsZ0JBQWpDLEtBQWlDLDhCQUExQixNQUEwQjtBQUFBLG9DQUFsQixPQUFrQjtBQUFBLGdCQUFsQixPQUFrQixnQ0FBUixNQUFROztBQUM5QyxnQkFBSSxVQUFVLFFBQVYsSUFBc0IsS0FBSyxRQUEvQixFQUF3QztBQUNwQyxxQkFBSyxRQUFMLENBQWMsTUFBZDtBQUNBLHFCQUFLLFFBQUwsR0FBZ0IsSUFBaEI7QUFDSCxhQUhELE1BR00sSUFBSSxVQUFVLEtBQWQsRUFBb0I7QUFDdEIsb0JBQUksS0FBSyxRQUFULEVBQWtCO0FBQ2QseUJBQUssUUFBTCxDQUFjLE1BQWQ7QUFDSDtBQUNELHFCQUFLLFFBQUwsR0FBZ0IsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0EscUJBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsV0FBNUI7QUFDQSx5QkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixLQUFLLFFBQS9CO0FBQ0gsYUFQSyxNQU9BLElBQUksS0FBSyxRQUFMLElBQWlCLE9BQWpCLElBQTRCLFdBQVcsTUFBM0MsRUFBa0Q7QUFDcEQscUJBQUssUUFBTCxDQUFjLFNBQWQsa0JBQXVDLE9BQXZDO0FBQ0g7QUFDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcblxuY29uc3QgTElORV9IRUlHSFQgPSAxLjE1O1xuY29uc3QgQURESVRJT05OQUxfSEVJR0hUID0gMC40O1xuY29uc3QgQ09MX1dJRFRIID0gMzU7XG5cbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRDb2RlSGVscGVye1xuXHRjb25zdHJ1Y3Rvcih7a2V5RWx0LCBwb3NpdGlvbkFycmF5fSl7XG5cdFx0dGhpcy5lbHRIaWdsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBoaWdobGlnaHQtJHtrZXlFbHR9YCk7XG5cdFx0dGhpcy5wb3NpdGlvbkFycmF5ID0gcG9zaXRpb25BcnJheTtcblxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKGBjb2RlLSR7a2V5RWx0fWAsIHRoaXMuX2xpc3RlbkZyYWdtZW50cy5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcihgc3RvcC1jb2RlLSR7a2V5RWx0fWAsIHRoaXMuX3VucmVnaXN0ZXJGcmFnbWVudHMuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRfcHJvZ3Jlc3NGcmFnbWVudChldmVudCl7XG5cdFx0dHJ5e1x0XHRcdFxuXHRcdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdmcmFnbWVudHNob3duJyl7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gK2V2ZW50LmZyYWdtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudC1pbmRleCcpO1xuXHRcdFx0XHRjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4XTtcblx0XHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRcdFx0aWYgKGtleSA9PT0gJ3Jvdycpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsndG9wJ10gPSBgY2FsYyg5MHB4ICsgKCR7cHJvcGVydGllc1trZXldfSAqICR7TElORV9IRUlHSFR9ZW0pKWA7XG5cdFx0XHRcdFx0fWVsc2UgaWYgKGtleSA9PT0gJ2NvbCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnbGVmdCddID0gYGNhbGMoNjBweCArICgke3Byb3BlcnRpZXNba2V5XX0gKiAke0NPTF9XSURUSH1weCkpYDtcblx0XHRcdFx0XHR9ZWxzZSBpZiAoa2V5ID09PSAnY2FsY0hlaWdodCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSBgY2FsYygke3Byb3BlcnRpZXNba2V5XX1lbSArICR7QURESVRJT05OQUxfSEVJR0hUfWVtKWA7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XHRcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSArZXZlbnQuZnJhZ21lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWZyYWdtZW50LWluZGV4Jyk7XG5cdFx0XHRcdC8vIE9uIHJlc2V0IGxlcyBwcm9wZXJ0aWVzXG5cdFx0XHRcdGxldCBwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4XTtcblx0XHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0XHRcdGlmIChrZXkgPT09ICdyb3cnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ3RvcCddID0gJyc7XG5cdFx0XHRcdFx0fWVsc2UgaWYoa2V5ID09PSAnY2FsY0hlaWdodCcpe1xuXHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSAnJztcblx0XHRcdFx0XHR9ZWxzZSBpZiAoa2V5ID09PSAnY29sJyl7XG5cdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlWydsZWZ0J10gPSAnJztcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVba2V5XSA9ICcnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaW5kZXggPiAwKXtcdFx0XHRcblx0XHRcdFx0XHRwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4IC0gMV07XG5cdFx0XHRcdFx0a2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0XHRcdFx0aWYgKGtleSA9PT0gJ3Jvdycpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnN0eWxlWyd0b3AnXSA9IGBjYWxjKDkwcHggKyAoJHtwcm9wZXJ0aWVzW2tleV19ICogJHtMSU5FX0hFSUdIVH1lbSkpYDtcblx0XHRcdFx0XHRcdH1lbHNlIGlmIChrZXkgPT09ICdjb2wnKXtcblx0XHRcdFx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuc3R5bGVbJ2xlZnQnXSA9IGBjYWxjKDYwcHggKyAoJHtwcm9wZXJ0aWVzW2tleV19ICogJHtDT0xfV0lEVEh9cHgpKWA7XG5cdFx0XHRcdFx0fWVsc2UgaWYgKGtleSA9PT0gJ2NhbGNIZWlnaHQnKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVsnaGVpZ2h0J10gPSBgY2FsYygke3Byb3BlcnRpZXNba2V5XX1lbSArICR7QURESVRJT05OQUxfSEVJR0hUfWVtKWA7XG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbHRIaWdsaWdodC5zdHlsZVtrZXldID0gcHJvcGVydGllc1trZXldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVx0XHRcdFxuXHRcdFx0fVxuXHRcdH1jYXRjaChlKXt9XG5cdH1cblxuXHRfbGlzdGVuRnJhZ21lbnRzKCl7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZyYWdtZW50c2hvd24nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdmcmFnbWVudGhpZGRlbicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRfdW5yZWdpc3RlckZyYWdtZW50cygpe1xuXHRcdFJldmVhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRoaWRkZW4nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHR9XG5cblx0XG59XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7UmV2ZWFsRW5naW5lRXZlbnRzfSBmcm9tICcuL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzJztcblxuXG4oZnVuY3Rpb24gKCkge1xuXG5cbiAgICBmdW5jdGlvbiBwYWdlTG9hZCgpIHtcbiAgICAgICAgbmV3IFJldmVhbEVuZ2luZUV2ZW50cygpO1xuICAgIH1cblxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBwYWdlTG9hZCk7XG59KSgpOyIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQge0hpZ2hsaWdodENvZGVIZWxwZXJ9IGZyb20gJy4uL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyc7XG5cbmNvbnN0IExJTkVfSEVJR0hUID0gMS4xNTtcbmNvbnN0IEFERElUSU9OTkFMX0hFSUdUID0gMC40O1xuY29uc3QgQ09MX1dJRFRIID0gMzU7XG5cbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRFdmVudHN7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0Ly8gIEJsdWV0b290aDogU2NhbiArIENvbm5lY3QgXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0IDogJ2Nvbm5lY3QtYmxlJyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW3tcblx0XHRcdFx0cm93IDogMSxcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRyb3cgOiA2LFxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXG5cdFx0XHR9XVxuXHRcdH0pO1xuXG5cdFx0Ly8gIEJsZSBDb2RlIFJlYWQgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAncmVhZC1jaGFyYWN0Jyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW3tcblx0XHRcdFx0cm93IDogMyxcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRyb3cgOiA1LFxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXG5cdFx0XHR9XVxuXHRcdH0pXG5cblx0XHQvLyAgQmxlIENvZGUgV3JpdGUgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAnd3JpdGUtY2hhcmFjdCcsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0cm93IDogOCxcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xuXHRcdFx0fV1cblx0XHR9KVxuXG5cdFx0Ly8gIEJsZSBDb2RlIFJlYWQgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQgOiAnbm90aWYtY2hhcmFjdCcsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0cm93IDogNSxcblx0XHRcdFx0d2lkdGggOiAnOTAlJyxcblx0XHRcdFx0aGVpZ2h0OiAnMTg2cHgnXG5cdFx0XHR9XVxuXHRcdH0pXG5cblxuXG5cdC8vIENvZGUgVXNlciBNZWRpYSAxXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd1c2VyLW1lZGlhLXYyJyxcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFtcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNSxcblx0XHRcdFx0d2lkdGggOiAnNzAwcHgnLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNixcblx0XHRcdFx0bGVmdCA6ICcxNTBweCcsXG5cdFx0XHRcdHdpZHRoIDogJzEwMHB4Jyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDcsXG5cdFx0XHRcdGxlZnQgOiAnMTAwcHgnLFxuXHRcdFx0XHR3aWR0aCA6ICc3MDBweCcsXG5cdFx0XHR9XG5cdFx0XHRdfSk7XG5cblxuXHRcblx0Ly8gQ29kZSBXZWIgU3BlZWNoXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd3ZWItc3BlZWNoJywgXG5cdFx0XHRwb3NpdGlvbkFycmF5Oltcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMSxcblx0XHRcdFx0d2lkdGggOiAnNDAwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAyLFxuXHRcdFx0XHR3aWR0aCA6ICc1MDBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDMsXG5cdFx0XHRcdHdpZHRoIDogJzU1MHB4J1x0XHRcdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogNSxcblx0XHRcdFx0d2lkdGggOiAnMzAwcHgnXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiA2LFxuXHRcdFx0XHR3aWR0aCA6ICczMDBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDcsXHRcdFx0XHRcblx0XHRcdFx0bGVmdCA6ICcyODBweCcsXG5cdFx0XHRcdHdpZHRoIDogJzQ1MHB4J1xuXHRcdFx0fVxuXHRcdFx0XX0pO1xuXG5cdC8vIENvZGUgV2ViIFNwZWVjaCBHcmFtbWFyXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd3ZWItc3BlZWNoLWdyYW1tYXInLCBcblx0XHRcdHBvc2l0aW9uQXJyYXkgOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDIsXG5cdFx0XHRcdHdpZHRoIDogJzc1MHB4J1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMyxcblx0XHRcdFx0d2lkdGggOiAnNzAwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiA0LFxuXHRcdFx0XHR3aWR0aCA6ICc2NTBweCdcblx0XHRcdH1cblx0XHRcdF19KTtcblxuXHQvLyBDb2RlIFdlYiBTcGVlY2ggU3ludGhlc2lzXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd3ZWItc3BlZWNoLXN5bnRoZXNpcycsIFxuXHRcdFx0cG9zaXRpb25BcnJheTogW1xuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAxLFxuXHRcdFx0XHR3aWR0aCA6ICc0MDBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDIsXG5cdFx0XHRcdHdpZHRoIDogJzQwMHB4J1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cm93IDogMyxcblx0XHRcdFx0d2lkdGggOiAnNDUwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiA0LFxuXHRcdFx0XHR3aWR0aCA6ICc2MDBweCdcblx0XHRcdH1cblx0XHRcdF19KTtcblxuXG5cdC8vIENvZGUgd3JpdGUgbmZjXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdCA6ICd3cml0ZS1uZmMnLCBcblx0XHRcdHBvc2l0aW9uQXJyYXkgOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDEsXG5cdFx0XHRcdGNvbCA6IDEsXG5cdFx0XHRcdHdpZHRoIDogJzEwNTBweCdcblx0XHRcdH1cblx0XHRcdF19KTtcblx0XG5cdC8vIENvZGUgcmVhZCBuZmNcblx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0IDogJ3JlYWQtbmZjJywgXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW1xuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAwLFxuXHRcdFx0XHRsZWZ0OiAnMzMwcHgnLFxuXHRcdFx0XHR3aWR0aCA6ICcxNTBweCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHJvdyA6IDEsXG5cdFx0XHRcdGxlZnQ6ICc5MHB4Jyxcblx0XHRcdFx0d2lkdGggOiAnNTUwcHgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRyb3cgOiAyLFxuXHRcdFx0XHRsZWZ0OiAnNTUwcHgnLFxuXHRcdFx0XHRjYWxjSGVpZ2h0OiAzLFxuXHRcdFx0XHR3aWR0aCA6ICczMDBweCdcblx0XHRcdH1cblx0XHRcdF19KTtcblxuXHR9XG59XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7SGlnaGxpZ2h0RXZlbnRzfSBmcm9tICcuL2hpZ2hsaWdodEV2ZW50cy5qcyc7XG5pbXBvcnQge0JsZVByZXpDb250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvYmxlUHJlekNvbnRyb2xlci5qcyc7XG5pbXBvcnQge1ZvaWNlUmVjb2duaXRpb25Db250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvdm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlci5qcyc7XG5pbXBvcnQge1NwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcn0gZnJvbSAnLi4vc2Vuc29ycy9zcGVlY2hTeW50aGVzaXNDb250cm9sZXIuanMnO1xuXG5cbmV4cG9ydCBjbGFzcyBSZXZlYWxFbmdpbmVFdmVudHN7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFxuXHRcdGxldCBpbklGcmFtZSA9IHdpbmRvdy50b3AgIT0gd2luZG93LnNlbGY7XG5cdFx0XG5cdFx0Ly8gTWFuYWdlbWVudCBvZiBhY3Rpb25zIGluIHByZXogbW9kZSAobm90IGluIHByZXZpZXcgbW9kZSlcblx0XHRpZiAoIWluSUZyYW1lKXtcblx0XHRcdFx0Ly8gSW5pdCBhbGwgYmxlIGFjdGlvbnNcblx0XHRcdFx0dGhpcy5fYmxlUHJlekNvbnRyb2xlciA9IG5ldyBCbGVQcmV6Q29udHJvbGVyKCk7XG5cdFx0XHRcdHRoaXMuX2JsZUV2ZW50cygpO1xuXG5cdFx0XHRcdC8vIEluaXQgVm9pY2UgYW5kIFNwZWVjaCBjb250cm9sZXJzXG5cdFx0XHRcdHRoaXMudm9pY2VSZWNvZ25pdGlvbiA9IG5ldyBWb2ljZVJlY29nbml0aW9uQ29udHJvbGVyKCk7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzID0gbmV3IFNwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcigpO1xuXHRcdFx0XHR0aGlzLl92b2ljZUV2ZW50cygpO1xuXHRcdH1cblxuXHRcdC8vIEluIGFsIGNhc2Ugd2UgaW5pdCB0aGUgaGlnaGxpZ2h0IG9mIGNvZGUuXG5cdFx0dGhpcy5faW5pdEhpZ2hsaWdodENvZGUoKTtcblxuXHR9XG5cblx0X2JsZUV2ZW50cygpe1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdzdG9wLWNvZGUtcmVhZC1jaGFyYWN0JywgZXZlbnQgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX2JsZVByZXpDb250cm9sZXIuX2N1cnJlbnRCbGVEZXZpY2UpIHtcblx0XHRcdFx0dGhpcy5fYmxlUHJlekNvbnRyb2xlci5fY3VycmVudEJsZURldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0X3ZvaWNlRXZlbnRzKCl7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvb2dsZS1hc3Npc3RhbnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF89Pntcblx0XHRcdHRoaXMuX3ZvaWNlQ2FsbEJhY2soKTtcblx0XHR9KTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZW5kLXJlY29nbml0aW9uJywgXz0+e1xuXHRcdFx0dHJ5e1xuXHRcdFx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24uc3RvcCgpO1xuXHRcdFx0fWNhdGNoKGUpe31cblx0XHR9KVxuXHR9XG5cblx0X3ZvaWNlQ2FsbEJhY2soKXtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtb1NwZWVjaCcpLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24uc3RhcnQoKGZpbmFsU3RyKT0+e1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZWVjaF9pbnB1dCcpLmlubmVySFRNTCA9IGZpbmFsU3RyO1xuXHRcdFx0aWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ8OnYSB2YScpKXtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW9TcGVlY2gnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6J2plIHZhaXMgdHLDqHMgYmllbiBtZXJjaS4gQ29tbWVudCBzZSBwYXNzZSB0YSBjb25mw6lyZW5jZSA/IEZyYW7Dp29pcyBlc3QtaWwgZ2VudGlsIGF2ZWMgdG9pID8nXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYW5nbGFpcycpKXtcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xuXHRcdFx0XHRcdHZhbHVlOiAnaGVsbG8gZXZlcnkgb25lLCB3ZWxjb21lIHRvIHRoZSBiZXN0IHRhbGsgb2YgdGhpcyBldmVudCAhJywgXG5cdFx0XHRcdFx0bGFuZ0ZyIDogZmFsc2V9XG5cdFx0XHRcdClcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1lbHNlIGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCd2b2l4Jykpe1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6ICdjb21tZSDDp2EgY1xcJ2VzdCBhc3NleiBiaXphcnJlIHBvdXIgdG9pID8nLFxuXHRcdFx0XHRcdHBpdGNoIDogMC4zLFxuXHRcdFx0XHRcdHJhdGUgOiAyfVxuXHRcdFx0XHQpXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc29tbWVzLW5vdXMnKSl7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcblx0XHRcdFx0XHR2YWx1ZTogJ1ZveW9ucyBGcmFuw6dvaXMsIG5vdXMgc29tbWVzIGRhbnMgdGEgc2Vzc2lvbiwgamUgdHJvdXZlIHF1ZSB0dSBuXFwnYXMgcGFzIGxcXCdhaXIgdHLDqHMgcsOpdmVpbGzDqSdcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1lbHNlIGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdzdWl2YW50Jykpe1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6ICdUcsOocyBiaWVuIHBhc3NvbnMgYXUgc2xpZGUgc3VpdmFudCdcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXz0+UmV2ZWFsLm5leHQoKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0bGV0IHVua25vd0FycmF5ID0gW1xuXHRcdFx0XHRcdCdBcnRpY3VsZSBzXFwnaWwgdGUgcGxhaXQnLFxuXHRcdFx0XHRcdCdLYW1vdWxveCAhJyxcblx0XHRcdFx0XHQnVHUgcG91cnJhaXMgZmFpcmUgdW4gZWZmb3J0IHF1YW5kIG3Dqm1lJyxcblx0XHRcdFx0XHQnUmV0aXJlIHRvbiBjaGV3aW5nIGd1bSBhdmFudCBkZSBwYXJsZXInXG5cdFx0XHRcdF07XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcblx0XHRcdFx0XHR2YWx1ZTogdW5rbm93QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5rbm93QXJyYXkubGVuZ3RoKV1cblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRcblxuXHRfaW5pdEhpZ2hsaWdodENvZGUoKSB7XG5cblx0XHRuZXcgSGlnaGxpZ2h0RXZlbnRzKCk7XG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHtNeW9Db250cm9sZXJ9IGZyb20gJy4uL3dlYmJsdWV0b290aC9teW9Db250cm9sZXIuanMnO1xuaW1wb3J0IHtNQm90fSBmcm9tICcuLi93ZWJibHVldG9vdGgvbWJvdENvbnRyb2xlci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCbGVQcmV6Q29udHJvbGVye1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcblx0XHR0aGlzLl9jdXJyZW50QmxlRGV2aWNlID0gbnVsbDtcblx0XHR0aGlzLl9iYXNpY0JsZUJpbmRpbmcoKTtcblx0XHR0aGlzLl9teW9CaW5kaW5nKCk7XG5cdFx0Ly8gSnVzdCBjb21tZW50IG1ib3QgcGFydCBiZWNhdXNlIGl0IGNhbiBhbHdheXMgYmUgdXNlZnVsbCAhXG5cdFx0Ly90aGlzLl9tYm90QmluZGluZygpO1xuXHR9XG5cblx0X2Jhc2ljQmxlQmluZGluZygpIHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdEJsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuXHRcdFx0XG5cdFx0XHRjb25zdCBmaWx0ZXJzID0geyBmaWx0ZXJzOiBbeyBzZXJ2aWNlczogWydiYXR0ZXJ5X3NlcnZpY2UnXSB9XSB9O1xuXHRcdFx0bmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKGZpbHRlcnMpXG5cdFx0XHQudGhlbihkZXZpY2UgPT4gZGV2aWNlLmdhdHQuY29ubmVjdCgpKVxuXHRcdFx0LnRoZW4oc2VydmVyID0+IHsgXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdCbHVldG9vdGggZGV2aWNlIGlzIGNvbm5lY3RlZC4nKTtcblx0XHRcdFx0dGhpcy5fY3VycmVudEJsZURldmljZSA9IHNlcnZlci5kZXZpY2U7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVhZENoYXJhY3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcblx0XHRcdFxuXHRcdFx0dGhpcy5fY3VycmVudEJsZURldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKCdiYXR0ZXJ5X3NlcnZpY2UnKVxuXHRcdFx0LnRoZW4oc2VydmljZSA9PiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKCdiYXR0ZXJ5X2xldmVsJykpXG5cdFx0XHQudGhlbihjaGFyYWN0ZXJpc3RpYyA9PiBjaGFyYWN0ZXJpc3RpYy5yZWFkVmFsdWUoKSlcblx0XHRcdC50aGVuKHZhbHVlID0+IHtcblx0XHRcdFx0Y29uc3QgYmF0dGVyeUxldmVsID0gdmFsdWUuZ2V0VWludDgoMCk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGBCYXR0ZXJ5IHBlcmNlbnRhZ2UgaXMgJHtiYXR0ZXJ5TGV2ZWx9JS5gKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0X215b0JpbmRpbmcoKXtcblx0XHRsZXQgbGFzdERvdWJsZVRhcCA9IDA7XG5cdFx0bGV0IG15byA9IG5ldyBNeW9Db250cm9sZXIoKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdE15bycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9Pntcblx0XHRcdFxuXHRcdFx0aWYgKCFteW8uY29ubmVjdGVkKXtcblx0XHRcdFx0bXlvLnJlcXVlc3QoKVxuXHRcdFx0XHQudGhlbihfPT5teW8uY29ubmVjdCgpKVxuXHRcdFx0XHQudGhlbigoKT0+bXlvLmluaXQoKSlcblx0XHRcdFx0LnRoZW4oKCk9Pm15by5yZWdpc3Rlckdlc3R1cmVzKChnZXN0dXJlKT0+e1xuXHRcdFx0XHRcdGlmIChnZXN0dXJlICYmIGdlc3R1cmUuZ2VzdHVyZSA9PT0gJ2RvdWJsZS10YXAnKXtcblx0XHRcdFx0XHRcdGlmKERhdGUubm93KCkgLSBsYXN0RG91YmxlVGFwIDwgMjAwMCl7XG5cdFx0XHRcdFx0XHRcdFJldmVhbC5uZXh0KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRsYXN0RG91YmxlVGFwID0gRGF0ZS5ub3coKTtcblx0XHRcdFx0XHR9IFxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZGlzY29ubmVjdC1teW8nLCBfPT57XG5cdFx0XHRteW8uZGlzY29ubmVjdCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0X21ib3RCaW5kaW5nKCl7XG5cdFx0IC8vIENoZWNrIHRoZSBjb25uZWN0aW9uXG5cdFx0IGxldCBzdGVwQ29ubmVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25uZWN0TUJvdCcpO1xuXHRcdCBsZXQgc3RlcENvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydC1idXR0b24tbWJvdCcpOyBcblx0XHQgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0TUJvdFwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF8gPT4ge1xuXHRcdFx0Ly8gUmVxdWVzdCB0aGUgZGV2aWNlXG5cdFx0XHRsZXQgbUJvdCA9IG5ldyBNQm90KCk7XG5cdFx0XHRtQm90LnJlcXVlc3QoKVxuXHRcdFx0XHQudGhlbihfID0+IHtcblx0XHRcdFx0XHQvLyBDb25uZWN0IHRvIHRoZSBtYm90XG5cdFx0XHRcdFx0cmV0dXJuIG1Cb3QuY29ubmVjdCgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihfID0+IHtcblx0XHRcdFx0XHQvLyBDb25uZWN0aW9uIGlzIGRvbmUsIHdlIHNob3cgdGhlIGNvbnRyb2xzXG5cdFx0XHRcdFx0c3RlcENvbm5lY3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0XHRcdHN0ZXBDb250cm9sLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcblxuXHRcdFx0XHRcdGxldCBwYXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcnQtYnV0dG9uJyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQ29udHJvbCB0aGUgcm9ib3QgYnkgYnV0dG9uc1xuXHRcdFx0XHRcdGxldCBidG5VcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuVXAnKTtcblx0XHRcdFx0XHRsZXQgYnRuRG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuRG93bicpO1xuXHRcdFx0XHRcdGxldCBidG5MZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5MZWZ0Jyk7XG5cdFx0XHRcdFx0bGV0IGJ0blJpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5SaWdodCcpO1xuXG5cdFx0XHRcdFx0YnRuVXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKC0yNTAsIDI1MCkgfSk7XG5cdFx0XHRcdFx0YnRuRG93bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMjUwLCAtMjUwKSB9KTtcblx0XHRcdFx0XHRidG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigyNTAsIDI1MCkgfSk7XG5cdFx0XHRcdFx0YnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKC0yNTAsIC0yNTApIH0pO1xuXG5cdFx0XHRcdFx0YnRuVXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigwLCAwKSB9KTtcblx0XHRcdFx0XHRidG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XG5cdFx0XHRcdFx0YnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApIH0pO1xuXHRcdFx0XHRcdGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XG5cdFx0XHRcdFx0XG5cblx0XHRcdFx0fSlcblx0XHR9KTtcblx0fVxuXG59XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNsYXNzIFNwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnN5bnRoID0gd2luZG93LnNwZWVjaFN5bnRoZXNpcztcblxuICAgICAgICB0aGlzLnZvaWNlRlIgPSBudWxsO1xuICAgICAgICB0aGlzLnZvaWNlRU4gPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICBfY29uZmlndXJlKCl7XG4gICAgICAgIHRoaXMuX3BvcHVsYXRlVm9pY2VMaXN0KCk7XG4gICAgICAgIGlmIChzcGVlY2hTeW50aGVzaXMub252b2ljZXNjaGFuZ2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNwZWVjaFN5bnRoZXNpcy5vbnZvaWNlc2NoYW5nZWQgPSB0aGlzLl9wb3B1bGF0ZVZvaWNlTGlzdC5iaW5kKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3BvcHVsYXRlVm9pY2VMaXN0KCkge1xuICAgICAgICBsZXQgdm9pY2VzID0gdGhpcy5zeW50aC5nZXRWb2ljZXMoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2b2ljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh2b2ljZXNbaV0ubGFuZyA9PT0gJ2ZyLUZSJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMudm9pY2VGUiA9IHZvaWNlc1tpXTtcbiAgICAgICAgICAgIH1lbHNlIGlmICh2b2ljZXNbaV0ubGFuZyA9PT0gJ2VuLUdCJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMudm9pY2VFTiA9IHZvaWNlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNwZWFrKHt2YWx1ZSwgbGFuZ0ZyID0gdHJ1ZSwgcGl0Y2ggPSAxLCByYXRlID0gMX0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+e1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMudm9pY2VGUikge1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHV0dGVyVGhpcyA9IG5ldyBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UodmFsdWUpO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnZvaWNlID0gbGFuZ0ZyID8gdGhpcy52b2ljZUZSIDogdGhpcy52b2ljZUVOO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnBpdGNoID0gcGl0Y2g7XG4gICAgICAgICAgICB1dHRlclRoaXMucmF0ZSA9IHJhdGU7XG4gICAgICAgICAgICB1dHRlclRoaXMub25lbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN5bnRoLnNwZWFrKHV0dGVyVGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgY2xhc3MgVm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBsZXQgU3BlZWNoUmVjb2duaXRpb24gPSBTcGVlY2hSZWNvZ25pdGlvbiB8fCB3ZWJraXRTcGVlY2hSZWNvZ25pdGlvblxuICAgICAgICBcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbiA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xuICAgICAgICB0aGlzLl9jb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICBzdGFydChjYWxsYmFjayl7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25yZXN1bHQgPSAoZXZlbnQpPT57XG4gICAgICAgICAgICBjb25zdCBmaW5hbFN0ciA9IGV2ZW50LnJlc3VsdHNbMF1bMF0udHJhbnNjcmlwdDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25maWRlbmNlOiAnICsgZmluYWxTdHIpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhmaW5hbFN0cik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdGFydCgpO1xuICAgIH1cblxuICAgIHN0b3AoKXtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdG9wKCk7XG4gICAgfVxuXG4gICAgX2NvbmZpZ3VyZSgpe1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLmxhbmcgPSAnZnItRlInO1xuXG4gICAgICAgIC8vIFdlIGRldGVjdCBlbmRcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbmVuZCA9IF89PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFbmQgb2YgcmVjb2duaXRpb24nKTtcbiAgICAgICAgICAgIHRoaXMucmVjb2duaXRpb24uc3RvcCgpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBXZSBkZXRlY3QgZXJyb3JzXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25lcnJvciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICduby1zcGVlY2gnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIFNwZWVjaCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdhdWRpby1jYXB0dXJlJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBtaWNyb3Bob25lJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmVudC5lcnJvciA9PSAnbm90LWFsbG93ZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vdCBBbGxvd2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07ICAgICBcbiAgICB9XG5cblxufSIsIid1c2Ugc3RyaWN0J1xuLyoqXG4gKiBDb2RlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Jpbm9tZWQvbWJvdC13ZWJibHVldG9vdGhcbiAqIFxuICovXG5cblxuY29uc3QgREVWSUNFX05BTUUgPSBcIk1ha2VibG9ja19MRVwiLFxuICAgIFNFUlZJQ0VfVVVJRCA9IFwiMDAwMGZmZTEtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIsXG4gICAgQ0hBUkFDVEVSSVNUSUNfVVVJRCA9IFwiMDAwMGZmZTMtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCI7XG5cbi8qKlxuICogR2VuZXJhbCBjb25maWd1cmF0aW9uIChVVUlEKVxuKi9cbmNsYXNzIENvbmZpZyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuYW1lKCkgeyByZXR1cm4gXCJNYWtlYmxvY2tfTEVcIjsgfVxuICAgIHNlcnZpY2UoKSB7IHJldHVybiBcIjAwMDBmZmUxLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiIH1cbiAgICBjaGFyYXRlcmlzdGljKCkgeyByZXR1cm4gXCIwMDAwZmZlMy0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIiB9XG59XG5cbi8vIENvbnN0IGZvciBpbnN0cnVjdGlvbnMgdHlwZXNcbmNvbnN0IFRZUEVfTU9UT1IgPSAweDBhLFxuICAgIFRZUEVfUkdCID0gMHgwOCxcbiAgICBUWVBFX1NPVU5EID0gMHgwNztcblxuXG4vLyBDb25zdCBmb3IgdGhlIHBvcnRzXG5jb25zdCBQT1JUXzEgPSAweDAxLFxuICAgIFBPUlRfMiA9IDB4MDIsXG4gICAgUE9SVF8zID0gMHgwMyxcbiAgICBQT1JUXzQgPSAweDA0LFxuICAgIFBPUlRfNSA9IDB4MDUsXG4gICAgUE9SVF82ID0gMHgwNixcbiAgICBQT1JUXzcgPSAweDA3LFxuICAgIFBPUlRfOCA9IDB4MDgsXG4gICAgTV8xID0gMHgwOSxcbiAgICBNXzIgPSAweDBhO1xuICAgIFxuXG4vKipcbiAqIENsYXNzIGZvciB0aGUgcm9ib3RcbiAqICovXG5leHBvcnQgY2xhc3MgTUJvdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGV2aWNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQgPSB0aGlzLm9uRGlzY29ubmVjdGVkLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYnV6emVySW5kZXggPSAwO1xuICAgIH1cblxuICAgIC8qXG4gICAgUmVxdWVzdCB0aGUgZGV2aWNlIHdpdGggYmx1ZXRvb3RoXG4gICAgKi9cbiAgICByZXF1ZXN0KCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiZmlsdGVyc1wiOiBbe1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiB0aGlzLmNvbmZpZy5uYW1lKClcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgXCJvcHRpb25hbFNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5zZXJ2aWNlKCldXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYmx1ZXRvb3RoLnJlcXVlc3REZXZpY2Uob3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGRldmljZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UgPSBkZXZpY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UuYWRkRXZlbnRMaXN0ZW5lcignZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZCcsIHRoaXMub25EaXNjb25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXZpY2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25uZWN0IHRvIHRoZSBkZXZpY2VcbiAgICAgKiAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb250cm9sIHRoZSBtb3RvcnMgb2Ygcm9ib3RcbiAgICAqL1xuICAgIHByb2Nlc3NNb3Rvcih2YWx1ZU0xLCB2YWx1ZU0yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfTU9UT1IsIE1fMSwgMCwgdmFsdWVNMSkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9NT1RPUiwgTV8yLCAwLCB2YWx1ZU0yKSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHByb2Nlc3NCdXp6ZXIoKSB7XG4gICAgICAgIHRoaXMuYnV6emVySW5kZXggPSAodGhpcy5idXp6ZXJJbmRleCArIDEpICUgODtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9TT1VORCwgUE9SVF8yLCAyMiwgdGhpcy5idXp6ZXJJbmRleCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHByb2Nlc3NDb2xvcihyZWQsYmx1ZSxncmVlbil7XG4gICAgICAgIGxldCBySGV4ID0gcmVkPDw4O1xuXHRcdGxldCBnSGV4ID0gZ3JlZW48PDE2O1xuXHRcdGxldCBiSGV4ID0gYmx1ZTw8MjQ7XG5cdFx0bGV0IHZhbHVlID0gckhleCB8IGdIZXggfCBiSGV4O1xuXHRcdHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9SR0IsUE9SVF82LDAsdmFsdWUpKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGlzY29ubmVjdGVkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnRGV2aWNlIGlzIGRpc2Nvbm5lY3RlZC4nKTtcbiAgICB9XG5cblxuICAgIF9nZW5lcmljQ29udHJvbCh0eXBlLCBwb3J0LCBzbG90LCB2YWx1ZSkge1xuICAgICAgICAvKlxuICAgICAgICBmZiA1NSBsZW4gaWR4IGFjdGlvbiBkZXZpY2UgcG9ydCAgc2xvdCAgZGF0YSBhXG4gICAgICAgIDAgIDEgIDIgICAzICAgNCAgICAgIDUgICAgICA2ICAgICA3ICAgICA4XG4gICAgICAgICovXG4gICAgICAgIC8vIFN0YXRpYyB2YWx1ZXNcbiAgICAgICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigxNik7XG4gICAgICAgIHZhciBidWZWaWV3ID0gbmV3IFVpbnQxNkFycmF5KGJ1Zik7XG5cbiAgICAgICAgdmFyIGJ5dGUwID0gMHhmZiwgLy8gU3RhdGljIGhlYWRlclxuICAgICAgICAgICAgYnl0ZTEgPSAweDU1LCAvLyBTdGF0aWMgaGVhZGVyXG4gICAgICAgICAgICBieXRlMiA9IDB4MDksIC8vIGxlblxuICAgICAgICAgICAgYnl0ZTMgPSAweDAwLCAvLyBpZHhcbiAgICAgICAgICAgIGJ5dGU0ID0gMHgwMiwgLy8gYWN0aW9uXG4gICAgICAgICAgICBieXRlNSA9IHR5cGUsIC8vIGRldmljZVxuICAgICAgICAgICAgYnl0ZTYgPSBwb3J0LCAvLyBwb3J0XG4gICAgICAgICAgICBieXRlNyA9IHNsb3Q7IC8vIHNsb3RcbiAgICAgICAgLy9keW5hbWljcyB2YWx1ZXNcbiAgICAgICAgdmFyIGJ5dGU4ID0gMHgwMCwgLy8gZGF0YVxuICAgICAgICAgICAgYnl0ZTkgPSAweDAwLCAvLyBkYXRhXG4gICAgICAgICAgICBieXRlMTAgPSAweDAwLCAvLyBkYXRhXG4gICAgICAgICAgICBieXRlMTEgPSAweDAwOyAvLyBkYXRhXG4gICAgICAgIC8vRW5kIG9mIG1lc3NhZ2VcbiAgICAgICAgdmFyIGJ5dGUxMiA9IDB4MGEsXG4gICAgICAgICAgICBieXRlMTMgPSAweDAwLFxuICAgICAgICAgICAgYnl0ZTE0ID0gMHgwMCxcbiAgICAgICAgICAgIGJ5dGUxNSA9IDB4MDA7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFRZUEVfTU9UT1I6XG4gICAgICAgICAgICAgICAgLy8gTW90b3IgTTFcbiAgICAgICAgICAgICAgICAvLyBmZjo1NSAgMDk6MDAgIDAyOjBhICAwOTo2NCAgMDA6MDAgIDAwOjAwICAwYVwiXG4gICAgICAgICAgICAgICAgLy8gMHg1NWZmOzB4MDAwOTsweDBhMDI7MHgwOTY0OzB4MDAwMDsweDAwMDA7MHgwMDBhOzB4MDAwMDtcbiAgICAgICAgICAgICAgICAvLyBNb3RvciBNMlxuICAgICAgICAgICAgICAgIC8vIGZmOjU1OjA5OjAwOjAyOjBhOjBhOjY0OjAwOjAwOjAwOjAwOjBhICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciB0ZW1wVmFsdWUgPSB2YWx1ZSA8IDAgPyAocGFyc2VJbnQoXCJmZmZmXCIsIDE2KSArIE1hdGgubWF4KC0yNTUsIHZhbHVlKSkgOiBNYXRoLm1pbigyNTUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBieXRlNyA9IHRlbXBWYWx1ZSAmIDB4MDBmZjtcbiAgICAgICAgICAgICAgICBieXRlOCA9IDB4MDA7XG4gICAgICAgICAgICAgICAgYnl0ZTggPSB0ZW1wVmFsdWUgPj4gODtcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUWVBFX1JHQjpcbiAgICAgICAgICAgICAgICAvLyBmZjo1NSAgMDk6MDAgIDAyOjA4ICAwNjowMCAgNWM6OTkgIDZkOjAwICAwYVxuICAgICAgICAgICAgICAgIC8vIDB4NTVmZjsweDAwMDk7MHgwODAyOzB4MDAwNjsweDk5NWM7MHgwMDZkOzB4MDAwYTsweDAwMDA7XG4gICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAwO1xuICAgICAgICAgICAgICAgIGJ5dGU4ID0gdmFsdWUgPj4gOCAmIDB4ZmY7XG4gICAgICAgICAgICAgICAgYnl0ZTkgPSB2YWx1ZSA+PiAxNiAmIDB4ZmY7XG4gICAgICAgICAgICAgICAgYnl0ZTEwID0gdmFsdWUgPj4gMjQgJiAweGZmO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUWVBFX1NPVU5EOlxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MDA6MDA6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjA2OjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjplZTowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6ODg6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOmI4OjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo1ZDowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6NGE6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjI2OjAxOjBhXG4gICAgICAgICAgICAgICAgYnl0ZTIgPSAweDA1O1xuICAgICAgICAgICAgICAgIGJ5dGU1ID0gMHgyMjtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDAwO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4MDY7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHhlZTtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDg4O1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4Yjg7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHg1ZDtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDRhO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDI2O1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGU4ID0gMHgwYTtcbiAgICAgICAgICAgICAgICBieXRlMTIgPSAweDAwO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBidWZWaWV3WzBdID0gYnl0ZTEgPDwgOCB8IGJ5dGUwO1xuICAgICAgICBidWZWaWV3WzFdID0gYnl0ZTMgPDwgOCB8IGJ5dGUyO1xuICAgICAgICBidWZWaWV3WzJdID0gYnl0ZTUgPDwgOCB8IGJ5dGU0O1xuICAgICAgICBidWZWaWV3WzNdID0gYnl0ZTcgPDwgOCB8IGJ5dGU2O1xuICAgICAgICBidWZWaWV3WzRdID0gYnl0ZTkgPDwgOCB8IGJ5dGU4O1xuICAgICAgICBidWZWaWV3WzVdID0gYnl0ZTExIDw8IDggfCBieXRlMTA7XG4gICAgICAgIGJ1ZlZpZXdbNl0gPSBieXRlMTMgPDwgOCB8IGJ5dGUxMjtcbiAgICAgICAgYnVmVmlld1s3XSA9IGJ5dGUxNSA8PCA4IHwgYnl0ZTE0O1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGJ5dGUwLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUyLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUzLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU0LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU1LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU2LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU3LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU4LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU5LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxMC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTEudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEyLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxMy50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTQudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTE1LnRvU3RyaW5nKDE2KSArIFwiOlwiXG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYnVmVmlld1swXS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzFdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbMl0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1szXS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzRdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbNV0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s2XS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzddLnRvU3RyaW5nKDE2KVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cblxuICAgIF93cml0ZUNoYXJhY3RlcmlzdGljKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKHRoaXMuY29uZmlnLnNlcnZpY2UoKSlcbiAgICAgICAgICAgIC50aGVuKHNlcnZpY2UgPT4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5jaGFyYXRlcmlzdGljKCkpKVxuICAgICAgICAgICAgLnRoZW4oY2hhcmFjdGVyaXN0aWMgPT4gY2hhcmFjdGVyaXN0aWMud3JpdGVWYWx1ZSh2YWx1ZSkpO1xuICAgIH1cblxuXG59XG5cblxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIE15b0NvbmZpZ3tcbiAgICBjb25zdHJ1Y3RvcigpeyAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGNvbnRyb2xTZXJ2aWNlKCkgeyByZXR1cm4gXCJkNTA2MDAwMS1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XG4gICAgZ2VzdHVyZVNlcnZpY2UoKSB7IHJldHVybiBcImQ1MDYwMDAzLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cbiAgICBjb21tYW5kQ2hhcmFjdGVyaXN0aWMoKSB7IHJldHVybiBcImQ1MDYwNDAxLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cbiAgICBnZXN0dXJlQ2hhcmFjdGVyaXN0aWMoKSB7IHJldHVybiBcImQ1MDYwMTAzLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cbiAgICBcblxufVxuXG5leHBvcnQgY2xhc3MgTXlvQ29udHJvbGVye1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuZGV2aWNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgTXlvQ29uZmlnKCk7XG4gICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQgPSB0aGlzLm9uRGlzY29ubmVjdGVkLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kID0gbmV3IFVpbnQ4QXJyYXkoNSk7XG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzBdID0gMHgwMTsgLy8gc2V0IG1vZGVcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbMV0gPSAweDAzOyAvLyBieXRlcyBpbiBwYXlsb2FkXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzJdID0gMHgwMDsgLy8gZW1nIG1vZGU6IG5vbmVcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbM10gPSAweDAwOyAvLyBpbXUgbW9kZTogZGlzYWJsZWRcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbNF0gPSAweDAxOyAvLyBjbGFzc2lmaWVyIG1vZGU6IGVuYWJsZWRcblxuICAgICAgICB0aGlzLmRpc2FibGVHZXN0dXJlc0NvbW1hbmQgPSBVaW50OEFycmF5LmZyb20odGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQpO1xuICAgICAgICB0aGlzLmRpc2FibGVHZXN0dXJlc0NvbW1hbmRbNF0gPSAweDAwOyAvLyBjbGFzc2lmaWVyIG1vZGU6IGRpc2FibGVkXG5cbiAgICAgICAgdGhpcy5kZWVwU2xlZXBDb21tYW5kID0gbmV3IFVpbnQ4QXJyYXkoMik7XG4gICAgICAgIHRoaXMuZGVlcFNsZWVwQ29tbWFuZFswXSA9IDB4MDQ7IC8vIHNldCBtb2RlXG4gICAgICAgIHRoaXMuZGVlcFNsZWVwQ29tbWFuZFsxXSA9IDB4MDA7IC8vIGJ5dGVzIGluIHBheWxvYWRcblxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVsdFBvcHVwID0gbnVsbDtcbiAgICAgICAgdGhpc1xuICAgIH1cblxuICAgIC8qXG4gICAgUmVxdWVzdCB0aGUgZGV2aWNlIHdpdGggYmx1ZXRvb3RoXG4gICAgKi9cbiAgICByZXF1ZXN0KCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiZmlsdGVyc1wiOiBbe1xuICAgICAgICAgICAgICAgIFwic2VydmljZXNcIjogW3RoaXMuY29uZmlnLmNvbnRyb2xTZXJ2aWNlKCldXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFwib3B0aW9uYWxTZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcuZ2VzdHVyZVNlcnZpY2UoKV1cbiAgICAgICAgfTsgICAgICAgIFxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihkZXZpY2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCB0aGlzLm9uRGlzY29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGV2aWNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29ubmVjdCB0byB0aGUgZGV2aWNlXG4gICAgICogKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGluaXQoKXtcbiAgICAgICAgaWYoIXRoaXMuZGV2aWNlKXtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVsdFBvcHVwKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYW5hZ2VQb3B1cEVsdCh7c3RhdGUgOiAnYWRkJ30pOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKHRoaXMuY29uZmlnLmNvbnRyb2xTZXJ2aWNlKCkpXG4gICAgICAgICAgICAudGhlbigoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gZ2V0IE15byBDb250cm9sIFNlcnZpY2UnKTtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuY29tbWFuZENoYXJhY3RlcmlzdGljKCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKGNoYXJhY3RlcmlzdGljKT0+e1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gZ2V0IE15byBDb21tYW5kIGNoYXJhY3RlcmlzdGljJyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY2hhcmFjdGVyaXN0aWMud3JpdGVWYWx1ZSh0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWFkeSB0byBsaXN0ZW4gZ2VzdHVyZXMnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlckdlc3R1cmVzKGNhbGxiYWNrKXtcbiAgICAgICAgaWYoIXRoaXMuZGV2aWNlKXtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5kZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSh0aGlzLmNvbmZpZy5nZXN0dXJlU2VydmljZSgpKVxuICAgICAgICAgICAgLnRoZW4oc2VydmljZT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IEdldCBHZXN0dXJlIFNlcnZpY2UnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5nZXN0dXJlQ2hhcmFjdGVyaXN0aWMoKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoY2hhcmFjdGVyaXN0aWMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnR2V0IGdlc3R1cmUgY2FyYWN0ZXJpc3RpYycpXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyaXN0aWMuc3RhcnROb3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyaXN0aWMuYWRkRXZlbnRMaXN0ZW5lcignY2hhcmFjdGVyaXN0aWN2YWx1ZWNoYW5nZWQnLCAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2VzdHVyZSA9IHRoaXMuX3BhcnNlTXlvR2VzdHVyZShldi50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnR2VzdHVyZSA6ICcsIGdlc3R1cmUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZ2VzdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtzdGF0ZSA6ICdyZW1vdmUnfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe3N0YXRlIDogJ3JlbW92ZSd9KTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZSBpcyBkaXNjb25uZWN0ZWQuJyk7XG4gICAgfVxuXG4gICAgX3BhcnNlTXlvR2VzdHVyZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUuZ2V0VWludDgoMCkgPT09IDB4MDMpIHtcbiAgICAgICAgICAgIGNvbnN0IGdlc3R1cmVWYWx1ZSA9IHZhbHVlLmdldFVpbnQxNigxLCB0cnVlKVxuICAgICAgICAgICAgY29uc3QgZ2VzdHVyZSA9IHtcbiAgICAgICAgICAgICAgICAweDAwMDA6ICdyZXN0JyxcbiAgICAgICAgICAgICAgICAweDAwMDE6ICdmaXN0JyxcbiAgICAgICAgICAgICAgICAweDAwMDI6ICd3YXZlLWluJyxcbiAgICAgICAgICAgICAgICAweDAwMDM6ICd3YXZlLW91dCcsXG4gICAgICAgICAgICAgICAgMHgwMDA0OiAnZmluZ2Vycy1zcHJlYWQnLFxuICAgICAgICAgICAgICAgIDB4MDAwNTogJ2RvdWJsZS10YXAnLFxuICAgICAgICAgICAgICAgIDB4ZmZmZjogJ3Vua25vd24nLFxuICAgICAgICAgICAgfVtnZXN0dXJlVmFsdWVdXG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VQb3B1cEVsdCh7Z2VzdHVyZSA6IGdlc3R1cmV9KTtcbiAgICAgICAgICAgIHJldHVybiB7IGdlc3R1cmUgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdlc3R1cmU6IG51bGwgfVxuICAgIH1cblxuICAgIF9tYW5hZ2VQb3B1cEVsdCh7c3RhdGU9ICdub25lJywgZ2VzdHVyZSA9ICdub25lJ30pe1xuICAgICAgICBpZiAoc3RhdGUgPT09ICdyZW1vdmUnICYmIHRoaXMuZWx0UG9wdXApe1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAgPSBudWxsO1xuICAgICAgICB9ZWxzZSBpZiAoc3RhdGUgPT09ICdhZGQnKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsdFBvcHVwKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVsdFBvcHVwLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5jbGFzc0xpc3QuYWRkKCdteW8tcG9wdXAnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbHRQb3B1cCk7XG4gICAgICAgIH1lbHNlIGlmICh0aGlzLmVsdFBvcHVwICYmIGdlc3R1cmUgJiYgZ2VzdHVyZSAhPSAnbm9uZScpe1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5jbGFzc05hbWUgPSBgbXlvLXBvcHVwICR7Z2VzdHVyZX1gO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
