'use strict'

export class VoiceRecognitionControler{
    constructor(){
        let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
        
        this.recognition = new SpeechRecognition();
        this._configure();
    }

    start(callback){
        this.recognition.onresult = (event)=>{
            const finalStr = event.results[0][0].transcript;
            console.debug('Confidence: ' + finalStr);
            if (callback){
                callback(finalStr);
            }            
        }
        this.recognition.start();
    }

    stop(){
        this.recognition.stop();
    }

    _configure(){
        this.recognition.lang = 'fr-FR';

        // We detect end
        this.recognition.onend = _=>{
            console.debug('End of recognition');
            this.recognition.stop();
        };
        // We detect errors
        this.recognition.onerror = (event) => {
            if (event.error == 'no-speech') {
                console.debug('No Speech');
            }
            if (event.error == 'audio-capture') {
                console.debug('No microphone')
            }
            if (event.error == 'not-allowed') {
                console.debug('Not Allowed');
            }
        };     
    }


}