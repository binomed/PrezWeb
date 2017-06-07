
<!-- .slide: class="first-slide" data-type-show="prez" -->

# **Le Web de Demaintenant**

### 2017.08.06 Web2Day @ **Nantes**


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
ambiant light <span>acceleration</span> battery <span>proximity</span> webworker <span>streams</span>
service worker <span>notifications</span> background sync <span>indexedDB</span> webrtc </span>visibility</span>
push notifications <span>home screen installation</span> recording media <span>vibration</span>
fullscreen <span>file access</span> geolocalisation <span>network speed</span> offline <span>clipboard</span>
online state <span>offline storage</span> PWA <span>web midi</span></h1>

Notes:
Aujourd'hui, on ne parlera pas de ça !


##==##

<!--
   _____ _____  ______ ______ _____ _    _
  / ____|  __ \|  ____|  ____/ ____| |  | |
 | (___ | |__) | |__  | |__ | |    | |__| |
  \___ \|  ___/|  __| |  __|| |    |  __  |
  ____) | |    | |____| |___| |____| |  | |
 |_____/|_|    |______|______\_____|_|  |_|

-->

<!-- .slide: class="transition-white" -->

# Voice Recognition

##==##

<!-- .slide: class="with-code" data-state="code-web-speech stop-code-web-speech-gramar"  -->

## Web Speech - Utilisation

```javascript
var recognition = new SpeechRecognition();
recognition.lang = 'fr-FR';
recognition.continuous = true;
recognition.interimResults = false;

recognition.start();
recognition.onresult = function(event) {
  var finalStr = event.results[0][0].transcript;
  console.log('Transcript: ' + finalStr);
}
```

<code-highlighter
    id="highlight-web-speech"
    line-height="0.57em"></code-highlighter>

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
recognition.lang = 'fr-FR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
```



<code-highlighter
    id="highlight-web-speech-grammar"
    line-height="0.57em"></code-highlighter>

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>
<div class="fragment" data-fragment-index="3" hidden></div>


##==##

<!-- .slide: class="transition-white" data-state="stop-code-web-speech-grammar stop-code-web-speech-synthesis" -->

# Speech Synthesis

##==##

<!-- .slide: data-state="end-recognition code-web-speech-synthesis" class="with-code" -->

## Web Speech Synthesis

```javascript
var utterThis = new SpeechSynthesisUtterance("Bonjour Web2Day");
utterThis.voice = 'fr-FR';
utterThis.pitch = 1;
utterThis.rate = 1;
window.speechSynthesis.speak(utterThis);
```


<code-highlighter
    id="highlight-web-speech-synthesis"
    line-height="0.57em"></code-highlighter>

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>
<div class="fragment" data-fragment-index="3" hidden></div>
<div class="fragment" data-fragment-index="4" hidden></div>


##==##

<!-- .slide: id="google-assistant" class="transition-black" data-state="recognition stop-code-web-speech-synthesis"-->

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

# <span style="opacity: .8; font-weight: normal;">Web</span> Bluetooth

![icon](./assets/images/bluetooth.svg)

##==##

<!-- .slide: class="transition-white" data-state="stop-ble" data-background-color="#fff"-->

<img src="assets/images/bluetooth-structure.png" style="max-width: 80%;">

##==##

<!-- .slide: id="connectBle" class="with-code" data-state="code-connect-ble" -->

## Scan for Bluetooth devices

```javascript
function onClick() {
  const options = { filters: [{ services: ['battery_service'] }] };

  // Show a chooser scanning for devices advertising a Battery Service.
  navigator.bluetooth.requestDevice(options)
  // Connect to device...
  .then(device => device.gatt.connect())
  .then(server => {
    console.log('Bluetooth device is connected.');
  });
}
```

<code-highlighter
    id="highlight-connect-ble"
    line-height="0.57em"></code-highlighter>

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

<code-highlighter
    id="highlight-read-charact"
    line-height="0.57em"></code-highlighter>

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>
<div class="fragment" data-fragment-index="3" hidden></div>

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

<code-highlighter
    id="highlight-write-charact"
    line-height="0.57em"></code-highlighter>

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

<code-highlighter
    id="highlight-notif-charact"
    line-height="0.57em"></code-highlighter>

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>

##==##

<!-- .slide: id="heartRateDemo" class="transition-black" data-state="heart-rate-demo stop-code-notif-charact" -->

<iframe src="demos/heart-rate-sensor/">

Notes:
Peut être qu'une image serait mieux ?

##==##

<!-- .slide: class="transition-black" data-state="disconnect-heart-rate-sensor"-->

# Mbot time

![icon](assets/images/mbot.png)

Notes:
Bon j'ai créé une application pour le controller, tu peux me donner l'url stp ?

##==##

<!--
  _____   __          ________ ____
 |  __ \  \ \        / /  ____|  _ \
 | |__) |  \ \  /\  / /| |__  | |_) |
 |  ___/    \ \/  \/ / |  __| |  _ <
 | |         \  /\  /  | |____| |_) |
 |_|          \/  \/   |______|____/

-->

<!-- .slide: class="transition-white" data-state="end-myo" -->

# Physical Web

##==##

<!-- .slide: class="transition-white" data-background-color="#fff" data-background-video="assets/videos/b0GDk-53fTo.mp4" data-background-video-loop="true" -->

<!--
           ______ _______ ______ _____
     /\   |  ____|__   __|  ____|  __ \
    /  \  | |__     | |  | |__  | |__) |
   / /\ \ |  __|    | |  |  __| |  _  /
  / ____ \| |       | |  | |____| | \ \
 /_/    \_\_|       |_|  |______|_|  \_\


-->

##==##

<!-- .slide: data-background-image="assets/images/opening-door.jpg" data-background-position="50% 50%" data-background-color="#000" data-background-size="contain" data-background-repeat="no-repeat" class="transition-black" -->

##==##

<!-- .slide: class="transition-white" -->

# <span style="opacity: .8; font-weight: normal;">Web</span>USB

![icon](./assets/images/usb.png)

##==##

<!-- .slide: class="with-code" -->

## WebUSB - Talk to an Arduino USB board

```
navigator.usb.requestDevice({ filters: [{ vendorId: 0x2341 }] })
.then(device => {
  return device.open() // Begin a session.
  .then(_ => device.selectConfiguration(1)) // Select configuration #1.
  .then(_ => device.claimInterface(2)) // Request control over interface #2.
  .then(_ => device.controlTransferOut({
      requestType: 'class',
      recipient: 'interface',
      request: 0x22,
      value: 0x01,
      index: 0x02 })) // Ready to receive data
  .then(_ => device.transferIn(5, 64)) // Waiting for 64 bytes from endpoint #5.
  .then(result => { console.log(`Received: ${result.data}`); }) });
