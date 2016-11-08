'use strict'

export class SpeechSynthesisControler{
    constructor(){
        this.synth = window.speechSynthesis;

        this.voiceFR = null;
        this.voiceEN = null;
        this._configure();
    }

    _configure(){
        this._populateVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this._populateVoiceList.bind(this);
        }
    }

    _populateVoiceList() {
        let voices = this.synth.getVoices();
        for (var i = 0; i < voices.length; i++) {
            if (voices[i].lang === 'fr-FR') {
                console.debug("%s, %O ", voices[i].lang, voices[i]);
                this.voiceFR = voices[i];
            }else if (voices[i].lang === 'en-GB') {
                console.debug("%s, %O ", voices[i].lang, voices[i]);
                this.voiceEN = voices[i];
            }
        }
    }

    speak({value, langFr = true, pitch = 1, rate = 1}) {
        return new Promise((resolve, reject) =>{

            if (!this.voiceFR) {
                reject();
            }
            var utterThis = new SpeechSynthesisUtterance(value);
            utterThis.voice = langFr ? this.voiceFR : this.voiceEN;
            utterThis.pitch = pitch;
            utterThis.rate = rate;
            utterThis.onend = function() {
                resolve();
            }
            this.synth.speak(utterThis);
        });
    }

}