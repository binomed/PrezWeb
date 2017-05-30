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

		var keyElt = _ref.keyElt;
		var positionArray = _ref.positionArray;

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

	// Code User Media 1
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: "user-media-v2",
		positionArray: [{
			width: "500px",
			line: 4,
			left: LEFT_FIRST
		}, {
			line: 6,
			width: "700px"
		}, {
			line: 7,
			left: "150px",
			width: "100px"
		}, {
			line: 8,
			left: "100px",
			width: "700px"
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
		}] });

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
		}] });

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
		}] });

	// Code write nfc
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'write-nfc',
		positionArray: [{
			width: '350px',
			line: 1
		}, {
			line: 2,
			left: LEFT_FIRST,
			width: '1050px'
		}] });

	// Code read nfc
	new _highlightCodeHelper.HighlightCodeHelper({
		keyElt: 'read-nfc',
		positionArray: [{
			width: '250px',
			line: 1,
			left: LEFT_FIRST
		}, {
			line: 1,
			left: '310px',
			width: '150px'
		}, {
			line: 2,
			left: '90px',
			width: '550px'
		}, {
			line: 3,
			left: '510px',
			nbLines: 3,
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzXFxoZWxwZXJzXFxoaWdobGlnaHRDb2RlSGVscGVyLmpzIiwic2NyaXB0c1xccHJlei5qcyIsInNjcmlwdHNcXHByZXpcXGhpZ2hsaWdodEV2ZW50cy5qcyIsInNjcmlwdHNcXHByZXpcXHJldmVhbEVuZ2luZUV2ZW50cy5qcyIsInNjcmlwdHNcXHNlbnNvcnNcXGJsZVByZXpDb250cm9sZXIuanMiLCJzY3JpcHRzXFxzZW5zb3JzXFxzcGVlY2hTeW50aGVzaXNDb250cm9sZXIuanMiLCJzY3JpcHRzXFxzZW5zb3JzXFx2b2ljZVJlY29nbml0aW9uQ29udHJvbGVyLmpzIiwic2NyaXB0c1xcd2ViYmx1ZXRvb3RoXFxtYm90Q29udHJvbGVyLmpzIiwic2NyaXB0c1xcd2ViYmx1ZXRvb3RoXFxteW9Db250cm9sZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7Ozs7OztBQUVBLElBQU0sVUFBVSxNQUFoQjtBQUNBLElBQU0sY0FBYyxRQUFwQjtBQUNBLElBQU0scUJBQXFCLE9BQTNCO0FBQ0EsSUFBTSxZQUFZLEVBQWxCOztBQUVBLElBQU0sV0FBVyxPQUFqQjs7SUFFYSxtQixXQUFBLG1CO0FBQ1osb0NBR0c7QUFBQTs7QUFBQSxNQUZGLE1BRUUsUUFGRixNQUVFO0FBQUEsTUFERixhQUNFLFFBREYsYUFDRTs7QUFBQTs7QUFDRixPQUFLLFdBQUwsR0FBbUIsU0FBUyxjQUFULGdCQUFxQyxNQUFyQyxDQUFuQjtBQUNBLE9BQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLE9BQUssUUFBTCxHQUFnQixPQUFPLFdBQVAsRUFBaEI7O0FBRUEsU0FBTyxnQkFBUCxXQUFnQyxNQUFoQyxFQUEyQyxZQUFNO0FBQ2hELE9BQUk7QUFDSCxRQUFNLGtCQUFrQixPQUFPLFdBQVAsRUFBeEI7QUFDQSxVQUFLLGdCQUFMLENBQXNCLGtCQUFrQixNQUFLLFFBQXZC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TUFBUTs7QUFDOUMsZ0JBQUksVUFBVSxRQUFWLElBQXNCLEtBQUssUUFBL0IsRUFBd0M7QUFDcEMscUJBQUssUUFBTCxDQUFjLE1BQWQ7QUFDQSxxQkFBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0gsYUFIRCxNQUdNLElBQUksVUFBVSxLQUFkLEVBQW9CO0FBQ3RCLG9CQUFJLEtBQUssUUFBVCxFQUFrQjtBQUNkLHlCQUFLLFFBQUwsQ0FBYyxNQUFkO0FBQ0g7QUFDRCxxQkFBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBLHFCQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLEdBQXhCLENBQTRCLFdBQTVCO0FBQ0EseUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBSyxRQUEvQjtBQUNILGFBUEssTUFPQSxJQUFJLEtBQUssUUFBTCxJQUFpQixPQUFqQixJQUE0QixXQUFXLE1BQTNDLEVBQWtEO0FBQ3BELHFCQUFLLFFBQUwsQ0FBYyxTQUFkLGtCQUF1QyxPQUF2QztBQUNIO0FBQ0oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5jb25zdCBNSU5fVE9QID0gJzk1cHgnO1xyXG5jb25zdCBMSU5FX0hFSUdIVCA9ICcwLjU3ZW0nO1xyXG5jb25zdCBBRERJVElPTk5BTF9IRUlHSFQgPSAnMC40ZW0nO1xyXG5jb25zdCBDT0xfV0lEVEggPSAzNTtcclxuXHJcbmNvbnN0IExFRlRfVEFCID0gJzEwMHB4JztcclxuXHJcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRDb2RlSGVscGVyIHtcclxuXHRjb25zdHJ1Y3Rvcih7XHJcblx0XHRrZXlFbHQsXHJcblx0XHRwb3NpdGlvbkFycmF5XHJcblx0fSkge1xyXG5cdFx0dGhpcy5lbHRIaWdsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBoaWdobGlnaHQtJHtrZXlFbHR9YCk7XHJcblx0XHR0aGlzLnBvc2l0aW9uQXJyYXkgPSBwb3NpdGlvbkFycmF5O1xyXG5cdFx0dGhpcy5wcm9ncmVzcyA9IFJldmVhbC5nZXRQcm9ncmVzcygpO1xyXG5cclxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKGBjb2RlLSR7a2V5RWx0fWAsICAoKSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgY3VycmVudFByb2dyZXNzID0gUmV2ZWFsLmdldFByb2dyZXNzKCk7XHJcblx0XHRcdFx0dGhpcy5fYXBwbHlQcm9wZXJ0aWVzKGN1cnJlbnRQcm9ncmVzcyA+IHRoaXMucHJvZ3Jlc3MgPyB0aGlzLnBvc2l0aW9uQXJyYXlbMF0gOiB0aGlzLnBvc2l0aW9uQXJyYXlbdGhpcy5wb3NpdGlvbkFycmF5Lmxlbmd0aCAtIDFdKTtcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5GcmFnbWVudHMoKTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoYHN0b3AtY29kZS0ke2tleUVsdH1gLCAoKSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0dGhpcy5wcm9ncmVzcyA9IFJldmVhbC5nZXRQcm9ncmVzcygpO1xyXG5cdFx0XHRcdHRoaXMuX3VucmVnaXN0ZXJGcmFnbWVudHMoKTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG5cdF9hcHBseVByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xyXG5cdFx0XHRjb25zdCBhcmVhID0ge307XHJcblx0XHRcdGNvbnN0IHBvc2l0aW9uID0ge307XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XHJcblx0XHRcdFx0c3dpdGNoICh0cnVlKSB7XHJcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ2xpbmUnOlxyXG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICduYkxpbmVzJzpcclxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnY29sJzpcclxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnbmJDb2xzJzpcclxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAndG9wTWFyZ2luJzpcclxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnbGVmdE1hcmdpbic6XHJcblx0XHRcdFx0XHRcdHBvc2l0aW9uW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICdoZWlnaHQnOlxyXG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICd3aWR0aCc6XHJcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ3RvcCc6XHJcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ2xlZnQnOlxyXG5cdFx0XHRcdFx0XHRhcmVhW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocG9zaXRpb24udG9wTWFyZ2luID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRwb3NpdGlvbi50b3BNYXJnaW4gPSBNSU5fVE9QO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChwb3NpdGlvbi5uYkxpbmVzID09PSB1bmRlZmluZWQgJiYgYXJlYS5oZWlnaHQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGFyZWEuaGVpZ2h0ID0gTElORV9IRUlHSFQ7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHBvc2l0aW9uLmxpbmUgPT09IHVuZGVmaW5lZCAmJiBhcmVhLnRvcCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0YXJlYS50b3AgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChwb3NpdGlvbi5uYkNvbHMgPT09IHVuZGVmaW5lZCAmJiBhcmVhLndpZHRoID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRhcmVhLndpZHRoID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAocG9zaXRpb24uY29sID09PSB1bmRlZmluZWQgJiYgYXJlYS5sZWZ0ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRhcmVhLmxlZnQgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuYXJlYSA9IGFyZWE7XHJcblx0XHRcdHRoaXMuZWx0SGlnbGlnaHQucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHRcdH0gY2F0Y2ggKGUpIHt9XHJcblx0fVxyXG5cclxuXHRfcHJvZ3Jlc3NGcmFnbWVudChldmVudCkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bGV0IHByb3BlcnRpZXMgPSBudWxsXHJcblx0XHRcdGlmIChldmVudC50eXBlID09PSAnZnJhZ21lbnRzaG93bicpIHtcclxuXHRcdFx0XHRjb25zdCBpbmRleCA9ICtldmVudC5mcmFnbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtaW5kZXgnKTtcclxuXHRcdFx0XHRwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4ICsgMV07XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gK2V2ZW50LmZyYWdtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudC1pbmRleCcpO1xyXG5cdFx0XHRcdHByb3BlcnRpZXMgPSB0aGlzLnBvc2l0aW9uQXJyYXlbaW5kZXhdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghcHJvcGVydGllcykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0X2xpc3RlbkZyYWdtZW50cygpIHtcclxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcclxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdmcmFnbWVudGhpZGRlbicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRfdW5yZWdpc3RlckZyYWdtZW50cygpIHtcclxuXHRcdFJldmVhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcclxuXHRcdFJldmVhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmcmFnbWVudGhpZGRlbicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHJcbn0iLCIndXNlIHN0cmljdCdcclxuaW1wb3J0IHtSZXZlYWxFbmdpbmVFdmVudHN9IGZyb20gJy4vcHJlei9yZXZlYWxFbmdpbmVFdmVudHMuanMnO1xyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHBhZ2VMb2FkKCkge1xyXG4gICAgICAgIG5ldyBSZXZlYWxFbmdpbmVFdmVudHMoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBwYWdlTG9hZCk7XHJcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBIaWdobGlnaHRDb2RlSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qc1wiO1xyXG5cclxuY29uc3QgTElORV9IRUlHSFQgPSAxLjE1O1xyXG5jb25zdCBBRERJVElPTk5BTF9IRUlHVCA9IDAuNDtcclxuY29uc3QgQ09MX1dJRFRIID0gMzU7XHJcbmNvbnN0IExFRlRfRklSU1QgPSBcIjYwcHhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRFdmVudHMge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gIEJsdWV0b290aDogU2NhbiArIENvbm5lY3RcclxuICAgIG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcclxuXHRcdFx0a2V5RWx0IDogJ2Nvbm5lY3QtYmxlJyxcclxuXHRcdFx0Ly8gV2Ugc3RhcnQgd2l0aCB0aGUgZmlyc3QgZnJhZ21lbnQgKHRoZSBpbml0aWFsIHBvc2l0aW9uIGlzIGZpeGVkIGJ5IGNzcylcclxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHdpZHRoOiAnNjAwcHgnLFxyXG5cdFx0XHRcdGxpbmU6NSxcclxuXHRcdFx0XHRsZWZ0OiBMRUZUX0ZJUlNUXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsaW5lOiAyLFxyXG5cdFx0XHRcdHdpZHRoOiAnOTAwcHgnLFxyXG5cdFx0XHRcdGxlZnQ6IExFRlRfRklSU1RcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiA3LFxyXG5cdFx0XHRcdHdpZHRoIDogJzYwMHB4JyxcclxuXHRcdFx0XHRsZWZ0OiBMRUZUX0ZJUlNUXHJcblx0XHRcdH1dXHJcblx0XHR9KTtcclxuXHJcbiAgICAvLyAgQmxlIENvZGUgUmVhZCBDaGFyYWN0ZXJpc3RpY1xyXG4gICAgbmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xyXG5cdFx0XHRrZXlFbHQgOiAncmVhZC1jaGFyYWN0JyxcclxuXHRcdFx0Ly8gV2Ugc3RhcnQgd2l0aCB0aGUgZmlyc3QgZnJhZ21lbnQgKHRoZSBpbml0aWFsIHBvc2l0aW9uIGlzIGZpeGVkIGJ5IGNzcylcclxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHdpZHRoOiAnNzAwcHgnLFxyXG5cdFx0XHRcdGxpbmU6MlxyXG5cdFx0XHR9LHtcclxuXHRcdFx0XHRsaW5lIDogNCxcclxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHRsaW5lIDogNixcclxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXHJcblx0XHRcdH1dXHJcblx0XHR9KVxyXG5cclxuXHRcdC8vICBCbGUgQ29kZSBXcml0ZSBDaGFyYWN0ZXJpc3RpY1xyXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xyXG5cdFx0XHRrZXlFbHQgOiAnd3JpdGUtY2hhcmFjdCcsXHJcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXHJcblx0XHRcdHBvc2l0aW9uQXJyYXkgOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdHdpZHRoOiAnNzAwcHgnLFxyXG5cdFx0XHRcdGxpbmU6MlxyXG5cdFx0XHR9LHtcclxuXHRcdFx0XHRsaW5lIDogNCxcclxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHRsaW5lIDogOSxcclxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXHJcblx0XHRcdH1dXHJcblx0XHR9KVxyXG5cclxuXHRcdC8vICBCbGUgQ29kZSBSZWFkIENoYXJhY3RlcmlzdGljXHJcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XHJcblx0XHRcdGtleUVsdCA6ICdub3RpZi1jaGFyYWN0JyxcclxuXHRcdFx0Ly8gV2Ugc3RhcnQgd2l0aCB0aGUgZmlyc3QgZnJhZ21lbnQgKHRoZSBpbml0aWFsIHBvc2l0aW9uIGlzIGZpeGVkIGJ5IGNzcylcclxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XHJcblx0XHRcdFx0d2lkdGg6ICc3MDBweCcsXHJcblx0XHRcdFx0bGluZToyXHJcblx0XHRcdH0se1xyXG5cdFx0XHRcdGxpbmUgOiA0LFxyXG5cdFx0XHRcdHdpZHRoIDogJzkwJSdcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdGxpbmUgOiA2LFxyXG5cdFx0XHRcdHdpZHRoIDogJzkwJScsXHJcblx0XHRcdFx0bmJMaW5lczogM1xyXG5cdFx0XHR9XVxyXG5cdFx0fSlcclxuXHJcbiAgICAvLyBDb2RlIFVzZXIgTWVkaWEgMVxyXG4gICAgbmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xyXG4gICAgICBrZXlFbHQ6IFwidXNlci1tZWRpYS12MlwiLFxyXG4gICAgICBwb3NpdGlvbkFycmF5OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgd2lkdGg6IFwiNTAwcHhcIixcclxuICAgICAgICAgIGxpbmU6IDQsXHJcbiAgICAgICAgICBsZWZ0OiBMRUZUX0ZJUlNUXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaW5lOiA2LFxyXG4gICAgICAgICAgd2lkdGg6IFwiNzAwcHhcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbGluZTogNyxcclxuICAgICAgICAgIGxlZnQ6IFwiMTUwcHhcIixcclxuICAgICAgICAgIHdpZHRoOiBcIjEwMHB4XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpbmU6IDgsXHJcbiAgICAgICAgICBsZWZ0OiBcIjEwMHB4XCIsXHJcbiAgICAgICAgICB3aWR0aDogXCI3MDBweFwiXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuXHJcblx0Ly8gQ29kZSBXZWIgU3BlZWNoXHJcblx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xyXG5cdFx0XHRrZXlFbHQgOiAnd2ViLXNwZWVjaCcsXHJcblx0XHRcdHBvc2l0aW9uQXJyYXk6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHR3aWR0aDogJzYwMHB4JyxcclxuXHRcdFx0XHRsaW5lOiAxXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsaW5lIDogMixcclxuXHRcdFx0XHR3aWR0aCA6ICc0NTBweCdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiAzLFxyXG5cdFx0XHRcdHdpZHRoIDogJzU1MHB4J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGluZSA6IDQsXHJcblx0XHRcdFx0d2lkdGggOiAnNTUwcHgnXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsaW5lIDogNixcclxuXHRcdFx0XHR3aWR0aCA6ICczNTBweCdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiA3LFxyXG5cdFx0XHRcdHdpZHRoIDogJzM1MHB4J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGluZSA6IDgsXHJcblx0XHRcdFx0bGVmdCA6ICcyODBweCcsXHJcblx0XHRcdFx0d2lkdGggOiAnNTAwcHgnXHJcblx0XHRcdH1cclxuXHRcdFx0XX0pO1xyXG5cclxuXHQvLyBDb2RlIFdlYiBTcGVlY2ggR3JhbW1hclxyXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcclxuXHRcdFx0a2V5RWx0IDogJ3dlYi1zcGVlY2gtZ3JhbW1hcicsXHJcblx0XHRcdHBvc2l0aW9uQXJyYXkgOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHR3aWR0aDogJzEyMDBweCcsXHJcblx0XHRcdFx0bGluZTogMVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGluZSA6IDMsXHJcblx0XHRcdFx0d2lkdGggOiAnNzUwcHgnXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsaW5lIDogNCxcclxuXHRcdFx0XHR3aWR0aCA6ICc3MDBweCdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiA1LFxyXG5cdFx0XHRcdHdpZHRoIDogJzY1MHB4J1xyXG5cdFx0XHR9XHJcblx0XHRcdF19KTtcclxuXHJcblx0Ly8gQ29kZSBXZWIgU3BlZWNoIFN5bnRoZXNpc1xyXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcclxuXHRcdFx0a2V5RWx0IDogJ3dlYi1zcGVlY2gtc3ludGhlc2lzJyxcclxuXHRcdFx0cG9zaXRpb25BcnJheTogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0d2lkdGg6ICc5MDBweCcsXHJcblx0XHRcdFx0bGluZTogMVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGluZSA6IDIsXHJcblx0XHRcdFx0d2lkdGggOiAnNDAwcHgnXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsaW5lIDogMyxcclxuXHRcdFx0XHR3aWR0aCA6ICc0MDBweCdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiA0LFxyXG5cdFx0XHRcdHdpZHRoIDogJzQ1MHB4J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGluZSA6IDUsXHJcblx0XHRcdFx0d2lkdGggOiAnNjAwcHgnXHJcblx0XHRcdH1cclxuXHRcdFx0XX0pO1xyXG5cclxuXHJcblx0Ly8gQ29kZSB3cml0ZSBuZmNcclxuXHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XHJcblx0XHRcdGtleUVsdCA6ICd3cml0ZS1uZmMnLFxyXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHR3aWR0aDogJzM1MHB4JyxcclxuXHRcdFx0XHRsaW5lOjFcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiAyLFxyXG5cdFx0XHRcdGxlZnQ6TEVGVF9GSVJTVCxcclxuXHRcdFx0XHR3aWR0aCA6ICcxMDUwcHgnXHJcblx0XHRcdH1cclxuXHRcdFx0XX0pO1xyXG5cclxuXHQvLyBDb2RlIHJlYWQgbmZjXHJcblx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xyXG5cdFx0XHRrZXlFbHQgOiAncmVhZC1uZmMnLFxyXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHR3aWR0aDogJzI1MHB4JyxcclxuXHRcdFx0XHRsaW5lOjEsXHJcblx0XHRcdFx0bGVmdDogTEVGVF9GSVJTVFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGluZSA6IDEsXHJcblx0XHRcdFx0bGVmdDogJzMxMHB4JyxcclxuXHRcdFx0XHR3aWR0aCA6ICcxNTBweCdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiAyLFxyXG5cdFx0XHRcdGxlZnQ6ICc5MHB4JyxcclxuXHRcdFx0XHR3aWR0aCA6ICc1NTBweCdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiAzLFxyXG5cdFx0XHRcdGxlZnQ6ICc1MTBweCcsXHJcblx0XHRcdFx0bmJMaW5lczogMyxcclxuXHRcdFx0XHR3aWR0aCA6ICczMDBweCdcclxuXHRcdFx0fVxyXG5cdFx0XHRdfSk7XHJcbiAgfVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5pbXBvcnQge0hpZ2hsaWdodEV2ZW50c30gZnJvbSAnLi9oaWdobGlnaHRFdmVudHMuanMnO1xyXG5pbXBvcnQge0JsZVByZXpDb250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvYmxlUHJlekNvbnRyb2xlci5qcyc7XHJcbmltcG9ydCB7Vm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlcn0gZnJvbSAnLi4vc2Vuc29ycy92b2ljZVJlY29nbml0aW9uQ29udHJvbGVyLmpzJztcclxuaW1wb3J0IHtTcGVlY2hTeW50aGVzaXNDb250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvc3BlZWNoU3ludGhlc2lzQ29udHJvbGVyLmpzJztcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUmV2ZWFsRW5naW5lRXZlbnRze1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHJcblx0XHRsZXQgaW5JRnJhbWUgPSB3aW5kb3cudG9wICE9IHdpbmRvdy5zZWxmO1xyXG5cdFx0XHJcblx0XHQvLyBNYW5hZ2VtZW50IG9mIGFjdGlvbnMgaW4gcHJleiBtb2RlIChub3QgaW4gcHJldmlldyBtb2RlKVxyXG5cdFx0aWYgKCFpbklGcmFtZSl7XHJcblx0XHRcdFx0Ly8gSW5pdCBhbGwgYmxlIGFjdGlvbnNcclxuXHRcdFx0XHR0aGlzLl9ibGVQcmV6Q29udHJvbGVyID0gbmV3IEJsZVByZXpDb250cm9sZXIoKTtcclxuXHRcdFx0XHR0aGlzLl9ibGVFdmVudHMoKTtcclxuXHJcblx0XHRcdFx0Ly8gSW5pdCBWb2ljZSBhbmQgU3BlZWNoIGNvbnRyb2xlcnNcclxuXHRcdFx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24gPSBuZXcgVm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlcigpO1xyXG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzID0gbmV3IFNwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcigpO1xyXG5cdFx0XHRcdHRoaXMuX3ZvaWNlRXZlbnRzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSW4gYWwgY2FzZSB3ZSBpbml0IHRoZSBoaWdobGlnaHQgb2YgY29kZS5cclxuXHRcdHRoaXMuX2luaXRIaWdobGlnaHRDb2RlKCk7XHJcblxyXG5cdH1cclxuXHJcblx0X2JsZUV2ZW50cygpe1xyXG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3AtY29kZS1yZWFkLWNoYXJhY3QnLCBldmVudCA9PiB7XHJcblx0XHRcdGlmICh0aGlzLl9ibGVQcmV6Q29udHJvbGVyLl9jdXJyZW50QmxlRGV2aWNlKSB7XHJcblx0XHRcdFx0dGhpcy5fYmxlUHJlekNvbnRyb2xlci5fY3VycmVudEJsZURldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdF92b2ljZUV2ZW50cygpe1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvb2dsZS1hc3Npc3RhbnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF89PntcclxuXHRcdFx0dGhpcy5fdm9pY2VDYWxsQmFjaygpO1xyXG5cdFx0fSk7XHJcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZW5kLXJlY29nbml0aW9uJywgXz0+e1xyXG5cdFx0XHR0cnl7XHJcblx0XHRcdFx0dGhpcy52b2ljZVJlY29nbml0aW9uLnN0b3AoKTtcclxuXHRcdFx0fWNhdGNoKGUpe31cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRfdm9pY2VDYWxsQmFjaygpe1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW9TcGVlY2gnKS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24uc3RhcnQoKGZpbmFsU3RyKT0+e1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BlZWNoX2lucHV0JykuaW5uZXJIVE1MID0gZmluYWxTdHI7XHJcblx0XHRcdGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCfDp2EgdmEnKSl7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW9TcGVlY2gnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcclxuXHRcdFx0XHRcdHZhbHVlOidqZSB2YWlzIHRyw6hzIGJpZW4gbWVyY2kuIENvbW1lbnQgc2UgcGFzc2UgdGEgY29uZsOpcmVuY2UgPyBGcmFuw6dvaXMgZXN0LWlsIGdlbnRpbCBhdmVjIHRvaSA/J1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxyXG5cdFx0XHRcdC5jYXRjaCgoZXJyb3IpPT57XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fWVsc2UgaWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2FuZ2xhaXMnKSl7XHJcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xyXG5cdFx0XHRcdFx0dmFsdWU6ICdoZWxsbyBldmVyeSBvbmUsIHdlbGNvbWUgdG8gdGhlIGJlc3QgdGFsayBvZiB0aGlzIGV2ZW50ICEnLCBcclxuXHRcdFx0XHRcdGxhbmdGciA6IGZhbHNlfVxyXG5cdFx0XHRcdClcclxuXHRcdFx0XHQudGhlbihfPT50aGlzLl92b2ljZUNhbGxCYWNrLmJpbmQodGhpcykpXHJcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9PntcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9ZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygndm9peCcpKXtcclxuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XHJcblx0XHRcdFx0XHR2YWx1ZTogJ2NvbW1lIMOnYSBjXFwnZXN0IGFzc2V6IGJpemFycmUgcG91ciB0b2kgPycsXHJcblx0XHRcdFx0XHRwaXRjaCA6IDIsXHJcblx0XHRcdFx0XHRyYXRlIDogMC4zfVxyXG5cdFx0XHRcdClcclxuXHRcdFx0XHQudGhlbihfPT50aGlzLl92b2ljZUNhbGxCYWNrLmJpbmQodGhpcykpXHJcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9PntcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9ZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc29tbWVzLW5vdXMnKSl7XHJcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xyXG5cdFx0XHRcdFx0dmFsdWU6ICdWb3lvbnMgRnJhbsOnb2lzLCBub3VzIHNvbW1lcyBkYW5zIHRhIHNlc3Npb24sIGplIHRyb3V2ZSBxdWUgdHUgblxcJ2FzIHBhcyBsXFwnYWlyIHRyw6hzIHLDqXZlaWxsw6knXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbihfPT50aGlzLl92b2ljZUNhbGxCYWNrLmJpbmQodGhpcykpXHJcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9PntcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9ZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc3VpdmFudCcpKXtcclxuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XHJcblx0XHRcdFx0XHR2YWx1ZTogJ1Ryw6hzIGJpZW4gcGFzc29ucyBhdSBzbGlkZSBzdWl2YW50J1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oXz0+UmV2ZWFsLm5leHQoKSlcclxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCB1bmtub3dBcnJheSA9IFtcclxuXHRcdFx0XHRcdCdBcnRpY3VsZSBzXFwnaWwgdGUgcGxhaXQnLFxyXG5cdFx0XHRcdFx0J0thbW91bG94ICEnLFxyXG5cdFx0XHRcdFx0J1R1IHBvdXJyYWlzIGZhaXJlIHVuIGVmZm9ydCBxdWFuZCBtw6ptZScsXHJcblx0XHRcdFx0XHQnUmV0aXJlIHRvbiBjaGV3aW5nIGd1bSBhdmFudCBkZSBwYXJsZXInXHJcblx0XHRcdFx0XTtcclxuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XHJcblx0XHRcdFx0XHR2YWx1ZTogdW5rbm93QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5rbm93QXJyYXkubGVuZ3RoKV1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcclxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHJcblx0X2luaXRIaWdobGlnaHRDb2RlKCkge1xyXG5cclxuXHRcdG5ldyBIaWdobGlnaHRFdmVudHMoKTtcclxuXHR9XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcbmltcG9ydCB7TXlvQ29udHJvbGVyfSBmcm9tICcuLi93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzJztcclxuaW1wb3J0IHtNQm90fSBmcm9tICcuLi93ZWJibHVldG9vdGgvbWJvdENvbnRyb2xlci5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQmxlUHJlekNvbnRyb2xlcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFxyXG5cdFx0dGhpcy5fY3VycmVudEJsZURldmljZSA9IG51bGw7XHJcblx0XHR0aGlzLl9iYXNpY0JsZUJpbmRpbmcoKTtcclxuXHRcdHRoaXMuX215b0JpbmRpbmcoKTtcclxuXHRcdC8vIEp1c3QgY29tbWVudCBtYm90IHBhcnQgYmVjYXVzZSBpdCBjYW4gYWx3YXlzIGJlIHVzZWZ1bGwgIVxyXG5cdFx0Ly90aGlzLl9tYm90QmluZGluZygpO1xyXG5cdH1cclxuXHJcblx0X2Jhc2ljQmxlQmluZGluZygpIHtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25uZWN0QmxlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcblx0XHRcdFxyXG5cdFx0XHRjb25zdCBmaWx0ZXJzID0geyBmaWx0ZXJzOiBbeyBzZXJ2aWNlczogWydiYXR0ZXJ5X3NlcnZpY2UnXSB9XSB9O1xyXG5cdFx0XHRuYXZpZ2F0b3IuYmx1ZXRvb3RoLnJlcXVlc3REZXZpY2UoZmlsdGVycylcclxuXHRcdFx0LnRoZW4oZGV2aWNlID0+IGRldmljZS5nYXR0LmNvbm5lY3QoKSlcclxuXHRcdFx0LnRoZW4oc2VydmVyID0+IHsgXHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0JsdWV0b290aCBkZXZpY2UgaXMgY29ubmVjdGVkLicpO1xyXG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRCbGVEZXZpY2UgPSBzZXJ2ZXIuZGV2aWNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlYWRDaGFyYWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLl9jdXJyZW50QmxlRGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UoJ2JhdHRlcnlfc2VydmljZScpXHJcblx0XHRcdC50aGVuKHNlcnZpY2UgPT4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYygnYmF0dGVyeV9sZXZlbCcpKVxyXG5cdFx0XHQudGhlbihjaGFyYWN0ZXJpc3RpYyA9PiBjaGFyYWN0ZXJpc3RpYy5yZWFkVmFsdWUoKSlcclxuXHRcdFx0LnRoZW4odmFsdWUgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGJhdHRlcnlMZXZlbCA9IHZhbHVlLmdldFVpbnQ4KDApO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGBCYXR0ZXJ5IHBlcmNlbnRhZ2UgaXMgJHtiYXR0ZXJ5TGV2ZWx9JS5gKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdF9teW9CaW5kaW5nKCl7XHJcblx0XHRsZXQgbGFzdERvdWJsZVRhcCA9IDA7XHJcblx0XHRsZXQgbXlvID0gbmV3IE15b0NvbnRyb2xlcigpO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RNeW8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoIW15by5jb25uZWN0ZWQpe1xyXG5cdFx0XHRcdG15by5yZXF1ZXN0KClcclxuXHRcdFx0XHQudGhlbihfPT5teW8uY29ubmVjdCgpKVxyXG5cdFx0XHRcdC50aGVuKCgpPT5teW8uaW5pdCgpKVxyXG5cdFx0XHRcdC50aGVuKCgpPT5teW8ucmVnaXN0ZXJHZXN0dXJlcygoZ2VzdHVyZSk9PntcclxuXHRcdFx0XHRcdGlmIChnZXN0dXJlICYmIGdlc3R1cmUuZ2VzdHVyZSA9PT0gJ2RvdWJsZS10YXAnKXtcclxuXHRcdFx0XHRcdFx0aWYoRGF0ZS5ub3coKSAtIGxhc3REb3VibGVUYXAgPCAyMDAwKXtcclxuXHRcdFx0XHRcdFx0XHRSZXZlYWwubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGxhc3REb3VibGVUYXAgPSBEYXRlLm5vdygpO1xyXG5cdFx0XHRcdFx0fSBcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdkaXNjb25uZWN0LW15bycsIF89PntcclxuXHRcdFx0bXlvLmRpc2Nvbm5lY3QoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0X21ib3RCaW5kaW5nKCl7XHJcblx0XHQgLy8gQ2hlY2sgdGhlIGNvbm5lY3Rpb25cclxuXHRcdCBsZXQgc3RlcENvbm5lY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdE1Cb3QnKTtcclxuXHRcdCBsZXQgc3RlcENvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydC1idXR0b24tbWJvdCcpOyBcclxuXHRcdCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbm5lY3RNQm90XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXyA9PiB7XHJcblx0XHRcdC8vIFJlcXVlc3QgdGhlIGRldmljZVxyXG5cdFx0XHRsZXQgbUJvdCA9IG5ldyBNQm90KCk7XHJcblx0XHRcdG1Cb3QucmVxdWVzdCgpXHJcblx0XHRcdFx0LnRoZW4oXyA9PiB7XHJcblx0XHRcdFx0XHQvLyBDb25uZWN0IHRvIHRoZSBtYm90XHJcblx0XHRcdFx0XHRyZXR1cm4gbUJvdC5jb25uZWN0KCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbihfID0+IHtcclxuXHRcdFx0XHRcdC8vIENvbm5lY3Rpb24gaXMgZG9uZSwgd2Ugc2hvdyB0aGUgY29udHJvbHNcclxuXHRcdFx0XHRcdHN0ZXBDb25uZWN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHRcdFx0XHRcdHN0ZXBDb250cm9sLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuXHJcblx0XHRcdFx0XHRsZXQgcGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJ0LWJ1dHRvbicpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyBDb250cm9sIHRoZSByb2JvdCBieSBidXR0b25zXHJcblx0XHRcdFx0XHRsZXQgYnRuVXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0blVwJyk7XHJcblx0XHRcdFx0XHRsZXQgYnRuRG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuRG93bicpO1xyXG5cdFx0XHRcdFx0bGV0IGJ0bkxlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0bkxlZnQnKTtcclxuXHRcdFx0XHRcdGxldCBidG5SaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuUmlnaHQnKTtcclxuXHJcblx0XHRcdFx0XHRidG5VcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoLTI1MCwgMjUwKSB9KTtcclxuXHRcdFx0XHRcdGJ0bkRvd24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKDI1MCwgLTI1MCkgfSk7XHJcblx0XHRcdFx0XHRidG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigyNTAsIDI1MCkgfSk7XHJcblx0XHRcdFx0XHRidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoLTI1MCwgLTI1MCkgfSk7XHJcblxyXG5cdFx0XHRcdFx0YnRuVXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigwLCAwKSB9KTtcclxuXHRcdFx0XHRcdGJ0bkRvd24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigwLCAwKSB9KTtcclxuXHRcdFx0XHRcdGJ0bkxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigwLCAwKSB9KTtcclxuXHRcdFx0XHRcdGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XHJcblx0XHRcdFx0XHRcclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5leHBvcnQgY2xhc3MgU3BlZWNoU3ludGhlc2lzQ29udHJvbGVye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnN5bnRoID0gd2luZG93LnNwZWVjaFN5bnRoZXNpcztcclxuXHJcbiAgICAgICAgdGhpcy52b2ljZUZSID0gbnVsbDtcclxuICAgICAgICB0aGlzLnZvaWNlRU4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jb25maWd1cmUoKXtcclxuICAgICAgICB0aGlzLl9wb3B1bGF0ZVZvaWNlTGlzdCgpO1xyXG4gICAgICAgIGlmIChzcGVlY2hTeW50aGVzaXMub252b2ljZXNjaGFuZ2VkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc3BlZWNoU3ludGhlc2lzLm9udm9pY2VzY2hhbmdlZCA9IHRoaXMuX3BvcHVsYXRlVm9pY2VMaXN0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9wb3B1bGF0ZVZvaWNlTGlzdCgpIHtcclxuICAgICAgICBsZXQgdm9pY2VzID0gdGhpcy5zeW50aC5nZXRWb2ljZXMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZvaWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodm9pY2VzW2ldLmxhbmcgPT09ICdmci1GUicpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52b2ljZUZSID0gdm9pY2VzW2ldO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAodm9pY2VzW2ldLmxhbmcgPT09ICdlbi1HQicpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52b2ljZUVOID0gdm9pY2VzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNwZWFrKHt2YWx1ZSwgbGFuZ0ZyID0gdHJ1ZSwgcGl0Y2ggPSAxLCByYXRlID0gMX0pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT57XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMudm9pY2VGUikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHV0dGVyVGhpcyA9IG5ldyBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UodmFsdWUpO1xyXG4gICAgICAgICAgICB1dHRlclRoaXMudm9pY2UgPSBsYW5nRnIgPyB0aGlzLnZvaWNlRlIgOiB0aGlzLnZvaWNlRU47XHJcbiAgICAgICAgICAgIHV0dGVyVGhpcy5waXRjaCA9IHBpdGNoO1xyXG4gICAgICAgICAgICB1dHRlclRoaXMucmF0ZSA9IHJhdGU7XHJcbiAgICAgICAgICAgIHV0dGVyVGhpcy5vbmVuZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3ludGguc3BlYWsodXR0ZXJUaGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcbmV4cG9ydCBjbGFzcyBWb2ljZVJlY29nbml0aW9uQ29udHJvbGVye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBsZXQgU3BlZWNoUmVjb2duaXRpb24gPSBTcGVlY2hSZWNvZ25pdGlvbiB8fCB3ZWJraXRTcGVlY2hSZWNvZ25pdGlvblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24gPSBuZXcgU3BlZWNoUmVjb2duaXRpb24oKTtcclxuICAgICAgICB0aGlzLl9jb25maWd1cmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydChjYWxsYmFjayl7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbnJlc3VsdCA9IChldmVudCk9PntcclxuICAgICAgICAgICAgY29uc3QgZmluYWxTdHIgPSBldmVudC5yZXN1bHRzWzBdWzBdLnRyYW5zY3JpcHQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ0NvbmZpZGVuY2U6ICcgKyBmaW5hbFN0cik7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhmaW5hbFN0cik7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKXtcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBfY29uZmlndXJlKCl7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5sYW5nID0gJ2ZyLUZSJztcclxuXHJcbiAgICAgICAgLy8gV2UgZGV0ZWN0IGVuZFxyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25lbmQgPSBfPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ0VuZCBvZiByZWNvZ25pdGlvbicpO1xyXG4gICAgICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFdlIGRldGVjdCBlcnJvcnNcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICduby1zcGVlY2gnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdObyBTcGVlY2gnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT0gJ2F1ZGlvLWNhcHR1cmUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdObyBtaWNyb3Bob25lJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT0gJ25vdC1hbGxvd2VkJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnTm90IEFsbG93ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07ICAgICBcclxuICAgIH1cclxuXHJcblxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcbi8qKlxyXG4gKiBDb2RlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Jpbm9tZWQvbWJvdC13ZWJibHVldG9vdGhcclxuICogXHJcbiAqL1xyXG5cclxuXHJcbmNvbnN0IERFVklDRV9OQU1FID0gXCJNYWtlYmxvY2tfTEVcIixcclxuICAgIFNFUlZJQ0VfVVVJRCA9IFwiMDAwMGZmZTEtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIsXHJcbiAgICBDSEFSQUNURVJJU1RJQ19VVUlEID0gXCIwMDAwZmZlMy0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIjtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmFsIGNvbmZpZ3VyYXRpb24gKFVVSUQpXHJcbiovXHJcbmNsYXNzIENvbmZpZyB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmFtZSgpIHsgcmV0dXJuIFwiTWFrZWJsb2NrX0xFXCI7IH1cclxuICAgIHNlcnZpY2UoKSB7IHJldHVybiBcIjAwMDBmZmUxLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiIH1cclxuICAgIGNoYXJhdGVyaXN0aWMoKSB7IHJldHVybiBcIjAwMDBmZmUzLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiIH1cclxufVxyXG5cclxuLy8gQ29uc3QgZm9yIGluc3RydWN0aW9ucyB0eXBlc1xyXG5jb25zdCBUWVBFX01PVE9SID0gMHgwYSxcclxuICAgIFRZUEVfUkdCID0gMHgwOCxcclxuICAgIFRZUEVfU09VTkQgPSAweDA3O1xyXG5cclxuXHJcbi8vIENvbnN0IGZvciB0aGUgcG9ydHNcclxuY29uc3QgUE9SVF8xID0gMHgwMSxcclxuICAgIFBPUlRfMiA9IDB4MDIsXHJcbiAgICBQT1JUXzMgPSAweDAzLFxyXG4gICAgUE9SVF80ID0gMHgwNCxcclxuICAgIFBPUlRfNSA9IDB4MDUsXHJcbiAgICBQT1JUXzYgPSAweDA2LFxyXG4gICAgUE9SVF83ID0gMHgwNyxcclxuICAgIFBPUlRfOCA9IDB4MDgsXHJcbiAgICBNXzEgPSAweDA5LFxyXG4gICAgTV8yID0gMHgwYTtcclxuICAgIFxyXG5cclxuLyoqXHJcbiAqIENsYXNzIGZvciB0aGUgcm9ib3RcclxuICogKi9cclxuZXhwb3J0IGNsYXNzIE1Cb3Qge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IENvbmZpZygpO1xyXG4gICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQgPSB0aGlzLm9uRGlzY29ubmVjdGVkLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5idXp6ZXJJbmRleCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIFJlcXVlc3QgdGhlIGRldmljZSB3aXRoIGJsdWV0b290aFxyXG4gICAgKi9cclxuICAgIHJlcXVlc3QoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIFwiZmlsdGVyc1wiOiBbe1xyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMuY29uZmlnLm5hbWUoKVxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgXCJvcHRpb25hbFNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5zZXJ2aWNlKCldXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50aGVuKGRldmljZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCB0aGlzLm9uRGlzY29ubmVjdGVkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZXZpY2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdCB0byB0aGUgZGV2aWNlXHJcbiAgICAgKiAqL1xyXG4gICAgY29ubmVjdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnRyb2wgdGhlIG1vdG9ycyBvZiByb2JvdFxyXG4gICAgKi9cclxuICAgIHByb2Nlc3NNb3Rvcih2YWx1ZU0xLCB2YWx1ZU0yKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9NT1RPUiwgTV8xLCAwLCB2YWx1ZU0xKSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9NT1RPUiwgTV8yLCAwLCB2YWx1ZU0yKSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0J1enplcigpIHtcclxuICAgICAgICB0aGlzLmJ1enplckluZGV4ID0gKHRoaXMuYnV6emVySW5kZXggKyAxKSAlIDg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9TT1VORCwgUE9SVF8yLCAyMiwgdGhpcy5idXp6ZXJJbmRleCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb2Nlc3NDb2xvcihyZWQsYmx1ZSxncmVlbil7XHJcbiAgICAgICAgbGV0IHJIZXggPSByZWQ8PDg7XHJcblx0XHRsZXQgZ0hleCA9IGdyZWVuPDwxNjtcclxuXHRcdGxldCBiSGV4ID0gYmx1ZTw8MjQ7XHJcblx0XHRsZXQgdmFsdWUgPSBySGV4IHwgZ0hleCB8IGJIZXg7XHJcblx0XHR0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfUkdCLFBPUlRfNiwwLHZhbHVlKSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZGlzY29ubmVjdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2Nvbm5lY3RlZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGV2aWNlIGlzIGRpc2Nvbm5lY3RlZC4nKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX2dlbmVyaWNDb250cm9sKHR5cGUsIHBvcnQsIHNsb3QsIHZhbHVlKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICBmZiA1NSBsZW4gaWR4IGFjdGlvbiBkZXZpY2UgcG9ydCAgc2xvdCAgZGF0YSBhXHJcbiAgICAgICAgMCAgMSAgMiAgIDMgICA0ICAgICAgNSAgICAgIDYgICAgIDcgICAgIDhcclxuICAgICAgICAqL1xyXG4gICAgICAgIC8vIFN0YXRpYyB2YWx1ZXNcclxuICAgICAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDE2KTtcclxuICAgICAgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50MTZBcnJheShidWYpO1xyXG5cclxuICAgICAgICB2YXIgYnl0ZTAgPSAweGZmLCAvLyBTdGF0aWMgaGVhZGVyXHJcbiAgICAgICAgICAgIGJ5dGUxID0gMHg1NSwgLy8gU3RhdGljIGhlYWRlclxyXG4gICAgICAgICAgICBieXRlMiA9IDB4MDksIC8vIGxlblxyXG4gICAgICAgICAgICBieXRlMyA9IDB4MDAsIC8vIGlkeFxyXG4gICAgICAgICAgICBieXRlNCA9IDB4MDIsIC8vIGFjdGlvblxyXG4gICAgICAgICAgICBieXRlNSA9IHR5cGUsIC8vIGRldmljZVxyXG4gICAgICAgICAgICBieXRlNiA9IHBvcnQsIC8vIHBvcnRcclxuICAgICAgICAgICAgYnl0ZTcgPSBzbG90OyAvLyBzbG90XHJcbiAgICAgICAgLy9keW5hbWljcyB2YWx1ZXNcclxuICAgICAgICB2YXIgYnl0ZTggPSAweDAwLCAvLyBkYXRhXHJcbiAgICAgICAgICAgIGJ5dGU5ID0gMHgwMCwgLy8gZGF0YVxyXG4gICAgICAgICAgICBieXRlMTAgPSAweDAwLCAvLyBkYXRhXHJcbiAgICAgICAgICAgIGJ5dGUxMSA9IDB4MDA7IC8vIGRhdGFcclxuICAgICAgICAvL0VuZCBvZiBtZXNzYWdlXHJcbiAgICAgICAgdmFyIGJ5dGUxMiA9IDB4MGEsXHJcbiAgICAgICAgICAgIGJ5dGUxMyA9IDB4MDAsXHJcbiAgICAgICAgICAgIGJ5dGUxNCA9IDB4MDAsXHJcbiAgICAgICAgICAgIGJ5dGUxNSA9IDB4MDA7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFRZUEVfTU9UT1I6XHJcbiAgICAgICAgICAgICAgICAvLyBNb3RvciBNMVxyXG4gICAgICAgICAgICAgICAgLy8gZmY6NTUgIDA5OjAwICAwMjowYSAgMDk6NjQgIDAwOjAwICAwMDowMCAgMGFcIlxyXG4gICAgICAgICAgICAgICAgLy8gMHg1NWZmOzB4MDAwOTsweDBhMDI7MHgwOTY0OzB4MDAwMDsweDAwMDA7MHgwMDBhOzB4MDAwMDtcclxuICAgICAgICAgICAgICAgIC8vIE1vdG9yIE0yXHJcbiAgICAgICAgICAgICAgICAvLyBmZjo1NTowOTowMDowMjowYTowYTo2NDowMDowMDowMDowMDowYSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wVmFsdWUgPSB2YWx1ZSA8IDAgPyAocGFyc2VJbnQoXCJmZmZmXCIsIDE2KSArIE1hdGgubWF4KC0yNTUsIHZhbHVlKSkgOiBNYXRoLm1pbigyNTUsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGJ5dGU3ID0gdGVtcFZhbHVlICYgMHgwMGZmO1xyXG4gICAgICAgICAgICAgICAgYnl0ZTggPSAweDAwO1xyXG4gICAgICAgICAgICAgICAgYnl0ZTggPSB0ZW1wVmFsdWUgPj4gODtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRZUEVfUkdCOlxyXG4gICAgICAgICAgICAgICAgLy8gZmY6NTUgIDA5OjAwICAwMjowOCAgMDY6MDAgIDVjOjk5ICA2ZDowMCAgMGFcclxuICAgICAgICAgICAgICAgIC8vIDB4NTVmZjsweDAwMDk7MHgwODAyOzB4MDAwNjsweDk5NWM7MHgwMDZkOzB4MDAwYTsweDAwMDA7XHJcbiAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDA7XHJcbiAgICAgICAgICAgICAgICBieXRlOCA9IHZhbHVlID4+IDggJiAweGZmO1xyXG4gICAgICAgICAgICAgICAgYnl0ZTkgPSB2YWx1ZSA+PiAxNiAmIDB4ZmY7XHJcbiAgICAgICAgICAgICAgICBieXRlMTAgPSB2YWx1ZSA+PiAyNCAmIDB4ZmY7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUWVBFX1NPVU5EOlxyXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjowMDowMDowYVxyXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjowNjowMTowYVxyXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjplZTowMTowYVxyXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo4ODowMTowYVxyXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjpiODowMTowYVxyXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo1ZDowMTowYVxyXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo0YTowMTowYVxyXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjoyNjowMTowYVxyXG4gICAgICAgICAgICAgICAgYnl0ZTIgPSAweDA1O1xyXG4gICAgICAgICAgICAgICAgYnl0ZTUgPSAweDIyO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4MDY7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHhlZTtcclxuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDg4O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4Yjg7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHg1ZDtcclxuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDI2O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJ5dGU4ID0gMHgwYTtcclxuICAgICAgICAgICAgICAgIGJ5dGUxMiA9IDB4MDA7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidWZWaWV3WzBdID0gYnl0ZTEgPDwgOCB8IGJ5dGUwO1xyXG4gICAgICAgIGJ1ZlZpZXdbMV0gPSBieXRlMyA8PCA4IHwgYnl0ZTI7XHJcbiAgICAgICAgYnVmVmlld1syXSA9IGJ5dGU1IDw8IDggfCBieXRlNDtcclxuICAgICAgICBidWZWaWV3WzNdID0gYnl0ZTcgPDwgOCB8IGJ5dGU2O1xyXG4gICAgICAgIGJ1ZlZpZXdbNF0gPSBieXRlOSA8PCA4IHwgYnl0ZTg7XHJcbiAgICAgICAgYnVmVmlld1s1XSA9IGJ5dGUxMSA8PCA4IHwgYnl0ZTEwO1xyXG4gICAgICAgIGJ1ZlZpZXdbNl0gPSBieXRlMTMgPDwgOCB8IGJ5dGUxMjtcclxuICAgICAgICBidWZWaWV3WzddID0gYnl0ZTE1IDw8IDggfCBieXRlMTQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIGJ5dGUwLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTEudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xyXG4gICAgICAgICAgICBieXRlMi50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGUzLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTQudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xyXG4gICAgICAgICAgICBieXRlNS50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGU2LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTcudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xyXG4gICAgICAgICAgICBieXRlOC50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGU5LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTEwLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTExLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTEyLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTEzLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTE0LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTE1LnRvU3RyaW5nKDE2KSArIFwiOlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgYnVmVmlld1swXS50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ1ZlZpZXdbMV0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xyXG4gICAgICAgICAgICBidWZWaWV3WzJdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnVmVmlld1szXS50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ1ZlZpZXdbNF0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xyXG4gICAgICAgICAgICBidWZWaWV3WzVdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnVmVmlld1s2XS50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ1ZlZpZXdbN10udG9TdHJpbmcoMTYpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gYnVmO1xyXG4gICAgfVxyXG5cclxuICAgIF93cml0ZUNoYXJhY3RlcmlzdGljKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuc2VydmljZSgpKVxyXG4gICAgICAgICAgICAudGhlbihzZXJ2aWNlID0+IHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuY2hhcmF0ZXJpc3RpYygpKSlcclxuICAgICAgICAgICAgLnRoZW4oY2hhcmFjdGVyaXN0aWMgPT4gY2hhcmFjdGVyaXN0aWMud3JpdGVWYWx1ZSh2YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbmNsYXNzIE15b0NvbmZpZ3tcclxuICAgIGNvbnN0cnVjdG9yKCl7ICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29udHJvbFNlcnZpY2UoKSB7IHJldHVybiBcImQ1MDYwMDAxLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cclxuICAgIGdlc3R1cmVTZXJ2aWNlKCkgeyByZXR1cm4gXCJkNTA2MDAwMy1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XHJcbiAgICBjb21tYW5kQ2hhcmFjdGVyaXN0aWMoKSB7IHJldHVybiBcImQ1MDYwNDAxLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cclxuICAgIGdlc3R1cmVDaGFyYWN0ZXJpc3RpYygpIHsgcmV0dXJuIFwiZDUwNjAxMDMtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxyXG4gICAgXHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTXlvQ29udHJvbGVye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmRldmljZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgTXlvQ29uZmlnKCk7XHJcbiAgICAgICAgdGhpcy5vbkRpc2Nvbm5lY3RlZCA9IHRoaXMub25EaXNjb25uZWN0ZWQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZCA9IG5ldyBVaW50OEFycmF5KDUpO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzBdID0gMHgwMTsgLy8gc2V0IG1vZGVcclxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFsxXSA9IDB4MDM7IC8vIGJ5dGVzIGluIHBheWxvYWRcclxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFsyXSA9IDB4MDA7IC8vIGVtZyBtb2RlOiBub25lXHJcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbM10gPSAweDAwOyAvLyBpbXUgbW9kZTogZGlzYWJsZWRcclxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFs0XSA9IDB4MDE7IC8vIGNsYXNzaWZpZXIgbW9kZTogZW5hYmxlZFxyXG5cclxuICAgICAgICB0aGlzLmRpc2FibGVHZXN0dXJlc0NvbW1hbmQgPSBVaW50OEFycmF5LmZyb20odGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQpO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUdlc3R1cmVzQ29tbWFuZFs0XSA9IDB4MDA7IC8vIGNsYXNzaWZpZXIgbW9kZTogZGlzYWJsZWRcclxuXHJcbiAgICAgICAgdGhpcy5kZWVwU2xlZXBDb21tYW5kID0gbmV3IFVpbnQ4QXJyYXkoMik7XHJcbiAgICAgICAgdGhpcy5kZWVwU2xlZXBDb21tYW5kWzBdID0gMHgwNDsgLy8gc2V0IG1vZGVcclxuICAgICAgICB0aGlzLmRlZXBTbGVlcENvbW1hbmRbMV0gPSAweDAwOyAvLyBieXRlcyBpbiBwYXlsb2FkXHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lbHRQb3B1cCA9IG51bGw7XHJcbiAgICAgICAgdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBSZXF1ZXN0IHRoZSBkZXZpY2Ugd2l0aCBibHVldG9vdGhcclxuICAgICovXHJcbiAgICByZXF1ZXN0KCkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBcImZpbHRlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgIFwic2VydmljZXNcIjogW3RoaXMuY29uZmlnLmNvbnRyb2xTZXJ2aWNlKCldXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICBcIm9wdGlvbmFsU2VydmljZXNcIjogW3RoaXMuY29uZmlnLmdlc3R1cmVTZXJ2aWNlKCldXHJcbiAgICAgICAgfTsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYmx1ZXRvb3RoLnJlcXVlc3REZXZpY2Uob3B0aW9ucylcclxuICAgICAgICAgICAgLnRoZW4oZGV2aWNlID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UuYWRkRXZlbnRMaXN0ZW5lcignZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZCcsIHRoaXMub25EaXNjb25uZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRldmljZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZWN0IHRvIHRoZSBkZXZpY2VcclxuICAgICAqICovXHJcbiAgICBjb25uZWN0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmNvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXQoKXtcclxuICAgICAgICBpZighdGhpcy5kZXZpY2Upe1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZWx0UG9wdXApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe3N0YXRlIDogJ2FkZCd9KTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuY29udHJvbFNlcnZpY2UoKSlcclxuICAgICAgICAgICAgLnRoZW4oKHNlcnZpY2UpPT57XHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gZ2V0IE15byBDb250cm9sIFNlcnZpY2UnKTtcclxuICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5jb21tYW5kQ2hhcmFjdGVyaXN0aWMoKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKGNoYXJhY3RlcmlzdGljKT0+e1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBnZXQgTXlvIENvbW1hbmQgY2hhcmFjdGVyaXN0aWMnKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUodGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVhZHkgdG8gbGlzdGVuIGdlc3R1cmVzJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJHZXN0dXJlcyhjYWxsYmFjayl7XHJcbiAgICAgICAgaWYoIXRoaXMuZGV2aWNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSh0aGlzLmNvbmZpZy5nZXN0dXJlU2VydmljZSgpKVxyXG4gICAgICAgICAgICAudGhlbihzZXJ2aWNlPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBHZXQgR2VzdHVyZSBTZXJ2aWNlJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5nZXN0dXJlQ2hhcmFjdGVyaXN0aWMoKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKGNoYXJhY3RlcmlzdGljKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnR2V0IGdlc3R1cmUgY2FyYWN0ZXJpc3RpYycpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpYy5zdGFydE5vdGlmaWNhdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYXJhY3RlcmlzdGljdmFsdWVjaGFuZ2VkJywgKGV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2VzdHVyZSA9IHRoaXMuX3BhcnNlTXlvR2VzdHVyZShldi50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHZXN0dXJlIDogJywgZ2VzdHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZ2VzdHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtzdGF0ZSA6ICdyZW1vdmUnfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNjb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe3N0YXRlIDogJ3JlbW92ZSd9KTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdEZXZpY2UgaXMgZGlzY29ubmVjdGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wYXJzZU15b0dlc3R1cmUodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUuZ2V0VWludDgoMCkgPT09IDB4MDMpIHtcclxuICAgICAgICAgICAgY29uc3QgZ2VzdHVyZVZhbHVlID0gdmFsdWUuZ2V0VWludDE2KDEsIHRydWUpXHJcbiAgICAgICAgICAgIGNvbnN0IGdlc3R1cmUgPSB7XHJcbiAgICAgICAgICAgICAgICAweDAwMDA6ICdyZXN0JyxcclxuICAgICAgICAgICAgICAgIDB4MDAwMTogJ2Zpc3QnLFxyXG4gICAgICAgICAgICAgICAgMHgwMDAyOiAnd2F2ZS1pbicsXHJcbiAgICAgICAgICAgICAgICAweDAwMDM6ICd3YXZlLW91dCcsXHJcbiAgICAgICAgICAgICAgICAweDAwMDQ6ICdmaW5nZXJzLXNwcmVhZCcsXHJcbiAgICAgICAgICAgICAgICAweDAwMDU6ICdkb3VibGUtdGFwJyxcclxuICAgICAgICAgICAgICAgIDB4ZmZmZjogJ3Vua25vd24nLFxyXG4gICAgICAgICAgICB9W2dlc3R1cmVWYWx1ZV1cclxuICAgICAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe2dlc3R1cmUgOiBnZXN0dXJlfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGdlc3R1cmUgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBnZXN0dXJlOiBudWxsIH1cclxuICAgIH1cclxuXHJcbiAgICBfbWFuYWdlUG9wdXBFbHQoe3N0YXRlPSAnbm9uZScsIGdlc3R1cmUgPSAnbm9uZSd9KXtcclxuICAgICAgICBpZiAoc3RhdGUgPT09ICdyZW1vdmUnICYmIHRoaXMuZWx0UG9wdXApe1xyXG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwID0gbnVsbDtcclxuICAgICAgICB9ZWxzZSBpZiAoc3RhdGUgPT09ICdhZGQnKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZWx0UG9wdXApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAuY2xhc3NMaXN0LmFkZCgnbXlvLXBvcHVwJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbHRQb3B1cCk7XHJcbiAgICAgICAgfWVsc2UgaWYgKHRoaXMuZWx0UG9wdXAgJiYgZ2VzdHVyZSAmJiBnZXN0dXJlICE9ICdub25lJyl7XHJcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAuY2xhc3NOYW1lID0gYG15by1wb3B1cCAke2dlc3R1cmV9YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
