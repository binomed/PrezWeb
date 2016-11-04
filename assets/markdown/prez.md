
<!-- .slide: class="first-slide" data-type-show="prez" -->

# **Le Web de Demaintenant**

### 2016.11.09 DevFest @ **Nantes**

##==##

<!-- .slide: class="first-slide" data-type-show="full" -->

# **Le Web de Demaintenant**

##==##

<!-- .slide: class="who-am-i" -->

## Qui sommes nous ?

### Jean-François Garreau

<!-- .element: class="descjf" -->
Senior Innovation Developer & Community Manager

![avatar w-300 wp-200](assets/images/jf.jpg)

![company_logo](assets/images/lucca_logo.png)
![gdg_logo](assets/images/GDG-Logo-carre.png)

<!-- .element: class="twitter" -->
[@jefBinomed](http://twitter.com/jefBinomed)

<!-- .element: class="gplus" -->
[+JeanFrancoisGarreau](http://plus.google.com/+JeanFrancoisGarreau)

##==##

<!-- .slide: class="who-am-i" -->

## Qui sommes nous ?

### François Beaufort

<!-- .element: class="descjf" -->
Senior Developer Programs Engineer

![avatar w-300 wp-200](assets/images/fbeaufort.jpg)

![company_logo](assets/images/google.png)

<!-- .element: class="gplus" -->
[+FrancoisBeaufort](http://plus.google.com/+FrancoisBeaufort)

##==##

<!--
  _______ ____  _____      __     __
 |__   __/ __ \|  __ \   /\\ \   / /
    | | | |  | | |  | | /  \\ \_/ / 
    | | | |  | | |  | |/ /\ \\   /  
    | | | |__| | |__| / ____ \| |   
    |_|  \____/|_____/_/    \_\_|   
                                    
                   
-->


<!-- .slide: class="transition-white" -->

# What the web can do today !

##==##

<!-- .slide: class="transition-white all-techno" -->

<h1>
ambiant light <span>acceleration</span> battery <span>proximity</span> webworker <span>streamapi</span> 
serviceworker <span> notifications</span> background sync <span>indexedDB</span> webrtc </span>visibility</span> 
push notifications <span>home screen installation</span> reccording media <span>vibration</span> 
fullscreen <span>file access</span> geolocalisation <span>network speed</span> offline <span>clipboard</span>
online state <span>offline storage</span> PWA <span>web midi</span></h1>

Notes:
Aujourd'hui, on ne parlera pas de ça !

##==##

<!-- .slide: class="transition-white" -->

# User Media

![icon](./assets/images/camera_icon.png)

##==##

<!-- .slide: data-type-show="full" -->

## User Media

* Encore dépendant des navigateurs !

* Possibilité de préciser ce qu'on récupère et on peut séparer les flux ! 
* Sélection de la source / Récupération de l'audio
* Devient intéressant s'il est mixé avec des effets ou des canvas.
* **HTTPS** only ! 
* 2 versions l'api

##==##

<!-- .slide: class="with-code" -->

## User Media

```javascript
var vgaConstraints = {
  video: {
    mandatory: {
      maxWidth: 640,
      maxHeight: 360
    }
  }
};
```

Notes:
* Encore dépendant des navigateurs !
* Possibilité de préciser ce qu'on récupère et on peut séparer les flux ! 
* Sélection de la source / Récupération de l'audio
* Devient intéressant s'il est mixé avec des effets ou des canvas.
* **HTTPS** only ! 
* 2 versions l'api

##==##

<!-- .slide: data-type-show="full" data-state="stop-code-user-media-v1"  -->

## User Media

### Différence entre les 2 versions ?

* V1 : approche événementielle
* V2 : approche avec des promises et simplifie le fonctionnement de récupération des objets associés (plus récent => moins de compatibilités)

Notes:

##==##

<!-- .slide:  class="transition-white"  data-type-show="prez" data-state="stop-code-user-media-v1" -->

# 2 Versions !


Notes:
* V1 : approche événementielle
* V2 : approche avec des promises et simplifie le fonctionnement de récupération des objets associés (plus récent => moins de compatibilités)


##==##

<!-- .slide: class="with-code" data-state="code-user-media-v2" -->

## User Media - V2

```javascript
// We define the video constraints
var constraints = {video: true};

navigator.mediaDevices.getUserMedia(constraints)
.then((stream)=>{
    video.srcObject = stream;
    video.onloadedmetadata = (e)=>video.play();
})
```

<div id="highlight-user-media-v2" class="highlight-code"></div>  

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>
<div class="fragment" data-fragment-index="3" hidden></div>
  

Notes:
Toujours besoin de adapter.js pour faire marcher correctement ! 



##==##

<!-- .slide: data-state="stop-code-user-media-v2" -->

## Payement Api

blablabla

<!--
   _____ _____  ______ ______ _____ _    _ 
  / ____|  __ \|  ____|  ____/ ____| |  | |
 | (___ | |__) | |__  | |__ | |    | |__| |
  \___ \|  ___/|  __| |  __|| |    |  __  |
  ____) | |    | |____| |___| |____| |  | |
 |_____/|_|    |______|______\_____|_|  |_|
                                           
-->

##==##

<!-- .slide: class="transition-white" -->

# Speech Synthesis

##==## 

<!-- .slide: class="with-code" data-state="code-web-speech stop-code-web-speech-gramar"  -->

## Web Speech - Utilisation 

```javascript
var recognition = new SpeechRecognition();
recognition.lang = 'fr-FR';
recognition.continuous = true;
recognition.interimResults = true;

recognition.start();
recognition.onresult = function(event) {
  var finalStr = event.results[0][0].transcript;
  console.log('Confidence: ' + finalStr); 
}
```

<div id="highlight-web-speech" class="highlight-code"></div>  

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>
<div class="fragment" data-fragment-index="3" hidden></div>
<div class="fragment" data-fragment-index="4" hidden></div>
<div class="fragment" data-fragment-index="5" hidden></div>
<div class="fragment" data-fragment-index="6" hidden></div>

##==##

<!-- .slide: class="with-code" data-state="stop-code-web-speech code-web-speech-grammar stop-code-web-speech-synthesis" -->

## Web Speech - Grammar

```javascript
var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | [MORE COLOURS] ;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
```


<div id="highlight-web-speech-grammar" class="highlight-code"></div>  

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>
<div class="fragment" data-fragment-index="3" hidden></div>


##==##

<!-- .slide: class="transition-white" data-state="stop-code-web-speech-grammar stop-code-web-speech-synthesis" -->

# Voice Recognition

##==##

<!-- .slide: data-state="end-recognition code-web-speech-synthesis" class="with-code" -->

## Web Speech Synthesis

```javascript
var synth = window.speechSynthesis;

var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
utterThis.voice = 'fr-FR';
utterThis.pitch = pitch.value;
utterThis.rate = rate.value;
synth.speak(utterThis);
```


<div id="highlight-web-speech-synthesis" class="highlight-code"></div>  

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>
<div class="fragment" data-fragment-index="3" hidden></div>
<div class="fragment" data-fragment-index="4" hidden></div>
<div class="fragment" data-fragment-index="5" hidden></div>


##==##

<!-- .slide: class="transition-black" data-state="recognition stop-code-web-speech-synthesis"-->

# My Google Assistant


<div id="demoSpeech" style="display: none;">
    <div class="loading">
        <div class="item item-1"></div>
        <div class="item item-2"></div>
        <div class="item item-3"></div>
        <div class="item item-4"></div>
    </div>  
    <i class="material-icons md-48">mic</i>
    <p id="speech_input"></p>
</div>


##==##

<!--
  ____  _     _    _ ______ _______ ____   ____ _______ _    _ 
 |  _ \| |   | |  | |  ____|__   __/ __ \ / __ \__   __| |  | |
 | |_) | |   | |  | | |__     | | | |  | | |  | | | |  | |__| |
 |  _ <| |   | |  | |  __|    | | | |  | | |  | | | |  |  __  |
 | |_) | |___| |__| | |____   | | | |__| | |__| | | |  | |  | |
 |____/|______\____/|______|  |_|  \____/ \____/  |_|  |_|  |_|
                                                               
                                                  
