'use strict'
import {AppControler} from './phoneapp/appControler.js';

(function(){

    function pageLoad(){
        new AppControler();
    }

    window.addEventListener('load', pageLoad);
})();
