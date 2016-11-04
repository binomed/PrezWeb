'use strict'
import {MyoControler} from '../webbluetooth/myoControler.js';
import {MBot} from '../webbluetooth/mbotControler.js';

export class BlePrezControler{
	constructor(){
	
		this._currentBleDevice = null;
		this._basicBleBinding();
		this._myoBinding();
		// Just comment mbot part because it can always be usefull !
		//this._mbotBinding();
	}

	_basicBleBinding() {
		document.getElementById('connectBle').addEventListener('click', event => {
			
			const filters = { filters: [{ services: ['battery_service'] }] };
			navigator.bluetooth.requestDevice(filters)
			.then(device => device.gatt.connect())
			.then(server => { 
				console.log('Bluetooth device is connected.');
				this._currentBleDevice = server.device;
			});
		});
		document.getElementById('readCharact').addEventListener('click', event => {
			
			this._currentBleDevice.gatt.getPrimaryService('battery_service')
			.then(service => service.getCharacteristic('battery_level'))
			.then(characteristic => characteristic.readValue())
			.then(value => {
				const batteryLevel = value.getUint8(0);
				console.log(`Battery percentage is ${batteryLevel}%.`);
			});
		});
	}

	_myoBinding(){
		let lastDoubleTap = 0;
		let myo = new MyoController();
		document.getElementById('connectMyo').addEventListener('click', ()=>{
			
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

		Reveal.addEventListener('disconnect-myo', _=>{
			myo.disconnect();
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
