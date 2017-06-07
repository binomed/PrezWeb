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
			left: '400px',
			width: '400px'
		}, {
			line: 7,
			nbLines: 3,
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyIsInNjcmlwdHMvcHJlei5qcyIsInNjcmlwdHMvcHJlei9oaWdobGlnaHRFdmVudHMuanMiLCJzY3JpcHRzL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzIiwic2NyaXB0cy9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMiLCJzY3JpcHRzL3NlbnNvcnMvc3BlZWNoU3ludGhlc2lzQ29udHJvbGVyLmpzIiwic2NyaXB0cy9zZW5zb3JzL3ZvaWNlUmVjb2duaXRpb25Db250cm9sZXIuanMiLCJzY3JpcHRzL3dlYmJsdWV0b290aC9tYm90Q29udHJvbGVyLmpzIiwic2NyaXB0cy93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFVBQVUsTUFBaEI7QUFDQSxJQUFNLGNBQWMsUUFBcEI7QUFDQSxJQUFNLHFCQUFxQixPQUEzQjtBQUNBLElBQU0sWUFBWSxFQUFsQjs7QUFFQSxJQUFNLFdBQVcsT0FBakI7O0lBRWEsbUIsV0FBQSxtQjtBQUNaLG9DQUdHO0FBQUE7O0FBQUEsTUFGRixNQUVFLFFBRkYsTUFFRTtBQUFBLE1BREYsYUFDRSxRQURGLGFBQ0U7O0FBQUE7O0FBQ0YsT0FBSyxXQUFMLEdBQW1CLFNBQVMsY0FBVCxnQkFBcUMsTUFBckMsQ0FBbkI7QUFDQSxPQUFLLGFBQUwsR0FBcUIsYUFBckI7QUFDQSxPQUFLLFFBQUwsR0FBZ0IsT0FBTyxXQUFQLEVBQWhCOztBQUVBLFNBQU8sZ0JBQVAsV0FBZ0MsTUFBaEMsRUFBMkMsWUFBTTtBQUNoRCxPQUFJO0FBQ0gsUUFBTSxrQkFBa0IsT0FBTyxXQUFQLEVBQXhCO0FBQ0EsVUFBSyxnQkFBTCxDQUFzQixrQkFBa0IsTUFBSyxRQUF2QixHQUFrQyxNQUFLLGFBQUws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SCxhQUhELE1BR00sSUFBSSxVQUFVLEtBQWQsRUFBb0I7QUFDdEIsb0JBQUksS0FBSyxRQUFULEVBQWtCO0FBQ2QseUJBQUssUUFBTCxDQUFjLE1BQWQ7QUFDSDtBQUNELHFCQUFLLFFBQUwsR0FBZ0IsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0EscUJBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsV0FBNUI7QUFDQSx5QkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixLQUFLLFFBQS9CO0FBQ0gsYUFQSyxNQU9BLElBQUksS0FBSyxRQUFMLElBQWlCLE9BQWpCLElBQTRCLFdBQVcsTUFBM0MsRUFBa0Q7QUFDcEQscUJBQUssUUFBTCxDQUFjLFNBQWQsa0JBQXVDLE9BQXZDO0FBQ0g7QUFDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcblxuY29uc3QgTUlOX1RPUCA9ICc5NXB4JztcbmNvbnN0IExJTkVfSEVJR0hUID0gJzAuNTdlbSc7XG5jb25zdCBBRERJVElPTk5BTF9IRUlHSFQgPSAnMC40ZW0nO1xuY29uc3QgQ09MX1dJRFRIID0gMzU7XG5cbmNvbnN0IExFRlRfVEFCID0gJzEwMHB4JztcblxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodENvZGVIZWxwZXIge1xuXHRjb25zdHJ1Y3Rvcih7XG5cdFx0a2V5RWx0LFxuXHRcdHBvc2l0aW9uQXJyYXlcblx0fSkge1xuXHRcdHRoaXMuZWx0SGlnbGlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaGlnaGxpZ2h0LSR7a2V5RWx0fWApO1xuXHRcdHRoaXMucG9zaXRpb25BcnJheSA9IHBvc2l0aW9uQXJyYXk7XG5cdFx0dGhpcy5wcm9ncmVzcyA9IFJldmVhbC5nZXRQcm9ncmVzcygpO1xuXG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoYGNvZGUtJHtrZXlFbHR9YCwgICgpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IGN1cnJlbnRQcm9ncmVzcyA9IFJldmVhbC5nZXRQcm9ncmVzcygpO1xuXHRcdFx0XHR0aGlzLl9hcHBseVByb3BlcnRpZXMoY3VycmVudFByb2dyZXNzID4gdGhpcy5wcm9ncmVzcyA/IHRoaXMucG9zaXRpb25BcnJheVswXSA6IHRoaXMucG9zaXRpb25BcnJheVt0aGlzLnBvc2l0aW9uQXJyYXkubGVuZ3RoIC0gMV0pO1xuXHRcdFx0XHR0aGlzLl9saXN0ZW5GcmFnbWVudHMoKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcihgc3RvcC1jb2RlLSR7a2V5RWx0fWAsICgpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoaXMucHJvZ3Jlc3MgPSBSZXZlYWwuZ2V0UHJvZ3Jlc3MoKTtcblx0XHRcdFx0dGhpcy5fdW5yZWdpc3RlckZyYWdtZW50cygpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHRfYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXHRcdFx0Y29uc3QgYXJlYSA9IHt9O1xuXHRcdFx0Y29uc3QgcG9zaXRpb24gPSB7fTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0XHRzd2l0Y2ggKHRydWUpIHtcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ2xpbmUnOlxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnbmJMaW5lcyc6XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICdjb2wnOlxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnbmJDb2xzJzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ3RvcE1hcmdpbic6XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICdsZWZ0TWFyZ2luJzpcblx0XHRcdFx0XHRcdHBvc2l0aW9uW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ2hlaWdodCc6XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICd3aWR0aCc6XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICd0b3AnOlxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnbGVmdCc6XG5cdFx0XHRcdFx0XHRhcmVhW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKHBvc2l0aW9uLnRvcE1hcmdpbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHBvc2l0aW9uLnRvcE1hcmdpbiA9IE1JTl9UT1A7XG5cdFx0XHR9XG5cdFx0XHRpZiAocG9zaXRpb24ubmJMaW5lcyA9PT0gdW5kZWZpbmVkICYmIGFyZWEuaGVpZ2h0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YXJlYS5oZWlnaHQgPSBMSU5FX0hFSUdIVDtcblx0XHRcdH1cblx0XHRcdGlmIChwb3NpdGlvbi5saW5lID09PSB1bmRlZmluZWQgJiYgYXJlYS50b3AgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhcmVhLnRvcCA9IDA7XG5cdFx0XHR9XG5cdFx0XHRpZiAocG9zaXRpb24ubmJDb2xzID09PSB1bmRlZmluZWQgJiYgYXJlYS53aWR0aCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGFyZWEud2lkdGggPSAwO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc2l0aW9uLmNvbCA9PT0gdW5kZWZpbmVkICYmIGFyZWEubGVmdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGFyZWEubGVmdCA9IDA7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LmFyZWEgPSBhcmVhO1xuXHRcdFx0dGhpcy5lbHRIaWdsaWdodC5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXHRcdH0gY2F0Y2ggKGUpIHt9XG5cdH1cblxuXHRfcHJvZ3Jlc3NGcmFnbWVudChldmVudCkge1xuXHRcdHRyeSB7XG5cdFx0XHRsZXQgcHJvcGVydGllcyA9IG51bGxcblx0XHRcdGlmIChldmVudC50eXBlID09PSAnZnJhZ21lbnRzaG93bicpIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSArZXZlbnQuZnJhZ21lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWZyYWdtZW50LWluZGV4Jyk7XG5cdFx0XHRcdHByb3BlcnRpZXMgPSB0aGlzLnBvc2l0aW9uQXJyYXlbaW5kZXggKyAxXTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSArZXZlbnQuZnJhZ21lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWZyYWdtZW50LWluZGV4Jyk7XG5cdFx0XHRcdHByb3BlcnRpZXMgPSB0aGlzLnBvc2l0aW9uQXJyYXlbaW5kZXhdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFwcm9wZXJ0aWVzKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xuXG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlKVxuXHRcdH1cblx0fVxuXG5cdF9saXN0ZW5GcmFnbWVudHMoKSB7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZyYWdtZW50c2hvd24nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdmcmFnbWVudGhpZGRlbicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRfdW5yZWdpc3RlckZyYWdtZW50cygpIHtcblx0XHRSZXZlYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRzaG93bicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XG5cdFx0UmV2ZWFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZyYWdtZW50aGlkZGVuJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cbn0iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7UmV2ZWFsRW5naW5lRXZlbnRzfSBmcm9tICcuL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzJztcblxuXG4oZnVuY3Rpb24gKCkge1xuXG5cbiAgICBmdW5jdGlvbiBwYWdlTG9hZCgpIHtcbiAgICAgICAgbmV3IFJldmVhbEVuZ2luZUV2ZW50cygpO1xuICAgIH1cblxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBwYWdlTG9hZCk7XG59KSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge1xuXHRIaWdobGlnaHRDb2RlSGVscGVyXG59IGZyb20gXCIuLi9oZWxwZXJzL2hpZ2hsaWdodENvZGVIZWxwZXIuanNcIjtcblxuY29uc3QgTElORV9IRUlHSFQgPSAxLjE1O1xuY29uc3QgQURESVRJT05OQUxfSEVJR1QgPSAwLjQ7XG5jb25zdCBDT0xfV0lEVEggPSAzNTtcbmNvbnN0IExFRlRfRklSU1QgPSBcIjYwcHhcIjtcblxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodEV2ZW50cyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdC8vICBCbHVldG9vdGg6IFNjYW4gKyBDb25uZWN0XG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiAnY29ubmVjdC1ibGUnLFxuXHRcdFx0Ly8gV2Ugc3RhcnQgd2l0aCB0aGUgZmlyc3QgZnJhZ21lbnQgKHRoZSBpbml0aWFsIHBvc2l0aW9uIGlzIGZpeGVkIGJ5IGNzcylcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFt7XG5cdFx0XHRcdFx0d2lkdGg6ICc2MDBweCcsXG5cdFx0XHRcdFx0bGluZTogNSxcblx0XHRcdFx0XHRsZWZ0OiBMRUZUX0ZJUlNUXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiAyLFxuXHRcdFx0XHRcdHdpZHRoOiAnOTAwcHgnLFxuXHRcdFx0XHRcdGxlZnQ6IExFRlRfRklSU1Rcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDcsXG5cdFx0XHRcdFx0d2lkdGg6ICc2MDBweCcsXG5cdFx0XHRcdFx0bGVmdDogTEVGVF9GSVJTVFxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHQvLyAgQmxlIENvZGUgUmVhZCBDaGFyYWN0ZXJpc3RpY1xuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdDogJ3JlYWQtY2hhcmFjdCcsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0d2lkdGg6ICc3MDBweCcsXG5cdFx0XHRcdGxpbmU6IDJcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogNCxcblx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGxpbmU6IDYsXG5cdFx0XHRcdGxlZnQ6ICc0MDBweCcsXG5cdFx0XHRcdHdpZHRoOiAnNDAwcHgnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGxpbmU6IDcsXG5cdFx0XHRcdG5iTGluZXM6IDMsXG5cdFx0XHRcdHdpZHRoOiAnOTAlJ1xuXHRcdFx0fV1cblx0XHR9KVxuXG5cdFx0Ly8gIEJsZSBDb2RlIFdyaXRlIENoYXJhY3RlcmlzdGljXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiAnd3JpdGUtY2hhcmFjdCcsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0d2lkdGg6ICc3MDBweCcsXG5cdFx0XHRcdGxpbmU6IDJcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogNCxcblx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGxpbmU6IDksXG5cdFx0XHRcdHdpZHRoOiAnOTAlJ1xuXHRcdFx0fV1cblx0XHR9KVxuXG5cdFx0Ly8gIEJsZSBDb2RlIFJlYWQgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICdub3RpZi1jaGFyYWN0Jyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHR3aWR0aDogJzcwMHB4Jyxcblx0XHRcdFx0bGluZTogMlxuXHRcdFx0fSwge1xuXHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogNixcblx0XHRcdFx0d2lkdGg6ICc5MCUnLFxuXHRcdFx0XHRuYkxpbmVzOiAzXG5cdFx0XHR9XVxuXHRcdH0pXG5cblxuXHRcdC8vIENvZGUgV2ViIFNwZWVjaFxuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdDogJ3dlYi1zcGVlY2gnLFxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0XHR3aWR0aDogJzYwMHB4Jyxcblx0XHRcdFx0XHRsaW5lOiAxXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiAyLFxuXHRcdFx0XHRcdHdpZHRoOiAnNDUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiAzLFxuXHRcdFx0XHRcdHdpZHRoOiAnNTUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHRcdHdpZHRoOiAnNTUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA2LFxuXHRcdFx0XHRcdHdpZHRoOiAnMzUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA3LFxuXHRcdFx0XHRcdHdpZHRoOiAnMzUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA4LFxuXHRcdFx0XHRcdGxlZnQ6ICcyODBweCcsXG5cdFx0XHRcdFx0d2lkdGg6ICc1MDBweCdcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0Ly8gQ29kZSBXZWIgU3BlZWNoIEdyYW1tYXJcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICd3ZWItc3BlZWNoLWdyYW1tYXInLFxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0XHR3aWR0aDogJzEyMDBweCcsXG5cdFx0XHRcdFx0bGluZTogMVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogMyxcblx0XHRcdFx0XHR3aWR0aDogJzc1MHB4J1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNCxcblx0XHRcdFx0XHR3aWR0aDogJzcwMHB4J1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNSxcblx0XHRcdFx0XHR3aWR0aDogJzY1MHB4J1xuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHQvLyBDb2RlIFdlYiBTcGVlY2ggU3ludGhlc2lzXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiAnd2ViLXNwZWVjaC1zeW50aGVzaXMnLFxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0XHR3aWR0aDogJzkwMHB4Jyxcblx0XHRcdFx0XHRsaW5lOiAxXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiAyLFxuXHRcdFx0XHRcdHdpZHRoOiAnNDAwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiAzLFxuXHRcdFx0XHRcdHdpZHRoOiAnNDAwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHRcdHdpZHRoOiAnNDUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA1LFxuXHRcdFx0XHRcdHdpZHRoOiAnNjAwcHgnXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9KTtcblxuXHRcdC8vIENvZGUgaW1hZ2UgY2FwdHVyZSB6b29tXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiAnaW1hZ2UtY2FwdHVyZS16b29tJyxcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFt7XG5cdFx0XHRcdFx0d2lkdGg6ICc5MCUnLFxuXHRcdFx0XHRcdGxpbmU6IDFcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDMsXG5cdFx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHRcdHdpZHRoOiAnOTAlJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNixcblx0XHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDcsXG5cdFx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9KTtcblxuXHRcdC8vIENvZGUgaW1hZ2UgY2FwdHVyZVxuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdDogXCJpbWFnZS1jYXB0dXJlXCIsXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHRcdHdpZHRoOiBcIjkwJVwiLFxuXHRcdFx0XHRcdGxpbmU6IDUsXG5cdFx0XHRcdFx0bGVmdDogTEVGVF9GSVJTVFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNyxcblx0XHRcdFx0XHRsZWZ0OiBMRUZUX0ZJUlNULFxuXHRcdFx0XHRcdHdpZHRoOiBcIjkwJVwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9KTtcblxuXHR9XG59IiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQge0hpZ2hsaWdodEV2ZW50c30gZnJvbSAnLi9oaWdobGlnaHRFdmVudHMuanMnO1xuaW1wb3J0IHtCbGVQcmV6Q29udHJvbGVyfSBmcm9tICcuLi9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMnO1xuaW1wb3J0IHtWb2ljZVJlY29nbml0aW9uQ29udHJvbGVyfSBmcm9tICcuLi9zZW5zb3JzL3ZvaWNlUmVjb2duaXRpb25Db250cm9sZXIuanMnO1xuaW1wb3J0IHtTcGVlY2hTeW50aGVzaXNDb250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvc3BlZWNoU3ludGhlc2lzQ29udHJvbGVyLmpzJztcblxuXG5leHBvcnQgY2xhc3MgUmV2ZWFsRW5naW5lRXZlbnRze1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcblx0XHRsZXQgaW5JRnJhbWUgPSB3aW5kb3cudG9wICE9IHdpbmRvdy5zZWxmO1xuXHRcdFxuXHRcdC8vIE1hbmFnZW1lbnQgb2YgYWN0aW9ucyBpbiBwcmV6IG1vZGUgKG5vdCBpbiBwcmV2aWV3IG1vZGUpXG5cdFx0aWYgKCFpbklGcmFtZSl7XG5cdFx0XHRcdC8vIEluaXQgYWxsIGJsZSBhY3Rpb25zXG5cdFx0XHRcdHRoaXMuX2JsZVByZXpDb250cm9sZXIgPSBuZXcgQmxlUHJlekNvbnRyb2xlcigpO1xuXHRcdFx0XHR0aGlzLl9ibGVFdmVudHMoKTtcblxuXHRcdFx0XHQvLyBJbml0IFZvaWNlIGFuZCBTcGVlY2ggY29udHJvbGVyc1xuXHRcdFx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24gPSBuZXcgVm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlcigpO1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcyA9IG5ldyBTcGVlY2hTeW50aGVzaXNDb250cm9sZXIoKTtcblx0XHRcdFx0dGhpcy5fdm9pY2VFdmVudHMoKTtcblx0XHR9XG5cblx0XHQvLyBJbiBhbCBjYXNlIHdlIGluaXQgdGhlIGhpZ2hsaWdodCBvZiBjb2RlLlxuXHRcdHRoaXMuX2luaXRIaWdobGlnaHRDb2RlKCk7XG5cblx0fVxuXG5cdF9ibGVFdmVudHMoKXtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignc3RvcC1jb2RlLXJlYWQtY2hhcmFjdCcsIGV2ZW50ID0+IHtcblx0XHRcdGlmICh0aGlzLl9ibGVQcmV6Q29udHJvbGVyLl9jdXJyZW50QmxlRGV2aWNlKSB7XG5cdFx0XHRcdHRoaXMuX2JsZVByZXpDb250cm9sZXIuX2N1cnJlbnRCbGVEZXZpY2UuZ2F0dC5kaXNjb25uZWN0KCk7XG5cdFx0XHR9XG5cdFx0fSlcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZGlzY29ubmVjdC1oZWFydC1yYXRlLXNlbnNvcicsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyeSB0byBkaXNjb25uZWN0IGhlYXJ0IHJhdGUgc2Vuc29yXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnJhbWVzWzBdLmhlYXJ0UmF0ZVNlbnNvci5kZXZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVzWzBdLmhlYXJ0UmF0ZVNlbnNvci5kZXZpY2UuZ2F0dC5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0fSlcblx0fVxuXG5cdF92b2ljZUV2ZW50cygpe1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29nbGUtYXNzaXN0YW50JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfPT57XG5cdFx0XHR0aGlzLl92b2ljZUNhbGxCYWNrKCk7XG5cdFx0fSk7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZC1yZWNvZ25pdGlvbicsIF89Pntcblx0XHRcdHRyeXtcblx0XHRcdFx0dGhpcy52b2ljZVJlY29nbml0aW9uLnN0b3AoKTtcblx0XHRcdH1jYXRjaChlKXt9XG5cdFx0fSlcblx0fVxuXG5cdF92b2ljZUNhbGxCYWNrKCl7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW9TcGVlY2gnKS5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cdFx0dGhpcy52b2ljZVJlY29nbml0aW9uLnN0YXJ0KChmaW5hbFN0cik9Pntcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGVlY2hfaW5wdXQnKS5pbm5lckhUTUwgPSBmaW5hbFN0cjtcblx0XHRcdGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCfDp2EgdmEnKSl7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vU3BlZWNoJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xuXHRcdFx0XHRcdHZhbHVlOidqZSB2YWlzIHRyw6hzIGJpZW4gbWVyY2kuIENvbW1lbnQgc2UgcGFzc2UgdGEgY29uZsOpcmVuY2UgPyBGcmFuw6dvaXMgZXN0LWlsIGdlbnRpbCBhdmVjIHRvaSA/J1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihfPT50aGlzLl92b2ljZUNhbGxCYWNrLmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaCgoZXJyb3IpPT57XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fWVsc2UgaWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2FuZ2xhaXMnKSl7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcblx0XHRcdFx0XHR2YWx1ZTogJ2hlbGxvIGV2ZXJ5IG9uZSwgd2VsY29tZSB0byB0aGUgYmVzdCB0YWxrIG9mIHRoaXMgZXZlbnQgIScsIFxuXHRcdFx0XHRcdGxhbmdGciA6IGZhbHNlfVxuXHRcdFx0XHQpXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygndm9peCcpKXtcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xuXHRcdFx0XHRcdHZhbHVlOiAnY29tbWUgw6dhIGNcXCdlc3QgYXNzZXogYml6YXJyZSBwb3VyIHRvaSA/Jyxcblx0XHRcdFx0XHRwaXRjaCA6IDIsXG5cdFx0XHRcdFx0cmF0ZSA6IDAuM31cblx0XHRcdFx0KVxuXHRcdFx0XHQudGhlbihfPT50aGlzLl92b2ljZUNhbGxCYWNrLmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaCgoZXJyb3IpPT57XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fWVsc2UgaWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3NvbW1lcy1ub3VzJykpe1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6ICdWb3lvbnMgRnJhbsOnb2lzLCBub3VzIHNvbW1lcyBkYW5zIHRhIHNlc3Npb24sIGplIHRyb3V2ZSBxdWUgdHUgblxcJ2FzIHBhcyBsXFwnYWlyIHRyw6hzIHLDqXZlaWxsw6knXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc3VpdmFudCcpKXtcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xuXHRcdFx0XHRcdHZhbHVlOiAnVHLDqHMgYmllbiBwYXNzb25zIGF1IHNsaWRlIHN1aXZhbnQnXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKF89PlJldmVhbC5uZXh0KCkpXG5cdFx0XHRcdC5jYXRjaCgoZXJyb3IpPT57XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGxldCB1bmtub3dBcnJheSA9IFtcblx0XHRcdFx0XHQnQXJ0aWN1bGUgc1xcJ2lsIHRlIHBsYWl0Jyxcblx0XHRcdFx0XHQnS2Ftb3Vsb3ggIScsXG5cdFx0XHRcdFx0J1R1IHBvdXJyYWlzIGZhaXJlIHVuIGVmZm9ydCBxdWFuZCBtw6ptZScsXG5cdFx0XHRcdFx0J1JldGlyZSB0b24gY2hld2luZyBndW0gYXZhbnQgZGUgcGFybGVyJ1xuXHRcdFx0XHRdO1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0dmFsdWU6IHVua25vd0FycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHVua25vd0FycmF5Lmxlbmd0aCldXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9Pntcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0XG5cblx0X2luaXRIaWdobGlnaHRDb2RlKCkge1xuXG5cdFx0bmV3IEhpZ2hsaWdodEV2ZW50cygpO1xuXHR9XG59XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7XG5cdE15b0NvbnRyb2xlclxufSBmcm9tICcuLi93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzJztcbmltcG9ydCB7XG5cdE1Cb3Rcbn0gZnJvbSAnLi4vd2ViYmx1ZXRvb3RoL21ib3RDb250cm9sZXIuanMnO1xuXG5leHBvcnQgY2xhc3MgQmxlUHJlekNvbnRyb2xlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0dGhpcy5fY3VycmVudEJsZURldmljZSA9IG51bGw7XG5cdFx0dGhpcy5fYmFzaWNCbGVCaW5kaW5nKCk7XG5cdFx0Ly90aGlzLl9teW9CaW5kaW5nKCk7XG5cdFx0Ly8gSnVzdCBjb21tZW50IG1ib3QgcGFydCBiZWNhdXNlIGl0IGNhbiBhbHdheXMgYmUgdXNlZnVsbCAhXG5cdFx0Ly90aGlzLl9tYm90QmluZGluZygpO1xuXHR9XG5cblx0X2Jhc2ljQmxlQmluZGluZygpIHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdEJsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuXG5cdFx0XHRjb25zdCBmaWx0ZXJzID0ge1xuXHRcdFx0XHRmaWx0ZXJzOiBbe1xuXHRcdFx0XHRcdHNlcnZpY2VzOiBbJ2JhdHRlcnlfc2VydmljZSddXG5cdFx0XHRcdH1dXG5cdFx0XHR9O1xuXHRcdFx0bmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKGZpbHRlcnMpXG5cdFx0XHRcdC50aGVuKGRldmljZSA9PiBkZXZpY2UuZ2F0dC5jb25uZWN0KCkpXG5cdFx0XHRcdC50aGVuKHNlcnZlciA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ0JsdWV0b290aCBkZXZpY2UgaXMgY29ubmVjdGVkLicpO1xuXHRcdFx0XHRcdHRoaXMuX2N1cnJlbnRCbGVEZXZpY2UgPSBzZXJ2ZXIuZGV2aWNlO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVhZENoYXJhY3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcblxuXHRcdFx0dGhpcy5fY3VycmVudEJsZURldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKCdiYXR0ZXJ5X3NlcnZpY2UnKVxuXHRcdFx0XHQudGhlbihzZXJ2aWNlID0+IHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWMoJ2JhdHRlcnlfbGV2ZWwnKSlcblx0XHRcdFx0LnRoZW4oY2hhcmFjdGVyaXN0aWMgPT4gY2hhcmFjdGVyaXN0aWMucmVhZFZhbHVlKCkpXG5cdFx0XHRcdC50aGVuKHZhbHVlID0+IHtcblx0XHRcdFx0XHRjb25zdCBiYXR0ZXJ5TGV2ZWwgPSB2YWx1ZS5nZXRVaW50OCgwKTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhgQmF0dGVyeSBwZXJjZW50YWdlIGlzICR7YmF0dGVyeUxldmVsfSUuYCk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0X215b0JpbmRpbmcoKSB7XG5cdFx0bGV0IGxhc3REb3VibGVUYXAgPSAwO1xuXHRcdGxldCBteW8gPSBuZXcgTXlvQ29udHJvbGVyKCk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RNeW8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuXHRcdFx0aWYgKCFteW8uY29ubmVjdGVkKSB7XG5cdFx0XHRcdG15by5yZXF1ZXN0KClcblx0XHRcdFx0XHQudGhlbihfID0+IG15by5jb25uZWN0KCkpXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4gbXlvLmluaXQoKSlcblx0XHRcdFx0XHQudGhlbigoKSA9PiBteW8ucmVnaXN0ZXJHZXN0dXJlcygoZ2VzdHVyZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGdlc3R1cmUgJiYgZ2VzdHVyZS5nZXN0dXJlID09PSAnZG91YmxlLXRhcCcpIHtcblx0XHRcdFx0XHRcdFx0aWYgKERhdGUubm93KCkgLSBsYXN0RG91YmxlVGFwIDwgMjAwMCkge1xuXHRcdFx0XHRcdFx0XHRcdFJldmVhbC5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0bGFzdERvdWJsZVRhcCA9IERhdGUubm93KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Rpc2Nvbm5lY3QtbXlvJywgXyA9PiB7XG5cdFx0XHRteW8uZGlzY29ubmVjdCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0X21ib3RCaW5kaW5nKCkge1xuXHRcdC8vIENoZWNrIHRoZSBjb25uZWN0aW9uXG5cdFx0bGV0IHN0ZXBDb25uZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RNQm90Jyk7XG5cdFx0bGV0IHN0ZXBDb250cm9sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcnQtYnV0dG9uLW1ib3QnKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbm5lY3RNQm90XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXyA9PiB7XG5cdFx0XHQvLyBSZXF1ZXN0IHRoZSBkZXZpY2Vcblx0XHRcdGxldCBtQm90ID0gbmV3IE1Cb3QoKTtcblx0XHRcdG1Cb3QucmVxdWVzdCgpXG5cdFx0XHRcdC50aGVuKF8gPT4ge1xuXHRcdFx0XHRcdC8vIENvbm5lY3QgdG8gdGhlIG1ib3Rcblx0XHRcdFx0XHRyZXR1cm4gbUJvdC5jb25uZWN0KCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKF8gPT4ge1xuXHRcdFx0XHRcdC8vIENvbm5lY3Rpb24gaXMgZG9uZSwgd2Ugc2hvdyB0aGUgY29udHJvbHNcblx0XHRcdFx0XHRzdGVwQ29ubmVjdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRcdFx0c3RlcENvbnRyb2wuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuXG5cdFx0XHRcdFx0bGV0IHBhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFydC1idXR0b24nKTtcblxuXHRcdFx0XHRcdC8vIENvbnRyb2wgdGhlIHJvYm90IGJ5IGJ1dHRvbnNcblx0XHRcdFx0XHRsZXQgYnRuVXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0blVwJyk7XG5cdFx0XHRcdFx0bGV0IGJ0bkRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0bkRvd24nKTtcblx0XHRcdFx0XHRsZXQgYnRuTGVmdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuTGVmdCcpO1xuXHRcdFx0XHRcdGxldCBidG5SaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuUmlnaHQnKTtcblxuXHRcdFx0XHRcdGJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4ge1xuXHRcdFx0XHRcdFx0bUJvdC5wcm9jZXNzTW90b3IoLTI1MCwgMjUwKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJ0bkRvd24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7XG5cdFx0XHRcdFx0XHRtQm90LnByb2Nlc3NNb3RvcigyNTAsIC0yNTApXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHtcblx0XHRcdFx0XHRcdG1Cb3QucHJvY2Vzc01vdG9yKDI1MCwgMjUwKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4ge1xuXHRcdFx0XHRcdFx0bUJvdC5wcm9jZXNzTW90b3IoLTI1MCwgLTI1MClcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHtcblx0XHRcdFx0XHRcdG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnRuRG93bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7XG5cdFx0XHRcdFx0XHRtQm90LnByb2Nlc3NNb3RvcigwLCAwKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJ0bkxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4ge1xuXHRcdFx0XHRcdFx0bUJvdC5wcm9jZXNzTW90b3IoMCwgMClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7XG5cdFx0XHRcdFx0XHRtQm90LnByb2Nlc3NNb3RvcigwLCAwKVxuXHRcdFx0XHRcdH0pO1xuXG5cblx0XHRcdFx0fSlcblx0XHR9KTtcblx0fVxuXG59IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBjbGFzcyBTcGVlY2hTeW50aGVzaXNDb250cm9sZXJ7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5zeW50aCA9IHdpbmRvdy5zcGVlY2hTeW50aGVzaXM7XG5cbiAgICAgICAgdGhpcy52b2ljZUZSID0gbnVsbDtcbiAgICAgICAgdGhpcy52b2ljZUVOID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29uZmlndXJlKCk7XG4gICAgfVxuXG4gICAgX2NvbmZpZ3VyZSgpe1xuICAgICAgICB0aGlzLl9wb3B1bGF0ZVZvaWNlTGlzdCgpO1xuICAgICAgICBpZiAoc3BlZWNoU3ludGhlc2lzLm9udm9pY2VzY2hhbmdlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzcGVlY2hTeW50aGVzaXMub252b2ljZXNjaGFuZ2VkID0gdGhpcy5fcG9wdWxhdGVWb2ljZUxpc3QuYmluZCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9wb3B1bGF0ZVZvaWNlTGlzdCgpIHtcbiAgICAgICAgbGV0IHZvaWNlcyA9IHRoaXMuc3ludGguZ2V0Vm9pY2VzKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdm9pY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodm9pY2VzW2ldLmxhbmcgPT09ICdmci1GUicpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiJXMsICVPIFwiLCB2b2ljZXNbaV0ubGFuZywgdm9pY2VzW2ldKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZvaWNlRlIgPSB2b2ljZXNbaV07XG4gICAgICAgICAgICB9ZWxzZSBpZiAodm9pY2VzW2ldLmxhbmcgPT09ICdlbi1HQicpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiJXMsICVPIFwiLCB2b2ljZXNbaV0ubGFuZywgdm9pY2VzW2ldKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZvaWNlRU4gPSB2b2ljZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzcGVhayh7dmFsdWUsIGxhbmdGciA9IHRydWUsIHBpdGNoID0gMSwgcmF0ZSA9IDF9KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PntcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnZvaWNlRlIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB1dHRlclRoaXMgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKHZhbHVlKTtcbiAgICAgICAgICAgIHV0dGVyVGhpcy52b2ljZSA9IGxhbmdGciA/IHRoaXMudm9pY2VGUiA6IHRoaXMudm9pY2VFTjtcbiAgICAgICAgICAgIHV0dGVyVGhpcy5waXRjaCA9IHBpdGNoO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnJhdGUgPSByYXRlO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLm9uZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zeW50aC5zcGVhayh1dHRlclRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNsYXNzIFZvaWNlUmVjb2duaXRpb25Db250cm9sZXJ7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgbGV0IFNwZWVjaFJlY29nbml0aW9uID0gU3BlZWNoUmVjb2duaXRpb24gfHwgd2Via2l0U3BlZWNoUmVjb2duaXRpb25cbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24gPSBuZXcgU3BlZWNoUmVjb2duaXRpb24oKTtcbiAgICAgICAgdGhpcy5fY29uZmlndXJlKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoY2FsbGJhY2spe1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9ucmVzdWx0ID0gKGV2ZW50KT0+e1xuICAgICAgICAgICAgY29uc3QgZmluYWxTdHIgPSBldmVudC5yZXN1bHRzWzBdWzBdLnRyYW5zY3JpcHQ7XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdDb25maWRlbmNlOiAnICsgZmluYWxTdHIpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhmaW5hbFN0cik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdGFydCgpO1xuICAgIH1cblxuICAgIHN0b3AoKXtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdG9wKCk7XG4gICAgfVxuXG4gICAgX2NvbmZpZ3VyZSgpe1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLmxhbmcgPSAnZnItRlInO1xuXG4gICAgICAgIC8vIFdlIGRldGVjdCBlbmRcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbmVuZCA9IF89PntcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ0VuZCBvZiByZWNvZ25pdGlvbicpO1xuICAgICAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdG9wKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFdlIGRldGVjdCBlcnJvcnNcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbmVycm9yID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT0gJ25vLXNwZWVjaCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdObyBTcGVlY2gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmVudC5lcnJvciA9PSAnYXVkaW8tY2FwdHVyZScpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdObyBtaWNyb3Bob25lJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmVudC5lcnJvciA9PSAnbm90LWFsbG93ZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnTm90IEFsbG93ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTsgICAgIFxuICAgIH1cblxuXG59IiwiJ3VzZSBzdHJpY3QnXG4vKipcbiAqIENvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYmlub21lZC9tYm90LXdlYmJsdWV0b290aFxuICogXG4gKi9cblxuXG5jb25zdCBERVZJQ0VfTkFNRSA9IFwiTWFrZWJsb2NrX0xFXCIsXG4gICAgU0VSVklDRV9VVUlEID0gXCIwMDAwZmZlMS0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIixcbiAgICBDSEFSQUNURVJJU1RJQ19VVUlEID0gXCIwMDAwZmZlMy0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIjtcblxuLyoqXG4gKiBHZW5lcmFsIGNvbmZpZ3VyYXRpb24gKFVVSUQpXG4qL1xuY2xhc3MgQ29uZmlnIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG5hbWUoKSB7IHJldHVybiBcIk1ha2VibG9ja19MRVwiOyB9XG4gICAgc2VydmljZSgpIHsgcmV0dXJuIFwiMDAwMGZmZTEtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIgfVxuICAgIGNoYXJhdGVyaXN0aWMoKSB7IHJldHVybiBcIjAwMDBmZmUzLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiIH1cbn1cblxuLy8gQ29uc3QgZm9yIGluc3RydWN0aW9ucyB0eXBlc1xuY29uc3QgVFlQRV9NT1RPUiA9IDB4MGEsXG4gICAgVFlQRV9SR0IgPSAweDA4LFxuICAgIFRZUEVfU09VTkQgPSAweDA3O1xuXG5cbi8vIENvbnN0IGZvciB0aGUgcG9ydHNcbmNvbnN0IFBPUlRfMSA9IDB4MDEsXG4gICAgUE9SVF8yID0gMHgwMixcbiAgICBQT1JUXzMgPSAweDAzLFxuICAgIFBPUlRfNCA9IDB4MDQsXG4gICAgUE9SVF81ID0gMHgwNSxcbiAgICBQT1JUXzYgPSAweDA2LFxuICAgIFBPUlRfNyA9IDB4MDcsXG4gICAgUE9SVF84ID0gMHgwOCxcbiAgICBNXzEgPSAweDA5LFxuICAgIE1fMiA9IDB4MGE7XG4gICAgXG5cbi8qKlxuICogQ2xhc3MgZm9yIHRoZSByb2JvdFxuICogKi9cbmV4cG9ydCBjbGFzcyBNQm90IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgdGhpcy5vbkRpc2Nvbm5lY3RlZCA9IHRoaXMub25EaXNjb25uZWN0ZWQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5idXp6ZXJJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgLypcbiAgICBSZXF1ZXN0IHRoZSBkZXZpY2Ugd2l0aCBibHVldG9vdGhcbiAgICAqL1xuICAgIHJlcXVlc3QoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgXCJmaWx0ZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMuY29uZmlnLm5hbWUoKVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBcIm9wdGlvbmFsU2VydmljZXNcIjogW3RoaXMuY29uZmlnLnNlcnZpY2UoKV1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZShvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4oZGV2aWNlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZS5hZGRFdmVudExpc3RlbmVyKCdnYXR0c2VydmVyZGlzY29ubmVjdGVkJywgdGhpcy5vbkRpc2Nvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRldmljZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbm5lY3QgdG8gdGhlIGRldmljZVxuICAgICAqICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnRyb2wgdGhlIG1vdG9ycyBvZiByb2JvdFxuICAgICovXG4gICAgcHJvY2Vzc01vdG9yKHZhbHVlTTEsIHZhbHVlTTIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlQ2hhcmFjdGVyaXN0aWModGhpcy5fZ2VuZXJpY0NvbnRyb2woVFlQRV9NT1RPUiwgTV8xLCAwLCB2YWx1ZU0xKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX01PVE9SLCBNXzIsIDAsIHZhbHVlTTIpKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHJvY2Vzc0J1enplcigpIHtcbiAgICAgICAgdGhpcy5idXp6ZXJJbmRleCA9ICh0aGlzLmJ1enplckluZGV4ICsgMSkgJSA4O1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX1NPVU5ELCBQT1JUXzIsIDIyLCB0aGlzLmJ1enplckluZGV4KSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcHJvY2Vzc0NvbG9yKHJlZCxibHVlLGdyZWVuKXtcbiAgICAgICAgbGV0IHJIZXggPSByZWQ8PDg7XG5cdFx0bGV0IGdIZXggPSBncmVlbjw8MTY7XG5cdFx0bGV0IGJIZXggPSBibHVlPDwyNDtcblx0XHRsZXQgdmFsdWUgPSBySGV4IHwgZ0hleCB8IGJIZXg7XG5cdFx0dGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX1JHQixQT1JUXzYsMCx2YWx1ZSkpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZXZpY2UgaXMgZGlzY29ubmVjdGVkLicpO1xuICAgIH1cblxuXG4gICAgX2dlbmVyaWNDb250cm9sKHR5cGUsIHBvcnQsIHNsb3QsIHZhbHVlKSB7XG4gICAgICAgIC8qXG4gICAgICAgIGZmIDU1IGxlbiBpZHggYWN0aW9uIGRldmljZSBwb3J0ICBzbG90ICBkYXRhIGFcbiAgICAgICAgMCAgMSAgMiAgIDMgICA0ICAgICAgNSAgICAgIDYgICAgIDcgICAgIDhcbiAgICAgICAgKi9cbiAgICAgICAgLy8gU3RhdGljIHZhbHVlc1xuICAgICAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDE2KTtcbiAgICAgICAgdmFyIGJ1ZlZpZXcgPSBuZXcgVWludDE2QXJyYXkoYnVmKTtcblxuICAgICAgICB2YXIgYnl0ZTAgPSAweGZmLCAvLyBTdGF0aWMgaGVhZGVyXG4gICAgICAgICAgICBieXRlMSA9IDB4NTUsIC8vIFN0YXRpYyBoZWFkZXJcbiAgICAgICAgICAgIGJ5dGUyID0gMHgwOSwgLy8gbGVuXG4gICAgICAgICAgICBieXRlMyA9IDB4MDAsIC8vIGlkeFxuICAgICAgICAgICAgYnl0ZTQgPSAweDAyLCAvLyBhY3Rpb25cbiAgICAgICAgICAgIGJ5dGU1ID0gdHlwZSwgLy8gZGV2aWNlXG4gICAgICAgICAgICBieXRlNiA9IHBvcnQsIC8vIHBvcnRcbiAgICAgICAgICAgIGJ5dGU3ID0gc2xvdDsgLy8gc2xvdFxuICAgICAgICAvL2R5bmFtaWNzIHZhbHVlc1xuICAgICAgICB2YXIgYnl0ZTggPSAweDAwLCAvLyBkYXRhXG4gICAgICAgICAgICBieXRlOSA9IDB4MDAsIC8vIGRhdGFcbiAgICAgICAgICAgIGJ5dGUxMCA9IDB4MDAsIC8vIGRhdGFcbiAgICAgICAgICAgIGJ5dGUxMSA9IDB4MDA7IC8vIGRhdGFcbiAgICAgICAgLy9FbmQgb2YgbWVzc2FnZVxuICAgICAgICB2YXIgYnl0ZTEyID0gMHgwYSxcbiAgICAgICAgICAgIGJ5dGUxMyA9IDB4MDAsXG4gICAgICAgICAgICBieXRlMTQgPSAweDAwLFxuICAgICAgICAgICAgYnl0ZTE1ID0gMHgwMDtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVFlQRV9NT1RPUjpcbiAgICAgICAgICAgICAgICAvLyBNb3RvciBNMVxuICAgICAgICAgICAgICAgIC8vIGZmOjU1ICAwOTowMCAgMDI6MGEgIDA5OjY0ICAwMDowMCAgMDA6MDAgIDBhXCJcbiAgICAgICAgICAgICAgICAvLyAweDU1ZmY7MHgwMDA5OzB4MGEwMjsweDA5NjQ7MHgwMDAwOzB4MDAwMDsweDAwMGE7MHgwMDAwO1xuICAgICAgICAgICAgICAgIC8vIE1vdG9yIE0yXG4gICAgICAgICAgICAgICAgLy8gZmY6NTU6MDk6MDA6MDI6MGE6MGE6NjQ6MDA6MDA6MDA6MDA6MGEgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBWYWx1ZSA9IHZhbHVlIDwgMCA/IChwYXJzZUludChcImZmZmZcIiwgMTYpICsgTWF0aC5tYXgoLTI1NSwgdmFsdWUpKSA6IE1hdGgubWluKDI1NSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJ5dGU3ID0gdGVtcFZhbHVlICYgMHgwMGZmO1xuICAgICAgICAgICAgICAgIGJ5dGU4ID0gMHgwMDtcbiAgICAgICAgICAgICAgICBieXRlOCA9IHRlbXBWYWx1ZSA+PiA4O1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRZUEVfUkdCOlxuICAgICAgICAgICAgICAgIC8vIGZmOjU1ICAwOTowMCAgMDI6MDggIDA2OjAwICA1Yzo5OSAgNmQ6MDAgIDBhXG4gICAgICAgICAgICAgICAgLy8gMHg1NWZmOzB4MDAwOTsweDA4MDI7MHgwMDA2OzB4OTk1YzsweDAwNmQ7MHgwMDBhOzB4MDAwMDtcbiAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDA7XG4gICAgICAgICAgICAgICAgYnl0ZTggPSB2YWx1ZSA+PiA4ICYgMHhmZjtcbiAgICAgICAgICAgICAgICBieXRlOSA9IHZhbHVlID4+IDE2ICYgMHhmZjtcbiAgICAgICAgICAgICAgICBieXRlMTAgPSB2YWx1ZSA+PiAyNCAmIDB4ZmY7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRZUEVfU09VTkQ6XG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjowMDowMDowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MDY6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOmVlOjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo4ODowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6Yjg6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjVkOjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjo0YTowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MjY6MDE6MGFcbiAgICAgICAgICAgICAgICBieXRlMiA9IDB4MDU7XG4gICAgICAgICAgICAgICAgYnl0ZTUgPSAweDIyO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4MDA7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgwNjtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweGVlO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4ODg7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHhiODtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDVkO1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gNikge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4NGE7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4MjY7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZTggPSAweDBhO1xuICAgICAgICAgICAgICAgIGJ5dGUxMiA9IDB4MDA7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGJ1ZlZpZXdbMF0gPSBieXRlMSA8PCA4IHwgYnl0ZTA7XG4gICAgICAgIGJ1ZlZpZXdbMV0gPSBieXRlMyA8PCA4IHwgYnl0ZTI7XG4gICAgICAgIGJ1ZlZpZXdbMl0gPSBieXRlNSA8PCA4IHwgYnl0ZTQ7XG4gICAgICAgIGJ1ZlZpZXdbM10gPSBieXRlNyA8PCA4IHwgYnl0ZTY7XG4gICAgICAgIGJ1ZlZpZXdbNF0gPSBieXRlOSA8PCA4IHwgYnl0ZTg7XG4gICAgICAgIGJ1ZlZpZXdbNV0gPSBieXRlMTEgPDwgOCB8IGJ5dGUxMDtcbiAgICAgICAgYnVmVmlld1s2XSA9IGJ5dGUxMyA8PCA4IHwgYnl0ZTEyO1xuICAgICAgICBidWZWaWV3WzddID0gYnl0ZTE1IDw8IDggfCBieXRlMTQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYnl0ZTAudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTIudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTMudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTQudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTUudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTYudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTcudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTgudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTkudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEwLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxMS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTIudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTEzLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxNC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTUudG9TdHJpbmcoMTYpICsgXCI6XCJcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBidWZWaWV3WzBdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbMV0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1syXS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzNdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbNF0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s1XS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzZdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbN10udG9TdHJpbmcoMTYpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgX3dyaXRlQ2hhcmFjdGVyaXN0aWModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuc2VydmljZSgpKVxuICAgICAgICAgICAgLnRoZW4oc2VydmljZSA9PiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmNoYXJhdGVyaXN0aWMoKSkpXG4gICAgICAgICAgICAudGhlbihjaGFyYWN0ZXJpc3RpYyA9PiBjaGFyYWN0ZXJpc3RpYy53cml0ZVZhbHVlKHZhbHVlKSk7XG4gICAgfVxuXG5cbn1cblxuXG4iLCIndXNlIHN0cmljdCdcblxuY2xhc3MgTXlvQ29uZmlne1xuICAgIGNvbnN0cnVjdG9yKCl7ICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgY29udHJvbFNlcnZpY2UoKSB7IHJldHVybiBcImQ1MDYwMDAxLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cbiAgICBnZXN0dXJlU2VydmljZSgpIHsgcmV0dXJuIFwiZDUwNjAwMDMtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIGNvbW1hbmRDaGFyYWN0ZXJpc3RpYygpIHsgcmV0dXJuIFwiZDUwNjA0MDEtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIGdlc3R1cmVDaGFyYWN0ZXJpc3RpYygpIHsgcmV0dXJuIFwiZDUwNjAxMDMtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIFxuXG59XG5cbmV4cG9ydCBjbGFzcyBNeW9Db250cm9sZXJ7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBNeW9Db25maWcoKTtcbiAgICAgICAgdGhpcy5vbkRpc2Nvbm5lY3RlZCA9IHRoaXMub25EaXNjb25uZWN0ZWQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQgPSBuZXcgVWludDhBcnJheSg1KTtcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbMF0gPSAweDAxOyAvLyBzZXQgbW9kZVxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFsxXSA9IDB4MDM7IC8vIGJ5dGVzIGluIHBheWxvYWRcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbMl0gPSAweDAwOyAvLyBlbWcgbW9kZTogbm9uZVxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFszXSA9IDB4MDA7IC8vIGltdSBtb2RlOiBkaXNhYmxlZFxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFs0XSA9IDB4MDE7IC8vIGNsYXNzaWZpZXIgbW9kZTogZW5hYmxlZFxuXG4gICAgICAgIHRoaXMuZGlzYWJsZUdlc3R1cmVzQ29tbWFuZCA9IFVpbnQ4QXJyYXkuZnJvbSh0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZUdlc3R1cmVzQ29tbWFuZFs0XSA9IDB4MDA7IC8vIGNsYXNzaWZpZXIgbW9kZTogZGlzYWJsZWRcblxuICAgICAgICB0aGlzLmRlZXBTbGVlcENvbW1hbmQgPSBuZXcgVWludDhBcnJheSgyKTtcbiAgICAgICAgdGhpcy5kZWVwU2xlZXBDb21tYW5kWzBdID0gMHgwNDsgLy8gc2V0IG1vZGVcbiAgICAgICAgdGhpcy5kZWVwU2xlZXBDb21tYW5kWzFdID0gMHgwMDsgLy8gYnl0ZXMgaW4gcGF5bG9hZFxuXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZWx0UG9wdXAgPSBudWxsO1xuICAgICAgICB0aGlzXG4gICAgfVxuXG4gICAgLypcbiAgICBSZXF1ZXN0IHRoZSBkZXZpY2Ugd2l0aCBibHVldG9vdGhcbiAgICAqL1xuICAgIHJlcXVlc3QoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgXCJmaWx0ZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcuY29udHJvbFNlcnZpY2UoKV1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgXCJvcHRpb25hbFNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5nZXN0dXJlU2VydmljZSgpXVxuICAgICAgICB9OyAgICAgICAgXG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYmx1ZXRvb3RoLnJlcXVlc3REZXZpY2Uob3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGRldmljZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UgPSBkZXZpY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UuYWRkRXZlbnRMaXN0ZW5lcignZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZCcsIHRoaXMub25EaXNjb25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXZpY2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25uZWN0IHRvIHRoZSBkZXZpY2VcbiAgICAgKiAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaW5pdCgpe1xuICAgICAgICBpZighdGhpcy5kZXZpY2Upe1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZWx0UG9wdXApe1xuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtzdGF0ZSA6ICdhZGQnfSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuY29udHJvbFNlcnZpY2UoKSlcbiAgICAgICAgICAgIC50aGVuKChzZXJ2aWNlKT0+e1xuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBnZXQgTXlvIENvbnRyb2wgU2VydmljZScpO1xuICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpYyh0aGlzLmNvbmZpZy5jb21tYW5kQ2hhcmFjdGVyaXN0aWMoKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoY2hhcmFjdGVyaXN0aWMpPT57XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBnZXQgTXlvIENvbW1hbmQgY2hhcmFjdGVyaXN0aWMnKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXJpc3RpYy53cml0ZVZhbHVlKHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlYWR5IHRvIGxpc3RlbiBnZXN0dXJlcycpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyR2VzdHVyZXMoY2FsbGJhY2spe1xuICAgICAgICBpZighdGhpcy5kZXZpY2Upe1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmRldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKHRoaXMuY29uZmlnLmdlc3R1cmVTZXJ2aWNlKCkpXG4gICAgICAgICAgICAudGhlbihzZXJ2aWNlPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gR2V0IEdlc3R1cmUgU2VydmljZScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmdlc3R1cmVDaGFyYWN0ZXJpc3RpYygpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChjaGFyYWN0ZXJpc3RpYykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHZXQgZ2VzdHVyZSBjYXJhY3RlcmlzdGljJylcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpYy5zdGFydE5vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpYy5hZGRFdmVudExpc3RlbmVyKCdjaGFyYWN0ZXJpc3RpY3ZhbHVlY2hhbmdlZCcsIChldikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnZXN0dXJlID0gdGhpcy5fcGFyc2VNeW9HZXN0dXJlKGV2LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHZXN0dXJlIDogJywgZ2VzdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhnZXN0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe3N0YXRlIDogJ3JlbW92ZSd9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGlzY29ubmVjdGVkKCkge1xuICAgICAgICB0aGlzLl9tYW5hZ2VQb3B1cEVsdCh7c3RhdGUgOiAncmVtb3ZlJ30pO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZygnRGV2aWNlIGlzIGRpc2Nvbm5lY3RlZC4nKTtcbiAgICB9XG5cbiAgICBfcGFyc2VNeW9HZXN0dXJlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZS5nZXRVaW50OCgwKSA9PT0gMHgwMykge1xuICAgICAgICAgICAgY29uc3QgZ2VzdHVyZVZhbHVlID0gdmFsdWUuZ2V0VWludDE2KDEsIHRydWUpXG4gICAgICAgICAgICBjb25zdCBnZXN0dXJlID0ge1xuICAgICAgICAgICAgICAgIDB4MDAwMDogJ3Jlc3QnLFxuICAgICAgICAgICAgICAgIDB4MDAwMTogJ2Zpc3QnLFxuICAgICAgICAgICAgICAgIDB4MDAwMjogJ3dhdmUtaW4nLFxuICAgICAgICAgICAgICAgIDB4MDAwMzogJ3dhdmUtb3V0JyxcbiAgICAgICAgICAgICAgICAweDAwMDQ6ICdmaW5nZXJzLXNwcmVhZCcsXG4gICAgICAgICAgICAgICAgMHgwMDA1OiAnZG91YmxlLXRhcCcsXG4gICAgICAgICAgICAgICAgMHhmZmZmOiAndW5rbm93bicsXG4gICAgICAgICAgICB9W2dlc3R1cmVWYWx1ZV1cbiAgICAgICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtnZXN0dXJlIDogZ2VzdHVyZX0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgZ2VzdHVyZSB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2VzdHVyZTogbnVsbCB9XG4gICAgfVxuXG4gICAgX21hbmFnZVBvcHVwRWx0KHtzdGF0ZT0gJ25vbmUnLCBnZXN0dXJlID0gJ25vbmUnfSl7XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gJ3JlbW92ZScgJiYgdGhpcy5lbHRQb3B1cCl7XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cCA9IG51bGw7XG4gICAgICAgIH1lbHNlIGlmIChzdGF0ZSA9PT0gJ2FkZCcpe1xuICAgICAgICAgICAgaWYgKHRoaXMuZWx0UG9wdXApe1xuICAgICAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwLmNsYXNzTGlzdC5hZGQoJ215by1wb3B1cCcpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmVsdFBvcHVwKTtcbiAgICAgICAgfWVsc2UgaWYgKHRoaXMuZWx0UG9wdXAgJiYgZ2VzdHVyZSAmJiBnZXN0dXJlICE9ICdub25lJyl7XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwLmNsYXNzTmFtZSA9IGBteW8tcG9wdXAgJHtnZXN0dXJlfWA7XG4gICAgICAgIH1cbiAgICB9XG59Il19