```

##==##

<!-- .slide: class="transition-white" data-state="stop-code-image-capture-zoom" -->

# Image Capture

![icon](./assets/images/camera_icon.png)

##==##

<!-- .slide: class="with-code" data-state="stop-code-image-capture code-image-capture-zoom" -->

## Image Capture - Change zoom

```javascript
navigator.mediaDevices.getUserMedia({video: true})
.then(stream => {
  const track = stream.getVideoTracks()[0];
  const capabilities = track.getCapabilities();

  if ('zoom' in capabilities) {
    track.applyConstraints({advanced: [ { zoom: 2 } ]});
  }
})
```

<code-highlighter
    id="highlight-image-capture-zoom"
    line-height="0.57em"></code-highlighter>

<div class="fragment" data-fragment-index="1" hidden></div>
<div class="fragment" data-fragment-index="2" hidden></div>
<div class="fragment" data-fragment-index="3" hidden></div>
<div class="fragment" data-fragment-index="4" hidden></div>

Notes:
Uniquement si le zoom est dispo

##==##

<!-- .slide: class="with-code" data-state="stop-code-image-capture-zoom code-image-capture" -->

## Image Capture

```javascript

navigator.mediaDevices.getUserMedia({video: true})
.then(stream => {
  const track = stream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(track);

  imageCapture.takePhoto({ redEyeReduction: true });
})
```

<code-highlighter
    id="highlight-image-capture"
    line-height="0.57em"></code-highlighter>

<div class="fragment" data-fragment-index="1" hidden></div>


Notes:
Toujours besoin de adapter.js pour faire marcher correctement !



##==##

<!-- .slide: data-background-image="assets/images/camera.jpg" data-state="stop-code-image-capture stop-image-capture-demo" -->

##==##

<!-- .slide: data-state="image-capture-demo" class="imageCapture" data-background="#3d4349"-->


<div class="container-flex">
<video id="imageCapture" autoplay></video>
<input id="brightness" type="range" />
<input id="contrast" type="range" />
<input id="saturation" type="range" />
<input id="sharpness" type="range" />
</div>


##==##

<!-- .slide: data-background="assets/images/html5_sticker.png" data-state="stop-image-capture-demo" class="no filter" data-copyrights="true"  -->

##==##

<!-- .slide: class="last-slide" -->

<!-- .element: class="thank-message" --> Merci

<!-- .element: class="presenter" --> **Jean-François Garreau & François Beaufort **

<!-- .element: class="work-rule" --> Ingénieur Lucca & Ingénieur Google

<!-- .element: class="email" --> **@jefBinomed & +FrancoisBeaufort**

