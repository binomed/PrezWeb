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

var _imageCapture = require('../sensors/imageCapture.js');

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

			// Init  Image Capture
			this._imageCaptureEvents();
		}

		// In al case we init the highlight of code.
		this._initHighlightCode();
	}

	_createClass(RevealEngineEvents, [{
		key: '_imageCaptureEvents',
		value: function _imageCaptureEvents() {
			var imageCaptureController = null;
			Reveal.addEventListener('stop-image-capture-demo', function (event) {
				if (imageCaptureController) {
					imageCaptureController._destroy();
				}
			});
			Reveal.addEventListener('image-capture-demo', function (event) {
				imageCaptureController = new _imageCapture.ImageCaptureControler();
			});
		}
	}, {
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
						langFr: false
					}).then(function (_) {
						return _this3._voiceCallBack.bind(_this3);
					}).catch(function (error) {
						console.error(error);
					});
				} else if (finalStr.toLowerCase().includes('voix')) {
					_this3.speechSynthesis.speak({
						value: 'comme ça c\'est assez bizarre pour toi ?',
						pitch: 2,
						rate: 0.3
					}).then(function (_) {
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

},{"../sensors/blePrezControler.js":5,"../sensors/imageCapture.js":6,"../sensors/speechSynthesisControler.js":7,"../sensors/voiceRecognitionControler.js":8,"./highlightEvents.js":3}],5:[function(require,module,exports){
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

},{"../webbluetooth/mbotControler.js":9,"../webbluetooth/myoControler.js":10}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageCaptureControler = exports.ImageCaptureControler = function () {
    function ImageCaptureControler() {
        _classCallCheck(this, ImageCaptureControler);

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(this._gotMedia.bind(this)).catch(function (error) {
            return console.error('getUserMedia() error:', error);
        });
        this.mediaStreamTrack = null;
        this.imageCapture = null;

        this.brightnessElt = document.getElementById('brightness');
        this.contrastElt = document.getElementById('contrast');
        this.saturationElt = document.getElementById('saturation');
        this.sharpnessElt = document.getElementById('sharpness');
        this.imageCaptureElt = document.getElementById('imageCapture');
    }

    _createClass(ImageCaptureControler, [{
        key: '_destroy',
        value: function _destroy() {
            if (this.mediaStreamTrack) {
                this.mediaStreamTrack.stop();
            }
        }
    }, {
        key: '_gotMedia',
        value: function _gotMedia(mediaStream) {
            this.mediaStreamTrack = mediaStream.getVideoTracks()[0];
            this.imageCapture = new ImageCapture(this.mediaStreamTrack);
            var constraints = this.imageCapture.track.getConstraints();
            var settings = this.imageCapture.track.getSettings();
            var capabilities = this.imageCapture.track.getCapabilities();
            for (var capabilityName in capabilities) {
                var capability = capabilities[capabilityName];
                if (capability.toString() === '[object MediaSettingsRange]') {
                    var value = settings[capabilityName];
                    switch (capabilityName) {
                        case 'brightness':
                            this._initRange(this.brightnessElt, capabilityName, value, capability);
                            break;
                        case 'contrast':
                            this._initRange(this.contrastElt, capabilityName, value, capability);
                            break;
                        case 'saturation':
                            this._initRange(this.saturationElt, capabilityName, value, capability);
                            break;
                        case 'sharpness':
                            this._initRange(this.sharpnessElt, capabilityName, value, capability);
                            break;

                    }
                }
            }
            console.log(this.imageCapture);
            this.imageCaptureElt.srcObject = mediaStream;
        }
    }, {
        key: '_initRange',
        value: function _initRange(capabilityElt, capabilityName, value, range) {
            var _this = this;

            capabilityElt.min = range.min;
            capabilityElt.max = range.max;
            capabilityElt.step = Math.round(range.step * 100) / 100;
            capabilityElt.value = value;
            capabilityElt.setAttribute('data-name', capabilityName);
            capabilityElt.oninput = function (event) {
                var options = {};
                options[capabilityName] = event.target.value;
                _this._applyConstraints(options);
            };
        }
    }, {
        key: '_applyConstraints',
        value: function _applyConstraints(options) {
            this.imageCapture.track.applyConstraints({
                advanced: [options]
            }).then(function (_) {});
        }
    }, {
        key: '_changeConstraint',
        value: function _changeConstraint(brightnessValue, contrastValue, saturationValue, sharpnessValue) {
            mediaStreamTrack.applyConstraints({
                advanced: [{
                    brightness: brightnessValue,
                    constrast: contrastValue,
                    saturation: saturationValue,
                    sharpness: sharpnessValue
                }]
            }).catch(function (error) {
                return console.error('Uh, oh, applyConstraints() error:', error);
            });
        }
    }]);

    return ImageCaptureControler;
}();

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qcyIsInNjcmlwdHMvcHJlei5qcyIsInNjcmlwdHMvcHJlei9oaWdobGlnaHRFdmVudHMuanMiLCJzY3JpcHRzL3ByZXovcmV2ZWFsRW5naW5lRXZlbnRzLmpzIiwic2NyaXB0cy9zZW5zb3JzL2JsZVByZXpDb250cm9sZXIuanMiLCJzY3JpcHRzL3NlbnNvcnMvaW1hZ2VDYXB0dXJlLmpzIiwic2NyaXB0cy9zZW5zb3JzL3NwZWVjaFN5bnRoZXNpc0NvbnRyb2xlci5qcyIsInNjcmlwdHMvc2Vuc29ycy92b2ljZVJlY29nbml0aW9uQ29udHJvbGVyLmpzIiwic2NyaXB0cy93ZWJibHVldG9vdGgvbWJvdENvbnRyb2xlci5qcyIsInNjcmlwdHMvd2ViYmx1ZXRvb3RoL215b0NvbnRyb2xlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7Ozs7O0FBRUEsSUFBTSxVQUFVLE1BQWhCO0FBQ0EsSUFBTSxjQUFjLFFBQXBCO0FBQ0EsSUFBTSxxQkFBcUIsT0FBM0I7QUFDQSxJQUFNLFlBQVksRUFBbEI7O0FBRUEsSUFBTSxXQUFXLE9BQWpCOztJQUVhLG1CLFdBQUEsbUI7QUFDWixvQ0FHRztBQUFBOztBQUFBLE1BRkYsTUFFRSxRQUZGLE1BRUU7QUFBQSxNQURGLGFBQ0UsUUFERixhQUNFOztBQUFBOztBQUNGLE9BQUssV0FBTCxHQUFtQixTQUFTLGNBQVQsZ0JBQXFDLE1BQXJDLENBQW5CO0FBQ0EsT0FBSyxhQUFMLEdBQXFCLGFBQXJCO0FBQ0EsT0FBSyxRQUFMLEdBQWdCLE9BQU8sV0FBUCxFQUFoQjs7QUFFQSxTQUFPLGdCQUFQLFdBQWdDLE1BQWhDLEVBQTJDLFlBQU07QUFDaEQsT0FBSTtBQUNILFFBQU0sa0JBQWtCLE9BQU8sV0FBUCxFQUF4QjtBQUNBLFVBQUssZ0JBQUwsQ0FBc0Is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dUIsS0FBdkIsQ0FBaEI7QUFDQSxxQkFBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixXQUE1QjtBQUNBLHlCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEtBQUssUUFBL0I7QUFDSCxhQVBLLE1BT0EsSUFBSSxLQUFLLFFBQUwsSUFBaUIsT0FBakIsSUFBNEIsV0FBVyxNQUEzQyxFQUFrRDtBQUNwRCxxQkFBSyxRQUFMLENBQWMsU0FBZCxrQkFBdUMsT0FBdkM7QUFDSDtBQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBNSU5fVE9QID0gJzk1cHgnO1xuY29uc3QgTElORV9IRUlHSFQgPSAnMC41N2VtJztcbmNvbnN0IEFERElUSU9OTkFMX0hFSUdIVCA9ICcwLjRlbSc7XG5jb25zdCBDT0xfV0lEVEggPSAzNTtcblxuY29uc3QgTEVGVF9UQUIgPSAnMTAwcHgnO1xuXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0Q29kZUhlbHBlciB7XG5cdGNvbnN0cnVjdG9yKHtcblx0XHRrZXlFbHQsXG5cdFx0cG9zaXRpb25BcnJheVxuXHR9KSB7XG5cdFx0dGhpcy5lbHRIaWdsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBoaWdobGlnaHQtJHtrZXlFbHR9YCk7XG5cdFx0dGhpcy5wb3NpdGlvbkFycmF5ID0gcG9zaXRpb25BcnJheTtcblx0XHR0aGlzLnByb2dyZXNzID0gUmV2ZWFsLmdldFByb2dyZXNzKCk7XG5cblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcihgY29kZS0ke2tleUVsdH1gLCAgKCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgY3VycmVudFByb2dyZXNzID0gUmV2ZWFsLmdldFByb2dyZXNzKCk7XG5cdFx0XHRcdHRoaXMuX2FwcGx5UHJvcGVydGllcyhjdXJyZW50UHJvZ3Jlc3MgPiB0aGlzLnByb2dyZXNzID8gdGhpcy5wb3NpdGlvbkFycmF5WzBdIDogdGhpcy5wb3NpdGlvbkFycmF5W3RoaXMucG9zaXRpb25BcnJheS5sZW5ndGggLSAxXSk7XG5cdFx0XHRcdHRoaXMuX2xpc3RlbkZyYWdtZW50cygpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKGBzdG9wLWNvZGUtJHtrZXlFbHR9YCwgKCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dGhpcy5wcm9ncmVzcyA9IFJldmVhbC5nZXRQcm9ncmVzcygpO1xuXHRcdFx0XHR0aGlzLl91bnJlZ2lzdGVyRnJhZ21lbnRzKCk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fVxuXG5cdF9hcHBseVByb3BlcnRpZXMocHJvcGVydGllcykge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XG5cdFx0XHRjb25zdCBhcmVhID0ge307XG5cdFx0XHRjb25zdCBwb3NpdGlvbiA9IHt9O1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRcdHN3aXRjaCAodHJ1ZSkge1xuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnbGluZSc6XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICduYkxpbmVzJzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ2NvbCc6XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICduYkNvbHMnOlxuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAndG9wTWFyZ2luJzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ2xlZnRNYXJnaW4nOlxuXHRcdFx0XHRcdFx0cG9zaXRpb25ba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2Uga2V5ID09PSAnaGVpZ2h0Jzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ3dpZHRoJzpcblx0XHRcdFx0XHRjYXNlIGtleSA9PT0gJ3RvcCc6XG5cdFx0XHRcdFx0Y2FzZSBrZXkgPT09ICdsZWZ0Jzpcblx0XHRcdFx0XHRcdGFyZWFba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAocG9zaXRpb24udG9wTWFyZ2luID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cG9zaXRpb24udG9wTWFyZ2luID0gTUlOX1RPUDtcblx0XHRcdH1cblx0XHRcdGlmIChwb3NpdGlvbi5uYkxpbmVzID09PSB1bmRlZmluZWQgJiYgYXJlYS5oZWlnaHQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhcmVhLmhlaWdodCA9IExJTkVfSEVJR0hUO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc2l0aW9uLmxpbmUgPT09IHVuZGVmaW5lZCAmJiBhcmVhLnRvcCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGFyZWEudG9wID0gMDtcblx0XHRcdH1cblx0XHRcdGlmIChwb3NpdGlvbi5uYkNvbHMgPT09IHVuZGVmaW5lZCAmJiBhcmVhLndpZHRoID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YXJlYS53aWR0aCA9IDA7XG5cdFx0XHR9XG5cdFx0XHRpZiAocG9zaXRpb24uY29sID09PSB1bmRlZmluZWQgJiYgYXJlYS5sZWZ0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YXJlYS5sZWZ0ID0gMDtcblx0XHRcdH1cblx0XHRcdHRoaXMuZWx0SGlnbGlnaHQuYXJlYSA9IGFyZWE7XG5cdFx0XHR0aGlzLmVsdEhpZ2xpZ2h0LnBvc2l0aW9uID0gcG9zaXRpb247XG5cdFx0fSBjYXRjaCAoZSkge31cblx0fVxuXG5cdF9wcm9ncmVzc0ZyYWdtZW50KGV2ZW50KSB7XG5cdFx0dHJ5IHtcblx0XHRcdGxldCBwcm9wZXJ0aWVzID0gbnVsbFxuXHRcdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdmcmFnbWVudHNob3duJykge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9ICtldmVudC5mcmFnbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtaW5kZXgnKTtcblx0XHRcdFx0cHJvcGVydGllcyA9IHRoaXMucG9zaXRpb25BcnJheVtpbmRleCArIDFdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9ICtldmVudC5mcmFnbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtaW5kZXgnKTtcblx0XHRcdFx0cHJvcGVydGllcyA9IHRoaXMucG9zaXRpb25BcnJheVtpbmRleF07XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXByb3BlcnRpZXMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9hcHBseVByb3BlcnRpZXMocHJvcGVydGllcyk7XG5cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGUpXG5cdFx0fVxuXHR9XG5cblx0X2xpc3RlbkZyYWdtZW50cygpIHtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRzaG93bicsIHRoaXMuX3Byb2dyZXNzRnJhZ21lbnQuYmluZCh0aGlzKSk7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZyYWdtZW50aGlkZGVuJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdF91bnJlZ2lzdGVyRnJhZ21lbnRzKCkge1xuXHRcdFJldmVhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmcmFnbWVudHNob3duJywgdGhpcy5fcHJvZ3Jlc3NGcmFnbWVudC5iaW5kKHRoaXMpKTtcblx0XHRSZXZlYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZnJhZ21lbnRoaWRkZW4nLCB0aGlzLl9wcm9ncmVzc0ZyYWdtZW50LmJpbmQodGhpcykpO1xuXHR9XG5cblxufSIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHtSZXZlYWxFbmdpbmVFdmVudHN9IGZyb20gJy4vcHJlei9yZXZlYWxFbmdpbmVFdmVudHMuanMnO1xuXG5cbihmdW5jdGlvbiAoKSB7XG5cblxuICAgIGZ1bmN0aW9uIHBhZ2VMb2FkKCkge1xuICAgICAgICBuZXcgUmV2ZWFsRW5naW5lRXZlbnRzKCk7XG4gICAgfVxuXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHBhZ2VMb2FkKTtcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7XG5cdEhpZ2hsaWdodENvZGVIZWxwZXJcbn0gZnJvbSBcIi4uL2hlbHBlcnMvaGlnaGxpZ2h0Q29kZUhlbHBlci5qc1wiO1xuXG5jb25zdCBMSU5FX0hFSUdIVCA9IDEuMTU7XG5jb25zdCBBRERJVElPTk5BTF9IRUlHVCA9IDAuNDtcbmNvbnN0IENPTF9XSURUSCA9IDM1O1xuY29uc3QgTEVGVF9GSVJTVCA9IFwiNjBweFwiO1xuXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0RXZlbnRzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Ly8gIEJsdWV0b290aDogU2NhbiArIENvbm5lY3Rcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICdjb25uZWN0LWJsZScsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0XHR3aWR0aDogJzYwMHB4Jyxcblx0XHRcdFx0XHRsaW5lOiA1LFxuXHRcdFx0XHRcdGxlZnQ6IExFRlRfRklSU1Rcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDIsXG5cdFx0XHRcdFx0d2lkdGg6ICc5MDBweCcsXG5cdFx0XHRcdFx0bGVmdDogTEVGVF9GSVJTVFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNyxcblx0XHRcdFx0XHR3aWR0aDogJzYwMHB4Jyxcblx0XHRcdFx0XHRsZWZ0OiBMRUZUX0ZJUlNUXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9KTtcblxuXHRcdC8vICBCbGUgQ29kZSBSZWFkIENoYXJhY3RlcmlzdGljXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiAncmVhZC1jaGFyYWN0Jyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHR3aWR0aDogJzcwMHB4Jyxcblx0XHRcdFx0bGluZTogMlxuXHRcdFx0fSwge1xuXHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogNixcblx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGxpbmU6IDgsXG5cdFx0XHRcdG5iTGluZXM6IDIsXG5cdFx0XHRcdHdpZHRoOiAnOTAlJ1xuXHRcdFx0fV1cblx0XHR9KVxuXG5cdFx0Ly8gIEJsZSBDb2RlIFdyaXRlIENoYXJhY3RlcmlzdGljXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiAnd3JpdGUtY2hhcmFjdCcsXG5cdFx0XHQvLyBXZSBzdGFydCB3aXRoIHRoZSBmaXJzdCBmcmFnbWVudCAodGhlIGluaXRpYWwgcG9zaXRpb24gaXMgZml4ZWQgYnkgY3NzKVxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0d2lkdGg6ICc3MDBweCcsXG5cdFx0XHRcdGxpbmU6IDJcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogNCxcblx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHR9LCB7XG5cdFx0XHRcdGxpbmU6IDcsXG5cdFx0XHRcdG5iTGluZXM6IDMsXG5cdFx0XHRcdHdpZHRoOiAnOTAlJ1xuXHRcdFx0fV1cblx0XHR9KVxuXG5cdFx0Ly8gIEJsZSBDb2RlIFJlYWQgQ2hhcmFjdGVyaXN0aWNcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICdub3RpZi1jaGFyYWN0Jyxcblx0XHRcdC8vIFdlIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGZyYWdtZW50ICh0aGUgaW5pdGlhbCBwb3NpdGlvbiBpcyBmaXhlZCBieSBjc3MpXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHR3aWR0aDogJzcwMHB4Jyxcblx0XHRcdFx0bGluZTogMlxuXHRcdFx0fSwge1xuXHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdH0sIHtcblx0XHRcdFx0bGluZTogNixcblx0XHRcdFx0d2lkdGg6ICc5MCUnLFxuXHRcdFx0XHRuYkxpbmVzOiAzXG5cdFx0XHR9XVxuXHRcdH0pXG5cblxuXHRcdC8vIENvZGUgV2ViIFNwZWVjaFxuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdDogJ3dlYi1zcGVlY2gnLFxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0XHR3aWR0aDogJzYwMHB4Jyxcblx0XHRcdFx0XHRsaW5lOiAxXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiAyLFxuXHRcdFx0XHRcdHdpZHRoOiAnNDUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiAzLFxuXHRcdFx0XHRcdHdpZHRoOiAnNTUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHRcdHdpZHRoOiAnNTUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA2LFxuXHRcdFx0XHRcdHdpZHRoOiAnMzUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA3LFxuXHRcdFx0XHRcdHdpZHRoOiAnMzUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA4LFxuXHRcdFx0XHRcdGxlZnQ6ICcyODBweCcsXG5cdFx0XHRcdFx0d2lkdGg6ICc1MDBweCdcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXG5cdFx0Ly8gQ29kZSBXZWIgU3BlZWNoIEdyYW1tYXJcblx0XHRuZXcgSGlnaGxpZ2h0Q29kZUhlbHBlcih7XG5cdFx0XHRrZXlFbHQ6ICd3ZWItc3BlZWNoLWdyYW1tYXInLFxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0XHR3aWR0aDogJzEyMDBweCcsXG5cdFx0XHRcdFx0bGluZTogMVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogMyxcblx0XHRcdFx0XHR3aWR0aDogJzc1MHB4J1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNCxcblx0XHRcdFx0XHR3aWR0aDogJzcwMHB4J1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNSxcblx0XHRcdFx0XHR3aWR0aDogJzY1MHB4J1xuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHQvLyBDb2RlIFdlYiBTcGVlY2ggU3ludGhlc2lzXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiAnd2ViLXNwZWVjaC1zeW50aGVzaXMnLFxuXHRcdFx0cG9zaXRpb25BcnJheTogW3tcblx0XHRcdFx0XHR3aWR0aDogJzkwMHB4Jyxcblx0XHRcdFx0XHRsaW5lOiAxXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiAyLFxuXHRcdFx0XHRcdHdpZHRoOiAnNDAwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiAzLFxuXHRcdFx0XHRcdHdpZHRoOiAnNDAwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHRcdHdpZHRoOiAnNDUwcHgnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA1LFxuXHRcdFx0XHRcdHdpZHRoOiAnNjAwcHgnXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9KTtcblxuXHRcdC8vIENvZGUgaW1hZ2UgY2FwdHVyZSB6b29tXG5cdFx0bmV3IEhpZ2hsaWdodENvZGVIZWxwZXIoe1xuXHRcdFx0a2V5RWx0OiAnaW1hZ2UtY2FwdHVyZS16b29tJyxcblx0XHRcdHBvc2l0aW9uQXJyYXk6IFt7XG5cdFx0XHRcdFx0d2lkdGg6ICc5MCUnLFxuXHRcdFx0XHRcdGxpbmU6IDFcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDMsXG5cdFx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaW5lOiA0LFxuXHRcdFx0XHRcdHdpZHRoOiAnOTAlJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNixcblx0XHRcdFx0XHR3aWR0aDogJzkwJSdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxpbmU6IDcsXG5cdFx0XHRcdFx0d2lkdGg6ICc5MCUnXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9KTtcblxuXHRcdC8vIENvZGUgaW1hZ2UgY2FwdHVyZVxuXHRcdG5ldyBIaWdobGlnaHRDb2RlSGVscGVyKHtcblx0XHRcdGtleUVsdDogXCJpbWFnZS1jYXB0dXJlXCIsXG5cdFx0XHRwb3NpdGlvbkFycmF5OiBbe1xuXHRcdFx0XHRcdHdpZHRoOiBcIjkwJVwiLFxuXHRcdFx0XHRcdGxpbmU6IDUsXG5cdFx0XHRcdFx0bGVmdDogTEVGVF9GSVJTVFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGluZTogNyxcblx0XHRcdFx0XHRsZWZ0OiBMRUZUX0ZJUlNULFxuXHRcdFx0XHRcdHdpZHRoOiBcIjkwJVwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9KTtcblxuXHR9XG59XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7XG5cdEhpZ2hsaWdodEV2ZW50c1xufSBmcm9tICcuL2hpZ2hsaWdodEV2ZW50cy5qcyc7XG5pbXBvcnQge1xuXHRCbGVQcmV6Q29udHJvbGVyXG59IGZyb20gJy4uL3NlbnNvcnMvYmxlUHJlekNvbnRyb2xlci5qcyc7XG5pbXBvcnQge1xuXHRWb2ljZVJlY29nbml0aW9uQ29udHJvbGVyXG59IGZyb20gJy4uL3NlbnNvcnMvdm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlci5qcyc7XG5pbXBvcnQge1xuXHRTcGVlY2hTeW50aGVzaXNDb250cm9sZXJcbn0gZnJvbSAnLi4vc2Vuc29ycy9zcGVlY2hTeW50aGVzaXNDb250cm9sZXIuanMnO1xuaW1wb3J0IHtcblx0SW1hZ2VDYXB0dXJlQ29udHJvbGVyXG59IGZyb20gJy4uL3NlbnNvcnMvaW1hZ2VDYXB0dXJlLmpzJztcblxuXG5leHBvcnQgY2xhc3MgUmV2ZWFsRW5naW5lRXZlbnRzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRsZXQgaW5JRnJhbWUgPSB3aW5kb3cudG9wICE9IHdpbmRvdy5zZWxmO1xuXG5cdFx0Ly8gTWFuYWdlbWVudCBvZiBhY3Rpb25zIGluIHByZXogbW9kZSAobm90IGluIHByZXZpZXcgbW9kZSlcblx0XHRpZiAoIWluSUZyYW1lKSB7XG5cdFx0XHQvLyBJbml0IGFsbCBibGUgYWN0aW9uc1xuXHRcdFx0dGhpcy5fYmxlUHJlekNvbnRyb2xlciA9IG5ldyBCbGVQcmV6Q29udHJvbGVyKCk7XG5cdFx0XHR0aGlzLl9ibGVFdmVudHMoKTtcblxuXHRcdFx0Ly8gSW5pdCBWb2ljZSBhbmQgU3BlZWNoIGNvbnRyb2xlcnNcblx0XHRcdHRoaXMudm9pY2VSZWNvZ25pdGlvbiA9IG5ldyBWb2ljZVJlY29nbml0aW9uQ29udHJvbGVyKCk7XG5cdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcyA9IG5ldyBTcGVlY2hTeW50aGVzaXNDb250cm9sZXIoKTtcblx0XHRcdHRoaXMuX3ZvaWNlRXZlbnRzKCk7XG5cblx0XHRcdC8vIEluaXQgIEltYWdlIENhcHR1cmVcblx0XHRcdHRoaXMuX2ltYWdlQ2FwdHVyZUV2ZW50cygpO1xuXHRcdH1cblxuXHRcdC8vIEluIGFsIGNhc2Ugd2UgaW5pdCB0aGUgaGlnaGxpZ2h0IG9mIGNvZGUuXG5cdFx0dGhpcy5faW5pdEhpZ2hsaWdodENvZGUoKTtcblxuXHR9XG5cblx0X2ltYWdlQ2FwdHVyZUV2ZW50cygpIHtcblx0XHRsZXQgaW1hZ2VDYXB0dXJlQ29udHJvbGxlciA9IG51bGw7XG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3AtaW1hZ2UtY2FwdHVyZS1kZW1vJywgZXZlbnQgPT4ge1xuXHRcdFx0aWYgKGltYWdlQ2FwdHVyZUNvbnRyb2xsZXIpIHtcblx0XHRcdFx0aW1hZ2VDYXB0dXJlQ29udHJvbGxlci5fZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdpbWFnZS1jYXB0dXJlLWRlbW8nLCBldmVudCA9PiB7XG5cdFx0XHRpbWFnZUNhcHR1cmVDb250cm9sbGVyID0gbmV3IEltYWdlQ2FwdHVyZUNvbnRyb2xlcigpO1xuXHRcdH0pO1xuXG5cdH1cblxuXHRfYmxlRXZlbnRzKCkge1xuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdzdG9wLWNvZGUtcmVhZC1jaGFyYWN0JywgZXZlbnQgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX2JsZVByZXpDb250cm9sZXIuX2N1cnJlbnRCbGVEZXZpY2UpIHtcblx0XHRcdFx0dGhpcy5fYmxlUHJlekNvbnRyb2xlci5fY3VycmVudEJsZURldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcblx0XHRcdH1cblx0XHR9KVxuXHRcdFJldmVhbC5hZGRFdmVudExpc3RlbmVyKCdkaXNjb25uZWN0LWhlYXJ0LXJhdGUtc2Vuc29yJywgZXZlbnQgPT4ge1xuXHRcdFx0Ly8gVHJ5IHRvIGRpc2Nvbm5lY3QgaGVhcnQgcmF0ZSBzZW5zb3Jcblx0XHRcdGlmIChmcmFtZXNbMF0uaGVhcnRSYXRlU2Vuc29yLmRldmljZSkge1xuXHRcdFx0XHRmcmFtZXNbMF0uaGVhcnRSYXRlU2Vuc29yLmRldmljZS5nYXR0LmRpc2Nvbm5lY3QoKTtcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0X3ZvaWNlRXZlbnRzKCkge1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29nbGUtYXNzaXN0YW50JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfID0+IHtcblx0XHRcdHRoaXMuX3ZvaWNlQ2FsbEJhY2soKTtcblx0XHR9KTtcblx0XHRSZXZlYWwuYWRkRXZlbnRMaXN0ZW5lcignZW5kLXJlY29nbml0aW9uJywgXyA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aGlzLnZvaWNlUmVjb2duaXRpb24uc3RvcCgpO1xuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9KVxuXHR9XG5cblx0X3ZvaWNlQ2FsbEJhY2soKSB7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbW9TcGVlY2gnKS5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cdFx0dGhpcy52b2ljZVJlY29nbml0aW9uLnN0YXJ0KChmaW5hbFN0cikgPT4ge1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZWVjaF9pbnB1dCcpLmlubmVySFRNTCA9IGZpbmFsU3RyO1xuXHRcdFx0aWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ8OnYSB2YScpKSB7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vU3BlZWNoJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xuXHRcdFx0XHRcdFx0dmFsdWU6ICdqZSB2YWlzIHRyw6hzIGJpZW4gbWVyY2kuIENvbW1lbnQgc2UgcGFzc2UgdGEgY29uZsOpcmVuY2UgPyBGcmFuw6dvaXMgZXN0LWlsIGdlbnRpbCBhdmVjIHRvaSA/J1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oXyA9PiB0aGlzLl92b2ljZUNhbGxCYWNrLmJpbmQodGhpcykpXG5cdFx0XHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKGZpbmFsU3RyLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2FuZ2xhaXMnKSkge1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0XHR2YWx1ZTogJ2hlbGxvIGV2ZXJ5IG9uZSwgd2VsY29tZSB0byB0aGUgYmVzdCB0YWxrIG9mIHRoaXMgZXZlbnQgIScsXG5cdFx0XHRcdFx0XHRsYW5nRnI6IGZhbHNlXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbihfID0+IHRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygndm9peCcpKSB7XG5cdFx0XHRcdHRoaXMuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHtcblx0XHRcdFx0XHRcdHZhbHVlOiAnY29tbWUgw6dhIGNcXCdlc3QgYXNzZXogYml6YXJyZSBwb3VyIHRvaSA/Jyxcblx0XHRcdFx0XHRcdHBpdGNoOiAyLFxuXHRcdFx0XHRcdFx0cmF0ZTogMC4zXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbihfID0+IHRoaXMuX3ZvaWNlQ2FsbEJhY2suYmluZCh0aGlzKSlcblx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSBpZiAoZmluYWxTdHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc29tbWVzLW5vdXMnKSkge1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0XHR2YWx1ZTogJ1ZveW9ucyBGcmFuw6dvaXMsIG5vdXMgc29tbWVzIGRhbnMgdGEgc2Vzc2lvbiwgamUgdHJvdXZlIHF1ZSB0dSBuXFwnYXMgcGFzIGxcXCdhaXIgdHLDqHMgcsOpdmVpbGzDqSdcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKF8gPT4gdGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChmaW5hbFN0ci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdzdWl2YW50JykpIHtcblx0XHRcdFx0dGhpcy5zcGVlY2hTeW50aGVzaXMuc3BlYWsoe1xuXHRcdFx0XHRcdFx0dmFsdWU6ICdUcsOocyBiaWVuIHBhc3NvbnMgYXUgc2xpZGUgc3VpdmFudCdcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKF8gPT4gUmV2ZWFsLm5leHQoKSlcblx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCB1bmtub3dBcnJheSA9IFtcblx0XHRcdFx0XHQnQXJ0aWN1bGUgc1xcJ2lsIHRlIHBsYWl0Jyxcblx0XHRcdFx0XHQnS2Ftb3Vsb3ggIScsXG5cdFx0XHRcdFx0J1R1IHBvdXJyYWlzIGZhaXJlIHVuIGVmZm9ydCBxdWFuZCBtw6ptZScsXG5cdFx0XHRcdFx0J1JldGlyZSB0b24gY2hld2luZyBndW0gYXZhbnQgZGUgcGFybGVyJ1xuXHRcdFx0XHRdO1xuXHRcdFx0XHR0aGlzLnNwZWVjaFN5bnRoZXNpcy5zcGVhayh7XG5cdFx0XHRcdFx0XHR2YWx1ZTogdW5rbm93QXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5rbm93QXJyYXkubGVuZ3RoKV1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKF8gPT4gdGhpcy5fdm9pY2VDYWxsQmFjay5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblxuXHRfaW5pdEhpZ2hsaWdodENvZGUoKSB7XG5cblx0XHRuZXcgSGlnaGxpZ2h0RXZlbnRzKCk7XG5cdH1cbn0iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7XG5cdE15b0NvbnRyb2xlclxufSBmcm9tICcuLi93ZWJibHVldG9vdGgvbXlvQ29udHJvbGVyLmpzJztcbmltcG9ydCB7XG5cdE1Cb3Rcbn0gZnJvbSAnLi4vd2ViYmx1ZXRvb3RoL21ib3RDb250cm9sZXIuanMnO1xuXG5leHBvcnQgY2xhc3MgQmxlUHJlekNvbnRyb2xlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0dGhpcy5fY3VycmVudEJsZURldmljZSA9IG51bGw7XG5cdFx0dGhpcy5fYmFzaWNCbGVCaW5kaW5nKCk7XG5cdFx0Ly90aGlzLl9teW9CaW5kaW5nKCk7XG5cdFx0Ly8gSnVzdCBjb21tZW50IG1ib3QgcGFydCBiZWNhdXNlIGl0IGNhbiBhbHdheXMgYmUgdXNlZnVsbCAhXG5cdFx0Ly90aGlzLl9tYm90QmluZGluZygpO1xuXHR9XG5cblx0X2Jhc2ljQmxlQmluZGluZygpIHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ubmVjdEJsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuXG5cdFx0XHRjb25zdCBmaWx0ZXJzID0ge1xuXHRcdFx0XHRmaWx0ZXJzOiBbe1xuXHRcdFx0XHRcdHNlcnZpY2VzOiBbJ2JhdHRlcnlfc2VydmljZSddXG5cdFx0XHRcdH1dXG5cdFx0XHR9O1xuXHRcdFx0bmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKGZpbHRlcnMpXG5cdFx0XHRcdC50aGVuKGRldmljZSA9PiBkZXZpY2UuZ2F0dC5jb25uZWN0KCkpXG5cdFx0XHRcdC50aGVuKHNlcnZlciA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ0JsdWV0b290aCBkZXZpY2UgaXMgY29ubmVjdGVkLicpO1xuXHRcdFx0XHRcdHRoaXMuX2N1cnJlbnRCbGVEZXZpY2UgPSBzZXJ2ZXIuZGV2aWNlO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVhZENoYXJhY3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcblxuXHRcdFx0dGhpcy5fY3VycmVudEJsZURldmljZS5nYXR0LmdldFByaW1hcnlTZXJ2aWNlKCdiYXR0ZXJ5X3NlcnZpY2UnKVxuXHRcdFx0XHQudGhlbihzZXJ2aWNlID0+IHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWMoJ2JhdHRlcnlfbGV2ZWwnKSlcblx0XHRcdFx0LnRoZW4oY2hhcmFjdGVyaXN0aWMgPT4gY2hhcmFjdGVyaXN0aWMucmVhZFZhbHVlKCkpXG5cdFx0XHRcdC50aGVuKHZhbHVlID0+IHtcblx0XHRcdFx0XHRjb25zdCBiYXR0ZXJ5TGV2ZWwgPSB2YWx1ZS5nZXRVaW50OCgwKTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhgQmF0dGVyeSBwZXJjZW50YWdlIGlzICR7YmF0dGVyeUxldmVsfSUuYCk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0X215b0JpbmRpbmcoKSB7XG5cdFx0bGV0IGxhc3REb3VibGVUYXAgPSAwO1xuXHRcdGxldCBteW8gPSBuZXcgTXlvQ29udHJvbGVyKCk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RNeW8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuXHRcdFx0aWYgKCFteW8uY29ubmVjdGVkKSB7XG5cdFx0XHRcdG15by5yZXF1ZXN0KClcblx0XHRcdFx0XHQudGhlbihfID0+IG15by5jb25uZWN0KCkpXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4gbXlvLmluaXQoKSlcblx0XHRcdFx0XHQudGhlbigoKSA9PiBteW8ucmVnaXN0ZXJHZXN0dXJlcygoZ2VzdHVyZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGdlc3R1cmUgJiYgZ2VzdHVyZS5nZXN0dXJlID09PSAnZG91YmxlLXRhcCcpIHtcblx0XHRcdFx0XHRcdFx0aWYgKERhdGUubm93KCkgLSBsYXN0RG91YmxlVGFwIDwgMjAwMCkge1xuXHRcdFx0XHRcdFx0XHRcdFJldmVhbC5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0bGFzdERvdWJsZVRhcCA9IERhdGUubm93KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0UmV2ZWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Rpc2Nvbm5lY3QtbXlvJywgXyA9PiB7XG5cdFx0XHRteW8uZGlzY29ubmVjdCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0X21ib3RCaW5kaW5nKCkge1xuXHRcdC8vIENoZWNrIHRoZSBjb25uZWN0aW9uXG5cdFx0bGV0IHN0ZXBDb25uZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvbm5lY3RNQm90Jyk7XG5cdFx0bGV0IHN0ZXBDb250cm9sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcnQtYnV0dG9uLW1ib3QnKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbm5lY3RNQm90XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXyA9PiB7XG5cdFx0XHQvLyBSZXF1ZXN0IHRoZSBkZXZpY2Vcblx0XHRcdGxldCBtQm90ID0gbmV3IE1Cb3QoKTtcblx0XHRcdG1Cb3QucmVxdWVzdCgpXG5cdFx0XHRcdC50aGVuKF8gPT4ge1xuXHRcdFx0XHRcdC8vIENvbm5lY3QgdG8gdGhlIG1ib3Rcblx0XHRcdFx0XHRyZXR1cm4gbUJvdC5jb25uZWN0KCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKF8gPT4ge1xuXHRcdFx0XHRcdC8vIENvbm5lY3Rpb24gaXMgZG9uZSwgd2Ugc2hvdyB0aGUgY29udHJvbHNcblx0XHRcdFx0XHRzdGVwQ29ubmVjdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRcdFx0c3RlcENvbnRyb2wuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuXG5cdFx0XHRcdFx0bGV0IHBhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFydC1idXR0b24nKTtcblxuXHRcdFx0XHRcdC8vIENvbnRyb2wgdGhlIHJvYm90IGJ5IGJ1dHRvbnNcblx0XHRcdFx0XHRsZXQgYnRuVXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0blVwJyk7XG5cdFx0XHRcdFx0bGV0IGJ0bkRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbUJvdEJ0bkRvd24nKTtcblx0XHRcdFx0XHRsZXQgYnRuTGVmdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuTGVmdCcpO1xuXHRcdFx0XHRcdGxldCBidG5SaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtQm90QnRuUmlnaHQnKTtcblxuXHRcdFx0XHRcdGJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4ge1xuXHRcdFx0XHRcdFx0bUJvdC5wcm9jZXNzTW90b3IoLTI1MCwgMjUwKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJ0bkRvd24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgXyA9PiB7XG5cdFx0XHRcdFx0XHRtQm90LnByb2Nlc3NNb3RvcigyNTAsIC0yNTApXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfID0+IHtcblx0XHRcdFx0XHRcdG1Cb3QucHJvY2Vzc01vdG9yKDI1MCwgMjUwKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF8gPT4ge1xuXHRcdFx0XHRcdFx0bUJvdC5wcm9jZXNzTW90b3IoLTI1MCwgLTI1MClcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfID0+IHtcblx0XHRcdFx0XHRcdG1Cb3QucHJvY2Vzc01vdG9yKDAsIDApXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnRuRG93bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7XG5cdFx0XHRcdFx0XHRtQm90LnByb2Nlc3NNb3RvcigwLCAwKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJ0bkxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF8gPT4ge1xuXHRcdFx0XHRcdFx0bUJvdC5wcm9jZXNzTW90b3IoMCwgMClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgXyA9PiB7XG5cdFx0XHRcdFx0XHRtQm90LnByb2Nlc3NNb3RvcigwLCAwKVxuXHRcdFx0XHRcdH0pO1xuXG5cblx0XHRcdFx0fSlcblx0XHR9KTtcblx0fVxuXG59IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBjbGFzcyBJbWFnZUNhcHR1cmVDb250cm9sZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7XG4gICAgICAgICAgICAgICAgdmlkZW86IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih0aGlzLl9nb3RNZWRpYS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ2dldFVzZXJNZWRpYSgpIGVycm9yOicsIGVycm9yKSk7XG4gICAgICAgIHRoaXMubWVkaWFTdHJlYW1UcmFjayA9IG51bGw7XG4gICAgICAgIHRoaXMuaW1hZ2VDYXB0dXJlID0gbnVsbDtcblxuICAgICAgICB0aGlzLmJyaWdodG5lc3NFbHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnJpZ2h0bmVzcycpO1xuICAgICAgICB0aGlzLmNvbnRyYXN0RWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyYXN0Jyk7XG4gICAgICAgIHRoaXMuc2F0dXJhdGlvbkVsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXR1cmF0aW9uJyk7XG4gICAgICAgIHRoaXMuc2hhcnBuZXNzRWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJwbmVzcycpO1xuICAgICAgICB0aGlzLmltYWdlQ2FwdHVyZUVsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZUNhcHR1cmUnKTtcblxuXG4gICAgfVxuXG4gICAgX2Rlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhU3RyZWFtVHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWFTdHJlYW1UcmFjay5zdG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIF9nb3RNZWRpYShtZWRpYVN0cmVhbSkge1xuICAgICAgICB0aGlzLm1lZGlhU3RyZWFtVHJhY2sgPSBtZWRpYVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdO1xuICAgICAgICB0aGlzLmltYWdlQ2FwdHVyZSA9IG5ldyBJbWFnZUNhcHR1cmUodGhpcy5tZWRpYVN0cmVhbVRyYWNrKTtcbiAgICAgICAgbGV0IGNvbnN0cmFpbnRzID0gdGhpcy5pbWFnZUNhcHR1cmUudHJhY2suZ2V0Q29uc3RyYWludHMoKTtcbiAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5pbWFnZUNhcHR1cmUudHJhY2suZ2V0U2V0dGluZ3MoKTtcbiAgICAgICAgbGV0IGNhcGFiaWxpdGllcyA9IHRoaXMuaW1hZ2VDYXB0dXJlLnRyYWNrLmdldENhcGFiaWxpdGllcygpO1xuICAgICAgICBmb3IgKGxldCBjYXBhYmlsaXR5TmFtZSBpbiBjYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgICAgIGxldCBjYXBhYmlsaXR5ID0gY2FwYWJpbGl0aWVzW2NhcGFiaWxpdHlOYW1lXTtcbiAgICAgICAgICAgIGlmIChjYXBhYmlsaXR5LnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IE1lZGlhU2V0dGluZ3NSYW5nZV0nKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gc2V0dGluZ3NbY2FwYWJpbGl0eU5hbWVdO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2FwYWJpbGl0eU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYnJpZ2h0bmVzcyc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0UmFuZ2UodGhpcy5icmlnaHRuZXNzRWx0LCBjYXBhYmlsaXR5TmFtZSwgdmFsdWUsIGNhcGFiaWxpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRyYXN0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRSYW5nZSh0aGlzLmNvbnRyYXN0RWx0LCBjYXBhYmlsaXR5TmFtZSwgdmFsdWUsIGNhcGFiaWxpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NhdHVyYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5pdFJhbmdlKHRoaXMuc2F0dXJhdGlvbkVsdCwgY2FwYWJpbGl0eU5hbWUsIHZhbHVlLCBjYXBhYmlsaXR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzaGFycG5lc3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5pdFJhbmdlKHRoaXMuc2hhcnBuZXNzRWx0LCBjYXBhYmlsaXR5TmFtZSwgdmFsdWUsIGNhcGFiaWxpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pbWFnZUNhcHR1cmUpO1xuICAgICAgICB0aGlzLmltYWdlQ2FwdHVyZUVsdC5zcmNPYmplY3QgPSBtZWRpYVN0cmVhbTtcbiAgICB9XG5cbiAgICBfaW5pdFJhbmdlKGNhcGFiaWxpdHlFbHQsIGNhcGFiaWxpdHlOYW1lLCB2YWx1ZSwgcmFuZ2UpIHtcbiAgICAgICAgY2FwYWJpbGl0eUVsdC5taW4gPSByYW5nZS5taW47XG4gICAgICAgIGNhcGFiaWxpdHlFbHQubWF4ID0gcmFuZ2UubWF4O1xuICAgICAgICBjYXBhYmlsaXR5RWx0LnN0ZXAgPSBNYXRoLnJvdW5kKHJhbmdlLnN0ZXAgKiAxMDApIC8gMTAwO1xuICAgICAgICBjYXBhYmlsaXR5RWx0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGNhcGFiaWxpdHlFbHQuc2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnLCBjYXBhYmlsaXR5TmFtZSk7XG4gICAgICAgIGNhcGFiaWxpdHlFbHQub25pbnB1dCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIG9wdGlvbnNbY2FwYWJpbGl0eU5hbWVdID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlDb25zdHJhaW50cyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgX2FwcGx5Q29uc3RyYWludHMob3B0aW9ucykge1xuICAgICAgICB0aGlzLmltYWdlQ2FwdHVyZS50cmFjay5hcHBseUNvbnN0cmFpbnRzKHtcbiAgICAgICAgICAgICAgICBhZHZhbmNlZDogW29wdGlvbnNdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oXyA9PiB7fSk7XG4gICAgfVxuXG4gICAgX2NoYW5nZUNvbnN0cmFpbnQoYnJpZ2h0bmVzc1ZhbHVlLCBjb250cmFzdFZhbHVlLCBzYXR1cmF0aW9uVmFsdWUsIHNoYXJwbmVzc1ZhbHVlKSB7XG4gICAgICAgIG1lZGlhU3RyZWFtVHJhY2suYXBwbHlDb25zdHJhaW50cyh7XG4gICAgICAgICAgICAgICAgYWR2YW5jZWQ6IFt7XG4gICAgICAgICAgICAgICAgICAgIGJyaWdodG5lc3M6IGJyaWdodG5lc3NWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uc3RyYXN0OiBjb250cmFzdFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHNoYXJwbmVzczogc2hhcnBuZXNzVmFsdWVcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdVaCwgb2gsIGFwcGx5Q29uc3RyYWludHMoKSBlcnJvcjonLCBlcnJvcikpO1xuICAgIH1cbn0iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNsYXNzIFNwZWVjaFN5bnRoZXNpc0NvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnN5bnRoID0gd2luZG93LnNwZWVjaFN5bnRoZXNpcztcblxuICAgICAgICB0aGlzLnZvaWNlRlIgPSBudWxsO1xuICAgICAgICB0aGlzLnZvaWNlRU4gPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICBfY29uZmlndXJlKCl7XG4gICAgICAgIHRoaXMuX3BvcHVsYXRlVm9pY2VMaXN0KCk7XG4gICAgICAgIGlmIChzcGVlY2hTeW50aGVzaXMub252b2ljZXNjaGFuZ2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNwZWVjaFN5bnRoZXNpcy5vbnZvaWNlc2NoYW5nZWQgPSB0aGlzLl9wb3B1bGF0ZVZvaWNlTGlzdC5iaW5kKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3BvcHVsYXRlVm9pY2VMaXN0KCkge1xuICAgICAgICBsZXQgdm9pY2VzID0gdGhpcy5zeW50aC5nZXRWb2ljZXMoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2b2ljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh2b2ljZXNbaV0ubGFuZyA9PT0gJ2ZyLUZSJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMudm9pY2VGUiA9IHZvaWNlc1tpXTtcbiAgICAgICAgICAgIH1lbHNlIGlmICh2b2ljZXNbaV0ubGFuZyA9PT0gJ2VuLUdCJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCIlcywgJU8gXCIsIHZvaWNlc1tpXS5sYW5nLCB2b2ljZXNbaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMudm9pY2VFTiA9IHZvaWNlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNwZWFrKHt2YWx1ZSwgbGFuZ0ZyID0gdHJ1ZSwgcGl0Y2ggPSAxLCByYXRlID0gMX0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+e1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMudm9pY2VGUikge1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHV0dGVyVGhpcyA9IG5ldyBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UodmFsdWUpO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnZvaWNlID0gbGFuZ0ZyID8gdGhpcy52b2ljZUZSIDogdGhpcy52b2ljZUVOO1xuICAgICAgICAgICAgdXR0ZXJUaGlzLnBpdGNoID0gcGl0Y2g7XG4gICAgICAgICAgICB1dHRlclRoaXMucmF0ZSA9IHJhdGU7XG4gICAgICAgICAgICB1dHRlclRoaXMub25lbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN5bnRoLnNwZWFrKHV0dGVyVGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgY2xhc3MgVm9pY2VSZWNvZ25pdGlvbkNvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBsZXQgU3BlZWNoUmVjb2duaXRpb24gPSBTcGVlY2hSZWNvZ25pdGlvbiB8fCB3ZWJraXRTcGVlY2hSZWNvZ25pdGlvblxuICAgICAgICBcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbiA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xuICAgICAgICB0aGlzLl9jb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICBzdGFydChjYWxsYmFjayl7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ub25yZXN1bHQgPSAoZXZlbnQpPT57XG4gICAgICAgICAgICBjb25zdCBmaW5hbFN0ciA9IGV2ZW50LnJlc3VsdHNbMF1bMF0udHJhbnNjcmlwdDtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ0NvbmZpZGVuY2U6ICcgKyBmaW5hbFN0cik7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZpbmFsU3RyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgc3RvcCgpe1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKTtcbiAgICB9XG5cbiAgICBfY29uZmlndXJlKCl7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24ubGFuZyA9ICdmci1GUic7XG5cbiAgICAgICAgLy8gV2UgZGV0ZWN0IGVuZFxuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZW5kID0gXz0+e1xuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnRW5kIG9mIHJlY29nbml0aW9uJyk7XG4gICAgICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gV2UgZGV0ZWN0IGVycm9yc1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5lcnJvciA9PSAnbm8tc3BlZWNoJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ05vIFNwZWVjaCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdhdWRpby1jYXB0dXJlJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ05vIG1pY3JvcGhvbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yID09ICdub3QtYWxsb3dlZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdOb3QgQWxsb3dlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9OyAgICAgXG4gICAgfVxuXG5cbn0iLCIndXNlIHN0cmljdCdcbi8qKlxuICogQ29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9iaW5vbWVkL21ib3Qtd2ViYmx1ZXRvb3RoXG4gKiBcbiAqL1xuXG5cbmNvbnN0IERFVklDRV9OQU1FID0gXCJNYWtlYmxvY2tfTEVcIixcbiAgICBTRVJWSUNFX1VVSUQgPSBcIjAwMDBmZmUxLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiLFxuICAgIENIQVJBQ1RFUklTVElDX1VVSUQgPSBcIjAwMDBmZmUzLTAwMDAtMTAwMC04MDAwLTAwODA1ZjliMzRmYlwiO1xuXG4vKipcbiAqIEdlbmVyYWwgY29uZmlndXJhdGlvbiAoVVVJRClcbiovXG5jbGFzcyBDb25maWcge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmFtZSgpIHsgcmV0dXJuIFwiTWFrZWJsb2NrX0xFXCI7IH1cbiAgICBzZXJ2aWNlKCkgeyByZXR1cm4gXCIwMDAwZmZlMS0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmJcIiB9XG4gICAgY2hhcmF0ZXJpc3RpYygpIHsgcmV0dXJuIFwiMDAwMGZmZTMtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiXCIgfVxufVxuXG4vLyBDb25zdCBmb3IgaW5zdHJ1Y3Rpb25zIHR5cGVzXG5jb25zdCBUWVBFX01PVE9SID0gMHgwYSxcbiAgICBUWVBFX1JHQiA9IDB4MDgsXG4gICAgVFlQRV9TT1VORCA9IDB4MDc7XG5cblxuLy8gQ29uc3QgZm9yIHRoZSBwb3J0c1xuY29uc3QgUE9SVF8xID0gMHgwMSxcbiAgICBQT1JUXzIgPSAweDAyLFxuICAgIFBPUlRfMyA9IDB4MDMsXG4gICAgUE9SVF80ID0gMHgwNCxcbiAgICBQT1JUXzUgPSAweDA1LFxuICAgIFBPUlRfNiA9IDB4MDYsXG4gICAgUE9SVF83ID0gMHgwNyxcbiAgICBQT1JUXzggPSAweDA4LFxuICAgIE1fMSA9IDB4MDksXG4gICAgTV8yID0gMHgwYTtcbiAgICBcblxuLyoqXG4gKiBDbGFzcyBmb3IgdGhlIHJvYm90XG4gKiAqL1xuZXhwb3J0IGNsYXNzIE1Cb3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRldmljZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdGVkID0gdGhpcy5vbkRpc2Nvbm5lY3RlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJ1enplckluZGV4ID0gMDtcbiAgICB9XG5cbiAgICAvKlxuICAgIFJlcXVlc3QgdGhlIGRldmljZSB3aXRoIGJsdWV0b290aFxuICAgICovXG4gICAgcmVxdWVzdCgpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcImZpbHRlcnNcIjogW3tcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogdGhpcy5jb25maWcubmFtZSgpXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFwib3B0aW9uYWxTZXJ2aWNlc1wiOiBbdGhpcy5jb25maWcuc2VydmljZSgpXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihkZXZpY2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCB0aGlzLm9uRGlzY29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGV2aWNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29ubmVjdCB0byB0aGUgZGV2aWNlXG4gICAgICogKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udHJvbCB0aGUgbW90b3JzIG9mIHJvYm90XG4gICAgKi9cbiAgICBwcm9jZXNzTW90b3IodmFsdWVNMSwgdmFsdWVNMikge1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVDaGFyYWN0ZXJpc3RpYyh0aGlzLl9nZW5lcmljQ29udHJvbChUWVBFX01PVE9SLCBNXzEsIDAsIHZhbHVlTTEpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfTU9UT1IsIE1fMiwgMCwgdmFsdWVNMikpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcm9jZXNzQnV6emVyKCkge1xuICAgICAgICB0aGlzLmJ1enplckluZGV4ID0gKHRoaXMuYnV6emVySW5kZXggKyAxKSAlIDg7XG4gICAgICAgIHJldHVybiB0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfU09VTkQsIFBPUlRfMiwgMjIsIHRoaXMuYnV6emVySW5kZXgpKVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwcm9jZXNzQ29sb3IocmVkLGJsdWUsZ3JlZW4pe1xuICAgICAgICBsZXQgckhleCA9IHJlZDw8ODtcblx0XHRsZXQgZ0hleCA9IGdyZWVuPDwxNjtcblx0XHRsZXQgYkhleCA9IGJsdWU8PDI0O1xuXHRcdGxldCB2YWx1ZSA9IHJIZXggfCBnSGV4IHwgYkhleDtcblx0XHR0aGlzLl93cml0ZUNoYXJhY3RlcmlzdGljKHRoaXMuX2dlbmVyaWNDb250cm9sKFRZUEVfUkdCLFBPUlRfNiwwLHZhbHVlKSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZSBpcyBkaXNjb25uZWN0ZWQuJyk7XG4gICAgfVxuXG5cbiAgICBfZ2VuZXJpY0NvbnRyb2wodHlwZSwgcG9ydCwgc2xvdCwgdmFsdWUpIHtcbiAgICAgICAgLypcbiAgICAgICAgZmYgNTUgbGVuIGlkeCBhY3Rpb24gZGV2aWNlIHBvcnQgIHNsb3QgIGRhdGEgYVxuICAgICAgICAwICAxICAyICAgMyAgIDQgICAgICA1ICAgICAgNiAgICAgNyAgICAgOFxuICAgICAgICAqL1xuICAgICAgICAvLyBTdGF0aWMgdmFsdWVzXG4gICAgICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMTYpO1xuICAgICAgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50MTZBcnJheShidWYpO1xuXG4gICAgICAgIHZhciBieXRlMCA9IDB4ZmYsIC8vIFN0YXRpYyBoZWFkZXJcbiAgICAgICAgICAgIGJ5dGUxID0gMHg1NSwgLy8gU3RhdGljIGhlYWRlclxuICAgICAgICAgICAgYnl0ZTIgPSAweDA5LCAvLyBsZW5cbiAgICAgICAgICAgIGJ5dGUzID0gMHgwMCwgLy8gaWR4XG4gICAgICAgICAgICBieXRlNCA9IDB4MDIsIC8vIGFjdGlvblxuICAgICAgICAgICAgYnl0ZTUgPSB0eXBlLCAvLyBkZXZpY2VcbiAgICAgICAgICAgIGJ5dGU2ID0gcG9ydCwgLy8gcG9ydFxuICAgICAgICAgICAgYnl0ZTcgPSBzbG90OyAvLyBzbG90XG4gICAgICAgIC8vZHluYW1pY3MgdmFsdWVzXG4gICAgICAgIHZhciBieXRlOCA9IDB4MDAsIC8vIGRhdGFcbiAgICAgICAgICAgIGJ5dGU5ID0gMHgwMCwgLy8gZGF0YVxuICAgICAgICAgICAgYnl0ZTEwID0gMHgwMCwgLy8gZGF0YVxuICAgICAgICAgICAgYnl0ZTExID0gMHgwMDsgLy8gZGF0YVxuICAgICAgICAvL0VuZCBvZiBtZXNzYWdlXG4gICAgICAgIHZhciBieXRlMTIgPSAweDBhLFxuICAgICAgICAgICAgYnl0ZTEzID0gMHgwMCxcbiAgICAgICAgICAgIGJ5dGUxNCA9IDB4MDAsXG4gICAgICAgICAgICBieXRlMTUgPSAweDAwO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBUWVBFX01PVE9SOlxuICAgICAgICAgICAgICAgIC8vIE1vdG9yIE0xXG4gICAgICAgICAgICAgICAgLy8gZmY6NTUgIDA5OjAwICAwMjowYSAgMDk6NjQgIDAwOjAwICAwMDowMCAgMGFcIlxuICAgICAgICAgICAgICAgIC8vIDB4NTVmZjsweDAwMDk7MHgwYTAyOzB4MDk2NDsweDAwMDA7MHgwMDAwOzB4MDAwYTsweDAwMDA7XG4gICAgICAgICAgICAgICAgLy8gTW90b3IgTTJcbiAgICAgICAgICAgICAgICAvLyBmZjo1NTowOTowMDowMjowYTowYTo2NDowMDowMDowMDowMDowYSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgdGVtcFZhbHVlID0gdmFsdWUgPCAwID8gKHBhcnNlSW50KFwiZmZmZlwiLCAxNikgKyBNYXRoLm1heCgtMjU1LCB2YWx1ZSkpIDogTWF0aC5taW4oMjU1LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnl0ZTcgPSB0ZW1wVmFsdWUgJiAweDAwZmY7XG4gICAgICAgICAgICAgICAgYnl0ZTggPSAweDAwO1xuICAgICAgICAgICAgICAgIGJ5dGU4ID0gdGVtcFZhbHVlID4+IDg7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVFlQRV9SR0I6XG4gICAgICAgICAgICAgICAgLy8gZmY6NTUgIDA5OjAwICAwMjowOCAgMDY6MDAgIDVjOjk5ICA2ZDowMCAgMGFcbiAgICAgICAgICAgICAgICAvLyAweDU1ZmY7MHgwMDA5OzB4MDgwMjsweDAwMDY7MHg5OTVjOzB4MDA2ZDsweDAwMGE7MHgwMDAwO1xuICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMDtcbiAgICAgICAgICAgICAgICBieXRlOCA9IHZhbHVlID4+IDggJiAweGZmO1xuICAgICAgICAgICAgICAgIGJ5dGU5ID0gdmFsdWUgPj4gMTYgJiAweGZmO1xuICAgICAgICAgICAgICAgIGJ5dGUxMCA9IHZhbHVlID4+IDI0ICYgMHhmZjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVFlQRV9TT1VORDpcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjAwOjAwOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjowNjowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6ZWU6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjg4OjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjpiODowMTowYVxuICAgICAgICAgICAgICAgIC8vZmY6NTU6MDU6MDA6MDI6MjI6NWQ6MDE6MGFcbiAgICAgICAgICAgICAgICAvL2ZmOjU1OjA1OjAwOjAyOjIyOjRhOjAxOjBhXG4gICAgICAgICAgICAgICAgLy9mZjo1NTowNTowMDowMjoyMjoyNjowMTowYVxuICAgICAgICAgICAgICAgIGJ5dGUyID0gMHgwNTtcbiAgICAgICAgICAgICAgICBieXRlNSA9IDB4MjI7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgwMDtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweDA2O1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4ZWU7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHg4ODtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTYgPSAweGI4O1xuICAgICAgICAgICAgICAgICAgICBieXRlNyA9IDB4MDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gNSkge1xuICAgICAgICAgICAgICAgICAgICBieXRlNiA9IDB4NWQ7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU3ID0gMHgwMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHg0YTtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ5dGU2ID0gMHgyNjtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZTcgPSAweDAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBieXRlOCA9IDB4MGE7XG4gICAgICAgICAgICAgICAgYnl0ZTEyID0gMHgwMDtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgYnVmVmlld1swXSA9IGJ5dGUxIDw8IDggfCBieXRlMDtcbiAgICAgICAgYnVmVmlld1sxXSA9IGJ5dGUzIDw8IDggfCBieXRlMjtcbiAgICAgICAgYnVmVmlld1syXSA9IGJ5dGU1IDw8IDggfCBieXRlNDtcbiAgICAgICAgYnVmVmlld1szXSA9IGJ5dGU3IDw8IDggfCBieXRlNjtcbiAgICAgICAgYnVmVmlld1s0XSA9IGJ5dGU5IDw8IDggfCBieXRlODtcbiAgICAgICAgYnVmVmlld1s1XSA9IGJ5dGUxMSA8PCA4IHwgYnl0ZTEwO1xuICAgICAgICBidWZWaWV3WzZdID0gYnl0ZTEzIDw8IDggfCBieXRlMTI7XG4gICAgICAgIGJ1ZlZpZXdbN10gPSBieXRlMTUgPDwgOCB8IGJ5dGUxNDtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBieXRlMC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMi50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMy50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNi50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlNy50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlOC50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlOS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTAudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTExLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxMi50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBieXRlMTMudG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnl0ZTE0LnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ5dGUxNS50b1N0cmluZygxNikgKyBcIjpcIlxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGJ1ZlZpZXdbMF0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1sxXS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzJdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbM10udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s0XS50b1N0cmluZygxNikgKyBcIjpcIiArXG4gICAgICAgICAgICBidWZWaWV3WzVdLnRvU3RyaW5nKDE2KSArIFwiOlwiICtcbiAgICAgICAgICAgIGJ1ZlZpZXdbNl0udG9TdHJpbmcoMTYpICsgXCI6XCIgK1xuICAgICAgICAgICAgYnVmVmlld1s3XS50b1N0cmluZygxNilcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICBfd3JpdGVDaGFyYWN0ZXJpc3RpYyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSh0aGlzLmNvbmZpZy5zZXJ2aWNlKCkpXG4gICAgICAgICAgICAudGhlbihzZXJ2aWNlID0+IHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuY2hhcmF0ZXJpc3RpYygpKSlcbiAgICAgICAgICAgIC50aGVuKGNoYXJhY3RlcmlzdGljID0+IGNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUodmFsdWUpKTtcbiAgICB9XG5cblxufVxuXG5cbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBNeW9Db25maWd7XG4gICAgY29uc3RydWN0b3IoKXsgICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBjb250cm9sU2VydmljZSgpIHsgcmV0dXJuIFwiZDUwNjAwMDEtYTkwNC1kZWI5LTQ3NDgtMmM3ZjRhMTI0ODQyXCIgfVxuICAgIGdlc3R1cmVTZXJ2aWNlKCkgeyByZXR1cm4gXCJkNTA2MDAwMy1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XG4gICAgY29tbWFuZENoYXJhY3RlcmlzdGljKCkgeyByZXR1cm4gXCJkNTA2MDQwMS1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XG4gICAgZ2VzdHVyZUNoYXJhY3RlcmlzdGljKCkgeyByZXR1cm4gXCJkNTA2MDEwMy1hOTA0LWRlYjktNDc0OC0yYzdmNGExMjQ4NDJcIiB9XG4gICAgXG5cbn1cblxuZXhwb3J0IGNsYXNzIE15b0NvbnRyb2xlcntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmRldmljZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IE15b0NvbmZpZygpO1xuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdGVkID0gdGhpcy5vbkRpc2Nvbm5lY3RlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZCA9IG5ldyBVaW50OEFycmF5KDUpO1xuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFswXSA9IDB4MDE7IC8vIHNldCBtb2RlXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzFdID0gMHgwMzsgLy8gYnl0ZXMgaW4gcGF5bG9hZFxuICAgICAgICB0aGlzLmVuYWJsZUdlc3R1cmVzQ29tbWFuZFsyXSA9IDB4MDA7IC8vIGVtZyBtb2RlOiBub25lXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzNdID0gMHgwMDsgLy8gaW11IG1vZGU6IGRpc2FibGVkXG4gICAgICAgIHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kWzRdID0gMHgwMTsgLy8gY2xhc3NpZmllciBtb2RlOiBlbmFibGVkXG5cbiAgICAgICAgdGhpcy5kaXNhYmxlR2VzdHVyZXNDb21tYW5kID0gVWludDhBcnJheS5mcm9tKHRoaXMuZW5hYmxlR2VzdHVyZXNDb21tYW5kKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlR2VzdHVyZXNDb21tYW5kWzRdID0gMHgwMDsgLy8gY2xhc3NpZmllciBtb2RlOiBkaXNhYmxlZFxuXG4gICAgICAgIHRoaXMuZGVlcFNsZWVwQ29tbWFuZCA9IG5ldyBVaW50OEFycmF5KDIpO1xuICAgICAgICB0aGlzLmRlZXBTbGVlcENvbW1hbmRbMF0gPSAweDA0OyAvLyBzZXQgbW9kZVxuICAgICAgICB0aGlzLmRlZXBTbGVlcENvbW1hbmRbMV0gPSAweDAwOyAvLyBieXRlcyBpbiBwYXlsb2FkXG5cbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbHRQb3B1cCA9IG51bGw7XG4gICAgICAgIHRoaXNcbiAgICB9XG5cbiAgICAvKlxuICAgIFJlcXVlc3QgdGhlIGRldmljZSB3aXRoIGJsdWV0b290aFxuICAgICovXG4gICAgcmVxdWVzdCgpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBcImZpbHRlcnNcIjogW3tcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VzXCI6IFt0aGlzLmNvbmZpZy5jb250cm9sU2VydmljZSgpXVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBcIm9wdGlvbmFsU2VydmljZXNcIjogW3RoaXMuY29uZmlnLmdlc3R1cmVTZXJ2aWNlKCldXG4gICAgICAgIH07ICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5ibHVldG9vdGgucmVxdWVzdERldmljZShvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4oZGV2aWNlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZS5hZGRFdmVudExpc3RlbmVyKCdnYXR0c2VydmVyZGlzY29ubmVjdGVkJywgdGhpcy5vbkRpc2Nvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRldmljZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbm5lY3QgdG8gdGhlIGRldmljZVxuICAgICAqICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdEZXZpY2UgaXMgbm90IGNvbm5lY3RlZC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldmljZS5nYXR0LmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpbml0KCl7XG4gICAgICAgIGlmKCF0aGlzLmRldmljZSl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbHRQb3B1cCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe3N0YXRlIDogJ2FkZCd9KTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2UuZ2F0dC5nZXRQcmltYXJ5U2VydmljZSh0aGlzLmNvbmZpZy5jb250cm9sU2VydmljZSgpKVxuICAgICAgICAgICAgLnRoZW4oKHNlcnZpY2UpPT57XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IGdldCBNeW8gQ29udHJvbCBTZXJ2aWNlJyk7XG4gICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHRoaXMuY29uZmlnLmNvbW1hbmRDaGFyYWN0ZXJpc3RpYygpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChjaGFyYWN0ZXJpc3RpYyk9PntcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc+IGdldCBNeW8gQ29tbWFuZCBjaGFyYWN0ZXJpc3RpYycpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUodGhpcy5lbmFibGVHZXN0dXJlc0NvbW1hbmQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVhZHkgdG8gbGlzdGVuIGdlc3R1cmVzJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJHZXN0dXJlcyhjYWxsYmFjayl7XG4gICAgICAgIGlmKCF0aGlzLmRldmljZSl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0RldmljZSBpcyBub3QgY29ubmVjdGVkLicpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UodGhpcy5jb25maWcuZ2VzdHVyZVNlcnZpY2UoKSlcbiAgICAgICAgICAgIC50aGVuKHNlcnZpY2U9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPiBHZXQgR2VzdHVyZSBTZXJ2aWNlJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWModGhpcy5jb25maWcuZ2VzdHVyZUNoYXJhY3RlcmlzdGljKCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKGNoYXJhY3RlcmlzdGljKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dldCBnZXN0dXJlIGNhcmFjdGVyaXN0aWMnKVxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljLnN0YXJ0Tm90aWZpY2F0aW9ucygpO1xuICAgICAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYXJhY3RlcmlzdGljdmFsdWVjaGFuZ2VkJywgKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdlc3R1cmUgPSB0aGlzLl9wYXJzZU15b0dlc3R1cmUoZXYudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlc3R1cmUgOiAnLCBnZXN0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGdlc3R1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRGV2aWNlIGlzIG5vdCBjb25uZWN0ZWQuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VQb3B1cEVsdCh7c3RhdGUgOiAncmVtb3ZlJ30pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZVBvcHVwRWx0KHtzdGF0ZSA6ICdyZW1vdmUnfSk7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZXZpY2UgaXMgZGlzY29ubmVjdGVkLicpO1xuICAgIH1cblxuICAgIF9wYXJzZU15b0dlc3R1cmUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlLmdldFVpbnQ4KDApID09PSAweDAzKSB7XG4gICAgICAgICAgICBjb25zdCBnZXN0dXJlVmFsdWUgPSB2YWx1ZS5nZXRVaW50MTYoMSwgdHJ1ZSlcbiAgICAgICAgICAgIGNvbnN0IGdlc3R1cmUgPSB7XG4gICAgICAgICAgICAgICAgMHgwMDAwOiAncmVzdCcsXG4gICAgICAgICAgICAgICAgMHgwMDAxOiAnZmlzdCcsXG4gICAgICAgICAgICAgICAgMHgwMDAyOiAnd2F2ZS1pbicsXG4gICAgICAgICAgICAgICAgMHgwMDAzOiAnd2F2ZS1vdXQnLFxuICAgICAgICAgICAgICAgIDB4MDAwNDogJ2ZpbmdlcnMtc3ByZWFkJyxcbiAgICAgICAgICAgICAgICAweDAwMDU6ICdkb3VibGUtdGFwJyxcbiAgICAgICAgICAgICAgICAweGZmZmY6ICd1bmtub3duJyxcbiAgICAgICAgICAgIH1bZ2VzdHVyZVZhbHVlXVxuICAgICAgICAgICAgdGhpcy5fbWFuYWdlUG9wdXBFbHQoe2dlc3R1cmUgOiBnZXN0dXJlfSk7XG4gICAgICAgICAgICByZXR1cm4geyBnZXN0dXJlIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXN0dXJlOiBudWxsIH1cbiAgICB9XG5cbiAgICBfbWFuYWdlUG9wdXBFbHQoe3N0YXRlPSAnbm9uZScsIGdlc3R1cmUgPSAnbm9uZSd9KXtcbiAgICAgICAgaWYgKHN0YXRlID09PSAncmVtb3ZlJyAmJiB0aGlzLmVsdFBvcHVwKXtcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmVsdFBvcHVwID0gbnVsbDtcbiAgICAgICAgfWVsc2UgaWYgKHN0YXRlID09PSAnYWRkJyl7XG4gICAgICAgICAgICBpZiAodGhpcy5lbHRQb3B1cCl7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHRQb3B1cC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAuY2xhc3NMaXN0LmFkZCgnbXlvLXBvcHVwJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWx0UG9wdXApO1xuICAgICAgICB9ZWxzZSBpZiAodGhpcy5lbHRQb3B1cCAmJiBnZXN0dXJlICYmIGdlc3R1cmUgIT0gJ25vbmUnKXtcbiAgICAgICAgICAgIHRoaXMuZWx0UG9wdXAuY2xhc3NOYW1lID0gYG15by1wb3B1cCAke2dlc3R1cmV9YDtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=
