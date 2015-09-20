var A_sound;
var C_sound;
var G_sound;
var T_sound;
var a_sound;
var c_sound;
var g_sound;
var t_sound;
var r_A_sound;
var r_C_sound;
var r_G_sound;
var r_T_sound;
var r_a_sound;
var r_c_sound;
var r_g_sound;
var r_t_sound;

var DNA = [];
var rDNA = [];

var currDNAindex = 0;
var numActiveDNA = 7;
var DNAlength = 0;
var DNAhalflength = 0;

var beats = 4;
var tempo = 200;
var u_tempo = 300;
var l_tempo = 200;
var volume = 0.0;
var r_volume;

var prev_note = '';

var valid_chars = ['A','C','G','T','a','c','g','t','\n','\r'];
var oppos_chars = ['G','T','A','C','g','t','a','c'];

var colors = [];

var isAddParticle;
var isParticlesInit = false;

filesToLoad = 2;
filesLoaded = 0;

main();

function main() {
	var instruments = document.getElementsByClassName("instrument");
	for (var i = 0; i < instruments.length; i++) {
		$("#"+instruments[i].id)
		.hover(function() {
			$(this)
			.css("border","2px solid #eee");
		})
		.click(function() {
			setInstrumentSounds(i);
		});
	}
	for (var i = 0; i < instruments.length; i++) {
		$("#"+instruments[i].id).mouseleave(function() {
			$(this).css("border","none");
		});
	}
	generateColors();
	preloadSounds();
}

function generateColors() {
	var color1 = tinycolor.random();
        /*randomColor({
           luminosity: 'bright',
           hue: 'random'
        });*/
        
        var tetrad_colors = tinycolor(color1).splitcomplement();
        var analogous = tinycolor(color1).analogous();
        var isLight = tinycolor(analogous[5]).isLight();
        
        var variations;
        
        for (var i = 0; i < 4; i++) {
                if (i == 3) {
                        if (isLight) {
                            tinycolor(analogous[5]).darken(30);
                            variations = tinycolor(analogous[5]).analogous(); // creates 6 analogues
                        }
                        else {
                            tinycolor(analogous[5]).lighten(30);
                            variations = tinycolor(analogous[5]).analogous();
                        }
                }
                else {
                        //colors[i*7] = tinycolor(tetrad_colors[i]).toRgb();
                        variations = tinycolor(tetrad_colors[i]).analogous();
                }
                
                for (var j = 0; j < 6; j++) {
                        colors[i*6+j] = tinycolor(variations[j]).toRgb();
                }
        }
}

function preloadSounds() {
	A_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/primary/A3.mp3");
	C_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/primary/C3.mp3");
	G_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/primary/G3.mp3");
	T_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/primary/E3.mp3");
	a_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/primary/A3.mp3");
	c_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/primary/C3.mp3");
	g_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/primary/G3.mp3");
	t_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/primary/E3.mp3");
	
	r_A_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/secondary/A3.mp3");
	r_C_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/secondary/A5.mp3");
	r_G_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/secondary/A6.mp3");
	r_T_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/secondary/A7.mp3");
	r_a_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/secondary/A3.mp3");
	r_c_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/secondary/A5.mp3");
	r_g_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/secondary/A6.mp3");
	r_t_sound = loadAudio("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/secondary/A7.mp3");
}

function loadAudio(uri) 
{
    var audio = new Audio();
    audio.addEventListener('canplaythrough', isAppLoaded, false); 
	audio.preload = 'auto';
    audio.src = uri;
	audio.load();
    return audio;
}

