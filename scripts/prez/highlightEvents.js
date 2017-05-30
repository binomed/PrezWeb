"use strict";

import { HighlightCodeHelper } from "../helpers/highlightCodeHelper.js";

const LINE_HEIGHT = 1.15;
const ADDITIONNAL_HEIGT = 0.4;
const COL_WIDTH = 35;
const LEFT_FIRST = "60px";

export class HighlightEvents {
  constructor() {
    //  Bluetooth: Scan + Connect
    new HighlightCodeHelper({
			keyElt : 'connect-ble',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [
			{
				width: '600px',
				line:5,
				left: LEFT_FIRST
			},
			{
				line: 2,
				width: '900px',
				left: LEFT_FIRST
			},
			{
				line : 7,
				width : '600px',
				left: LEFT_FIRST
			}]
		});

    //  Ble Code Read Characteristic
    new HighlightCodeHelper({
			keyElt : 'read-charact',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [
			{
				width: '700px',
				line:2
			},{
				line : 4,
				width : '90%'
			}, {
				line : 6,
				width : '90%'
			}]
		})

		//  Ble Code Write Characteristic
		new HighlightCodeHelper({
			keyElt : 'write-charact',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [
				{
				width: '700px',
				line:2
			},{
				line : 4,
				width : '90%'
			}, {
				line : 9,
				width : '90%'
			}]
		})

		//  Ble Code Read Characteristic
		new HighlightCodeHelper({
			keyElt : 'notif-charact',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [{
				width: '700px',
				line:2
			},{
				line : 4,
				width : '90%'
			}, {
				line : 6,
				width : '90%',
				nbLines: 3
			}]
		})

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

	// Code Web Speech
	new HighlightCodeHelper({
			keyElt : 'web-speech',
			positionArray:[
				{
				width: '600px',
				line: 1
			},
			{
				line : 2,
				width : '450px'
			},
			{
				line : 3,
				width : '550px'
			},
			{
				line : 4,
				width : '550px'
			},
			{
				line : 6,
				width : '350px'
			},
			{
				line : 7,
				width : '350px'
			},
			{
				line : 8,
				left : '280px',
				width : '500px'
			}
			]});

	// Code Web Speech Grammar
	new HighlightCodeHelper({
			keyElt : 'web-speech-grammar',
			positionArray : [
			{
				width: '1200px',
				line: 1
			},
			{
				line : 3,
				width : '750px'
			},
			{
				line : 4,
				width : '700px'
			},
			{
				line : 5,
				width : '650px'
			}
			]});

	// Code Web Speech Synthesis
	new HighlightCodeHelper({
			keyElt : 'web-speech-synthesis',
			positionArray: [
			{
				width: '900px',
				line: 1
			},
			{
				line : 2,
				width : '400px'
			},
			{
				line : 3,
				width : '400px'
			},
			{
				line : 4,
				width : '450px'
			},
			{
				line : 5,
				width : '600px'
			}
			]});


	// Code write nfc
	new HighlightCodeHelper({
			keyElt : 'write-nfc',
			positionArray : [
				{
				width: '350px',
				line:1
			},
			{
				line : 2,
				left:LEFT_FIRST,
				width : '1050px'
			}
			]});

	// Code read nfc
	new HighlightCodeHelper({
			keyElt : 'read-nfc',
			positionArray : [
				{
				width: '250px',
				line:1,
				left: LEFT_FIRST
			},
			{
				line : 1,
				left: '310px',
				width : '150px'
			},
			{
				line : 2,
				left: '90px',
				width : '550px'
			},
			{
				line : 3,
				left: '510px',
				nbLines: 3,
				width : '300px'
			}
			]});
  }
}
