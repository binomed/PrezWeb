"use strict";

import { HighlightCodeHelper } from "../helpers/highlightCodeHelper.js";

const LINE_HEIGHT = 1.15;
const ADDITIONNAL_HEIGT = 0.4;
const COL_WIDTH = 35;
const LEFT_FIRST = "60px";

export class HighlightEvents {
  constructor() {
    //  Bluetooth: Scan + Connect
    /*new HighlightCodeHelper({
			keyElt : 'connect-ble',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [{
				width: '500px',
				left: LEFT_FIRST
			},{
				line : 1,
				width : '90%'
			}, {
				line : 6,
				width : '90%'
			}]
		});*/

    //  Ble Code Read Characteristic
    /*new HighlightCodeHelper({
			keyElt : 'read-charact',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [{
				line : 3,
				width : '90%'
			}, {
				line : 5,
				width : '90%'
			}]
		})

		//  Ble Code Write Characteristic
		new HighlightCodeHelper({
			keyElt : 'write-charact',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [{
				line : 3,
				width : '90%'
			}, {
				line : 8,
				width : '90%'
			}]
		})

		//  Ble Code Read Characteristic
		new HighlightCodeHelper({
			keyElt : 'notif-charact',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [{
				line : 3,
				width : '90%'
			}, {
				line : 5,
				width : '90%',
				height: '186px'
			}]
		})*/

    // Code User Media 1
    new HighlightCodeHelper({
      keyElt: "user-media-v2",
      positionArray: [
        {
          width: "500px",
          line: 4,
          left: LEFT_FIRST
        },
        {
          line: 6,
          width: "700px"
        },
        {
          line: 7,
          left: "150px",
          width: "100px"
        },
        {
          line: 8,
          left: "100px",
          width: "700px"
        }
      ]
    });

    /*
	// Code Web Speech
	new HighlightCodeHelper({
			keyElt : 'web-speech',
			positionArray:[
			{
				line : 1,
				width : '400px'
			},
			{
				line : 2,
				width : '500px'
			},
			{
				line : 3,
				width : '550px'
			},
			{
				line : 5,
				width : '300px'
			},
			{
				line : 6,
				width : '300px'
			},
			{
				line : 7,
				left : '280px',
				width : '450px'
			}
			]});

	// Code Web Speech Grammar
	new HighlightCodeHelper({
			keyElt : 'web-speech-grammar',
			positionArray : [
			{
				line : 2,
				width : '750px'
			},
			{
				line : 3,
				width : '700px'
			},
			{
				line : 4,
				width : '650px'
			}
			]});

	// Code Web Speech Synthesis
	new HighlightCodeHelper({
			keyElt : 'web-speech-synthesis',
			positionArray: [
			{
				line : 1,
				width : '400px'
			},
			{
				line : 2,
				width : '400px'
			},
			{
				line : 3,
				width : '450px'
			},
			{
				line : 4,
				width : '600px'
			}
			]});


	// Code write nfc
	new HighlightCodeHelper({
			keyElt : 'write-nfc',
			positionArray : [
			{
				line : 1,
				col : 1,
				width : '1050px'
			}
			]});

	// Code read nfc
	new HighlightCodeHelper({
			keyElt : 'read-nfc',
			positionArray : [
			{
				line : 0,
				left: '330px',
				width : '150px'
			},
			{
				line : 1,
				left: '90px',
				width : '550px'
			},
			{
				line : 2,
				left: '550px',
				calcHeight: 3,
				width : '300px'
			}
			]});
			*/
  }
}
