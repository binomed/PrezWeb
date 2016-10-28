'use strict'
import {HighlightEvents} from './highlightEvents.js';
import {MyoControler} from '../sensors/myoControler.js';

export class RevealEngineEvents{
	constructor(){
	
		let inIFrame = window.top != window.self;
	
		this.myo = null;
		if (!inIFrame){
			// Management of actions in prez mode (not in preview mode)
			this._myoBinding();
		}

		// In al case we init the highlight of code.
		this._initHighlightCode();

	}

	_myoBinding(){
		this.myo = new MyoControler();
		let lastDoubleTap = 0;
		document.getElementById('connectMyo').addEventListener('click', ()=>{
			if (this.myo.connected){
				this.myo.connect()
				.then(()=>this.myo.init())
				.then(()=>this.myo.registerGestures((gesture)=>{
					if (gesture && gesture.gesture === 'double-tap'){
						if(Date.now() - lastDoubleTap < 2000){
							Reveal.next();
						}
						lastDoubleTap = Date.now();
					} 
				}));
			}
		});
	}

	_initHighlightCode() {

		new HighlightEvents();
	}
}