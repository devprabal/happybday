// wishing happy birthday
var bdaySound;

function preload() {
  bdaySound = loadSound("song-1-short.mp3");
}
var slider;
var playButton;

function toggleSound() {
  if (!bdaySound.isPlaying()) {
    bdaySound.play();
    playButton.html("stop");
  } else {
    bdaySound.stop();
    playButton.html("play");

  }
}
var amp;
var fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(64, 64);
  background(0);
  angleMode(DEGREES);

  playButton = createButton("stop");
  playButton.position((width / 2) - ((playButton.width) / 2), height - 100);
  playButton.mousePressed(toggleSound);
  slider = createSlider(0, 1, 0.5, 0.01); // a slider whose range is set between 0 and 1, by default it is to be positioned at 0.5 and do increment by 0.01 when dragged
  slider.position((width / 2) - ((slider.width) / 2), height - 50);
  bdaySound.play();
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.9, 64);
}
var loudness_stack = [];

function draw() {
  background(0);

  textSize(32);
  text('Happy birthday Pogi', width/2 - 100, 40)
  // bdaySound.setVolume(0.5); // setVolume ranges between 0 and 1
  bdaySound.setVolume(slider.value());
  loudness = amp.getLevel();

  // SIMPLE ELLIPSE BEATING
  // var diam = map(loudness, 0, 1, 100,2000);
  // stroke(210,200,20);
  // strokeWeight(7);
  // fill(23,34,123);
  // ellipse(width/2,height/2,diam,diam);

  // CIRCULAR VISUALIZATION LINE
  // loudness_stack.push(loudness);
  // noFill();
  // stroke(255);
  // translate(width / 2, height / 2);
  // var r, x, y;
  // beginShape();
  // for (theta = 0; theta < 360; theta++) {
  //   r = map(loudness_stack[theta],0,1,100,700);
  //   x = r * cos(theta);
  //   y = r * sin(theta);
  //   vertex(x, y);
  // }
  // endShape();
  // if (loudness_stack.length > 360)
  // {
  //   loudness_stack.splice(0,1);  // remove element from index 0 and add 1 new element there
  // }
  var spectrum = fft.analyze();
  var w = width / spectrum.length;
  // console.log(spectrum.length);
  translate(width / 2, 0);

  for (var i = 0; i < spectrum.length; i++) {
    var y = map(spectrum[i], 0, 255, height, 0);
    noStroke();
    fill(180, 180, i);
    rect(i * w, y, w - 7, height - y);
    fill(i * 10, 200, 200);
    rect(-i * w, y, w - 7, height - y); // for mirror type pattern
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  slider.position((width / 2) - ((slider.width) / 2), height - 50);
  playButton.position((width / 2) - ((playButton.width) / 2), height - 100);
}
