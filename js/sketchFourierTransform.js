let x = []; // array che contiene le coordinate x dei punti del disegno
let y = []; // array che contiene le coordinate y dei punti del disegno
let fourierX; // array che contiene la trasformata delle coordinate X
let fourierY; // array che contiene la trasformata delle coordinate Y

let maxSkip = 25;
let slider;
let time = 0;
let path = []; // array che contiene i punti

function setup(){
    createCanvas(800, 600).parent("canvas-wrapper");
    slider = createSlider(1, maxSkip, 8, 1).parent("slider-wrapper").changed(createArrays); // (min, max, start, step)
    frameRate(30);
    createArrays();
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

    let vx = epicycles(width / 2 + 50, 50, 0, fourierX); // posizione dell'ultimo punto dell'epiciclo x
    let vy = epicycles(100, height / 2, Math.PI / 2, fourierY); // posizione dell'ultimo punto dell'epiciclo y
    let v = createVector(vx.x, vy.y); // posizione del punto da disegnare
    path.unshift(v); //aggiungo il punto all'inizio della lista wave
    fill(0, 255, 0); 
    ellipse(v.x, v.y, 3); // disegno l'ultimo punto
    
    // linee tra il punto v e i due epicicli
    stroke(255, 0, 0);
    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);
    
    // onda risultante
    noFill();
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < path.length; i++){
        vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = (2 * Math.PI) / fourierY.length;
    time += dt;

    if(time > TWO_PI){
        time = 0;
        path = []; // dopo un giro cancella l'array punti e disegna da capo
    }
}

function createArrays() {
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

    fourierY.sort((a, b) => b.amp - a.amp); // ordina i cerchi secondo il raggio
    fourierX.sort((a, b) => b.amp - a.amp);
}

function epicycles(x, y, rotation, fourier) { // funzione per disegnare qualsiasi insieme di epicicli data la posizione del centro del cerchio iniziale, l'orientamento e l'array dei valori della trasformata
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