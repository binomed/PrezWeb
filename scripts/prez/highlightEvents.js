'use strict'

import {HighlightCodeHelper} from '../helpers/highlightCodeHelper.js';

const LINE_HEIGHT = 1.15;
const ADDITIONNAL_HEIGT = 0.4;
const COL_WIDTH = 35;

export class HighlightEvents{
	constructor(){
		//  Bluetooth: Scan + Connect 
		new HighlightCodeHelper({
			keyElt : 'connect-ble',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [{
				row : 1,
				width : '90%'
			}, {
				row : 6,
				width : '90%'
			}]
		});

		//  Ble Code Read Characteristic
		new HighlightCodeHelper({
			keyElt : 'read-charact',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [{
				row : 3,
				width : '90%'
			}, {
				row : 5,
				width : '90%'
			}]
		})

		//  Ble Code Write Characteristic
		new HighlightCodeHelper({
			keyElt : 'write-charact',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [{
				row : 3,
				width : '90%'
			}, {
				row : 8,
				width : '90%'
			}]
		})

		//  Ble Code Read Characteristic
		new HighlightCodeHelper({
			keyElt : 'notif-charact',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [{
				row : 3,
				width : '90%'
			}, {
				row : 5,
				width : '90%',
				height: '186px'
			}]
		})



	// Code User Media 1
	new HighlightCodeHelper({
			keyElt : 'user-media-v2',
			positionArray: [
			{
				row : 5,
				width : '700px',
			},
			{
				row : 6,
				left : '150px',
				width : '100px',
			},
			{
				row : 7,
				left : '100px',
				width : '700px',
			}
			]});


	
	// Code Web Speech
	new HighlightCodeHelper({
			keyElt : 'web-speech', 
			positionArray:[
			{
				row : 1,
				width : '400px'
			},
			{
				row : 2,
				width : '500px'
			},
			{
				row : 3,
				width : '550px'			
			},
			{
				row : 5,
				width : '300px'			
			},
			{
				row : 6,
				width : '300px'
			},
			{
				row : 7,				
				left : '280px',
				width : '450px'
			}
			]});

	// Code Web Speech Grammar
	new HighlightCodeHelper({
			keyElt : 'web-speech-grammar', 
			positionArray : [
			{
				row : 2,
				width : '750px'
			},
			{
				row : 3,
				width : '700px'
			},
			{
				row : 4,
				width : '650px'
			}
			]});

	// Code Web Speech Synthesis
	new HighlightCodeHelper({
			keyElt : 'web-speech-synthesis', 
			positionArray: [
			{
				row : 2,
				width : '850px'
			},
			{
				row : 3,
				width : '400px'
			},
			{
				row : 4,
				width : '450px'
			},
			{
				row : 5,
				width : '400px'
			},
			{
				row : 6,
				width : '350px'
			}
			]});


	// Code write nfc
	new HighlightCodeHelper({
			keyElt : 'write-nfc', 
			positionArray : [
			{
				row : 1,
				col : 1,
				width : '1050px'
			}
			]});
	
	// Code read nfc
	new HighlightCodeHelper({
			keyElt : 'read-nfc', 
			positionArray : [
			{
				row : 0,
				left: '330px',
				width : '150px'
			},
			{
				row : 1,
				left: '90px',
				width : '550px'
			},
			{
				row : 2,
				left: '550px',
				calcHeight: 3,
				width : '300px'
			}
			]});

	}
}
