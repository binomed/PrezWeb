
<!-- .slide: class="first-slide" data-type-show="prez" -->

# **Le Web de Demaintenant**

### 2016.11.09 DevFest @ **Nantes**

##==##

<!-- .slide: class="first-slide" data-type-show="full" -->

# **Le Web de Demaintenant**

##==##

<!-- .slide: class="who-am-i" -->

## Qui sommes nous ?

### François Beaufort

<!-- .element: class="descjf" -->
une super position de poste

![avatar w-300 wp-200](assets/images/fbeaufort.jpg)

![company_logo](assets/images/google.png)


<!-- .element: class="gplus" -->
[+FrancoisBeafort](http://plus.google.com/+FrancoisBeaufort)

Notes:

##==##

<!-- .slide: class="who-am-i" -->

## Qui sommes nous ?

### Jean-François Garreau


<!-- .element: class="descjf" -->
Senior innovation developper & Community Manager

![avatar w-300 wp-200](assets/images/jf.jpg)


![company_logo](assets/images/lucca_logo.png)
![gdg_logo](assets/images/GDG-Logo-carre.png)

<!-- .element: class="twitter" -->
[@jefBinomed](http://twitter.com/jefBinomed)

<!-- .element: class="gplus" -->
[+JeanFrancoisGarreau](http://plus.google.com/+JeanFrancoisGarreau)


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

# Connect by name

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

<!-- .slide: class="transition-white" -->

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

Notes:
Démo avec le Olie

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

<!-- .slide: class="transition-white" -->

# Voice Recognition

##==##

<!-- .slide: class="transition-black" -->

# My Google Assistant

<!--
  _______ ____  _____      __     __
 |__   __/ __ \|  __ \   /\\ \   / /
    | | | |  | | |  | | /  \\ \_/ / 
    | | | |  | | |  | |/ /\ \\   /  
    | | | |__| | |__| / ____ \| |   
    |_|  \____/|_____/_/    \_\_|   
                                    
                   
-->

##==##

<!-- .slide: class="transition-white" -->

# What the web can do today !

##==##

## User Media

blablabla

##==##

## Acceleration

blablabla


##==##

## Web Midi

blablabla


##==##

## Ambiant Light

blablabla


##==##

## Payement Api

blablabla


##==##

## Bref

Notes:
Image de What the web can do

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