-->

<!-- .slide: class="transition-white" data-state="ble stop-code-recognition end-recognition" -->

# Web Bluetooth

Notes:
Qqes slides d'explication et de code

##==##

<!-- .slide: id="connectBle" class="with-code" data-state="code-connect-ble stop-ble" -->

## Scan for Bluetooth devices

```javascript
function onClick() {
  const filters = { filters: [{ services: ['battery_service'] }] };

  // Show a chooser scanning for devices advertising a Battery Service.
  navigator.bluetooth.requestDevice(filters)
  // Connect to device...
  .then(device => device.gatt.connect())
  .then(server => {
    console.log('Bluetooth device is connected.');
  });
}
```

<div id="highlight-connect-ble" class="highlight-code"></div>  

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>

##==##

<!-- .slide: id="readCharact" class="with-code" data-state="code-read-charact stop-code-connect-ble" -->

## Read characteristic value

```javascript
// Get Battery Service...
device.gatt.getPrimaryService('battery_service')
// Get Battery Level Characteristic...
.then(service => service.getCharacteristic('battery_level'))
// Read Battery Level...
.then(characteristic => characteristic.readValue())
.then(value => {
  const batteryLevel = value.getUint8(0);
  console.log(`Battery percentage is ${batteryLevel}%.`);
});
```

