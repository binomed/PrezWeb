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
			new BlePrezControler();

			// Init Voice and Speech controlers
			new VoiceRecognitionControler();
			new SpeechSynthesisControler();
		}

		// In al case we init the highlight of code.
		this._initHighlightCode();

	}

	

	_initHighlightCode() {

		new HighlightEvents();
	}
}