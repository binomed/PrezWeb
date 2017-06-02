(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MIN_TOP = '95px';
var LINE_HEIGHT = '0.57em';
var ADDITIONNAL_HEIGHT = '0.4em';
var COL_WIDTH = 35;

var LEFT_TAB = '100px';

var HighlightCodeHelper = exports.HighlightCodeHelper = function () {
	function HighlightCodeHelper(_ref) {
		var _this = this;

		var keyElt = _ref.keyElt,
		    positionArray = _ref.positionArray;

		_classCallCheck(this, HighlightCodeHelper);

		this.eltHiglight = document.getElementById('highlight-' + keyElt);
		this.positionArray = positionArray;
		this.progress = Reveal.getProgress();

		Reveal.addEventListener('code-' + keyElt, function () {
			try {
				var currentProgress = Reveal.getProgress();
				_this._applyProperties(currentProgress > _this.progress ? _this.positionArray[0] : _this.positionArray[_this.positionArray.length - 1]);
				_this._listenFragments();
			} catch (e) {
				console.error(e);
			}
		});
		Reveal.addEventListener('stop-code-' + keyElt, function () {
			try {
				_this.progress = Reveal.getProgress();
				_this._unregisterFragments();
			} catch (e) {
				console.error(e);
			}
		});
	}

	_createClass(HighlightCodeHelper, [{
		key: '_applyProperties',
		value: function _applyProperties(properties) {
			try {
				var keys = Object.keys(properties);
				var area = {};
				var position = {};
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					switch (true) {
						case key === 'line':
						case key === 'nbLines':
						case key === 'col':
						case key === 'nbCols':
						case key === 'topMargin':
						case key === 'leftMargin':
							position[key] = properties[key];
							break;
						case key === 'height':
						case key === 'width':
						case key === 'top':
						case key === 'left':
							area[key] = properties[key];
							break;
						default:
					}
				}

				if (position.topMargin === undefined) {
					position.topMargin = MIN_TOP;
				}
				if (position.nbLines === undefined && area.height === undefined) {
					area.height = LINE_HEIGHT;
				}
				if (position.line === undefined && area.top === undefined) {
					area.top = 0;
				}
				if (position.nbCols === undefined && area.width === undefined) {
					area.width = 0;
				}
				if (position.col === undefined && area.left === undefined) {
					area.left = 0;
				}
				this.eltHiglight.area = area;
				this.eltHiglight.position = position;
			} catch (e) {}
		}
	}, {
		key: '_progressFragment',
		value: function _progressFragment(event) {
			try {
				var properties = null;
				if (event.type === 'fragmentshown') {
					var index = +event.fragment.getAttribute('data-fragment-index');
					properties = this.positionArray[index + 1];
				} else {
					var _index = +event.fragment.getAttribute('data-fragment-index');
					properties = this.positionArray[_index];
				}
				if (!properties) {
					return;
				}

				this._applyProperties(properties);
			} catch (e) {
				console.error(e);
			}
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
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HighlightEvents = undefined;

var _highlightCodeHelper = require("../helpers/highlightCodeHelper.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LINE_HEIGHT = 1.15;
var ADDITIONNAL_HEIGT = 0.4;
var COL_WIDTH = 35;
var LEFT_FIRST = "60px";

var HighlightEvents = exports.HighlightEvents = function HighlightEvents() {
	_classCallCheck(this, HighlightEvents);

	//  Bluetooth: Scan + Connect
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'connect-ble',
		// We start with the first fragment (the initial position is fixed by css)
		positionArray: [{
			width: '600px',
			line: 5,
			left: LEFT_FIRST
		}, {
			line: 2,
			width: '900px',
			left: LEFT_FIRST
		}, {
			line: 7,
			width: '600px',
			left: LEFT_FIRST
		}]
	});

	//  Ble Code Read Characteristic
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'read-charact',
		// We start with the first fragment (the initial position is fixed by css)
		positionArray: [{
			width: '700px',
			line: 2
		}, {
			line: 4,
			width: '90%'
		}, {
			line: 6,
			width: '90%'
		}]
	});

	//  Ble Code Write Characteristic
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'write-charact',
		// We start with the first fragment (the initial position is fixed by css)
		positionArray: [{
			width: '700px',
			line: 2
		}, {
			line: 4,
			width: '90%'
		}, {
			line: 9,
			width: '90%'
		}]
	});

	//  Ble Code Read Characteristic
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'notif-charact',
		// We start with the first fragment (the initial position is fixed by css)
		positionArray: [{
			width: '700px',
			line: 2
		}, {
			line: 4,
			width: '90%'
		}, {
			line: 6,
			width: '90%',
			nbLines: 3
		}]
	});

	// Code Web Speech
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'web-speech',
		positionArray: [{
			width: '600px',
			line: 1
		}, {
			line: 2,
			width: '450px'
		}, {
			line: 3,
			width: '550px'
		}, {
			line: 4,
			width: '550px'
		}, {
			line: 6,
			width: '350px'
		}, {
			line: 7,
			width: '350px'
		}, {
			line: 8,
			left: '280px',
			width: '500px'
		}]
	});

	// Code Web Speech Grammar
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'web-speech-grammar',
		positionArray: [{
			width: '1200px',
			line: 1
		}, {
			line: 3,
			width: '750px'
		}, {
			line: 4,
			width: '700px'
		}, {
			line: 5,
			width: '650px'
		}]
	});

	// Code Web Speech Synthesis
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'web-speech-synthesis',
		positionArray: [{
			width: '900px',
			line: 1
		}, {
			line: 2,
			width: '400px'
		}, {
			line: 3,
			width: '400px'
		}, {
			line: 4,
			width: '450px'
		}, {
			line: 5,
			width: '600px'
		}]
	});

	// Code image capture zoom
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'image-capture-zoom',
		positionArray: [{
			width: '90%',
			line: 1
		}, {
			line: 3,
			width: '90%'
		}, {
			line: 4,
			width: '90%'
		}, {
			line: 6,
			width: '90%'
		}, {
			line: 7,
			width: '90%'
		}]
	});

	// Code image capture
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: "image-capture",
		positionArray: [{
			width: "90%",
			line: 5,
			left: LEFT_FIRST
		}, {
			line: 7,
			left: LEFT_FIRST,
			width: "90%"
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
		//this._myoBinding();
		// Just comment mbot part because it can always be usefull !
		//this._mbotBinding();
	}

	_createClass(BlePrezControler, [{
		key: '_basicBleBinding',
		value: function _basicBleBinding() {
			var _this = this;

			document.getElementById('connectBle').addEventListener('click', function (event) {

				var filters = {
					filters: [{
						services: ['battery_service']
					}]
				};
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

            var value = _ref.value,
                _ref$langFr = _ref.langFr,
                langFr = _ref$langFr === undefined ? true : _ref$langFr,
                _ref$pitch = _ref.pitch,
                pitch = _ref$pitch === undefined ? 1 : _ref$pitch,
                _ref$rate = _ref.rate,
                rate = _ref$rate === undefined ? 1 : _ref$rate;

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
            var _ref$state = _ref.state,
                state = _ref$state === undefined ? 'none' : _ref$state,
                _ref$gesture = _ref.gesture,
                gesture = _ref$gesture === undefined ? 'none' : _ref$gesture;

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyIsInNjcmlwdHMvcHJlei5qcyIsInNjcmlwdHMvcHJlei9oaWdobGlnaHRFdmVudHMuanMiLCJzY3JpcHRzL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzIiwic2NyaXB0cy9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMiLCJzY3JpcHRzL3NlbnNvcnMvc3BlZWNoU3ludGhlc2lzQ29udHJvbGVyLmpzIiwic2NyaXB0cy9zZW5zb3JzL3ZvaWNlUmVjb2duaXRpb25Db250cm9sZXIuanMiLCJzY3JpcHRzL3dlYmJsdWV0b290aC9tYm90Q29udHJvbGVyLmpzIiwic2NyaXB0cy93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFVBQVUsTUFBaEI7QUFDQSxJQUFNLGNBQWMsUUFBcEI7QUFDQSxJQUFNLHFCQUFxQixPQUEzQjtBQUNBLElBQU0sWUFBWSxFQUFsQjs7QUFFQSxJQUFNLFdBQVcsT0FBakI7O0lBRWEsbUIsV0FBQSxtQjtBQUNaLG9DQUdHO0FBQUE7O0FBQUEsTUFGRixNQUVFLFFBRkYsTUFFRTtBQUFBLE1BREYsYUFDRSxRQURGLGFBQ0U7O0FBQUE7O0FBQ0YsT0FBSyxXQUFMLEdBQW1CLFNBQVMsY0FBVCxnQkFBcUMsTUFBckMsQ0FBbkI7QUFDQSxPQUFLLGFBQUwsR0FBcUIsYUFBckI7QUFDQSxPQUFLLFFBQUwsR0FBZ0IsT0FBTyxXQUFQLEVBQWhCOztBQUVBLFNBQU8sZ0JBQVAsV0FBZ0MsTUFBaEMsRUFBMkMsWUFBTTtBQUNoRCxPQUFJO0FBQ0gsUUFBTSxrQkFBa0IsT0FBTyxXQUFQLEVBQXhCO0FBQ0EsVUFBSyxnQkFBTCxDQUFzQixrQkFBa0IsTUFBSyxRQUF2QixHQUFrQyxNQUFLLGFBQUws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LE1BT0EsSUFBSSxLQUFLLFFBQUwsSUFBaUIsT0FBakIsSUFBNEIsV0FBVyxNQUEzQyxFQUFrRDtBQUNwRCxxQkFBSyxRQUFMLENBQWMsU0FBZCxrQkFBdUMsT0FBdkM7QUFDSDtBQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBNSU5fVE9QID0gJzk1cHgnO1xuY29uc3QgTElORV9IRUlHSFQgPSAnMC41N2VtJztcbmNvbnN0IEFERElUSU9OTkFMX0hFSUdIVCA9ICcwLjRlbSc7XG5jb25zdCBDT0xfV0lEVEggPSAzNTtcblxuY29uc3QgTEVGVF9UQUIgPSAnMTAwcHgnO1xuXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0Q29kZUhlbHBlciB7XG5cdGNvbnN0cnVjdG9yKHtcblx0XHRrZXlFbHQsXG5cdFx0cG9zaXRpb25BcnJheVxuXHR9KSB7XG5cdFx0dGhpcy5lbHRIaWdsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBoaWdobGlnaHQtJHtrZXlFbHR9YCk7XG5cdFx0dGhpcy5wb3NpdGlvbkFycmF5ID0gcG9zaXRpb25BcnJheTtcblx0XHR0aGlzLnByb2dyZXNzID0gUmV2ZWFsLmdldFByb2dyZXNzKCk7XG5cblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcihgY29kZS0ke2tleUVsdH1gLCAgKCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgY3VycmVudFByb2dyZXNzID0gUmV2ZWFsLmdldFByb2dyZXNzKCk7XG5cdFx0XHRcdHRoaXMuX2FwcGx5UHJvcGVydGllcyhjdXJyZW50UHJvZ3Jlc3MgPiB0aGlzLnByb2dyZXNzID8gdGhpcy5wb3NpdGlvbkFycmF5WzBdIDogdGhpcy5wb3NpdGlvbkFycmF5W3RoaXMucG9zaXRpb25BcnJheS5sZW5ndGggLSAxXSk7XG5cdFx0XHRcdHRoaXMuX2xpc3RlbkZyYWdtZW50cygpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKGBzdG9wLWNvZGUtJHtrZXlFbHR9YCwgKCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dGhpcy5wcm9ncmVzcyA9IFJldmVhbC5nZXRQcm9ncmVzcygpO1xuXHRcdFx0XHR0aGlzLl91bnJlZ2lzdGVyRnJhZ21lbnRzKCk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fVxuXG5cdF9hcHBseVByb3BlcnRpZXMocHJvcGVydGllcykge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XG5cdFx0XHRjb25zdCBhcmVhID0ge307XG5cdFx0XHRjb25zdCBwb3NpdGlvbiA9IHt9O1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRcdHN3aXRjaCAodHJ1ZSkge1xuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnbGluZSc6XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICduYkxpbmVzJzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ2NvbCc6XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICduYkNvbHMnOlxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAndG9wTWFyZ2luJzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ2xlZnRNYXJnaW4nOlxuXHRcdFx0XHRcdFx0cG9zaXRpb25ba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnaGVpZ2h0Jzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ3dpZHRoJzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ3RvcCc6XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICdsZWZ0Jzpcblx0XHRcdFx0XHRcdGFyZWFba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAocG9zaXRpb24udG9wTWFyZ2luID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cG9zaXRpb24udG9wTWFyZ2luID0gTUlOX1RPUDtcblx0XHRcdH1cblx0XHRcdGlmIChwb3NpdGlvbi5uYkxpbmVzID09PSB1bmRlZmluZWQgJiYgYXJlYS5oZWlnaHQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhcmVhLmhlaWdodCA9IExJTkVfSEVJR0hUO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc2l0aW9uLmxpbmUgPT09IHVuZGVmaW5lZCAmJiBhcmVhLnRvcCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGFyZWEudG9wID0gMDtcblx0XHRcdH1cblx0XHRcdGlmIChwb3NpdGlvbi5uYkNvbHMgPT09IHVuZGVmaW5lZCAmJiBhcmVhLndpZHRoID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YXJlYS53aWR0aCA9IDA7XG5cdFx0XHR9XG5cdFx0XHRpZiAocG9zaXRpb24uY29sID09PSB1bmRlZmluZWQgJiYgYXJlYS5sZWZ0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YXJlYS5sZWZ0ID0gMDtcblx0XHRcdH1cblx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuYXJlYSA9IGFyZWE7XG5cdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnBvc2l0aW9uID0gcG9zaXRpb247XG5cdFx0fSBjYXRjaCAoZSkge31cblx0fVxuXG5cdF9wcm9ncmVzc0ZyYWdtZW50KGV2ZW50KSB7XG5cdFx0dHJ5IHtcblx0XHRcdGxldCBwcm9wZXJ0aWVzID0gbnVsbFxuXHRcdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdmcmFnbWVudHNob3duJykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9ICtldmVudC5mcmFnbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtaW5kZXgnKTtcblx0XHRcdFx0cHJvcGVydGllcyA9IHRoaXMucG9zaXRpb25BcnJheVtpbmRleCArIDFdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9ICtldmVudC5mcmFnbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtaW5kZXgnKTtcblx0XHRcdFx0cHJvcGVydGllcyA9IHRoaXMucG9zaXRpb25BcnJheVtpbmRleF07XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXByb3BlcnRpZXMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9hcHBseVByb3BlcnRpZXMocHJvcGVydGllcyk7XG5cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGUpXG5cdFx0fVxuXHR9XG5cblx0X2xpc3RlbkZyYWdtZW50cygpIHtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRzaG93bicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZyYWdtZW50aGlkZGVuJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdF91bnJlZ2lzdGVyRnJhZ21lbnRzKCkge1xuXHRcdFJldmVhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRoaWRkZW4nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHR9XG5cblxufSIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHtSZXZlYWxFbmdpbmVFdmVudHN9IGZyb20gJy4vcHJlei9yZXZlYWxFbmdpbmVFdmVudHMuanMnO1xuXG5cbihmdW5jdGlvbiAoKSB7XG5cblxuICAgIGZ1bmN0aW9uIHBhZ2VMb2FkKCkge1xuICAgICAgICBuZXcgUmV2ZWFsRW5naW5lRXZlbnRzKCk7XG4gICAgfVxuXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHBhZ2VMb2FkKTtcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7XG5cdEhpZ2hsaWdodENvZGVIZWxwZXJcbn0gZnJvbSBcIi4uL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qc1wiO1xuXG5jb25zdCBMSU5FX0hFSUdIVCA9IDEuMTU7XG5jb25zdCBBRERJVElPTk5BTF9IRUlHVCA9IDAuNDtcbmNvbnN0IENPTF9XSURUSCA9IDM1O1xuY29uc3QgTEVGVF9GSVJTVCA9IFwiNjBweFwiO1xuXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0RXZlbnRzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Ly8gIEJsdWV0b290aDogU2NhbiArIENvbm5lY3Rcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICdjb25uZWN0LWJsZScsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0XHR3aWR0aDogJzYwMHB4Jyxcblx0XHRcdFx0XHRsaW5lOiA1LFxuXHRcdFx0XHRcdGxlZnQ6IExFRlRfRklSU1Rcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDIsXG5cdFx0XHRcdFx0d2lkdGg6ICc5MDBweCcsXG5cdFx0XHRcdFx0bGVmdDogTEVGVF9GSVJTVFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNyxcblx0XHRcdFx0XHR3aWR0aDogJzYwMHB4Jyxcblx0XHRcdFx0XHRsZWZ0OiBMRUZUX0ZJUlNUXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9KTtcblxuXHRcdC8vICBCbGUgQ29kZSBSZWFkIENoYXJhY3RlcmlzdGljXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiAncmVhZC1jaGFyYWN0Jyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHR3aWR0aDogJzcwMHB4Jyxcblx0XHRcdFx0bGluZTogMlxuXHRcdFx0fSwge1xuXHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogNixcblx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHR9XVxuXHRcdH0pXG5cblx0XHQvLyAgQmxlIENvZGUgV3JpdGUgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICd3cml0ZS1jaGFyYWN0Jyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHR3aWR0aDogJzcwMHB4Jyxcblx0XHRcdFx0bGluZTogMlxuXHRcdFx0fSwge1xuXHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogOSxcblx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHR9XVxuXHRcdH0pXG5cblx0XHQvLyAgQmxlIENvZGUgUmVhZCBDaGFyYWN0ZXJpc3RpY1xuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdDogJ25vdGlmLWNoYXJhY3QnLFxuXHRcdFx0Ly8gV2Ugc3RhcnQgd2l0aCB0aGUgZmlyc3QgZnJhZ21lbnQgKHRoZSBpbml0aWFsIHBvc2l0aW9uIGlzIGZpeGVkIGJ5IGNzcylcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFt7XG5cdFx0XHRcdHdpZHRoOiAnNzAwcHgnLFxuXHRcdFx0XHRsaW5lOiAyXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGxpbmU6IDQsXG5cdFx0XHRcdHdpZHRoOiAnOTAlJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRsaW5lOiA2LFxuXHRcdFx0XHR3aWR0aDogJzkwJScsXG5cdFx0XHRcdG5iTGluZXM6IDNcblx0XHRcdH1dXG5cdFx0fSlcblxuXG5cdFx0Ly8gQ29kZSBXZWIgU3BlZWNoXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiAnd2ViLXNwZWVjaCcsXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHRcdHdpZHRoOiAnNjAwcHgnLFxuXHRcdFx0XHRcdGxpbmU6IDFcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDIsXG5cdFx0XHRcdFx0d2lkdGg6ICc0NTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDMsXG5cdFx0XHRcdFx0d2lkdGg6ICc1NTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDQsXG5cdFx0XHRcdFx0d2lkdGg6ICc1NTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDYsXG5cdFx0XHRcdFx0d2lkdGg6ICczNTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDcsXG5cdFx0XHRcdFx0d2lkdGg6ICczNTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDgsXG5cdFx0XHRcdFx0bGVmdDogJzI4MHB4Jyxcblx0XHRcdFx0XHR3aWR0aDogJzUwMHB4J1xuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHQvLyBDb2RlIFdlYiBTcGVlY2ggR3JhbW1hclxuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdDogJ3dlYi1zcGVlY2gtZ3JhbW1hcicsXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHRcdHdpZHRoOiAnMTIwMHB4Jyxcblx0XHRcdFx0XHRsaW5lOiAxXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiAzLFxuXHRcdFx0XHRcdHdpZHRoOiAnNzUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHRcdHdpZHRoOiAnNzAwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA1LFxuXHRcdFx0XHRcdHdpZHRoOiAnNjUwcHgnXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9KTtcblxuXHRcdC8vIENvZGUgV2ViIFNwZWVjaCBTeW50aGVzaXNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICd3ZWItc3BlZWNoLXN5bnRoZXNpcycsXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHRcdHdpZHRoOiAnOTAwcHgnLFxuXHRcdFx0XHRcdGxpbmU6IDFcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDIsXG5cdFx0XHRcdFx0d2lkdGg6ICc0MDBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDMsXG5cdFx0XHRcdFx0d2lkdGg6ICc0MDBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDQsXG5cdFx0XHRcdFx0d2lkdGg6ICc0NTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDUsXG5cdFx0XHRcdFx0d2lkdGg6ICc2MDBweCdcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0Ly8gQ29kZSBpbWFnZSBjYXB0dXJlIHpvb21cblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICdpbWFnZS1jYXB0dXJlLXpvb20nLFxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0XHR3aWR0aDogJzkwJScsXG5cdFx0XHRcdFx0bGluZTogMVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogMyxcblx0XHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDQsXG5cdFx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA2LFxuXHRcdFx0XHRcdHdpZHRoOiAnOTAlJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNyxcblx0XHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0Ly8gQ29kZSBpbWFnZSBjYXB0dXJlXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiBcImltYWdlLWNhcHR1cmVcIixcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFt7XG5cdFx0XHRcdFx0d2lkdGg6IFwiOTAlXCIsXG5cdFx0XHRcdFx0bGluZTogNSxcblx0XHRcdFx0XHRsZWZ0OiBMRUZUX0ZJUlNUXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA3LFxuXHRcdFx0XHRcdGxlZnQ6IExFRlRfRklSU1QsXG5cdFx0XHRcdFx0d2lkdGg6IFwiOTAlXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdH1cbn0iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7SGlnaGxpZ2h0RXZlbnRzfSBmcm9tICcuL2hpZ2hsaWdodEV2ZW50cy5qcyc7XG5pbXBvcnQge0JsZVByZXpDb250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvYmxlUHJlekNvbnRyb2xlci5qcyc7XG5pbXBvcnQge1ZvaWNlUmVjb2duaXRpb25Db250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvdm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlci5qcyc7XG5pbXBvcnQge1NwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcn0gZnJvbSAnLi4vc2Vuc29ycy9zcGVlY2hTeW50aGVzaXNDb250cm9sZXIuanMnO1xuXG5cbmV4cG9ydCBjbGFzcyBSZXZlYWxFbmdpbmVFdmVudHN7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFxuXHRcdGxldCBpbklGcmFtZSA9IHdpbmRvdy50b3AgIT0gd2luZG93LnNlbGY7XG5cdFx0XG5cdFx0Ly8gTWFuYWdlbWVudCBvZiBhY3Rpb25zIGluIHByZXogbW9kZSAobm90IGluIHByZXZpZXcgbW9kZSlcblx0XHRpZiAoIWluSUZyYW1lKXtcblx0XHRcdFx0Ly8gSW5pdCBhbGwgYmxlIGFjdGlvbnNcblx0XHRcdFx0dGhpcy5fYmxlUHJlekNvbnRyb2xlciA9IG5ldyBCbGVQcmV6Q29udHJvbGVyKCk7XG5cdFx0XHRcdHRoaXMuX2JsZUV2ZW50cygpO1xuXG5cdFx0XHRcdC8vIEluaXQgVm9pY2UgYW5kIFNwZWVjaCBjb250cm9sZXJzXG5cdFx0XHRcdHRoaXMudm9pY2VSZWNvZ25pdGlvbiA9IG5ldyBWb2ljZVJlY29nbml0aW9uQ29udHJvbGVyKCk7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzID0gbmV3IFNwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcigpO1xuXHRcdFx0XHR0aGlzLl92b2ljZUV2ZW50cygpO1xuXHRcdH1cblxuXHRcdC8vIEluIGFsIGNhc2Ugd2UgaW5pdCB0aGUgaGlnaGxpZ2h0IG9mIGNvZGUuXG5cdFx0dGhpcy5faW5pdEhpZ2hsaWdodENvZGUoKTtcblxuXHR9XG5cblx0X2JsZUV2ZW50cygpe1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdzdG9wLWNvZGUtcmVhZC1jaGFyYWN0JywgZXZlbnQgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX2JsZVByZXpDb250cm9sZXIuX2N1cnJlbnRCbGVEZXZpY2UpIHtcblx0XHRcdFx0dGhpcy5fYmxlUHJlekNvbnRyb2xlci5fY3VycmVudEJsZURldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0X3ZvaWNlRXZlbnRzKCl7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvb2dsZS1hc3Npc3RhbnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF89Pntcblx0XHRcdHRoaXMuX3ZvaWNlQ2FsbEJhY2soKTtcblx0XHR9KTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZW5kLXJlY29nbml0aW9uJywgXz0+e1xuXHRcdFx0dHJ5e1xuXHRcdFx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24uc3RvcCgpO1xuXHRcdFx0fWNhdGNoKGUpe31cblx0XHR9KVxuXHR9XG5cblx0X3ZvaWNlQ2FsbEJhY2soKXtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtb1NwZWVjaCcpLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24uc3RhcnQoKGZpbmFsU3RyKT0+e1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZWVjaF9pbnB1dCcpLmlubmVySFRNTCA9IGZpbmFsU3RyO1xuXHRcdFx0aWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ8OnYSB2YScpKXtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW9TcGVlY2gnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6J2plIHZhaXMgdHLDqHMgYmllbiBtZXJjaS4gQ29tbWVudCBzZSBwYXNzZSB0YSBjb25mw6lyZW5jZSA/IEZyYW7Dp29pcyBlc3QtaWwgZ2VudGlsIGF2ZWMgdG9pID8nXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYW5nbGFpcycpKXtcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xuXHRcdFx0XHRcdHZhbHVlOiAnaGVsbG8gZXZlcnkgb25lLCB3ZWxjb21lIHRvIHRoZSBiZXN0IHRhbGsgb2YgdGhpcyBldmVudCAhJywgXG5cdFx0XHRcdFx0bGFuZ0ZyIDogZmFsc2V9XG5cdFx0XHRcdClcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1lbHNlIGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCd2b2l4Jykpe1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6ICdjb21tZSDDp2EgY1xcJ2VzdCBhc3NleiBiaXphcnJlIHBvdXIgdG9pID8nLFxuXHRcdFx0XHRcdHBpdGNoIDogMixcblx0XHRcdFx0XHRyYXRlIDogMC4zfVxuXHRcdFx0XHQpXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc29tbWVzLW5vdXMnKSl7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcblx0XHRcdFx0XHR2YWx1ZTogJ1ZveW9ucyBGcmFuw6dvaXMsIG5vdXMgc29tbWVzIGRhbnMgdGEgc2Vzc2lvbiwgamUgdHJvdXZlIHF1ZSB0dSBuXFwnYXMgcGFzIGxcXCdhaXIgdHLDqHMgcsOpdmVpbGzDqSdcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1lbHNlIGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdzdWl2YW50Jykpe1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6ICdUcsOocyBiaWVuIHBhc3NvbnMgYXUgc2xpZGUgc3VpdmFudCdcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXz0+UmV2ZWFsLm5leHQoKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0bGV0IHVua25vd0FycmF5ID0gW1xuXHRcdFx0XHRcdCdBcnRpY3VsZSBzXFwnaWwgdGUgcGxhaXQnLFxuXHRcdFx0XHRcdCdLYW1vdWxveCAhJyxcblx0XHRcdFx0XHQnVHUgcG91cnJhaXMgZmFpcmUgdW4gZWZmb3J0IHF1YW5kIG3Dqm1lJyxcblx0XHRcdFx0XHQnUmV0aXJlIHRvbiBjaGV3aW5nIGd1bSBhdmFudCBkZSBwYXJsZXInXG5cdFx0XHRcdF07XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcblx0XHRcdFx0XHR2YWx1ZTogdW5rbm93QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5rbm93QXJyYXkubGVuZ3RoKV1cblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRcblxuXHRfaW5pdEhpZ2hsaWdodENvZGUoKSB7XG5cblx0XHRuZXcgSGlnaGxpZ2h0RXZlbnRzKCk7XG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHtcblx0TXlvQ29udHJvbGVyXG59IGZyb20gJy4uL3dlYmJsdWV0b290aC9teW9Db250cm9sZXIuanMnO1xuaW1wb3J0IHtcblx0TUJvdFxufSBmcm9tICcuLi93ZWJibHVldG9vdGgvbWJvdENvbnRyb2xlci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCbGVQcmV6Q29udHJvbGVyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHR0aGlzLl9jdXJyZW50QmxlRGV2aWNlID0gbnVsbDtcblx0XHR0aGlzLl9iYXNpY0JsZUJpbmRpbmcoKTtcblx0XHQvL3RoaXMuX215b0JpbmRpbmcoKTtcblx0XHQvLyBKdXN0IGNvbW1lbnQgbWJvdCBwYXJ0IGJlY2F1c2UgaXQgY2FuIGFsd2F5cyBiZSB1c2VmdWxsICFcblx0XHQvL3RoaXMuX21ib3RCaW5kaW5nKCk7XG5cdH1cblxuXHRfYmFzaWNCbGVCaW5kaW5nKCkge1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25uZWN0QmxlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG5cblx0XHRcdGNvbnN0IGZpbHRlcnMgPSB7XG5cdFx0XHRcdGZpbHRlcnM6IFt7XG5cdFx0XHRcdFx0c2VydmljZXM6IFsnYmF0dGVyeV9zZXJ2aWNlJ11cblx0XHRcdFx0fV1cblx0XHRcdH07XG5cdFx0XHRuYXZpZ2F0b3IuYmx1ZXRvb3RoLnJlcXVlc3REZXZpY2UoZmlsdGVycylcblx0XHRcdFx0LnRoZW4oZGV2aWNlID0+IGRldmljZS5nYXR0LmNvbm5lY3QoKSlcblx0XHRcdFx0LnRoZW4oc2VydmVyID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnQmx1ZXRvb3RoIGRldmljZSBpcyBjb25uZWN0ZWQuJyk7XG5cdFx0XHRcdFx0dGhpcy5fY3VycmVudEJsZURldmljZSA9IHNlcnZlci5kZXZpY2U7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWFkQ2hhcmFjdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuXG5cdFx0XHR0aGlzLl9jdXJyZW50QmxlRGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UoJ2JhdHRlcnlfc2VydmljZScpXG5cdFx0XHRcdC50aGVuKHNlcnZpY2UgPT4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYygnYmF0dGVyeV9sZXZlbCcpKVxuXHRcdFx0XHQudGhlbihjaGFyYWN0ZXJpc3RpYyA9PiBjaGFyYWN0ZXJpc3RpYy5yZWFkVmFsdWUoKSlcblx0XHRcdFx0LnRoZW4odmFsdWUgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGJhdHRlcnlMZXZlbCA9IHZhbHVlLmdldFVpbnQ4KDApO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGBCYXR0ZXJ5IHBlcmNlbnRhZ2UgaXMgJHtiYXR0ZXJ5TGV2ZWx9JS5gKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRfbXlvQmluZGluZygpIHtcblx0XHRsZXQgbGFzdERvdWJsZVRhcCA9IDA7XG5cdFx0bGV0IG15byA9IG5ldyBNeW9Db250cm9sZXIoKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdE15bycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG5cdFx0XHRpZiAoIW15by5jb25uZWN0ZWQpIHtcblx0XHRcdFx0bXlvLnJlcXVlc3QoKVxuXHRcdFx0XHRcdC50aGVuKF8gPT4gbXlvLmNvbm5lY3QoKSlcblx0XHRcdFx0XHQudGhlbigoKSA9PiBteW8uaW5pdCgpKVxuXHRcdFx0XHRcdC50aGVuKCgpID0+IG15by5yZWdpc3Rlckdlc3R1cmVzKChnZXN0dXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoZ2VzdHVyZSAmJiBnZXN0dXJlLmdlc3R1cmUgPT09ICdkb3VibGUtdGFwJykge1xuXHRcdFx0XHRcdFx0XHRpZiAoRGF0ZS5ub3coKSAtIGxhc3REb3VibGVUYXAgPCAyMDAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0UmV2ZWFsLm5leHQoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRsYXN0RG91YmxlVGFwID0gRGF0ZS5ub3coKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZGlzY29ubmVjdC1teW8nLCBfID0+IHtcblx0XHRcdG15by5kaXNjb25uZWN0KCk7XG5cdFx0fSk7XG5cdH1cblxuXHRfbWJvdEJpbmRpbmcoKSB7XG5cdFx0Ly8gQ2hlY2sgdGhlIGNvbm5lY3Rpb25cblx0XHRsZXQgc3RlcENvbm5lY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdE1Cb3QnKTtcblx0XHRsZXQgc3RlcENvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydC1idXR0b24tbWJvdCcpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ubmVjdE1Cb3RcIikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfID0+IHtcblx0XHRcdC8vIFJlcXVlc3QgdGhlIGRldmljZVxuXHRcdFx0bGV0IG1Cb3QgPSBuZXcgTUJvdCgpO1xuXHRcdFx0bUJvdC5yZXF1ZXN0KClcblx0XHRcdFx0LnRoZW4oXyA9PiB7XG5cdFx0XHRcdFx0Ly8gQ29ubmVjdCB0byB0aGUgbWJvdFxuXHRcdFx0XHRcdHJldHVybiBtQm90LmNvbm5lY3QoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXyA9PiB7XG5cdFx0XHRcdFx0Ly8gQ29ubmVjdGlvbiBpcyBkb25lLCB3ZSBzaG93IHRoZSBjb250cm9sc1xuXHRcdFx0XHRcdHN0ZXBDb25uZWN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdFx0XHRzdGVwQ29udHJvbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG5cblx0XHRcdFx0XHRsZXQgcGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJ0LWJ1dHRvbicpO1xuXG5cdFx0XHRcdFx0Ly8gQ29udHJvbCB0aGUgcm9ib3QgYnkgYnV0dG9uc1xuXHRcdFx0XHRcdGxldCBidG5VcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuVXAnKTtcblx0XHRcdFx0XHRsZXQgYnRuRG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuRG93bicpO1xuXHRcdFx0XHRcdGxldCBidG5MZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5MZWZ0Jyk7XG5cdFx0XHRcdFx0bGV0IGJ0blJpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5SaWdodCcpO1xuXG5cdFx0XHRcdFx0YnRuVXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7XG5cdFx0XHRcdFx0XHRtQm90LnByb2Nlc3NNb3RvcigtMjUwLCAyNTApXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnRuRG93bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHtcblx0XHRcdFx0XHRcdG1Cb3QucHJvY2Vzc01vdG9yKDI1MCwgLTI1MClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRidG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4ge1xuXHRcdFx0XHRcdFx0bUJvdC5wcm9jZXNzTW90b3IoMjUwLCAyNTApXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7XG5cdFx0XHRcdFx0XHRtQm90LnByb2Nlc3NNb3RvcigtMjUwLCAtMjUwKVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0YnRuVXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4ge1xuXHRcdFx0XHRcdFx0bUJvdC5wcm9jZXNzTW90b3IoMCwgMClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRidG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHtcblx0XHRcdFx0XHRcdG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7XG5cdFx0XHRcdFx0XHRtQm90LnByb2Nlc3NNb3RvcigwLCAwKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHtcblx0XHRcdFx0XHRcdG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApXG5cdFx0XHRcdFx0fSk7XG5cblxuXHRcdFx0XHR9KVxuXHRcdH0pO1xuXHR9XG5cbn0iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNsYXNzIFNwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnN5bnRoID0gd2luZG93LnNwZWVjaFN5bnRoZXNpcztcblxuICAgICAgICB0aGlzLnZvaWNlRlIgPSBudWxsO1xuICAgICAgICB0aGlzLnZvaWNlRU4gPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICBfY29uZmlndXJlKCl7XG4gICAgICAgIHRoaXMuX3BvcHVsYXRlVm9pY2VMaXN0KCk7XG4gICAgICAgIGlmIChzcGVlY2hTeW50aGVzaXMub252b2ljZXNjaGFuZ2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNwZWVjaFN5bnRoZXNpcy5vbnZvaWNlc2NoYW5nZWQgPSB0aGlzLl9wb3B1bGF0ZVZvaWNlTGlzdC5iaW5kKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3BvcHVsYXRlVm9pY2VMaXN0KCkge1xuICAgICAgICBsZXQgdm9pY2VzID0gdGhpcy5zeW50aC5nZXRWb2ljZXMoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2b2ljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh2b2ljZXNbaV0ubGFuZyA9PT0gJ2ZyLUZSJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMudm9pY2VGUiA9IHZvaWNlc1tpXTtcbiAgICAgICAgICAgIH1lbHNlIGlmICh2b2ljZXNbaV0ubGFuZyA9PT0gJ2VuLUdCJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMudm9pY2VFTiA9IHZvaWNlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNwZWFrKHt2YWx1ZSwgbGFuZ0ZyID0gdHJ1ZSwgcGl0Y2ggPSAxLCByYXRlID0gMX0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+e1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMudm9pY2VGUikge1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHV0dGVyVGhpcyA9IG5ldyBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UodmFsdWUpO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnZvaWNlID0gbGFuZ0ZyID8gdGhpcy52b2ljZUZSIDogdGhpcy52b2ljZUVOO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnBpdGNoID0gcGl0Y2g7XG4gICAgICAgICAgICB1dHRlclRoaXMucmF0ZSA9IHJhdGU7XG4gICAgICAgICAgICB1dHRlclRoaXMub25lbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN5bnRoLnNwZWFrKHV0dGVyVGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgY2xhc3MgVm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBsZXQgU3BlZWNoUmVjb2duaXRpb24gPSBTcGVlY2hSZWNvZ25pdGlvbiB8fCB3ZWJraXRTcGVlY2hSZWNvZ25pdGlvblxuICAgICAgICBcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbiA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xuICAgICAgICB0aGlzLl9jb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICBzdGFydChjYWxsYmFjayl7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25yZXN1bHQgPSAoZXZlbnQpPT57XG4gICAgICAgICAgICBjb25zdCBmaW5hbFN0ciA9IGV2ZW50LnJlc3VsdHNbMF1bMF0udHJhbnNjcmlwdDtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ0NvbmZpZGVuY2U6ICcgKyBmaW5hbFN0cik7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZpbmFsU3RyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgc3RvcCgpe1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKTtcbiAgICB9XG5cbiAgICBfY29uZmlndXJlKCl7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ubGFuZyA9ICdmci1GUic7XG5cbiAgICAgICAgLy8gV2UgZGV0ZWN0IGVuZFxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZW5kID0gXz0+e1xuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnRW5kIG9mIHJlY29nbml0aW9uJyk7XG4gICAgICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gV2UgZGV0ZWN0IGVycm9yc1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5lcnJvciA9PSAnbm8tc3BlZWNoJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ05vIFNwZWVjaCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdhdWRpby1jYXB0dXJlJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ05vIG1pY3JvcGhvbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdub3QtYWxsb3dlZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdOb3QgQWxsb3dlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9OyAgICAgXG4gICAgfVxuXG5cbn0iLCIndXNlIHN0cmljdCdcbi8qKlxuICogQ29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9iaW5vbWVkL21ib3Qtd2ViYmx1ZXRvb3RoXG4gKiBcbiAqL1xuXG5cbmNvbnN0IERFVklDRV9OQU1FID0gXCJNYWtlYmxvY2tfTEVcIixcbiAgICBTRVJWSUNFX1VVSUQgPSBcIjAwMDBmZmUxLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiLFxuICAgIENIQVJBQ1RFUklTVElDX1VVSUQgPSBcIjAwMDBmZmUzLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiO1xuXG4vKipcbiAqIEdlbmVyYWwgY29uZmlndXJhdGlvbiAoVVVJRClcbiovXG5jbGFzcyBDb25maWcge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmFtZSgpIHsgcmV0dXJuIFwiTWFrZWJsb2NrX0xFXCI7IH1cbiAgICBzZXJ2aWNlKCkgeyByZXR1cm4gXCIwMDAwZmZlMS0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIiB9XG4gICAgY2hhcmF0ZXJpc3RpYygpIHsgcmV0dXJuIFwiMDAwMGZmZTMtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIgfVxufVxuXG4vLyBDb25zdCBmb3IgaW5zdHJ1Y3Rpb25zIHR5cGVzXG5jb25zdCBUWVBFX01PVE9SID0gMHgwYSxcbiAgICBUWVBFX1JHQiA9IDB4MDgsXG4gICAgVFlQRV9TT1VORCA9IDB4MDc7XG5cblxuLy8gQ29uc3QgZm9yIHRoZSBwb3J0c1xuY29uc3QgUE9SVF8xID0gMHgwMSxcbiAgICBQT1JUXzIgPSAweDAyLFxuICAgIFBPUlRfMyA9IDB4MDMsXG4gICAgUE9SVF80ID0gMHgwNCxcbiAgICBQT1JUXzUgPSAweDA1LFxuICAgIFBPUlRfNiA9IDB4MDYsXG4gICAgUE9SVF83ID0gMHgwNyxcbiAgICBQT1JUXzggPSAweDA4LFxuICAgIE1fMSA9IDB4MDksXG4gICAgTV8yID0gMHgwYTtcbiAgICBcblxuLyoqXG4gKiBDbGFzcyBmb3IgdGhlIHJvYm90XG4gKiAqL1xuZXhwb3J0IGNsYXNzIE1Cb3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRldmljZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdGVkID0gdGhpcy5vbkRpc2Nvbm5lY3RlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJ1enplckluZGV4ID0gMDtcbiAgICB9XG5cbiAgICAvKlxuICAgIFJlcXVlc3QgdGhlIGRldmljZSB3aXRoIGJsdWV0b290aFxuICAgICovXG4gICAgcmVxdWVzdCgpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcImZpbHRlcnNcIjogW3tcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogdGhpcy5jb25maWcubmFtZSgpXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFwib3B0aW9uYWxTZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcuc2VydmljZSgpXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihkZXZpY2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCB0aGlzLm9uRGlzY29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGV2aWNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29ubmVjdCB0byB0aGUgZGV2aWNlXG4gICAgICogKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udHJvbCB0aGUgbW90b3JzIG9mIHJvYm90XG4gICAgKi9cbiAgICBwcm9jZXNzTW90b3IodmFsdWVNMSwgdmFsdWVNMikge1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX01PVE9SLCBNXzEsIDAsIHZhbHVlTTEpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfTU9UT1IsIE1fMiwgMCwgdmFsdWVNMikpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcm9jZXNzQnV6emVyKCkge1xuICAgICAgICB0aGlzLmJ1enplckluZGV4ID0gKHRoaXMuYnV6emVySW5kZXggKyAxKSAlIDg7XG4gICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfU09VTkQsIFBPUlRfMiwgMjIsIHRoaXMuYnV6emVySW5kZXgpKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwcm9jZXNzQ29sb3IocmVkLGJsdWUsZ3JlZW4pe1xuICAgICAgICBsZXQgckhleCA9IHJlZDw8ODtcblx0XHRsZXQgZ0hleCA9IGdyZWVuPDwxNjtcblx0XHRsZXQgYkhleCA9IGJsdWU8PDI0O1xuXHRcdGxldCB2YWx1ZSA9IHJIZXggfCBnSGV4IHwgYkhleDtcblx0XHR0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfUkdCLFBPUlRfNiwwLHZhbHVlKSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZSBpcyBkaXNjb25uZWN0ZWQuJyk7XG4gICAgfVxuXG5cbiAgICBfZ2VuZXJpY0NvbnRyb2wodHlwZSwgcG9ydCwgc2xvdCwgdmFsdWUpIHtcbiAgICAgICAgLypcbiAgICAgICAgZmYgNTUgbGVuIGlkeCBhY3Rpb24gZGV2aWNlIHBvcnQgIHNsb3QgIGRhdGEgYVxuICAgICAgICAwICAxICAyICAgMyAgIDQgICAgICA1ICAgICAgNiAgICAgNyAgICAgOFxuICAgICAgICAqL1xuICAgICAgICAvLyBTdGF0aWMgdmFsdWVzXG4gICAgICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMTYpO1xuICAgICAgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50MTZBcnJheShidWYpO1xuXG4gICAgICAgIHZhciBieXRlMCA9IDB4ZmYsIC8vIFN0YXRpYyBoZWFkZXJcbiAgICAgICAgICAgIGJ5dGUxID0gMHg1NSwgLy8gU3RhdGljIGhlYWRlclxuICAgICAgICAgICAgYnl0ZTIgPSAweDA5LCAvLyBsZW5cbiAgICAgICAgICAgIGJ5dGUzID0gMHgwMCwgLy8gaWR4XG4gICAgICAgICAgICBieXRlNCA9IDB4MDIsIC8vIGFjdGlvblxuICAgICAgICAgICAgYnl0ZTUgPSB0eXBlLCAvLyBkZXZpY2VcbiAgICAgICAgICAgIGJ5dGU2ID0gcG9ydCwgLy8gcG9ydFxuICAgICAgICAgICAgYnl0ZTcgPSBzbG90OyAvLyBzbG90XG4gICAgICAgIC8vZHluYW1pY3MgdmFsdWVzXG4gICAgICAgIHZhciBieXRlOCA9IDB4MDAsIC8vIGRhdGFcbiAgICAgICAgICAgIGJ5dGU5ID0gMHgwMCwgLy8gZGF0YVxuICAgICAgICAgICAgYnl0ZTEwID0gMHgwMCwgLy8gZGF0YVxuICAgICAgICAgICAgYnl0ZTExID0gMHgwMDsgLy8gZGF0YVxuICAgICAgICAvL0VuZCBvZiBtZXNzYWdlXG4gICAgICAgIHZhciBieXRlMTIgPSAweDBhLFxuICAgICAgICAgICAgYnl0ZTEzID0gMHgwMCxcbiAgICAgICAgICAgIGJ5dGUxNCA9IDB4MDAsXG4gICAgICAgICAgICBieXRlMTUgPSAweDAwO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBUWVBFX01PVE9SOlxuICAgICAgICAgICAgICAgIC8vIE1vdG9yIE0xXG4gICAgICAgICAgICAgICAgLy8gZmY6NTUgIDA5OjAwICAwMjowYSAgMDk6NjQgIDAwOjAwICAwMDowMCAgMGFcIlxuICAgICAgICAgICAgICAgIC8vIDB4NTVmZjsweDAwMDk7MHgwYTAyOzB4MDk2NDsweDAwMDA7MHgwMDAwOzB4MDAwYTsweDAwMDA7XG4gICAgICAgICAgICAgICAgLy8gTW90b3IgTTJcbiAgICAgICAgICAgICAgICAvLyBmZjo1NTowOTowMDowMjowYTowYTo2NDowMDowMDowMDowMDowYSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgdGVtcFZhbHVlID0gdmFsdWUgPCAwID8gKHBhcnNlSW50KFwiZmZmZlwiLCAxNikgKyBNYXRoLm1heCgtMjU1LCB2YWx1ZSkpIDogTWF0aC5taW4oMjU1LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnl0ZTcgPSB0ZW1wVmFsdWUgJiAweDAwZmY7XG4gICAgICAgICAgICAgICAgYnl0ZTggPSAweDAwO1xuICAgICAgICAgICAgICAgIGJ5dGU4ID0gdGVtcFZhbHVlID4+IDg7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVFlQRV9SR0I6XG4gICAgICAgICAgICAgICAgLy8gZmY6NTUgIDA5OjAwICAwMjowOCAgMDY6MDAgIDVjOjk5ICA2ZDowMCAgMGFcbiAgICAgICAgICAgICAgICAvLyAweDU1ZmY7MHgwMDA5OzB4MDgwMjsweDAwMDY7MHg5OTVjOzB4MDA2ZDsweDAwMGE7MHgwMDAwO1xuICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMDtcbiAgICAgICAgICAgICAgICBieXRlOCA9IHZhbHVlID4+IDggJiAweGZmO1xuICAgICAgICAgICAgICAgIGJ5dGU5ID0gdmFsdWUgPj4gMTYgJiAweGZmO1xuICAgICAgICAgICAgICAgIGJ5dGUxMCA9IHZhbHVlID4+IDI0ICYgMHhmZjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVFlQRV9TT1VORDpcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjAwOjAwOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjowNjowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6ZWU6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjg4OjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjpiODowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6NWQ6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjRhOjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjoyNjowMTowYVxuICAgICAgICAgICAgICAgIGJ5dGUyID0gMHgwNTtcbiAgICAgICAgICAgICAgICBieXRlNSA9IDB4MjI7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgwMDtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDA2O1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4ZWU7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHg4ODtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweGI4O1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gNSkge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4NWQ7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHg0YTtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgyNjtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlOCA9IDB4MGE7XG4gICAgICAgICAgICAgICAgYnl0ZTEyID0gMHgwMDtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgYnVmVmlld1swXSA9IGJ5dGUxIDw8IDggfCBieXRlMDtcbiAgICAgICAgYnVmVmlld1sxXSA9IGJ5dGUzIDw8IDggfCBieXRlMjtcbiAgICAgICAgYnVmVmlld1syXSA9IGJ5dGU1IDw8IDggfCBieXRlNDtcbiAgICAgICAgYnVmVmlld1szXSA9IGJ5dGU3IDw8IDggfCBieXRlNjtcbiAgICAgICAgYnVmVmlld1s0XSA9IGJ5dGU5IDw8IDggfCBieXRlODtcbiAgICAgICAgYnVmVmlld1s1XSA9IGJ5dGUxMSA8PCA4IHwgYnl0ZTEwO1xuICAgICAgICBidWZWaWV3WzZdID0gYnl0ZTEzIDw8IDggfCBieXRlMTI7XG4gICAgICAgIGJ1ZlZpZXdbN10gPSBieXRlMTUgPDwgOCB8IGJ5dGUxNDtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBieXRlMC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMi50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMy50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNi50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNy50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlOC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlOS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTAudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTExLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxMi50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTMudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTE0LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxNS50b1N0cmluZygxNikgKyBcIjpcIlxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGJ1ZlZpZXdbMF0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1sxXS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzJdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbM10udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s0XS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzVdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbNl0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s3XS50b1N0cmluZygxNilcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICBfd3JpdGVDaGFyYWN0ZXJpc3RpYyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSh0aGlzLmNvbmZpZy5zZXJ2aWNlKCkpXG4gICAgICAgICAgICAudGhlbihzZXJ2aWNlID0+IHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuY2hhcmF0ZXJpc3RpYygpKSlcbiAgICAgICAgICAgIC50aGVuKGNoYXJhY3RlcmlzdGljID0+IGNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUodmFsdWUpKTtcbiAgICB9XG5cblxufVxuXG5cbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBNeW9Db25maWd7XG4gICAgY29uc3RydWN0b3IoKXsgICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBjb250cm9sU2VydmljZSgpIHsgcmV0dXJuIFwiZDUwNjAwMDEtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIGdlc3R1cmVTZXJ2aWNlKCkgeyByZXR1cm4gXCJkNTA2MDAwMy1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XG4gICAgY29tbWFuZENoYXJhY3RlcmlzdGljKCkgeyByZXR1cm4gXCJkNTA2MDQwMS1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XG4gICAgZ2VzdHVyZUNoYXJhY3RlcmlzdGljKCkgeyByZXR1cm4gXCJkNTA2MDEwMy1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XG4gICAgXG5cbn1cblxuZXhwb3J0IGNsYXNzIE15b0NvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmRldmljZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IE15b0NvbmZpZygpO1xuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdGVkID0gdGhpcy5vbkRpc2Nvbm5lY3RlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZCA9IG5ldyBVaW50OEFycmF5KDUpO1xuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFswXSA9IDB4MDE7IC8vIHNldCBtb2RlXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzFdID0gMHgwMzsgLy8gYnl0ZXMgaW4gcGF5bG9hZFxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFsyXSA9IDB4MDA7IC8vIGVtZyBtb2RlOiBub25lXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzNdID0gMHgwMDsgLy8gaW11IG1vZGU6IGRpc2FibGVkXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzRdID0gMHgwMTsgLy8gY2xhc3NpZmllciBtb2RlOiBlbmFibGVkXG5cbiAgICAgICAgdGhpcy5kaXNhYmxlR2VzdHVyZXNDb21tYW5kID0gVWludDhBcnJheS5mcm9tKHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlR2VzdHVyZXNDb21tYW5kWzRdID0gMHgwMDsgLy8gY2xhc3NpZmllciBtb2RlOiBkaXNhYmxlZFxuXG4gICAgICAgIHRoaXMuZGVlcFNsZWVwQ29tbWFuZCA9IG5ldyBVaW50OEFycmF5KDIpO1xuICAgICAgICB0aGlzLmRlZXBTbGVlcENvbW1hbmRbMF0gPSAweDA0OyAvLyBzZXQgbW9kZVxuICAgICAgICB0aGlzLmRlZXBTbGVlcENvbW1hbmRbMV0gPSAweDAwOyAvLyBieXRlcyBpbiBwYXlsb2FkXG5cbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbHRQb3B1cCA9IG51bGw7XG4gICAgICAgIHRoaXNcbiAgICB9XG5cbiAgICAvKlxuICAgIFJlcXVlc3QgdGhlIGRldmljZSB3aXRoIGJsdWV0b290aFxuICAgICovXG4gICAgcmVxdWVzdCgpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcImZpbHRlcnNcIjogW3tcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5jb250cm9sU2VydmljZSgpXVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBcIm9wdGlvbmFsU2VydmljZXNcIjogW3RoaXMuY29uZmlnLmdlc3R1cmVTZXJ2aWNlKCldXG4gICAgICAgIH07ICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZShvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4oZGV2aWNlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZS5hZGRFdmVudExpc3RlbmVyKCdnYXR0c2VydmVyZGlzY29ubmVjdGVkJywgdGhpcy5vbkRpc2Nvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRldmljZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbm5lY3QgdG8gdGhlIGRldmljZVxuICAgICAqICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpbml0KCl7XG4gICAgICAgIGlmKCF0aGlzLmRldmljZSl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbHRQb3B1cCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe3N0YXRlIDogJ2FkZCd9KTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSh0aGlzLmNvbmZpZy5jb250cm9sU2VydmljZSgpKVxuICAgICAgICAgICAgLnRoZW4oKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IGdldCBNeW8gQ29udHJvbCBTZXJ2aWNlJyk7XG4gICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmNvbW1hbmRDaGFyYWN0ZXJpc3RpYygpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChjaGFyYWN0ZXJpc3RpYyk9PntcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IGdldCBNeW8gQ29tbWFuZCBjaGFyYWN0ZXJpc3RpYycpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUodGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVhZHkgdG8gbGlzdGVuIGdlc3R1cmVzJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJHZXN0dXJlcyhjYWxsYmFjayl7XG4gICAgICAgIGlmKCF0aGlzLmRldmljZSl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuZ2VzdHVyZVNlcnZpY2UoKSlcbiAgICAgICAgICAgIC50aGVuKHNlcnZpY2U9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBHZXQgR2VzdHVyZSBTZXJ2aWNlJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuZ2VzdHVyZUNoYXJhY3RlcmlzdGljKCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKGNoYXJhY3RlcmlzdGljKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dldCBnZXN0dXJlIGNhcmFjdGVyaXN0aWMnKVxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljLnN0YXJ0Tm90aWZpY2F0aW9ucygpO1xuICAgICAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYXJhY3RlcmlzdGljdmFsdWVjaGFuZ2VkJywgKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdlc3R1cmUgPSB0aGlzLl9wYXJzZU15b0dlc3R1cmUoZXYudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlc3R1cmUgOiAnLCBnZXN0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGdlc3R1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VQb3B1cEVsdCh7c3RhdGUgOiAncmVtb3ZlJ30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtzdGF0ZSA6ICdyZW1vdmUnfSk7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZXZpY2UgaXMgZGlzY29ubmVjdGVkLicpO1xuICAgIH1cblxuICAgIF9wYXJzZU15b0dlc3R1cmUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlLmdldFVpbnQ4KDApID09PSAweDAzKSB7XG4gICAgICAgICAgICBjb25zdCBnZXN0dXJlVmFsdWUgPSB2YWx1ZS5nZXRVaW50MTYoMSwgdHJ1ZSlcbiAgICAgICAgICAgIGNvbnN0IGdlc3R1cmUgPSB7XG4gICAgICAgICAgICAgICAgMHgwMDAwOiAncmVzdCcsXG4gICAgICAgICAgICAgICAgMHgwMDAxOiAnZmlzdCcsXG4gICAgICAgICAgICAgICAgMHgwMDAyOiAnd2F2ZS1pbicsXG4gICAgICAgICAgICAgICAgMHgwMDAzOiAnd2F2ZS1vdXQnLFxuICAgICAgICAgICAgICAgIDB4MDAwNDogJ2ZpbmdlcnMtc3ByZWFkJyxcbiAgICAgICAgICAgICAgICAweDAwMDU6ICdkb3VibGUtdGFwJyxcbiAgICAgICAgICAgICAgICAweGZmZmY6ICd1bmtub3duJyxcbiAgICAgICAgICAgIH1bZ2VzdHVyZVZhbHVlXVxuICAgICAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe2dlc3R1cmUgOiBnZXN0dXJlfSk7XG4gICAgICAgICAgICByZXR1cm4geyBnZXN0dXJlIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXN0dXJlOiBudWxsIH1cbiAgICB9XG5cbiAgICBfbWFuYWdlUG9wdXBFbHQoe3N0YXRlPSAnbm9uZScsIGdlc3R1cmUgPSAnbm9uZSd9KXtcbiAgICAgICAgaWYgKHN0YXRlID09PSAncmVtb3ZlJyAmJiB0aGlzLmVsdFBvcHVwKXtcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwID0gbnVsbDtcbiAgICAgICAgfWVsc2UgaWYgKHN0YXRlID09PSAnYWRkJyl7XG4gICAgICAgICAgICBpZiAodGhpcy5lbHRQb3B1cCl7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAuY2xhc3NMaXN0LmFkZCgnbXlvLXBvcHVwJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWx0UG9wdXApO1xuICAgICAgICB9ZWxzZSBpZiAodGhpcy5lbHRQb3B1cCAmJiBnZXN0dXJlICYmIGdlc3R1cmUgIT0gJ25vbmUnKXtcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAuY2xhc3NOYW1lID0gYG15by1wb3B1cCAke2dlc3R1cmV9YDtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=
