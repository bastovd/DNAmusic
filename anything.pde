/* @pjs preload="https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/w_brush_1.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/w_brush_2.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/w_brush_3.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/g_brush_1.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/g_brush_2.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/g_brush_3.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_brush_1.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_brush_2.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_brush_3.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_r_brush_1.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_r_brush_2.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_r_brush_3.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_g_brush_1.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_g_brush_2.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_g_brush_3.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_b_brush_1.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_b_brush_2.png,
			 https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_b_brush_3.png"; */
// Global variables
float radius = 50.0;
int X, Y;
int nX, nY;
int delay = 16;
int r,g,b;

int color_line = 1; // if ACGT or acgt

string p_color;

int numParticles = 0;
int particleIndex = 0;
Particle[] particles;
ArrayList particle_subsets; // subsets of particle clusters
ArrayList particle_subset_steps; // points along a curve
int curr_particle_subset_index; // curr subset to count from
int placed_particles; // particles already rendered in place
Curve[] curves;
PImage[] brushes;
PImage[] b_brushes;
int num_brushes = 9;

Pimage brush_1;
Pimage brush_2;
Pimage brush_3;
Pimage brush_4;
Pimage brush_5;
Pimage brush_6;
Pimage brush_7;
Pimage brush_8;
Pimage brush_9;

Pimage b_brush_1;
Pimage b_brush_2;
Pimage b_brush_3;
Pimage b_brush_4;
Pimage b_brush_5;
Pimage b_brush_6;
Pimage b_brush_7;
Pimage b_brush_8;
Pimage b_brush_9;


// Setup the Processing Canvas
void setup(){
  size( screen.width, screen.height);
  strokeWeight( 0 );
  frameRate( 15 );
  X = 0;
  Y = 0;
  nX = X;
  nY = Y;
  
  // setting brush strokes textures;
  brush_1 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/w_brush_1.png");
  brush_2 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/w_brush_2.png");
  brush_3 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/w_brush_3.png");
  brush_4 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/g_brush_1.png");
  brush_5 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/g_brush_2.png");
  brush_6 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/g_brush_3.png");
  brush_7 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_brush_1.png");
  brush_8 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_brush_2.png");
  brush_9 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_brush_3.png");
  brushes = new PImage[num_brushes];
  brushes[0] = brush_1;
  brushes[1] = brush_2;
  brushes[2] = brush_3;
  brushes[3] = brush_4;
  brushes[4] = brush_5;
  brushes[5] = brush_6;
  brushes[6] = brush_7;
  brushes[7] = brush_8;
  brushes[8] = brush_9;
  // setting brush strokes textures;
  b_brush_1 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_r_brush_1.png");
  b_brush_2 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_r_brush_2.png");
  b_brush_3 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_r_brush_3.png");
  b_brush_4 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_g_brush_1.png");
  b_brush_5 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_g_brush_2.png");
  b_brush_6 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_g_brush_3.png");
  b_brush_7 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_b_brush_1.png");
  b_brush_8 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_b_brush_2.png");
  b_brush_9 = loadImage("https://raw.githubusercontent.com/bastovd/DNAmusic/master/resources/images/b_b_brush_3.png");
  b_brushes = new PImage[num_brushes];
  b_brushes[0] = b_brush_1;
  b_brushes[1] = b_brush_2;
  b_brushes[2] = b_brush_3;
  b_brushes[3] = b_brush_4;
  b_brushes[4] = b_brush_5;
  b_brushes[5] = b_brush_6;
  b_brushes[6] = b_brush_7;
  b_brushes[7] = b_brush_8;
  b_brushes[8] = b_brush_9;
  
  particle_subsets = new ArrayList(10);
  
  /*r = 210;//random(255);
  g = 210;//random(255);
  b = 210;//random(255);*/
  
  PFont fontA = loadFont("courier");
  textFont(fontA, 14); 
  
  curves = new Curve[1];
  generateCurve();
}

void setParticleSubSets() {
	int sub = 0;
	for (int i = 0; i < numParticles; ) {
		sub = random(50, 500); // random number of particles in a subset
		i + sub < numParticles ? sub = sub : sub = numParticles - i;
		particle_subsets.add(sub);
		i += sub;
	}
	curr_particle_subset_index = 0;
	placed_particles = 0;
}

void setParticlesLength() {
	numParticles = DNAlength;
	particles = new Particle[numParticles];
}

