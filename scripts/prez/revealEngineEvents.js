'use strict'
import {HighlightEvents} from './highlightEvents.js';
import {BlePrezControler} from '../sensors/blePrezControler.js';
import {VoiceRecognitionControler} from '../sensors/voiceRecognitionControler.js';
import {SpeechSynthesisControler} from '../sensors/speechSynthesisControler.js';


export class RevealEngineEvents{
	constructor(){
	
		let inIFrame = window.top != window.self;
		
		// Management of actions in prez mode (not in preview mode)
		if (!inIFrame){
			// Init all ble actions
			this._blePrezControler = new BlePrezControler();
			this._bleEvents();

			// Init Voice and Speech controlers
			this.voiceRecognition = new VoiceRecognitionControler();
			this.speechSynthesis = new SpeechSynthesisControler();
			this._voiceEvents();
		}

		// In al case we init the highlight of code.
		this._initHighlightCode();

	}

	_bleEvents(){
		Reveal.addEventListener('stop-code-read-charact', event => {
			if (this._blePrezControler._currentBleDevice) {
				this._blePrezControler._currentBleDevice.gatt.disconnect();
			}
		})
	}

	_voiceEvents(){
		Reveal.addEventListener('recognition', ()=>{
			setTimeout(_=> this._voiceCallBack(),1000);
		});
		Reveal.addEventListener('end-recognition', _=>{
			try{
				this.voiceRecognition.stop();
			}catch(e){}
		})
	}

	_voiceCallBack(){
		document.getElementById('demoSpeech').style.display = '';
		this.voiceRecognition.start((finalStr)=>{
			document.getElementById('speech_input').innerHTML = finalStr;
			if (finalStr.indexOf('hello') != -1){
				document.getElementById('demoSpeech').style.display = 'none';
				this.speechSynthesis.speak('bla bla bla')
				.then(_=>this._voiceCallBack.bind(this))
				.catch((error)=>{
					console.error(error);
				});
			}
		});
	}
	

	_initHighlightCode() {

		new HighlightEvents();
	}
}
