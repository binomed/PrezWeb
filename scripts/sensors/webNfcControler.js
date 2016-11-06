'use strict';


export class WebNfcControler{
    constructor(){

    }

     pushToTag(){
        navigator.nfc.push({
            data: [{ recordType: "url", data: "https://devfest.gdgnantes.com" }]
        }).then(() => {
            console.log("Message pushed.");
        }).catch((error) => {
            console.log("Push failed :-( try again.");
        });
    }

    pushToAcs(data){
        // TODO 
        navigator.nfc.push({
            data: [{ recordType: "url", data: "https://jef.binomed.fr" }]
        }).then(() => {
            console.log("Message pushed.");
        }).catch((error) => {
            console.log("Push failed :-( try again.");
        });
    }
}