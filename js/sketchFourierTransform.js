let y = [];
let x = [];
let fourierY;
let fourierX;

let slider;

let time = 0; // tempo
let path = []; // array che contiene i punti

function setup(){
    createCanvas(800, 600).parent("canvas-wrapper");
    slider = createSlider(1, 25, 8, 1); // min, max, start
    slider.parent("slider-wrapper");
    slider.changed(createArrays);
    frameRate(120);
    createArrays();
}

function createArrays(){
    time = 0;
    path = [];
    x = [];
    y = [];
    fourierX = [];
    fourierY = [];
    let skip = slider.value();
    for (let i = 0; i < drawing.length; i += skip) {
        x.push(drawing[i].x);
        y.push(drawing[i].y);
    }
    fourierY = dft(y);
    fourierX = dft(x);

    fourierY.sort((a, b) => b.amp - a.amp);
    fourierX.sort((a, b) => b.amp - a.amp);
}

function epicycles(x, y, rotation, fourier){
    let px = x;
    let py = y;
    for (let k = 0; k < fourier.length; k++) {
        let radius = fourier[k].amp;
        let freq = fourier[k].freq;
        let phase = fourier[k].phase;

        noFill();
        stroke(0, 50);
        ellipse(x, y, radius * 2); // cerchio
        x += radius * cos(freq * time + phase + rotation);
        y += radius * sin(freq * time + phase + rotation);
        strokeWeight(1);
        stroke(0);
        line(px, py, x, y); // linea tra i cerchi
        px = x;
        py = y;
    }
    return createVector(x, y);
}

function draw() {
    background(255);

    fill(0);
    textSize(20);
    strokeWeight(1);
    text("Number of points skipped: " + slider.value(), 5, 30);
    strokeWeight(0);
    textSize(14);
    text("(greater means less accuracy)", 5, 54);

    let vx = epicycles(width/2+50, 50, 0, fourierX);
    let vy = epicycles(100, height/2, HALF_PI, fourierY);
    let v = createVector(vx.x, vy.y);
    
    path.unshift(v); //aggiungo all'inizio della lista wave
    fill(0, 255, 0); 
    ellipse(v.x, v.y, 3); // ultimo punto
    
    stroke(255, 0, 0);
    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);
    
    // disegno l'onda risultante
    noFill();
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (let i=0; i < path.length; i++){
        vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = (2 * Math.PI) / fourierY.length;
    time += dt;

    if(time > TWO_PI){
        time = 0;
        path = [];
    }
}
