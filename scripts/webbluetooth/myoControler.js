'use strict'

class MyoConfig{
    constructor(){        
    }
    
    controlService() { return "d5060001-a904-deb9-4748-2c7f4a124842" }
    gestureService() { return "d5060003-a904-deb9-4748-2c7f4a124842" }
    commandCharacteristic() { return "d5060401-a904-deb9-4748-2c7f4a124842" }
    gestureCharacteristic() { return "d5060103-a904-deb9-4748-2c7f4a124842" }
    

}

export class MyoControler{
    constructor(){
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
    }

    /*
    Request the device with bluetooth
    */
    request() {
        let options = {
            "filters": [{
                "services": [this.config.controlService()]
            }],
            "optionalServices": [this.config.gestureService()]
        };        
        return navigator.bluetooth.requestDevice(options)
            .then(device => {
                this.device = device;
                this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
                return device;
            });
    }

    /**
     * Connect to the device
     * */
    connect() {
        if (!this.device) {
            return Promise.reject('Device is not connected.');
        } else {
            this.connected = true;
            return this.device.gatt.connect();
        }
    }
    
    init(){
        if(!this.device){
            return Promise.reject('Device is not connected.');
        }else{
            
            return this.device.gatt.getPrimaryService(this.config.controlService())
            .then((service)=>{
                 console.log('> get Myo Control Service');
                 return service.getCharacteristic(this.config.commandCharacteristic())
            })
            .then((characteristic)=>{
                  console.log('> get Myo Command characteristic');
                  return characteristic.writeValue(this.enableGesturesCommand)
            })
            .then(()=>{
                console.log('Ready to listen gestures');
            })
            .catch(error => console.error(error))
        }
    }

    registerGestures(callback){
        if(!this.device){
            return Promise.reject('Device is not connected.');
        }else{
            this.device.gatt.getPrimaryService(this.config.gestureService())
            .then(service=>{
                console.log('> Get Gesture Service');
                return service.getCharacteristic(this.config.gestureCharacteristic())
            })
            .then((characteristic) => {
                console.log('Get gesture caracteristic')
                characteristic.startNotifications();
                characteristic.addEventListener('characteristicvaluechanged', (ev) => {
                    const gesture = this._parseMyoGesture(ev.target.value);
                    console.log('Gesture : ', gesture);
                    if (callback){
                        callback(gesture);
                    }
                })
            })
            .catch(error => console.error(error));
        }
    }

     disconnect() {
        if (!this.device) {
            return Promise.reject('Device is not connected.');
        } else {
            return this.device.gatt.disconnect();
        }
    }

    onDisconnected() {
        this.connected = false;
        console.log('Device is disconnected.');
    }

    _parseMyoGesture(value) {
        if (value.getUint8(0) === 0x03) {
            const gestureValue = value.getUint16(1, true)
            const gesture = {
                0x0000: 'rest',
                0x0001: 'fist',
                0x0002: 'wave-in',
                0x0003: 'wave-out',
                0x0004: 'fingers-spread',
                0x0005: 'double-tap',
                0xffff: 'unknown',
            }[gestureValue]
            return { gesture }
        }
        return { gesture: null }
    }
}