<div id="highlight-read-charact" class="highlight-code"></div>  

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>

##==##

<!-- .slide: id="writeCharact" class="with-code" data-state="code-write-charact stop-code-read-charact" -->

## Write characteristic value

```javascript
// Get GAP Service...
device.gatt.getPrimaryService('generic_access')
// Get Device Name Characteristic...
.then(service => service.getCharacteristic('gap.device_name'))
// Rename device...
.then(characteristic => {
  const textEncoder = new TextEncoder();
  const newDeviceName = textEncoder.encode('PloumPloum');
  return characteristic.writeValue(newDeviceName);
});
```

<div id="highlight-write-charact" class="highlight-code"></div>

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>

##==##

<!-- .slide: id="notifCharact" class="with-code" data-state="code-notif-charact stop-code-write-charact" -->

## Receive characteristic notifications

```javascript
// Get Heart Rate Service...
device.gatt.getPrimaryService('heart_rate')
// Get Heart Rate Measurement Characteristic...
.then(service => service.getCharacteristic('heart_rate_measurement'))
// Start Notifications...
.then(characteristic => characteristic.startNotifications())
.then(characteristic => {
  characteristic.addEventListener('characteristicvaluechanged', onValueChanged);
});

function onValueChanged(event) {
  // Do something with event.target.value
}
```

<div id="highlight-notif-charact" class="highlight-code"></div>

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>

##==##

<!-- .slide: id="heartRateDemo" class="transition-black" data-state="heart-rate-demo stop-code-notif-charact" -->

<iframe src="demos/heart-rate-sensor/">

Notes:
Peut être qu'une image serait mieux ?

##==##

<!-- .slide: class="transition-black" -->

# On peut faire mieux !

![icon](assets/images/myo.png)

Notes:
Myo

<!--
  _____   __          ________ ____  
 |  __ \  \ \        / /  ____|  _ \ 
 | |__) |  \ \  /\  / /| |__  | |_) |
 |  ___/    \ \/  \/ / |  __| |  _ < 
 | |         \  /\  /  | |____| |_) |
 |_|          \/  \/   |______|____/ 
                                                                             
-->

##==##

<img src="assets/images/myo.png" alt="myo img" id="connectMyo" class="center">

##==##

<!-- .slide: class="transition-white" -->

# Tiens un slide à droite


##--##

<!-- .slide: class="transition-white" -->

# Ah ! Je peux aussi aller en bas ?

##--## 

<!-- .slide: class="transition-white" -->

# Aller encore un petit pour la route !

##==##

<!-- .slide: class="transition-white" -->

# C'est bon t'as fini de jouer ?

##==##

<!-- .slide: class="transition-black" data-state="disconnect-myo"-->

# Mbot time

![icon](assets/images/mbot.png)

Notes:
Bon j'ai créé une application pour le controller, tu peux me donner l'url stp ?

