var A_sound = loadAudio("./resources/A3.mp3");
var C_sound = loadAudio("./resources/C3.mp3");
var G_sound = loadAudio("./resources/G3.mp3");
var T_sound = loadAudio("./resources/E3.mp3");
var a_sound = loadAudio("./resources/A3.mp3");
var c_sound = loadAudio("./resources/C3.mp3");
var g_sound = loadAudio("./resources/G3.mp3");
var t_sound = loadAudio("./resources/E3.mp3");

var DNA = [];
var currDNAindex = 0;
var numActiveDNA = 7;
var DNAlength = 0;
var DNAhalflength = 0;
var tempo = 500;

var valid_chars = ['A','C','G','T','a','c','g','t','\n','\r'];

filesToLoad = 2;
filesLoaded = 0;

function loadAudio(uri) 
{
    var audio = new Audio();
    audio.addEventListener('canplaythrough', isAppLoaded, false); 
    audio.src = uri;
    return audio;
}

function isAppLoaded()
{
    filesLoaded++;
    //if (filesLoaded >= filesToLoad) main();
}

function loadDNA() {
	var isValidChar = false;
	var isValidDNA = true;
	var dna = document.getElementById("DNA-input-area").value;
	dna = dna.replace(/(?:\r\n|\r|\n)/g, '');
	
	var c = '';
	for (var i = 0; i < dna.length; i++) {
		c = dna.charAt(i);
		for (var j = 0; j < valid_chars.length; j++) {
			if (valid_chars[j] == c) {
				DNA[i] = c;
				isValidChar = true;
				break;
			}
		}
		if (isValidChar) isValidChar = false;
		else {
			alert('illegal character: ' + c);
			isValidDNA = false;
			break;
		}
	}
	
	if (isValidDNA) {
		DNAlength = DNA.length;
		alert(dna);
		setInitDNA();
		playDNA(0);
	}
	else {
		resetDNA();
	}
}

function setInitDNA() {
	DNAhalflength = Math.floor(numActiveDNA/2);
	for (var i = 0; i < DNAhalflength; i++) {
		var slot = '#DNA' + i;
		$(slot).text('.');
	}
	for (var i = DNAhalflength, j = 0; i < numActiveDNA; i++, j++) {
		var slot = '#DNA' + i;
		$(slot).text(DNA[j]);
	}
}

function shiftDNA() {
	var i;
	for (i = 0; i < numActiveDNA-1; i++) {
		var slot = '#DNA' + i;
		var j = i+1;
		var next_slot = '#DNA' + j;
		$(slot).text($(next_slot).text());
	}
	i = numActiveDNA-1;
	var slot = '#DNA' + i;
	var next = currDNAindex+DNAhalflength+1;
	if (next < DNAlength) {
		$(slot).text(DNA[next]);
	}
	else {
		$(slot).text('.');
	}
	currDNAindex++;
}

function playDNA(index) {
	var c = '';
	var audio;
	c = DNA[index];
	switch(c) {
		case 'A':
			audio = A_sound;
			break;
		case 'C':
			audio = C_sound;
			break;
		case 'G':
			audio = G_sound;
			break;
		case 'T':
			audio = T_sound;
			break;
		case 'a':
			audio = a_sound;
			break;
		case 'c':
			audio = c_sound;
			break;
		case 'g':
			audio = g_sound;
			break;
		case 't':
			audio = t_sound;
			break;
		default:
	}
	setTimeout(function() {
		audio.play();
		shiftDNA();
		index++;
		if (index < DNAlength) {
			playDNA(index);
		}
	},tempo);
}

function resetDNA() {
	DNA = [];
}