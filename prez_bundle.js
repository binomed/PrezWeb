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
	/*new HighlightCodeHelper({
 keyElt : 'connect-ble',
 // We start with the first fragment (the initial position is fixed by css)
 positionArray : [{
 width: '500px',
 left: LEFT_FIRST
 },{
 line : 1,
 width : '90%'
 }, {
 line : 6,
 width : '90%'
 }]
 });*/

	//  Ble Code Read Characteristic
	/*new HighlightCodeHelper({
 keyElt : 'read-charact',
 // We start with the first fragment (the initial position is fixed by css)
 positionArray : [{
 line : 3,
 width : '90%'
 }, {
 line : 5,
 width : '90%'
 }]
 })
 //  Ble Code Write Characteristic
 new HighlightCodeHelper({
 keyElt : 'write-charact',
 // We start with the first fragment (the initial position is fixed by css)
 positionArray : [{
 line : 3,
 width : '90%'
 }, {
 line : 8,
 width : '90%'
 }]
 })
 //  Ble Code Read Characteristic
 new HighlightCodeHelper({
 keyElt : 'notif-charact',
 // We start with the first fragment (the initial position is fixed by css)
 positionArray : [{
 line : 3,
 width : '90%'
 }, {
 line : 5,
 width : '90%',
 height: '186px'
 }]
 })*/

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

	/*
 // Code Web Speech
 new HighlightCodeHelper({
 keyElt : 'web-speech',
 positionArray:[
 {
 line : 1,
 width : '400px'
 },
 {
 line : 2,
 width : '500px'
 },
 {
 line : 3,
 width : '550px'
 },
 {
 line : 5,
 width : '300px'
 },
 {
 line : 6,
 width : '300px'
 },
 {
 line : 7,
 left : '280px',
 width : '450px'
 }
 ]});
 // Code Web Speech Grammar
 new HighlightCodeHelper({
 keyElt : 'web-speech-grammar',
 positionArray : [
 {
 line : 2,
 width : '750px'
 },
 {
 line : 3,
 width : '700px'
 },
 {
 line : 4,
 width : '650px'
 }
 ]});
 // Code Web Speech Synthesis
 new HighlightCodeHelper({
 keyElt : 'web-speech-synthesis',
 positionArray: [
 {
 line : 1,
 width : '400px'
 },
 {
 line : 2,
 width : '400px'
 },
 {
 line : 3,
 width : '450px'
 },
 {
 line : 4,
 width : '600px'
 }
 ]});
 	// Code write nfc
 new HighlightCodeHelper({
 keyElt : 'write-nfc',
 positionArray : [
 {
 line : 1,
 col : 1,
 width : '1050px'
 }
 ]});
 // Code read nfc
 new HighlightCodeHelper({
 keyElt : 'read-nfc',
 positionArray : [
 {
 line : 0,
 left: '330px',
 width : '150px'
 },
 {
 line : 1,
 left: '90px',
 width : '550px'
 },
 {
 line : 2,
 left: '550px',
 calcHeight: 3,
 width : '300px'
 }
 ]});
 */
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzXFxoZWxwZXJzXFxoaWdobGlnaHRDb2RlSGVscGVyLmpzIiwic2NyaXB0c1xccHJlei5qcyIsInNjcmlwdHNcXHByZXpcXGhpZ2hsaWdodEV2ZW50cy5qcyIsInNjcmlwdHNcXHByZXpcXHJldmVhbEVuZ2luZUV2ZW50cy5qcyIsInNjcmlwdHNcXHNlbnNvcnNcXGJsZVByZXpDb250cm9sZXIuanMiLCJzY3JpcHRzXFxzZW5zb3JzXFxzcGVlY2hTeW50aGVzaXNDb250cm9sZXIuanMiLCJzY3JpcHRzXFxzZW5zb3JzXFx2b2ljZVJlY29nbml0aW9uQ29udHJvbGVyLmpzIiwic2NyaXB0c1xcd2ViYmx1ZXRvb3RoXFxtYm90Q29udHJvbGVyLmpzIiwic2NyaXB0c1xcd2ViYmx1ZXRvb3RoXFxteW9Db250cm9sZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7Ozs7OztBQUVBLElBQU0sVUFBVSxNQUFoQjtBQUNBLElBQU0sY0FBYyxRQUFwQjtBQUNBLElBQU0scUJBQXFCLE9BQTNCO0FBQ0EsSUFBTSxZQUFZLEVBQWxCOztBQUVBLElBQU0sV0FBVyxPQUFqQjs7SUFFYSxtQixXQUFBLG1CO0FBQ1osb0NBR0c7QUFBQTs7QUFBQSxNQUZGLE1BRUUsUUFGRixNQUVFO0FBQUEsTUFERixhQUNFLFFBREYsYUFDRTs7QUFBQTs7QUFDRixPQUFLLFdBQUwsR0FBbUIsU0FBUyxjQUFULGdCQUFxQyxNQUFyQyxDQUFuQjtBQUNBLE9BQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLE9BQUssUUFBTCxHQUFnQixPQUFPLFdBQVAsRUFBaEI7O0FBRUEsU0FBTyxnQkFBUCxXQUFnQyxNQUFoQyxFQUEyQyxZQUFNO0FBQ2hELE9BQUk7QUFDSCxRQUFNLGtCQUFrQixPQUFPLFdBQVAsRUFBeEI7QUFDQSxVQUFLLGdCQUFMLENBQXNCLGtCQUFrQixNQUFLLFFBQXZC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LEVBQW9CO0FBQ3RCLG9CQUFJLEtBQUssUUFBVCxFQUFrQjtBQUNkLHlCQUFLLFFBQUwsQ0FBYyxNQUFkO0FBQ0g7QUFDRCxxQkFBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBLHFCQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLEdBQXhCLENBQTRCLFdBQTVCO0FBQ0EseUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBSyxRQUEvQjtBQUNILGFBUEssTUFPQSxJQUFJLEtBQUssUUFBTCxJQUFpQixPQUFqQixJQUE0QixXQUFXLE1BQTNDLEVBQWtEO0FBQ3BELHFCQUFLLFFBQUwsQ0FBYyxTQUFkLGtCQUF1QyxPQUF2QztBQUNIO0FBQ0oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5jb25zdCBNSU5fVE9QID0gJzk1cHgnO1xyXG5jb25zdCBMSU5FX0hFSUdIVCA9ICcwLjU3ZW0nO1xyXG5jb25zdCBBRERJVElPTk5BTF9IRUlHSFQgPSAnMC40ZW0nO1xyXG5jb25zdCBDT0xfV0lEVEggPSAzNTtcclxuXHJcbmNvbnN0IExFRlRfVEFCID0gJzEwMHB4JztcclxuXHJcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRDb2RlSGVscGVyIHtcclxuXHRjb25zdHJ1Y3Rvcih7XHJcblx0XHRrZXlFbHQsXHJcblx0XHRwb3NpdGlvbkFycmF5XHJcblx0fSkge1xyXG5cdFx0dGhpcy5lbHRIaWdsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBoaWdobGlnaHQtJHtrZXlFbHR9YCk7XHJcblx0XHR0aGlzLnBvc2l0aW9uQXJyYXkgPSBwb3NpdGlvbkFycmF5O1xyXG5cdFx0dGhpcy5wcm9ncmVzcyA9IFJldmVhbC5nZXRQcm9ncmVzcygpO1xyXG5cclxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKGBjb2RlLSR7a2V5RWx0fWAsICAoKSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgY3VycmVudFByb2dyZXNzID0gUmV2ZWFsLmdldFByb2dyZXNzKCk7XHJcblx0XHRcdFx0dGhpcy5fYXBwbHlQcm9wZXJ0aWVzKGN1cnJlbnRQcm9ncmVzcyA+IHRoaXMucHJvZ3Jlc3MgPyB0aGlzLnBvc2l0aW9uQXJyYXlbMF0gOiB0aGlzLnBvc2l0aW9uQXJyYXlbdGhpcy5wb3NpdGlvbkFycmF5Lmxlbmd0aCAtIDFdKTtcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5GcmFnbWVudHMoKTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoYHN0b3AtY29kZS0ke2tleUVsdH1gLCAoKSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0dGhpcy5wcm9ncmVzcyA9IFJldmVhbC5nZXRQcm9ncmVzcygpO1xyXG5cdFx0XHRcdHRoaXMuX3VucmVnaXN0ZXJGcmFnbWVudHMoKTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG5cdF9hcHBseVByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xyXG5cdFx0XHRjb25zdCBhcmVhID0ge307XHJcblx0XHRcdGNvbnN0IHBvc2l0aW9uID0ge307XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XHJcblx0XHRcdFx0c3dpdGNoICh0cnVlKSB7XHJcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ2xpbmUnOlxyXG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICduYkxpbmVzJzpcclxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnY29sJzpcclxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnbmJDb2xzJzpcclxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAndG9wTWFyZ2luJzpcclxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnbGVmdE1hcmdpbic6XHJcblx0XHRcdFx0XHRcdHBvc2l0aW9uW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICdoZWlnaHQnOlxyXG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICd3aWR0aCc6XHJcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ3RvcCc6XHJcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ2xlZnQnOlxyXG5cdFx0XHRcdFx0XHRhcmVhW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocG9zaXRpb24udG9wTWFyZ2luID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRwb3NpdGlvbi50b3BNYXJnaW4gPSBNSU5fVE9QO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChwb3NpdGlvbi5uYkxpbmVzID09PSB1bmRlZmluZWQgJiYgYXJlYS5oZWlnaHQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGFyZWEuaGVpZ2h0ID0gTElORV9IRUlHSFQ7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHBvc2l0aW9uLmxpbmUgPT09IHVuZGVmaW5lZCAmJiBhcmVhLnRvcCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0YXJlYS50b3AgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChwb3NpdGlvbi5uYkNvbHMgPT09IHVuZGVmaW5lZCAmJiBhcmVhLndpZHRoID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRhcmVhLndpZHRoID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAocG9zaXRpb24uY29sID09PSB1bmRlZmluZWQgJiYgYXJlYS5sZWZ0ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRhcmVhLmxlZnQgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuYXJlYSA9IGFyZWE7XHJcblx0XHRcdHRoaXMuZWx0SGlnbGlnaHQucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHRcdH0gY2F0Y2ggKGUpIHt9XHJcblx0fVxyXG5cclxuXHRfcHJvZ3Jlc3NGcmFnbWVudChldmVudCkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bGV0IHByb3BlcnRpZXMgPSBudWxsXHJcblx0XHRcdGlmIChldmVudC50eXBlID09PSAnZnJhZ21lbnRzaG93bicpIHtcclxuXHRcdFx0XHRjb25zdCBpbmRleCA9ICtldmVudC5mcmFnbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtaW5kZXgnKTtcclxuXHRcdFx0XHRwcm9wZXJ0aWVzID0gdGhpcy5wb3NpdGlvbkFycmF5W2luZGV4ICsgMV07XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gK2V2ZW50LmZyYWdtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudC1pbmRleCcpO1xyXG5cdFx0XHRcdHByb3BlcnRpZXMgPSB0aGlzLnBvc2l0aW9uQXJyYXlbaW5kZXhdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghcHJvcGVydGllcykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0X2xpc3RlbkZyYWdtZW50cygpIHtcclxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcclxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdmcmFnbWVudGhpZGRlbicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRfdW5yZWdpc3RlckZyYWdtZW50cygpIHtcclxuXHRcdFJldmVhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcclxuXHRcdFJldmVhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmcmFnbWVudGhpZGRlbicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHJcbn0iLCIndXNlIHN0cmljdCdcclxuaW1wb3J0IHtSZXZlYWxFbmdpbmVFdmVudHN9IGZyb20gJy4vcHJlei9yZXZlYWxFbmdpbmVFdmVudHMuanMnO1xyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHBhZ2VMb2FkKCkge1xyXG4gICAgICAgIG5ldyBSZXZlYWxFbmdpbmVFdmVudHMoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBwYWdlTG9hZCk7XHJcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBIaWdobGlnaHRDb2RlSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qc1wiO1xyXG5cclxuY29uc3QgTElORV9IRUlHSFQgPSAxLjE1O1xyXG5jb25zdCBBRERJVElPTk5BTF9IRUlHVCA9IDAuNDtcclxuY29uc3QgQ09MX1dJRFRIID0gMzU7XHJcbmNvbnN0IExFRlRfRklSU1QgPSBcIjYwcHhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRFdmVudHMge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gIEJsdWV0b290aDogU2NhbiArIENvbm5lY3RcclxuICAgIC8qbmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xyXG5cdFx0XHRrZXlFbHQgOiAnY29ubmVjdC1ibGUnLFxyXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxyXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW3tcclxuXHRcdFx0XHR3aWR0aDogJzUwMHB4JyxcclxuXHRcdFx0XHRsZWZ0OiBMRUZUX0ZJUlNUXHJcblx0XHRcdH0se1xyXG5cdFx0XHRcdGxpbmUgOiAxLFxyXG5cdFx0XHRcdHdpZHRoIDogJzkwJSdcclxuXHRcdFx0fSwge1xyXG5cdFx0XHRcdGxpbmUgOiA2LFxyXG5cdFx0XHRcdHdpZHRoIDogJzkwJSdcclxuXHRcdFx0fV1cclxuXHRcdH0pOyovXHJcblxyXG4gICAgLy8gIEJsZSBDb2RlIFJlYWQgQ2hhcmFjdGVyaXN0aWNcclxuICAgIC8qbmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xyXG5cdFx0XHRrZXlFbHQgOiAncmVhZC1jaGFyYWN0JyxcclxuXHRcdFx0Ly8gV2Ugc3RhcnQgd2l0aCB0aGUgZmlyc3QgZnJhZ21lbnQgKHRoZSBpbml0aWFsIHBvc2l0aW9uIGlzIGZpeGVkIGJ5IGNzcylcclxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XHJcblx0XHRcdFx0bGluZSA6IDMsXHJcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0bGluZSA6IDUsXHJcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xyXG5cdFx0XHR9XVxyXG5cdFx0fSlcclxuXHJcblx0XHQvLyAgQmxlIENvZGUgV3JpdGUgQ2hhcmFjdGVyaXN0aWNcclxuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcclxuXHRcdFx0a2V5RWx0IDogJ3dyaXRlLWNoYXJhY3QnLFxyXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxyXG5cdFx0XHRwb3NpdGlvbkFycmF5IDogW3tcclxuXHRcdFx0XHRsaW5lIDogMyxcclxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXHJcblx0XHRcdH0sIHtcclxuXHRcdFx0XHRsaW5lIDogOCxcclxuXHRcdFx0XHR3aWR0aCA6ICc5MCUnXHJcblx0XHRcdH1dXHJcblx0XHR9KVxyXG5cclxuXHRcdC8vICBCbGUgQ29kZSBSZWFkIENoYXJhY3RlcmlzdGljXHJcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XHJcblx0XHRcdGtleUVsdCA6ICdub3RpZi1jaGFyYWN0JyxcclxuXHRcdFx0Ly8gV2Ugc3RhcnQgd2l0aCB0aGUgZmlyc3QgZnJhZ21lbnQgKHRoZSBpbml0aWFsIHBvc2l0aW9uIGlzIGZpeGVkIGJ5IGNzcylcclxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFt7XHJcblx0XHRcdFx0bGluZSA6IDMsXHJcblx0XHRcdFx0d2lkdGggOiAnOTAlJ1xyXG5cdFx0XHR9LCB7XHJcblx0XHRcdFx0bGluZSA6IDUsXHJcblx0XHRcdFx0d2lkdGggOiAnOTAlJyxcclxuXHRcdFx0XHRoZWlnaHQ6ICcxODZweCdcclxuXHRcdFx0fV1cclxuXHRcdH0pKi9cclxuXHJcbiAgICAvLyBDb2RlIFVzZXIgTWVkaWEgMVxyXG4gICAgbmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xyXG4gICAgICBrZXlFbHQ6IFwidXNlci1tZWRpYS12MlwiLFxyXG4gICAgICBwb3NpdGlvbkFycmF5OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgd2lkdGg6IFwiNTAwcHhcIixcclxuICAgICAgICAgIGxpbmU6IDQsXHJcbiAgICAgICAgICBsZWZ0OiBMRUZUX0ZJUlNUXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaW5lOiA2LFxyXG4gICAgICAgICAgd2lkdGg6IFwiNzAwcHhcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbGluZTogNyxcclxuICAgICAgICAgIGxlZnQ6IFwiMTUwcHhcIixcclxuICAgICAgICAgIHdpZHRoOiBcIjEwMHB4XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpbmU6IDgsXHJcbiAgICAgICAgICBsZWZ0OiBcIjEwMHB4XCIsXHJcbiAgICAgICAgICB3aWR0aDogXCI3MDBweFwiXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG5cdC8vIENvZGUgV2ViIFNwZWVjaFxyXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcclxuXHRcdFx0a2V5RWx0IDogJ3dlYi1zcGVlY2gnLFxyXG5cdFx0XHRwb3NpdGlvbkFycmF5OltcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiAxLFxyXG5cdFx0XHRcdHdpZHRoIDogJzQwMHB4J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGluZSA6IDIsXHJcblx0XHRcdFx0d2lkdGggOiAnNTAwcHgnXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsaW5lIDogMyxcclxuXHRcdFx0XHR3aWR0aCA6ICc1NTBweCdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiA1LFxyXG5cdFx0XHRcdHdpZHRoIDogJzMwMHB4J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGluZSA6IDYsXHJcblx0XHRcdFx0d2lkdGggOiAnMzAwcHgnXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsaW5lIDogNyxcclxuXHRcdFx0XHRsZWZ0IDogJzI4MHB4JyxcclxuXHRcdFx0XHR3aWR0aCA6ICc0NTBweCdcclxuXHRcdFx0fVxyXG5cdFx0XHRdfSk7XHJcblxyXG5cdC8vIENvZGUgV2ViIFNwZWVjaCBHcmFtbWFyXHJcblx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xyXG5cdFx0XHRrZXlFbHQgOiAnd2ViLXNwZWVjaC1ncmFtbWFyJyxcclxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiAyLFxyXG5cdFx0XHRcdHdpZHRoIDogJzc1MHB4J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGluZSA6IDMsXHJcblx0XHRcdFx0d2lkdGggOiAnNzAwcHgnXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsaW5lIDogNCxcclxuXHRcdFx0XHR3aWR0aCA6ICc2NTBweCdcclxuXHRcdFx0fVxyXG5cdFx0XHRdfSk7XHJcblxyXG5cdC8vIENvZGUgV2ViIFNwZWVjaCBTeW50aGVzaXNcclxuXHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XHJcblx0XHRcdGtleUVsdCA6ICd3ZWItc3BlZWNoLXN5bnRoZXNpcycsXHJcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiAxLFxyXG5cdFx0XHRcdHdpZHRoIDogJzQwMHB4J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGluZSA6IDIsXHJcblx0XHRcdFx0d2lkdGggOiAnNDAwcHgnXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsaW5lIDogMyxcclxuXHRcdFx0XHR3aWR0aCA6ICc0NTBweCdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiA0LFxyXG5cdFx0XHRcdHdpZHRoIDogJzYwMHB4J1xyXG5cdFx0XHR9XHJcblx0XHRcdF19KTtcclxuXHJcblxyXG5cdC8vIENvZGUgd3JpdGUgbmZjXHJcblx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xyXG5cdFx0XHRrZXlFbHQgOiAnd3JpdGUtbmZjJyxcclxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiAxLFxyXG5cdFx0XHRcdGNvbCA6IDEsXHJcblx0XHRcdFx0d2lkdGggOiAnMTA1MHB4J1xyXG5cdFx0XHR9XHJcblx0XHRcdF19KTtcclxuXHJcblx0Ly8gQ29kZSByZWFkIG5mY1xyXG5cdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcclxuXHRcdFx0a2V5RWx0IDogJ3JlYWQtbmZjJyxcclxuXHRcdFx0cG9zaXRpb25BcnJheSA6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGxpbmUgOiAwLFxyXG5cdFx0XHRcdGxlZnQ6ICczMzBweCcsXHJcblx0XHRcdFx0d2lkdGggOiAnMTUwcHgnXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsaW5lIDogMSxcclxuXHRcdFx0XHRsZWZ0OiAnOTBweCcsXHJcblx0XHRcdFx0d2lkdGggOiAnNTUwcHgnXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsaW5lIDogMixcclxuXHRcdFx0XHRsZWZ0OiAnNTUwcHgnLFxyXG5cdFx0XHRcdGNhbGNIZWlnaHQ6IDMsXHJcblx0XHRcdFx0d2lkdGggOiAnMzAwcHgnXHJcblx0XHRcdH1cclxuXHRcdFx0XX0pO1xyXG5cdFx0XHQqL1xyXG4gIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuaW1wb3J0IHtIaWdobGlnaHRFdmVudHN9IGZyb20gJy4vaGlnaGxpZ2h0RXZlbnRzLmpzJztcclxuaW1wb3J0IHtCbGVQcmV6Q29udHJvbGVyfSBmcm9tICcuLi9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMnO1xyXG5pbXBvcnQge1ZvaWNlUmVjb2duaXRpb25Db250cm9sZXJ9IGZyb20gJy4uL3NlbnNvcnMvdm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlci5qcyc7XHJcbmltcG9ydCB7U3BlZWNoU3ludGhlc2lzQ29udHJvbGVyfSBmcm9tICcuLi9zZW5zb3JzL3NwZWVjaFN5bnRoZXNpc0NvbnRyb2xlci5qcyc7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFJldmVhbEVuZ2luZUV2ZW50c3tcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFxyXG5cdFx0bGV0IGluSUZyYW1lID0gd2luZG93LnRvcCAhPSB3aW5kb3cuc2VsZjtcclxuXHRcdFxyXG5cdFx0Ly8gTWFuYWdlbWVudCBvZiBhY3Rpb25zIGluIHByZXogbW9kZSAobm90IGluIHByZXZpZXcgbW9kZSlcclxuXHRcdGlmICghaW5JRnJhbWUpe1xyXG5cdFx0XHRcdC8vIEluaXQgYWxsIGJsZSBhY3Rpb25zXHJcblx0XHRcdFx0dGhpcy5fYmxlUHJlekNvbnRyb2xlciA9IG5ldyBCbGVQcmV6Q29udHJvbGVyKCk7XHJcblx0XHRcdFx0dGhpcy5fYmxlRXZlbnRzKCk7XHJcblxyXG5cdFx0XHRcdC8vIEluaXQgVm9pY2UgYW5kIFNwZWVjaCBjb250cm9sZXJzXHJcblx0XHRcdFx0dGhpcy52b2ljZVJlY29nbml0aW9uID0gbmV3IFZvaWNlUmVjb2duaXRpb25Db250cm9sZXIoKTtcclxuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcyA9IG5ldyBTcGVlY2hTeW50aGVzaXNDb250cm9sZXIoKTtcclxuXHRcdFx0XHR0aGlzLl92b2ljZUV2ZW50cygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEluIGFsIGNhc2Ugd2UgaW5pdCB0aGUgaGlnaGxpZ2h0IG9mIGNvZGUuXHJcblx0XHR0aGlzLl9pbml0SGlnaGxpZ2h0Q29kZSgpO1xyXG5cclxuXHR9XHJcblxyXG5cdF9ibGVFdmVudHMoKXtcclxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdzdG9wLWNvZGUtcmVhZC1jaGFyYWN0JywgZXZlbnQgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5fYmxlUHJlekNvbnRyb2xlci5fY3VycmVudEJsZURldmljZSkge1xyXG5cdFx0XHRcdHRoaXMuX2JsZVByZXpDb250cm9sZXIuX2N1cnJlbnRCbGVEZXZpY2UuZ2F0dC5kaXNjb25uZWN0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRfdm9pY2VFdmVudHMoKXtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29nbGUtYXNzaXN0YW50JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfPT57XHJcblx0XHRcdHRoaXMuX3ZvaWNlQ2FsbEJhY2soKTtcclxuXHRcdH0pO1xyXG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZC1yZWNvZ25pdGlvbicsIF89PntcclxuXHRcdFx0dHJ5e1xyXG5cdFx0XHRcdHRoaXMudm9pY2VSZWNvZ25pdGlvbi5zdG9wKCk7XHJcblx0XHRcdH1jYXRjaChlKXt9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0X3ZvaWNlQ2FsbEJhY2soKXtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vU3BlZWNoJykuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG5cdFx0dGhpcy52b2ljZVJlY29nbml0aW9uLnN0YXJ0KChmaW5hbFN0cik9PntcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZWVjaF9pbnB1dCcpLmlubmVySFRNTCA9IGZpbmFsU3RyO1xyXG5cdFx0XHRpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnw6dhIHZhJykpe1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vU3BlZWNoJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XHJcblx0XHRcdFx0XHR2YWx1ZTonamUgdmFpcyB0csOocyBiaWVuIG1lcmNpLiBDb21tZW50IHNlIHBhc3NlIHRhIGNvbmbDqXJlbmNlID8gRnJhbsOnb2lzIGVzdC1pbCBnZW50aWwgYXZlYyB0b2kgPydcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKF89PnRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcclxuXHRcdFx0XHQuY2F0Y2goKGVycm9yKT0+e1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1lbHNlIGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdhbmdsYWlzJykpe1xyXG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcclxuXHRcdFx0XHRcdHZhbHVlOiAnaGVsbG8gZXZlcnkgb25lLCB3ZWxjb21lIHRvIHRoZSBiZXN0IHRhbGsgb2YgdGhpcyBldmVudCAhJywgXHJcblx0XHRcdFx0XHRsYW5nRnIgOiBmYWxzZX1cclxuXHRcdFx0XHQpXHJcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxyXG5cdFx0XHRcdC5jYXRjaCgoZXJyb3IpPT57XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fWVsc2UgaWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3ZvaXgnKSl7XHJcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xyXG5cdFx0XHRcdFx0dmFsdWU6ICdjb21tZSDDp2EgY1xcJ2VzdCBhc3NleiBiaXphcnJlIHBvdXIgdG9pID8nLFxyXG5cdFx0XHRcdFx0cGl0Y2ggOiAyLFxyXG5cdFx0XHRcdFx0cmF0ZSA6IDAuM31cclxuXHRcdFx0XHQpXHJcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxyXG5cdFx0XHRcdC5jYXRjaCgoZXJyb3IpPT57XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fWVsc2UgaWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3NvbW1lcy1ub3VzJykpe1xyXG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcclxuXHRcdFx0XHRcdHZhbHVlOiAnVm95b25zIEZyYW7Dp29pcywgbm91cyBzb21tZXMgZGFucyB0YSBzZXNzaW9uLCBqZSB0cm91dmUgcXVlIHR1IG5cXCdhcyBwYXMgbFxcJ2FpciB0csOocyByw6l2ZWlsbMOpJ1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oXz0+dGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxyXG5cdFx0XHRcdC5jYXRjaCgoZXJyb3IpPT57XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fWVsc2UgaWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3N1aXZhbnQnKSl7XHJcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xyXG5cdFx0XHRcdFx0dmFsdWU6ICdUcsOocyBiaWVuIHBhc3NvbnMgYXUgc2xpZGUgc3VpdmFudCdcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKF89PlJldmVhbC5uZXh0KCkpXHJcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9PntcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgdW5rbm93QXJyYXkgPSBbXHJcblx0XHRcdFx0XHQnQXJ0aWN1bGUgc1xcJ2lsIHRlIHBsYWl0JyxcclxuXHRcdFx0XHRcdCdLYW1vdWxveCAhJyxcclxuXHRcdFx0XHRcdCdUdSBwb3VycmFpcyBmYWlyZSB1biBlZmZvcnQgcXVhbmQgbcOqbWUnLFxyXG5cdFx0XHRcdFx0J1JldGlyZSB0b24gY2hld2luZyBndW0gYXZhbnQgZGUgcGFybGVyJ1xyXG5cdFx0XHRcdF07XHJcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xyXG5cdFx0XHRcdFx0dmFsdWU6IHVua25vd0FycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHVua25vd0FycmF5Lmxlbmd0aCldXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbihfPT50aGlzLl92b2ljZUNhbGxCYWNrLmJpbmQodGhpcykpXHJcblx0XHRcdFx0LmNhdGNoKChlcnJvcik9PntcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblxyXG5cdF9pbml0SGlnaGxpZ2h0Q29kZSgpIHtcclxuXHJcblx0XHRuZXcgSGlnaGxpZ2h0RXZlbnRzKCk7XHJcblx0fVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5pbXBvcnQge015b0NvbnRyb2xlcn0gZnJvbSAnLi4vd2ViYmx1ZXRvb3RoL215b0NvbnRyb2xlci5qcyc7XHJcbmltcG9ydCB7TUJvdH0gZnJvbSAnLi4vd2ViYmx1ZXRvb3RoL21ib3RDb250cm9sZXIuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJsZVByZXpDb250cm9sZXJ7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcclxuXHRcdHRoaXMuX2N1cnJlbnRCbGVEZXZpY2UgPSBudWxsO1xyXG5cdFx0dGhpcy5fYmFzaWNCbGVCaW5kaW5nKCk7XHJcblx0XHR0aGlzLl9teW9CaW5kaW5nKCk7XHJcblx0XHQvLyBKdXN0IGNvbW1lbnQgbWJvdCBwYXJ0IGJlY2F1c2UgaXQgY2FuIGFsd2F5cyBiZSB1c2VmdWxsICFcclxuXHRcdC8vdGhpcy5fbWJvdEJpbmRpbmcoKTtcclxuXHR9XHJcblxyXG5cdF9iYXNpY0JsZUJpbmRpbmcoKSB7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdEJsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG5cdFx0XHRcclxuXHRcdFx0Y29uc3QgZmlsdGVycyA9IHsgZmlsdGVyczogW3sgc2VydmljZXM6IFsnYmF0dGVyeV9zZXJ2aWNlJ10gfV0gfTtcclxuXHRcdFx0bmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKGZpbHRlcnMpXHJcblx0XHRcdC50aGVuKGRldmljZSA9PiBkZXZpY2UuZ2F0dC5jb25uZWN0KCkpXHJcblx0XHRcdC50aGVuKHNlcnZlciA9PiB7IFxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdCbHVldG9vdGggZGV2aWNlIGlzIGNvbm5lY3RlZC4nKTtcclxuXHRcdFx0XHR0aGlzLl9jdXJyZW50QmxlRGV2aWNlID0gc2VydmVyLmRldmljZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWFkQ2hhcmFjdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5fY3VycmVudEJsZURldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKCdiYXR0ZXJ5X3NlcnZpY2UnKVxyXG5cdFx0XHQudGhlbihzZXJ2aWNlID0+IHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWMoJ2JhdHRlcnlfbGV2ZWwnKSlcclxuXHRcdFx0LnRoZW4oY2hhcmFjdGVyaXN0aWMgPT4gY2hhcmFjdGVyaXN0aWMucmVhZFZhbHVlKCkpXHJcblx0XHRcdC50aGVuKHZhbHVlID0+IHtcclxuXHRcdFx0XHRjb25zdCBiYXR0ZXJ5TGV2ZWwgPSB2YWx1ZS5nZXRVaW50OCgwKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhgQmF0dGVyeSBwZXJjZW50YWdlIGlzICR7YmF0dGVyeUxldmVsfSUuYCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRfbXlvQmluZGluZygpe1xyXG5cdFx0bGV0IGxhc3REb3VibGVUYXAgPSAwO1xyXG5cdFx0bGV0IG15byA9IG5ldyBNeW9Db250cm9sZXIoKTtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25uZWN0TXlvJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKCFteW8uY29ubmVjdGVkKXtcclxuXHRcdFx0XHRteW8ucmVxdWVzdCgpXHJcblx0XHRcdFx0LnRoZW4oXz0+bXlvLmNvbm5lY3QoKSlcclxuXHRcdFx0XHQudGhlbigoKT0+bXlvLmluaXQoKSlcclxuXHRcdFx0XHQudGhlbigoKT0+bXlvLnJlZ2lzdGVyR2VzdHVyZXMoKGdlc3R1cmUpPT57XHJcblx0XHRcdFx0XHRpZiAoZ2VzdHVyZSAmJiBnZXN0dXJlLmdlc3R1cmUgPT09ICdkb3VibGUtdGFwJyl7XHJcblx0XHRcdFx0XHRcdGlmKERhdGUubm93KCkgLSBsYXN0RG91YmxlVGFwIDwgMjAwMCl7XHJcblx0XHRcdFx0XHRcdFx0UmV2ZWFsLm5leHQoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRsYXN0RG91YmxlVGFwID0gRGF0ZS5ub3coKTtcclxuXHRcdFx0XHRcdH0gXHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZGlzY29ubmVjdC1teW8nLCBfPT57XHJcblx0XHRcdG15by5kaXNjb25uZWN0KCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdF9tYm90QmluZGluZygpe1xyXG5cdFx0IC8vIENoZWNrIHRoZSBjb25uZWN0aW9uXHJcblx0XHQgbGV0IHN0ZXBDb25uZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RNQm90Jyk7XHJcblx0XHQgbGV0IHN0ZXBDb250cm9sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcnQtYnV0dG9uLW1ib3QnKTsgXHJcblx0XHQgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0TUJvdFwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF8gPT4ge1xyXG5cdFx0XHQvLyBSZXF1ZXN0IHRoZSBkZXZpY2VcclxuXHRcdFx0bGV0IG1Cb3QgPSBuZXcgTUJvdCgpO1xyXG5cdFx0XHRtQm90LnJlcXVlc3QoKVxyXG5cdFx0XHRcdC50aGVuKF8gPT4ge1xyXG5cdFx0XHRcdFx0Ly8gQ29ubmVjdCB0byB0aGUgbWJvdFxyXG5cdFx0XHRcdFx0cmV0dXJuIG1Cb3QuY29ubmVjdCgpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oXyA9PiB7XHJcblx0XHRcdFx0XHQvLyBDb25uZWN0aW9uIGlzIGRvbmUsIHdlIHNob3cgdGhlIGNvbnRyb2xzXHJcblx0XHRcdFx0XHRzdGVwQ29ubmVjdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblx0XHRcdFx0XHRzdGVwQ29udHJvbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcblxyXG5cdFx0XHRcdFx0bGV0IHBhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFydC1idXR0b24nKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gQ29udHJvbCB0aGUgcm9ib3QgYnkgYnV0dG9uc1xyXG5cdFx0XHRcdFx0bGV0IGJ0blVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5VcCcpO1xyXG5cdFx0XHRcdFx0bGV0IGJ0bkRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0bkRvd24nKTtcclxuXHRcdFx0XHRcdGxldCBidG5MZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21Cb3RCdG5MZWZ0Jyk7XHJcblx0XHRcdFx0XHRsZXQgYnRuUmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0blJpZ2h0Jyk7XHJcblxyXG5cdFx0XHRcdFx0YnRuVXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKC0yNTAsIDI1MCkgfSk7XHJcblx0XHRcdFx0XHRidG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4geyBtQm90LnByb2Nlc3NNb3RvcigyNTAsIC0yNTApIH0pO1xyXG5cdFx0XHRcdFx0YnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMjUwLCAyNTApIH0pO1xyXG5cdFx0XHRcdFx0YnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKC0yNTAsIC0yNTApIH0pO1xyXG5cclxuXHRcdFx0XHRcdGJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XHJcblx0XHRcdFx0XHRidG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XHJcblx0XHRcdFx0XHRidG5MZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHsgbUJvdC5wcm9jZXNzTW90b3IoMCwgMCkgfSk7XHJcblx0XHRcdFx0XHRidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7IG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApIH0pO1xyXG5cdFx0XHRcdFx0XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5zeW50aCA9IHdpbmRvdy5zcGVlY2hTeW50aGVzaXM7XHJcblxyXG4gICAgICAgIHRoaXMudm9pY2VGUiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy52b2ljZUVOID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jb25maWd1cmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBfY29uZmlndXJlKCl7XHJcbiAgICAgICAgdGhpcy5fcG9wdWxhdGVWb2ljZUxpc3QoKTtcclxuICAgICAgICBpZiAoc3BlZWNoU3ludGhlc2lzLm9udm9pY2VzY2hhbmdlZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNwZWVjaFN5bnRoZXNpcy5vbnZvaWNlc2NoYW5nZWQgPSB0aGlzLl9wb3B1bGF0ZVZvaWNlTGlzdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcG9wdWxhdGVWb2ljZUxpc3QoKSB7XHJcbiAgICAgICAgbGV0IHZvaWNlcyA9IHRoaXMuc3ludGguZ2V0Vm9pY2VzKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2b2ljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHZvaWNlc1tpXS5sYW5nID09PSAnZnItRlInKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiJXMsICVPIFwiLCB2b2ljZXNbaV0ubGFuZywgdm9pY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudm9pY2VGUiA9IHZvaWNlc1tpXTtcclxuICAgICAgICAgICAgfWVsc2UgaWYgKHZvaWNlc1tpXS5sYW5nID09PSAnZW4tR0InKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiJXMsICVPIFwiLCB2b2ljZXNbaV0ubGFuZywgdm9pY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudm9pY2VFTiA9IHZvaWNlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzcGVhayh7dmFsdWUsIGxhbmdGciA9IHRydWUsIHBpdGNoID0gMSwgcmF0ZSA9IDF9KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+e1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnZvaWNlRlIpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB1dHRlclRoaXMgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKHZhbHVlKTtcclxuICAgICAgICAgICAgdXR0ZXJUaGlzLnZvaWNlID0gbGFuZ0ZyID8gdGhpcy52b2ljZUZSIDogdGhpcy52b2ljZUVOO1xyXG4gICAgICAgICAgICB1dHRlclRoaXMucGl0Y2ggPSBwaXRjaDtcclxuICAgICAgICAgICAgdXR0ZXJUaGlzLnJhdGUgPSByYXRlO1xyXG4gICAgICAgICAgICB1dHRlclRoaXMub25lbmQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN5bnRoLnNwZWFrKHV0dGVyVGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5leHBvcnQgY2xhc3MgVm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgbGV0IFNwZWVjaFJlY29nbml0aW9uID0gU3BlZWNoUmVjb2duaXRpb24gfHwgd2Via2l0U3BlZWNoUmVjb2duaXRpb25cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uID0gbmV3IFNwZWVjaFJlY29nbml0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fY29uZmlndXJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoY2FsbGJhY2spe1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25yZXN1bHQgPSAoZXZlbnQpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbmFsU3RyID0gZXZlbnQucmVzdWx0c1swXVswXS50cmFuc2NyaXB0O1xyXG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdDb25maWRlbmNlOiAnICsgZmluYWxTdHIpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmluYWxTdHIpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCl7XHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NvbmZpZ3VyZSgpe1xyXG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ubGFuZyA9ICdmci1GUic7XHJcblxyXG4gICAgICAgIC8vIFdlIGRldGVjdCBlbmRcclxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZW5kID0gXz0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdFbmQgb2YgcmVjb2duaXRpb24nKTtcclxuICAgICAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBXZSBkZXRlY3QgZXJyb3JzXHJcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5vbmVycm9yID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5lcnJvciA9PSAnbm8tc3BlZWNoJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnTm8gU3BlZWNoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdhdWRpby1jYXB0dXJlJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnTm8gbWljcm9waG9uZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdub3QtYWxsb3dlZCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ05vdCBBbGxvd2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9OyAgICAgXHJcbiAgICB9XHJcblxyXG5cclxufSIsIid1c2Ugc3RyaWN0J1xyXG4vKipcclxuICogQ29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9iaW5vbWVkL21ib3Qtd2ViYmx1ZXRvb3RoXHJcbiAqIFxyXG4gKi9cclxuXHJcblxyXG5jb25zdCBERVZJQ0VfTkFNRSA9IFwiTWFrZWJsb2NrX0xFXCIsXHJcbiAgICBTRVJWSUNFX1VVSUQgPSBcIjAwMDBmZmUxLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiLFxyXG4gICAgQ0hBUkFDVEVSSVNUSUNfVVVJRCA9IFwiMDAwMGZmZTMtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCI7XHJcblxyXG4vKipcclxuICogR2VuZXJhbCBjb25maWd1cmF0aW9uIChVVUlEKVxyXG4qL1xyXG5jbGFzcyBDb25maWcge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIG5hbWUoKSB7IHJldHVybiBcIk1ha2VibG9ja19MRVwiOyB9XHJcbiAgICBzZXJ2aWNlKCkgeyByZXR1cm4gXCIwMDAwZmZlMS0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIiB9XHJcbiAgICBjaGFyYXRlcmlzdGljKCkgeyByZXR1cm4gXCIwMDAwZmZlMy0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIiB9XHJcbn1cclxuXHJcbi8vIENvbnN0IGZvciBpbnN0cnVjdGlvbnMgdHlwZXNcclxuY29uc3QgVFlQRV9NT1RPUiA9IDB4MGEsXHJcbiAgICBUWVBFX1JHQiA9IDB4MDgsXHJcbiAgICBUWVBFX1NPVU5EID0gMHgwNztcclxuXHJcblxyXG4vLyBDb25zdCBmb3IgdGhlIHBvcnRzXHJcbmNvbnN0IFBPUlRfMSA9IDB4MDEsXHJcbiAgICBQT1JUXzIgPSAweDAyLFxyXG4gICAgUE9SVF8zID0gMHgwMyxcclxuICAgIFBPUlRfNCA9IDB4MDQsXHJcbiAgICBQT1JUXzUgPSAweDA1LFxyXG4gICAgUE9SVF82ID0gMHgwNixcclxuICAgIFBPUlRfNyA9IDB4MDcsXHJcbiAgICBQT1JUXzggPSAweDA4LFxyXG4gICAgTV8xID0gMHgwOSxcclxuICAgIE1fMiA9IDB4MGE7XHJcbiAgICBcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBmb3IgdGhlIHJvYm90XHJcbiAqICovXHJcbmV4cG9ydCBjbGFzcyBNQm90IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZGV2aWNlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWcoKTtcclxuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdGVkID0gdGhpcy5vbkRpc2Nvbm5lY3RlZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnV6emVySW5kZXggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBSZXF1ZXN0IHRoZSBkZXZpY2Ugd2l0aCBibHVldG9vdGhcclxuICAgICovXHJcbiAgICByZXF1ZXN0KCkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBcImZpbHRlcnNcIjogW3tcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiB0aGlzLmNvbmZpZy5uYW1lKClcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIFwib3B0aW9uYWxTZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcuc2VydmljZSgpXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZShvcHRpb25zKVxyXG4gICAgICAgICAgICAudGhlbihkZXZpY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2UgPSBkZXZpY2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZS5hZGRFdmVudExpc3RlbmVyKCdnYXR0c2VydmVyZGlzY29ubmVjdGVkJywgdGhpcy5vbkRpc2Nvbm5lY3RlZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGV2aWNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lY3QgdG8gdGhlIGRldmljZVxyXG4gICAgICogKi9cclxuICAgIGNvbm5lY3QoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmNvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb250cm9sIHRoZSBtb3RvcnMgb2Ygcm9ib3RcclxuICAgICovXHJcbiAgICBwcm9jZXNzTW90b3IodmFsdWVNMSwgdmFsdWVNMikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfTU9UT1IsIE1fMSwgMCwgdmFsdWVNMSkpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfTU9UT1IsIE1fMiwgMCwgdmFsdWVNMikpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NCdXp6ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5idXp6ZXJJbmRleCA9ICh0aGlzLmJ1enplckluZGV4ICsgMSkgJSA4O1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfU09VTkQsIFBPUlRfMiwgMjIsIHRoaXMuYnV6emVySW5kZXgpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm9jZXNzQ29sb3IocmVkLGJsdWUsZ3JlZW4pe1xyXG4gICAgICAgIGxldCBySGV4ID0gcmVkPDw4O1xyXG5cdFx0bGV0IGdIZXggPSBncmVlbjw8MTY7XHJcblx0XHRsZXQgYkhleCA9IGJsdWU8PDI0O1xyXG5cdFx0bGV0IHZhbHVlID0gckhleCB8IGdIZXggfCBiSGV4O1xyXG5cdFx0dGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX1JHQixQT1JUXzYsMCx2YWx1ZSkpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNjb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZSBpcyBkaXNjb25uZWN0ZWQuJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9nZW5lcmljQ29udHJvbCh0eXBlLCBwb3J0LCBzbG90LCB2YWx1ZSkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgZmYgNTUgbGVuIGlkeCBhY3Rpb24gZGV2aWNlIHBvcnQgIHNsb3QgIGRhdGEgYVxyXG4gICAgICAgIDAgIDEgIDIgICAzICAgNCAgICAgIDUgICAgICA2ICAgICA3ICAgICA4XHJcbiAgICAgICAgKi9cclxuICAgICAgICAvLyBTdGF0aWMgdmFsdWVzXHJcbiAgICAgICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigxNik7XHJcbiAgICAgICAgdmFyIGJ1ZlZpZXcgPSBuZXcgVWludDE2QXJyYXkoYnVmKTtcclxuXHJcbiAgICAgICAgdmFyIGJ5dGUwID0gMHhmZiwgLy8gU3RhdGljIGhlYWRlclxyXG4gICAgICAgICAgICBieXRlMSA9IDB4NTUsIC8vIFN0YXRpYyBoZWFkZXJcclxuICAgICAgICAgICAgYnl0ZTIgPSAweDA5LCAvLyBsZW5cclxuICAgICAgICAgICAgYnl0ZTMgPSAweDAwLCAvLyBpZHhcclxuICAgICAgICAgICAgYnl0ZTQgPSAweDAyLCAvLyBhY3Rpb25cclxuICAgICAgICAgICAgYnl0ZTUgPSB0eXBlLCAvLyBkZXZpY2VcclxuICAgICAgICAgICAgYnl0ZTYgPSBwb3J0LCAvLyBwb3J0XHJcbiAgICAgICAgICAgIGJ5dGU3ID0gc2xvdDsgLy8gc2xvdFxyXG4gICAgICAgIC8vZHluYW1pY3MgdmFsdWVzXHJcbiAgICAgICAgdmFyIGJ5dGU4ID0gMHgwMCwgLy8gZGF0YVxyXG4gICAgICAgICAgICBieXRlOSA9IDB4MDAsIC8vIGRhdGFcclxuICAgICAgICAgICAgYnl0ZTEwID0gMHgwMCwgLy8gZGF0YVxyXG4gICAgICAgICAgICBieXRlMTEgPSAweDAwOyAvLyBkYXRhXHJcbiAgICAgICAgLy9FbmQgb2YgbWVzc2FnZVxyXG4gICAgICAgIHZhciBieXRlMTIgPSAweDBhLFxyXG4gICAgICAgICAgICBieXRlMTMgPSAweDAwLFxyXG4gICAgICAgICAgICBieXRlMTQgPSAweDAwLFxyXG4gICAgICAgICAgICBieXRlMTUgPSAweDAwO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBUWVBFX01PVE9SOlxyXG4gICAgICAgICAgICAgICAgLy8gTW90b3IgTTFcclxuICAgICAgICAgICAgICAgIC8vIGZmOjU1ICAwOTowMCAgMDI6MGEgIDA5OjY0ICAwMDowMCAgMDA6MDAgIDBhXCJcclxuICAgICAgICAgICAgICAgIC8vIDB4NTVmZjsweDAwMDk7MHgwYTAyOzB4MDk2NDsweDAwMDA7MHgwMDAwOzB4MDAwYTsweDAwMDA7XHJcbiAgICAgICAgICAgICAgICAvLyBNb3RvciBNMlxyXG4gICAgICAgICAgICAgICAgLy8gZmY6NTU6MDk6MDA6MDI6MGE6MGE6NjQ6MDA6MDA6MDA6MDA6MGEgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcFZhbHVlID0gdmFsdWUgPCAwID8gKHBhcnNlSW50KFwiZmZmZlwiLCAxNikgKyBNYXRoLm1heCgtMjU1LCB2YWx1ZSkpIDogTWF0aC5taW4oMjU1LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBieXRlNyA9IHRlbXBWYWx1ZSAmIDB4MDBmZjtcclxuICAgICAgICAgICAgICAgIGJ5dGU4ID0gMHgwMDtcclxuICAgICAgICAgICAgICAgIGJ5dGU4ID0gdGVtcFZhbHVlID4+IDg7XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUWVBFX1JHQjpcclxuICAgICAgICAgICAgICAgIC8vIGZmOjU1ICAwOTowMCAgMDI6MDggIDA2OjAwICA1Yzo5OSAgNmQ6MDAgIDBhXHJcbiAgICAgICAgICAgICAgICAvLyAweDU1ZmY7MHgwMDA5OzB4MDgwMjsweDAwMDY7MHg5OTVjOzB4MDA2ZDsweDAwMGE7MHgwMDAwO1xyXG4gICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAwO1xyXG4gICAgICAgICAgICAgICAgYnl0ZTggPSB2YWx1ZSA+PiA4ICYgMHhmZjtcclxuICAgICAgICAgICAgICAgIGJ5dGU5ID0gdmFsdWUgPj4gMTYgJiAweGZmO1xyXG4gICAgICAgICAgICAgICAgYnl0ZTEwID0gdmFsdWUgPj4gMjQgJiAweGZmO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVFlQRV9TT1VORDpcclxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MDA6MDA6MGFcclxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MDY6MDE6MGFcclxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6ZWU6MDE6MGFcclxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6ODg6MDE6MGFcclxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6Yjg6MDE6MGFcclxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6NWQ6MDE6MGFcclxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6NGE6MDE6MGFcclxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6MjY6MDE6MGFcclxuICAgICAgICAgICAgICAgIGJ5dGUyID0gMHgwNTtcclxuICAgICAgICAgICAgICAgIGJ5dGU1ID0gMHgyMjtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgwMDtcclxuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDA2O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4ZWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHg4ODtcclxuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweGI4O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4NWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHg0YTtcclxuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgyNjtcclxuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBieXRlOCA9IDB4MGE7XHJcbiAgICAgICAgICAgICAgICBieXRlMTIgPSAweDAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnVmVmlld1swXSA9IGJ5dGUxIDw8IDggfCBieXRlMDtcclxuICAgICAgICBidWZWaWV3WzFdID0gYnl0ZTMgPDwgOCB8IGJ5dGUyO1xyXG4gICAgICAgIGJ1ZlZpZXdbMl0gPSBieXRlNSA8PCA4IHwgYnl0ZTQ7XHJcbiAgICAgICAgYnVmVmlld1szXSA9IGJ5dGU3IDw8IDggfCBieXRlNjtcclxuICAgICAgICBidWZWaWV3WzRdID0gYnl0ZTkgPDwgOCB8IGJ5dGU4O1xyXG4gICAgICAgIGJ1ZlZpZXdbNV0gPSBieXRlMTEgPDwgOCB8IGJ5dGUxMDtcclxuICAgICAgICBidWZWaWV3WzZdID0gYnl0ZTEzIDw8IDggfCBieXRlMTI7XHJcbiAgICAgICAgYnVmVmlld1s3XSA9IGJ5dGUxNSA8PCA4IHwgYnl0ZTE0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBieXRlMC50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGUxLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTIudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xyXG4gICAgICAgICAgICBieXRlMy50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGU0LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTUudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xyXG4gICAgICAgICAgICBieXRlNi50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGU3LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnl0ZTgudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xyXG4gICAgICAgICAgICBieXRlOS50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGUxMC50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGUxMS50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGUxMi50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGUxMy50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGUxNC50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ5dGUxNS50b1N0cmluZygxNikgKyBcIjpcIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIGJ1ZlZpZXdbMF0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xyXG4gICAgICAgICAgICBidWZWaWV3WzFdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnVmVmlld1syXS50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ1ZlZpZXdbM10udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xyXG4gICAgICAgICAgICBidWZWaWV3WzRdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcclxuICAgICAgICAgICAgYnVmVmlld1s1XS50b1N0cmluZygxNikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgIGJ1ZlZpZXdbNl0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xyXG4gICAgICAgICAgICBidWZWaWV3WzddLnRvU3RyaW5nKDE2KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZjtcclxuICAgIH1cclxuXHJcbiAgICBfd3JpdGVDaGFyYWN0ZXJpc3RpYyh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKHRoaXMuY29uZmlnLnNlcnZpY2UoKSlcclxuICAgICAgICAgICAgLnRoZW4oc2VydmljZSA9PiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmNoYXJhdGVyaXN0aWMoKSkpXHJcbiAgICAgICAgICAgIC50aGVuKGNoYXJhY3RlcmlzdGljID0+IGNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUodmFsdWUpKTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5jbGFzcyBNeW9Db25maWd7XHJcbiAgICBjb25zdHJ1Y3RvcigpeyAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnRyb2xTZXJ2aWNlKCkgeyByZXR1cm4gXCJkNTA2MDAwMS1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XHJcbiAgICBnZXN0dXJlU2VydmljZSgpIHsgcmV0dXJuIFwiZDUwNjAwMDMtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxyXG4gICAgY29tbWFuZENoYXJhY3RlcmlzdGljKCkgeyByZXR1cm4gXCJkNTA2MDQwMS1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XHJcbiAgICBnZXN0dXJlQ2hhcmFjdGVyaXN0aWMoKSB7IHJldHVybiBcImQ1MDYwMTAzLWE5MDQtZGViOS00NzQ4LTJjN2Y0YTEyNDg0MlwiIH1cclxuICAgIFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE15b0NvbnRyb2xlcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IE15b0NvbmZpZygpO1xyXG4gICAgICAgIHRoaXMub25EaXNjb25uZWN0ZWQgPSB0aGlzLm9uRGlzY29ubmVjdGVkLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQgPSBuZXcgVWludDhBcnJheSg1KTtcclxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFswXSA9IDB4MDE7IC8vIHNldCBtb2RlXHJcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbMV0gPSAweDAzOyAvLyBieXRlcyBpbiBwYXlsb2FkXHJcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbMl0gPSAweDAwOyAvLyBlbWcgbW9kZTogbm9uZVxyXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzNdID0gMHgwMDsgLy8gaW11IG1vZGU6IGRpc2FibGVkXHJcbiAgICAgICAgdGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmRbNF0gPSAweDAxOyAvLyBjbGFzc2lmaWVyIG1vZGU6IGVuYWJsZWRcclxuXHJcbiAgICAgICAgdGhpcy5kaXNhYmxlR2VzdHVyZXNDb21tYW5kID0gVWludDhBcnJheS5mcm9tKHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kKTtcclxuICAgICAgICB0aGlzLmRpc2FibGVHZXN0dXJlc0NvbW1hbmRbNF0gPSAweDAwOyAvLyBjbGFzc2lmaWVyIG1vZGU6IGRpc2FibGVkXHJcblxyXG4gICAgICAgIHRoaXMuZGVlcFNsZWVwQ29tbWFuZCA9IG5ldyBVaW50OEFycmF5KDIpO1xyXG4gICAgICAgIHRoaXMuZGVlcFNsZWVwQ29tbWFuZFswXSA9IDB4MDQ7IC8vIHNldCBtb2RlXHJcbiAgICAgICAgdGhpcy5kZWVwU2xlZXBDb21tYW5kWzFdID0gMHgwMDsgLy8gYnl0ZXMgaW4gcGF5bG9hZFxyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZWx0UG9wdXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgUmVxdWVzdCB0aGUgZGV2aWNlIHdpdGggYmx1ZXRvb3RoXHJcbiAgICAqL1xyXG4gICAgcmVxdWVzdCgpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgXCJmaWx0ZXJzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5jb250cm9sU2VydmljZSgpXVxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgXCJvcHRpb25hbFNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5nZXN0dXJlU2VydmljZSgpXVxyXG4gICAgICAgIH07ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50aGVuKGRldmljZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCB0aGlzLm9uRGlzY29ubmVjdGVkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZXZpY2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVjdCB0byB0aGUgZGV2aWNlXHJcbiAgICAgKiAqL1xyXG4gICAgY29ubmVjdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5jb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpbml0KCl7XHJcbiAgICAgICAgaWYoIXRoaXMuZGV2aWNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmVsdFBvcHVwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtzdGF0ZSA6ICdhZGQnfSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKHRoaXMuY29uZmlnLmNvbnRyb2xTZXJ2aWNlKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChzZXJ2aWNlKT0+e1xyXG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IGdldCBNeW8gQ29udHJvbCBTZXJ2aWNlJyk7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuY29tbWFuZENoYXJhY3RlcmlzdGljKCkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChjaGFyYWN0ZXJpc3RpYyk9PntcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gZ2V0IE15byBDb21tYW5kIGNoYXJhY3RlcmlzdGljJyk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXJpc3RpYy53cml0ZVZhbHVlKHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlYWR5IHRvIGxpc3RlbiBnZXN0dXJlcycpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyR2VzdHVyZXMoY2FsbGJhY2spe1xyXG4gICAgICAgIGlmKCF0aGlzLmRldmljZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuZ2VzdHVyZVNlcnZpY2UoKSlcclxuICAgICAgICAgICAgLnRoZW4oc2VydmljZT0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4gR2V0IEdlc3R1cmUgU2VydmljZScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuZ2VzdHVyZUNoYXJhY3RlcmlzdGljKCkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChjaGFyYWN0ZXJpc3RpYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dldCBnZXN0dXJlIGNhcmFjdGVyaXN0aWMnKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyaXN0aWMuc3RhcnROb3RpZmljYXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpYy5hZGRFdmVudExpc3RlbmVyKCdjaGFyYWN0ZXJpc3RpY3ZhbHVlY2hhbmdlZCcsIChldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdlc3R1cmUgPSB0aGlzLl9wYXJzZU15b0dlc3R1cmUoZXYudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnR2VzdHVyZSA6ICcsIGdlc3R1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGdlc3R1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICBkaXNjb25uZWN0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VQb3B1cEVsdCh7c3RhdGUgOiAncmVtb3ZlJ30pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzY29ubmVjdGVkKCkge1xyXG4gICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtzdGF0ZSA6ICdyZW1vdmUnfSk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGV2aWNlIGlzIGRpc2Nvbm5lY3RlZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICBfcGFyc2VNeW9HZXN0dXJlKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlLmdldFVpbnQ4KDApID09PSAweDAzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdlc3R1cmVWYWx1ZSA9IHZhbHVlLmdldFVpbnQxNigxLCB0cnVlKVxyXG4gICAgICAgICAgICBjb25zdCBnZXN0dXJlID0ge1xyXG4gICAgICAgICAgICAgICAgMHgwMDAwOiAncmVzdCcsXHJcbiAgICAgICAgICAgICAgICAweDAwMDE6ICdmaXN0JyxcclxuICAgICAgICAgICAgICAgIDB4MDAwMjogJ3dhdmUtaW4nLFxyXG4gICAgICAgICAgICAgICAgMHgwMDAzOiAnd2F2ZS1vdXQnLFxyXG4gICAgICAgICAgICAgICAgMHgwMDA0OiAnZmluZ2Vycy1zcHJlYWQnLFxyXG4gICAgICAgICAgICAgICAgMHgwMDA1OiAnZG91YmxlLXRhcCcsXHJcbiAgICAgICAgICAgICAgICAweGZmZmY6ICd1bmtub3duJyxcclxuICAgICAgICAgICAgfVtnZXN0dXJlVmFsdWVdXHJcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtnZXN0dXJlIDogZ2VzdHVyZX0pO1xyXG4gICAgICAgICAgICByZXR1cm4geyBnZXN0dXJlIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgZ2VzdHVyZTogbnVsbCB9XHJcbiAgICB9XHJcblxyXG4gICAgX21hbmFnZVBvcHVwRWx0KHtzdGF0ZT0gJ25vbmUnLCBnZXN0dXJlID0gJ25vbmUnfSl7XHJcbiAgICAgICAgaWYgKHN0YXRlID09PSAncmVtb3ZlJyAmJiB0aGlzLmVsdFBvcHVwKXtcclxuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cCA9IG51bGw7XHJcbiAgICAgICAgfWVsc2UgaWYgKHN0YXRlID09PSAnYWRkJyl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVsdFBvcHVwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbHRQb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwLmNsYXNzTGlzdC5hZGQoJ215by1wb3B1cCcpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWx0UG9wdXApO1xyXG4gICAgICAgIH1lbHNlIGlmICh0aGlzLmVsdFBvcHVwICYmIGdlc3R1cmUgJiYgZ2VzdHVyZSAhPSAnbm9uZScpe1xyXG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwLmNsYXNzTmFtZSA9IGBteW8tcG9wdXAgJHtnZXN0dXJlfWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
