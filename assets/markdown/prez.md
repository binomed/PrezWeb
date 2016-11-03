
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


<!-- .slide: class="transition-white" data-state="end-recognition" -->

# What the web can do today !

##==##

<!-- .slide: class="transition-white all-techno" data-state="end-recognition" -->

<h1>
ambiant light <span>acceleration</span> battery <span>proximity</span> webworker <span>streamapi</span> 
serviceworker <span> notifications</span> background sync <span>indexedDB</span> webrtc </span>visibility</span> 
push notifications <span>home screen installation</span> reccording media <span>vibration</span> 
fullscreen <span>file access</span> geolocalisation <span>network speed</span> offline <span>clipboard</span>
online state <span>offline storage</span> PWA</h1>

Notes:
Aujourd'hui, on ne parlera pas de ça !

##==##

## User Media

blablabla


##==##

## Web Midi

blablabla


##==##

## Payement Api

blablabla


##==##

## Bref

Notes:
Image de What the web can do

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
recognition.lang = voiceFR;
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

<!-- .slide: class="transition-white" data-state="stop-code-connect-ble" -->

# Web Bluetooth

Notes:
Qqes slides d'explication et de code

##==##

<!-- .slide: class="with-code" data-state="code-connect-ble stop-code-read-charact" -->

## Connect by name

```javascript
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => {
  return device.gatt.connect();
})
.catch(error => { console.log(error); });
```

<div id="highlight-connect-ble" class="highlight-code"></div>  

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>


##==##

<!-- .slide: class="with-code" data-state="stop-code-connect-ble code-read-charact" -->

## Read Charactaristic

```javascript
device.gatt.getPrimaryService('battery_service')
.then(service => {
  // Getting Battery Level Characteristic...
  return service.getCharacteristic('battery_level');})
.then(characteristic => {
  // Reading Battery Level...
  return characteristic.readValue();})
.then(value => {
  // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
  value = value.buffer ? value : new DataView(value);
  console.log('Battery percentage is ' + value.getUint8(0));})
.catch(error => { console.log(error); });
```

<div id="highlight-read-charact" class="highlight-code"></div>  

<div class="fragment" hidden></div>
<div class="fragment" hidden></div>
<div class="fragment" hidden></div>
<div class="fragment" hidden></div>
<div class="fragment" hidden></div>
<div class="fragment" hidden></div>

##==##

<!-- .slide: class="transition-black" data-state="stop-code-read-charact" -->

# Heart Rate

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

<!-- .slide: class="transition-white" data-state="end-myo" -->

# Physical Web

Notes:
Slides explicatives ...

##==##

<!-- .slide: class="transition-black" data-state="stop-mbot" -->

# Mbot time

![icon](assets/images/mbot.png)

Notes:


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
   ____  _____  _____ ______ _   _ _______    _______ _____ ____  _   _ 
  / __ \|  __ \|_   _|  ____| \ | |__   __|/\|__   __|_   _/ __ \| \ | |
 | |  | | |__) | | | | |__  |  \| |  | |  /  \  | |    | || |  | |  \| |
 | |  | |  _  /  | | |  __| | . ` |  | | / /\ \ | |    | || |  | | . ` |
 | |__| | | \ \ _| |_| |____| |\  |  | |/ ____ \| |   _| || |__| | |\  |
  \____/|_|  \_\_____|______|_| \_|  |_/_/    \_\_|  |_____\____/|_| \_|
                                                                        
        
-->


##==##

<!-- .slide: class="transition-white" data-state="stop-mbot" -->

# Device Orientation

##==##

<!-- .slide: class="transition-black" -->

# Welcome to the dark side !

![icon](assets/images/ollie.png)

Notes:
Démo avec le Olie

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


##==##

## WebUSB

##==##

## WebNFC

##==##

<!-- .slide: class="transition-black" -->

# The Final !


##==##

<!-- .slide: class="last-slide" -->



<!-- .element: class="thank-message" --> Merci  

<!-- .element: class="presenter" --> **Jean-François Garreau & François Beaufort **

<!-- .element: class="work-rule" --> Ingénieur Lucca & Ingénieur Google

<!-- .element: class="email" --> **@jefBinomed & +FrancoisBeaufort**  

