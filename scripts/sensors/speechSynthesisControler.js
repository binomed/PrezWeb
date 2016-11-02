'use strict'

export class SpeechSynthesisControler{
    constructor(){
        this.synth = window.speechSynthesis;

        this.voiceFR = null;
        this._configure();
    }

    _configure(){
        this._populateVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
        }
    }

    _populateVoiceList() {
        let voices = this.synth.getVoices();
        for (var i = 0; i < voices.length; i++) {
            if (voices[i].lang === 'fr-FR') {
                this.voiceFR = voices[i];
                console.log("%s, %O ", voices[i].lang, voices[i]);
            }
        }
    }


    speak(value) {
        return new Promise(function(resolve, reject) {

            if (!this.voiceFR) {
                reject();
            }
            var utterThis = new SpeechSynthesisUtterance(value);
            utterThis.voice = this.voiceFR;
            utterThis.pitch = 1;
            utterThis.rate = 1;
            utterThis.onend = function() {
                resolve();
            }
            this.synth.speak(utterThis);
        });
    }

}