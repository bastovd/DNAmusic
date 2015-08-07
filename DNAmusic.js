/*var A_sound = loadAudio("A_sound.uri");
var C_sound = loadAudio("C_sound.uri");
var G_sound = loadAudio("G_sound.uri");
var T_sound = loadAudio("T_sound.uri");
var a_sound = loadAudio("a_sound.uri");
var c_sound = loadAudio("c_sound.uri");
var g_sound = loadAudio("g_sound.uri");
var t_sound = loadAudio("t_sound.uri");*/

var DNA = [];
var numActiveDNA = 7;
var DNAlength = 0;
var DNAhalflength = 0;
var tempo = 100;

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
    if (filesLoaded >= filesToLoad) main();
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
		playDNA();
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

function playDNA() {
	var c = '';
	for (var i = 0; i < DNA.length; i++) {
		c = DNA[i];
		switch(c) {
			case 'A':
				break;
			case 'C':
				break;
			case 'G':
				break;
			case 'T':
				break;
			case 'a':
				break;
			case 'c':
				break;
			case 'g':
				break;
			case 't':
				break;
			default:
				continue;
		}
	}
	setTimeout(function() {
		
	},tempo);
}

function resetDNA() {
	DNA = [];
}