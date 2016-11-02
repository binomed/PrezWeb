'use strict';
import {Ollie} from '../webbluetooth/ollieControler.js';
import {WebNfcControler} from '../sensors/webNfcControler.js';

export class AppControler{
    constructor(){
        this.ollie = new Ollie();
        this.webNFC = new WebNfcControler();

        this.originalAngle = -1;
        this.ollieControl = {
            power : 0,
            angle : 0
        };

        this._initTabOllie();

        this._initTabWebNFC();

    }

    _initTabOllie(){
        // Hide areas 
        const rowConnectOllie = document.getElementById('rowConnectOllie');
        const rowControlOllie = document.getElementById('rowControlOllie');

        // Btn connection
        document.getElementById('btnConnect').addEventListener('click', ()=>{
            this.ollie.request()
            .then(_=>this.ollie.connect())
            .then(_=>this.ollie.init())
            .then(_=>{
                rowConnectOllie.style.display = 'none';
                rowControlOllie.style.display = '';
            });
        });

        // Basic Control
        document.getElementById('btnUp').addEventListener('touchStart', _=> this.ollie.processMotor(0,50));
        document.getElementById('btnDown').addEventListener('touchStart', _=> this.ollie.processMotor(180,50));
        document.getElementById('btnLeft').addEventListener('touchStart', _=> this.ollie.processMotor(270,50));
        document.getElementById('btnRight').addEventListener('touchStart', _=> this.ollie.processMotor(90,50));
        
        document.getElementById('btnUp').addEventListener('touchEnd', _=> this.ollie.processMotor(0,0));
        document.getElementById('btnDown').addEventListener('touchEnd', _=> this.ollie.processMotor(180,0));
        document.getElementById('btnLeft').addEventListener('touchEnd', _=> this.ollie.processMotor(270,0));
        document.getElementById('btnRight').addEventListener('touchEnd', _=> this.ollie.processMotor(90,0));

        // Orientation Control
        document.getElementById('btnOrientation').addEventListener('click', _=>{
            window.addEventListener('deviceorientation', this._orientationHandler.bind(this));
        })
        document.getElementById('btnStopOrientation').addEventListener('click', _=>{
            window.removeEventListener('deviceorientation', this._orientationHandler.bind(this));
            this.ollieControl.power = 0;
            this.ollie.processMotor(this.ollieControl.angle,0);
        })

    }

    _orientationHandler(event){
        // Alpha = turn the phone like a compass
        const alpha = Math.round(event.alpha);
        // Beta = lean the phone. Lean to the front = negative number, lean to the back = positive number
        const beta = event.beta < 0 ? 
                Math.max(Math.round(event.beta), -45) :
                Math.min(Math.round(event.beta), 45) ;

        // We will use Alpha to direct the ollie and Beta to control the power
        if (this.originalAngle === -1){
            this.originalAngle = alpha;
        }

        // We calculate the compute angle to know how to drive the Ollie
        const calculateAngle = ((this.originalAngle - alpha) + 360) % 360;
        // The final angle depends on the inclinaison of the phone (we have to reverse it)
        const finalAngle = event.beta < 0 ? calculateAngle : Math.abs(360 - ((calculateAngle + 270) % 360));
        // We calculate the power to applicate      
        const power = Math.round((Math.abs(beta) / 45) * 100);

        if (this.ollieControl.angle != finalAngle
            || this.ollieControl.power != power){
            this.ollieControl.angle = finalAngle;
            this.ollieControl.power = power;
            this.ollie.processMotor(finalAngle, power);
        }       
        
    }

    _moveOllie(direction, power){
        this.ollie
    }

    _initTabWebNFC(){
         document.getElementById('btnNfcTag').addEventListener('click', _=>this.webNFC.pushToTag());
         document.getElementById('btnNfcACS').addEventListener('click', _=>this.webNFC.pushToAcs());
    }

   
}