void addParticle(int i) {
	char c = DNA[i];
	if (c == "A" || c == "a") {
		sr = 255; sg = 0; sb = 0;
	} else if (c == "C" || c == "c") {
		sr = 0; sg = 255; sb = 0;
	} else if (c == "G" || c == "g") {
		sr = 255; sg = 255; sb = 0;
	} else if (c == "T" || c == "t") {
		sr = 0; sg = 0; sb = 255;
	}
	
	if (c == "A" || c == "C" || c == "G" || c == "T") color_line = 1;
	else color_line = 0;
	
	radius = random(15.0,25.0);
	X = particle_subset_steps.get(placed_particles).x;//random (screen.width);
	Y = particle_subset_steps.get(placed_particles).y;//random (screen.height);
	particles[i] = new Particle(X, Y, radius, sr, sg, sb, color_line);
	
	particleIndex++;
	placed_particles++;
	if (placed_particles > particle_subsets.get(curr_particle_subset_index)) {
		curr_particle_subset_index++;
		placed_particles = 0;
		generateCurve();
		particleStepsOnCurve(curves[0]);
	}
	
	isAddParticle = false;
}

void generateParticles() {
	if (isParticlesInit) {
		setParticlesLength();
		setParticleSubSets();
		
		particleStepsOnCurve(curves[0]);
		
		isParticlesInit = false;
	}
	
	if (numParticles > 0) {
		for (int i = 0; i < particleIndex; i++) {
			if (i > 0) {
				stroke(particles[i].r,particles[i].g,particles[i].b);
				line(particles[i-1].x_pos,particles[i-1].y_pos,
					 particles[i].x_pos,particles[i].y_pos);
			}
			
			noStroke();
			fill (particles[i].r,particles[i].g,particles[i].b);
			pushMatrix();
			translate(particles[i].x_pos, particles[i].y_pos);
			rotate(particles[i].rot);
			image(particles[i].texture, 
				  0 - particles[i].i_radius/2, 
				  0 - particles[i].i_radius/2, 
				  particles[i].i_radius, 
				  particles[i].i_radius);
				  //filter(BLUR, 6);
			popMatrix();
			
			particles[i].update();
		}
	}
	
	/*
	text("number of sets: " + particle_subsets.size(), 10, 10);
	for (int i = 0; i < particle_subsets.size(); i++) {
		text(i + " " + particle_subsets.get(i), 12,20 + 10*i);
	}
	*/
}

void particleStepsOnCurve(Curve c) {
	int steps = particle_subsets.get(curr_particle_subset_index);
	PosPoint p;// = new Point(0,0);
	float radius;
	float angle;
	float rate = random (0.25, 2.0);
	if (rate == 0.0) rate = 0.1;
	particle_subset_steps = new ArrayList(steps);
	for (int i = 0; i <= steps; i++) {
	  radius = random(10.0, 10+i*rate);
	  angle = random(0.0, TWO_PI);
	  float t = i / float(steps);
	  float x = bezierPoint(c.i_x, c.ci_x, c.cj_x, c.j_x, t);
	  float y = bezierPoint(c.i_y, c.ci_y, c.cj_y, c.j_y, t);
	  x += radius*cos(angle); 
	  y += radius*sin(angle); 
	  p = new PosPoint(x,y,5.0,i);
	  particle_subset_steps.add(p);
	}	
}

void drawStepsOnCurve() {
	if (particle_subset_steps != null) {
		for (int i = 0; i < particle_subset_steps.size(); i++) {
			PosPoint p = particle_subset_steps.get(i);
			noStroke();
			fill(255,p.alpha);
			ellipse(p.x,
					p.y,
					p.radius,
					p.radius);
			if (placed_particles >= i) {
				p.SetIsDissolve();
			}
			else {
				if (i > 0 && p.count >= p.to_appear) {
				PosPoint pp = particle_subset_steps.get(i-1);
				stroke(210, 10);
				//strokeWeight(2);
				line(pp.x, pp.y, p.x, p.y);
				}
			}
			if (p.count == p.to_appear) {
				p.SetIsAppear();
			}
			p.update();
		}
	}
}

void drawCurve() {
	noFill();
	stroke(0,0,0,126);
	bezier(curves[0].i_x,
		   curves[0].i_y,
		   curves[0].ci_x,
		   curves[0].ci_y,
		   curves[0].cj_x,
		   curves[0].cj_y,
		   curves[0].j_x,
		   curves[0].j_y);
}

