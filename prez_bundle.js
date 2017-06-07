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
		}, {
			line: 8,
			nbLines: 2,
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
			line: 7,
			nbLines: 3,
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
			Reveal.addEventListener('disconnect-heart-rate-sensor', function (event) {
				// Try to disconnect heart rate sensor
				if (frames[0].heartRateSensor.device) {
					frames[0].heartRateSensor.device.gatt.disconnect();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyIsInNjcmlwdHMvcHJlei5qcyIsInNjcmlwdHMvcHJlei9oaWdobGlnaHRFdmVudHMuanMiLCJzY3JpcHRzL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzIiwic2NyaXB0cy9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMiLCJzY3JpcHRzL3NlbnNvcnMvc3BlZWNoU3ludGhlc2lzQ29udHJvbGVyLmpzIiwic2NyaXB0cy9zZW5zb3JzL3ZvaWNlUmVjb2duaXRpb25Db250cm9sZXIuanMiLCJzY3JpcHRzL3dlYmJsdWV0b290aC9tYm90Q29udHJvbGVyLmpzIiwic2NyaXB0cy93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFVBQVUsTUFBaEI7QUFDQSxJQUFNLGNBQWMsUUFBcEI7QUFDQSxJQUFNLHFCQUFxQixPQUEzQjtBQUNBLElBQU0sWUFBWSxFQUFsQjs7QUFFQSxJQUFNLFdBQVcsT0FBakI7O0lBRWEsbUIsV0FBQSxtQjtBQUNaLG9DQUdHO0FBQUE7O0FBQUEsTUFGRixNQUVFLFFBRkYsTUFFRTtBQUFBLE1BREYsYUFDRSxRQURGLGFBQ0U7O0FBQUE7O0FBQ0YsT0FBSyxXQUFMLEdBQW1CLFNBQVMsY0FBVCxnQkFBcUMsTUFBckMsQ0FBbkI7QUFDQSxPQUFLLGFBQUwsR0FBcUIsYUFBckI7QUFDQSxPQUFLLFFBQUwsR0FBZ0IsT0FBTyxXQUFQLEVBQWhCOztBQUVBLFNBQU8sZ0JBQVAsV0FBZ0MsTUFBaEMsRUFBMkMsWUFBTTtBQUNoRCxPQUFJO0FBQ0gsUUFBTSxrQkFBa0IsT0FBTyxXQUFQLEVBQXhCO0FBQ0EsVUFBSyxnQkFBTCxDQUFzQixrQkFBa0IsTUFBSyxRQUF2QixHQUFrQyxNQUFLLGFBQUws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Q0gsYUFIRCxNQUdNLElBQUksVUFBVSxLQUFkLEVBQW9CO0FBQ3RCLG9CQUFJLEtBQUssUUFBVCxFQUFrQjtBQUNkLHlCQUFLLFFBQUwsQ0FBYyxNQUFkO0FBQ0g7QUFDRCxxQkFBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBLHFCQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLEdBQXhCLENBQTRCLFdBQTVCO0FBQ0EseUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBSyxRQUEvQjtBQUNILGFBUEssTUFPQSxJQUFJLEtBQUssUUFBTCxJQUFpQixPQUFqQixJQUE0QixXQUFXLE1BQTNDLEVBQWtEO0FBQ3BELHFCQUFLLFFBQUwsQ0FBYyxTQUFkLGtCQUF1QyxPQUF2QztBQUNIO0FBQ0oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IE1JTl9UT1AgPSAnOTVweCc7XG5jb25zdCBMSU5FX0hFSUdIVCA9ICcwLjU3ZW0nO1xuY29uc3QgQURESVRJT05OQUxfSEVJR0hUID0gJzAuNGVtJztcbmNvbnN0IENPTF9XSURUSCA9IDM1O1xuXG5jb25zdCBMRUZUX1RBQiA9ICcxMDBweCc7XG5cbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRDb2RlSGVscGVyIHtcblx0Y29uc3RydWN0b3Ioe1xuXHRcdGtleUVsdCxcblx0XHRwb3NpdGlvbkFycmF5XG5cdH0pIHtcblx0XHR0aGlzLmVsdEhpZ2xpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGhpZ2hsaWdodC0ke2tleUVsdH1gKTtcblx0XHR0aGlzLnBvc2l0aW9uQXJyYXkgPSBwb3NpdGlvbkFycmF5O1xuXHRcdHRoaXMucHJvZ3Jlc3MgPSBSZXZlYWwuZ2V0UHJvZ3Jlc3MoKTtcblxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKGBjb2RlLSR7a2V5RWx0fWAsICAoKSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBjdXJyZW50UHJvZ3Jlc3MgPSBSZXZlYWwuZ2V0UHJvZ3Jlc3MoKTtcblx0XHRcdFx0dGhpcy5fYXBwbHlQcm9wZXJ0aWVzKGN1cnJlbnRQcm9ncmVzcyA+IHRoaXMucHJvZ3Jlc3MgPyB0aGlzLnBvc2l0aW9uQXJyYXlbMF0gOiB0aGlzLnBvc2l0aW9uQXJyYXlbdGhpcy5wb3NpdGlvbkFycmF5Lmxlbmd0aCAtIDFdKTtcblx0XHRcdFx0dGhpcy5fbGlzdGVuRnJhZ21lbnRzKCk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoYHN0b3AtY29kZS0ke2tleUVsdH1gLCAoKSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aGlzLnByb2dyZXNzID0gUmV2ZWFsLmdldFByb2dyZXNzKCk7XG5cdFx0XHRcdHRoaXMuX3VucmVnaXN0ZXJGcmFnbWVudHMoKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG5cblx0X2FwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcblx0XHRcdGNvbnN0IGFyZWEgPSB7fTtcblx0XHRcdGNvbnN0IHBvc2l0aW9uID0ge307XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3Qga2V5ID0ga2V5c1tpXTtcblx0XHRcdFx0c3dpdGNoICh0cnVlKSB7XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICdsaW5lJzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ25iTGluZXMnOlxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnY29sJzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ25iQ29scyc6XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICd0b3BNYXJnaW4nOlxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnbGVmdE1hcmdpbic6XG5cdFx0XHRcdFx0XHRwb3NpdGlvbltrZXldID0gcHJvcGVydGllc1trZXldO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICdoZWlnaHQnOlxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnd2lkdGgnOlxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAndG9wJzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ2xlZnQnOlxuXHRcdFx0XHRcdFx0YXJlYVtrZXldID0gcHJvcGVydGllc1trZXldO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGlmIChwb3NpdGlvbi50b3BNYXJnaW4gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRwb3NpdGlvbi50b3BNYXJnaW4gPSBNSU5fVE9QO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc2l0aW9uLm5iTGluZXMgPT09IHVuZGVmaW5lZCAmJiBhcmVhLmhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGFyZWEuaGVpZ2h0ID0gTElORV9IRUlHSFQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAocG9zaXRpb24ubGluZSA9PT0gdW5kZWZpbmVkICYmIGFyZWEudG9wID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YXJlYS50b3AgPSAwO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc2l0aW9uLm5iQ29scyA9PT0gdW5kZWZpbmVkICYmIGFyZWEud2lkdGggPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhcmVhLndpZHRoID0gMDtcblx0XHRcdH1cblx0XHRcdGlmIChwb3NpdGlvbi5jb2wgPT09IHVuZGVmaW5lZCAmJiBhcmVhLmxlZnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhcmVhLmxlZnQgPSAwO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5lbHRIaWdsaWdodC5hcmVhID0gYXJlYTtcblx0XHRcdHRoaXMuZWx0SGlnbGlnaHQucG9zaXRpb24gPSBwb3NpdGlvbjtcblx0XHR9IGNhdGNoIChlKSB7fVxuXHR9XG5cblx0X3Byb2dyZXNzRnJhZ21lbnQoZXZlbnQpIHtcblx0XHR0cnkge1xuXHRcdFx0bGV0IHByb3BlcnRpZXMgPSBudWxsXG5cdFx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ2ZyYWdtZW50c2hvd24nKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gK2V2ZW50LmZyYWdtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudC1pbmRleCcpO1xuXHRcdFx0XHRwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4ICsgMV07XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gK2V2ZW50LmZyYWdtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudC1pbmRleCcpO1xuXHRcdFx0XHRwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4XTtcblx0XHRcdH1cblx0XHRcdGlmICghcHJvcGVydGllcykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2FwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcblxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSlcblx0XHR9XG5cdH1cblxuXHRfbGlzdGVuRnJhZ21lbnRzKCkge1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRoaWRkZW4nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHR9XG5cblx0X3VucmVnaXN0ZXJGcmFnbWVudHMoKSB7XG5cdFx0UmV2ZWFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZyYWdtZW50c2hvd24nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHRcdFJldmVhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmcmFnbWVudGhpZGRlbicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXG59IiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQge1JldmVhbEVuZ2luZUV2ZW50c30gZnJvbSAnLi9wcmV6L3JldmVhbEVuZ2luZUV2ZW50cy5qcyc7XG5cblxuKGZ1bmN0aW9uICgpIHtcblxuXG4gICAgZnVuY3Rpb24gcGFnZUxvYWQoKSB7XG4gICAgICAgIG5ldyBSZXZlYWxFbmdpbmVFdmVudHMoKTtcbiAgICB9XG5cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcGFnZUxvYWQpO1xufSkoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHtcblx0SGlnaGxpZ2h0Q29kZUhlbHBlclxufSBmcm9tIFwiLi4vaGVscGVycy9oaWdobGlnaHRDb2RlSGVscGVyLmpzXCI7XG5cbmNvbnN0IExJTkVfSEVJR0hUID0gMS4xNTtcbmNvbnN0IEFERElUSU9OTkFMX0hFSUdUID0gMC40O1xuY29uc3QgQ09MX1dJRFRIID0gMzU7XG5jb25zdCBMRUZUX0ZJUlNUID0gXCI2MHB4XCI7XG5cbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRFdmVudHMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHQvLyAgQmx1ZXRvb3RoOiBTY2FuICsgQ29ubmVjdFxuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdDogJ2Nvbm5lY3QtYmxlJyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHRcdHdpZHRoOiAnNjAwcHgnLFxuXHRcdFx0XHRcdGxpbmU6IDUsXG5cdFx0XHRcdFx0bGVmdDogTEVGVF9GSVJTVFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogMixcblx0XHRcdFx0XHR3aWR0aDogJzkwMHB4Jyxcblx0XHRcdFx0XHRsZWZ0OiBMRUZUX0ZJUlNUXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA3LFxuXHRcdFx0XHRcdHdpZHRoOiAnNjAwcHgnLFxuXHRcdFx0XHRcdGxlZnQ6IExFRlRfRklSU1Rcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0Ly8gIEJsZSBDb2RlIFJlYWQgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICdyZWFkLWNoYXJhY3QnLFxuXHRcdFx0Ly8gV2Ugc3RhcnQgd2l0aCB0aGUgZmlyc3QgZnJhZ21lbnQgKHRoZSBpbml0aWFsIHBvc2l0aW9uIGlzIGZpeGVkIGJ5IGNzcylcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFt7XG5cdFx0XHRcdHdpZHRoOiAnNzAwcHgnLFxuXHRcdFx0XHRsaW5lOiAyXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGxpbmU6IDQsXG5cdFx0XHRcdHdpZHRoOiAnOTAlJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRsaW5lOiA2LFxuXHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogOCxcblx0XHRcdFx0bmJMaW5lczogMixcblx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHR9XVxuXHRcdH0pXG5cblx0XHQvLyAgQmxlIENvZGUgV3JpdGUgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICd3cml0ZS1jaGFyYWN0Jyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHR3aWR0aDogJzcwMHB4Jyxcblx0XHRcdFx0bGluZTogMlxuXHRcdFx0fSwge1xuXHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogNyxcblx0XHRcdFx0bmJMaW5lczogMyxcblx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHR9XVxuXHRcdH0pXG5cblx0XHQvLyAgQmxlIENvZGUgUmVhZCBDaGFyYWN0ZXJpc3RpY1xuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdDogJ25vdGlmLWNoYXJhY3QnLFxuXHRcdFx0Ly8gV2Ugc3RhcnQgd2l0aCB0aGUgZmlyc3QgZnJhZ21lbnQgKHRoZSBpbml0aWFsIHBvc2l0aW9uIGlzIGZpeGVkIGJ5IGNzcylcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFt7XG5cdFx0XHRcdHdpZHRoOiAnNzAwcHgnLFxuXHRcdFx0XHRsaW5lOiAyXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGxpbmU6IDQsXG5cdFx0XHRcdHdpZHRoOiAnOTAlJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHRsaW5lOiA2LFxuXHRcdFx0XHR3aWR0aDogJzkwJScsXG5cdFx0XHRcdG5iTGluZXM6IDNcblx0XHRcdH1dXG5cdFx0fSlcblxuXG5cdFx0Ly8gQ29kZSBXZWIgU3BlZWNoXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiAnd2ViLXNwZWVjaCcsXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHRcdHdpZHRoOiAnNjAwcHgnLFxuXHRcdFx0XHRcdGxpbmU6IDFcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDIsXG5cdFx0XHRcdFx0d2lkdGg6ICc0NTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDMsXG5cdFx0XHRcdFx0d2lkdGg6ICc1NTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDQsXG5cdFx0XHRcdFx0d2lkdGg6ICc1NTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDYsXG5cdFx0XHRcdFx0d2lkdGg6ICczNTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDcsXG5cdFx0XHRcdFx0d2lkdGg6ICczNTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDgsXG5cdFx0XHRcdFx0bGVmdDogJzI4MHB4Jyxcblx0XHRcdFx0XHR3aWR0aDogJzUwMHB4J1xuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHQvLyBDb2RlIFdlYiBTcGVlY2ggR3JhbW1hclxuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdDogJ3dlYi1zcGVlY2gtZ3JhbW1hcicsXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHRcdHdpZHRoOiAnMTIwMHB4Jyxcblx0XHRcdFx0XHRsaW5lOiAxXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiAzLFxuXHRcdFx0XHRcdHdpZHRoOiAnNzUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHRcdHdpZHRoOiAnNzAwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA1LFxuXHRcdFx0XHRcdHdpZHRoOiAnNjUwcHgnXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9KTtcblxuXHRcdC8vIENvZGUgV2ViIFNwZWVjaCBTeW50aGVzaXNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICd3ZWItc3BlZWNoLXN5bnRoZXNpcycsXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHRcdHdpZHRoOiAnOTAwcHgnLFxuXHRcdFx0XHRcdGxpbmU6IDFcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDIsXG5cdFx0XHRcdFx0d2lkdGg6ICc0MDBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDMsXG5cdFx0XHRcdFx0d2lkdGg6ICc0MDBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDQsXG5cdFx0XHRcdFx0d2lkdGg6ICc0NTBweCdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDUsXG5cdFx0XHRcdFx0d2lkdGg6ICc2MDBweCdcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0Ly8gQ29kZSBpbWFnZSBjYXB0dXJlIHpvb21cblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICdpbWFnZS1jYXB0dXJlLXpvb20nLFxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0XHR3aWR0aDogJzkwJScsXG5cdFx0XHRcdFx0bGluZTogMVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogMyxcblx0XHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDQsXG5cdFx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA2LFxuXHRcdFx0XHRcdHdpZHRoOiAnOTAlJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNyxcblx0XHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0Ly8gQ29kZSBpbWFnZSBjYXB0dXJlXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiBcImltYWdlLWNhcHR1cmVcIixcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFt7XG5cdFx0XHRcdFx0d2lkdGg6IFwiOTAlXCIsXG5cdFx0XHRcdFx0bGluZTogNSxcblx0XHRcdFx0XHRsZWZ0OiBMRUZUX0ZJUlNUXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA3LFxuXHRcdFx0XHRcdGxlZnQ6IExFRlRfRklSU1QsXG5cdFx0XHRcdFx0d2lkdGg6IFwiOTAlXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHtIaWdobGlnaHRFdmVudHN9IGZyb20gJy4vaGlnaGxpZ2h0RXZlbnRzLmpzJztcbmltcG9ydCB7QmxlUHJlekNvbnRyb2xlcn0gZnJvbSAnLi4vc2Vuc29ycy9ibGVQcmV6Q29udHJvbGVyLmpzJztcbmltcG9ydCB7Vm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlcn0gZnJvbSAnLi4vc2Vuc29ycy92b2ljZVJlY29nbml0aW9uQ29udHJvbGVyLmpzJztcbmltcG9ydCB7U3BlZWNoU3ludGhlc2lzQ29udHJvbGVyfSBmcm9tICcuLi9zZW5zb3JzL3NwZWVjaFN5bnRoZXNpc0NvbnRyb2xlci5qcyc7XG5cblxuZXhwb3J0IGNsYXNzIFJldmVhbEVuZ2luZUV2ZW50c3tcblx0Y29uc3RydWN0b3IoKXtcblx0XG5cdFx0bGV0IGluSUZyYW1lID0gd2luZG93LnRvcCAhPSB3aW5kb3cuc2VsZjtcblx0XHRcblx0XHQvLyBNYW5hZ2VtZW50IG9mIGFjdGlvbnMgaW4gcHJleiBtb2RlIChub3QgaW4gcHJldmlldyBtb2RlKVxuXHRcdGlmICghaW5JRnJhbWUpe1xuXHRcdFx0XHQvLyBJbml0IGFsbCBibGUgYWN0aW9uc1xuXHRcdFx0XHR0aGlzLl9ibGVQcmV6Q29udHJvbGVyID0gbmV3IEJsZVByZXpDb250cm9sZXIoKTtcblx0XHRcdFx0dGhpcy5fYmxlRXZlbnRzKCk7XG5cblx0XHRcdFx0Ly8gSW5pdCBWb2ljZSBhbmQgU3BlZWNoIGNvbnRyb2xlcnNcblx0XHRcdFx0dGhpcy52b2ljZVJlY29nbml0aW9uID0gbmV3IFZvaWNlUmVjb2duaXRpb25Db250cm9sZXIoKTtcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMgPSBuZXcgU3BlZWNoU3ludGhlc2lzQ29udHJvbGVyKCk7XG5cdFx0XHRcdHRoaXMuX3ZvaWNlRXZlbnRzKCk7XG5cdFx0fVxuXG5cdFx0Ly8gSW4gYWwgY2FzZSB3ZSBpbml0IHRoZSBoaWdobGlnaHQgb2YgY29kZS5cblx0XHR0aGlzLl9pbml0SGlnaGxpZ2h0Q29kZSgpO1xuXG5cdH1cblxuXHRfYmxlRXZlbnRzKCl7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3AtY29kZS1yZWFkLWNoYXJhY3QnLCBldmVudCA9PiB7XG5cdFx0XHRpZiAodGhpcy5fYmxlUHJlekNvbnRyb2xlci5fY3VycmVudEJsZURldmljZSkge1xuXHRcdFx0XHR0aGlzLl9ibGVQcmV6Q29udHJvbGVyLl9jdXJyZW50QmxlRGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pXG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Rpc2Nvbm5lY3QtaGVhcnQtcmF0ZS1zZW5zb3InLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcnkgdG8gZGlzY29ubmVjdCBoZWFydCByYXRlIHNlbnNvclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1lc1swXS5oZWFydFJhdGVTZW5zb3IuZGV2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lc1swXS5oZWFydFJhdGVTZW5zb3IuZGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdH0pXG5cdH1cblxuXHRfdm9pY2VFdmVudHMoKXtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29vZ2xlLWFzc2lzdGFudCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXz0+e1xuXHRcdFx0dGhpcy5fdm9pY2VDYWxsQmFjaygpO1xuXHRcdH0pO1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdlbmQtcmVjb2duaXRpb24nLCBfPT57XG5cdFx0XHR0cnl7XG5cdFx0XHRcdHRoaXMudm9pY2VSZWNvZ25pdGlvbi5zdG9wKCk7XG5cdFx0XHR9Y2F0Y2goZSl7fVxuXHRcdH0pXG5cdH1cblxuXHRfdm9pY2VDYWxsQmFjaygpe1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vU3BlZWNoJykuc3R5bGUuZGlzcGxheSA9ICcnO1xuXHRcdHRoaXMudm9pY2VSZWNvZ25pdGlvbi5zdGFydCgoZmluYWxTdHIpPT57XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BlZWNoX2lucHV0JykuaW5uZXJIVE1MID0gZmluYWxTdHI7XG5cdFx0XHRpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnw6dhIHZhJykpe1xuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtb1NwZWVjaCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcblx0XHRcdFx0XHR2YWx1ZTonamUgdmFpcyB0csOocyBiaWVuIG1lcmNpLiBDb21tZW50IHNlIHBhc3NlIHRhIGNvbmbDqXJlbmNlID8gRnJhbsOnb2lzIGVzdC1pbCBnZW50aWwgYXZlYyB0b2kgPydcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1lbHNlIGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdhbmdsYWlzJykpe1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6ICdoZWxsbyBldmVyeSBvbmUsIHdlbGNvbWUgdG8gdGhlIGJlc3QgdGFsayBvZiB0aGlzIGV2ZW50ICEnLCBcblx0XHRcdFx0XHRsYW5nRnIgOiBmYWxzZX1cblx0XHRcdFx0KVxuXHRcdFx0XHQudGhlbihfPT50aGlzLl92b2ljZUNhbGxCYWNrLmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaCgoZXJyb3IpPT57XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fWVsc2UgaWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3ZvaXgnKSl7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcblx0XHRcdFx0XHR2YWx1ZTogJ2NvbW1lIMOnYSBjXFwnZXN0IGFzc2V6IGJpemFycmUgcG91ciB0b2kgPycsXG5cdFx0XHRcdFx0cGl0Y2ggOiAyLFxuXHRcdFx0XHRcdHJhdGUgOiAwLjN9XG5cdFx0XHRcdClcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1lbHNlIGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdzb21tZXMtbm91cycpKXtcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xuXHRcdFx0XHRcdHZhbHVlOiAnVm95b25zIEZyYW7Dp29pcywgbm91cyBzb21tZXMgZGFucyB0YSBzZXNzaW9uLCBqZSB0cm91dmUgcXVlIHR1IG5cXCdhcyBwYXMgbFxcJ2FpciB0csOocyByw6l2ZWlsbMOpJ1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihfPT50aGlzLl92b2ljZUNhbGxCYWNrLmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaCgoZXJyb3IpPT57XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fWVsc2UgaWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3N1aXZhbnQnKSl7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcblx0XHRcdFx0XHR2YWx1ZTogJ1Ryw6hzIGJpZW4gcGFzc29ucyBhdSBzbGlkZSBzdWl2YW50J1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihfPT5SZXZlYWwubmV4dCgpKVxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRsZXQgdW5rbm93QXJyYXkgPSBbXG5cdFx0XHRcdFx0J0FydGljdWxlIHNcXCdpbCB0ZSBwbGFpdCcsXG5cdFx0XHRcdFx0J0thbW91bG94ICEnLFxuXHRcdFx0XHRcdCdUdSBwb3VycmFpcyBmYWlyZSB1biBlZmZvcnQgcXVhbmQgbcOqbWUnLFxuXHRcdFx0XHRcdCdSZXRpcmUgdG9uIGNoZXdpbmcgZ3VtIGF2YW50IGRlIHBhcmxlcidcblx0XHRcdFx0XTtcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xuXHRcdFx0XHRcdHZhbHVlOiB1bmtub3dBcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1bmtub3dBcnJheS5sZW5ndGgpXVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihfPT50aGlzLl92b2ljZUNhbGxCYWNrLmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaCgoZXJyb3IpPT57XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdFxuXG5cdF9pbml0SGlnaGxpZ2h0Q29kZSgpIHtcblxuXHRcdG5ldyBIaWdobGlnaHRFdmVudHMoKTtcblx0fVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQge1xuXHRNeW9Db250cm9sZXJcbn0gZnJvbSAnLi4vd2ViYmx1ZXRvb3RoL215b0NvbnRyb2xlci5qcyc7XG5pbXBvcnQge1xuXHRNQm90XG59IGZyb20gJy4uL3dlYmJsdWV0b290aC9tYm90Q29udHJvbGVyLmpzJztcblxuZXhwb3J0IGNsYXNzIEJsZVByZXpDb250cm9sZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHRcdHRoaXMuX2N1cnJlbnRCbGVEZXZpY2UgPSBudWxsO1xuXHRcdHRoaXMuX2Jhc2ljQmxlQmluZGluZygpO1xuXHRcdC8vdGhpcy5fbXlvQmluZGluZygpO1xuXHRcdC8vIEp1c3QgY29tbWVudCBtYm90IHBhcnQgYmVjYXVzZSBpdCBjYW4gYWx3YXlzIGJlIHVzZWZ1bGwgIVxuXHRcdC8vdGhpcy5fbWJvdEJpbmRpbmcoKTtcblx0fVxuXG5cdF9iYXNpY0JsZUJpbmRpbmcoKSB7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RCbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcblxuXHRcdFx0Y29uc3QgZmlsdGVycyA9IHtcblx0XHRcdFx0ZmlsdGVyczogW3tcblx0XHRcdFx0XHRzZXJ2aWNlczogWydiYXR0ZXJ5X3NlcnZpY2UnXVxuXHRcdFx0XHR9XVxuXHRcdFx0fTtcblx0XHRcdG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZShmaWx0ZXJzKVxuXHRcdFx0XHQudGhlbihkZXZpY2UgPT4gZGV2aWNlLmdhdHQuY29ubmVjdCgpKVxuXHRcdFx0XHQudGhlbihzZXJ2ZXIgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdCbHVldG9vdGggZGV2aWNlIGlzIGNvbm5lY3RlZC4nKTtcblx0XHRcdFx0XHR0aGlzLl9jdXJyZW50QmxlRGV2aWNlID0gc2VydmVyLmRldmljZTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlYWRDaGFyYWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG5cblx0XHRcdHRoaXMuX2N1cnJlbnRCbGVEZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSgnYmF0dGVyeV9zZXJ2aWNlJylcblx0XHRcdFx0LnRoZW4oc2VydmljZSA9PiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKCdiYXR0ZXJ5X2xldmVsJykpXG5cdFx0XHRcdC50aGVuKGNoYXJhY3RlcmlzdGljID0+IGNoYXJhY3RlcmlzdGljLnJlYWRWYWx1ZSgpKVxuXHRcdFx0XHQudGhlbih2YWx1ZSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgYmF0dGVyeUxldmVsID0gdmFsdWUuZ2V0VWludDgoMCk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coYEJhdHRlcnkgcGVyY2VudGFnZSBpcyAke2JhdHRlcnlMZXZlbH0lLmApO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdF9teW9CaW5kaW5nKCkge1xuXHRcdGxldCBsYXN0RG91YmxlVGFwID0gMDtcblx0XHRsZXQgbXlvID0gbmV3IE15b0NvbnRyb2xlcigpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25uZWN0TXlvJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cblx0XHRcdGlmICghbXlvLmNvbm5lY3RlZCkge1xuXHRcdFx0XHRteW8ucmVxdWVzdCgpXG5cdFx0XHRcdFx0LnRoZW4oXyA9PiBteW8uY29ubmVjdCgpKVxuXHRcdFx0XHRcdC50aGVuKCgpID0+IG15by5pbml0KCkpXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4gbXlvLnJlZ2lzdGVyR2VzdHVyZXMoKGdlc3R1cmUpID0+IHtcblx0XHRcdFx0XHRcdGlmIChnZXN0dXJlICYmIGdlc3R1cmUuZ2VzdHVyZSA9PT0gJ2RvdWJsZS10YXAnKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChEYXRlLm5vdygpIC0gbGFzdERvdWJsZVRhcCA8IDIwMDApIHtcblx0XHRcdFx0XHRcdFx0XHRSZXZlYWwubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGxhc3REb3VibGVUYXAgPSBEYXRlLm5vdygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdkaXNjb25uZWN0LW15bycsIF8gPT4ge1xuXHRcdFx0bXlvLmRpc2Nvbm5lY3QoKTtcblx0XHR9KTtcblx0fVxuXG5cdF9tYm90QmluZGluZygpIHtcblx0XHQvLyBDaGVjayB0aGUgY29ubmVjdGlvblxuXHRcdGxldCBzdGVwQ29ubmVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25uZWN0TUJvdCcpO1xuXHRcdGxldCBzdGVwQ29udHJvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJ0LWJ1dHRvbi1tYm90Jyk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0TUJvdFwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF8gPT4ge1xuXHRcdFx0Ly8gUmVxdWVzdCB0aGUgZGV2aWNlXG5cdFx0XHRsZXQgbUJvdCA9IG5ldyBNQm90KCk7XG5cdFx0XHRtQm90LnJlcXVlc3QoKVxuXHRcdFx0XHQudGhlbihfID0+IHtcblx0XHRcdFx0XHQvLyBDb25uZWN0IHRvIHRoZSBtYm90XG5cdFx0XHRcdFx0cmV0dXJuIG1Cb3QuY29ubmVjdCgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihfID0+IHtcblx0XHRcdFx0XHQvLyBDb25uZWN0aW9uIGlzIGRvbmUsIHdlIHNob3cgdGhlIGNvbnRyb2xzXG5cdFx0XHRcdFx0c3RlcENvbm5lY3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0XHRcdHN0ZXBDb250cm9sLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcblxuXHRcdFx0XHRcdGxldCBwYXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcnQtYnV0dG9uJyk7XG5cblx0XHRcdFx0XHQvLyBDb250cm9sIHRoZSByb2JvdCBieSBidXR0b25zXG5cdFx0XHRcdFx0bGV0IGJ0blVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5VcCcpO1xuXHRcdFx0XHRcdGxldCBidG5Eb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5Eb3duJyk7XG5cdFx0XHRcdFx0bGV0IGJ0bkxlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0bkxlZnQnKTtcblx0XHRcdFx0XHRsZXQgYnRuUmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0blJpZ2h0Jyk7XG5cblx0XHRcdFx0XHRidG5VcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHtcblx0XHRcdFx0XHRcdG1Cb3QucHJvY2Vzc01vdG9yKC0yNTAsIDI1MClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRidG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4ge1xuXHRcdFx0XHRcdFx0bUJvdC5wcm9jZXNzTW90b3IoMjUwLCAtMjUwKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJ0bkxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7XG5cdFx0XHRcdFx0XHRtQm90LnByb2Nlc3NNb3RvcigyNTAsIDI1MClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHtcblx0XHRcdFx0XHRcdG1Cb3QucHJvY2Vzc01vdG9yKC0yNTAsIC0yNTApXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRidG5VcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7XG5cdFx0XHRcdFx0XHRtQm90LnByb2Nlc3NNb3RvcigwLCAwKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJ0bkRvd24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4ge1xuXHRcdFx0XHRcdFx0bUJvdC5wcm9jZXNzTW90b3IoMCwgMClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRidG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHtcblx0XHRcdFx0XHRcdG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4ge1xuXHRcdFx0XHRcdFx0bUJvdC5wcm9jZXNzTW90b3IoMCwgMClcblx0XHRcdFx0XHR9KTtcblxuXG5cdFx0XHRcdH0pXG5cdFx0fSk7XG5cdH1cblxufSIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgY2xhc3MgU3BlZWNoU3ludGhlc2lzQ29udHJvbGVye1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuc3ludGggPSB3aW5kb3cuc3BlZWNoU3ludGhlc2lzO1xuXG4gICAgICAgIHRoaXMudm9pY2VGUiA9IG51bGw7XG4gICAgICAgIHRoaXMudm9pY2VFTiA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyZSgpO1xuICAgIH1cblxuICAgIF9jb25maWd1cmUoKXtcbiAgICAgICAgdGhpcy5fcG9wdWxhdGVWb2ljZUxpc3QoKTtcbiAgICAgICAgaWYgKHNwZWVjaFN5bnRoZXNpcy5vbnZvaWNlc2NoYW5nZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3BlZWNoU3ludGhlc2lzLm9udm9pY2VzY2hhbmdlZCA9IHRoaXMuX3BvcHVsYXRlVm9pY2VMaXN0LmJpbmQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcG9wdWxhdGVWb2ljZUxpc3QoKSB7XG4gICAgICAgIGxldCB2b2ljZXMgPSB0aGlzLnN5bnRoLmdldFZvaWNlcygpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZvaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHZvaWNlc1tpXS5sYW5nID09PSAnZnItRlInKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIiVzLCAlTyBcIiwgdm9pY2VzW2ldLmxhbmcsIHZvaWNlc1tpXSk7XG4gICAgICAgICAgICAgICAgdGhpcy52b2ljZUZSID0gdm9pY2VzW2ldO1xuICAgICAgICAgICAgfWVsc2UgaWYgKHZvaWNlc1tpXS5sYW5nID09PSAnZW4tR0InKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIiVzLCAlTyBcIiwgdm9pY2VzW2ldLmxhbmcsIHZvaWNlc1tpXSk7XG4gICAgICAgICAgICAgICAgdGhpcy52b2ljZUVOID0gdm9pY2VzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3BlYWsoe3ZhbHVlLCBsYW5nRnIgPSB0cnVlLCBwaXRjaCA9IDEsIHJhdGUgPSAxfSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT57XG5cbiAgICAgICAgICAgIGlmICghdGhpcy52b2ljZUZSKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdXR0ZXJUaGlzID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSh2YWx1ZSk7XG4gICAgICAgICAgICB1dHRlclRoaXMudm9pY2UgPSBsYW5nRnIgPyB0aGlzLnZvaWNlRlIgOiB0aGlzLnZvaWNlRU47XG4gICAgICAgICAgICB1dHRlclRoaXMucGl0Y2ggPSBwaXRjaDtcbiAgICAgICAgICAgIHV0dGVyVGhpcy5yYXRlID0gcmF0ZTtcbiAgICAgICAgICAgIHV0dGVyVGhpcy5vbmVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3ludGguc3BlYWsodXR0ZXJUaGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBjbGFzcyBWb2ljZVJlY29nbml0aW9uQ29udHJvbGVye1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIGxldCBTcGVlY2hSZWNvZ25pdGlvbiA9IFNwZWVjaFJlY29nbml0aW9uIHx8IHdlYmtpdFNwZWVjaFJlY29nbml0aW9uXG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlY29nbml0aW9uID0gbmV3IFNwZWVjaFJlY29nbml0aW9uKCk7XG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyZSgpO1xuICAgIH1cblxuICAgIHN0YXJ0KGNhbGxiYWNrKXtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbnJlc3VsdCA9IChldmVudCk9PntcbiAgICAgICAgICAgIGNvbnN0IGZpbmFsU3RyID0gZXZlbnQucmVzdWx0c1swXVswXS50cmFuc2NyaXB0O1xuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnQ29uZmlkZW5jZTogJyArIGZpbmFsU3RyKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmluYWxTdHIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uc3RhcnQoKTtcbiAgICB9XG5cbiAgICBzdG9wKCl7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uc3RvcCgpO1xuICAgIH1cblxuICAgIF9jb25maWd1cmUoKXtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5sYW5nID0gJ2ZyLUZSJztcblxuICAgICAgICAvLyBXZSBkZXRlY3QgZW5kXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25lbmQgPSBfPT57XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdFbmQgb2YgcmVjb2duaXRpb24nKTtcbiAgICAgICAgICAgIHRoaXMucmVjb2duaXRpb24uc3RvcCgpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBXZSBkZXRlY3QgZXJyb3JzXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25lcnJvciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICduby1zcGVlY2gnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnTm8gU3BlZWNoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT0gJ2F1ZGlvLWNhcHR1cmUnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnTm8gbWljcm9waG9uZScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT0gJ25vdC1hbGxvd2VkJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ05vdCBBbGxvd2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07ICAgICBcbiAgICB9XG5cblxufSIsIid1c2Ugc3RyaWN0J1xuLyoqXG4gKiBDb2RlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Jpbm9tZWQvbWJvdC13ZWJibHVldG9vdGhcbiAqIFxuICovXG5cblxuY29uc3QgREVWSUNFX05BTUUgPSBcIk1ha2VibG9ja19MRVwiLFxuICAgIFNFUlZJQ0VfVVVJRCA9IFwiMDAwMGZmZTEtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIsXG4gICAgQ0hBUkFDVEVSSVNUSUNfVVVJRCA9IFwiMDAwMGZmZTMtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCI7XG5cbi8qKlxuICogR2VuZXJhbCBjb25maWd1cmF0aW9uIChVVUlEKVxuKi9cbmNsYXNzIENvbmZpZyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuYW1lKCkgeyByZXR1cm4gXCJNYWtlYmxvY2tfTEVcIjsgfVxuICAgIHNlcnZpY2UoKSB7IHJldHVybiBcIjAwMDBmZmUxLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiIH1cbiAgICBjaGFyYXRlcmlzdGljKCkgeyByZXR1cm4gXCIwMDAwZmZlMy0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIiB9XG59XG5cbi8vIENvbnN0IGZvciBpbnN0cnVjdGlvbnMgdHlwZXNcbmNvbnN0IFRZUEVfTU9UT1IgPSAweDBhLFxuICAgIFRZUEVfUkdCID0gMHgwOCxcbiAgICBUWVBFX1NPVU5EID0gMHgwNztcblxuXG4vLyBDb25zdCBmb3IgdGhlIHBvcnRzXG5jb25zdCBQT1JUXzEgPSAweDAxLFxuICAgIFBPUlRfMiA9IDB4MDIsXG4gICAgUE9SVF8zID0gMHgwMyxcbiAgICBQT1JUXzQgPSAweDA0LFxuICAgIFBPUlRfNSA9IDB4MDUsXG4gICAgUE9SVF82ID0gMHgwNixcbiAgICBQT1JUXzcgPSAweDA3LFxuICAgIFBPUlRfOCA9IDB4MDgsXG4gICAgTV8xID0gMHgwOSxcbiAgICBNXzIgPSAweDBhO1xuICAgIFxuXG4vKipcbiAqIENsYXNzIGZvciB0aGUgcm9ib3RcbiAqICovXG5leHBvcnQgY2xhc3MgTUJvdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGV2aWNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQgPSB0aGlzLm9uRGlzY29ubmVjdGVkLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYnV6emVySW5kZXggPSAwO1xuICAgIH1cblxuICAgIC8qXG4gICAgUmVxdWVzdCB0aGUgZGV2aWNlIHdpdGggYmx1ZXRvb3RoXG4gICAgKi9cbiAgICByZXF1ZXN0KCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiZmlsdGVyc1wiOiBbe1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiB0aGlzLmNvbmZpZy5uYW1lKClcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgXCJvcHRpb25hbFNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5zZXJ2aWNlKCldXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYmx1ZXRvb3RoLnJlcXVlc3REZXZpY2Uob3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGRldmljZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UgPSBkZXZpY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UuYWRkRXZlbnRMaXN0ZW5lcignZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZCcsIHRoaXMub25EaXNjb25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXZpY2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25uZWN0IHRvIHRoZSBkZXZpY2VcbiAgICAgKiAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb250cm9sIHRoZSBtb3RvcnMgb2Ygcm9ib3RcbiAgICAqL1xuICAgIHByb2Nlc3NNb3Rvcih2YWx1ZU0xLCB2YWx1ZU0yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfTU9UT1IsIE1fMSwgMCwgdmFsdWVNMSkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9NT1RPUiwgTV8yLCAwLCB2YWx1ZU0yKSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHByb2Nlc3NCdXp6ZXIoKSB7XG4gICAgICAgIHRoaXMuYnV6emVySW5kZXggPSAodGhpcy5idXp6ZXJJbmRleCArIDEpICUgODtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9TT1VORCwgUE9SVF8yLCAyMiwgdGhpcy5idXp6ZXJJbmRleCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHByb2Nlc3NDb2xvcihyZWQsYmx1ZSxncmVlbil7XG4gICAgICAgIGxldCBySGV4ID0gcmVkPDw4O1xuXHRcdGxldCBnSGV4ID0gZ3JlZW48PDE2O1xuXHRcdGxldCBiSGV4ID0gYmx1ZTw8MjQ7XG5cdFx0bGV0IHZhbHVlID0gckhleCB8IGdIZXggfCBiSGV4O1xuXHRcdHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9SR0IsUE9SVF82LDAsdmFsdWUpKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGlzY29ubmVjdGVkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnRGV2aWNlIGlzIGRpc2Nvbm5lY3RlZC4nKTtcbiAgICB9XG5cblxuICAgIF9nZW5lcmljQ29udHJvbCh0eXBlLCBwb3J0LCBzbG90LCB2YWx1ZSkge1xuICAgICAgICAvKlxuICAgICAgICBmZiA1NSBsZW4gaWR4IGFjdGlvbiBkZXZpY2UgcG9ydCAgc2xvdCAgZGF0YSBhXG4gICAgICAgIDAgIDEgIDIgICAzICAgNCAgICAgIDUgICAgICA2ICAgICA3ICAgICA4XG4gICAgICAgICovXG4gICAgICAgIC8vIFN0YXRpYyB2YWx1ZXNcbiAgICAgICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigxNik7XG4gICAgICAgIHZhciBidWZWaWV3ID0gbmV3IFVpbnQxNkFycmF5KGJ1Zik7XG5cbiAgICAgICAgdmFyIGJ5dGUwID0gMHhmZiwgLy8gU3RhdGljIGhlYWRlclxuICAgICAgICAgICAgYnl0ZTEgPSAweDU1LCAvLyBTdGF0aWMgaGVhZGVyXG4gICAgICAgICAgICBieXRlMiA9IDB4MDksIC8vIGxlblxuICAgICAgICAgICAgYnl0ZTMgPSAweDAwLCAvLyBpZHhcbiAgICAgICAgICAgIGJ5dGU0ID0gMHgwMiwgLy8gYWN0aW9uXG4gICAgICAgICAgICBieXRlNSA9IHR5cGUsIC8vIGRldmljZVxuICAgICAgICAgICAgYnl0ZTYgPSBwb3J0LCAvLyBwb3J0XG4gICAgICAgICAgICBieXRlNyA9IHNsb3Q7IC8vIHNsb3RcbiAgICAgICAgLy9keW5hbWljcyB2YWx1ZXNcbiAgICAgICAgdmFyIGJ5dGU4ID0gMHgwMCwgLy8gZGF0YVxuICAgICAgICAgICAgYnl0ZTkgPSAweDAwLCAvLyBkYXRhXG4gICAgICAgICAgICBieXRlMTAgPSAweDAwLCAvLyBkYXRhXG4gICAgICAgICAgICBieXRlMTEgPSAweDAwOyAvLyBkYXRhXG4gICAgICAgIC8vRW5kIG9mIG1lc3NhZ2VcbiAgICAgICAgdmFyIGJ5dGUxMiA9IDB4MGEsXG4gICAgICAgICAgICBieXRlMTMgPSAweDAwLFxuICAgICAgICAgICAgYnl0ZTE0ID0gMHgwMCxcbiAgICAgICAgICAgIGJ5dGUxNSA9IDB4MDA7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFRZUEVfTU9UT1I6XG4gICAgICAgICAgICAgICAgLy8gTW90b3IgTTFcbiAgICAgICAgICAgICAgICAvLyBmZjo1NSAgMDk6MDAgIDAyOjBhICAwOTo2NCAgMDA6MDAgIDAwOjAwICAwYVwiXG4gICAgICAgICAgICAgICAgLy8gMHg1NWZmOzB4MDAwOTsweDBhMDI7MHgwOTY0OzB4MDAwMDsweDAwMDA7MHgwMDBhOzB4MDAwMDtcbiAgICAgICAgICAgICAgICAvLyBNb3RvciBNMlxuICAgICAgICAgICAgICAgIC8vIGZmOjU1OjA5OjAwOjAyOjBhOjBhOjY0OjAwOjAwOjAwOjAwOjBhICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciB0ZW1wVmFsdWUgPSB2YWx1ZSA8IDAgPyAocGFyc2VJbnQoXCJmZmZmXCIsIDE2KSArIE1hdGgubWF4KC0yNTUsIHZhbHVlKSkgOiBNYXRoLm1pbigyNTUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBieXRlNyA9IHRlbXBWYWx1ZSAmIDB4MDBmZjtcbiAgICAgICAgICAgICAgICBieXRlOCA9IDB4MDA7XG4gICAgICAgICAgICAgICAgYnl0ZTggPSB0ZW1wVmFsdWUgPj4gODtcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUWVBFX1JHQjpcbiAgICAgICAgICAgICAgICAvLyBmZjo1NSAgMDk6MDAgIDAyOjA4ICAwNjowMCAgNWM6OTkgIDZkOjAwICAwYVxuICAgICAgICAgICAgICAgIC8vIDB4NTVmZjsweDAwMDk7MHgwODAyOzB4MDAwNjsweDk5NWM7MHgwMDZkOzB4MDAwYTsweDAwMDA7XG4gICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAwO1xuICAgICAgICAgICAgICAgIGJ5dGU4ID0gdmFsdWUgPj4gOCAmIDB4ZmY7XG4gICAgICAgICAgICAgICAgYnl0ZTkgPSB2YWx1ZSA+PiAxNiAmIDB4ZmY7XG4gICAgICAgICAgICAgICAgYnl0ZTEwID0gdmFsdWUgPj4gMjQgJiAweGZmO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUWVBFX1NPVU5EOlxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MDA6MDA6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjA2OjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjplZTowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6ODg6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOmI4OjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo1ZDowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6NGE6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjI2OjAxOjBhXG4gICAgICAgICAgICAgICAgYnl0ZTIgPSAweDA1O1xuICAgICAgICAgICAgICAgIGJ5dGU1ID0gMHgyMjtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDAwO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4MDY7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHhlZTtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDg4O1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4Yjg7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHg1ZDtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDRhO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDI2O1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5dGU4ID0gMHgwYTtcbiAgICAgICAgICAgICAgICBieXRlMTIgPSAweDAwO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBidWZWaWV3WzBdID0gYnl0ZTEgPDwgOCB8IGJ5dGUwO1xuICAgICAgICBidWZWaWV3WzFdID0gYnl0ZTMgPDwgOCB8IGJ5dGUyO1xuICAgICAgICBidWZWaWV3WzJdID0gYnl0ZTUgPDwgOCB8IGJ5dGU0O1xuICAgICAgICBidWZWaWV3WzNdID0gYnl0ZTcgPDwgOCB8IGJ5dGU2O1xuICAgICAgICBidWZWaWV3WzRdID0gYnl0ZTkgPDwgOCB8IGJ5dGU4O1xuICAgICAgICBidWZWaWV3WzVdID0gYnl0ZTExIDw8IDggfCBieXRlMTA7XG4gICAgICAgIGJ1ZlZpZXdbNl0gPSBieXRlMTMgPDwgOCB8IGJ5dGUxMjtcbiAgICAgICAgYnVmVmlld1s3XSA9IGJ5dGUxNSA8PCA4IHwgYnl0ZTE0O1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGJ5dGUwLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUyLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUzLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU0LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU1LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU2LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU3LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU4LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGU5LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxMC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTEudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEyLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxMy50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTQudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTE1LnRvU3RyaW5nKDE2KSArIFwiOlwiXG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYnVmVmlld1swXS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzFdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbMl0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1szXS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzRdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbNV0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s2XS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzddLnRvU3RyaW5nKDE2KVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cblxuICAgIF93cml0ZUNoYXJhY3RlcmlzdGljKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKHRoaXMuY29uZmlnLnNlcnZpY2UoKSlcbiAgICAgICAgICAgIC50aGVuKHNlcnZpY2UgPT4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5jaGFyYXRlcmlzdGljKCkpKVxuICAgICAgICAgICAgLnRoZW4oY2hhcmFjdGVyaXN0aWMgPT4gY2hhcmFjdGVyaXN0aWMud3JpdGVWYWx1ZSh2YWx1ZSkpO1xuICAgIH1cblxuXG59XG5cblxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIE15b0NvbmZpZ3tcbiAgICBjb25zdHJ1Y3RvcigpeyAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGNvbnRyb2xTZXJ2aWNlKCkgeyByZXR1cm4gXCJkNTA2MDAwMS1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XG4gICAgZ2VzdHVyZVNlcnZpY2UoKSB7IHJldHVybiBcImQ1MDYwMDAzLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cbiAgICBjb21tYW5kQ2hhcmFjdGVyaXN0aWMoKSB7IHJldHVybiBcImQ1MDYwNDAxLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cbiAgICBnZXN0dXJlQ2hhcmFjdGVyaXN0aWMoKSB7IHJldHVybiBcImQ1MDYwMTAzLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cbiAgICBcblxufVxuXG5leHBvcnQgY2xhc3MgTXlvQ29udHJvbGVye1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuZGV2aWNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgTXlvQ29uZmlnKCk7XG4gICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQgPSB0aGlzLm9uRGlzY29ubmVjdGVkLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kID0gbmV3IFVpbnQ4QXJyYXkoNSk7XG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzBdID0gMHgwMTsgLy8gc2V0IG1vZGVcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbMV0gPSAweDAzOyAvLyBieXRlcyBpbiBwYXlsb2FkXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzJdID0gMHgwMDsgLy8gZW1nIG1vZGU6IG5vbmVcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbM10gPSAweDAwOyAvLyBpbXUgbW9kZTogZGlzYWJsZWRcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbNF0gPSAweDAxOyAvLyBjbGFzc2lmaWVyIG1vZGU6IGVuYWJsZWRcblxuICAgICAgICB0aGlzLmRpc2FibGVHZXN0dXJlc0NvbW1hbmQgPSBVaW50OEFycmF5LmZyb20odGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQpO1xuICAgICAgICB0aGlzLmRpc2FibGVHZXN0dXJlc0NvbW1hbmRbNF0gPSAweDAwOyAvLyBjbGFzc2lmaWVyIG1vZGU6IGRpc2FibGVkXG5cbiAgICAgICAgdGhpcy5kZWVwU2xlZXBDb21tYW5kID0gbmV3IFVpbnQ4QXJyYXkoMik7XG4gICAgICAgIHRoaXMuZGVlcFNsZWVwQ29tbWFuZFswXSA9IDB4MDQ7IC8vIHNldCBtb2RlXG4gICAgICAgIHRoaXMuZGVlcFNsZWVwQ29tbWFuZFsxXSA9IDB4MDA7IC8vIGJ5dGVzIGluIHBheWxvYWRcblxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVsdFBvcHVwID0gbnVsbDtcbiAgICAgICAgdGhpc1xuICAgIH1cblxuICAgIC8qXG4gICAgUmVxdWVzdCB0aGUgZGV2aWNlIHdpdGggYmx1ZXRvb3RoXG4gICAgKi9cbiAgICByZXF1ZXN0KCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIFwiZmlsdGVyc1wiOiBbe1xuICAgICAgICAgICAgICAgIFwic2VydmljZXNcIjogW3RoaXMuY29uZmlnLmNvbnRyb2xTZXJ2aWNlKCldXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFwib3B0aW9uYWxTZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcuZ2VzdHVyZVNlcnZpY2UoKV1cbiAgICAgICAgfTsgICAgICAgIFxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihkZXZpY2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCB0aGlzLm9uRGlzY29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGV2aWNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29ubmVjdCB0byB0aGUgZGV2aWNlXG4gICAgICogKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGluaXQoKXtcbiAgICAgICAgaWYoIXRoaXMuZGV2aWNlKXtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVsdFBvcHVwKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYW5hZ2VQb3B1cEVsdCh7c3RhdGUgOiAnYWRkJ30pOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKHRoaXMuY29uZmlnLmNvbnRyb2xTZXJ2aWNlKCkpXG4gICAgICAgICAgICAudGhlbigoc2VydmljZSk9PntcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gZ2V0IE15byBDb250cm9sIFNlcnZpY2UnKTtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuY29tbWFuZENoYXJhY3RlcmlzdGljKCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKGNoYXJhY3RlcmlzdGljKT0+e1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gZ2V0IE15byBDb21tYW5kIGNoYXJhY3RlcmlzdGljJyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY2hhcmFjdGVyaXN0aWMud3JpdGVWYWx1ZSh0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWFkeSB0byBsaXN0ZW4gZ2VzdHVyZXMnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlckdlc3R1cmVzKGNhbGxiYWNrKXtcbiAgICAgICAgaWYoIXRoaXMuZGV2aWNlKXtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5kZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSh0aGlzLmNvbmZpZy5nZXN0dXJlU2VydmljZSgpKVxuICAgICAgICAgICAgLnRoZW4oc2VydmljZT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IEdldCBHZXN0dXJlIFNlcnZpY2UnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5nZXN0dXJlQ2hhcmFjdGVyaXN0aWMoKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoY2hhcmFjdGVyaXN0aWMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnR2V0IGdlc3R1cmUgY2FyYWN0ZXJpc3RpYycpXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyaXN0aWMuc3RhcnROb3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyaXN0aWMuYWRkRXZlbnRMaXN0ZW5lcignY2hhcmFjdGVyaXN0aWN2YWx1ZWNoYW5nZWQnLCAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2VzdHVyZSA9IHRoaXMuX3BhcnNlTXlvR2VzdHVyZShldi50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnR2VzdHVyZSA6ICcsIGdlc3R1cmUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZ2VzdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtzdGF0ZSA6ICdyZW1vdmUnfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe3N0YXRlIDogJ3JlbW92ZSd9KTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZSBpcyBkaXNjb25uZWN0ZWQuJyk7XG4gICAgfVxuXG4gICAgX3BhcnNlTXlvR2VzdHVyZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUuZ2V0VWludDgoMCkgPT09IDB4MDMpIHtcbiAgICAgICAgICAgIGNvbnN0IGdlc3R1cmVWYWx1ZSA9IHZhbHVlLmdldFVpbnQxNigxLCB0cnVlKVxuICAgICAgICAgICAgY29uc3QgZ2VzdHVyZSA9IHtcbiAgICAgICAgICAgICAgICAweDAwMDA6ICdyZXN0JyxcbiAgICAgICAgICAgICAgICAweDAwMDE6ICdmaXN0JyxcbiAgICAgICAgICAgICAgICAweDAwMDI6ICd3YXZlLWluJyxcbiAgICAgICAgICAgICAgICAweDAwMDM6ICd3YXZlLW91dCcsXG4gICAgICAgICAgICAgICAgMHgwMDA0OiAnZmluZ2Vycy1zcHJlYWQnLFxuICAgICAgICAgICAgICAgIDB4MDAwNTogJ2RvdWJsZS10YXAnLFxuICAgICAgICAgICAgICAgIDB4ZmZmZjogJ3Vua25vd24nLFxuICAgICAgICAgICAgfVtnZXN0dXJlVmFsdWVdXG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VQb3B1cEVsdCh7Z2VzdHVyZSA6IGdlc3R1cmV9KTtcbiAgICAgICAgICAgIHJldHVybiB7IGdlc3R1cmUgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdlc3R1cmU6IG51bGwgfVxuICAgIH1cblxuICAgIF9tYW5hZ2VQb3B1cEVsdCh7c3RhdGU9ICdub25lJywgZ2VzdHVyZSA9ICdub25lJ30pe1xuICAgICAgICBpZiAoc3RhdGUgPT09ICdyZW1vdmUnICYmIHRoaXMuZWx0UG9wdXApe1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAgPSBudWxsO1xuICAgICAgICB9ZWxzZSBpZiAoc3RhdGUgPT09ICdhZGQnKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsdFBvcHVwKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVsdFBvcHVwLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5jbGFzc0xpc3QuYWRkKCdteW8tcG9wdXAnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5lbHRQb3B1cCk7XG4gICAgICAgIH1lbHNlIGlmICh0aGlzLmVsdFBvcHVwICYmIGdlc3R1cmUgJiYgZ2VzdHVyZSAhPSAnbm9uZScpe1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5jbGFzc05hbWUgPSBgbXlvLXBvcHVwICR7Z2VzdHVyZX1gO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
