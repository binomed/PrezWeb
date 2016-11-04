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
				row : 4,
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



	// Code User Media 1
	new HighlightCodeHelper({
			keyElt : 'highlight-user-media-v1',
			positionArray: [
			{
				'top' : 'calc(90px + 13.8em)',
				'left' : '60px',
				'width' : '1000px',
				'height' : '1.4em'
			},
			{
				'top' : 'calc(90px + 7.75em)',
				'left' : '180px',
				'width' : '210px',
				'height' : '1.4em'
			},
			{
				'top' : 'calc(90px + 7.75em)',
				'left' : '380px',
				'width' : '90px',
				'height' : '1.4em'
			},
			{
				'top' : 'calc(90px + 10.35em)',
				'left' : '100px',
				'width' : '800px',
				'height' : '2.4em'
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

	}
}
