'use strict'
import {MyoControler} from '../webbluetooth/myoControler.js';
import {MBot} from '../webbluetooth/mbotControler.js';

export class BlePrezControler{
	constructor(){
	
		this._myoBinding();
		// Just comment mbot part because it can always be usefull !
		//this._mbotBinding();
	}

	_myoBinding(){
		let lastDoubleTap = 0;
		document.getElementById('connectMyo').addEventListener('click', ()=>{
			
			let myo = new MyoControler();
			if (!myo.connected){
				myo.request()
				.then(_=>myo.connect())
				.then(()=>myo.init())
				.then(()=>myo.registerGestures((gesture)=>{
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

	_mbotBinding(){
		 // Check the connection
		 let stepConnect = document.getElementById('connectMBot');
		 let stepControl = document.getElementById('part-button-mbot'); 
		 document.getElementById("connectMBot").addEventListener('click', _ => {
			// Request the device
			let mBot = new MBot();
			mBot.request()
				.then(_ => {
					// Connect to the mbot
					return mBot.connect();
				})
				.then(_ => {
					// Connection is done, we show the controls
					stepConnect.style.display = "none";
					stepControl.style.display = "flex";

					let partBtn = document.querySelector('.part-button');
					
					// Control the robot by buttons
					let btnUp = document.getElementById('mBotBtnUp');
					let btnDown = document.getElementById('mBotBtnDown');
					let btnLeft = document.getElementById('mBotBtnLeft');
					let btnRight = document.getElementById('mBotBtnRight');

					btnUp.addEventListener('mousedown', _ => { mBot.processMotor(-250, 250) });
					btnDown.addEventListener('mousedown', _ => { mBot.processMotor(250, -250) });
					btnLeft.addEventListener('mousedown', _ => { mBot.processMotor(250, 250) });
					btnRight.addEventListener('mousedown', _ => { mBot.processMotor(-250, -250) });

					btnUp.addEventListener('mouseup', _ => { mBot.processMotor(0, 0) });
					btnDown.addEventListener('mouseup', _ => { mBot.processMotor(0, 0) });
					btnLeft.addEventListener('mouseup', _ => { mBot.processMotor(0, 0) });
					btnRight.addEventListener('mouseup', _ => { mBot.processMotor(0, 0) });
					

				})
		});
	}

}