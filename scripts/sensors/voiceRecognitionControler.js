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
            console.log('Confidence: ' + finalStr);
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
        this.recognition.continuous = true;
        this.recognition.lang = 'fr-FR';
        this.recognition.interimResults = true;

        // We detect end
        this.recognition.onend = _=>{
            console.log('End of recognition');
            this.recognition.stop();
        };
        // We detect errors
        this.recognition.onerror = (event) => {
            if (event.error == 'no-speech') {
                console.log('No Speech');
            }
            if (event.error == 'audio-capture') {
                console.log('No microphone')
            }
            if (event.error == 'not-allowed') {
                console.log('Not Allowed');
            }
        };     
    }


}