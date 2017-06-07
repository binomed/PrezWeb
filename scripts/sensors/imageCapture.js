'use strict'

export class ImageCaptureControler {
    constructor() {
        navigator.mediaDevices.getUserMedia({
                video: true
            })
            .then(this._gotMedia.bind(this))
            .catch(error => console.error('getUserMedia() error:', error));
        this.mediaStreamTrack = null;
        this.imageCapture = null;

        this.brightnessElt = document.getElementById('brightness');
        this.contrastElt = document.getElementById('contrast');
        this.saturationElt = document.getElementById('saturation');
        this.sharpnessElt = document.getElementById('sharpness');
        this.imageCaptureElt = document.getElementById('imageCapture');


    }

    _destroy() {
        if (this.mediaStreamTrack) {
            this.mediaStreamTrack.stop();
        }
    }


    _gotMedia(mediaStream) {
        this.mediaStreamTrack = mediaStream.getVideoTracks()[0];
        this.imageCapture = new ImageCapture(this.mediaStreamTrack);
        this.imageCaptureElt.srcObject = mediaStream;
        setTimeout(() => {

            let constraints = this.imageCapture.track.getConstraints();
            let settings = this.imageCapture.track.getSettings();
            let capabilities = this.imageCapture.track.getCapabilities();
            for (let capabilityName in capabilities) {
                let capability = capabilities[capabilityName];
                if (capability.toString() === '[object MediaSettingsRange]') {
                    let value = settings[capabilityName];
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
        }, 500);
    }

    _initRange(capabilityElt, capabilityName, value, range) {
        capabilityElt.min = range.min;
        capabilityElt.max = range.max;
        capabilityElt.step = Math.round(range.step * 100) / 100;
        capabilityElt.value = value;
        capabilityElt.setAttribute('data-name', capabilityName);
        capabilityElt.oninput = (event) => {
            let options = {};
            options[capabilityName] = event.target.value;
            this._applyConstraints(options);
        }
    }


    _applyConstraints(options) {
        this.imageCapture.track.applyConstraints({
                advanced: [options]
            })
            .then(_ => {});
    }

    _changeConstraint(brightnessValue, contrastValue, saturationValue, sharpnessValue) {
        mediaStreamTrack.applyConstraints({
                advanced: [{
                    brightness: brightnessValue,
                    constrast: contrastValue,
                    saturation: saturationValue,
                    sharpness: sharpnessValue
                }]
            })
            .catch(error => console.error('Uh, oh, applyConstraints() error:', error));
    }
}