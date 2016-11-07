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
		document.getElementById('google-assistant').addEventListener('click', _=>{
			this._voiceCallBack();
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
			if (finalStr.toLowerCase().includes('ça va')){
				document.getElementById('demoSpeech').style.display = 'none';
				this.speechSynthesis.speak({
					value:'je vais très bien merci. Comment se passe ta conférence ? François est-il gentil avec toi ?'
				})
				.then(_=>this._voiceCallBack.bind(this))
				.catch((error)=>{
					console.error(error);
				});
			}else if (finalStr.toLowerCase().includes('anglais')){
				this.speechSynthesis.speak({
					value: 'hello every one, welcome to the best talk of this event !', 
					langFr : false}
				)
				.then(_=>this._voiceCallBack.bind(this))
				.catch((error)=>{
					console.error(error);
				});
			}else if (finalStr.toLowerCase().includes('voix')){
				this.speechSynthesis.speak({
					value: 'comme ça c\'est assez bizarre pour toi ?',
					pitch : 1.5,
					rate : 2}
				)
				.then(_=>this._voiceCallBack.bind(this))
				.catch((error)=>{
					console.error(error);
				});
			}else if (finalStr.toLowerCase().includes('sommes-nous')){
				this.speechSynthesis.speak({
					value: 'Voyons François, nous sommes dans ta session, je trouve que tu n\'as pas l\'air très réveillé'
				})
				.then(_=>this._voiceCallBack.bind(this))
				.catch((error)=>{
					console.error(error);
				});
			}else if (finalStr.toLowerCase().includes('suivant')){
				this.speechSynthesis.speak({
					value: 'Très bien passons au slide suivant'
				})
				.then(_=>Reveal.next())
				.catch((error)=>{
					console.error(error);
				});
			}else{
				let unknowArray = [
					'Articule s\'il te plait',
					'Kamoulox !',
					'Tu pourrais faire un effort quand même',
					'Retire ton chewing gum avant de parler'
				];
				this.speechSynthesis.speak({
					value: unknowArray[Math.floor(Math.random() * unknowArray.length)]
				})
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