function setInstrumentSounds(index) {
	if (index < 4) {
		A_sound = loadAudio("./resources/primary/"+index+"/A3.mp3");
		C_sound = loadAudio("./resources/primary/"+index+"/C3.mp3");
		G_sound = loadAudio("./resources/primary/"+index+"/G3.mp3");
		T_sound = loadAudio("./resources/primary/"+index+"/E3.mp3");
		a_sound = loadAudio("./resources/primary/"+index+"/A3.mp3");
		c_sound = loadAudio("./resources/primary/"+index+"/C3.mp3");
		g_sound = loadAudio("./resources/primary/"+index+"/G3.mp3");
		t_sound = loadAudio("./resources/primary/"+index+"/E3.mp3");
	}
	else {
		r_A_sound = loadAudio("./resources/primary/"+index+"/A3.mp3");
		r_C_sound = loadAudio("./resources/primary/"+index+"/C3.mp3");
		r_G_sound = loadAudio("./resources/primary/"+index+"/G3.mp3");
		r_T_sound = loadAudio("./resources/primary/"+index+"/E3.mp3");
		r_a_sound = loadAudio("./resources/primary/"+index+"/A3.mp3");
		r_c_sound = loadAudio("./resources/primary/"+index+"/C3.mp3");
		r_g_sound = loadAudio("./resources/primary/"+index+"/G3.mp3");
		r_t_sound = loadAudio("./resources/primary/"+index+"/E3.mp3");
	}
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
	for (var i = 0,k = 0; i < dna.length; i++, k++) {
		c = dna.charAt(i);
		for (var j = 0; j < valid_chars.length; j++) {
			if (valid_chars[j] == c) {
				DNA[i] = c;
				isValidChar = true;
				if (k % beats == 0) {
					k = 0;
					rDNA[i] = oppos_chars[j];
				}
				else {
					rDNA[i] = '';
				}
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
		isParticlesInit = true;
		alert(rDNA);
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
	var isPlayNote = true;
	var c = '';
	var audio;
	c = DNA[index];
        if (index == 0) volume = 0.0;
	switch(c) {
		case 'A':
			audio = A_sound;
                        if (tempo < u_tempo) {
                            tempo += 10;
                        }
                        
                        if (prev_note == 'a'||prev_note == 'c' ||prev_note == 't' ||prev_note == 'g') {
                              volume = 0.5;  
                        }
                        
			//tempo = u_tempo;
			if (prev_note == c) {isPlayNote = false; 
                                volume -= 0.05;
                        }
			else isPlayNote = true;
			break;
		case 'C':
			audio = C_sound;
			if (tempo < u_tempo) {
                            tempo += 10;
                        }
                        
                        if (prev_note == 'a'||prev_note == 'c' ||prev_note == 't' ||prev_note == 'g') {
                              volume = 0.5;  
                        }
                        
			//tempo = u_tempo;
			if (prev_note == c) {isPlayNote = false; 
                                volume -= 0.05;
                        }
			else isPlayNote = true;
			break;
		case 'G':
			audio = G_sound;
			if (tempo < u_tempo) {
                            tempo += 10;
                        }
                        
                        if (prev_note == 'a'||prev_note == 'c' ||prev_note == 't' ||prev_note == 'g') {
                              volume = 0.5;  
                        }
                        
			//tempo = u_tempo;
			if (prev_note == c) {isPlayNote = false; 
                                volume -= 0.05;
                        }
			else isPlayNote = true;
			break;
		case 'T':
			audio = T_sound;
			if (tempo < u_tempo) {
                            tempo += 10;
                        }
                        
                        if (prev_note == 'a'||prev_note == 'c' ||prev_note == 't' ||prev_note == 'g') {
                              volume = 0.5;  
                        }
                        
			//tempo = u_tempo;
			if (prev_note == c) {isPlayNote = false; 
                                volume -= 0.05;
                        }
			else isPlayNote = true;
			break;
		case 'a':
			audio = a_sound;
			if (tempo > l_tempo) {
                            tempo -= 10;
                        }
                        
                        if (prev_note == 'A'||prev_note == 'C' ||prev_note == 'T' ||prev_note == 'G') {
                              volume = 0.5;  
                        }
                        
			//tempo = l_tempo;
                        if (prev_note == c) {isPlayNote = false; 
                                volume -= 0.15;
                        }
			isPlayNote = true;
			break;
		case 'c':
			audio = c_sound;
			if (tempo > l_tempo) {
                            tempo -= 10;
                        }
                        
                        if (prev_note == 'A'||prev_note == 'C' ||prev_note == 'T' ||prev_note == 'G') {
                              volume = 0.5;  
                        }
                        
			//tempo = l_tempo;
                        if (prev_note == c) {isPlayNote = false; 
                                volume -= 0.15;
                        }
			isPlayNote = true;
			break;
		case 'g':
			audio = g_sound;
			if (tempo > l_tempo) {
                            tempo -= 10;
                        }
                        
                        if (prev_note == 'A'||prev_note == 'C' ||prev_note == 'T' ||prev_note == 'G') {
                              volume = 0.5;  
                        }
                        
			//tempo = l_tempo;
                        if (prev_note == c) {isPlayNote = false; 
                                volume -= 0.15;
                        }
			isPlayNote = true;
			break;
		case 't':
			audio = t_sound;
			if (tempo > l_tempo) {
                            tempo -= 10;
                        }
                        
                        if (prev_note == 'A'||prev_note == 'C' ||prev_note == 'T' ||prev_note == 'G') {
                              volume = 0.5;  
                        }
                        
			//tempo = l_tempo;
                        if (prev_note == c) {isPlayNote = false; 
                                volume -= 0.15;
                        }
			isPlayNote = true;
			break;
		default:
	}
	
	var b = '';
	var r_audio;
	var isPlayBeat = false;
	if (index % beats == 0) {
		isPlayBeat = true;
		b = rDNA[index];
		switch(b) {
			case 'A':
				r_audio = r_A_sound;
				tempo = u_tempo;
				break;
			case 'C':
				r_audio = r_C_sound;
				tempo = u_tempo;
				break;
			case 'G':
				r_audio = r_G_sound;
				tempo = u_tempo;
				break;
			case 'T':
				r_audio = r_T_sound;
				tempo = u_tempo;
				break;
			case 'a':
				r_audio = r_a_sound;
				tempo = l_tempo;
				break;
			case 'c':
				r_audio = r_c_sound;
				tempo = l_tempo;
				break;
			case 'g':
				r_audio = r_g_sound;
				tempo = l_tempo;
				break;
			case 't':
				r_audio = r_t_sound;
				tempo = l_tempo;
				break;
			default:
		}
	}
	
	if (isPlayNote) { 
                if (volume < 1.0) {
                        volume += 0.1;
                }
		playSound(audio);
	}
	if (isPlayBeat) {
		playBeat(r_audio);
		isPlayBeat = false;
	}
	
	isAddParticle = true;
	
	setTimeout(function() {
		//audio.play();
		shiftDNA();
		index++;
		prev_note = c;
		if (index < DNAlength) {
			playDNA(index);
		}
		else {
			resetDNA();
		}
	},tempo);
}

function resetDNA() {
	DNA = [];
	rDNA = [];
	currDNAindex = 0;
}

function playSound(audio){
	var click = audio.cloneNode();
        if (volume > 1.0) volume = 1.0;
        else if (volume < 0.0) volume = 0.0;
        click.volume = volume;
	click.play();   
}

function playBeat(audio){
	var click = audio.cloneNode();
	click.play();   
}