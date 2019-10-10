var c = 0;
var variance = 0;
var song;
var amp;

function offOn() {
	if (song.isPlaying()) {
		song.pause();
	} else {
		song.play();
	}
}
function mouseClicked() {
	offOn();
}

function preload() {
	song = loadSound("littlethings.mp3");
}

function setup() {
	var cnv = createCanvas(window.innerWidth, window.innerHeight);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
	song.play();
	amp = new p5.Amplitude();
	amp.setInput(song);
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function draw() {
	variance = height * amp.getLevel();

	background(0, 0, 0);

	fill(255, 255, 255);

	var r = getRandomInt(255);
	var g = getRandomInt(255);
	var b = getRandomInt(255);

	stroke(r, g, b);
	noFill();

	beginShape(QUAD_STRIP);

	for (var i = 0; i < width; i += 20) {
		vertex(
			i + 20,
			map(
				noise(i + c),
				0,
				1,
				height / 2 - amp.getLevel() * height,
				height / 2 + amp.getLevel() * height
			)
		);
	}

	endShape();

	c += 0.04;
}