##==##

<!-- .slide: class="transition-white" data-state="end-myo" -->

# Physical Web

Notes:
Slides explicatives ...


##==##

<!-- .slide: class="transition-black" data-state="start-mbot" -->


<img src="assets/images/mbot.png" alt="mbot img" id="connectMBot" class="center h-600">

<div id="part-button-mbot">
      <div class="row">
          <div class="flex20"></div>
          <button class="btn flex60" id="mBotBtnUp">
              <i class="material-icons md-48"><i class="material-icons">keyboard_arrow_up</i></i>
          </button>
          <div class="flex20"></div>
      </div>
      <div class="row">
          <button class="btn flex40" id="mBotBtnLeft">
              <i class="material-icons md-48"><i class="material-icons">keyboard_arrow_left</i></i>
          </button>
          <div class="flex20"></div>
          <button class="btn flex40" id="mBotBtnRight">
              <i class="material-icons md-48"><i class="material-icons">keyboard_arrow_right</i></i>
          </button>
      </div>
      <div class="row">
          <div class="flex20"></div>
          <button class="btn flex60" id="mBotBtnDown">
              <i class="material-icons md-48"><i class="material-icons">keyboard_arrow_down</i></i>
          </button>
          <div class="flex20"></div>
      </div>
  </div>

<!--
           ______ _______ ______ _____  
     /\   |  ____|__   __|  ____|  __ \ 
    /  \  | |__     | |  | |__  | |__) |
   / /\ \ |  __|    | |  |  __| |  _  / 
  / ____ \| |       | |  | |____| | \ \ 
 /_/    \_\_|       |_|  |______|_|  \_\
                                        
      
-->

##==##

<!-- .slide: class="transition-white" -->

# Welcome to the Futur

Notes:
Trouver une image !

##==##

<!-- .slide: class="transition-white" -->

# Bon pas tant que ça finallement


##==##

<!-- .slide: class="transition-white" -->

# WebNFC

![icon](./assets/images/nfc_demo.png)


##==##

<!-- .slide: class="transition-white" -->

# Android Only

##==##

<!-- .slide: class="transition-white" -->

# PUSH <br><br> WATCH  <br><br> PEER2PEER


##==##

<!-- .slide: class="transition-white" data-state="stop-code-write-nfc" -->

# WRITE JSON <br><br> WRITE NDEF

##==##

<!-- .slide: class="with-code" data-state="code-write-nfc stop-code-read-nfc" -->

## Push message

```javascript
navigator.nfc.push({
    data: [{ recordType: "url", data: "https://devfest.gdgnantes.com" }]
  }).then(() => {
    console.log("Message pushed.");
  });
```


<div id="highlight-write-nfc" class="highlight-code"></div>

<div class="fragment" data-fragment-index="1" hidden></div>


Notes:
L'exemple ici présente un message ndef !


##==##

<!-- .slide: class="with-code" data-state="stop-code-write-nfc code-read-nfc" -->

## Read message

```javascript
navigator.nfc.watch((message) => {
		for (let record of message.data) {
      console.log("Record type:  " + record.recordType);
      console.log("MIME type:    " + record.mediaType);
      console.log("=== data ===\n" + record.data);
    }
	});
```

<div id="highlight-read-nfc" class="highlight-code"></div>

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>
<div class="fragment" data-fragment-index="3" hidden></div>

Notes:
ça marche pas encore

##==##

<!-- .slide: class="transition-black" data-state="stop-code-read-nfc" -->

# let's write some tags !

Notes:
Utilisation d'un tag nfc pour ouvrir l'application et write sur un tag

##==##

## WebUSB


##==##

<!-- .slide: class="transition-black" -->

# Pour conclure !

Notes:
Image de feux d'artifice


##==##

<!-- .slide: class="last-slide" -->



<!-- .element: class="thank-message" --> Merci  

<!-- .element: class="presenter" --> **Jean-François Garreau & François Beaufort **

<!-- .element: class="work-rule" --> Ingénieur Lucca & Ingénieur Google

<!-- .element: class="email" --> **@jefBinomed & +FrancoisBeaufort**  