void generateCurve() {
	float angle;
	float length;
	int xi; int yi;
	int xj; int yj;
	
	angle = random(0.0,TWO_PI);
	length = random(200.0, 600.0);
	xi = random (screen.width);
	yi = random (screen.height);
	
	xj = length*cos(angle);
	yj = length*sin(angle);
	
	int ci_x = random (screen.width);
	int ci_y = random (screen.height);
	int cj_x = random (screen.width);
	int cj_y = random (screen.height);
	
	curves[0] = new Curve(xi,yi,xj,yj,ci_x,ci_y,cj_x,cj_y);	
}

boolean isAddCurve = true;
// Main draw loop
void draw(){ 
  // Fill canvas grey
  background( 20 );
  /*image(brush_1,0,0);
  tint(255);
  image(brush_1,100,0);*/

  
  generateParticles();
  drawCurve();
  drawStepsOnCurve();
  
  if (isAddParticle) {
	addParticle(currDNAindex);
  }
  
}

//Particle class
class Curve {
	int i_x; // pivot 1 x
	int i_y; // pivot 1 y
	int j_x; // pivot 2 x
	int j_y; // pivot 2 y
	
	int ci_x; // control 1 x
	int ci_y; // control 1 y
	int cj_x; // control 2 x
	int cj_y; // control 2 y
	
	Curve(x1,y1,x2,y2,c1x,c1y,c2x,c2y) {
		i_x = x1;
		i_y = y1;
		j_x = x2;
		j_y = y2;
		ci_x = c1x;
		ci_y = c1y;
		cj_x = c2x;
		cj_y = c2y;
	}
}

class Particle {
	int x_pos;
	int y_pos;
	float i_radius;
	float t_radius;
	int r, g, b;
	int cline;
	
	float bounce_acc;
	float m_radius;
	
	PImage texture;
	float rot; // rotation around the z axis;
	
	Particle(x,y,ra,cr,cg,cb,cl) {
		x_pos = x;
		y_pos = y;
		i_radius = ra;
		r = cr;
		g = cg;
		b = cb;
		cline = cl;
		
		m_radius = i_radius;
		bounce_acc = random(0.5,1.0);
		
		int j = int(random(0,3));
		if (cb == 255) j+=6;
		else if (cg == 255) j+=3;
		if (cl == 0) {
			texture = brushes[j];
			i_radius = random(25.0,50.0);
		}
		else {
			i_radius = random(75.0,150.0);
			texture = b_brushes[j];
		}
		
		rot = random(0.0,TWO_PI);
	}
	
	void update() {
	}
	
}

class Pt {
	float x;
	float y;
	
	Pt(xi, yi) {
		x = xi;
		y = yi;
	}
}

class Brush {
	int width = 0;
	int height = 0;
	Pimage img;
	
	Brush(){
		
	}
}

class PosPoint {
	int x;
	int y;
	float radius;
	float bounce_acc;
	float t_bounce_acc;
	float i_radius ;
	float t_radius;
	
	float dissolve_acc;
	int alpha = 0;
	boolean isDissolve = false;
	boolean isAppear = false;
	
	float speed;
	float angle;
	
	int to_appear;
	int count = 0;
	
	PosPoint(int xi, int yi, float ra, int i) {
		x = xi;
		y = yi;
		to_appear = i;
		
		bounce_acc = 0.00025;
		t_bounce_acc = bounce_acc;
		dissolve_acc = 5;
		i_radius = 25.0;
		t_radius = ra;
		radius = i_radius;
		
		angle = random(0.0,TWO_PI);
		speed = random(0.0,2.0);
	}
	
	void SetIsDissolve() {
		isDissolve = true;
	}
	void SetIsAppear() {
		isAppear = true;
	}
	
	void update() {
		if (isDissolve) {
			x = x+speed*cos(angle);
			y = y+speed*sin(angle);
			
			bounce_acc += bounce_acc;
			//dissolve_acc ++;
			radius += bounce_acc;
			alpha -= dissolve_acc;
			speed += (speed/50.0);
			
			if (radius >= 50) {
				alpha = 0;
				isDissolve = false;
			}
		}
		else {
			if (isAppear) {
				alpha += dissolve_acc;
				if (alpha > 210) alpha = 210;
				bounce_acc += 2*bounce_acc;
				if (radius - bounce_acc <= t_radius) {
					bounce_acc = t_bounce_acc;
					radius = t_radius;
					alpha = 210;
					isAppear = false;
					count--;
				}
				else {
					radius -= bounce_acc;
				}
			}
		}
		count++;
	}

}
