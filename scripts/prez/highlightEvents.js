'use strict'

import {HighlightCodeHelper} from '../helpers/highlightCodeHelper.js';

const LINE_HEIGHT = 1.15;
const ADDITIONNAL_HEIGT = 0.4;
const COL_WIDTH = 35;

export class HighlightEvents{
	constructor(){
		//  BleCode 
		new HighlightCodeHelper({
			keyElt : 'connect-ble',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [{
				row : 1,
				left: '150px',
				width: '100px'
			}, {
				row : 2,
				col : 1,
				width: '500px'
			}]
		});

		//  Ble Code Read Characteristic
		new HighlightCodeHelper({
			keyElt : 'read-charact',
			// We start with the first fragment (the initial position is fixed by css)
			positionArray : [{
				row : 1,
				left: '150px',
				width: '100px'
			}, {
				row : 3,
				col : 1,
				width: '700px'
			}, {
				row : 4,
				left : '150px',
				width: '200px'
			}, {
				row : 6,
				col : 1,
				width: '500px'
			}, {
				row : 7,
				left : '150px',
				width: '100px'
			}, {
				row : 9,
				calcHeight: 2,
				col : 1,
				width: '800px'
			}]
		})
	}
}